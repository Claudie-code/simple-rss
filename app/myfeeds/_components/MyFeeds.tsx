"use client";
import { useState } from "react";
import { Articles, FeedWithArticles } from "@/types/collection";
import { ArticleView } from "./ArticleView";
import { ArticlesView } from "./ArticlesView";
import { FeedsView } from "./FeedsView";

export default function MyFeeds({ feeds }: { feeds: FeedWithArticles[] }) {
  const [currentView, setCurrentView] = useState<
    "feeds" | "articles" | "article"
  >("feeds");
  const [selectedFeed, setSelectedFeed] = useState<FeedWithArticles | null>(
    null
  );
  const [selectedArticle, setSelectedArticle] = useState<Articles | null>(null);

  const showView = (
    view: "feeds" | "articles" | "article",
    feed?: FeedWithArticles,
    article?: Articles
  ) => {
    if (feed) {
      setSelectedFeed(feed);
    }
    if (article) {
      setSelectedArticle(article);
    }
    setCurrentView(view);
  };

  return (
    <>
      {currentView === "feeds" && (
        <FeedsView feeds={feeds} showView={showView} />
      )}
      {currentView === "articles" && selectedFeed && (
        <ArticlesView selectedFeed={selectedFeed} showView={showView} />
      )}
      {currentView === "article" && selectedArticle && (
        <ArticleView selectedArticle={selectedArticle} showView={showView} />
      )}
    </>
  );
}
