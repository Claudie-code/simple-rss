import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/utils/supabase/server"; // Import your Supabase client

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "product.deleted",
  "price.created",
  "price.updated",
  "price.deleted",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret)
      return new Response("Webhook secret not found.", { status: 400 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      const supabase = createClient(); // Initialize Supabase client

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          const customerId = session.customer as string;
          const userId = session.client_reference_id as string;

          // Retrieve customer data from Stripe
          const customer = await stripe.customers.retrieve(customerId);

          if (userId) {
            // Fetch or create the user in your Supabase 'customers' table
            const { data: existingCustomer, error } = await supabase
              .from("customers")
              .select("*")
              .eq("user_id", userId)
              .single();

            if (!existingCustomer) {
              // Vérifie que l'objet customer est un Customer et non un DeletedCustomer
              if (!customer.deleted) {
                const { data: newCustomer, error: insertError } = await supabase
                  .from("customers")
                  .insert({
                    user_id: userId,
                    email: customer.email || "", // TypeScript est maintenant satisfait
                    name: customer.name,
                    customer_id: customerId,
                    has_access: true, // Grant access upon successful subscription
                  })
                  .select("*")
                  .single();

                if (insertError) throw insertError;
              } else {
                throw new Error("Customer is deleted");
              }
            }
          } else {
            throw new Error("User ID not found in session");
          }

          break;
        }

        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          const customerId = subscription.customer as string;

          // Fetch the customer by Stripe customer ID and revoke access
          const { error: revokeError } = await supabase
            .from("customers")
            .update({ has_access: false }) // Revoke access
            .eq("customer_id", customerId);

          if (revokeError) throw revokeError;

          break;
        }

        default:
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      console.log(error);
      return new Response(
        "Webhook handler failed. View your Next.js function logs.",
        {
          status: 400,
        }
      );
    }
  } else {
    return new Response(`Unsupported event type: ${event.type}`, {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ received: true }));
}
