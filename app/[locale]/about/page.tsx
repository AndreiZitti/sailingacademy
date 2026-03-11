import { getDictionary, Locale } from '@/lib/dictionaries';
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.about.title,
    description: dict.about.subtitle,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const whyChooseUs = [
    {
      title: dict.about.why1Title,
      text: dict.about.why1Text,
      icon: (
        <svg className="w-8 h-8 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: dict.about.why2Title,
      text: dict.about.why2Text,
      icon: (
        <svg className="w-8 h-8 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: dict.about.why3Title,
      text: dict.about.why3Text,
      icon: (
        <svg className="w-8 h-8 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: dict.about.why4Title,
      text: dict.about.why4Text,
      icon: (
        <svg className="w-8 h-8 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  // Organization schema — references the main LocalBusiness entity from root layout
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.sailingacademy.ro/#business',
    name: 'Sailing Academy Herăstrău',
    description: dict.about.subtitle,
    url: 'https://www.sailingacademy.ro',
    telephone: '+40730333755',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Șos. Nordului 7-9',
      addressLocality: 'București',
      addressRegion: 'Sector 1',
      postalCode: '014101',
      addressCountry: 'RO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.4825634,
      longitude: 26.0835196,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:30',
      closes: '20:00',
    },
    sameAs: [
      'https://www.facebook.com/SailingAcademyBucharest',
      'https://www.instagram.com/sailingacademy.ro',
      'https://www.google.com/maps/place/Sailing+Academy+Herastrau',
    ],
    image: 'https://www.sailingacademy.ro/images/ClubPhoto.jpg',
    priceRange: '$$',
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

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
            {dict.about.title}
          </h1>
          <p className="text-xl text-ocean-100 max-w-2xl mx-auto">
            {dict.about.subtitle}
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/ClubPhoto.jpg"
                  alt="Sailing Academy Club"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Decorative badge */}
              <div className="absolute -bottom-4 -right-4 bg-ocean-600 text-white px-6 py-3 rounded-xl shadow-lg">
                <span className="text-2xl font-bold">2020</span>
                <span className="text-sm block opacity-90">Est.</span>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-ocean-900 mb-6">
                {dict.about.storyTitle}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {dict.about.storyText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section bg-ocean-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="md:order-2">
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/Concurs.jpg"
                  alt="Sailing Competition"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>

            <div className="md:order-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-ocean-900 mb-6">
                {dict.about.missionTitle}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {dict.about.missionText}
              </p>

              {/* Mission highlights */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{locale === 'ro' ? 'Accesibil pentru toate vârstele' : 'Accessible for all ages'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{locale === 'ro' ? 'Siguranță pe primul loc' : 'Safety first approach'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{locale === 'ro' ? 'Experiențe memorabile' : 'Memorable experiences'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">{dict.about.whyChooseTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-ocean-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-ocean-900 mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section bg-ocean-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Map/Image Area */}
            <div className="relative">
              <div className="relative h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/entrance.jpg"
                  alt="Sailing Academy Location"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Location overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <svg className="w-5 h-5 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-semibold text-ocean-900">{dict.contact.address}</span>
                    </div>
                    <p className="text-sm text-gray-600">{dict.contact.nearFerrisWheel}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-ocean-900 mb-6">
                {dict.about.locationTitle}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {dict.about.locationText}
              </p>

              {/* Quick info cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-5 h-5 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-ocean-900">{locale === 'ro' ? 'Program' : 'Hours'}</span>
                  </div>
                  <p className="text-sm text-gray-600">9:30 - 20:00</p>
                  <p className="text-xs text-gray-500">{locale === 'ro' ? 'Zilnic' : 'Daily'}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-5 h-5 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="font-semibold text-ocean-900">{locale === 'ro' ? 'Telefon' : 'Phone'}</span>
                  </div>
                  <p className="text-sm text-gray-600">+40 730 333 755</p>
                </div>
              </div>

              {/* Get directions button */}
              <a
                href="https://maps.google.com/?q=Soseaua+Nordului+7-9+Bucharest"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-ocean-600 font-semibold hover:text-ocean-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                {locale === 'ro' ? 'Deschide in Google Maps' : 'Open in Google Maps'}
              </a>
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
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/20 rounded-full"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {dict.about.ctaTitle}
          </h2>
          <p className="text-xl text-ocean-100 mb-8 max-w-2xl mx-auto">
            {dict.about.ctaSubtitle}
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
