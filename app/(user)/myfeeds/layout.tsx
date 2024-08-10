import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getFeeds } from "@/actions/get-feeds";
import AuthButton from "@/components/auth/AuthButton";
import MyfeedsSidebar from "./_components/MyfeedsSidebar";
import { ReactNode } from "react";

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
      <nav className="w-full flex justify-end border-b border-b-foreground/10 h-16 items-center p-3 px-16 text-sm">
        <AuthButton />
      </nav>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <MyfeedsSidebar feeds={feeds} />
      </div>
      <main className="md:pl-80 h-full flex flex-col">{children}</main>
    </>
  );
}
