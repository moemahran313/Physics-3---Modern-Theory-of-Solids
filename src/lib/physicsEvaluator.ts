import { ChapterExamQuestion, ChapterExamEvaluation } from "../types";

/**
 * Universal tolerant Physics & Engineering Answer Evaluator.
 * Parses raw text input (including scientific notation, exponents, fractions, and units),
 * performs dimensional and numerical checks against analytical targets, and generates
 * diagnostic marking feedback with Modern Academy exam tips.
 */

/**
 * Converts casual or computer-style math (e.g., 9.41e-6, 9.41*10^-6, sqrt(x))
 * into clean, readable LaTeX so users never see ugly raw syntax.
 */
export function formatToCleanLatex(raw: string): string {
  if (!raw || typeof raw !== "string") return "";
  let s = raw.trim();

  // Convert 9.41e-6 or 9.41E+8 -> 9.41 \times 10^{-6}
  s = s.replace(/(\d+(?:\.\d+)?)[eE]([+-]?\d+)/g, "$1 \\times 10^{$2}");

  // Convert * 10^-6 or x 10^-6 -> \times 10^{-6}
  s = s.replace(/(?:[\*x×])\s*10\s*\^\s*\(?([+-]?\d+)\)?/g, " \\times 10^{$1}");

  // Convert bare 10^-6 (without braces) -> 10^{-6}
  s = s.replace(/10\s*\^\s*([+-]?\d+)(?!\})/g, "10^{$1}");

  // Convert remaining * to \times
  s = s.replace(/\s*\*\s*/g, " \\times ");

  // Convert sqrt(...) -> \sqrt{...}
  s = s.replace(/sqrt\(([^)]+)\)/gi, "\\sqrt{$1}");

  return s;
}

