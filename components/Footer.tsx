import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-tag-yellow/20 bg-black/60 py-10 text-center backdrop-blur-xl">
      <Image
        src="/logo.png"
        alt="Tag-it"
        width={40}
        height={40}
        className="mx-auto mb-3 opacity-70"
      />
      <p className="text-sm text-gray-400">
        © 2026 Tag-it. Made in Johannesburg 🇿🇦
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Proudly South African. Built by Jozi Nites.
      </p>
      <div className="mt-4 flex justify-center gap-5 text-xs font-semibold text-gray-400">
        <Link href="/studio" className="hover:text-tag-yellow">
          Studio
        </Link>
        <Link href="/coffee" className="hover:text-tag-yellow">
          Buy us a coffee
        </Link>
      </div>
    </footer>
  );
}
