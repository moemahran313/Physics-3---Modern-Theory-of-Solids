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
  ChevronRight,
  FileCheck2,
  Bookmark,
  Sparkles,
  Printer,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { ChapterId } from "../types";
import { ChapterExamArena } from "./ChapterExamArena";
import { CHAPTER_EXAM_QUESTIONS } from "../lib/chapterExamEngineData";
import { MobileStepSolver, AIStepAnalysisResult } from "./MobileStepSolver";

interface SheetsMasterclassViewProps {
  sheet: MasterclassSheet;
  onOpenConstants: () => void;
  onOpenExamTrainer?: () => void;
  onOpenChapterExam?: (chapterId: ChapterId) => void;
}

export const SheetsMasterclassView: React.FC<SheetsMasterclassViewProps> = ({
  sheet,
  onOpenConstants,
  onOpenExamTrainer,
  onOpenChapterExam,
}) => {
  const [activeSection, setActiveSection] = useState<"all" | "theory" | "problems" | "exam">("all");
  const chapterExamCount = CHAPTER_EXAM_QUESTIONS.filter(q => q.chapterId === `ch${sheet.number}`).length;
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
      <div className="mobile-pad-hero p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-cyan-400 font-semibold">Sheet {sheet.number}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>ELCn114 Course Guide</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Modern Academy</span>
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
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-200 transition-colors min-h-[44px] flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onOpenConstants}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-200 transition-colors min-h-[44px] text-center"
            >
              Constants Keypad
            </button>
            {onOpenChapterExam && (
              <button
                onClick={() => onOpenChapterExam(`ch${sheet.number}` as ChapterId)}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors min-h-[44px] flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20"
                title={`Launch Chapter ${sheet.number} Examination & Assessment`}
              >
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
                <span>Examine Sheet {sheet.number}</span>
              </button>
            )}
            {onOpenExamTrainer && (
              <button
                onClick={onOpenExamTrainer}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-medium text-white transition-colors min-h-[44px] text-center"
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
            <button
              onClick={() => setActiveSection("exam")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] flex items-center justify-center gap-1.5 ${
                activeSection === "exam" ? "bg-cyan-600 text-white shadow-sm" : "text-cyan-400 hover:text-cyan-200"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden">Examine ({chapterExamCount})</span>
              <span className="hidden sm:inline">Part (III): Examine Sheet {sheet.number} ({chapterExamCount})</span>
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
          {/* Chapter Examination Callout Banner */}
          {onOpenChapterExam && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Interactive Testing Engine for Sheet {sheet.number}</span>
                </div>
                <p className="text-xs text-slate-300">
                  Test your answers on Sheet {sheet.number} problems with real-time numerical analysis, analytical tolerances, and Modern Academy exam trap warnings.
                </p>
              </div>
              <button
                onClick={() => onOpenChapterExam(`ch${sheet.number}` as ChapterId)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors shrink-0 flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 min-h-[44px]"
              >
                <span>Launch Sheet {sheet.number} Exam Suite</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

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

      {/* Part (III): Embedded Chapter Examination & Assessment Suite */}
      {activeSection === "exam" && (
        <section className="space-y-4 pt-1">
          <ChapterExamArena
            initialChapterId={`ch${sheet.number}` as ChapterId}
            onOpenConstants={onOpenConstants}
          />
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
  const [isDerivationOpen, setIsDerivationOpen] = useState(true);

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
          <div className="rounded-xl bg-slate-950/95 border border-indigo-900/50 shadow-inner overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-indigo-950/40 border-b border-indigo-900/40">
              <button
                onClick={() => setIsDerivationOpen(!isDerivationOpen)}
                className="flex items-center gap-2 text-left group"
                aria-expanded={isDerivationOpen}
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider font-mono group-hover:text-indigo-200 transition-colors">
                  Official Proof & Derivation
                </span>
                {isDerivationOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-indigo-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />
                )}
              </button>
              <button
                onClick={() => onCopy(item.proofOrDerivation!, `${item.id}-proof`)}
                className="p-1 rounded-md text-slate-400 hover:text-indigo-200 hover:bg-indigo-900/40 transition-colors shrink-0"
                title="Copy official derivation LaTeX"
                aria-label="Copy derivation"
              >
                {copiedId === `${item.id}-proof` ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
            <div className={`p-3 sm:p-3.5 text-xs text-slate-200 overflow-x-auto max-w-full ${isDerivationOpen ? "block" : "hidden print:block"}`}>
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
              <div key={idx} className="px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-800/80 overflow-x-auto max-w-full text-center scrollbar-none">
                <MathView math={formula} displayMode={true} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Takeaway */}
      <div className="mt-auto pt-3 border-t border-slate-800/80 text-xs text-amber-300/90 leading-relaxed">
        <span className="font-semibold text-amber-200">Takeaway: </span>
        <FormattedContent content={item.takeaway} />
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
  const [showPracticePad, setShowPracticePad] = useState(false);
  const [showSolutionSteps, setShowSolutionSteps] = useState(true);
  const [stepScore, setStepScore] = useState<number | null>(null);

  const handleSaveSheetWork = (
    _steps: string[],
    _finalLatex: string,
    analysis?: AIStepAnalysisResult
  ) => {
    if (analysis) {
      setStepScore(analysis.scorePercent);
    }
  };

  return (
    <div className="mobile-optimized-card rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all shadow-sm">
      {/* Problem Header (Tap to toggle) */}
      <div
        onClick={onToggle}
        className="p-3.5 sm:p-4 cursor-pointer hover:bg-slate-850/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 select-none"
      >
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <span className="font-mono text-sm font-bold text-cyan-400 shrink-0 mt-0.5 sm:mt-0">
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

        <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
          {stepScore !== null && (
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-950 text-cyan-300 border border-indigo-500/50">
              {stepScore}% Step Credit
            </span>
          )}
          <span className="text-xs font-mono text-slate-400">
            {problem.officialSolution.calculationSteps.length} Steps
          </span>
          <button
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label={isExpanded ? "Collapse problem" : "Expand problem"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Solution & Step Practice Body */}
      <div
        className={`${
          isExpanded ? "block" : "hidden print:block"
        } p-3.5 sm:p-5 pt-2 border-t border-slate-800/80 bg-slate-950/60 space-y-4 text-xs sm:text-sm`}
      >
        {/* Statement */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 leading-relaxed text-sm sm:text-base">
          <span className="text-cyan-400 font-mono font-bold text-[11px] uppercase block mb-1">
            Problem Statement:
          </span>
          <FormattedContent content={problem.statement} />
        </div>

        {/* Given & Required */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[11px] font-bold text-indigo-300 uppercase font-mono block mb-1.5">
              What Is Given:
            </span>
            <ul className="space-y-1.5 text-slate-200 font-mono text-xs sm:text-sm">
              {problem.givenParameters.map((p, i) => (
                <li key={i} className="flex items-center gap-2 overflow-x-auto">
                  <span className="text-indigo-400 shrink-0">•</span>
                  <MathView math={p} displayMode={false} />
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[11px] font-bold text-cyan-300 uppercase font-mono block mb-1.5">
              What We Want to Find:
            </span>
            <ul className="space-y-1.5 text-slate-200 font-mono text-xs sm:text-sm">
              {problem.requiredAnswers.map((r, i) => (
                <li key={i} className="flex items-center gap-2 overflow-x-auto">
                  <span className="text-cyan-400 shrink-0">•</span>
                  <MathView math={r} displayMode={false} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Toggle Practice Mode vs Easy Step Breakdown */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-900 border border-indigo-500/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-white">
              Want to solve this step-by-step with AI hints & LaTeX pad?
            </span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setShowPracticePad((prev) => {
                  const next = !prev;
                  if (next) setShowSolutionSteps(false);
                  else setShowSolutionSteps(true);
                  return next;
                });
              }}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors min-h-[40px]"
            >
              {showPracticePad ? "Close Practice Pad" : "Practice Steps with AI"}
            </button>
            <button
              type="button"
              onClick={() => setShowSolutionSteps((prev) => !prev)}
              className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors min-h-[40px]"
            >
              {showSolutionSteps ? "Hide Solution Steps" : "Show Easy Steps"}
            </button>
          </div>
        </div>

        {/* Interactive Mobile LaTeX & AI Step Solver */}
        {showPracticePad && (
          <MobileStepSolver
            problemId={problem.id}
            problemTitle={problem.title}
            problemPrompt={problem.statement}
            governingFormula={problem.officialSolution.governingFormula}
            officialSteps={problem.officialSolution.calculationSteps.map((s) => ({
              step: s.step,
              latex: s.latex,
              explanation: s.note,
            }))}
            expectedValue={problem.officialSolution.finalValue}
            units={problem.officialSolution.units}
            onSaveWork={handleSaveSheetWork}
            compact={true}
          />
        )}

        {/* Easy Step-by-Step Solution Breakdown (Focused on Method & Steps) */}
        {showSolutionSteps && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase font-mono">
                Easy Step-by-Step Breakdown (Focus on Method):
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(
                    problem.officialSolution.calculationSteps
                      .map((s) => `${s.step}: ${s.latex}`)
                      .join("\n"),
                    problem.id
                  );
                }}
                className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 active:scale-95"
              >
                {copiedId === problem.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedId === problem.id ? "Copied" : "Copy Steps"}</span>
              </button>
            </div>

            {/* Step 0: Starting Formula */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-xs font-mono font-bold text-indigo-300 block">
                Starting Formula:
              </span>
              <div className="overflow-x-auto max-w-full py-1">
                <MathView math={problem.officialSolution.governingFormula} displayMode={true} />
              </div>
            </div>

            {/* Numbered Step Cards */}
            <div className="space-y-2.5">
              {problem.officialSolution.calculationSteps.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                      Step {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">{s.step}</span>
                  </div>

                  {s.note && (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <FormattedContent content={s.note} />
                    </p>
                  )}

                  <div className="py-2 px-3 rounded-lg bg-slate-950 border border-slate-800/80 overflow-x-auto max-w-full">
                    <MathView math={s.latex} displayMode={true} />
                  </div>
                </div>
              ))}
            </div>

            {/* Exam Pitfall Warning */}
            {problem.pitfallWarning && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold text-xs block uppercase font-mono text-rose-300">
                    Common Mistake to Avoid:
                  </span>
                  <div className="text-xs sm:text-sm leading-relaxed">
                    <FormattedContent content={problem.pitfallWarning} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

