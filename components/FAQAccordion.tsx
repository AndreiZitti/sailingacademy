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
              type="button"
              onClick={() => toggle(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-ocean-50 transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-panel-${index}`}
              id={`faq-button-${index}`}
            >
              <span className="font-semibold text-ocean-900">{item.question}</span>
              <svg
                className={`w-5 h-5 text-ocean-600 transition-transform duration-200 flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-button-${index}`}
              className={`overflow-hidden transition-all duration-200 ${
                openIndex === index ? 'max-h-[1000px]' : 'max-h-0'
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
