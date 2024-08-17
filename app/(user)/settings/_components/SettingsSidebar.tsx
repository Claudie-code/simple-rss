"use client";

import { Download, Rss } from "lucide-react";
import { Feeds } from "@/types/collection";
import { SidebarItem } from "@/components/layout/SidebarItem";

export default function SettingsSidebar() {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6 pt-12">
        <h1 className="font-semibold text-xl">Settings</h1>
      </div>
      <SidebarItem
        setOpen={() => {}}
        icon={Rss}
        label="Subscriptions"
        href="/settings/subscriptions"
      />
      <SidebarItem
        setOpen={() => {}}
        icon={Download}
        label="Import/Export OPML"
        href="/settings/opml"
      />
    </div>
  );
}
