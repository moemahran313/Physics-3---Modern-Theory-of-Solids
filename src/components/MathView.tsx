import React, { useMemo } from "react";
import katex from "katex";

interface MathViewProps {
  math: string;
  block?: boolean;
  displayMode?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ 
  math, 
  block = false, 
  displayMode = false, 
  className = "" 
}) => {
  const isBlock = block || displayMode;
  const html = useMemo(() => {
    try {
      // Clean string
      let cleanMath = math.trim();
      // Strip starting/ending $ or $$ if present
      if (cleanMath.startsWith("$$") && cleanMath.endsWith("$$")) {
        cleanMath = cleanMath.slice(2, -2).trim();
      } else if (cleanMath.startsWith("$") && cleanMath.endsWith("$")) {
        cleanMath = cleanMath.slice(1, -1).trim();
      }

      return katex.renderToString(cleanMath, {
        displayMode: isBlock,
        throwOnError: false,
        output: "htmlAndMathml",
      });
    } catch {
      return `<span>${math}</span>`;
    }
  }, [math, isBlock]);

  if (isBlock) {
    return (
      <div
        className={`overflow-x-auto py-2 my-1 text-slate-100 font-mono tracking-wide ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`inline-block px-1 text-indigo-200 font-mono ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// Helper function to auto-wrap bare LaTeX expressions with $ if not already enclosed
function normalizeMathText(text: string): string {
  if (!text) return "";
  
  // If text already has $, trust the author
  if (text.includes("$")) {
    return text;
  }

  // If text contains TeX macros like \frac, \lambda, \to, \implies, etc. outside $,
  // split on sentence boundaries or commas and identify math clauses
  return text.replace(
    /((?:[A-Za-z0-9_()+\-*/=^|.,\s]*\\[A-Za-z]+[A-Za-z0-9_()+\-*/=^|.,\s]*)+)/g,
    (match) => {
      const trimmed = match.trim();
      // Only wrap if it contains a backslash command
      if (trimmed.includes("\\") && trimmed.length > 1) {
        return `$${trimmed}$`;
      }
      return match;
    }
  );
}

// Helper component that parses markdown containing $inline$ and $$block$$ math and regular text
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

      // Check if line is header
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={lineIdx} className="text-base sm:text-lg font-bold text-amber-300 mt-3 mb-1.5 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-amber-400 rounded-sm inline-block shrink-0"></span>
            <span>{renderInlineMathText(trimmed.replace("### ", ""))}</span>
          </h4>
        );
      }
      if (trimmed.startsWith("#### ")) {
        return (
          <h5 key={lineIdx} className="text-sm sm:text-base font-semibold text-sky-300 mt-2 mb-1 flex items-center gap-2">
            <span className="w-1 h-3 bg-sky-400 rounded-sm inline-block shrink-0"></span>
            <span>{renderInlineMathText(trimmed.replace("#### ", ""))}</span>
          </h5>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={lineIdx} className="text-lg sm:text-xl font-bold text-indigo-300 mt-4 mb-2 border-b border-slate-700/60 pb-1">
            {renderInlineMathText(trimmed.replace("## ", ""))}
          </h3>
        );
      }

      // Check if line is block math
      if (trimmed.startsWith("$$") && trimmed.endsWith("$$") && trimmed.length > 4) {
        return (
          <div key={lineIdx} className="my-2.5 p-3 sm:p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 shadow-inner overflow-x-auto">
            <MathView math={trimmed} block={true} />
          </div>
        );
      }

      // Bullet points
      if (trimmed.startsWith("• ") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const bulletText = trimmed.replace(/^[•\-*]\s+/, "");
        return (
          <div key={lineIdx} className="flex items-start gap-2 text-slate-300 leading-relaxed my-1 pl-1 sm:pl-2">
            <span className="text-indigo-400 font-bold mt-1 text-xs">•</span>
            <div className="flex-1">
              {renderInlineMathText(bulletText)}
            </div>
          </div>
        );
      }

      // Numbered lists
      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        return (
          <div key={lineIdx} className="flex items-start gap-2.5 my-1.5 ml-1 sm:ml-2 text-slate-300">
            <span className="flex-shrink-0 w-5 h-5 rounded-md bg-indigo-900/40 border border-indigo-700/50 text-[11px] font-mono font-bold text-indigo-300 flex items-center justify-center mt-0.5">
              {numMatch[1]}
            </span>
            <div className="flex-1 leading-relaxed">
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
        <p key={lineIdx} className="my-1 text-slate-300 leading-relaxed">
          {renderInlineMathText(line)}
        </p>
      );
    });
  }, [content]);

  return <div className={`space-y-1 ${className}`}>{renderedBlocks}</div>;
};

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
      parts.push(<MathView key={match.index} math={token} block={true} />);
    } else {
      parts.push(<MathView key={match.index} math={token} block={false} />);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}
