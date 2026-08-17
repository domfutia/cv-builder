"use client";

import React from "react";
import { useCV } from "@/context/CVContext";
import { Textarea } from "@/components/ui/Textarea";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { FileText } from "lucide-react";

export const SummaryForm: React.FC = () => {
  const { cvData, updateSummary } = useCV();

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Profilo Professionale"
        subtitle="Sintetizza in poche righe chi sei, i tuoi punti di forza e i tuoi obiettivi"
        icon={<FileText className="w-5 h-5" />}
      />

      <Card>
        <Textarea
          label="Sommario / Bio"
          rows={5}
          placeholder="es. Product-minded Frontend Engineer con esperienza nella progettazione di Design System e applicazioni web ad alte prestazioni..."
          value={cvData.summary}
          onChange={(val) => updateSummary(val)}
          helperText="Consiglio: scrivi 2-4 frasi di impatto focalizzate su risultati concreti, tecnologie chiave e approccio metodologico."
        />
      </Card>
    </div>
  );
};
