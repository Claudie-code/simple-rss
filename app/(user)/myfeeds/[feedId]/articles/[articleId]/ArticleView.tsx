import { SubmitButton } from "@/components/submit-button";
import { Articles } from "@/types/collection";
import { createClient } from "@/utils/supabase/server";
import { Mail, Star } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import BackButton from "@/components/back-button";
import FullArticleDisplay from "./FullArticleDisplay";
import { getArticle } from "@/actions/get-article";
import { fetchFullContent } from "./action";

type Props = {
  selectedArticle: Articles;
  userId: string;
  feedId: number;
};

export const ArticleView = async ({
  selectedArticle,
  userId,
  feedId,
}: Props) => {
  const { result } = await fetchFullContent(selectedArticle.link!);

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
      .eq("article_id", selectedArticle.id)
      .eq("user_id", userId);

    if (error) {
      console.error("Error", error);
    } else {
      console.log("Add unread");
    }
    redirect("/myfeeds/" + feedId);
  };

  return (
    <div className="max-w-4xl m-auto lg:p-4 px-4">
      <form className="flex justify-between mt-3">
        <div className="flex">
          <div className="2xl:hidden">
            <BackButton />
          </div>
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
        </div>
      </form>

      {/* Full article content fetched and displayed */}
      <FullArticleDisplay article={result} />
    </div>
  );
};
