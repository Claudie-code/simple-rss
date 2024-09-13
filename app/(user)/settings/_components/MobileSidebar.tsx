"use client";

import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { FeedsCount } from "@/types/collection";
import SettingsSidebar from "./SettingsSidebar";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden pr-4 hover:opacity-75 transition">
        <Menu />
        <span className="sr-only">Ouvrir Menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <SettingsSidebar setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};
