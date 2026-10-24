# PROMPT 02: Flashcards & Active Recall Spaced Repetition Overhaul
## Domain: Cognitive Physics Mastery, Leitner System, Cloze Deletion & 3D Tactile Interactions

### Role & Objective
You are a Cognitive Science Engineer and Frontend Specialist. The current flashcards view in this application is static, tedious, and feels like clicking plain text cards with no true memory reinforcement. Students need an addictive, high-efficiency active recall system modeled on Anki / SuperMemo, specifically tuned for quantum mechanics and solid-state physics formulas.

Overhaul `FlashcardsDeck.tsx` and related state stores according to this specification:

---

### Core Engineering Requirements

#### 1. Leitner 5-Box Spaced Repetition Engine
- Implement an authentic 5-box Leitner progression model persisted in local storage:
  - **Box 1 (Daily)**: Cards failed or newly introduced.
  - **Box 2 (Every 3 Days)**: Cards answered correctly once.
  - **Box 3 (Weekly)**: Cards answered correctly twice.
  - **Box 4 (Bi-Weekly)**: Cards solid in long-term memory.
  - **Box 5 (Mastered - Monthly Review)**: Fully retained concepts.
- When reviewing, prompt with 4 standard response grades:
  - `[1] Again` (<10 min interval, resets to Box 1)
  - `[2] Hard` (1-day interval)
  - `[3] Good` (moves up 1 box)
  - `[4] Easy` (skips ahead 2 boxes)

#### 2. 3D Tactile Physical Flip Card Component
- Build a hardware-accelerated CSS 3D flip card:
  - Use `perspective: 1000px`, `transform-style: preserve-3d`, and `transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)`.
  - Flip triggerable via:
    - Mouse click anywhere on card.
    - Keyboard shortcut: `Space` or `Enter`.
    - Mobile swipe up/down gesture.
  - Front: Concept prompt, physical context, formula clue.
  - Back: Full mathematical definition, governing equations, exam pitfall callout, and accreditation competency tag.

#### 3. Formula Cloze-Deletion Mode (Active Recall Blanks)
- Provide a toggle for "Cloze Formula Drill":
  - Instead of showing the full formula on the back, mask critical variables:
    - Example: $\Delta \lambda = \frac{h}{[\;?\;]}(1 - \cos\theta)$ $\rightarrow$ Student clicks or types $m_0 c$.
    - Example: $E_n = \frac{n^2 h^2}{[\;?\;] m L^2}$ $\rightarrow$ Student clicks or types $8$.
    - Example: $\psi(x) = \sqrt{\frac{2}{L}} \sin\left(\frac{[\;?\;]\pi x}{L}\right)$ $\rightarrow$ Student clicks or types $n$.

#### 4. Keyboard Navigation & Ergonomics
- Global hotkeys enabled when viewing flashcards:
  - `Space` / `Enter`: Flip card.
  - `ArrowLeft` / `ArrowRight`: Previous / Next card.
  - `1`, `2`, `3`, `4`: Grade response.
  - `S`: Shuffle deck.
  - `F`: Toggle Cloze-deletion mode.
  - `M`: Mark card as bookmarked / high-priority for exam night.

#### 5. Daily Queue & Streak Tracking
- Display:
  - "Cards Due Today" counter.
  - Mastery progression ring (percentage of total curriculum in Box 4 & 5).
  - Daily review streak badge with celebratory micro-animations.

---

### Acceptance Criteria
1. Flipping is fluid, with 60fps animation and zero text flicker.
2. Full keyboard navigation without clicking required.
3. Card intervals and box levels persist across browser restarts.
4. Clean, dark aesthetic with glowing subtle accents on physics symbols.
