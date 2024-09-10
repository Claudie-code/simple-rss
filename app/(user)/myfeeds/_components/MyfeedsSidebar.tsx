"use client";

import { FeedsCount } from "@/types/collection";
import Sidebar from "./Sidebar";

export function MyfeedsSidebar({ feeds }: { feeds: FeedsCount[] }) {
  return (
    <div className="hidden lg:flex h-full w-80 flex-col fixed inset-y-0 z-50">
      <Sidebar feeds={feeds} setOpen={() => {}} />
    </div>
  );
}
