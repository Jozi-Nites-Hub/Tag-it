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
        Free browser-based watermark studio. Upload your logo + any image,
        pick a position, tweak size & opacity, and download — ready to post.
        <br />
        <span className="text-tag-yellow font-medium">
          100% Free · No sign-up · Files stay in your browser
        </span>
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/studio"
          className="rounded-full bg-gradient-to-r from-tag-yellow to-tag-yellow-light px-8 py-4 text-base font-bold text-black shadow-xl shadow-tag-yellow/20 transition-transform hover:-translate-y-1"
        >
          Launch Studio
        </Link>
        <Link
          href="/coffee"
          className="rounded-full border-2 border-tag-yellow px-8 py-4 text-base font-bold text-tag-yellow transition-all hover:bg-tag-yellow hover:text-black"
        >
          Buy us a coffee
        </Link>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-5 text-left sm:text-center">
        {[
          { step: "1", title: "Upload Logo", desc: "PNG / SVG / JPEG / GIF / TIF" },
          { step: "2", title: "Upload Media", desc: "Any supported image" },
          { step: "3", title: "Position", desc: "9-point grid + drag" },
          { step: "4", title: "Style", desc: "Size · Opacity · Shadow" },
          { step: "5", title: "Download", desc: "Ready to post" },
        ].map((item) => (
          <div
            key={item.step}
            className="rounded-xl border border-tag-yellow/20 bg-tag-surface/60 px-4 py-4 backdrop-blur-md"
          >
            <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-tag-yellow text-xs font-extrabold text-black">
              {item.step}
            </div>
            <h3 className="text-sm font-bold text-white">{item.title}</h3>
            <p className="mt-1 text-xs text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
