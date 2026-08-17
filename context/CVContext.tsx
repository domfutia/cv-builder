"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  CVData,
  PersonalInfo,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  LanguageItem,
  ProjectItem,
  CertificationItem,
  CustomSection,
  CustomSectionItem,
  CVSettings,
  SectionOrderConfig,
} from "@/types/cv";
import { initialCVData, defaultSectionOrder, themePresets } from "@/data/initialCV";

const STORAGE_KEY = "once_cv_builder_data_v5";

interface CVContextType {
  cvData: CVData;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  reorderExperiences: (newOrder: ExperienceItem[]) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  reorderEducations: (newOrder: EducationItem[]) => void;
  addSkillCategory: (name: string) => void;
  updateSkillCategoryName: (id: string, name: string) => void;
  removeSkillCategory: (id: string) => void;
  addSkill: (categoryId: string, skill: string) => void;
  removeSkill: (categoryId: string, skill: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<CertificationItem>) => void;
  removeCertification: (id: string) => void;
  // Custom Sections
  addCustomSection: (title?: string) => string;
  updateCustomSectionTitle: (id: string, title: string) => void;
  removeCustomSection: (id: string) => void;
  addCustomSectionItem: (sectionId: string) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, data: Partial<CustomSectionItem>) => void;
  removeCustomSectionItem: (sectionId: string, itemId: string) => void;
  reorderCustomSectionItems: (sectionId: string, newOrder: CustomSectionItem[]) => void;
  // Layout Reorder, Labels & Themes
  updateSectionOrder: (newOrder: SectionOrderConfig[]) => void;
  updateSectionLabel: (key: string, label: string) => void;
  toggleSectionVisibility: (key: string) => void;
  applyThemePreset: (presetId: string) => void;
  // Settings & Storage
  updateSettings: (settings: Partial<CVSettings>) => void;
  resetToSample: () => void;
  clearAll: () => void;
  exportJSON: () => void;
  importJSON: (data: CVData) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cvData, setCvData] = useState<CVData>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (!parsed.customSections) parsed.customSections = initialCVData.customSections;
          if (!parsed.settings) parsed.settings = initialCVData.settings;
          if (!parsed.settings.sectionOrder) parsed.settings.sectionOrder = defaultSectionOrder;
          if (!parsed.settings.avatarShape) parsed.settings.avatarShape = "circle";
          if (!parsed.settings.avatarSize) parsed.settings.avatarSize = "md";
          if (!parsed.settings.tagBgColor) parsed.settings.tagBgColor = "#f4f4f5";
          if (!parsed.settings.tagTextColor) parsed.settings.tagTextColor = "#18181b";
          if (!parsed.settings.paperBgColor) parsed.settings.paperBgColor = "#ffffff";
          if (!parsed.settings.sidebarBgColor) parsed.settings.sidebarBgColor = "#18181b";
          return parsed;
        }
      } catch (err) {
        console.error("Error loading CV data from localStorage", err);
      }
    }
    return initialCVData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
    } catch (err) {
      console.error("Error saving CV data to localStorage", err);
    }
  }, [cvData]);

  // Personal Info
  const updatePersonalInfo = useCallback((data: Partial<PersonalInfo>) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
    }));
  }, []);

  // Summary
  const updateSummary = useCallback((summary: string) => {
    setCvData((prev) => ({
      ...prev,
      summary,
    }));
  }, []);

  // Experience
  const addExperience = useCallback(() => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
      highlights: [],
    };
    setCvData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
    }));
  }, []);

  const updateExperience = useCallback((id: string, data: Partial<ExperienceItem>) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((item) => item.id !== id),
    }));
  }, []);

  const reorderExperiences = useCallback((newOrder: ExperienceItem[]) => {
    setCvData((prev) => ({
      ...prev,
      experiences: newOrder,
    }));
  }, []);

  // Education
  const addEducation = useCallback(() => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      grade: "",
      details: "",
    };
    setCvData((prev) => ({
      ...prev,
      educations: [newEdu, ...prev.educations],
    }));
  }, []);

  const updateEducation = useCallback((id: string, data: Partial<EducationItem>) => {
    setCvData((prev) => ({
      ...prev,
      educations: prev.educations.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      educations: prev.educations.filter((item) => item.id !== id),
    }));
  }, []);

  const reorderEducations = useCallback((newOrder: EducationItem[]) => {
    setCvData((prev) => ({
      ...prev,
      educations: newOrder,
    }));
  }, []);

  // Skills
  const addSkillCategory = useCallback((name: string) => {
    if (!name.trim()) return;
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      name: name.trim(),
      skills: [],
    };
    setCvData((prev) => ({
      ...prev,
      skillCategories: [...prev.skillCategories, newCat],
    }));
  }, []);

  const updateSkillCategoryName = useCallback((id: string, name: string) => {
    setCvData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((cat) =>
        cat.id === id ? { ...cat, name } : cat
      ),
    }));
  }, []);

  const removeSkillCategory = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.filter((cat) => cat.id !== id),
    }));
  }, []);

  const addSkill = useCallback((categoryId: string, skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    setCvData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((cat) => {
        if (cat.id === categoryId) {
          if (cat.skills.includes(trimmed)) return cat;
          return { ...cat, skills: [...cat.skills, trimmed] };
        }
        return cat;
      }),
    }));
  }, []);

  const removeSkill = useCallback((categoryId: string, skill: string) => {
    setCvData((prev) => ({
      ...prev,
      skillCategories: prev.skillCategories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, skills: cat.skills.filter((s) => s !== skill) }
          : cat
      ),
    }));
  }, []);

  // Languages
  const addLanguage = useCallback(() => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: "",
      proficiency: "Intermedio",
    };
    setCvData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLang],
    }));
  }, []);

  const updateLanguage = useCallback((id: string, data: Partial<LanguageItem>) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }));
  }, []);

  const removeLanguage = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.filter((item) => item.id !== id),
    }));
  }, []);

  // Projects
  const addProject = useCallback(() => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: "",
      role: "",
      description: "",
      link: "",
      technologies: [],
    };
    setCvData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj],
    }));
  }, []);

  const updateProject = useCallback((id: string, data: Partial<ProjectItem>) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  }, []);

  // Certifications
  const addCertification = useCallback(() => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: "",
      issuer: "",
      date: "",
      link: "",
    };
    setCvData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }));
  }, []);

  const updateCertification = useCallback((id: string, data: Partial<CertificationItem>) => {
    setCvData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }));
  }, []);

  const removeCertification = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((item) => item.id !== id),
    }));
  }, []);

  // Custom Sections
  const addCustomSection = useCallback((title: string = "Nuova Sezione") => {
    const newId = `custom-sec-${Date.now()}`;
    const newSection: CustomSection = {
      id: newId,
      title: title.trim() || "Nuova Sezione",
      items: [
        {
          id: `item-${Date.now()}`,
          title: "",
          subtitle: "",
          date: "",
          description: "",
          highlights: [],
        },
      ],
    };
    setCvData((prev) => ({
      ...prev,
      customSections: [...(prev.customSections || []), newSection],
    }));
    return newId;
  }, []);

  const updateCustomSectionTitle = useCallback((id: string, title: string) => {
    setCvData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((sec) =>
        sec.id === id ? { ...sec, title } : sec
      ),
    }));
  }, []);

  const removeCustomSection = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).filter((sec) => sec.id !== id),
    }));
  }, []);

  const addCustomSectionItem = useCallback((sectionId: string) => {
    const newItem: CustomSectionItem = {
      id: `item-${Date.now()}`,
      title: "",
      subtitle: "",
      date: "",
      description: "",
      highlights: [],
    };
    setCvData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((sec) =>
        sec.id === sectionId ? { ...sec, items: [newItem, ...sec.items] } : sec
      ),
    }));
  }, []);

  const updateCustomSectionItem = useCallback(
    (sectionId: string, itemId: string, data: Partial<CustomSectionItem>) => {
      setCvData((prev) => ({
        ...prev,
        customSections: (prev.customSections || []).map((sec) => {
          if (sec.id !== sectionId) return sec;
          return {
            ...sec,
            items: sec.items.map((item) =>
              item.id === itemId ? { ...item, ...data } : item
            ),
          };
        }),
      }));
    },
    []
  );

  const removeCustomSectionItem = useCallback((sectionId: string, itemId: string) => {
    setCvData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.filter((item) => item.id !== itemId),
        };
      }),
    }));
  }, []);

  const reorderCustomSectionItems = useCallback(
    (sectionId: string, newOrder: CustomSectionItem[]) => {
      setCvData((prev) => ({
        ...prev,
        customSections: (prev.customSections || []).map((sec) =>
          sec.id === sectionId ? { ...sec, items: newOrder } : sec
        ),
      }));
    },
    []
  );

  // Section Reordering, Label Customization & Visibility
  const updateSectionOrder = useCallback((newOrder: SectionOrderConfig[]) => {
    setCvData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        sectionOrder: newOrder,
      },
    }));
  }, []);

  const updateSectionLabel = useCallback((key: string, label: string) => {
    setCvData((prev) => {
      const currentOrder = prev.settings.sectionOrder || defaultSectionOrder;
      const updated = currentOrder.map((s) =>
        s.key === key ? { ...s, label: label.trim() || s.label } : s
      );
      return {
        ...prev,
        settings: {
          ...prev.settings,
          sectionOrder: updated,
        },
      };
    });
  }, []);

  const toggleSectionVisibility = useCallback((key: string) => {
    setCvData((prev) => {
      const currentOrder = prev.settings.sectionOrder || defaultSectionOrder;
      const updated = currentOrder.map((s) =>
        s.key === key ? { ...s, isVisible: !s.isVisible } : s
      );
      return {
        ...prev,
        settings: {
          ...prev.settings,
          sectionOrder: updated,
        },
      };
    });
  }, []);

  // Theme Presets
  const applyThemePreset = useCallback((presetId: string) => {
    const preset = themePresets.find((p) => p.id === presetId);
    if (!preset) return;
    setCvData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        themePreset: preset.id,
        ...preset.colors,
      },
    }));
  }, []);

  // Settings
  const updateSettings = useCallback((settings: Partial<CVSettings>) => {
    setCvData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
  }, []);

  // Reset & Clear
  const resetToSample = useCallback(() => {
    setCvData(initialCVData);
  }, []);

  const clearAll = useCallback(() => {
    setCvData({
      personalInfo: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
        avatarUrl: "",
      },
      summary: "",
      experiences: [],
      educations: [],
      skillCategories: [
        { id: "cat-default", name: "Competenze Principali", skills: [] },
      ],
      languages: [],
      projects: [],
      certifications: [],
      customSections: [],
      settings: initialCVData.settings,
    });
  }, []);

  // Export / Import JSON
  const exportJSON = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${cvData.personalInfo.fullName.replace(/\s+/g, "_") || "curriculum"}_cv.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [cvData]);

  const importJSON = useCallback((data: CVData) => {
    if (data && data.personalInfo) {
      if (!data.customSections) data.customSections = [];
      if (!data.settings) data.settings = initialCVData.settings;
      if (!data.settings.sectionOrder) data.settings.sectionOrder = defaultSectionOrder;
      if (!data.settings.sidebarBgColor) data.settings.sidebarBgColor = "#18181b";
      setCvData(data);
    }
  }, []);

  return (
    <CVContext.Provider
      value={{
        cvData,
        updatePersonalInfo,
        updateSummary,
        addExperience,
        updateExperience,
        removeExperience,
        reorderExperiences,
        addEducation,
        updateEducation,
        removeEducation,
        reorderEducations,
        addSkillCategory,
        updateSkillCategoryName,
        removeSkillCategory,
        addSkill,
        removeSkill,
        addLanguage,
        updateLanguage,
        removeLanguage,
        addProject,
        updateProject,
        removeProject,
        addCertification,
        updateCertification,
        removeCertification,
        addCustomSection,
        updateCustomSectionTitle,
        removeCustomSection,
        addCustomSectionItem,
        updateCustomSectionItem,
        removeCustomSectionItem,
        reorderCustomSectionItems,
        updateSectionOrder,
        updateSectionLabel,
        toggleSectionVisibility,
        applyThemePreset,
        updateSettings,
        resetToSample,
        clearAll,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
};
