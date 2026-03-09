import { getDictionary, Locale } from '@/lib/dictionaries';
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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} dict={dict} />
      <main className="flex-1">
        {children}
      </main>
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
