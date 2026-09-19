import React, { useState } from "react";
import { LAB_EXPERIMENTS } from "../lib/curriculumData";
import { LabExperiment } from "../types";
import { MathView } from "./MathView";
import { 
  FlaskConical, 
  Settings, 
  AlertOctagon, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  ShieldAlert 
} from "lucide-react";

export const LabAnalyzer: React.FC = () => {
  const [selectedLabId, setSelectedLabId] = useState<string>(LAB_EXPERIMENTS[0].id);

  const activeLab: LabExperiment =
    LAB_EXPERIMENTS.find((l) => l.id === selectedLabId) || LAB_EXPERIMENTS[0];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
            <FlaskConical className="w-5 h-5" />
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Experimental Laboratory & Apparatus Analyzer
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Deconstruct historical and laboratory benchmark experiments: apparatus layout, classical expectations, quantum/relativistic evidence, and measurement extraction.
        </p>

        {/* Experiment Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-slate-800/80">
          {LAB_EXPERIMENTS.map((lab) => (
            <button
              key={lab.id}
              onClick={() => setSelectedLabId(lab.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedLabId === lab.id
                  ? "bg-slate-800 border-teal-500/60 shadow-md text-white"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <div className="text-[10px] font-mono text-teal-400 mb-0.5">
                {lab.chapterId.toUpperCase()} APPARATUS
              </div>
              <div className="text-xs font-bold truncate">{lab.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Experiment Breakdown Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {activeLab.chapterId.toUpperCase()} Experimental Bench
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">{activeLab.name}</h3>
            <p className="text-xs text-slate-400 mt-1">
              <strong>Objective:</strong> {activeLab.objective}
            </p>
          </div>
        </div>

        {/* Apparatus Components Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Hardware Apparatus & Circuit Elements:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {activeLab.apparatusComponents.map((app, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-teal-950/80 border border-teal-800/60 text-teal-300 flex items-center justify-center font-mono text-xs flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-xs text-slate-200 font-bold truncate">{app.name}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{app.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Classical Expectation vs Quantum/Relativistic Observation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4" />
              <span>Classical Mechanics Expectation:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeLab.classicalExpectation}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <CheckCircle className="w-4 h-4" />
              <span>Actual Experimental Observation:</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {activeLab.experimentalObservation}
            </p>
          </div>
        </div>

        {/* Quantum / Relativistic Explanation */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Modern Quantum / Relativistic Theoretical Resolution:</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {activeLab.quantumOrRelativisticExplanation}
          </p>
        </div>

        {/* Governing Equations */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Governing Physical Equations & Analysis Formulas:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeLab.governingEquations.map((eq, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center overflow-x-auto">
                  <MathView math={eq.latex} displayMode={true} />
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  <strong>Variables:</strong> {eq.variables}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Experimental Insights & Pitfalls */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Critical Experimental Protocols & Sources of Error:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
            {activeLab.pitfallsAndTroubleshooting.map((insight, idx) => (
              <li key={idx} className="leading-relaxed">{insight}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
