import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ArticlesView } from "../_components/ArticlesView";
import { getStarred } from "@/actions/get-starred";
import AuthButton from "@/components/auth/AuthButton";

export default async function Starred() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const articles = await getStarred({ userId: user.id });

  return <ArticlesView items={articles} userId={user.id} />;
}
