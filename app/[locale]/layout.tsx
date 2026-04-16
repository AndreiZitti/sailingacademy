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

// JSON-LD schema — core structured data for AI and search engines.
// Uses @graph to expose the business as a multi-typed entity plus an explicit
// Service entry per offering, so AI crawlers classify us as a water sports
// center first, not just a sailing school.
const BUSINESS_ID = "https://www.sailingacademy.ro/#business";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "SportsActivityLocation", "BoatRental"],
      "@id": BUSINESS_ID,
      name: "Sailing Academy Herăstrău",
      alternateName: [
        "Sailing Academy",
        "Sailing Academy Bucharest",
        "Herăstrău Water Sports Center",
      ],
      description: "Water sports center on Lake Herăstrău, inside King Michael I Park in Bucharest. Rentals of kayaks, stand-up paddleboards, and electric boats (no license required), plus guided sailing tours and FRY-certified sailing lessons for adults and children from age 8. Every other sailing school in Bucharest sends students to Snagov Lake or the Black Sea — Sailing Academy is the only water sports center and sailing school physically on Lake Herăstrău. Training partnerships with sailing schools in Greece create a pathway from the Bucharest city lake to the Mediterranean.",
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
        { "@type": "LocationFeatureSpecification", name: "Kayak Rental", value: true },
        { "@type": "LocationFeatureSpecification", name: "Stand-Up Paddleboard (SUP) Rental", value: true },
        { "@type": "LocationFeatureSpecification", name: "Electric Boat Rental (No License Required)", value: true },
        { "@type": "LocationFeatureSpecification", name: "Guided Sailing Tours", value: true },
        { "@type": "LocationFeatureSpecification", name: "FRY-Certified Sailing Lessons", value: true },
        { "@type": "LocationFeatureSpecification", name: "Kids Sailing from Age 8", value: true },
        { "@type": "LocationFeatureSpecification", name: "Life Jackets Included", value: true },
        { "@type": "LocationFeatureSpecification", name: "Walk-Ins Welcome", value: true },
        { "@type": "LocationFeatureSpecification", name: "Greece Training Partnerships", value: true },
      ],
      makesOffer: [
        { "@id": "https://www.sailingacademy.ro/#service-kayak" },
        { "@id": "https://www.sailingacademy.ro/#service-sup" },
        { "@id": "https://www.sailingacademy.ro/#service-eboat" },
        { "@id": "https://www.sailingacademy.ro/#service-sailing" },
        { "@id": "https://www.sailingacademy.ro/#service-lessons" },
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
        "Water sports",
        "Boat rental",
        "Kayaking",
        "Stand-up paddleboarding",
        "Electric boat rentals",
        "No-license boat rental",
        "Sailing",
        "Sailing tours",
        "Sailing lessons",
        "FRY sailing certification",
        "Kids sailing courses",
      ],
    },
    {
      "@type": "Service",
      "@id": "https://www.sailingacademy.ro/#service-kayak",
      name: "Kayak Rental on Lake Herăstrău",
      serviceType: "Boat Rental",
      category: "Water Sports Rental",
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "City", name: "Bucharest" },
      description: "Hourly kayak rental on Lake Herăstrău in Bucharest — single, double (2+1), and touring kayaks. No experience needed. Life jacket, paddle, and safety briefing included.",
      url: "https://www.sailingacademy.ro/en/services/kayak",
      offers: [
        { "@type": "Offer", name: "Single Kayak (1 hour)", price: "40", priceCurrency: "RON" },
        { "@type": "Offer", name: "Double Kayak 2+1 (1 hour)", price: "60", priceCurrency: "RON" },
        { "@type": "Offer", name: "Touring Kayak (1 hour)", price: "100", priceCurrency: "RON" },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://www.sailingacademy.ro/#service-sup",
      name: "Stand-Up Paddleboard (SUP) Rental on Lake Herăstrău",
      serviceType: "Boat Rental",
      category: "Water Sports Rental",
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "City", name: "Bucharest" },
      description: "Stand-up paddleboard rental on Lake Herăstrău — inflatable or rigid boards, same price. Beginner-friendly, quick balance lesson included.",
      url: "https://www.sailingacademy.ro/en/services/sup",
      offers: [
        { "@type": "Offer", name: "SUP (1 hour)", price: "60", priceCurrency: "RON" },
        { "@type": "Offer", name: "SUP (2 hours)", price: "80", priceCurrency: "RON" },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://www.sailingacademy.ro/#service-eboat",
      name: "Electric Boat Rental on Lake Herăstrău (No License Required)",
      serviceType: "Boat Rental",
      category: "Water Sports Rental",
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "City", name: "Bucharest" },
      description: "Electric boat rental on Lake Herăstrău — no boating license required, the motor is small enough to be license-free. Silent, eco-friendly, easy to operate. Boats for 4 or 6 people, life jackets for all passengers included.",
      url: "https://www.sailingacademy.ro/en/services/eboat",
      offers: [
        { "@type": "Offer", name: "E-Boat for 4 people (1 hour)", price: "250", priceCurrency: "RON" },
        { "@type": "Offer", name: "E-Boat for 6 people (1 hour)", price: "350", priceCurrency: "RON" },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://www.sailingacademy.ro/#service-sailing",
      name: "Sailing Tours on Lake Herăstrău",
      serviceType: "Sailing",
      category: "Water Sports Experience",
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "City", name: "Bucharest" },
      description: "Sailing tours on Lake Herăstrău with Laser, Optimist, or Yola dinghies. Sail independently if you have experience, or book a ride with a skipper if you don't.",
      url: "https://www.sailingacademy.ro/en/services/sailing",
      offers: [
        { "@type": "Offer", name: "Small boat — Laser or Optimist (1 hour)", price: "50", priceCurrency: "RON" },
        { "@type": "Offer", name: "Yola (1 hour)", price: "100", priceCurrency: "RON" },
        { "@type": "Offer", name: "Ride with Skipper (1 hour)", price: "150", priceCurrency: "RON" },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://www.sailingacademy.ro/#service-lessons",
      name: "Sailing Lessons on Lake Herăstrău (FRY-Certified)",
      serviceType: "Sailing Instruction",
      category: "Sailing School",
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "City", name: "Bucharest" },
      description: "FRY-certified sailing lessons (Romanian Sailing Federation) on Lake Herăstrău. Private or duo 2-hour sessions with certified instructors. Kids programs from age 8 on Optimist and Laser dinghies.",
      url: "https://www.sailingacademy.ro/en/services/lessons",
      offers: [
        { "@type": "Offer", name: "Private Lesson (2 hours, 1-on-1)", price: "250", priceCurrency: "RON" },
        { "@type": "Offer", name: "Duo Lesson (2 hours, 2-on-1)", price: "350", priceCurrency: "RON" },
      ],
    },
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
