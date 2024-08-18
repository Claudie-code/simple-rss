"use server";

import { getArticlesFromFeed } from "@/actions/get-articles";
import { getLastArticles } from "@/actions/get-last-articles";
import { getStarred } from "@/actions/get-starred";
import { getUnread } from "@/actions/get-unread";
import { upsertHistory } from "@/actions/upsert-history";
import { revalidatePath } from "next/cache";

export async function ArticlesViewUpsertHistory({
  userId,
  articleId,
}: {
  userId: string;
  articleId: number;
}) {
  await upsertHistory({ userId, articleId });
  revalidatePath("/myfeeds/[feedId]", "page");
}

export async function fetchMoreArticles({
  userId,
  offset,
  functionFetchMore,
  feedId,
}: {
  userId: string;
  offset: number;
  functionFetchMore:
    | "getLastArticles"
    | "getStarred"
    | "getArticlesFromFeed"
    | "getUnread";
  feedId?: number;
}) {
  let articles = [];

  switch (functionFetchMore) {
    case "getLastArticles":
      articles = await getLastArticles({ userId, offset });
      break;

    case "getStarred":
      articles = await getStarred({ userId, offset });
      break;

    case "getArticlesFromFeed":
      // Ici on suppose que `feedId` doit être défini
      if (feedId === undefined) {
        throw new Error("feedId is required for getArticlesFromFeed");
      }
      articles = await getArticlesFromFeed({ userId, feedId, offset });
      break;

    case "getUnread":
      articles = await getUnread({ userId, offset });
      break;

    default:
      throw new Error(`Unknown functionFetchMore value: ${functionFetchMore}`);
  }

  return articles;
}
