import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import icons from "../assets/svg/icons";
import InputField from "../shared/Input"; // Import the InputField component
import Loader from "../shared/Loader";
import { signupSchema } from "../Validations/signup";
import * as yup from "yup";

import "./signup.css";
// Validation Schema

type FormValues = yup.InferType<typeof signupSchema>;

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
    resolver: yupResolver(signupSchema),
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
        {/* Use InputField for each input */}
        <InputField
          name="firstName"
          type="text"
          placeholder="First Name"
          register={register}
          errorMessage={errors.firstName?.message}
        />
        <InputField
          name="lastName"
          type="text"
          placeholder="Last Name"
          register={register}
          errorMessage={errors.lastName?.message}
        />
        <InputField
          name="email"
          type="email"
          placeholder="Email"
          register={register}
          errorMessage={errors.email?.message}
        />
        <InputField
          name="age"
          type="number"
          placeholder="Age"
          register={register}
          errorMessage={errors.age?.message}
        />
        <InputField
          name="notificationEmails"
          type="text"
          placeholder="Notification Emails"
          register={register}
          errorMessage={errors.notificationEmails?.message}
        />
        <InputField
          name="contactNumber"
          type="text"
          placeholder="Contact Number"
          register={register}
          errorMessage={errors.contactNumber?.message}
        />

        <InputField
          name="password"
          type="password"
          placeholder="Password"
          register={register}
          errorMessage={errors.password?.message}
        />
        <InputField
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          register={register}
          errorMessage={errors.confirmPassword?.message}
        />
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
