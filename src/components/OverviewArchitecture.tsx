import React from "react";
import { NavMode } from "../types";
import { 
  Atom, 
  Terminal, 
  BookOpen, 
  Binary, 
  Sliders, 
  GraduationCap, 
  FlaskConical, 
  BrainCircuit, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Compass,
  FileText 
} from "lucide-react";

interface OverviewProps {
  onNavigate: (tab: NavMode) => void;
  onOpenConstants: () => void;
  onExecuteTrigger: (cmd: string) => void;
}

export const OverviewArchitecture: React.FC<OverviewProps> = ({
  onNavigate,
  onOpenConstants,
  onExecuteTrigger,
}) => {
  return (
    <div className="space-y-8 pb-10">
      {/* Hero OS Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM STATUS: ONLINE
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono text-xs">
              Modern Academy Standard (Physics 3)
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono text-xs">
              Course Code: ELCN114 / ELC 214
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Autonomous Educational Core Engine & Interactive Workstation
          </h2>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Engineered exclusively for engineering students mastering the <strong>Modern Theory of Solids</strong>. 
            Operates with mathematical precision, physical intuition, and zero tolerance for hand-waving or superficial summaries.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate("official-docs")}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-colors"
            >
              <FileText className="w-4 h-4 text-emerald-200" />
              <span>Official Final Exams (2020/2021)</span>
            </button>
            <button
              onClick={() => onNavigate("terminal")}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-colors"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Launch Command Terminal</span>
            </button>
            <button
              onClick={() => onNavigate("sandboxes")}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs md:text-sm flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Explore 7 Interactive Sandboxes</span>
            </button>
            <button
              onClick={onOpenConstants}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 font-medium text-xs md:text-sm flex items-center gap-2 border border-indigo-500/30 transition-colors"
            >
              <span>Physical Constants (h, c, e, &lambda;<sub>c</sub>)</span>
            </button>
          </div>
        </div>
      </div>

      {/* The 3 Core Pedagogical Axioms */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
            The Three Enforced Pedagogical Axioms
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono">
              I
            </div>
            <h4 className="text-base font-bold text-white">
              Double-Immersive Dual Encoding
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every single concept simultaneously renders across two tightly synchronized tracks:
              the <strong>Abstract Mathematical & Symbolic Track</strong> (formal proofs, LaTeX operators, boundary substitutions)
              and the <strong>Concrete Mental Model Track</strong> (physical intuition, analogies, mechanical imagery).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold font-mono">
              II
            </div>
            <h4 className="text-base font-bold text-white">
              Axiomatic Structural Scaffolding
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never present equations as magic. Every formula follows an unbreakable 5-step lineage:
              <strong> Starting Conservation Axiom</strong> &rarr; 
              <strong> Classical Breakdown Point</strong> &rarr; 
              <strong> Quantum/Relativistic Postulate</strong> &rarr; 
              <strong> Mathematical Bridge</strong> &rarr; 
              <strong> Physical Measurement</strong>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono">
              III
            </div>
            <h4 className="text-base font-bold text-white">
              Socratic Mental Sandboxing
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Do not simply assert conclusions. Force critical thinking by driving boundary conditions to their extremes:
              $\lim \theta \to 0, \pi$, $\lim v \to c$, $\lim \lambda \to 0$. Expose exactly where classical mechanics explodes into catastrophe.
            </p>
          </div>
        </div>
      </div>

      {/* Curriculum Coverage (The 4 Modern Academy Chapters) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
              Curricular Modules & Lecture Sequences
            </h3>
          </div>
          <button
            onClick={() => onNavigate("curriculum")}
            className="text-xs text-sky-400 hover:text-sky-300 font-mono transition-colors"
          >
            Browse Full Library &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ChapterCard
            chapterNum="1"
            title="Quantum Physics & Radiation Catastrophe"
            topics={["Blackbody & Planck Oscillators", "Photoelectric & Stopping Potential", "Compton Relativistic Scattering"]}
            onClick={() => onNavigate("curriculum")}
            accent="border-rose-900/40 hover:border-rose-500/60"
          />
          <ChapterCard
            chapterNum="2"
            title="Wave Mechanics & Bound States"
            topics={["De Broglie Matter Waves", "Heisenberg Uncertainty Principle", "1D Infinite Square Well", "Barrier Tunneling & STM"]}
            onClick={() => onNavigate("curriculum")}
            accent="border-emerald-900/40 hover:border-emerald-500/60"
          />
          <ChapterCard
            chapterNum="3"
            title="Atomic Physics & Structural Transitions"
            topics={["Bohr Hydrogen Atom & Quantization", "Rydberg Spectral Lines", "Four Quantum Numbers", "X-Ray Emission & Moseley's Law"]}
            onClick={() => onNavigate("curriculum")}
            accent="border-yellow-900/40 hover:border-yellow-500/60"
          />
          <ChapterCard
            chapterNum="4"
            title="Special Theory of Relativity"
            topics={["Einstein's Two Postulates", "Lorentz Coordinate Transforms", "Time Dilation & Length Contraction", "Relativistic Momentum & E=mc²"]}
            onClick={() => onNavigate("curriculum")}
            accent="border-indigo-900/40 hover:border-indigo-500/60"
          />
        </div>
      </div>

      {/* Command Triggers Reference Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Operational Command Triggers Matrix
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Click any trigger to launch in CLI</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <TriggerRow
            cmd="/lecture [topic]"
            desc="Axiomatic structural lecture with Dual-Track Encoding"
            example="/lecture Compton Scattering"
            onTrigger={() => onExecuteTrigger("/lecture Compton Scattering")}
          />
          <TriggerRow
            cmd="/derive [law]"
            desc="Unabridged first-principles proof without skipped steps"
            example="/derive Compton Shift Formula"
            onTrigger={() => onExecuteTrigger("/derive Compton Shift Formula")}
          />
          <TriggerRow
            cmd="/sandbox [phenomenon]"
            desc="Boundary condition stress testing & real-time simulations"
            example="/sandbox Photoelectric Effect"
            onTrigger={() => onExecuteTrigger("/sandbox Photoelectric Effect")}
          />
          <TriggerRow
            cmd="/exam-trainer [chapter]"
            desc="Authentic Modern Academy Exam questions (Types A, B, C, D)"
            example="/exam-trainer Chapter 2"
            onTrigger={() => onExecuteTrigger("/exam-trainer Chapter 2 Bound States")}
          />
          <TriggerRow
            cmd="/mnemonics [topic]"
            desc="High-yield structural memory anchors for spectra and series"
            example="/mnemonics Hydrogen Series"
            onTrigger={() => onExecuteTrigger("/mnemonics Hydrogen Series")}
          />
          <TriggerRow
            cmd="/lab-analyzer [experiment]"
            desc="Historical experiment setup, detector, and classical breakdown"
            example="/lab-analyzer Davisson-Germer"
            onTrigger={() => onExecuteTrigger("/lab-analyzer Davisson-Germer Experiment")}
          />
        </div>
      </div>
    </div>
  );
};

const ChapterCard: React.FC<{
  chapterNum: string;
  title: string;
  topics: string[];
  onClick: () => void;
  accent: string;
}> = ({ chapterNum, title, topics, onClick, accent }) => (
  <div
    onClick={onClick}
    className={`p-5 rounded-2xl bg-slate-950/70 border ${accent} cursor-pointer transition-all flex flex-col justify-between space-y-4`}
  >
    <div className="space-y-2">
      <span className="text-xs font-mono text-indigo-400 font-bold">CHAPTER {chapterNum}</span>
      <h4 className="text-sm font-bold text-white leading-snug">{title}</h4>
      <ul className="space-y-1 pt-1">
        {topics.map((t, i) => (
          <li key={i} className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="truncate">{t}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="text-[11px] font-mono text-indigo-300 flex items-center gap-1 pt-2 border-t border-slate-800/80">
      <span>View Track</span>
      <span>&rarr;</span>
    </div>
  </div>
);

const TriggerRow: React.FC<{
  cmd: string;
  desc: string;
  example: string;
  onTrigger: () => void;
}> = ({ cmd, desc, example, onTrigger }) => (
  <div
    onClick={onTrigger}
    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/40 cursor-pointer transition-all flex items-center justify-between gap-3"
  >
    <div>
      <div className="text-emerald-400 font-bold">{cmd}</div>
      <div className="text-slate-400 text-[11px] mt-0.5">{desc}</div>
      <div className="text-slate-500 text-[10px] mt-0.5">e.g. {example}</div>
    </div>
    <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap">
      Run Trigger &rarr;
    </span>
  </div>
);
