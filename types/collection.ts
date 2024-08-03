import { Tables } from "./supabase";

export type Articles = Tables<"articles">;
export type Feeds = Tables<"feeds">;
export type Subscription = Tables<"subscriptions">;

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
