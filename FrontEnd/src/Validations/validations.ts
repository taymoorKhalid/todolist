import * as yup from "yup";

export const signupSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required(),
  age: yup
    .number()
    .min(18, "Must be at least 18")
    .max(151, "Must be less than 151")
    .required(),
  notificationEmails: yup
    .string()
    .required("At least one notification email is required")
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(,\s*[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)*$/,
      "Please enter valid comma-separated emails"
    ),
  contactNumber: yup.string().length(11, "Must be 11 digits"),
  password: yup
    .string()
    .required()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must have one uppercase, lowercase, and digit"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});
