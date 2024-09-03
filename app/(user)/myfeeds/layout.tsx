import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getFeeds } from "@/actions/get-feeds";
import AuthButton from "@/components/auth/AuthButton";
import MyfeedsSidebar from "./_components/MyfeedsSidebar";
import { ReactNode } from "react";
import { headers } from "next/headers";
import TitleFeed from "./_components/TitleFeed";
import { MobileSidebar } from "./_components/FeedsMobileSidebar";
import { calculateDaysRemaining } from "@/utils/date";
import toast from "react-hot-toast";

export default async function MyFeedsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch customer data
  const { data: customer } = await supabase
    .from("customers")
    .select("has_access")
    .eq("user_id", user.id)
    .single();

  const hasAccess = customer?.has_access;

  // Calculate remaining trial days
  const daysRemaining = calculateDaysRemaining(new Date(user.created_at), 30);

  // Redirect if trial has ended and user doesn't have access
  if (daysRemaining <= 0 && !hasAccess) {
    return redirect("/settings/subscription");
  }

  const feeds = await getFeeds({
    userId: user.id,
  });

  return (
    <>
      <nav className="lg:pl-80 w-full flex justify-between border-b border-b-foreground/10 h-16 items-center p-3 lg:px-16 text-sm bg-slate-50">
        <div className="flex">
          <MobileSidebar feeds={feeds} />
          <TitleFeed feeds={feeds} />
        </div>
        <AuthButton />
      </nav>
      <div className="hidden lg:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <MyfeedsSidebar feeds={feeds} />
      </div>
      <main className="lg:pl-80 h-full flex flex-col">{children}</main>
    </>
  );
}
