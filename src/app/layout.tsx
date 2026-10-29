import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import ToastProvider from "@/components/layout/ToastProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর | আজকের বাজারদর",
  description:
    "চাল, ডাল, তেল, মাছ, মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর জানুন।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ToastProvider />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}