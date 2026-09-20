/**
 * Re-exports LaTeXRenderer, MathView alias, FormattedContent, and helpers
 * from LaTeXRenderer.tsx for seamless backward compatibility.
 */
export {
  LaTeXRenderer,
  MathView,
  FormattedContent,
  renderInlineMathText,
  normalizeMathText,
} from "./LaTeXRenderer";

export type { LaTeXRendererProps } from "./LaTeXRenderer";
