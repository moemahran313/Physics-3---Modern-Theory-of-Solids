# PROMPT 03: LaTeX & Mathematical Typography Engine Upgrade
## Domain: KaTeX Rendering, Zero-Layout-Shift Math, Delimiter Robustness & Interactive Math Playground

### Role & Objective
You are a Mathematical Typesetting Specialist and Compiler Engineer. Students have reported that math rendering is erratic: exponents get clipped on mobile screens, raw LaTeX code like `\lambda_{\max}` or `\frac{hc}{\lambda}` sometimes leaks unrendered into the text, and there is no way to copy formulas or test personal derivations.

Upgrade `LaTeXRenderer.tsx`, `MathView.tsx`, and the global typography engine to eliminate all rendering failures:

---

### Core Engineering Requirements

#### 1. Universal Fault-Tolerant Math Parser
- Implement a two-phase AST-based tokenizer in `LaTeXRenderer.tsx`:
  - **Phase 1: Delimiter Normalization**:
    - Handle standard TeX `$$...$$` (display block) and `$..$` (inline).
    - Handle LaTeX `\[...\]` (display block) and `\(...\)` (inline).
    - Auto-detect bare LaTeX formulas (lines or tokens beginning with `\frac`, `\lambda`, `\hbar`, `\psi`, `\sigma`, `\alpha`, `\beta`, `\gamma`, `\sqrt`, `\int`) even if un-delimited by `$`.
  - **Phase 2: KaTeX Render Pipeline**:
    - Wrap `katex.renderToString` in an isolated try-catch block.
    - Set `strict: false`, `throwOnError: false`, `trust: true`, `displayMode: isBlock`.
    - Provide custom error boundaries that render readable syntax-highlighted code instead of breaking the parent component.

#### 2. Mobile Responsive Math Containers & Zero Clipping
- KaTeX display equations must never cause horizontal viewport overflow or crop fractional terms:
  - Wrap block formulas in a `.latex-scroll-container` with subtle custom scrollbars and gradient fade masks indicating scrollability on mobile.
  - Scale equation font sizes responsively: `text-sm sm:text-base md:text-lg`.
  - Fix KaTeX baseline alignment so inline formulas ($E = hf$) align with adjacent English sentences.

#### 3. 1-Click LaTeX Copy & Action HUD
- Every display equation should have an unobtrusive hover/tap action HUD:
  - **Copy TeX**: Copies raw LaTeX (e.g., `E_n = \frac{n^2 h^2}{8 m L^2}`) to the system clipboard with an animated checkmark indicator.
  - **Copy Clean Text**: Copies standard ASCII formula for quick messaging (e.g., `E_n = (n^2 * h^2) / (8 * m * L^2)`).
  - **Open in Calculator**: Feeds the formula's variables directly into the app's scientific calculator.

#### 4. Live LaTeX Playground / Math Scratchpad Component
- Create an interactive mini-component (`LaTeXPlayground.tsx`):
  - Split view or tabbed: Left side is raw input with physics symbol shortcut toolbar (`ℏ`, `λ`, `ν`, `ψ`, `σ`, `π`, `√`, `∫`, `±`, `Δ`, `θ`, `φ`).
  - Right side renders instantaneous, publication-grade KaTeX output with render timing metric (<5ms).
  - Pre-loaded formula library covering all 4 course sheets (Stefan-Boltzmann, Photoelectric, Compton shift, Bohr radius, Infinite well, Relativistic velocity addition).

---

### Acceptance Criteria
1. Zero raw unrendered backslash commands visible on any screen.
2. Equations with superscripts (e.g. $10^{-34}$) and multi-level fractions render with crisp font clarity and no baseline clipping.
3. 1-click copy works reliably on both iOS Safari, Android Chrome, and desktop browsers.
4. Smooth rendering performance with no cumulative layout shifts (CLS).
