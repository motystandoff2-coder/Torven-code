"use client";

interface Tab {
  id: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  active: number;
  onSelect: (idx: number, dir: 1 | -1) => void;
}

export default function MobileSectionTabs({ tabs, active, onSelect }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/8 bg-[#050505]/95 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center gap-[2px] overflow-x-auto px-2 py-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* стрелка назад */}
        <button
          onClick={() => onSelect(active - 1, -1)}
          disabled={active === 0}
          aria-label="Назад"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/50 disabled:opacity-20 active:bg-white/8"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 2 4 7 9 12" />
          </svg>
        </button>

        {tabs.map((t, i) => (
          <button
            key={t.id}
            onClick={() => onSelect(i, i >= active ? 1 : -1)}
            className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors whitespace-nowrap ${
              i === active
                ? "bg-white text-black"
                : "text-white/45 active:bg-white/8"
            }`}
          >
            {t.label}
          </button>
        ))}

        {/* стрелка вперёд */}
        <button
          onClick={() => onSelect(active + 1, 1)}
          disabled={active === tabs.length - 1}
          aria-label="Вперёд"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/50 disabled:opacity-20 active:bg-white/8"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="5 2 10 7 5 12" />
          </svg>
        </button>
      </div>

      {/* индикатор позиции */}
      <div className="flex justify-center gap-1 pb-1.5">
        {tabs.map((t, i) => (
          <span
            key={t.id}
            className={`h-1 rounded-full transition-all ${
              i === active ? "w-4 bg-white/80" : "w-1 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
