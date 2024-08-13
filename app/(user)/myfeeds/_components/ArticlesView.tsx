"use client";

import { upsertHistory } from "@/actions/upsert-history";
import { Articles } from "@/types/collection";
import { formatDate } from "@/utils/format/formatDate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import ArticlesViewUpsertHistory from "./action";
import { Loader } from "@/components/ui/loader";

type Props = {
  items: Articles[];
  userId: string;
};

export const ArticlesView = ({ items, userId }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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

  return (
    <>
      {isPending && (
        <div className="flex h-full w-full items-center justify-center p-10">
          <Loader size={32} />
        </div>
      )}
      {!isPending &&
        items
          .sort(
            (a, b) =>
              new Date(b.pub_date!).getTime() - new Date(a.pub_date!).getTime()
          )
          .map((article) => (
            <Link
              key={article.id}
              className="p-4 w-full cursor-pointer odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
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
              <h3 className="font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {formatDate(article.pub_date ?? "")}
              </p>
            </Link>
          ))}
    </>
  );
};
