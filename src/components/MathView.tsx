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

// Helper component that parses markdown containing $inline$ and $$block$$ math and regular text
export const FormattedContent: React.FC<{ content: string; className?: string }> = ({
  content,
  className = "",
}) => {
  // Split on $$...$$ blocks first, then on $...$
  const renderedBlocks = useMemo(() => {
    if (!content) return null;

    // Normalizing newlines
    const lines = content.split("\n");

    return lines.map((line, lineIdx) => {
      // Check if line is header
      if (line.startsWith("### ")) {
        return (
          <h4 key={lineIdx} className="text-lg font-bold text-amber-300 mt-4 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-amber-400 rounded-sm inline-block"></span>
            {renderInlineMathText(line.replace("### ", ""))}
          </h4>
        );
      }
      if (line.startsWith("#### ")) {
        return (
          <h5 key={lineIdx} className="text-base font-semibold text-sky-300 mt-3 mb-1.5 flex items-center gap-2">
            <span className="w-1 h-3 bg-sky-400 rounded-sm inline-block"></span>
            {renderInlineMathText(line.replace("#### ", ""))}
          </h5>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h3 key={lineIdx} className="text-xl font-bold text-indigo-300 mt-5 mb-3 border-b border-slate-700/60 pb-1">
            {renderInlineMathText(line.replace("## ", ""))}
          </h3>
        );
      }

      // Check if line is block math
      if (line.trim().startsWith("$$") && line.trim().endsWith("$$") && line.trim().length > 4) {
        return <MathView key={lineIdx} math={line.trim()} block={true} className="my-2 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-800" />;
      }

      // Bullet points
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        return (
          <li key={lineIdx} className="ml-4 list-disc text-slate-300 leading-relaxed my-1">
            {renderInlineMathText(line.trim().slice(2))}
          </li>
        );
      }

      // Numbered lists
      const numMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        return (
          <div key={lineIdx} className="flex items-start gap-2.5 my-1.5 ml-2 text-slate-300">
            <span className="flex-shrink-0 w-6 h-6 rounded bg-slate-800 border border-slate-700 text-xs font-semibold text-indigo-300 flex items-center justify-center">
              {numMatch[1]}
            </span>
            <div className="flex-1 leading-relaxed">
              {renderInlineMathText(numMatch[2])}
            </div>
          </div>
        );
      }

      // Blank line
      if (!line.trim()) {
        return <div key={lineIdx} className="h-2" />;
      }

      // Regular paragraph
      return (
        <p key={lineIdx} className="my-1.5 text-slate-300 leading-relaxed text-sm md:text-base">
          {renderInlineMathText(line)}
        </p>
      );
    });
  }, [content]);

  return <div className={`space-y-1 ${className}`}>{renderedBlocks}</div>;
};

function renderInlineMathText(text: string): React.ReactNode[] {
  // Regex to split on $...$ but avoid $$...$$
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
