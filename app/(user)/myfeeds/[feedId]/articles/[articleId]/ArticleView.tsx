import { SubmitButton } from "@/components/submit-button";
import { Articles } from "@/types/collection";
import { createClient } from "@/utils/supabase/server";
import { Mail, Star } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type Props = {
  selectedArticle: Articles;
  userId: string;
  feedId: number;
};

export const ArticleView = ({ selectedArticle, userId, feedId }: Props) => {
  const addStarred = async (formData: FormData) => {
    "use server";

    const supabase = createClient();

    if (selectedArticle.is_starred) {
      const { error } = await supabase
        .from("starred")
        .delete()
        .eq("article_id", selectedArticle.id)
        .eq("user_id", userId);

      if (error) {
        console.error("Erreur lors de la suppression des favoris:", error);
      } else {
        console.log("Article retiré des favoris");
      }
    } else {
      const { error } = await supabase
        .from("starred")
        .insert({ article_id: selectedArticle.id, user_id: userId });

      if (error) {
        console.error("Erreur lors de l'ajout aux favoris:", error);
      } else {
        console.log("Article ajouté aux favoris");
      }
    }
    revalidatePath(`myfeeds/[feedId]/articles/[articleId]`);
  };

  const handleRemoveFromHistory = async (formData: FormData) => {
    "use server";

    const supabase = createClient();

    const { error } = await supabase
      .from("history")
      .delete()
      .eq("article_id", 23566)
      .eq("user_id", "9f4819e9-9ea3-48e6-a9a7-4e7e42d3cdfe");

    if (error) {
      console.error("Erreur lors de la suppression de l'historique:", error);
    } else {
      console.log("Article retiré de l'historique");
    }
    redirect("/myfeeds/" + feedId);
  };

  return (
    <div className="max-w-4xl m-auto p-4">
      <form className="flex mt-3">
        <SubmitButton
          formAction={addStarred}
          className="flex justify-center items-center rounded-full h-10 w-10 text-foreground mr-2 text-center text-base font-semibold transition-colors duration-300 ease-in-out hover:bg-foreground/5"
        >
          {selectedArticle.is_starred ? (
            <Star fill="black" size={20} />
          ) : (
            <Star size={20} />
          )}
        </SubmitButton>
        <SubmitButton
          formAction={handleRemoveFromHistory}
          className="flex justify-center items-center rounded-full h-10 w-10 text-foreground mr-2 text-center text-base font-semibold transition-colors duration-300 ease-in-out hover:bg-foreground/5"
        >
          <Mail size={20} />
        </SubmitButton>
      </form>

      <h3 className="text-lg font-semibold">{selectedArticle?.title}</h3>
      <p className="text-gray-700">{selectedArticle?.content}</p>
    </div>
  );
};
