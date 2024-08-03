"use client";

import { useState } from "react";
import { ArticlesView } from "./ArticlesView";
import { ArticleView } from "./ArticleView";
import MyfeedsSidebar from "./MyfeedsSidebar";
import { Articles, Feeds, FeedWithArticles } from "@/types/collection";
import axios from "axios";
import toast from "react-hot-toast";

type ViewType = "" | "articles" | "article" | "starred" | "unread";

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
      setSelectedArticles(response.data);
    } catch (error) {
      toast.error("Error fetching articles:");
    }
  };

  const fetchStarred = async () => {
    try {
      const response = await axios.get(`/api/articles/favorites`);
      console.log("response", response);
      setSelectedArticles(response.data);
    } catch (error) {
      toast.error("Error fetching starred articles:");
    }
  };

  const fetchUnread = async () => {
    try {
      const response = await axios.get(`/api/articles/unread`);
      console.log("response", response);
      setSelectedArticles(response.data);
    } catch (error) {
      toast.error("Error fetching unread articles:");
    }
  };

  const showView = async (
    view: ViewType,
    feed?: FeedWithArticles,
    article?: Articles
  ) => {
    if (view === "articles" && feed) {
      setSelectedFeed(feed);
      await fetchArticles(feed.id);
    } else if (view === "starred") {
      await fetchStarred();
    } else if (view === "unread") {
      await fetchUnread();
    }
    if (article) {
      setSelectedArticle(article);
    }
    setCurrentView(view);
  };
  console.log("selected", selectedArticles);
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
      <main className="md:pl-80 h-full">
        {currentView === "articles" && selectedFeed && (
          <ArticlesView items={selectedArticles} showView={showView} />
        )}
        {currentView === "starred" && (
          <ArticlesView items={selectedArticles} showView={showView} />
        )}
        {currentView === "unread" && (
          <ArticlesView items={selectedArticles} showView={showView} />
        )}
        {currentView === "article" && selectedArticle && (
          <ArticleView selectedArticle={selectedArticle} showView={showView} />
        )}
      </main>
    </>
  );
}
