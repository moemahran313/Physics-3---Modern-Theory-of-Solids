import React, { useState } from "react";
import { DUAL_TRACK_TOPICS } from "../lib/curriculumData";
import { DualTrackTopic } from "../types";
import { LaTeXRenderer, MathView, FormattedContent } from "./LaTeXRenderer";
import { 
  BookOpen, 
  Binary, 
  BrainCircuit, 
  Search, 
  ChevronRight, 
  Sliders, 
  AlertTriangle, 
  Terminal, 
  Compass, 
  ShieldCheck, 
  Atom,
  Printer
} from "lucide-react";

interface CurriculumBrowserProps {
  onOpenTerminalWithTopic?: (topicTitle: string) => void;
  onOpenSandbox?: () => void;
}

export const CurriculumBrowser: React.FC<CurriculumBrowserProps> = ({
  onOpenTerminalWithTopic,
  onOpenSandbox,
}) => {
  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTopicId, setSelectedTopicId] = useState<string>(DUAL_TRACK_TOPICS[0].id);
  const [viewMode, setViewMode] = useState<"dual" | "math" | "physical">("dual");

  const filteredTopics = DUAL_TRACK_TOPICS.filter((t) => {
    const matchesChapter = selectedChapter === "all" || t.chapterId === selectedChapter;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.mathTrack.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.mathTrack.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChapter && matchesSearch;
  });

  const activeTopic = DUAL_TRACK_TOPICS.find((t) => t.id === selectedTopicId) || DUAL_TRACK_TOPICS[0];

  return (
    <div className="space-y-6">
      {/* Top Bar: Chapter Filtering & Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
                <BookOpen className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Dual-Track Curriculum Reference Library
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Pedagogical Axiom I: Side-by-side Abstract Symbolic Equations & Concrete Physical Intuition.
            </p>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode("dual")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                viewMode === "dual"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Dual-Track (Both)
            </button>
            <button
              onClick={() => setViewMode("math")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                viewMode === "math"
                  ? "bg-slate-800 text-purple-300 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Binary className="w-3.5 h-3.5" />
              <span>Math Only</span>
            </button>
            <button
              onClick={() => setViewMode("physical")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                viewMode === "physical"
                  ? "bg-slate-800 text-amber-300 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Physical Only</span>
            </button>
          </div>
        </div>

        {/* Chapter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800/80">
          <button
            onClick={() => setSelectedChapter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedChapter === "all"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                : "bg-slate-950/60 text-slate-400 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            All Chapters (1-4)
          </button>
          <button
            onClick={() => setSelectedChapter("ch1")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedChapter === "ch1"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                : "bg-slate-950/60 text-slate-400 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            Ch 1: Radiation Catastrophe
          </button>
          <button
            onClick={() => setSelectedChapter("ch2")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedChapter === "ch2"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                : "bg-slate-950/60 text-slate-400 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            Ch 2: Wave Mechanics & Wells
          </button>
          <button
            onClick={() => setSelectedChapter("ch3")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedChapter === "ch3"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                : "bg-slate-950/60 text-slate-400 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            Ch 3: Atomic Transitions
          </button>
          <button
            onClick={() => setSelectedChapter("ch4")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedChapter === "ch4"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                : "bg-slate-950/60 text-slate-400 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            Ch 4: Special Relativity
          </button>
        </div>
      </div>

      {/* Main Grid: Topic Selector on left, Topic Detail on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topic List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search lectures & equations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {filteredTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between ${
                  selectedTopicId === topic.id
                    ? "bg-slate-800/90 border-sky-500/60 shadow-lg text-white"
                    : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-sky-400 border border-slate-800">
                      {topic.chapterId.toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold">{topic.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {topic.mathTrack.title}
                  </p>
                </div>
                <ChevronRight className={`w-4 h-4 mt-1 transition-transform ${
                  selectedTopicId === topic.id ? "rotate-90 text-sky-400" : "text-slate-600"
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Selected Topic Content */}
        <div className="lg:col-span-8 space-y-6">
          <TopicDetailView
            topic={activeTopic}
            viewMode={viewMode}
            onOpenTerminal={() => onOpenTerminalWithTopic?.(activeTopic.title)}
            onOpenSandbox={onOpenSandbox}
          />
        </div>
      </div>
    </div>
  );
};

interface TopicDetailViewProps {
  topic: DualTrackTopic;
  viewMode: "dual" | "math" | "physical";
  onOpenTerminal: () => void;
  onOpenSandbox?: () => void;
}

