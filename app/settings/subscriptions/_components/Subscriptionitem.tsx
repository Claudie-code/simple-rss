"use client";

import { SubscriptionWithFeed } from "@/types/collection";
import { Switch } from "@/components/ui/switch";
import { updateSubscription } from "../action";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

type SubscriptionItemProps = {
  subscription: SubscriptionWithFeed;
};

export const SubscriptionItem = ({ subscription }: SubscriptionItemProps) => {
  const mutation = useMutation({
    mutationFn: async () =>
      await updateSubscription(subscription.id, !subscription.is_active),
    onSuccess: () => {
      toast.success(
        `${subscription.is_active ? "Unsubscribed" : "Subscribed"} successfully`
      );
    },
    onError: (error) => {
      console.log("Error updating subscription", error);
      toast.error("Error updating subscription");
    },
  });

  return (
    <div className="space-y-2 flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <h3 className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base">
          {subscription.feeds?.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {subscription.feeds?.url}
        </p>
      </div>
      <Switch
        checked={subscription.is_active || false}
        onCheckedChange={() => mutation.mutate()}
        disabled={mutation.isPending}
      />
    </div>
  );
};
