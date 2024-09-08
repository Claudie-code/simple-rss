import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ArticleView } from "./ArticleView";
import { getArticle } from "@/actions/get-article";
import BackButton from "@/components/back-button";
import { getFeed } from "@/utils/feed";

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

  return (
    <>
      <div className="absolute top-[93px] pl-10 space-x-2 items-center hidden 2xl:flex">
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
