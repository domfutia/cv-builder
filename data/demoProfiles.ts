import { CVData } from "@/types/cv";
import { defaultAvatarBase64 } from "./initialCV";

// =========================================================================
// DEMO PROFILE 1: Tech / Staff Software & Cloud Engineer
// =========================================================================
export const demoTech: CVData = {
  personalInfo: {
    fullName: "Marco Bianchi",
    jobTitle: "Staff Cloud Architect & Engineer",
    email: "marco.bianchi@devcloud.io",
    phone: "+39 333 456 7890",
    location: "Milano, Italia",
    website: "marcobianchi.dev",
    linkedin: "https://linkedin.com/in/marcobianchi-cloud",
    github: "https://github.com/marcobianchi",
    avatarUrl: defaultAvatarBase64,
  },
  summary: "Staff Engineer con 8+ anni di esperienza nella progettazione di architetture distribuite ad alta resilienza, sistemi microservizi e pipeline Kubernetes. Co-organizzatore di community cloud native.",
  experiences: [
    {
      id: "exp-tech-1",
      company: "CloudCore Systems",
      position: "Staff Cloud Engineer",
      location: "Milano / Remoto",
      startDate: "2022-03",
      endDate: "",
      isCurrent: true,
      description: "Supervisione dell'architettura multi-region su AWS e Kubernetes per 350k utenti attivi.",
      highlights: [
        "Riduzione dei costi infrastrutturali del 32% tramite adozione di istanze Spot e auto-scaling.",
        "Implementazione di policy GitOps con ArgoCD e zero-downtime deployment.",
      ],
    },
    {
      id: "exp-tech-2",
      company: "Scalable Data Labs",
      position: "Senior Backend Developer",
      location: "Torino, Italia",
      startDate: "2019-01",
      endDate: "2022-02",
      isCurrent: false,
      description: "Sviluppo di API ad alto throughput in Go e microservizi di streaming con Apache Kafka.",
      highlights: [
        "Gestione di oltre 15.000 richieste al secondo con latenza p99 inferiore a 25ms.",
      ],
    },
  ],
  educations: [
    {
      id: "edu-tech-1",
      institution: "Politecnico di Milano",
      degree: "Laurea Magistrale in Ingegneria Informatica",
      fieldOfStudy: "Cloud Computing & Distributed Systems",
      location: "Milano",
      startDate: "2016",
      endDate: "2018",
      isCurrent: false,
      grade: "110/110 con Lode",
      details: "",
    },
  ],
  skillCategories: [
    { id: "cat-t1", name: "Cloud & Infrastructure", skills: ["AWS", "Kubernetes", "Terraform", "Docker", "ArgoCD", "Prometheus"] },
    { id: "cat-t2", name: "Backend & Systems", skills: ["Go", "Node.js / TypeScript", "Rust (Base)", "PostgreSQL", "Kafka", "Redis"] },
    { id: "cat-t3", name: "Architecture & DevOps", skills: ["Microservices", "Event-Driven", "CI/CD GitOps", "Distributed Tracing"] },
  ],
  languages: [
    { id: "lang-t1", language: "Italiano", proficiency: "Madrelingua" },
    { id: "lang-t2", language: "Inglese", proficiency: "Fluente (C2 / Professionale)" },
    { id: "lang-t3", language: "Tedesco", proficiency: "Intermedio (B1)" },
  ],
  projects: [
    {
      id: "proj-t1",
      name: "KubeWatchdog",
      role: "Creator & Maintainer",
      description: "Tool open-source per il rilevamento di anomalie nei cluster Kubernetes con 1.4k stelle GitHub.",
      link: "https://github.com/marcobianchi/kubewatchdog",
      technologies: ["Go", "Kubernetes API", "Grafana"],
    },
  ],
  certifications: [
    { id: "cert-t1", name: "AWS Solutions Architect Professional", issuer: "Amazon Web Services", date: "2023" },
    { id: "cert-t2", name: "Certified Kubernetes Administrator (CKA)", issuer: "Cloud Native Computing Foundation", date: "2022" },
  ],
  customSections: [
    {
      id: "cust-tech",
      title: "Talks & Open Source Community",
      items: [
        {
          id: "item-t1",
          title: "Speaker a KubeCon Europe",
          subtitle: "Sessione: Multi-Cluster Orchestration Patterns",
          date: "2023",
          description: "Presentazione tecnica su pattern avanzati di resilienza cluster per 1200 partecipanti.",
        },
      ],
    },
  ],
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
    sectionOrder: [
      { id: "sec-sum", key: "summary", label: "Profilo Tecnico & Leadership", isVisible: true, column: "main" },
      { id: "sec-exp", key: "experience", label: "Esperienze di Ingegneria", isVisible: true, column: "main" },
      { id: "sec-edu", key: "education", label: "Formazione Accademica", isVisible: true, column: "main" },
      { id: "sec-sk", key: "skills", label: "Tech Stack & Competenze", isVisible: true, column: "main" },
      { id: "sec-pr", key: "projects", label: "Sistemi & Progetti Open-Source", isVisible: true, column: "main" },
      { id: "sec-c-tech", key: "cust-tech", label: "Talks & Community", isVisible: true, column: "main" },
      { id: "sec-cr", key: "certifications", label: "Certificazioni", isVisible: true, column: "main" },
      { id: "sec-ln", key: "languages", label: "Lingue", isVisible: true, column: "main" },
    ],
    pdfFileName: "Marco_Bianchi_Staff_Engineer_CV",
  },
};

