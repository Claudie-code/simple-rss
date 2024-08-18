"use client";

import { SidebarItem } from "./MyfeedsSidebarItem";
import AddFeedForm from "./AddFeedForm";
import { Newspaper, Star } from "lucide-react";
import { Feeds } from "@/types/collection";
import { FeedsAccordion } from "./FeedsAccordion";

export default function MyfeedsSidebar({
  feeds,
  setOpen,
}: {
  feeds: Feeds[];
  setOpen?: Function;
}) {
  return (
    <div
      className="h-full flex flex-col overflow-y-auto bg-gray-100"
      style={{ boxShadow: "inset 0 2px 10px 0 rgb(0 0 0 / 0.15)" }}
    >
      <div className="p-6 mt-6 lg:mt-0">
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
