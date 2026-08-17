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
import { ExperienceItem } from "@/types/cv";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import {
  Briefcase,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  X,
} from "lucide-react";

interface SortableCardProps {
  exp: ExperienceItem;
  onUpdate: (data: Partial<ExperienceItem>) => void;
  onRemove: () => void;
}

const SortableExperienceCard: React.FC<SortableCardProps> = ({
  exp,
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
  } = useSortable({ id: exp.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    onUpdate({
      highlights: [...(exp.highlights || []), newHighlight.trim()],
    });
    setNewHighlight("");
  };

  const handleRemoveHighlight = (hIndex: number) => {
    const updated = (exp.highlights || []).filter((_, i) => i !== hIndex);
    onUpdate({ highlights: updated });
  };

  const handleUpdateHighlight = (hIndex: number, text: string) => {
    const updated = [...(exp.highlights || [])];
    updated[hIndex] = text;
    onUpdate({ highlights: updated });
  };

  return (
    <div ref={setNodeRef} style={style} className="w-full">
      <Card className="transition-all duration-200 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900/80">
        {/* Header with drag handle and collapse */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800/60">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              type="button"
              {...attributes}
              {...listeners}
              aria-label="Trascina per riordinare esperienza"
              className="touch-none cursor-grab active:cursor-grabbing p-1 text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
              title="Trascina per riordinare"
            >
              <GripVertical className="w-4 h-4" />
            </button>
            <div className="truncate">
              <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                {exp.position || "Nuovo Ruolo"}
                {exp.company ? ` • ${exp.company}` : ""}
              </h4>
              <p className="text-xs text-neutral-500 truncate">
                {exp.startDate || "Inizio"} — {exp.isCurrent ? "Attuale" : exp.endDate || "Fine"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Comprimi dettagli esperienza" : "Espandi dettagli esperienza"}
              className="p-1.5 h-8 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              aria-label="Elimina esperienza lavorativa"
              className="p-1.5 h-8 text-neutral-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
              title="Elimina esperienza"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Collapsible Body */}
        {isExpanded && (
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Ruolo / Posizione"
                placeholder="es. Senior Frontend Developer"
                value={exp.position}
                onChange={(val) => onUpdate({ position: val })}
              />
              <Input
                label="Azienda"
                placeholder="es. Linear Technologies"
                value={exp.company}
                onChange={(val) => onUpdate({ company: val })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Data Inizio"
                placeholder="es. 2022-03 oppure Mar 2022"
                value={exp.startDate}
                onChange={(val) => onUpdate({ startDate: val })}
              />
              <Input
                label="Data Fine"
                placeholder="es. 2024-05"
                value={exp.endDate}
                disabled={exp.isCurrent}
                onChange={(val) => onUpdate({ endDate: val })}
              />
              <Input
                label="Località"
                placeholder="es. Milano / Remoto"
                value={exp.location}
                onChange={(val) => onUpdate({ location: val })}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`isCurrent-${exp.id}`}
                checked={exp.isCurrent}
                onChange={(e) => onUpdate({ isCurrent: e.target.checked })}
                className="w-4 h-4 rounded bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200 focus:ring-neutral-500 cursor-pointer"
              />
              <label
                htmlFor={`isCurrent-${exp.id}`}
                className="text-xs text-neutral-700 dark:text-neutral-300 select-none cursor-pointer"
              >
                Lavoro attualmente in questa posizione
              </label>
            </div>

            <Textarea
              label="Descrizione del Ruolo"
              rows={2}
              placeholder="Sintesi delle responsabilità e dell'impatto principale..."
              value={exp.description}
              onChange={(val) => onUpdate({ description: val })}
            />

            {/* Bullet points / Highlights */}
            <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800/60">
              <label className="block text-xs font-medium tracking-wide text-neutral-600 dark:text-neutral-400 uppercase">
                Risultati Chiave & Traguardi (Bullet Points)
              </label>

              <div className="space-y-2">
                {(exp.highlights || []).map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 group">
                    <span className="text-neutral-400 mt-2 text-xs select-none">•</span>
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleUpdateHighlight(hIdx, e.target.value)}
                      placeholder="es. Ridotto i tempi di caricamento del 35%..."
                      className="flex-1 rounded-md bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 px-2.5 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-neutral-500"
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
                  placeholder="Aggiungi un risultato (premi Invio)..."
                  className="flex-1 rounded-lg bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 px-3 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
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

export const ExperienceForm: React.FC = () => {
  const {
    cvData,
    addExperience,
    updateExperience,
    removeExperience,
    reorderExperiences,
    updateSectionLabel,
    deleteSection,
  } = useCV();

  const sectionTitle =
    cvData.settings.sectionOrder?.find((s) => s.key === "experience")?.label || "Esperienze Lavorative";

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = cvData.experiences.findIndex((item) => item.id === active.id);
      const newIndex = cvData.experiences.findIndex((item) => item.id === over.id);
      reorderExperiences(arrayMove(cvData.experiences, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title={sectionTitle}
        subtitle="Aggiungi e riordina con drag-and-drop i tuoi ruoli lavorativi"
        icon={<Briefcase className="w-5 h-5" />}
        editableTitle={true}
        onTitleChange={(newTitle) => updateSectionLabel("experience", newTitle)}
        canDelete={true}
        onDelete={() => deleteSection("experience")}
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={addExperience}
            icon={<Plus className="w-4 h-4" />}
          >
            Aggiungi Esperienza
          </Button>
        }
      />

      {cvData.experiences.length === 0 ? (
        <div className="text-center py-10 px-4 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/30">
          <Briefcase className="w-8 h-8 text-neutral-400 dark:text-neutral-600 mx-auto mb-2" />
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Nessuna esperienza inserita</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-600 mt-1 mb-4">
            Inizia aggiungendo il tuo ruolo più recente
          </p>
          <Button variant="secondary" size="sm" onClick={addExperience} icon={<Plus className="w-4 h-4" />}>
            Aggiungi prima esperienza
          </Button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={cvData.experiences.map((exp) => exp.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {cvData.experiences.map((exp) => (
                <SortableExperienceCard
                  key={exp.id}
                  exp={exp}
                  onUpdate={(data) => updateExperience(exp.id, data)}
                  onRemove={() => removeExperience(exp.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};
