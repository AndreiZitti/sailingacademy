# Website Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Polish the Sailing Academy website design and add SEO/AI optimization with new pages.

**Architecture:** Keep existing Next.js 16 + Tailwind 4 stack. Add new pages following existing patterns. Create reusable components for service pages. Add schema markup for SEO.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, TypeScript

---

## Phase 1: Design Polish

### Task 1: Refine Global Typography and Styles

**Files:**
- Modify: `app/globals.css`

**Step 1: Update typography refinements**

Open `app/globals.css` and update the `@layer base` section:

```css
@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #111827;
    font-family: var(--font-family-sans);
    font-size: 17px;
    line-height: 1.6;
  }
  h1, h2, h3 {
    font-family: var(--font-family-display);
    line-height: 1.2;
  }
  h1 {
    font-weight: 700;
  }
  h2 {
    font-weight: 700;
  }
  h3 {
    font-weight: 600;
  }
}
```

**Step 2: Add new utility classes**

Add to `@layer utilities`:

```css
@layer utilities {
  .font-display {
    font-family: var(--font-family-display);
  }
  .font-sans {
    font-family: var(--font-family-sans);
  }
  .text-balance {
    text-wrap: balance;
  }
  .tracking-tight {
    letter-spacing: -0.02em;
  }
  .tracking-wide {
    letter-spacing: 0.05em;
  }
}
```

**Step 3: Verify styles work**

Run: `cd next-app && npm run dev`
Open: http://localhost:3000
Expected: Text should appear slightly larger and headings tighter

**Step 4: Commit**

```bash
git add app/globals.css
git commit -m "style: refine typography - larger body text, tighter headings"
```

---

### Task 2: Improve Header Component

**Files:**
- Modify: `components/Header.tsx`

**Step 1: Read current Header implementation**

Read `components/Header.tsx` to understand current structure.

**Step 2: Add backdrop blur and scroll shadow**

Update the header wrapper to include backdrop blur and dynamic shadow on scroll. Add state for scroll detection:

```tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ... existing imports and types

export default function Header({ locale, dict }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      {/* ... rest of header content */}
    </header>
  );
}
```

**Step 3: Test header scroll behavior**

Run: `npm run dev`
Scroll the page up and down
Expected: Header gets white background with blur and shadow when scrolled

**Step 4: Commit**

```bash
git add components/Header.tsx
git commit -m "style: add backdrop blur and scroll shadow to header"
```

---

### Task 3: Improve Button Micro-interactions

**Files:**
- Modify: `app/globals.css`

**Step 1: Enhance button hover states**

Update `.btn-primary` and `.btn-cta` in globals.css:

```css
/* Primary button */
.btn-primary {
  background-color: var(--color-ocean-600);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}
.btn-primary:hover {
  background-color: var(--color-ocean-700);
  box-shadow: 0 10px 25px -5px rgba(3, 105, 161, 0.4);
  transform: translateY(-2px);
}
.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 5px 15px -5px rgba(3, 105, 161, 0.4);
}

/* CTA button - WhatsApp style */
.btn-cta {
  background-color: #22c55e;
  color: white;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-cta:hover {
  background-color: #16a34a;
  box-shadow: 0 10px 25px -5px rgba(22, 163, 74, 0.4);
  transform: scale(1.03);
}
.btn-cta:active {
  transform: scale(1);
}
```

**Step 2: Test button interactions**

Run: `npm run dev`
Hover over buttons on the page
Expected: Smooth scale/shadow animations

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: enhance button micro-interactions"
```

---

### Task 4: Improve Service Cards

**Files:**
- Modify: `app/globals.css`

**Step 1: Enhance service card styles**

Update `.service-card` in globals.css:

```css
/* Service card with hover effect */
.service-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
}
.service-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
  border-color: var(--color-ocean-200);
}
.service-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.03), rgba(2, 132, 199, 0.08));
  opacity: 0;
  transition: opacity 0.3s;
}
.service-card:hover::before {
  opacity: 1;
}
```

**Step 2: Test card hover**

Run: `npm run dev`
Navigate to home page, hover over service cards
Expected: Cards lift up with subtle gradient overlay

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: improve service card hover effects"
```

