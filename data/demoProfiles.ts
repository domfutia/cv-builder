import { CVData } from "@/types/cv";
import { defaultSectionOrder, defaultAvatarBase64 } from "./initialCV";

// =========================================================================
// DEMO PROFILE 1: Tech / Software Engineer
// =========================================================================
export const demoTech: CVData = {
  personalInfo: {
    fullName: "Marco Bianchi",
    jobTitle: "Full-Stack Software Engineer",
    email: "marco.bianchi@dev.io",
    phone: "+39 333 456 7890",
    location: "Milano, Italia",
    website: "marcobianchi.dev",
    linkedin: "https://linkedin.com/in/marcobianchi",
    github: "https://github.com/marcobianchi",
    avatarUrl: defaultAvatarBase64,
  },
  summary: "Full-Stack Engineer con 5 anni di esperienza nello sviluppo di applicazioni cloud-native con React, Node.js e AWS. Appassionato di architetture pulite, testing automatizzato e developer experience.",
  experiences: [
    {
      id: "exp-1",
      company: "CloudTech Solutions",
      position: "Senior Full-Stack Developer",
      location: "Milano",
      startDate: "2022-01",
      endDate: "",
      isCurrent: true,
      description: "Sviluppo di piattaforme SaaS per la gestione di infrastrutture cloud.",
      highlights: ["Migrazione da monolite a microservizi, riducendo i tempi di deploy del 60%", "Implementazione CI/CD con GitHub Actions e AWS CodePipeline"],
    },
    {
      id: "exp-2",
      company: "Digital Factory",
      position: "Frontend Developer",
      location: "Torino",
      startDate: "2019-06",
      endDate: "2021-12",
      isCurrent: false,
      description: "Sviluppo di dashboard analitiche e applicazioni web per clienti enterprise.",
      highlights: ["Creazione di una design system interna con 25+ componenti riutilizzabili"],
    },
  ],
  educations: [
    {
      id: "edu-1",
      institution: "Politecnico di Milano",
      degree: "Laurea Magistrale in Ingegneria Informatica",
      fieldOfStudy: "Software Engineering",
      location: "Milano",
      startDate: "2016",
      endDate: "2019",
      isCurrent: false,
      grade: "110/110 con Lode",
      details: "",
    },
  ],
  skillCategories: [
    { id: "cat-1", name: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { id: "cat-2", name: "Backend", skills: ["Node.js", "Python", "PostgreSQL", "Redis"] },
    { id: "cat-3", name: "DevOps", skills: ["AWS", "Docker", "Kubernetes", "Terraform"] },
  ],
  languages: [
    { id: "lang-1", language: "Italiano", proficiency: "Madrelingua" },
    { id: "lang-2", language: "Inglese", proficiency: "Fluente (C1)" },
  ],
  projects: [
    {
      id: "proj-1",
      name: "OpenMetrics Dashboard",
      role: "Creator",
      description: "Dashboard open-source per il monitoraggio real-time di metriche applicative.",
      link: "github.com/marcobianchi/openmetrics",
      technologies: ["React", "D3.js", "WebSocket"],
    },
  ],
  certifications: [
    { id: "cert-1", name: "AWS Solutions Architect Associate", issuer: "Amazon Web Services", date: "2023" },
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
    pdfFileName: "Marco_Bianchi_CV",
  },
};

// =========================================================================
// DEMO PROFILE 2: Finance / Analyst
// =========================================================================
export const demoFinance: CVData = {
  personalInfo: {
    fullName: "Elena Moretti",
    jobTitle: "Financial Analyst & Risk Management",
    email: "elena.moretti@finance.it",
    phone: "+39 02 1234 5678",
    location: "Roma, Italia",
    website: "",
    linkedin: "https://linkedin.com/in/elenamoretti",
    github: "",
    avatarUrl: defaultAvatarBase64,
  },
  summary: "Financial Analyst con 6 anni di esperienza in analisi quantitativa, risk management e modellazione finanziaria per istituzioni bancarie e fondi di investimento. Certificata CFA Level II.",
  experiences: [
    {
      id: "exp-1",
      company: "Intesa Sanpaolo",
      position: "Senior Financial Analyst",
      location: "Roma",
      startDate: "2021-03",
      endDate: "",
      isCurrent: true,
      description: "Analisi di portafoglio e valutazione del rischio per il dipartimento Corporate & Investment Banking.",
      highlights: ["Sviluppo di modelli VaR che hanno ridotto l'esposizione al rischio del 18%", "Coordinamento di un team di 3 analisti junior"],
    },
    {
      id: "exp-2",
      company: "Deloitte Advisory",
      position: "Junior Financial Consultant",
      location: "Milano",
      startDate: "2018-09",
      endDate: "2021-02",
      isCurrent: false,
      description: "Consulenza in ambito M&A e due diligence finanziaria per clienti mid-cap.",
      highlights: ["Supporto in 12 operazioni di M&A per un valore aggregato di €800M"],
    },
  ],
  educations: [
    {
      id: "edu-1",
      institution: "Università Bocconi",
      degree: "Laurea Magistrale in Finanza Quantitativa",
      fieldOfStudy: "Quantitative Finance",
      location: "Milano",
      startDate: "2016",
      endDate: "2018",
      isCurrent: false,
      grade: "110/110",
      details: "",
    },
  ],
  skillCategories: [
    { id: "cat-1", name: "Analisi Finanziaria", skills: ["Modelli DCF", "Valutazione M&A", "Risk Assessment", "Bloomberg Terminal"] },
    { id: "cat-2", name: "Strumenti", skills: ["Excel Avanzato", "Python (Pandas)", "SQL", "Power BI", "VBA"] },
  ],
  languages: [
    { id: "lang-1", language: "Italiano", proficiency: "Madrelingua" },
    { id: "lang-2", language: "Inglese", proficiency: "Fluente (C2)" },
    { id: "lang-3", language: "Francese", proficiency: "Intermedio (B1)" },
  ],
  projects: [],
  certifications: [
    { id: "cert-1", name: "CFA Level II Candidate", issuer: "CFA Institute", date: "2024" },
    { id: "cert-2", name: "Financial Risk Manager (FRM)", issuer: "GARP", date: "2022" },
  ],
  customSections: [],
  settings: {
    template: "executive",
    themePreset: "executive",
    primaryTextColor: "#291e18",
    secondaryTextColor: "#6c584c",
    bodyTextColor: "#443627",
    accentColorHex: "#8c5338",
    tagBgColor: "#ede4d8",
    tagTextColor: "#3e2723",
    paperBgColor: "#fdfbf7",
    sidebarBgColor: "#2b211b",
    fontFamily: "inter",
    fontSize: "base",
    spacing: "normal",
    showAvatar: false,
    avatarShape: "circle",
    avatarSize: "md",
    sectionOrder: defaultSectionOrder.filter(s => s.key !== "cust-1" && s.key !== "projects"),
    pdfFileName: "Elena_Moretti_CV",
  },
};

// =========================================================================
// DEMO PROFILE 3: Humanities / Communication
// =========================================================================
export const demoHumanities: CVData = {
  personalInfo: {
    fullName: "Giulia Fontana",
    jobTitle: "Giornalista & Content Strategist",
    email: "giulia.fontana@media.it",
    phone: "+39 345 678 1234",
    location: "Firenze, Italia",
    website: "giuliafontana.it",
    linkedin: "https://linkedin.com/in/giuliafontana",
    github: "",
    avatarUrl: defaultAvatarBase64,
  },
  summary: "Giornalista professionista e Content Strategist con 8 anni di esperienza nella creazione di contenuti editoriali, storytelling per brand e gestione di redazioni digitali. Pubblicata su testate nazionali e internazionali.",
  experiences: [
    {
      id: "exp-1",
      company: "Corriere della Sera Digital",
      position: "Senior Editor & Content Strategist",
      location: "Milano",
      startDate: "2021-06",
      endDate: "",
      isCurrent: true,
      description: "Responsabile della strategia editoriale digitale e del team di content creation.",
      highlights: ["Crescita del traffico organico del 45% in 18 mesi", "Lancio di 3 newsletter tematiche con 50k+ iscritti"],
    },
    {
      id: "exp-2",
      company: "Internazionale",
      position: "Redattrice Culturale",
      location: "Roma",
      startDate: "2017-03",
      endDate: "2021-05",
      isCurrent: false,
      description: "Curatela della sezione Cultura e Società, con focus su reportage longform.",
      highlights: ["Premio Giornalistico Ilaria Alpi 2020 per il reportage 'Voci dal Mediterraneo'"],
    },
  ],
  educations: [
    {
      id: "edu-1",
      institution: "Università di Bologna",
      degree: "Laurea Magistrale in Scienze della Comunicazione",
      fieldOfStudy: "Giornalismo e Culture Editoriali",
      location: "Bologna",
      startDate: "2013",
      endDate: "2016",
      isCurrent: false,
      grade: "110/110 con Lode",
      details: "",
    },
  ],
  skillCategories: [
    { id: "cat-1", name: "Competenze Editoriali", skills: ["Scrittura Longform", "SEO Copywriting", "Storytelling", "Editing"] },
    { id: "cat-2", name: "Strumenti Digitali", skills: ["WordPress", "Google Analytics", "Mailchimp", "Canva", "Adobe InDesign"] },
  ],
  languages: [
    { id: "lang-1", language: "Italiano", proficiency: "Madrelingua" },
    { id: "lang-2", language: "Inglese", proficiency: "Fluente (C1)" },
    { id: "lang-3", language: "Spagnolo", proficiency: "Buono (B2)" },
  ],
  projects: [],
  certifications: [
    { id: "cert-1", name: "Ordine dei Giornalisti — Professionista", issuer: "ODG Toscana", date: "2019" },
  ],
  customSections: [],
  settings: {
    template: "minimal",
    themePreset: "nordic",
    primaryTextColor: "#0f172a",
    secondaryTextColor: "#475569",
    bodyTextColor: "#334155",
    accentColorHex: "#334e68",
    tagBgColor: "#f1f5f9",
    tagTextColor: "#1e293b",
    paperBgColor: "#ffffff",
    sidebarBgColor: "#1e293b",
    fontFamily: "inter",
    fontSize: "base",
    spacing: "normal",
    showAvatar: true,
    avatarShape: "rounded",
    avatarSize: "sm",
    sectionOrder: defaultSectionOrder.filter(s => s.key !== "cust-1" && s.key !== "projects"),
    pdfFileName: "Giulia_Fontana_CV",
  },
};

// =========================================================================
// DEMO PROFILE 4: Design / Creative
// =========================================================================
export const demoDesign: CVData = {
  personalInfo: {
    fullName: "Luca Rinaldi",
    jobTitle: "Product Designer & UX Lead",
    email: "luca@rinaldi.design",
    phone: "+39 348 222 3344",
    location: "Torino, Italia",
    website: "rinaldi.design",
    linkedin: "https://linkedin.com/in/lucarinaldi",
    github: "",
    avatarUrl: defaultAvatarBase64,
  },
  summary: "Product Designer con 6 anni di esperienza nella progettazione di esperienze digitali user-centered per startup e aziende tech. Specializzato in design system, prototipazione rapida e user research.",
  experiences: [
    {
      id: "exp-1",
      company: "Satispay",
      position: "Lead Product Designer",
      location: "Milano",
      startDate: "2022-04",
      endDate: "",
      isCurrent: true,
      description: "Guida del design dell'app mobile e della piattaforma merchant.",
      highlights: ["Redesign completo dell'onboarding con +32% di conversione", "Creazione del design system 'Spark' con 60+ componenti"],
    },
    {
      id: "exp-2",
      company: "Moze Agency",
      position: "UX/UI Designer",
      location: "Torino",
      startDate: "2019-01",
      endDate: "2022-03",
      isCurrent: false,
      description: "Progettazione di prodotti digitali per clienti B2B e B2C in ambito fintech e health-tech.",
      highlights: ["Portfolio di 15+ progetti consegnati con NPS medio superiore a 75"],
    },
  ],
  educations: [
    {
      id: "edu-1",
      institution: "IAAD — Istituto d'Arte Applicata e Design",
      degree: "Laurea in Communication Design",
      fieldOfStudy: "Interaction & Service Design",
      location: "Torino",
      startDate: "2015",
      endDate: "2018",
      isCurrent: false,
      grade: "",
      details: "",
    },
  ],
  skillCategories: [
    { id: "cat-1", name: "Design", skills: ["Figma", "Sketch", "Adobe CC", "Framer", "Principle"] },
    { id: "cat-2", name: "Metodologie", skills: ["Design Thinking", "User Research", "A/B Testing", "Atomic Design", "Design Tokens"] },
  ],
  languages: [
    { id: "lang-1", language: "Italiano", proficiency: "Madrelingua" },
    { id: "lang-2", language: "Inglese", proficiency: "Fluente (C1)" },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Spark Design System",
      role: "Design Lead",
      description: "Sistema di design scalabile per prodotti fintech multi-piattaforma.",
      link: "",
      technologies: ["Figma", "Storybook", "React"],
    },
  ],
  certifications: [
    { id: "cert-1", name: "Google UX Design Professional Certificate", issuer: "Google / Coursera", date: "2021" },
  ],
  customSections: [],
  settings: {
    template: "modern",
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
    pdfFileName: "Luca_Rinaldi_CV",
  },
};

