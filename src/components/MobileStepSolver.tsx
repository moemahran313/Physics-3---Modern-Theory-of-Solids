import React, { useState, useEffect } from "react";
import { MathView, FormattedContent } from "./LaTeXRenderer";
import { MobileLaTeXInput, renderLatexWithCursor } from "./MobileLaTeXInput";
import {
  formatToCleanLatex,
  parseScientificInput,
  evaluateNotebookStepLocally,
} from "../lib/physicsEvaluator";
import {
  interceptAndVerifyDerivation,
  fetchRealtimeSocraticHint,
} from "../lib/aiExamWrapper";
import {
  Sparkles,
  Lightbulb,
  Plus,
  Trash2,
  CheckCircle2,
  BookOpen,
  Wand2,
  Loader2,
  AlertTriangle,
  Keyboard,
} from "lucide-react";

export interface StepCheckItem {
  stepLabel: string;
  studentLatex: string;
  isCorrect: boolean;
  logicalTransitionNote?: string;
  easyComment: string;
  socraticPrompt?: string;
  correctedLatex?: string;
}

export interface AIStepAnalysisResult {
  source?: string;
  overallStatus: "correct" | "good-steps" | "partial-steps" | "needs-fix";
  logicalFlowValid?: boolean;
  scorePercent: number;
  headline: string;
  easyExplanation: string;
  socraticHint?: string;
  stepChecks: StepCheckItem[];
  nextHint: string;
}

export interface OfficialStepItem {
  step: string;
  latex: string;
  explanation?: string;
}

interface MobileStepSolverProps {
  problemId: string;
  problemTitle: string;
  problemPrompt: string;
  governingFormula: string;
  officialSteps: OfficialStepItem[];
  expectedValue: number | string;
  units: string;
  initialSteps?: string[];
  initialFinalLatex?: string;
  onSaveWork?: (steps: string[], finalLatex: string, analysis?: AIStepAnalysisResult) => void;
  compact?: boolean;
}