// =========================================================================
// DEMO PROFILE 2: Finance / M&A & Private Equity Analyst
// =========================================================================
export const demoFinance: CVData = {
  personalInfo: {
    fullName: "Elena Moretti",
    jobTitle: "Senior M&A & Corporate Finance Associate",
    email: "elena.moretti@ib-advisory.com",
    phone: "+39 02 8901 2345",
    location: "Milano, Italia",
    website: "",
    linkedin: "https://linkedin.com/in/elenamoretti-finance",
    github: "",
    avatarUrl: defaultAvatarBase64,
  },
  summary: "Associate di Corporate Finance e M&A con 6+ anni di esperienza in due diligence economico-finanziaria, valutazioni d'azienda (DCF, LBO, Multipli) ed esecuzione di operazioni cross-border nel settore Energy & Tech.",
  experiences: [
    {
      id: "exp-fin-1",
      company: "Rothschild & Co",
      position: "M&A Senior Associate",
      location: "Milano",
      startDate: "2021-09",
      endDate: "",
      isCurrent: true,
      description: "Guida dell'analisi quantitativa e predisposizione di Information Memorandum e modelli LBO.",
      highlights: [
        "Esecuzione di 5 transazioni M&A completate per un valore controvalore complessivo di €620M.",
        "Coordinamento diretto di 3 analisti junior nei processi di vendor due diligence.",
      ],
    },
    {
      id: "exp-fin-2",
      company: "Deloitte Financial Advisory",
      position: "M&A Analyst",
      location: "Milano",
      startDate: "2018-10",
      endDate: "2021-08",
      isCurrent: false,
      description: "Valutazione d'azienda per clienti corporate e fondi di Private Equity in Italia e Francia.",
      highlights: [
        "Sviluppo di modelli previsionali economico-patrimoniali a 5 anni per oltre 20 target industriali.",
      ],
    },
  ],
  educations: [
    {
      id: "edu-fin-1",
      institution: "Università Commerciale Luigi Bocconi",
      degree: "Laurea Magistrale in Finanza (Corporate Finance)",
      fieldOfStudy: "Investment Banking & Corporate Valuation",
      location: "Milano",
      startDate: "2016",
      endDate: "2018",
      isCurrent: false,
      grade: "110/110 con Lode",
      details: "Exchange semester presso HEC Paris in International Corporate Finance.",
    },
  ],
  skillCategories: [
    { id: "cat-f1", name: "Modellazione & Valutazione", skills: ["Modelli DCF & LBO", "Valutazione Multipli", "Sensitivity Analysis", "M&A Advisory"] },
    { id: "cat-f2", name: "Piattaforme & Strumenti", skills: ["Bloomberg Terminal", "FactSet", "CapIQ", "Excel Avanzato (VBA)", "Python per Finanza"] },
  ],
  languages: [
    { id: "lang-f1", language: "Italiano", proficiency: "Madrelingua" },
    { id: "lang-f2", language: "Inglese", proficiency: "Bilingue (C2 - TOEFL 116)" },
    { id: "lang-f3", language: "Francese", proficiency: "Fluente (C1 - DALF)" },
  ],
  projects: [],
  certifications: [
    { id: "cert-f1", name: "CFA Charterholder (Level III Passed)", issuer: "CFA Institute", date: "2023" },
    { id: "cert-f2", name: "Financial Risk Manager (FRM)", issuer: "GARP", date: "2021" },
  ],
  customSections: [
    {
      id: "cust-deals",
      title: "Transazioni & Deal Rilevanti",
      items: [
        {
          id: "item-d1",
          title: "Buy-side Advisory — GreenTech Group (€240M)",
          subtitle: "Acquisizione strategica di operatore solare in Iberia",
          date: "2023",
          description: "Responsabile del modello LBO integrato, review della SPA e supporto alle negoziazioni bancarie.",
        },
      ],
    },
  ],
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
    avatarShape: "square",
    avatarSize: "sm",
    sectionOrder: [
      { id: "sec-sum", key: "summary", label: "Executive Summary", isVisible: true, column: "main" },
      { id: "sec-exp", key: "experience", label: "Esperienza Professionale & M&A", isVisible: true, column: "main" },
      { id: "sec-c-deals", key: "cust-deals", label: "Transazioni & Deals Rilevanti", isVisible: true, column: "main" },
      { id: "sec-edu", key: "education", label: "Formazione Accademica", isVisible: true, column: "main" },
      { id: "sec-sk", key: "skills", label: "Competenze Finanziarie & Tools", isVisible: true, column: "main" },
      { id: "sec-cr", key: "certifications", label: "Qualifiche Professionali", isVisible: true, column: "main" },
      { id: "sec-ln", key: "languages", label: "Competenze Linguistiche", isVisible: true, column: "main" },
    ],
    pdfFileName: "Elena_Moretti_MA_Associate_CV",
  },
};

