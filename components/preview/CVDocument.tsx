/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState, useEffect } from "react";
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

export const CVDocument: React.FC<{
  className?: string;
  onScaleChange?: (scale: number) => void;
}> = ({ className, onScaleChange }) => {
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

  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainColRef = useRef<HTMLDivElement>(null);
  const innerStackRef = useRef<HTMLDivElement>(null);

  const [autoFitScale, setAutoFitScale] = useState<number>(1);
  const scaleRef = useRef<number>(1);
  const onScaleChangeRef = useRef(onScaleChange);

  useEffect(() => {
    onScaleChangeRef.current = onScaleChange;
  }, [onScaleChange]);

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

  // Base font size multipliers from user selection
  const baseFontSizePx = {
    sm: 11,
    base: 12.2,
    lg: 13.5,
  }[settings.fontSize || "base"];

  // Base spacing multipliers from user selection
  const baseSectionGapPx = {
    compact: 10,
    normal: 14,
    relaxed: 20,
  }[settings.spacing || "normal"];

  const baseItemGapPx = {
    compact: 5,
    normal: 8,
    relaxed: 12,
  }[settings.spacing || "normal"];

  const basePagePadPx = {
    compact: 24,
    normal: 32,
    relaxed: 40,
  }[settings.spacing || "normal"];

  const baseAvatarSizePx = {
    sm: 80,
    md: 96,
    lg: 112,
  }[settings.avatarSize || "md"];

  // Avatar shape classes
  const avatarShapeClasses = {
    circle: "rounded-full",
    rounded: "rounded-2xl",
    square: "rounded-none",
  }[settings.avatarShape || "circle"];

  const sectionOrder = settings.sectionOrder && settings.sectionOrder.length > 0
    ? settings.sectionOrder
    : defaultSectionOrder;

  // =========================================================================
  // CONTINUOUS DUAL-STAGE SINGLE-PAGE A4 AUTO-FIT ENGINE (Safe from loops)
  // =========================================================================
  useEffect(() => {
    const calculateAutoFit = () => {
      if (!rootRef.current) return;

      const A4_TARGET_HEIGHT_PX = 1122.5; // Standard 297mm height at 96 DPI
      const targetHeight = rootRef.current.clientHeight || A4_TARGET_HEIGHT_PX;

      let measuredHeight = 0;

      if (settings.template === "modern") {
        const sbHeight = sidebarRef.current ? sidebarRef.current.scrollHeight : 0;
        const mainHeight = mainColRef.current ? mainColRef.current.scrollHeight : 0;
        measuredHeight = Math.max(sbHeight, mainHeight);
      } else {
        measuredHeight = innerStackRef.current
          ? innerStackRef.current.scrollHeight
          : contentRef.current
          ? contentRef.current.scrollHeight
          : 0;
      }

      if (measuredHeight > 0) {
        let targetScale = 1.0;
        if (measuredHeight > targetHeight - 4) {
          targetScale = Math.min(1.0, Math.max(0.3, (targetHeight - 8) / measuredHeight));
        }

        const cleanScale = Number(targetScale.toFixed(3));
        if (Math.abs(cleanScale - scaleRef.current) >= 0.01) {
          scaleRef.current = cleanScale;
          setAutoFitScale(cleanScale);
          if (onScaleChangeRef.current) {
            onScaleChangeRef.current(cleanScale);
          }
        }
      }
    };

    calculateAutoFit();
    const timer1 = setTimeout(calculateAutoFit, 50);
    const timer2 = setTimeout(calculateAutoFit, 200);

    const observer = new ResizeObserver(() => {
      calculateAutoFit();
    });

    if (contentRef.current) observer.observe(contentRef.current);
    if (sidebarRef.current) observer.observe(sidebarRef.current);
    if (mainColRef.current) observer.observe(mainColRef.current);
    if (innerStackRef.current) observer.observe(innerStackRef.current);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      observer.disconnect();
    };
  }, [cvData, settings]);

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
          <div key={`sec-custom-${matchingCustom.id}-sb`} className="space-y-[calc(6px*var(--cv-scale,1))] break-inside-avoid page-break-inside-avoid">
            <h3
              className="font-bold uppercase tracking-wider pb-[calc(2px*var(--cv-scale,1))] border-b text-[calc(11px*var(--cv-scale,1))]"
              style={{ color: sbTextPrimary, borderColor: sbBorderColor }}
            >
              {title}
            </h3>
            <div className="space-y-[calc(4px*var(--cv-scale,1))] text-[calc(10.5px*var(--cv-scale,1))]">
              {matchingCustom.items.map((item) => (
                <div key={item.id} className="space-y-[calc(1px*var(--cv-scale,1))]">
                  <div className="font-semibold break-words leading-snug" style={{ color: sbTextPrimary }}>
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div className="text-[calc(9.5px*var(--cv-scale,1))] break-words" style={{ color: sbTextMuted }}>
                      {item.subtitle} {item.date ? `(${item.date})` : ""}
                    </div>
                  )}
                  {item.description && (
                    <p className="text-[calc(9.5px*var(--cv-scale,1))] leading-snug break-words whitespace-normal" style={{ color: sbTextSecondary }}>
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
        <div key={`sec-custom-${matchingCustom.id}`} className="space-y-[calc(var(--cv-item-gap,8px)*var(--cv-scale,1))] break-inside-avoid page-break-inside-avoid">
          <h2
            className="font-bold uppercase tracking-widest pb-[calc(2px*var(--cv-scale,1))] border-b border-black/10 text-[calc(11px*var(--cv-scale,1))]"
            style={{ color: accentColor }}
          >
            {title}
          </h2>

          <div className="space-y-[calc(var(--cv-item-gap,8px)*var(--cv-scale,1))]">
            {matchingCustom.items.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid page-break-inside-avoid space-y-[calc(2px*var(--cv-scale,1))]"
              >
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <span
                      className="font-bold break-words text-[calc(var(--cv-font-base,12px)*1.05*var(--cv-scale,1))]"
                      style={{ color: primaryTextColor }}
                    >
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="font-medium ml-1.5 break-words text-[calc(var(--cv-font-base,12px)*0.95*var(--cv-scale,1))]" style={{ color: secondaryTextColor }}>
                        • {item.subtitle}
                      </span>
                    )}
                  </div>
                  {item.date && (
                    <span className="font-mono shrink-0 opacity-80 text-[calc(var(--cv-font-base,12px)*0.9*var(--cv-scale,1))]" style={{ color: secondaryTextColor }}>
                      {item.date}
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="leading-normal break-words whitespace-normal text-[calc(var(--cv-font-base,12px)*0.95*var(--cv-scale,1))]" style={{ color: bodyTextColor }}>
                    {item.description}
                  </p>
                )}

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-[calc(1px*var(--cv-scale,1))] text-[calc(var(--cv-font-base,12px)*0.95*var(--cv-scale,1))]" style={{ color: bodyTextColor }}>
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
            <div key="sec-summary-sb" className="space-y-[calc(4px*var(--cv-scale,1))] break-inside-avoid page-break-inside-avoid">
              <h3
                className="font-bold uppercase tracking-wider pb-[calc(2px*var(--cv-scale,1))] border-b text-[calc(11px*var(--cv-scale,1))]"
                style={{ color: sbTextPrimary, borderColor: sbBorderColor }}
              >
                {getSectionTitle("summary", "Profilo")}
              </h3>
              <p className="leading-relaxed font-normal break-words whitespace-normal text-[calc(10.5px*var(--cv-scale,1))]" style={{ color: sbTextSecondary }}>
                {summary}
              </p>
            </div>
          );
        }
        return (
          <div key="sec-summary" className="break-inside-avoid page-break-inside-avoid space-y-[calc(3px*var(--cv-scale,1))]">
            <h2
              className="font-bold uppercase tracking-widest pb-[calc(2px*var(--cv-scale,1))] border-b border-black/10 text-[calc(11px*var(--cv-scale,1))]"
              style={{ color: accentColor }}
            >
              {getSectionTitle("summary", "Profilo Professionale")}
            </h2>
            <p className="leading-relaxed font-normal text-justify break-words whitespace-normal text-[calc(var(--cv-font-base,12px)*0.95*var(--cv-scale,1))]" style={{ color: bodyTextColor }}>
              {summary}
            </p>
          </div>
        );

      case "experience":
        if (experiences.length === 0) return null;
        return (
          <div key="sec-experience" className="space-y-[calc(var(--cv-item-gap,8px)*var(--cv-scale,1))] break-inside-avoid page-break-inside-avoid">
            <h2
              className="font-bold uppercase tracking-widest pb-[calc(2px*var(--cv-scale,1))] border-b border-black/10 text-[calc(11px*var(--cv-scale,1))]"
              style={{ color: accentColor }}
            >
              {getSectionTitle("experience", "Esperienze Lavorative")}
            </h2>

            <div className="space-y-[calc(var(--cv-item-gap,8px)*var(--cv-scale,1))]">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="break-inside-avoid page-break-inside-avoid space-y-[calc(2px*var(--cv-scale,1))]"
                >
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <span
                        className="font-bold break-words text-[calc(var(--cv-font-base,12px)*1.05*var(--cv-scale,1))]"
                        style={{ color: primaryTextColor }}
                      >
                        {exp.position}
                      </span>
                      {exp.company && (
                        <span className="font-medium ml-1.5 break-words text-[calc(var(--cv-font-base,12px)*0.95*var(--cv-scale,1))]" style={{ color: secondaryTextColor }}>
                          • {exp.company}
                        </span>
                      )}
                      {exp.location && (
                        <span className="ml-1.5 opacity-70 break-words text-[calc(var(--cv-font-base,12px)*0.9*var(--cv-scale,1))]" style={{ color: secondaryTextColor }}>
                          ({exp.location})
                        </span>
                      )}
                    </div>
                    <span className="font-mono shrink-0 opacity-80 text-[calc(var(--cv-font-base,12px)*0.9*var(--cv-scale,1))]" style={{ color: secondaryTextColor }}>
                      {exp.startDate} — {exp.isCurrent ? "Presente" : exp.endDate || "Presente"}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="leading-normal break-words whitespace-normal text-[calc(var(--cv-font-base,12px)*0.95*var(--cv-scale,1))]" style={{ color: bodyTextColor }}>
                      {exp.description}
                    </p>
                  )}

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-[calc(1px*var(--cv-scale,1))] text-[calc(var(--cv-font-base,12px)*0.95*var(--cv-scale,1))]" style={{ color: bodyTextColor }}>
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
          <div key="sec-education" className="space-y-[calc(var(--cv-item-gap,8px)*var(--cv-scale,1))] break-inside-avoid page-break-inside-avoid">
            <h2
              className="font-bold uppercase tracking-widest pb-[calc(2px*var(--cv-scale,1))] border-b border-black/10 text-[calc(11px*var(--cv-scale,1))]"
              style={{ color: accentColor }}
            >
              {getSectionTitle("education", "Formazione & Studi")}
            </h2>

            <div className="space-y-[calc(var(--cv-item-gap,8px)*var(--cv-scale,1))]">
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="break-inside-avoid page-break-inside-avoid space-y-[calc(1.5px*var(--cv-scale,1))]"
                >
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <span
                        className="font-bold break-words text-[calc(var(--cv-font-base,12px)*1.05*var(--cv-scale,1))]"
                        style={{ color: primaryTextColor }}
                      >
                        {edu.degree}
                      </span>
                      {edu.institution && (
                        <span className="font-medium ml-1.5 break-words text-[calc(var(--cv-font-base,12px)*0.95*var(--cv-scale,1))]" style={{ color: secondaryTextColor }}>
                          • {edu.institution}
                        </span>
                      )}
                    </div>
                    <span className="font-mono shrink-0 opacity-80 text-[calc(var(--cv-font-base,12px)*0.9*var(--cv-scale,1))]" style={{ color: secondaryTextColor }}>
                      {edu.startDate} — {edu.isCurrent ? "In corso" : edu.endDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap text-[calc(var(--cv-font-base,12px)*0.9*var(--cv-scale,1))]" style={{ color: secondaryTextColor }}>
                    {edu.fieldOfStudy && <span className="break-words">{edu.fieldOfStudy}</span>}
                    {edu.grade && (
                      <span className="font-medium" style={{ color: primaryTextColor }}>
                        (Voto: {edu.grade})
                      </span>
                    )}
                    {edu.location && <span className="opacity-70">• {edu.location}</span>}
                  </div>

                  {edu.details && (
                    <p className="italic mt-0.5 break-words whitespace-normal text-[calc(var(--cv-font-base,12px)*0.9*var(--cv-scale,1))]" style={{ color: bodyTextColor }}>
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
          return (
            <div key="sec-skills-sb" className="space-y-[calc(6px*var(--cv-scale,1))] break-inside-avoid page-break-inside-avoid">
              <h3
                className="font-bold uppercase tracking-wider pb-[calc(2px*var(--cv-scale,1))] border-b text-[calc(11px*var(--cv-scale,1))]"
                style={{ color: sbTextPrimary, borderColor: sbBorderColor }}
              >
                {getSectionTitle("skills", "Competenze")}
              </h3>
              <div className="space-y-[calc(5px*var(--cv-scale,1))]">
                {skillCategories.map((cat) => (
                  <div key={cat.id} className="space-y-[calc(2px*var(--cv-scale,1))]">
                    <h4
                      className="font-semibold uppercase tracking-tight break-words text-[calc(10px*var(--cv-scale,1))]"
                      style={{ color: sbTextSecondary }}
                    >
                      {cat.name}
                    </h4>
                    <div className="flex flex-wrap gap-[calc(3px*var(--cv-scale,1))]">
                      {cat.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="rounded font-medium break-words whitespace-normal px-[calc(5px*var(--cv-scale,1))] py-[calc(1.5px*var(--cv-scale,1))] text-[calc(9.5px*var(--cv-scale,1))]"
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
          <div key="sec-skills" className="space-y-[calc(4px*var(--cv-scale,1))] break-inside-avoid page-break-inside-avoid">
            <h2
              className="font-bold uppercase tracking-widest pb-[calc(2px*var(--cv-scale,1))] border-b border-black/10 text-[calc(11px*var(--cv-scale,1))]"
              style={{ color: accentColor }}
            >
              {getSectionTitle("skills", "Competenze & Tecnologie")}
            </h2>

            <div className="grid grid-cols-1 gap-[calc(4px*var(--cv-scale,1))] pt-0.5">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="flex flex-row items-baseline gap-2 text-[calc(var(--cv-font-base,12px)*0.95*var(--cv-scale,1))]">
                  <span className="font-semibold shrink-0 w-32 break-words" style={{ color: primaryTextColor }}>
                    {cat.name}:
                  </span>
                  <div className="flex flex-wrap gap-[calc(3px*var(--cv-scale,1))]">
                    {cat.skills.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded font-medium break-words px-[calc(5px*var(--cv-scale,1))] py-[calc(1.5px*var(--cv-scale,1))] text-[calc(var(--cv-font-base,12px)*0.85*var(--cv-scale,1))]"
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
            <div key="sec-languages-sb" className="space-y-[calc(4px*var(--cv-scale,1))] break-inside-avoid page-break-inside-avoid">
              <h3
                className="font-bold uppercase tracking-wider pb-[calc(2px*var(--cv-scale,1))] border-b text-[calc(11px*var(--cv-scale,1))]"
                style={{ color: sbTextPrimary, borderColor: sbBorderColor }}
              >
                {getSectionTitle("languages", "Lingue")}
              </h3>
              <div className="space-y-[calc(3px*var(--cv-scale,1))] text-[calc(10.5px*var(--cv-scale,1))]">
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
          <div key="sec-languages" className="space-y-[calc(3px*var(--cv-scale,1))] break-inside-avoid page-break-inside-avoid">
            <h3 className="font-bold uppercase tracking-widest pb-0.5 border-b border-black/10 text-[calc(11px*var(--cv-scale,1))]" style={{ color: accentColor }}>
              {getSectionTitle("languages", "Lingue")}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[calc(var(--cv-font-base,12px)*0.95*var(--cv-scale,1))]" style={{ color: bodyTextColor }}>
              {languages.map((l) => (
                <div key={l.id} className="inline-flex items-center gap-1">
                  <span className="font-semibold break-words" style={{ color: primaryTextColor }}>{l.language}:</span>
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
            <div key="sec-certifications-sb" className="space-y-[calc(4px*var(--cv-scale,1))] break-inside-avoid page-break-inside-avoid">
              <h3
                className="font-bold uppercase tracking-wider pb-[calc(2px*var(--cv-scale,1))] border-b text-[calc(11px*var(--cv-scale,1))]"
                style={{ color: sbTextPrimary, borderColor: sbBorderColor }}
              >
                {getSectionTitle("certifications", "Certificazioni")}
              </h3>
              <div className="space-y-[calc(3px*var(--cv-scale,1))] text-[calc(10.5px*var(--cv-scale,1))]">
                {certifications.map((c) => (
                  <div key={c.id} className="space-y-[calc(1px*var(--cv-scale,1))]">
                    <div className="font-semibold break-words leading-tight" style={{ color: sbTextPrimary }}>
                      {c.name}
                    </div>
                    <div className="text-[calc(9.5px*var(--cv-scale,1))] break-words" style={{ color: sbTextMuted }}>
                      {c.issuer} {c.date ? `(${c.date})` : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return (
          <div key="sec-certifications" className="space-y-[calc(3px*var(--cv-scale,1))] break-inside-avoid page-break-inside-avoid">
            <h3 className="font-bold uppercase tracking-widest pb-0.5 border-b border-black/10 text-[calc(11px*var(--cv-scale,1))]" style={{ color: accentColor }}>
              {getSectionTitle("certifications", "Certificazioni")}
            </h3>
            <div className="space-y-[calc(2px*var(--cv-scale,1))] text-[calc(var(--cv-font-base,12px)*0.95*var(--cv-scale,1))]" style={{ color: bodyTextColor }}>
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between gap-2 flex-wrap">
                  <span className="font-semibold break-words" style={{ color: primaryTextColor }}>{c.name}</span>
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
            <div key="sec-projects-sb" className="space-y-[calc(4px*var(--cv-scale,1))] break-inside-avoid page-break-inside-avoid">
              <h3
                className="font-bold uppercase tracking-wider pb-[calc(2px*var(--cv-scale,1))] border-b text-[calc(11px*var(--cv-scale,1))]"
                style={{ color: sbTextPrimary, borderColor: sbBorderColor }}
              >
                {getSectionTitle("projects", "Progetti")}
              </h3>
              <div className="space-y-[calc(3px*var(--cv-scale,1))] text-[calc(10.5px*var(--cv-scale,1))]">
                {projects.map((p) => (
                  <div key={p.id} className="space-y-[calc(1px*var(--cv-scale,1))]">
                    <div className="font-semibold break-words leading-tight" style={{ color: sbTextPrimary }}>
                      {p.name} {p.role ? `(${p.role})` : ""}
                    </div>
                    {p.description && (
                      <p className="text-[calc(9.5px*var(--cv-scale,1))] leading-snug break-words whitespace-normal" style={{ color: sbTextSecondary }}>
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
          <div key="sec-projects" className="space-y-[calc(var(--cv-item-gap,8px)*var(--cv-scale,1))] break-inside-avoid page-break-inside-avoid">
            <h2
              className="font-bold uppercase tracking-widest pb-[calc(2px*var(--cv-scale,1))] border-b border-black/10 text-[calc(11px*var(--cv-scale,1))]"
              style={{ color: accentColor }}
            >
              {getSectionTitle("projects", "Progetti di Rilievo")}
            </h2>
            <div className="grid grid-cols-1 gap-[calc(4px*var(--cv-scale,1))]">
              {projects.map((p) => (
                <div key={p.id} className="space-y-[calc(1.5px*var(--cv-scale,1))] text-[calc(var(--cv-font-base,12px)*0.95*var(--cv-scale,1))]">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold break-words" style={{ color: primaryTextColor }}>
                      {p.name} {p.role ? `(${p.role})` : ""}
                    </span>
                    {p.link && (
                      <a
                        href={formatUrl(p.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono hover:underline inline-flex items-center gap-1 opacity-80 break-all text-[calc(var(--cv-font-base,12px)*0.85*var(--cv-scale,1))]"
                        style={{ color: secondaryTextColor }}
                      >
                        <span>{p.link.replace(/^https?:\/\//, "")}</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>
                    )}
                  </div>
                  {p.description && (
                    <p className="break-words whitespace-normal" style={{ color: bodyTextColor }}>
                      {p.description}
                    </p>
                  )}
                  {p.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-[calc(3px*var(--cv-scale,1))] pt-0.5">
                      {p.technologies.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded break-words px-[calc(4px*var(--cv-scale,1))] py-[calc(1px*var(--cv-scale,1))] text-[calc(var(--cv-font-base,12px)*0.8*var(--cv-scale,1))]"
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

  // Dynamic CSS variables passed to document root
  const rootCustomProperties = {
    "--cv-scale": autoFitScale,
    "--cv-font-base": `${baseFontSizePx}px`,
    "--cv-section-gap": `${baseSectionGapPx}px`,
    "--cv-item-gap": `${baseItemGapPx}px`,
    "--cv-page-pad": `${basePagePadPx}px`,
    "--cv-avatar-size": `${baseAvatarSizePx}px`,
  } as React.CSSProperties;

  // =========================================================================
  // TEMPLATE 1: CIVVU Minimal (Single Page A4 with Dynamic Auto-Fit)
  // =========================================================================
  if (settings.template === "minimal") {
    return (
      <div
        ref={rootRef}
        id="cv-print-root"
        className={cn(
          "box-border relative font-sans transition-colors duration-200 select-text overflow-hidden",
          "w-[210mm] min-w-[210mm] max-w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm]",
          className
        )}
        style={{
          width: "210mm",
          height: "297mm",
          minWidth: "210mm",
          maxWidth: "210mm",
          minHeight: "297mm",
          maxHeight: "297mm",
          backgroundColor: paperBgColor,
          color: primaryTextColor,
          ...rootCustomProperties,
        }}
      >
        <div
          ref={contentRef}
          className="w-full h-full box-border"
          style={{
            padding: `calc(var(--cv-page-pad, 32px) * var(--cv-scale, 1))`,
            transform: autoFitScale < 1 ? `scale(${autoFitScale})` : "none",
            transformOrigin: "top center",
            width: autoFitScale < 1 ? `${(100 / autoFitScale).toFixed(3)}%` : "100%",
          }}
        >
          <div
            ref={innerStackRef}
            className="w-full space-y-[calc(var(--cv-section-gap,14px)*var(--cv-scale,1))]"
          >
            {/* Header Section */}
            <div className="border-b border-black/10 pb-[calc(10px*var(--cv-scale,1))] break-inside-avoid">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-[calc(2px*var(--cv-scale,1))] flex-1 min-w-0">
                  <h1
                    className="font-extrabold tracking-tight break-words leading-tight text-[calc(24px*var(--cv-scale,1))]"
                    style={{ color: primaryTextColor }}
                  >
                    {personalInfo.fullName || "Tuo Nome"}
                  </h1>
                  <p
                    className="font-semibold tracking-tight break-words text-[calc(13.5px*var(--cv-scale,1))]"
                    style={{ color: accentColor }}
                  >
                    {personalInfo.jobTitle || "Titolo Professionale"}
                  </p>

                  {/* Contact Pills with Clickable Links */}
                  <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 pt-1 text-[calc(11px*var(--cv-scale,1))]" style={{ color: secondaryTextColor }}>
                    {personalInfo.email && (
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="inline-flex items-center gap-1 hover:underline transition-colors break-all"
                        style={{ color: secondaryTextColor }}
                        title="Invia email"
                      >
                        <Mail className="w-3 h-3 opacity-70 shrink-0" />
                        <span>{personalInfo.email}</span>
                      </a>
                    )}
                    {personalInfo.phone && (
                      <a
                        href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                        className="inline-flex items-center gap-1 hover:underline transition-colors"
                        style={{ color: secondaryTextColor }}
                        title="Chiama"
                      >
                        <Phone className="w-3 h-3 opacity-70 shrink-0" />
                        <span>{personalInfo.phone}</span>
                      </a>
                    )}
                    {personalInfo.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 opacity-70 shrink-0" />
                        <span>{personalInfo.location}</span>
                      </span>
                    )}
                    {personalInfo.website && (
                      <a
                        href={formatUrl(personalInfo.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:underline transition-colors break-all"
                        style={{ color: secondaryTextColor }}
                      >
                        <Globe className="w-3 h-3 opacity-70 shrink-0" />
                        <span>{personalInfo.website.replace(/^https?:\/\//, "")}</span>
                      </a>
                    )}
                    {personalInfo.linkedin && (
                      <a
                        href={formatUrl(personalInfo.linkedin)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:underline transition-colors break-all"
                        style={{ color: secondaryTextColor }}
                      >
                        <LinkedinIcon className="w-3 h-3 opacity-70 shrink-0" />
                        <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</span>
                      </a>
                    )}
                    {personalInfo.github && (
                      <a
                        href={formatUrl(personalInfo.github)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:underline transition-colors break-all"
                        style={{ color: secondaryTextColor }}
                      >
                        <GithubIcon className="w-3 h-3 opacity-70 shrink-0" />
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
                      avatarShapeClasses
                    )}
                    style={{
                      width: `calc(var(--cv-avatar-size, 96px) * var(--cv-scale, 1))`,
                      height: `calc(var(--cv-avatar-size, 96px) * var(--cv-scale, 1))`,
                    }}
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
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 2: Modern Sidebar (Single Page A4 with Dynamic Auto-Fit)
  // =========================================================================
  if (settings.template === "modern") {
    const sidebarItems = sectionOrder.filter((s) => s.isVisible && s.column === "sidebar");
    const mainItems = sectionOrder.filter((s) => s.isVisible && s.column !== "sidebar");

    return (
      <div
        ref={rootRef}
        id="cv-print-root"
        className={cn(
          "box-border relative font-sans transition-colors duration-200 select-text overflow-hidden",
          "w-[210mm] min-w-[210mm] max-w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm]",
          className
        )}
        style={{
          width: "210mm",
          height: "297mm",
          minWidth: "210mm",
          maxWidth: "210mm",
          minHeight: "297mm",
          maxHeight: "297mm",
          background: `linear-gradient(to right, ${sidebarBgColor} 33%, ${paperBgColor} 33%)`,
          color: primaryTextColor,
          ...rootCustomProperties,
        }}
      >
        {/* Scaled Auto-Fit Content Container */}
        <div
          ref={contentRef}
          className="flex flex-row w-full h-full"
          style={{
            transform: autoFitScale < 1 ? `scale(${autoFitScale})` : "none",
            transformOrigin: "top left",
            width: autoFitScale < 1 ? `${(100 / autoFitScale).toFixed(3)}%` : "100%",
          }}
        >
          {/* Left Customizable Sidebar (Strict 33% width) */}
          <div
            ref={sidebarRef}
            className="w-[33%] shrink-0 border-r"
            style={{
              padding: `calc(20px * var(--cv-scale, 1))`,
              gap: `calc(14px * var(--cv-scale, 1))`,
              backgroundColor: sidebarBgColor,
              color: sbTextPrimary,
              borderColor: sbBorderColor,
            }}
          >
            {settings.showAvatar && personalInfo.avatarUrl && (
              <div
                className={cn(
                  "overflow-hidden mx-auto border-2 shadow-sm mb-[calc(12px*var(--cv-scale,1))]",
                  avatarShapeClasses
                )}
                style={{
                  width: `calc(var(--cv-avatar-size, 96px) * var(--cv-scale, 1))`,
                  height: `calc(var(--cv-avatar-size, 96px) * var(--cv-scale, 1))`,
                  borderColor: sbBorderColor,
                }}
              >
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Contacts Sidebar Section with fluid natural text wrapping */}
            <div className="space-y-[calc(6px*var(--cv-scale,1))] break-inside-avoid mb-[calc(14px*var(--cv-scale,1))]">
              <h3
                className="font-bold uppercase tracking-wider pb-[calc(2px*var(--cv-scale,1))] border-b text-[calc(11px*var(--cv-scale,1))]"
                style={{ color: sbTextPrimary, borderColor: sbBorderColor }}
              >
                Contatti
              </h3>
              <div className="space-y-[calc(4px*var(--cv-scale,1))] text-[calc(10.5px*var(--cv-scale,1))]">
                {personalInfo.email && (
                  <div className="flex items-start gap-2">
                    <Mail className="w-3 h-3 shrink-0 mt-0.5" style={{ color: sbTextMuted }} />
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="break-words whitespace-normal hover:underline leading-tight"
                      style={{ color: sbTextSecondary }}
                      title={personalInfo.email}
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-start gap-2">
                    <Phone className="w-3 h-3 shrink-0 mt-0.5" style={{ color: sbTextMuted }} />
                    <a
                      href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                      className="break-words whitespace-normal hover:underline leading-tight"
                      style={{ color: sbTextSecondary }}
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3 h-3 shrink-0 mt-0.5" style={{ color: sbTextMuted }} />
                    <span className="break-words whitespace-normal leading-tight" style={{ color: sbTextSecondary }}>
                      {personalInfo.location}
                    </span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-start gap-2">
                    <Globe className="w-3 h-3 shrink-0 mt-0.5" style={{ color: sbTextMuted }} />
                    <a
                      href={formatUrl(personalInfo.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words whitespace-normal hover:underline leading-tight"
                      style={{ color: sbTextSecondary }}
                    >
                      {personalInfo.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-start gap-2">
                    <LinkedinIcon className="w-3 h-3 shrink-0 mt-0.5" style={{ color: sbTextMuted }} />
                    <a
                      href={formatUrl(personalInfo.linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words whitespace-normal hover:underline leading-tight"
                      style={{ color: sbTextSecondary }}
                    >
                      {personalInfo.linkedin.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-start gap-2">
                    <GithubIcon className="w-3 h-3 shrink-0 mt-0.5" style={{ color: sbTextMuted }} />
                    <a
                      href={formatUrl(personalInfo.github)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words whitespace-normal hover:underline leading-tight"
                      style={{ color: sbTextSecondary }}
                    >
                      {personalInfo.github.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Sidebar Sections */}
            <div className="space-y-[calc(14px*var(--cv-scale,1))]">
              {sidebarItems.map((section) => renderSectionByKey(section.key, true))}
            </div>
          </div>

          {/* Right Main Column (Strict 67% width) */}
          <div
            ref={mainColRef}
            className="w-[67%] min-w-0"
            style={{
              padding: `calc(20px * var(--cv-scale, 1))`,
            }}
          >
            <div className="border-b border-black/10 pb-[calc(10px*var(--cv-scale,1))] mb-[calc(14px*var(--cv-scale,1))] break-inside-avoid">
              <h1
                className="font-extrabold tracking-tight break-words leading-tight text-[calc(24px*var(--cv-scale,1))]"
                style={{ color: primaryTextColor }}
              >
                {personalInfo.fullName || "Tuo Nome"}
              </h1>
              <p
                className="font-semibold mt-0.5 break-words text-[calc(13.5px*var(--cv-scale,1))]"
                style={{ color: accentColor }}
              >
                {personalInfo.jobTitle || "Titolo Professionale"}
              </p>
            </div>

            {/* Dynamic Main Column Sections */}
            <div className="space-y-[calc(var(--cv-section-gap,14px)*var(--cv-scale,1))]">
              {mainItems.map((section) => renderSectionByKey(section.key, false))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 3: Executive Clean (Single Page A4 with Dynamic Auto-Fit)
  // =========================================================================
  return (
    <div
      ref={rootRef}
      id="cv-print-root"
      className={cn(
        "box-border relative font-sans transition-colors duration-200 select-text overflow-hidden",
        "w-[210mm] min-w-[210mm] max-w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm]",
        className
      )}
      style={{
        width: "210mm",
        height: "297mm",
        minWidth: "210mm",
        maxWidth: "210mm",
        minHeight: "297mm",
        maxHeight: "297mm",
        backgroundColor: paperBgColor,
        color: primaryTextColor,
        ...rootCustomProperties,
      }}
    >
      <div
        ref={contentRef}
        className="w-full h-full box-border"
        style={{
          padding: `calc(var(--cv-page-pad, 32px) * var(--cv-scale, 1))`,
          transform: autoFitScale < 1 ? `scale(${autoFitScale})` : "none",
          transformOrigin: "top center",
          width: autoFitScale < 1 ? `${(100 / autoFitScale).toFixed(3)}%` : "100%",
        }}
      >
        <div
          ref={innerStackRef}
          className="w-full space-y-[calc(var(--cv-section-gap,14px)*var(--cv-scale,1))]"
        >
          {/* Centered Top Header */}
          <div
            className="text-center pb-[calc(10px*var(--cv-scale,1))] border-b-2 break-inside-avoid space-y-[calc(3px*var(--cv-scale,1))]"
            style={{ borderColor: accentColor }}
          >
            {settings.showAvatar && personalInfo.avatarUrl && (
              <div
                className={cn(
                  "overflow-hidden mx-auto mb-[calc(8px*var(--cv-scale,1))] border border-black/15 shadow-2xs",
                  avatarShapeClasses
                )}
                style={{
                  width: `calc(var(--cv-avatar-size, 96px) * var(--cv-scale, 1))`,
                  height: `calc(var(--cv-avatar-size, 96px) * var(--cv-scale, 1))`,
                }}
              >
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h1
              className="font-serif tracking-tight font-bold break-words leading-tight text-[calc(24px*var(--cv-scale,1))]"
              style={{ color: primaryTextColor }}
            >
              {personalInfo.fullName || "Tuo Nome"}
            </h1>
            <p
              className="font-semibold uppercase tracking-widest break-words text-[calc(12px*var(--cv-scale,1))]"
              style={{ color: accentColor }}
            >
              {personalInfo.jobTitle || "Titolo Professionale"}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-x-3.5 gap-y-0.5 pt-0.5 text-[calc(11px*var(--cv-scale,1))]" style={{ color: secondaryTextColor }}>
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
    </div>
  );
};
