import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MathView } from "./LaTeXRenderer";
import { formatToCleanLatex } from "../lib/physicsEvaluator";
import {
  Delete,
  ChevronLeft,
  ChevronRight,
  CornerDownLeft,
  ChevronDown,
  Code2,
  Wand2,
} from "lucide-react";

export interface MobileLaTeXInputProps {
  value: string;
  onChange: (newLatex: string) => void;
  onSubmit?: () => void;
  onNextLine?: () => void;
  onCloseDock?: () => void;
  placeholder?: string;
  unitLabel?: string;
  label?: string;
  governingFormula?: string;
  docked?: boolean;
  cursorPos?: number;
  onCursorChange?: (pos: number) => void;
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

/**
 * Splits a LaTeX string into atomic cursor stop positions so pressing Left (◄) or Right (►)
 * never lands inside the letters of a command like `\frac` or `\lambda`.
 */
export function getLatexCursorStops(latex: string): number[] {
  const stops = new Set<number>([0, latex.length]);
  let i = 0;
  while (i < latex.length) {
    stops.add(i);
    if (latex[i] === "\\") {
      // Advance over full LaTeX command name e.g. \frac, \hbar, \lambda
      let j = i + 1;
      while (j < latex.length && /[a-zA-Z]/.test(latex[j])) {
        j++;
      }
      // If followed by `{`, stop right inside the `{`
      if (latex[j] === "{") {
        i = j + 1;
      } else {
        i = j;
      }
    } else if (latex.slice(i).startsWith("^{")) {
      i += 2;
    } else if (latex.slice(i).startsWith("_{")) {
      i += 2;
    } else if (latex.slice(i).startsWith("}{")) {
      stops.add(i + 2);
      i += 2;
    } else {
      i++;
    }
    stops.add(i);
  }
  return Array.from(stops).sort((a, b) => a - b);
}

/**
 * Renders a LaTeX string with a visible cyan cursor bar (`\mid`) at `cursorPos`,
 * while turning any remaining empty `{}` slots into `\square`.
 */
export function renderLatexWithCursor(raw: string, cursorPos: number, isFocused: boolean): string {
  const safeStr = raw || "";
  if (!isFocused) {
    return formatToCleanLatex(safeStr).replace(/\{\}/g, "{\\square}");
  }

  const clamped = Math.max(0, Math.min(safeStr.length, cursorPos));
  const before = safeStr.slice(0, clamped);
  const after = safeStr.slice(clamped);

  // If cursor sits right inside an empty `{}` (i.e. before ends with `{` and after starts with `}`),
  // render a highlighted cyan square `{\color{#22d3ee}{\blacksquare}}`
  if (before.endsWith("{") && after.startsWith("}")) {
    const combined =
      before + "\\color{#22d3ee}{\\blacksquare}" + after;
    return combined.replace(/\{\}/g, "{\\square}");
  }

  const withCursor =
    before + "{\\color{#22d3ee}{\\boldsymbol{\\mid}}}" + after;
  return withCursor.replace(/\{\}/g, "{\\square}");
}

export const MobileLaTeXInput: React.FC<MobileLaTeXInputProps> = ({
  value,
  onChange,
  onSubmit,
  onNextLine,
  onCloseDock,
  placeholder = "Tap symbols & numbers to write math...",
  unitLabel,
  label,
  governingFormula,
  docked = false,
  cursorPos: externalCursorPos,
  onCursorChange,
}) => {
  const [internalCursor, setInternalCursor] = useState<number>((value || "").length);
  const [showRawSyntax, setShowRawSyntax] = useState(false);
  const [activeSubPad, setActiveSubPad] = useState<"math" | "constants">("math");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const cursor =
    typeof externalCursorPos === "number"
      ? Math.max(0, Math.min((value || "").length, externalCursorPos))
      : Math.max(0, Math.min((value || "").length, internalCursor));

  const setCursor = (nextPos: number) => {
    const clamped = Math.max(0, Math.min((value || "").length + 30, nextPos));
    setInternalCursor(clamped);
    onCursorChange?.(clamped);
  };

  useEffect(() => {
    if (cursor > (value || "").length) {
      setCursor((value || "").length);
    }
  }, [value]);

  const moveCursorLeft = () => {
    const stops = getLatexCursorStops(value || "");
    const prevStops = stops.filter((s) => s < cursor);
    const nextPos = prevStops.length > 0 ? prevStops[prevStops.length - 1] : 0;
    setCursor(nextPos);
  };

  const moveCursorRight = () => {
    const str = value || "";
    const stops = getLatexCursorStops(str);
    const nextStops = stops.filter((s) => s > cursor);
    const nextPos = nextStops.length > 0 ? nextStops[0] : str.length;
    setCursor(nextPos);
  };

  const insertToken = (token: string, cursorOffsetBack = 0) => {
    const current = value || "";
    const pos = Math.max(0, Math.min(current.length, cursor));
    const next = current.slice(0, pos) + token + current.slice(pos);
    const newCursor = Math.max(0, pos + token.length - cursorOffsetBack);
    onChange(next);
    setInternalCursor(newCursor);
    onCursorChange?.(newCursor);
  };

  const handleSmartBackspace = () => {
    const current = value || "";
    if (!current || cursor <= 0) return;

    const before = current.slice(0, cursor);
    const after = current.slice(cursor);

    // If cursor is inside an empty structural template like `\frac{|}{|}` or `^{|}`, remove the whole empty template
    const emptyTemplates: [RegExp, RegExp][] = [
      [/\\times\s*10\^\{$/, /^\}/],
      [/\\frac\{$/, /^\}\{\}/],
      [/\\sqrt\{$/, /^\}/],
      [/\^\{$/, /^\}/],
      [/_\{$/, /^\}/],
    ];
    for (const [bPat, aPat] of emptyTemplates) {
      if (bPat.test(before) && aPat.test(after)) {
        const newBefore = before.replace(bPat, "");
        const newAfter = after.replace(aPat, "");
        onChange(newBefore + newAfter);
        setCursor(newBefore.length);
        return;
      }
    }

    // Don't delete a structural `{` or `}` in isolation if it belongs to a non-empty group—step left instead
    if ((before.endsWith("{") || before.endsWith("}")) && after.startsWith("{")) {
      moveCursorLeft();
      return;
    }

    // Delete whole LaTeX command immediately before cursor
    const cmdPatterns = [
      /\\lambda_\{\\max\}\s*$/,
      /K_\{\\max\}\s*$/,
      /\\Delta\\lambda\s*$/,
      /\\text\{[^}]*\}\s*$/,
      /\\[a-zA-Z]+\s*$/,
    ];
    for (const pat of cmdPatterns) {
      if (pat.test(before)) {
        const newBefore = before.replace(pat, "");
        onChange(newBefore + after);
        setCursor(newBefore.length);
        return;
      }
    }

    const newBefore = before.slice(0, -1);
    onChange(newBefore + after);
    setCursor(newBefore.length);
  };