// =========================================================================
// DEMO PROFILE 3: Humanities / Curatrice Museale, Critica d'Arte & Editoria
// =========================================================================
export const demoHumanities: CVData = {
  personalInfo: {
    fullName: "Dott.ssa Giulia Fontana",
    jobTitle: "Curatrice d'Arte Contemporanea & Editor",
    email: "giulia.fontana@fondazionearte.it",
    phone: "+39 345 678 1234",
    location: "Firenze, Italia",
    website: "giuliafontana.curatorial.it",
    linkedin: "https://linkedin.com/in/giuliafontana-curator",
    github: "",
    avatarUrl: defaultAvatarBase64,
  },
  summary: "Curatrice d'arte contemporanea e saggista con 7+ anni di esperienza nell'ideazione di progetti espositivi istituzionali, catalogazione scientifica e direzione editoriale di cataloghi d'arte bilingui.",
  experiences: [
    {
      id: "exp-hum-1",
      company: "Fondazione Palazzo Strozzi",
      position: "Curatrice Associata & Coordinatrice Mostre",
      location: "Firenze",
      startDate: "2021-04",
      endDate: "",
      isCurrent: true,
      description: "Co-curatela delle grandi retrospettive internazionali e coordinamento dei comitati scientifici.",
      highlights: [
        "Curatela della mostra 'Trame dello Spazio' (oltre 110.000 visitatori e catalogo edito da Marsilio).",
        "Gestione delle relazioni con musei internazionali (Centre Pompidou, Tate Modern).",
      ],
    },
    {
      id: "exp-hum-2",
      company: "Rivista Flash Art International",
      position: "Redattrice & Critica d'Arte",
      location: "Milano / Firenze",
      startDate: "2018-02",
      endDate: "2021-03",
      isCurrent: false,
      description: "Scrittura di saggi critici, interviste monografiche a maestri internazionali e recensioni di biennali.",
      highlights: [
        "Pubblicazione di oltre 40 saggi critici su rassegne internazionali (Venezia, Kassel, Basilea).",
      ],
    },
  ],
  educations: [
    {
      id: "edu-hum-1",
      institution: "Università degli Studi di Firenze",
      degree: "Dottorato di Ricerca (Ph.D.) in Storia delle Arti Visive",
      fieldOfStudy: "Estetica e Pratiche Curatoriali Contemporanee",
      location: "Firenze",
      startDate: "2015",
      endDate: "2018",
      isCurrent: false,
      grade: "Eccellente con Menzione d'Onore",
      details: "Tesi pubblicata sulla spazialità nell'arte povera e concettuale.",
    },
  ],
  skillCategories: [
    { id: "cat-h1", name: "Ambiti Curatoriali & Museali", skills: ["Progettazione Espositiva", "Catalogazione Scientifica", "Relazioni con Artisti & Gallerie", "Allestimento Museale"] },
    { id: "cat-h2", name: "Editoria & Scrittura", skills: ["Redazione Cataloghi Bilingui", "Saggistica Critica", "InDesign & Proofreading", "Conferenze Accademiche"] },
  ],
  languages: [
    { id: "lang-h1", language: "Italiano", proficiency: "Madrelingua" },
    { id: "lang-h2", language: "Francese", proficiency: "C2 Fluente (Certificato Sorbonne)" },
    { id: "lang-h3", language: "Inglese", proficiency: "C1 Accademico & Professionale" },
    { id: "lang-h4", language: "Spagnolo", proficiency: "B2 Lavorativo" },
  ],
  projects: [],
  certifications: [
    { id: "cert-h1", name: "Abilitazione Nazionale Guida & Storico dell'Arte", issuer: "Ministero della Cultura (MiC)", date: "2019" },
  ],
  customSections: [
    {
      id: "cust-pubs",
      title: "Monografie & Pubblicazioni Scelte",
      items: [
        {
          id: "item-p1",
          title: "L'Estetica dello Spazio e della Materia (Monografia)",
          subtitle: "Edizioni Marsilio Arte, Venezia — 280 pag.",
          date: "2022",
          description: "Volume adottato in corsi universitari di Storia dell'Arte Contemporanea.",
        },
      ],
    },
  ],
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
    sectionOrder: [
      { id: "sec-sum", key: "summary", label: "Dichiarazione Curatoriale", isVisible: true, column: "main" },
      { id: "sec-exp", key: "experience", label: "Incarichi Curatoriali & Istituzionali", isVisible: true, column: "main" },
      { id: "sec-c-pubs", key: "cust-pubs", label: "Monografie & Pubblicazioni Scelte", isVisible: true, column: "main" },
      { id: "sec-edu", key: "education", label: "Studi Umanistici & Dottorato", isVisible: true, column: "main" },
      { id: "sec-sk", key: "skills", label: "Ambiti di Ricerca & Discipline", isVisible: true, column: "main" },
      { id: "sec-cr", key: "certifications", label: "Accreditamenti", isVisible: true, column: "main" },
      { id: "sec-ln", key: "languages", label: "Competenze Linguistiche", isVisible: true, column: "main" },
    ],
    pdfFileName: "Dott_ssa_Giulia_Fontana_Curatorial_CV",
  },
};

