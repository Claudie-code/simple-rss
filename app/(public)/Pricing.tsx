"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import React, { useState } from "react";

export const plans = [
  {
    price: 3,
    duration: "/month",
  },
  {
    price: 30,
    duration: "/year",
  },
];

const Pricing = () => {
  const [plan, setPlan] = useState(plans[0]);

  return (
    <section className="bg-gray-100 text-gray-900 py-16">
      <div className="mx-auto px-4">
        <h2 className="text-4xl text-center font-bold mb-12">Simple Pricing</h2>
        <div className="m-auto w-full max-w-md">
          <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 border bg-gray-50 p-8 rounded-xl">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Input
                  className="h-4 w-4"
                  onChange={() => setPlan(plans[0])}
                  type="radio"
                  id="monthly"
                  name="monthly"
                  checked={plan.price === 3}
                />
                <Label htmlFor="monthly">Pay monthly</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  className="h-4 w-4"
                  onChange={() => setPlan(plans[1])}
                  type="radio"
                  id="yearly"
                  name="yearly"
                  checked={plan.price === 30}
                />
                <Label htmlFor="yearly">Pay yearly (17% OFF 💰)</Label>
              </div>
            </div>

            <div className="flex gap-2">
              <p className={`text-5xl tracking-tight font-extrabold`}>
                ${plan.price}
              </p>
              <div className="flex flex-col justify-end mb-[4px]">
                <p className="text-sm tracking-wide text-base-content/80 uppercase font-semibold">
                  {plan.duration}
                </p>
              </div>
            </div>

            <p className="text-md text-gray-700">
              Get started with a 30-day free trial. <br />
              No credit card required to start.
            </p>
            <ul className="space-y-2.5 leading-relaxed text-base flex-1">
              {[
                {
                  name: "Unlimited feeds",
                },
                { name: "Ad-free experience" },
                { name: "No data tracking" },
                { name: "Automatic updates" },
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check />

                  <span>{feature.name} </span>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <a
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 block rounded-lg w-full text-center"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
