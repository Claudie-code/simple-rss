import { Feeds } from "@/types/collection";
import { createClient } from "@/utils/supabase/server";

export async function upsertArticles(feedData: Feeds, feed: any) {
  try {
    const supabase = createClient();

    const items = feed.items!.map((item: any) => ({
      feed_id: feedData.id,
      title: item.title ?? "",
      link: item.link ?? "",
      pub_date: item.pubDate ?? "",
      author: item.creator ?? item.author ?? "",
      content: item.content ?? "",
      content_snippet: item.contentSnippet ?? "",
      id_article: item.id ?? item.guid ?? "",
      iso_date: item.isoDate ?? "",
      categories: item.categories ?? "",
    }));

    const { data: upsertedArticles, error: upsertItemsError } = await supabase
      .from("articles")
      .upsert(items, { onConflict: "id_article" })
      .select();

    if (upsertItemsError) {
      console.log("Error upserting articles", upsertItemsError);
      throw new Error("Error upserting articles");
    }

    return upsertedArticles;
  } catch (error) {
    console.error("CREATE_FEED", error);
    return { error: "Fail to upsert articles" };
  }
}
