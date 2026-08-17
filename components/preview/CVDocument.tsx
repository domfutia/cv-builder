/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useCV } from "@/context/CVContext";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { defaultSectionOrder } from "@/data/initialCV";
import { cn } from "@/lib/utils";

function formatUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}

function isDarkColor(hex: string): boolean {
  if (!hex) return true;
  const clean = hex.replace("#", "");
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 140;
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 140;
  }
  return true;
}

export const CVDocument: React.FC<{ className?: string }> = ({ className }) => {
  const { cvData } = useCV();
  const {
    personalInfo,
    summary,
    experiences,
    educations,
    skillCategories,
    languages,
    projects,
    certifications,
    customSections = [],
    settings,
  } = cvData;

  // Granular colors
  const primaryTextColor = settings.primaryTextColor || "#09090b";
  const secondaryTextColor = settings.secondaryTextColor || "#52525b";
  const bodyTextColor = settings.bodyTextColor || "#27272a";
  const accentColor = settings.accentColorHex || "#18181b";
  const tagBgColor = settings.tagBgColor || "#f4f4f5";
  const tagTextColor = settings.tagTextColor || "#18181b";
  const paperBgColor = settings.paperBgColor || "#ffffff";
  const sidebarBgColor = settings.sidebarBgColor || "#18181b";

  // Check luminance for sidebar content contrast
  const isSidebarDark = isDarkColor(sidebarBgColor);
  const sbTextPrimary = isSidebarDark ? "#ffffff" : "#09090b";
  const sbTextSecondary = isSidebarDark ? "#e4e4e7" : "#27272a";
  const sbTextMuted = isSidebarDark ? "#a1a1aa" : "#52525b";
  const sbBorderColor = isSidebarDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.12)";
  const sbTagBg = isSidebarDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.07)";
  const sbTagText = isSidebarDark ? "#ffffff" : "#18181b";

  // Avatar styles with enhanced larger dimensions
  const avatarShapeClasses = {
    circle: "rounded-full",
    rounded: "rounded-2xl",
    square: "rounded-none",
  }[settings.avatarShape || "circle"];

  const avatarSizeClasses = {
    sm: "w-24 h-24",
    md: "w-[120px] h-[120px]",
    lg: "w-[144px] h-[144px]",
  }[settings.avatarSize || "md"];

  // Font size mapping
  const fontSizeClasses = {
    sm: "text-[12px] leading-relaxed",
    base: "text-[13px] leading-relaxed",
    lg: "text-[14px] leading-relaxed",
  }[settings.fontSize || "base"];

  // Spacing mapping
  const spacingClasses = {
    compact: "space-y-3.5",
    normal: "space-y-5",
    relaxed: "space-y-7",
  }[settings.spacing || "normal"];

  const itemSpacingClasses = {
    compact: "space-y-2",
    normal: "space-y-3.5",
    relaxed: "space-y-4.5",
  }[settings.spacing || "normal"];

  const sectionOrder = settings.sectionOrder && settings.sectionOrder.length > 0
    ? settings.sectionOrder
    : defaultSectionOrder;

  // Dynamic Section Labels Helper
  const getSectionTitle = (key: string, defaultTitle: string) => {
    const found = sectionOrder.find((s) => s.key === key);
    return found?.label?.trim() || defaultTitle;
  };

  // Render individual sections dynamically by key
  const renderSectionByKey = (key: string, isSidebar: boolean = false) => {
    // Check if key corresponds to a custom section
    const matchingCustom = customSections.find((c) => c.id === key);
    if (matchingCustom) {
      if (!matchingCustom.items || matchingCustom.items.length === 0) return null;
      const title = getSectionTitle(key, matchingCustom.title);

      if (isSidebar) {
        return (
          <div key={`sec-custom-${matchingCustom.id}-sb`} className="space-y-2.5 break-inside-avoid page-break-inside-avoid">
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
              style={{ color: sbTextPrimary, borderColor: sbBorderColor }}
            >
              {title}
            </h3>
            <div className="space-y-2 text-xs">
              {matchingCustom.items.map((item) => (
                <div key={item.id} className="space-y-0.5">
                  <div className="font-semibold break-words leading-snug" style={{ color: sbTextPrimary }}>
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div className="text-[11px] break-words" style={{ color: sbTextMuted }}>
                      {item.subtitle} {item.date ? `(${item.date})` : ""}
                    </div>
                  )}
                  {item.description && (
                    <p className="text-[11px] leading-snug break-words whitespace-normal" style={{ color: sbTextSecondary }}>
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      return (
        <div key={`sec-custom-${matchingCustom.id}`} className="space-y-3">
          <h2
            className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-black/10"
            style={{ color: accentColor }}
          >
            {title}
          </h2>

          <div className={itemSpacingClasses}>
            {matchingCustom.items.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid page-break-inside-avoid space-y-1"
              >
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <span
                      className="font-bold text-[13.5px] break-words"
                      style={{ color: primaryTextColor }}
                    >
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="font-medium ml-1.5 break-words" style={{ color: secondaryTextColor }}>
                        • {item.subtitle}
                      </span>
                    )}
                  </div>
                  {item.date && (
                    <span className="text-xs font-mono shrink-0 opacity-80" style={{ color: secondaryTextColor }}>
                      {item.date}
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="text-xs leading-normal break-words whitespace-normal" style={{ color: bodyTextColor }}>
                    {item.description}
                  </p>
                )}

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs" style={{ color: bodyTextColor }}>
                    {item.highlights.map((h, i) => (
                      <li key={i} className="leading-snug break-words whitespace-normal">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    switch (key) {
      case "summary":
        if (!summary) return null;
        if (isSidebar) {
          return (
            <div key="sec-summary-sb" className="space-y-2 break-inside-avoid page-break-inside-avoid">
              <h3
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
                style={{ color: sbTextPrimary, borderColor: sbBorderColor }}
              >
                {getSectionTitle("summary", "Profilo")}
              </h3>
              <p className="leading-relaxed font-normal text-xs break-words whitespace-normal" style={{ color: sbTextSecondary }}>
                {summary}
              </p>
            </div>
          );
        }
        return (
          <div key="sec-summary" className="break-inside-avoid page-break-inside-avoid space-y-1.5">
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-black/10"
              style={{ color: accentColor }}
            >
              {getSectionTitle("summary", "Profilo Professionale")}
            </h2>
            <p className="leading-relaxed font-normal text-justify break-words whitespace-normal" style={{ color: bodyTextColor }}>
              {summary}
            </p>
          </div>
        );

      case "experience":
        if (experiences.length === 0) return null;
        return (
          <div key="sec-experience" className="space-y-3">
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-black/10"
              style={{ color: accentColor }}
            >
              {getSectionTitle("experience", "Esperienze Lavorative")}
            </h2>

            <div className={itemSpacingClasses}>
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="break-inside-avoid page-break-inside-avoid space-y-1"
                >
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <span
                        className="font-bold text-[13.5px] break-words"
                        style={{ color: primaryTextColor }}
                      >
                        {exp.position}
                      </span>
                      {exp.company && (
                        <span className="font-medium ml-1.5 break-words" style={{ color: secondaryTextColor }}>
                          • {exp.company}
                        </span>
                      )}
                      {exp.location && (
                        <span className="text-xs ml-1.5 opacity-70 break-words" style={{ color: secondaryTextColor }}>
                          ({exp.location})
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono shrink-0 opacity-80" style={{ color: secondaryTextColor }}>
                      {exp.startDate} — {exp.isCurrent ? "Presente" : exp.endDate || "Presente"}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-xs leading-normal break-words whitespace-normal" style={{ color: bodyTextColor }}>
                      {exp.description}
                    </p>
                  )}

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs" style={{ color: bodyTextColor }}>
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="leading-snug break-words whitespace-normal">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "education":
        if (educations.length === 0) return null;
        return (
          <div key="sec-education" className="space-y-3">
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-black/10"
              style={{ color: accentColor }}
            >
              {getSectionTitle("education", "Formazione & Studi")}
            </h2>

            <div className={itemSpacingClasses}>
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="break-inside-avoid page-break-inside-avoid space-y-0.5"
                >
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <span
                        className="font-bold text-[13.5px] break-words"
                        style={{ color: primaryTextColor }}
                      >
                        {edu.degree}
                      </span>
                      {edu.institution && (
                        <span className="font-medium ml-1.5 break-words" style={{ color: secondaryTextColor }}>
                          • {edu.institution}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono shrink-0 opacity-80" style={{ color: secondaryTextColor }}>
                      {edu.startDate} — {edu.isCurrent ? "In corso" : edu.endDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs flex-wrap" style={{ color: secondaryTextColor }}>
                    {edu.fieldOfStudy && <span className="break-words">{edu.fieldOfStudy}</span>}
                    {edu.grade && (
                      <span className="font-medium" style={{ color: primaryTextColor }}>
                        (Voto: {edu.grade})
                      </span>
                    )}
                    {edu.location && <span className="opacity-70">• {edu.location}</span>}
                  </div>

                  {edu.details && (
                    <p className="text-xs italic mt-0.5 break-words whitespace-normal" style={{ color: bodyTextColor }}>
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "skills":
        if (skillCategories.length === 0) return null;
        if (isSidebar) {
          // Sidebar custom styling with adaptive luminance
          return (
            <div key="sec-skills-sb" className="space-y-3 break-inside-avoid page-break-inside-avoid">
              <h3
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
                style={{ color: sbTextPrimary, borderColor: sbBorderColor }}
              >
                {getSectionTitle("skills", "Competenze")}
              </h3>
              <div className="space-y-3">
                {skillCategories.map((cat) => (
                  <div key={cat.id} className="space-y-1.5">
                    <h4
                      className="text-[11px] font-semibold uppercase tracking-tight break-words"
                      style={{ color: sbTextSecondary }}
                    >
                      {cat.name}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-medium break-words whitespace-normal"
                          style={{
                            backgroundColor: sbTagBg,
                            color: sbTagText,
                            border: `1px solid ${sbBorderColor}`,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return (
          <div key="sec-skills" className="space-y-2 break-inside-avoid page-break-inside-avoid">
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-black/10"
              style={{ color: accentColor }}
            >
              {getSectionTitle("skills", "Competenze & Tecnologie")}
            </h2>

            <div className="grid grid-cols-1 gap-2.5 pt-1">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="text-xs flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="font-semibold shrink-0 sm:w-36 break-words" style={{ color: primaryTextColor }}>
                    {cat.name}:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-medium transition-colors break-words"
                        style={{
                          backgroundColor: tagBgColor,
                          color: tagTextColor,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "languages":
        if (languages.length === 0) return null;
        if (isSidebar) {
          return (
            <div key="sec-languages-sb" className="space-y-2.5 break-inside-avoid page-break-inside-avoid">
              <h3
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
                style={{ color: sbTextPrimary, borderColor: sbBorderColor }}
              >
                {getSectionTitle("languages", "Lingue")}
              </h3>
              <div className="space-y-1.5 text-xs">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between gap-2 flex-wrap">
                    <span className="font-semibold break-words" style={{ color: sbTextPrimary }}>
                      {l.language}
                    </span>
                    <span className="break-words" style={{ color: sbTextMuted }}>
                      {l.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return (
          <div key="sec-languages" className="space-y-1.5 break-inside-avoid page-break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>
              {getSectionTitle("languages", "Lingue")}
            </h3>
            <div className="space-y-1 text-xs" style={{ color: bodyTextColor }}>
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between gap-2 flex-wrap">
                  <span className="font-medium break-words" style={{ color: primaryTextColor }}>{l.language}</span>
                  <span className="opacity-80 break-words" style={{ color: secondaryTextColor }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "certifications":
        if (certifications.length === 0) return null;
        if (isSidebar) {
          return (
            <div key="sec-certifications-sb" className="space-y-2.5 break-inside-avoid page-break-inside-avoid">
              <h3
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
                style={{ color: sbTextPrimary, borderColor: sbBorderColor }}
              >
                {getSectionTitle("certifications", "Certificazioni")}
              </h3>
              <div className="space-y-2 text-xs">
                {certifications.map((c) => (
                  <div key={c.id} className="space-y-0.5">
                    <div className="font-semibold break-words leading-snug" style={{ color: sbTextPrimary }}>
                      {c.name}
                    </div>
                    <div className="text-[11px] break-words" style={{ color: sbTextMuted }}>
                      {c.issuer} {c.date ? `(${c.date})` : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return (
          <div key="sec-certifications" className="space-y-1.5 break-inside-avoid page-break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>
              {getSectionTitle("certifications", "Certificazioni")}
            </h3>
            <div className="space-y-1 text-xs" style={{ color: bodyTextColor }}>
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between gap-2 flex-wrap">
                  <span className="font-medium break-words" style={{ color: primaryTextColor }}>{c.name}</span>
                  <span className="opacity-80 break-words" style={{ color: secondaryTextColor }}>
                    {c.issuer} ({c.date})
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "projects":
        if (projects.length === 0) return null;
        if (isSidebar) {
          return (
            <div key="sec-projects-sb" className="space-y-2.5 break-inside-avoid page-break-inside-avoid">
              <h3
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
                style={{ color: sbTextPrimary, borderColor: sbBorderColor }}
              >
                {getSectionTitle("projects", "Progetti")}
              </h3>
              <div className="space-y-2 text-xs">
                {projects.map((p) => (
                  <div key={p.id} className="space-y-0.5">
                    <div className="font-semibold break-words leading-snug" style={{ color: sbTextPrimary }}>
                      {p.name} {p.role ? `(${p.role})` : ""}
                    </div>
                    {p.description && (
                      <p className="text-[11px] leading-snug break-words whitespace-normal" style={{ color: sbTextSecondary }}>
                        {p.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return (
          <div key="sec-projects" className="space-y-2 break-inside-avoid page-break-inside-avoid">
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-black/10"
              style={{ color: accentColor }}
            >
              {getSectionTitle("projects", "Progetti di Rilievo")}
            </h2>
            <div className="grid grid-cols-1 gap-2.5">
              {projects.map((p) => (
                <div key={p.id} className="text-xs space-y-0.5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-semibold break-words" style={{ color: primaryTextColor }}>
                      {p.name} {p.role ? `(${p.role})` : ""}
                    </span>
                    {p.link && (
                      <a
                        href={formatUrl(p.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono hover:underline inline-flex items-center gap-1 opacity-80 break-all"
                        style={{ color: secondaryTextColor }}
                      >
                        <span>{p.link.replace(/^https?:\/\//, "")}</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>
                    )}
                  </div>
                  {p.description && (
                    <p className="text-xs break-words whitespace-normal" style={{ color: bodyTextColor }}>
                      {p.description}
                    </p>
                  )}
                  {p.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {p.technologies.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-1.5 py-0.5 rounded text-[10px] break-words"
                          style={{ backgroundColor: tagBgColor, color: tagTextColor }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // =========================================================================
  // TEMPLATE 1: Once UI Minimal (Default)
  // =========================================================================
  if (settings.template === "minimal") {
    return (
      <div
        id="cv-print-root"
        className={cn(
          "w-full shadow-2xl transition-all duration-300 font-sans print:shadow-none print:m-0",
          "p-8 sm:p-12 min-h-[297mm] box-border relative print:p-8",
          fontSizeClasses,
          className
        )}
        style={{
          width: "210mm",
          minHeight: "297mm",
          backgroundColor: paperBgColor,
          color: primaryTextColor,
        }}
      >
        <div className={spacingClasses}>
          {/* Header Section */}
          <div className="border-b border-black/10 pb-4 break-inside-avoid">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-1 flex-1 min-w-0">
                <h1
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words"
                  style={{ color: primaryTextColor }}
                >
                  {personalInfo.fullName || "Tuo Nome"}
                </h1>
                <p
                  className="text-sm sm:text-base font-semibold tracking-tight break-words"
                  style={{ color: accentColor }}
                >
                  {personalInfo.jobTitle || "Titolo Professionale"}
                </p>

                {/* Contact Pills with Clickable Links */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-xs" style={{ color: secondaryTextColor }}>
                  {personalInfo.email && (
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="inline-flex items-center gap-1.5 hover:underline transition-colors break-all"
                      style={{ color: secondaryTextColor }}
                      title="Invia email"
                    >
                      <Mail className="w-3.5 h-3.5 opacity-70 shrink-0" />
                      <span>{personalInfo.email}</span>
                    </a>
                  )}
                  {personalInfo.phone && (
                    <a
                      href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-1.5 hover:underline transition-colors"
                      style={{ color: secondaryTextColor }}
                      title="Chiama"
                    >
                      <Phone className="w-3.5 h-3.5 opacity-70 shrink-0" />
                      <span>{personalInfo.phone}</span>
                    </a>
                  )}
                  {personalInfo.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 opacity-70 shrink-0" />
                      <span>{personalInfo.location}</span>
                    </span>
                  )}
                  {personalInfo.website && (
                    <a
                      href={formatUrl(personalInfo.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:underline transition-colors break-all"
                      style={{ color: secondaryTextColor }}
                    >
                      <Globe className="w-3.5 h-3.5 opacity-70 shrink-0" />
                      <span>{personalInfo.website.replace(/^https?:\/\//, "")}</span>
                    </a>
                  )}
                  {personalInfo.linkedin && (
                    <a
                      href={formatUrl(personalInfo.linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:underline transition-colors break-all"
                      style={{ color: secondaryTextColor }}
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 opacity-70 shrink-0" />
                      <span>{personalInfo.linkedin.replace(/^https?:\/\//, "")}</span>
                    </a>
                  )}
                  {personalInfo.github && (
                    <a
                      href={formatUrl(personalInfo.github)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:underline transition-colors break-all"
                      style={{ color: secondaryTextColor }}
                    >
                      <GithubIcon className="w-3.5 h-3.5 opacity-70 shrink-0" />
                      <span>{personalInfo.github.replace(/^https?:\/\//, "")}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Avatar with Shape and Size Controls */}
              {settings.showAvatar && personalInfo.avatarUrl && (
                <div
                  className={cn(
                    "overflow-hidden shrink-0 border border-black/10 bg-black/5 shadow-2xs",
                    avatarSizeClasses,
                    avatarShapeClasses
                  )}
                >
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Reordered Sections */}
          {sectionOrder
            .filter((s) => s.isVisible)
            .map((section) => renderSectionByKey(section.key, false))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 2: Modern Sidebar (Split Vertical Columns by section.column)
  // =========================================================================
  if (settings.template === "modern") {
    const sidebarItems = sectionOrder.filter((s) => s.isVisible && s.column === "sidebar");
    const mainItems = sectionOrder.filter((s) => s.isVisible && s.column !== "sidebar");

    return (
      <div
        id="cv-print-root"
        className={cn(
          "w-full shadow-2xl transition-all duration-300 font-sans print:shadow-none print:m-0",
          "min-h-[297mm] box-border relative flex flex-col md:flex-row print:flex-row",
          fontSizeClasses,
          className
        )}
        style={{
          width: "210mm",
          minHeight: "297mm",
          backgroundColor: paperBgColor,
          color: primaryTextColor,
        }}
      >
        {/* Left Customizable Sidebar with Intelligent Contrast */}
        <div
          className="w-full md:w-[34%] print:w-[34%] p-6 sm:p-7 space-y-6 shrink-0 border-r"
          style={{
            backgroundColor: sidebarBgColor,
            color: sbTextPrimary,
            borderColor: sbBorderColor,
          }}
        >
          {settings.showAvatar && personalInfo.avatarUrl && (
            <div
              className={cn(
                "overflow-hidden mx-auto border-2 shadow-sm",
                avatarSizeClasses,
                avatarShapeClasses
              )}
              style={{ borderColor: sbBorderColor }}
            >
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Contacts Sidebar Section with fluid natural text wrapping */}
          <div className="space-y-3 break-inside-avoid">
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
              style={{ color: sbTextPrimary, borderColor: sbBorderColor }}
            >
              Contatti
            </h3>
            <div className="space-y-2.5 text-xs">
              {personalInfo.email && (
                <div className="flex items-start gap-2.5">
                  <Mail className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: sbTextMuted }} />
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="break-words whitespace-normal hover:underline leading-snug"
                    style={{ color: sbTextSecondary }}
                    title={personalInfo.email}
                  >
                    {personalInfo.email}
                  </a>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-start gap-2.5">
                  <Phone className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: sbTextMuted }} />
                  <a
                    href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                    className="break-words whitespace-normal hover:underline leading-snug"
                    style={{ color: sbTextSecondary }}
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: sbTextMuted }} />
                  <span className="break-words whitespace-normal leading-snug" style={{ color: sbTextSecondary }}>
                    {personalInfo.location}
                  </span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-start gap-2.5">
                  <Globe className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: sbTextMuted }} />
                  <a
                    href={formatUrl(personalInfo.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words whitespace-normal hover:underline leading-snug"
                    style={{ color: sbTextSecondary }}
                  >
                    {personalInfo.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-start gap-2.5">
                  <LinkedinIcon className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: sbTextMuted }} />
                  <a
                    href={formatUrl(personalInfo.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words whitespace-normal hover:underline leading-snug"
                    style={{ color: sbTextSecondary }}
                  >
                    {personalInfo.linkedin.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-start gap-2.5">
                  <GithubIcon className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: sbTextMuted }} />
                  <a
                    href={formatUrl(personalInfo.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words whitespace-normal hover:underline leading-snug"
                    style={{ color: sbTextSecondary }}
                  >
                    {personalInfo.github.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Sidebar Sections */}
          {sidebarItems.map((section) => renderSectionByKey(section.key, true))}
        </div>

        {/* Right Main Column */}
        <div className="w-full md:w-[66%] print:w-[66%] p-6 sm:p-8 space-y-6 min-w-0">
          <div className="border-b border-black/10 pb-4 break-inside-avoid">
            <h1
              className="text-2xl sm:text-3xl font-extrabold tracking-tight break-words"
              style={{ color: primaryTextColor }}
            >
              {personalInfo.fullName || "Tuo Nome"}
            </h1>
            <p
              className="text-sm sm:text-base font-semibold mt-0.5 break-words"
              style={{ color: accentColor }}
            >
              {personalInfo.jobTitle || "Titolo Professionale"}
            </p>
          </div>

          {/* Dynamic Main Column Sections */}
          {mainItems.map((section) => renderSectionByKey(section.key, false))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 3: Executive Clean
  // =========================================================================
  return (
    <div
      id="cv-print-root"
      className={cn(
        "w-full shadow-2xl transition-all duration-300 font-sans print:shadow-none print:m-0",
        "p-8 sm:p-12 min-h-[297mm] box-border relative print:p-8",
        fontSizeClasses,
        className
      )}
      style={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: paperBgColor,
        color: primaryTextColor,
      }}
    >
      <div className={spacingClasses}>
        {/* Centered Top Header */}
        <div
          className="text-center pb-4 border-b-2 break-inside-avoid space-y-1.5"
          style={{ borderColor: accentColor }}
        >
          {settings.showAvatar && personalInfo.avatarUrl && (
            <div
              className={cn(
                "overflow-hidden mx-auto mb-2 border border-black/15 shadow-2xs",
                avatarSizeClasses,
                avatarShapeClasses
              )}
            >
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1
            className="text-3xl font-serif tracking-tight font-bold break-words"
            style={{ color: primaryTextColor }}
          >
            {personalInfo.fullName || "Tuo Nome"}
          </h1>
          <p
            className="text-sm font-semibold uppercase tracking-widest break-words"
            style={{ color: accentColor }}
          >
            {personalInfo.jobTitle || "Titolo Professionale"}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 pt-1 text-xs" style={{ color: secondaryTextColor }}>
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="hover:underline break-all">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <a href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`} className="hover:underline">
                • {personalInfo.phone}
              </a>
            )}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.website && (
              <a
                href={formatUrl(personalInfo.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline break-all"
              >
                • {personalInfo.website.replace(/^https?:\/\//, "")}
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={formatUrl(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline break-all"
              >
                • {personalInfo.linkedin.replace(/^https?:\/\//, "")}
              </a>
            )}
            {personalInfo.github && (
              <a
                href={formatUrl(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline break-all"
              >
                • {personalInfo.github.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>

        {/* Dynamic Reordered Sections */}
        {sectionOrder
          .filter((s) => s.isVisible)
          .map((section) => renderSectionByKey(section.key, false))}
      </div>
    </div>
  );
};
