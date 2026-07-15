import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/supabase/admin";
import type Stripe from "stripe";

export const runtime = "nodejs";

/**
 * Stripe webhook handler — the source of truth for payment state.
 * Verifies the signature, then processes events idempotently.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    return NextResponse.json(
      { error: `Signature verification failed: ${(err as Error).message}` },
      { status: 400 }
    );
  }

  const admin = createAdminClient();

  // Idempotency: record the event id before processing; skip if already seen.
  const { error: insertError } = await admin
    .from("webhook_events")
    .insert({ id: event.id, type: event.type } as never);
  if (insertError) {
    // Unique violation on `id` means this event was already processed.
    if (insertError.code === "23505") {
      return NextResponse.json({ received: true, deduped: true });
    }
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      // TODO: Activate subscription / mark deal funded.
      break;
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      // TODO: Sync subscription tier + status to the `subscriptions` table.
      break;
    case "payment_intent.succeeded":
      // TODO: Mark deal active, record transaction.
      break;
    case "account.updated":
      // TODO: Update athlete Connect onboarding status.
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
