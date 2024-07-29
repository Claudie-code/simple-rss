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

    const { data: feeds, error: feedsError } = await supabase
      .from("feeds")
      .select("*");

    if (feedsError) {
      console.log("[FEEDS_REFRESH]", feedsError);
      return new NextResponse("Internal Error", { status: 500 });
    }

    const promises = feeds.map(async (oldFeed) => {
      const { id, url, correct_url } = oldFeed;
      const { feed, error } = await getFeed(correct_url || url);
      if (error || !feed) {
        return console.log(
          `[FEEDS_REFRESH] Error fetching feed for ${url}: ${error}`
        );
      }

      const upsertError = await upsertArticles(oldFeed.id, feed);
      if (upsertError) {
        return console.log(
          `[FEEDS_REFRESH] Error upserting articles for feed ${id}: ${upsertError}`
        );
      }
    });

    await Promise.all(promises);

    return new NextResponse("Feeds refreshed successfully", { status: 200 });
  } catch (error) {
    console.log("[FEEDS_REFRESH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
