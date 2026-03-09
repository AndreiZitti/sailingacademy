'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  locale: string;
  dict: {
    nav: {
      home: string;
      services: string;
      about: string;
      faq: string;
      contact: string;
      callUs: string;
    };
  };
}

export default function Header({ locale, dict }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Get the path for the other locale (preserves current page)
  const getLocaleSwitchPath = () => {
    const otherLocale = locale === 'en' ? 'ro' : 'en';
    // Replace the locale segment in the path
    const segments = pathname.split('/');
    segments[1] = otherLocale; // The locale is always the first segment after /
    return segments.join('/');
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const otherLocale = locale === 'en' ? 'ro' : 'en';
  const phoneNumber = '+40730333755';
  const whatsappLink = `https://wa.me/40730333755`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-full ring-2 ring-ocean-200 group-hover:ring-ocean-400 transition-all">
              <Image
                src="/logoSA.png"
                alt="Sailing Academy"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className={`font-display text-xl font-semibold tracking-tight hidden sm:block transition-colors ${
              isScrolled ? 'text-ocean-900' : 'text-white drop-shadow-lg'
            }`}>
              Sailing Academy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href={`/${locale}/services`}
              className={`nav-link font-medium transition-colors ${
                isScrolled
                  ? 'text-ocean-700 hover:text-ocean-900'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {dict.nav.services}
            </Link>
            <Link
              href={`/${locale}/about`}
              className={`nav-link font-medium transition-colors ${
                isScrolled
                  ? 'text-ocean-700 hover:text-ocean-900'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {dict.nav.about}
            </Link>
            <Link
              href={`/${locale}/faq`}
              className={`nav-link font-medium transition-colors ${
                isScrolled
                  ? 'text-ocean-700 hover:text-ocean-900'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {dict.nav.faq}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className={`nav-link font-medium transition-colors ${
                isScrolled
                  ? 'text-ocean-700 hover:text-ocean-900'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {dict.nav.contact}
            </Link>

            {/* Language Switcher */}
            <Link
              href={getLocaleSwitchPath()}
              className={`text-sm font-bold uppercase px-3 py-1 rounded-full border-2 transition-all ${
                isScrolled
                  ? 'border-ocean-300 text-ocean-600 hover:bg-ocean-50'
                  : 'border-white/50 text-white hover:bg-white/10'
              }`}
            >
              {otherLocale}
            </Link>

            {/* WhatsApp CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-5 rounded-full transition-all hover:scale-105 hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-ocean-700' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-80 mt-4' : 'max-h-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
            <Link
              href={`/${locale}/services`}
              className="block text-ocean-800 font-medium py-2 hover:text-ocean-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dict.nav.services}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="block text-ocean-800 font-medium py-2 hover:text-ocean-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dict.nav.about}
            </Link>
            <Link
              href={`/${locale}/faq`}
              className="block text-ocean-800 font-medium py-2 hover:text-ocean-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dict.nav.faq}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="block text-ocean-800 font-medium py-2 hover:text-ocean-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dict.nav.contact}
            </Link>

            <div className="flex items-center gap-3 pt-2 border-t border-ocean-100">
              <Link
                href={getLocaleSwitchPath()}
                className="text-sm font-bold uppercase px-3 py-1.5 rounded-full border-2 border-ocean-300 text-ocean-600 hover:bg-ocean-50"
              >
                {otherLocale}
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-whatsapp flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-2.5 px-5 rounded-full"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
