import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { LoggedInButton } from "./LoggedInButton";
import { User } from "lucide-react";
import UserButton from "./UserButton";

export default async function AuthButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <LoggedInButton user={user} />
  ) : (
    <Link href="/login">
      <UserButton />
    </Link>
  );
}
