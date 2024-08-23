"use client";

import { ParserResult } from "@postlight/parser";
import parse from "html-react-parser";

type FullArticleDisplayProps = {
  article: ParserResult;
};

const FullArticleDisplay = ({ article }: FullArticleDisplayProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold">{article.title}</h3>
      <p className="mb-5 text-foreground/70">
        {article.author && `by ${article.author}`}
      </p>
      {article.lead_image_url && (
        <img
          src={article.lead_image_url}
          alt={article.title}
          className="mb-5"
        />
      )}
      <div className="text-lg md-post">{parse(article.content)}</div>
      {/* <Link href={articleLink} target="_blank" className="mt-4">
        <Button>
          Read More <SquareArrowOutUpRight size={15} className="ml-2 mb-1" />
        </Button>
      </Link> */}
    </div>
  );
};

export default FullArticleDisplay;
