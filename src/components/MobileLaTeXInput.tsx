import React, { useState, useRef } from "react";
import { MathView } from "./LaTeXRenderer";
import { formatToCleanLatex } from "../lib/physicsEvaluator";
import { Delete, ArrowRight, Code2, Sparkles } from "lucide-react";

export interface MobileLaTeXInputProps {
  value: string;
  onChange: (newLatex: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  unitLabel?: string;
  label?: string;
  governingFormula?: string;
}

const PHYSICS_SYMBOL_ROW = [
  { display: "\\hbar", token: "\\hbar", title: "Reduced Planck constant (hbar)" },
  { display: "\\lambda", token: "\\lambda", title: "Wavelength (lambda)" },
  { display: "\\nu", token: "\\nu", title: "Frequency (nu)" },
  { display: "\\psi", token: "\\psi", title: "Wavefunction (psi)" },
  { display: "\\sigma", token: "\\sigma", title: "Stefan-Boltzmann constant (sigma)" },
  { display: "\\pi", token: "\\pi", title: "Pi" },
  { display: "\\phi", token: "\\phi", title: "Work function (phi)" },
  { display: "\\theta", token: "\\theta", title: "Scattering angle (theta)" },
  { display: "\\gamma", token: "\\gamma", title: "Lorentz / tunneling factor (gamma)" },
  { display: "\\Delta\\lambda", token: "\\Delta\\lambda", title: "Compton wavelength shift" },
  { display: "\\lambda_{\\max}", token: "\\lambda_{\\max}", title: "Peak wavelength" },
  { display: "K_{\\max}", token: "K_{\\max}", title: "Maximum kinetic energy" },
  { display: "V_0", token: "V_0", title: "Stopping potential / barrier height" },
  { display: "E_n", token: "E_n", title: "Quantized energy state" },
];

export const MobileLaTeXInput: React.FC<MobileLaTeXInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Tap physics symbols & numbers below to build your LaTeX expression...",
  unitLabel,
  label,
  governingFormula,
}) => {
  const [showRawSyntax, setShowRawSyntax] = useState(false);
  const [activeSubPad, setActiveSubPad] = useState<"math" | "constants">("math");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Render empty braces `{}` as visible `\square` boxes in the live preview so users see where their next tap goes
  const cleanPreview = formatToCleanLatex(value).replace(/\{\}/g, "{\\square}");

  const insertToken = (token: string, cursorOffsetBack = 0) => {
    const el = inputRef.current;
    const current = value || "";

    if (el && showRawSyntax && typeof el.selectionStart === "number") {
      const start = el.selectionStart;
      const end = el.selectionEnd ?? start;
      const next = current.slice(0, start) + token + current.slice(end);
      onChange(next);
      setTimeout(() => {
        el.focus();
        const pos = Math.max(0, start + token.length - cursorOffsetBack);
        el.setSelectionRange(pos, pos);
      }, 10);
      return;
    }

    // Visual No-Syntax Mode: if there is an empty `{}` slot (e.g. from \times 10^{} or \frac{}{}),
    // automatically insert numbers/symbols inside the first empty `{}`!
    const emptySlotIdx = current.indexOf("{}");
    if (emptySlotIdx !== -1 && cursorOffsetBack === 0 && !token.includes("{")) {
      const next =
        current.slice(0, emptySlotIdx + 1) + token + current.slice(emptySlotIdx + 1);
      onChange(next);
    } else {
      onChange(current + token);
    }
  };

  // Advance out of the current `{...}` slot or jump to the next empty `{}`
  const handleNextSlot = () => {
    const el = inputRef.current;
    if (el && showRawSyntax) {
      const pos = el.selectionStart ?? value.length;
      const nextBrace = value.indexOf("}", pos);
      if (nextBrace !== -1) {
        const target = value[nextBrace + 1] === "{" ? nextBrace + 2 : nextBrace + 1;
        el.focus();
        el.setSelectionRange(target, target);
      }
      return;
    }
    // In visual mode, if there's no empty `{}` left, append a space so subsequent tokens go at the end
    onChange(value + " ");
  };

  // Smart backspace that deletes whole LaTeX commands (\hbar, \lambda, \times 10^{}) cleanly
  const handleSmartBackspace = () => {
    if (!value) return;
    const patterns = [
      /\\times\s*10\^\{\}\s*$/,
      /\\frac\{\}\{\}\s*$/,
      /\\sqrt\{\}\s*$/,
      /\^\{\}\s*$/,
      /\\lambda_\{\\max\}\s*$/,
      /K_\{\\max\}\s*$/,
      /\\Delta\\lambda\s*$/,
      /\\text\{[^}]*\}\s*$/,
      /\\[a-zA-Z]+\s*$/,
    ];
    for (const pat of patterns) {
      if (pat.test(value)) {
        onChange(value.replace(pat, ""));
        return;
      }
    }
    onChange(value.slice(0, -1));
  };

  return (
    <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3 sm:p-4 space-y-3 shadow-inner">
      {/* Top Label & Raw Syntax Toggle */}
      <div className="flex items-center justify-between gap-2">
        {label ? (
          <span className="text-xs font-mono font-bold text-cyan-300">{label}</span>
        ) : (
          <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Visual LaTeX Math Input</span>
          </span>
        )}

        <div className="flex items-center gap-1.5">
          {governingFormula && (
            <button
              type="button"
              onClick={() =>
                onChange(governingFormula.replace(/^\$+|\$+$/g, "").trim())
              }
              className="px-2.5 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/40 text-[11px] font-mono text-indigo-200 transition-colors"
            >
              Insert Formula
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowRawSyntax(!showRawSyntax)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono flex items-center gap-1 transition-colors ${
              showRawSyntax
                ? "bg-cyan-950 border-cyan-500/60 text-cyan-200"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
            title="Toggle direct keyboard / raw LaTeX editing"
          >
            <Code2 className="w-3 h-3" />
            <span>{showRawSyntax ? "Hide Raw TeX" : "Keyboard / TeX"}</span>
          </button>
        </div>
      </div>

      {/* Live Rendered KaTeX Display Box (No raw code clutter) */}
      <div
        onClick={() => {
          if (showRawSyntax) inputRef.current?.focus();
        }}
        className="min-h-[54px] px-3.5 py-3 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-between gap-3 overflow-x-auto"
      >
        {cleanPreview.trim() ? (
          <div className="text-base sm:text-xl text-white overflow-x-auto max-w-full py-0.5">
            <MathView math={cleanPreview} displayMode={false} />
          </div>
        ) : (
          <span className="text-xs sm:text-sm text-slate-400 italic select-none">
            {placeholder}
          </span>
        )}

        {unitLabel && (
          <span className="text-xs font-mono font-bold text-cyan-400 shrink-0 px-2 py-1 rounded-lg bg-slate-950 border border-slate-800">
            [{unitLabel}]
          </span>
        )}
      </div>

      {/* Optional Direct Keyboard Input (Hidden by default on mobile so users don't have to type raw syntax) */}
      {showRawSyntax && (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => onChange(formatToCleanLatex(value))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && onSubmit) onSubmit();
          }}
          placeholder="Type numbers or LaTeX (e.g. 9.41 \times 10^{-6})..."
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
        />
      )}

      {/* DEDICATED PHYSICS SYMBOL ROW (Always visible, horizontally scrollable on small phones, wraps cleanly on larger screens) */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-0.5">
          <span>Physics Symbol Bar (Tap to insert):</span>
          <span className="text-cyan-400 sm:hidden">Swipe →</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {PHYSICS_SYMBOL_ROW.map((sym, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => insertToken(sym.token)}
              title={sym.title}
              className="min-w-[46px] min-h-[44px] px-2.5 rounded-xl bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-100 flex items-center justify-center shrink-0 active:scale-95 transition-transform"
            >
              <MathView math={sym.display} displayMode={false} />
            </button>
          ))}
        </div>
      </div>

      {/* Mode Switcher + Backspace / Clear / Next Slot Controls */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-slate-800/80">
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveSubPad("math")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
              activeSubPad === "math"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Numbers & <MathView math="10^n" displayMode={false} />
          </button>
          <button
            type="button"
            onClick={() => setActiveSubPad("constants")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
              activeSubPad === "constants"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Constants & Units
          </button>
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <button
            type="button"
            onClick={handleNextSlot}
            className="px-2.5 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-xs font-semibold text-cyan-200 min-h-[38px] flex items-center gap-1"
            title="Move out of current exponent/fraction box"
          >
            <span>Next Box</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleSmartBackspace}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 min-h-[38px] flex items-center justify-center"
            title="Delete last symbol or number"
          >
            <Delete className="w-4 h-4 text-rose-400" />
          </button>
          <button
            type="button"
            onClick={() => onChange("")}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-200 text-xs font-mono min-h-[38px]"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Sub-Pad 1: Structural LaTeX Templates + Mobile Number Grid */}
      {activeSubPad === "math" ? (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
          {/* Structural LaTeX Templates */}
          <button
            type="button"
            onClick={() => insertToken(" \\times 10^{}", 1)}
            className="col-span-2 min-h-[46px] rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/50 text-white font-semibold flex items-center justify-center active:scale-95 transition-transform"
          >
            <MathView math="\times 10^{\square}" displayMode={false} />
          </button>
          <button
            type="button"
            onClick={() => insertToken("\\frac{}{}", 3)}
            className="min-h-[46px] rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/50 text-white font-semibold flex items-center justify-center active:scale-95 transition-transform"
          >
            <MathView math="\frac{a}{b}" displayMode={false} />
          </button>
          <button
            type="button"
            onClick={() => insertToken("\\sqrt{}", 1)}
            className="min-h-[46px] rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/50 text-white font-semibold flex items-center justify-center active:scale-95 transition-transform"
          >
            <MathView math="\sqrt{x}" displayMode={false} />
          </button>
          <button
            type="button"
            onClick={() => insertToken("^{2}", 0)}
            className="min-h-[46px] rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-200 font-semibold flex items-center justify-center active:scale-95 transition-transform"
          >
            <MathView math="x^2" displayMode={false} />
          </button>
          <button
            type="button"
            onClick={() => insertToken("^{}", 1)}
            className="min-h-[46px] rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-200 font-semibold flex items-center justify-center active:scale-95 transition-transform"
          >
            <MathView math="x^{\square}" displayMode={false} />
          </button>

          {/* Digits */}
          {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "-"].map(
            (digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => insertToken(digit)}
                className="min-h-[46px] rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-base font-mono font-bold text-white flex items-center justify-center active:scale-95 transition-transform"
              >
                {digit}
              </button>
            )
          )}

          {/* Common Operators & Powers */}
          {[
            { math: "=", token: " = " },
            { math: "+", token: " + " },
            { math: "\\times", token: " \\times " },
            { math: "\\int", token: "\\int " },
            { math: "10^{-9}", token: " \\times 10^{-9}" },
            { math: "10^{-34}", token: " \\times 10^{-34}" },
          ].map((op, i) => (
            <button
              key={i}
              type="button"
              onClick={() => insertToken(op.token)}
              className="min-h-[46px] rounded-xl bg-slate-800/90 hover:bg-slate-700 text-sm text-cyan-200 flex items-center justify-center active:scale-95 transition-transform"
            >
              <MathView math={op.math} displayMode={false} />
            </button>
          ))}
        </div>
      ) : (
        /* Sub-Pad 2: Physical Constants & Clean Units */
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {[
            { label: "h (J·s)", math: "6.63 \\times 10^{-34}", token: "6.63 \\times 10^{-34}" },
            { label: "ℏ (J·s)", math: "1.05 \\times 10^{-34}", token: "1.05 \\times 10^{-34}" },
            { label: "c (m/s)", math: "3 \\times 10^{8}", token: "3 \\times 10^{8}" },
            { label: "b (Wien)", math: "2.898 \\times 10^{-3}", token: "2.898 \\times 10^{-3}" },
            { label: "σ (Stefan)", math: "5.67 \\times 10^{-8}", token: "5.67 \\times 10^{-8}" },
            { label: "e (C)", math: "1.6 \\times 10^{-19}", token: "1.6 \\times 10^{-19}" },
            { label: "m_e (kg)", math: "9.11 \\times 10^{-31}", token: "9.11 \\times 10^{-31}" },
            { label: "+ 273 (K)", math: "+ 273", token: " + 273" },
            { label: "Unit: m", math: "\\text{ m}", token: "\\text{ m}" },
            { label: "Unit: nm", math: "\\text{ nm}", token: "\\text{ nm}" },
            { label: "Unit: eV", math: "\\text{ eV}", token: "\\text{ eV}" },
            { label: "Unit: J", math: "\\text{ J}", token: "\\text{ J}" },
          ].map((cBtn, i) => (
            <button
              key={i}
              type="button"
              onClick={() => insertToken(cBtn.token)}
              className="min-h-[46px] px-2 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex flex-col items-center justify-center active:scale-95 transition-transform"
            >
              <span className="text-[10px] font-mono text-slate-400">{cBtn.label}</span>
              <span className="text-xs text-cyan-300">
                <MathView math={cBtn.math} displayMode={false} />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
