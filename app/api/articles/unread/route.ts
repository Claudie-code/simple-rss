import { NextResponse } from "next/server";
import { getRequiredAuthSession } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const user = await getRequiredAuthSession();

    const supabase = createClient();

    const { data, error } = await supabase.rpc("get_unread_articles", {
      p_user_id: user.id,
    });

    if (error) {
      console.log("[GET_UNREAD] Error fetching starred", error);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("[POST] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
