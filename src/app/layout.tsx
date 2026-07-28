import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Muhammad Shumail | Full-Stack JavaScript Engineer",
  description: "Specializing in high-performance web applications using React, Next.js, Node.js, Express, and MongoDB. Modern UI/UX portfolio landing page.",
  keywords: ["Full-Stack JavaScript Engineer", "React Developer", "Next.js", "Three.js", "GSAP Animations", "Tailwind CSS", "Muhammad Shumail", "Web Developer Portfolio"],
  authors: [{ name: "Muhammad Shumail" }],
  openGraph: {
    title: "Muhammad Shumail | Full-Stack JavaScript Engineer",
    description: "Specializing in high-performance web applications using React, Next.js, Node.js, Express, and MongoDB.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased selection:bg-zinc-600/30 selection:text-white`} suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
