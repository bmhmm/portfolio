import Navbar from "@/components/layout/Navbar";
import ParticleBackground from "@/components/effects/ParticleBackground";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <ParticleBackground />
      <HeroSection />
      <Navbar />
      <AboutSection />
      <SkillsSection />
    </main>
  );
}