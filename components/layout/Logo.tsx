"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  setOpen?: Function;
}

export const Logo = ({ setOpen }: LogoProps) => {
  return (
    <Link href="/" onClick={() => setOpen && setOpen(false)}>
      <Image
        height={40}
        width={40}
        alt="logo"
        src="/logo.svg"
        className="rounded-full"
      />
    </Link>
  );
};
