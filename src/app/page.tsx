"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechTicker from "@/components/TechTicker";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import useIsMobile from "@/hooks/useIsMobile";
import MobileNature from "@/components/MobileNature";

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), {
  ssr: false,
});
const CursorGlow = dynamic(() => import("@/components/CursorGlow"), {
  ssr: false,
});
const NatureOverlay = dynamic(() => import("@/components/NatureOverlay"), {
  ssr: false,
});
const SectionNavigator = dynamic(() => import("@/components/SectionNavigator"), {
  ssr: false,
});

export default function HomePage() {
  const isMobile = useIsMobile();

  return (
    <main className="relative overflow-hidden bg-[#060606]">
      {!isMobile && <ParticleBackground />}
      {!isMobile && <NatureOverlay />}
      {!isMobile && <CursorGlow />}
      {isMobile && <MobileNature />}
      <Navbar />
      {!isMobile && <SectionNavigator />}

      <div className="relative z-10">
        <HeroSection />
        <TechTicker />

        <div className="section-transition" />
        <div className="section-shell">
          <AboutSection />
        </div>

        <div className="section-transition" />
        <div className="section-shell">
          <ServicesSection />
        </div>

        <div className="section-transition" />
        <div className="section-shell">
          <StatsSection />
        </div>

        <div className="section-transition" />
        <div className="section-shell">
          <ProcessSection />
        </div>

        <div className="section-transition" />
        <div className="section-shell">
          <PortfolioSection />
        </div>

        <div className="section-transition" />
        <div className="section-shell">
          <CTASection />
        </div>

        <div className="section-transition" />
        <div className="section-shell">
          <ContactSection />
        </div>

        <Footer />
      </div>
    </main>
  );
}
