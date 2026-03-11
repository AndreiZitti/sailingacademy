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
    title: dict.contact.title,
    description: `${dict.contact.address} - ${dict.contact.hours}`,
  };
}

const reviews = [
  {
    name: "Dan Popescu",
    rating: 5,
    text: "Maybe the best club for initiating children in the sport of sailing. In Bucharest.",
    initial: "D",
    color: "bg-ocean-500",
  },
  {
    name: "Cristian Firca",
    rating: 5,
    text: "Kids have lots of fun! Staff are friendly and well trained! Highly recommended!",
    initial: "C",
    color: "bg-green-500",
  },
  {
    name: "Daniela Meghea",
    rating: 5,
    text: "Wonderful place! A lot of joy and fun for kids!",
    initial: "D",
    color: "bg-purple-500",
  },
  {
    name: "Mik P",
    rating: 5,
    text: "All people here are friendly",
    initial: "M",
    color: "bg-sand-400",
  },
  {
    name: "Jorge Mota Pinto",
    rating: 5,
    text: "Nice spot for SUP. Good SUP boards",
    initial: "J",
    color: "bg-red-500",
  },
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

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
            {dict.contact.title}
          </h1>
          <p className="text-xl text-ocean-100 max-w-2xl mx-auto">
            {dict.contact.nearFerrisWheel}
          </p>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Location */}
            <div className="text-center p-8 rounded-2xl bg-ocean-50 hover:bg-ocean-100 transition-colors">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-ocean-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-ocean-900 mb-2">
                {dict.contact.visitUs}
              </h3>
              <p className="text-gray-600 mb-1">{dict.contact.address}</p>
              <p className="text-ocean-600 font-medium">{dict.contact.nearFerrisWheel}</p>
            </div>

            {/* Hours */}
            <div className="text-center p-8 rounded-2xl bg-ocean-50 hover:bg-ocean-100 transition-colors">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-ocean-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-ocean-900 mb-2">
                {locale === 'ro' ? 'Program' : 'Hours'}
              </h3>
              <p className="text-gray-600">{dict.contact.hours}</p>
              <p className="text-sm text-gray-500 mt-2">
                {locale === 'ro' ? 'Dependent de vreme' : 'Weather dependent'}
              </p>
            </div>

            {/* Phone */}
            <div className="text-center p-8 rounded-2xl bg-ocean-50 hover:bg-ocean-100 transition-colors">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-ocean-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-ocean-900 mb-2">
                {locale === 'ro' ? 'Telefon' : 'Phone'}
              </h3>
              <a
                href="tel:+40730333755"
                className="text-ocean-600 font-semibold text-lg hover:text-ocean-700 transition-colors"
              >
                {dict.contact.phone}
              </a>
              <p className="text-sm text-gray-500 mt-2">
                {locale === 'ro' ? 'Sau WhatsApp' : 'Or WhatsApp'}
              </p>
            </div>

            {/* Email */}
            <div className="text-center p-8 rounded-2xl bg-ocean-50 hover:bg-ocean-100 transition-colors">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-ocean-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-ocean-900 mb-2">
                Email
              </h3>
              <a
                href={`mailto:${dict.contact.email}`}
                className="text-ocean-600 font-semibold text-lg hover:text-ocean-700 transition-colors"
              >
                {dict.contact.email}
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://maps.google.com/maps?q=Sailing+Academy+Herastrau,+Bucharest,+Romania&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sailing Academy - Herastrau Location"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section bg-ocean-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <h2 className="section-title">{dict.contact.whatVisitorsSay}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <article
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {review.initial}
                  </div>
                  <div>
                    <h4 className="font-semibold text-ocean-900">{review.name}</h4>
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">&ldquo;{review.text}&rdquo;</p>
              </article>
            ))}
          </div>

          {/* Google Reviews Link */}
          <div className="text-center mt-10">
            <a
              href="https://www.google.com/maps/place/Sailing+Academy+Herastrau/@44.4825634,26.0809447,17z/data=!4m8!3m7!1s0x40b201f24158a8c9:0x847c5cdce8e6c36d!8m2!3d44.4825634!4d26.0835196!9m1!1b1!16s%2Fg%2F11c1qm6_9t"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-ocean-600 hover:text-ocean-700 font-medium transition-colors"
            >
              {locale === 'ro' ? 'Vezi toate recenziile pe Google' : 'See all reviews on Google'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
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
            {dict.contact.readyToBook}
          </h2>
          <p className="text-xl text-ocean-100 mb-8 max-w-2xl mx-auto">
            {dict.contact.bookingCta}
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