// =========================================================================
// DEMO PROFILE 5: Healthcare / Medical
// =========================================================================
export const demoHealthcare: CVData = {
  personalInfo: {
    fullName: "Sara Colombo",
    jobTitle: "Medico Specialista in Cardiologia",
    email: "sara.colombo@ospedale.it",
    phone: "+39 02 9876 5432",
    location: "Bologna, Italia",
    website: "",
    linkedin: "https://linkedin.com/in/saracolombo",
    github: "",
    avatarUrl: defaultAvatarBase64,
  },
  summary: "Cardiologa con 7 anni di esperienza clinica e di ricerca presso centri universitari di eccellenza. Specializzata in cardiologia interventistica e imaging cardiovascolare avanzato.",
  experiences: [
    {
      id: "exp-1",
      company: "Policlinico Sant'Orsola",
      position: "Dirigente Medico — Cardiologia",
      location: "Bologna",
      startDate: "2021-09",
      endDate: "",
      isCurrent: true,
      description: "Attività clinica in emodinamica e cardiologia interventistica.",
      highlights: ["Oltre 300 procedure di cateterismo cardiaco/anno", "Tutor per 4 specializzandi"],
    },
    {
      id: "exp-2",
      company: "Ospedale San Raffaele",
      position: "Medico Specializzando in Cardiologia",
      location: "Milano",
      startDate: "2017-01",
      endDate: "2021-08",
      isCurrent: false,
      description: "Formazione specialistica con rotazioni in emodinamica, elettrofisiologia e imaging.",
      highlights: ["Primo autore di 5 pubblicazioni su riviste peer-reviewed"],
    },
  ],
  educations: [
    {
      id: "edu-1",
      institution: "Università di Bologna",
      degree: "Specializzazione in Malattie dell'Apparato Cardiovascolare",
      fieldOfStudy: "Cardiologia",
      location: "Bologna",
      startDate: "2017",
      endDate: "2021",
      isCurrent: false,
      grade: "Ottimo",
      details: "",
    },
    {
      id: "edu-2",
      institution: "Università degli Studi di Milano",
      degree: "Laurea in Medicina e Chirurgia",
      fieldOfStudy: "",
      location: "Milano",
      startDate: "2010",
      endDate: "2016",
      isCurrent: false,
      grade: "110/110 con Lode",
      details: "",
    },
  ],
  skillCategories: [
    { id: "cat-1", name: "Competenze Cliniche", skills: ["Cateterismo Cardiaco", "Ecocardiografia", "ECG", "Imaging RM Cardiaca"] },
    { id: "cat-2", name: "Ricerca", skills: ["SPSS", "R Statistics", "PubMed", "Revisione Peer-Review"] },
  ],
  languages: [
    { id: "lang-1", language: "Italiano", proficiency: "Madrelingua" },
    { id: "lang-2", language: "Inglese", proficiency: "Fluente (C1)" },
  ],
  projects: [],
  certifications: [
    { id: "cert-1", name: "ACLS — Advanced Cardiovascular Life Support", issuer: "American Heart Association", date: "2023" },
    { id: "cert-2", name: "European Board of Cardiology", issuer: "ESC", date: "2022" },
  ],
  customSections: [],
  settings: {
    template: "executive",
    themePreset: "forest",
    primaryTextColor: "#14231d",
    secondaryTextColor: "#3e564d",
    bodyTextColor: "#283832",
    accentColorHex: "#2d4a3e",
    tagBgColor: "#e8efec",
    tagTextColor: "#172d24",
    paperBgColor: "#ffffff",
    sidebarBgColor: "#192922",
    fontFamily: "inter",
    fontSize: "base",
    spacing: "normal",
    showAvatar: false,
    avatarShape: "circle",
    avatarSize: "md",
    sectionOrder: defaultSectionOrder.filter(s => s.key !== "cust-1" && s.key !== "projects"),
    pdfFileName: "Sara_Colombo_CV",
  },
};

// =========================================================================
// ALL DEMO PROFILES
// =========================================================================
export interface DemoProfile {
  id: string;
  name: string;
  role: string;
  emoji: string;
  data: CVData;
}

export const demoProfiles: DemoProfile[] = [
  { id: "tech", name: "Marco Bianchi", role: "Software Engineer", emoji: "💻", data: demoTech },
  { id: "finance", name: "Elena Moretti", role: "Financial Analyst", emoji: "📊", data: demoFinance },
  { id: "humanities", name: "Giulia Fontana", role: "Giornalista & Content", emoji: "✍️", data: demoHumanities },
  { id: "design", name: "Luca Rinaldi", role: "Product Designer", emoji: "🎨", data: demoDesign },
  { id: "healthcare", name: "Sara Colombo", role: "Cardiologa", emoji: "🩺", data: demoHealthcare },
];
