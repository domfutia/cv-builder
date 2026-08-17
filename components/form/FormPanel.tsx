"use client";

import React, { useState } from "react";
import { useCV } from "@/context/CVContext";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { SummaryForm } from "./SummaryForm";
import { ExperienceForm } from "./ExperienceForm";
import { EducationForm } from "./EducationForm";
import { SkillsForm } from "./SkillsForm";
import { ProjectsLanguagesForm } from "./ProjectsLanguagesForm";
import { SettingsForm } from "./SettingsForm";
import { CustomSectionForm } from "./CustomSectionForm";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Sliders,
  ChevronRight,
  Sparkles,
  Plus,
  FolderPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StandardTab =
  | "settings"
  | "personal"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects";

const standardSections: {
  id: StandardTab;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "settings", label: "Layout & Stile", shortLabel: "Stile", icon: Sliders },
  { id: "personal", label: "Dati Anagrafici", shortLabel: "Anagrafica", icon: User },
  { id: "summary", label: "Profilo Professionale", shortLabel: "Profilo", icon: FileText },
  { id: "experience", label: "Esperienze Lavorative", shortLabel: "Esperienze", icon: Briefcase },
  { id: "education", label: "Formazione & Studi", shortLabel: "Formazione", icon: GraduationCap },
  { id: "skills", label: "Competenze & Tech", shortLabel: "Competenze", icon: Wrench },
  { id: "projects", label: "Progetti & Lingue", shortLabel: "Extra", icon: FolderGit2 },
];

export const FormPanel: React.FC = () => {
  const { cvData, addCustomSection } = useCV();
  const [activeTab, setActiveTab] = useState<string>("settings");

  const handleAddNewSection = () => {
    const defaultTitle = `Sezione ${cvData.customSections.length + 1}`;
    const newId = addCustomSection(defaultTitle);
    setActiveTab(newId);
  };

  const activeCustomSection = cvData.customSections.find(
    (sec) => sec.id === activeTab
  );

  const allTabs = [
    ...standardSections.map((s) => s.id),
    ...cvData.customSections.map((c) => c.id),
  ];
  const currentIndex = allTabs.indexOf(activeTab);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allTabs.length - 1;

  return (
    <div className="flex flex-col h-full min-h-0 w-full overflow-hidden bg-neutral-50/50 dark:bg-neutral-950/60 border-r border-neutral-200 dark:border-neutral-800/80 transition-colors">
      {/* Section Navigation Tabs */}
      <div className="p-3 border-b border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md sticky top-0 z-20 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
          {/* Standard sections */}
          {standardSections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeTab === sec.id;
            
            // Dynamic label resolution from sectionOrder
            let dynamicLabel = sec.label;
            if (sec.id !== "settings" && sec.id !== "personal") {
              const foundInOrder = cvData.settings.sectionOrder?.find((s) => s.key === sec.id);
              if (foundInOrder && foundInOrder.label?.trim()) {
                dynamicLabel = foundInOrder.label.trim();
              }
            }

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveTab(sec.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 select-none",
                  isActive
                    ? "bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white border border-neutral-800 dark:border-neutral-700 shadow-xs"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900/60 border border-transparent"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-white" : "text-neutral-500 dark:text-neutral-400")} />
                <span className="max-w-[150px] truncate">{dynamicLabel}</span>
              </button>
            );
          })}

          {/* Dynamic Custom Sections Tabs */}
          {cvData.customSections.map((cSec) => {
            const isActive = activeTab === cSec.id;
            return (
              <button
                key={cSec.id}
                type="button"
                onClick={() => setActiveTab(cSec.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 select-none",
                  isActive
                    ? "bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white border border-neutral-800 dark:border-neutral-700 shadow-xs"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900/60 border border-transparent"
                )}
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span className="max-w-[120px] truncate">{cSec.title}</span>
              </button>
            );
          })}

          {/* Add Custom Section Button */}
          <button
            type="button"
            onClick={handleAddNewSection}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 border border-dashed border-neutral-300 dark:border-neutral-700 transition-colors cursor-pointer shrink-0"
            title="Aggiungi una nuova sezione personalizzata (es. Pubblicazioni, Volontariato...)"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Nuova Sezione</span>
          </button>
        </div>
      </div>

      {/* Form Content Area: Scrollable with bounded min-h-0 */}
      <div
        className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-6 pb-28 lg:pb-8 overscroll-contain"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {activeTab === "settings" && <SettingsForm />}
        {activeTab === "personal" && <PersonalInfoForm />}
        {activeTab === "summary" && <SummaryForm />}
        {activeTab === "experience" && <ExperienceForm />}
        {activeTab === "education" && <EducationForm />}
        {activeTab === "skills" && <SkillsForm />}
        {activeTab === "projects" && <ProjectsLanguagesForm />}
        {activeCustomSection && (
          <CustomSectionForm key={activeCustomSection.id} section={activeCustomSection} />
        )}
      </div>

      {/* Bottom Step Navigation Footer */}
      <div className="p-3.5 border-t border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 flex items-center justify-between gap-2 transition-colors shrink-0">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
          <Sparkles className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
          <span>Salvataggio istantaneo attivo</span>
        </div>

        <div className="flex items-center gap-2">
          {hasPrevious && (
            <button
              type="button"
              onClick={() => {
                if (currentIndex > 0) {
                  setActiveTab(allTabs[currentIndex - 1]);
                }
              }}
              className="px-3 py-1 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              Indietro
            </button>
          )}

          {hasNext ? (
            <button
              type="button"
              onClick={() => {
                if (currentIndex < allTabs.length - 1) {
                  setActiveTab(allTabs[currentIndex + 1]);
                }
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white hover:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-800 dark:border-neutral-700 transition-all cursor-pointer shadow-xs"
            >
              <span>Continua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              Tutto pronto!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
