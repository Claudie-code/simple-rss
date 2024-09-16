import Image from "next/image";

export default function Features() {
  const featureData = [
    {
      title: "The Essentials, Nothing More.",
      description:
        "Quickly add feeds and access articles with minimal distractions. Focus on what really matters: the content.",
      reverse: true,
      image: "/sidebar.png",
      altImage: "",
    },
    {
      title: "Your Space, Your Privacy",
      description:
        "Enjoy a distraction-free experience without tracking or ads. Your feeds are private and under your control.",
      reverse: false,
      image: "/articles.png",
      altImage: "",
    },
    {
      title: "Full Article View.",
      description:
        "Read complete articles within the app, no need to open a browser. Enjoy a clean and focused reading experience.",
      reverse: true,
      image: "/fullarticle1.png",
      altImage: "image of a full article",
    },
  ];

  return (
    <div className="space-y-5 pb-10 p-4 bg-white">
      <div className="top-[-210px] relative max-w-5xl m-auto">
        <Image
          src="/myfeeds.png"
          alt="myfeeds page"
          width={1920}
          height={1080}
        />
      </div>

      {featureData.map((feature, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            feature.reverse ? "xl:flex-row-reverse" : "xl:flex-row"
          } items-center xl:justify-center md:gap-16 pt-6 m-auto md:h-screen`}
        >
          <div
            className="p-6 w-full flex flex-col justify-center h-auto mt-0 md:w-[392px] lg:w-[360px]"
            data-aos="fade-down"
          >
            <h3 className="text-3xl font-semibold mb-4 text-slate-900">
              {feature.title}
            </h3>
            <p className="text-xl font-medium text-slate-400">
              {feature.description}
            </p>
          </div>
          <div className="max-w-xs" data-aos="fade-up">
            <Image
              src={feature.image}
              alt={feature.altImage}
              width={1920}
              height={1080}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
