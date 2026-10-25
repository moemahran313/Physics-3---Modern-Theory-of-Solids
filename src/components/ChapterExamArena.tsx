import React, { useState, useEffect } from "react";
import { ChapterId, ChapterExamQuestion, ChapterExamEvaluation } from "../types";
import { CHAPTER_EXAM_QUESTIONS, CHAPTER_METADATA } from "../lib/chapterExamEngineData";
import { evaluateStudentAnswer } from "../lib/physicsEvaluator";
import { mapAIAnalysisToExamEvaluation } from "../lib/aiExamWrapper";
import { MathView, LaTeXPlayground, FormattedContent } from "./LaTeXRenderer";
import { MobileStepSolver, AIStepAnalysisResult } from "./MobileStepSolver";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  HelpCircle,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Bookmark,
  BookOpen,
  Calculator,
  ShieldCheck,
  Lightbulb,
  Check,
  Flag,
  FileText,
  AlertTriangle,
  Play,
  Pause,
  LayoutGrid,
} from "lucide-react";

interface ChapterExamArenaProps {
  initialChapterId?: ChapterId;
  onOpenConstants: () => void;
  onOpenCalculator?: () => void;
  onNavigateToSheet?: (sheetNumber: number) => void;
}

export const ChapterExamArena: React.FC<ChapterExamArenaProps> = ({
  initialChapterId = "ch1",
  onOpenConstants,
  onOpenCalculator,
  onNavigateToSheet,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useLocalStorage<ChapterId>(
    "chapter_exam_active_chapter",
    initialChapterId
  );

  useEffect(() => {
    if (initialChapterId) {
      setSelectedChapterId(initialChapterId);
    }
  }, [initialChapterId, setSelectedChapterId]);

  const [examMode, setExamMode] = useLocalStorage<"study" | "strict">(
    "chapter_exam_mode",
    "study"
  );

  const [activeQuestionIdx, setActiveQuestionIdx] = useLocalStorage<number>(
    `chapter_exam_idx_${selectedChapterId}`,
    0
  );

  // Student final LaTeX answers: questionId -> string
  const [userInputs, setUserInputs] = useLocalStorage<Record<string, string>>(
    `chapter_exam_inputs_${selectedChapterId}`,
    {}
  );

  // Student multi-step work: questionId -> string[]
  const [userSteps, setUserSteps] = useLocalStorage<Record<string, string[]>>(
    `chapter_exam_steps_${selectedChapterId}`,
    {}
  );

  // Evaluated answers (from AI Step Analyzer or local evaluator): questionId -> ChapterExamEvaluation
  const [evaluations, setEvaluations] = useLocalStorage<Record<string, ChapterExamEvaluation>>(
    `chapter_exam_evals_${selectedChapterId}`,
    {}
  );

  // Flagged questions for review
  const [flaggedQuestions, setFlaggedQuestions] = useLocalStorage<Record<string, boolean>>(
    `chapter_exam_flags_${selectedChapterId}`,
    {}
  );

  // Revealed progressive hints: questionId -> active hint tier (1, 2, or 3)
  const [revealedHintTiers, setRevealedHintTiers] = useState<Record<string, number>>({});

  // Mobile drawer for full question grid & tools
  const [isMobileGridOpen, setIsMobileGridOpen] = useState<boolean>(false);

  // Timer states (in seconds)
  const [timerSeconds, setTimerSeconds] = useState<number>(3600);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Scratchpad toggle
  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);

  // Submission report modal
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [confirmingReset, setConfirmingReset] = useState<boolean>(false);

  // Current chapter questions
  const currentChapterQuestions = CHAPTER_EXAM_QUESTIONS.filter(
    (q) => q.chapterId === selectedChapterId
  );

  const safeIdx = Math.min(
    Math.max(0, activeQuestionIdx),
    Math.max(0, currentChapterQuestions.length - 1)
  );

  const currentQuestion: ChapterExamQuestion | undefined = currentChapterQuestions[safeIdx];
  const currentInputValue = currentQuestion ? userInputs[currentQuestion.id] || "" : "";
  const currentStepsList = currentQuestion ? userSteps[currentQuestion.id] || [""] : [""];
  const isFlagged = currentQuestion ? !!flaggedQuestions[currentQuestion.id] : false;
  const activeHintTier = currentQuestion ? revealedHintTiers[currentQuestion.id] || 0 : 0;

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(remainingSecs).padStart(2, "0")}`;
  };

  const handleSelectChapter = (chId: ChapterId) => {
    setSelectedChapterId(chId);
    setActiveQuestionIdx(0);
  };

  // Save student steps & AI step evaluation into persistent state via aiExamWrapper
  const handleSaveStudentWork = (
    stepsList: string[],
    finalLatex: string,
    aiAnalysis?: AIStepAnalysisResult
  ) => {
    if (!currentQuestion) return;
    setUserSteps((prev) => ({
      ...prev,
      [currentQuestion.id]: stepsList,
    }));
    setUserInputs((prev) => ({
      ...prev,
      [currentQuestion.id]: finalLatex,
    }));

    if (aiAnalysis) {
      const evalRecord = mapAIAnalysisToExamEvaluation(
        aiAnalysis,
        currentQuestion,
        finalLatex
      );
      setEvaluations((prev) => ({
        ...prev,
        [currentQuestion.id]: evalRecord,
      }));
    } else if (finalLatex.trim()) {
      const localEval = evaluateStudentAnswer(finalLatex, currentQuestion);
      if (localEval.status === "correct" || localEval.status === "near-miss") {
        setEvaluations((prev) => ({
          ...prev,
          [currentQuestion.id]: localEval,
        }));
      }
    }
  };

  const handleResetChapter = () => {
    setUserInputs({});
    setUserSteps({});
    setEvaluations({});
    setFlaggedQuestions({});
    setRevealedHintTiers({});
    setActiveQuestionIdx(0);
    setTimerSeconds(3600);
    setConfirmingReset(false);
  };

  const handleToggleFlag = () => {
    if (!currentQuestion) return;
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleUnlockHint = () => {
    if (!currentQuestion) return;
    setRevealedHintTiers((prev) => ({
      ...prev,
      [currentQuestion.id]: Math.min(3, (prev[currentQuestion.id] || 0) + 1),
    }));
  };

  let totalEarnedPoints = 0;
  let totalPossiblePoints = 0;

  currentChapterQuestions.forEach((q) => {
    totalPossiblePoints += q.points;
    const ev = evaluations[q.id];
    if (ev) {
      totalEarnedPoints += (q.points * ev.scorePercent) / 100;
    }
  });

  const percentScore =
    totalPossiblePoints > 0 ? Math.round((totalEarnedPoints / totalPossiblePoints) * 100) : 0;

  const currentChapterMeta =
    CHAPTER_METADATA.find((m) => m.id === selectedChapterId) || CHAPTER_METADATA[0];

  return (
    <div className="space-y-3 sm:space-y-5">
      {/* Flat Unified Header & Chapter Bar (Zero nested boxes) */}
      <div className="border-b border-slate-800 pb-3 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <h1 className="text-base sm:text-xl font-bold text-white tracking-tight truncate">
              Chapter Exam & Step Analyzer
            </h1>
          </div>

          {/* Flat Unboxed HUD: Mode · Timer · Score · Reset */}
          <div className="flex items-center gap-2 text-xs font-mono ml-auto">
            <div className="inline-flex bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              <button
                onClick={() => setExamMode("study")}
                className={`px-2 py-1 rounded-md transition-colors ${
                  examMode === "study"
                    ? "bg-indigo-600 text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Study
              </button>
              <button
                onClick={() => setExamMode("strict")}
                className={`px-2 py-1 rounded-md transition-colors ${
                  examMode === "strict"
                    ? "bg-rose-600 text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Exam
              </button>
            </div>

            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 text-slate-200 hover:text-white"
              title={isTimerRunning ? "Pause Timer" : "Resume Timer"}
            >
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span className={timerSeconds < 300 ? "text-rose-400 font-bold" : ""}>
                {formatTimer(timerSeconds)}
              </span>
              {isTimerRunning ? <Pause className="w-3 h-3 text-slate-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
            </button>

            <span className="text-emerald-400 font-bold">
              {totalEarnedPoints.toFixed(1)}/{totalPossiblePoints} ({percentScore}%)
            </span>

            {confirmingReset ? (
              <div className="inline-flex items-center gap-1">
                <button
                  onClick={handleResetChapter}
                  className="px-2 py-1 rounded bg-rose-600 text-[11px] font-bold text-white"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setConfirmingReset(false)}
                  className="px-1.5 py-1 rounded bg-slate-800 text-[11px] text-slate-300"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmingReset(true)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
                title="Reset Chapter Progress"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Streamlined Chapter Tabs + Mobile Question Strip in One Flat Control Area */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {CHAPTER_METADATA.map((chap) => {
            const isSelected = chap.id === selectedChapterId;
            const chapQuestions = CHAPTER_EXAM_QUESTIONS.filter((q) => q.chapterId === chap.id);
            const chapEvals = Object.keys(evaluations).filter((qId) =>
              chapQuestions.some((q) => q.id === qId)
            );
            const shortTitle = chap.title.split(":")[1]?.trim() || chap.title;

            return (
              <button
                key={chap.id}
                onClick={() => handleSelectChapter(chap.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 min-h-[36px] ${
                  isSelected
                    ? "bg-indigo-600 text-white font-semibold"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="font-mono">Ch {chap.sheetNumber}:</span>
                <span>{shortTitle}</span>
                <span
                  className={`font-mono text-[11px] ${
                    isSelected ? "text-indigo-200" : "text-slate-500"
                  }`}
                >
                  ({chapEvals.length}/{chapQuestions.length})
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Quick Question Number Strip (Flat inline row, no extra box wrapper) */}
        <div className="lg:hidden flex items-center gap-1.5 pt-1">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 py-0.5">
            {currentChapterQuestions.map((q, idx) => {
              const isCurrent = idx === safeIdx;
              const ev = evaluations[q.id];
              let btnStyle = "bg-slate-900 text-slate-400";
              if (ev) {
                if (ev.status === "correct") {
                  btnStyle = "bg-emerald-950/80 text-emerald-300 font-bold";
                } else if (ev.status === "near-miss") {
                  btnStyle = "bg-indigo-950/80 text-indigo-200 font-bold";
                } else {
                  btnStyle = "bg-amber-950/80 text-amber-300 font-bold";
                }
              }
              if (isCurrent) {
                btnStyle = "bg-cyan-500 text-slate-950 font-bold";
              }
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestionIdx(idx)}
                  className={`min-w-[36px] h-[34px] rounded-lg text-xs font-mono shrink-0 flex items-center justify-center transition-colors ${btnStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={onOpenConstants}
            className="px-2.5 h-[34px] rounded-lg bg-slate-900 text-xs text-cyan-300 font-mono shrink-0"
          >
            Const
          </button>
          <button
            onClick={() => setIsMobileGridOpen(!isMobileGridOpen)}
            className="px-2.5 h-[34px] rounded-lg bg-slate-900 text-xs text-slate-300 font-mono shrink-0 flex items-center gap-1"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
          </button>
        </div>
      </div>

      {/* Main Examination Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Column: Question Matrix & Tools (Hidden on mobile unless expanded, always visible on lg) */}
        <div
          className={`${
            isMobileGridOpen ? "block" : "hidden lg:block"
          } lg:col-span-3 space-y-4`}
        >
          <div className="sm:bg-slate-900 sm:border sm:border-slate-800 sm:rounded-xl sm:p-4 space-y-3 border-b border-slate-800 pb-3 sm:pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-slate-300">
                Questions ({safeIdx + 1}/{currentChapterQuestions.length})
              </span>
              <button
                onClick={() => setIsReportOpen(true)}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Scorecard</span>
              </button>
            </div>

            <div className="grid grid-cols-6 lg:grid-cols-4 gap-1.5">
              {currentChapterQuestions.map((q, idx) => {
                const isCurrent = idx === safeIdx;
                const ev = evaluations[q.id];
                const flagged = flaggedQuestions[q.id];

                let bgClass = "bg-slate-900 text-slate-400 hover:text-white";
                if (ev) {
                  if (ev.status === "correct") {
                    bgClass = "bg-emerald-950/70 text-emerald-300 font-bold";
                  } else if (ev.status === "near-miss") {
                    bgClass = "bg-indigo-950/70 text-indigo-300 font-bold";
                  } else {
                    bgClass = "bg-amber-950/70 text-amber-300 font-bold";
                  }
                } else if (userInputs[q.id] || (userSteps[q.id] && userSteps[q.id][0])) {
                  bgClass = "bg-slate-800 text-slate-200";
                }

                if (isCurrent) {
                  bgClass += " ring-2 ring-cyan-400 text-white";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setActiveQuestionIdx(idx);
                      setIsMobileGridOpen(false);
                    }}
                    className={`relative h-[38px] rounded-lg text-center transition-all flex items-center justify-center ${bgClass}`}
                  >
                    <span className="text-xs font-mono">{idx + 1}</span>
                    {flagged && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-800/80">
              <button
                onClick={onOpenConstants}
                className="py-2 px-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5 min-h-[38px]"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Constants</span>
              </button>
              {onOpenCalculator && (
                <button
                  onClick={onOpenCalculator}
                  className="py-2 px-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5 min-h-[38px]"
                >
                  <Calculator className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Calculator</span>
                </button>
              )}
            </div>

            <button
              onClick={() => setIsScratchpadOpen(!isScratchpadOpen)}
              className="w-full py-2 px-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-medium text-slate-300 flex items-center justify-center gap-1.5 min-h-[38px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isScratchpadOpen ? "Hide Scratchpad" : "LaTeX Scratchpad"}</span>
            </button>

            {onNavigateToSheet && (
              <button
                onClick={() => onNavigateToSheet(currentChapterMeta.sheetNumber)}
                className="w-full py-2 px-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-medium text-slate-300 flex items-center justify-center gap-1.5 min-h-[38px]"
              >
                <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sheet {currentChapterMeta.sheetNumber} Notes</span>
              </button>
            )}
          </div>

          {isScratchpadOpen && (
            <LaTeXPlayground initialMath={currentQuestion?.governingFormula || ""} />
          )}
        </div>

        {/* Right Column: Full-Width Edge-to-Edge on Mobile, Clean Surface on Desktop (9 cols on lg) */}
        <div className="lg:col-span-9">
          {currentQuestion ? (
            <div className="sm:bg-slate-900 sm:border sm:border-slate-800 sm:rounded-2xl sm:p-6 space-y-3.5">
              {/* Question Header */}
              <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-800">
                <div className="space-y-0.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-400">
                    <span className="text-cyan-400 font-semibold">
                      {currentQuestion.officialSource}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-300">{currentQuestion.topic}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-amber-400">{currentQuestion.points} Pts</span>
                  </div>
                  <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
                    {currentQuestion.title}
                  </h2>
                </div>

                <button
                  onClick={handleToggleFlag}
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 min-h-[34px] ${
                    isFlagged
                      ? "bg-cyan-950 text-cyan-300"
                      : "bg-slate-900 text-slate-400 hover:text-white"
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isFlagged ? "Flagged" : "Flag"}</span>
                </button>
              </div>

              {/* Problem Statement (100% full mobile width, zero wrapper padding) */}
              <div className="text-slate-100 text-sm sm:text-base leading-relaxed overflow-x-auto">
                <FormattedContent content={currentQuestion.prompt} />
              </div>

              {/* Unboxed Given & Target Row (Full width, hairline border) */}
              <div className="py-2 border-y border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs sm:text-sm overflow-x-auto">
                <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 font-mono">
                  <span className="text-cyan-400 font-bold uppercase text-[11px]">Given:</span>
                  {currentQuestion.given.map((g, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-slate-200">
                      <span className="text-indigo-300">
                        <MathView math={g.symbol} inline={true} /> =
                      </span>
                      <FormattedContent content={g.value} />
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs shrink-0">
                  <span className="text-amber-400 font-bold uppercase text-[11px]">Find:</span>
                  <span className="text-slate-100">
                    <FormattedContent content={currentQuestion.targetUnknown} />
                  </span>
                  <span className="text-cyan-400 font-bold">[{currentQuestion.units}]</span>
                </div>
              </div>

              {/* Edge-to-Edge Physics Notebook & Instant 0ms / AI Step Solver */}
              <MobileStepSolver
                problemId={currentQuestion.id}
                problemTitle={currentQuestion.title}
                problemPrompt={currentQuestion.prompt}
                governingFormula={currentQuestion.governingFormula}
                officialSteps={currentQuestion.solutionSteps}
                expectedValue={currentQuestion.expectedValue}
                units={currentQuestion.units}
                initialSteps={currentStepsList}
                initialFinalLatex={currentInputValue}
                onSaveWork={handleSaveStudentWork}
              />

              {/* Compact Progressive Hints & Exam Trap Drawer (Unboxed hairline sections) */}
              <div className="border-t border-slate-800 pt-2.5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-start gap-1.5 text-xs font-mono text-amber-300/90 min-w-0 flex-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="overflow-x-auto">
                      <FormattedContent content={currentQuestion.pitfallWarning} />
                    </div>
                  </div>

                  {activeHintTier < 3 && (
                    <button
                      onClick={handleUnlockHint}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-amber-300 transition-colors min-h-[32px] shrink-0"
                    >
                      {activeHintTier === 0
                        ? "Step Hint (1/3)"
                        : `Next Hint (${activeHintTier + 1}/3)`}
                    </button>
                  )}
                </div>

                {activeHintTier >= 1 && (
                  <div className="divide-y divide-slate-800/70 border-t border-slate-800/80 pt-1 text-xs sm:text-sm">
                    <div className="py-2 text-slate-200 overflow-x-auto">
                      <span className="font-mono font-bold text-amber-400 mr-2">Hint 1:</span>
                      <FormattedContent content={currentQuestion.progressiveHints[0]} />
                    </div>
                    {activeHintTier >= 2 && (
                      <div className="py-2 text-slate-200 overflow-x-auto">
                        <span className="font-mono font-bold text-amber-400 mr-2">Hint 2:</span>
                        <FormattedContent content={currentQuestion.progressiveHints[1]} />
                      </div>
                    )}
                    {activeHintTier >= 3 && (
                      <div className="py-2 text-slate-200 overflow-x-auto">
                        <span className="font-mono font-bold text-amber-400 mr-2">Hint 3:</span>
                        <FormattedContent content={currentQuestion.progressiveHints[2]} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation Bar (Previous / Next) */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-2">
                <button
                  disabled={safeIdx === 0}
                  onClick={() => setActiveQuestionIdx((prev) => Math.max(0, prev - 1))}
                  className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-xs sm:text-sm font-medium text-slate-200 transition-colors flex items-center gap-1.5 min-h-[42px]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                <span className="text-xs font-mono text-slate-400">
                  {safeIdx + 1} / {currentChapterQuestions.length}
                </span>

                <button
                  disabled={safeIdx >= currentChapterQuestions.length - 1}
                  onClick={() =>
                    setActiveQuestionIdx((prev) =>
                      Math.min(currentChapterQuestions.length - 1, prev + 1)
                    )
                  }
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-xs sm:text-sm font-semibold text-white transition-colors flex items-center gap-1.5 min-h-[42px]"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 text-sm">
              No questions found for this chapter.
            </div>
          )}
        </div>
      </div>

      {/* Performance Scorecard Modal */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 max-w-xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Chapter Assessment Scorecard</h3>
              </div>
              <button
                onClick={() => setIsReportOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-mono p-1"
              >
                Close ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 font-mono">{currentChapterMeta.title}</div>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {totalEarnedPoints.toFixed(1)} / {totalPossiblePoints} pts
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-3xl font-extrabold text-emerald-400">{percentScore}%</div>
                <div className="text-xs text-slate-400">
                  {percentScore >= 85
                    ? "Distinction"
                    : percentScore >= 65
                    ? "Good Steps"
                    : "In Progress"}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-slate-300">
                Question & Step Credit Breakdown:
              </h4>
              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {currentChapterQuestions.map((q, idx) => {
                  const ev = evaluations[q.id];
                  return (
                    <div
                      key={q.id}
                      className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 w-6">#{idx + 1}</span>
                        <span className="text-slate-200 truncate max-w-[180px] sm:max-w-xs">
                          {q.title}
                        </span>
                      </div>
                      <div className="font-mono text-right">
                        {ev ? (
                          <span
                            className={
                              ev.status === "correct"
                                ? "text-emerald-400 font-bold"
                                : ev.status === "near-miss"
                                ? "text-indigo-400 font-bold"
                                : "text-amber-400 font-bold"
                            }
                          >
                            {((q.points * ev.scorePercent) / 100).toFixed(1)} / {q.points} pts (
                            {ev.scorePercent}%)
                          </span>
                        ) : (
                          <span className="text-slate-500 italic">Not checked yet</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsReportOpen(false)}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 min-h-[44px]"
              >
                Back to Questions
              </button>
              <button
                onClick={() => {
                  setIsReportOpen(false);
                  handleResetChapter();
                }}
                className="py-3 px-4 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 text-xs font-medium min-h-[44px]"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
