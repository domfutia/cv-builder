"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  debounceMs?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  icon,
  className,
  value = "",
  onChange,
  debounceMs = 150,
  id,
  placeholder,
  disabled,
  type = "text",
  ...props
}) => {
  const [prevValue, setPrevValue] = useState<string>(value);
  const [localValue, setLocalValue] = useState<string>(value);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  // Sync state during render when prop changes
  if (value !== prevValue) {
    setPrevValue(value);
    setLocalValue(value);
  }

  // Clear pending debounce timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (onChange) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        onChange(newValue);
      }, debounceMs);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (onChange && localValue !== value) {
      onChange(localValue);
    }
    props.onBlur?.(e);
  };

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold tracking-wide text-neutral-600 dark:text-neutral-400 uppercase transition-colors"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-lg bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800/90 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 shadow-2xs dark:shadow-none",
            "py-2 px-3 text-sm tracking-tight transition-all duration-200",
            "hover:border-neutral-300 dark:hover:border-neutral-700/90 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/90",
            "focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-neutral-400/15 focus:bg-white dark:focus:bg-neutral-950",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            icon ? "pl-9" : "pl-3",
            error && "border-red-500/70 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-xs text-red-500 dark:text-red-400 mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};
