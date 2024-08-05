"use client";

import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarItemProps {
  label: string;
  href: string;
  icon?: LucideIcon;
  chevron?: boolean;
  isActive?: boolean;
  isFeeds?: boolean;
  isFeedsOpen?: boolean;
}

export const SidebarItem = ({
  label,
  href,
  icon: Icon,
  chevron,
  isActive,
  isFeeds,
  isFeedsOpen,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      type="button"
      className={cn(
        "w-full flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-teal-700 bg-teal-200/20 hover:bg-teal-200/20 hover:text-teal-700",
        isFeeds && "pl-12"
      )}
    >
      <div className="flex items-center gap-x-2 py-4 grow overflow-hidden">
        {Icon && (
          <Icon
            size={22}
            className={cn("text-slate-500", isActive && "text-teal-700")}
          />
        )}
        <span className="truncate text-ellipsis whitespace-nowrap">
          {label}
        </span>
      </div>
      {chevron && (isFeedsOpen ? <ChevronUp /> : <ChevronDown />)}
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-teal-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </Link>
  );
};
