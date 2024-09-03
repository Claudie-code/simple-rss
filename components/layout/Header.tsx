import AuthButton from "../auth/AuthButton";
import { MobileSidebar } from "./MobileSidebar";
import { NavbarRoutes } from "./NavbarRoutes";

export default function Header() {
  return (
    <nav className="w-full flex justify-center h-16 bg-slate-100">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <div>
          <MobileSidebar />
          <NavbarRoutes />
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}
