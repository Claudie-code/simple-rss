import {
  Feeds,
  Articles,
  FeedWithArticles,
  FeedsWithArticlesFavoritesHistory,
} from "@/types/collection";
import { createClient } from "@/utils/supabase/server";

export const getLastArticles = async ({
  userId,
}: {
  userId: string;
}): Promise<Articles[]> => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .rpc("get_latest_articles", {
        p_user_id: userId,
      })
      .select();

    if (error) {
      console.log("[GET_LAST_ARTICLES] Error fetching last articles", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.log("[GET_LAST_ARTICLES]", error);
    return [];
  }
};
