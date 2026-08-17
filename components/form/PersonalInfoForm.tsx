"use client";

import React from "react";
import { useCV } from "@/context/CVContext";
import { Input } from "@/components/ui/Input";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { User, Mail, Phone, MapPin, Globe, Image as ImageIcon } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export const PersonalInfoForm: React.FC = () => {
  const { cvData, updatePersonalInfo } = useCV();
  const { personalInfo } = cvData;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Dati Anagrafici & Contatti"
        subtitle="Inserisci le informazioni di base e i tuoi recapiti professionali"
        icon={<User className="w-5 h-5" />}
      />

      <Card className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome Completo"
            placeholder="es. Alex Vender"
            value={personalInfo.fullName}
            onChange={(val) => updatePersonalInfo({ fullName: val })}
            icon={<User className="w-4 h-4" />}
          />
          <Input
            label="Ruolo / Titolo Professionale"
            placeholder="es. Senior Frontend & Design Engineer"
            value={personalInfo.jobTitle}
            onChange={(val) => updatePersonalInfo({ jobTitle: val })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="es. alex.vender@domain.com"
            value={personalInfo.email}
            onChange={(val) => updatePersonalInfo({ email: val })}
            icon={<Mail className="w-4 h-4" />}
          />
          <Input
            label="Telefono"
            type="tel"
            placeholder="es. +39 345 678 9012"
            value={personalInfo.phone}
            onChange={(val) => updatePersonalInfo({ phone: val })}
            icon={<Phone className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Città / Località"
            placeholder="es. Milano, Italia"
            value={personalInfo.location}
            onChange={(val) => updatePersonalInfo({ location: val })}
            icon={<MapPin className="w-4 h-4" />}
          />
          <Input
            label="Sito Web / Portfolio"
            placeholder="es. https://vender.design"
            value={personalInfo.website}
            onChange={(val) => updatePersonalInfo({ website: val })}
            icon={<Globe className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="LinkedIn"
            placeholder="es. linkedin.com/in/alexvender"
            value={personalInfo.linkedin}
            onChange={(val) => updatePersonalInfo({ linkedin: val })}
            icon={<LinkedinIcon className="w-4 h-4" />}
          />
          <Input
            label="GitHub"
            placeholder="es. github.com/alexvender"
            value={personalInfo.github}
            onChange={(val) => updatePersonalInfo({ github: val })}
            icon={<GithubIcon className="w-4 h-4" />}
          />
        </div>

        {cvData.settings.showAvatar && (
          <div className="pt-2 border-t border-neutral-800/80">
            <Input
              label="URL Foto Profilo (Opzionale)"
              placeholder="https://..."
              value={personalInfo.avatarUrl}
              onChange={(val) => updatePersonalInfo({ avatarUrl: val })}
              icon={<ImageIcon className="w-4 h-4" />}
              helperText="Incolla l'URL di un'immagine quadrata per visualizzare la foto profilo nel CV"
            />
          </div>
        )}
      </Card>
    </div>
  );
};
