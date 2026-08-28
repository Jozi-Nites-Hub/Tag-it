import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-xl border-b border-tag-yellow/20 lg:px-12">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Tag-it"
          width={48}
          height={48}
          className="drop-shadow-[0_0_12px_rgba(245,184,0,0.3)]"
        />
        <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-tag-yellow to-tag-green bg-clip-text text-transparent">
          Tag-it
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/studio"
          className="hidden text-sm font-medium text-gray-400 transition-colors hover:text-tag-yellow sm:block"
        >
          Studio
        </Link>
        <Link
          href="/#pricing"
          className="hidden text-sm font-medium text-gray-400 transition-colors hover:text-tag-yellow sm:block"
        >
          Pricing
        </Link>
        <Link
          href="/studio"
          className="rounded-full bg-gradient-to-r from-tag-yellow to-tag-yellow-light px-5 py-2 text-sm font-bold text-black shadow-lg shadow-tag-yellow/20 transition-transform hover:-translate-y-0.5"
        >
          Start Free
        </Link>
      </div>
    </nav>
  );
}
