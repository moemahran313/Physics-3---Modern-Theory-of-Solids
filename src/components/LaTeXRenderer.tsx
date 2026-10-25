import React, { useMemo } from "react";
import katex from "katex";

export interface LaTeXRendererProps {
  math?: string;
  block?: boolean;
  displayMode?: boolean;
  className?: string;
  inline?: boolean;
  ariaLabel?: string;
}

/**
 * Universal LaTeXRenderer component wrapping KaTeX with high-precision baseline alignment,
 * zero layout shifts, graceful syntax error recovery, and consistent spacing across all devices.
 */
export const LaTeXRenderer: React.FC<LaTeXRendererProps> = ({
  math = "",
  block = false,
  displayMode = false,
  className = "",
  inline = false,
  ariaLabel,
}) => {
  const isBlock = (block || displayMode) && !inline;

  const html = useMemo(() => {
    if (!math) return "";
    try {
      let cleanMath = math.trim();
      
      // Strip starting/ending delimiters ($$, $, \[, \], \(, \)) if present
      if (cleanMath.startsWith("$$") && cleanMath.endsWith("$$") && cleanMath.length >= 4) {
        cleanMath = cleanMath.slice(2, -2).trim();
      } else if (cleanMath.startsWith("$") && cleanMath.endsWith("$") && cleanMath.length >= 2) {
        cleanMath = cleanMath.slice(1, -1).trim();
      } else if (cleanMath.startsWith("\\[") && cleanMath.endsWith("\\]") && cleanMath.length >= 4) {
        cleanMath = cleanMath.slice(2, -2).trim();
      } else if (cleanMath.startsWith("\\(") && cleanMath.endsWith("\\)") && cleanMath.length >= 4) {
        cleanMath = cleanMath.slice(2, -2).trim();
      }

      return katex.renderToString(cleanMath, {
        displayMode: isBlock,
        throwOnError: false,
        output: "html",
        strict: false,
        trust: true,
        minRuleThickness: 0.05,
      });
    } catch {
      // Graceful fallback without breaking layout
      return `<span class="katex-fallback font-mono text-indigo-300">${escapeHtml(math)}</span>`;
    }
  }, [math, isBlock]);

  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!math) return;
    navigator.clipboard.writeText(math);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isBlock) {
    return (
      <div className={`latex-display-container relative group my-1.5 py-1.5 px-0 sm:px-2 overflow-x-auto text-slate-100 font-mono tracking-wide leading-relaxed scrollbar-none select-text ${className}`}>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity absolute right-1 top-1 px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[10px] text-slate-400 hover:text-cyan-300 font-mono flex items-center gap-1 shadow"
          title="Copy LaTeX source"
          aria-label="Copy LaTeX"
        >
          {copied ? "✓ Copied" : "Copy TeX"}
        </button>
        <div
          aria-label={ariaLabel || math}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  }

  return (
    <span
      className={`latex-inline-container inline-flex items-baseline px-0.5 text-indigo-200 font-mono align-baseline select-text ${className}`}
      aria-label={ariaLabel || math}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Helper function to safely auto-wrap bare LaTeX expressions without swallowing English text
export function normalizeMathText(text: string): string {
  if (!text) return "";
  
  // If text already has $, trust explicit delimiters
  if (text.includes("$")) {
    return text;
  }

  // If text does NOT have $, process line-by-line:
  const lines = text.split("\n");
  const processed = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return line;

    // Check if the whole line is a math equation (starts with \ or contains formula with =)
    if (/^\\[a-zA-Z]+/.test(trimmed) && !/\b(the|is|in|of|and|for|with|from)\b/i.test(trimmed)) {
      return `$$${trimmed}$$`;
    }

    // Wrap single LaTeX commands with their arguments/subscripts, e.g. \lambda_{\text{max}}, \frac{a}{b}, \hbar
    return line.replace(/(\\[a-zA-Z]+(?:\{[^{}]*\}|_[a-zA-Z0-9{}_^]+|\^[a-zA-Z0-9{}_^]+)*)/g, (match) => {
      return `$${match}$`;
    });
  });

  return processed.join("\n");
}

