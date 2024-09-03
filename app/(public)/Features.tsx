export default function Features() {
  const featureData = [
    {
      title: "The Essentials, Nothing More.",
      description:
        "Add your favorite feeds in just a few clicks and access your articles without unnecessary distractions. The interface is designed to let you focus on what really matters: the content.",
      reverse: true,
    },
    {
      title: "Organized Automatically.",
      description:
        "Your feeds are automatically sorted into categories, so you can focus on reading without the hassle of manual organization. Simply add your feeds, and we'll take care of the rest.",
      reverse: false,
    },
    {
      title: "Full Article View.",
      description:
        "Read entire articles directly within the app, without needing to open your browser. Get the full content experience in a clean and distraction-free interface.",
      reverse: false,
    },
  ];

  return (
    <div className="space-y-5 pb-10 p-4 bg-white">
      <div className="bg-black top-[-150px] relative min-h-96 max-w-4xl m-auto"></div>

      {featureData.map((feature, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            feature.reverse ? "md:flex-row-reverse" : "md:flex-row"
          } items-center justify-between max-w-3xl m-auto md:h-screen`}
        >
          <div className="p-6 w-full flex flex-col justify-center h-auto mt-0 md:w-[392px] lg:w-[360px]">
            <h3 className="text-3xl font-semibold mb-4 text-slate-900">
              {feature.title}
            </h3>
            <p className="text-xl font-medium text-slate-400">
              {feature.description}
            </p>
          </div>
          <div className="h-80 w-full md:w-40 bg-black"></div>
        </div>
      ))}
    </div>
  );
}
