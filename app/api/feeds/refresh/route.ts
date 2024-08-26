import { upsertArticles } from "@/actions/upsert-articles";
import { getFeed } from "@/utils/feed";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

const ACCESS_KEY_CRON = process.env.ACCESS_KEY_CRON;

export async function GET(req: Request) {
  try {
    const accessKey = req.headers.get("x-api-key");
    const supabase = createClient();

    if (!accessKey || accessKey !== ACCESS_KEY_CRON) {
      console.log("[FEEDS_REFRESH] Unauthorized access attempt");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { data: user, error } = await supabase.auth.signInWithPassword({
      email: process.env.ADMIN_EMAIL!,
      password: process.env.ADMIN_PASSWORD!,
    });

    if (!user) {
      console.log("[FEEDS_REFRESH] Unauthorized access attempt");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { data: feeds, error: feedsError } = await supabase
      .from("feeds")
      .select("*");

    if (feedsError) {
      console.log("[FEEDS_REFRESH]", feedsError);
      return new NextResponse("Internal Error", { status: 500 });
    }

    const promises = feeds.map(async (oldFeed) => {
      const { id, url, correct_url, link } = oldFeed;
      const { feed, error } = await getFeed(correct_url || url, link!);

      if (error || !feed) {
        return console.error(
          `[FEEDS_REFRESH] Error fetching feed for ${url}: `,
          error
        );
      }

      const { error: errorUpsertArticles } = await upsertArticles(
        oldFeed.id,
        feed
      );
      if (errorUpsertArticles) {
        return console.error(
          `[FEEDS_REFRESH] Error upserting articles for feed ${id}: ${errorUpsertArticles}`
        );
      }
    });

    await Promise.all(promises);

    return new NextResponse("Feeds refreshed successfully", { status: 200 });
  } catch (error) {
    console.error("[FEEDS_REFRESH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
