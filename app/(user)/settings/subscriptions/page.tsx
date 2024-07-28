import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getSubscriptionsWithFeed } from "@/actions/get-subscriptions-with-feed";
import { SubscriptionList } from "./_components/SubscriptionList";

type Props = {};

export default async function Subscriptions({}: Props) {
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
    <div className="max-w-4xl m-auto">
      <h1 className="mb-4 text-lg font-medium">Manage Subscriptions</h1>
      <SubscriptionList subscriptions={subscriptions} />
    </div>
  );
}
