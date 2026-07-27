import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rodogreen Implementos | Basculantes e Carrocerias Personalizadas",
  description:
    "Implementos rodoviários de alto padrão, caçambas basculantes, carrocerias personalizadas e projetos especiais com engenharia e fabricação próprias.",
  keywords: [
    "implementos rodoviários",
    "caçamba basculante",
    "carroceria personalizada",
    "fabricante de implementos",
    "projetos especiais móveis",
    "Rodogreen",
  ],
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: [
      {
        url: "/rodogreen-favicon.png",
        type: "image/png",
        sizes: "1024x1024",
      },
    ],
    shortcut: "/rodogreen-favicon.png",
    apple: [
      {
        url: "/rodogreen-favicon.png",
        type: "image/png",
        sizes: "1024x1024",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
