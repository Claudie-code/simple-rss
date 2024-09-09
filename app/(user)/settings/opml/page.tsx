import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ImportOPML } from "./_components/ImportOPML";
import { ExportOPML } from "./_components/ExportOPML";
import { getSubscriptionsWithFeed } from "@/actions/get-subscriptions-with-feed";
import { useQuery } from "@tanstack/react-query";
import { SubscriptionWithFeed } from "@/types/collection";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";

type Props = {};

async function OPMLPage({}: Props) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const subscriptions = await getSubscriptionsWithFeed({
    userId: user.id,
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Import/Export OPML</h1>
      <div className="mb-6">
        <ImportOPML userId={user.id} />
      </div>
      <Separator className="max-w-lg my-4" />

      <div className="mb-6">
        {subscriptions ? (
          <Suspense fallback={<Button disabled={true}>Loading...</Button>}>
            <ExportOPML subscriptions={subscriptions} />
          </Suspense>
        ) : (
          "No subscriptions"
        )}
      </div>
    </div>
  );
}

export default OPMLPage;
