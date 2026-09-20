import React, { useState } from "react";
import { MasterclassSheet, MasterclassProblem, MasterclassTheoryItem } from "../types";
import { MathView, LaTeXRenderer, FormattedContent } from "./LaTeXRenderer";
import { 
  BookOpen, 
  AlertTriangle, 
  Search, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp,
  FileCheck2,
  Bookmark,
  Sparkles,
  Printer
} from "lucide-react";

interface SheetsMasterclassViewProps {
  sheet: MasterclassSheet;
  onOpenConstants: () => void;
  onOpenExamTrainer?: () => void;
}

export const SheetsMasterclassView: React.FC<SheetsMasterclassViewProps> = ({
  sheet,
  onOpenConstants,
  onOpenExamTrainer,
}) => {
  const [activeSection, setActiveSection] = useState<"all" | "theory" | "problems">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedProblems, setExpandedProblems] = useState<Record<string, boolean>>({
    [sheet.solvedProblems[0]?.id || ""]: true
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleProblem = (id: string) => {
    setExpandedProblems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredTheory = sheet.theoryParts.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.keyFormulas.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredProblems = sheet.solvedProblems.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.officialSolution.governingFormula.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCount = sheet.theoryParts.length + sheet.solvedProblems.length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Sheet Header Hero */}
      <div className="mobile-pad-hero p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs border border-indigo-500/30">
                Official Department Sheet #{sheet.number}
              </span>
              <span className="text-xs text-slate-400 font-mono">ELCn114 Course Guide</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
              {sheet.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {sheet.subtitle}
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-0.5">
              <Bookmark className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Instructors: <strong className="text-slate-200">{sheet.instructor}</strong></span>
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 md:pt-0">
            <button
              onClick={() => window.print()}
              title="Print Sheet / Export to PDF"
              className="px-3.5 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/40 border border-indigo-500/50 text-xs font-medium text-indigo-200 transition-colors min-h-[40px] flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onOpenConstants}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition-colors min-h-[40px] text-center"
            >
              Constants Keypad
            </button>
            {onOpenExamTrainer && (
              <button
                onClick={onOpenExamTrainer}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-xs font-medium text-rose-300 transition-colors min-h-[40px] text-center"
              >
                Cram This Sheet
              </button>
            )}
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Scrollable pill buttons */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 w-full sm:w-auto overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveSection("all")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all min-h-[36px] ${
                activeSection === "all" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="sm:hidden">All ({totalCount})</span>
              <span className="hidden sm:inline">Full Masterclass ({totalCount})</span>
            </button>
            <button
              onClick={() => setActiveSection("theory")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all min-h-[36px] ${
                activeSection === "theory" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="sm:hidden">Theory ({sheet.theoryParts.length})</span>
              <span className="hidden sm:inline">Part (I): Theory & Proofs ({sheet.theoryParts.length})</span>
            </button>
            <button
              onClick={() => setActiveSection("problems")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all min-h-[36px] ${
                activeSection === "problems" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="sm:hidden">Problems ({sheet.solvedProblems.length})</span>
              <span className="hidden sm:inline">Part (II): Problems ({sheet.solvedProblems.length})</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={`Filter in Sheet ${sheet.number}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Part (I): Theory & Official Proofs */}
      {(activeSection === "all" || activeSection === "theory") && (
        <section className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
            <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
            <h2 className="text-xs sm:text-sm font-bold tracking-wide uppercase text-slate-300 font-mono">
              Part (I): Theory, Proofs & Course Derivations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {filteredTheory.map((item) => (
              <TheoryCard 
                key={item.id} 
                item={item} 
                onCopy={copyToClipboard}
                copiedId={copiedId}
              />
            ))}
          </div>
        </section>
      )}

      {/* Part (II): Solved Analytical Problems */}
      {(activeSection === "all" || activeSection === "problems") && (
        <section className="space-y-3 sm:space-y-4 pt-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold tracking-wide uppercase text-slate-300 font-mono">
                Part (II): Solved Numerical Problems
              </h2>
            </div>
            <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
              {filteredProblems.length} Items
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {filteredProblems.map((prob) => {
              const isExpanded = !!expandedProblems[prob.id];
              return (
                <ProblemCard
                  key={prob.id}
                  problem={prob}
                  isExpanded={isExpanded}
                  onToggle={() => toggleProblem(prob.id)}
                  onCopy={copyToClipboard}
                  copiedId={copiedId}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

interface TheoryCardProps {
  item: MasterclassTheoryItem;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}

const TheoryCard: React.FC<TheoryCardProps> = ({ item, onCopy, copiedId }) => {
  return (
    <div className="mobile-optimized-card p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-3.5 h-full">
      <div className="space-y-3">
        {/* Title & Copy */}
        <div className="flex items-start justify-between gap-2.5">
          <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">
            {item.title}
          </h3>
          <button
            onClick={() => onCopy(item.statement, item.id)}
            className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80 transition-colors shrink-0 active:scale-95"
            title="Copy statement"
            aria-label="Copy statement"
          >
            {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Statement (With inline Math support) */}
        <div className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
          <FormattedContent content={item.statement} />
        </div>

        {/* Official Proof / Derivation */}
        {item.proofOrDerivation && (
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950/90 border border-indigo-900/40 text-xs text-slate-200 space-y-2 shadow-inner">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Official Proof / Derivation:</span>
            </div>
            <div className="overflow-x-auto max-w-full text-slate-300">
              <FormattedContent content={item.proofOrDerivation} />
            </div>
          </div>
        )}

        {/* Governing Equations */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono block">
            Governing Equations:
          </span>
          <div className="space-y-1.5">
            {item.keyFormulas.map((formula, idx) => (
              <div key={idx} className="px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-800/80 overflow-x-auto max-w-full">
                <MathView math={formula} displayMode={true} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Takeaway */}
      <div className="mt-auto pt-3 border-t border-slate-800/80 flex items-start gap-2 text-[11px] sm:text-xs text-amber-300 font-medium leading-relaxed">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5"></span>
        <div className="flex-1">
          <FormattedContent content={item.takeaway} />
        </div>
      </div>
    </div>
  );
};

interface ProblemCardProps {
  problem: MasterclassProblem;
  isExpanded: boolean;
  onToggle: () => void;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  isExpanded,
  onToggle,
  onCopy,
  copiedId,
}) => {
  return (
    <div className="mobile-optimized-card rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all shadow-sm">
      {/* Problem Header (Click to toggle) */}
      <div 
        onClick={onToggle}
        className="p-3.5 sm:p-4 cursor-pointer hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 select-none"
      >
        <div className="flex items-start sm:items-center gap-2.5 min-w-0">
          <span className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            #{problem.problemNumber}
          </span>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-semibold text-white truncate">
              {problem.title}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1">
              {problem.statement}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
          <span className="text-[11px] sm:text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Ans: {problem.officialSolution.finalValue} {problem.officialSolution.units}
          </span>
          <button 
            className="p-1 text-slate-400 hover:text-white"
            aria-label={isExpanded ? "Collapse problem" : "Expand problem"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Solution Body (collapsible on screen, always visible for print) */}
      <div className={`${isExpanded ? "block" : "hidden print:block"} p-3.5 sm:p-5 pt-2 border-t border-slate-800/80 bg-slate-950/60 space-y-4 text-xs`}>
        {/* Statement */}
          <div className="p-3 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 leading-relaxed text-xs sm:text-sm">
            <span className="text-slate-400 font-mono font-bold text-[10px] uppercase block mb-1">
              Official Problem Statement:
            </span>
            <FormattedContent content={problem.statement} />
          </div>

          {/* Given Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1.5">
                Given Parameters:
              </span>
              <ul className="space-y-1 text-slate-300 font-mono">
                {problem.givenParameters.map((p, i) => (
                  <li key={i} className="flex items-center gap-1.5 overflow-x-auto">
                    <span className="text-indigo-400 shrink-0">•</span>
                    <MathView math={p} displayMode={false} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1.5">
                Required Quantities:
              </span>
              <ul className="space-y-1 text-slate-300 font-mono">
                {problem.requiredAnswers.map((r, i) => (
                  <li key={i} className="flex items-center gap-1.5 overflow-x-auto">
                    <span className="text-cyan-400 shrink-0">•</span>
                    <MathView math={r} displayMode={false} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Calculation Steps */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono">
                Step-by-Step Solution:
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(problem.officialSolution.calculationSteps.map(s => `${s.step}: ${s.latex}`).join("\n"), problem.id);
                }}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800/80 active:scale-95"
              >
                {copiedId === problem.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === problem.id ? "Copied" : "Copy Steps"}</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono overflow-x-auto">
              <span className="text-[10px] text-slate-400 block mb-1">Governing Formula:</span>
              <div className="overflow-x-auto max-w-full pb-1">
                <MathView math={problem.officialSolution.governingFormula} displayMode={true} />
              </div>
            </div>

            <div className="space-y-2">
              {problem.officialSolution.calculationSteps.map((s, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[11px] text-slate-300 font-medium block mb-1">
                    Step {idx + 1}: {s.step}
                  </span>
                  <div className="py-1 overflow-x-auto max-w-full">
                    <MathView math={s.latex} displayMode={true} />
                  </div>
                  {s.note && <p className="text-[10px] text-slate-400 italic mt-1">{s.note}</p>}
                </div>
              ))}
            </div>

            {/* Exam Trap Warning */}
            {problem.pitfallWarning && (
              <div className="p-3 sm:p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[11px] block uppercase font-mono">Modern Academy Exam Pitfall:</span>
                  <div className="text-[11px] text-rose-200/90 mt-0.5 leading-relaxed">
                    <FormattedContent content={problem.pitfallWarning} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};
