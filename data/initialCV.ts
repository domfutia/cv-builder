import { CVData } from "@/types/cv";

export const initialCVData: CVData = {
  personalInfo: {
    fullName: "Alex Vender",
    jobTitle: "Senior Frontend & Design Engineer",
    email: "alex.vender@designsys.io",
    phone: "+39 02 8765 4321",
    location: "Milano, Italia",
    website: "https://vender.design",
    linkedin: "https://linkedin.com/in/alexvender",
    github: "https://github.com/alexvender",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  summary:
    "Product-minded Frontend Engineer con oltre 7 anni di esperienza nella progettazione e sviluppo di Design System scalabili e applicazioni web ad alte prestazioni con React, Next.js e TypeScript. Fortemente orientato all'eccellenza tipografica, micro-interazioni fluide, accessibilità WCAG e architetture modulari.",
  experiences: [
    {
      id: "exp-1",
      company: "Linear Technologies",
      position: "Lead UI/UX & Frontend Engineer",
      location: "Remoto / Milano",
      startDate: "2022-03",
      endDate: "",
      isCurrent: true,
      description:
        "Guida dello sviluppo del core design system e della piattaforma web interattiva utilizzata da oltre 150k utenti attivi mensili.",
      highlights: [
        "Progettazione da zero di una libreria di oltre 40 componenti accessibili con focus su micro-interazioni a 60fps.",
        "Miglioramento del Largest Contentful Paint (LCP) del 42% attraverso code splitting e ottimizzazioni di rendering server-side.",
        "Implementazione di workflow CI/CD automatizzati per la validazione di token di design e regressioni visuali.",
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
        "Sviluppo di dashboard finanziarie complesse e flussi di checkout multi-valuta ad alta conversione.",
      highlights: [
        "Integrazione di flussi di pagamento e webhook in tempo reale con gestione dello stato globale ottimizzata.",
        "Creazione di grafici analitici interattivi con rendering WebGL e D3.js per reportistica in tempo reale.",
        "Mentoring di 4 sviluppatori junior/mid-level sui pattern moderni di React e TypeScript.",
      ],
    },
    {
      id: "exp-3",
      company: "Studio Monocle",
      position: "Creative Technologist & UI Designer",
      location: "Torino, Italia",
      startDate: "2017-06",
      endDate: "2019-08",
      isCurrent: false,
      description:
        "Realizzazione di esperienze web immersive e siti corporate per brand internazionali di moda e architettura.",
      highlights: [
        "Premiato con 2 Awwwards Site of the Day e 1 FWA of the Day per animazioni web creative.",
        "Collaborazione a stretto contatto con art director per trasformare layout Figma in codice pixel-perfect.",
      ],
    },
  ],
  educations: [
    {
      id: "edu-1",
      institution: "Politecnico di Milano",
      degree: "Laurea Magistrale in Digital Design & Interaction",
      fieldOfStudy: "Human-Computer Interaction & Software Engineering",
      location: "Milano",
      startDate: "2015-10",
      endDate: "2017-07",
      isCurrent: false,
      grade: "110/110 con Lode",
      details: "Tesi sulla scalabilità dei sistemi di design modulari applicati ad architetture a micro-frontend.",
    },
    {
      id: "edu-2",
      institution: "Università degli Studi di Torino",
      degree: "Laurea Triennale in Informatica e Comunicazione Digitale",
      fieldOfStudy: "Computer Science",
      location: "Torino",
      startDate: "2012-10",
      endDate: "2015-07",
      isCurrent: false,
      grade: "108/110",
      details: "Focus su algoritmi, strutture dati, grafica computazionale e web standards.",
    },
  ],
  skillCategories: [
    {
      id: "cat-1",
      name: "Frontend & Web Tech",
      skills: ["React 19", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "GraphQL", "HTML5/Canvas", "Web Performance"],
    },
    {
      id: "cat-2",
      name: "UI/UX & Design Systems",
      skills: ["Design Systems", "Figma to Code", "Micro-animations", "WCAG A11y", "Typography & Grid Systems", "Prototyping"],
    },
    {
      id: "cat-3",
      name: "Tools & Testing",
      skills: ["Git / GitHub", "Playwright", "Vitest", "Docker", "Vite", "Turborepo"],
    },
  ],
  languages: [
    { id: "lang-1", language: "Italiano", proficiency: "Madrelingua" },
    { id: "lang-2", language: "Inglese", proficiency: "Fluente (C2 / Professionale)" },
    { id: "lang-3", language: "Francese", proficiency: "Intermedio (B1)" },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Aura Design System",
      role: "Creator & Maintainer",
      description: "Libreria open-source di componenti UI headless con accessibilità completa e token semantici.",
      link: "https://github.com/alexvender/aura-ui",
      technologies: ["React", "TypeScript", "Tailwind", "Radix UI"],
    },
    {
      id: "proj-2",
      name: "TypeScale Studio",
      role: "Lead Developer",
      description: "Strumento visuale per generare scale tipografiche armoniche ed esportarle in CSS/Tailwind config.",
      link: "https://typescale.studio",
      technologies: ["Next.js", "Canvas API", "Web Workers"],
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
    },
    {
      id: "cert-2",
      name: "Interaction Design Specialist",
      issuer: "Nielsen Norman Group",
      date: "2021",
    },
  ],
  customSections: [
    {
      id: "cust-1",
      title: "Pubblicazioni & Speaking",
      items: [
        {
          id: "item-1",
          title: "Building Resilient Design Systems at Scale",
          subtitle: "React Summit Milano",
          date: "2023",
          description: "Keynote sull'adozione di architetture a token semantici per team cross-funzionali.",
          highlights: ["Oltre 800 partecipanti in presenza", "Sessione votata top 3 dell'evento"],
        },
      ],
    },
  ],
  settings: {
    template: "minimal",
    accentColor: "monochrome",
    accentColorHex: "#171717",
    primaryTextColor: "#0a0a0a",
    fontFamily: "inter",
    fontSize: "base",
    spacing: "normal",
    showAvatar: false,
  },
};
