"use client";

import { useState } from "react";
import { ArticlesView } from "./ArticlesView";
import { ArticleView } from "./ArticleView";
import MyfeedsSidebar from "./MyfeedsSidebar";
import { Articles, FeedWithArticles } from "@/types/collection";

export default function Myfeeds({ feeds }: { feeds: FeedWithArticles[] }) {
  const [currentView, setCurrentView] = useState<"" | "articles" | "article">(
    ""
  );
  const [selectedFeed, setSelectedFeed] = useState<FeedWithArticles | null>(
    null
  );
  const [selectedArticle, setSelectedArticle] = useState<Articles | null>(null);

  const showView = (
    view: "articles" | "article",
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
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <MyfeedsSidebar
          feeds={feeds}
          selectedFeed={selectedFeed!}
          showView={showView}
        />
      </div>
      <main className="max-w-4xl md:pl-80 pt-[80px] h-full">
        {currentView === "articles" && selectedFeed && (
          <ArticlesView selectedFeed={selectedFeed} showView={showView} />
        )}
        {currentView === "article" && selectedArticle && (
          <ArticleView selectedArticle={selectedArticle} showView={showView} />
        )}
      </main>
    </>
  );
}
