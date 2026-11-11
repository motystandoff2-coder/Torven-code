"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import PageTransition from "@/components/PageTransition";
import DeerDivider from "@/components/DeerDivider";
import MobileNature from "@/components/MobileNature";
import MobileDeer from "@/components/MobileDeer";
import useIsMobile from "@/hooks/useIsMobile";

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
    <PageTransition>
      <main className="relative overflow-hidden bg-[#060606]">
        {!isMobile && <ParticleBackground />}
        {!isMobile && <NatureOverlay />}
        {!isMobile && <CursorGlow />}
        {isMobile && <MobileNature />}
        {isMobile && <MobileDeer />}
        <Navbar />
        {!isMobile && <SectionNavigator />}

        <div className="relative z-10">
          <HeroSection />

          <DeerDivider />
          <div className="section-shell">
            <AboutSection />
          </div>

          <DeerDivider />
          <div className="section-shell">
            <ServicesSection />
          </div>

          <DeerDivider />
          <div className="section-shell">
            <StatsSection />
          </div>

          <DeerDivider />
          <div className="section-shell">
            <ProcessSection />
          </div>

          <DeerDivider />
          <div className="section-shell">
            <PortfolioSection />
          </div>

          <DeerDivider />
          <div className="section-shell">
            <FAQSection />
          </div>

          <DeerDivider />
          <div className="section-shell">
            <CTASection />
          </div>

          <DeerDivider />
          <div className="section-shell">
            <ContactSection />
          </div>

          <Footer />
        </div>
      </main>
    </PageTransition>
  );
}
