interface PricingTier {
  name: string;
  price: string;
  duration: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

interface PricingTableProps {
  tiers: PricingTier[];
  title?: string;
  subtitle?: string;
}

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-ocean-600 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export default function PricingTable({ tiers, title, subtitle }: PricingTableProps) {
  return (
    <section className="w-full">
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && (
            <h2 className="text-2xl md:text-3xl font-display font-bold text-ocean-900 mb-3">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-ocean-600 text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`
              relative bg-white rounded-2xl p-6 lg:p-8 transition-all duration-300
              ${
                tier.highlighted
                  ? 'border-2 border-ocean-600 bg-ocean-50 shadow-xl shadow-ocean-200/50 scale-[1.02] lg:scale-105'
                  : 'border border-gray-200 shadow-lg hover:shadow-xl hover:border-ocean-200'
              }
            `}
          >
            {/* Highlighted badge */}
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-ocean-600 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wide">
                  Popular
                </span>
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-display font-bold text-ocean-900 mb-2">
                {tier.name}
              </h3>
              <div className="mb-1">
                <span className="text-3xl lg:text-4xl font-bold text-ocean-900">
                  {tier.price}
                </span>
              </div>
              <p className="text-ocean-600 text-sm">
                {tier.duration}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-ocean-200 to-transparent mb-6" />

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            {tier.ctaText && (
              <a
                href={tier.ctaHref || '#'}
                className={`
                  block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-200
                  ${
                    tier.highlighted
                      ? 'bg-ocean-600 text-white hover:bg-ocean-700 hover:shadow-lg hover:-translate-y-0.5'
                      : 'bg-ocean-100 text-ocean-700 hover:bg-ocean-200'
                  }
                `}
              >
                {tier.ctaText}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
