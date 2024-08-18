import { SubscriptionWithFeed } from "@/types/collection"; // Assume Feeds type is defined correctly
import { createClient } from "@/utils/supabase/server";

export const getSubscriptionsWithFeed = async ({
  userId,
}: {
  userId: string;
}): Promise<SubscriptionWithFeed[]> => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*, feeds (*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      console.log("[GET_FEEDS] Error fetching subscriptions", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.log("[GET_SUBSCRIPTION_WITH_FEED]", error);
    return [];
  }
};
