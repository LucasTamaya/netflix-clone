import { AuthMethodsProps } from "tests/types";

export const authMethods: AuthMethodsProps[] = [
  {
    initialTitle: "Login",
    reverseTitle: "Register",
    changePath: "/register",
  },
  {
    initialTitle: "Register",
    reverseTitle: "Login",
    changePath: "/login",
  },
];
