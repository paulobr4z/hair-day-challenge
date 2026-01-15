import type { Metadata } from "next";
import { Catamaran } from "next/font/google";
import "./globals.css";

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-catamaran",
});

export const metadata: Metadata = {
  title: "Hair Day",
  description: "Agende um atendimento no salão Hair Day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${catamaran.variable} antialiased bg-gray-800`}>
        {children}
      </body>
    </html>
  );
}
