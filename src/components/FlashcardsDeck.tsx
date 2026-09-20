import React, { useState } from "react";
import { FLASHCARDS } from "../lib/curriculumData";
import { Flashcard } from "../types";
import { LaTeXRenderer, MathView } from "./LaTeXRenderer";
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
  BookOpen 
} from "lucide-react";

export const FlashcardsDeck: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useLocalStorage<number>("flashcards_current_idx", 0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredList, setMasteredList] = useLocalStorage<string[]>("flashcards_mastered_ids", []);

  const masteredIds = new Set(masteredList);

  const filteredCards = FLASHCARDS.filter((c) => {
    if (selectedChapter === "all") return true;
    return c.chapterId === selectedChapter;
  });

  const safeIndex = Math.min(Math.max(0, currentIndex), filteredCards.length - 1);
  const activeCard: Flashcard = filteredCards[safeIndex] || FLASHCARDS[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => Math.min(filteredCards.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleToggleMastered = () => {
    setMasteredList((prev) => {
      if (prev.includes(activeCard.id)) {
        return prev.filter((id) => id !== activeCard.id);
      } else {
        return [...prev, activeCard.id];
      }
    });
  };

  const handleResetProgress = () => {
    setMasteredList([]);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="space-y-6">
      {/* Title & Filter */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                <Layers className="w-5 h-5" />
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Active Recall Technical Flashcards
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Rapidly reinforce definitions, boundary values, operator definitions, and exam pitfalls before test day.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[11px] text-slate-400 font-mono">Mastery Progress:</div>
              <div className="text-sm font-bold font-mono text-indigo-400">
                {masteredIds.size} / {FLASHCARDS.length} Cards Mastered
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800/80">
          <span className="text-xs text-slate-500 font-mono">Chapter:</span>
          {["all", "ch1", "ch2", "ch3", "ch4"].map((ch) => (
            <button
              key={ch}
              onClick={() => {
                setSelectedChapter(ch);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedChapter === ch
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                  : "bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {ch === "all" ? "All Chapters" : ch.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Flashcard Area */}
      <div className="flex flex-col items-center justify-center">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full max-w-2xl min-h-[360px] p-6 md:p-8 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-2xl relative select-none ${
            isFlipped
              ? "bg-slate-900 border-indigo-500/60 shadow-indigo-500/10"
              : "bg-slate-950 border-slate-800 hover:border-slate-700"
          }`}
        >
          {/* Card Top Banner */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-300">
                {activeCard.chapterId.toUpperCase()}
              </span>
              <span className="text-slate-400 font-medium">
                {activeCard.front.concept}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Click to {isFlipped ? "View Prompt" : "Reveal Answer"}</span>
            </div>
          </div>

          {/* Card Body */}
          <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
            {!isFlipped ? (
              <>
                <h3 className="text-lg md:text-xl font-bold text-white max-w-xl leading-relaxed">
                  {activeCard.front.prompt}
                </h3>
                {activeCard.front.latexSnippet && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <MathView math={activeCard.front.latexSnippet} displayMode={true} />
                  </div>
                )}
                <span className="text-xs text-slate-500 font-mono">
                  (Formulate your mathematical proof & physical rationale before flipping)
                </span>
              </>
            ) : (
              <div className="space-y-4 max-w-xl text-left w-full">
                <div>
                  <span className="text-[10px] font-mono text-indigo-300 uppercase block mb-1">
                    Formal Definition:
                  </span>
                  <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">
                    {activeCard.back.definition}
                  </p>
                </div>

                {activeCard.back.governingEquation && (
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-center">
                    <MathView math={activeCard.back.governingEquation} displayMode={true} />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-400 block">Physical Limit:</span>
                    <span className="text-slate-300 font-mono text-[11px]">{activeCard.back.physicalLimit}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-400 block">SI Units:</span>
                    <span className="text-slate-300 font-mono text-[11px]">{activeCard.back.siUnits}</span>
                  </div>
                </div>

                {activeCard.back.examWarning && (
                  <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/40 text-rose-300 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Exam Trap Warning:</strong> {activeCard.back.examWarning}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Card Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs">
            <span className="text-slate-400 font-mono">
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleMastered();
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                masteredIds.has(activeCard.id)
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{masteredIds.has(activeCard.id) ? "Mastered" : "Mark Mastered"}</span>
            </button>
          </div>
        </div>

        {/* Card Navigation Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            disabled={currentIndex === 0}
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 border border-slate-800 text-xs font-semibold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-colors"
          >
            {isFlipped ? "Show Prompt" : "Flip Card"}
          </button>

          <button
            disabled={currentIndex >= filteredCards.length - 1}
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 border border-slate-800 text-xs font-semibold transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
