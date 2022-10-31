import { RedirectToCheckoutOptions, StripeError } from "@stripe/stripe-js";

import { getStripe } from "./getStripe";

export const redirectToCheckout = async (
  checkoutOptions: RedirectToCheckoutOptions
): Promise<StripeError> => {
  const stripe = await getStripe();
  const { error } = await stripe!.redirectToCheckout(checkoutOptions);

  return error;
};
