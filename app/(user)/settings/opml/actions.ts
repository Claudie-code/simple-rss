"use server";

import { importFromOPML } from "@/utils/opml/opml";
import { createFeed } from "@/actions/create-feed";

export async function importOPMLFeeds(opmlContent: string, userId: string) {
  const feeds = await importFromOPML(opmlContent);

  for (const feed of feeds) {
    const result = await createFeed({
      url: feed.url,
      userId: userId,
      link: feed.link,
    });

    if (result.error) {
      console.log("Error importing feed", result.error);
      throw new Error(result.error);
    }
  }
  console.log("Feeds created");
}
