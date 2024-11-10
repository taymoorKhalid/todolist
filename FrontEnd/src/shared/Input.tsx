import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>; // Allows `name` to be typed as a key of the form's type
  type: string;
  placeholder: string;
  register: UseFormRegister<T>; // Generic type for `register`
  errorMessage?: string;
}

const InputField = <T extends FieldValues>({
  name,
  type,
  placeholder,
  register,
  errorMessage,
}: InputFieldProps<T>) => {
  return (
    <div className="input-field">
      <input type={type} placeholder={placeholder} {...register(name)} />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default InputField;
