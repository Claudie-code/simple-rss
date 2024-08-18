import { createClient } from "@/utils/supabase/server";
import { Articles } from "@/types/collection";

export const getArticlesFromFeed = async ({
  userId,
  feedId,
  offset = 0,
}: {
  userId: string;
  feedId: number;
  offset?: number;
}): Promise<Articles[]> => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .rpc("get_articles_from_feed", {
        p_user_id: userId,
        p_feed_id: feedId,
      })
      .range(offset, offset + 100 - 1);

    if (error) {
      console.log("[GET_ARTICLES_FROM_FEED] Error fetching articles", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.log("[GET_ARTICLES_FROM_FEED]", error);
    return [];
  }
};
