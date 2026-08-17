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
  } = useCV();

  const [projectTechInputs, setProjectTechInputs] = useState<Record<string, string>>({});

  const langTitle =
    cvData.settings.sectionOrder?.find((s) => s.key === "languages")?.label || "Lingue Conosciute";
  const projTitle =
    cvData.settings.sectionOrder?.find((s) => s.key === "projects")?.label || "Progetti & Portfolio";
  const certTitle =
    cvData.settings.sectionOrder?.find((s) => s.key === "certifications")?.label || "Certificazioni";

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
          subtitle="Aggiungi le lingue parlate e il rispettivo livello di padronanza"
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
            >
              Aggiungi Lingua
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cvData.languages.map((lang) => (
            <Card key={lang.id} className="p-3 bg-white dark:bg-neutral-900/80">
              <div className="flex items-center gap-2">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="es. Italiano, Inglese..."
                    value={lang.language}
                    onChange={(val) => updateLanguage(lang.id, { language: val })}
                  />
                  <Input
                    placeholder="es. Madrelingua, C1, B2..."
                    value={lang.proficiency}
                    onChange={(val) => updateLanguage(lang.id, { proficiency: val })}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLanguage(lang.id)}
                  className="p-1.5 h-8 text-neutral-400 hover:text-red-500 dark:hover:text-red-400 self-start"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Progetti */}
      <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800/80">
        <SectionHeader
          title={projTitle}
          subtitle="Metti in risalto i progetti open-source, prodotti o portfolio"
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
            >
              Aggiungi Progetto
            </Button>
          }
        />

        <div className="space-y-4">
          {cvData.projects.map((proj) => (
            <Card key={proj.id} className="space-y-3 bg-white dark:bg-neutral-900/80">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-neutral-200 dark:border-neutral-800/60">
                <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  {proj.name || "Nuovo Progetto"}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(proj.id)}
                  className="p-1.5 h-8 text-neutral-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label="Nome Progetto"
                  placeholder="es. Aura UI"
                  value={proj.name}
                  onChange={(val) => updateProject(proj.id, { name: val })}
                />
                <Input
                  label="Ruolo (Opzionale)"
                  placeholder="es. Creatore & Lead Developer"
                  value={proj.role || ""}
                  onChange={(val) => updateProject(proj.id, { role: val })}
                />
              </div>

              <Input
                label="Link / Repository"
                placeholder="es. https://github.com/alex/aura"
                value={proj.link || ""}
                onChange={(val) => updateProject(proj.id, { link: val })}
                icon={<Globe className="w-4 h-4" />}
              />

              <Textarea
                label="Descrizione"
                rows={2}
                placeholder="Breve descrizione dell'obiettivo e dell'impatto del progetto..."
                value={proj.description}
                onChange={(val) => updateProject(proj.id, { description: val })}
              />

              {/* Technologies Badges */}
              <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800/40">
                <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase">
                  Tecnologie Usate
                </label>
                <div className="flex flex-wrap gap-1.5 min-h-[24px]">
                  {proj.technologies.map((t, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      onRemove={() => handleRemoveProjectTech(proj.id, t)}
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Aggiungi tech (es. React, Next.js)..."
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
                  >
                    Aggiungi
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
          subtitle="Certificati di settore, esami professionali e riconoscimenti"
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
            >
              Aggiungi Certificazione
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cvData.certifications.map((cert) => (
            <Card key={cert.id} className="space-y-3 bg-white dark:bg-neutral-900/80">
              <div className="flex items-center justify-between gap-2 pb-1 border-b border-neutral-200 dark:border-neutral-800/60">
                <h5 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                  {cert.name || "Nuova Certificazione"}
                </h5>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCertification(cert.id)}
                  className="p-1 h-7 text-neutral-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              <Input
                label="Nome Certificazione"
                placeholder="es. AWS Certified Solutions Architect"
                value={cert.name}
                onChange={(val) => updateCertification(cert.id, { name: val })}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Ente Emittente"
                  placeholder="es. Amazon AWS"
                  value={cert.issuer}
                  onChange={(val) => updateCertification(cert.id, { issuer: val })}
                />
                <Input
                  label="Anno / Data"
                  placeholder="es. 2023"
                  value={cert.date}
                  onChange={(val) => updateCertification(cert.id, { date: val })}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
