"use client";

import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import MyfeedsSidebar from "./Sidebar";
import { FeedsCount } from "@/types/collection";

export const MobileSidebar = ({ feeds }: { feeds: FeedsCount[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden pr-4 hover:opacity-75 transition">
        <Menu />
        <span className="sr-only">Ouvrir Menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <MyfeedsSidebar setOpen={setOpen} feeds={feeds} />
      </SheetContent>
    </Sheet>
  );
};
