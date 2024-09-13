"use client";

import SettingsSidebar from "./SettingsSidebar";

export function Sidebar() {
  return (
    <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
      <SettingsSidebar setOpen={() => {}} />
    </div>
  );
}
