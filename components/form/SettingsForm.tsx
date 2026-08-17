"use client";

import React from "react";
import { useCV } from "@/context/CVContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Sliders, Layout, Type, Palette, MoveVertical, Check, Pipette } from "lucide-react";
import { CVTemplate, CVFontSize, CVSpacing } from "@/types/cv";
import { cn } from "@/lib/utils";

export const SettingsForm: React.FC = () => {
  const { cvData, updateSettings } = useCV();
  const { settings } = cvData;

  const templates: { id: CVTemplate; name: string; desc: string }[] = [
    {
      id: "minimal",
      name: "Once UI Minimal",
      desc: "Tipografia ultra-pulita, contrasti monocromatici, timeline asimmetrica.",
    },
    {
      id: "modern",
      name: "Modern Sidebar",
      desc: "Due colonne bilanciate con profilo & competenze a sinistra ed esperienze a destra.",
    },
    {
      id: "executive",
      name: "Executive Clean",
      desc: "Struttura solida e formale, ideale per ruoli senior e posizioni di leadership.",
    },
  ];

  const primaryTextPresets = [
    { name: "Obsidian Black", hex: "#0a0a0a" },
    { name: "Charcoal Zinc", hex: "#27272a" },
    { name: "Deep Slate", hex: "#1e293b" },
    { name: "Midnight Navy", hex: "#0f172a" },
  ];

  const accentColorPresets = [
    { name: "Monocromatico", hex: "#171717" },
    { name: "Zinc Grey", hex: "#52525b" },
    { name: "Indigo Tech", hex: "#4338ca" },
    { name: "Emerald Pro", hex: "#047857" },
    { name: "Sky Studio", hex: "#0284c7" },
    { name: "Rose Velvet", hex: "#be123c" },
    { name: "Amber Ochre", hex: "#b45309" },
  ];

  const fontSizes: { id: CVFontSize; name: string }[] = [
    { id: "sm", name: "Compatto (sm)" },
    { id: "base", name: "Bilanciato (base)" },
    { id: "lg", name: "Ampio (lg)" },
  ];

  const spacings: { id: CVSpacing; name: string }[] = [
    { id: "compact", name: "Compatto" },
    { id: "normal", name: "Normale" },
    { id: "relaxed", name: "Ampio" },
  ];

  const currentPrimaryText = settings.primaryTextColor || "#0a0a0a";
  const currentAccent = settings.accentColorHex || "#171717";

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Personalizzazione & Layout"
        subtitle="Scegli il template, la palette dei colori, la densità del testo e gli stili tipografici"
        icon={<Sliders className="w-5 h-5" />}
      />

      {/* Template Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide flex items-center gap-2">
          <Layout className="w-3.5 h-3.5" /> Template del Documento
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => updateSettings({ template: tpl.id })}
              className={cn(
                "p-3.5 rounded-xl border text-left transition-all relative cursor-pointer",
                settings.template === tpl.id
                  ? "bg-neutral-100 dark:bg-neutral-800/80 border-neutral-900 dark:border-neutral-400 text-neutral-900 dark:text-white ring-1 ring-neutral-900/20 dark:ring-neutral-400/30"
                  : "bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200 shadow-2xs dark:shadow-none"
              )}
            >
              {settings.template === tpl.id && (
                <span className="absolute top-2.5 right-2.5 p-0.5 rounded-full bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-950">
                  <Check className="w-3 h-3" />
                </span>
              )}
              <h5 className="font-semibold text-xs text-neutral-900 dark:text-neutral-100">{tpl.name}</h5>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">{tpl.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Selettore Colore Testo Principale */}
      <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800/80">
        <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide flex items-center gap-2">
          <Type className="w-3.5 h-3.5" /> Colore Font Principale
        </label>
        <div className="flex flex-wrap items-center gap-2.5">
          {primaryTextPresets.map((preset) => (
            <button
              key={preset.hex}
              type="button"
              onClick={() => updateSettings({ primaryTextColor: preset.hex })}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer",
                currentPrimaryText.toLowerCase() === preset.hex.toLowerCase()
                  ? "bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white border-neutral-800 dark:border-neutral-400 ring-1 ring-neutral-400/30"
                  : "bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700"
              )}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-neutral-400 shrink-0"
                style={{ backgroundColor: preset.hex }}
              />
              <span>{preset.name}</span>
            </button>
          ))}

          {/* Custom Color Picker for Text */}
          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer hover:border-neutral-400 transition-all">
            <Pipette className="w-3.5 h-3.5 text-neutral-500" />
            <span>Personalizzato</span>
            <input
              type="color"
              value={currentPrimaryText}
              onChange={(e) => updateSettings({ primaryTextColor: e.target.value })}
              className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
            />
          </label>
        </div>
      </div>

      {/* Selettore Accento Cromatico */}
      <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800/80">
        <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide flex items-center gap-2">
          <Palette className="w-3.5 h-3.5" /> Accento Cromatico (Titoli & Badge)
        </label>
        <div className="flex flex-wrap items-center gap-2.5">
          {accentColorPresets.map((acc) => (
            <button
              key={acc.hex}
              type="button"
              onClick={() => updateSettings({ accentColorHex: acc.hex, accentColor: "custom" })}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer",
                currentAccent.toLowerCase() === acc.hex.toLowerCase()
                  ? "bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white border-neutral-800 dark:border-neutral-400 ring-1 ring-neutral-400/30"
                  : "bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700"
              )}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: acc.hex }}
              />
              <span>{acc.name}</span>
            </button>
          ))}

          {/* Custom Color Picker for Accent */}
          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer hover:border-neutral-400 transition-all">
            <Pipette className="w-3.5 h-3.5 text-neutral-500" />
            <span>Personalizzato</span>
            <input
              type="color"
              value={currentAccent}
              onChange={(e) =>
                updateSettings({ accentColorHex: e.target.value, accentColor: "custom" })
              }
              className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
            />
          </label>
        </div>
      </div>

      {/* Dimensione Carattere e Spaziatura */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800/80">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide flex items-center gap-2">
            <Type className="w-3.5 h-3.5" /> Dimensione Testo
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {fontSizes.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => updateSettings({ fontSize: f.id })}
                className={cn(
                  "py-1.5 px-2 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer",
                  settings.fontSize === f.id
                    ? "bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-950 border-neutral-900 dark:border-neutral-300 font-semibold"
                    : "bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                )}
              >
                {f.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide flex items-center gap-2">
            <MoveVertical className="w-3.5 h-3.5" /> Spaziatura Righe
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {spacings.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => updateSettings({ spacing: s.id })}
                className={cn(
                  "py-1.5 px-2 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer",
                  settings.spacing === s.id
                    ? "bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-950 border-neutral-900 dark:border-neutral-300 font-semibold"
                    : "bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mostra Foto Profilo Toggle */}
      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800/80">
        <Card className="flex items-center justify-between p-3.5 bg-white dark:bg-neutral-900/70">
          <div>
            <h5 className="text-xs font-semibold text-neutral-900 dark:text-neutral-200">
              Mostra Foto Profilo
            </h5>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Mostra l'avatar circolare nell'intestazione del CV
            </p>
          </div>
          <button
            type="button"
            onClick={() => updateSettings({ showAvatar: !settings.showAvatar })}
            className={cn(
              "w-11 h-6 rounded-full transition-colors relative cursor-pointer focus:outline-none",
              settings.showAvatar
                ? "bg-neutral-900 dark:bg-neutral-200"
                : "bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
            )}
          >
            <span
              className={cn(
                "block w-4 h-4 rounded-full transition-transform absolute top-1",
                settings.showAvatar
                  ? "bg-white dark:bg-neutral-950 translate-x-6"
                  : "bg-neutral-500 translate-x-1"
              )}
            />
          </button>
        </Card>
      </div>
    </div>
  );
};
