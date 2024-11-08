import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../pages/Signup";

interface InputFieldProps {
  name: keyof FormValues; // Name typed with FormValues
  type: string;
  placeholder: string;
  register: UseFormRegister<FormValues>; // Register typed with FieldValues
  errorMessage?: string;
}

const Input: React.FC<InputFieldProps> = ({
  name,
  type,
  placeholder,
  register,
  errorMessage,
}) => {
  return (
    <div className="input-field">
      <input type={type} placeholder={placeholder} {...register(name)} />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Input;
