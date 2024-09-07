import Link from "next/link";
import AuthButton from "../auth/AuthButton";

export default function Header() {
  return (
    <nav className="w-full flex justify-center bg-slate-100">
      <div className="w-full max-w-4xl flex justify-between items-center py-7 text-sm">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-slate-700"
        >
          <span className="">SimpleRSS</span>
        </Link>

        <AuthButton />
      </div>
    </nav>
  );
}
