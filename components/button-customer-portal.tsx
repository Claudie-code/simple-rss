"use client";

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

// Customer portal link
const customerPortalLink =
  "https://billing.stripe.com/p/login/test_aEU3ga3Zg6db4pO3cc";

const ButtonCustomerPortal = ({ email, id }: { email: string; id: string }) => {
  return (
    <Link
      href={
        customerPortalLink +
        "?prefilled_email=" +
        email +
        "&client_reference_id=" +
        id
      }
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-2 px-4 rounded-lg w-full text-center"
    >
      Billing
    </Link>
  );
};

export default ButtonCustomerPortal;
