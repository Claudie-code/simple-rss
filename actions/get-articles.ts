import { createClient } from "@/utils/supabase/server";
import { Articles } from "@/types/collection";
import { revalidateTag } from "next/cache";

export const getArticlesFromFeed = async ({
  userId,
  feedId,
}: {
  userId: string;
  feedId: number;
}): Promise<Articles[]> => {
  try {
    const supabase = createClient();

    revalidateTag(`feed-${feedId}`);

    const { data, error } = await supabase.rpc("get_articles_from_feed", {
      p_user_id: userId,
      p_feed_id: feedId,
    });

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
