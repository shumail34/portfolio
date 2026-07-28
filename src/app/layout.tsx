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
  description: "Specializing in high-performance web applications using React, Next.js, Node.js, Express, and MongoDB. View my projects and contact me for freelance opportunities.",
  keywords: ["Full-Stack Engineer", "JavaScript", "React Developer", "Next.js", "Node.js", "Three.js", "UI/UX", "Muhammad Shumail", "Web Developer Portfolio"],
  authors: [{ name: "Muhammad Shumail", url: "https://shumail-portfolio.vercel.app" }],
  creator: "Muhammad Shumail",
  publisher: "Muhammad Shumail",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Muhammad Shumail | Full-Stack JavaScript Engineer",
    description: "Specializing in high-performance web applications using React, Next.js, Node.js, Express, and MongoDB.",
    url: "https://shumail-portfolio.vercel.app", // Adjust to final domain
    siteName: "Muhammad Shumail Portfolio",
    images: [
      {
        url: "/avatar.png",
        width: 800,
        height: 600,
        alt: "Muhammad Shumail",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Shumail | Full-Stack JavaScript Engineer",
    description: "High-performance web applications using React, Next.js, Node.js.",
    creator: "@shumail", // Adjust to actual twitter handle if needed
    images: ["/avatar.png"],
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
