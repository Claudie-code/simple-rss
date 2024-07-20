import { Logo } from "./Logo";
import { SidebarRoutes } from "./SidebarRoutes";

export const Sidebar = ({ setOpen }: { setOpen: Function }) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo setOpen={setOpen} />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes setOpen={setOpen} />
      </div>
    </div>
  );
};
