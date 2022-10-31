import { RedirectToCheckoutOptions } from "@stripe/stripe-js";

import { getStripe } from "./getStripe";

export const redirectToCheckout = async (
  checkoutOptions: RedirectToCheckoutOptions
) => {
  const stripe = await getStripe();
  const { error } = await stripe!.redirectToCheckout(checkoutOptions);

  if (error) {
    console.log(error.message);
  }
};