---

### Task 5: Simplify Hero Wave SVG

**Files:**
- Modify: `app/[locale]/page.tsx`

**Step 1: Update wave SVG to simpler version**

Find the wave SVG in the hero section and replace with:

```tsx
{/* Decorative wave pattern - simplified */}
<div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
  <svg
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
    className="absolute bottom-0 w-full h-full"
  >
    <path
      d="M0,60 C300,100 600,20 900,60 C1050,80 1150,70 1200,60 L1200,120 L0,120 Z"
      fill="white"
      fillOpacity="0.15"
    />
    <path
      d="M0,80 C300,40 600,90 900,60 C1050,45 1150,55 1200,50 L1200,120 L0,120 Z"
      fill="white"
    />
  </svg>
</div>
```

**Step 2: Test hero section**

Run: `npm run dev`
Expected: Cleaner, simpler wave at bottom of hero

**Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "style: simplify hero wave decoration"
```

---

## Phase 2: SEO Infrastructure

### Task 6: Update robots.txt for AI Crawlers

**Files:**
- Modify: `app/robots.ts`

**Step 1: Replace robots.ts content**

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
    ],
    sitemap: 'https://www.sailingacademy.ro/sitemap.xml',
    host: 'https://www.sailingacademy.ro',
  };
}
```

**Step 2: Test robots.txt generation**

Run: `npm run build && npm run start`
Visit: http://localhost:3000/robots.txt
Expected: See all AI bot rules listed

**Step 3: Commit**

```bash
git add app/robots.ts
git commit -m "seo: allow AI crawlers in robots.txt"
```

---

### Task 7: Update Sitemap with New Pages

**Files:**
- Modify: `app/sitemap.ts`

