export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  grade?: string;
  details?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: string;
  details?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description: string;
  link?: string;
  technologies: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  date?: string;
  link?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  date?: string;
  description?: string;
  highlights?: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  avatarUrl?: string;
}

export type CVTemplate = "minimal" | "modern" | "executive";
export type CVFontSize = "sm" | "base" | "lg";
export type CVSpacing = "compact" | "normal" | "relaxed";
export type AvatarShape = "circle" | "rounded" | "square";
export type AvatarSize = "sm" | "md" | "lg";

export interface SectionOrderConfig {
  id: string;
  key: string;              // "summary", "experience", "education", "skills", "languages", "certifications", "projects", or custom section id
  label: string;
  isVisible: boolean;
  column?: "main" | "sidebar"; // For Modern Sidebar column placement
}

export interface ThemeColors {
  primaryTextColor: string;    // Titoli principali, nome
  secondaryTextColor: string;  // Sottotitoli, ruoli, date
  bodyTextColor: string;       // Paragrafi, bullet points
  accentColorHex: string;      // Linee divisorie, accenti, icone
  tagBgColor: string;          // Sfondo pill competenze
  tagTextColor: string;        // Testo pill competenze
  paperBgColor: string;        // Sfondo del foglio CV stampato
  sidebarBgColor?: string;     // Sfondo personalizzato della sidebar (Modern Sidebar)
}

export interface CVSettings extends ThemeColors {
  template: CVTemplate;
  themePreset?: string;
  fontFamily: "inter" | "serif" | "mono";
  fontSize: CVFontSize;
  spacing: CVSpacing;
  showAvatar: boolean;
  avatarShape: AvatarShape;
  avatarSize: AvatarSize;
  sectionOrder: SectionOrderConfig[];
  pdfFileName?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experiences: ExperienceItem[];
  educations: EducationItem[];
  skillCategories: SkillCategory[];
  languages: LanguageItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  customSections: CustomSection[];
  settings: CVSettings;
}
