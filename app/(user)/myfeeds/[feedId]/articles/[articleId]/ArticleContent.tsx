"use client";

import { useEffect } from "react";
import parse from "html-react-parser";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "./mdx-prose.css";

const ArticleContent = ({ content }: { content: string }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return <div className="text-lg md-post">{parse(content)}</div>;
};

export default ArticleContent;