// =========================================================================
// DEMO PROFILE 4: Design / Lead Product Designer & Creative Director
// =========================================================================
export const demoDesign: CVData = {
  personalInfo: {
    fullName: "Luca Rinaldi",
    jobTitle: "Lead Product Designer & UX Director",
    email: "luca@rinaldi.design",
    phone: "+39 348 222 3344",
    location: "Torino, Italia",
    website: "rinaldi.design",
    linkedin: "https://linkedin.com/in/lucarinaldi-ux",
    github: "",
    avatarUrl: defaultAvatarBase64,
  },
  summary: "Design leader con 7+ anni di esperienza nell'evoluzione di prodotti digitali fintech e B2B. Specializzato in architettura dei Design System, User Research quantitativa e micro-interazioni.",
  experiences: [
    {
      id: "exp-des-1",
      company: "Satispay",
      position: "Lead Product Designer",
      location: "Milano",
      startDate: "2021-11",
      endDate: "",
      isCurrent: true,
      description: "Guida strategica del design team per le nuove funzionalità di pagamento in-app e onboarding.",
      highlights: [
        "Aumento del conversion rate di attivazione del 28% grazie al redesign user-centered dei flussi KYC.",
        "Creazione della libreria 'Prisma DS' utilizzata da 12 team cross-funzionali.",
      ],
    },
    {
      id: "exp-des-2",
      company: "Moze Digital Studio",
      position: "Senior UI/UX Designer",
      location: "Torino",
      startDate: "2018-03",
      endDate: "2021-10",
      isCurrent: false,
      description: "Design di applicazioni web e mobile per startup ad alta crescita in Europa e USA.",
      highlights: [
        "Consegna di oltre 15 prodotti digitali da 0 a 1 con metodologie Agile e Design Sprint.",
      ],
    },
  ],
  educations: [
    {
      id: "edu-des-1",
      institution: "IAAD — Istituto d'Arte Applicata e Design",
      degree: "Laurea in Communication & Interaction Design",
      fieldOfStudy: "Human-Centered Design & Digital Ergonomics",
      location: "Torino",
      startDate: "2014",
      endDate: "2017",
      isCurrent: false,
      grade: "110/110 con Lode",
      details: "",
    },
  ],
  skillCategories: [
    { id: "cat-d1", name: "Design & Prototyping", skills: ["Figma (Variables & Auto-layout)", "Framer", "Design Tokens", "Protopie", "Adobe CC"] },
    { id: "cat-d2", name: "UX Research & Metodi", skills: ["Usability Testing", "A/B Testing", "Information Architecture", "Design Sprints", "WCAG AA"] },
  ],
  languages: [
    { id: "lang-d1", language: "Italiano", proficiency: "Madrelingua" },
    { id: "lang-d2", language: "Inglese", proficiency: "Fluente (C1)" },
    { id: "lang-d3", language: "Portoghese", proficiency: "Elementare (A2)" },
  ],
  projects: [
    {
      id: "proj-des-1",
      name: "Prisma Design System",
      role: "Creator & Design Lead",
      description: "Design system scalabile open token per prodotti fintech multi-piattaforma.",
      link: "https://rinaldi.design/prisma",
      technologies: ["Figma", "Design Tokens", "Storybook"],
    },
  ],
  certifications: [
    { id: "cert-des-1", name: "Google UX Design Professional Certificate", issuer: "Google", date: "2021" },
    { id: "cert-des-2", name: "Design Leadership Masterclass", issuer: "Nielsen Norman Group", date: "2023" },
  ],
  customSections: [
    {
      id: "cust-awards",
      title: "Premi & Riconoscimenti",
      items: [
        {
          id: "item-aw1",
          title: "Red Dot Award: Best of the Best 2023",
          subtitle: "Categoria: Financial Apps & Interface Design",
          date: "2023",
          description: "Premio internazionale assegnato per l'eccellenza dell'esperienza utente.",
        },
      ],
    },
  ],
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
    avatarShape: "rounded",
    avatarSize: "md",
    sectionOrder: [
      { id: "sec-sum", key: "summary", label: "Bio & Design Philosophy", isVisible: true, column: "main" },
      { id: "sec-exp", key: "experience", label: "Esperienze di Design & Leadership", isVisible: true, column: "main" },
      { id: "sec-pr", key: "projects", label: "Case Studies & Design Systems", isVisible: true, column: "main" },
      { id: "sec-edu", key: "education", label: "Studi & Percorso Universitario", isVisible: true, column: "main" },
      { id: "sec-sk", key: "skills", label: "Design Toolkit & Metodi", isVisible: true, column: "sidebar" },
      { id: "sec-c-aw", key: "cust-awards", label: "Premi & Honors", isVisible: true, column: "sidebar" },
      { id: "sec-cr", key: "certifications", label: "Certificazioni", isVisible: true, column: "sidebar" },
      { id: "sec-ln", key: "languages", label: "Lingue", isVisible: true, column: "sidebar" },
    ],
    pdfFileName: "Luca_Rinaldi_Lead_Designer_CV",
  },
};

