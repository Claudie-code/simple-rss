import {
  Feeds,
  Articles,
  FeedWithArticles,
  FeedsWithArticlesFavoritesHistory,
} from "@/types/collection";
import { createClient } from "@/utils/supabase/server";

export const getFeeds = async ({
  userId,
}: {
  userId: string;
}): Promise<Feeds[]> => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .rpc("get_user_feeds", {
        p_user_id: userId,
      })
      .select();

    if (error) {
      console.log("[GET_FEEDS] Error fetching feeds", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.log("[GET_FEEDS]", error);
    return [];
  }
};
