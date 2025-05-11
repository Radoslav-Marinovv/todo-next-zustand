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
  title: "Todo Next.js Zustand",
  description: "Todo application with Next.js and Zustand - no database, all todo's are stored at local-storage. Have TODO | ONGOING | DONE columns, all todo tickets can be dragged to different column.",
  keywords: [
    "Next.js",
    "Zustand",
    "Todo",
    "Drag and Drop",
    "Local Storage",
    "React",
  ],
  authors: [
    {
      name: "Radoslav Marinov",
      url: "https://radoslav-marinov-portfolio.vercel.app/#Portfolio",
    },
  ],
  creator: "Radoslav Marinov",
  publisher: "Radoslav Marinov",
  applicationName: "Todo Next.js Zustand",
  twitter: {
    card: "summary_large_image",
    title: "Todo Next.js Zustand",
    description:
      "Todo application with Next.js and Zustand - no database, all todo's are stored at local-storage. Have TODO | ONGOING | DONE columns, all todo tickets can be dragged to different column.",
    images: "/opengraph-image.png",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
        alt: "Todo Next.js Zustand",
      },
    ],
    title: "Todo Next.js Zustand",
    description:
      "Todo application with Next.js and Zustand - no database, all todo's are stored at local-storage. Have TODO | ONGOING | DONE columns, all todo tickets can be dragged to different column.",
    url: "https://todo-nextjs-zustand.vercel.app/",
    siteName: "Todo Next.js Zustand",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
