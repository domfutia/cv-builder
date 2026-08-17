"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { CVDocument } from "./CVDocument";
import { Button } from "@/components/ui/Button";
import {
  ZoomIn,
  ZoomOut,
  Printer,
  Maximize2,
} from "lucide-react";

export const PreviewPanel: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateFitZoom = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 32;
      const a4WidthPx = 794; // approx 210mm at 96 DPI
      const fitZoom = Math.min(Math.max(containerWidth / a4WidthPx, 0.35), 1.15);
      return Number(fitZoom.toFixed(2));
    }
    return 0.85;
  }, []);

  // Automatic smart fit on initial load and resize for mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setZoomLevel(calculateFitZoom());
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateFitZoom]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(Number((prev + 0.1).toFixed(2)), 1.4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(Number((prev - 0.1).toFixed(2)), 0.35));
  };

  const handleFitWidth = () => {
    setZoomLevel(calculateFitZoom());
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
      <div className="p-2.5 sm:p-3 border-b border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/70 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between gap-2 transition-colors">
        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900/80 p-0.5 sm:p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            className="p-1 sm:p-1.5 h-7 w-7 sm:w-auto text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            title="Riduci Zoom"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>

          <span className="text-[11px] font-mono font-medium text-neutral-700 dark:text-neutral-300 px-1.5 select-none min-w-[38px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            className="p-1 sm:p-1.5 h-7 w-7 sm:w-auto text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            title="Aumenta Zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>

          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800 mx-0.5" />

          <button
            type="button"
            onClick={handleFitWidth}
            className="flex items-center gap-1 text-[11px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 px-2 py-0.5 rounded hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Adatta alla larghezza dello schermo"
          >
            <Maximize2 className="w-3 h-3 hidden sm:inline" />
            <span>Adatta</span>
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
            className="shadow-sm font-semibold text-xs py-1.5"
          >
            <span className="hidden sm:inline">{isExporting ? "Generazione..." : "Esporta PDF / Stampa"}</span>
            <span className="inline sm:hidden">{isExporting ? "..." : "Stampa PDF"}</span>
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center relative select-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at top, rgba(0, 0, 0, 0.03) 0%, transparent 70%),
            radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 24px 24px",
        }}
      >
        {/* Scaled Sheet with smooth transform */}
        <div
          className="transition-transform duration-200 origin-top flex justify-center pb-24"
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