export function parseScientificInput(raw: string): number | null {
  if (!raw || typeof raw !== "string") return null;

  let cleaned = raw.trim();

  // If the user wrote an equation like "\lambda = 9.41 \times 10^{-6}", evaluate the right-hand side
  if (cleaned.includes("=")) {
    const parts = cleaned.split("=");
    cleaned = parts[parts.length - 1].trim();
  }

  // Strip LaTeX \text{...}, \mathrm{...}, \boxed{...}, and $ delimiters
  cleaned = cleaned.replace(/\\(?:text|mathrm)\{[^}]*\}/g, "");
  cleaned = cleaned.replace(/\\boxed\{([^}]*)\}/g, "$1");
  cleaned = cleaned.replace(/\$/g, "").trim();

  // Strip common trailing unit symbols and words (e.g., "W", "watts", "eV", "J", "nm", "m", "K", "m/s", "Å", "pm", "Hz", "V")
  cleaned = cleaned
    .replace(
      /\s*(?:[Ww]atts?|[Jj]oules?|[eE][Vv]|[kK][eE][Vv]|[mM][eE][Vv]|(?:\\mu|μ|u|n|p|k|M|G)?(?:m|s|g|Hz|V|K|W|J|A)|\\AA|Å|angstroms?|volts?|meters?|seconds?|degrees?|%)\s*$/i,
      ""
    )
    .trim();

  // Handle LaTeX fractions: \frac{num}{den}
  const latexFracRegex = /^\\frac\{([^{}]+)\}\{([^{}]+)\}$/;
  const latexFracMatch = cleaned.match(latexFracRegex);
  if (latexFracMatch) {
    const num = parseScientificInput(latexFracMatch[1]);
    const den = parseScientificInput(latexFracMatch[2]);
    if (num !== null && den !== null && den !== 0) {
      return num / den;
    }
  }

  // Handle LaTeX square root: \sqrt{val}
  const latexSqrtRegex = /^\\sqrt\{([^{}]+)\}$/;
  const latexSqrtMatch = cleaned.match(latexSqrtRegex);
  if (latexSqrtMatch) {
    const inner = parseScientificInput(latexSqrtMatch[1]);
    if (inner !== null && inner >= 0) {
      return Math.sqrt(inner);
    }
  }

  // Normalize LaTeX \times or \cdot and curly braces around exponents
  // e.g. "9.41 \times 10^{-6}" -> "9.41 * 10^-6"
  const normalizedSci = cleaned
    .replace(/\\(?:times|cdot)/g, "*")
    .replace(/\^\{([+-]?\d+(?:\.\d+)?)\}/g, "^$1")
    .replace(/[{}]/g, "")
    .trim();

  // 1) "1.54 * 10^-6" or "1.54x10^-6" or "1.54 × 10^-6" or "1.54*10^(-6)"
  const sciExpRegex = /^([+-]?\d+(?:\.\d+)?)\s*(?:[\*x×])\s*10\s*\^?\s*\(?([+-]?\d+(?:\.\d+)?)\)?$/i;
  const sciMatch = normalizedSci.match(sciExpRegex);
  if (sciMatch) {
    const coeff = parseFloat(sciMatch[1]);
    const exponent = parseFloat(sciMatch[2]);
    if (!isNaN(coeff) && !isNaN(exponent)) {
      return coeff * Math.pow(10, exponent);
    }
  }

  // 2) "10^5" or "10^-9" or "10^{-6}"
  const pureTenPowerRegex = /^10\s*\^?\s*\(?([+-]?\d+(?:\.\d+)?)\)?$/i;
  const tenMatch = normalizedSci.match(pureTenPowerRegex);
  if (tenMatch) {
    const exp = parseFloat(tenMatch[1]);
    if (!isNaN(exp)) {
      return Math.pow(10, exp);
    }
  }

  // 3) Fractions "a / b"
  const fractionRegex = /^([+-]?\d+(?:\.\d+)?)\s*\/\s*([+-]?\d+(?:\.\d+)?)$/;
  const fracMatch = normalizedSci.match(fractionRegex);
  if (fracMatch) {
    const num = parseFloat(fracMatch[1]);
    const den = parseFloat(fracMatch[2]);
    if (!isNaN(num) && !isNaN(den) && den !== 0) {
      return num / den;
    }
  }

  // 4) Standard JS float / standard scientific (e.g. "1.54e-6", "-0.245", "5700")
  const standardVal = parseFloat(normalizedSci);
  if (!isNaN(standardVal) && isFinite(standardVal)) {
    return standardVal;
  }

  return null;
}

