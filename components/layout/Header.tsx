import Link from "next/link";
import AuthButton from "../auth/AuthButton";
import { Logo } from "./Logo";
import Image from "next/image";

export default function Header() {
  return (
    <nav className="w-full flex justify-center bg-slate-100">
      <div className="w-full max-w-4xl flex justify-between items-center py-7 text-sm">
        <Link
          href="/"
          className="flex  space-x-2 items-center text-2xl font-bold tracking-tight text-slate-700"
        >
          <Image
            className="rounded-full"
            height={40}
            width={40}
            alt="logo"
            src="/logo.svg"
          />
          <span className="">SimpleRSS</span>
        </Link>

        <AuthButton />
      </div>
    </nav>
  );
}
