import { createClient } from "@/utils/supabase/server";
import { ArticlesView } from "./_components/ArticlesView";
import { redirect } from "next/navigation";
import { getLastArticles } from "@/actions/get-last-articles";

export default async function MyFeeds() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const lastArticles = await getLastArticles({ userId: user.id });

  return <ArticlesView items={lastArticles} userId={user.id} />;
}
