import { Feeds } from "@/types/collection";
import { createClient } from "@/utils/supabase/server";

export async function upsertArticles(feedId: number, feed: any) {
  try {
    const supabase = createClient();

    const items = feed.items!.map((item: any) => ({
      feed_id: feedId,
      title: item.title ?? "",
      link: item.link ?? "",
      pub_date: item.pubDate ?? "",
      author: item.creator ?? item.author ?? "",
      content: item.content ?? "",
      content_snippet: item.contentSnippet ?? "",
      id_article: item.id ?? item.guid ?? "",
      iso_date: item.isoDate ?? "",
      categories: Array.isArray(item.categories)
        ? item.categories
        : typeof item.categories === "string"
        ? item.categories.split(",").map((cat: string) => cat.trim())
        : [],
    }));

    const { data: upsertedArticles, error: upsertItemsError } = await supabase
      .from("articles")
      .upsert(items, { onConflict: "id_article" })
      .select();
    console.log("upsertedArticles old feed", upsertedArticles);

    if (upsertItemsError) {
      console.log("Error upserting articles", upsertItemsError);
      throw new Error("Error upserting articles");
    }

    return { result: upsertedArticles };
  } catch (error) {
    console.error("CREATE_FEED", error);
    return { error: "Fail to upsert articles" };
  }
}
