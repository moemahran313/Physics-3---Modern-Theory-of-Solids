export interface RecoveryPrompt {
  id: string;
  number: string;
  title: string;
  category: "testing" | "flashcards" | "latex" | "ui_ux" | "master";
  targetSubsystem: string;
  severity: "critical" | "high" | "essential";
  summary: string;
  keyFixes: string[];
  markdownContent: string;
  tags: string[];
}

export const RECOVERY_PROMPTS: RecoveryPrompt[] = [
  {
    id: "prompt-01-testing",
    number: "01",
    title: "Testing & Examination Engine Overhaul",
    category: "testing",
    targetSubsystem: "CrammingArena.tsx / ExamTrainer.tsx / OfficialDocumentsViewer.tsx",
    severity: "critical",
    summary: "Replaces rigid string matching with a ±2.5% tolerant physics evaluator, adds 3-tier progressive hints, a 120-min persistent exam simulator, and an interactive LaTeX scratchpad.",
    keyFixes: [
      "Tolerant scientific notation evaluator (e.g., 2.484e-7 or 248.4 nm within ±2.5% tolerance)",
      "Multi-stage hints (Level 1: Law, Level 2: Checkpoint, Level 3: Full Rubric)",
      "120-minute timed simulation with pause/resume and question jumping matrix",
      "Live KaTeX preview inside student derivation scratchpad",
      "Competency scoring mapped to university accreditation standards (A1–A10)"
    ],
    tags: ["Testing", "Grading", "Tolerant Evaluator", "Exam Simulator", "KaTeX Scratchpad"],
    markdownContent: `# PROMPT 01: Testing & Examination Engine Overhaul
## Domain: Physics 3 (ELCn114) Testing, Grading, Tolerant Evaluator & Diagnostic Feedback

### Role & Objective
You are a Principal Educational Software Architect and Quantum Physics Professor. The current testing engine in this web application is frustrating students: numerical checks fail due to rounding differences, test submission gives zero partial credit, the 120-minute timer cannot be flexibly managed, there are no progressive hints, and questions feel like static text boxes rather than an interactive physics lab exam.

Rewrite and overhaul the testing subsystem (\`CrammingArena.tsx\`, \`ExamTrainer.tsx\`, \`OfficialDocumentsViewer.tsx\`) according to the following strict specification:

### Core Engineering Requirements

#### 1. Tolerant Numerical & Scientific Notation Evaluator
- Implement an automated physics answer checker that:
  - Accepts standard numbers (\`248.4\`), scientific notation (\`2.484e-7\`, \`2.484 * 10^-7\`, \`2.484x10^-7\`), and unit-suffixed answers (\`248.4 nm\`, \`0.123 nm\`, \`8050 K\`).
  - Implements a configurable tolerance window (default ±2.5%) to accommodate minor rounding variations in physical constants (e.g. h = 6.626e-34 vs 6.63e-34).
  - Evaluates both scalar value and physical units (e.g., J, eV, nm, m/s, Hz, W).

#### 2. Multi-Stage Progressive Guidance System
For every multi-step question (e.g., Compton scattering angle derivation, infinite well probability integration):
- **Level 1 (Governing Law)**: Reveals the fundamental equation without revealing values.
- **Level 2 (Intermediate Checkpoint)**: Asks student to confirm intermediate variable.
- **Level 3 (Accredited Model Solution)**: Reveals full step-by-step derivation with marking rubric points.

#### 3. Real Exam Room Simulator (120 Minutes)
- **Timer Controls**: Start, Pause, Resume, and 5-minute Warning indicator.
- **Question Navigation Matrix**:
  - Grid showing Question 1 to 4 with sub-parts.
  - Distinct visual states: Unanswered, In Progress, Flagged for Review, Completed.
- **Integrated Live Formula Scratchpad**:
  - Live LaTeX-rendered input so students can type formulas and see them formatted in KaTeX.
- **One-Tap Scientific Calculator Access**:
  - Pre-loaded quantum constants (h, hbar, c, m_e, e, sigma, k_B, R_H, lambda_c).

#### 4. Post-Exam Diagnostic Analytics
- Calculate student proficiency across the 10 university accreditation competencies (A1 to A10).
- Generate a "Focus Next" personalized review list based on missed questions.`
  },
  {
    id: "prompt-02-flashcards",
    number: "02",
    title: "Flashcards & Active Recall Spaced Repetition Overhaul",
    category: "flashcards",
    targetSubsystem: "FlashcardsDeck.tsx / localStorage stores",
    severity: "critical",
    summary: "Builds a true 5-box Leitner spaced-repetition scheduler, 60fps 3D physical card flip, keyboard ergonomics (Space, 1-4, Arrows), and a formula cloze-deletion blank mode.",
    keyFixes: [
      "Authentic 5-box Leitner progression model persisted in local storage",
      "Smooth hardware-accelerated 3D card flip with zero text flicker",
      "Full keyboard navigation: Space (flip), 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)",
      "Formula Cloze-Deletion mode masking key physical variables",
      "Daily review queue count and mastery progression rings"
    ],
    tags: ["Flashcards", "Spaced Repetition", "Leitner System", "3D Flip", "Keyboard Shortcuts"],
    markdownContent: `# PROMPT 02: Flashcards & Active Recall Spaced Repetition Overhaul
## Domain: Cognitive Physics Mastery, Leitner System, Cloze Deletion & 3D Tactile Interactions

### Role & Objective
You are a Cognitive Science Engineer and Frontend Specialist. The current flashcards view in this application is static, tedious, and feels like clicking plain text cards with no true memory reinforcement. Students need an addictive, high-efficiency active recall system modeled on Anki / SuperMemo, specifically tuned for quantum mechanics and solid-state physics formulas.

Overhaul \`FlashcardsDeck.tsx\` and related state stores according to this specification:

### Core Engineering Requirements

#### 1. Leitner 5-Box Spaced Repetition Engine
- Implement an authentic 5-box Leitner progression model persisted in local storage:
  - Box 1 (Daily), Box 2 (3 Days), Box 3 (Weekly), Box 4 (Bi-Weekly), Box 5 (Mastered).
- 4 standard response grades: [1] Again, [2] Hard, [3] Good, [4] Easy.

#### 2. 3D Tactile Physical Flip Card Component
- Build a hardware-accelerated CSS 3D flip card with preserve-3d and smooth transitions.
- Flip triggerable via mouse click, Space/Enter hotkey, or touch swipe.

#### 3. Formula Cloze-Deletion Mode
- Toggle for masking critical variables in physics formulas to test exact active recall.

#### 4. Keyboard Navigation & Ergonomics
- Space/Enter to flip, 1-4 to grade, Arrow keys to navigate, S to shuffle, M to bookmark.`
  },
  {
    id: "prompt-03-latex",
    number: "03",
    title: "LaTeX & Mathematical Typography Engine Upgrade",
    category: "latex",
    targetSubsystem: "LaTeXRenderer.tsx / MathView.tsx / KaTeX CSS",
    severity: "critical",
    summary: "Fixes raw backslash leaking, KaTeX delimiter collisions, exponent text-wrapping clipping, adds 1-click TeX clipboard copy, and an interactive live math scratchpad.",
    keyFixes: [
      "Dual-phase parser handling $, $$, \\[, \\], \\(, \\), and bare LaTeX commands (\\frac, \\lambda, \\hbar, etc.)",
      "Zero layout shift, no baseline dipping, and responsive horizontal scroll containers",
      "1-click 'Copy TeX Source' button on every display equation",
      "High-contrast KaTeX font scaling without exponent cutoffs",
      "Interactive live LaTeX Playground with physical symbol shortcuts"
    ],
    tags: ["KaTeX", "LaTeX", "Math Typography", "Copy TeX", "Live Playground"],
    markdownContent: `# PROMPT 03: LaTeX & Mathematical Typography Engine Upgrade
## Domain: KaTeX Rendering, Zero-Layout-Shift Math, Delimiter Robustness & Interactive Math Playground

### Role & Objective
You are a Mathematical Typesetting Specialist and Compiler Engineer. Students have reported that math rendering is erratic: exponents get clipped on mobile screens, raw LaTeX code like \\lambda_{\\max} or \\frac{hc}{\\lambda} sometimes leaks unrendered into the text, and there is no way to copy formulas or test personal derivations.

Upgrade \`LaTeXRenderer.tsx\`, \`MathView.tsx\`, and the global typography engine to eliminate all rendering failures:

### Core Engineering Requirements

#### 1. Universal Fault-Tolerant Math Parser
- Handle standard TeX and LaTeX delimiters, plus auto-detect bare LaTeX formulas even if un-delimited by $.
- Wrap in isolated try-catch with strict: false, throwOnError: false.

#### 2. Mobile Responsive Math Containers & Zero Clipping
- KaTeX display equations must never cause horizontal viewport overflow or crop fractional terms.
- Scale equation font sizes responsively: text-sm sm:text-base md:text-lg.

#### 3. 1-Click LaTeX Copy & Action HUD
- Hover/tap action HUD allowing instant copying of raw LaTeX or plain ASCII representation.

#### 4. Live LaTeX Playground / Math Scratchpad
- Interactive mini-component with physics symbol shortcut toolbar (hbar, lambda, nu, psi, sigma, pi, sqrt, int).`
  },
  {
    id: "prompt-04-ui-ux",
    number: "04",
    title: "UI/UX & Aesthetic Rejuvenation (Anti-Slop)",
    category: "ui_ux",
    targetSubsystem: "Global CSS / Header.tsx / Sidebar.tsx / Shell Layout",
    severity: "high",
    summary: "Purges visual clutter, eliminates nested container boxes and redundant pill badges, implements a sleek dark physics laboratory HUD, and refines touch navigation.",
    keyFixes: [
      "Zero-Pill Discipline: Strips unnecessary decorative tags and redundant status badges",
      "Eliminates triple-nested container borders and claustrophobic card frames",
      "Coherent cosmic dark palette (#030712) with glowing electric cyan/indigo accents",
      "Streamlined top HUD with quick breadcrumb and instant command launcher",
      "Mobile thumb-friendly touch targets (min 44px) and zero horizontal overflow"
    ],
    tags: ["UI/UX", "Anti-Slop", "Declutter", "Dark Theme", "Mobile Ergonomics"],
    markdownContent: `# PROMPT 04: UI/UX & Aesthetic Rejuvenation
## Domain: Anti-AI-Slop Discipline, Visual Hierarchy, Sleek Physics Laboratory HUD & Modern Responsive Design

### Role & Objective
You are a Staff Product Designer and Design Systems Architect. The website must be transformed into a laser-focused, razor-sharp educational command center worthy of an elite university physics laboratory (inspired by Linear, Raycast, and Vercel design standards).

Execute a radical UI/UX decluttering and aesthetic elevation:

### Core Engineering Requirements

#### 1. Zero-Pill & Anti-Clutter Discipline
- Audit every component to eliminate redundant badge pills and nested bordered cards.
- Replace noisy multi-colored borders with clean background tone shifts.

#### 2. High-Contrast Dark-Mode Color Palette
- Strict, intentional semantic color system: cosmic dark base, crisp slate surfaces, electric cyan/indigo accents.
- Headings in pure bright white; body in high-legibility neutral slate; math in glowing monospace.

#### 3. Unified Header HUD & Fast Navigation
- Streamlined top bar with breadcrumb, quick calculator access, and instant sheet jumping.

#### 4. Mobile Ergonomics & Native Touch Feel
- Generous tap targets (min 44px) and clean vertical stacking on phones.`
  },
  {
    id: "prompt-05-master",
    number: "05",
    title: "Master System Orchestrator (All-In-One Refactor)",
    category: "master",
    targetSubsystem: "Entire Codebase / App Shell",
    severity: "essential",
    summary: "The ultimate end-to-end prompt that unifies all four operational pillars into a single sequential engineering blueprint.",
    keyFixes: [
      "Sequential Step 1: LaTeX & KaTeX parser overhaul",
      "Sequential Step 2: Testing engine & tolerant answer checking",
      "Sequential Step 3: Leitner 5-box flashcards & 3D flip card",
      "Sequential Step 4: UI decluttering, zero-pill discipline, and sleek laboratory HUD",
      "Final verification with TypeScript compilation and lint checks"
    ],
    tags: ["Master Blueprint", "End-to-End", "Full Refactor", "All Pillars"],
    markdownContent: `# PROMPT 05: Master System Orchestration & Total Refactor
## Domain: Full-Stack Synthesis, End-to-End Execution Blueprint

### Role & Objective
You are the Lead Systems Architect overseeing the total rejuvenation of this Physics 3 Modern Theory of Solids platform. This master prompt unifies all four operational pillars (Testing Engine, Flashcards, LaTeX Mathematics, UI/UX Anti-Slop) into a single, cohesive, execute-first transformation.

Run this comprehensive overhaul in a single, flawless engineering session:

### Step-by-Step Execution Sequence

#### Step 1: Elevate LaTeX & Mathematical Foundations (LaTeXRenderer.tsx)
- Re-architect tokenizer for dual delimiters and bare keywords.
- Add 1-click Copy TeX button with clipboard fallback.
- Export interactive LaTeXPlayground component with live symbol hot-keys.

#### Step 2: Reinvent Testing & Exam Simulation (OfficialDocumentsViewer.tsx, CrammingArena.tsx)
- Replace rigid string equality matching with tolerant physics evaluator (±2.5% + units).
- Add 3-tier progressive hint drawer.
- Implement 120-minute exam room simulation with persistent pause/resume timer.

#### Step 3: Implement Cognitive Active Recall Flashcards (FlashcardsDeck.tsx)
- Deploy authentic 5-box Leitner spaced-repetition scheduler in localStorage.
- Build hardware-accelerated 3D card flip with smooth CSS transforms.
- Add keyboard shortcuts: Space (flip), 1-4 (grade), Arrow keys (nav).
- Implement Cloze Formula Drill mode.

#### Step 4: Purge Visual Slop & Modernize UI/UX
- Strip out nested bordered boxes and redundant pill badges across all components.
- Unify color scheme around sleek deep slate surfaces with glowing cyan/indigo accents.
- Mount in-app Prompt Directory & Studio for instant prompt browsing and execution.`
  }
];

