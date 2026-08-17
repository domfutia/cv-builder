"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCV } from "@/context/CVContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import {
  Sliders,
  Layout,
  Type,
  Palette,
  MoveVertical,
  Check,
  Pipette,
  GripVertical,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  Edit2,
} from "lucide-react";
import { CVTemplate, CVFontSize, CVSpacing, SectionOrderConfig } from "@/types/cv";
import { themePresets, defaultSectionOrder } from "@/data/initialCV";
import { cn } from "@/lib/utils";

// Sortable row component with editable section label
const SortableSectionItem: React.FC<{
  section: SectionOrderConfig;
  onToggleVisibility: () => void;
  onUpdateLabel: (newLabel: string) => void;
}> = ({ section, onToggleVisibility, onUpdateLabel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempLabel, setTempLabel] = useState(section.label);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  const handleSaveLabel = () => {
    if (tempLabel.trim()) {
      onUpdateLabel(tempLabel.trim());
    }
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center justify-between p-2.5 rounded-lg border transition-all select-none touch-none gap-2",
        section.isVisible
          ? "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200"
          : "bg-neutral-100/60 dark:bg-neutral-950/60 border-neutral-200/60 dark:border-neutral-800/40 text-neutral-400 dark:text-neutral-600"
      )}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {isEditing ? (
          <div className="flex items-center gap-1.5 flex-1 max-w-xs">
            <input
              type="text"
              value={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveLabel();
              }}
              className="px-2 py-0.5 text-xs rounded bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white w-full focus:outline-none focus:border-neutral-500"
              autoFocus
            />
            <button
              type="button"
              onClick={handleSaveLabel}
              className="px-2 py-0.5 text-[11px] font-semibold bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-950 rounded cursor-pointer"
            >
              OK
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 truncate flex-1">
            <span className="text-xs font-medium truncate">{section.label}</span>
            <button
              type="button"
              onClick={() => {
                setTempLabel(section.label);
                setIsEditing(true);
              }}
              className="opacity-60 hover:opacity-100 p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-opacity cursor-pointer"
              title="Rinomina titolo della sezione"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onToggleVisibility}
        className={cn(
          "p-1.5 rounded-md transition-colors cursor-pointer shrink-0",
          section.isVisible
            ? "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            : "text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-400"
        )}
        title={section.isVisible ? "Nascondi sezione nel CV" : "Mostra sezione nel CV"}
      >
        {section.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};

