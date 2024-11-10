import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import icons from "../assets/svg/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from "../shared/Loader";
import InputField from "../shared/Input";
import { loginSchema } from "../Validations/validations";

type LoginFormValues = yup.InferType<typeof loginSchema>;

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  isLoading: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoading }) => {
  const { logo } = icons;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    onLogin(data.email, data.password);
  };

  return (
    <div id="signup-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="signup-header">
          {logo}
          <h1>Login</h1>
        </div>

        {/* Use InputField for the email input */}
        <InputField
          name="email"
          type="email"
          placeholder="Email"
          register={register}
          errorMessage={errors.email?.message}
        />

        {/* Use InputField for the password input */}
        <InputField
          name="password"
          type="password"
          placeholder="Password"
          register={register}
          errorMessage={errors.password?.message}
        />

        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate("/signup")}>
          Create an account
        </button>
      </form>
      <Loader loading={isLoading} size={80} marginLeft="0" marginTop="20px" />
    </div>
  );
};

export default Login;
