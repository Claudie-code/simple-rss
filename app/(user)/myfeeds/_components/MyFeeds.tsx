"use client";

import { useState } from "react";
import { ArticlesView } from "./ArticlesView";
import { ArticleView } from "./ArticleView";
import MyfeedsSidebar from "./MyfeedsSidebar";
import { Articles, Feeds, FeedWithArticles } from "@/types/collection";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "@/components/ui/loader";

type ViewType = "" | "articles" | "article" | "starred" | "unread";

export default function Myfeeds({ feeds }: { feeds: Feeds[] }) {
  const [currentView, setCurrentView] = useState<ViewType>("");
  const [selectedFeed, setSelectedFeed] = useState<FeedWithArticles | null>(
    null
  );
  const [selectedArticles, setSelectedArticles] = useState<Articles[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Articles | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticles = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setSelectedArticles(response.data);
    } catch (error) {
      toast.error("Error fetching articles.");
    } finally {
      setIsLoading(false);
    }
  };

  const showView = async (
    view: ViewType,
    feed?: FeedWithArticles,
    article?: Articles
  ) => {
    setCurrentView(view);
    if (view === "articles" && feed) {
      setSelectedFeed(feed);
      await fetchArticles(`/api/articles/${feed.id}`);
    } else if (view === "starred") {
      await fetchArticles(`/api/articles/favorites`);
    } else if (view === "unread") {
      await fetchArticles(`/api/articles/unread`);
    }
    if (article) {
      setSelectedArticle(article);
    }
  };

  return (
    <>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <MyfeedsSidebar
          feeds={feeds}
          selectedFeed={selectedFeed!}
          currentView={currentView}
        />
      </div>
      <main className="md:pl-80 h-full">
        {isLoading ? (
          <div className="flex items-center justify-center pt-60">
            <Loader size={30} />
          </div>
        ) : (
          <>
            {currentView === "articles" && (
              <ArticlesView items={selectedArticles} />
            )}
            {(currentView === "starred" || currentView === "unread") && (
              <ArticlesView items={selectedArticles} />
            )}
            {currentView === "article" && selectedArticle && (
              <ArticleView
                selectedArticle={selectedArticle}
                showView={showView}
              />
            )}
          </>
        )}
      </main>
    </>
  );
}
