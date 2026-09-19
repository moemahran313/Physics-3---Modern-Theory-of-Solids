import React from "react";
import { NavMode } from "../types";
import { ChevronLeft, ChevronRight, HandMetal } from "lucide-react";

interface SheetQuickSwitcherProps {
  currentTab: NavMode;
  onSelectTab: (tab: NavMode) => void;
}

export const SheetQuickSwitcher: React.FC<SheetQuickSwitcherProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const sheets = [
    { id: "sheet-1" as NavMode, num: "1", title: "Quantum", short: "Quant" },
    { id: "sheet-2" as NavMode, num: "2", title: "Waves", short: "Waves" },
    { id: "sheet-3" as NavMode, num: "3", title: "Atomic", short: "Atomic" },
    { id: "sheet-4" as NavMode, num: "4", title: "Relativity", short: "Relat" },
  ];

  const currentIndex = sheets.findIndex((s) => s.id === currentTab);

  return (
    <div className="w-full mb-3.5 space-y-1.5">
      {/* 4-Sheet Tab Selector (mobile-first 4-column layout for 375px-430px) */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900/90 border border-slate-800/80 rounded-2xl shadow-sm">
        {sheets.map((s, idx) => {
          const isActive = currentTab === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelectTab(s.id)}
              className={`py-1.5 px-1 sm:py-2 sm:px-2 rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 text-center active:scale-95 min-h-[42px] ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 border border-indigo-400/40"
                  : "bg-slate-950/60 hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
              aria-label={`Go to Sheet ${s.num}: ${s.title}`}
            >
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full text-[9px] sm:text-[10px] font-bold font-mono flex items-center justify-center ${
                    isActive ? "bg-white text-indigo-700" : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {s.num}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold whitespace-nowrap">
                  <span className="sm:hidden">S{s.num}</span>
                  <span className="hidden sm:inline">Sheet {s.num}</span>
                </span>
              </div>
              <span
                className={`text-[9px] sm:text-[10px] truncate max-w-full font-medium ${
                  isActive ? "text-indigo-100" : "text-slate-500"
                }`}
              >
                <span className="xs:hidden">{s.short}</span>
                <span className="hidden xs:inline">{s.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Swipe Hint Bar */}
      <div className="flex items-center justify-between px-2 text-[10px] text-slate-400 font-mono">
        <div className="flex items-center gap-1">
          {currentIndex > 0 && (
            <span className="flex items-center text-indigo-400">
              <ChevronLeft className="w-3 h-3" />
              <span>Swipe right for Sheet {sheets[currentIndex - 1].num}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-slate-500">
          <span className="hidden sm:inline">Touch Swipe Enabled</span>
          <div className="flex items-center gap-1">
            {sheets.map((s, idx) => (
              <span
                key={s.id}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? "w-4 bg-indigo-500" : "w-1.5 bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1">
          {currentIndex < sheets.length - 1 && (
            <span className="flex items-center text-indigo-400">
              <span>Sheet {sheets[currentIndex + 1].num}</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

