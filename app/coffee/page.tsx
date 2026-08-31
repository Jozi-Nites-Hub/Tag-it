import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { COFFEE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Buy Us A Coffee",
  description:
    "Tag-it is free. If you enjoy the studio, buy Jozi Nites a coffee so we can keep building features and keep it free.",
};

const tiers = [
  { name: "Espresso", amount: "R25", note: "Keeps the lights on for an hour" },
  { name: "Flat white", amount: "R50", note: "Funds a small studio tweak" },
  { name: "Round of coffees", amount: "R100", note: "Helps ship the next free feature" },
];

export default function CoffeePage() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Joburg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-16 text-center lg:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-tag-yellow">Support Tag-it</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Buy us a coffee
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
          Tag-it is a free service. Files stay in your browser. No accounts, no watermarks on you.
          If the studio saved you time, a coffee helps Jozi Nites keep developing features and keep it free.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-2xl border border-tag-yellow/20 bg-tag-surface/80 px-5 py-6 backdrop-blur-xl"
            >
              <p className="text-sm font-semibold text-gray-400">{tier.name}</p>
              <p className="mt-2 text-3xl font-black text-tag-yellow">{tier.amount}</p>
              <p className="mt-2 text-xs text-gray-400">{tier.note}</p>
            </div>
          ))}
        </div>

        <a
          href={COFFEE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex rounded-full bg-gradient-to-r from-tag-yellow to-tag-yellow-light px-10 py-4 text-base font-bold text-black shadow-xl shadow-tag-yellow/20 transition-transform hover:-translate-y-1"
        >
          Buy us a coffee
        </a>

        <p className="mx-auto mt-6 max-w-md text-xs text-gray-500">
          Opens Buy Me a Coffee. Any amount helps. 100% optional — the studio stays free either way.
        </p>

        <p className="mt-10 text-sm text-gray-400">
          Prefer to keep creating? {"  "}
          <a href="/studio" className="font-semibold text-tag-yellow hover:underline">
            Back to the studio
          </a>
        </p>
      </section>

      <Footer />
      <CookieConsent />
    </main>
  );
}
