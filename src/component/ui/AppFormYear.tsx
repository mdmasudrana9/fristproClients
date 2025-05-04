"use client";

import type React from "react";
import { useMemo } from "react";
import { useFormContext, type FieldError } from "react-hook-form";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  ChevronDown,
  Calendar,
} from "lucide-react";

interface AppFormYearProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  startYear?: number;
  endYear?: number;
  descending?: boolean;
  linkedField?: string;
  valueMap?: Record<string, string>;
}

const AppFormYear = ({
  name,
  label,
  placeholder = "Select year",
  required = false,
  helperText,
  disabled = false,
  size = "md",
  className = "",
  startYear = 1950,
  endYear = new Date().getFullYear() + 10,
  descending = true,
  linkedField,
  valueMap,
}: AppFormYearProps) => {
  const {
    register,
    formState: { errors, dirtyFields },
    setValue,
  } = useFormContext();

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

  // Generate years array
  const years = useMemo(() => {
    const yearsArray = [];
    for (let year = startYear; year <= endYear; year++) {
      yearsArray.push(year.toString());
    }
    return descending ? yearsArray.reverse() : yearsArray;
  }, [startYear, endYear, descending]);

  // Handle change to update linked field if provided
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    // If we have a linked field and a value map, update the linked field
    if (linkedField && valueMap) {
      if (!selectedValue) {
        setValue(linkedField, "", {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else if (valueMap[selectedValue]) {
        setValue(linkedField, valueMap[selectedValue], {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
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
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Calendar size={18} />
        </div>

        <select
          id={name}
          disabled={disabled}
          {...register(name, {
            required: required ? `${label || name} is required` : false,
            onChange: handleChange,
          })}
          className={`w-full rounded-lg border transition-all duration-200 bg-white focus:ring-2 focus:outline-none appearance-none
            pl-10 pr-10
            ${sizeClasses[size]}
            ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}
            ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : isValid
                ? "border-green-300 focus:border-green-500 focus:ring-green-100"
                : "border-gray-300 focus:border-blue-300 focus:ring-blue-100"
            }`}
        >
          <option value="">{placeholder}</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          <ChevronDown size={18} />
        </div>

        {error && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-red-500">
            <AlertCircle size={18} />
          </div>
        )}
        {isValid && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-green-500">
            <CheckCircle2 size={18} />
          </div>
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

export default AppFormYear;
