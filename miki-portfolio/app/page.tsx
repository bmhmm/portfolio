import Navbar from "@/components/layout/Navbar";
import ParticleBackground from "@/components/effects/ParticleBackground";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import BrainMode from "@/components/effects/BrainMode";
import FloatingTechWords from "@/components/effects/FloatingTechWords";
import CursorGlow from "@/components/effects/CursorGlow";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <ParticleBackground />
      <CursorGlow />
      <FloatingTechWords/>
      <HeroSection />
      <Navbar />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <BrainMode  />
      <ContactSection />
      <Footer/>
    </main>
  );
}