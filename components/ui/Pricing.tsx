"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Label } from "./label";
import { Input } from "./input";
import { Check } from "lucide-react";

export const plans = [
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_3cs6ry3p95nYfSg3cc"
        : "https://buy.stripe.com/bIY5lLgc4bTs9I43cd",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1PsmFtDPBcNeao6xP6js4IbJ"
        : "",
    price: 3,
    duration: "/month",
  },
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_28ocPW0cX4jUcG43cd"
        : "https://buy.stripe.com/aEUaG5cZSe1AbQcaEE",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1PsmUVDPBcNeao6xnAtNXeGv"
        : "",
    price: 30,
    duration: "/year",
  },
];

export default function Pricing({
  email,
  id,
  hasAccess,
  daysRemaining,
}: {
  email: string;
  id: string;
  hasAccess: boolean;
  daysRemaining: number;
}) {
  const [plan, setPlan] = useState(plans[0]);

  useEffect(() => {
    if (daysRemaining <= 0 && !hasAccess) {
      toast.error("Your trial has ended. Subscribe now to get access!");
    }
  }, [daysRemaining, hasAccess]);

  return (
    <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-8">
      <div className=" w-full max-w-md">
        <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 border bg-slate-50 p-8 rounded-xl">
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg block text-center"
              target="_blank"
              href={
                plan.link +
                "?prefilled_email=" +
                email +
                "&client_reference_id=" +
                id
              }
            >
              Subscribe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
