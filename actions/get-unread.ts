import { Articles, Feeds } from "@/types/collection";
import { createClient } from "@/utils/supabase/server";

export const getUnread = async ({
  userId,
}: {
  userId: string;
}): Promise<Articles[]> => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.rpc("get_unread_articles", {
      p_user_id: userId,
    });

    if (error) {
      console.log("[GET_UNREAD] Error fetching articles", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.log("[GET_UNREAD]", error);
    return [];
  }
};
