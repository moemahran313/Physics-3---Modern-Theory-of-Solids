import React, { useState, useRef, useEffect } from "react";
import { NavMode } from "../types";
import { 
  GLOBAL_FORMULAS_MASTER, 
  VIDEO_THEATER_LECTURES,
  SHEET_1_MASTERCLASS,
  SHEET_2_MASTERCLASS,
  SHEET_3_MASTERCLASS,
  SHEET_4_MASTERCLASS
} from "../lib/reflibData";
import { 
  Search, 
  Menu, 
  Hash, 
  Flame, 
  ExternalLink, 
  FileText, 
  Tv, 
  FileSpreadsheet, 
  X, 
  ChevronRight,
  BookOpen,
  Atom
} from "lucide-react";
import { PWAInstallButton } from "./PWAInstallButton";

interface HeaderProps {
  currentTab: NavMode;
  onSelectTab: (tab: NavMode) => void;
  onOpenConstants: () => void;
  collapsedSidebar: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenConstants,
  onToggleSidebar,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileSearchActive && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [isMobileSearchActive]);

  // Global Instant Search Index
  const query = searchQuery.trim().toLowerCase();
  const hasQuery = query.length > 0;

  const allProblems = [
    ...SHEET_1_MASTERCLASS.solvedProblems.map(p => ({ ...p, sheetNav: "sheet-1" as NavMode })),
    ...SHEET_2_MASTERCLASS.solvedProblems.map(p => ({ ...p, sheetNav: "sheet-2" as NavMode })),
    ...SHEET_3_MASTERCLASS.solvedProblems.map(p => ({ ...p, sheetNav: "sheet-3" as NavMode })),
    ...SHEET_4_MASTERCLASS.solvedProblems.map(p => ({ ...p, sheetNav: "sheet-4" as NavMode })),
  ];

  const allTheory = [
    ...SHEET_1_MASTERCLASS.theoryParts.map(t => ({ ...t, sheetNav: "sheet-1" as NavMode })),
    ...SHEET_2_MASTERCLASS.theoryParts.map(t => ({ ...t, sheetNav: "sheet-2" as NavMode })),
    ...SHEET_3_MASTERCLASS.theoryParts.map(t => ({ ...t, sheetNav: "sheet-3" as NavMode })),
    ...SHEET_4_MASTERCLASS.theoryParts.map(t => ({ ...t, sheetNav: "sheet-4" as NavMode })),
  ];

  const matchedProblems = hasQuery
    ? allProblems.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.statement.toLowerCase().includes(query) ||
        p.officialSolution.governingFormula.toLowerCase().includes(query)
      ).slice(0, 4)
    : [];

  const matchedTheory = hasQuery
    ? allTheory.filter(t =>
        t.title.toLowerCase().includes(query) ||
        t.statement.toLowerCase().includes(query) ||
        t.keyFormulas.some(f => f.toLowerCase().includes(query))
      ).slice(0, 3)
    : [];

  const matchedFormulas = hasQuery
    ? GLOBAL_FORMULAS_MASTER.filter(f =>
        f.name.toLowerCase().includes(query) ||
        f.notes.toLowerCase().includes(query) ||
        f.latex.toLowerCase().includes(query) ||
        f.variables.toLowerCase().includes(query)
      ).slice(0, 4)
    : [];

  const matchedVideos = hasQuery
    ? VIDEO_THEATER_LECTURES.filter(v =>
        v.title.toLowerCase().includes(query) ||
        v.chapter.toLowerCase().includes(query) ||
        v.topicsCovered.some(t => t.toLowerCase().includes(query))
      ).slice(0, 3)
    : [];

  const totalResults =
    matchedProblems.length +
    matchedTheory.length +
    matchedFormulas.length +
    matchedVideos.length;

  const getBreadcrumb = (tab: NavMode) => {
    switch (tab) {
      case "sheet-1": return "Tutorial Sheets / Sheet 1: Quantum";
      case "sheet-2": return "Tutorial Sheets / Sheet 2: Wave Mechanics";
      case "sheet-3": return "Tutorial Sheets / Sheet 3: Atomic Physics";
      case "sheet-4": return "Tutorial Sheets / Sheet 4: Special Relativity";
      case "cramming-arena": return "Exam & Study Hub / Cramming Arena";
      case "videos": return "Exam & Study Hub / Video Theater";
      case "global-equations": return "Reference / Global Equations";
      case "flashcards": return "Study Tools / Flashcards";
      case "mnemonics": return "Study Tools / Mnemonics";
      case "sandboxes": return "Interactive / Physics Sandboxes";
      case "official-docs": return "Archives / Past Papers";
      case "terminal": return "AI Core / Socratic Terminal";
      default: return "Modern Academy / Physics 3 RefLib";
    }
  };

  const handleSelectResult = (targetTab: NavMode) => {
    onSelectTab(targetTab);
    setIsSearchOpen(false);
    setIsMobileSearchActive(false);
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      {/* Primary Header Row */}
      <div className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: Mobile/Desktop Toggle & Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="p-2 sm:p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
            title="Toggle Navigation Menu"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Compact brand on mobile */}
          <div className="flex sm:hidden items-center gap-1.5 min-w-0">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white shrink-0">
              <Atom className="w-3.5 h-3.5 text-cyan-300" />
            </div>
            <span className="font-bold text-xs tracking-tight text-white truncate">
              RefLib
            </span>
          </div>

          {/* Breadcrumb on tablet/desktop */}
          <div className="hidden sm:block min-w-0">
            <span className="text-xs font-mono text-slate-400 truncate block">
              {getBreadcrumb(currentTab)}
            </span>
          </div>
        </div>

        {/* Center: Global Instant Search Bar (Desktop) */}
        <div ref={searchContainerRef} className="hidden sm:block relative flex-1 max-w-xl mx-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search formulas, sheet problems, proofs, videos..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-slate-900 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setIsSearchOpen(false);
                }}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Instant Search Results Dropdown (Desktop) */}
          {isSearchOpen && hasQuery && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900/98 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[75vh] overflow-y-auto backdrop-blur-md divide-y divide-slate-800/80">
              <div className="px-4 py-2 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Search results for &quot;<strong className="text-white">{searchQuery}</strong>&quot;</span>
                <span className="font-mono text-indigo-400">{totalResults} matches</span>
              </div>

              {totalResults === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No matching formulas or sheet problems found. Try &quot;blackbody&quot;, &quot;Compton&quot;, &quot;Schrödinger&quot;, or &quot;de Broglie&quot;.
                </div>
              ) : (
                <div className="p-2 space-y-3">
                  {/* Sheet Problems */}
                  {matchedProblems.length > 0 && (
                    <div className="space-y-1">
                      <span className="px-3 text-[10px] font-bold text-cyan-400 uppercase font-mono block">
                        Solved Sheet Problems ({matchedProblems.length})
                      </span>
                      {matchedProblems.map(p => (
                        <div
                          key={p.id}
                          onClick={() => handleSelectResult(p.sheetNav)}
                          className="px-3 py-2 rounded-lg hover:bg-slate-800/60 cursor-pointer flex items-center justify-between gap-3 text-xs transition-colors"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <div className="truncate">
                              <span className="font-semibold text-white block truncate">
                                {p.title}
                              </span>
                              <span className="text-[10px] text-slate-400 truncate block">
                                {p.statement}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Theory & Derivations */}
                  {matchedTheory.length > 0 && (
                    <div className="space-y-1">
                      <span className="px-3 text-[10px] font-bold text-indigo-400 uppercase font-mono block">
                        Theory & Derivations ({matchedTheory.length})
                      </span>
                      {matchedTheory.map(t => (
                        <div
                          key={t.id}
                          onClick={() => handleSelectResult(t.sheetNav)}
                          className="px-3 py-2 rounded-lg hover:bg-slate-800/60 cursor-pointer flex items-center justify-between gap-3 text-xs transition-colors"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            <div className="truncate">
                              <span className="font-semibold text-white block truncate">
                                {t.title}
                              </span>
                              <span className="text-[10px] text-slate-400 truncate block">
                                {t.statement}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Formulas Cheatsheet */}
                  {matchedFormulas.length > 0 && (
                    <div className="space-y-1">
                      <span className="px-3 text-[10px] font-bold text-emerald-400 uppercase font-mono block">
                        Global Formulas ({matchedFormulas.length})
                      </span>
                      {matchedFormulas.map(f => (
                        <div
                          key={f.id}
                          onClick={() => handleSelectResult("global-equations")}
                          className="px-3 py-2 rounded-lg hover:bg-slate-800/60 cursor-pointer flex items-center justify-between gap-3 text-xs transition-colors"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <div className="truncate">
                              <span className="font-semibold text-white block truncate">
                                {f.name} ({f.chapterId.toUpperCase()})
                              </span>
                              <span className="text-[10px] text-slate-400 truncate block font-mono">
                                {f.latex}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Video Lectures */}
                  {matchedVideos.length > 0 && (
                    <div className="space-y-1">
                      <span className="px-3 text-[10px] font-bold text-red-400 uppercase font-mono block">
                        Video Lectures ({matchedVideos.length})
                      </span>
                      {matchedVideos.map(v => (
                        <div
                          key={v.id}
                          onClick={() => handleSelectResult("videos")}
                          className="px-3 py-2 rounded-lg hover:bg-slate-800/60 cursor-pointer flex items-center justify-between gap-3 text-xs transition-colors"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <Tv className="w-3.5 h-3.5 text-red-400 shrink-0" />
                            <div className="truncate">
                              <span className="font-semibold text-white block truncate">
                                {v.title}
                              </span>
                              <span className="text-[10px] text-slate-400 truncate block">
                                {v.chapter} • {v.duration}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setIsMobileSearchActive(prev => !prev)}
            className={`sm:hidden p-2.5 rounded-xl border transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isMobileSearchActive
                ? "bg-indigo-600 text-white border-indigo-500"
                : "bg-slate-900 border-slate-800 text-slate-300 active:bg-slate-800"
            }`}
            title="Search RefLib"
            aria-label="Open search bar"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* PWA Install Button */}
          <PWAInstallButton variant="header" />

          {/* Constants Modal Button */}
          <button
            onClick={onOpenConstants}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 transition-colors min-h-[44px] active:scale-95"
            title="Physical Constants Reference"
            aria-label="Physical Constants Reference"
          >
            <Hash className="w-4 h-4 text-indigo-400" />
            <span className="hidden md:inline">Constants</span>
          </button>

          {/* Cramming Arena Quick Button */}
          <button
            onClick={() => onSelectTab("cramming-arena")}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-medium transition-colors min-h-[44px] active:scale-95"
            title="Open Cramming Arena"
            aria-label="Open Cramming Arena"
          >
            <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="hidden sm:inline">Cramming Arena</span>
          </button>

          {/* Discord Link (Desktop only) */}
          <a
            href="https://discord.gg/p6hkRbzFTn"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex p-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 transition-colors min-h-[44px] min-w-[44px] items-center justify-center"
            title="Join Study Discord"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Expandable Search Input for Mobile Phones */}
      {isMobileSearchActive && (
        <div className="sm:hidden px-3 pb-3 pt-1 border-t border-slate-800/80 bg-slate-950 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              ref={mobileInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formulas, sheet problems, proofs..."
              className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-sans"
            />
            <button
              onClick={() => {
                if (searchQuery) {
                  setSearchQuery("");
                } else {
                  setIsMobileSearchActive(false);
                }
              }}
              className="absolute right-2.5 top-2.5 p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Instant Results Card */}
          {hasQuery && (
            <div className="mt-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl max-h-[60vh] overflow-y-auto divide-y divide-slate-800">
              <div className="px-3 py-1.5 bg-slate-950/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>RESULTS FOR &quot;{searchQuery}&quot;</span>
                <span className="text-indigo-400">{totalResults} MATCHES</span>
              </div>

              {totalResults === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  No matching items found.
                </div>
              ) : (
                <div className="p-1 space-y-2">
                  {matchedProblems.length > 0 && (
                    <div>
                      <span className="px-2 py-1 text-[10px] font-bold text-cyan-400 uppercase font-mono block">
                        Solved Sheet Problems ({matchedProblems.length})
                      </span>
                      {matchedProblems.map(p => (
                        <div
                          key={p.id}
                          onClick={() => handleSelectResult(p.sheetNav)}
                          className="px-2.5 py-2 rounded-lg hover:bg-slate-800 active:bg-slate-800 cursor-pointer flex items-center justify-between text-xs"
                        >
                          <div className="truncate mr-2">
                            <span className="font-semibold text-white block truncate">{p.title}</span>
                            <span className="text-[10px] text-slate-400 truncate block">{p.statement}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {matchedTheory.length > 0 && (
                    <div>
                      <span className="px-2 py-1 text-[10px] font-bold text-indigo-400 uppercase font-mono block">
                        Theory & Derivations ({matchedTheory.length})
                      </span>
                      {matchedTheory.map(t => (
                        <div
                          key={t.id}
                          onClick={() => handleSelectResult(t.sheetNav)}
                          className="px-2.5 py-2 rounded-lg hover:bg-slate-800 active:bg-slate-800 cursor-pointer flex items-center justify-between text-xs"
                        >
                          <div className="truncate mr-2">
                            <span className="font-semibold text-white block truncate">{t.title}</span>
                            <span className="text-[10px] text-slate-400 truncate block">{t.statement}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {matchedFormulas.length > 0 && (
                    <div>
                      <span className="px-2 py-1 text-[10px] font-bold text-emerald-400 uppercase font-mono block">
                        Global Formulas ({matchedFormulas.length})
                      </span>
                      {matchedFormulas.map(f => (
                        <div
                          key={f.id}
                          onClick={() => handleSelectResult("global-equations")}
                          className="px-2.5 py-2 rounded-lg hover:bg-slate-800 active:bg-slate-800 cursor-pointer flex items-center justify-between text-xs"
                        >
                          <div className="truncate mr-2">
                            <span className="font-semibold text-white block truncate">{f.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono truncate block">{f.latex}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
};
