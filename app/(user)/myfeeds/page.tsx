import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getFeeds } from "@/actions/get-feeds";
import MyFeeds from "./_components/MyFeeds";

export default async function MyFeedsLayout() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const feeds = await getFeeds({
    userId: user.id,
  });

  return (
    <div className="max-w-4xl">
      <MyFeeds feeds={feeds} />
    </div>
  );
}
