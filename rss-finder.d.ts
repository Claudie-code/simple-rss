declare module "rss-finder" {
  interface FeedUrl {
    title: string;
    url: string;
  }

  interface RssFinderResult {
    site: {
      title: string;
      favicon: string;
      url: string;
    };
    feedUrls: FeedUrl[];
  }

  function rssFinder(url: string): Promise<RssFinderResult>;
  function rssFinder(options: { url: string }): Promise<RssFinderResult>;

  export = rssFinder;
}
