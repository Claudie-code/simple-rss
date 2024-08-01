import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoggedInButton } from "./LoggedInButton";
import { User } from "lucide-react";

export default async function AuthButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <LoggedInButton user={user} />
  ) : (
    <Link href="/login">
      <User className="mr-2 h-4 w-4" />
    </Link>
  );
}
