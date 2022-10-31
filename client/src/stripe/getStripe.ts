import { loadStripe, Stripe } from "@stripe/stripe-js";

interface StripeItem {
  price: string;
  quantity: number;
}

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY!);
  }

  return stripePromise;
};
