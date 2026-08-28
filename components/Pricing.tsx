const plans = [
  {
    name: "Starter",
    price: "Free",
    subtitle: "For hobbyists",
    features: [
      "10 images / month",
      "3 videos / month (720p)",
      "Basic positions",
      "PNG & JPG export",
      "Tag-it watermark on export",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Creator",
    price: "R99",
    period: "/mo",
    subtitle: "For content creators",
    features: [
      "Unlimited images",
      "Unlimited videos (4K)",
      "All positions + free drag",
      "Batch processing (10 files)",
      "Custom templates",
      "No Tag-it branding",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Agency",
    price: "R299",
    period: "/mo",
    subtitle: "For teams & brands",
    features: [
      "Everything in Creator",
      "5 team members",
      "Brand kit (logos, colours)",
      "API access",
      "Priority processing",
      "Analytics dashboard",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-black sm:text-4xl">
          Simple Pricing in{" "}
          <span className="text-tag-yellow">Rands</span>
        </h2>
        <p className="mt-3 text-gray-400">
          No credit card required to start. Upgrade when you&apos;re ready.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-8 backdrop-blur-xl transition-transform hover:-translate-y-1 ${
              plan.featured
                ? "border-tag-yellow bg-gradient-to-b from-tag-yellow/10 to-tag-surface"
                : "border-tag-yellow/20 bg-tag-surface"
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-tag-yellow to-tag-green px-4 py-1 text-xs font-extrabold text-black">
                MOST POPULAR
              </div>
            )}

            <h3 className="text-lg font-bold">{plan.name}</h3>
            <div className="mt-2 text-4xl font-black bg-gradient-to-r from-tag-yellow to-tag-green bg-clip-text text-transparent">
              {plan.price}
              {plan.period && (
                <span className="text-base font-medium text-gray-400">
                  {plan.period}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-400">{plan.subtitle}</p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <span className="text-tag-green font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`mt-8 w-full rounded-full py-3 text-sm font-bold transition-all ${
                plan.featured
                  ? "bg-gradient-to-r from-tag-yellow to-tag-yellow-light text-black shadow-lg shadow-tag-yellow/20 hover:shadow-xl"
                  : "border-2 border-tag-yellow text-tag-yellow hover:bg-tag-yellow hover:text-black"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
