import Parser from "rss-parser";
import rssFinder from "rss-finder";

const parser = new Parser({
  customFields: {
    item: [
      "creator",
      "guid",
      "categories",
      "thumb",
      "image",
      ["content:encoded", "fullContent"],
      ["media:content", "mediaContent", { keepArray: true }],
    ],
  },
});

export async function fetchAndParseFeed(
  url: string
): Promise<Parser.Output<any> | null> {
  try {
    return await parser.parseURL(url);
  } catch (error) {
    console.error(`Error parsing feed from ${url}`, error);
    return null;
  }
}

export async function findRssFeed(url: string): Promise<string | null> {
  try {
    const result = await rssFinder(url);
    if (result.feedUrls && result.feedUrls.length > 0) {
      return result.feedUrls[0].url; // Returning the first found feed URL
    }
    return null;
  } catch (error) {
    console.error(`Error finding RSS feed from ${url}`, error);
    return null;
  }
}

interface GetFeedResult {
  feed?: Parser.Output<any>;
  error?: string;
  correctUrl?: string | null;
}

export async function getFeed(
  url: string,
  link?: string
): Promise<GetFeedResult> {
  // Try fetching the feed directly from the URL
  let feed = await fetchAndParseFeed(url);

  if (feed) {
    return { feed, correctUrl: null };
  }

  // Try to find RSS feed using rss-finder for the URL
  const rssFeedUrl = await findRssFeed(url);
  if (rssFeedUrl) {
    feed = await fetchAndParseFeed(rssFeedUrl);
    if (feed) {
      return { feed, correctUrl: rssFeedUrl };
    }
  }

  // If still no feed found, try the link if provided
  if (link) {
    feed = await fetchAndParseFeed(link);

    if (feed) {
      return { feed, correctUrl: null };
    }

    const rssFeedUrlFromLink = await findRssFeed(link);
    if (rssFeedUrlFromLink) {
      feed = await fetchAndParseFeed(rssFeedUrlFromLink);
      if (feed) {
        return { feed, correctUrl: rssFeedUrlFromLink };
      }
    }
  }

  return {
    error: `Feed URL ${url} (or ${link}) is invalid or unreachable`,
  };
}
