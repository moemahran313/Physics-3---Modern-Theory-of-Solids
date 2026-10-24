import { ChapterExamQuestion, ChapterExamEvaluation } from "../types";
import { formatToCleanLatex, evaluateStudentAnswer } from "./physicsEvaluator";
import { AIStepAnalysisResult, OfficialStepItem } from "../components/MobileStepSolver";

export interface AIDerivationInterceptPayload {
  problemId: string;
  problemTitle: string;
  problemPrompt: string;
  governingFormula: string;
  officialSteps: OfficialStepItem[];
  expectedValue: number | string;
  units: string;
  studentSteps: string[];
  studentAnswerLatex: string;
}

/**
 * AI Logic Wrapper for ChapterExamArena.
 * Intercepts student LaTeX inputs and derivation steps, normalizes casual notation into
 * canonical LaTeX, invokes the Gemini derivation engine (/api/ai/verify-derivation)
 * to verify logical & algebraic flow rather than string equality, and provides
 * real-time Socratic hints for any incorrect or incomplete steps.
 */
export async function interceptAndVerifyDerivation(
  payload: AIDerivationInterceptPayload
): Promise<AIStepAnalysisResult> {
  const normalizedSteps = payload.studentSteps
    .map((s) => formatToCleanLatex(s))
    .filter(Boolean);
  const normalizedFinal = formatToCleanLatex(payload.studentAnswerLatex);

  const response = await fetch("/api/ai/verify-derivation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      problemTitle: payload.problemTitle,
      problemPrompt: payload.problemPrompt,
      governingFormula: payload.governingFormula,
      officialSteps: payload.officialSteps,
      expectedValue: payload.expectedValue,
      units: payload.units,
      studentSteps: normalizedSteps,
      studentAnswerLatex: normalizedFinal,
    }),
  });

  if (!response.ok) {
    throw new Error(`Derivation verification failed with status ${response.status}`);
  }

  const data: AIStepAnalysisResult = await response.json();
  return data;
}

/**
 * Requests a real-time Socratic hint from the Gemini engine for the student's current step.
 */
export async function fetchRealtimeSocraticHint(
  payload: Omit<AIDerivationInterceptPayload, "problemId">,
  mode: "hint" | "explain-easy" = "hint"
): Promise<string> {
  const normalizedSteps = payload.studentSteps
    .map((s) => formatToCleanLatex(s))
    .filter(Boolean);
  const normalizedFinal = formatToCleanLatex(payload.studentAnswerLatex);

  const response = await fetch("/api/ai/hint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      problemTitle: payload.problemTitle,
      problemPrompt: payload.problemPrompt,
      governingFormula: payload.governingFormula,
      officialSteps: payload.officialSteps,
      expectedValue: payload.expectedValue,
      units: payload.units,
      studentSteps: normalizedSteps,
      studentAnswerLatex: normalizedFinal,
      mode,
    }),
  });

  if (!response.ok) {
    throw new Error(`Hint request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.text || "";
}

/**
 * Converts an AI logical flow verification result into a ChapterExamEvaluation
 * record for the ChapterExamArena scorecard.
 */
export function mapAIAnalysisToExamEvaluation(
  aiResult: AIStepAnalysisResult,
  question: ChapterExamQuestion,
  finalLatex: string
): ChapterExamEvaluation {
  const localNumericCheck = finalLatex.trim()
    ? evaluateStudentAnswer(finalLatex, question)
    : null;

  const status: "correct" | "near-miss" | "incorrect" =
    aiResult.overallStatus === "correct" || localNumericCheck?.status === "correct"
      ? "correct"
      : aiResult.logicalFlowValid ||
        aiResult.overallStatus === "good-steps" ||
        aiResult.overallStatus === "partial-steps" ||
        aiResult.scorePercent >= 50
      ? "near-miss"
      : "incorrect";

  const finalScore =
    localNumericCheck?.status === "correct"
      ? 100
      : Math.max(aiResult.scorePercent, localNumericCheck?.scorePercent || 0);

  return {
    status,
    scorePercent: finalScore,
    feedback: aiResult.easyExplanation,
    inputParsed: localNumericCheck?.inputParsed ?? null,
    expectedValue: question.expectedValue,
    differencePercent: localNumericCheck?.differencePercent ?? null,
    diagnosticTip: aiResult.socraticHint || aiResult.nextHint,
  };
}
