import React, { useState, useEffect, useCallback } from "react";
import { FLASHCARDS } from "../lib/curriculumData";
import { Flashcard } from "../types";
import { MathView } from "./MathView";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { 
  Layers, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  Check, 
  RotateCcw, 
  Sparkles, 
  BookOpen,
  Shuffle,
  Eye,
  EyeOff,
  Flame,
  Award,
  Keyboard,
  CheckCircle2,
  Filter
} from "lucide-react";

interface LeitnerState {
  box: number; // 1 to 5
  nextReviewDate: number; // timestamp
  consecutiveCorrect: number;
}

export const FlashcardsDeck: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isClozeMode, setIsClozeMode] = useState<boolean>(false);
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>(FLASHCARDS);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState<boolean>(false);
  
  // Leitner spaced-repetition progress map: cardId -> LeitnerState
  const [leitnerMap, setLeitnerMap] = useLocalStorage<Record<string, LeitnerState>>(
    "flashcards_leitner_boxes_v2",
    {}
  );

  const [filterMode, setFilterMode] = useState<"all" | "due" | "mastered">("all");

  // Filter cards by chapter and review status
  const filteredCards = shuffledCards.filter((c) => {
    const matchesChapter = selectedChapter === "all" || c.chapterId === selectedChapter;
    if (!matchesChapter) return false;

    const state = leitnerMap[c.id];
    const isMastered = state?.box >= 4;
    const isDue = !state || state.nextReviewDate <= Date.now();

    if (filterMode === "due") return isDue;
    if (filterMode === "mastered") return isMastered;
    return true;
  });

  const safeIndex = Math.min(Math.max(0, currentIndex), Math.max(0, filteredCards.length - 1));
  const activeCard: Flashcard | undefined = filteredCards[safeIndex] || FLASHCARDS[0];

  const currentLeitner = (activeCard && leitnerMap[activeCard.id]) || {
    box: 1,
    nextReviewDate: 0,
    consecutiveCorrect: 0,
  };

  // Grade card according to Leitner spaced-repetition
  const handleGradeCard = useCallback((grade: 1 | 2 | 3 | 4) => {
    if (!activeCard) return;

    let newBox = currentLeitner.box;
    let daysToAdd = 1;

    if (grade === 1) {
      // Again: Reset to Box 1
      newBox = 1;
      daysToAdd = 0.5; // Review today
    } else if (grade === 2) {
      // Hard: Keep in current box or Box 1
      newBox = Math.max(1, currentLeitner.box);
      daysToAdd = 1;
    } else if (grade === 3) {
      // Good: Advance 1 box
      newBox = Math.min(5, currentLeitner.box + 1);
      daysToAdd = newBox === 2 ? 2 : newBox === 3 ? 4 : newBox === 4 ? 7 : 14;
    } else if (grade === 4) {
      // Easy: Advance 2 boxes
      newBox = Math.min(5, currentLeitner.box + 2);
      daysToAdd = newBox === 3 ? 4 : newBox === 4 ? 7 : 14;
    }

    const nextReview = Date.now() + daysToAdd * 24 * 60 * 60 * 1000;

    setLeitnerMap((prev) => ({
      ...prev,
      [activeCard.id]: {
        box: newBox,
        nextReviewDate: nextReview,
        consecutiveCorrect: grade >= 3 ? currentLeitner.consecutiveCorrect + 1 : 0,
      },
    }));

    // Auto flip back and go to next card
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
    }, 150);
  }, [activeCard, currentLeitner, filteredCards.length, setLeitnerMap]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => Math.min(filteredCards.length - 1, prev + 1));
  }, [filteredCards.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleShuffle = () => {
    const array = [...FLASHCARDS];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setShuffledCards(array);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input/textarea
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "1") {
        e.preventDefault();
        handleGradeCard(1);
      } else if (e.key === "2") {
        e.preventDefault();
        handleGradeCard(2);
      } else if (e.key === "3") {
        e.preventDefault();
        handleGradeCard(3);
      } else if (e.key === "4") {
        e.preventDefault();
        handleGradeCard(4);
      } else if (e.key === "s" || e.key === "S") {
        handleShuffle();
      } else if (e.key === "c" || e.key === "C") {
        setIsClozeMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, handleGradeCard]);

  // Statistics
  const masteredCount = Object.values(leitnerMap).filter((s) => s.box >= 4).length;
  const learningCount = Object.values(leitnerMap).filter((s) => s.box >= 2 && s.box < 4).length;
  const newCount = FLASHCARDS.length - (masteredCount + learningCount);

  // Helper to mask cloze variables in equations
  const renderClozeEquation = (eq: string) => {
    if (!isClozeMode) return eq;
    // Mask common targets like h, \hbar, m_0, 8 m L^2, c^2, \lambda_c
    return eq
      .replace(/\\hbar/g, "\\boxed{?\\;}")
      .replace(/m_0 c/g, "\\boxed{?\\;}")
      .replace(/8 m L\^2/g, "\\boxed{?\\;}");
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Leitner Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1.5">
              <span className="text-cyan-400 font-semibold">Leitner System</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>5-Box Spaced Repetition</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Active Recall</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Active Recall Quantum Flashcards
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Reinforce formulas, boundary limits, and conceptual traps with 3D tactile flipping, cloze testing, and interval progression.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition-colors min-h-[44px]"
              title="View Keyboard Hotkeys"
            >
              <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hotkeys</span>
            </button>

            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-indigo-300 transition-colors min-h-[44px]"
              title="Shuffle Cards"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle</span>
            </button>

            <button
              onClick={() => setIsClozeMode(!isClozeMode)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all border min-h-[44px] ${
                isClozeMode
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-sm"
                  : "bg-slate-950 hover:bg-slate-800 text-amber-300 border-amber-500/30"
              }`}
              title="Mask key variables in equations to test memory"
            >
              {isClozeMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{isClozeMode ? "Cloze: Active" : "Cloze Drill"}</span>
            </button>
          </div>
        </div>

        {/* Keyboard Hotkey Drawer */}
        {showKeyboardHelp && (
          <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-2 animate-in fade-in">
            <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">Space</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">Enter</kbd> Flip Card</div>
            <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">1</kbd> Again (10m)</div>
            <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">2</kbd> Hard (1d)</div>
            <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">3</kbd> Good (Box+1)</div>
            <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">4</kbd> Easy (Box+2)</div>
            <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">&larr;</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">&rarr;</kbd> Prev / Next</div>
            <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">S</kbd> Shuffle Deck</div>
            <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">C</kbd> Toggle Cloze</div>
          </div>
        )}

        {/* 5-Box Mastery Progress Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-400">Box Retention Distribution</span>
            <span className="text-cyan-400 font-bold tabular-nums">
              {masteredCount} Mastered · {learningCount} Learning · {newCount} New
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center text-xs font-mono">
            {[1, 2, 3, 4, 5].map((boxNum) => {
              const countInBox = Object.values(leitnerMap).filter((s) => s.box === boxNum).length;
              const isCurrentBox = currentLeitner.box === boxNum;
              return (
                <div
                  key={boxNum}
                  className={`p-2 rounded-xl border transition-all ${
                    isCurrentBox
                      ? "bg-indigo-600/30 border-indigo-400 text-white ring-1 ring-indigo-400"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  <div className="text-[10px] text-slate-400">Box {boxNum}</div>
                  <div className="text-sm font-bold text-white mt-0.5">{countInBox}</div>
                  <div className="text-[9px] text-slate-400 truncate">
                    {boxNum === 1 ? "Daily" : boxNum === 2 ? "2d" : boxNum === 3 ? "4d" : boxNum === 4 ? "7d" : "14d"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800/80 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Filter:</span>
            {[
              { id: "all", label: "All Cards" },
              { id: "due", label: "Due for Review" },
              { id: "mastered", label: "Mastered" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  setFilterMode(id as any);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  filterMode === id
                    ? "bg-cyan-600 text-white font-bold"
                    : "bg-slate-950 text-slate-400 hover:text-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Chapter:</span>
            {["all", "ch1", "ch2", "ch3", "ch4"].map((ch) => (
              <button
                key={ch}
                onClick={() => {
                  setSelectedChapter(ch);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedChapter === ch
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-slate-950 text-slate-400 hover:text-slate-200"
                }`}
              >
                {ch === "all" ? "All" : ch.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. 3D FLIP CARD ARENA */}
      {/* ========================================================================= */}
      {activeCard ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Card Container with Perspective */}
          <div
            className="w-full max-w-2xl min-h-[380px] cursor-pointer select-none"
            style={{ perspective: "1200px" }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className={`w-full min-h-[380px] rounded-2xl border transition-all duration-500 relative shadow-2xl flex flex-col justify-between p-6 sm:p-8 ${
                isFlipped
                  ? "bg-slate-900 border-indigo-500/80 shadow-indigo-500/10"
                  : "bg-slate-950 border-slate-800 hover:border-slate-700"
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* FRONT OF CARD */}
              <div
                className={`flex-1 flex flex-col justify-between ${isFlipped ? "hidden" : "flex"}`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
                      {activeCard.chapterId.toUpperCase()} &bull; Box {currentLeitner.box}
                    </span>
                    <span className="text-slate-400 font-medium">{activeCard.front.concept}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Click or Space to Flip</span>
                  </div>
                </div>

                <div className="py-8 text-center space-y-5">
                  <h3 className="text-lg sm:text-xl font-bold text-white max-w-lg mx-auto leading-relaxed">
                    {activeCard.front.prompt}
                  </h3>

                  {activeCard.front.latexSnippet && (
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 max-w-md mx-auto shadow-inner">
                      <MathView math={renderClozeEquation(activeCard.front.latexSnippet)} displayMode={true} />
                    </div>
                  )}

                  <p className="text-xs text-slate-400 font-mono">
                    {isClozeMode ? "🎯 Formulate the masked formula variable in your mind, then flip to check." : "Formulate the definition & governing formula, then flip to verify."}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3">
                  <span>Card {safeIndex + 1} of {filteredCards.length}</span>
                  <span className="text-indigo-400">RefLib Physics 3</span>
                </div>
              </div>

              {/* BACK OF CARD (Flipped) */}
              <div
                className={`flex-1 flex flex-col justify-between ${isFlipped ? "flex" : "hidden"}`}
                style={{ transform: "rotateY(180deg)" }}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                    MODEL ANSWER &bull; {activeCard.front.concept}
                  </span>
                  <span className="text-slate-400 text-[11px]">Click or Space to flip back</span>
                </div>

                <div className="py-4 space-y-4 text-left">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                      PHYSICAL DEFINITION:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                      {activeCard.back.definition}
                    </p>
                  </div>

                  {activeCard.back.governingEquation && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <MathView math={activeCard.back.governingEquation} displayMode={true} />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Physical Limit:</span>
                      <span className="text-slate-300 font-semibold">{activeCard.back.physicalLimit}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">SI Units:</span>
                      <span className="text-slate-300 font-semibold">{activeCard.back.siUnits}</span>
                    </div>
                  </div>

                  {activeCard.back.examWarning && (
                    <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-300 text-xs flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>EXAM TRAP:</strong> {activeCard.back.examWarning}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3">
                  <span>Card {safeIndex + 1} of {filteredCards.length}</span>
                  <span className="text-emerald-400 font-bold">Grade recall below &darr;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Response Grading Controls (Active when flipped or on demand) */}
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="text-[11px] font-mono text-slate-400 mb-2.5 text-center flex items-center justify-center gap-1.5">
              <span>HOW WELL DID YOU RECALL THIS CONCEPT?</span>
              <span className="text-slate-500">(Press 1, 2, 3, or 4 on keyboard)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleGradeCard(1)}
                className="p-3 rounded-xl bg-slate-950 hover:bg-rose-950/80 border border-slate-800 hover:border-rose-500 text-slate-300 hover:text-rose-200 text-left transition-all group"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-rose-400 mb-0.5">
                  <span className="font-bold">[1] Again</span>
                  <span>10 mins</span>
                </div>
                <div className="text-xs font-semibold text-slate-200">Failed / Blank</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Resets to Box 1</div>
              </button>

              <button
                onClick={() => handleGradeCard(2)}
                className="p-3 rounded-xl bg-slate-950 hover:bg-amber-950/80 border border-slate-800 hover:border-amber-500 text-slate-300 hover:text-amber-200 text-left transition-all group"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-amber-400 mb-0.5">
                  <span className="font-bold">[2] Hard</span>
                  <span>1 day</span>
                </div>
                <div className="text-xs font-semibold text-slate-200">With Effort</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Maintain level</div>
              </button>

              <button
                onClick={() => handleGradeCard(3)}
                className="p-3 rounded-xl bg-slate-950 hover:bg-indigo-950/80 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-indigo-200 text-left transition-all group"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-indigo-400 mb-0.5">
                  <span className="font-bold">[3] Good</span>
                  <span>4 days</span>
                </div>
                <div className="text-xs font-semibold text-slate-200">Correct</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Move to Box +1</div>
              </button>

              <button
                onClick={() => handleGradeCard(4)}
                className="p-3 rounded-xl bg-slate-950 hover:bg-emerald-950/80 border border-slate-800 hover:border-emerald-500 text-slate-300 hover:text-emerald-200 text-left transition-all group"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-emerald-400 mb-0.5">
                  <span className="font-bold">[4] Easy</span>
                  <span>7 days</span>
                </div>
                <div className="text-xs font-semibold text-slate-200">Instant Recall</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Skip to Box +2</div>
              </button>
            </div>

            {/* Previous / Flip / Next Nav */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80 text-xs font-mono">
              <button
                disabled={safeIndex === 0}
                onClick={handlePrev}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-slate-300 border border-slate-800 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors shadow-md"
              >
                {isFlipped ? "Flip to Front" : "Flip to Answer"}
              </button>

              <button
                disabled={safeIndex >= filteredCards.length - 1}
                onClick={handleNext}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-slate-300 border border-slate-800 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
          <Award className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Cards In Current Filter Queue</h3>
          <p className="text-xs text-slate-400">
            You have mastered or reviewed all cards in this category!
          </p>
          <button
            onClick={() => {
              setFilterMode("all");
              setSelectedChapter("all");
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-mono font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