export const MobileStepSolver: React.FC<MobileStepSolverProps> = ({
  problemId,
  problemTitle,
  problemPrompt,
  governingFormula,
  officialSteps,
  expectedValue,
  units,
  initialSteps,
  initialFinalLatex = "",
  onSaveWork,
}) => {
  // Combine initial steps + initialFinalLatex into a single clean notebook lines array
  const buildInitialLines = (): string[] => {
    const base =
      initialSteps && initialSteps.some((s) => s.trim().length > 0)
        ? [...initialSteps.filter((s) => s.trim().length > 0)]
        : [];
    if (
      initialFinalLatex &&
      initialFinalLatex.trim().length > 0 &&
      !base.includes(initialFinalLatex.trim())
    ) {
      base.push(initialFinalLatex.trim());
    }
    return base.length > 0 ? base : [""];
  };

  const [lines, setLines] = useState<string[]>(buildInitialLines);
  // null when sticky keypad dock is closed; index of focused notebook line when open
  const [focusedLineIdx, setFocusedLineIdx] = useState<number | null>(null);
  const [cursorMap, setCursorMap] = useState<Record<number, number>>({ 0: 0 });

  // AI states
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AIStepAnalysisResult | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState<boolean>(false);
  const [inlineHintText, setInlineHintText] = useState<string | null>(null);
  const [isEasyStepsOpen, setIsEasyStepsOpen] = useState<boolean>(false);

  useEffect(() => {
    const init = buildInitialLines();
    setLines(init);
    setFocusedLineIdx(null);
    setCursorMap({ 0: (init[0] || "").length });
    setAnalysisResult(null);
    setInlineHintText(null);
    setIsEasyStepsOpen(false);
  }, [problemId]);

  // Extract the best numerical line (or last non-empty line) to sync with parent finalLatex
  const syncWithParent = (updatedLines: string[], aiResult?: AIStepAnalysisResult) => {
    const nonEmpty = updatedLines.filter((l) => l.trim().length > 0);
    // Find the last line that parses as a number, or fallback to last non-empty line
    let bestFinal = nonEmpty[nonEmpty.length - 1] || "";
    for (let i = nonEmpty.length - 1; i >= 0; i--) {
      if (parseScientificInput(nonEmpty[i]) !== null) {
        bestFinal = nonEmpty[i];
        break;
      }
    }
    onSaveWork?.(updatedLines, bestFinal, aiResult || analysisResult || undefined);
  };

  const handleLineChange = (idx: number, newLatex: string) => {
    const next = [...lines];
    next[idx] = newLatex;
    setLines(next);
    syncWithParent(next);
  };

  const handleFocusLine = (idx: number) => {
    setFocusedLineIdx(idx);
    setCursorMap((prev) => ({
      ...prev,
      [idx]: prev[idx] !== undefined ? prev[idx] : (lines[idx] || "").length,
    }));
  };

  const handleNextLine = () => {
    const currentIdx = focusedLineIdx ?? lines.length - 1;
    if (currentIdx < lines.length - 1) {
      handleFocusLine(currentIdx + 1);
    } else {
      const next = [...lines, ""];
      setLines(next);
      const newIdx = next.length - 1;
      setFocusedLineIdx(newIdx);
      setCursorMap((prev) => ({ ...prev, [newIdx]: 0 }));
    }
  };

  const handleRemoveLine = (idx: number) => {
    if (lines.length <= 1) {
      setLines([""]);
      setCursorMap({ 0: 0 });
      return;
    }
    const next = lines.filter((_, i) => i !== idx);
    setLines(next);
    if (focusedLineIdx !== null) {
      setFocusedLineIdx(Math.max(0, Math.min(next.length - 1, focusedLineIdx)));
    }
    syncWithParent(next);
  };

  const handleInsertFormula = () => {
    const cleanForm = governingFormula.replace(/^\$+|\$+$/g, "").trim();
    const targetIdx = focusedLineIdx ?? 0;
    const next = [...lines];
    if (!next[targetIdx] || !next[targetIdx].trim()) {
      next[targetIdx] = cleanForm;
      setLines(next);
      setFocusedLineIdx(targetIdx);
      setCursorMap((prev) => ({ ...prev, [targetIdx]: cleanForm.length }));
      syncWithParent(next);
    } else {
      next.push(cleanForm);
      const newIdx = next.length - 1;
      setLines(next);
      setFocusedLineIdx(newIdx);
      setCursorMap((prev) => ({ ...prev, [newIdx]: cleanForm.length }));
      syncWithParent(next);
    }
  };

  // Instant 0ms local evaluation across all lines
  const localLineChecks = lines.map((line) =>
    evaluateNotebookStepLocally(line, governingFormula, officialSteps, expectedValue, units)
  );

  const isLocallySolved = localLineChecks.some((c) => c.status === "value-correct");
  const localMaxScore = localLineChecks.reduce(
    (max, c) => Math.max(max, c.scorePercent || 0),
    0
  );

  // On-demand AI Step Verification (attaches inline feedback per line, no wall of text)
  const handleVerifyDerivationFlow = async () => {
    const nonEmpty = lines.filter((s) => s.trim().length > 0);
    if (nonEmpty.length === 0) {
      setInlineHintText(
        `Start on Line 1 by tapping **Formula** ($${governingFormula.replace(/^\$+|\$+$/g, "")}$) or tapping the notebook line to open the math keypad.`
      );
      return;
    }

    setIsAnalyzing(true);
    try {
      const lastLine = nonEmpty[nonEmpty.length - 1] || "";
      const data = await interceptAndVerifyDerivation({
        problemId,
        problemTitle,
        problemPrompt,
        governingFormula,
        officialSteps,
        expectedValue,
        units,
        studentSteps: lines,
        studentAnswerLatex: lastLine,
      });
      setAnalysisResult(data);
      syncWithParent(lines, data);
    } catch (err) {
      console.error("AI derivation verification error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAskSocraticHint = async () => {
    setIsLoadingHint(true);
    try {
      const nonEmpty = lines.filter((s) => s.trim().length > 0);
      const hint = await fetchRealtimeSocraticHint(
        {
          problemTitle,
          problemPrompt,
          governingFormula,
          officialSteps,
          expectedValue,
          units,
          studentSteps: lines,
          studentAnswerLatex: nonEmpty[nonEmpty.length - 1] || "",
        },
        "hint"
      );
      setInlineHintText(hint);
    } catch (err) {
      console.error("Socratic hint error:", err);
    } finally {
      setIsLoadingHint(false);
    }
  };

  const activeIdx = focusedLineIdx ?? 0;
  const activeValue = lines[activeIdx] ?? "";
  const activeCursor = cursorMap[activeIdx] ?? activeValue.length;

  return (
    <div className={`space-y-3 ${focusedLineIdx !== null ? "pb-56" : ""}`}>
      {/* Sleek Flat Toolbar: Title + Instant Status + Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            Solution Notebook
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-xs font-mono text-slate-400">
            Target: <strong className="text-slate-200">[{units}]</strong>
          </span>
          {(isLocallySolved || (analysisResult && analysisResult.scorePercent > 0) || localMaxScore > 0) && (
            <>
              <span className="text-slate-600">·</span>
              <span
                className={`text-xs font-mono font-bold ${
                  isLocallySolved || analysisResult?.overallStatus === "correct"
                    ? "text-emerald-400"
                    : "text-cyan-300"
                }`}
              >
                {isLocallySolved
                  ? "100% Verified"
                  : `${Math.max(localMaxScore, analysisResult?.scorePercent || 0)}% Credit`}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleInsertFormula}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-indigo-200 transition-colors min-h-[36px] flex items-center gap-1"
          >
            <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Formula</span>
          </button>
          <button
            type="button"
            onClick={handleAskSocraticHint}
            disabled={isLoadingHint}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-amber-200 transition-colors min-h-[36px] flex items-center gap-1"
          >
            {isLoadingHint ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
            ) : (
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>Hint</span>
          </button>
          <button
            type="button"
            onClick={() => setIsEasyStepsOpen(!isEasyStepsOpen)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors min-h-[36px] flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isEasyStepsOpen ? "Hide Steps" : "Solution"}</span>
          </button>
        </div>
      </div>

      {/* Compact 1-Line Socratic Hint Banner (Only when requested) */}
      {inlineHintText && (
        <div className="py-2 px-3 rounded-lg bg-amber-950/30 border border-amber-500/40 flex items-start justify-between gap-2 text-xs sm:text-sm text-amber-100">
          <div className="leading-relaxed">
            <strong className="font-mono text-amber-300 mr-1.5">Hint:</strong>
            <FormattedContent content={inlineHintText} />
          </div>
          <button
            type="button"
            onClick={() => setInlineHintText(null)}
            className="text-xs font-mono text-slate-400 hover:text-white shrink-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* Clean Edge-to-Edge Notebook Lines (No Box-in-Box Nesting!) */}
      <div className="border-y border-slate-800 divide-y divide-slate-800/80 bg-slate-950/50">
        {lines.map((lineVal, idx) => {
          const isFocused = focusedLineIdx === idx;
          const localCheck = localLineChecks[idx];
          const aiStepCheck = analysisResult?.stepChecks?.[idx];
          const cursorPos = cursorMap[idx] ?? lineVal.length;
          const renderedMath = renderLatexWithCursor(lineVal, cursorPos, isFocused);

          return (
            <div
              key={idx}
              onClick={() => handleFocusLine(idx)}
              className={`py-2.5 px-2 sm:px-3 transition-colors cursor-text ${
                isFocused ? "bg-indigo-950/25" : "hover:bg-slate-900/40"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                {/* Line Number + Live Rendered Math with Real Cursor */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-x-auto scrollbar-none py-0.5">
                  <span
                    className={`text-xs font-mono shrink-0 select-none ${
                      isFocused ? "text-cyan-400 font-bold" : "text-slate-500"
                    }`}
                  >
                    {idx + 1}.
                  </span>

                  {lineVal.trim() || isFocused ? (
                    <div className="text-sm sm:text-base text-white overflow-x-auto max-w-full">
                      <MathView
                        math={
                          lineVal.trim()
                            ? renderedMath
                            : "{\\color{#22d3ee}{\\boldsymbol{\\mid}}}"
                        }
                        displayMode={false}
                      />
                    </div>
                  ) : (
                    <span className="text-xs sm:text-sm text-slate-500 italic select-none flex items-center gap-1.5">
                      <Keyboard className="w-3.5 h-3.5 text-slate-600" />
                      <span>
                        {idx === 0
                          ? "Tap to write formula or answer..."
                          : "Tap to write next step or final number..."}
                      </span>
                    </span>
                  )}
                </div>

                {/* Right Side: 0ms Instant Local Check + Delete Line */}
                <div className="flex items-center gap-2 shrink-0">
                  {localCheck.badgeText && (
                    <span
                      className={`text-[11px] font-mono font-semibold ${
                        localCheck.status === "value-correct" ||
                        localCheck.status === "formula-match"
                          ? "text-emerald-400"
                          : localCheck.status === "value-close"
                          ? "text-cyan-300"
                          : "text-amber-400"
                      }`}
                    >
                      {localCheck.badgeText}
                    </span>
                  )}

                  {!localCheck.badgeText && aiStepCheck && (
                    <span
                      className={`text-[11px] font-mono ${
                        aiStepCheck.isCorrect ? "text-emerald-400" : "text-amber-400"
                      }`}
                    >
                      {aiStepCheck.isCorrect ? "✓ Valid" : "Check step"}
                    </span>
                  )}

                  {lines.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveLine(idx);
                      }}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete line"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Instant 0ms Trap Warning or Inline AI Coaching Note directly under the line */}
              {(localCheck.inlineHint || (aiStepCheck && !aiStepCheck.isCorrect)) && (
                <div className="mt-1.5 pl-5 text-xs text-amber-300/95 flex items-start gap-1.5 leading-snug">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <FormattedContent
                      content={
                        localCheck.inlineHint ||
                        aiStepCheck?.socraticPrompt ||
                        aiStepCheck?.easyComment ||
                        ""
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Notebook Footer Controls: + New Line & On-Demand AI Step Check */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const next = [...lines, ""];
              setLines(next);
              const newIdx = next.length - 1;
              setFocusedLineIdx(newIdx);
              setCursorMap((prev) => ({ ...prev, [newIdx]: 0 }));
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-cyan-300 transition-colors min-h-[38px] flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Line</span>
          </button>

          {focusedLineIdx === null && (
            <button
              type="button"
              onClick={() => handleFocusLine(lines.length - 1)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors min-h-[38px] flex items-center gap-1.5"
            >
              <Keyboard className="w-3.5 h-3.5 text-indigo-400" />
              <span>Open Math Keypad</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleVerifyDerivationFlow}
          disabled={isAnalyzing}
          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-xs font-semibold text-white transition-colors min-h-[38px] flex items-center gap-1.5"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Checking Steps...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Check Steps</span>
            </>
          )}
        </button>
      </div>

      {/* Compact 1-Block AI Summary (Only shown after AI Check Steps is clicked) */}
      {analysisResult && (
        <div
          className={`py-2.5 px-3 rounded-lg border text-xs sm:text-sm space-y-1 ${
            analysisResult.overallStatus === "correct"
              ? "bg-emerald-950/25 border-emerald-500/40 text-emerald-100"
              : "bg-indigo-950/30 border-indigo-500/40 text-slate-200"
          }`}
        >
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{analysisResult.headline}</span>
            </span>
            <span className="text-emerald-400 font-bold">{analysisResult.scorePercent}%</span>
          </div>
          <div className="leading-relaxed text-xs text-slate-200">
            <FormattedContent
              content={
                analysisResult.socraticHint ||
                analysisResult.easyExplanation ||
                analysisResult.nextHint
              }
            />
          </div>
        </div>
      )}

      {/* Clean Unboxed Official Step-by-Step Solution (When Toggled) */}
      {isEasyStepsOpen && (
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
              Reference Derivation ({officialSteps.length} Steps)
            </span>
            <button
              type="button"
              onClick={() => setIsEasyStepsOpen(false)}
              className="text-xs font-mono text-slate-400 hover:text-white"
            >
              Close ✕
            </button>
          </div>
          <div className="divide-y divide-slate-800/70 border-y border-slate-800">
            {officialSteps.map((s, idx) => (
              <div key={idx} className="py-2.5 px-1 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">
                    {idx + 1}. {s.step}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const target = focusedLineIdx ?? lines.length - 1;
                      handleLineChange(target, s.latex);
                    }}
                    className="text-[11px] font-mono text-cyan-400 hover:underline"
                  >
                    Copy to line
                  </button>
                </div>
                {s.explanation && (
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <FormattedContent content={s.explanation} />
                  </p>
                )}
                <div className="overflow-x-auto py-0.5 text-slate-100">
                  <MathView math={s.latex} displayMode={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DESMOS / PHOTOMATH-STYLE STICKY BOTTOM KEYPAD DOCK (Only appears when a line is focused) */}
      {focusedLineIdx !== null && (
        <MobileLaTeXInput
          docked={true}
          value={activeValue}
          onChange={(newLatex) => handleLineChange(activeIdx, newLatex)}
          cursorPos={activeCursor}
          onCursorChange={(pos) =>
            setCursorMap((prev) => ({ ...prev, [activeIdx]: pos }))
          }
          onNextLine={handleNextLine}
          onCloseDock={() => setFocusedLineIdx(null)}
          onSubmit={handleVerifyDerivationFlow}
          label={`Line ${activeIdx + 1} · [${units}]`}
          unitLabel={units}
          governingFormula={governingFormula}
        />
      )}
    </div>
  );
};
