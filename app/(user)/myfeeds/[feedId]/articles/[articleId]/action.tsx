"use server";

import Parser from "@postlight/parser";

export async function fetchFullContent(articleLink: string) {
  if (!articleLink) return { error: "No link" };
  try {
    // Attempt to parse the article
    const result = await Parser.parse(articleLink);
    if (!result) {
      return { error: "No content returned" };
    }
    return { result };
  } catch (error) {
    // Log the error for debugging purposes
    console.error(`Failed to fetch full content from ${articleLink}:`, error);

    // You can return a default error message or structure
    return {
      result: null,
      error: `Failed to fetch content from the provided link. Please check the URL and try again.`,
    };
  }
}
