"use client";

import React, { useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useCV } from "@/context/CVContext";
import { Button } from "@/components/ui/Button";
import {
  Printer,
  RotateCcw,
  Trash2,
  Download,
  Upload,
  Sun,
  Moon,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { resetToSample, clearAll, exportJSON, importJSON } = useCV();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setTheme, resolvedTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        importJSON(parsed);
      } catch {
        alert("File JSON non valido o corrotto.");
      }
    };
    reader.readAsText(file);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="h-14 border-b border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 transition-colors">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xs shadow-xs transition-colors">
            CV
          </div>
          <span className="font-semibold text-sm tracking-tight text-neutral-900 dark:text-neutral-100 hidden sm:inline">
            Curriculum Builder
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
          Once UI Edition
        </span>
      </div>

      {/* Center / Action buttons */}
      <div className="flex items-center gap-2">
        {/* Hidden file input for JSON import */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="application/json"
          className="hidden"
        />

        {/* Theme Toggle Button */}
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            title={`Passa a tema ${resolvedTheme === "dark" ? "chiaro" : "scuro"}`}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-700 transition-transform duration-200 hover:-rotate-12" />
            )}
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={resetToSample}
          icon={<RotateCcw className="w-3.5 h-3.5" />}
          className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hidden md:inline-flex text-xs"
          title="Ripristina dati di esempio completi"
        >
          Dati Demo
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          icon={<Trash2 className="w-3.5 h-3.5" />}
          className="text-neutral-500 hover:text-red-500 dark:hover:text-red-400 hidden lg:inline-flex text-xs"
          title="Svuota tutti i campi del CV"
        >
          Svuota
        </Button>

        <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800 hidden md:block" />

        <Button
          variant="secondary"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          icon={<Upload className="w-3.5 h-3.5" />}
          className="text-neutral-700 dark:text-neutral-300 hidden md:inline-flex"
          title="Importa file di backup JSON"
        >
          Importa
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={exportJSON}
          icon={<Download className="w-3.5 h-3.5" />}
          className="text-neutral-700 dark:text-neutral-300 hidden sm:inline-flex"
          title="Esporta dati in formato JSON"
        >
          Salva JSON
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={handlePrint}
          icon={<Printer className="w-3.5 h-3.5" />}
          className="font-semibold shadow-xs"
        >
          Scarica PDF
        </Button>
      </div>
    </header>
  );
};
