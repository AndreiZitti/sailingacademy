import { getDictionary, Locale } from '@/lib/dictionaries';
import { Metadata } from 'next';
import ServicePageTemplate from '@/components/ServicePageTemplate';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.services.eboat.title} | Sailing Academy`,
    description: dict.services.eboat.description,
  };
}

export default async function EBoatPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const service = dict.services.eboat;

  // Map dictionary data to ServicePageData structure
  const pageData = {
    title: service.title,
    subtitle: service.heroSubtitle,
    heroImage: '/images/boat_preview.png',
    startingPrice: service.startingPrice,
    ctaText: dict.common.bookNow,
    ctaHref: `https://wa.me/40730333755`,

    quickInfo: {
      price: service.quickInfo.price,
      duration: service.quickInfo.duration,
      capacity: service.quickInfo.capacity,
      skillLevel: service.quickInfo.skillLevel,
    },

    description: service.detailedDescription,
    included: service.included,

    pricingTitle: service.pricingTitle,
    pricingSubtitle: service.pricingSubtitle,
    pricingTiers: service.pricingTiers,

    faqTitle: locale === 'ro' ? 'Intrebari Frecvente' : 'Frequently Asked Questions',
    faqItems: service.faq,

    relatedServices: service.relatedServices.map((key: string) => ({
      name: dict.services[key as keyof typeof dict.services].title,
      href: `/${locale}/services/${key}`,
      description: dict.services[key as keyof typeof dict.services].description,
    })),

    whatsappNumber: '+40730333755',
    phoneNumber: '+40730333755',

    serviceName: service.title,
    serviceDescription: service.description,
    provider: 'Sailing Academy Herastrau',
    areaServed: 'Bucharest, Romania',
  };

  return <ServicePageTemplate data={pageData} />;
}
