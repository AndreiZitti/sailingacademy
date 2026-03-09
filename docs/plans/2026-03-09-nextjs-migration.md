# Sailing Academy Next.js Migration - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate Sailing Academy from React CRA to Next.js with SEO optimization, performance improvements, and simplified 3-page structure.

**Architecture:** Next.js App Router with static site generation (SSG). Pages pre-rendered as HTML for SEO. Tailwind CSS for styling. next-i18next for bilingual support. Phone/WhatsApp CTA in sticky header.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS, next-i18next, next/image

---

## Phase 1: Project Setup

### Task 1: Initialize Next.js Project

**Files:**
- Create: `next-app/` (new directory alongside current src)
- Create: `next-app/package.json`
- Create: `next-app/next.config.js`
- Create: `next-app/tailwind.config.js`

**Step 1: Create Next.js app in subdirectory**

```bash
cd /Users/zitti/Documents/GitHub/sailingacademy
npx create-next-app@latest next-app --typescript --tailwind --eslint --app --no-src-dir
```

Options when prompted:
- TypeScript: Yes
- ESLint: Yes
- Tailwind: Yes
- src/ directory: No
- App Router: Yes
- Import alias: @/*

**Step 2: Verify it runs**

```bash
cd next-app && npm run dev
```

Expected: Server at http://localhost:3001 (or 3000 if old server stopped)

**Step 3: Copy public assets**

```bash
cp -r ../public/images ./public/
cp ../public/logoSA.png ./public/
```

---

### Task 2: Set Up Tailwind with Nautical Theme

**Files:**
- Modify: `next-app/tailwind.config.ts`
- Modify: `next-app/app/globals.css`

**Step 1: Configure nautical color palette**

Edit `next-app/tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        sand: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2: Update globals.css**

Edit `next-app/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply antialiased text-gray-900;
  }
}

@layer components {
  .btn-primary {
    @apply bg-ocean-600 hover:bg-ocean-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors;
  }
  .btn-cta {
    @apply bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center gap-2;
  }
}
```

**Step 3: Verify Tailwind works**

Run: `npm run dev`
Check: Page loads with styles applied

---

### Task 3: Set Up i18n (Internationalization)

**Files:**
- Create: `next-app/i18n.ts`
- Create: `next-app/middleware.ts`
- Create: `next-app/dictionaries/en.json`
- Create: `next-app/dictionaries/ro.json`
- Modify: `next-app/next.config.js`

**Step 1: Create dictionaries directory and copy translations**

```bash
mkdir -p next-app/dictionaries
```

**Step 2: Create English dictionary**

Create `next-app/dictionaries/en.json` - migrate key content from `src/translations/en.json`:

```json
{
  "nav": {
    "services": "Services",
    "contact": "Contact",
    "callUs": "Call Us"
  },
  "hero": {
    "title": "Sailing Academy",
    "subtitle": "Your adventure on Herastrau Lake starts here",
    "cta": "View Services"
  },
  "services": {
    "title": "Our Services",
    "rentals": "Instant Rentals",
    "experiences": "Sailing Experiences",
    "kayak": {
      "title": "Kayak Rental",
      "description": "Single and double kayaks for lake exploration"
    },
    "sup": {
      "title": "SUP Rental",
      "description": "Stand-up paddleboards for all skill levels"
    },
    "eboat": {
      "title": "E-Boat Rental",
      "description": "Electric boats - no license required"
    },
    "sailing": {
      "title": "Sailing Boats",
      "description": "Sail the lake with our fleet"
    },
    "lessons": {
      "title": "Sailing Lessons",
      "description": "Learn to sail with certified instructors"
    }
  },
  "contact": {
    "title": "Contact Us",
    "address": "Șos. Nordului 7-9, Herăstrău",
    "nearFerrisWheel": "Near the Ferris Wheel",
    "hours": "Open Daily: 9:30 - 20:00",
    "phone": "+40 XXX XXX XXX"
  },
  "footer": {
    "rights": "All rights reserved"
  }
}
```

**Step 3: Create Romanian dictionary**

Create `next-app/dictionaries/ro.json`:

```json
{
  "nav": {
    "services": "Servicii",
    "contact": "Contact",
    "callUs": "Sună-ne"
  },
  "hero": {
    "title": "Sailing Academy",
    "subtitle": "Aventura ta pe lacul Herăstrău începe aici",
    "cta": "Vezi Servicii"
  },
  "services": {
    "title": "Serviciile Noastre",
    "rentals": "Închirieri",
    "experiences": "Experiențe de Navigație",
    "kayak": {
      "title": "Închiriere Caiac",
      "description": "Caiace simple și duble pentru explorarea lacului"
    },
    "sup": {
      "title": "Închiriere SUP",
      "description": "Stand-up paddleboard pentru toate nivelurile"
    },
    "eboat": {
      "title": "Închiriere E-Boat",
      "description": "Bărci electrice - fără permis"
    },
    "sailing": {
      "title": "Bărci cu Vele",
      "description": "Navigați pe lac cu flota noastră"
    },
    "lessons": {
      "title": "Lecții de Navigație",
      "description": "Învață să navighezi cu instructori certificați"
    }
  },
  "contact": {
    "title": "Contactează-ne",
    "address": "Șos. Nordului 7-9, Herăstrău",
    "nearFerrisWheel": "Lângă Roata Mare",
    "hours": "Deschis Zilnic: 9:30 - 20:00",
    "phone": "+40 XXX XXX XXX"
  },
  "footer": {
    "rights": "Toate drepturile rezervate"
  }
}
```

**Step 4: Create dictionary loader**

Create `next-app/lib/dictionaries.ts`:

```typescript
import 'server-only';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  ro: () => import('../dictionaries/ro.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'ro') => {
  return dictionaries[locale]();
};
```

**Step 5: Set up locale routing**

Create `next-app/middleware.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ro'];
const defaultLocale = 'ro';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage?.includes('ro')) return 'ro';
  if (acceptLanguage?.includes('en')) return 'en';
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
```

---

## Phase 2: Build Pages

### Task 4: Create Layout with Header & Footer

**Files:**
- Create: `next-app/app/[locale]/layout.tsx`
- Create: `next-app/components/Header.tsx`
- Create: `next-app/components/Footer.tsx`
- Create: `next-app/components/LanguageSwitcher.tsx`
- Create: `next-app/components/PhoneCTA.tsx`

**Step 1: Create Header component**

Create `next-app/components/Header.tsx`:

```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import PhoneCTA from './PhoneCTA';

interface HeaderProps {
  locale: string;
  dict: {
    nav: {
      services: string;
      contact: string;
      callUs: string;
    };
  };
}

export default function Header({ locale, dict }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/logoSA.png"
              alt="Sailing Academy"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-ocean-700 hidden sm:block">
              Sailing Academy
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href={`/${locale}/services`}
              className="text-gray-700 hover:text-ocean-600 font-medium"
            >
              {dict.nav.services}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-gray-700 hover:text-ocean-600 font-medium"
            >
              {dict.nav.contact}
            </Link>
            <LanguageSwitcher locale={locale} />
            <PhoneCTA label={dict.nav.callUs} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <PhoneCTA label="" iconOnly />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link
                href={`/${locale}/services`}
                className="text-gray-700 hover:text-ocean-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {dict.nav.services}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-gray-700 hover:text-ocean-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {dict.nav.contact}
              </Link>
              <LanguageSwitcher locale={locale} />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
```

**Step 2: Create PhoneCTA component**

Create `next-app/components/PhoneCTA.tsx`:

```tsx
interface PhoneCTAProps {
  label?: string;
  iconOnly?: boolean;
}

export default function PhoneCTA({ label = 'Call Us', iconOnly = false }: PhoneCTAProps) {
  const phoneNumber = '+40744123456'; // Replace with actual number

  return (
    <a
      href={`tel:${phoneNumber}`}
      className="btn-cta"
      aria-label="Call us"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
      {!iconOnly && <span>{label}</span>}
    </a>
  );
}
```

**Step 3: Create LanguageSwitcher component**

Create `next-app/components/LanguageSwitcher.tsx`:

```tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface LanguageSwitcherProps {
  locale: string;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const otherLocale = locale === 'en' ? 'ro' : 'en';
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <Link
      href={newPath}
      className="flex items-center gap-1 px-3 py-1 rounded border border-gray-300 hover:border-ocean-500 text-sm font-medium"
    >
      {otherLocale.toUpperCase()}
    </Link>
  );
}
```

**Step 4: Create Footer component**

Create `next-app/components/Footer.tsx`:

```tsx
import Link from 'next/link';

interface FooterProps {
  locale: string;
  dict: {
    contact: {
      address: string;
      hours: string;
      phone: string;
    };
    footer: {
      rights: string;
    };
  };
}

export default function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ocean-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sailing Academy</h3>
            <p className="text-ocean-200">{dict.contact.address}</p>
            <p className="text-ocean-200">{dict.contact.hours}</p>
            <a href="tel:+40744123456" className="text-white hover:text-sand-300">
              {dict.contact.phone}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/services`} className="text-ocean-200 hover:text-white">
                Services
              </Link>
              <Link href={`/${locale}/contact`} className="text-ocean-200 hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/sailingacademy.ro/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean-200 hover:text-white"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-ocean-700 mt-8 pt-8 text-center text-ocean-300">
          <p>© {currentYear} Sailing Academy. {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 5: Create locale layout**

Create `next-app/app/[locale]/layout.tsx`:

```tsx
import { getDictionary } from '@/lib/dictionaries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ro' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: 'en' | 'ro' };
}) {
  const dict = await getDictionary(params.locale);

  return (
    <>
      <Header locale={params.locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={params.locale} dict={dict} />
    </>
  );
}
```

---

### Task 5: Create Homepage

**Files:**
- Create: `next-app/app/[locale]/page.tsx`
- Create: `next-app/components/Hero.tsx`
- Create: `next-app/components/ServiceCard.tsx`
- Create: `next-app/components/ServicesPreview.tsx`

**Step 1: Create Hero component**

Create `next-app/components/Hero.tsx`:

```tsx
import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  locale: string;
  dict: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
  };
}

export default function Hero({ locale, dict }: HeroProps) {
  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/images/hero-sailing.jpg"
        alt="Sailing on Herastrau Lake"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-ocean-900/50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {dict.hero.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-ocean-100">
          {dict.hero.subtitle}
        </p>
        <Link href={`/${locale}/services`} className="btn-primary text-lg">
          {dict.hero.cta}
        </Link>
      </div>
    </section>
  );
}
```

**Step 2: Create ServiceCard component**

Create `next-app/components/ServiceCard.tsx`:

```tsx
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href?: string;
}

export default function ServiceCard({ title, description, image, href }: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-ocean-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
```

**Step 3: Create ServicesPreview component**

Create `next-app/components/ServicesPreview.tsx`:

```tsx
import Link from 'next/link';
import ServiceCard from './ServiceCard';

interface ServicesPreviewProps {
  locale: string;
  dict: {
    services: {
      title: string;
      rentals: string;
      kayak: { title: string; description: string };
      sup: { title: string; description: string };
      eboat: { title: string; description: string };
    };
  };
}

export default function ServicesPreview({ locale, dict }: ServicesPreviewProps) {
  const services = [
    {
      ...dict.services.kayak,
      image: '/images/kayak.jpg',
    },
    {
      ...dict.services.sup,
      image: '/images/sup.jpg',
    },
    {
      ...dict.services.eboat,
      image: '/images/eboat.jpg',
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-800 mb-4">
            {dict.services.rentals}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              image={service.image}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={`/${locale}/services`} className="btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 4: Create Homepage**

Create `next-app/app/[locale]/page.tsx`:

```tsx
import { getDictionary } from '@/lib/dictionaries';
import Hero from '@/components/Hero';
import ServicesPreview from '@/components/ServicesPreview';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: { locale: 'en' | 'ro' }
}): Promise<Metadata> {
  const isRo = params.locale === 'ro';

  return {
    title: isRo ? 'Sailing Academy Herăstrău - Închirieri & Lecții' : 'Sailing Academy Herastrau - Rentals & Lessons',
    description: isRo
      ? 'Închiriere caiac, SUP, bărci electrice și lecții de navigație pe lacul Herăstrău, București.'
      : 'Kayak, SUP, e-boat rentals and sailing lessons on Herastrau Lake, Bucharest.',
    openGraph: {
      title: 'Sailing Academy Herastrau',
      description: 'Your adventure on Herastrau Lake starts here',
      images: ['/images/og-image.jpg'],
    },
  };
}

export default async function HomePage({
  params
}: {
  params: { locale: 'en' | 'ro' }
}) {
  const dict = await getDictionary(params.locale);

  return (
    <>
      <Hero locale={params.locale} dict={dict} />
      <ServicesPreview locale={params.locale} dict={dict} />
    </>
  );
}
```

---

### Task 6: Create Services Page

**Files:**
- Create: `next-app/app/[locale]/services/page.tsx`

**Step 1: Create Services page**

Create `next-app/app/[locale]/services/page.tsx`:

```tsx
import { getDictionary } from '@/lib/dictionaries';
import ServiceCard from '@/components/ServiceCard';
import PhoneCTA from '@/components/PhoneCTA';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: { locale: 'en' | 'ro' }
}): Promise<Metadata> {
  const isRo = params.locale === 'ro';

  return {
    title: isRo ? 'Servicii - Sailing Academy' : 'Services - Sailing Academy',
    description: isRo
      ? 'Închiriere caiac, SUP, bărci electrice, lecții de navigație și evenimente corporate.'
      : 'Kayak, SUP, e-boat rentals, sailing lessons and corporate events.',
  };
}

export default async function ServicesPage({
  params
}: {
  params: { locale: 'en' | 'ro' }
}) {
  const dict = await getDictionary(params.locale);

  const rentalServices = [
    { ...dict.services.kayak, image: '/images/kayak.jpg' },
    { ...dict.services.sup, image: '/images/sup.jpg' },
    { ...dict.services.eboat, image: '/images/eboat.jpg' },
  ];

  const experienceServices = [
    { ...dict.services.sailing, image: '/images/sailing.jpg' },
    { ...dict.services.lessons, image: '/images/lessons.jpg' },
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Rentals Section */}
        <section className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-ocean-800 mb-8">
            {dict.services.rentals}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rentalServices.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                image={service.image}
              />
            ))}
          </div>
        </section>

        {/* Experiences Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-800 mb-8">
            {dict.services.experiences}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experienceServices.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                image={service.image}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-ocean-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-ocean-800 mb-4">
            Ready to book?
          </h2>
          <p className="text-gray-600 mb-6">
            Call us or send a WhatsApp message to reserve your spot!
          </p>
          <PhoneCTA label={dict.nav.callUs} />
        </section>
      </div>
    </div>
  );
}
```

---

### Task 7: Create Contact Page

**Files:**
- Create: `next-app/app/[locale]/contact/page.tsx`
- Create: `next-app/components/Map.tsx`
- Create: `next-app/components/Reviews.tsx`

**Step 1: Create Map component**

Create `next-app/components/Map.tsx`:

```tsx
export default function Map() {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg h-[300px] md:h-[400px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2847.8!2d26.08!3d44.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSailing%20Academy!5e0!3m2!1sen!2sro!4v1"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Sailing Academy Location"
      />
    </div>
  );
}
```

**Step 2: Create Reviews component**

Create `next-app/components/Reviews.tsx`:

```tsx
const reviews = [
  {
    name: 'Maria P.',
    text: 'Amazing experience! The instructors were patient and professional.',
    rating: 5,
  },
  {
    name: 'Alex M.',
    text: 'Great location on Herastrau Lake. Kayak rental was smooth and fun.',
    rating: 5,
  },
  {
    name: 'Ion D.',
    text: 'Perfect for a family day out. Kids loved the sailing lessons!',
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {reviews.map((review, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex mb-3">
            {[...Array(review.rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-600 mb-3">"{review.text}"</p>
          <p className="font-semibold text-ocean-700">{review.name}</p>
        </div>
      ))}
    </div>
  );
}
```

**Step 3: Create Contact page**

Create `next-app/app/[locale]/contact/page.tsx`:

```tsx
import { getDictionary } from '@/lib/dictionaries';
import Map from '@/components/Map';
import Reviews from '@/components/Reviews';
import PhoneCTA from '@/components/PhoneCTA';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: { locale: 'en' | 'ro' }
}): Promise<Metadata> {
  const isRo = params.locale === 'ro';

  return {
    title: isRo ? 'Contact - Sailing Academy' : 'Contact - Sailing Academy',
    description: isRo
      ? 'Contactează Sailing Academy - Șos. Nordului 7-9, Herăstrău, București. Deschis zilnic 9:30-20:00.'
      : 'Contact Sailing Academy - Sos. Nordului 7-9, Herastrau, Bucharest. Open daily 9:30-20:00.',
  };
}

export default async function ContactPage({
  params
}: {
  params: { locale: 'en' | 'ro' }
}) {
  const dict = await getDictionary(params.locale);

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-ocean-800 mb-8 text-center">
          {dict.contact.title}
        </h1>

        {/* Contact Info + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-ocean-50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-ocean-800 mb-6">
              Visit Us
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-start gap-3">
                <svg className="w-6 h-6 text-ocean-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  {dict.contact.address}<br />
                  <span className="text-sm text-gray-500">{dict.contact.nearFerrisWheel}</span>
                </span>
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-6 h-6 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {dict.contact.hours}
              </p>
            </div>
            <div className="mt-8">
              <PhoneCTA label={dict.nav.callUs} />
            </div>
          </div>
          <Map />
        </div>

        {/* Reviews */}
        <section>
          <h2 className="text-2xl font-semibold text-ocean-800 mb-6 text-center">
            What Our Visitors Say
          </h2>
          <Reviews />
        </section>
      </div>
    </div>
  );
}
```

---

## Phase 3: SEO & Performance

### Task 8: Add Structured Data (LocalBusiness Schema)

**Files:**
- Modify: `next-app/app/[locale]/layout.tsx`

**Step 1: Add JSON-LD structured data**

Update `next-app/app/[locale]/layout.tsx`:

```tsx
import { getDictionary } from '@/lib/dictionaries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ro' }];
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Sailing Academy Herastrau',
  image: 'https://www.sailingacademy.ro/images/og-image.jpg',
  '@id': 'https://www.sailingacademy.ro',
  url: 'https://www.sailingacademy.ro',
  telephone: '+40744123456',
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
    latitude: 44.48,
    longitude: 26.08,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:30',
    closes: '20:00',
  },
  sameAs: [
    'https://www.facebook.com/sailingacademy.ro/',
    'https://www.tripadvisor.com/Attraction_Review-g294458-d33442056-Reviews-Sailing_Academy_Herastrau_Bucuresti-Bucharest.html',
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: 'en' | 'ro' };
}) {
  const dict = await getDictionary(params.locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header locale={params.locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={params.locale} dict={dict} />
    </>
  );
}
```

---

### Task 9: Add Sitemap and Robots.txt

**Files:**
- Create: `next-app/app/sitemap.ts`
- Create: `next-app/app/robots.ts`

**Step 1: Create sitemap**

Create `next-app/app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sailingacademy.ro';
  const locales = ['en', 'ro'];

  const routes = ['', '/services', '/contact'];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    }
  }

  return sitemap;
}
```

**Step 2: Create robots.txt**

Create `next-app/app/robots.ts`:

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.sailingacademy.ro/sitemap.xml',
  };
}
```

