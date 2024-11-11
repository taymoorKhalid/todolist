import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  errorMessage?: string;
  id?: string;
  showErrorIcon?: boolean; // New prop to control the display of the error icon
  className?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const InputField = <T extends FieldValues>({
  name,
  type,
  placeholder,
  register,
  errorMessage,
  id,
  className,
  onKeyDown,
  showErrorIcon = false, // Default to false if not provided
}: InputFieldProps<T>) => {
  return (
    <>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        aria-invalid={errorMessage ? "true" : "false"} // Accessibility attribute for error state
        onKeyDown={onKeyDown}
      />
      {errorMessage && (
        <span className={className}>
          {showErrorIcon && (
            <i className="fas fa-exclamation-circle error-icon"></i> // Only render if showErrorIcon is true
          )}
          <p className="error-message">{errorMessage}</p>
        </span>
      )}
    </>
  );
};

export default InputField;
