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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}

const SortableEducationCard: React.FC<SortableEducationCardProps> = ({
  edu,
  onUpdate,
  onRemove,
  t,
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
    <div ref={setNodeRef} style={style} className="w-full">
      <Card className="transition-all duration-200 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900/80">
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800/60">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              type="button"
              {...attributes}
              {...listeners}
              aria-label={t.education.dragToReorder}
              className="touch-none cursor-grab active:cursor-grabbing p-1 text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
              title={t.education.dragToReorder}
            >
              <GripVertical className="w-4 h-4" />
            </button>
            <div className="truncate">
              <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                {edu.degree || t.education.degreePlaceholder}
                {edu.institution ? ` • ${edu.institution}` : ""}
              </h4>
              <p className="text-xs text-neutral-500 truncate">
                {edu.startDate || "Start"} — {edu.isCurrent ? (t.docLabels.present || "In progress") : edu.endDate || (t.docLabels.present || "Graduated")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Collapse" : "Expand"}
              className="p-1.5 h-8 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              aria-label={t.delete}
              className="p-1.5 h-8 text-neutral-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
              title={t.delete}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t.education.institution}
                placeholder={t.education.institutionPlaceholder}
                value={edu.institution}
                onChange={(val) => onUpdate({ institution: val })}
              />
              <Input
                label={t.education.degree}
                placeholder={t.education.degreePlaceholder}
                value={edu.degree}
                onChange={(val) => onUpdate({ degree: val })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label={t.education.fieldOfStudy}
                placeholder={t.education.fieldOfStudyPlaceholder}
                value={edu.fieldOfStudy}
                onChange={(val) => onUpdate({ fieldOfStudy: val })}
              />
              <Input
                label={t.education.startDate}
                placeholder={t.education.startDatePlaceholder}
                value={edu.startDate}
                onChange={(val) => onUpdate({ startDate: val })}
              />
              <Input
                label={t.education.endDate}
                placeholder={t.education.endDatePlaceholder}
                value={edu.endDate}
                disabled={edu.isCurrent}
                onChange={(val) => onUpdate({ endDate: val })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t.education.location}
                placeholder={t.education.locationPlaceholder}
                value={edu.location}
                onChange={(val) => onUpdate({ location: val })}
              />
              <Input
                label={t.education.grade}
                placeholder={t.education.gradePlaceholder}
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
                className="w-4 h-4 rounded bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200 focus:ring-neutral-500 cursor-pointer"
              />
              <label
                htmlFor={`edu-isCurrent-${edu.id}`}
                className="text-xs text-neutral-700 dark:text-neutral-300 select-none cursor-pointer"
              >
                {t.education.isCurrent}
              </label>
            </div>

            <Textarea
              label={t.education.details}
              rows={2}
              placeholder={t.education.detailsPlaceholder}
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
  const {
    cvData,
    addEducation,
    updateEducation,
    removeEducation,
    reorderEducations,
    updateSectionLabel,
    deleteSection,
    t,
  } = useCV();

  const sectionTitle =
    cvData.settings.sectionOrder?.find((s) => s.key === "education")?.label || t.education.title;

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
        title={sectionTitle}
        subtitle={t.education.subtitle}
        icon={<GraduationCap className="w-5 h-5" />}
        editableTitle={true}
        onTitleChange={(newTitle) => updateSectionLabel("education", newTitle)}
        canDelete={true}
        onDelete={() => deleteSection("education")}
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={addEducation}
            icon={<Plus className="w-4 h-4" />}
            className="cursor-pointer"
          >
            {t.education.addBtn}
          </Button>
        }
      />

      {cvData.educations.length === 0 ? (
        <div className="text-center py-10 px-4 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/30">
          <GraduationCap className="w-8 h-8 text-neutral-400 dark:text-neutral-600 mx-auto mb-2" />
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">{t.education.emptyState}</p>
          <div className="mt-4">
            <Button variant="secondary" size="sm" onClick={addEducation} icon={<Plus className="w-4 h-4" />}>
              {t.education.addBtn}
            </Button>
          </div>
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
                  onRemove={() => {
                    if (confirm(t.education.deleteConfirm)) {
                      removeEducation(edu.id);
                    }
                  }}
                  t={t}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};
