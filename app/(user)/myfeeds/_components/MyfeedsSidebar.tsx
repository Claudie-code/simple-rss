import { SidebarItem } from "./MyfeedsSidebarItem";
import AddFeedForm from "./AddFeedForm";
import { ChevronDown, Newspaper, Rss, Star } from "lucide-react";
import { FeedWithArticles } from "@/types/collection";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function MyfeedsSidebar({
  feeds,
  showView,
  selectedFeed,
}: {
  feeds: FeedWithArticles[];
  showView: Function;
  selectedFeed: FeedWithArticles;
}) {
  const [feedsData, setFeedsData] = useState([]);
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
          onClick={() => setActiveData(null)}
        />
        <SidebarItem
          icon={Star}
          label="Starred"
          onClick={() => setActiveData(null)}
        />

        <SidebarItem
          icon={Rss}
          label="Feeds"
          onClick={() => setIsFeedsOpen(!isFeedsOpen)}
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
            console.log("selectedFeed", selectedFeed);
            return (
              <SidebarItem
                key={feed.title}
                label={feed.title!}
                onClick={() => showView("articles", feed)}
                isFeeds={true}
                isActive={selectedFeed?.id === feed.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
