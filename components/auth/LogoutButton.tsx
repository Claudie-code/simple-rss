"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { signOut } from "./actions";

export const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <form action={() => startTransition(() => signOut())}>
      <Button disabled={isPending}>
        {isPending ? "Logging out..." : "LogOut"}
      </Button>
    </form>
  );
};
