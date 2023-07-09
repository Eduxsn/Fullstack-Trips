import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: 'primary' | 'outlined' | 'danger'
}

function Button({ className, variant = 'primary', ...props }: ButtonProps) {

  const variantClasses = {
    primary: "bg-primary text-white transition-all hover:bg-primaryDarker",
    outlined: "bg-transparent border-2 border-primary text-primary",
    danger: "bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
  }
  const _className = twMerge(
    variantClasses[variant],
    "appearance-none rounded-lg p-2 text-sm font-medium shadow",
    className
  );

  return (
    <button className={_className} {...props}>
      {props.children}
    </button>
  );
}

export default Button;