import { Feeds, Articles, FeedWithArticles } from "@/types/collection";
import { createClient } from "@/utils/supabase/server";

export const getFeeds = async ({
  userId,
}: {
  userId: string;
}): Promise<FeedWithArticles[]> => {
  try {
    const supabase = createClient();

    const { data: subscriptions, error: subsError } = await supabase
      .from("subscriptions")
      .select("feed_id")
      .eq("user_id", userId)
      .eq("is_active", true);

    if (subsError) {
      console.log("[GET_FEEDS] Error fetching subscriptions", subsError);
      return [];
    }

    const feedIds = subscriptions?.map((sub) => sub.feed_id) || [];

    const { data: feeds, error: feedsError } = await supabase
      .from("feeds")
      .select("*, articles (*)")
      .in("id", feedIds);

    if (feedsError) {
      console.log("[GET_FEEDS] Error fetching feeds and articles", feedsError);
      return [];
    }

    return feeds || [];
  } catch (error) {
    console.log("[GET_FEEDS]", error);
    return [];
  }
};
