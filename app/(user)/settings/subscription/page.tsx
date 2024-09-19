import ButtonCustomerPortal from "@/components/button-customer-portal";
import Pricing from "@/components/ui/Pricing";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { calculateDaysRemaining } from "@/utils/date";

export default async function Billing() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: customer } = await supabase
    .from("customers")
    .select("has_access")
    .eq("user_id", user.id)
    .single();

  const hasAccess = customer?.has_access ?? false;
  const daysRemaining = calculateDaysRemaining(new Date(user.created_at), 8);

  return (
    <div className="p-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Subscription</h2>

      {daysRemaining > 0 ? (
        <p className="mb-4">
          You have <span className="font-semibold">{daysRemaining} days</span>{" "}
          remaining in your free trial.
          <br />
          Subscription options will be available after your trial period ends.
        </p>
      ) : hasAccess ? (
        <>
          <p className="mb-6">You have an active subscription.</p>
          <ButtonCustomerPortal email={user.email!} id={user.id} />
        </>
      ) : (
        <>
          <p className="mb-4">
            Your trial has ended. Subscribe now to get access!
          </p>
          <Pricing
            email={user.email!}
            id={user.id}
            hasAccess={hasAccess}
            daysRemaining={daysRemaining}
          />
        </>
      )}
    </div>
  );
}
