"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
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
import FAQSection from "@/components/FAQSection";
import PageTransition from "@/components/PageTransition";
import DeerDivider from "@/components/DeerDivider";
import MobileNature from "@/components/MobileNature";
import MobileSectionTabs from "@/components/MobileSectionTabs";
import useIsMobile from "@/hooks/useIsMobile";

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), { ssr: false });
const CursorGlow = dynamic(() => import("@/components/CursorGlow"), { ssr: false });
const NatureOverlay = dynamic(() => import("@/components/NatureOverlay"), { ssr: false });
const SectionNavigator = dynamic(() => import("@/components/SectionNavigator"), { ssr: false });

const MOBILE_SECTIONS = [
  { id: "hero",      label: "Главная"      },
  { id: "about",     label: "Студия"       },
  { id: "services",  label: "Услуги"       },
  { id: "stats",     label: "Цифры"        },
  { id: "process",   label: "Процесс"      },
  { id: "portfolio", label: "Кейсы"        },
  { id: "faq",       label: "Вопросы"      },
  { id: "cta",       label: "Начать"       },
  { id: "contact",   label: "Контакты"     },
];

function DesktopPage() {
  return (
    <PageTransition>
      <main className="relative overflow-hidden bg-[#060606]">
        <ParticleBackground />
        <NatureOverlay />
        <CursorGlow />
        <Navbar />
        <SectionNavigator />

        <div className="relative z-10">
          <HeroSection />
          <TechTicker />

          <DeerDivider />
          <div className="section-shell"><AboutSection /></div>

          <DeerDivider />
          <div className="section-shell"><ServicesSection /></div>

          <DeerDivider />
          <div className="section-shell"><StatsSection /></div>

          <DeerDivider />
          <div className="section-shell"><ProcessSection /></div>

          <DeerDivider />
          <div className="section-shell"><PortfolioSection /></div>

          <DeerDivider />
          <div className="section-shell"><FAQSection /></div>

          <DeerDivider />
          <div className="section-shell"><CTASection /></div>

          <DeerDivider />
          <div className="section-shell"><ContactSection /></div>

          <Footer />
        </div>
      </main>
    </PageTransition>
  );
}

function MobilePage() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const goTo = useCallback((idx: number, direction: 1 | -1) => {
    if (idx < 0 || idx >= MOBILE_SECTIONS.length || idx === active) return;
    setDir(direction);
    setActive(idx);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [active]);

  const renderSection = (id: string) => {
    switch (id) {
      case "hero":      return <HeroSection />;
      case "about":     return <AboutSection />;
      case "services":  return <ServicesSection />;
      case "stats":     return <StatsSection />;
      case "process":   return <ProcessSection />;
      case "portfolio": return <PortfolioSection />;
      case "faq":       return <FAQSection />;
      case "cta":       return <CTASection />;
      case "contact":   return <ContactSection />;
      default:          return null;
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505]">
      <MobileNature />
      <Navbar />

      {/* текущая секция — перелистывается вбок */}
      <div
        key={active}
        className={`relative z-10 pb-24 ${
          dir === 1 ? "mobile-slide-right" : "mobile-slide-left"
        }`}
        style={{ minHeight: "100vh" }}
      >
        <div id={MOBILE_SECTIONS[active]?.id}>
          {renderSection(MOBILE_SECTIONS[active]?.id ?? "hero")}
        </div>

        {MOBILE_SECTIONS[active]?.id === "contact" && <Footer />}
      </div>

      <MobileSectionTabs
        tabs={MOBILE_SECTIONS}
        active={active}
        onSelect={goTo}
      />
    </main>
  );
}

export default function HomePage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobilePage /> : <DesktopPage />;
}
