"use client";

import { Button } from "@/components/ui/button";
import { exportToOPML } from "@/utils/opml/opml";
import { SubscriptionWithFeed } from "@/types/collection";

type Props = {
  subscriptions: SubscriptionWithFeed[];
};

export const ExportOPML = ({ subscriptions }: Props) => {
  const handleExport = () => {
    if (!subscriptions) return;

    const opmlContent = exportToOPML(subscriptions);
    const blob = new Blob([opmlContent], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscriptions.opml";
    a.click();
    URL.revokeObjectURL(url);
  };

  return <Button onClick={handleExport}>Export OPML</Button>;
};
