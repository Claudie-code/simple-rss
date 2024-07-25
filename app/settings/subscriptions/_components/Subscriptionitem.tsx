"use client";

import { SubscriptionWithFeed } from "@/types/collection";
import { Switch } from "@/components/ui/switch";
import { updateSubscription } from "../actions";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { useState } from "react";

type SubscriptionItemProps = {
  subscription: SubscriptionWithFeed;
};

export const SubscriptionItem = ({ subscription }: SubscriptionItemProps) => {
  const [isPending, startTransition] = useTransition();
  const [isActive, setIsActive] = useState(subscription.is_active || false);

  const onToggle = async () => {
    startTransition(async () => {
      try {
        await updateSubscription(subscription.id, !isActive);
        setIsActive((prev) => !prev);
        toast.success(
          `${isActive ? "Unsubscribed" : "Subscribed"} successfully`
        );
      } catch (error) {
        console.log("Error updating subscription", error);
        toast.error("Error updating subscription");
      }
    });
  };

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
        checked={isActive}
        onCheckedChange={onToggle}
        disabled={isPending}
      />
    </div>
  );
};
