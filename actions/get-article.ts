import { Articles } from "@/types/collection";
import { createClient } from "@/utils/supabase/server";

export const getArticle = async ({
  feedId,
  articleId,
  userId,
}: {
  feedId: number;
  articleId: number;
  userId: string;
}): Promise<Articles | null> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .rpc("get_article_info", {
        p_user_id: userId,
        p_feed_id: feedId,
        p_article_id: articleId,
      })
      .single();

    if (error) {
      console.log("[GET_ARTICLE] Error fetching article", error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.log("[GET_ARTICLE]", error);
    return null;
  }
};
