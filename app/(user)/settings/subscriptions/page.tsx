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
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Subscriptions</h2>
      <SubscriptionList subscriptions={subscriptions} />
    </div>
  );
}
