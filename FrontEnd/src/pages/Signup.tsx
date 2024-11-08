import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import icons from "../assets/svg/icons";

import "./signup.css";
import Loader from "../shared/Loader";

// Validation Schema
const schema = yup.object().shape({
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

type FormValues = yup.InferType<typeof schema>;

interface SignupProps {
  onSignup: (data: { email: string; password: string }) => void;
  isLoading: boolean;
}

const Signup: React.FC<SignupProps> = ({ onSignup, isLoading }) => {
  const { logo } = icons;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;
    onSignup({ email, password }); // Call the Redux action
    navigate("/login"); // Navigate after signup
  };

  return (
    <div id="signup-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="signup-header">
          {logo}
          <h1>Signup</h1>
        </div>
        <input placeholder="First Name" {...register("firstName")} />
        <p>{errors.firstName?.message}</p>

        <input placeholder="Last Name" {...register("lastName")} />
        <p>{errors.lastName?.message}</p>

        <input placeholder="Email" {...register("email")} />
        <p>{errors.email?.message}</p>

        <input type="number" placeholder="Age" {...register("age")} />
        <p>{errors.age?.message}</p>

        <input
          placeholder="Notification Emails"
          {...register("notificationEmails")}
        />
        <p>{errors.notificationEmails?.message}</p>

        <input placeholder="Contact Number" {...register("contactNumber")} />
        <p>{errors.contactNumber?.message}</p>

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <p>{errors.confirmPassword?.message}</p>

        <button type="submit" disabled={!isValid}>
          Signup
        </button>
        <button type="button" onClick={() => navigate("/login")}>
          Already have an account? Login
        </button>
      </form>
      <Loader loading={isLoading} />
    </div>
  );
};

export default Signup;
