import {
  Feeds,
  Articles,
  FeedWithArticles,
  FeedsWithArticlesFavoritesHistory,
} from "@/types/collection";
import { createClient } from "@/utils/supabase/server";

export const getLastArticles = async ({
  userId,
  offset = 0,
}: {
  userId: string;
  offset?: number;
}): Promise<Articles[]> => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .rpc("get_latest_articles", {
        p_user_id: userId,
      })
      .select()
      .range(offset, offset + 100 - 1);

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
