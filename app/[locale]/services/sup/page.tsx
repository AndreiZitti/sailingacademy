import { getDictionary, Locale } from '@/lib/dictionaries';
import { Metadata } from 'next';
import ServicePageTemplate from '@/components/ServicePageTemplate';

type Props = {
  params: Promise<{ locale: string }>;
};

// Type for service object keys in dictionary
type ServiceKey = 'kayak' | 'sup' | 'eboat' | 'sailing' | 'lessons';
type ServiceData = { title: string; description: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.services.sup.title} | Sailing Academy`,
    description: dict.services.sup.description,
  };
}

export default async function SUPPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const service = dict.services.sup;

  // Map dictionary data to ServicePageData structure
  const pageData = {
    title: service.title,
    subtitle: service.heroSubtitle,
    heroImage: '/images/SUP_Service.jpg',
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

    relatedServices: service.relatedServices.map((key: string) => {
      const relatedService = dict.services[key as ServiceKey] as ServiceData;
      return {
        name: relatedService.title,
        href: `/${locale}/services/${key}`,
        description: relatedService.description,
      };
    }),

    whatsappNumber: '+40730333755',
    phoneNumber: '+40730333755',

    serviceName: service.title,
    serviceDescription: service.description,
    provider: 'Sailing Academy Herăstrău',
    areaServed: 'Bucharest, Romania',

    locale,
    serviceSlug: 'sup',
    servicesLabel: dict.nav.services,
  };

  return <ServicePageTemplate data={pageData} />;
}
