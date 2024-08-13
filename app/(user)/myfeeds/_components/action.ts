"use server";

import { upsertHistory } from "@/actions/upsert-history";
import { revalidatePath } from "next/cache";

export default async function ArticlesViewUpsertHistory({
  userId,
  articleId,
}: {
  userId: string;
  articleId: number;
}) {
  await upsertHistory({ userId, articleId });
  revalidatePath("/myfeeds/[feedId]", "page");
}
