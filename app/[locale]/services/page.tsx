import { getDictionary, Locale } from '@/lib/dictionaries';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.services.title,
    description: dict.services.pageSubtitle,
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const rentals = [
    {
      key: 'kayak',
      image: '/images/canoe.jpeg',
      badge: dict.home.popular,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15l5.12-5.12A3 3 0 0110.24 9H13a2 2 0 012 2v2.76a3 3 0 01-.88 2.12L9 21" />
        </svg>
      ),
    },
    {
      key: 'sup',
      image: '/images/SUP_Service.jpg',
      badge: null,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      key: 'eboat',
      image: '/images/waterverse_service.jpeg',
      badge: dict.home.noLicense,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  const experiences = [
    {
      key: 'sailing',
      image: '/images/bigBoat.JPG',
      badge: null,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15l5.12-5.12A3 3 0 0110.24 9H13a2 2 0 012 2v2.76a3 3 0 01-.88 2.12L9 21" />
        </svg>
      ),
    },
    {
      key: 'lessons',
      image: '/images/sailingpermit_service.jpg',
      badge: null,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  type ServiceKey = 'kayak' | 'sup' | 'eboat' | 'sailing' | 'lessons';

  const getService = (key: ServiceKey) => dict.services[key] as {
    title: string;
    description: string;
    longDesc: string;
    price: string;
    features: string[];
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-700">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 border border-white rounded-full"></div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z" fill="white" fillOpacity="0.1"/>
            <path d="M0,80 C200,40 400,100 600,60 C800,20 1000,80 1200,50 L1200,120 L0,120 Z" fill="white" fillOpacity="0.2"/>
            <path d="M0,100 C150,80 350,110 550,90 C750,70 950,100 1200,85 L1200,120 L0,120 Z" fill="white"/>
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            {dict.services.title}
          </h1>
          <p className="text-xl text-ocean-100 max-w-2xl mx-auto">
            {dict.services.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Rentals Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-ocean-100 text-ocean-700 rounded-full text-sm font-semibold mb-4">
              {dict.services.rentals}
            </span>
            <h2 className="section-title">{dict.services.rentals}</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              {dict.services.noExperience}
            </p>
          </div>

          <div className="space-y-16">
            {rentals.map((item, index) => {
              const service = getService(item.key as ServiceKey);
              const isReversed = index % 2 === 1;

              return (
                <article
                  key={item.key}
                  id={item.key}
                  className="scroll-mt-24"
                >
                  <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${isReversed ? 'md:flex-row-reverse' : ''}`}>
                    {/* Image */}
                    <div className={`relative ${isReversed ? 'md:order-2' : ''}`}>
                      <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={item.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                        {item.badge && (
                          <span className="absolute top-4 right-4 bg-sand-400 text-ocean-900 text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Price badge */}
                      <div className="absolute -bottom-4 left-6 bg-ocean-600 text-white px-6 py-3 rounded-xl shadow-lg">
                        <span className="text-sm opacity-90">{dict.services.priceFrom}</span>
                        <span className="text-2xl font-bold ml-1">{service.price}</span>
                        <span className="text-sm opacity-90">{dict.services.perHour}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${isReversed ? 'md:order-1' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center text-ocean-600">
                          {item.icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-ocean-900">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {service.longDesc}
                      </p>

                      {/* Features */}
                      <ul className="grid grid-cols-2 gap-3 mb-8">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap gap-4">
                        <Link
                          href={`/${locale}/services/${item.key}`}
                          className="btn-primary inline-flex items-center gap-2"
                        >
                          {dict.home.learnMore}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <a
                          href="https://wa.me/40730333755"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-cta inline-flex"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          {dict.services.bookNow}
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="section bg-ocean-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-ocean-200 text-ocean-700 rounded-full text-sm font-semibold mb-4">
              {dict.services.experiences}
            </span>
            <h2 className="section-title">{dict.services.experiences}</h2>
          </div>

          <div className="space-y-16">
            {experiences.map((item, index) => {
              const service = getService(item.key as ServiceKey);
              const isReversed = index % 2 === 1;

              return (
                <article
                  key={item.key}
                  id={item.key}
                  className="scroll-mt-24"
                >
                  <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${isReversed ? 'md:flex-row-reverse' : ''}`}>
                    {/* Image */}
                    <div className={`relative ${isReversed ? 'md:order-2' : ''}`}>
                      <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={item.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                        {item.badge && (
                          <span className="absolute top-4 right-4 bg-sand-400 text-ocean-900 text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Price badge */}
                      <div className="absolute -bottom-4 left-6 bg-ocean-700 text-white px-6 py-3 rounded-xl shadow-lg">
                        <span className="text-sm opacity-90">{dict.services.priceFrom}</span>
                        <span className="text-2xl font-bold ml-1">{service.price}</span>
                        <span className="text-sm opacity-90">{dict.services.perHour}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${isReversed ? 'md:order-1' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-ocean-200 flex items-center justify-center text-ocean-700">
                          {item.icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-ocean-900">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {service.longDesc}
                      </p>

                      {/* Features */}
                      <ul className="grid grid-cols-2 gap-3 mb-8">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap gap-4">
                        <Link
                          href={`/${locale}/services/${item.key}`}
                          className="btn-primary inline-flex items-center gap-2"
                        >
                          {dict.home.learnMore}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <a
                          href="https://wa.me/40730333755"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-cta inline-flex"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          {dict.services.bookNow}
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipment Info */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {dict.services.equipmentIncluded}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {dict.services.lifeJacketIncluded}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {dict.services.noExperience}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-700 to-ocean-900"></div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white rounded-full"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {dict.home.ctaTitle}
          </h2>
          <p className="text-xl text-ocean-100 mb-8 max-w-2xl mx-auto">
            {dict.home.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/40730333755"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta text-lg px-8 py-4"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {dict.home.ctaWhatsapp}
            </a>
            <a
              href="tel:+40730333755"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all border border-white/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {dict.home.ctaCall}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
