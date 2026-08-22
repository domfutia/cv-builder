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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}

const SortableCustomItemCard: React.FC<SortableCustomItemProps> = ({
  item,
  onUpdate,
  onRemove,
  t,
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
              aria-label={t.customSection.dragToReorder}
              className="touch-none cursor-grab active:cursor-grabbing p-1 text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
              title={t.customSection.dragToReorder}
            >
              <GripVertical className="w-4 h-4" />
            </button>
            <div className="truncate">
              <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                {item.title || t.customSection.itemTitlePlaceholder}
                {item.subtitle ? ` • ${item.subtitle}` : ""}
              </h4>
              {(item.startDate || item.endDate || item.isCurrent || item.date) && (
                <p className="text-xs text-neutral-500 truncate">
                  {item.startDate
                    ? `${item.startDate} — ${item.isCurrent ? (t.docLabels.present || "In corso") : item.endDate || (t.docLabels.present || "Presente")}`
                    : item.date}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Collapse" : "Expand"}
              className="p-1.5 h-8 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              aria-label={t.delete}
              className="p-1.5 h-8 text-neutral-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"
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
                label={t.customSection.itemTitle}
                placeholder={t.customSection.itemTitlePlaceholder}
                value={item.title}
                onChange={(val) => onUpdate({ title: val })}
              />
              <Input
                label={t.customSection.itemSubtitle}
                placeholder={t.customSection.itemSubtitlePlaceholder}
                value={item.subtitle || ""}
                onChange={(val) => onUpdate({ subtitle: val })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t.customSection.startDate}
                placeholder={t.customSection.startDatePlaceholder}
                value={item.startDate || item.date || ""}
                onChange={(val) => onUpdate({ startDate: val, date: val })}
              />
              <Input
                label={t.customSection.endDate}
                placeholder={t.customSection.endDatePlaceholder}
                value={item.endDate || ""}
                disabled={item.isCurrent}
                onChange={(val) => onUpdate({ endDate: val })}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`custom-isCurrent-${item.id}`}
                checked={item.isCurrent || false}
                onChange={(e) => onUpdate({ isCurrent: e.target.checked })}
                className="w-4 h-4 rounded bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200 focus:ring-neutral-500 cursor-pointer"
              />
              <label
                htmlFor={`custom-isCurrent-${item.id}`}
                className="text-xs text-neutral-700 dark:text-neutral-300 select-none cursor-pointer"
              >
                {t.customSection.isCurrent}
              </label>
            </div>

            <Textarea
              label={t.customSection.itemDescription}
              rows={2}
              placeholder={t.customSection.itemDescriptionPlaceholder}
              value={item.description || ""}
              onChange={(val) => onUpdate({ description: val })}
            />

            {/* Highlights / Punti elenco */}
            <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800/60">
              <label className="block text-xs font-semibold tracking-wide text-neutral-600 dark:text-neutral-400 uppercase">
                {t.customSection.highlightsTitle}
              </label>

              <div className="space-y-2">
                {(item.highlights || []).map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 group">
                    <span className="text-neutral-400 dark:text-neutral-500 mt-2 text-xs select-none">•</span>
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleUpdateHighlight(hIdx, e.target.value)}
                      placeholder={t.customSection.highlightPlaceholder}
                      className="flex-1 rounded-md bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 px-2.5 py-1.5 text-xs text-neutral-900 dark:text-neutral-200 focus:outline-none focus:border-neutral-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(hIdx)}
                      className="opacity-60 group-hover:opacity-100 p-1 text-neutral-400 hover:text-red-500 transition-opacity cursor-pointer"
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
                  placeholder={t.customSection.highlightPlaceholder}
                  className="flex-1 rounded-lg bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 px-3 py-1.5 text-xs text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleAddHighlight}
                  disabled={!newHighlight.trim()}
                  icon={<PlusCircle className="w-3.5 h-3.5" />}
                  className="cursor-pointer"
                >
                  {t.customSection.addHighlightBtn}
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
    t,
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
              <Button variant="primary" size="sm" onClick={handleSaveTitle} className="cursor-pointer">
                {t.save}
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
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1 rounded transition-colors cursor-pointer"
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
            className="cursor-pointer"
          >
            {t.customSection.addItemBtn}
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (confirm(`${t.customSection.deleteSectionConfirm} ("${section.title}")`)) {
                removeCustomSection(section.id);
              }
            }}
            icon={<Trash2 className="w-3.5 h-3.5" />}
            title={t.customSection.deleteSectionBtn}
            className="cursor-pointer"
          >
            {t.customSection.deleteSectionBtn}
          </Button>
        </div>
      </div>

      {section.items.length === 0 ? (
        <div className="text-center py-10 px-4 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-900/30">
          <FolderPlus className="w-8 h-8 text-neutral-400 dark:text-neutral-600 mx-auto mb-2" />
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            {t.customSection.emptyState}
          </p>
          <div className="mt-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => addCustomSectionItem(section.id)}
              icon={<Plus className="w-4 h-4" />}
              className="cursor-pointer"
            >
              {t.customSection.addItemBtn}
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
