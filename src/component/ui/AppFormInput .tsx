// components/form/AppFormInput.tsx
"use client";

import React, { useState } from "react";
import { useFormContext, type FieldError } from "react-hook-form";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Info } from "lucide-react";

interface AppFormInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
}

const AppFormInput = ({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  helperText,
  disabled = false,
  readOnly = false,
  size = "md",
  icon,
  className = "",
}: AppFormInputProps) => {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const error = errors[name] as FieldError | undefined;
  const isDirty = dirtyFields[name];
  const isValid = isDirty && !error;

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5",
    lg: "px-5 py-3 text-lg",
  };

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`block mb-1.5 font-medium text-gray-800 ${labelSizeClasses[size]}`}
        >
          {label} {required && <span className="text-blue-600">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}

        <input
          id={name}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          {...register(name, {
            required: required ? `${label || name} is required` : false,
          })}
          className={`w-full rounded-lg border transition-all duration-200 bg-white focus:ring-2 focus:outline-none
            ${icon ? "pl-10" : ""}
            ${type === "password" ? "pr-10" : ""}
            ${sizeClasses[size]}
            ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}
            ${readOnly ? "bg-gray-50 cursor-default" : ""}
            ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : isValid
                ? "border-green-300 focus:border-green-500 focus:ring-green-100"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {!type.includes("password") && (
          <>
            {error && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                <AlertCircle size={18} />
              </div>
            )}
            {isValid && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                <CheckCircle2 size={18} />
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-1.5 min-h-[20px]">
        {error ? (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={14} />
            {error.message}
          </p>
        ) : helperText ? (
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Info size={14} />
            {helperText}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default AppFormInput;
