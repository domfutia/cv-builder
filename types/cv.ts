export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  avatarUrl: string;
}

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
}

export interface ProjectItem {
  id: string;
  name: string;
  role?: string;
  description: string;
  link?: string;
  technologies: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  highlights?: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export type CVTemplate = 'minimal' | 'modern' | 'executive';
export type CVAccentColor = 'monochrome' | 'zinc' | 'emerald' | 'indigo' | 'sky' | 'rose' | 'amber' | 'custom';
export type CVFontFamily = 'inter' | 'sans' | 'serif' | 'mono';
export type CVFontSize = 'sm' | 'base' | 'lg';
export type CVSpacing = 'compact' | 'normal' | 'relaxed';

export interface CVSettings {
  template: CVTemplate;
  accentColor: CVAccentColor;
  accentColorHex?: string;
  primaryTextColor?: string;
  fontFamily: CVFontFamily;
  fontSize: CVFontSize;
  spacing: CVSpacing;
  showAvatar: boolean;
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
