import React, { useState } from "react";
import { 
  RECOVERY_PROMPTS, 
  RecoveryPrompt, 
  CustomPromptOptions, 
  generateCustomPrompt 
} from "../lib/promptsData";
import { 
  Terminal, 
  Copy, 
  Check, 
  Download, 
  Layers, 
  BookOpen, 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  AlertTriangle, 
  ChevronRight, 
  ArrowRight, 
  FileCode, 
  Flame, 
  Atom,
  RefreshCw,
  Search,
  Code2
} from "lucide-react";
import { LaTeXRenderer, MathView } from "./LaTeXRenderer";

interface PromptDirectoryProps {
  onNavigateToTab?: (tab: any) => void;
}

export const PromptDirectory: React.FC<PromptDirectoryProps> = ({ onNavigateToTab }) => {
  const [selectedPromptId, setSelectedPromptId] = useState<string>(RECOVERY_PROMPTS[0].id);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"library" | "generator" | "latex-playground">("library");

  // Custom prompt generator state
  const [genOptions, setGenOptions] = useState<CustomPromptOptions>({
    focusAreas: {
      testing: true,
      flashcards: true,
      latex: true,
      ui_ux: true,
      performance: false,
    },
    severity: "critical",
    engineeringTone: "rigorous",
    targetEngineers: "ai_studio_agent",
  });
  const [generatedPromptText, setGeneratedPromptText] = useState<string>("");
  const [copiedCustom, setCopiedCustom] = useState<boolean>(false);

  // LaTeX Playground State
  const [playgroundMath, setPlaygroundMath] = useState<string>(
    "E_n = -\\frac{m_e e^4}{8 \\varepsilon_0^2 h^2}\\frac{1}{n^2} = -\\frac{13.6\\text{ eV}}{n^2}"
  );

  const selectedPrompt = RECOVERY_PROMPTS.find((p) => p.id === selectedPromptId) || RECOVERY_PROMPTS[0];

  const filteredPrompts = RECOVERY_PROMPTS.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyPrompt = (prompt: RecoveryPrompt) => {
    navigator.clipboard.writeText(prompt.markdownContent);
    setCopiedPromptId(prompt.id);
    setTimeout(() => setCopiedPromptId(null), 2200);
  };

  const handleCopyCustomPrompt = () => {
    const text = generatedPromptText || generateCustomPrompt(genOptions);
    navigator.clipboard.writeText(text);
    setCopiedCustom(true);
    setTimeout(() => setCopiedCustom(false), 2200);
  };

  const handleDownloadPrompt = (prompt: RecoveryPrompt) => {
    const element = document.createElement("a");
    const file = new Blob([prompt.markdownContent], { type: "text/markdown;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `${prompt.number}_${prompt.id}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1.5">
              <span className="text-cyan-400 font-semibold">Prompt Directory</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>System Overhaul Library</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>ELCn114 RefLib</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Engineering Prompt Directory &amp; Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Production-grade recovery prompts created to systematically overhaul the testing engine, active recall flashcards, KaTeX mathematics, and aesthetic architecture.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-300 font-medium">
              5 Master Prompts Ready
            </span>
          </div>
        </div>

        {/* Studio Subtabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-slate-800/80 pt-3 text-xs font-mono">
          <button
            onClick={() => setActiveTab("library")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-semibold ${
              activeTab === "library"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-slate-850 text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Prompt Library</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("generator");
              setGeneratedPromptText(generateCustomPrompt(genOptions));
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-semibold ${
              activeTab === "generator"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                : "bg-slate-850 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Custom Prompt Generator</span>
          </button>

          <button
            onClick={() => setActiveTab("latex-playground")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-semibold ${
              activeTab === "latex-playground"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "bg-slate-850 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Live LaTeX Playground</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PROMPT LIBRARY */}
      {/* ========================================================================= */}
      {activeTab === "library" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Filter & List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter prompts..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                {[
                  { id: "all", label: "All" },
                  { id: "testing", label: "Testing" },
                  { id: "flashcards", label: "Flashcards" },
                  { id: "latex", label: "LaTeX" },
                  { id: "ui_ux", label: "UI / UX" },
                  { id: "master", label: "Master" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      activeCategory === cat.id
                        ? "bg-indigo-600 text-white font-bold"
                        : "bg-slate-850 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Cards List */}
            <div className="space-y-2.5">
              {filteredPrompts.map((p) => {
                const isSelected = p.id === selectedPromptId;
                const isCopied = copiedPromptId === p.id;

                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPromptId(p.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? "bg-slate-900 border-indigo-500 shadow-md ring-1 ring-indigo-500 text-white"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-mono mb-1.5">
                      <span className="font-semibold text-cyan-400">Prompt {p.number}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className={p.severity === "critical" ? "text-rose-400 font-medium" : "text-amber-400 font-medium"}>
                        {p.severity}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm tracking-tight">{p.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {p.summary}
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span className="truncate max-w-[140px]">{p.targetSubsystem}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyPrompt(p);
                        }}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] transition-colors ${
                          isCopied
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-600"
                            : "bg-slate-800 text-slate-300 hover:text-white"
                        }`}
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Prompt Viewer */}
          <div className="lg:col-span-8 space-y-4">
            {selectedPrompt && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                      <span className="text-cyan-400 font-semibold">Prompt {selectedPrompt.number}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{selectedPrompt.targetSubsystem}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className={selectedPrompt.severity === "critical" ? "text-rose-400 font-medium" : "text-amber-400 font-medium"}>
                        {selectedPrompt.severity}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                      {selectedPrompt.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadPrompt(selectedPrompt)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition-colors"
                      title="Download Markdown (.md)"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleCopyPrompt(selectedPrompt)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border shadow-sm ${
                        copiedPromptId === selectedPrompt.id
                          ? "bg-emerald-600 text-white border-emerald-500"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400"
                      }`}
                    >
                      {copiedPromptId === selectedPrompt.id ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Full Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Key Fixes Summary Card */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>WHAT THIS PROMPT FIXES &amp; DELIVERS:</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {selectedPrompt.keyFixes.map((fix, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-400 font-mono font-bold shrink-0">&bull;</span>
                        <span>{fix}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Markdown Code Block */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>RAW PROMPT TEXT (READY TO EXECUTE IN AI STUDIO / CLAUDE / CHATGPT):</span>
                    <span className="text-slate-500">{selectedPrompt.markdownContent.length} characters</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px] scrollbar-thin scrollbar-thumb-slate-800">
                    {selectedPrompt.markdownContent}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CUSTOM PROMPT GENERATOR */}
      {/* ========================================================================= */}
      {activeTab === "generator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Configure Recovery Parameters</span>
              </h3>

              {/* Toggles */}
              <div className="space-y-2 text-xs font-mono">
                <span className="text-slate-400 block mb-1">Select Broken Systems to Target:</span>
                {[
                  { key: "testing", label: "Testing Engine & Tolerant Answer Grader" },
                  { key: "flashcards", label: "Flashcards, 3D Flip & Leitner System" },
                  { key: "latex", label: "KaTeX Math Rendering & Copyable Formulas" },
                  { key: "ui_ux", label: "UI / UX Slop Purge & Dark Lab Aesthetic" },
                  { key: "performance", label: "Offline & Zero Layout Shifts" },
                ].map(({ key, label }) => {
                  const isChecked = genOptions.focusAreas[key as keyof typeof genOptions.focusAreas];
                  return (
                    <label
                      key={key}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const updated = {
                            ...genOptions,
                            focusAreas: {
                              ...genOptions.focusAreas,
                              [key]: e.target.checked,
                            },
                          };
                          setGenOptions(updated);
                          setGeneratedPromptText(generateCustomPrompt(updated));
                        }}
                        className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900"
                      />
                      <span className="text-slate-200">{label}</span>
                    </label>
                  );
                })}
              </div>

              {/* Severity */}
              <div className="space-y-1.5 text-xs font-mono">
                <span className="text-slate-400 block">Severity Level:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(["critical", "high", "polish"] as const).map((sev) => (
                    <button
                      key={sev}
                      onClick={() => {
                        const updated = { ...genOptions, severity: sev };
                        setGenOptions(updated);
                        setGeneratedPromptText(generateCustomPrompt(updated));
                      }}
                      className={`p-2 rounded-lg border uppercase text-[10px] font-bold transition-all ${
                        genOptions.severity === sev
                          ? "bg-cyan-600 text-white border-cyan-400 shadow-sm"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              {/* Regenerate Button */}
              <button
                onClick={() => setGeneratedPromptText(generateCustomPrompt(genOptions))}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold transition-all shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate Custom Prompt</span>
              </button>
            </div>
          </div>

          {/* Generated Output */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>TAILORED RECOVERY PROMPT</span>
                </span>

                <button
                  onClick={handleCopyCustomPrompt}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                    copiedCustom
                      ? "bg-emerald-600 text-white border-emerald-500"
                      : "bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-400"
                  }`}
                >
                  {copiedCustom ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCustom ? "Copied!" : "Copy Generated Prompt"}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[520px] scrollbar-thin scrollbar-thumb-slate-800">
                {generatedPromptText || generateCustomPrompt(genOptions)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: LIVE LATEX PLAYGROUND */}
      {/* ========================================================================= */}
      {activeTab === "latex-playground" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-purple-400" />
              <span>Live KaTeX Mathematical Playground &amp; Formula Tester</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Test KaTeX expressions in real time to verify syntax, symbol alignment, and mobile rendering before pasting into study notes.
            </p>
          </div>

          {/* Quick Symbol Toolbar */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono text-slate-400 block font-bold">1-TAP SYMBOL SHORTCUTS:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "ℏ (hbar)", code: "\\hbar" },
                { label: "λ (lambda)", code: "\\lambda" },
                { label: "ψ (psi)", code: "\\psi" },
                { label: "Δλ (shift)", code: "\\Delta \\lambda" },
                { label: "σ (Stefan)", code: "\\sigma" },
                { label: "√ (sqrt)", code: "\\sqrt{x}" },
                { label: "a/b (frac)", code: "\\frac{a}{b}" },
                { label: "∫ (integral)", code: "\\int_{0}^{L} f(x) dx" },
                { label: "E=mc²", code: "E = \\gamma m_0 c^2" },
                { label: "Tunnel T", code: "T \\approx e^{-2 k_2 L}" },
              ].map(({ label, code }) => (
                <button
                  key={label}
                  onClick={() => setPlaygroundMath((prev) => `${prev} ${code}`)}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Editor */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-400 block">
                LaTeX Code Input:
              </label>
              <textarea
                value={playgroundMath}
                onChange={(e) => setPlaygroundMath(e.target.value)}
                placeholder="Enter LaTeX math here, e.g. \frac{hc}{\lambda} = \phi + eV_s"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs font-mono text-slate-200 placeholder-slate-600 focus:border-purple-500 focus:outline-none min-h-[160px]"
              />
            </div>

            {/* Live Render Output */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-400 block">
                Live KaTeX Preview:
              </label>
              <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-5 min-h-[160px] flex items-center justify-center text-center overflow-x-auto">
                <LaTeXRenderer math={playgroundMath} block />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
