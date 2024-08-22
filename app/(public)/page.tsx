import Features from "./Features";
import Hero from "./Hero";
import Pricing from "./Pricing";

export default async function Index() {
  return (
    <div className="bg-gray-100">
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
}
