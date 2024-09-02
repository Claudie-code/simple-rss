import Header from "@/components/layout/Header";
import { Loader } from "@/components/ui/loader";

export default function loading() {
  return (
    <>
      <div className="flex h-full w-full items-center justify-center p-10">
        <Loader size={32} />
      </div>
    </>
  );
}