  const keypadBody = (
    <div
      className={
        docked
          ? "fixed bottom-0 inset-x-0 z-50 bg-slate-950/98 backdrop-blur-xl border-t border-cyan-500/40 shadow-[0_-12px_36px_rgba(0,0,0,0.75)] px-2 pt-1.5 pb-2.5 sm:px-4 select-none"
          : "rounded-xl bg-slate-950 border border-slate-800 p-2.5 sm:p-3 space-y-2 select-none"
      }
    >
      <div className="max-w-3xl mx-auto space-y-1.5">
        {/* Compact Top Control Bar: Label + Cursor (◄ ►) + Backspace + Next Line + Done */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-[11px] font-mono font-bold text-cyan-300 truncate max-w-[110px] sm:max-w-xs">
              {label || "Math Keypad"}
            </span>
            <button
              type="button"
              onClick={() => setActiveSubPad(activeSubPad === "math" ? "constants" : "math")}
              className={`px-2 py-1 rounded-md text-[11px] font-mono font-semibold transition-colors min-h-[32px] ${
                activeSubPad === "constants"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              {activeSubPad === "math" ? "Constants & Units" : "← Numbers"}
            </button>
            {governingFormula && (
              <button
                type="button"
                onClick={() => {
                  const clean = governingFormula.replace(/^\$+|\$+$/g, "").trim();
                  onChange(clean);
                  setCursor(clean.length);
                }}
                className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-950/80 border border-indigo-500/40 text-[11px] font-mono text-indigo-200 min-h-[32px]"
              >
                <Wand2 className="w-3 h-3 text-cyan-400" />
                <span>Formula</span>
              </button>
            )}
          </div>

          {/* Real Cursor Navigation + Delete + Next Step + Hide */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={moveCursorLeft}
              className="min-w-[38px] min-h-[34px] rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 flex items-center justify-center active:scale-95"
              title="Move cursor left inside equation"
              aria-label="Cursor Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={moveCursorRight}
              className="min-w-[38px] min-h-[34px] rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 flex items-center justify-center active:scale-95"
              title="Move cursor right / step out of exponent or fraction"
              aria-label="Cursor Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleSmartBackspace}
              className="min-w-[40px] min-h-[34px] rounded-lg bg-slate-900 hover:bg-rose-950/60 border border-slate-700 text-rose-400 flex items-center justify-center active:scale-95"
              title="Backspace at cursor"
              aria-label="Backspace"
            >
              <Delete className="w-4 h-4" />
            </button>
            {onNextLine && (
              <button
                type="button"
                onClick={onNextLine}
                className="px-2.5 min-h-[34px] rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 active:scale-95"
                title="Add or move to next step line"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Next</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowRawSyntax(!showRawSyntax)}
              className={`min-w-[34px] min-h-[34px] rounded-lg border flex items-center justify-center ${
                showRawSyntax
                  ? "bg-cyan-950 border-cyan-500/60 text-cyan-200"
                  : "bg-slate-900 border-slate-800 text-slate-400"
              }`}
              title="Toggle raw TeX text box"
            >
              <Code2 className="w-3.5 h-3.5" />
            </button>
            {onCloseDock && (
              <button
                type="button"
                onClick={onCloseDock}
                className="px-2 min-h-[34px] rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-0.5"
                title="Hide Keypad"
              >
                <ChevronDown className="w-4 h-4 text-cyan-400" />
              </button>
            )}
          </div>
        </div>

        {/* Optional Raw TeX Input (only if toggled) */}
        {showRawSyntax && (
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setCursor(e.target.selectionStart ?? e.target.value.length);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && onSubmit) onSubmit();
            }}
            placeholder="Raw LaTeX or scientific notation (e.g. 9.41e-6)..."
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
          />
        )}

        {/* Dedicated Physics Symbol Row (Horizontal scroll, touch-pan-x isolated) */}
        <div
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5 touch-pan-x"
        >
          {PHYSICS_SYMBOL_ROW.map((sym, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => insertToken(sym.token)}
              title={sym.title}
              className="min-w-[42px] h-[36px] px-2 rounded-lg bg-indigo-950/75 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-100 text-xs flex items-center justify-center shrink-0 active:scale-95 transition-transform"
            >
              <MathView math={sym.display} displayMode={false} />
            </button>
          ))}
        </div>

        {/* Compact 6-Column Keypad Grid */}
        {activeSubPad === "math" ? (
          <div className="grid grid-cols-6 gap-1">
            {/* Row 1: Templates + 7 8 9 + = */}
            <button
              type="button"
              onClick={() => insertToken(" \\times 10^{}", 1)}
              className="h-[40px] rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/50 text-xs text-white font-semibold flex items-center justify-center active:scale-95"
            >
              <MathView math="10^{\square}" displayMode={false} />
            </button>
            <button
              type="button"
              onClick={() => insertToken("\\frac{}{}", 3)}
              className="h-[40px] rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/50 text-xs text-white font-semibold flex items-center justify-center active:scale-95"
            >
              <MathView math="\frac{a}{b}" displayMode={false} />
            </button>
            {["7", "8", "9"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => insertToken(d)}
                className="h-[40px] rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sm font-mono font-bold text-white flex items-center justify-center active:scale-95"
              >
                {d}
              </button>
            ))}
            <button
              type="button"
              onClick={() => insertToken(" = ")}
              className="h-[40px] rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-mono font-bold text-cyan-300 flex items-center justify-center active:scale-95"
            >
              =
            </button>

            {/* Row 2: Sqrt + Power + 4 5 6 + Multiply */}
            <button
              type="button"
              onClick={() => insertToken("\\sqrt{}", 1)}
              className="h-[40px] rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/50 text-xs text-white font-semibold flex items-center justify-center active:scale-95"
            >
              <MathView math="\sqrt{x}" displayMode={false} />
            </button>
            <button
              type="button"
              onClick={() => insertToken("^{}", 1)}
              className="h-[40px] rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-200 font-semibold flex items-center justify-center active:scale-95"
            >
              <MathView math="x^{\square}" displayMode={false} />
            </button>
            {["4", "5", "6"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => insertToken(d)}
                className="h-[40px] rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sm font-mono font-bold text-white flex items-center justify-center active:scale-95"
              >
                {d}
              </button>
            ))}
            <button
              type="button"
              onClick={() => insertToken(" \\times ")}
              className="h-[40px] rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-200 flex items-center justify-center active:scale-95"
            >
              <MathView math="\times" displayMode={false} />
            </button>

            {/* Row 3: x^2 + ( ) + 1 2 3 + Minus */}
            <button
              type="button"
              onClick={() => insertToken("^{2}", 0)}
              className="h-[40px] rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-200 flex items-center justify-center active:scale-95"
            >
              <MathView math="x^2" displayMode={false} />
            </button>
            <button
              type="button"
              onClick={() => insertToken("()", 1)}
              className="h-[40px] rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center justify-center active:scale-95"
            >
              ( )
            </button>
            {["1", "2", "3"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => insertToken(d)}
                className="h-[40px] rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sm font-mono font-bold text-white flex items-center justify-center active:scale-95"
              >
                {d}
              </button>
            ))}
            <button
              type="button"
              onClick={() => insertToken("-")}
              className="h-[40px] rounded-lg bg-slate-800 hover:bg-slate-700 text-base font-mono font-bold text-cyan-300 flex items-center justify-center active:scale-95"
            >
              −
            </button>

            {/* Row 4: 10^-9 + 10^-34 + 0 + . + + + Clear */}
            <button
              type="button"
              onClick={() => insertToken(" \\times 10^{-9}")}
              className="h-[40px] rounded-lg bg-slate-800/90 hover:bg-slate-700 text-[11px] text-cyan-200 flex items-center justify-center active:scale-95"
            >
              <MathView math="10^{-9}" displayMode={false} />
            </button>
            <button
              type="button"
              onClick={() => insertToken(" \\times 10^{-34}")}
              className="h-[40px] rounded-lg bg-slate-800/90 hover:bg-slate-700 text-[11px] text-cyan-200 flex items-center justify-center active:scale-95"
            >
              <MathView math="10^{-34}" displayMode={false} />
            </button>
            <button
              type="button"
              onClick={() => insertToken("0")}
              className="h-[40px] rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sm font-mono font-bold text-white flex items-center justify-center active:scale-95"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => insertToken(".")}
              className="h-[40px] rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-base font-mono font-bold text-white flex items-center justify-center active:scale-95"
            >
              .
            </button>
            <button
              type="button"
              onClick={() => insertToken(" + ")}
              className="h-[40px] rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-mono font-bold text-cyan-300 flex items-center justify-center active:scale-95"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                onChange("");
                setCursor(0);
              }}
              className="h-[40px] rounded-lg bg-slate-900 hover:bg-rose-950 border border-slate-800 text-[11px] font-mono text-slate-400 hover:text-rose-200 flex items-center justify-center active:scale-95"
            >
              CLR
            </button>
          </div>
        ) : (
          /* Sub-Pad 2: Physical Constants & Clean Units */
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
            {[
              { label: "h (J·s)", math: "6.63\\times 10^{-34}", token: "6.63 \\times 10^{-34}" },
              { label: "ℏ (J·s)", math: "1.05\\times 10^{-34}", token: "1.05 \\times 10^{-34}" },
              { label: "c (m/s)", math: "3\\times 10^{8}", token: "3 \\times 10^{8}" },
              { label: "b (Wien)", math: "2.898\\times 10^{-3}", token: "2.898 \\times 10^{-3}" },
              { label: "σ (Stefan)", math: "5.67\\times 10^{-8}", token: "5.67 \\times 10^{-8}" },
              { label: "e (C)", math: "1.6\\times 10^{-19}", token: "1.6 \\times 10^{-19}" },
              { label: "m_e (kg)", math: "9.11\\times 10^{-31}", token: "9.11 \\times 10^{-31}" },
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
                className="h-[42px] px-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex flex-col items-center justify-center active:scale-95"
              >
                <span className="text-[9px] font-mono text-slate-400 leading-none">
                  {cBtn.label}
                </span>
                <span className="text-[11px] text-cyan-300 leading-tight mt-0.5">
                  <MathView math={cBtn.math} displayMode={false} />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (docked) {
    return typeof document !== "undefined" ? createPortal(keypadBody, document.body) : keypadBody;
  }

  // Standalone inline mode (with preview box)
  const previewWithCursor = renderLatexWithCursor(value, cursor, true);
  return (
    <div className="space-y-2">
      <div className="min-h-[48px] px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-between gap-2 overflow-x-auto">
        {value.trim() ? (
          <div className="text-base sm:text-lg text-white overflow-x-auto max-w-full">
            <MathView math={previewWithCursor} displayMode={false} />
          </div>
        ) : (
          <span className="text-xs text-slate-400 italic">{placeholder}</span>
        )}
        {unitLabel && (
          <span className="text-xs font-mono text-cyan-400 shrink-0">[{unitLabel}]</span>
        )}
      </div>
      {keypadBody}
    </div>
  );
};
