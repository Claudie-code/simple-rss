import { createClient } from "@/utils/supabase/server";

export const upsertHistory = async ({
  userId,
  articleId,
}: {
  userId: string;
  articleId: number;
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
  }
};
