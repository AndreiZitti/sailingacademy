import Image from 'next/image';
import Link from 'next/link';
import FAQAccordion from './FAQAccordion';
import QuickInfoBar from './QuickInfoBar';
import PricingTable from './PricingTable';

// Re-export PricingTier type for external use
export interface PricingTier {
  name: string;
  price: string;
  duration: string;
  features: string[];
  highlighted?: boolean;
  badgeText?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedService {
  name: string;
  href: string;
  image?: string;
  description?: string;
}

export interface QuickInfo {
  price?: string;
  duration?: string;
  capacity?: string;
  skillLevel?: string;
}

export interface ServicePageData {
  // Hero
  title: string;
  subtitle: string;
  heroImage: string;
  startingPrice: string;
  ctaText: string;
  ctaHref: string;

  // Quick info
  quickInfo: QuickInfo;

  // Content
  description: string; // HTML content
  included: string[]; // Checklist items

  // Pricing
  pricingTitle?: string;
  pricingSubtitle?: string;
  pricingTiers: PricingTier[];

  // FAQ
  faqTitle?: string;
  faqItems: FAQItem[];

  // Related services
  relatedTitle?: string;
  relatedServices: RelatedService[];

  // CTA
  whatsappNumber: string;
  phoneNumber: string;
  ctaSectionTitle?: string;
  ctaSectionSubtitle?: string;

  // SEO schema
  serviceName: string;
  serviceDescription: string;
  provider: string;
  areaServed: string;
}

interface ServicePageTemplateProps {
  data: ServicePageData;
}

function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={`${className} text-ocean-600 flex-shrink-0`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function PhoneIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

export default function ServicePageTemplate({ data }: ServicePageTemplateProps) {
  // Generate Service schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.serviceName,
    description: data.serviceDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: data.provider,
    },
    areaServed: {
      '@type': 'Place',
      name: data.areaServed,
    },
    offers: data.pricingTiers.map((tier) => ({
      '@type': 'Offer',
      name: tier.name,
      price: tier.price.replace(/[^0-9.,]/g, ''),
      priceCurrency: 'EUR',
    })),
  };

  // Format WhatsApp link
  const whatsappLink = `https://wa.me/${data.whatsappNumber.replace(/\D/g, '')}`;
  const phoneLink = `tel:${data.phoneNumber.replace(/\s/g, '')}`;

  return (
    <>
      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={data.heroImage}
            alt={data.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/80 via-ocean-900/60 to-ocean-900/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 text-balance">
              {data.title}
            </h1>
            <p className="text-lg md:text-xl text-ocean-100 mb-6 leading-relaxed">
              {data.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="text-3xl md:text-4xl font-bold text-white">
                {data.startingPrice}
              </span>
              <span className="text-ocean-200 text-lg">starting price</span>
            </div>
            <a
              href={data.ctaHref}
              className="btn-cta inline-flex items-center gap-2 text-lg"
            >
              <WhatsAppIcon className="w-6 h-6" />
              {data.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-white py-8 md:py-12 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <QuickInfoBar
            price={data.quickInfo.price}
            duration={data.quickInfo.duration}
            capacity={data.quickInfo.capacity}
            skillLevel={data.quickInfo.skillLevel}
          />
        </div>
      </section>

      {/* Description Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-8">About This Experience</h2>
            <div
              className="prose prose-lg prose-ocean mx-auto text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      {data.included.length > 0 && (
        <section className="section bg-ocean-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="section-title text-center mb-10">What&apos;s Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.included.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm"
                  >
                    <CheckIcon className="w-6 h-6 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {data.pricingTiers.length > 0 && (
        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <PricingTable
              tiers={data.pricingTiers}
              title={data.pricingTitle || 'Choose Your Package'}
              subtitle={data.pricingSubtitle}
            />
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {data.faqItems.length > 0 && (
        <section className="section bg-ocean-50">
          <div className="container mx-auto px-4">
            <FAQAccordion
              items={data.faqItems}
              title={data.faqTitle || 'Frequently Asked Questions'}
            />
          </div>
        </section>
      )}

      {/* Related Services Section */}
      {data.relatedServices.length > 0 && (
        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center mb-10">
              {data.relatedTitle || 'Explore More Activities'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.relatedServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group service-card block"
                >
                  {service.image && (
                    <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  )}
                  <h3 className="font-display font-bold text-ocean-900 text-lg group-hover:text-ocean-600 transition-colors">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="section bg-gradient-to-br from-ocean-600 to-ocean-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              {data.ctaSectionTitle || 'Ready to Get Started?'}
            </h2>
            <p className="text-ocean-100 text-lg mb-8">
              {data.ctaSectionSubtitle ||
                'Book your experience today or contact us for more information.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* WhatsApp Button */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta w-full sm:w-auto justify-center text-lg px-8"
              >
                <WhatsAppIcon className="w-6 h-6" />
                WhatsApp Us
              </a>
              {/* Phone Button */}
              <a
                href={phoneLink}
                className="btn-secondary w-full sm:w-auto justify-center text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-ocean-700 inline-flex items-center gap-2"
              >
                <PhoneIcon className="w-5 h-5" />
                {data.phoneNumber}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
