import { CVData, SectionOrderConfig, ThemeColors } from "@/types/cv";

// Elegant minimalist silhouette placeholder avatar (Base64 SVG)
export const defaultAvatarBase64 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMxODE4MWIiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjcwIiBmaWxsPSIjZjRmNGY1Ii8+PHBhdGggZD0iTTcwIDM1MCBDNzAgMjUwLCAxNDAgMjMwLCAyMDAgMjMwIEMyNjAgMjMwLCAzMzAgMjUwLCAzMzAgMzUwIFoiIGZpbGw9IiNmNGY0ZjUiLz48L3N2Zz4=";

export const defaultSectionOrder: SectionOrderConfig[] = [
  { id: "sec-summary", key: "summary", label: "Profilo Professionale", isVisible: true, column: "main" },
  { id: "sec-experience", key: "experience", label: "Esperienze Lavorative", isVisible: true, column: "main" },
  { id: "sec-education", key: "education", label: "Formazione & Studi", isVisible: true, column: "main" },
  { id: "sec-cust-1", key: "cust-1", label: "Pubblicazioni & Speaking", isVisible: true, column: "main" },
  { id: "sec-projects", key: "projects", label: "Progetti di Rilievo", isVisible: true, column: "main" },
  { id: "sec-skills", key: "skills", label: "Competenze & Tecnologie", isVisible: true, column: "sidebar" },
  { id: "sec-languages", key: "languages", label: "Lingue", isVisible: true, column: "sidebar" },
  { id: "sec-certifications", key: "certifications", label: "Certificazioni", isVisible: true, column: "sidebar" },
];

export interface StandardSectionDefinition {
  key: string;
  defaultLabel: string;
  defaultColumn: "main" | "sidebar";
}

export const standardSectionsMeta: StandardSectionDefinition[] = [
  { key: "summary", defaultLabel: "Profilo Professionale", defaultColumn: "main" },
  { key: "experience", defaultLabel: "Esperienze Lavorative", defaultColumn: "main" },
  { key: "education", defaultLabel: "Formazione & Studi", defaultColumn: "main" },
  { key: "skills", defaultLabel: "Competenze & Tecnologie", defaultColumn: "sidebar" },
  { key: "projects", defaultLabel: "Progetti di Rilievo", defaultColumn: "main" },
  { key: "languages", defaultLabel: "Lingue", defaultColumn: "sidebar" },
  { key: "certifications", defaultLabel: "Certificazioni", defaultColumn: "sidebar" },
];

export interface ThemePresetDefinition {
  id: string;
  name: string;
  description: string;
  previewColors: string[];
  colors: ThemeColors;
}

export const themePresets: ThemePresetDefinition[] = [
  {
    id: "obsidian",
    name: "Obsidian Minimal",
    description: "Monocromatico puro: contrasti netti in nero antracite e grafite",
    previewColors: ["#09090b", "#52525b", "#ffffff"],
    colors: {
      primaryTextColor: "#09090b",
      secondaryTextColor: "#52525b",
      bodyTextColor: "#27272a",
      accentColorHex: "#18181b",
      tagBgColor: "#f4f4f5",
      tagTextColor: "#18181b",
      paperBgColor: "#ffffff",
      sidebarBgColor: "#18181b",
    },
  },
  {
    id: "nordic",
    name: "Nordic Slate",
    description: "Tonalità fredde ed eleganti in ardesia profonda e acciaio desaturato",
    previewColors: ["#0f172a", "#334e68", "#f8fafc"],
    colors: {
      primaryTextColor: "#0f172a",
      secondaryTextColor: "#475569",
      bodyTextColor: "#334155",
      accentColorHex: "#334e68",
      tagBgColor: "#f1f5f9",
      tagTextColor: "#1e293b",
      paperBgColor: "#ffffff",
      sidebarBgColor: "#1e293b",
    },
  },
  {
    id: "executive",
    name: "Warm Executive",
    description: "Toni caldi sofisticati: carta avorio, marrone cioccolato e bronzo",
    previewColors: ["#291e18", "#8c5338", "#fdfbf7"],
    colors: {
      primaryTextColor: "#291e18",
      secondaryTextColor: "#6c584c",
      bodyTextColor: "#443627",
      accentColorHex: "#8c5338",
      tagBgColor: "#ede4d8",
      tagTextColor: "#3e2723",
      paperBgColor: "#fdfbf7",
      sidebarBgColor: "#2b211b",
    },
  },
  {
    id: "forest",
    name: "Forest Professional",
    description: "Verde bosco scurissimo e desaturato per profili autorevoli e consulenza",
    previewColors: ["#14231d", "#2d4a3e", "#ffffff"],
    colors: {
      primaryTextColor: "#14231d",
      secondaryTextColor: "#3e564d",
      bodyTextColor: "#283832",
      accentColorHex: "#2d4a3e",
      tagBgColor: "#e8efec",
      tagTextColor: "#172d24",
      paperBgColor: "#ffffff",
      sidebarBgColor: "#192922",
    },
  },
];

