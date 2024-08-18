import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getArticlesFromFeed } from "@/actions/get-articles";
import { ArticlesView } from "../_components/ArticlesView";

export default async function Feed({ params }: { params: { feedId: number } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const articles = await getArticlesFromFeed({
    userId: user.id,
    feedId: params.feedId,
  });

  return articles.length > 0 ? (
    <ArticlesView
      items={articles}
      userId={user.id}
      functionFetchMore="getArticlesFromFeed"
      feedId={params.feedId}
    />
  ) : (
    <p className="m-auto p-12">No articles found</p>
  );
}
