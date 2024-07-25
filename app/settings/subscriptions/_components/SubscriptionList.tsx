import { SubscriptionWithFeed } from "@/types/collection";
import { SubscriptionItem } from "./Subscriptionitem";
import { updateSubscription } from "../actions";
import toast from "react-hot-toast";

type SubscriptionListProps = {
  subscriptions: SubscriptionWithFeed[];
};

export const SubscriptionList = ({ subscriptions }: SubscriptionListProps) => {
  return (
    <div className="space-y-4">
      {subscriptions.map((subscription) => (
        <SubscriptionItem key={subscription.id} subscription={subscription} />
      ))}
      {subscriptions.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No subscriptions.
        </div>
      )}
    </div>
  );
};
