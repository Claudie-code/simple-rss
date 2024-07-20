"use client";

import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden pr-4 hover:opacity-75 transition">
        <Menu />
        <span className="sr-only">Ouvrir Menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};
