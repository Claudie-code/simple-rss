import { SubmitButton } from "@/components/submit-button";
import { Articles } from "@/types/collection";
import { createClient } from "@/utils/supabase/server";
import { Eye, Mail, SquareArrowOutUpRight, Star } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import BackButton from "@/components/back-button";
import Link from "next/link";
import { formatDate } from "@/utils/format/formatDate";
import ArticleContent from "./ArticleContent";
import "./mdx-prose.css";
import { Suspense } from "react";
import FullArticleContent from "./FullArticleContent";
import { Button } from "@/components/ui/button";

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
    revalidatePath(`myfeeds/[feedId]/articles/[articleId]`, "page");
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
    <div className="max-w-4xl w-full m-auto lg:p-4 px-4 pb-4">
      <form className="flex justify-between mt-3">
        <div className="flex">
          <div className="2xl:hidden">
            <BackButton />
          </div>
          <SubmitButton
            formAction={addStarred}
            title="starred"
            className="flex justify-center items-center rounded-full h-10 w-10 text-foreground mr-2 text-center text-base font-semibold transition-colors duration-300 ease-in-out hover:bg-foreground/5"
          >
            {selectedArticle.is_starred ? (
              <Star fill="black" size={20} />
            ) : (
              <Star size={20} />
            )}
          </SubmitButton>
          <SubmitButton
            title="unread"
            formAction={handleRemoveFromHistory}
            className="flex justify-center items-center rounded-full h-10 w-10 text-foreground mr-2 text-center text-base font-semibold transition-colors duration-300 ease-in-out hover:bg-foreground/5"
          >
            <Mail size={20} />
          </SubmitButton>
        </div>
        {selectedArticle.link && (
          <div className="flex">
            <Link
              href={selectedArticle.link!}
              title="article link"
              target="_blank"
              className="flex justify-center items-center rounded-full h-10 w-10 text-foreground mr-2 text-center text-base font-semibold transition-colors duration-300 ease-in-out hover:bg-foreground/5"
            >
              <SquareArrowOutUpRight size={20} />
            </Link>
          </div>
        )}
      </form>
      <h3 className="text-2xl font-semibold">{selectedArticle?.title}</h3>
      <p className="mb-5 text-foreground/70">
        {formatDate(selectedArticle.pub_date!)}{" "}
        {selectedArticle.author ? "by " + selectedArticle.author : ""}
      </p>
      {selectedArticle.content && (
        <ArticleContent content={selectedArticle.content} />
      )}

      {selectedArticle?.link &&
        (selectedArticle.link.includes("reddit.com") ? (
          <Link href={selectedArticle.link} target="_blank">
            <Button>
              Read More <SquareArrowOutUpRight size={20} className="ml-2" />
            </Button>
          </Link>
        ) : (
          <Suspense fallback={<div>Loading full article...</div>}>
            <FullArticleContent article={selectedArticle} />
          </Suspense>
        ))}
    </div>
  );
};
