import React from "react";
import { CRAMMING_MOCK_EXAMS } from "../lib/reflibData";
import { LaTeXRenderer, MathView } from "./LaTeXRenderer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { 
  Flame, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  Clock, 
  Award, 
  ArrowRight,
  Calculator,
  Zap,
  ChevronLeft,
  RotateCcw
} from "lucide-react";

interface CrammingArenaProps {
  onOpenConstants: () => void;
}

export const CrammingArena: React.FC<CrammingArenaProps> = ({ onOpenConstants }) => {
  const [selectedExamId, setSelectedExamId] = useLocalStorage<string>("cramming_selectedExamId", "mock-1");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useLocalStorage<number>("cramming_currentQuestionIdx", 0);
  const [userInputs, setUserInputs, resetUserInputs] = useLocalStorage<Record<string, string>>("cramming_userInputs", {});
  const [evaluatedAnswers, setEvaluatedAnswers, resetEvaluatedAnswers] = useLocalStorage<Record<string, {
    status: "perfect" | "warning" | "incorrect";
    feedback: string;
    points: number;
  }>>("cramming_evaluatedAnswers", {});
  const [revealedSolutions, setRevealedSolutions, resetRevealedSolutions] = useLocalStorage<Record<string, boolean>>("cramming_revealedSolutions", {});

  const currentExam = CRAMMING_MOCK_EXAMS.find(e => e.id === selectedExamId) || CRAMMING_MOCK_EXAMS[0];
  const safeQuestionIdx = Math.min(Math.max(0, currentQuestionIdx), currentExam.questions.length - 1);
  const currentQuestion = currentExam.questions[safeQuestionIdx] || currentExam.questions[0];

  const currentInputValue = userInputs[currentQuestion.id] || "";

  const handleResetCurrentExamProgress = () => {
    if (window.confirm("Reset all entered answers and scores for the current exam session?")) {
      resetUserInputs();
      resetEvaluatedAnswers();
      resetRevealedSolutions();
      setCurrentQuestionIdx(0);
    }
  };

  const handleKeypadInsert = (symbol: string) => {
    setUserInputs(prev => ({
      ...prev,
      [currentQuestion.id]: (prev[currentQuestion.id] || "") + symbol
    }));
  };

  const handleBackspace = () => {
    setUserInputs(prev => ({
      ...prev,
      [currentQuestion.id]: (prev[currentQuestion.id] || "").slice(0, -1)
    }));
  };

  const handleClear = () => {
    setUserInputs(prev => ({
      ...prev,
      [currentQuestion.id]: ""
    }));
  };

  const handleEvaluateAnswer = () => {
    const rawVal = parseFloat(currentInputValue);
    if (isNaN(rawVal)) {
      setEvaluatedAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: {
          status: "incorrect",
          feedback: "Please enter a valid numerical value or scientific notation.",
          points: 0
        }
      }));
      return;
    }

    const target = currentQuestion.numericalAnswer;
    const diffRatio = Math.abs(rawVal - target) / Math.abs(target);

    if (diffRatio <= currentQuestion.tolerance) {
      setEvaluatedAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: {
          status: "perfect",
          feedback: "Perfect! 🌟 Exact physical value within standard experimental precision.",
          points: 5
        }
      }));
    } else if (diffRatio <= currentQuestion.tolerance * 2.5) {
      setEvaluatedAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: {
          status: "warning",
          feedback: "🟡 Minor Rounding / Slip-up Warning: Your result is very close, but check your intermediate rounding or exponent factor.",
          points: 3
        }
      }));
    } else {
      setEvaluatedAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: {
          status: "incorrect",
          feedback: "❌ Incorrect Response: The numerical value deviates significantly from the official solution.",
          points: 0
        }
      }));
    }
  };

  const totalPoints = Object.values(evaluatedAnswers).reduce((sum, item) => sum + item.points, 0);
  const maxPoints = currentExam.questions.length * 5;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Banner: Cramming Arena Status */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-950 to-indigo-950/30 border border-rose-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-xs border border-rose-500/30 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Modern Academy Cramming Arena</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">10 Hard Mock Exams</span>
          </div>
          <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
            Numerical Exam Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Multi-Step Calculations with Scientific Keypad & Tolerance Grading
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 md:pt-0">
          <div className="px-3.5 py-1.5 sm:py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Score</span>
            <span className="text-sm sm:text-base font-bold font-mono text-emerald-400">
              {totalPoints} / {maxPoints} Pts
            </span>
          </div>
          <button
            onClick={onOpenConstants}
            className="px-3.5 py-2 sm:py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-xs font-medium text-indigo-200 transition-colors min-h-[40px]"
          >
            Constants Sheet
          </button>
          <button
            onClick={handleResetCurrentExamProgress}
            title="Reset answers for current session"
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-850 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-800/60 text-xs font-medium text-slate-400 hover:text-rose-300 transition-colors min-h-[40px] flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Progress</span>
          </button>
        </div>
      </div>

      {/* Exam Room Selector Tabs (Mobile Scrollable) */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 scrollbar-none">
        {CRAMMING_MOCK_EXAMS.map((exam) => (
          <button
            key={exam.id}
            onClick={() => {
              setSelectedExamId(exam.id);
              setCurrentQuestionIdx(0);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 min-h-[38px] active:scale-95 ${
              selectedExamId === exam.id
                ? "bg-rose-600 text-white shadow-md border border-rose-500/60"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            <Zap className="w-3.5 h-3.5 shrink-0" />
            <span>Mock #{exam.examNumber}</span>
          </button>
        ))}
      </div>

      {/* Main Examination Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left 7 cols: Question & Solution Review */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
            {/* Question Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-rose-500/20 text-rose-300 font-mono font-bold text-xs flex items-center justify-center border border-rose-500/30">
                  Q{currentQuestion.questionNumber}
                </span>
                <span className="text-xs font-semibold text-white">
                  Problem {currentQuestionIdx + 1} of {currentExam.questions.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>Self-Paced</span>
              </div>
            </div>

            {/* Prompt Statement */}
            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {currentQuestion.prompt}
            </div>

            {/* Evaluation Result Feedback Banner */}
            {evaluatedAnswers[currentQuestion.id] && (
              <div className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                evaluatedAnswers[currentQuestion.id].status === "perfect"
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
                  : evaluatedAnswers[currentQuestion.id].status === "warning"
                  ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
                  : "bg-rose-500/10 border-rose-500/40 text-rose-300"
              }`}>
                {evaluatedAnswers[currentQuestion.id].status === "perfect" ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1 text-xs">
                  <div className="font-bold">
                    {evaluatedAnswers[currentQuestion.id].feedback}
                  </div>
                  {currentQuestion.roundingWarningTips && (
                    <div className="text-[11px] text-slate-300 opacity-90">
                      {currentQuestion.roundingWarningTips}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Official Solution Disclosure Button & Nav */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/60">
              <button
                onClick={() => setRevealedSolutions(prev => ({
                  ...prev,
                  [currentQuestion.id]: !prev[currentQuestion.id]
                }))}
                className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors py-1 min-h-[36px]"
              >
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>
                  {revealedSolutions[currentQuestion.id] ? "Hide Solution Reference" : "Reveal Solution Steps"}
                </span>
              </button>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  disabled={currentQuestionIdx === 0}
                  onClick={() => setCurrentQuestionIdx(i => i - 1)}
                  className="px-3 py-2 rounded-xl bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none min-h-[40px] flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
                <button
                  disabled={currentQuestionIdx === currentExam.questions.length - 1}
                  onClick={() => setCurrentQuestionIdx(i => i + 1)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 min-h-[40px]"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Revealed Official Derivation & Steps */}
            {revealedSolutions[currentQuestion.id] && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 pt-3 text-xs">
                <span className="text-[11px] font-bold text-indigo-400 uppercase font-mono block">
                  Official Solution Reference:
                </span>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono overflow-x-auto max-w-full">
                  <MathView math={currentQuestion.answerLatex} displayMode={true} />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
                <div className="space-y-1.5 pt-1">
                  {currentQuestion.steps.map((st, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/60 space-y-1">
                      <span className="text-slate-400 block text-[10px] font-mono">{st.step}:</span>
                      <div className="overflow-x-auto max-w-full">
                        <MathView math={st.latex} displayMode={true} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 5 cols: Custom Math/Constants Keypad & Numerical Entry */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                  Keypad & Entry
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                Units: <strong className="text-white">{currentQuestion.units}</strong>
              </span>
            </div>

            {/* Answer Display Input (Font size >= 16px to prevent iOS auto-zoom) */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400 block">
                Calculated value:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={currentInputValue}
                  onChange={(e) => setUserInputs(prev => ({
                    ...prev,
                    [currentQuestion.id]: e.target.value
                  }))}
                  placeholder={`e.g. ${currentQuestion.numericalAnswer}`}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono text-base focus:outline-none focus:border-rose-500 tracking-wide"
                />
                <span className="absolute right-3 top-3.5 text-xs font-mono text-slate-400">
                  {currentQuestion.units}
                </span>
              </div>
            </div>

            {/* Constants & Symbols Keypad Grid (Touch-friendly 44px+ buttons) */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                Scientific Symbols & Exponents:
              </span>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-xs font-mono">
                <KeypadButton symbol="π" onClick={() => handleKeypadInsert("3.14159")} />
                <KeypadButton symbol="h" onClick={() => handleKeypadInsert("6.63e-34")} title="6.63×10^-34 J·s" />
                <KeypadButton symbol="ħ" onClick={() => handleKeypadInsert("1.054e-34")} title="1.054×10^-34 J·s" />
                <KeypadButton symbol="c" onClick={() => handleKeypadInsert("3e8")} title="3×10^8 m/s" />

                <KeypadButton symbol="m_e" onClick={() => handleKeypadInsert("9.11e-31")} title="9.11×10^-31 kg" />
                <KeypadButton symbol="m_p" onClick={() => handleKeypadInsert("1.67e-27")} title="1.67×10^-27 kg" />
                <KeypadButton symbol="e" onClick={() => handleKeypadInsert("1.6e-19")} title="1.6×10^-19 C" />
                <KeypadButton symbol="1240" onClick={() => handleKeypadInsert("1240")} title="hc shortcut" />

                <KeypadButton symbol="×10⁻⁶" onClick={() => handleKeypadInsert("e-6")} title="Micro (μ)" />
                <KeypadButton symbol="×10⁻⁹" onClick={() => handleKeypadInsert("e-9")} title="Nano (n)" />
                <KeypadButton symbol="×10⁻¹²" onClick={() => handleKeypadInsert("e-12")} title="Pico (p)" />
                <KeypadButton symbol="×10⁻³⁴" onClick={() => handleKeypadInsert("e-34")} title="Planck scale" />

                <KeypadButton symbol="." onClick={() => handleKeypadInsert(".")} />
                <KeypadButton symbol="-" onClick={() => handleKeypadInsert("-")} />
                <KeypadButton symbol="⌫" onClick={handleBackspace} className="bg-amber-500/15 text-amber-300 border-amber-500/30" />
                <KeypadButton symbol="C" onClick={handleClear} className="bg-rose-500/15 text-rose-300 border-rose-500/30" />
              </div>
            </div>

            {/* Grade Button */}
            <button
              onClick={handleEvaluateAnswer}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 active:scale-98 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Award className="w-4 h-4" />
              <span>Submit & Grade Answer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface KeypadButtonProps {
  symbol: string;
  onClick: () => void;
  title?: string;
  className?: string;
}

const KeypadButton: React.FC<KeypadButtonProps> = ({ symbol, onClick, title, className }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`h-11 sm:h-10 rounded-xl bg-slate-950 hover:bg-slate-850 active:bg-slate-800 border border-slate-800 text-slate-200 font-mono text-center transition-all active:scale-95 flex items-center justify-center font-semibold ${className || ""}`}
  >
    {symbol}
  </button>
);
