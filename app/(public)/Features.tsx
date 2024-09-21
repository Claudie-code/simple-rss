import Image from "next/image";

export default function Features() {
  return (
    <div className="pb-10  bg-white">
      <div className="top-[-230px] relative max-w-5xl m-auto overflow-hidden">
        <Image
          src="/macbookarticle.png"
          alt="myfeeds page"
          width={1920}
          height={1080}
          priority
          className="hidden sm:flex px-4"
        />
        <Image
          src="/desktop.png"
          alt="myfeeds page"
          width={1920}
          height={1080}
          priority
          className="sm:hidden w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 pl-4"
        />
      </div>

      {/* Premier feature */}
      <div className="flex flex-col xl:flex-row-reverse items-center xl:justify-center md:gap-16 m-auto md:h-screen px-4">
        <div
          className="px-6 pb-6 w-full flex flex-col justify-center h-auto mt-0 md:w-[392px] lg:w-[360px]"
          data-aos="fade-down"
        >
          <h3 className="text-3xl font-semibold mb-4 text-slate-900">
            The Essentials, <br />
            Nothing More.
          </h3>
          <p className="text-xl font-medium text-slate-400">
            Quickly add feeds and access articles with minimal distractions.
            Focus on what really matters: the content.
          </p>
        </div>
        <div className="max-w-xs" data-aos="fade-up">
          <Image
            src="/sidebar.png"
            alt="sidebar simpleRSS app"
            width={1920}
            height={1080}
            loading="lazy"
          />
        </div>
      </div>

      {/* Deuxième feature */}
      <div className="flex flex-col xl:flex-row items-center xl:justify-center md:gap-16 pt-10 m-auto md:h-screen px-4">
        <div
          className="p-6 w-full flex flex-col justify-center h-auto mt-0 md:w-[392px] lg:w-[360px]"
          data-aos="fade-down"
        >
          <h3 className="text-3xl font-semibold mb-4 text-slate-900">
            Your Space, <br />
            Your Privacy
          </h3>
          <p className="text-xl font-medium text-slate-400">
            Enjoy a distraction-free experience without tracking or ads. Your
            feeds are private and under your control.
          </p>
        </div>
        <div className="max-w-xs" data-aos="fade-up">
          <Image
            src="/articles.png"
            alt="list of articles simpleRSS app"
            width={1920}
            height={1080}
            loading="lazy"
          />
        </div>
      </div>

      {/* Troisième feature */}
      <div className="flex flex-col xl:flex-row-reverse items-center xl:justify-center md:gap-16 pt-10 m-auto md:h-screen px-4">
        <div
          className="p-6 w-full flex flex-col justify-center h-auto mt-0 md:w-[392px] lg:w-[360px]"
          data-aos="fade-down"
        >
          <h3 className="text-3xl font-semibold mb-4 text-slate-900">
            Full Article View.
          </h3>
          <p className="text-xl font-medium text-slate-400">
            Read complete articles within the app, no need to open a browser.
            Enjoy a clean and focused reading experience.
          </p>
        </div>
        <div className="max-w-xs" data-aos="fade-up">
          <Image
            src="/fullarticle1.png"
            alt="image of a full article"
            width={1920}
            height={1080}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
