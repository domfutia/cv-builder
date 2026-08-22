"use client";

import React, { useState } from "react";
import { useCV } from "@/context/CVContext";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Languages, FolderGit2, Award, Plus, Trash2, Globe, PlusCircle } from "lucide-react";

export const ProjectsLanguagesForm: React.FC = () => {
  const {
    cvData,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification,
    updateSectionLabel,
    deleteSection,
    t,
  } = useCV();

  const [projectTechInputs, setProjectTechInputs] = useState<Record<string, string>>({});

  const langTitle =
    cvData.settings.sectionOrder?.find((s) => s.key === "languages")?.label || t.projectsLanguages.languagesTitle;
  const projTitle =
    cvData.settings.sectionOrder?.find((s) => s.key === "projects")?.label || t.projectsLanguages.projectsTitle;
  const certTitle =
    cvData.settings.sectionOrder?.find((s) => s.key === "certifications")?.label || t.projectsLanguages.certificationsTitle;

  const handleAddProjectTech = (projectId: string) => {
    const text = projectTechInputs[projectId];
    if (!text || !text.trim()) return;
    const project = cvData.projects.find((p) => p.id === projectId);
    if (!project) return;
    if (!project.technologies.includes(text.trim())) {
      updateProject(projectId, {
        technologies: [...project.technologies, text.trim()],
      });
    }
    setProjectTechInputs((prev) => ({ ...prev, [projectId]: "" }));
  };

  const handleRemoveProjectTech = (projectId: string, tech: string) => {
    const project = cvData.projects.find((p) => p.id === projectId);
    if (!project) return;
    updateProject(projectId, {
      technologies: project.technologies.filter((t) => t !== tech),
    });
  };

  return (
    <div className="space-y-8">
      {/* Lingue */}
      <div className="space-y-4">
        <SectionHeader
          title={langTitle}
          subtitle={t.projectsLanguages.subtitle}
          icon={<Languages className="w-5 h-5" />}
          editableTitle={true}
          onTitleChange={(newTitle) => updateSectionLabel("languages", newTitle)}
          canDelete={true}
          onDelete={() => deleteSection("languages")}
          action={
            <Button
              variant="secondary"
              size="sm"
              onClick={addLanguage}
              icon={<Plus className="w-4 h-4" />}
              className="cursor-pointer"
            >
              {t.projectsLanguages.addLanguageBtn}
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cvData.languages.map((lang) => (
            <Card key={lang.id} className="p-3.5 space-y-3 bg-white dark:bg-neutral-900/80">
              <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-neutral-200 dark:border-neutral-800/60">
                <h5 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                  {lang.language || t.projectsLanguages.languageNamePlaceholder}
                  {lang.proficiency ? ` • ${lang.proficiency}` : ""}
                </h5>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLanguage(lang.id)}
                  className="p-1 h-7 text-neutral-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <Input
                  label={t.projectsLanguages.languagesTitle}
                  placeholder={t.projectsLanguages.languageNamePlaceholder}
                  value={lang.language}
                  onChange={(val) => updateLanguage(lang.id, { language: val })}
                />
                <Input
                  label={t.projectsLanguages.proficiencyFluent}
                  placeholder={t.projectsLanguages.proficiencyFluent}
                  value={lang.proficiency}
                  onChange={(val) => updateLanguage(lang.id, { proficiency: val })}
                />
              </div>

              <Input
                label={t.projectsLanguages.languageDetails}
                placeholder={t.projectsLanguages.languageDetailsPlaceholder}
                value={lang.details || ""}
                onChange={(val) => updateLanguage(lang.id, { details: val })}
              />
            </Card>
          ))}
        </div>
      </div>

      {/* Progetti */}
      <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800/80">
        <SectionHeader
          title={projTitle}
          subtitle={t.projectsLanguages.projectsTitle}
          icon={<FolderGit2 className="w-5 h-5" />}
          editableTitle={true}
          onTitleChange={(newTitle) => updateSectionLabel("projects", newTitle)}
          canDelete={true}
          onDelete={() => deleteSection("projects")}
          action={
            <Button
              variant="secondary"
              size="sm"
              onClick={addProject}
              icon={<Plus className="w-4 h-4" />}
              className="cursor-pointer"
            >
              {t.projectsLanguages.addProjectBtn}
            </Button>
          }
        />

        <div className="space-y-4">
          {cvData.projects.map((proj) => (
            <Card key={proj.id} className="space-y-3 bg-white dark:bg-neutral-900/80">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-neutral-200 dark:border-neutral-800/60">
                <div>
                  <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    {proj.name || t.projectsLanguages.projectNamePlaceholder}
                  </h4>
                  {(proj.startDate || proj.endDate || proj.isCurrent) && (
                    <p className="text-xs text-neutral-500 truncate">
                      {proj.startDate || "Start"} — {proj.isCurrent ? (t.docLabels.present || "In corso") : proj.endDate || (t.docLabels.present || "Presente")}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(proj.id)}
                  className="p-1.5 h-8 text-neutral-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label={t.projectsLanguages.projectName}
                  placeholder={t.projectsLanguages.projectNamePlaceholder}
                  value={proj.name}
                  onChange={(val) => updateProject(proj.id, { name: val })}
                />
                <Input
                  label={t.projectsLanguages.projectRole}
                  placeholder={t.projectsLanguages.projectRolePlaceholder}
                  value={proj.role || ""}
                  onChange={(val) => updateProject(proj.id, { role: val })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label={t.projectsLanguages.startDate}
                  placeholder={t.projectsLanguages.startDatePlaceholder}
                  value={proj.startDate || ""}
                  onChange={(val) => updateProject(proj.id, { startDate: val })}
                />
                <Input
                  label={t.projectsLanguages.endDate}
                  placeholder={t.projectsLanguages.endDatePlaceholder}
                  value={proj.endDate || ""}
                  disabled={proj.isCurrent}
                  onChange={(val) => updateProject(proj.id, { endDate: val })}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`proj-isCurrent-${proj.id}`}
                  checked={proj.isCurrent || false}
                  onChange={(e) => updateProject(proj.id, { isCurrent: e.target.checked })}
                  className="w-4 h-4 rounded bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200 focus:ring-neutral-500 cursor-pointer"
                />
                <label
                  htmlFor={`proj-isCurrent-${proj.id}`}
                  className="text-xs text-neutral-700 dark:text-neutral-300 select-none cursor-pointer"
                >
                  {t.projectsLanguages.isCurrent}
                </label>
              </div>

              <Input
                label={t.projectsLanguages.projectLink}
                placeholder={t.projectsLanguages.projectLinkPlaceholder}
                value={proj.link || ""}
                onChange={(val) => updateProject(proj.id, { link: val })}
                icon={<Globe className="w-4 h-4" />}
              />

              <Textarea
                label={t.projectsLanguages.projectDescription}
                rows={2}
                placeholder={t.projectsLanguages.projectDescriptionPlaceholder}
                value={proj.description}
                onChange={(val) => updateProject(proj.id, { description: val })}
              />

              {/* Technologies Badges */}
              <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800/40">
                <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase">
                  {t.projectsLanguages.projectTech}
                </label>
                <div className="flex flex-wrap gap-1.5 min-h-[24px]">
                  {proj.technologies.map((tItem, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      onRemove={() => handleRemoveProjectTech(proj.id, tItem)}
                    >
                      {tItem}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder={t.projectsLanguages.projectTechPlaceholder}
                    value={projectTechInputs[proj.id] || ""}
                    onChange={(e) =>
                      setProjectTechInputs((prev) => ({
                        ...prev,
                        [proj.id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddProjectTech(proj.id);
                      }
                    }}
                    className="flex-1 rounded-md bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 text-xs text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-neutral-500"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleAddProjectTech(proj.id)}
                    disabled={!projectTechInputs[proj.id]?.trim()}
                    icon={<PlusCircle className="w-3.5 h-3.5" />}
                    className="cursor-pointer"
                  >
                    {t.add}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Certificazioni */}
      <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800/80">
        <SectionHeader
          title={certTitle}
          subtitle={t.projectsLanguages.certificationsTitle}
          icon={<Award className="w-5 h-5" />}
          editableTitle={true}
          onTitleChange={(newTitle) => updateSectionLabel("certifications", newTitle)}
          canDelete={true}
          onDelete={() => deleteSection("certifications")}
          action={
            <Button
              variant="secondary"
              size="sm"
              onClick={addCertification}
              icon={<Plus className="w-4 h-4" />}
              className="cursor-pointer"
            >
              {t.projectsLanguages.addCertificationBtn}
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cvData.certifications.map((cert) => (
            <Card key={cert.id} className="space-y-3 bg-white dark:bg-neutral-900/80">
              <div className="flex items-center justify-between gap-2 pb-1 border-b border-neutral-200 dark:border-neutral-800/60">
                <div className="truncate">
                  <h5 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                    {cert.name || t.projectsLanguages.certificationNamePlaceholder}
                  </h5>
                  {(cert.startDate || cert.endDate || cert.isCurrent || cert.date) && (
                    <p className="text-[11px] text-neutral-500 truncate">
                      {cert.startDate
                        ? `${cert.startDate} — ${cert.isCurrent ? (t.docLabels.present || "Attiva") : cert.endDate || (t.docLabels.present || "Presente")}`
                        : cert.date || ""}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCertification(cert.id)}
                  className="p-1 h-7 text-neutral-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              <Input
                label={t.projectsLanguages.certificationName}
                placeholder={t.projectsLanguages.certificationNamePlaceholder}
                value={cert.name}
                onChange={(val) => updateCertification(cert.id, { name: val })}
              />

              <Input
                label={t.projectsLanguages.issuer}
                placeholder={t.projectsLanguages.issuerPlaceholder}
                value={cert.issuer}
                onChange={(val) => updateCertification(cert.id, { issuer: val })}
              />

              <div className="grid grid-cols-2 gap-2">
                <Input
                  label={t.projectsLanguages.certStartDate}
                  placeholder={t.projectsLanguages.certStartDatePlaceholder}
                  value={cert.startDate || cert.date || ""}
                  onChange={(val) => updateCertification(cert.id, { startDate: val, date: val })}
                />
                <Input
                  label={t.projectsLanguages.certEndDate}
                  placeholder={t.projectsLanguages.certEndDatePlaceholder}
                  value={cert.endDate || ""}
                  disabled={cert.isCurrent}
                  onChange={(val) => updateCertification(cert.id, { endDate: val })}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`cert-isCurrent-${cert.id}`}
                  checked={cert.isCurrent || false}
                  onChange={(e) => updateCertification(cert.id, { isCurrent: e.target.checked })}
                  className="w-4 h-4 rounded bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200 focus:ring-neutral-500 cursor-pointer"
                />
                <label
                  htmlFor={`cert-isCurrent-${cert.id}`}
                  className="text-xs text-neutral-700 dark:text-neutral-300 select-none cursor-pointer"
                >
                  {t.projectsLanguages.certIsCurrent}
                </label>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
