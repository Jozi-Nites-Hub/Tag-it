import Navbar from "@/components/Navbar";
import Studio from "@/components/Studio";

export default function StudioPage() {
  return (
    <main className="relative min-h-screen">
      {/* Fixed Joburg Wallpaper */}
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
