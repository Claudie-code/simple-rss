"use client";

import { useEffect } from "react";
import parse from "html-react-parser";
import "./mdx-prose.css";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

const ArticleContent = ({ content }: { content: string }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  const text = parse(content);
  return <div className="text-lg md-post break-words">{text}</div>;
};

export default ArticleContent;
