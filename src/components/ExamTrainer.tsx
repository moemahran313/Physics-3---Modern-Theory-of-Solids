import React, { useState } from "react";
import { EXAM_QUESTIONS } from "../lib/examQuestions";
import { ExamQuestion } from "../types";
import { MathView, FormattedContent } from "./MathView";
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  AlertTriangle, 
  Eye, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  RotateCcw, 
  Sparkles 
} from "lucide-react";

export const ExamTrainer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredQuestions = EXAM_QUESTIONS.filter((q) => {
    if (typeFilter === "all") return true;
    return q.type.startsWith(typeFilter);
  });

  const activeQuestion: ExamQuestion = filteredQuestions[currentIndex] || EXAM_QUESTIONS[0];
  const currentAnswer = selectedAnswers[activeQuestion.id];
  const isRevealed = revealedSolutions[activeQuestion.id];

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: optionId,
    }));
  };

  const handleToggleReveal = () => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [activeQuestion.id]: !prev[activeQuestion.id],
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setRevealedSolutions({});
    setCurrentIndex(0);
  };

  // Calculate score
  const answeredCount = Object.keys(selectedAnswers).length;
  let correctCount = 0;
  Object.entries(selectedAnswers).forEach(([qId, ans]) => {
    const q = EXAM_QUESTIONS.find((item) => item.id === qId);
    if (q && q.correctOption === ans) {
      correctCount++;
    }
  });

  return (
    <div className="space-y-6">
      {/* Title & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                <GraduationCap className="w-5 h-5" />
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Modern Academy Exam Trainer (Physics 3)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Authentic high-yield problems aligned with ELCN114 / ELC 214 midterms and finals. Enforcing two-part MCQs, formal derivations, boundary probability, and relativistic coordinate matrices.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[11px] text-slate-400 font-mono">Performance:</div>
              <div className="text-sm font-bold font-mono text-emerald-400">
                {correctCount} / {answeredCount} Correct
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Reset Exam Session"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800/80">
          <span className="text-xs text-slate-500 font-mono">Filter Type:</span>
          <button
            onClick={() => { setTypeFilter("all"); setCurrentIndex(0); }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              typeFilter === "all"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                : "bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            All Question Types
          </button>
          <button
            onClick={() => { setTypeFilter("Type A"); setCurrentIndex(0); }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              typeFilter === "Type A"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                : "bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            Type A: Two-Part MCQ
          </button>
          <button
            onClick={() => { setTypeFilter("Type B"); setCurrentIndex(0); }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              typeFilter === "Type B"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                : "bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            Type B: Formal Derivations
          </button>
          <button
            onClick={() => { setTypeFilter("Type C"); setCurrentIndex(0); }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              typeFilter === "Type C"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                : "bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            Type C: Boundary Probability
          </button>
          <button
            onClick={() => { setTypeFilter("Type D"); setCurrentIndex(0); }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              typeFilter === "Type D"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                : "bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            Type D: Relativistic Coordinates
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-6 shadow-xl">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {activeQuestion.type}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {activeQuestion.chapterId.toUpperCase()} • Problem {currentIndex + 1} of {filteredQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400">
              {currentIndex + 1}/{filteredQuestions.length}
            </span>
            <button
              disabled={currentIndex >= filteredQuestions.length - 1}
              onClick={() => setCurrentIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Title & Prompt */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white">
            {activeQuestion.title}
          </h3>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 leading-relaxed font-sans">
            <FormattedContent content={activeQuestion.promptLatex} />
          </div>
        </div>

        {/* Multiple Choice Options (If applicable) */}
        {activeQuestion.options && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Select Your Answer:
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {activeQuestion.options.map((opt) => {
                const isSelected = currentAnswer === opt.id;
                const isCorrect = isRevealed && opt.id === activeQuestion.correctOption;
                const isWrong = isRevealed && isSelected && opt.id !== activeQuestion.correctOption;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm font-sans transition-all flex items-start gap-3 ${
                      isCorrect
                        ? "bg-emerald-950/40 border-emerald-500/80 text-emerald-200"
                        : isWrong
                        ? "bg-rose-950/40 border-rose-500/80 text-rose-200"
                        : isSelected
                        ? "bg-indigo-950/60 border-indigo-500 text-white shadow-md"
                        : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60"
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 ${
                      isSelected ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}>
                      {opt.id}
                    </span>
                    <span className="flex-1 pt-0.5">{opt.text}</span>
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                    {isWrong && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={handleToggleReveal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>{isRevealed ? "Hide Solution Track" : "Reveal Full Solution & Rubric"}</span>
          </button>

          {activeQuestion.correctOption && isRevealed && (
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Official Modern Academy Key:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                Option {activeQuestion.correctOption}
              </span>
            </div>
          )}
        </div>

        {/* Solution & Rubric Reveal Panel */}
        {isRevealed && (
          <div className="p-5 rounded-xl bg-slate-950/90 border border-indigo-900/40 space-y-5 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-800 pb-2">
              <Award className="w-4 h-4" />
              <span>Full Modern Academy Mathematical Solution & Rubric Track</span>
            </div>

            {/* Starting Axiom */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <span className="text-indigo-400 font-mono text-[11px] block mb-1">Starting Axiom / Governing Law:</span>
              <div className="text-slate-200">
                <FormattedContent content={activeQuestion.solutionTrack.startingAxiom} />
              </div>
            </div>

            {/* Step-by-Step Derivation */}
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Step-by-Step Mathematical Derivation:
              </span>
              {activeQuestion.solutionTrack.stepByStepDerivation.map((s, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                  <div className="font-semibold text-indigo-300">{s.step}</div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 overflow-x-auto">
                    <MathView math={s.mathLatex} displayMode={true} />
                  </div>
                  <p className="text-slate-400 text-[11px]">{s.rationale}</p>
                </div>
              ))}
            </div>

            {/* Mandatory Physical Justification */}
            <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-xs space-y-1">
              <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[11px] block">
                Part 2: Mandatory Physical Justification:
              </span>
              <p className="text-slate-200 leading-relaxed">
                {activeQuestion.solutionTrack.physicalJustification}
              </p>
            </div>

            {/* Common Traps */}
            <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-800/40 text-xs space-y-1.5">
              <div className="text-rose-400 font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Modern Academy Common Student Pitfalls & Exam Traps:</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-rose-200/90 text-[11px]">
                {activeQuestion.solutionTrack.commonTraps.map((trap, i) => (
                  <li key={i}>{trap}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
