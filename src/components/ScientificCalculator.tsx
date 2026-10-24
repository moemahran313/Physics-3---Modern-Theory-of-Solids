import React, { useState, useEffect } from "react";
import { MathView } from "./MathView";
import { 
  Calculator, 
  X, 
  RotateCcw, 
  Delete, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Copy, 
  Check, 
  Minimize2, 
  Maximize2,
  ArrowRightLeft,
  BookOpen
} from "lucide-react";

interface ScientificCalculatorProps {
  isOpen?: boolean;
  onClose?: () => void;
  floating?: boolean;
  initialExpression?: string;
}

// Key physical constants for Physics 3 (Modern Academy)
export const QUANTUM_CONSTANTS = [
  { symbol: "h", label: "Planck's Const (h)", value: "6.63e-34", unit: "J·s", latex: "6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}" },
  { symbol: "ħ", label: "Reduced Planck (ħ)", value: "1.05e-34", unit: "J·s", latex: "1.05 \\times 10^{-34}\\text{ J}\\cdot\\text{s}" },
  { symbol: "c", label: "Speed of Light (c)", value: "3e8", unit: "m/s", latex: "3 \\times 10^8\\text{ m/s}" },
  { symbol: "e", label: "Elem. Charge (e)", value: "1.6e-19", unit: "C", latex: "1.6 \\times 10^{-19}\\text{ C}" },
  { symbol: "m_e", label: "Electron Mass (m_e)", value: "9.11e-31", unit: "kg", latex: "9.11 \\times 10^{-31}\\text{ kg}" },
  { symbol: "σ", label: "Stefan-Boltzmann (σ)", value: "5.67e-8", unit: "W/m²K⁴", latex: "5.67 \\times 10^{-8}\\text{ W/m}^2\\text{K}^4" },
  { symbol: "k_B", label: "Boltzmann Const (k_B)", value: "1.38e-23", unit: "J/K", latex: "1.38 \\times 10^{-23}\\text{ J/K}" },
  { symbol: "λ_c", label: "Compton Wavelength (λ_c)", value: "2.426e-12", unit: "m", latex: "2.426\\text{ pm} = 0.02426\\text{ \\AA}" },
  { symbol: "R_H", label: "Rydberg Constant (R_H)", value: "1.097e7", unit: "m⁻¹", latex: "1.097 \\times 10^7\\text{ m}^{-1}" },
  { symbol: "Wien", label: "Wien's Constant (b)", value: "2.898e-3", unit: "m·K", latex: "2.898 \\times 10^{-3}\\text{ m}\\cdot\\text{K}" },
];

