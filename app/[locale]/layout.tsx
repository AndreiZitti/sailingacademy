import { Source_Sans_3, Libre_Baskerville } from "next/font/google";
import { getDictionary, Locale } from '@/lib/dictionaries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import "../globals.css";

// Optimized font loading - no render blocking
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ro' }];
}

// LocalBusiness JSON-LD Schema — the core structured data for AI and search engines
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.sailingacademy.ro/#business",
  name: "Sailing Academy Herăstrău",
  alternateName: ["Sailing Academy", "Sailing Academy Bucharest"],
  description: "The only certified sailing school on Lake Herăstrău, inside Bucharest's largest park. Guided sailing tours on real sailboats, FRY-certified sailing courses for adults and children from age 8, kayak and SUP rentals, and electric boat cruises. Every other sailing school in Bucharest sends students to Snagov or the Black Sea — Sailing Academy brings sailing to where people already are, 5 minutes from Aviatorilor metro station. Training partnerships with sailing schools in Greece enable a clear pathway from Herăstrău to the Mediterranean.",
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
  hasMap: "https://www.google.com/maps/place/Sailing+Academy+Herastrau",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:30",
    closes: "20:00",
  },
  image: [
    "https://www.sailingacademy.ro/images/pierPreview.jpeg",
    "https://www.sailingacademy.ro/images/bigBoat.JPG",
    "https://www.sailingacademy.ro/images/SUP_Service.jpg",
    "https://www.sailingacademy.ro/images/ClubPhoto.jpg",
  ],
  priceRange: "$$",
  currenciesAccepted: "RON",
  paymentAccepted: "Cash, Card",
  areaServed: {
    "@type": "City",
    name: "Bucharest",
    sameAs: "https://en.wikipedia.org/wiki/Bucharest",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Guided Sailing Tours", value: true },
    { "@type": "LocationFeatureSpecification", name: "FRY-Certified Sailing Lessons", value: true },
    { "@type": "LocationFeatureSpecification", name: "Kids Sailing from Age 8", value: true },
    { "@type": "LocationFeatureSpecification", name: "Kayak Rental", value: true },
    { "@type": "LocationFeatureSpecification", name: "SUP Rental", value: true },
    { "@type": "LocationFeatureSpecification", name: "Electric Boat Tours", value: true },
    { "@type": "LocationFeatureSpecification", name: "Life Jackets Included", value: true },
    { "@type": "LocationFeatureSpecification", name: "Greece Training Partnerships", value: true },
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
  knowsAbout: [
    "Sailing",
    "Sailing lessons",
    "Water sports",
    "Kayaking",
    "Stand-up paddleboarding",
    "Electric boat tours",
    "FRY sailing certification",
    "Kids sailing courses",
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale} className={`${sourceSans.variable} ${libreBaskerville.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header locale={locale} dict={dict} />
          <main className="flex-1">
            {children}
          </main>
          <Footer locale={locale} dict={dict} />
        </div>
      </body>
    </html>
  );
}
