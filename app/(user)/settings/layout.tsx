import Header from "@/components/layout/Header";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { Sidebar } from "@/components/layout/Sidebar";
import SettingsSidebar from "./_components/SettingsSidebar";
import AuthButton from "@/components/auth/AuthButton";

type Props = {};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="md:pl-80 w-full flex justify-between border-b border-b-foreground/10 h-16 items-center p-3 px-16 text-sm">
        <div></div>
        <AuthButton />
      </nav>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <SettingsSidebar />
      </div>
      <main className="md:pl-80 h-full flex flex-col max-w-5xl">
        {children}
      </main>
    </>
  );
}
