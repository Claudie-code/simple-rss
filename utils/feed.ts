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
): Promise<{ feed?: Parser.Output<any>; error?: string }> {
  try {
    const feed = await parser.parseURL(url);
    return { feed };
  } catch (error) {
    console.error(`Error parsing feed from ${url}:`, error);
    return { error: `Feed URL ${url} is invalid or unreachable.` };
  }
}

export async function findRssFeed(
  url: string
): Promise<{ feedUrl?: string; error?: string }> {
  try {
    const result = await rssFinder(url);
    if (result.feedUrls && result.feedUrls.length > 0) {
      return { feedUrl: result.feedUrls[0].url };
    }
    return { error: `No RSS feed found for URL ${url}.` };
  } catch (error) {
    console.error(`Error finding RSS feed from ${url}:`, error);
    return { error: `Error finding RSS feed from ${url}.` };
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
  let { feed, error } = await fetchAndParseFeed(url);

  if (feed) {
    return { feed, correctUrl: null };
  }

  // Try to find RSS feed using rss-finder for the URL
  const { feedUrl: rssFeedUrl, error: findError } = await findRssFeed(url);
  if (rssFeedUrl) {
    ({ feed, error } = await fetchAndParseFeed(rssFeedUrl));
    if (feed) {
      return { feed, correctUrl: rssFeedUrl };
    }
  }

  // If still no feed found, try the link if provided
  if (link) {
    ({ feed, error } = await fetchAndParseFeed(link));

    if (feed) {
      return { feed, correctUrl: null };
    }

    const { feedUrl: rssFeedUrlFromLink, error: findErrorFromLink } =
      await findRssFeed(link);
    if (rssFeedUrlFromLink) {
      ({ feed, error } = await fetchAndParseFeed(rssFeedUrlFromLink));
      if (feed) {
        return { feed, correctUrl: rssFeedUrlFromLink };
      }
    }
  }

  console.error(
    `Error fetching feed from ${url} (or ${link}):`,
    error || findError
  );
  return {
    error: `Feed URL ${url} (or ${link}) is invalid or unreachable.`,
  };
}