// =========================================================================
// DEMO PROFILE 5: Healthcare / Medico Chirurgo & Cardiologa
// =========================================================================
export const demoHealthcare: CVData = {
  personalInfo: {
    fullName: "Dott.ssa Sara Colombo",
    jobTitle: "Dirigente Medico — Cardiologia & Emodinamica",
    email: "sara.colombo@policlinico.med.it",
    phone: "+39 051 636 1234",
    location: "Bologna, Italia",
    website: "",
    linkedin: "https://linkedin.com/in/dott-saracolombo",
    github: "",
    avatarUrl: defaultAvatarBase64,
  },
  summary: "Dirigente Medico specialista in Malattie dell'Apparato Cardiovascolare con solida esperienza in emodinamica interventistica coronarica, ecocardiografia avanzata e conduzione di trial clinici internazionali.",
  experiences: [
    {
      id: "exp-med-1",
      company: "IRCCS Policlinico Sant'Orsola-Malpighi",
      position: "Dirigente Medico — U.O. Cardiologia",
      location: "Bologna",
      startDate: "2021-10",
      endDate: "",
      isCurrent: true,
      description: "Attività interventistica di sala emodinamica e gestione del reparto di Terapia Intensiva Coronarica (UTIC).",
      highlights: [
        "Esecuzione in prima persona di oltre 320 coronarografie e angioplastiche (PCI) all'anno.",
        "Tutor clinico per medici in formazione specialistica e studenti di Medicina.",
      ],
    },
    {
      id: "exp-med-2",
      company: "IRCCS Ospedale San Raffaele",
      position: "Medico in Formazione Specialistica",
      location: "Milano",
      startDate: "2017-11",
      endDate: "2021-09",
      isCurrent: false,
      description: "Rotazioni formative in Emodinamica, Elettrofisiologia, Imaging RM Cardiaca e Ambulatorio Scompenso.",
      highlights: [
        "Partecipazione attiva a 4 trial clinici multicentrici europei (ESC Guidelines).",
      ],
    },
  ],
  educations: [
    {
      id: "edu-med-1",
      institution: "Alma Mater Studiorum — Università di Bologna",
      degree: "Specializzazione in Malattie dell'Apparato Cardiovascolare",
      fieldOfStudy: "Cardiologia Clinica & Interventistica",
      location: "Bologna",
      startDate: "2017",
      endDate: "2021",
      isCurrent: false,
      grade: "50/50 con Lode",
      details: "",
    },
    {
      id: "edu-med-2",
      institution: "Università degli Studi di Milano",
      degree: "Laurea Magistrale a Ciclo Unico in Medicina e Chirurgia",
      fieldOfStudy: "Medicina e Chirurgia",
      location: "Milano",
      startDate: "2010",
      endDate: "2016",
      isCurrent: false,
      grade: "110/110 con Lode",
      details: "Abilitazione all'Esercizio della Professione Medica (Iscrizione Ordine FNOMCeO).",
    },
  ],
  skillCategories: [
    { id: "cat-m1", name: "Competenze Cliniche & Interventistiche", skills: ["Emodinamica & PCI", "Ecocardiografia Transtoracica/Transesofagea", "Gestione UTIC", "Cardioversione"] },
    { id: "cat-m2", name: "Metodologia & Ricerca", skills: ["Trial Clinici GCP", "Statistica Medica (SPSS/R)", "Revisione Peer-Review", "Linee Guida ESC/AHA"] },
  ],
  languages: [
    { id: "lang-m1", language: "Italiano", proficiency: "Madrelingua" },
    { id: "lang-m2", language: "Inglese", proficiency: "Fluente Medico-Scientifico (C1)" },
    { id: "lang-m3", language: "Tedesco", proficiency: "Intermedio (B2 Medizinisches Deutsch)" },
  ],
  projects: [],
  certifications: [
    { id: "cert-m1", name: "European Board of Cardiology (EBC)", issuer: "European Society of Cardiology (ESC)", date: "2022" },
    { id: "cert-m2", name: "Advanced Cardiovascular Life Support (ACLS Provider)", issuer: "American Heart Association (AHA)", date: "2023" },
  ],
  customSections: [
    {
      id: "cust-trials",
      title: "Attività Scientifica & Trial Clinici",
      items: [
        {
          id: "item-tr1",
          title: "Co-Investigatore nello Studio Europeo EU-SHOCK Trial",
          subtitle: "European Heart Journal (IF 39.3) — Co-Autore",
          date: "2023",
          description: "Studio prospettico multicentrico sull'ottimizzazione del supporto meccanico nello shock cardiogeno.",
        },
      ],
    },
  ],
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
    fontFamily: "serif",
    fontSize: "base",
    spacing: "normal",
    showAvatar: false,
    avatarShape: "circle",
    avatarSize: "sm",
    sectionOrder: [
      { id: "sec-sum", key: "summary", label: "Profilo Clinico & Accademico", isVisible: true, column: "main" },
      { id: "sec-exp", key: "experience", label: "Attività Clinica & Ospedaliera", isVisible: true, column: "main" },
      { id: "sec-c-trials", key: "cust-trials", label: "Trial Clinici & Pubblicazioni", isVisible: true, column: "main" },
      { id: "sec-edu", key: "education", label: "Formazione Medica & Specializzazione", isVisible: true, column: "main" },
      { id: "sec-sk", key: "skills", label: "Competenze Cliniche & Ricerca", isVisible: true, column: "main" },
      { id: "sec-cr", key: "certifications", label: "Accreditamenti & Board", isVisible: true, column: "main" },
      { id: "sec-ln", key: "languages", label: "Lingue di Lavoro", isVisible: true, column: "main" },
    ],
    pdfFileName: "Dott_ssa_Sara_Colombo_Cardiologia_CV",
  },
};

