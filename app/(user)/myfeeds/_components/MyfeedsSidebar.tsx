"use client";

import { SidebarItem } from "./MyfeedsSidebarItem";
import AddFeedForm from "./AddFeedForm";
import { Newspaper, Star } from "lucide-react";
import { Feeds, FeedsCount } from "@/types/collection";
import { FeedsAccordion } from "./FeedsAccordion";

export default function MyfeedsSidebar({
  feeds,
  setOpen,
}: {
  feeds: FeedsCount[];
  setOpen?: Function;
}) {
  const totalUnread = feeds.reduce((sum, feed) => sum + feed.unread_count, 0);

  return (
    <div
      className="h-full flex flex-col overflow-y-auto bg-slate-50"
      style={{ boxShadow: "inset 0 2px 10px 0 rgb(0 0 0 / 0.15)" }}
    >
      <div className="p-6 pt-12">
        <h1 className="font-semibold text-2xl">My feeds</h1>
      </div>

      <div className="p-6 pt-0 lg:mt-0">
        <AddFeedForm />
      </div>
      <div className="flex flex-col w-full">
        <SidebarItem
          icon={Newspaper}
          label="Unread"
          unreadCount={totalUnread}
          href="/myfeeds/unread"
        />
        <SidebarItem icon={Star} label="Starred" href="/myfeeds/starred" />
        <FeedsAccordion feeds={feeds} />
      </div>
    </div>
  );
}
