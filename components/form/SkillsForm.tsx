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
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCV } from "@/context/CVContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { SkillCategory } from "@/types/cv";
import { cn } from "@/lib/utils";
import {
  Wrench,
  Plus,
  Trash2,
  PlusCircle,
  Tag,
  GripVertical,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

// =========================================================================
// Sortable Skill Chip Component
// =========================================================================
interface SortableSkillChipProps {
  categoryId: string;
  skill: string;
  index: number;
  totalSkills: number;
  onRemove: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
}

const SortableSkillChip: React.FC<SortableSkillChipProps> = ({
  categoryId,
  skill,
  index,
  totalSkills,
  onRemove,
  onMoveLeft,
  onMoveRight,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `skill-item-${categoryId}-${skill}` });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono tracking-tight border transition-all select-none",
        "bg-neutral-100 dark:bg-neutral-800/90 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700/80 shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-600"
      )}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label={`Trascina per riordinare competenza ${skill}`}
        className="touch-none cursor-grab active:cursor-grabbing p-0.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded shrink-0"
        title="Trascina per riordinare / Drag to reorder"
      >
        <GripVertical className="w-3 h-3" />
      </button>

      <span className="break-words font-sans font-medium text-[11.5px]">{skill}</span>

      {/* Quick Move Left / Right Buttons */}
      <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
        {index > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMoveLeft();
            }}
            className="p-0.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors cursor-pointer"
            title="Sposta a sinistra / Move left"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
        )}
        {index < totalSkills - 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMoveRight();
            }}
            className="p-0.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors cursor-pointer"
            title="Sposta a destra / Move right"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="text-neutral-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-0.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700/50 cursor-pointer ml-0.5"
        title="Rimuovi / Remove"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

// =========================================================================
// Sortable Category Card Component
// =========================================================================
interface SortableCategoryCardProps {
  cat: SkillCategory;
  index: number;
  totalCategories: number;
  onUpdateName: (name: string) => void;
  onRemoveCategory: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
  onReorderSkills: (newSkills: string[]) => void;
  onMoveSkill: (skillIndex: number, direction: "left" | "right") => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}

