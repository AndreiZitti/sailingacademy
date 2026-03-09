# Sailing Academy Website Redesign - Design Document

**Date:** 2026-03-09
**Status:** Approved

## Overview

Redesign the Sailing Academy website focusing on SEO discoverability, performance, and usability. Migrate from React CRA to Next.js for proper search engine indexing.

## Goals

1. **SEO Discoverability** - Site must be indexable by search engines (currently invisible)
2. **Performance** - Fast loading on all devices and slow connections
3. **Usability** - Mobile-first, easy to find services and contact info

## Site Structure

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Hero + Services overview + Contact CTA |
| Services | `/services` | Detailed rentals & experiences |
| Contact | `/contact` | Location, hours, map, reviews |

**Removed:** `/membership` - entire membership flow deleted

## Tech Stack

- **Framework:** Next.js (SSG for SEO)
- **Styling:** Tailwind CSS or CSS Modules
- **i18n:** next-i18next (migrate existing translations)
- **Images:** Next.js Image component (automatic optimization)

## Visual Direction

- Minimal nautical theme (blues, clean typography)
- Static hero images (video backgrounds removed)
- Mobile-first responsive design

## Key Features

- Phone/WhatsApp CTA always visible in header
- Rentals featured prominently on homepage
- Bilingual support (EN/RO)
- LocalBusiness structured data for Google
- Meta tags per page

## Content to Migrate

- Service listings (kayaks, SUP, e-boats, sailing, lessons)
- Contact info (address, hours, phone)
- Customer reviews
- Translations (en.json, ro.json)

## Content to Remove

- Membership pages (4 components + CSS)
- Video backgrounds
- Heavy animations
- Supabase integration (was only for membership forms)

## Success Criteria

- Google can index all pages (test with Fetch as Google)
- Lighthouse performance score > 90
- Mobile usability score > 90
- Page load < 3s on 3G connection
