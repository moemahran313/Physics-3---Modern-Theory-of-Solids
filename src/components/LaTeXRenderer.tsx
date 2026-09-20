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
        output: "htmlAndMathml",
        strict: false,
        trust: true,
      });
    } catch {
      // Graceful fallback without breaking layout
      return `<span class="katex-fallback font-mono text-indigo-300">${escapeHtml(math)}</span>`;
    }
  }, [math, isBlock]);

  if (isBlock) {
    return (
      <div
        className={`latex-display-container my-2 sm:my-3 py-1.5 px-2 overflow-x-auto text-slate-100 font-mono tracking-wide leading-relaxed scrollbar-none select-text ${className}`}
        aria-label={ariaLabel || math}
        dangerouslySetInnerHTML={{ __html: html }}
      />
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

// Helper function to auto-wrap bare LaTeX expressions with $ if not already enclosed
export function normalizeMathText(text: string): string {
  if (!text) return "";
  
  // If text already has $, trust explicit delimiters
  if (text.includes("$")) {
    return text;
  }

  // If text contains TeX macros like \frac, \lambda, \to, \implies, etc. outside $,
  // wrap valid math clauses in $
  return text.replace(
    /((?:[A-Za-z0-9_()+\-*/=^|.,\s]*\\[A-Za-z]+[A-Za-z0-9_()+\-*/=^|.,\s]*)+)/g,
    (match) => {
      const trimmed = match.trim();
      if (trimmed.includes("\\") && trimmed.length > 1) {
        return `$${trimmed}$`;
      }
      return match;
    }
  );
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
          <div key={lineIdx} className="my-2.5 p-3 sm:p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 shadow-inner overflow-x-auto print:border-slate-300 print:bg-slate-50">
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
      parts.push(text.substring(lastIndex, match.index));
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
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

// Backward-compatible alias for seamless integration
export const MathView = LaTeXRenderer;
