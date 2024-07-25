import { createClient } from "@/utils/supabase/server";
import Parser from "rss-parser";
import rssFinder from "rss-finder";

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

async function fetchAndParseFeed(url: string) {
  try {
    return await parser.parseURL(url);
  } catch (error) {
    console.error(`Error parsing feed from ${url}`, error);
    return null;
  }
}

async function findRssFeed(url: string) {
  try {
    const result = await rssFinder(url);
    if (result.feedUrls && result.feedUrls.length > 0) {
      return result.feedUrls[0].url; // Returning the first found feed URL
    }
    return null;
  } catch (error) {
    console.error(`Error finding RSS feed from ${url}`, error);
    return null;
  }
}

export async function createFeed({
  url,
  userId,
  link,
}: {
  url: string;
  userId: string;
  link?: string;
}) {
  try {
    const supabase = createClient();

    // Try fetching the feed directly from the URL
    let feed = await fetchAndParseFeed(url);

    if (!feed) {
      // Try to find RSS feed using rss-finder for the URL
      const rssFeedUrl = await findRssFeed(url);
      if (rssFeedUrl) {
        feed = await fetchAndParseFeed(rssFeedUrl);
      }

      // If still no feed found, try the link if provided
      if (!feed && link) {
        feed = await fetchAndParseFeed(link);

        if (!feed) {
          const rssFeedUrlFromLink = await findRssFeed(link);
          if (rssFeedUrlFromLink) {
            feed = await fetchAndParseFeed(rssFeedUrlFromLink);
          }
        }
      }
    }

    if (!feed) {
      return {
        error: `Feed URL ${url} (or ${link}) is invalid or unreachable`,
      };
    }

    if (!feed.link) {
      console.log("Feed not found", feed);
      return { error: "Feed not found" };
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
        return { error: "Error adding new feed" };
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
          user_id: userId,
          is_active: true,
        },
        { onConflict: "feed_id,user_id" }
      );

    if (subscriptionUpsertError) {
      console.log("Error upserting subscription", subscriptionUpsertError);
      return { error: "Error upserting subscription" };
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
      return { error: "Error upserting articles" };
    }

    return {
      feed: feedData,
      articles: articles,
    };
  } catch (error) {
    console.error("CREATE_FEED", error);
    return { error: "Fail to create feed" };
  }
}
