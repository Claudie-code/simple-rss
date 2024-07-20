import { FeedWithArticles } from "@/types/collection";
import AddFeedForm from "./AddFeedForm";

type Props = {
  showView: Function;
  feeds: FeedWithArticles[];
};

export const FeedsView = ({ showView, feeds }: Props) => {
  return (
    <div className="space-y-2">
      <AddFeedForm />
      <h2 className="text-2xl font-semibold mb-4">My Feeds</h2>
      <div className="space-y-4">
        {feeds.map((feed) => (
          <div
            key={feed.id}
            className="p-4 bg-slate-50 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => showView("articles", feed)}
          >
            {feed.title}
          </div>
        ))}
      </div>
    </div>
  );
};
