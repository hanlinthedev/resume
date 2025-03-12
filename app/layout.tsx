import Header from "@/components/commons/Header";
import { ClerkProvider } from "@clerk/nextjs";
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
  title: {
    template: "%s | ATS Resume Scanner",
    default: "ATS Resume Scanner - Free Resume Analysis Tool",
  },
  description:
    "Free ATS resume scanner and analyzer. Check if your resume is ATS friendly, get instant feedback, and improve your chances of getting past applicant tracking systems.",
  keywords: [
    "ATS resume scanner",
    "resume analyzer",
    "ATS friendly resume",
    "resume checker",
    "job application",
    "career tools",
    "resume optimization",
  ],
  authors: [{ name: "Han Lin Aung" }],
  creator: "Han Lin Aung",
  publisher: "Han Lin Aung",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_us",
    url: "https://resume.hanlinaung.dev",
    siteName: "ATS Resume Scanner",
    title: "ATS Resume Scanner - Free Resume Analysis Tool",
    description:
      "Free ATS resume scanner and analyzer. Check if your resume is ATS friendly and improve your chances of getting past applicant tracking systems.",
    images: [
      {
        url: "/OG.png", // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: "ATS Resume Scanner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATS Resume Scanner - Free Resume Analysis Tool",
    description:
      "Free ATS resume scanner and analyzer. Check if your resume is ATS friendly and improve your chances of getting past applicant tracking systems.",
    images: ["/OG.png"], // Add your Twitter card image
    creator: "@yourtwitter",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
