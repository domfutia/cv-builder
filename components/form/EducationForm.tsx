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
import { EducationItem } from "@/types/cv";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import {
  GraduationCap,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface SortableEducationCardProps {
  edu: EducationItem;
  onUpdate: (data: Partial<EducationItem>) => void;
  onRemove: () => void;
}

const SortableEducationCard: React.FC<SortableEducationCardProps> = ({
  edu,
  onUpdate,
  onRemove,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: edu.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="touch-none">
      <Card className="transition-all duration-200 border-neutral-800 hover:border-neutral-700 bg-neutral-900/80">
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-800/60">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              type="button"
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 text-neutral-500 hover:text-neutral-200 rounded hover:bg-neutral-800 transition-colors"
              title="Trascina per riordinare"
            >
              <GripVertical className="w-4 h-4" />
            </button>
            <div className="truncate">
              <h4 className="text-sm font-semibold text-neutral-200 truncate">
                {edu.degree || "Titolo di Studio"}
                {edu.institution ? ` • ${edu.institution}` : ""}
              </h4>
              <p className="text-xs text-neutral-500 truncate">
                {edu.startDate || "Inizio"} — {edu.isCurrent ? "In corso" : edu.endDate || "Fine"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 h-8 text-neutral-400 hover:text-neutral-200"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="p-1.5 h-8 text-neutral-500 hover:text-red-400 hover:bg-red-950/30"
              title="Elimina formazione"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Istituto / Università"
                placeholder="es. Politecnico di Milano"
                value={edu.institution}
                onChange={(val) => onUpdate({ institution: val })}
              />
              <Input
                label="Titolo / Corso di Laurea"
                placeholder="es. Laurea Magistrale in Interaction Design"
                value={edu.degree}
                onChange={(val) => onUpdate({ degree: val })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Campo di Studio"
                placeholder="es. Human-Computer Interaction"
                value={edu.fieldOfStudy}
                onChange={(val) => onUpdate({ fieldOfStudy: val })}
              />
              <Input
                label="Data Inizio"
                placeholder="es. 2015-10"
                value={edu.startDate}
                onChange={(val) => onUpdate({ startDate: val })}
              />
              <Input
                label="Data Fine / Prevista"
                placeholder="es. 2017-07"
                value={edu.endDate}
                disabled={edu.isCurrent}
                onChange={(val) => onUpdate({ endDate: val })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Località"
                placeholder="es. Milano, Italia"
                value={edu.location}
                onChange={(val) => onUpdate({ location: val })}
              />
              <Input
                label="Voto / Valutazione (Opzionale)"
                placeholder="es. 110/110 con Lode"
                value={edu.grade || ""}
                onChange={(val) => onUpdate({ grade: val })}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`edu-isCurrent-${edu.id}`}
                checked={edu.isCurrent}
                onChange={(e) => onUpdate({ isCurrent: e.target.checked })}
                className="w-4 h-4 rounded bg-neutral-900 border-neutral-700 text-neutral-200 focus:ring-neutral-500 cursor-pointer"
              />
              <label
                htmlFor={`edu-isCurrent-${edu.id}`}
                className="text-xs text-neutral-300 select-none cursor-pointer"
              >
                Percorso di studio attualmente in corso
              </label>
            </div>

            <Textarea
              label="Dettagli / Tesi (Opzionale)"
              rows={2}
              placeholder="es. Titolo della tesi o esami rilevanti..."
              value={edu.details || ""}
              onChange={(val) => onUpdate({ details: val })}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export const EducationForm: React.FC = () => {
  const { cvData, addEducation, updateEducation, removeEducation, reorderEducations } =
    useCV();

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
      const oldIndex = cvData.educations.findIndex((item) => item.id === active.id);
      const newIndex = cvData.educations.findIndex((item) => item.id === over.id);
      reorderEducations(arrayMove(cvData.educations, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Formazione & Istruzione"
        subtitle="Inserisci i titoli accademici, certificazioni universitarie e corsi"
        icon={<GraduationCap className="w-5 h-5" />}
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={addEducation}
            icon={<Plus className="w-4 h-4" />}
          >
            Aggiungi Formazione
          </Button>
        }
      />

      {cvData.educations.length === 0 ? (
        <div className="text-center py-10 px-4 border border-dashed border-neutral-800 rounded-xl bg-neutral-900/30">
          <GraduationCap className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
          <p className="text-sm text-neutral-400 font-medium">Nessuna formazione inserita</p>
          <p className="text-xs text-neutral-600 mt-1 mb-4">
            Aggiungi università, master o scuole superiori
          </p>
          <Button variant="secondary" size="sm" onClick={addEducation} icon={<Plus className="w-4 h-4" />}>
            Aggiungi primo titolo
          </Button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={cvData.educations.map((edu) => edu.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {cvData.educations.map((edu) => (
                <SortableEducationCard
                  key={edu.id}
                  edu={edu}
                  onUpdate={(data) => updateEducation(edu.id, data)}
                  onRemove={() => removeEducation(edu.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};
