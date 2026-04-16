import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sailingacademy.ro'),
  title: {
    default: "Water Sports on Lake Herăstrău — Kayaks, SUPs, Electric Boats & Sailing | Sailing Academy",
    template: "%s | Sailing Academy Herăstrău",
  },
  description: "Water sports center on Lake Herăstrău in Bucharest. Rent kayaks, paddleboards, and electric boats (no license required), take sailing tours, or book sailing lessons with certified instructors. Open daily next to the Ferris Wheel in King Michael I Park.",
  keywords: [
    "water sports Bucharest",
    "boat rental Bucharest",
    "boat rental Herăstrău",
    "kayak rental Bucharest",
    "kayak Herăstrău",
    "SUP rental Bucharest",
    "paddleboard Bucharest",
    "electric boat rental Bucharest",
    "e-boat Herăstrău",
    "no license boat rental Bucharest",
    "things to do in Herăstrău",
    "things to do on Lake Herăstrău",
    "activities King Michael I Park Bucharest",
    "water activities Herăstrău park",
    "sailing Herăstrău",
    "sailing tour Lake Herăstrău",
    "sailing lessons Bucharest",
    "sailing school Bucharest",
    "kids sailing Bucharest",
    "FRY sailing certification Bucharest",
  ],
  authors: [{ name: "Sailing Academy Herăstrău" }],
  creator: "Sailing Academy Herăstrău",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    alternateLocale: "en_US",
    url: "https://www.sailingacademy.ro",
    siteName: "Sailing Academy Herăstrău",
    title: "Water Sports on Lake Herăstrău — Kayaks, SUPs, Electric Boats & Sailing",
    description: "Water sports center on Lake Herăstrău. Kayak, SUP and no-license electric boat rentals, plus sailing tours and FRY-certified sailing lessons. Open daily in King Michael I Park, Bucharest.",
    images: [
      {
        url: "/images/pierPreview.jpeg",
        width: 2048,
        height: 1152,
        alt: "Sailing Academy Herăstrău — Pier on Lake Herăstrău, Bucharest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Water Sports on Lake Herăstrău — Sailing Academy",
    description: "Kayaks, SUPs, no-license electric boats, sailing tours and lessons. Open daily on Lake Herăstrău, Bucharest.",
    images: ["/images/pierPreview.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.sailingacademy.ro",
    languages: {
      "en": "/en",
      "ro": "/ro",
    },
  },
  icons: {
    icon: "/logoSA.png",
    shortcut: "/logoSA.png",
    apple: "/logoSA.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Root layout is a pass-through — html/body are in [locale]/layout.tsx
  // so we can set <html lang> dynamically per locale
  return children;
}
