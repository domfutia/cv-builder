"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "md",
  icon,
  children,
  className,
  disabled,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none rounded-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

  const sizeStyles = {
    sm: "text-xs px-2.5 py-1.5 gap-1.5",
    md: "text-xs px-3.5 py-2 gap-2",
    lg: "text-sm px-4 py-2.5 gap-2.5",
    icon: "p-2 w-8 h-8 sm:w-9 sm:h-9",
  };

  const variantStyles = {
    primary:
      "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 font-semibold dark:hover:bg-white dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] border border-neutral-900 dark:border-white/20 shadow-xs",
    secondary:
      "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-100 dark:bg-neutral-900/90 dark:text-neutral-200 dark:hover:text-white dark:hover:bg-neutral-800/90 dark:border-neutral-800 dark:hover:border-neutral-700 shadow-2xs dark:shadow-xs",
    outline:
      "bg-transparent text-neutral-700 hover:text-neutral-900 border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100/60 dark:text-neutral-300 dark:hover:text-white dark:border-neutral-800 dark:hover:border-neutral-600 dark:hover:bg-neutral-900/50",
    ghost:
      "bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-900/70 border border-transparent",
    danger:
      "bg-red-50 text-red-600 hover:bg-red-100 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/60 dark:hover:text-red-200 dark:border-red-900/50",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
