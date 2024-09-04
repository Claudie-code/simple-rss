import { fetchFullContent } from "./action";
import { Articles } from "@/types/collection";
import ArticleContent from "./ArticleContent";

type articleDisplayProps = {
  article: Articles;
};

const FullArticleContent = async ({ article }: articleDisplayProps) => {
  const { result, error } = await fetchFullContent(article?.link!);

  return (
    result && (
      <div>
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
