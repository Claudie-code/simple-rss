import { Button } from "@/components/ui/button";
import { Articles } from "@/types/collection";

type Props = {
  showView: Function;
  selectedArticle: Articles;
};

export const ArticleView = ({ showView, selectedArticle }: Props) => {
  return (
    <div>
      <Button onClick={() => showView("articles")}>Back to Articles</Button>
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">{selectedArticle?.title}</h3>
        <p className="text-gray-700">{selectedArticle?.content}</p>
      </div>
    </div>
  );
};
