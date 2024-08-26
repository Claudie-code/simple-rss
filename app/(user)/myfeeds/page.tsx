import { createClient } from "@/utils/supabase/server";
import { ArticlesView } from "./_components/ArticlesView";
import { redirect } from "next/navigation";
import { getLastArticles } from "@/actions/get-last-articles";
import { getFeed } from "@/utils/feed";
import { findRedundantKeywords } from "@/utils/findRedundantWords";

export default async function MyFeeds() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const lastArticles = await getLastArticles({ userId: user.id });

  const { feed } = await getFeed("https://www.reddit.com/.rss");

  // console.log("feed", feed);
  if (feed) {
    const list = findRedundantKeywords(feed);
    // console.log("list", list);
  }

  return (
    <ArticlesView
      items={lastArticles}
      userId={user.id}
      functionFetchMore="getLastArticles"
    />
  );
}