export const FORMULA_SHORTCUTS = [
  {
    name: "Photon E = hc/λ",
    template: "(6.63e-34 * 3e8) / (",
    latex: "E = \\frac{hc}{\\lambda} = \\frac{1240\\text{ eV}\\cdot\\text{nm}}{\\lambda}",
  },
  {
    name: "Compton Δλ = λ_c(1-cos θ)",
    template: "2.426e-12 * (1 - cos(",
    latex: "\\Delta\\lambda = \\lambda_c(1 - \\cos\\theta)",
  },
  {
    name: "de Broglie λ = h/√(2mqV)",
    template: "6.63e-34 / sqrt(2 * 9.11e-31 * 1.6e-19 * ",
    latex: "\\lambda = \\frac{h}{\\sqrt{2mqV}} = \\sqrt{\\frac{1.5}{V}}\\text{ nm}",
  },
  {
    name: "Infinite Well E_n = n²h²/(8mL²)",
    template: "( (1)^2 * (6.63e-34)^2 ) / (8 * 9.11e-31 * (",
    latex: "E_n = \\frac{n^2 h^2}{8mL^2}",
  },
  {
    name: "Lorentz Factor γ = 1/√(1-v²/c²)",
    template: "1 / sqrt(1 - ( (",
    latex: "\\gamma = \\frac{1}{\\sqrt{1 - (v/c)^2}}",
  },
  {
    name: "Tunneling Penetration depth δ",
    template: "1.05e-34 / sqrt(2 * 9.11e-31 * (",
    latex: "\\delta = \\frac{\\hbar}{\\sqrt{2m(U_0 - E)}}",
  }
];

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({
  isOpen = true,
  onClose,
  floating = false,
  initialExpression = "",
}) => {
  const [expr, setExpr] = useState<string>(initialExpression);
  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<Array<{ expr: string; res: string }>>([]);
  const [angleMode, setAngleMode] = useState<"deg" | "rad">("deg");
  const [showConstants, setShowConstants] = useState<boolean>(true);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [showConverter, setShowConverter] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Converter state
  const [convType, setConvType] = useState<"ev_j" | "wavelength" | "speed" | "temp">("ev_j");
  const [convInput, setConvInput] = useState<string>("1");
  const [convResult, setConvResult] = useState<{ val1: string; unit1: string; val2: string; unit2: string }>({
    val1: "1", unit1: "eV", val2: "1.602 × 10⁻¹⁹", unit2: "J"
  });

  useEffect(() => {
    if (initialExpression) {
      setExpr(initialExpression);
    }
  }, [initialExpression]);

  // Handle Converter calculations
  useEffect(() => {
    const num = parseFloat(convInput);
    if (isNaN(num)) {
      setConvResult({ val1: convInput, unit1: "-", val2: "-", unit2: "-" });
      return;
    }

    if (convType === "ev_j") {
      const joules = num * 1.602176634e-19;
      setConvResult({
        val1: `${num} eV`,
        unit1: "eV",
        val2: joules.toExponential(4) + " J",
        unit2: "Joules (J)",
      });
    } else if (convType === "wavelength") {
      // Input in nm -> Angstroms & pm & frequency & photon energy in eV
      const inMeters = num * 1e-9;
      const angstroms = num * 10;
      const pm = num * 1000;
      const ev = (1239.84193 / num).toFixed(3);
      setConvResult({
        val1: `${num} nm`,
        unit1: "nm",
        val2: `${angstroms} Å = ${pm} pm | E_ph = ${ev} eV`,
        unit2: "Wavelength equivalents",
      });
    } else if (convType === "speed") {
      // Fraction of c -> m/s and gamma
      const v = num * 3e8;
      const beta = num;
      const gamma = beta < 1 ? (1 / Math.sqrt(1 - beta * beta)).toFixed(4) : "∞ (v ≥ c)";
      setConvResult({
        val1: `${num} c`,
        unit1: "c (fraction)",
        val2: `${v.toExponential(3)} m/s (γ = ${gamma})`,
        unit2: "Relativistic factor",
      });
    } else if (convType === "temp") {
      // Celsius -> Kelvin & Wien peak
      const kelvin = num + 273.15;
      const wienNm = (2.898e-3 / kelvin * 1e9).toFixed(1);
      setConvResult({
        val1: `${num} °C`,
        unit1: "°C",
        val2: `${kelvin.toFixed(2)} K (λ_max = ${wienNm} nm)`,
        unit2: "Wien peak",
      });
    }
  }, [convType, convInput]);

  // Safe evaluation parser
  const evaluate = (expressionToEval?: string) => {
    const target = expressionToEval !== undefined ? expressionToEval : expr;
    if (!target.trim()) return;

    try {
      // Transform custom syntax to standard JS math
      let sanitized = target
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, "Math.PI")
        .replace(/e\^/g, "Math.exp")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/cbrt\(/g, "Math.cbrt(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/\^/g, "**");

      // Replace trig with degree/rad conversion if in degree mode
      if (angleMode === "deg") {
        sanitized = sanitized
          .replace(/sin\(([^)]+)\)/g, "Math.sin(($1) * Math.PI / 180)")
          .replace(/cos\(([^)]+)\)/g, "Math.cos(($1) * Math.PI / 180)")
          .replace(/tan\(([^)]+)\)/g, "Math.tan(($1) * Math.PI / 180)")
          .replace(/asin\(([^)]+)\)/g, "(Math.asin($1) * 180 / Math.PI)")
          .replace(/acos\(([^)]+)\)/g, "(Math.acos($1) * 180 / Math.PI)")
          .replace(/atan\(([^)]+)\)/g, "(Math.atan($1) * 180 / Math.PI)");
      } else {
        sanitized = sanitized
          .replace(/sin\(/g, "Math.sin(")
          .replace(/cos\(/g, "Math.cos(")
          .replace(/tan\(/g, "Math.tan(")
          .replace(/asin\(/g, "Math.asin(")
          .replace(/acos\(/g, "Math.acos(")
          .replace(/atan\(/g, "Math.atan(");
      }

      // eslint-disable-next-line no-new-func
      const evalFn = new Function(`return (${sanitized});`);
      const resVal = evalFn();

      if (typeof resVal === "number" && !isNaN(resVal)) {
        // Format nicely
        let formattedRes = "";
        if (Math.abs(resVal) >= 1e6 || (Math.abs(resVal) < 1e-3 && resVal !== 0)) {
          formattedRes = resVal.toExponential(6);
        } else {
          formattedRes = parseFloat(resVal.toFixed(8)).toString();
        }

        setResult(formattedRes);
        setHistory((prev) => [{ expr: target, res: formattedRes }, ...prev.slice(0, 7)]);
      } else {
        setResult("Error");
      }
    } catch {
      setResult("Syntax Error");
    }
  };

  const insertText = (text: string) => {
    setExpr((prev) => prev + text);
  };

  const clearAll = () => {
    setExpr("");
    setResult("");
  };

  const backspace = () => {
    setExpr((prev) => prev.slice(0, -1));
  };

  const copyResult = () => {
    if (result && result !== "Error" && result !== "Syntax Error") {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const formattedLatexExpr = expr
    ? expr
        .replace(/\*/g, " \\times ")
        .replace(/\//g, " \\div ")
        .replace(/sqrt\(([^)]+)\)/g, "\\sqrt{$1}")
        .replace(/pi/g, "\\pi")
    : "0";

  if (!isOpen) return null;

  return (
    <div
      className={`${
        floating
          ? "fixed bottom-4 right-4 z-50 w-[95vw] max-w-md shadow-2xl rounded-2xl border border-cyan-500/40 bg-slate-950/95 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5"
          : "w-full rounded-2xl border border-slate-800 bg-slate-950/90 shadow-xl overflow-hidden"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800 text-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs flex items-center gap-1.5 font-mono">
              <span>PHYSICS 3 SCIENTIFIC CALCULATOR</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-800">
                PRO
              </span>
            </div>
            <div className="text-[10px] text-slate-400">Quantum Constants &bull; LaTeX Display &bull; Unit Inverters</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {floating && (
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Close Calculator"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {!isMinimized && (
        <div className="p-3 space-y-3">
          {/* Display screen */}
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3 shadow-inner space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAngleMode(angleMode === "deg" ? "rad" : "deg")}
                  className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[10px] font-bold border border-slate-700"
                >
                  {angleMode.toUpperCase()}
                </button>
                <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                  {expr || "Ready"}
                </span>
              </div>

              {result && (
                <button
                  onClick={copyResult}
                  className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-cyan-300"
                  title="Copy result"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              )}
            </div>

            {/* Formatted LaTeX Expression */}
            <div className="overflow-x-auto scrollbar-none py-1 min-h-[28px] text-slate-300">
              <MathView math={formattedLatexExpr} className="text-sm font-mono" />
            </div>

            {/* Evaluated Value Output */}
            <div className="text-right font-mono text-xl sm:text-2xl font-bold text-cyan-300 tracking-wider overflow-x-auto scrollbar-none pt-1 border-t border-slate-800/80">
              {result ? `= ${result}` : "—"}
            </div>
          </div>

          {/* Quick Tab Selectors */}
          <div className="grid grid-cols-3 gap-1 p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono">
            <button
              onClick={() => { setShowConstants(true); setShowShortcuts(false); setShowConverter(false); }}
              className={`py-1 rounded font-semibold transition-all ${
                showConstants && !showShortcuts && !showConverter
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Constants
            </button>
            <button
              onClick={() => { setShowShortcuts(true); setShowConstants(false); setShowConverter(false); }}
              className={`py-1 rounded font-semibold transition-all ${
                showShortcuts
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Formulas
            </button>
            <button
              onClick={() => { setShowConverter(true); setShowConstants(false); setShowShortcuts(false); }}
              className={`py-1 rounded font-semibold transition-all ${
                showConverter
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Unit Inverter
            </button>
          </div>

          {/* 1. Constants Strip */}
          {showConstants && (
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1.5">
              <div className="text-[10px] font-mono font-bold text-slate-400 flex items-center justify-between">
                <span>TAP CONSTANT TO INSERT VALUE:</span>
                <span className="text-cyan-400 font-normal">Modern Academy Constants</span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {QUANTUM_CONSTANTS.map((c) => (
                  <button
                    key={c.symbol}
                    onClick={() => insertText(c.value)}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500/50 flex flex-col items-center justify-center transition-all group"
                    title={`${c.label} = ${c.value} ${c.unit}`}
                  >
                    <span className="font-mono text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                      {c.symbol}
                    </span>
                    <span className="text-[8px] text-slate-400 group-hover:text-slate-300 font-mono truncate max-w-full">
                      {c.unit}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Formula Shortcuts */}
          {showShortcuts && (
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1.5 max-h-40 overflow-y-auto">
              <div className="text-[10px] font-mono font-bold text-slate-400">
                CLICK TO LOAD SOLVER TEMPLATE:
              </div>
              <div className="space-y-1">
                {FORMULA_SHORTCUTS.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => setExpr(f.template)}
                    className="w-full text-left p-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500/50 flex items-center justify-between text-xs transition-all"
                  >
                    <span className="font-mono font-semibold text-purple-300">{f.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Insert &rarr;</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Fast Unit Converter & Inverter */}
          {showConverter && (
            <div className="p-2.5 rounded-lg bg-slate-900/70 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-400 flex items-center gap-1">
                  <ArrowRightLeft className="w-3 h-3" />
                  FAST QUANTUM INVERTER
                </span>
                <select
                  value={convType}
                  onChange={(e) => setConvType(e.target.value as any)}
                  className="bg-slate-800 text-slate-200 border border-slate-700 rounded text-[10px] font-mono px-1.5 py-0.5"
                >
                  <option value="ev_j">eV &harr; Joules</option>
                  <option value="wavelength">nm &harr; Å &harr; pm &harr; E(eV)</option>
                  <option value="speed">v/c &harr; Speed &harr; γ</option>
                  <option value="temp">°C &harr; Kelvin &harr; Wien λ_max</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-slate-400 font-mono block mb-0.5">Input Value:</label>
                  <input
                    type="number"
                    value={convInput}
                    onChange={(e) => setConvInput(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-slate-100"
                    placeholder="Enter value"
                  />
                </div>
                <div className="p-1.5 rounded bg-slate-950 border border-slate-800 flex flex-col justify-center">
                  <div className="text-[9px] text-amber-400/80 font-mono">{convResult.unit2}</div>
                  <div className="font-mono text-xs font-bold text-amber-300 truncate">
                    {convResult.val2}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Scientific Keypad Grid */}
          <div className="grid grid-cols-5 gap-1 font-mono text-xs">
            {/* Row 1 */}
            <button onClick={() => insertText("sin(")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">sin</button>
            <button onClick={() => insertText("cos(")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">cos</button>
            <button onClick={() => insertText("tan(")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">tan</button>
            <button onClick={() => insertText("sqrt(")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700">&radic;</button>
            <button onClick={clearAll} className="p-2 rounded bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 font-bold">AC</button>

            {/* Row 2 */}
            <button onClick={() => insertText("asin(")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">sin⁻¹</button>
            <button onClick={() => insertText("acos(")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">cos⁻¹</button>
            <button onClick={() => insertText("ln(")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">ln</button>
            <button onClick={() => insertText("log(")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">log</button>
            <button onClick={backspace} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 flex items-center justify-center">
              <Delete className="w-4 h-4" />
            </button>

            {/* Row 3 */}
            <button onClick={() => insertText("^2")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">x²</button>
            <button onClick={() => insertText("^")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">xʸ</button>
            <button onClick={() => insertText("(")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">(</button>
            <button onClick={() => insertText(")")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">)</button>
            <button onClick={() => insertText("/")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold">&divide;</button>

            {/* Row 4 */}
            <button onClick={() => insertText("7")} className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-800">7</button>
            <button onClick={() => insertText("8")} className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-800">8</button>
            <button onClick={() => insertText("9")} className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-800">9</button>
            <button onClick={() => insertText("e^(")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">eˣ</button>
            <button onClick={() => insertText("*")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold">&times;</button>

            {/* Row 5 */}
            <button onClick={() => insertText("4")} className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-800">4</button>
            <button onClick={() => insertText("5")} className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-800">5</button>
            <button onClick={() => insertText("6")} className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-800">6</button>
            <button onClick={() => insertText("π")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">&pi;</button>
            <button onClick={() => insertText("-")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold">-</button>

            {/* Row 6 */}
            <button onClick={() => insertText("1")} className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-800">1</button>
            <button onClick={() => insertText("2")} className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-800">2</button>
            <button onClick={() => insertText("3")} className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-800">3</button>
            <button onClick={() => insertText("e")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">e</button>
            <button onClick={() => insertText("+")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold">+</button>

            {/* Row 7 */}
            <button onClick={() => insertText("0")} className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-800">0</button>
            <button onClick={() => insertText(".")} className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-800">.</button>
            <button onClick={() => insertText("e-")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 font-bold">&times;10⁻</button>
            <button onClick={() => insertText("e+")} className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 font-bold">&times;10⁺</button>
            <button 
              onClick={() => evaluate()} 
              className="p-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold border border-cyan-400 shadow-md flex items-center justify-center font-mono text-sm"
            >
              =
            </button>
          </div>

          {/* History snippet */}
          {history.length > 0 && (
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                <span>RECENT CALCULATIONS:</span>
                <button onClick={() => setHistory([])} className="hover:text-slate-300">Clear</button>
              </div>
              <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
                {history.slice(0, 4).map((h, i) => (
                  <button
                    key={i}
                    onClick={() => { setExpr(h.expr); setResult(h.res); }}
                    className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-mono text-slate-300 whitespace-nowrap transition-colors"
                  >
                    {h.res}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
