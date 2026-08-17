"use client";

import React from "react";
import { useCV } from "@/context/CVContext";
import { Textarea } from "@/components/ui/Textarea";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { FileText } from "lucide-react";

export const SummaryForm: React.FC = () => {
  const { cvData, updateSummary, updateSectionLabel, deleteSection, t } = useCV();
  const sectionTitle =
    cvData.settings.sectionOrder?.find((s) => s.key === "summary")?.label || t.summary.title;

  return (
    <div className="space-y-6">
      <SectionHeader
        title={sectionTitle}
        subtitle={t.summary.subtitle}
        icon={<FileText className="w-5 h-5" />}
        editableTitle={true}
        onTitleChange={(newTitle) => updateSectionLabel("summary", newTitle)}
        canDelete={true}
        onDelete={() => deleteSection("summary")}
      />

      <Card>
        <Textarea
          label={t.summary.title}
          rows={5}
          placeholder={t.summary.placeholder}
          value={cvData.summary}
          onChange={(val) => updateSummary(val)}
          helperText={t.summary.tipBody}
        />
      </Card>
    </div>
  );
};
