import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CVProvider } from "@/context/CVContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Interactive CV Builder — Once UI Edition",
  description: "Crea il tuo Curriculum Vitae professionale con anteprima live in tempo reale, sezioni dinamiche personalizzate, drag-and-drop ed esportazione in PDF A4 vettoriale.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-neutral-50 dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CVProvider>{children}</CVProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
