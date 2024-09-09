import { fetchFullContent } from "./action";
import { Articles } from "@/types/collection";
import ArticleContent from "./ArticleContent";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";

type articleDisplayProps = {
  article: Articles;
};

const FullArticleContent = async ({ article }: articleDisplayProps) => {
  const { result, error } = await fetchFullContent(article?.link!);

  return (
    result && (
      <div>
        <Separator />
        <p className="w-full text-center  text-slate-500 font-semibold text-sm">
          FULL ARTICLE
        </p>
        <ChevronDown className="m-auto mb-6 text-slate-500" />
        {result.lead_image_url && (
          <img
            src={result.lead_image_url}
            alt={result.title}
            className="mb-5"
          />
        )}
        <ArticleContent content={result.content} />
      </div>
    )
  );
};

export default FullArticleContent;
