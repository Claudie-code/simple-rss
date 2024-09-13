"use client";

import { Download, Rss, DollarSign } from "lucide-react";
import { Feeds } from "@/types/collection";
import { SidebarItem } from "./SidebarItem";

export default function SettingsSidebar({ setOpen }: { setOpen: Function }) {
  return (
    <div
      className="h-full flex flex-col overflow-y-auto bg-slate-50 shadow-sm "
      style={{ boxShadow: "inset 0 2px 10px 0 rgb(0 0 0 / 0.15)" }}
    >
      <div className="p-6 pt-12">
        <h1 className="font-semibold text-2xl">Settings</h1>
      </div>
      <SidebarItem
        setOpen={setOpen}
        icon={Rss}
        label="Manage Feeds"
        href="/settings/feeds"
      />
      <SidebarItem
        setOpen={setOpen}
        icon={Download}
        label="Import/Export OPML"
        href="/settings/opml"
      />
      <SidebarItem
        setOpen={setOpen}
        icon={DollarSign}
        label="Subscription"
        href="/settings/subscription"
      />
    </div>
  );
}
