import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="text-slate-900 py-28 pb-60 flex items-center justify-center">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">Minimalist RSS Reader</h1>
        <p className="text-xl mb-4">
          Focus on what matters. A clean, distraction-free experience to keep
          you updated with your favorite content.
        </p>
        <Link href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-9">
            Get Started
          </button>
        </Link>
        <p className="text-md mt-2 text-slate-700">
          Enjoy a 30-day free trial, then continue for just $3/month.
          <br></br>
          Cancel anytime.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
