"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateSubscription(
  subscriptionId: number,
  isActive: boolean
) {
  const supabase = createClient();

  const { error } = await supabase
    .from("subscriptions")
    .update({ is_active: isActive })
    .eq("id", subscriptionId);

  if (error) {
    console.log("[UPDATE_SUBSCRIPTION] Error updating subscription", error);
    throw new Error("Error updating subscription");
  }

  revalidatePath("/settings/subscriptions");
}
