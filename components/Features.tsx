export default function Features() {
  const features = [
    "Drag & drop upload zones",
    "Live canvas preview",
    "9 position presets (corners, edges & center)",
    "Size, opacity, rotation & padding controls",
    "Tiled watermark option",
    "Drop shadow",
    "Fully client-side (your files never leave the browser)",
    "Mobile-friendly responsive UI",
  ];

  return (
    <section id="features" className="mx-auto max-w-4xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-black sm:text-4xl">
          What you’re <span className="text-tag-yellow">working with</span>
        </h2>
        <p className="mt-3 text-gray-400">
          Everything you need to tag your content — nothing you don’t.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-start gap-3 rounded-xl border border-tag-yellow/20 bg-tag-surface/60 px-5 py-4 backdrop-blur-md"
          >
            <span className="mt-0.5 text-tag-green font-bold">✓</span>
            <span className="text-sm text-gray-200">{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
