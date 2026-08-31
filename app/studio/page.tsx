import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Studio from "@/components/Studio";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Watermark logos and media in your browser. PNG, SVG, JPEG, GIF, TIF. Optional background removal. Files never leave your device.",
};

export default function StudioPage() {
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
      <Studio />
    </main>
  );
}
