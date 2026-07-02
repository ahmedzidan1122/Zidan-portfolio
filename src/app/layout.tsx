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
  title: "Ahmed Zidan | Full Stack Developer & Creative Problem Solver",
  description:
    "Portfolio of Ahmed Zidan — a Full Stack Developer who builds fast, beautiful and scalable web experiences while exploring cybersecurity, design and emerging technologies.",
  keywords: [
    "Ahmed Zidan",
    "Full Stack Developer",
    "Web Developer",
    "Cyber Security",
    "Portfolio",
    "React",
    "Next.js",
    "Node.js",
  ],
  authors: [{ name: "Ahmed Zidan" }],
  openGraph: {
    title: "Ahmed Zidan | Full Stack Developer",
    description:
      "Building fast, beautiful and scalable web experiences.",
    type: "website",
    locale: "en_US",
    siteName: "Ahmed Zidan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Zidan | Full Stack Developer",
    description:
      "Building fast, beautiful and scalable web experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ahmed Zidan",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://zidan.dev",
              jobTitle: "Full Stack Developer",
              knowsAbout: [
                "Web Development",
                "Cyber Security",
                "UI/UX Design",
                "Video Editing",
              ],
              knowsLanguage: ["English", "Arabic"],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans">
        {children}
      </body>
    </html>
  );
}
