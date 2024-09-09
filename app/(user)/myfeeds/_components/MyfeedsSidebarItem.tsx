"use client";

import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface SidebarItemProps {
  label: string;
  href: string;
  icon?: LucideIcon;
  chevron?: boolean;
  isFeeds?: boolean;
  isFeedsOpen?: boolean;
  unreadCount?: number;
  image?: string;
}

export const SidebarItem = ({
  label,
  href,
  icon: Icon,
  chevron,
  isFeeds,
  isFeedsOpen,
  unreadCount,
  image,
}: SidebarItemProps) => {
  const pathname = usePathname();

  const isArticlePath = pathname.match(/^\/myfeeds\/\d+\/articles\/\d+$/);

  const isActive =
    pathname === href ||
    (isArticlePath && pathname.split("/").slice(0, -2).join("/") === href);

  return (
    <Link
      href={href}
      type="button"
      className={cn(
        "w-full flex items-center gap-x-2 text-slate-600 text-sm font-[500] pl-6 transition-all hover:text-slate-700 hover:bg-slate-400/20",
        isActive &&
          "text-blue-700 bg-blue-200/20 hover:bg-blue-200/20 hover:text-blue-700",
        isFeeds && ""
      )}
      title={label}
    >
      <div className="flex items-center gap-x-2 py-3 grow overflow-hidden">
        {Icon && (
          <Icon
            size={22}
            className={cn("text-slate-600", isActive && "text-blue-700")}
          />
        )}
        <div className="flex items-center">
          {isFeeds && image && (
            <img
              src={image}
              alt={"favicon " + label}
              width={25}
              height={25}
              className="mr-1 h-4 w-4"
            />
          )}
          {isFeeds && !image && <div className="h-4 w-4 mr-1 bg-white"></div>}
          <span
            className={cn(
              "truncate text-ellipsis whitespace-nowrap",
              isFeeds && "font-normal"
            )}
          >
            {label}
          </span>
        </div>
      </div>
      {chevron &&
        (isFeedsOpen || isArticlePath ? <ChevronUp /> : <ChevronDown />)}
      {unreadCount && (
        <span className="font-semibold p-1 px-2 bg-slate-200 rounded-full text-xs">
          {unreadCount}
        </span>
      )}
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-blue-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </Link>
  );
};
