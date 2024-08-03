import { Button } from "@/components/ui/button";
import { Articles, FeedWithArticles } from "@/types/collection";
import { formatDate } from "@/utils/format/formatDate";
import { useState } from "react";
import { ArticleView } from "./ArticleView";

type Props = {
  showView: Function;
  items: Articles[];
};

export const ArticlesView = ({ showView, items }: Props) => {
  return (
    <div className="space-y-4">
      {items
        .sort(
          (a, b) =>
            new Date(b.pub_date!).getTime() - new Date(a.pub_date!).getTime()
        )
        .map((article) => (
          <div
            key={article.id}
            className="p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-gray-50 border"
            onClick={() => showView("article", undefined, article)}
          >
            <h3 className="font-semibold">{article.title}</h3>
            <p className="text-sm text-gray-700">
              {formatDate(article.pub_date ?? "")}
            </p>
          </div>
        ))}
    </div>
  );
};
