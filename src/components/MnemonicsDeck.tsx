import React, { useState } from "react";
import { MNEMONIC_CARDS } from "../lib/curriculumData";
import { MnemonicCard } from "../types";
import { MathView } from "./MathView";
import { BrainCircuit, Lightbulb, BookmarkCheck, Sparkles, Compass } from "lucide-react";

export const MnemonicsDeck: React.FC = () => {
  const [selectedMnemonicId, setSelectedMnemonicId] = useState<string>(MNEMONIC_CARDS[0].id);

  const activeMnemonic: MnemonicCard =
    MNEMONIC_CARDS.find((m) => m.id === selectedMnemonicId) || MNEMONIC_CARDS[0];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-yellow-500/20 text-yellow-400">
            <BrainCircuit className="w-5 h-5" />
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            High-Yield Structural Mnemonics & Memory Anchors
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Instantly recall spectral series classifications, quantum number hierarchies, relativity sign conventions, and scattering limits under high-pressure exam conditions.
        </p>

        {/* Mnemonics Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-slate-800/80">
          {MNEMONIC_CARDS.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMnemonicId(m.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedMnemonicId === m.id
                  ? "bg-slate-800 border-yellow-500/60 shadow-md text-white"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <div className="text-[10px] font-mono text-yellow-400 mb-0.5">
                {m.chapterId.toUpperCase()}
              </div>
              <div className="text-xs font-bold truncate">{m.concept}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Mnemonic Detail Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
            Chapter: {activeMnemonic.chapterId.toUpperCase()}
          </span>
          <h3 className="text-xl font-bold text-white mt-2">{activeMnemonic.concept}</h3>
          <p className="text-xs text-slate-400 mt-1">{activeMnemonic.explanation}</p>
        </div>

        {/* Catchphrase Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-950/40 via-amber-950/30 to-slate-950/80 border border-yellow-800/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-yellow-400 block">
              Memory Catchphrase:
            </span>
            <div className="text-base md:text-lg font-bold text-white tracking-wide">
              "{activeMnemonic.mnemonicPhrase}"
            </div>
          </div>
        </div>

        {/* Visual Anchor */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Concrete Mental Image / Visual Anchor:</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans pl-6">
            {activeMnemonic.visualAnchor}
          </p>
        </div>

        {/* Rules & Sequence Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Deconstructed Structural Rules:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeMnemonic.rules.map((rule, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs"
              >
                <div className="font-mono text-yellow-400 text-[11px] font-bold">
                  Rule {i + 1}
                </div>
                <div className="text-slate-200 font-sans">{rule}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