export const SettingsForm: React.FC = () => {
  const {
    cvData,
    updateSettings,
    updateSectionOrder,
    updateSectionLabel,
    toggleSectionVisibility,
    applyThemePreset,
  } = useCV();
  const { settings } = cvData;
  const [activeSettingsTab, setActiveSettingsTab] = useState<"layout" | "presets" | "colors">("layout");

  const sectionsList = settings.sectionOrder && settings.sectionOrder.length > 0
    ? settings.sectionOrder
    : defaultSectionOrder;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sectionsList.findIndex((item) => item.id === active.id);
      const newIndex = sectionsList.findIndex((item) => item.id === over.id);
      updateSectionOrder(arrayMove(sectionsList, oldIndex, newIndex));
    }
  };

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

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Personalizzazione & Struttura"
        subtitle="Scegli template, riordina le sezioni del CV, rinomina i titoli e configura gli stili"
        icon={<Sliders className="w-5 h-5" />}
      />

      {/* Sub-tab navigation */}
      <div className="flex bg-neutral-100 dark:bg-neutral-900 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
        <button
          type="button"
          onClick={() => setActiveSettingsTab("layout")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer",
            activeSettingsTab === "layout"
              ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-2xs dark:shadow-xs font-semibold"
              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
          )}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Layout & Sezioni</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSettingsTab("presets")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer",
            activeSettingsTab === "presets"
              ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-2xs dark:shadow-xs font-semibold"
              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
          )}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stili Predefiniti</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSettingsTab("colors")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer",
            activeSettingsTab === "colors"
              ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-2xs dark:shadow-xs font-semibold"
              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
          )}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Colori Granulari</span>
        </button>
      </div>

      {/* TAB 1: Layout, Template & Riordino Sezioni */}
      {activeSettingsTab === "layout" && (
        <div className="space-y-6">
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
                      : "bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200"
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

          {/* Riordino Sezioni del CV con Drag & Drop e Rinominazione Titoli */}
          <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800/80">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" /> Riordino Sezioni & Titoli Personalizzati
                </label>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Trascina le sezioni, clicca sull&apos;icona matita per personalizzare il titolo o usa l&apos;occhio per nasconderle
                </p>
              </div>
              <button
                type="button"
                onClick={() => updateSectionOrder(defaultSectionOrder)}
                className="text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline cursor-pointer"
              >
                Reset ordine
              </button>
            </div>

            <Card className="p-3 bg-neutral-50/50 dark:bg-neutral-950/40">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sectionsList.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {sectionsList.map((section) => (
                      <SortableSectionItem
                        key={section.id}
                        section={section}
                        onToggleVisibility={() => toggleSectionVisibility(section.key)}
                        onUpdateLabel={(newLabel) => updateSectionLabel(section.key, newLabel)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </Card>
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
        </div>
      )}

      {/* TAB 2: Stili Predefiniti (Theme Presets) */}
      {activeSettingsTab === "presets" && (
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
              Temi Curati Once UI
            </h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              Applica con 1-click una palette cromatica professionale perfettamente bilanciata
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {themePresets.map((preset) => {
              const isSelected = settings.themePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyThemePreset(preset.id)}
                  className={cn(
                    "p-3.5 rounded-xl border text-left transition-all relative cursor-pointer group flex flex-col justify-between h-full",
                    isSelected
                      ? "bg-neutral-100 dark:bg-neutral-800/90 border-neutral-900 dark:border-neutral-400 shadow-xs ring-1 ring-neutral-900/20 dark:ring-neutral-400/30"
                      : "bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/90"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                        {preset.name}
                      </h5>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
                        {preset.description}
                      </p>
                    </div>

                    {isSelected && (
                      <span className="p-0.5 rounded-full bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-950 shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 pt-3 mt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <span className="text-[10px] text-neutral-400 font-mono">Palette:</span>
                    <div className="flex items-center gap-1">
                      {preset.previewColors.map((color, cIdx) => (
                        <span
                          key={cIdx}
                          className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Personalizzazione Granulare dei Colori */}
      {activeSettingsTab === "colors" && (
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
              Controllo Colori Dettagliato
            </h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              Personalizza ogni elemento cromatico del documento A4
            </p>
          </div>

          <div className="space-y-3">
            {/* 1. Titolo Principale & Nome */}
            <Card className="p-3 bg-white dark:bg-neutral-900/80 flex items-center justify-between gap-3">
              <div>
                <h5 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Nome & Titoli Sezione
                </h5>
                <p className="text-[11px] text-neutral-500">Colore del nome in alto e titoli H1/H2</p>
              </div>
              <label className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 cursor-pointer">
                <span
                  className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                  style={{ backgroundColor: settings.primaryTextColor || "#09090b" }}
                />
                <span className="text-xs font-mono">{settings.primaryTextColor || "#09090b"}</span>
                <input
                  type="color"
                  value={settings.primaryTextColor || "#09090b"}
                  onChange={(e) => updateSettings({ primaryTextColor: e.target.value, themePreset: "custom" })}
                  className="w-0 h-0 opacity-0 pointer-events-none absolute"
                />
                <Pipette className="w-3 h-3 text-neutral-400" />
              </label>
            </Card>

            {/* 2. Sottotitoli & Date */}
            <Card className="p-3 bg-white dark:bg-neutral-900/80 flex items-center justify-between gap-3">
              <div>
                <h5 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Sottotitoli, Ruoli & Date
                </h5>
                <p className="text-[11px] text-neutral-500">Colore dei ruoli aziendali e intervalli temporali</p>
              </div>
              <label className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 cursor-pointer">
                <span
                  className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                  style={{ backgroundColor: settings.secondaryTextColor || "#52525b" }}
                />
                <span className="text-xs font-mono">{settings.secondaryTextColor || "#52525b"}</span>
                <input
                  type="color"
                  value={settings.secondaryTextColor || "#52525b"}
                  onChange={(e) => updateSettings({ secondaryTextColor: e.target.value, themePreset: "custom" })}
                  className="w-0 h-0 opacity-0 pointer-events-none absolute"
                />
                <Pipette className="w-3 h-3 text-neutral-400" />
              </label>
            </Card>

            {/* 3. Testo Corpo & Bullet points */}
            <Card className="p-3 bg-white dark:bg-neutral-900/80 flex items-center justify-between gap-3">
              <div>
                <h5 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Testo Corpo & Paragrafi
                </h5>
                <p className="text-[11px] text-neutral-500">Colore delle descrizioni e punti elenco</p>
              </div>
              <label className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 cursor-pointer">
                <span
                  className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                  style={{ backgroundColor: settings.bodyTextColor || "#3f3f46" }}
                />
                <span className="text-xs font-mono">{settings.bodyTextColor || "#3f3f46"}</span>
                <input
                  type="color"
                  value={settings.bodyTextColor || "#3f3f46"}
                  onChange={(e) => updateSettings({ bodyTextColor: e.target.value, themePreset: "custom" })}
                  className="w-0 h-0 opacity-0 pointer-events-none absolute"
                />
                <Pipette className="w-3 h-3 text-neutral-400" />
              </label>
            </Card>

            {/* 4. Accento Cromatico & Bordi */}
            <Card className="p-3 bg-white dark:bg-neutral-900/80 flex items-center justify-between gap-3">
              <div>
                <h5 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Accento & Linee Divisorie
                </h5>
                <p className="text-[11px] text-neutral-500">Colore di demarcazione, icone e link</p>
              </div>
              <label className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 cursor-pointer">
                <span
                  className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                  style={{ backgroundColor: settings.accentColorHex || "#18181b" }}
                />
                <span className="text-xs font-mono">{settings.accentColorHex || "#18181b"}</span>
                <input
                  type="color"
                  value={settings.accentColorHex || "#18181b"}
                  onChange={(e) => updateSettings({ accentColorHex: e.target.value, themePreset: "custom" })}
                  className="w-0 h-0 opacity-0 pointer-events-none absolute"
                />
                <Pipette className="w-3 h-3 text-neutral-400" />
              </label>
            </Card>

            {/* 5. Sfondo del Foglio A4 */}
            <Card className="p-3 bg-white dark:bg-neutral-900/80 flex items-center justify-between gap-3">
              <div>
                <h5 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Sfondo del Foglio CV
                </h5>
                <p className="text-[11px] text-neutral-500">Colore di fondo della carta stampata</p>
              </div>
              <label className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 cursor-pointer">
                <span
                  className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                  style={{ backgroundColor: settings.paperBgColor || "#ffffff" }}
                />
                <span className="text-xs font-mono">{settings.paperBgColor || "#ffffff"}</span>
                <input
                  type="color"
                  value={settings.paperBgColor || "#ffffff"}
                  onChange={(e) => updateSettings({ paperBgColor: e.target.value, themePreset: "custom" })}
                  className="w-0 h-0 opacity-0 pointer-events-none absolute"
                />
                <Pipette className="w-3 h-3 text-neutral-400" />
              </label>
            </Card>

            {/* 6. Badge Competenze Sfondo e Testo */}
            <Card className="p-3 bg-white dark:bg-neutral-900/80 flex items-center justify-between gap-3">
              <div>
                <h5 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Pill Competenze (Sfondo & Testo)
                </h5>
                <p className="text-[11px] text-neutral-500">Colori dei badge/tag delle competenze</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 cursor-pointer" title="Colore Sfondo Badge">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: settings.tagBgColor || "#f4f4f5" }}
                  />
                  <input
                    type="color"
                    value={settings.tagBgColor || "#f4f4f5"}
                    onChange={(e) => updateSettings({ tagBgColor: e.target.value, themePreset: "custom" })}
                    className="w-0 h-0 opacity-0 pointer-events-none absolute"
                  />
                </label>
                <label className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 cursor-pointer" title="Colore Testo Badge">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: settings.tagTextColor || "#18181b" }}
                  />
                  <input
                    type="color"
                    value={settings.tagTextColor || "#18181b"}
                    onChange={(e) => updateSettings({ tagTextColor: e.target.value, themePreset: "custom" })}
                    className="w-0 h-0 opacity-0 pointer-events-none absolute"
                  />
                </label>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
