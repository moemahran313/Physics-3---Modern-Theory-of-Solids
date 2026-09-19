import React, { useState } from "react";
import { GLOBAL_FORMULAS_MASTER } from "../lib/reflibData";
import { ChapterId } from "../types";
import { MathView } from "./MathView";
import { 
  FileSpreadsheet, 
  Search, 
  Copy, 
  Check
} from "lucide-react";

interface GlobalEquationsViewProps {
  onOpenConstants: () => void;
}

export const GlobalEquationsView: React.FC<GlobalEquationsViewProps> = ({ onOpenConstants }) => {
  const [selectedChapter, setSelectedChapter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chapters = [
    { label: "All", id: "All" },
    { label: "Ch. 1: Radiation", id: "ch1" },
    { label: "Ch. 2: Wave Mech", id: "ch2" },
    { label: "Ch. 3: Atomic", id: "ch3" },
    { label: "Ch. 4: Relativity", id: "ch4" },
  ];

  const getChapterName = (id: ChapterId) => {
    switch (id) {
      case "ch1": return "Chapter 1: Thermal Radiation";
      case "ch2": return "Chapter 2: Wave Mechanics";
      case "ch3": return "Chapter 3: Atomic & X-Rays";
      case "ch4": return "Chapter 4: Special Relativity";
      default: return id;
    }
  };

  const filteredFormulas = GLOBAL_FORMULAS_MASTER.filter(item => {
    const matchesChapter = selectedChapter === "All" || item.chapterId === selectedChapter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      item.name.toLowerCase().includes(q) ||
      item.latex.toLowerCase().includes(q) ||
      item.variables.toLowerCase().includes(q) ||
      item.notes.toLowerCase().includes(q);
    return matchesChapter && matchesSearch;
  });

  const handleCopy = (latex: string, id: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-950 to-indigo-950/30 border border-emerald-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs border border-emerald-500/30 flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Global Equation Master</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">{GLOBAL_FORMULAS_MASTER.length} Formulas</span>
          </div>
          <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
            Authoritative Equations Cheatsheet
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Formulas, shortcuts, SI units, and variable definitions for Modern Academy ELCn114.
          </p>
        </div>

        <button
          onClick={onOpenConstants}
          className="px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-colors min-h-[40px] self-start md:self-auto"
        >
          View Fundamental Constants
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
        {/* Chapter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChapter(ch.id)}
              className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all min-h-[36px] ${
                selectedChapter === ch.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search equations, symbols, units..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Equation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {filteredFormulas.map((eq) => (
          <div
            key={eq.id}
            className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                    {getChapterName(eq.chapterId)}
                  </span>
                  <h3 className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                    {eq.name}
                  </h3>
                </div>
                <button
                  onClick={() => handleCopy(eq.latex, eq.id)}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-white transition-colors border border-slate-800 shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center"
                  title="Copy LaTeX formula"
                  aria-label="Copy LaTeX formula"
                >
                  {copiedId === eq.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* LaTeX Formula Display (Horizontal scroll for long equations) */}
              <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80 overflow-x-auto max-w-full flex items-center justify-center">
                <MathView math={eq.latex} displayMode={true} />
              </div>
            </div>

            {/* Variable Definitions & Notes */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                  Variables & SI Units ({eq.typicalUnits}):
                </span>
                <p className="text-[11px] font-mono text-indigo-300 leading-relaxed bg-slate-950/60 p-2 rounded-lg border border-slate-800/60 break-words">
                  {eq.variables}
                </p>
              </div>

              {eq.notes && (
                <div className="text-[11px] text-slate-300 font-medium bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
                  💡 {eq.notes}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
