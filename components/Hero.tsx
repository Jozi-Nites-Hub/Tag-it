import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-28">
      <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
        Tag your content.
        <br />
        <span className="bg-gradient-to-r from-tag-yellow to-tag-green bg-clip-text text-transparent">
          Own your brand.
        </span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
        Watermark images and videos in seconds. No design skills needed. For South Africans, Built by Jozi Nites.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/studio"
          className="rounded-full bg-gradient-to-r from-tag-yellow to-tag-yellow-light px-8 py-4 text-base font-bold text-black shadow-xl shadow-tag-yellow/20 transition-transform hover:-translate-y-1"
        >
          🚀 Launch Studio
        </Link>
        <Link
          href="/#pricing"
          className="rounded-full border-2 border-tag-yellow px-8 py-4 text-base font-bold text-tag-yellow transition-all hover:bg-tag-yellow hover:text-black"
        >
          View Pricing
        </Link>
      </div>
    </section>
  );
}
