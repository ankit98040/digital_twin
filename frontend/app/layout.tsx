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
  title: "Ankit Pramanik | AI Digital Twin & Cloud Platform Engineer",
  description: "Chat with the AI Digital Twin of Ankit Pramanik, Senior DevOps & Cloud Platform Engineer. Powered by AWS Bedrock Nova and S3 Persistent Memory.",
  keywords: ["Ankit Pramanik", "DevOps Engineer", "Platform Engineering", "AWS Bedrock", "AI Digital Twin", "Kubernetes", "Terraform"],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#07090e] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
