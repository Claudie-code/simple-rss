import SettingsSidebar from "./_components/SettingsSidebar";
import AuthButton from "@/components/auth/AuthButton";
import { Sidebar } from "./_components/Sidebar";

type Props = {};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="md:pl-80 w-full flex justify-between border-b border-b-foreground/10 h-16 items-center px-16 text-sm">
        <div></div>
        <AuthButton />
      </nav>
      <Sidebar />
      <main className="md:pl-80 md:ml-6 h-full flex flex-col max-w-5xl">
        {children}
      </main>
    </>
  );
}
