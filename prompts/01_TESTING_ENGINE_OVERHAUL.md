# PROMPT 01: Testing & Examination Engine Overhaul
## Domain: Physics 3 (ELCn114) Testing, Grading, Tolerant Evaluator & Diagnostic Feedback

### Role & Objective
You are a Principal Educational Software Architect and Quantum Physics Professor. The current testing engine in this web application is frustrating students: numerical checks fail due to rounding differences, test submission gives zero partial credit, the 120-minute timer cannot be flexibly managed, there are no progressive hints, and questions feel like static text boxes rather than an interactive physics lab exam.

Rewrite and overhaul the testing subsystem (`CrammingArena.tsx`, `ExamTrainer.tsx`, `OfficialDocumentsViewer.tsx`) according to the following strict specification:

---

### Core Engineering Requirements

#### 1. Tolerant Numerical & Scientific Notation Evaluator
- Implement an automated physics answer checker that:
  - Accepts standard numbers (`248.4`), scientific notation (`2.484e-7`, `2.484 * 10^-7`, `2.484x10^-7`), and unit-suffixed answers (`248.4 nm`, `0.123 nm`, `8050 K`).
  - Implements a configurable tolerance window (default $\pm 2.5\%$) to accommodate minor rounding variations in physical constants (e.g. $h = 6.626 \times 10^{-34}$ vs $6.63 \times 10^{-34}$).
  - Evaluates both scalar value and physical units (e.g., $J$, $eV$, $nm$, $m/s$, $Hz$, $W$).

#### 2. Multi-Stage Progressive Guidance System
For every multi-step question (e.g., Compton scattering angle derivation, infinite well probability integration):
- **Level 1 (Governing Law)**: Reveals the fundamental equation (e.g., $E = \phi + K_{\max}$ or $\Delta \lambda = \frac{h}{m_0 c}(1 - \cos\theta)$) without revealing values.
- **Level 2 (Intermediate Checkpoint)**: Asks student to confirm intermediate variable (e.g., "What is the recoil electron kinetic energy $K_e$?").
- **Level 3 (Accredited Model Solution)**: Reveals full step-by-step derivation with marking rubric points (1.0 mark for formula, 1.5 marks for substitution).

#### 3. Real Exam Room Simulator (120 Minutes)
- **Timer Controls**: Start, Pause, Resume, and 5-minute Warning chime/visual indicator.
- **Question Navigation Matrix**:
  - Grid showing Question 1 to 4 with sub-parts.
  - Distinct visual states: `Unanswered`, `In Progress`, `Flagged for Review`, `Completed`.
- **Integrated Live Formula Scratchpad**:
  - Live LaTeX-rendered input so students can type `E = h*c / lambda` and see it rendered immediately in KaTeX as $E = \frac{hc}{\lambda}$.
- **One-Tap Scientific Calculator Access**:
  - Instant drawer/modal with pre-loaded quantum constants ($h, \hbar, c, m_e, e, \sigma, k_B, R_H, \lambda_c$).

#### 4. Post-Exam Diagnostic Analytics
- Calculate student proficiency across the 10 university accreditation competencies (A1 to A10):
  - A1: Blackbody & Planck Quantum Hypothesis
  - A2: Photoelectric Effect & Stopping Potential
  - A3: Compton Scattering & Relativistic Collisions
  - A6: De Broglie & Wave Mechanics
  - A7: 1D Infinite & Finite Potential Wells
  - A8: Barrier Penetration & Quantum Tunneling
  - A9: Hydrogen Atom & Quantum Numbers ($n, l, m_l, m_s$)
  - A10: Special Relativity (Lorentz Transformations, Time Dilation, $E=mc^2$)
- Generate a "Focus Next" personalized review list based on missed questions.

---

### Acceptance Criteria
1. Zero syntax errors or broken imports.
2. Students can answer numerical questions in any standard format without unfair rejections.
3. Exam session state persists in `localStorage` so a browser refresh does not lose test progress.
4. Clean visual hierarchy with zero nested box clutter.
