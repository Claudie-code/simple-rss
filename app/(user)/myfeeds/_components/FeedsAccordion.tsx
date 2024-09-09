"use client";

import { Rss } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./MyfeedsSidebarItem";
import { Feeds, FeedsCount } from "@/types/collection";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

interface SidebarItemProps {
  feeds: FeedsCount[];
}

export const FeedsAccordion = ({ feeds }: SidebarItemProps) => {
  const pathname = usePathname();
  const isArticlePath = !!pathname.match(/^\/myfeeds\/\d+\/articles\/\d+$/);
  const isFeedPath = !!pathname.match(/^\/myfeeds\/\d+$/);

  const [isFeedsOpen, setIsFeedsOpen] = useState(isArticlePath || false);

  useEffect(() => {
    if (isArticlePath || isFeedPath) {
      setIsFeedsOpen(true);
    } else {
      setIsFeedsOpen(false);
    }
  }, [pathname, isArticlePath, isFeedPath]);

  return (
    <>
      <Separator className="my-4 w-72 mx-auto" />
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
          "flex flex-col transition-all duration-300 overflow-hidden w-full mb-8",
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
              unreadCount={feed.unread_count}
              image={feed.image_url}
            />
          );
        })}
      </div>
    </>
  );
};
