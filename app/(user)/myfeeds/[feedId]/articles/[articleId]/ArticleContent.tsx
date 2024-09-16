"use client";

import parse from "html-react-parser";
import "./mdx-prose.css";

const ArticleContent = ({ content }: { content: string }) => {
  const text = parse(content);
  return <div className="text-lg md-post break-words">{text}</div>;
};

export default ArticleContent;
