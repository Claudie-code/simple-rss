"use client";

import { useEffect } from "react";
// import Prism from "prismjs";
// import "prismjs/themes/prism-tomorrow.css";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export default function PrismLoader() {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  return <div className="hidden"></div>;
}