const SortableCategoryCard: React.FC<SortableCategoryCardProps> = ({
  cat,
  index,
  totalCategories,
  onUpdateName,
  onRemoveCategory,
  onMoveUp,
  onMoveDown,
  onAddSkill,
  onRemoveSkill,
  onReorderSkills,
  onMoveSkill,
  t,
}) => {
  const [skillInput, setSkillInput] = useState("");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: cat.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  // Sensor configuration for internal skill dragging
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    onAddSkill(skillInput.trim());
    setSkillInput("");
  };

  const handleSkillDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldSkill = String(active.id).replace(`skill-item-${cat.id}-`, "");
      const newSkill = String(over.id).replace(`skill-item-${cat.id}-`, "");
      const oldIndex = cat.skills.indexOf(oldSkill);
      const newIndex = cat.skills.indexOf(newSkill);
      if (oldIndex !== -1 && newIndex !== -1) {
        onReorderSkills(arrayMove(cat.skills, oldIndex, newIndex));
      }
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="w-full">
      <Card className="space-y-4 bg-white dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
        {/* Header with Grip, Title Input, Move Up/Down, Delete */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800/60">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              type="button"
              {...attributes}
              {...listeners}
              aria-label={t.skills.dragCategory}
              className="touch-none cursor-grab active:cursor-grabbing p-1 text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
              title={t.skills.dragCategory}
            >
              <GripVertical className="w-4 h-4" />
            </button>

            {/* Quick Move Up / Down Buttons for Category */}
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                type="button"
                onClick={onMoveUp}
                disabled={index === 0}
                className="p-1 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 disabled:opacity-30 disabled:pointer-events-none rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                title={t.skills.moveUpCategory}
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onMoveDown}
                disabled={index === totalCategories - 1}
                className="p-1 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 disabled:opacity-30 disabled:pointer-events-none rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                title={t.skills.moveDownCategory}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <input
              type="text"
              value={cat.name}
              onChange={(e) => onUpdateName(e.target.value)}
              placeholder={t.skills.categoryNamePlaceholder}
              className="bg-transparent font-semibold text-sm text-neutral-900 dark:text-neutral-200 focus:outline-none focus:border-b focus:border-neutral-500 w-full"
            />
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveCategory}
            className="p-1.5 h-8 text-neutral-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer shrink-0"
            title={t.skills.deleteCategoryTitle}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Badges list with Reordering support */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleSkillDragEnd}
        >
          <SortableContext
            items={cat.skills.map((s) => `skill-item-${cat.id}-${s}`)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex flex-wrap gap-2 min-h-[34px] items-center">
              {cat.skills.length === 0 ? (
                <span className="text-xs text-neutral-400 italic">
                  {t.skills.noSkillsInCategory}
                </span>
              ) : (
                cat.skills.map((skill, sIdx) => (
                  <SortableSkillChip
                    key={`skill-${cat.id}-${skill}-${sIdx}`}
                    categoryId={cat.id}
                    skill={skill}
                    index={sIdx}
                    totalSkills={cat.skills.length}
                    onRemove={() => onRemoveSkill(skill)}
                    onMoveLeft={() => onMoveSkill(sIdx, "left")}
                    onMoveRight={() => onMoveSkill(sIdx, "right")}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>

        {/* Add skill chip input */}
        <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/40">
          <input
            type="text"
            placeholder={t.skills.skillInputPlaceholder}
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            className="flex-1 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAddSkill}
            disabled={!skillInput.trim()}
            icon={<PlusCircle className="w-3.5 h-3.5" />}
          >
            {t.skills.addSkillBtn}
          </Button>
        </div>
      </Card>
    </div>
  );
};

// =========================================================================
// Main SkillsForm Component
// =========================================================================
export const SkillsForm: React.FC = () => {
  const {
    cvData,
    addSkillCategory,
    updateSkillCategoryName,
    removeSkillCategory,
    reorderSkillCategories,
    moveSkillCategory,
    addSkill,
    removeSkill,
    reorderSkills,
    moveSkill,
    updateSectionLabel,
    deleteSection,
    t,
  } = useCV();

  const sectionTitle =
    cvData.settings.sectionOrder?.find((s) => s.key === "skills")?.label ||
    t.skills.title;

  const [newCategoryName, setNewCategoryName] = useState("");

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

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    addSkillCategory(newCategoryName);
    setNewCategoryName("");
  };

  const handleCategoryDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = cvData.skillCategories.findIndex((c) => c.id === active.id);
      const newIndex = cvData.skillCategories.findIndex((c) => c.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderSkillCategories(arrayMove(cvData.skillCategories, oldIndex, newIndex));
      }
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title={sectionTitle}
        subtitle={t.skills.subtitle}
        icon={<Wrench className="w-5 h-5" />}
        editableTitle={true}
        onTitleChange={(newTitle) => updateSectionLabel("skills", newTitle)}
        canDelete={true}
        onDelete={() => deleteSection("skills")}
      />

      {/* Add new category */}
      <Card className="bg-neutral-50 dark:bg-neutral-900/40 border-dashed border-neutral-300 dark:border-neutral-800">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Input
            placeholder={t.skills.newCategoryPlaceholder}
            value={newCategoryName}
            onChange={(val) => setNewCategoryName(val)}
            icon={<Tag className="w-4 h-4" />}
            className="w-full"
          />
          <Button
            variant="secondary"
            size="md"
            onClick={handleAddCategory}
            disabled={!newCategoryName.trim()}
            icon={<Plus className="w-4 h-4" />}
            className="shrink-0 cursor-pointer"
          >
            {t.skills.newCategoryBtn}
          </Button>
        </div>
      </Card>

      {/* Sortable Category List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleCategoryDragEnd}
      >
        <SortableContext
          items={cvData.skillCategories.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {cvData.skillCategories.map((cat, idx) => (
              <SortableCategoryCard
                key={cat.id}
                cat={cat}
                index={idx}
                totalCategories={cvData.skillCategories.length}
                onUpdateName={(name) => updateSkillCategoryName(cat.id, name)}
                onRemoveCategory={() => {
                  if (confirm(t.skills.deleteCategoryConfirm)) {
                    removeSkillCategory(cat.id);
                  }
                }}
                onMoveUp={() => moveSkillCategory(cat.id, "up")}
                onMoveDown={() => moveSkillCategory(cat.id, "down")}
                onAddSkill={(skill) => addSkill(cat.id, skill)}
                onRemoveSkill={(skill) => removeSkill(cat.id, skill)}
                onReorderSkills={(newSkills) => reorderSkills(cat.id, newSkills)}
                onMoveSkill={(sIdx, dir) => moveSkill(cat.id, sIdx, dir)}
                t={t}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
