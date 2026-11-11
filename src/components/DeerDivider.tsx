"use client";

import useIsMobile from "@/hooks/useIsMobile";

export default function DeerDivider() {
  const isMobile = useIsMobile();

  return (
    <div className={`section-transition ${isMobile ? "section-transition-mobile" : ""}`} aria-hidden="true">
      {!isMobile && (
        <div className="deer-divider-mark">
          <svg viewBox="0 0 54 26" fill="none" className="h-5 w-auto text-white/20">
            <path d="M8 21L11 12L16 12L18 21M18 21L21 12L26 12L29 21M12 12C12 8 16 6 20 6H28C33 6 37 8 39 12M39 12L44 7M39 10L46 3M36 6L38 1M34 12C37 12 40 14 43 16M12 12C9 13 6 15 4 17M29 10L34 8L38 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
}
