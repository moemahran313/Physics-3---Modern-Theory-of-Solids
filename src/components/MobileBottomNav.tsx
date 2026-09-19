import React from "react";
import { NavMode } from "../types";
import { 
  FileText, 
  Flame, 
  FileSpreadsheet, 
  Tv, 
  Menu 
} from "lucide-react";

interface MobileBottomNavProps {
  currentTab: NavMode;
  onSelectTab: (tab: NavMode) => void;
  onOpenMenu: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenMenu,
}) => {
  const isSheetTab = currentTab.startsWith("sheet-");
  const isMoreTab = [
    "flashcards", 
    "mnemonics", 
    "sandboxes", 
    "official-docs", 
    "terminal", 
    "curriculum", 
    "derivations", 
    "exam-trainer", 
    "lab-analyzer", 
    "overview"
  ].includes(currentTab);

  const getActiveSheetNumber = () => {
    switch (currentTab) {
      case "sheet-1": return "1";
      case "sheet-2": return "2";
      case "sheet-3": return "3";
      case "sheet-4": return "4";
      default: return "1";
    }
  };

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 px-1 py-1.5 shadow-2xl safe-area-bottom"
    >
      <div className="grid grid-cols-5 gap-1 items-center max-w-md mx-auto">
        {/* Sheets Tab */}
        <button
          onClick={() => {
            if (!isSheetTab) {
              onSelectTab("sheet-1");
            }
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] ${
            isSheetTab 
              ? "text-cyan-400 bg-cyan-500/10 font-semibold" 
              : "text-slate-400 hover:text-slate-200 active:bg-slate-900"
          }`}
        >
          <div className="relative">
            <FileText className="w-5 h-5" />
            {isSheetTab && (
              <span className="absolute -top-1 -right-1.5 px-1 rounded-full bg-cyan-500 text-[9px] font-bold text-slate-950 leading-tight">
                {getActiveSheetNumber()}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
            {isSheetTab ? `Sheet ${getActiveSheetNumber()}` : "Sheets"}
          </span>
        </button>

        {/* Cramming Arena */}
        <button
          onClick={() => onSelectTab("cramming-arena")}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] ${
            currentTab === "cramming-arena" 
              ? "text-rose-400 bg-rose-500/10 font-semibold" 
              : "text-slate-400 hover:text-slate-200 active:bg-slate-900"
          }`}
        >
          <Flame className={`w-5 h-5 ${currentTab === "cramming-arena" ? "animate-pulse" : ""}`} />
          <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
            Cram
          </span>
        </button>

        {/* Global Equations */}
        <button
          onClick={() => onSelectTab("global-equations")}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] ${
            currentTab === "global-equations" 
              ? "text-emerald-400 bg-emerald-500/10 font-semibold" 
              : "text-slate-400 hover:text-slate-200 active:bg-slate-900"
          }`}
        >
          <FileSpreadsheet className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
            Equations
          </span>
        </button>

        {/* Videos Theater */}
        <button
          onClick={() => onSelectTab("videos")}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] ${
            currentTab === "videos" 
              ? "text-red-400 bg-red-500/10 font-semibold" 
              : "text-slate-400 hover:text-slate-200 active:bg-slate-900"
          }`}
        >
          <Tv className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
            Videos
          </span>
        </button>

        {/* Full Menu / More Drawer */}
        <button
          onClick={onOpenMenu}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] ${
            isMoreTab 
              ? "text-indigo-400 bg-indigo-500/10 font-semibold" 
              : "text-slate-400 hover:text-slate-200 active:bg-slate-900"
          }`}
        >
          <div className="relative">
            <Menu className="w-5 h-5" />
            {isMoreTab && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-400"></span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
            More
          </span>
        </button>
      </div>
    </nav>
  );
};
