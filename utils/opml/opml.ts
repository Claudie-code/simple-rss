import { SubscriptionWithFeed } from "@/types/collection";
import { Builder, parseStringPromise } from "xml2js";

const buildOutline = (subscriptions: SubscriptionWithFeed[]) => {
  return subscriptions.map((sub) => ({
    $: {
      text: sub.feeds?.title || "No title",
      title: sub.feeds?.title || "No title",
      type: "rss",
      xmlUrl: sub.feeds?.url || "",
      htmlUrl: sub.feeds?.link || "",
    },
  }));
};

// Function to export subscriptions to OPML format
export const exportToOPML = (subscriptions: SubscriptionWithFeed[]): string => {
  const opml = {
    opml: {
      $: { version: "2.0" },
      head: [{ title: "Subscriptions" }],
      body: [
        {
          outline: buildOutline(subscriptions),
        },
      ],
    },
  };

  const builder = new Builder();
  return builder.buildObject(opml);
};

// Recursive function to extract feeds from OPML outline
const extractFeeds = (
  outline: any
): { title: string; url: string; link: string }[] => {
  let feeds: { title: string; url: string; link: string }[] = [];

  if (outline.$.type === "rss" && outline.$.xmlUrl) {
    feeds.push({
      title: outline.$.title || outline.$.text || "",
      url: outline.$.xmlUrl || "",
      link: outline.$.htmlUrl || "",
    });
  }

  if (outline.outline) {
    for (const subOutline of outline.outline) {
      feeds = feeds.concat(extractFeeds(subOutline));
    }
  }

  return feeds;
};

// Function to import subscriptions from OPML format
export const importFromOPML = async (opmlContent: string) => {
  const result = await parseStringPromise(opmlContent);
  const outlines = result.opml.body[0].outline;
  let feeds: { title: string; url: string; link: string }[] = [];

  for (const outline of outlines) {
    feeds = feeds.concat(extractFeeds(outline));
  }

  return feeds;
};
