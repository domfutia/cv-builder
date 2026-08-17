"use client";

import React, { useState, useRef } from "react";
import { CVDocument } from "./CVDocument";
import { Button } from "@/components/ui/Button";
import {
  ZoomIn,
  ZoomOut,
  Printer,
  Sparkles,
} from "lucide-react";

export const PreviewPanel: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 1.4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.45));
  };

  const handleResetZoom = () => {
    setZoomLevel(0.85);
  };

  const handleFitWidth = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 48;
      const a4WidthPx = 794;
      const fitZoom = Math.min(Math.max(containerWidth / a4WidthPx, 0.4), 1.1);
      setZoomLevel(fitZoom);
    }
  };

  const handlePrint = () => {
    setIsExporting(true);
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 150);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-100 dark:bg-[#0c0c0e] relative overflow-hidden transition-colors">
      {/* Top Toolbar */}
      <div className="p-3 border-b border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/70 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between gap-3 transition-colors">
        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-900/80 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            className="p-1.5 h-7 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            title="Riduci Zoom"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>

          <span className="text-[11px] font-mono font-medium text-neutral-700 dark:text-neutral-300 px-2 select-none min-w-[42px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            className="p-1.5 h-7 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            title="Aumenta Zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>

          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800 mx-0.5" />

          <button
            type="button"
            onClick={handleResetZoom}
            className="text-[11px] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 px-2 py-0.5 rounded hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Ripristina 85%"
          >
            100%
          </button>
          <button
            type="button"
            onClick={handleFitWidth}
            className="text-[11px] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 px-2 py-0.5 rounded hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Adatta alla larghezza dello schermo"
          >
            Adatta
          </button>
        </div>

        {/* Live Status Badge & Print Action */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Sync</span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            disabled={isExporting}
            icon={<Printer className="w-3.5 h-3.5" />}
            className="shadow-sm font-semibold"
          >
            {isExporting ? "Generazione..." : "Esporta PDF / Stampa"}
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-6 sm:p-10 flex items-start justify-center relative select-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at top, rgba(0, 0, 0, 0.03) 0%, transparent 70%),
            radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 24px 24px",
        }}
      >
        {/* Document scaling container with realistic paper drop shadow */}
        <div
          className="transition-transform duration-200 origin-top flex justify-center pb-16"
          style={{
            transform: `scale(${zoomLevel})`,
          }}
        >
          <div className="rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.15),0_0_1px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_1px_rgba(255,255,255,0.2)]">
            <CVDocument />
          </div>
        </div>
      </div>
    </div>
  );
};
