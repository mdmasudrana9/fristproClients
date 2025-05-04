"use client";

import type React from "react";
import { useMemo } from "react";
import { useFormContext, type FieldError } from "react-hook-form";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  ChevronDown,
  CalendarDays,
} from "lucide-react";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

interface MonthOption {
  label: string;
  value: string;
  numeric: string;
}

interface AppFormMonthProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  format?: "long" | "short" | "numeric";
  startMonth?: number; // 1-12
  linkedField?: string;
  valueMap?: Record<string, string>;
  descending?: boolean;
}

const MONTHS: MonthOption[] = [
  { label: "January", value: "january", numeric: "01" },
  { label: "February", value: "february", numeric: "02" },
  { label: "March", value: "march", numeric: "03" },
  { label: "April", value: "april", numeric: "04" },
  { label: "May", value: "may", numeric: "05" },
  { label: "June", value: "june", numeric: "06" },
  { label: "July", value: "july", numeric: "07" },
  { label: "August", value: "august", numeric: "08" },
  { label: "September", value: "september", numeric: "09" },
  { label: "October", value: "october", numeric: "10" },
  { label: "November", value: "november", numeric: "11" },
  { label: "December", value: "december", numeric: "12" },
];

const AppFormMonth = ({
  name,
  label,
  placeholder = "Select month",
  required = false,
  helperText,
  disabled = false,
  size = "md",
  className = "",
  format = "long",
  startMonth = 1, // January
  linkedField,
  valueMap,
  descending = false,
}: AppFormMonthProps) => {
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

  // Generate months array with proper formatting and order
  const months = useMemo(() => {
    // Reorder months if startMonth is not January
    let orderedMonths = [...MONTHS];
    if (startMonth > 1) {
      orderedMonths = [
        ...MONTHS.slice(startMonth - 1),
        ...MONTHS.slice(0, startMonth - 1),
      ];
    }

    // Format month labels based on format prop
    const formattedMonths = orderedMonths.map((month) => ({
      ...month,
      displayLabel:
        format === "long"
          ? month.label
          : format === "short"
          ? month.label.substring(0, 3)
          : month.numeric,
    }));

    return descending ? [...formattedMonths].reverse() : formattedMonths;
  }, [startMonth, format, descending]);

  // Handle change to update linked field if provided
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    // If we have a linked field and a value map, update the linked field
    if (linkedField) {
      if (!selectedValue) {
        setValue(linkedField, "", {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else if (valueMap && valueMap[selectedValue]) {
        setValue(linkedField, valueMap[selectedValue], {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else {
        // If no valueMap is provided, use the month's numeric value
        const selectedMonth = MONTHS.find((m) => m.value === selectedValue);
        if (selectedMonth) {
          setValue(linkedField, selectedMonth.numeric, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
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
          <CalendarDays size={18} />
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
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {capitalizeFirstLetter(month.displayLabel)}
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

export default AppFormMonth;
