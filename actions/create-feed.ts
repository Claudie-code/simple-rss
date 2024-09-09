import { createClient } from "@/utils/supabase/server";
import { getFeed } from "@/utils/feed";
import { upsertArticles } from "./upsert-articles";
import { fetchFavicon } from "@/utils/favicon";

interface Feed {
  link: string;
  title: string;
  id: number;
  url: string;
  correct_url: string | null;
}

async function upsertFeed(
  supabase: any,
  feed: any,
  url: string,
  correctUrl: string | null
): Promise<Feed> {
  const { data: existingFeed, error: feedSelectError } = await supabase
    .from("feeds")
    .select("*")
    .eq("url", url)
    .single();

  if (feedSelectError) {
    console.log("No existing feed", feedSelectError);
  }

  let feedData: Feed;
  if (!existingFeed) {
    const faviconURL = await fetchFavicon(feed.link);

    const { data: newFeedData, error: feedInsertError } = await supabase
      .from("feeds")
      .insert({
        link: feed.link,
        title: feed.title,
        url,
        image_url: faviconURL,
        language: feed.language,
        description: feed.description,
        correct_url: correctUrl || null, // Insert correct_url if available
      })
      .select("*")
      .single();

    if (feedInsertError) {
      console.log("Error adding new feed", feedInsertError);
      throw new Error("Error adding new feed");
    }

    feedData = newFeedData;
  } else {
    // Update correct_url if it's found
    if (correctUrl && existingFeed.correct_url !== correctUrl) {
      const { data: updatedFeedData, error: feedUpdateError } = await supabase
        .from("feeds")
        .update({ correct_url: correctUrl })
        .eq("id", existingFeed.id)
        .select()
        .single();

      if (feedUpdateError) {
        console.log("Error updating feed", feedUpdateError);
        throw new Error("Error updating feed");
      }

      feedData = updatedFeedData;
    } else {
      feedData = existingFeed;
    }
  }

  return feedData;
}

async function upsertSubscription(
  supabase: any,
  feedId: number,
  userId: string
) {
  const { error: subscriptionUpsertError } = await supabase
    .from("subscriptions")
    .upsert(
      {
        feed_id: feedId,
        user_id: userId,
        is_active: true,
      },
      { onConflict: "feed_id,user_id" }
    );

  if (subscriptionUpsertError) {
    console.log("Error upserting subscription", subscriptionUpsertError);
    throw new Error("Error upserting subscription");
  }
}

interface CreateFeedParams {
  url: string;
  userId: string;
  link?: string;
}

export async function createFeed({ url, userId, link }: CreateFeedParams) {
  try {
    const supabase = createClient();

    const { feed, error, correctUrl } = await getFeed(url, link);
    if (error || !feed) {
      return { error: error };
    }

    const feedData = await upsertFeed(supabase, feed, url, correctUrl!);
    await upsertSubscription(supabase, feedData.id, userId);

    const articles = await upsertArticles(feedData.id, feed);

    return {
      feed: feedData,
      articles: articles,
    };
  } catch (error) {
    console.error("CREATE_FEED", error);
    return { error: "Fail to create feed" };
  }
}
