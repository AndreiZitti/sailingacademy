import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sailingacademy.ro'),
  title: {
    default: "Sailing Academy Herastrau - Kayak, SUP & Sailing Rentals in Bucharest",
    template: "%s | Sailing Academy Herastrau",
  },
  description: "Rent kayaks, SUP boards, electric boats, and sailing boats on Herastrau Lake in Bucharest. Sailing lessons available. Open daily near the Ferris Wheel.",
  keywords: ["sailing", "kayak rental", "SUP rental", "Herastrau Lake", "Bucharest", "boat rental", "sailing lessons", "water sports"],
  authors: [{ name: "Sailing Academy Herastrau" }],
  creator: "Sailing Academy Herastrau",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    alternateLocale: "en_US",
    url: "https://www.sailingacademy.ro",
    siteName: "Sailing Academy Herastrau",
    title: "Sailing Academy Herastrau - Kayak, SUP & Sailing Rentals",
    description: "Rent kayaks, SUP boards, electric boats, and sailing boats on Herastrau Lake in Bucharest.",
    images: [
      {
        url: "/images/apus.jpg",
        width: 1200,
        height: 630,
        alt: "Sailing Academy Herastrau - Sunset on the lake",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sailing Academy Herastrau",
    description: "Rent kayaks, SUP boards, electric boats, and sailing boats on Herastrau Lake in Bucharest.",
    images: ["/images/apus.jpg"],
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

// LocalBusiness JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.sailingacademy.ro",
  name: "Sailing Academy Herastrau",
  alternateName: "Sailing Academy",
  description: "Water sports rental and sailing lessons on Herastrau Lake in Bucharest. Kayaks, SUP boards, electric boats, and sailing boats available.",
  url: "https://www.sailingacademy.ro",
  telephone: "+40730333755",
  email: "contact@sailingacademy.ro",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Șos. Nordului 7-9",
    addressLocality: "București",
    addressRegion: "Sector 1",
    postalCode: "014101",
    addressCountry: "RO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.4825634,
    longitude: 26.0835196,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:30",
    closes: "20:00",
  },
  image: [
    "https://www.sailingacademy.ro/images/apus.jpg",
    "https://www.sailingacademy.ro/images/bigBoat.JPG",
    "https://www.sailingacademy.ro/images/SUP_Service.jpg",
  ],
  priceRange: "$$",
  currenciesAccepted: "RON",
  paymentAccepted: "Cash, Card",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Kayak Rental" },
    { "@type": "LocationFeatureSpecification", name: "SUP Rental" },
    { "@type": "LocationFeatureSpecification", name: "Electric Boat Rental" },
    { "@type": "LocationFeatureSpecification", name: "Sailing Lessons" },
    { "@type": "LocationFeatureSpecification", name: "Life Jackets Included" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "50",
  },
  sameAs: [
    "https://www.facebook.com/SailingAcademyBucharest",
    "https://www.instagram.com/sailingacademy.ro",
    "https://www.google.com/maps/place/Sailing+Academy+Herastrau",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
