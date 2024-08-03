import { Articles } from "@/types/collection";
import { formatDate } from "@/utils/format/formatDate";

type Props = {
  showView: Function;
  items: Articles[];
};

export const ArticlesView = ({ showView, items }: Props) => {
  return (
    <>
      {items
        .sort(
          (a, b) =>
            new Date(b.pub_date!).getTime() - new Date(a.pub_date!).getTime()
        )
        .map((article) => (
          <div
            key={article.id}
            className="p-4 cursor-pointer odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => showView("article", undefined, article)}
          >
            <h3 className="font-semibold">{article.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {formatDate(article.pub_date ?? "")}
            </p>
          </div>
        ))}
    </>
  );
};
