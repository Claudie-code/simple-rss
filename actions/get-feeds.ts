import { Feeds, FeedsCount } from "@/types/collection";
import { createClient } from "@/utils/supabase/server";

export const getFeeds = async ({
  userId,
}: {
  userId: string;
}): Promise<FeedsCount[]> => {
  try {
    const supabase = createClient();

    // const { data, error } = await supabase
    //   .from("subscriptions")
    //   .select(
    //     `
    //     feeds (*)
    //   `
    //   )
    //   .eq("user_id", userId)
    //   .eq("is_active", true);

    const { data, error } = await supabase.rpc("get_unread_articles_count", {
      p_user_id: userId,
    });

    if (error) {
      console.log("[GET_FEEDS] Error fetching feeds", error);
      return [];
    }

    // Extraire les objets feeds des résultats

    return data || [];
  } catch (error) {
    console.log("[GET_FEEDS]", error);
    return [];
  }
};
