"use client";

import { GraduationCap, Home, Youtube } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./SidebarItem";

const guestRoutes = [
  {
    icon: Home,
    label: "Accueil",
    href: "/",
  },
  {
    icon: GraduationCap,
    label: "Formations",
    href: "/formations",
  },
  {
    icon: Youtube,
    label: "Tutoriels",
    href: "/tutoriels",
  },
  // {
  //   icon: Pen,
  //   label: "Blog",
  //   href: "/blog",
  // },
];

export const SidebarRoutes = ({ setOpen }: { setOpen: Function }) => {
  return (
    <div className="flex flex-col w-full">
      {guestRoutes.map((route) => (
        <SidebarItem
          setOpen={setOpen}
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
