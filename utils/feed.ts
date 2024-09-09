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
  // Essayer de parser l'URL principale
  let { feed, error } = await fetchAndParseFeed(url);
  if (feed) return { feed, correctUrl: null };

  // Essayer de parser le `link` si fourni
  if (link) {
    ({ feed, error } = await fetchAndParseFeed(link));
    if (feed) return { feed, correctUrl: null };
  }

  // Si aucune des deux URL n'a fonctionné, essayer de trouver un flux RSS via rssFinder pour `url`
  let rssFeedUrl: string | undefined;
  ({ feedUrl: rssFeedUrl, error } = await findRssFeed(url));
  if (rssFeedUrl) {
    ({ feed, error } = await fetchAndParseFeed(rssFeedUrl));
    if (feed) return { feed, correctUrl: rssFeedUrl };
  }

  // Si l'URL principale n'a pas fonctionné, essayer rssFinder sur `link`
  if (link) {
    let rssFeedUrlFromLink: string | undefined;
    ({ feedUrl: rssFeedUrlFromLink, error } = await findRssFeed(link));
    if (rssFeedUrlFromLink) {
      ({ feed, error } = await fetchAndParseFeed(rssFeedUrlFromLink));
      if (feed) return { feed, correctUrl: rssFeedUrlFromLink };
    }
  }

  // Si rien n'a fonctionné, renvoyer une erreur
  console.error(`Error fetching feed from ${url} (or ${link}):`, error);
  return {
    error: `Feed URL ${url} (or ${link}) is invalid or unreachable.`,
  };
}
