import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sailingacademy.ro'),
  title: {
    default: "Sailing Academy Herăstrău — Sailing Tours, Lessons & Water Sports in Bucharest",
    template: "%s | Sailing Academy Herăstrău",
  },
  description: "The only sailing school on Lake Herăstrău, inside Bucharest's biggest park. Guided sailing tours, FRY-certified sailing lessons, kayak & SUP rentals, e-boat cruises. Kids from age 8. 5 min from Aviatorilor metro.",
  keywords: [
    "sailing Herăstrău",
    "sailing lessons Bucharest",
    "kayak Herăstrău",
    "water activities Herăstrău park",
    "things to do in Herăstrău",
    "sailing tour Lake Herăstrău",
    "sailing school Bucharest",
    "kids sailing Bucharest",
    "SUP rental Bucharest",
    "e-boat Herăstrău",
    "activities King Michael I Park Bucharest",
    "FRY sailing certification Bucharest",
    "boat rental Herăstrău",
    "water sports Bucharest",
  ],
  authors: [{ name: "Sailing Academy Herăstrău" }],
  creator: "Sailing Academy Herăstrău",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    alternateLocale: "en_US",
    url: "https://www.sailingacademy.ro",
    siteName: "Sailing Academy Herăstrău",
    title: "Sailing Academy Herăstrău — Sailing Tours, Lessons & Water Sports",
    description: "The only sailing school on Lake Herăstrău. Guided sailing tours, FRY-certified lessons, kayaks, SUPs, e-boats. Kids from age 8. Open daily in King Michael I Park, Bucharest.",
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
    title: "Sailing Academy Herăstrău",
    description: "The only sailing school on Lake Herăstrău. Tours, lessons, kayaks, SUPs, e-boats. Open daily in Bucharest.",
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