export interface CustomPromptOptions {
  focusAreas: {
    testing: boolean;
    flashcards: boolean;
    latex: boolean;
    ui_ux: boolean;
    performance: boolean;
  };
  severity: "critical" | "high" | "polish";
  engineeringTone: "rigorous" | "pedagogical" | "concise";
  targetEngineers: "ai_studio_agent" | "human_engineer" | "student_tutor";
}

export function generateCustomPrompt(options: CustomPromptOptions): string {
  const selectedAreas: string[] = [];
  if (options.focusAreas.testing) selectedAreas.push("Testing Engine & Tolerant Answer Evaluation");
  if (options.focusAreas.flashcards) selectedAreas.push("Leitner Spaced Repetition Flashcards & 3D Active Recall");
  if (options.focusAreas.latex) selectedAreas.push("KaTeX Mathematical Rendering & Copyable LaTeX HUD");
  if (options.focusAreas.ui_ux) selectedAreas.push("Anti-Slop UI Decluttering & Physics Lab HUD");
  if (options.focusAreas.performance) selectedAreas.push("Zero-CLS Layout Performance & Offline Persistence");

  return `# CUSTOM RECOVERY PROMPT: Physics 3 RefLib System Elevate
Target Areas: ${selectedAreas.join(", ")}
Severity Level: ${options.severity.toUpperCase()}
Execution Mode: ${options.engineeringTone.toUpperCase()}

## Context & Objectives
You are charged with immediately refactoring and elevating the Physics 3 (ELCn114) Modern Theory of Solids study platform. The student requires an uncompromising, high-efficiency, bug-free experience.

${options.focusAreas.testing ? `### 1. TESTING ENGINE OVERHAUL
- Implement a tolerant numerical grader that accepts ±2.5% tolerance on numerical physics answers (e.g., Planck constant, Wien displacement, stopping potential, Compton shift).
- Support scientific notation ('2.484e-7', '2.484 * 10^-7') and standard SI units.
- Provide 3-level progressive hints without spoiling final marks.
- Support 120-minute timed exam room mode with question-jumping grid and flagged questions.
` : ""}
${options.focusAreas.flashcards ? `### 2. FLASHCARDS & ACTIVE RECALL OVERHAUL
- Implement Leitner 5-box interval progression stored in local storage.
- Provide smooth 3D flip card animations with Spacebar hotkey.
- Add 1-4 difficulty grading hotkeys ([1] Again, [2] Hard, [3] Good, [4] Easy).
- Provide a formula cloze-deletion drill where key variables (m0, c, h, n^2) are hidden for active recall.
` : ""}
${options.focusAreas.latex ? `### 3. LATEX & MATH ENGINE UPGRADE
- Upgrade KaTeX parser to cleanly process $, $$, \\[, \\], \\(, \\), and bare LaTeX commands without crashing.
- Add 1-click 'Copy TeX' button to every major equation.
- Ensure zero baseline dipping or mobile exponent clipping.
- Provide an interactive formula playground with common physics symbol shortcuts.
` : ""}
${options.focusAreas.ui_ux ? `### 4. UI/UX DECLUTTERING & ANTI-SLOP
- Purge all redundant pill badges, status labels, and multi-layered nested borders.
- Adopt a sleek deep cosmic dark theme (slate-950 base, slate-900 surface, electric cyan/indigo accents).
- Make all mobile touch targets at least 44px with zero horizontal layout breakages.
` : ""}

## Completion Requirements
1. The codebase must compile cleanly with 0 TypeScript and lint errors.
2. Changes must be immediately testable in the preview without manual steps.
3. Keep all physics formulas grounded in the official Modern Academy ELCn114 curriculum.`;
}
