"use client";

import { SidebarItem } from "./MyfeedsSidebarItem";
import AddFeedForm from "./AddFeedForm";
import { Newspaper, Star } from "lucide-react";
import { Feeds } from "@/types/collection";
import { FeedsAccordion } from "./FeedsAccordion";

export default function MyfeedsSidebar({ feeds }: { feeds: Feeds[] }) {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <AddFeedForm />
      </div>
      <div className="flex flex-col w-full">
        <SidebarItem icon={Newspaper} label="Unread" href="/myfeeds/unread" />
        <SidebarItem icon={Star} label="Starred" href="/myfeeds/starred" />
        <FeedsAccordion feeds={feeds} />
      </div>
    </div>
  );
}
