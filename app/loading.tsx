import Header from "@/components/layout/Header";
import { Loader } from "@/components/ui/loader";

export default function loading() {
  return (
    <>
      <Header />
      <div className="flex h-full w-full items-center justify-center">
        <Loader size={32} />
      </div>
    </>
  );
}
