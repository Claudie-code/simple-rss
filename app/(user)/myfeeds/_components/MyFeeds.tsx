"use client";

import { useState } from "react";
import { ArticlesView } from "./ArticlesView";
import { ArticleView } from "./ArticleView";
import MyfeedsSidebar from "./MyfeedsSidebar";
import { Articles, Feeds, FeedWithArticles } from "@/types/collection";
import axios from "axios";
import toast from "react-hot-toast";

type ViewType = "" | "articles" | "article" | "starred";

export default function Myfeeds({ feeds }: { feeds: Feeds[] }) {
  const [currentView, setCurrentView] = useState<ViewType>("");
  const [selectedFeed, setSelectedFeed] = useState<FeedWithArticles | null>(
    null
  );
  const [selectedArticles, setSelectedArticles] = useState<Articles[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Articles | null>(null);

  const fetchArticles = async (feedId: number) => {
    try {
      const response = await axios.get(`/api/articles/${feedId}`);
      console.log("response", response);
      setSelectedArticles(response.data);
    } catch (error) {
      toast.error("Error fetching articles:");
    }
  };

  const showView = async (
    view: Exclude<ViewType, "starred">,
    feed?: FeedWithArticles,
    article?: Articles
  ) => {
    if (feed) {
      setSelectedFeed(feed);
      await fetchArticles(feed.id);
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
          currentView={currentView}
        />
      </div>
      <main className="max-w-4xl md:pl-80 pt-[80px] h-full">
        {currentView === "articles" && selectedFeed && (
          <ArticlesView items={selectedArticles} showView={showView} />
        )}
        {/* Uncomment and implement this section if needed
        {currentView === "starred" && selectedFeed && (
          <ArticlesView items={starredArticles} showView={showView} />
        )}
        */}
        {currentView === "article" && selectedArticle && (
          <ArticleView selectedArticle={selectedArticle} showView={showView} />
        )}
      </main>
    </>
  );
}