export const initialCVData: CVData = {
  personalInfo: {
    fullName: "Alex Vender",
    jobTitle: "Senior Frontend & UI Engineer",
    email: "alex.vender@designsys.io",
    phone: "+39 02 8765 4321",
    location: "Milano, Italia",
    website: "vender.design",
    linkedin: "https://linkedin.com/in/alexvender",
    github: "https://github.com/alexvender",
    avatarUrl: defaultAvatarBase64,
  },
  summary:
    "Product-minded Frontend Engineer con 6+ anni di esperienza nella progettazione di Design System modulari e applicazioni web performanti con React, Next.js e TypeScript. Focus su accessibilità WCAG, micro-interazioni e tipografia curata.",
  experiences: [
    {
      id: "exp-1",
      company: "Linear Technologies",
      position: "Lead Frontend Engineer",
      location: "Milano / Remoto",
      startDate: "2022-03",
      endDate: "",
      isCurrent: true,
      description:
        "Guida dello sviluppo del core design system e della piattaforma web interattiva.",
      highlights: [
        "Sviluppo di una libreria di oltre 35 componenti accessibili con micro-interazioni fluide.",
        "Miglioramento del Largest Contentful Paint (LCP) del 40% tramite server components.",
      ],
    },
    {
      id: "exp-2",
      company: "Stripe Ecosystem Partner",
      position: "Senior Frontend Developer",
      location: "Milano, Italia",
      startDate: "2019-09",
      endDate: "2022-02",
      isCurrent: false,
      description:
        "Sviluppo di dashboard finanziarie complesse e checkout multi-valuta.",
      highlights: [
        "Integrazione di flussi di pagamento e grafici analitici interattivi con D3.js.",
      ],
    },
  ],
  educations: [
    {
      id: "edu-1",
      institution: "Politecnico di Milano",
      degree: "Laurea Magistrale in Digital Design & Interaction",
      fieldOfStudy: "Software Engineering & HCI",
      location: "Milano",
      startDate: "2015",
      endDate: "2017",
      isCurrent: false,
      grade: "110/110 con Lode",
      details: "",
    },
  ],
  skillCategories: [
    {
      id: "cat-1",
      name: "Frontend & Web",
      skills: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
    },
    {
      id: "cat-2",
      name: "UI/UX & Design",
      skills: ["Design Systems", "Figma to Code", "WCAG A11y", "Micro-animations"],
    },
    {
      id: "cat-3",
      name: "Tools & Testing",
      skills: ["Git / GitHub", "Playwright", "Vitest", "Docker", "Turborepo"],
    },
  ],
  languages: [
    { id: "lang-1", language: "Italiano", proficiency: "Madrelingua" },
    { id: "lang-2", language: "Inglese", proficiency: "Fluente (C2 / Professionale)", details: "Certificato C2 Cambridge (CPE)" },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Aura Design System",
      role: "Creator & Maintainer",
      startDate: "2023-01",
      endDate: "",
      isCurrent: true,
      description: "Libreria open-source di componenti UI headless con token semantici.",
      link: "https://github.com/alexvender/aura-ui",
      technologies: ["React", "TypeScript", "Tailwind"],
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      startDate: "2023",
      endDate: "2026",
      isCurrent: false,
      date: "2023 — 2026",
    },
  ],
  customSections: [],
  settings: {
    template: "minimal",
    themePreset: "obsidian",
    primaryTextColor: "#09090b",
    secondaryTextColor: "#52525b",
    bodyTextColor: "#27272a",
    accentColorHex: "#18181b",
    tagBgColor: "#f4f4f5",
    tagTextColor: "#18181b",
    paperBgColor: "#ffffff",
    sidebarBgColor: "#18181b",
    fontFamily: "inter",
    fontSize: "base",
    spacing: "normal",
    showAvatar: true,
    avatarShape: "circle",
    avatarSize: "md",
    sectionOrder: defaultSectionOrder.filter(s => s.key !== "cust-1"),
    pdfFileName: "Alex_Vender_CV",
  },
};
