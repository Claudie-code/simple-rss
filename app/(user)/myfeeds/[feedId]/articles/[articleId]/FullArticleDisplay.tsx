"use client";

import { ParserResult } from "@postlight/parser";
import parse from "html-react-parser";
import "./mdx-prose.css";
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

type articleDisplayProps = {
  article: ParserResult;
};

const articleDisplay = ({ article }: articleDisplayProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div>
      {article.lead_image_url && (
        <img
          src={article.lead_image_url}
          alt={article.title}
          className="mb-5"
        />
      )}
      <div className="text-lg md-post">{parse(article.content)}</div>
    </div>
  );
};

export default articleDisplay;
