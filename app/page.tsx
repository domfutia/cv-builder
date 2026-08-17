"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { FormPanel } from "@/components/form/FormPanel";
import { PreviewPanel } from "@/components/preview/PreviewPanel";
import { Edit3, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");

  return (
    <div id="app-root" className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#09090b] transition-colors duration-200">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Mobile Tab Switcher (Visible only on small screens) */}
      <div className="lg:hidden flex items-center justify-center p-2 bg-white/90 dark:bg-neutral-950/90 border-b border-neutral-200 dark:border-neutral-800/80 sticky top-14 z-20 backdrop-blur-md">
        <div className="flex bg-neutral-100 dark:bg-neutral-900 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 w-full max-w-xs">
          <button
            type="button"
            onClick={() => setMobileView("form")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer",
              mobileView === "form"
                ? "bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white shadow-2xs dark:shadow-xs font-semibold"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            )}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Modifica Dati</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView("preview")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer",
              mobileView === "preview"
                ? "bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white shadow-2xs dark:shadow-xs font-semibold"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Anteprima Live</span>
          </button>
        </div>
      </div>

      {/* Main Split Screen Layout */}
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-3.5rem)] overflow-hidden split-layout">
        {/* Left Column: Form Panel */}
        <section
          className={cn(
            "w-full lg:w-[46%] xl:w-[44%] 2xl:w-[40%] h-full flex flex-col",
            mobileView === "form" ? "flex" : "hidden lg:flex"
          )}
        >
          <FormPanel />
        </section>

        {/* Right Column: Live Preview Panel */}
        <section
          className={cn(
            "flex-1 h-full flex flex-col",
            mobileView === "preview" ? "flex" : "hidden lg:flex"
          )}
        >
          <PreviewPanel />
        </section>
      </main>
    </div>
  );
}
