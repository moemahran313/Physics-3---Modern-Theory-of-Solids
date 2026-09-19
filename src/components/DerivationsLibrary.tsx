import React, { useState } from "react";
import { DUAL_TRACK_TOPICS } from "../lib/curriculumData";
import { MathView } from "./MathView";
import { Binary, Search, Terminal, ChevronDown, ChevronUp, CheckCircle, FileText } from "lucide-react";

export const DerivationsLibrary: React.FC<{
  onOpenTerminalWithTopic?: (topicTitle: string) => void;
}> = ({ onOpenTerminalWithTopic }) => {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string>(DUAL_TRACK_TOPICS[0].id);

  const filtered = DUAL_TRACK_TOPICS.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.mathTrack.title.toLowerCase().includes(search.toLowerCase()) ||
    t.mathTrack.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                <Binary className="w-5 h-5" />
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                First-Principles Mathematical Derivations Repository
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Strictly rigorous, unshortened proofs from initial conservation axioms to final measurable limits without skipped algebraic steps.
            </p>
          </div>

          <div className="relative min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search proofs (e.g. Compton, Well, Bohr)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Proofs Accordion List */}
      <div className="space-y-4">
        {filtered.map((topic) => {
          const isExpanded = expandedId === topic.id;
          const primaryEquation = topic.mathTrack.equations[0]?.latex || "";

          return (
            <div
              key={topic.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all"
            >
              {/* Accordion Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? "" : topic.id)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-850 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-950/80 text-purple-300 border border-purple-800/40">
                    {topic.chapterId.toUpperCase()}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>{topic.title}</span>
                      <span className="text-xs font-normal text-slate-400">
                        ({topic.mathTrack.title})
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {primaryEquation && (
                    <div className="hidden sm:block text-xs font-mono text-purple-300 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800">
                      <MathView math={primaryEquation} />
                    </div>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="p-5 md:p-6 bg-slate-950/60 border-t border-slate-800/80 space-y-5 animate-in fade-in">
                  {/* Governing Equations Box */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <span className="text-[11px] font-mono uppercase text-slate-400 block">
                      Governing Laws & Boundary Equations:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {topic.mathTrack.equations.map((eq, i) => (
                        <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-1">
                          <span className="text-[10px] font-mono text-purple-300 block">{eq.label}</span>
                          <div className="overflow-x-auto py-1">
                            <MathView math={eq.latex} displayMode={true} />
                          </div>
                          <p className="text-[10px] text-slate-400">{eq.annotation}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Derivation */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Complete Step-by-Step Proof:
                    </h4>
                    {topic.mathTrack.derivationSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs"
                      >
                        <div className="font-semibold text-purple-300 flex items-center justify-between">
                          <span>{step.stepNumber}. {step.title}</span>
                          <span className="text-[10px] font-mono text-slate-500">Step {idx + 1}</span>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 overflow-x-auto text-center">
                          <MathView math={step.math} displayMode={true} />
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          <strong>Physical & Algebraic Rationale:</strong> {step.explanation}
                        </p>
                        {step.boundaryOrLimit && (
                          <div className="text-[10px] font-mono text-cyan-400 bg-slate-950/80 p-2 rounded border border-slate-800">
                            <strong>Physical Boundary / Limit Check:</strong> {step.boundaryOrLimit}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => onOpenTerminalWithTopic?.(`/derive ${topic.title}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors"
                    >
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Request Socratic Interrogation in AI Terminal</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
