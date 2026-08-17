"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive";
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = "default",
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    default:
      "bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800/80 shadow-2xs dark:shadow-none backdrop-blur-sm",
    elevated:
      "bg-white dark:bg-neutral-900/90 border-neutral-200 dark:border-neutral-700/80 shadow-md shadow-neutral-200/50 dark:shadow-xl dark:shadow-black/40 backdrop-blur-md",
    interactive:
      "bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/80 transition-all duration-200 cursor-pointer shadow-2xs dark:shadow-none",
  };

  return (
    <div
      className={cn(
        "rounded-xl border p-4 sm:p-5 transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
