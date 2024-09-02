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
      className="btn"
    >
      Billing
    </Link>
  );
};

export default ButtonCustomerPortal;
