"use client";

import { Rss } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./MyfeedsSidebarItem";
import { Feeds } from "@/types/collection";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  feeds: Feeds[];
}

export const FeedsAccordion = ({ feeds }: SidebarItemProps) => {
  const pathname = usePathname();
  const isArticlePath = !!pathname.match(/^\/myfeeds\/\d+\/articles\/\d+$/);

  const [isFeedsOpen, setIsFeedsOpen] = useState(isArticlePath || false);

  useEffect(() => {
    // Ouvrir le panneau si nous sommes sur un article ou un feed spécifique
    if (isArticlePath) {
      setIsFeedsOpen(true);
    } else {
      setIsFeedsOpen(false);
    }
  }, [pathname, isArticlePath]);

  return (
    <>
      <div onClick={() => setIsFeedsOpen(!isFeedsOpen)} className="flex">
        <SidebarItem
          icon={Rss}
          label="Feeds"
          href="/myfeeds"
          chevron={true}
          isFeedsOpen={isFeedsOpen}
        />
      </div>
      <div
        className={cn(
          "flex flex-col transition-all duration-300 overflow-hidden border-l border-gray-300 w-full",
          isFeedsOpen ? "max-h-screen" : "max-h-0"
        )}
      >
        {feeds.map((feed) => {
          return (
            <SidebarItem
              key={feed.title}
              label={feed.title!}
              href={"/myfeeds/" + feed.id}
              isFeeds={true}
            />
          );
        })}
      </div>
    </>
  );
};
