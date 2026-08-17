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
  FileText,
  Edit2,
  Check,
  Sparkles,
} from "lucide-react";

export const PreviewPanel: React.FC = () => {
  const { cvData, updatePdfFileName } = useCV();
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [autoFitScale, setAutoFitScale] = useState<number>(1);
  const [isEditingFileName, setIsEditingFileName] = useState<boolean>(false);
  const [tempFileName, setTempFileName] = useState<string>(
    cvData.settings.pdfFileName ||
      `${cvData.personalInfo.fullName.replace(/\s+/g, "_") || "Curriculum"}_CV`
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateFitZoom = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 24;
      const a4WidthPx = 794; // approx 210mm at 96 DPI
      const fitZoom = Math.min(Math.max(containerWidth / a4WidthPx, 0.25), 1.15);
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

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateFitZoom]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(Number((prev + 0.1).toFixed(2)), 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(Number((prev - 0.1).toFixed(2)), 0.25));
  };

  const handleFitWidth = () => {
    setZoomLevel(calculateFitZoom());
  };

  const handleSaveFileName = () => {
    const clean = tempFileName.trim().replace(/[/\\?%*:|"<>]/g, "");
    if (clean) {
      updatePdfFileName(clean);
    }
    setIsEditingFileName(false);
  };

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

  const currentFileName =
    cvData.settings.pdfFileName ||
    `${cvData.personalInfo.fullName.replace(/\s+/g, "_") || "Curriculum"}_CV`;

  return (
    <div className="flex flex-col h-full bg-neutral-100 dark:bg-[#0c0c0e] relative overflow-hidden transition-colors">
      {/* Top Toolbar */}
      <div className="p-2 sm:p-3 border-b border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/70 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between gap-2 transition-colors">
        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900/80 p-0.5 sm:p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            className="p-1 sm:p-1.5 h-7 w-7 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            title="Riduci Zoom"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>

          <span className="text-[11px] font-mono font-medium text-neutral-700 dark:text-neutral-300 px-1 select-none min-w-[36px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            className="p-1 sm:p-1.5 h-7 w-7 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            title="Aumenta Zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>

          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800 mx-0.5" />

          <button
            type="button"
            onClick={handleFitWidth}
            className="flex items-center gap-1 text-[11px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 px-1.5 py-0.5 rounded hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Adatta alla larghezza dello schermo"
          >
            <Maximize2 className="w-3 h-3 hidden sm:inline" />
            <span>Adatta</span>
          </button>
        </div>

        {/* PDF File Name Modifier Toolbar Input (Desktop) */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs">
          <FileText className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[10px] uppercase font-semibold text-neutral-400">PDF:</span>
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
                className="px-1.5 py-0.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded text-neutral-900 dark:text-white font-mono focus:outline-none max-w-[130px]"
                autoFocus
              />
              <span className="text-[10px] text-neutral-400 font-mono">.pdf</span>
              <button
                type="button"
                onClick={handleSaveFileName}
                className="p-1 rounded bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-950 hover:opacity-90 cursor-pointer"
              >
                <Check className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <span className="font-mono text-neutral-700 dark:text-neutral-300 max-w-[120px] truncate" title={currentFileName}>
                {currentFileName}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">.pdf</span>
              <button
                type="button"
                onClick={() => {
                  setTempFileName(currentFileName);
                  setIsEditingFileName(true);
                }}
                className="p-0.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded transition-colors cursor-pointer"
                title="Modifica nome file"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Auto-Fit Indicator & Print Action */}
        <div className="flex items-center gap-2">
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono"
            title="Adattamento automatico continuo per mantenere tutto il CV esattamente in 1 pagina A4"
          >
            <Sparkles className="w-3 h-3 text-emerald-500 shrink-0" />
            <span>
              {autoFitScale < 1
                ? `Auto-Fit: ${Math.round(autoFitScale * 100)}% (A4 Pagina Singola)`
                : "Auto-Fit: 100% (A4 Pagina Singola)"}
            </span>
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
            <span className="inline sm:hidden">{isExporting ? "..." : "PDF"}</span>
          </Button>
        </div>
      </div>

      {/* Canvas Area (Smooth touch scrollable & centered A4 Sheet) */}
      <div
        ref={containerRef}
        className="flex-1 overflow-x-auto overflow-y-auto p-2 sm:p-6 flex items-start justify-center relative select-none touch-pan-x touch-pan-y"
        style={{
          backgroundImage: `
            radial-gradient(circle at top, rgba(0, 0, 0, 0.03) 0%, transparent 70%),
            radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 24px 24px",
        }}
      >
        {/* Scaled Sheet Container */}
        <div
          className="transition-transform duration-200 origin-top flex justify-center pb-28 pt-2 w-[210mm] shrink-0"
          style={{
            transform: `scale(${zoomLevel})`,
            width: "210mm",
          }}
        >
          <div className="w-[210mm] min-w-[210mm] max-w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.15),0_0_1px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_1px_rgba(255,255,255,0.2)] overflow-hidden">
            <CVDocument onScaleChange={setAutoFitScale} />
          </div>
        </div>
      </div>
    </div>
  );
};
