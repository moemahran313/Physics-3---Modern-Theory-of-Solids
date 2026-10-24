# PROMPT 04: UI/UX & Aesthetic Rejuvenation
## Domain: Anti-AI-Slop Discipline, Visual Hierarchy, Sleek Physics Laboratory HUD & Modern Responsive Design

### Role & Objective
You are a Staff Product Designer and Design Systems Architect. The user accurately summarized the issue: "this website sucks, there is visual clutter, nested containers, noisy pill tags, and poor interaction design." The website must be transformed into a laser-focused, razor-sharp educational command center worthy of an elite university physics laboratory (inspired by Linear, Raycast, and Vercel design standards).

Execute a radical UI/UX decluttering and aesthetic elevation:

---

### Core Engineering Requirements

#### 1. Zero-Pill & Anti-Clutter Discipline
- Audit every component (`Header.tsx`, `Sidebar.tsx`, `SheetsMasterclassView.tsx`, `OfficialDocumentsViewer.tsx`):
  - Eliminate redundant badge pills (`[Solved]`, `[Accredited]`, `[Verified]`, `[Official]`, nested round labels).
  - Eliminate double and triple nested bordered cards (`border border-slate-800 inside border border-slate-800/80 inside border border-slate-900`).
  - Replace noisy multi-colored borders with clean background tone shifts (e.g. `bg-slate-900/60` to `bg-slate-900` with subtle `border-slate-800/50`).

#### 2. High-Contrast Dark-Mode Color Palette
- Strict, intentional semantic color system:
  - Background base: Deepest cosmic dark (`bg-slate-950` / `#030712`).
  - Card surfaces: Crisp elevated slate (`bg-slate-900` / `#0f172a` with subtle border `border-slate-850`).
  - Primary physics accent: Coherent electric cyan / indigo (`#38bdf8` / `#6366f1`).
  - Energy & Quantum transitions: Warm amber / rose for thermal emissions and stopping potentials.
  - Text typography: 
    - Heading: Pure bright white (`#f8fafc`), tracking-tight.
    - Body: High-legibility neutral slate (`#cbd5e1`), never faint gray.
    - Mathematical symbols: Glowing crisp monospace.

#### 3. Unified Header HUD & Fast Navigation
- Streamline the top bar:
  - Single compact breadcrumb showing current Course Chapter & Topic.
  - Quick-action command launcher (`Cmd+K` / `Ctrl+K`).
  - 1-click toggles for Scientific Calculator and Quantum Constants Drawer.
  - Instant chapter jumper (1 to 4) without full-page reloads.

#### 4. Mobile Ergonomics & Native Touch Feel
- Eliminate horizontal scrolling on screens down to 360px width.
- Convert multi-column grids into thumb-friendly single stacks on mobile (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).
- Generous tap targets (min 44px) for all buttons, tabs, and flashcard triggers.
- Sticky, non-intrusive mobile bottom navigation with clear active state indicators.

---

### Acceptance Criteria
1. Zero visual noise: no unnecessary decorative badges, nested box syndrome, or clash of competing gradients.
2. High readability: all text meets WCAG AAA contrast against dark backgrounds.
3. Fluid mobile responsiveness with zero horizontal layout breakages.
