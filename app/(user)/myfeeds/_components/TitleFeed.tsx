"use client";

import { Feeds, FeedsCount } from "@/types/collection";
import { usePathname } from "next/navigation";

export default function TitleFeed({ feeds }: { feeds: FeedsCount[] }) {
  const pathname = usePathname();
  let title = "Latest Articles"; // Default title

  if (pathname) {
    const pathSegment = pathname.split("/")[2];

    switch (pathSegment) {
      case "starred":
        title = "Starred";
        break;
      case "unread":
        title = "Unread";
        break;
      default:
        title =
          feeds.find((feed) => feed.id.toString() === pathSegment)?.title ||
          title;
    }
  }

  return <div className="font-semibold text-xl ml-4 truncate">{title}</div>;
}
