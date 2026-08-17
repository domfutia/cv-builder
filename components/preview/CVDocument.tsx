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
import { cn } from "@/lib/utils";

// Helper to format URLs safely
function formatUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
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

  // Custom colors
  const primaryTextColor = settings.primaryTextColor || "#0a0a0a";
  const accentColor = settings.accentColorHex || "#171717";

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

  // =========================================================================
  // TEMPLATE 1: Once UI Minimal (Default)
  // =========================================================================
  if (settings.template === "minimal") {
    return (
      <div
        id="cv-print-root"
        className={cn(
          "w-full bg-white shadow-2xl transition-all duration-300 font-sans print:shadow-none print:m-0",
          "p-8 sm:p-12 min-h-[297mm] box-border relative print:p-8",
          fontSizeClasses,
          className
        )}
        style={{
          width: "210mm",
          minHeight: "297mm",
          color: primaryTextColor,
        }}
      >
        <div className={spacingClasses}>
          {/* Header Section */}
          <div className="border-b border-neutral-200/80 pb-4 break-inside-avoid">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-1 flex-1">
                <h1
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                  style={{ color: primaryTextColor }}
                >
                  {personalInfo.fullName || "Tuo Nome"}
                </h1>
                <p
                  className="text-sm sm:text-base font-semibold tracking-tight"
                  style={{ color: accentColor }}
                >
                  {personalInfo.jobTitle || "Titolo Professionale"}
                </p>

                {/* Contact Pills with Clickable Links */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-xs text-neutral-600">
                  {personalInfo.email && (
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="inline-flex items-center gap-1.5 hover:underline text-neutral-700 hover:text-black transition-colors"
                      title="Invia email"
                    >
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      {personalInfo.email}
                    </a>
                  )}
                  {personalInfo.phone && (
                    <a
                      href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-1.5 hover:underline text-neutral-700 hover:text-black transition-colors"
                      title="Chiama"
                    >
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      {personalInfo.phone}
                    </a>
                  )}
                  {personalInfo.location && (
                    <span className="inline-flex items-center gap-1.5 text-neutral-600">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {personalInfo.location}
                    </span>
                  )}
                  {personalInfo.website && (
                    <a
                      href={formatUrl(personalInfo.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:underline text-neutral-700 hover:text-black transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5 text-neutral-400" />
                      {personalInfo.website.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                  {personalInfo.linkedin && (
                    <a
                      href={formatUrl(personalInfo.linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:underline text-neutral-700 hover:text-black transition-colors"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 text-neutral-400" />
                      {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
                    </a>
                  )}
                  {personalInfo.github && (
                    <a
                      href={formatUrl(personalInfo.github)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:underline text-neutral-700 hover:text-black transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-neutral-400" />
                      {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                    </a>
                  )}
                </div>
              </div>

              {/* Optional Avatar */}
              {settings.showAvatar && personalInfo.avatarUrl && (
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-neutral-200 bg-neutral-100">
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {summary && (
            <div className="break-inside-avoid page-break-inside-avoid space-y-1">
              <h2
                className="text-xs font-bold uppercase tracking-widest pb-0.5 border-b border-neutral-100"
                style={{ color: accentColor }}
              >
                Profilo Professionale
              </h2>
              <p className="text-neutral-700 leading-relaxed font-normal text-justify">
                {summary}
              </p>
            </div>
          )}

          {/* Work Experiences */}
          {experiences.length > 0 && (
            <div className="space-y-2.5">
              <h2
                className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-neutral-100"
                style={{ color: accentColor }}
              >
                Esperienza Lavorativa
              </h2>

              <div className={itemSpacingClasses}>
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="break-inside-avoid page-break-inside-avoid space-y-1"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <span
                          className="font-bold text-[13.5px]"
                          style={{ color: primaryTextColor }}
                        >
                          {exp.position}
                        </span>
                        {exp.company && (
                          <span className="text-neutral-600 font-medium ml-1.5">
                            • {exp.company}
                          </span>
                        )}
                        {exp.location && (
                          <span className="text-neutral-400 text-xs ml-1.5">
                            ({exp.location})
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-neutral-500 font-mono shrink-0">
                        {exp.startDate} — {exp.isCurrent ? "Presente" : exp.endDate || "Presente"}
                      </span>
                    </div>

                    {exp.description && (
                      <p className="text-neutral-700 text-xs leading-normal">
                        {exp.description}
                      </p>
                    )}

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-neutral-700">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="leading-snug">
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <div className="space-y-2.5">
              <h2
                className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-neutral-100"
                style={{ color: accentColor }}
              >
                Formazione & Istruzione
              </h2>

              <div className={itemSpacingClasses}>
                {educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="break-inside-avoid page-break-inside-avoid space-y-0.5"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <span
                          className="font-bold text-[13.5px]"
                          style={{ color: primaryTextColor }}
                        >
                          {edu.degree}
                        </span>
                        {edu.institution && (
                          <span className="text-neutral-600 font-medium ml-1.5">
                            • {edu.institution}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-neutral-500 font-mono shrink-0">
                        {edu.startDate} — {edu.isCurrent ? "In corso" : edu.endDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-neutral-600">
                      {edu.fieldOfStudy && <span>{edu.fieldOfStudy}</span>}
                      {edu.grade && (
                        <span className="font-medium text-neutral-800">
                          (Voto: {edu.grade})
                        </span>
                      )}
                      {edu.location && <span className="text-neutral-400">• {edu.location}</span>}
                    </div>

                    {edu.details && (
                      <p className="text-xs text-neutral-600 italic mt-0.5">{edu.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Custom Sections */}
          {customSections.map((cSec) => (
            <div key={cSec.id} className="space-y-2.5">
              <h2
                className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-neutral-100"
                style={{ color: accentColor }}
              >
                {cSec.title}
              </h2>

              <div className={itemSpacingClasses}>
                {cSec.items.map((item) => (
                  <div
                    key={item.id}
                    className="break-inside-avoid page-break-inside-avoid space-y-1"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <span
                          className="font-bold text-[13.5px]"
                          style={{ color: primaryTextColor }}
                        >
                          {item.title}
                        </span>
                        {item.subtitle && (
                          <span className="text-neutral-600 font-medium ml-1.5">
                            • {item.subtitle}
                          </span>
                        )}
                      </div>
                      {item.date && (
                        <span className="text-xs text-neutral-500 font-mono shrink-0">
                          {item.date}
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-neutral-700 text-xs leading-normal">
                        {item.description}
                      </p>
                    )}

                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-neutral-700">
                        {item.highlights.map((h, i) => (
                          <li key={i} className="leading-snug">
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Skills Matrix */}
          {skillCategories.length > 0 && (
            <div className="space-y-2 break-inside-avoid page-break-inside-avoid">
              <h2
                className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-neutral-100"
                style={{ color: accentColor }}
              >
                Competenze & Tecnologie
              </h2>

              <div className="grid grid-cols-1 gap-1.5 pt-0.5">
                {skillCategories.map((cat) => (
                  <div key={cat.id} className="text-xs flex items-baseline gap-2">
                    <span className="font-semibold text-neutral-800 shrink-0 w-36">
                      {cat.name}:
                    </span>
                    <span className="text-neutral-700">
                      {cat.skills.join(" • ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects & Extra */}
          {(projects.length > 0 || languages.length > 0 || certifications.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 break-inside-avoid page-break-inside-avoid pt-1">
              {/* Languages */}
              {languages.length > 0 && (
                <div className="space-y-1">
                  <h3
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: accentColor }}
                  >
                    Lingue
                  </h3>
                  <div className="space-y-1 text-xs text-neutral-700">
                    {languages.map((l) => (
                      <div key={l.id} className="flex justify-between">
                        <span className="font-medium text-neutral-800">{l.language}</span>
                        <span className="text-neutral-500">{l.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {certifications.length > 0 && (
                <div className="space-y-1">
                  <h3
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: accentColor }}
                  >
                    Certificazioni
                  </h3>
                  <div className="space-y-1 text-xs text-neutral-700">
                    {certifications.map((c) => (
                      <div key={c.id} className="flex justify-between">
                        <span className="font-medium text-neutral-800">{c.name}</span>
                        <span className="text-neutral-500">{c.issuer} ({c.date})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Key Projects with Clickable Links */}
          {projects.length > 0 && (
            <div className="space-y-2 break-inside-avoid page-break-inside-avoid">
              <h2
                className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-neutral-100"
                style={{ color: accentColor }}
              >
                Progetti di Rilievo
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {projects.map((p) => (
                  <div key={p.id} className="text-xs space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-900">
                        {p.name} {p.role ? `(${p.role})` : ""}
                      </span>
                      {p.link && (
                        <a
                          href={formatUrl(p.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-500 text-[11px] font-mono hover:underline inline-flex items-center gap-1"
                        >
                          <span>{p.link.replace(/^https?:\/\//, "")}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    {p.description && <p className="text-neutral-600 text-xs">{p.description}</p>}
                    {p.technologies.length > 0 && (
                      <p className="text-[11px] text-neutral-500">
                        Tech: {p.technologies.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 2: Modern Sidebar
  // =========================================================================
  if (settings.template === "modern") {
    return (
      <div
        id="cv-print-root"
        className={cn(
          "w-full bg-white shadow-2xl transition-all duration-300 font-sans print:shadow-none print:m-0",
          "min-h-[297mm] box-border relative flex flex-col md:flex-row print:flex-row",
          fontSizeClasses,
          className
        )}
        style={{
          width: "210mm",
          minHeight: "297mm",
          color: primaryTextColor,
        }}
      >
        {/* Left Sidebar */}
        <div className="w-full md:w-[35%] print:w-[35%] bg-neutral-50 border-r border-neutral-200/80 p-6 sm:p-8 space-y-6 shrink-0">
          {/* Avatar */}
          {settings.showAvatar && personalInfo.avatarUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-neutral-300 shadow-xs">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Contact Details with Clickable Links */}
          <div className="space-y-3 break-inside-avoid">
            <h3
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-neutral-200"
              style={{ color: accentColor }}
            >
              Contatti
            </h3>
            <div className="space-y-2 text-xs text-neutral-700">
              {personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="break-all hover:underline text-neutral-800"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <a
                    href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                    className="hover:underline text-neutral-800"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <a
                    href={formatUrl(personalInfo.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate hover:underline text-neutral-800"
                  >
                    {personalInfo.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <LinkedinIcon className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <a
                    href={formatUrl(personalInfo.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate hover:underline text-neutral-800"
                  >
                    {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
                  </a>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <a
                    href={formatUrl(personalInfo.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate hover:underline text-neutral-800"
                  >
                    {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skillCategories.length > 0 && (
            <div className="space-y-3 break-inside-avoid page-break-inside-avoid">
              <h3
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-neutral-200"
                style={{ color: accentColor }}
              >
                Competenze
              </h3>
              <div className="space-y-3">
                {skillCategories.map((cat) => (
                  <div key={cat.id} className="space-y-1.5">
                    <h4 className="text-[11px] font-semibold text-neutral-700 uppercase tracking-tight">
                      {cat.name}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-neutral-200/70 text-neutral-800 text-[11px] font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="space-y-2 break-inside-avoid page-break-inside-avoid">
              <h3
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-neutral-200"
                style={{ color: accentColor }}
              >
                Lingue
              </h3>
              <div className="space-y-1 text-xs text-neutral-700">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span className="font-medium text-neutral-800">{l.language}</span>
                    <span className="text-neutral-500 text-[11px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="space-y-2 break-inside-avoid page-break-inside-avoid">
              <h3
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-neutral-200"
                style={{ color: accentColor }}
              >
                Certificazioni
              </h3>
              <div className="space-y-2 text-xs text-neutral-700">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <p className="font-medium text-neutral-800">{c.name}</p>
                    <p className="text-[11px] text-neutral-500">{c.issuer} ({c.date})</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Column */}
        <div className="w-full md:w-[65%] print:w-[65%] p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="border-b border-neutral-200 pb-4 break-inside-avoid">
            <h1
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ color: primaryTextColor }}
            >
              {personalInfo.fullName || "Tuo Nome"}
            </h1>
            <p
              className="text-sm sm:text-base font-semibold mt-0.5"
              style={{ color: accentColor }}
            >
              {personalInfo.jobTitle || "Titolo Professionale"}
            </p>
          </div>

          {/* Summary */}
          {summary && (
            <div className="break-inside-avoid page-break-inside-avoid space-y-1.5">
              <h2
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: accentColor }}
              >
                Profilo Professionale
              </h2>
              <p className="text-neutral-700 text-xs leading-relaxed text-justify">
                {summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div className="space-y-3">
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-neutral-200"
                style={{ color: accentColor }}
              >
                Esperienza Lavorativa
              </h2>
              <div className={itemSpacingClasses}>
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="break-inside-avoid page-break-inside-avoid space-y-1"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className="font-bold text-xs"
                        style={{ color: primaryTextColor }}
                      >
                        {exp.position} • {exp.company}
                      </span>
                      <span className="text-[11px] text-neutral-500 font-mono shrink-0">
                        {exp.startDate} — {exp.isCurrent ? "Presente" : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-neutral-700 text-xs leading-snug">{exp.description}</p>
                    )}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-neutral-700">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="leading-snug">{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <div className="space-y-3">
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-neutral-200"
                style={{ color: accentColor }}
              >
                Formazione & Istruzione
              </h2>
              <div className={itemSpacingClasses}>
                {educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="break-inside-avoid page-break-inside-avoid space-y-1"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className="font-bold text-xs"
                        style={{ color: primaryTextColor }}
                      >
                        {edu.degree} • {edu.institution}
                      </span>
                      <span className="text-[11px] text-neutral-500 font-mono shrink-0">
                        {edu.startDate} — {edu.isCurrent ? "In corso" : edu.endDate}
                      </span>
                    </div>
                    {edu.fieldOfStudy && (
                      <p className="text-xs text-neutral-600">
                        {edu.fieldOfStudy} {edu.grade ? `(${edu.grade})` : ""}
                      </p>
                    )}
                    {edu.details && (
                      <p className="text-[11px] text-neutral-500 italic">{edu.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Custom Sections */}
          {customSections.map((cSec) => (
            <div key={cSec.id} className="space-y-3">
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-neutral-200"
                style={{ color: accentColor }}
              >
                {cSec.title}
              </h2>
              <div className={itemSpacingClasses}>
                {cSec.items.map((item) => (
                  <div
                    key={item.id}
                    className="break-inside-avoid page-break-inside-avoid space-y-1"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className="font-bold text-xs"
                        style={{ color: primaryTextColor }}
                      >
                        {item.title} {item.subtitle ? `• ${item.subtitle}` : ""}
                      </span>
                      {item.date && (
                        <span className="text-[11px] text-neutral-500 font-mono shrink-0">
                          {item.date}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-neutral-700 text-xs leading-snug">{item.description}</p>
                    )}
                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-neutral-700">
                        {item.highlights.map((h, i) => (
                          <li key={i} className="leading-snug">{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Key Projects */}
          {projects.length > 0 && (
            <div className="space-y-2 break-inside-avoid page-break-inside-avoid">
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-neutral-200"
                style={{ color: accentColor }}
              >
                Progetti
              </h2>
              <div className="space-y-2">
                {projects.map((p) => (
                  <div key={p.id} className="text-xs space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-900">{p.name}</span>
                      {p.link && (
                        <a
                          href={formatUrl(p.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-neutral-500 font-mono hover:underline"
                        >
                          {p.link.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                    </div>
                    {p.description && <p className="text-neutral-600 text-xs">{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
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
        "w-full bg-white shadow-2xl transition-all duration-300 font-sans print:shadow-none print:m-0",
        "p-8 sm:p-12 min-h-[297mm] box-border relative print:p-8",
        fontSizeClasses,
        className
      )}
      style={{
        width: "210mm",
        minHeight: "297mm",
        color: primaryTextColor,
      }}
    >
      <div className={spacingClasses}>
        {/* Centered Top Header */}
        <div
          className="text-center pb-4 border-b-2 break-inside-avoid space-y-1.5"
          style={{ borderColor: accentColor }}
        >
          <h1
            className="text-3xl font-serif tracking-tight font-bold"
            style={{ color: primaryTextColor }}
          >
            {personalInfo.fullName || "Tuo Nome"}
          </h1>
          <p
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            {personalInfo.jobTitle || "Titolo Professionale"}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 pt-1 text-xs text-neutral-600">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">
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
                className="hover:underline"
              >
                • {personalInfo.website.replace(/^https?:\/\//, "")}
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={formatUrl(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                • {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
              </a>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="break-inside-avoid page-break-inside-avoid space-y-1">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 border-b border-neutral-300"
              style={{ color: accentColor }}
            >
              Profilo Esecutivo
            </h2>
            <p className="text-neutral-700 text-xs leading-relaxed text-justify pt-1">
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="space-y-2.5">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 border-b border-neutral-300"
              style={{ color: accentColor }}
            >
              Esperienze Professionali
            </h2>
            <div className={itemSpacingClasses}>
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="break-inside-avoid page-break-inside-avoid space-y-1"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span
                      className="font-bold text-xs"
                      style={{ color: primaryTextColor }}
                    >
                      {exp.position} — <span className="font-semibold text-neutral-700">{exp.company}</span>
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono shrink-0">
                      {exp.startDate} – {exp.isCurrent ? "Attuale" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-neutral-700 text-xs leading-snug">{exp.description}</p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-neutral-700">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="leading-snug">{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {educations.length > 0 && (
          <div className="space-y-2.5">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 border-b border-neutral-300"
              style={{ color: accentColor }}
            >
              Percorso Accademico
            </h2>
            <div className={itemSpacingClasses}>
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="break-inside-avoid page-break-inside-avoid space-y-1"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span
                      className="font-bold text-xs"
                      style={{ color: primaryTextColor }}
                    >
                      {edu.degree} — <span className="font-semibold text-neutral-700">{edu.institution}</span>
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono shrink-0">
                      {edu.startDate} – {edu.isCurrent ? "In corso" : edu.endDate}
                    </span>
                  </div>
                  {edu.fieldOfStudy && (
                    <p className="text-xs text-neutral-600">
                      {edu.fieldOfStudy} {edu.grade ? `• Voto: ${edu.grade}` : ""}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Custom Sections */}
        {customSections.map((cSec) => (
          <div key={cSec.id} className="space-y-2.5">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 border-b border-neutral-300"
              style={{ color: accentColor }}
            >
              {cSec.title}
            </h2>
            <div className={itemSpacingClasses}>
              {cSec.items.map((item) => (
                <div
                  key={item.id}
                  className="break-inside-avoid page-break-inside-avoid space-y-1"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span
                      className="font-bold text-xs"
                      style={{ color: primaryTextColor }}
                    >
                      {item.title} {item.subtitle ? `— ${item.subtitle}` : ""}
                    </span>
                    {item.date && (
                      <span className="text-[11px] text-neutral-500 font-mono shrink-0">
                        {item.date}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-neutral-700 text-xs leading-snug">{item.description}</p>
                  )}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-neutral-700">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="leading-snug">{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Skills */}
        {skillCategories.length > 0 && (
          <div className="space-y-2 break-inside-avoid page-break-inside-avoid">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 border-b border-neutral-300"
              style={{ color: accentColor }}
            >
              Aree di Competenza
            </h2>
            <div className="grid grid-cols-1 gap-1.5 pt-0.5">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="text-xs flex gap-2">
                  <span className="font-semibold text-neutral-900 w-32 shrink-0">{cat.name}:</span>
                  <span className="text-neutral-700">{cat.skills.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extra info (Languages, Certs) */}
        {(languages.length > 0 || certifications.length > 0) && (
          <div className="grid grid-cols-2 gap-4 break-inside-avoid page-break-inside-avoid pt-1">
            {languages.length > 0 && (
              <div>
                <h3
                  className="text-xs font-bold uppercase tracking-wider pb-0.5 border-b border-neutral-300"
                  style={{ color: accentColor }}
                >
                  Lingue
                </h3>
                <div className="space-y-1 text-xs text-neutral-700 pt-1">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between">
                      <span>{l.language}</span>
                      <span className="text-neutral-500">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h3
                  className="text-xs font-bold uppercase tracking-wider pb-0.5 border-b border-neutral-300"
                  style={{ color: accentColor }}
                >
                  Certificazioni
                </h3>
                <div className="space-y-1 text-xs text-neutral-700 pt-1">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span>{c.name}</span> <span className="text-neutral-500">({c.issuer})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
