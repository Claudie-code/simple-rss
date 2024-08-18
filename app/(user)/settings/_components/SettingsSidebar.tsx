"use client";

import { Download, Rss } from "lucide-react";
import { Feeds } from "@/types/collection";
import { SidebarItem } from "@/components/layout/SidebarItem";

export default function SettingsSidebar() {
  return (
    <div
      className="h-full flex flex-col overflow-y-auto bg-gray-100 shadow-sm "
      style={{ boxShadow: "inset 0 2px 10px 0 rgb(0 0 0 / 0.15)" }}
    >
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
