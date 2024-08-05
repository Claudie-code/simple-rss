import { Button } from "@/components/ui/button";
import { Articles } from "@/types/collection";
import { createClient } from "@/utils/supabase/server";
import { ArrowLeft, Mail, Star } from "lucide-react";
import { useRouter } from "next/router";

type Props = {
  showView: Function;
  selectedArticle: Articles;
};

export const ArticleView = ({ showView, selectedArticle }: Props) => {
  const router = useRouter();

  const addStarred = () => {
    "use server";
    const supabase = createClient();
  };

  return (
    <div className="">
      <div className="p-4 px-12 flex space-x-2 items-center">
        <Button variant="ghost" className="">
          <ArrowLeft onClick={() => router.back()} />
        </Button>
      </div>

      <div className="max-w-4xl m-auto p-4">
        <div className="flex mt-3">
          <Button variant="ghost" className="">
            <Star size={20} onClick={() => showView("articles")} />
          </Button>
          <Button variant="ghost" className="">
            <Mail size={20} onClick={() => showView("articles")} />
          </Button>
        </div>

        <h3 className="text-lg font-semibold">{selectedArticle?.title}</h3>
        <p className="text-gray-700">{selectedArticle?.content}</p>
      </div>
    </div>
  );
};
