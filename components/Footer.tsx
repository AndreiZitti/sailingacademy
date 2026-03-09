import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  locale: string;
  dict: {
    nav: {
      services: string;
      contact: string;
    };
    contact: {
      address: string;
      nearFerrisWheel: string;
      hours: string;
    };
    footer: {
      rights: string;
      links: string;
      followUs: string;
    };
  };
}

export default function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const phoneNumber = '+40730333755';
  const whatsappLink = 'https://wa.me/40730333755';
  const otherLocale = locale === 'en' ? 'ro' : 'en';

  return (
    <footer className="relative bg-ocean-900 text-white overflow-hidden">
      {/* Wave Pattern Top Border */}
      <div className="absolute top-0 left-0 right-0 h-6 overflow-hidden">
        <svg
          viewBox="0 0 1200 30"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,30 C200,10 400,20 600,15 C800,10 1000,25 1200,10 L1200,0 L0,0 Z"
            fill="#0c4a6e"
            className="opacity-50"
          />
          <path
            d="M0,25 C150,15 350,25 550,18 C750,12 950,22 1200,15 L1200,0 L0,0 Z"
            fill="#0c4a6e"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center mb-5 group">
              <div className="relative h-10 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-all">
                <Image
                  src="/logoSA.png"
                  alt="Sailing Academy"
                  width={87}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-ocean-200 text-sm leading-relaxed">
              {locale === 'ro'
                ? 'Aventura ta pe apă începe aici. Închirieri de caiace, SUP, bărci electrice și lecții de navigație pe lacul Herăstrău.'
                : 'Your water adventure starts here. Kayak, SUP, e-boat rentals and sailing lessons on Herastrau Lake.'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-sand-400 mb-4 text-sm uppercase tracking-wider">
              {dict.footer.links}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${locale}/services`}
                  className="text-ocean-200 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 group-hover:bg-sand-400 transition-colors"></span>
                  {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-ocean-200 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 group-hover:bg-sand-400 transition-colors"></span>
                  {dict.nav.contact}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${otherLocale}`}
                  className="text-ocean-200 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 group-hover:bg-sand-400 transition-colors"></span>
                  {otherLocale === 'en' ? 'English' : 'Română'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-display font-semibold text-sand-400 mb-4 text-sm uppercase tracking-wider">
              {locale === 'ro' ? 'Locație' : 'Location'}
            </h3>
            <address className="not-italic space-y-2 text-ocean-200">
              <p className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 text-ocean-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  {dict.contact.address}<br />
                  <span className="text-ocean-300 text-sm">{dict.contact.nearFerrisWheel}</span>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5 text-ocean-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {dict.contact.hours}
              </p>
            </address>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-sand-400 mb-4 text-sm uppercase tracking-wider">
              {dict.footer.followUs}
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-white px-4 py-3 rounded-xl transition-all group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="font-medium">WhatsApp</span>
              </a>
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex items-center gap-3 bg-ocean-700/50 hover:bg-ocean-600 text-ocean-200 hover:text-white px-4 py-3 rounded-xl transition-all group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium">{phoneNumber}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-ocean-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-ocean-400 text-sm">
              &copy; {currentYear} Sailing Academy. {dict.footer.rights}.
            </p>
            <div className="flex items-center gap-4">
              {/* Decorative anchor icon */}
              <svg className="w-5 h-5 text-ocean-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 16V14C18.76 14 16.84 13.04 15.4 11.32L14.06 9.72C13.68 9.26 13.12 9 12.53 9H11.48C10.89 9 10.33 9.26 9.95 9.72L8.61 11.32C7.16 13.04 5.24 14 3 14V16C5.77 16 8.19 14.83 10 12.75V22H14V12.75C15.81 14.83 18.23 16 21 16Z"/>
              </svg>
              <span className="text-ocean-500 text-sm">Herăstrău Lake, Bucharest</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
