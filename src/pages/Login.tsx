import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import icons from "../assets/svg/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type LoginFormValues = yup.InferType<typeof schema>;

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
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

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (
      storedUser.notificationEmails === data.email &&
      storedUser.password === data.password
    ) {
      onLogin();
      navigate("/todo");
    } else {
      alert("Invalid credentials");
    }
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
    </div>
  );
};

export default Login;
