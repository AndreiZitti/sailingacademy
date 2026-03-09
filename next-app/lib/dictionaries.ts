import 'server-only';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  ro: () => import('../dictionaries/ro.json').then((module) => module.default),
};

export type Locale = 'en' | 'ro';

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
