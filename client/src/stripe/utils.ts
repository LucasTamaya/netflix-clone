import {
  RedirectToCheckoutOptions,
  StripeError,
  loadStripe,
  Stripe,
} from "@stripe/stripe-js";

import { StripeItem } from "../types";
import { checkoutOptions } from "./assets";

export const handleSubscribe = async (
  productItem: StripeItem,
  netflixPlan: "Basic" | "Standard" | "Premium"
) => {
  localStorage.setItem("netflixPlan", netflixPlan);

  const error = await redirectToCheckout({
    ...checkoutOptions,
    lineItems: [productItem],
  });

  if (error) {
    alert(error.message);
  }
};

export const redirectToCheckout = async (
  checkoutOptions: RedirectToCheckoutOptions
): Promise<StripeError> => {
  const stripe = await getStripe();
  const { error } = await stripe!.redirectToCheckout(checkoutOptions);

  return error;
};

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY!);
  }

  return stripePromise;
};
