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
