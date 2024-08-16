import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getFeeds } from "@/actions/get-feeds";
import AuthButton from "@/components/auth/AuthButton";
import MyfeedsSidebar from "./_components/MyfeedsSidebar";
import { ReactNode } from "react";
import { headers } from "next/headers";
import TitleFeed from "./_components/TitleFeed";

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

  const feeds = await getFeeds({
    userId: user.id,
  });

  return (
    <>
      <nav className="md:pl-80 w-full flex justify-between border-b border-b-foreground/10 h-16 items-center p-3 px-16 text-sm">
        <TitleFeed feeds={feeds} />
        <AuthButton />
      </nav>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <MyfeedsSidebar feeds={feeds} />
      </div>
      <main className="md:pl-80 h-full flex flex-col">{children}</main>
    </>
  );
}