---

### Task 10: Optimize Images and Test

**Step 1: Create placeholder images**

```bash
# List needed images (create or source these)
# /public/images/hero-sailing.jpg (hero background)
# /public/images/kayak.jpg
# /public/images/sup.jpg
# /public/images/eboat.jpg
# /public/images/sailing.jpg
# /public/images/lessons.jpg
# /public/images/og-image.jpg (for social sharing)
```

**Step 2: Run build and test**

```bash
cd next-app
npm run build
```

Expected: Build succeeds with static pages generated

**Step 3: Test locally**

```bash
npm run start
```

Check:
- All pages load
- Language switching works
- Phone CTA works
- Images load
- Mobile responsive

---

## Phase 4: Deployment Prep

### Task 11: Clean Up and Prepare for Switch

**Step 1: Update actual phone number**

Replace `+40744123456` with actual number in:
- `components/PhoneCTA.tsx`
- `components/Footer.tsx`
- `app/[locale]/layout.tsx` (structured data)

**Step 2: Update Google Maps embed**

Replace placeholder iframe URL in `components/Map.tsx` with actual embed URL

**Step 3: Source production images**

Optimize and add real images to `/public/images/`

**Step 4: Test production build**

```bash
npm run build && npm run start
```

**Step 5: Verify SEO**

- Check meta tags in page source
- Verify structured data with Google's Rich Results Test
- Test sitemap.xml loads

---

## Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| Setup | Next.js, Tailwind, i18n | Pending |
| Pages | Layout, Home, Services, Contact | Pending |
| SEO | Meta tags, Structured data, Sitemap | Pending |
| Deploy | Images, Testing, Go-live | Pending |

**Estimated tasks:** 11 tasks across 4 phases
