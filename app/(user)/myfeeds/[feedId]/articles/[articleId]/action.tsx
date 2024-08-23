"use server";

import Parser from "@postlight/parser";

export async function fetchFullContent(articleLink: string) {
  const result = await Parser.parse(articleLink);
  console.log("result", result);
  return { result: result };
}
