"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { FormPanel } from "@/components/form/FormPanel";
import { PreviewPanel } from "@/components/preview/PreviewPanel";
import { Edit3, Eye, Printer } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="app-root" className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#09090b] transition-colors duration-200">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Split Screen Layout */}
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-3.5rem)] overflow-hidden split-layout relative">
        {/* Left Column: Form Panel */}
        <section
          className={cn(
            "w-full lg:w-[46%] xl:w-[44%] 2xl:w-[40%] h-full flex flex-col pb-16 lg:pb-0",
            mobileView === "form" ? "flex" : "hidden lg:flex"
          )}
        >
          <FormPanel />
        </section>

        {/* Right Column: Live Preview Panel */}
        <section
          className={cn(
            "flex-1 h-full flex flex-col pb-16 lg:pb-0",
            mobileView === "preview" ? "flex" : "hidden lg:flex"
          )}
        >
          <PreviewPanel />
        </section>

        {/* Mobile Floating Action Bar (Pill on bottom) */}
        <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-1.5 rounded-full border border-neutral-300/80 dark:border-neutral-700/80 shadow-2xl shadow-black/20 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMobileView("form")}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer",
              mobileView === "form"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            )}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Modifica</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileView("preview")}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer",
              mobileView === "preview"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Anteprima</span>
          </button>

          <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700 mx-0.5" />

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            title="Stampa / Esporta PDF"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>
    </div>
  );
}
