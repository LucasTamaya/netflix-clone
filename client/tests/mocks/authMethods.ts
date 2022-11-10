import { AuthMethodsProps } from "tests/types";

export const authMethods: AuthMethodsProps[] = [
  {
    initialTitle: "Login",
    reverseTitle: "Register",
    successUrl: "/browse",
  },
  {
    initialTitle: "Register",
    reverseTitle: "Login",
    successUrl: "/select-plans",
  },
];
