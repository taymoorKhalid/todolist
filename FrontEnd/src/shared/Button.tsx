import React from "react";

// Define the props interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string; // Optional className prop
  children: React.ReactNode; // Allow any type of child elements
  ariaLabel?: string; // Optional aria-label prop
  disabled?: boolean; // Optional disabled prop
}

// Button Component
const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  className,
  ariaLabel,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
