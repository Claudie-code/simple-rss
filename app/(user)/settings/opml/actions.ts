"use server";

import { importFromOPML } from "@/utils/opml/opml";
import { createFeed } from "@/actions/create-feed";

export async function importOPMLFeeds(opmlContent: string, userId: string) {
  const feeds = await importFromOPML(opmlContent);
  const errors = [];

  for (const feed of feeds) {
    try {
      const result = await createFeed({
        url: feed.url,
        userId: userId,
        link: feed.link,
      });

      if (result.error) {
        console.log("Error importing feed", result.error);
        errors.push({ feed: feed.url, error: result.error });
      } else {
        console.log("Successfully imported feed", feed.url);
      }
    } catch (error) {
      console.log("Unexpected error importing feed", error);
      errors.push({ feed: feed.url, error: "Unexpected error importing feed" });
    }
  }

  console.log("Feeds import process completed");
  return errors;
}
