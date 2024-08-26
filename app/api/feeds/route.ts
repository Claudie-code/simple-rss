import { NextResponse } from "next/server";
import { getRequiredAuthSession } from "@/lib/auth";
import { createFeed } from "@/actions/create-feed";

export async function POST(req: Request) {
  try {
    const user = await getRequiredAuthSession();
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return new NextResponse("Invalid or missing URL", { status: 400 });
    }

    const result = await createFeed({
      url,
      userId: user.id,
    });

    if (result.error) {
      return new NextResponse(result.error, { status: 400 });
    }

    return NextResponse.json({
      feed: result.feed,
      articles: result.articles,
    });
  } catch (error) {
    console.error("[POST] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
