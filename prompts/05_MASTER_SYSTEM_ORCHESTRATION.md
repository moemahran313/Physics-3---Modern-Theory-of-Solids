# PROMPT 05: Master System Orchestration & Total Refactor
## Domain: Full-Stack Synthesis, End-to-End Execution Blueprint

### Role & Objective
You are the Lead Systems Architect overseeing the total rejuvenation of this Physics 3 Modern Theory of Solids platform. This master prompt unifies all four operational pillars (Testing Engine, Flashcards, LaTeX Mathematics, UI/UX Anti-Slop) into a single, cohesive, execute-first transformation.

Run this comprehensive overhaul in a single, flawless engineering session:

---

### Step-by-Step Execution Sequence

#### Step 1: Elevate LaTeX & Mathematical Foundations (`LaTeXRenderer.tsx`)
1. Re-architect the tokenizer to automatically detect both explicit delimiters (`$...$`, `$$...$$`, `\[...\]`) and bare TeX keywords (`\frac`, `\lambda`, `\hbar`, `\Delta`, `\sigma`, `\alpha`).
2. Add one-click "Copy TeX" button with clipboard fallback.
3. Fix KaTeX baseline alignment and enforce responsive math container margins without horizontal clipping.
4. Export an interactive `LaTeXPlayground` component with live symbol hot-keys.

#### Step 2: Reinvent Testing & Exam Simulation (`OfficialDocumentsViewer.tsx`, `CrammingArena.tsx`)
1. Replace rigid string equality matching with a tolerant physics answer parser ($\pm 2.5\%$ tolerance + unit verification).
2. Add a 3-tier progressive hint drawer (Level 1: Governing Formula, Level 2: Intermediate Value Check, Level 3: Full Accredited Marking Rubric).
3. Implement 120-minute exam room simulation with persistent pause/resume timer, question jumping matrix, and flag-for-review bookmarks.
4. Render real-time KaTeX math inside student derivation scratchpads.

#### Step 3: Implement Cognitive Active Recall Flashcards (`FlashcardsDeck.tsx`)
1. Deploy an authentic 5-box Leitner spaced-repetition scheduler persisted in local storage.
2. Build a hardware-accelerated 3D card flip with smooth CSS transforms (`perspective: 1000px`, `transform-style: preserve-3d`).
3. Add full keyboard shortcuts: `Space` (flip), `1` (Again), `2` (Hard), `3` (Good), `4` (Easy), `ArrowLeft`/`ArrowRight` (nav).
4. Implement "Cloze Formula Drill" mode masking key variables in governing equations.

#### Step 4: Purge Visual Slop & Modernize UI/UX
1. Strip out nested bordered boxes and redundant pill badges across all components.
2. Unify color scheme around sleek deep slate surfaces (`bg-slate-950`, `bg-slate-900`) with glowing cyan/indigo physics accents.
3. Ensure crisp mobile responsiveness with generous touch targets (min 44px) and zero horizontal scroll overflow.
4. Mount an in-app "Prompt Directory & Studio" accessible in the sidebar and header for instant access to prompts and custom prompt generation.

---

### Verification & Completion Checklist
- [ ] Run `compile_applet` and verify 0 TypeScript compilation errors.
- [ ] Run `lint_applet` and confirm 0 lint warnings/errors.
- [ ] Test mobile responsiveness and KaTeX equation formatting across all four sheets.
- [ ] Confirm flashcard flips smoothly in 3D and responds to keyboard commands.
- [ ] Confirm testing module tolerates rounding variations and displays model solutions clearly.
