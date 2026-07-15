import Stripe from "stripe";

let _stripe: Stripe | null = null;

/**
 * Lazily-initialised server-side Stripe client.
 * Lazy init keeps `next build` from failing when the key isn't present.
 */
export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  // Omit apiVersion to use the SDK's pinned default and the account's version.
  _stripe = new Stripe(key);
  return _stripe;
}

export const PLANS = {
  free: { name: "Free", priceId: null, price: 0 },
  pro: { name: "Pro", priceId: process.env.STRIPE_PRICE_PRO ?? "", price: 2900 },
  elite: { name: "Elite", priceId: process.env.STRIPE_PRICE_ELITE ?? "", price: 9900 },
} as const;

export type PlanTier = keyof typeof PLANS;
