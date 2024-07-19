import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Parser from "rss-parser";
import { getRequiredAuthSession } from "@/lib/auth";
import { Articles } from "@/types/collection";

type CustomItem = {
  creator?: string;
  guid?: string;
  categories?: string[];
  thumb?: any;
  image?: any;
  fullContent?: string;
  mediaContent?: any[];
};

type ArticleInsert = {
  feed_id: number;
  title: string | null;
  link: string | null;
  pub_date: string | null;
  author: string | null;
  content: string | null;
  content_snippet: string | null;
  id_article: string | null;
  iso_date: string | null;
  categories: string[] | null;
};

const parser = new Parser<CustomItem>({
  customFields: {
    item: [
      "creator",
      "guid",
      "categories",
      "thumb",
      "image",
      ["content:encoded", "fullContent"],
      ["media:content", "mediaContent", { keepArray: true }],
    ],
  },
});

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const user = await getRequiredAuthSession();
    const { url } = await req.json();

    let feed = await parser.parseURL(url);

    if (!feed?.link) {
      return new NextResponse("Feed not found", { status: 404 });
    }

    const { data: existingFeed, error: feedSelectError } = await supabase
      .from("feeds")
      .select()
      .eq("url", url)
      .single();

    if (feedSelectError) {
      console.log("No existing feed", feedSelectError);
    }

    let feedData;
    if (!existingFeed) {
      const { data: newFeedData, error: feedInsertError } = await supabase
        .from("feeds")
        .insert({
          link: feed.link,
          title: feed.title,
          url,
        })
        .select()
        .single();

      if (feedInsertError) {
        console.log("Error adding new feed", feedInsertError);
        throw new Error("Error adding new feed");
      }

      feedData = newFeedData;
    } else {
      feedData = existingFeed;
    }

    const { error: subscriptionUpsertError } = await supabase
      .from("subscriptions")
      .upsert(
        {
          feed_id: feedData.id,
          user_id: user.id,
          is_active: true,
        },
        { onConflict: "feed_id,user_id" }
      );

    if (subscriptionUpsertError) {
      console.log("Error upserting subscription", subscriptionUpsertError);
      throw new Error("Error upserting subscription");
    }

    const items: ArticleInsert[] = feed.items.map((item) => ({
      feed_id: feedData.id,
      title: item.title ?? null,
      link: item.link ?? null,
      pub_date: item.pubDate ?? null,
      author: item.creator ?? item.author ?? null,
      content: item.content ?? null,
      content_snippet: item.contentSnippet ?? null,
      id_article: item.guid ?? item.id ?? null,
      iso_date: item.isoDate ?? null,
      categories: item.categories ?? null,
    }));

    const { data: articles, error: upsertItemsError } = await supabase
      .from("articles")
      .upsert(items, { onConflict: "id_article" })
      .select();

    if (upsertItemsError) {
      console.log("Error upserting articles", upsertItemsError);
      throw new Error("Error upserting articles");
    }

    return NextResponse.json({
      feed: feedData,
      articles: articles,
    });
  } catch (error) {
    console.error("[POST] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
