import { RedirectToCheckoutOptions } from "@stripe/stripe-js";

import { StripeItem } from "../types";

export const checkoutOptions: RedirectToCheckoutOptions = {
  lineItems: [],
  mode: "subscription",
  successUrl: `${window.location.origin}/checkout-success`,
  cancelUrl: `${window.location.origin}/select-plans`,
};

export const netflixBasicItem: StripeItem = {
  price: "price_1Lyu1MFxdiVTh0ldrLQmDNQ2",
  quantity: 1,
};

export const netflixStandardItem: StripeItem = {
  price: "price_1Lyu1oFxdiVTh0ldfNyvfK6q",
  quantity: 1,
};

export const netflixPremiumItem: StripeItem = {
  price: "price_1Lyu2AFxdiVTh0ldMUhK9yWJ",
  quantity: 1,
};
