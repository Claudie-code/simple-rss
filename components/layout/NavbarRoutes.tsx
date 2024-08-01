"use client";

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const isSettingsPage = pathname?.startsWith("/settings");
  const isMyfeedsPage = pathname?.startsWith("/myfeeds");
  const isHomePage = pathname === "/";

  if (isMyfeedsPage) {
    return (
      <Link href="/formations">
        <Button
          size="sm"
          variant="ghost"
          className={`text-slate-700 ml-4 ${
            isMyfeedsPage && "text-teal-700 hover:text-teal-900"
          }`}
        >
          <Settings className="mr-1" />
          Settings
        </Button>
      </Link>
    );
  }

  // return <AuthButton />;
};
