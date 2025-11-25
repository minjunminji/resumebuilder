import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeForge - AI-Powered Resume Builder",
  description: "Build tailored resumes for every job application with intelligent AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
