"use client";

import React, { useRef, useState, useEffect, useSyncExternalStore } from "react";
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
  ChevronDown,
  Sparkles,
  Globe,
} from "lucide-react";
import { demoProfiles } from "@/data/demoProfiles";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const {
    cvData,
    updatePdfFileName,
    resetToSample,
    loadDemoProfile,
    clearAll,
    exportJSON,
    importJSON,
    language,
    setLanguage,
    t,
  } = useCV();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const demoDropdownRef = useRef<HTMLDivElement>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const [isEditingFileName, setIsEditingFileName] = useState(false);
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [tempFileName, setTempFileName] = useState(
    cvData.settings.pdfFileName || `${cvData.personalInfo.fullName.replace(/\s+/g, "_") || "Curriculum"}_CV`
  );

  // Close demo dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (demoDropdownRef.current && !demoDropdownRef.current.contains(event.target as Node)) {
        setShowDemoMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        alert(t.jsonImportError);
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

  const handleClearAll = () => {
    if (confirm(t.clearAllConfirm)) {
      clearAll();
    }
  };

  const currentFileName =
    cvData.settings.pdfFileName ||
    `${cvData.personalInfo.fullName.replace(/\s+/g, "_") || "Curriculum"}_CV`;

  return (
    <header className="h-14 border-b border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-2.5 sm:px-6 transition-colors">
      {/* Brand & Logo "CIVVU" */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center font-extrabold text-xs tracking-wider shadow-xs transition-colors">
            CV
          </div>
          <span className="font-extrabold text-base tracking-tight text-neutral-900 dark:text-neutral-100">
            {t.appName}
          </span>
        </div>

        {/* Customizable PDF File Name Chip */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs">
          <FileText className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
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
                className="px-1.5 py-0.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded text-neutral-900 dark:text-white font-mono focus:outline-none max-w-[85px] sm:max-w-[150px]"
                autoFocus
              />
              <span className="text-[10px] text-neutral-400 font-mono">.pdf</span>
              <button
                type="button"
                onClick={handleSaveFileName}
                className="p-1 rounded bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-950 hover:opacity-90 transition-opacity cursor-pointer"
                title={t.savePdfNameTitle}
              >
                <Check className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <span className="font-mono text-neutral-700 dark:text-neutral-300 max-w-[65px] xs:max-w-[95px] sm:max-w-[140px] truncate text-[11px] sm:text-xs" title={currentFileName}>
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
                title={t.editPdfNameTitle}
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Center / Action buttons */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Hidden file input for JSON import */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="application/json"
          className="hidden"
        />

        {/* Language Switcher IT / EN (Responsive on Mobile and Desktop) */}
        <div
          className="flex items-center bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-0.5 text-xs shadow-2xs"
          role="group"
          aria-label={t.languageToggle}
        >
          <button
            type="button"
            onClick={() => setLanguage("it")}
            aria-label="Passa alla lingua Italiana"
            className={cn(
              "px-2 py-0.5 rounded font-bold text-[11px] transition-all cursor-pointer select-none",
              language === "it"
                ? "bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-2xs"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
            )}
            title="Italiano"
          >
            IT
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            aria-label="Switch to English language"
            className={cn(
              "px-2 py-0.5 rounded font-bold text-[11px] transition-all cursor-pointer select-none",
              language === "en"
                ? "bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-2xs"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
            )}
            title="English"
          >
            EN
          </button>
        </div>

        {/* Theme Toggle Button */}
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={resolvedTheme === "dark" ? t.themeToggleLight : t.themeToggleDark}
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white h-8 w-8 cursor-pointer"
            title={resolvedTheme === "dark" ? t.themeToggleLight : t.themeToggleDark}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-700 transition-transform duration-200 hover:-rotate-12" />
            )}
          </Button>
        )}

        {/* Demo Profiles Dropdown */}
        <div className="relative inline-block" ref={demoDropdownRef}>
          <button
            type="button"
            onClick={() => setShowDemoMenu(!showDemoMenu)}
            aria-expanded={showDemoMenu}
            aria-label={t.demoProfilesTooltip}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer border border-neutral-200 dark:border-neutral-800"
            title={t.demoProfilesTooltip}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="hidden sm:inline">{t.demoProfilesTitle}</span>
            <ChevronDown className={cn("w-3 h-3 text-neutral-400 transition-transform", showDemoMenu && "rotate-180")} />
          </button>

          {showDemoMenu && (
            <div className="fixed sm:absolute right-2 sm:right-0 top-14 sm:top-auto sm:mt-2 w-72 max-w-[calc(100vw-16px)] rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-1.5 z-50 space-y-1">
              <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                {t.demoProfilesSubtitle}
              </div>

              {demoProfiles.map((prof) => (
                <button
                  key={prof.id}
                  type="button"
                  onClick={() => {
                    loadDemoProfile(prof.id);
                    setShowDemoMenu(false);
                  }}
                  className="w-full text-left flex items-start gap-2.5 px-2.5 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <span className="text-base shrink-0 mt-0.5">{prof.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                      {prof.name}
                    </div>
                    <div className="text-[10.5px] text-neutral-500 dark:text-neutral-400 truncate">
                      {prof.role}
                    </div>
                  </div>
                </button>
              ))}

              <div className="border-t border-neutral-100 dark:border-neutral-800 pt-1 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    resetToSample();
                    setShowDemoMenu(false);
                  }}
                  className="w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t.resetDefault}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          aria-label={t.clearAll}
          icon={<Trash2 className="w-3.5 h-3.5" />}
          className="text-neutral-500 hover:text-red-500 dark:hover:text-red-400 hidden lg:inline-flex text-xs cursor-pointer"
          title={t.clearAll}
        >
          {t.clearAll}
        </Button>

        <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800 hidden md:block" />

        <Button
          variant="secondary"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          aria-label={t.importJson}
          icon={<Upload className="w-3.5 h-3.5" />}
          className="text-neutral-700 dark:text-neutral-300 hidden md:inline-flex text-xs cursor-pointer"
          title={t.importJson}
        >
          {t.importJson}
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={exportJSON}
          aria-label={t.saveJson}
          icon={<Download className="w-3.5 h-3.5" />}
          className="text-neutral-700 dark:text-neutral-300 hidden sm:inline-flex text-xs cursor-pointer"
          title={t.saveJson}
        >
          {t.saveJson}
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={handlePrint}
          aria-label={t.downloadPdf}
          icon={<Printer className="w-3.5 h-3.5" />}
          className="font-semibold shadow-xs text-xs px-2.5 sm:px-3.5 py-1.5 cursor-pointer"
        >
          <span>{t.downloadPdf}</span>
        </Button>
      </div>
    </header>
  );
};
