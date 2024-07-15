import { createClient } from "@/utils/supabase/client";

export const getFeeds = async ({ userId }: { userId: string }) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("feeds").select("*");

    if (error) {
      console.log("[GET_FEEDS]", error);
      return [];
    }

    if (data) {
      return data;
    }
  } catch (error) {
    console.log("[GET_FEEDS]", error);
    return [];
  }
};
