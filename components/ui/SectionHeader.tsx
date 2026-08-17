"use client";

import React, { useState } from "react";
import { Edit2, Check, X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  editableTitle?: boolean;
  onTitleChange?: (newTitle: string) => void;
  canDelete?: boolean;
  onDelete?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon,
  action,
  className,
  editableTitle = false,
  onTitleChange,
  canDelete = false,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  const handleSave = () => {
    if (tempTitle.trim() && onTitleChange) {
      onTitleChange(tempTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempTitle(title);
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800/80 mb-6 transition-colors",
        className
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {icon && (
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-1.5 max-w-sm">
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") handleCancel();
                }}
                className="px-2.5 py-1 text-sm font-semibold rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white w-full focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-400"
                autoFocus
              />
              <button
                type="button"
                onClick={handleSave}
                className="p-1.5 rounded-md bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-950 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                title="Conferma titolo"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="p-1.5 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                title="Annulla"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight truncate">
                {title}
              </h3>
              {editableTitle && (
                <button
                  type="button"
                  onClick={() => {
                    setTempTitle(title);
                    setIsEditing(true);
                  }}
                  className="p-1 rounded text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Rinomina titolo della sezione"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {subtitle && !isEditing && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {action}
        {canDelete && onDelete && (
          <button
            type="button"
            onClick={() => {
              if (confirm(`Sei sicuro di voler rimuovere la sezione "${title}" dal CV?`)) {
                onDelete();
              }
            }}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg border border-red-200 dark:border-red-900/40 transition-colors cursor-pointer"
            title="Elimina questa sezione dal CV"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Elimina Sezione</span>
          </button>
        )}
      </div>
    </div>
  );
};