/**
 * Parses mixed text containing inline $...$ and block $$...$$ math with rich pedagogical typography
 */
export const FormattedContent: React.FC<{ content: string; className?: string }> = ({
  content,
  className = "",
}) => {
  const renderedBlocks = useMemo(() => {
    if (!content) return null;

    const normalized = normalizeMathText(content);
    const lines = normalized.split("\n");

    return lines.map((line, lineIdx) => {
      const trimmed = line.trim();

      // Check if line is header ###
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={lineIdx} className="text-sm sm:text-base font-bold text-amber-300 mt-3 mb-1.5 flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-amber-400 rounded-sm inline-block shrink-0"></span>
            <span className="leading-snug">{renderInlineMathText(trimmed.replace("### ", ""))}</span>
          </h4>
        );
      }
      // Check if line is header ####
      if (trimmed.startsWith("#### ")) {
        return (
          <h5 key={lineIdx} className="text-xs sm:text-sm font-semibold text-sky-300 mt-2 mb-1 flex items-center gap-2">
            <span className="w-1 h-3 bg-sky-400 rounded-sm inline-block shrink-0"></span>
            <span className="leading-snug">{renderInlineMathText(trimmed.replace("#### ", ""))}</span>
          </h5>
        );
      }
      // Check if line is header ##
      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={lineIdx} className="text-base sm:text-lg font-bold text-indigo-300 mt-3.5 mb-2 border-b border-slate-700/60 pb-1">
            {renderInlineMathText(trimmed.replace("## ", ""))}
          </h3>
        );
      }

      // Check if line is block math $$ ... $$
      if (trimmed.startsWith("$$") && trimmed.endsWith("$$") && trimmed.length > 4) {
        return (
          <div key={lineIdx} className="my-1.5 overflow-x-auto max-w-full">
            <LaTeXRenderer math={trimmed} block={true} />
          </div>
        );
      }

      // Bullet points
      if (trimmed.startsWith("• ") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const bulletText = trimmed.replace(/^[•\-*]\s+/, "");
        return (
          <div key={lineIdx} className="flex items-baseline gap-2 text-slate-300 leading-relaxed my-1 pl-1 sm:pl-2 text-xs sm:text-sm">
            <span className="text-indigo-400 font-bold text-xs select-none">•</span>
            <div className="flex-1 min-w-0">
              {renderInlineMathText(bulletText)}
            </div>
          </div>
        );
      }

      // Numbered lists
      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        return (
          <div key={lineIdx} className="flex items-baseline gap-2.5 my-1.5 ml-1 sm:ml-2 text-slate-300 text-xs sm:text-sm">
            <span className="flex-shrink-0 w-5 h-5 rounded-md bg-indigo-900/40 border border-indigo-700/50 text-[11px] font-mono font-bold text-indigo-300 flex items-center justify-center select-none print:border-slate-400 print:text-slate-700">
              {numMatch[1]}
            </span>
            <div className="flex-1 min-w-0 leading-relaxed">
              {renderInlineMathText(numMatch[2])}
            </div>
          </div>
        );
      }

      // Blank line
      if (!trimmed) {
        return <div key={lineIdx} className="h-1.5" />;
      }

      // Regular paragraph
      return (
        <p key={lineIdx} className="my-1 text-slate-300 leading-relaxed text-xs sm:text-sm">
          {renderInlineMathText(line)}
        </p>
      );
    });
  }, [content]);

  return <div className={`space-y-1 ${className}`}>{renderedBlocks}</div>;
};

