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
    <div className="flex items-center justify-between rounded-lg border p-4 space-x-4">
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-base truncate peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {subscription.feeds?.title}
        </h3>
        <p className="text-sm text-muted-foreground truncate">
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
