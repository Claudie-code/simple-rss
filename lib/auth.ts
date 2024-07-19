import { createClient } from "@/utils/supabase/server";

export const getRequiredAuthSession = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  return user;
};
