"use client";

import { Feeds, FeedsCount } from "@/types/collection";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function TitleFeed({ feeds }: { feeds: FeedsCount[] }) {
  const pathname = usePathname();
  let title = "Latest Articles"; // Default title
  let imageUrl = ""; // Default image URL

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
        const feed = feeds.find((feed) => feed.id.toString() === pathSegment);
        if (feed) {
          title = feed.title || title;
          imageUrl = feed.image_url || ""; // Assuming `image_url` is the field in `FeedsCount`
        }
    }
  }

  return (
    <div className="flex items-center lg:ml-4 truncate">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`${title} feed image`}
          width={20}
          height={20}
          className="mr-2 rounded"
        />
      )}
      <div className="font-semibold text-xl truncate">{title}</div>
    </div>
  );
}
