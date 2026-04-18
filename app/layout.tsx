import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Amiri, Scheherazade_New } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SettingsProvider } from "@/providers/settings-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-scheherazade",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quran App - Read the Holy Quran",
  description:
    "Read the Holy Quran with Arabic text, Sahih International English translation, and customizable reading settings.",
  keywords: ["quran", "quran online", "arabic", "islam", "translation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${amiri.variable} ${scheherazade.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster position="top-center" richColors />
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
