"use client";
import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { getFeeds } from "@/actions/get-feeds";
import AddFeedForm from "./_components/addFeedForm";
import { useState } from "react";

export default async function ProtectedPage() {
  const supabase = createClient();
  const [currentView, setCurrentView] = useState<
    "feeds" | "articles" | "article"
  >("feeds");

  const showView = (view: "feeds" | "articles" | "article") => {
    setCurrentView(view);
  };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const feeds = await getFeeds({
    userId: user.id,
  });

  return (
    <div>
      {currentView === "feeds" && <div></div>}
      {currentView === "articles" && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => showView("feeds")}
        >
          Back to Feeds
        </button>
      )}

      {currentView === "article" && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => showView("articles")}
        >
          Back to Articles
        </button>
      )}
    </div>
  );
}
