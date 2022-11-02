import { StripeItem } from "../types";
import { checkoutOptions } from "./assets";
import { redirectToCheckout } from "./redirectToCheckout";

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
