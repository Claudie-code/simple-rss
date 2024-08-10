import { createClient } from "@/utils/supabase/server";
import { revalidateTag } from "next/cache";

export const upsertHistory = async ({
  userId,
  articleId,
  feedId,
}: {
  userId: string;
  articleId: number;
  feedId: number;
}) => {
  const supabase = createClient();

  const { error } = await supabase
    .from("history")
    .upsert(
      { user_id: userId, article_id: articleId },
      { onConflict: "user_id,article_id" }
    );

  if (error) {
    console.error("Erreur lors de l'ajout à l'historique:", error);
  } else {
    revalidateTag(`feed-${feedId}`);
  }
};
