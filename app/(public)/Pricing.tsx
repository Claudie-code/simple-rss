import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import React from "react";

const Pricing = () => {
  return (
    <section className="bg-gray-100 text-gray-900 py-16">
      <div className="mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Simple Pricing</h2>
        <div className="flex justify-center">
          <div className="max-w-2xl p-8 rounded-lg shadow-md bg-white">
            <p className="text-xl mb-2">
              <span className="text-2xl">€3</span>{" "}
              <span className="text-gray-700">per month</span>
            </p>
            <p className="text-lg mb-8">
              Get started with a 30-day free trial. <br />
              No credit card required to start.
            </p>
            <ul className="text-left mb-8 space-y-4">
              <li className="flex items-center space-x-2">
                <Check />
                <span>Unlimited feeds</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check />
                <span>Ad-free experience</span>
              </li>

              <li className="flex items-center space-x-2">
                <Check />
                <span>No data tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check />
                <span>Automatic updates</span>
              </li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
      <Separator className="max-w-4xl m-auto mt-20" />
    </section>
  );
};

export default Pricing;
