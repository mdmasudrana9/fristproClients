import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  href?: string;
  variant?: "primary" | "outlined" | "text";
  className?: string;
  icon?: ReactNode;
}

const AppButton = ({
  label,
  href,
  variant = "primary",
  className = "",
  icon,
  ...props
}: AppButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 px-4 py-2 rounded";

  const variantStyles = {
    primary: "bg-[#0074D9] hover:bg-[#0066CC] text-white",
    outlined: "border border-[#0074D9] text-[#0074D9] hover:bg-[#0074D9]/10",
    text: "text-[#0074D9] hover:underline",
  };

  const buttonContent = (
    <span className="flex items-center gap-2">
      {icon}
      {label}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default AppButton;
