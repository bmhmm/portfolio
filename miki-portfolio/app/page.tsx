import Navbar from "@/components/layout/Navbar";
import ParticleBackground from "@/components/effects/ParticleBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <ParticleBackground />
      <Navbar />
    </main>
  );
}