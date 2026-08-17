"use client";

import React, { useRef, useState, useSyncExternalStore } from "react";
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
  FileText,
  Edit2,
  Check,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { cvData, updatePdfFileName, resetToSample, clearAll, exportJSON, importJSON } = useCV();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const [isEditingFileName, setIsEditingFileName] = useState(false);
  const [tempFileName, setTempFileName] = useState(
    cvData.settings.pdfFileName || `${cvData.personalInfo.fullName.replace(/\s+/g, "_") || "Curriculum"}_CV`
  );

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

  const handleSaveFileName = () => {
    const clean = tempFileName.trim().replace(/[/\\?%*:|"<>]/g, "");
    if (clean) {
      updatePdfFileName(clean);
    }
    setIsEditingFileName(false);
  };

  const handlePrint = () => {
    const fileName =
      cvData.settings.pdfFileName?.trim() ||
      `${cvData.personalInfo.fullName.replace(/\s+/g, "_") || "Curriculum"}_CV`;
    const previousTitle = document.title;
    document.title = fileName;
    window.print();
    setTimeout(() => {
      document.title = previousTitle;
    }, 1000);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const currentFileName =
    cvData.settings.pdfFileName ||
    `${cvData.personalInfo.fullName.replace(/\s+/g, "_") || "Curriculum"}_CV`;

  return (
    <header className="h-14 border-b border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6 transition-colors">
      {/* Brand & Logo "CIVVU" */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center font-extrabold text-xs tracking-wider shadow-xs transition-colors">
            CV
          </div>
          <span className="font-extrabold text-base tracking-tight text-neutral-900 dark:text-neutral-100">
            CIVVU
          </span>
        </div>

        {/* Customizable PDF File Name Chip (Desktop / Tablet) */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs">
          <FileText className="w-3.5 h-3.5 text-neutral-400" />
          {isEditingFileName ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={tempFileName}
                onChange={(e) => setTempFileName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveFileName();
                  if (e.key === "Escape") setIsEditingFileName(false);
                }}
                className="px-1.5 py-0.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded text-neutral-900 dark:text-white font-mono focus:outline-none max-w-[150px]"
                autoFocus
              />
              <span className="text-[10px] text-neutral-400 font-mono">.pdf</span>
              <button
                type="button"
                onClick={handleSaveFileName}
                className="p-1 rounded bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-950 hover:opacity-90 transition-opacity cursor-pointer"
                title="Salva nome file"
              >
                <Check className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <span className="font-mono text-neutral-700 dark:text-neutral-300 max-w-[140px] truncate" title={currentFileName}>
                {currentFileName}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">.pdf</span>
              <button
                type="button"
                onClick={() => {
                  setTempFileName(currentFileName);
                  setIsEditingFileName(true);
                }}
                className="p-0.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded transition-colors cursor-pointer ml-0.5"
                title="Modifica nome file PDF per il download"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Center / Action buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
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
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white h-8 w-8"
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
          className="text-neutral-700 dark:text-neutral-300 hidden md:inline-flex text-xs"
          title="Importa file di backup JSON"
        >
          Importa
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={exportJSON}
          icon={<Download className="w-3.5 h-3.5" />}
          className="text-neutral-700 dark:text-neutral-300 hidden sm:inline-flex text-xs"
          title="Esporta dati in formato JSON"
        >
          Salva JSON
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={handlePrint}
          icon={<Printer className="w-3.5 h-3.5" />}
          className="font-semibold shadow-xs text-xs px-2.5 sm:px-3.5 py-1.5"
        >
          <span>Scarica PDF</span>
        </Button>
      </div>
    </header>
  );
};
