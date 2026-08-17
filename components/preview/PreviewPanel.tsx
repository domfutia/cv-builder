"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useCV } from "@/context/CVContext";
import { CVDocument } from "./CVDocument";
import { Button } from "@/components/ui/Button";
import {
  ZoomIn,
  ZoomOut,
  Printer,
  Maximize2,
} from "lucide-react";

export const PreviewPanel: React.FC = () => {
  const { cvData } = useCV();
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateFitZoom = useCallback(() => {
    if (containerRef.current) {
      const padding = window.innerWidth < 640 ? 16 : 32;
      const containerWidth = containerRef.current.clientWidth - padding;
      const a4WidthPx = 794; // approx 210mm at 96 DPI
      const fitZoom = Math.min(Math.max(containerWidth / a4WidthPx, 0.25), 1.2);
      return Number(fitZoom.toFixed(2));
    }
    return window.innerWidth < 640 ? 0.45 : 0.85;
  }, []);

  // Automatic smart fit on initial load and resize for mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setZoomLevel(calculateFitZoom());
      }
    };

    // Run immediately and after a short delay for accurate mobile viewport measurement
    const t0 = setTimeout(handleResize, 50);
    const t1 = setTimeout(handleResize, 250);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateFitZoom]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(Number((prev + 0.1).toFixed(2)), 1.6));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(Number((prev - 0.1).toFixed(2)), 0.25));
  };

  const handleFitWidth = () => {
    setZoomLevel(calculateFitZoom());
  };

  const handleScaleChange = useCallback(() => {
    // auto-fit scale callback
  }, []);

  const handlePrint = () => {
    setIsExporting(true);
    const fileName =
      cvData.settings.pdfFileName?.trim() ||
      `${cvData.personalInfo.fullName.replace(/\s+/g, "_") || "Curriculum"}_CV`;
    const prevTitle = document.title;
    document.title = fileName;

    setTimeout(() => {
      window.print();
      setIsExporting(false);
      setTimeout(() => {
        document.title = prevTitle;
      }, 1000);
    }, 150);
  };

  // Dimensions for visual wrapper calculation
  const A4_WIDTH_PX = 794; // 210mm at 96 DPI
  const A4_HEIGHT_PX = 1123; // 297mm at 96 DPI
  const visualWidth = Math.max(150, Math.round(A4_WIDTH_PX * zoomLevel));
  const visualHeight = Math.max(200, Math.round(A4_HEIGHT_PX * zoomLevel));

  return (
    <div
      id="preview-panel-root"
      className="preview-root-container flex-1 flex flex-col h-full max-h-full min-h-0 w-full bg-neutral-100 dark:bg-[#0c0c0e] relative overflow-hidden transition-colors"
    >
      {/* Top Toolbar */}
      <div className="no-print p-2 sm:p-3 border-b border-neutral-200 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-950/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between gap-2 shrink-0 transition-colors">
        {/* Zoom Controls */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-neutral-100 dark:bg-neutral-900/80 p-0.5 sm:p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            aria-label="Riduci Zoom anteprima"
            className="p-1 sm:p-1.5 h-7 w-7 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
            title="Riduci Zoom"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>

          <span className="text-[11px] font-mono font-medium text-neutral-700 dark:text-neutral-300 px-1 select-none min-w-[34px] sm:min-w-[38px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            aria-label="Aumenta Zoom anteprima"
            className="p-1 sm:p-1.5 h-7 w-7 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
            title="Aumenta Zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>

          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800 mx-0.5" />

          <button
            type="button"
            onClick={handleFitWidth}
            aria-label="Adatta anteprima alla larghezza dello schermo"
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-2 py-1 rounded hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Adatta alla larghezza dello schermo"
          >
            <Maximize2 className="w-3 h-3" />
            <span className="hidden sm:inline">Adatta</span>
          </button>
        </div>

        {/* Print Action */}
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            disabled={isExporting}
            aria-label="Esporta CV in formato PDF o stampa"
            icon={<Printer className="w-3.5 h-3.5" />}
            className="shadow-sm font-semibold text-xs py-1.5 px-3 cursor-pointer"
          >
            <span className="hidden sm:inline">{isExporting ? "Generazione..." : "Esporta PDF / Stampa"}</span>
            <span className="inline sm:hidden">{isExporting ? "..." : "Scarica PDF"}</span>
          </Button>
        </div>
      </div>

      {/* Canvas Area: Full 2D Native Pan & Scrollable */}
      <div
        ref={containerRef}
        className="cv-canvas-container flex-1 min-h-0 w-full overflow-x-auto overflow-y-auto p-3 sm:p-8 relative"
        style={{
          WebkitOverflowScrolling: "touch",
          backgroundImage: `
            radial-gradient(circle at top, rgba(0, 0, 0, 0.03) 0%, transparent 70%),
            radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 24px 24px",
        }}
      >
        {/* Exact Visual Sizing Container to allow natural scrolling & centering in all directions */}
        <div
          className="cv-sheet-scale-wrapper mx-auto my-2"
          style={{
            width: `${visualWidth}px`,
            height: `${visualHeight}px`,
            minWidth: `${visualWidth}px`,
            minHeight: `${visualHeight}px`,
            position: "relative",
            marginBottom: "90px",
          }}
        >
          {/* Scaled A4 Document */}
          <div
            className="cv-shadow-wrapper rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.15),0_0_1px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_1px_rgba(255,255,255,0.2)] overflow-hidden bg-white"
            style={{
              width: "210mm",
              height: "297mm",
              minWidth: "210mm",
              maxWidth: "210mm",
              minHeight: "297mm",
              maxHeight: "297mm",
              transform: `scale(${zoomLevel})`,
              transformOrigin: "top left",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <CVDocument onScaleChange={handleScaleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};
