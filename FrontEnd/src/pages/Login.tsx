import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import icons from "../assets/svg/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from "../shared/Loader";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type LoginFormValues = yup.InferType<typeof schema>;

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
    resolver: yupResolver(schema),
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
        <input placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email?.message}</p>}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password?.message}</p>}
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
