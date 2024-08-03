import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getFeeds } from "@/actions/get-feeds";
import Myfeeds from "./_components/MyFeeds";
import AuthButton from "@/components/auth/AuthButton";

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
    <>
      <nav className="w-full flex justify-end border-b border-b-foreground/10 h-16 items-center p-3 px-16 text-sm">
        <AuthButton />
      </nav>
      <Myfeeds feeds={feeds} />
    </>
  );
}