export function evaluateStudentAnswer(
  input: string,
  question: ChapterExamQuestion
): ChapterExamEvaluation {
  const parsed = parseScientificInput(input);

  if (parsed === null) {
    return {
      status: "incorrect",
      scorePercent: 0,
      feedback: "Invalid numerical format. Please enter a standard number or scientific notation (e.g., 9.41e-6 or 9.41 * 10^-6).",
      inputParsed: null,
      expectedValue: question.expectedValue,
      differencePercent: null,
      diagnosticTip: "Make sure you don't enter unparsed formulas or invalid symbols.",
    };
  }

  const expected = question.expectedValue;
  const tolerance = question.tolerance || 0.025; // default 2.5%

  // Check direct tolerance
  const diff = Math.abs(parsed - expected);
  const relDiff = expected !== 0 ? diff / Math.abs(expected) : diff;
  const relDiffPercent = relDiff * 100;

  // Check if student matched an alternate unit (e.g. answered in SI meters instead of nm)
  if (question.alternateUnits && question.alternateUnits.length > 0) {
    for (const alt of question.alternateUnits) {
      const altExpected = expected * alt.multiplier;
      const altDiff = Math.abs(parsed - altExpected);
      const altRel = altExpected !== 0 ? altDiff / Math.abs(altExpected) : altDiff;
      if (altRel <= tolerance) {
        return {
          status: "correct",
          scorePercent: 100,
          feedback: `Correct! You answered ${parsed} in [${alt.unit}], which converts exactly to ${expected} [${question.units}]. Full credit awarded.`,
          inputParsed: parsed,
          expectedValue: expected,
          differencePercent: altRel * 100,
          diagnosticTip: `Target unit was [${question.units}], but your physical derivation in [${alt.unit}] is dimensionally accurate.`,
        };
      }
    }
  }

  // 1. Full Credit within tolerance (e.g., ±2.5%)
  if (relDiff <= tolerance) {
    return {
      status: "correct",
      scorePercent: 100,
      feedback: `Spot on! Full marks (100%). Your answer matches the analytical value (${expected} ${question.units}) with an error of only ${relDiffPercent.toFixed(2)}%.`,
      inputParsed: parsed,
      expectedValue: expected,
      differencePercent: relDiffPercent,
    };
  }

  // 2. Near Miss / Slight Rounding Discrepancy (within 5%)
  if (relDiff <= 0.05) {
    return {
      status: "near-miss",
      scorePercent: 85,
      feedback: `Very close! Acceptable rounding margin (${relDiffPercent.toFixed(2)}% difference). You scored 85% credit. Expected: ${expected} ${question.units}.`,
      inputParsed: parsed,
      expectedValue: expected,
      differencePercent: relDiffPercent,
      diagnosticTip: "Minor discrepancy observed. Check whether you rounded physical constants early (e.g., using h = 6.63 vs 6.626 × 10^-34, or c = 3.0 × 10^8 vs 2.998 × 10^8).",
    };
  }

  // 3. Diagnostic checks for common student pitfalls:
  let diagnosticTip = "Review the official solution steps and formula.";

  // A. Check order of magnitude error (factor of 1000)
  const ratio = parsed / expected;
  if (Math.abs(ratio - 1000) < 50 || Math.abs(ratio - 0.001) < 0.00005) {
    diagnosticTip = "Order of magnitude slip! Your answer is off by a factor of 10³ (1,000). Check milli-, kilo-, or unit prefix conversions.";
  } else if (Math.abs(ratio - 1e-9) < 1e-10 || Math.abs(ratio - 1e9) < 1e8) {
    diagnosticTip = "Nanometer conversion alert! Your answer is off by 10⁹. Did you forget to convert between meters (m) and nanometers (nm)?";
  } else if (Math.abs(ratio - 1e-10) < 1e-11 || Math.abs(ratio - 1e10) < 1e9) {
    diagnosticTip = "Angstrom conversion alert! Your answer is off by 10¹⁰. Remember that 1 Å = 10^-10 m = 0.1 nm.";
  } else if (Math.abs(ratio - 1.602e-19) < 1e-20 || Math.abs(ratio - 6.242e18) < 1e17) {
    diagnosticTip = "Electron-volt vs Joules alert! You seem to have mixed up eV and Joules. (1 eV = 1.602 × 10^-19 J).";
  } else if (Math.abs(parsed - (expected - 273.15)) < 5 || Math.abs(parsed - (expected + 273.15)) < 5) {
    diagnosticTip = "Temperature scale trap! You seem to have confused Celsius (°C) and Kelvin (K). In thermodynamic formulas, T must strictly be in Kelvin (T_K = T_C + 273).";
  } else if (Math.abs(parsed + expected) / Math.abs(expected) <= 0.05) {
    diagnosticTip = "Sign error! Your magnitude is correct, but the sign is inverted.";
  } else if (Math.abs(1 / parsed - expected) / Math.abs(expected) <= 0.05) {
    diagnosticTip = "Inversion error! You computed the reciprocal (1 / x) of the required quantity.";
  }

  return {
    status: "incorrect",
    scorePercent: 0,
    feedback: `Incorrect. Your answer (${parsed}) differs from the official value (${expected} ${question.units}) by ${relDiffPercent.toFixed(1)}%.`,
    inputParsed: parsed,
    expectedValue: expected,
    differencePercent: relDiffPercent,
    diagnosticTip,
  };
}
