import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("This email address is invalid")
    .required("Required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Required"),
}).required();
