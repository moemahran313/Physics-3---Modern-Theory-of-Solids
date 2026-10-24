import React, { useState, useEffect } from "react";
import { MathView, FormattedContent } from "./LaTeXRenderer";
import { MobileLaTeXInput } from "./MobileLaTeXInput";
import { formatToCleanLatex, parseScientificInput } from "../lib/physicsEvaluator";
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
  HelpCircle,
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
  const [steps, setSteps] = useState<string[]>(
    initialSteps && initialSteps.length > 0 ? initialSteps : [""]
  );
  const [finalLatex, setFinalLatex] = useState<string>(initialFinalLatex);

  // Active target for the custom MobileLaTeXInput keypad: step index or "final"
  const [activeField, setActiveField] = useState<number | "final">(0);

  // AI states
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AIStepAnalysisResult | null>(null);

  const [isLoadingHint, setIsLoadingHint] = useState<boolean>(false);
  const [aiHintText, setAiHintText] = useState<string | null>(null);

  const [isEasyStepsOpen, setIsEasyStepsOpen] = useState<boolean>(false);
  const [isLoadingEasyExplain, setIsLoadingEasyExplain] = useState<boolean>(false);
  const [aiEasyExplainText, setAiEasyExplainText] = useState<string | null>(null);

  useEffect(() => {
    setSteps(initialSteps && initialSteps.length > 0 ? initialSteps : [""]);
    setFinalLatex(initialFinalLatex || "");
    setActiveField(0);
    setAnalysisResult(null);
    setAiHintText(null);
    setAiEasyExplainText(null);
  }, [problemId]);

  const activeValue =
    activeField === "final" ? finalLatex : steps[activeField] ?? "";

  const handleActiveLatexChange = (newLatex: string) => {
    if (activeField === "final") {
      setFinalLatex(newLatex);
      onSaveWork?.(steps, newLatex, analysisResult || undefined);
    } else {
      const next = [...steps];
      next[activeField] = newLatex;
      setSteps(next);
      onSaveWork?.(next, finalLatex, analysisResult || undefined);
    }
  };

  const handleAddStep = () => {
    const next = [...steps, ""];
    setSteps(next);
    setActiveField(next.length - 1);
  };

  const handleRemoveStep = (idx: number) => {
    if (steps.length <= 1) {
      setSteps([""]);
      setActiveField(0);
      return;
    }
    const next = steps.filter((_, i) => i !== idx);
    setSteps(next);
    setActiveField(Math.max(0, idx - 1));
  };

  const handleFillFormula = () => {
    const cleanForm = governingFormula.replace(/^\$+|\$+$/g, "").trim();
    handleActiveLatexChange(cleanForm);
  };

  // Intercept user inputs via AI Logic Wrapper to verify derivation logical flow & Socratic hints
  const handleVerifyDerivationFlow = async () => {
    const hasWork =
      steps.some((s) => s.trim().length > 0) || finalLatex.trim().length > 0;
    if (!hasWork) {
      setAiHintText(
        `Tap **"Insert Formula"** ($${governingFormula}$) or use the physics symbol bar ($\\hbar, \\lambda, \\nu, \\psi$) to start Step 1, or tap **"Socratic Hint"** for a guiding question!`
      );
      return;
    }

    setIsAnalyzing(true);
    try {
      const data = await interceptAndVerifyDerivation({
        problemId,
        problemTitle,
        problemPrompt,
        governingFormula,
        officialSteps,
        expectedValue,
        units,
        studentSteps: steps,
        studentAnswerLatex: finalLatex,
      });
      setAnalysisResult(data);
      onSaveWork?.(steps, formatToCleanLatex(finalLatex), data);
    } catch (err) {
      console.error("AI derivation verification error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Request real-time Socratic hint from AI Wrapper
  const handleAskSocraticHint = async () => {
    setIsLoadingHint(true);
    try {
      const hint = await fetchRealtimeSocraticHint(
        {
          problemTitle,
          problemPrompt,
          governingFormula,
          officialSteps,
          expectedValue,
          units,
          studentSteps: steps,
          studentAnswerLatex: finalLatex,
        },
        "hint"
      );
      setAiHintText(hint);
    } catch (err) {
      console.error("Socratic hint error:", err);
    } finally {
      setIsLoadingHint(false);
    }
  };

  const handleExplainEasy = async () => {
    setIsEasyStepsOpen(true);
    if (aiEasyExplainText) return;
    setIsLoadingEasyExplain(true);
    try {
      const walkthrough = await fetchRealtimeSocraticHint(
        {
          problemTitle,
          problemPrompt,
          governingFormula,
          officialSteps,
          expectedValue,
          units,
          studentSteps: steps,
          studentAnswerLatex: finalLatex,
        },
        "explain-easy"
      );
      setAiEasyExplainText(walkthrough);
    } catch (err) {
      console.error("Explain easy error:", err);
    } finally {
      setIsLoadingEasyExplain(false);
    }
  };

  const parsedFinalPreview = parseScientificInput(finalLatex);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3.5 sm:p-5 space-y-4 shadow-lg">
        {/* Header & Quick Socratic Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Mobile LaTeX Derivation & AI Logic Verifier</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Tap symbols (<MathView math="\hbar, \lambda, \nu, \psi" displayMode={false} />) to build your steps—Gemini verifies <strong className="text-slate-200">logical flow</strong> (not string matching) and gives Socratic hints.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleFillFormula}
              className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/40 text-xs font-semibold text-indigo-200 transition-colors min-h-[42px] flex items-center justify-center gap-1.5"
            >
              <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Insert Formula</span>
            </button>
            <button
              type="button"
              onClick={handleAskSocraticHint}
              disabled={isLoadingHint}
              className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-amber-950/70 hover:bg-amber-900/70 border border-amber-500/40 text-xs font-semibold text-amber-200 transition-colors min-h-[42px] flex items-center justify-center gap-1.5"
            >
              {isLoadingHint ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
              ) : (
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>Socratic Hint</span>
            </button>
          </div>
        </div>

        {/* Real-Time Socratic Hint Banner */}
        {aiHintText && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-amber-950/30 border border-amber-500/50 space-y-1.5 text-sm text-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Real-Time Socratic Guidance</span>
              </span>
              <button
                type="button"
                onClick={() => setAiHintText(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Dismiss ✕
              </button>
            </div>
            <div className="leading-relaxed text-xs sm:text-sm">
              <FormattedContent content={aiHintText} />
            </div>
          </div>
        )}

        {/* Derivation Step Slots (Tap any step to edit it in the MobileLaTeXInput below) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-300">
              1. Select a Step or Final Answer Box to Edit:
            </span>
            <button
              type="button"
              onClick={handleAddStep}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-cyan-300 transition-colors min-h-[38px] flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Step</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {steps.map((stepVal, idx) => {
              const isSelected = activeField === idx;
              const cleanStep = formatToCleanLatex(stepVal);
              return (
                <div
                  key={idx}
                  onClick={() => setActiveField(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isSelected
                      ? "bg-slate-900 border-cyan-500 ring-1 ring-cyan-500/40"
                      : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                          isSelected
                            ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        Step {idx + 1}
                      </span>
                      <span className="text-[11px] text-slate-400 truncate">
                        {idx === 0 ? "Formula / Law" : "Substitution / Intermediate"}
                      </span>
                    </div>
                    <div className="overflow-x-auto py-0.5">
                      {cleanStep ? (
                        <MathView math={cleanStep} displayMode={false} />
                      ) : (
                        <span className="text-xs text-slate-500 italic">
                          Tap here and use the physics symbol bar below...
                        </span>
                      )}
                    </div>
                  </div>

                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveStep(idx);
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 shrink-0"
                      title="Remove step"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}

            {/* Final Answer Slot */}
            <div
              onClick={() => setActiveField("final")}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                activeField === "final"
                  ? "bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/40"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                      activeField === "final"
                        ? "bg-indigo-950 text-indigo-300 border border-indigo-500/40"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    Final LaTeX Answer
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400">
                    Unit: [{units}]
                  </span>
                </div>
                <div className="overflow-x-auto py-0.5">
                  {finalLatex.trim() ? (
                    <div className="flex items-center gap-2 text-emerald-300">
                      <MathView math={formatToCleanLatex(finalLatex)} displayMode={false} />
                      <span className="text-xs font-mono text-slate-400">[{units}]</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 italic">
                      Tap here to input final numerical or symbolic LaTeX result...
                    </span>
                  )}
                </div>
              </div>

              {parsedFinalPreview !== null && (
                <span className="text-[11px] font-mono text-slate-400 shrink-0 hidden sm:inline">
                  = {parsedFinalPreview.toExponential(3)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Dedicated Custom Mobile-Optimized LaTeX Input with Physics Symbol Row */}
        <MobileLaTeXInput
          value={activeValue}
          onChange={handleActiveLatexChange}
          onSubmit={handleVerifyDerivationFlow}
          label={
            activeField === "final"
              ? `Editing Final Answer in [${units}]`
              : `Editing Step ${activeField + 1} (Tap symbols below)`
          }
          unitLabel={activeField === "final" ? units : undefined}
          governingFormula={governingFormula}
        />

        {/* Primary Action Bar */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleVerifyDerivationFlow}
            disabled={isAnalyzing}
            className="flex-1 py-3.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-sm font-bold text-white transition-all shadow-lg shadow-indigo-600/25 min-h-[48px] flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gemini Verifying Logical Flow...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify Logical Flow & Analyze Steps</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isEasyStepsOpen) {
                handleExplainEasy();
              } else {
                setIsEasyStepsOpen(false);
              }
            }}
            className="py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs sm:text-sm font-semibold text-cyan-300 transition-colors min-h-[48px] flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>{isEasyStepsOpen ? "Hide Easy Explanation" : "Show Easy Step-by-Step"}</span>
          </button>
        </div>
      </div>

      {/* AI Logical Flow Verification & Socratic Feedback Card */}
      {analysisResult && (
        <div
          className={`rounded-2xl border p-4 sm:p-5 space-y-4 transition-all ${
            analysisResult.overallStatus === "correct"
              ? "bg-emerald-950/30 border-emerald-500/60"
              : analysisResult.overallStatus === "good-steps" ||
                analysisResult.overallStatus === "partial-steps"
              ? "bg-indigo-950/40 border-indigo-500/60"
              : "bg-amber-950/30 border-amber-500/60"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              {analysisResult.overallStatus === "correct" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
              )}
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {analysisResult.headline}
                </h4>
                <span className="text-[11px] font-mono text-slate-400">
                  {analysisResult.logicalFlowValid
                    ? "Logical Derivation Flow Verified · Gemini Engine"
                    : "Socratic Step Diagnostic · Gemini Engine"}
                </span>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono font-bold text-emerald-400">
              {analysisResult.scorePercent}% Credit
            </div>
          </div>

          <div className="text-sm sm:text-base text-slate-100 leading-relaxed">
            <FormattedContent content={analysisResult.easyExplanation} />
          </div>

          {/* Real-Time Socratic Question for Incorrect or Next Step */}
          {analysisResult.socraticHint && (
            <div className="p-3.5 rounded-xl bg-amber-950/35 border border-amber-500/50 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Socratic Guiding Question:</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                <FormattedContent content={analysisResult.socraticHint} />
              </div>
            </div>
          )}

          {/* Individual Step-by-Step Logical Flow Checks */}
          {analysisResult.stepChecks && analysisResult.stepChecks.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-slate-300 block">
                Step-by-Step Logical Flow Verification:
              </span>
              {analysisResult.stepChecks.map((sc, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border space-y-1.5 ${
                    sc.isCorrect
                      ? "bg-emerald-950/25 border-emerald-500/40"
                      : "bg-amber-950/25 border-amber-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                      {sc.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                      <span>{sc.stepLabel}</span>
                    </span>
                    <span
                      className={`text-[11px] font-mono ${
                        sc.isCorrect ? "text-emerald-300" : "text-amber-300"
                      }`}
                    >
                      {sc.logicalTransitionNote ||
                        (sc.isCorrect ? "Logically Valid" : "Check Step Logic")}
                    </span>
                  </div>

                  {sc.studentLatex && (
                    <div className="px-3 py-1.5 rounded-lg bg-slate-950/80 overflow-x-auto">
                      <MathView math={formatToCleanLatex(sc.studentLatex)} displayMode={false} />
                    </div>
                  )}

                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <FormattedContent content={sc.easyComment} />
                  </div>

                  {/* Step-specific Socratic Prompt if incorrect */}
                  {!sc.isCorrect && sc.socraticPrompt && (
                    <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200">
                      <FormattedContent content={sc.socraticPrompt} />
                    </div>
                  )}

                  {!sc.isCorrect && sc.correctedLatex && (
                    <div className="pt-1">
                      <span className="text-[11px] font-mono text-cyan-300 block mb-1">
                        Reference Form:
                      </span>
                      <div className="px-3 py-2 rounded-lg bg-slate-950 border border-cyan-500/30 overflow-x-auto">
                        <MathView math={sc.correctedLatex} displayMode={false} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {analysisResult.nextHint && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300">
                <Lightbulb className="w-4 h-4 text-cyan-400" />
                <span>Next Derivation Step Tip:</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <FormattedContent content={analysisResult.nextHint} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Easy Step-by-Step Explanation Panel */}
      {isEasyStepsOpen && (
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm sm:text-base font-bold text-white">
                Easy Step-by-Step Guide (How & Why)
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setIsEasyStepsOpen(false)}
              className="text-xs font-mono text-slate-400 hover:text-white"
            >
              Hide ✕
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-xs font-mono font-bold text-indigo-300 block">
                Starting Formula:
              </span>
              <p className="text-xs sm:text-sm text-slate-300">
                We start with the main law that connects what we are given to what we want to find:
              </p>
              <div className="py-2 px-3 rounded-lg bg-slate-950 border border-slate-800/80 overflow-x-auto">
                <MathView math={governingFormula} displayMode={true} />
              </div>
            </div>

            {officialSteps.map((s, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-cyan-300">
                    Step {idx + 1}: {s.step}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const next = [...steps];
                      next[Math.min(idx, next.length - 1)] = s.latex;
                      setSteps(next);
                    }}
                    className="text-[11px] font-mono text-indigo-300 hover:text-white px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30"
                  >
                    Use in My Step
                  </button>
                </div>

                {s.explanation && (
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <strong className="text-slate-400">Why: </strong>
                    <FormattedContent content={s.explanation} />
                  </p>
                )}

                <div className="py-2 px-3 rounded-lg bg-slate-950 border border-slate-800/80 overflow-x-auto">
                  <MathView math={s.latex} displayMode={true} />
                </div>
              </div>
            ))}
          </div>

          {isLoadingEasyExplain ? (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>AI Tutor is preparing a plain-English walkthrough...</span>
            </div>
          ) : (
            aiEasyExplainText && (
              <div className="p-4 rounded-xl bg-indigo-950/25 border border-indigo-500/40 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-300">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Plain-English AI Tutor Walkthrough:</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <FormattedContent content={aiEasyExplainText} />
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
