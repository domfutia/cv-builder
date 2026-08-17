"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label?: string;
  helperText?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  debounceMs?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  helperText,
  error,
  className,
  value = "",
  onChange,
  debounceMs = 150,
  id,
  placeholder,
  rows = 4,
  disabled,
  ...props
}) => {
  const [localValue, setLocalValue] = useState<string>(value);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
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
          htmlFor={textareaId}
          className="block text-xs font-semibold tracking-wide text-neutral-600 dark:text-neutral-400 uppercase transition-colors"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800/90 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 shadow-2xs dark:shadow-none",
          "p-3 tracking-tight transition-all duration-200 resize-y",
          "hover:border-neutral-300 dark:hover:border-neutral-700/90 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/90",
          "focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-neutral-400/15 focus:bg-white dark:focus:bg-neutral-950",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error && "border-red-500/70 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error ? (
        <p className="text-xs text-red-500 dark:text-red-400 mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};
