import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Muhammad Shumail | Premium Full-Stack JavaScript Engineer",
  description: "Specializing in high-performance web applications using React, Next.js, Node.js, Express, and MongoDB. Modern UI/UX portfolio landing page.",
  keywords: ["Full-Stack JavaScript Engineer", "React Developer", "Next.js", "Three.js", "GSAP Animations", "Tailwind CSS", "Muhammad Shumail", "Web Developer Portfolio"],
  authors: [{ name: "Muhammad Shumail" }],
  openGraph: {
    title: "Muhammad Shumail | Premium Full-Stack JavaScript Engineer",
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
      <body className={`${outfit.variable} ${plusJakarta.variable} antialiased selection:bg-purple-600/30 selection:text-white`} suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
