import { createClient } from "@/utils/supabase/server";
import { ArticlesView } from "./_components/ArticlesView";
import { redirect } from "next/navigation";
import { getLastArticles } from "@/actions/get-last-articles";
import { findRssFeed, getFeed } from "@/utils/feed";
import { findRedundantKeywords } from "@/utils/findRedundantWords";
import AddFeedForm from "./_components/AddFeedForm";
import { last } from "lodash";
import { Label } from "@/components/ui/label";

export default async function MyFeeds() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const lastArticles = await getLastArticles({ userId: user.id });

  if (lastArticles.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 min-h-screen">
        <div className="max-w-2xl w-full bg-white rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Welcome! Let's get started by adding your first feed
          </h2>
          <Label className="mb-2">Feed URL</Label>
          <AddFeedForm />
        </div>
      </div>
    );
  }

  return (
    lastArticles.length > 0 && (
      <ArticlesView
        items={lastArticles}
        userId={user.id}
        functionFetchMore="getLastArticles"
      />
    )
  );
}
