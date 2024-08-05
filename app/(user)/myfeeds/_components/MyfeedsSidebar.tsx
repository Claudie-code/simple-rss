import { SidebarItem } from "./MyfeedsSidebarItem";
import AddFeedForm from "./AddFeedForm";
import { ChevronDown, Newspaper, Rss, Star } from "lucide-react";
import { Feeds, FeedWithArticles } from "@/types/collection";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function MyfeedsSidebar({
  feeds,
  selectedFeed,
  currentView,
}: {
  feeds: Feeds[];
  selectedFeed: FeedWithArticles;
  currentView: string;
}) {
  const [activeData, setActiveData] = useState(null);
  const [isFeedsOpen, setIsFeedsOpen] = useState(false);
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <AddFeedForm />
      </div>
      <div className="flex flex-col w-full">
        <SidebarItem
          icon={Newspaper}
          label="Unread"
          href="/myfeeds/unread"
          isActive={currentView === "unread"}
        />
        <SidebarItem
          icon={Star}
          label="Starred"
          href="/myfeeds/starred"
          isActive={currentView === "starred"}
        />

        <SidebarItem
          icon={Rss}
          label="Feeds"
          href="/myfeeds"
          chevron={true}
          isFeedsOpen={isFeedsOpen}
        />

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
                isActive={
                  selectedFeed?.id === feed.id && currentView === "articles"
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