// =========================================================================
// DEMO PROFILES CATALOG
// =========================================================================
export interface DemoProfile {
  id: string;
  name: string;
  role: string;
  emoji: string;
  tagline: string;
  data: CVData;
}

export const demoProfiles: DemoProfile[] = [
  {
    id: "tech",
    name: "Marco Bianchi",
    role: "Staff Cloud Engineer",
    emoji: "💻",
    tagline: "Minimal Monocromatico • Cloud & DevOps • Progetti Open Source",
    data: demoTech,
  },
  {
    id: "finance",
    name: "Elena Moretti",
    role: "M&A & Private Equity Associate",
    emoji: "📊",
    tagline: "Executive Warm • No-Photo Style • Deals M&A & Modellazione DCF",
    data: demoFinance,
  },
  {
    id: "humanities",
    name: "Dott.ssa Giulia Fontana",
    role: "Curatrice d'Arte & Editor",
    emoji: "✍️",
    tagline: "Nordic Slate • Monografie & Pubblicazioni • 4 Lingue",
    data: demoHumanities,
  },
  {
    id: "design",
    name: "Luca Rinaldi",
    role: "Lead Product Designer",
    emoji: "🎨",
    tagline: "Modern Sidebar 2 Colonne • Design System • Premi Red Dot",
    data: demoDesign,
  },
  {
    id: "healthcare",
    name: "Dott.ssa Sara Colombo",
    role: "Dirigente Medico Cardiologa",
    emoji: "🩺",
    tagline: "Forest Professional • Serif • Trial Clinici & Emodinamica",
    data: demoHealthcare,
  },
];