const TopicDetailView: React.FC<TopicDetailViewProps> = ({
  topic,
  viewMode,
  onOpenTerminal,
  onOpenSandbox,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
              {topic.chapterId.toUpperCase()} Reference
            </span>
            <span className="text-xs font-mono text-slate-400">
              Modern Academy Physics 3 Standard
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {topic.title}
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            {topic.mathTrack.title}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Engage AI Core</span>
          </button>
          {onOpenSandbox && (
            <button
              onClick={onOpenSandbox}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Open in Sandbox</span>
            </button>
          )}
        </div>
      </div>

      {/* Axiomatic Structural Scaffolding Box (Axiom II) */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Axiomatic Structural Scaffolding (Axiom II Sequence)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 font-mono text-[11px] block mb-1">1. Classical Starting Axiom:</span>
            <div className="text-slate-200">
              <FormattedContent content={topic.classicalAxiom} />
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-rose-400 font-mono text-[11px] block mb-1">2. Classical Breakdown Point:</span>
            <div className="text-slate-300">
              {topic.breakdownPoint}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-amber-400 font-mono text-[11px] block mb-1">3. Quantum / Relativistic Postulate:</span>
            <div className="text-slate-200">
              <FormattedContent content={topic.quantumPostulate} />
            </div>
          </div>
        </div>
      </div>

      {/* Dual Tracks: Abstract Mathematical Track + Concrete Mental Model Track */}
      <div className={`grid gap-6 ${viewMode === "dual" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
        {/* Track 1: Abstract Mathematical & Symbolic Track */}
        {(viewMode === "dual" || viewMode === "math") && (
          <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-purple-900/30">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                <Binary className="w-4 h-4 text-purple-400" />
                <span>Track 1: Abstract Mathematical Track</span>
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                Formal Rigor
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-[11px] text-slate-400 uppercase font-mono font-semibold">
                {topic.mathTrack.title}
              </div>
              <p className="text-xs text-slate-300">{topic.mathTrack.description}</p>
              
              {/* Equations list */}
              <div className="space-y-2 pt-2">
                {topic.mathTrack.equations.map((eq, i) => (
                  <div key={i} className="p-2.5 rounded bg-slate-950 border border-slate-800 text-center space-y-1">
                    <span className="text-[10px] font-mono text-purple-300 block">{eq.label}</span>
                    <div className="overflow-x-auto">
                      <MathView math={eq.latex} displayMode={true} />
                    </div>
                    <p className="text-[10px] text-slate-400">{eq.annotation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Derivation Steps */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Unabridged First-Principles Derivation Steps:
              </div>
              {topic.mathTrack.derivationSteps.map((step, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5 text-xs">
                  <div className="font-semibold text-purple-300 flex items-center justify-between">
                    <span>{step.stepNumber}. {step.title}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 overflow-x-auto">
                    <MathView math={step.math} displayMode={true} />
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{step.explanation}</p>
                  {step.boundaryOrLimit && (
                    <div className="text-[10px] font-mono text-cyan-400 bg-slate-950/80 p-1.5 rounded border border-slate-800">
                      <strong>Limit/Boundary:</strong> {step.boundaryOrLimit}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Track 2: Concrete Mental Model & Physical Simulation Track */}
        {(viewMode === "dual" || viewMode === "physical") && (
          <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-amber-900/30">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-amber-400" />
                <span>Track 2: Concrete Mental Model Track</span>
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                Intuitive Simulation
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-[11px] text-amber-400 uppercase font-mono font-semibold">Physical Intuition:</div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {topic.mentalModelTrack.physicalIntuition}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-[11px] text-cyan-400 uppercase font-mono font-semibold">Concrete Mechanical Analogy:</div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{topic.mentalModelTrack.analogy}"
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-[11px] text-emerald-400 uppercase font-mono font-semibold">Key Mechanics:</div>
              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300">
                {topic.mentalModelTrack.keyMechanics.map((mech, i) => (
                  <li key={i}>{mech}</li>
                ))}
              </ul>
            </div>

            {/* Boundary Condition Stress Testing */}
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-[11px] text-indigo-400 uppercase font-mono font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>Boundary Condition Limits (Axiom III):</span>
              </div>
              <div className="space-y-2">
                {topic.mentalModelTrack.boundaryLimits.map((lim, i) => (
                  <div key={i} className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="text-indigo-300 font-mono font-bold text-[11px]">{lim.condition}</div>
                    <div className="text-slate-300 font-mono text-[10px]">{lim.mathBehavior}</div>
                    <p className="text-slate-400 text-[11px]">{lim.physicalInterpretation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Student Pitfalls & Exam Traps */}
            <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-800/40 space-y-2">
              <div className="text-[11px] text-rose-400 uppercase font-mono font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Modern Academy Common Student Pitfalls & Exam Traps:</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-xs text-rose-200/90">
                {topic.examTraps.map((pitfall, i) => (
                  <li key={i}>{pitfall}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