function renderPlainTextWithFormatting(text: string, baseKey: number | string): React.ReactNode[] {
  const segments: React.ReactNode[] = [];
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let lastIdx = 0;
  let bMatch: RegExpExecArray | null;

  while ((bMatch = boldRegex.exec(text)) !== null) {
    if (bMatch.index > lastIdx) {
      segments.push(text.substring(lastIdx, bMatch.index));
    }
    segments.push(
      <strong key={`${baseKey}-b-${bMatch.index}`} className="font-semibold text-white">
        {bMatch[1]}
      </strong>
    );
    lastIdx = boldRegex.lastIndex;
  }

  if (lastIdx < text.length) {
    segments.push(text.substring(lastIdx));
  }

  return segments;
}

/**
 * Tokenizes text and parses inline $math$ and $$block$$ math expressions
 */
export function renderInlineMathText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const rawText = text.substring(lastIndex, match.index);
      parts.push(...renderPlainTextWithFormatting(rawText, `t-${lastIndex}`));
    }
    const token = match[0];
    if (token.startsWith("$$") && token.endsWith("$$")) {
      parts.push(<LaTeXRenderer key={match.index} math={token} block={true} />);
    } else {
      parts.push(<LaTeXRenderer key={match.index} math={token} block={false} />);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    const rawText = text.substring(lastIndex);
    parts.push(...renderPlainTextWithFormatting(rawText, `t-${lastIndex}`));
  }

  return parts;
}

// Backward-compatible alias for seamless integration
export const MathView = LaTeXRenderer;

/**
 * Interactive LaTeX Playground / Scratchpad with instant symbol shortcuts
 */
export const LaTeXPlayground: React.FC<{
  initialMath?: string;
  placeholder?: string;
  className?: string;
  onInsertIntoParent?: (snippet: string) => void;
}> = ({
  initialMath = "\\lambda_{\\max} T = 2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}",
  placeholder = "Enter LaTeX equation or notes here...",
  className = "",
  onInsertIntoParent,
}) => {
  const [latexInput, setLatexInput] = React.useState(initialMath);
  const [copied, setCopied] = React.useState(false);

  const physicsShortcuts = [
    { label: "ħ", latex: "\\hbar " },
    { label: "λ", latex: "\\lambda " },
    { label: "ν", latex: "\\nu " },
    { label: "ψ", latex: "\\psi " },
    { label: "σ", latex: "\\sigma " },
    { label: "π", latex: "\\pi " },
    { label: "θ", latex: "\\theta " },
    { label: "Δλ", latex: "\\Delta\\lambda " },
    { label: "√x", latex: "\\sqrt{x} " },
    { label: "a/b", latex: "\\frac{a}{b} " },
    { label: "×10ⁿ", latex: "\\times 10^{n} " },
    { label: "∫", latex: "\\int_{0}^{\\infty} " },
  ];

  const handleInsert = (symbol: string) => {
    setLatexInput((prev) => prev + symbol);
    if (onInsertIntoParent) {
      onInsertIntoParent(symbol);
    }
  };

  const handleCopy = () => {
    if (!latexInput) return;
    navigator.clipboard.writeText(latexInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span className="text-xs font-mono font-semibold text-slate-200">
            Interactive LaTeX Scratchpad
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLatexInput("")}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[11px] font-medium text-white transition-colors"
          >
            {copied ? "✓ Copied" : "Copy TeX"}
          </button>
        </div>
      </div>

      {/* Physics Shortcuts Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-slate-950/80 border border-slate-800/80">
        <span className="text-[10px] text-slate-500 font-mono pr-1">Shortcuts:</span>
        {physicsShortcuts.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleInsert(item.latex)}
            className="px-2 py-1 rounded-lg bg-slate-800/90 hover:bg-indigo-900/60 hover:text-indigo-200 border border-slate-700/60 text-xs font-mono text-slate-300 transition-colors"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Input textarea */}
      <textarea
        value={latexInput}
        onChange={(e) => setLatexInput(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60 resize-y"
      />

      {/* Live Preview */}
      <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800/90 min-h-[50px] flex items-center justify-center">
        {latexInput.trim() ? (
          <LaTeXRenderer math={latexInput} block={true} />
        ) : (
          <span className="text-xs text-slate-600 italic">Rendered equation preview will appear here...</span>
        )}
      </div>
    </div>
  );
};
