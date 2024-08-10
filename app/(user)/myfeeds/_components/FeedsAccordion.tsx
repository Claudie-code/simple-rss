"use client";

import { ChevronDown, ChevronUp, LucideIcon, Rss } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./MyfeedsSidebarItem";
import { Feeds } from "@/types/collection";
import { useState } from "react";

interface SidebarItemProps {
  feeds: Feeds[];
  isFeedsOpen?: boolean;
}

export const FeedsAccordion = ({ feeds }: SidebarItemProps) => {
  const [isFeedsOpen, setIsFeedsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsFeedsOpen(!isFeedsOpen)}>
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
          "transition-all duration-300 overflow-hidden border-l border-gray-300 w-full",
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
