import { NextResponse } from "next/server";
import { getRequiredAuthSession } from "@/lib/auth";
import { createFeed } from "@/actions/create-feed";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  req: Request,
  { params }: { params: { feedId: string } }
) {
  try {
    await getRequiredAuthSession();
    const { feedId } = params;

    const supabase = createClient();

    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("feed_id", feedId);

    if (error) {
      console.log("[GET_ARTICLES] Error fetching articles", error);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("[POST] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
