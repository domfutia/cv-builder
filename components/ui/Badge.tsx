"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "accent";
  onRemove?: () => void;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  onRemove,
  className,
}) => {
  const variantStyles = {
    default:
      "bg-neutral-100 dark:bg-neutral-800/90 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700/80",
    secondary:
      "bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800",
    outline:
      "bg-transparent text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700",
    accent:
      "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-800 dark:border-neutral-200 font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono tracking-tight border transition-colors",
        variantStyles[variant],
        className
      )}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-100 transition-colors p-0.5 -mr-0.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700/50 cursor-pointer"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