**Step 1: Update sitemap to include new pages**

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sailingacademy.ro';
  const locales = ['ro', 'en'];

  const routes = [
    { path: '', priority: 1, changeFreq: 'daily' as const },
    { path: '/services', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/services/kayak', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/sup', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/eboat', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/sailing', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/lessons', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/about', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/faq', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFreq: 'weekly' as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFreq,
        priority: route.priority,
        alternates: {
          languages: {
            ro: `${baseUrl}/ro${route.path}`,
            en: `${baseUrl}/en${route.path}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
```

**Step 2: Commit**

```bash
git add app/sitemap.ts
git commit -m "seo: add new pages to sitemap"
```

---

## Phase 3: Reusable Components

### Task 8: Create FAQAccordion Component

**Files:**
- Create: `components/FAQAccordion.tsx`

**Step 1: Create the FAQ accordion component with schema**

```typescript
'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQAccordion({ items, title }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="w-full">
      {title && (
        <h2 className="text-2xl md:text-3xl font-display font-bold text-ocean-900 mb-8 text-center">
          {title}
        </h2>
      )}

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-3 max-w-3xl mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-ocean-50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-ocean-900">{item.question}</span>
              <svg
                className={`w-5 h-5 text-ocean-600 transition-transform duration-200 flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <p className="px-6 pb-4 text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/FAQAccordion.tsx
git commit -m "feat: add FAQAccordion component with schema markup"
```

---

### Task 9: Create QuickInfoBar Component

**Files:**
- Create: `components/QuickInfoBar.tsx`

**Step 1: Create the quick info bar component**

```typescript
interface InfoItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface QuickInfoBarProps {
  items: InfoItem[];
}

export default function QuickInfoBar({ items }: QuickInfoBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-ocean-50 rounded-2xl">
      {items.map((item, index) => (
        <div key={index} className="text-center p-3">
          {item.icon && (
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-ocean-100 flex items-center justify-center text-ocean-600">
              {item.icon}
            </div>
          )}
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{item.label}</p>
          <p className="font-semibold text-ocean-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/QuickInfoBar.tsx
git commit -m "feat: add QuickInfoBar component for service pages"
```

---

### Task 10: Create PricingTable Component

**Files:**
- Create: `components/PricingTable.tsx`

**Step 1: Create the pricing table component**

```typescript
interface PricingTier {
  duration: string;
  price: string;
  note?: string;
}

interface PricingTableProps {
  tiers: PricingTier[];
  currency?: string;
}

export default function PricingTable({ tiers, currency = 'lei' }: PricingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-ocean-600 text-white">
            <th className="px-6 py-3 text-left font-semibold rounded-tl-lg">Duration</th>
            <th className="px-6 py-3 text-right font-semibold rounded-tr-lg">Price</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 ${
                index % 2 === 0 ? 'bg-white' : 'bg-ocean-50'
              }`}
            >
              <td className="px-6 py-4">
                <span className="font-medium text-ocean-900">{tier.duration}</span>
                {tier.note && (
                  <span className="block text-sm text-gray-500 mt-0.5">{tier.note}</span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-xl font-bold text-ocean-700">{tier.price}</span>
                <span className="text-gray-500 ml-1">{currency}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/PricingTable.tsx
git commit -m "feat: add PricingTable component for service pages"
```

---

### Task 11: Create ServicePageTemplate Component

**Files:**
- Create: `components/ServicePageTemplate.tsx`

**Step 1: Create the service page template**

```typescript
import Image from 'next/image';
import Link from 'next/link';
import QuickInfoBar from './QuickInfoBar';
import PricingTable from './PricingTable';
import FAQAccordion from './FAQAccordion';

interface ServiceFeature {
  text: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface PricingTier {
  duration: string;
  price: string;
  note?: string;
}

interface RelatedService {
  key: string;
  title: string;
  image: string;
  href: string;
}

interface ServicePageTemplateProps {
  locale: string;
  title: string;
  subtitle: string;
  heroImage: string;
  price: string;
  description: string;
  longDescription: string;
  quickInfo: {
    price: string;
    duration: string;
    capacity: string;
    level: string;
  };
  features: ServiceFeature[];
  pricing: PricingTier[];
  faqs: FAQItem[];
  relatedServices: RelatedService[];
  dict: {
    bookNow: string;
    whatsappUs: string;
    callUs: string;
    whatsIncluded: string;
    pricing: string;
    faq: string;
    otherServices: string;
    readyToBook: string;
  };
}

export default function ServicePageTemplate({
  locale,
  title,
  subtitle,
  heroImage,
  price,
  description,
  longDescription,
  quickInfo,
  features,
  pricing,
  faqs,
  relatedServices,
  dict,
}: ServicePageTemplateProps) {
  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Sailing Academy Herastrau',
    },
    areaServed: {
      '@type': 'City',
      name: 'Bucharest',
    },
    offers: {
      '@type': 'Offer',
      price: price.replace(/[^0-9]/g, ''),
      priceCurrency: 'RON',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/70 via-ocean-800/60 to-ocean-900/80" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-xl text-white/90 mb-6">{subtitle}</p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold">
                From {price}
              </span>
              <a
                href="https://wa.me/40730333755"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {dict.bookNow}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <QuickInfoBar
            items={[
              { label: 'Price', value: quickInfo.price },
              { label: 'Duration', value: quickInfo.duration },
              { label: 'Capacity', value: quickInfo.capacity },
              { label: 'Level', value: quickInfo.level },
            ]}
          />
        </div>
      </section>

      {/* Description */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {description}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section bg-ocean-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-ocean-900 mb-8 text-center">
            {dict.whatsIncluded}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-ocean-900 mb-8 text-center">
            {dict.pricing}
          </h2>
          <div className="max-w-xl mx-auto">
            <PricingTable tiers={pricing} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-ocean-50">
        <div className="container mx-auto px-4">
          <FAQAccordion items={faqs} title={dict.faq} />
        </div>
      </section>

      {/* Related Services */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-ocean-900 mb-8 text-center">
            {dict.otherServices}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {relatedServices.map((service) => (
              <Link key={service.key} href={service.href} className="group block">
                <div className="relative h-40 rounded-xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-white font-semibold">
                    {service.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-700 to-ocean-900" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            {dict.readyToBook}
          </h2>
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
              {dict.whatsappUs}
            </a>
            <a
              href="tel:+40730333755"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all border border-white/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {dict.callUs}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add components/ServicePageTemplate.tsx
git commit -m "feat: add ServicePageTemplate with schema markup"
```

---

## Phase 4: Dictionary Updates

### Task 12: Update English Dictionary

**Files:**
- Modify: `dictionaries/en.json`

**Step 1: Add new page content to English dictionary**

Add the following keys to en.json (merge with existing content):

```json
{
  "about": {
    "title": "About Us",
    "metaDesc": "Learn about Sailing Academy Herastrau - your premier water sports destination on Herastrau Lake in Bucharest since 2015.",
    "heroSubtitle": "Your water adventure starts here",
    "storyTitle": "Our Story",
    "storyText": "Founded with a passion for water sports, Sailing Academy Herastrau has been welcoming visitors to Herastrau Lake since 2015. Located near the iconic Ferris Wheel, we offer kayaks, SUP boards, electric boats, and sailing experiences for all ages and skill levels.",
    "whyTitle": "Why Choose Us",
    "locationTitle": "Find Us",
    "locationText": "We're located on the shores of Herastrau Lake, right next to the Ferris Wheel. Easy to find with parking available nearby.",
    "trustTitle": "Trusted by Thousands"
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "metaDesc": "Find answers to common questions about kayak rental, SUP, boat rental, and sailing lessons at Herastrau Lake in Bucharest.",
    "questions": [
      {
        "q": "What can I do in Herastrau Park?",
        "a": "Herastrau Park offers many water activities including kayaking, stand-up paddleboarding (SUP), electric boat rides, and sailing. At Sailing Academy, you can rent equipment or take sailing lessons to enjoy the lake."
      },
      {
        "q": "Do I need a license to rent a boat in Bucharest?",
        "a": "No license is required for our electric boats - they're easy to operate and perfect for families. For sailing boats, we offer both accompanied rides and lessons for those wanting to learn."
      },
      {
        "q": "Where can I kayak in Bucharest?",
        "a": "Herastrau Lake is the best spot for kayaking in Bucharest. At Sailing Academy, we offer single and double kayaks for rent, starting at 50 lei per hour, with all equipment included."
      },
      {
        "q": "What water sports are available on Herastrau Lake?",
        "a": "On Herastrau Lake you can enjoy kayaking, stand-up paddleboarding (SUP), electric boat rides, and sailing. Sailing Academy offers all of these activities with equipment rental and lessons."
      },
      {
        "q": "How much does it cost to rent a kayak in Bucharest?",
        "a": "Kayak rental at Sailing Academy starts at 50 lei per hour. This includes the kayak, paddle, and life jacket. Double kayaks are also available for couples or families."
      },
      {
        "q": "Is Sailing Academy open on weekends?",
        "a": "Yes! We're open daily from 9:30 AM to 8:00 PM, weather permitting. Weekends are our busiest times, so we recommend arriving early for the best selection of equipment."
      },
      {
        "q": "Can children go kayaking at Herastrau?",
        "a": "Absolutely! Children are welcome in our double kayaks with an adult. Life jackets in all sizes are provided. Our calm lake waters are perfect for family adventures."
      }
    ]
  },
  "servicePage": {
    "bookNow": "Book Now",
    "whatsappUs": "WhatsApp Us",
    "callUs": "Call Us",
    "whatsIncluded": "What's Included",
    "pricing": "Pricing",
    "faq": "Common Questions",
    "otherServices": "You Might Also Like",
    "readyToBook": "Ready to Book?",
    "fromPrice": "From"
  },
  "kayakPage": {
    "title": "Kayak Rental",
    "subtitle": "Explore Herastrau Lake at your own pace",
    "metaDesc": "Rent kayaks at Herastrau Lake in Bucharest. Single and double kayaks from 50 lei/hour. Equipment included, no experience needed.",
    "description": "Kayak rental at Sailing Academy Herastrau offers single and double kayaks for exploring Herastrau Lake in Bucharest. Prices start at 50 lei/hour with all equipment included and no experience required.",
    "longDescription": "Paddle your way around the beautiful Herastrau Lake in our well-maintained kayaks. Perfect for couples, families, or solo adventurers looking to explore the calm waters at their own pace. Our stable kayaks are suitable for beginners, and all safety equipment is provided.",
    "quickInfo": {
      "price": "50 lei/hr",
      "duration": "1-2 hours",
      "capacity": "1-2 people",
      "level": "Beginner"
    },
    "features": [
      "Single and double kayaks available",
      "Paddle included",
      "Life jacket provided",
      "Brief safety instruction",
      "No experience required",
      "Scenic lake route"
    ],
    "pricing": [
      { "duration": "1 Hour", "price": "50" },
      { "duration": "2 Hours", "price": "80" },
      { "duration": "Half Day (4h)", "price": "150" }
    ],
    "faqs": [
      {
        "q": "Do I need kayaking experience?",
        "a": "No experience needed! Our kayaks are stable and easy to paddle. We'll give you a quick safety briefing before you head out."
      },
      {
        "q": "Can children go kayaking?",
        "a": "Yes! Children can join in double kayaks with an adult. We provide life jackets in all sizes."
      },
      {
        "q": "What should I bring?",
        "a": "Wear comfortable clothes that can get wet, bring sunscreen and water. We provide everything else."
      }
    ]
  },
  "supPage": {
    "title": "SUP Rental",
    "subtitle": "Stand-up paddleboarding on Herastrau Lake",
    "metaDesc": "Rent SUP boards at Herastrau Lake Bucharest. Beginner-friendly paddleboards from 50 lei/hour. Quick lesson included.",
    "description": "SUP rental at Sailing Academy Herastrau offers beginner-friendly paddleboards for exploring Herastrau Lake. Prices start at 50 lei/hour with a quick lesson included.",
    "longDescription": "Experience the lake from a new perspective on our stable paddleboards. Great for a full-body workout and perfect for beginners. We provide a quick intro lesson before you head out to ensure you feel confident on the water.",
    "quickInfo": {
      "price": "50 lei/hr",
      "duration": "1-2 hours",
      "capacity": "1 person",
      "level": "Beginner"
    },
    "features": [
      "Beginner-friendly boards",
      "Quick lesson included",
      "Paddle and life jacket provided",
      "Great core workout",
      "All ages welcome",
      "Calm lake waters"
    ],
    "pricing": [
      { "duration": "1 Hour", "price": "50" },
      { "duration": "2 Hours", "price": "80" },
      { "duration": "Half Day (4h)", "price": "150" }
    ],
    "faqs": [
      {
        "q": "Is SUP hard to learn?",
        "a": "Not at all! Most beginners are standing and paddling within 10 minutes. Our boards are extra stable for easy learning."
      },
      {
        "q": "What if I fall in?",
        "a": "The water is clean and shallow near the shore. Falling is part of the fun! You'll be wearing a life jacket."
      },
      {
        "q": "Can kids do SUP?",
        "a": "Yes, children 8+ can usually handle SUP with our beginner boards. Younger kids can ride with a parent."
      }
    ]
  },
  "eboatPage": {
    "title": "Electric Boat Rental",
    "subtitle": "Cruise the lake in style - no license needed",
    "metaDesc": "Rent electric boats at Herastrau Lake Bucharest. No license required. Seats up to 6 people. From 200 lei/hour.",
    "description": "Electric boat rental at Sailing Academy Herastrau lets you cruise Herastrau Lake without a boating license. Seats up to 6 people, quiet and eco-friendly. From 200 lei/hour.",
    "longDescription": "Cruise the lake in style with our quiet, eco-friendly electric boats. No boating license required - they're easy to operate and perfect for a relaxing afternoon with friends or family. Our boats seat up to 6 people comfortably.",
    "quickInfo": {
      "price": "200 lei/hr",
      "duration": "1-2 hours",
      "capacity": "Up to 6",
      "level": "No license"
    },
    "features": [
      "No license required",
      "Seats up to 6 people",
      "Quiet electric motor",
      "Eco-friendly",
      "Easy to operate",
      "Perfect for groups"
    ],
    "pricing": [
      { "duration": "1 Hour", "price": "200" },
      { "duration": "2 Hours", "price": "350" },
      { "duration": "Half Day (4h)", "price": "600" }
    ],
    "faqs": [
      {
        "q": "Do I need a boat license?",
        "a": "No! Our electric boats are license-free. We'll show you how to operate them - it takes about 2 minutes to learn."
      },
      {
        "q": "How many people can fit?",
        "a": "Our boats comfortably seat up to 6 adults. Perfect for family outings or groups of friends."
      },
      {
        "q": "Can we bring food/drinks?",
        "a": "Yes! Many visitors bring a picnic to enjoy on the water. Just be mindful of the lake and take your rubbish with you."
      }
    ]
  },
  "sailingPage": {
    "title": "Sailing Boats",
    "subtitle": "Experience the thrill of sailing on Herastrau Lake",
    "metaDesc": "Sail on Herastrau Lake in Bucharest. Various boat sizes for all skill levels. Instructor available. From 50 lei/hour.",
    "description": "Sailing at Sailing Academy Herastrau offers an authentic wind-powered experience on Herastrau Lake. Boats for all skill levels with optional instructor. From 50 lei/hour.",
    "longDescription": "Experience the thrill of sailing on Herastrau Lake. Our fleet includes boats for beginners and experienced sailors alike. Feel the wind and enjoy a unique perspective of Bucharest from the water.",
    "quickInfo": {
      "price": "50-100 lei/hr",
      "duration": "1-3 hours",
      "capacity": "2-4 people",
      "level": "All levels"
    },
    "features": [
      "Various boat sizes",
      "For all skill levels",
      "Instructor available",
      "Scenic lake views",
      "Wind-powered adventure",
      "Life jackets provided"
    ],
    "pricing": [
      { "duration": "1 Hour - Small boat", "price": "50" },
      { "duration": "1 Hour - Large boat", "price": "100" },
      { "duration": "2 Hours - With instructor", "price": "150" }
    ],
    "faqs": [
      {
        "q": "Do I need sailing experience?",
        "a": "Not necessarily. Beginners can book with an instructor, or take our sailing lessons first."
      },
      {
        "q": "What if there's no wind?",
        "a": "We check conditions before each session. If it's too calm (or too windy), we'll suggest an alternative or reschedule."
      },
      {
        "q": "Can I bring my own boat?",
        "a": "Contact us to discuss. We primarily offer our own fleet for rental and lessons."
      }
    ]
  },
  "lessonsPage": {
    "title": "Sailing Lessons",
    "subtitle": "Learn to sail with certified instructors",
    "metaDesc": "Learn sailing at Herastrau Lake Bucharest. Certified instructors, all skill levels. Theory and practical lessons from 80 lei.",
    "description": "Sailing lessons at Sailing Academy Herastrau teach you to sail on Herastrau Lake with certified instructors. All ages and skill levels welcome. From 80 lei per session.",
    "longDescription": "Start your sailing journey with our certified instructors. From basic boat handling to advanced techniques, we offer personalized lessons for all ages and skill levels. Earn your sailing certification with us.",
    "quickInfo": {
      "price": "80 lei/session",
      "duration": "1-2 hours",
      "capacity": "1-3 students",
      "level": "All levels"
    },
    "features": [
      "Certified instructors",
      "All skill levels",
      "Theory and practice",
      "Certification available",
      "Small group lessons",
      "Progress at your pace"
    ],
    "pricing": [
      { "duration": "Single Lesson (1h)", "price": "80" },
      { "duration": "5 Lesson Package", "price": "350", "note": "Save 50 lei" },
      { "duration": "10 Lesson Package", "price": "600", "note": "Save 200 lei" }
    ],
    "faqs": [
      {
        "q": "How long does it take to learn sailing?",
        "a": "Most beginners can handle a boat solo after 5-10 lessons. The exact time depends on conditions and how often you practice."
      },
      {
        "q": "Can I get certified?",
        "a": "Yes! We offer sailing certification after completing our course and passing a practical test."
      },
      {
        "q": "What age can children start?",
        "a": "Children as young as 8 can start sailing lessons. We have small boats perfect for young learners."
      }
    ]
  }
}
```

**Step 2: Commit**

```bash
git add dictionaries/en.json
git commit -m "content: add new page content to English dictionary"
```

---

### Task 13: Update Romanian Dictionary

**Files:**
- Modify: `dictionaries/ro.json`

**Step 1: Add Romanian translations**

Add the same structure to ro.json with Romanian translations. (For brevity, key translations):

```json
{
  "about": {
    "title": "Despre Noi",
    "metaDesc": "Află despre Sailing Academy Herăstrău - destinația ta pentru sporturi nautice pe Lacul Herăstrău din București.",
    "heroSubtitle": "Aventura ta pe apă începe aici",
    "storyTitle": "Povestea Noastră",
    "storyText": "Fondată din pasiune pentru sporturile nautice, Sailing Academy Herăstrău primește vizitatori pe Lacul Herăstrău din 2015. Situată lângă iconicul roată mare, oferim caiac, SUP, bărci electrice și experiențe de navigație pentru toate vârstele.",
    "whyTitle": "De Ce Să Ne Alegi",
    "locationTitle": "Unde Ne Găsești",
    "locationText": "Suntem pe malul Lacului Herăstrău, chiar lângă roata mare. Ușor de găsit, cu parcare în apropiere.",
    "trustTitle": "Încrederea a Mii de Clienți"
  },
  "faq": {
    "title": "Întrebări Frecvente",
    "metaDesc": "Găsește răspunsuri la întrebări despre închiriere caiac, SUP, bărci și lecții de navigație pe Lacul Herăstrău."
  },
  "servicePage": {
    "bookNow": "Rezervă Acum",
    "whatsappUs": "Scrie-ne pe WhatsApp",
    "callUs": "Sună-ne",
    "whatsIncluded": "Ce Este Inclus",
    "pricing": "Prețuri",
    "faq": "Întrebări Frecvente",
    "otherServices": "Ți-ar Putea Plăcea",
    "readyToBook": "Gata de Rezervare?",
    "fromPrice": "De la"
  }
}
```

*Note: Full Romanian translation to be completed during implementation.*

**Step 2: Commit**

```bash
git add dictionaries/ro.json
git commit -m "content: add new page content to Romanian dictionary"
```

---

## Phase 5: New Pages

### Task 14: Create About Page

**Files:**
- Create: `app/[locale]/about/page.tsx`

**Step 1: Create the About page**

```typescript
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
    description: dict.about.metaDesc,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sailing Academy Herastrau',
    url: 'https://www.sailingacademy.ro',
    logo: 'https://www.sailingacademy.ro/logoSA.png',
    foundingDate: '2015',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Șos. Nordului 7-9',
      addressLocality: 'București',
      addressCountry: 'RO',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+40730333755',
      contactType: 'customer service',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-700">
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path d="M0,80 C300,40 600,90 900,60 C1050,45 1150,55 1200,50 L1200,120 L0,120 Z" fill="white"/>
          </svg>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            {dict.about.title}
          </h1>
          <p className="text-xl text-ocean-100 max-w-2xl mx-auto">
            {dict.about.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-display font-bold text-ocean-900 mb-6">
                {dict.about.storyTitle}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {dict.about.storyText}
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/bigBoat.JPG"
                alt="Sailing Academy"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-ocean-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-ocean-900 mb-12 text-center">
            {dict.about.whyTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ocean-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-ocean-900 mb-2">
                {dict.home.why1Title}
              </h3>
              <p className="text-gray-600">{dict.home.why1Desc}</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ocean-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-ocean-900 mb-2">
                {dict.home.why2Title}
              </h3>
              <p className="text-gray-600">{dict.home.why2Desc}</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ocean-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-ocean-900 mb-2">
                {dict.home.why3Title}
              </h3>
              <p className="text-gray-600">{dict.home.why3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-ocean-900 mb-6 text-center">
            {dict.about.locationTitle}
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
            {dict.about.locationText}
          </p>
          <div className="rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2847.7941944634384!2d26.08094697644371!3d44.482563399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201f24158a8c9%3A0x847c5cdce8e6c36d!2sSailing%20Academy%20Herastrau!5e0!3m2!1sen!2sro!4v1709910000000!5m2!1sen!2sro"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sailing Academy Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add app/[locale]/about/page.tsx
git commit -m "feat: add About page with organization schema"
```

---

### Task 15: Create FAQ Page

**Files:**
- Create: `app/[locale]/faq/page.tsx`

**Step 1: Create the FAQ page**

```typescript
import { getDictionary, Locale } from '@/lib/dictionaries';
import FAQAccordion from '@/components/FAQAccordion';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.faq.title,
    description: dict.faq.metaDesc,
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const faqItems = dict.faq.questions.map((q: { q: string; a: string }) => ({
    question: q.q,
    answer: q.a,
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-700">
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path d="M0,80 C300,40 600,90 900,60 C1050,45 1150,55 1200,50 L1200,120 L0,120 Z" fill="white"/>
          </svg>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            {dict.faq.title}
          </h1>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-ocean-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold text-ocean-900 mb-4">
            {locale === 'ro' ? 'Mai ai întrebări?' : 'Still have questions?'}
          </h2>
          <p className="text-gray-600 mb-6">
            {locale === 'ro' 
              ? 'Contactează-ne pe WhatsApp sau telefonic.' 
              : 'Contact us on WhatsApp or by phone.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/40730333755"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <Link href={`/${locale}/contact`} className="btn-primary">
              {locale === 'ro' ? 'Pagina de Contact' : 'Contact Page'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add app/[locale]/faq/page.tsx
git commit -m "feat: add FAQ page with schema markup"
```

---

### Task 16-20: Create Individual Service Pages

*Note: Tasks 16-20 follow the same pattern - create each service page using the ServicePageTemplate component. For brevity, here's the pattern:*

**Files:**
- Create: `app/[locale]/services/kayak/page.tsx`
- Create: `app/[locale]/services/sup/page.tsx`
- Create: `app/[locale]/services/eboat/page.tsx`
- Create: `app/[locale]/services/sailing/page.tsx`
- Create: `app/[locale]/services/lessons/page.tsx`

Each page follows this structure:

```typescript
import { getDictionary, Locale } from '@/lib/dictionaries';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.kayakPage.title, // Change per service
    description: dict.kayakPage.metaDesc,
  };
}

export default async function KayakPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  // Map dictionary data to ServicePageTemplate props
  // Return <ServicePageTemplate {...props} />
}
```

---

## Phase 6: Final Updates

### Task 21: Update Navigation with New Pages

**Files:**
- Modify: `components/Header.tsx`
- Modify: `components/Footer.tsx`

Add About and FAQ to navigation menus.

### Task 22: Update Services Page to Link to Individual Pages

**Files:**
- Modify: `app/[locale]/services/page.tsx`

Update service cards to link to individual service pages instead of anchor links.

### Task 23: Final Testing

Run through all pages, test mobile responsiveness, verify schemas with Google Rich Results Test.

---

**End of Implementation Plan**
