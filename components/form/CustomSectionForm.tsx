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
import { CustomSection, CustomSectionItem } from "@/types/cv";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  FolderPlus,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  X,
  Edit2,
} from "lucide-react";

interface SortableCustomItemProps {
  item: CustomSectionItem;
  onUpdate: (data: Partial<CustomSectionItem>) => void;
  onRemove: () => void;
}

const SortableCustomItemCard: React.FC<SortableCustomItemProps> = ({
  item,
  onUpdate,
  onRemove,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newHighlight, setNewHighlight] = useState("");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    onUpdate({
      highlights: [...(item.highlights || []), newHighlight.trim()],
    });
    setNewHighlight("");
  };

  const handleRemoveHighlight = (hIndex: number) => {
    const updated = (item.highlights || []).filter((_, i) => i !== hIndex);
    onUpdate({ highlights: updated });
  };

  const handleUpdateHighlight = (hIndex: number, text: string) => {
    const updated = [...(item.highlights || [])];
    updated[hIndex] = text;
    onUpdate({ highlights: updated });
  };

  return (
    <div ref={setNodeRef} style={style} className="w-full">
      <Card className="transition-all duration-200 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900/80">
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800/60">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              type="button"
              {...attributes}
              {...listeners}
              aria-label="Trascina per riordinare elemento"
              className="touch-none cursor-grab active:cursor-grabbing p-1 text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
              title="Trascina per riordinare"
            >
              <GripVertical className="w-4 h-4" />
            </button>
            <div className="truncate">
              <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                {item.title || "Nuovo Elemento"}
                {item.subtitle ? ` • ${item.subtitle}` : ""}
              </h4>
              {item.date && (
                <p className="text-xs text-neutral-500 truncate">{item.date}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Comprimi dettagli elemento" : "Espandi dettagli elemento"}
              className="p-1.5 h-8 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              aria-label="Elimina elemento"
              className="p-1.5 h-8 text-neutral-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400"
              title="Elimina elemento"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Titolo Principale"
                placeholder="es. Titolo Pubblicazione, Progetto o Ruolo"
                value={item.title}
                onChange={(val) => onUpdate({ title: val })}
              />
              <Input
                label="Sottotitolo / Organizzazione (Opzionale)"
                placeholder="es. Rivista scientifica, Evento, Associazione"
                value={item.subtitle || ""}
                onChange={(val) => onUpdate({ subtitle: val })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Data / Periodo (Opzionale)"
                placeholder="es. 2023 oppure Mag 2022 - Dic 2023"
                value={item.date || ""}
                onChange={(val) => onUpdate({ date: val })}
              />
            </div>

            <Textarea
              label="Descrizione (Opzionale)"
              rows={2}
              placeholder="Descrizione dettagliata dell'attività, traguardi o dettagli rilevanti..."
              value={item.description || ""}
              onChange={(val) => onUpdate({ description: val })}
            />

            {/* Highlights / Punti elenco */}
            <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800/60">
              <label className="block text-xs font-semibold tracking-wide text-neutral-600 dark:text-neutral-400 uppercase">
                Punti Elenco (Bullet Points opzionali)
              </label>

              <div className="space-y-2">
                {(item.highlights || []).map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 group">
                    <span className="text-neutral-400 dark:text-neutral-500 mt-2 text-xs select-none">•</span>
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleUpdateHighlight(hIdx, e.target.value)}
                      placeholder="Dettaglio o risultato chiave..."
                      className="flex-1 rounded-md bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 px-2.5 py-1.5 text-xs text-neutral-900 dark:text-neutral-200 focus:outline-none focus:border-neutral-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(hIdx)}
                      className="opacity-60 group-hover:opacity-100 p-1 text-neutral-400 hover:text-red-500 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddHighlight();
                    }
                  }}
                  placeholder="Aggiungi punto elenco (premi Invio)..."
                  className="flex-1 rounded-lg bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 px-3 py-1.5 text-xs text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleAddHighlight}
                  disabled={!newHighlight.trim()}
                  icon={<PlusCircle className="w-3.5 h-3.5" />}
                >
                  Aggiungi
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export const CustomSectionForm: React.FC<{ section: CustomSection }> = ({ section }) => {
  const {
    updateCustomSectionTitle,
    removeCustomSection,
    addCustomSectionItem,
    updateCustomSectionItem,
    removeCustomSectionItem,
    reorderCustomSectionItems,
  } = useCV();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(section.title);

  const handleSaveTitle = () => {
    if (titleInput.trim()) {
      updateCustomSectionTitle(section.id, titleInput.trim());
    }
    setIsEditingTitle(false);
  };

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
      const oldIndex = section.items.findIndex((item) => item.id === active.id);
      const newIndex = section.items.findIndex((item) => item.id === over.id);
      reorderCustomSectionItems(section.id, arrayMove(section.items, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800/80">
        <div className="flex items-center gap-2 flex-1">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
            <FolderPlus className="w-5 h-5" />
          </div>

          {isEditingTitle ? (
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveTitle();
                }}
                className="px-2.5 py-1 text-sm font-semibold rounded bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white w-full"
                autoFocus
              />
              <Button variant="primary" size="sm" onClick={handleSaveTitle}>
                Salva
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                {section.title}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setTitleInput(section.title);
                  setIsEditingTitle(true);
                }}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1 rounded transition-colors"
                title="Modifica nome sezione"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => addCustomSectionItem(section.id)}
            icon={<Plus className="w-4 h-4" />}
          >
            Aggiungi Elemento
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (confirm(`Sei sicuro di voler eliminare la sezione "${section.title}"?`)) {
                removeCustomSection(section.id);
              }
            }}
            icon={<Trash2 className="w-3.5 h-3.5" />}
            title="Elimina intera sezione"
          >
            Elimina Sezione
          </Button>
        </div>
      </div>

      {section.items.length === 0 ? (
        <div className="text-center py-10 px-4 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/30">
          <FolderPlus className="w-8 h-8 text-neutral-400 dark:text-neutral-600 mx-auto mb-2" />
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            Nessun elemento in questa sezione
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-1 mb-4">
            Aggiungi pubblicazioni, progetti di volontariato o riconoscimenti
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => addCustomSectionItem(section.id)}
            icon={<Plus className="w-4 h-4" />}
          >
            Aggiungi primo elemento
          </Button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={section.items.map((it) => it.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {section.items.map((item) => (
                <SortableCustomItemCard
                  key={item.id}
                  item={item}
                  onUpdate={(data) => updateCustomSectionItem(section.id, item.id, data)}
                  onRemove={() => removeCustomSectionItem(section.id, item.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};
