"use client";

import { Articles } from "@/types/collection";
import { formatDate } from "@/utils/format/formatDate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { Loader } from "@/components/ui/loader";
import { debounce } from "lodash";
import { ArticlesViewUpsertHistory, fetchMoreArticles } from "./action";
import toast from "react-hot-toast";

type ArticlesWithFeedTitle = Articles & { feed_title?: string };

type Props = {
  items: ArticlesWithFeedTitle[];
  userId: string;
  functionFetchMore:
    | "getLastArticles"
    | "getStarred"
    | "getArticlesFromFeed"
    | "getUnread";
  feedId?: number;
};

export const ArticlesView = ({
  items,
  userId,
  functionFetchMore,
  feedId,
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPendingMoreArticles, startTransitionMoreArticles] = useTransition();
  const PAGE_COUNT = 100;
  const containerRef = useRef(null);
  const [loadedArticles, setLoadedArticles] = useState(items);
  const [offset, setOffset] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);

  const handleArticleClick = async (
    articleIsRead: boolean,
    articleId: number
  ) => {
    if (articleIsRead) return;
    startTransition(async () => {
      try {
        await ArticlesViewUpsertHistory({ userId, articleId });
      } catch (error) {}
    });
  };

  const handleScroll = () => {
    if (containerRef.current && typeof window !== "undefined") {
      const container: any = containerRef.current;
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      const isNowInView = bottom <= innerHeight;
      if (isNowInView !== isInView) {
        setIsInView(isNowInView);
      }
    }
  };

  useEffect(() => {
    const handleDebouncedScroll = debounce(() => handleScroll(), 200);
    window.addEventListener("scroll", handleDebouncedScroll);
    return () => {
      window.removeEventListener("scroll", handleDebouncedScroll);
    };
  }, []);

  useEffect(() => {
    if (isInView && !isLoading && hasMoreArticles && !isPending) {
      loadMoreArticles();
    }
  }, [isInView, hasMoreArticles]);

  const loadMoreArticles = async () => {
    setIsLoading(true);

    startTransitionMoreArticles(async () => {
      try {
        const newArticles = await fetchMoreArticles({
          userId,
          offset: offset + PAGE_COUNT,
          functionFetchMore,
          feedId,
        });

        if (newArticles.length < PAGE_COUNT) {
          setHasMoreArticles(false);
        }

        setLoadedArticles((prevArticles) => [...prevArticles, ...newArticles]);
        setOffset((prevOffset) => prevOffset + PAGE_COUNT);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
        setIsInView(false);
      }
    });
  };

  return (
    <div ref={containerRef} className="flex flex-col">
      {isPending && (
        <div className="flex h-full w-full items-center justify-center p-10">
          <Loader size={32} />
        </div>
      )}
      {!isPending &&
        loadedArticles
          .sort(
            (a, b) =>
              new Date(b.pub_date!).getTime() - new Date(a.pub_date!).getTime()
          )
          .map((article) => (
            <Link
              key={article.id}
              className="p-4 w-full cursor-pointer odd:bg-white odd:dark:bg-slate-900 even:bg-slate-50 even:dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              href={`/myfeeds/${article.feed_id}/articles/${article.id}`}
              style={{
                opacity: article.is_in_history ? 0.5 : 1,
              }}
              onClick={async (e) => {
                e.preventDefault();
                await handleArticleClick(article.is_in_history, article.id);
                router.push(
                  `/myfeeds/${article.feed_id}/articles/${article.id}`
                );
              }}
            >
              {article.feed_title ? (
                <p className="text-sm text-slate-600">{article.feed_title}</p>
              ) : null}
              <h3 className="font-semibold truncate">{article.title}</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {formatDate(article.pub_date ?? "")}
              </p>
            </Link>
          ))}
      {isPendingMoreArticles && (
        <div className="flex h-full w-full items-center justify-center p-10">
          <Loader size={32} />
        </div>
      )}
      {!hasMoreArticles && (
        <div className="flex h-full w-full items-center justify-center p-10 text-slate-500">
          No more articles to load.
        </div>
      )}
    </div>
  );
};
