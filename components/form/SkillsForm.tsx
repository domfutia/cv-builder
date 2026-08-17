"use client";

import React, { useState } from "react";
import { useCV } from "@/context/CVContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Wrench, Plus, Trash2, PlusCircle, Tag } from "lucide-react";

export const SkillsForm: React.FC = () => {
  const {
    cvData,
    addSkillCategory,
    updateSkillCategoryName,
    removeSkillCategory,
    addSkill,
    removeSkill,
  } = useCV();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [skillInputs, setSkillInputs] = useState<Record<string, string>>({});

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    addSkillCategory(newCategoryName);
    setNewCategoryName("");
  };

  const handleAddSkillToCat = (categoryId: string) => {
    const text = skillInputs[categoryId];
    if (!text || !text.trim()) return;
    addSkill(categoryId, text);
    setSkillInputs((prev) => ({ ...prev, [categoryId]: "" }));
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Competenze & Tecnologie"
        subtitle="Organizza le tue competenze tecniche, metodologie e strumenti in categorie"
        icon={<Wrench className="w-5 h-5" />}
      />

      {/* Add new category */}
      <Card className="bg-neutral-900/40 border-dashed border-neutral-800">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Input
            placeholder="es. Frontend & Framework, Cloud & DevOps, Soft Skills..."
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
            className="shrink-0"
          >
            Nuova Categoria
          </Button>
        </div>
      </Card>

      {/* Category List */}
      <div className="space-y-4">
        {cvData.skillCategories.map((cat) => (
          <Card key={cat.id} className="space-y-4 bg-neutral-900/80">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-neutral-800/60">
              <input
                type="text"
                value={cat.name}
                onChange={(e) => updateSkillCategoryName(cat.id, e.target.value)}
                placeholder="Nome categoria..."
                className="bg-transparent font-medium text-sm text-neutral-200 focus:outline-none focus:border-b focus:border-neutral-500 w-full"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSkillCategory(cat.id)}
                className="p-1.5 h-8 text-neutral-500 hover:text-red-400"
                title="Elimina categoria"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Badges list */}
            <div className="flex flex-wrap gap-2 min-h-[32px] items-center">
              {cat.skills.length === 0 ? (
                <span className="text-xs text-neutral-600 italic">
                  Nessuna competenza aggiunta in questa categoria.
                </span>
              ) : (
                cat.skills.map((skill, sIdx) => (
                  <Badge
                    key={sIdx}
                    variant="default"
                    onRemove={() => removeSkill(cat.id, skill)}
                  >
                    {skill}
                  </Badge>
                ))
              )}
            </div>

            {/* Add skill chip input */}
            <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/40">
              <input
                type="text"
                placeholder="Aggiungi una competenza (es. React, TypeScript...) e premi Invio"
                value={skillInputs[cat.id] || ""}
                onChange={(e) =>
                  setSkillInputs((prev) => ({ ...prev, [cat.id]: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkillToCat(cat.id);
                  }
                }}
                className="flex-1 rounded-lg bg-neutral-900/60 border border-neutral-800 px-3 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleAddSkillToCat(cat.id)}
                disabled={!skillInputs[cat.id]?.trim()}
                icon={<PlusCircle className="w-3.5 h-3.5" />}
              >
                Aggiungi
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
