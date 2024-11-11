import * as yup from "yup";

export const todoSchema = yup.object().shape({
  text: yup
    .string()
    .required("This field is required")
    .min(3, "Task should be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "Task should only contain letters"),
});
