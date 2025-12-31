import { Tables } from "./supabase";

export type Articles = Tables<"articles">;
export type Feeds = Tables<"feeds">;
export type Subscription = Tables<"subscriptions">;

export type FeedsCount = {
  id: number;
  title: string;
  unread_count: number;
  image_url?: string;
};

export type FeedWithArticles = Feeds & {
  articles: Articles[];
};

export type SubscriptionWithFeed = Subscription & { feeds: Feeds | null };

export type EnrichedArticle = Articles & {
  is_favorite: boolean;
  is_in_history: boolean;
};

export type FeedsWithArticlesFavoritesHistory = Feeds & {
  articles: EnrichedArticle[];
};

export type ParsedFeed = {
  title?: string;
  description?: string;
  link?: string;
  language?: string;
  items?: Array<{
    title?: string;
    link?: string;
    pubDate?: string;
    content?: string;
  }>;
};

export interface ParsedFeedItem {
  title?: string;
  link?: string;
  pubDate?: string;
  creator?: string;
  author?: string;
  content?: string;
  contentSnippet?: string;
  id?: string;
  guid?: string;
  isoDate?: string;
  categories?: string[] | string;
}

export type FeedItems = {
  items?: ParsedFeedItem[];
};
