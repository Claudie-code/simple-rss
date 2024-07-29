"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { importOPMLFeeds } from "../actions";
import { useRouter } from "next/navigation";

export const ImportOPML = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      toast.dismiss(); // Clear previous error to avoid stacking multiple errors
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error("Please add a file");
      return;
    }

    // Check if the file is .opml or .xml
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".opml") && !fileName.endsWith(".xml")) {
      toast.error("Only .opml and .xml files are allowed");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const opmlContent = e.target?.result as string;
      startTransition(async () => {
        try {
          const errors = await importOPMLFeeds(opmlContent, userId);
          if (errors.length > 0) {
            errors.forEach((error) => {
              toast.error(`Error importing feed ${error.feed}: ${error.error}`);
            });
          } else {
            toast.success("Feeds imported successfully");
            router.push(`/settings/subscriptions`);
          }
        } catch (error) {
          console.error("Error importing feeds", error);
          toast.error("Error importing feeds");
        }
      });
    };

    reader.onerror = () => {
      toast.error("Error reading the file");
    };

    reader.readAsText(file);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="opml-file">Import OPML or XML File</Label>
      <Input
        id="opml-file"
        type="file"
        accept=".opml,.xml"
        onChange={handleFileChange}
      />
      <Button onClick={handleImport} disabled={isPending} className="mt-2">
        {isPending ? "Importing..." : "Import OPML"}
      </Button>
    </div>
  );
};
