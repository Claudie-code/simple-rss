import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ArticleView } from "./ArticleView";
import { getArticle } from "@/actions/get-article";
import { upsertHistory } from "@/actions/upsert-history";
import BackButton from "@/components/back-button";

export default async function Article({
  params,
}: {
  params: { feedId: number; articleId: number };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const article = await getArticle({
    feedId: params.feedId,
    articleId: params.articleId,
    userId: user.id,
  });

  // await upsertHistory({
  //   userId: user.id,
  //   articleId: article?.id!,
  // });

  return (
    <>
      <div className="p-4 px-12 flex space-x-2 items-center">
        <BackButton />
      </div>
      {article ? (
        <ArticleView
          selectedArticle={article!}
          userId={user.id}
          feedId={params.feedId}
        />
      ) : (
        <p className="m-auto p-12">No article found</p>
      )}
    </>
  );
}
