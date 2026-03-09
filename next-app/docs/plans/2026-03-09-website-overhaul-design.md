# Sailing Academy Website Overhaul - Design Document

**Date:** 2026-03-09  
**Status:** Approved  
**Approach:** Strategic Expansion (Design Polish + SEO/AI Optimization)

---

## Executive Summary

Overhaul the Sailing Academy Herastrau website with two goals:
1. **Design Polish** - Refine the existing ocean blue aesthetic for a more professional feel
2. **SEO/AI Visibility** - Add pages and structured content to rank in search and get cited by AI assistants

---

## Site Architecture

### Current Pages (3)
```
/[locale]/           → Home
/[locale]/services   → Services Overview  
/[locale]/contact    → Contact
```

### Proposed Pages (10)
```
/[locale]/                 → Home (polished)
/[locale]/services         → Services Overview (links to individual)
/[locale]/services/kayak   → Kayak Rental (deep content)
/[locale]/services/sup     → SUP Rental (deep content)
/[locale]/services/eboat   → E-Boat Rental (deep content)
/[locale]/services/sailing → Sailing Boats (deep content)
/[locale]/services/lessons → Sailing Lessons (deep content)
/[locale]/about            → About Us (E-E-A-T, team, story)
/[locale]/faq              → FAQ (AI-optimized Q&A)
/[locale]/contact          → Contact (polished)
```

---

## Design Specifications

### Typography
- Heading line-heights: tightened for better visual density
- Font weights: H1=700, H2=700, H3=600, body=400
- Body text: 17px (up from 16px) for readability
- Letter-spacing on uppercase labels

### Color Palette (Unchanged, Refined Usage)
```
Primary:    ocean-600 (#0284c7) → buttons, links
Secondary:  ocean-800 (#075985) → headers, dark sections
Accent:     sand-400 (#facc15)  → badges, highlights
Background: ocean-50 (#f0f9ff)  → subtle section backgrounds
CTA Green:  #22c55e             → WhatsApp buttons
```

### Component Improvements

| Component | Changes |
|-----------|---------|
| Service Cards | Subtle gradient border on hover, refined shadows |
| Hero Sections | Simplified wave SVG, improved text contrast |
| Buttons | Micro-animations (scale + shadow transition) |
| Navigation | Backdrop blur, subtle shadow on scroll |
| Footer | Better spacing, clearer visual sections |
| Images | Blur placeholder loading states |

### New Components to Create
- `ServicePageTemplate.tsx` - Reusable layout for service pages
- `FAQAccordion.tsx` - Expandable FAQ with schema markup
- `QuickInfoBar.tsx` - Service quick facts display
- `PricingTable.tsx` - Pricing tier display

---

## SEO & AI Optimization

### robots.txt (Allow AI Crawlers)
```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

Disallow: /api/
Disallow: /_next/

Sitemap: https://www.sailingacademy.ro/sitemap.xml
```

### Schema Markup

| Page | Schema Types |
|------|--------------|
| All pages | LocalBusiness (existing) |
| Home | WebSite, SearchAction |
| FAQ | FAQPage |
| Service pages | Service, Offer |
| About | Organization, Person (optional) |

### AI-Optimized Content Structure

Each service page includes:
1. **Definition Block** (first paragraph) - Direct answer for AI extraction
2. **Quick Facts** - Price, duration, capacity, skill level
3. **Detailed Description** - 2-3 paragraphs
4. **What's Included** - Bullet list
5. **Pricing Table** - Clear tiers
6. **FAQ Section** - 3-5 questions with schema
7. **Related Services** - Cross-linking

### Target Queries

**Local Discovery:**
- "What can I do in Herastrau?"
- "Bucharest activities"
- "Things to do near Ferris Wheel Bucharest"

**Service-Specific:**
- "Kayak rental Bucharest"
- "SUP Herastrau"
- "Sailing lessons Romania"
- "Boat rental Herastrau Lake"

---

## Page Specifications

### About Page Structure
1. Hero - Brief intro
2. Our Story - Origin, mission
3. Why Choose Us - Expanded value props
4. Our Team - Instructors (optional)
5. Location & Facilities - What to expect
6. Trust Signals - Ratings, certifications

### FAQ Page Content
Questions targeting AI citation:
- "What can I do in Herastrau Park?"
- "Do I need a license to rent a boat in Bucharest?"
- "Where can I kayak in Bucharest?"
- "What water sports are available on Herastrau Lake?"
- "How much does it cost to rent a kayak in Bucharest?"
- "Is Sailing Academy open on weekends?"
- "Can children go kayaking at Herastrau?"

### Individual Service Page Template
```
Hero (image + title + price + CTA)
    ↓
Quick Info Bar (price, duration, capacity, level)
    ↓
Description (AI-extractable paragraphs)
    ↓
What's Included (checklist)
    ↓
Pricing Table (tiers)
    ↓
FAQ Section (3-5 questions with schema)
    ↓
Related Services (cross-links)
    ↓
CTA Section (WhatsApp + Call)
```

---

## Files to Create

| File | Purpose |
|------|---------|
| `app/[locale]/about/page.tsx` | About page |
| `app/[locale]/faq/page.tsx` | FAQ page |
| `app/[locale]/services/kayak/page.tsx` | Kayak service page |
| `app/[locale]/services/sup/page.tsx` | SUP service page |
| `app/[locale]/services/eboat/page.tsx` | E-Boat service page |
| `app/[locale]/services/sailing/page.tsx` | Sailing service page |
| `app/[locale]/services/lessons/page.tsx` | Lessons service page |
| `components/ServicePageTemplate.tsx` | Reusable service layout |
| `components/FAQAccordion.tsx` | FAQ with schema |
| `components/QuickInfoBar.tsx` | Service quick facts |
| `components/PricingTable.tsx` | Pricing display |

## Files to Modify

| File | Changes |
|------|---------|
| `app/globals.css` | Typography, component styles |
| `app/layout.tsx` | Add WebSite schema |
| `app/robots.ts` | Allow AI crawlers |
| `app/sitemap.ts` | Add new pages |
| `app/[locale]/page.tsx` | Design polish |
| `app/[locale]/services/page.tsx` | Link to individual pages |
| `app/[locale]/contact/page.tsx` | Design polish |
| `components/Header.tsx` | Backdrop blur, scroll shadow |
| `components/Footer.tsx` | Better spacing |
| `dictionaries/en.json` | New page content |
| `dictionaries/ro.json` | New page content (Romanian) |

---

## Implementation Order

1. **Phase 1: Design Polish**
   - CSS refinements (globals.css)
   - Header improvements
   - Footer improvements
   - Home page polish
   - Contact page polish
   - Services overview polish

2. **Phase 2: New Components**
   - ServicePageTemplate
   - FAQAccordion
   - QuickInfoBar
   - PricingTable

3. **Phase 3: New Pages**
   - About page
   - FAQ page
   - Individual service pages (5)

4. **Phase 4: SEO Implementation**
   - robots.txt update
   - Sitemap update
   - Schema markup additions
   - Meta descriptions

5. **Phase 5: Content & Testing**
   - Dictionary updates (EN + RO)
   - Cross-browser testing
   - Mobile testing
   - Performance optimization

---

## Success Criteria

- [ ] All 10 pages implemented and functional
- [ ] Consistent design across all pages
- [ ] Mobile-responsive on all devices
- [ ] AI bots allowed in robots.txt
- [ ] Schema markup validated (Rich Results Test)
- [ ] All pages in sitemap
- [ ] Lighthouse score > 90 (Performance, SEO, Accessibility)
- [ ] Content extractable by AI systems
