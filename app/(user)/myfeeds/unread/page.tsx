import { getUnread } from "@/actions/get-unread";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ArticlesView } from "../_components/ArticlesView";

export default async function Unread({
  params,
}: {
  params: { feedId: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const articles = await getUnread({ userId: user.id });

  return (
    <ArticlesView
      items={articles}
      userId={user.id}
      functionFetchMore="getUnread"
    />
  );
}
