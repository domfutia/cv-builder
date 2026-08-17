/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import { useCV } from "@/context/CVContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { User, Mail, Phone, MapPin, Globe, Upload, Trash2, Image as ImageIcon, Circle, Square } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { AvatarShape, AvatarSize } from "@/types/cv";
import { cn } from "@/lib/utils";

// Process image file to compressed Base64 using HTML Canvas
function processImageFile(file: File, callback: (base64: string) => void) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxDim = 400;
      const width = img.width;
      const height = img.height;

      // Crop to square from center
      const minSide = Math.min(width, height);
      const startX = (width - minSide) / 2;
      const startY = (height - minSide) / 2;

      canvas.width = Math.min(minSide, maxDim);
      canvas.height = Math.min(minSide, maxDim);

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(
          img,
          startX,
          startY,
          minSide,
          minSide,
          0,
          0,
          canvas.width,
          canvas.height
        );
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        callback(dataUrl);
      }
    };
    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

export const PersonalInfoForm: React.FC = () => {
  const { cvData, updatePersonalInfo, updateSettings, t } = useCV();
  const { personalInfo, settings } = cvData;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file, (base64) => {
        updatePersonalInfo({ avatarUrl: base64 });
        updateSettings({ showAvatar: true });
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processImageFile(file, (base64) => {
        updatePersonalInfo({ avatarUrl: base64 });
        updateSettings({ showAvatar: true });
      });
    }
  };

  const handleRemovePhoto = () => {
    updatePersonalInfo({ avatarUrl: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const shapes: { id: AvatarShape; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "circle", label: t.personalInfo.shapeCircle, icon: Circle },
    { id: "rounded", label: t.personalInfo.shapeRounded, icon: Square },
    { id: "square", label: t.personalInfo.shapeSquare, icon: Square },
  ];

  const sizes: { id: AvatarSize; label: string }[] = [
    { id: "sm", label: t.personalInfo.sizeSm },
    { id: "md", label: t.personalInfo.sizeMd },
    { id: "lg", label: t.personalInfo.sizeLg },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title={t.personalInfo.title}
        subtitle={t.personalInfo.subtitle}
        icon={<User className="w-5 h-5" />}
      />

      {/* Foto Profilo Upload & Opzioni */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800/80">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-neutral-500" />
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
              {t.personalInfo.photoTitle}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">{t.personalInfo.showAvatarLabel}</span>
            <button
              type="button"
              onClick={() => updateSettings({ showAvatar: !settings.showAvatar })}
              className={cn(
                "w-9 h-5 rounded-full transition-colors relative cursor-pointer focus:outline-none",
                settings.showAvatar ? "bg-neutral-900 dark:bg-neutral-200" : "bg-neutral-200 dark:bg-neutral-800"
              )}
            >
              <span
                className={cn(
                  "block w-3.5 h-3.5 rounded-full transition-transform absolute top-0.5",
                  settings.showAvatar ? "bg-white dark:bg-neutral-950 translate-x-4" : "bg-neutral-400 translate-x-1"
                )}
              />
            </button>
          </div>
        </div>

        {/* Hidden input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          {/* Avatar Preview & Drop Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={cn(
              "sm:col-span-7 flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-dashed transition-all cursor-pointer",
              isDragging
                ? "border-neutral-900 dark:border-neutral-400 bg-neutral-100 dark:bg-neutral-800/80"
                : "border-neutral-300 dark:border-neutral-700/80 hover:border-neutral-400 dark:hover:border-neutral-600 bg-neutral-50/50 dark:bg-neutral-900/40"
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            {personalInfo.avatarUrl ? (
              <div className="relative group shrink-0">
                <div
                  className={cn(
                    "w-16 h-16 overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 shadow-sm",
                    settings.avatarShape === "circle" && "rounded-full",
                    settings.avatarShape === "rounded" && "rounded-xl",
                    settings.avatarShape === "square" && "rounded-none"
                  )}
                >
                  <img
                    src={personalInfo.avatarUrl}
                    alt={t.personalInfo.photoTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-500 shrink-0">
                <User className="w-8 h-8" />
              </div>
            )}

            <div className="text-center sm:text-left flex-1 min-w-0">
              <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                {personalInfo.avatarUrl ? t.personalInfo.photoTitle : t.personalInfo.photoUploadBtn}
              </p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                {t.personalInfo.photoHelp}
              </p>
            </div>
          </div>

          {/* Action buttons and Shape/Size toggles */}
          <div className="sm:col-span-5 space-y-3">
            {personalInfo.avatarUrl && (
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  icon={<Upload className="w-3 h-3" />}
                  className="flex-1 text-[11px] cursor-pointer"
                >
                  {t.personalInfo.photoUploadBtn}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemovePhoto();
                  }}
                  icon={<Trash2 className="w-3 h-3" />}
                  className="text-[11px] cursor-pointer"
                  title={t.personalInfo.photoRemoveBtn}
                >
                  {t.personalInfo.photoRemoveBtn}
                </Button>
              </div>
            )}

            {/* Shape selector */}
            <div className="space-y-1">
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                {t.personalInfo.avatarShape}
              </label>
              <div className="grid grid-cols-3 gap-1">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => updateSettings({ avatarShape: s.id })}
                    title={s.label}
                    className={cn(
                      "py-1.5 px-1 rounded-md border text-[10px] sm:text-[11px] font-medium transition-all text-center cursor-pointer truncate",
                      settings.avatarShape === s.id
                        ? "bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-950 border-neutral-900 dark:border-neutral-300 font-semibold"
                        : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="space-y-1">
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                {t.personalInfo.avatarSize}
              </label>
              <div className="grid grid-cols-3 gap-1">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => updateSettings({ avatarSize: s.id })}
                    title={s.label}
                    className={cn(
                      "py-1.5 px-1 rounded-md border text-[10px] sm:text-[11px] font-medium transition-all text-center cursor-pointer truncate",
                      settings.avatarSize === s.id
                        ? "bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-950 border-neutral-900 dark:border-neutral-300 font-semibold"
                        : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Dati Anagrafici */}
      <Card className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t.personalInfo.fullName}
            placeholder={t.personalInfo.fullNamePlaceholder}
            value={personalInfo.fullName}
            onChange={(val) => updatePersonalInfo({ fullName: val })}
            icon={<User className="w-4 h-4" />}
          />
          <Input
            label={t.personalInfo.jobTitle}
            placeholder={t.personalInfo.jobTitlePlaceholder}
            value={personalInfo.jobTitle}
            onChange={(val) => updatePersonalInfo({ jobTitle: val })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t.personalInfo.email}
            type="email"
            placeholder={t.personalInfo.emailPlaceholder}
            value={personalInfo.email}
            onChange={(val) => updatePersonalInfo({ email: val })}
            icon={<Mail className="w-4 h-4" />}
          />
          <Input
            label={t.personalInfo.phone}
            type="tel"
            placeholder={t.personalInfo.phonePlaceholder}
            value={personalInfo.phone}
            onChange={(val) => updatePersonalInfo({ phone: val })}
            icon={<Phone className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t.personalInfo.location}
            placeholder={t.personalInfo.locationPlaceholder}
            value={personalInfo.location}
            onChange={(val) => updatePersonalInfo({ location: val })}
            icon={<MapPin className="w-4 h-4" />}
          />
          <Input
            label={t.personalInfo.website}
            placeholder={t.personalInfo.websitePlaceholder}
            value={personalInfo.website}
            onChange={(val) => updatePersonalInfo({ website: val })}
            icon={<Globe className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t.personalInfo.linkedin}
            placeholder={t.personalInfo.linkedinPlaceholder}
            value={personalInfo.linkedin}
            onChange={(val) => updatePersonalInfo({ linkedin: val })}
            icon={<LinkedinIcon className="w-4 h-4" />}
          />
          <Input
            label={t.personalInfo.github}
            placeholder={t.personalInfo.githubPlaceholder}
            value={personalInfo.github}
            onChange={(val) => updatePersonalInfo({ github: val })}
            icon={<GithubIcon className="w-4 h-4" />}
          />
        </div>
      </Card>
    </div>
  );
};
