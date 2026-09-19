import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MASTER_PHYSICS_SYSTEM_PROMPT = `
# SYSTEM PROMPT: CORE ENGINE & ARCHITECTURAL OPERATING SYSTEM
Target Platform: Google AI Studio (System Instructions)
Deployment Target: Physics 3 (ELCN114 / ELC 214) Reference Library & Interactive Learning Engine
Pedagogical Models Enforced: Double-Immersive Dual Encoding, Axiomatic Structural Scaffolding, Socratic Mental Sandboxing

## 1. IDENTITY, ROLE, AND MISSION
You are the Autonomous Educational Core Engine for Modern Theory of Solids / Physics 3 (ELCN114 / ELC 214).
You operate as an authoritative, high-yield academic workstation for engineering students. You possess exhaustive mastery of the curriculum, lecture sequences, mathematical derivations, historical experiments, boundary conditions, and exam patterns.
You execute tasks with mathematical precision, physical intuition, and zero tolerance for hand-waving or superficial summaries.

## 2. THE THREE CARDINAL PEDAGOGICAL AXIOMS
### Axiom I: The Double-Immersive Dual-Layout Protocol (Strict Rule)
No concept, theorem, or mechanism may ever be explained using purely symbolic math or purely descriptive prose alone. You must ALWAYS provide both simultaneously:
1. The Abstract Mathematical & Symbolic Track: Rigorous algebraic formulations, explicit operators, state vectors/wavefunctions, differential equations, and formal physical definitions using LaTeX ($...$ and $$...$$).
2. The Concrete Mental Model & Physical Simulation Track: A tangible, experiential analogy, mechanics visualization, or mental sandbox grounding equations into physical intuition.

### Axiom II: Structural Scaffolding (The Axiomatic Method)
- Identify starting fundamental physical axiom.
- State exact point where classical physics breaks down (physical contradiction or UV catastrophe).
- Introduce quantum/relativistic postulate cleanly.
- Execute mathematical bridge step-by-step with annotated boundary substitutions.

### Axiom III: Socratic Interrogation & Mental Sandboxing
- Pose boundary condition checks (e.g., v -> c or L -> infinity).
- Isolate student traps and exam pitfalls.

## 3. ENGINE ROUTING & COMMAND INTERFACE
Recognize and format responses according to triggers:
- /lecture [topic]: Deep, end-to-end curricular exposition with Double-Immersive Protocol.
- /derive [law/equation]: Step-by-step axiomatic mathematical proof from first principles.
- /sandbox [phenomenon]: Interactive thought experiment altering parameters and testing consequences.
- /exam-trainer [topic/all]: Authentic Modern Academy exam questions (Type A, B, C, D) with mandatory physical justification.
- /mnemonics [topic]: Algorithmic mnemonic devices, spatial anchors, memory frameworks.
- /lab-analyzer [experiment]: Analysis of experimental setups (Photocells, Compton spectrometer, Davisson-Germer, Michelson-Morley).
- /flashcards [chapter]: Front/back technical active recall cards with limits, units, and behaviors.

---

## 3.1 MODULE 1: THE /lecture & /derive ENGINE SPECIFICATION
System Role & Objective: You are the dedicated exposition and mathematical derivation module for the Physics 3 (ELCN114 / ELC 214) Engine. Your sole function is to process \`/lecture [topic]\` and \`/derive [equation]\` commands. You must transform complex quantum, atomic, and relativistic phenomena into rigorous, double-encoded learning modules that satisfy both the highest standards of mathematical proof and intuitive physical understanding.

### Command 1: /lecture [topic] Execution Protocol
When triggered, you MUST output a comprehensive lesson structured exactly as follows. Do not deviate from this layout:
1. **Axiomatic Foundation (The "Why"):** State the exact classical assumption that failed, leading to this topic. E.g., for Blackbody Radiation, state the Rayleigh-Jeans ultraviolet catastrophe where $I(\\lambda, T) \\to \\infty$ as $\\lambda \\to 0$. For relativity, state the failure of the Galilean velocity addition for light.
2. **The Double-Immersive Core (The "What"):**
   - **Track A: The Abstract:** Provide the formal definition, the governing equations in strict LaTeX, and define every variable and its SI/atomic unit (e.g., $h = 6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$).
   - **Track B: The Concrete:** Immediately follow with a physical analogy or mental sandbox. Example: If explaining the Pauli Exclusion Principle, do not just define quantum numbers; describe the atomic subshells as a rigid architectural framework where no two "tenants" can share the exact same address $(n, l, m_l, m_s)$.
3. **Boundary Conditions & Limits:** Explain what happens to the math at the extremes. What happens to the Lorentz factor $\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}$ as $v \\to c$? What happens to quantum tunneling probability $T = e^{-2\\gamma L}$ as barrier width $L$ increases?
4. **Exam Trap Warning:** Highlight a common conceptual error based on historical exams. Example: Remind students that in the Compton Effect, the maximum wavelength shift occurs at $\\theta = 180^\\circ$ yielding $\\Delta\\lambda = 2\\lambda_c$, not $90^\\circ$.

### Command 2: /derive [law/equation] Execution Protocol
When asked to derive a specific formula, you MUST simulate a professor writing on a chalkboard, leaving zero gaps in the algebra:
1. **Premise & Initial State:** State the starting equations. For the Time-Independent Schrödinger Equation, start from total energy $E = \\frac{p^2}{2m} + U$ and the de Broglie relation $p = \\hbar k$.
2. **Step-by-Step Evolution:**
   - Number every step (Step 1, Step 2, etc.).
   - Use LaTeX block equations (\`$$\`) for main steps and inline LaTeX (\`$\`) for variable references.
   - Explicitly state the mathematical operation used to move from step to step (e.g., "Substituting $k = 2\\pi/\\lambda$ into equation 2..." or "Applying a Taylor series expansion $e^x \\approx 1 + x$ for small values...").
3. **The Physical Check:** Once the final equation is reached (e.g., $E_n = \\frac{n^2 h^2}{8mL^2}$ for a particle in a 1D box), verify it against physical reality. Explain why $n=0$ is impossible due to the Heisenberg Uncertainty Principle requiring zero-point energy.

### Curriculum Content Guardrails for Module 1
You are restricted to the verified course curriculum and must actively integrate these specific derivations and concepts when requested:
- **Chapter 1 (Quantum):** Derive Wien's displacement law implications, Stefan-Boltzmann power relations, Einstein's photoelectric equation $hf = \\phi + K_{\\max}$, and the Compton shift equation utilizing relativistic conservation of energy and momentum.
- **Chapter 2 (Wave Mechanics):** Derive the de Broglie wavelength. Execute the full derivation of the infinite square well energy levels and wavefunctions $\\psi_n(x) = \\sqrt{\\frac{2}{L}}\\sin\\left(\\frac{n\\pi x}{L}\\right)$. Explain quantum tunneling transmission coefficients and penetration depth.
- **Chapter 3 (Atomic):** Derive the Bohr orbit radii $r_n = n^2 a_0$ and energy states $E_n = -13.6/n^2\\text{ eV}$ by balancing the Coulomb force with centripetal acceleration. Derive the Rydberg formula for spectral series (Lyman, Balmer, Paschen, etc.). Break down the four quantum numbers and their specific selection rules.
- **Chapter 4 (Relativity):** Derive Time Dilation ($\\Delta t = \\gamma \\Delta t_p$) using the transverse light-clock thought experiment. Derive Length Contraction ($L = L_p/\\gamma$). Execute Lorentz transformations for coordinates ($x', y', z', t'$) and relativistic velocity addition.

### Formatting Restrictions
- Never use standard text for equations; strictly enforce LaTeX.
- Do not output generic introductory fluff.
- Always use bold headers for section transitions.
- Ensure all final derived formulas are boxed or visually isolated using blockquote \`> \` or distinct LaTeX \`$$\` formatting.

---

## 3.2 MODULE 2: THE /sandbox ENGINE SPECIFICATION
System Role & Objective: You are the dedicated interactive thought-experiment and simulation module for the Physics 3 (ELCN114 / ELC 214) Engine. Your sole function is to process the \`/sandbox [phenomenon]\` command. You do not passively dispense information; you construct dynamic mental models, alter physical parameters, and forcefully engage the student's predictive and analytical reasoning using the Socratic method.

### Command Execution Protocol: /sandbox [phenomenon]
When triggered, you MUST architect an interactive physical scenario following this exact sequence. Do not skip steps or provide the final mathematical resolution until the user attempts an answer:
1. **System Initialization (The Setup):**
   - Establish the physical environment and initial state using concrete variables from the curriculum.
   - *Example:* "You have a stationary electron confined to a 1D infinite potential well of width $L = 0.5\\text{ nm}$. It is currently in the first excited state ($n=2$)."
2. **The Parameter Shift (The Perturbation):**
   - Isolate and alter exactly one critical variable in the system.
   - *Example:* "I am now compressing the walls of the well so the width is halved ($L \\to L/2$), while keeping the electron in the same quantum state."
3. **Socratic Interrogation (The Challenge):**
   - Ask 1-2 highly specific, multi-layered questions requiring both a mathematical prediction and a physical explanation.
   - *Example:* "1. What exactly happens to the momentum of the electron? 2. How does the ground state zero-point energy shift, and why does the Heisenberg Uncertainty Principle forbid it from dropping to zero?"
   - **STOP GENERATING HERE.** Prompt the student: *"[Awaiting Student Hypothesis & Physical Justification before revealing mathematical resolution...]"* and wait for the user's response.

### Feedback & Resolution Loop (Post-User Response)
Once the user submits their hypothesis, evaluate it using the **Double-Immersive Protocol**:
- **Validate & Correct:** Acknowledge correct intuition. If the user is wrong, gently but directly correct the physical misconception without lecturing.
- **The Mathematical Reality (Abstract):** Show the exact formulaic shift using LaTeX. (e.g., Prove that since $E_n = \\frac{n^2 h^2}{8mL^2}$, halving $L$ increases the energy by a factor of 4).
- **The Physical Reality (Concrete):** Explain the outcome conceptually. (e.g., "By compressing the box, you localized the electron's position ($\\Delta x$ decreased). To satisfy $\\Delta x \\Delta p \\ge \\hbar/2$, its momentum uncertainty, and therefore its kinetic energy, had to violently spike").

### Curriculum Content Guardrails for Module 2
You must construct sandboxes specifically mapped to the following curriculum boundaries and historical exam concepts:
- **Chapter 1 (Quantum & Light):**
  - *The Blackbody Furnace:* Shift the temperature $T$ of a cavity radiator and ask for the specific changes in peak wavelength $\\lambda_{\\max}$ and radiant intensity $I$.
  - *The Photoelectric Circuit:* Shine light of varying intensity vs. varying frequency on a sodium plate ($\\phi = 2.28\\text{ eV}$). Ask the user to predict the behavior of the ammeter (current $I$) and the voltmeter (stopping potential $V_0$).
  - *Billiard Ball Photons:* Set up a Compton scattering event. Ask the user to calculate the kinetic energy of the recoil electron if the photon is scattered back along its incoming path ($\\theta = 180^\\circ$).
- **Chapter 2 (Wave Mechanics):**
  - *The Shrinking Box:* Manipulate the width $L$ of an infinite potential well and ask for the impact on energy spacing and the number of probability nodes ($n-1$).
  - *The Leaky Wall:* Set up a quantum tunneling scenario where particle energy $E < V_0$. Ask the user what happens to the transmission coefficient $T = e^{-2\\gamma a}$ if the barrier width $a$ is doubled versus if the barrier height $V_0$ is doubled.
- **Chapter 3 (Atomic Physics):**
  - *The Electron Elevator:* Place a Hydrogen electron in the $n=4$ state. Ask the user to predict the number of possible emission lines as it cascades to the ground state, and identify which transitions belong to the Balmer vs. Paschen series.
  - *Quantum Address Invalid:* Give the user a set of quantum numbers (e.g., $n=2, l=2, m_l=0, m_s=1/2$) and ask them to physically explain why this electron cannot exist in nature (violates $l \\le n-1$).
- **Chapter 4 (Relativity):**
  - *The Relativistic Train:* Setup a simultaneity paradox with a train moving at $0.8c$ and lightning striking both ends. Ask the user to resolve what the platform observer sees versus the train observer.
  - *The Heavy Sprinter:* Push an object's velocity from $0.1c$ to $0.99c$. Ask the user to calculate the relativistic mass $m = \\gamma m_0$ and explain why it requires infinite energy to reach $c$.

### Formatting & Operational Restrictions
- Never use standard text for variables; strictly enforce LaTeX ($inline$ and \`$$\` for block equations).
- Never provide the answer to the sandbox challenge in the same output as the initial prompt. You must halt generation and force user interaction.
- Keep scenarios vivid, concrete, and strictly tied to ELC 214 / ELCN114 parameters. Use the required constants (e.g., $h = 6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$, $c = 3 \\times 10^8\\text{ m/s}$).

---

## 4. MASTER CURRICULUM ARCHITECTURE (Chapters 1 - 4)
- Chapter 1: Quantum Physics & The Radiation Catastrophe (Blackbody radiation, Stefan-Boltzmann P=sigma*A*epsilon*T^4, Wien displacement lambda_max*T=2.898e-3 m*K, Rayleigh-Jeans Ultraviolet Catastrophe, Planck discrete oscillator E_n=n*h*f with Taylor series reduction, Photoelectric Effect with Einstein equation hf = phi + eV_0 and work function phi = h*f_c, Compton Scattering relativistic conservation derivation, shift Delta lambda = (h/(m_0*c))*(1 - cos theta), limits at 0, 90, 180 degrees).
- Chapter 2: Wave Mechanics & Bound States (De Broglie hypothesis lambda=h/p=h/sqrt(2m*KE)=h/sqrt(2mqV), Davisson-Germer Ni crystal, G.P. Thomson, electron double-slit, Heisenberg Uncertainty Delta x * Delta p >= hbar/2 and Delta E * Delta t >= hbar/2, wave packets vp vs vg, Born probability density |Psi|^2, normalization, expectation values, TDSE and TISE, Infinite Square Well quantized wave numbers k_n = n*pi/L, eigenfunctions psi_n = sqrt(2/L)*sin(n*pi*x/L), eigenvalues E_n = n^2*pi^2*hbar^2/(2mL^2) = n^2*E_1, zero point energy, fractional probability integrals, Finite Square Well exponential decay with penetration depth delta = hbar/sqrt(2m(U-E)), Quantum Tunneling T ~= exp(-2*gamma*a), Fowler-Nordheim cold cathode, alpha decay, ammonia inversion, STM current exponential sensitivity, Simple Harmonic Oscillator E_n = (n + 1/2)hbar*omega).
- Chapter 3: Atomic Physics & Structural Transitions (Plum pudding vs Rutherford alpha scattering catastrophe, Bohr model derivation from Coulomb = centripetal and L = n*hbar, r_n = n^2 * a_0 with a_0 = 0.529 Angstrom, E_n = -13.6 eV / n^2, hydrogen-like ions with Z, Rydberg formula and series: Lyman (n_f=1 UV), Balmer (n_f=2 Vis), Paschen (n_f=3 IR), Brackett (n_f=4 IR), Pfund (n_f=5 IR), Humphreys (n_f=6), Bohr correspondence principle, Multi-electron 4 quantum numbers n, l, m_l, m_s, shell capacities 2(2l+1) and 2n^2, Pauli Exclusion, Hund's Rule, Aufbau, Continuous Bremsstrahlung Duane-Hunt cutoff lambda_min = hc/(eV), Characteristic X-rays Moseley law Z_eff = Z - 1 for K_alpha).
- Chapter 4: Special Theory of Relativity (Inertial vs Non-Inertial frames, Galilean transformations and failure, Michelson-Morley null result, Einstein's 2 postulates, Relativity of simultaneity, Transverse light-clock derivation of time dilation Delta t = gamma * Delta t_p, Lorentz factor gamma = 1/sqrt(1 - v^2/c^2), Length contraction L = L_p / gamma, Muon lifetime & GPS & gold color, Lorentz transformations and reduction to Galilean limit, Relativistic velocity addition u_x = (u'_x + v)/(1 + u'_x*v/c^2), Relativistic mass m = gamma*m_0, Relativistic momentum p = gamma*m_0*v, Mass-energy E = mc^2 = gamma*m_0*c^2 = K + m_0*c^2, Relativistic invariant E^2 = p^2*c^2 + m_0^2*c^4).

## 5. MANDATORY PHYSICAL CONSTANTS
- h = 6.63e-34 J*s = 4.136e-15 eV*s
- hbar = 1.05e-34 J*s
- c = 3.00e8 m/s
- e = 1.60e-19 C
- m_e = 9.11e-31 kg
- R_H = 1.097e7 m^-1
- sigma = 5.67e-8 W/(m^2*K^4)
- k_B = 1.38e-23 J/K = 8.617e-5 eV/K (or 8.125e-5 eV/°C on Modern Academy sheets)
- lambda_c = 2.43 pm = 0.0243 Angstrom = 2.426e-12 m
- a_0 = 0.0529 nm = 0.529 Angstrom
- E_1 = -13.6 eV

## 6. PRIMARY CURRICULAR REPOSITORY: OFFICIAL EXAMS & LECTURE NOTES ARCHIVE
You have full authoritative recall of the authentic Modern Academy Physics 3 (ELCN114 / ELC 214) examination archive:
1. Fall 2020/2021 Exam (Dr. Abeer Serag Eldeen, Dr. Sally Eladly):
   - Q1: Compton 2.6 pm at 30° -> lambda' = 2.925e-12 m; Photoelectric Phi=3.2e-19 J, f=8e14 Hz -> K_max=2.1e-19 J; Planck cavity hypothesis; Stopping potential & work function definitions; Sun T=6000 K -> lambda_max = 483 nm.
   - Q2: Heisenberg Delta x=1e-10 m, Delta v=6.63e-24 m/s -> m = 1/(4pi) = 0.0796 kg; Baseball de Broglie lambda=1.768e-34 m; TISE derivation from plane wave psi=exp(i(kx-wt)); Infinite well L=0.5 nm first 3 excited states (n=2, 3, 4) with E_1=1.505 eV, E_2=6.02 eV, E_3=13.55 eV, E_4=24.08 eV, P(L/2 <= x <= L) for n=2 is 1/2 (50%), P(L/3 <= x <= 2L/3) for n=3 is 1/3 (33.3%); Barrier tunneling E=10 eV, V_0=17 eV, L=0.18 nm -> gamma=1.355e10 m^-1, delta=0.0738 nm, T=7.6e-3.
   - Q3: Hydrogen n=4 -> 2 lambda = 486.17 nm (Balmer green); Pauli exclusion & Hund's rule; Rydberg derivation 1/lambda = R_H(1/n_f^2 - 1/n_i^2); 4 quantum numbers (n, l, m_l, m_s); 5 transitions analysis (shortest lambda: 6->1; most energy gained: 1->3; Lyman, Balmer, Paschen); n=2 -> 1 transition (lambda=121.6 nm, Delta E=10.2 eV).
   - Q4: Moving meter stick when relativistic mass = 5/4 rest mass -> gamma=5/4, contracted length L = 1/gamma = 0.80 m; Galilean time invariance (t'=t -> 5e-6 s); Newtonian agreement at low speeds, inertial frames, Galilean acceleration invariance a'=a; Event (x=100 m, t=1e-4 s, v=2.7e8 m/s=0.9c) -> Galilean x'=-26,900 m, t'=1e-4 s; Lorentz gamma=2.294, x'=-61,713 m, t'=2.287e-4 s.
2. Spring 2019/2020 Exam (Dr. L. I. Soliman, Dr. Sally Eladly):
   - Q1: Blackbody T increase -> I_max increases, lambda_peak decreases; Compton recoil electron K increases from 0; Photocurrent I-V curve with constant V_0, K_max vs f linear graph with f_0; Compton shift independence of f; Sodium Phi=2.28 eV: red 680 nm (1.82 eV) no emission, cutoff lambda_0 = 544 nm (Green).
   - Q2: Delta x=4e-10 m -> Delta p approx 2e-24 kg*m/s; Normalization integral int_{-inf}^{+inf} |psi|^2 dx = 1; Wave groups, psi, and |psi|^2 definitions; Tunneling T = exp(-2*gamma*a) and 5 applications (Field emission, Alpha decay, Ammonia inversion, SHO barrier, STM); Infinite well 5 states n=1..5 with p_n = n*p_1 and E_n = n^2*E_1.
   - Q3: Ionization energy E_ion = +13.6 eV; Bohr postulates; Hydrogen energy levels & series; Balmer lambda_max = 656.3 nm (n=3->2) and lambda_min = 364.6 nm (n=inf->2); Electronic configurations: F_9 (1s^2 2s^2 2p^5), Ti_22 ([Ar] 4s^2 3d^2), Ge_32 ([Ar] 4s^2 3d^10 4p^2).
   - Q4: 6 sodium atoms 3s splitting -> 6 levels; Metallic shine due to absorption and prompt re-emission by free electrons; Two-atom molecular bonding U(r) curve; Covalent solids features (directional sharing, diamond/Si, brittle, high T_m); Temperature for 1% occupancy at E - E_F = 0.5 eV -> T approx 1263 K.
3. 15-Page Lecture Summary Notes:
   - 12-point Photoelectric vs Compton comparison matrix.
   - Exact derivation of Lorentz coordinate and time transformations x' = gamma(x - vt), t' = gamma(t - vx/c^2) using light sphere equations x=ct, x'=ct', and asymptotic reduction to Galilean mechanics as v/c -> 0.

Execute with absolute academic rigour, formatting math with crisp LaTeX expressions.
`;

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // Health endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      curriculum: "Physics 3 (ELCN114 / ELC 214)",
      engine: "Autonomous Educational Core Engine",
      hasAiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // AI Interactive Core Engine Endpoint
  app.post("/api/engine/chat", async (req, res) => {
    const { message, history = [], commandMode } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing message field" });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // In case GEMINI_API_KEY is not configured yet in secrets, provide a comprehensive
      // fallback response that strictly adheres to the requested command mode and physics axioms
      return res.json({
        source: "offline_curriculum_engine",
        response: generateCurriculumFallback(message, commandMode),
      });
    }

    try {
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      // Add recent history if provided
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item.role && item.text) {
            contents.push({
              role: item.role === "assistant" ? "model" : "user",
              parts: [{ text: item.text }],
            });
          }
        }
      }

      // Add the user request
      let userPrompt = message;
      if (commandMode && !userPrompt.startsWith("/")) {
        userPrompt = `${commandMode} ${userPrompt}`;
      }
      contents.push({
        role: "user",
        parts: [{ text: userPrompt }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: MASTER_PHYSICS_SYSTEM_PROMPT,
          temperature: 0.2, // Low temperature for high mathematical and pedagogical rigor
        },
      });

      const text = response.text || "No response received from Core Engine.";
      return res.json({
        source: "gemini-3.8-flash",
        response: text,
      });
    } catch (err: unknown) {
      console.error("Gemini API invocation error:", err);
      // Fallback seamlessly to offline curriculum engine so user is never stranded
      const fallback = generateCurriculumFallback(message, commandMode);
      return res.json({
        source: "offline_curriculum_engine",
        warning: (err as Error)?.message,
        response: fallback,
      });
    }
  });

  // Setup Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Physics 3 Educational Core Engine running at http://0.0.0.0:${PORT}`);
  });
}

function generateCurriculumFallback(prompt: string, commandMode?: string): string {
  const fullInput = `${commandMode || ""} ${prompt}`.trim();
  const query = fullInput.toLowerCase();
  const isDerive = fullInput.startsWith("/derive") || commandMode === "/derive" || query.includes("derive");
  const isSandbox = fullInput.startsWith("/sandbox") || commandMode === "/sandbox" || query.includes("sandbox");
  const isResolution = query.includes("hypothesis") || query.includes("resolution") || query.includes("resolve") || query.includes("reveal") || query.includes("answer") || query.includes("solution");

  // ==============================================================
  // MODULE 2: THE /sandbox ENGINE (SOCRATIC INTERROGATION)
  // ==============================================================
  if (isSandbox) {
    // 1. Chapter 1: The Blackbody Furnace
    if (query.includes("furnace") || query.includes("blackbody") || query.includes("stefan") || query.includes("wien")) {
      if (isResolution) {
        return `### **SOCRATIC RESOLUTION: The Blackbody Furnace**

**1. Validate & Correct:**
- *Peak Wavelength Shift:* Correct intuition recognizes that increasing temperature shifts the peak emission to shorter, higher-frequency wavelengths according to Wien's displacement law $\\lambda_{\\max} T = b$. Doubling $T$ ($3000\\text{ K} \\to 6000\\text{ K}$) cuts the peak wavelength exactly in half ($966\\text{ nm} \\to 483\\text{ nm}$).
- *Radiant Intensity Scaling:* Stefan-Boltzmann's law dictates that total power scales with the *fourth power* of absolute temperature ($T^4$). Doubling $T$ increases total power by $2^4 = 16\\times$.

**2. The Mathematical Reality (Abstract):**
$$\\lambda_{\\max, 2} = \\frac{b}{T_2} = \\frac{b}{2 T_1} = \\frac{1}{2} \\lambda_{\\max, 1} = \\frac{2.898 \\times 10^{-3}\\text{ m}\\cdot\\text{K}}{6000\\text{ K}} = 4.83 \\times 10^{-7}\\text{ m} = \\boxed{483\\text{ nm}}$$
This shifts the peak from near-infrared ($966\\text{ nm}$) directly into the cyan-green visible spectrum ($483\\text{ nm}$), matching the emission signature of the Sun.

Total radiant exitance scales as:
$$I_2 = \\sigma T_2^4 = \\sigma (2 T_1)^4 = 16 \\sigma T_1^4 = 16 I_1$$
$$I_2 = 16 \\times (4.59 \\times 10^6\\text{ W/m}^2) = \\boxed{7.34 \\times 10^7\\text{ W/m}^2}$$

**3. The Physical Reality (Concrete):**
Thermal vibrations in cavity walls populate standing electromagnetic modes. Classical equipartition theorem gave every mode an average thermal energy $k_B T$ regardless of frequency, creating the ultraviolet catastrophe where high-frequency modes radiated infinite power ($I(\\lambda) \\to \\infty$ as $\\lambda \\to 0$). Planck's quantum discretization $E_n = n h f$ imposes an exponential barrier: high-frequency modes require large energy chunks ($hf \\gg k_B T$) and remain frozen out.`;
      }

      return `### **SOCRATIC SANDBOX: The Blackbody Furnace**

**1. System Initialization (The Setup):**
You are monitoring an ideal cavity radiator (blackbody furnace) with emissivity $\\epsilon = 1.0$ at thermal equilibrium at temperature $T_1 = 3000\\text{ K}$. Its spectral radiance peaks at $\\lambda_{\\max, 1} = \\frac{b}{T_1} = 966\\text{ nm}$ in the near-infrared, emitting total radiant exitance $I_1 = \\sigma T_1^4 = 5.67 \\times 10^{-8} \\times (3000)^4 = 4.59 \\times 10^6\\text{ W/m}^2$.

**2. The Parameter Shift (The Perturbation):**
We inject immense thermal energy into the furnace cavity, doubling its absolute thermodynamic temperature:
$$T_2 = 2 T_1 = 6000\\text{ K}$$
(matching the effective surface temperature of our Sun).

**3. Socratic Interrogation (The Challenge):**
1. By what exact numerical factor does the peak emission wavelength $\\lambda_{\\max}$ shift, into which electromagnetic spectral band does it move, and what does the Wien displacement law govern about its value?
2. By what factor does the total integrated radiant intensity $I$ scale according to the Stefan-Boltzmann law, and why does classical Rayleigh-Jeans theory catastrophically fail at this higher temperature?

> **[STOP GENERATING HERE]**
> *Awaiting Student Hypothesis & Physical Justification before revealing mathematical resolution...*
> *(To check your predictions, submit your explanation or type: \`/sandbox furnace resolution\`)*`;
    }

    // 2. Chapter 1: The Photoelectric Circuit
    if (query.includes("photoelectric") || query.includes("sodium") || query.includes("circuit") || query.includes("stopping potential")) {
      if (isResolution) {
        return `### **SOCRATIC RESOLUTION: The Photoelectric Circuit**

**1. Validate & Correct:**
- *Case A (Intense Red Beam):* The ammeter registers strictly $0\\text{ A}$ (zero current). Classical physics predicted that waves deliver continuous energy, so cranking intensity $1000\\times$ would accumulate enough energy to eject electrons. Quantum physics proves that energy absorption is an individual, one-to-one photon-electron event.
- *Case B (Dim Violet LED):* Photoelectrons are ejected instantaneously (lag $< 10^{-9}\\text{ s}$), registering stopping potential $V_0 = 0.98\\text{ V}$.

**2. The Mathematical Reality (Abstract):**
For red light ($\\lambda = 680\\text{ nm}$):
$$hf = \\frac{hc}{\\lambda} = \\frac{1240\\text{ eV}\\cdot\\text{nm}}{680\\text{ nm}} = 1.82\\text{ eV}$$
Since $hf = 1.82\\text{ eV} < \\phi = 2.28\\text{ eV}$, $K_{\\max} = hf - \\phi < 0$. No electron can overcome the binding work function, regardless of beam wattage:
$$\\boxed{I = 0.00\\text{ A}}$$

For violet light ($\\lambda = 380\\text{ nm}$):
$$hf = \\frac{1240\\text{ eV}\\cdot\\text{nm}}{380\\text{ nm}} = 3.26\\text{ eV} > \\phi = 2.28\\text{ eV}$$
$$K_{\\max} = hf - \\phi = 3.26\\text{ eV} - 2.28\\text{ eV} = 0.98\\text{ eV}$$
Since $e V_0 = K_{\\max}$:
$$\\boxed{V_0 = 0.98\\text{ Volts}}$$

**3. The Physical Reality (Concrete):**
Light is quantized into discrete localized energy packets (photons). Sodium's surface work function $\\phi = 2.28\\text{ eV}$ is like a vending machine requiring a $2.28 token. Throwing billions of $1.82 red photons is like inserting millions of undersized coins: each coin is immediately rejected and the total transaction fails. A single $3.26 violet photon provides sufficient energy to liberate an electron with $0.98\\text{ eV}$ of kinetic energy left over.`;
      }

      return `### **SOCRATIC SANDBOX: The Photoelectric Circuit**

**1. System Initialization (The Setup):**
You are operating an evacuated photoelectric tube with a sodium cathode of work function $\\phi = 2.28\\text{ eV}$ (cutoff frequency $f_c = \\frac{\\phi}{h} = 5.51 \\times 10^{14}\\text{ Hz}$, threshold wavelength $\\lambda_c = 544\\text{ nm}$). An ammeter measures photocurrent $I$ and an adjustable reverse bias voltmeter measures stopping potential $V_0$. You illuminate the sodium plate with a monochromatic red laser ($\\lambda = 680\\text{ nm}$, photon energy $hf = 1.82\\text{ eV}$).

**2. The Parameter Shift (The Perturbation):**
- **Case A:** You crank the red laser intensity up by a factor of $1000\\times$ (creating a blindingly bright red beam).
- **Case B:** You replace the red laser with a low-power, dim violet LED ($\\lambda = 380\\text{ nm}$, photon energy $hf = 3.26\\text{ eV}$, power $P = 1\\mu\\text{W}$).

**3. Socratic Interrogation (The Challenge):**
1. In Case A, what will the ammeter read despite the $1000\\times$ intensity increase, and what classical wave theory prediction does this contradict?
2. In Case B, does photocurrent flow immediately or is there a time lag, and what is the exact stopping potential $V_0$ registered by the voltmeter?

> **[STOP GENERATING HERE]**
> *Awaiting Student Hypothesis & Physical Justification before revealing mathematical resolution...*
> *(To check your predictions, submit your explanation or type: \`/sandbox photoelectric resolution\`)*`;
    }

    // 3. Chapter 1: Billiard Ball Photons (Compton Backscatter)
    if (query.includes("billiard") || query.includes("compton") || query.includes("recoil")) {
      if (isResolution) {
        return `### **SOCRATIC RESOLUTION: Billiard Ball Photons (Compton Backscattering)**

**1. Validate & Correct:**
- *Wavelength Shift:* At $\\theta = 180^\\circ$, $\\cos 180^\\circ = -1$, yielding the maximum possible shift $\\Delta\\lambda = 2\\lambda_c = 4.852\\text{ pm}$.
- *Recoil Electron Kinetic Energy:* The electron absorbs the entire energy lost by the photon: $K_e = hf - hf' \\approx 439\\text{ keV}$ ($70.8\\%$ of the incident energy).

**2. The Mathematical Reality (Abstract):**
$$\\Delta\\lambda = \\lambda' - \\lambda = \\frac{h}{m_0 c}(1 - \\cos 180^\\circ) = \\lambda_c(1 - (-1)) = 2\\lambda_c = 2(2.426\\text{ pm}) = 4.852\\text{ pm}$$
$$\\lambda' = \\lambda + \\Delta\\lambda = 2.000\\text{ pm} + 4.852\\text{ pm} = \\boxed{6.852\\text{ pm}}$$
Photon energy after scattering:
$$E' = \\frac{hc}{\\lambda'} = \\frac{1240\\text{ keV}\\cdot\\text{pm}}{6.852\\text{ pm}} = 180.97\\text{ keV}$$
Recoil electron kinetic energy:
$$K_e = E - E' = 620.00\\text{ keV} - 180.97\\text{ keV} = \\boxed{439.03\\text{ keV}}$$

**3. The Physical Reality (Concrete):**
At $\\theta = 180^\\circ$, the photon reverses its linear momentum vector from $+p$ to $-p'$, representing the maximum possible momentum change $\\Delta p = p - (-p') = p + p'$. By momentum conservation, the electron receives the maximum possible backward recoil kick, exactly like a head-on collision between billiard balls where a light ball rebounds directly backward off a stationary heavier ball.`;
      }

      return `### **SOCRATIC SANDBOX: Billiard Ball Photons**

**1. System Initialization (The Setup):**
An X-ray photon of incident wavelength $\\lambda = 0.0200\\text{ \\AA} = 2.00\\text{ pm}$ ($hf = 620\\text{ keV}$) strikes a stationary, unbound electron ($m_0 c^2 = 511\\text{ keV}$) in a target chamber.

**2. The Parameter Shift (The Perturbation):**
We position our photon spectrometer directly backward along the incident beam axis to record maximum backscattering:
$$\\theta = 180^\\circ \\quad (\\pi\\text{ radians})$$

**3. Socratic Interrogation (The Challenge):**
1. What is the wavelength $\\lambda'$ of the backscattered photon in picometers, using the Compton wavelength $\\lambda_c = 2.426\\text{ pm}$?
2. What exact kinetic energy $K_e$ is transferred to the recoil electron, and why is this the maximum possible kinetic energy transfer achievable in any single Compton collision?

> **[STOP GENERATING HERE]**
> *Awaiting Student Hypothesis & Physical Justification before revealing mathematical resolution...*
> *(To check your predictions, submit your explanation or type: \`/sandbox compton resolution\`)*`;
    }

    // 4. Chapter 2: The Shrinking Box
    if (query.includes("box") || query.includes("shrinking") || query.includes("infinite well") || query.includes("well")) {
      if (isResolution) {
        return `### **SOCRATIC RESOLUTION: The Shrinking Box**

**1. Validate & Correct:**
- *Energy Scaling:* Energy levels in an infinite potential well are inversely proportional to $L^2$ ($E_n \\propto 1/L^2$). Compressing the box to $L/2$ quadruples all energy eigenvalues ($4\\times$).
- *Node Count:* The number of interior probability density nodes ($|\\psi|^2 = 0$) is determined strictly by the quantum state index $(n - 1)$. For $n = 3$, there are exactly $3 - 1 = 2$ interior nodes, which remain unchanged during geometric compression.
- *Zero-Point Energy:* The ground-state zero-point energy $E_1$ quadruples from $1.505\\text{ eV}$ to $6.020\\text{ eV}$.

**2. The Mathematical Reality (Abstract):**
$$E_n = \\frac{n^2 h^2}{8 m L^2} \\implies E_3(L_2) = \\frac{3^2 h^2}{8 m (L_1 / 2)^2} = 4 \\times \\frac{9 h^2}{8 m L_1^2} = 4 E_3(L_1)$$
$$E_3(L_2) = 4 \\times 13.55\\text{ eV} = \\boxed{54.20\\text{ eV}}$$
Adjacent level spacing:
$$\\Delta E = E_{n+1} - E_n = \\frac{(2n+1)h^2}{8mL^2} \\implies \\Delta E(L_2) = 4 \\Delta E(L_1)$$
Interior probability nodes:
$$\\psi_3(x) = \\sqrt{\\frac{2}{L}}\\sin\\left(\\frac{3\\pi x}{L}\\right) = 0 \\implies x = \\frac{L}{3}, \\quad x = \\frac{2L}{3} \\implies \\boxed{2\\text{ interior nodes}}$$

**3. The Physical Reality (Concrete):**
Compressing the box constrains the spatial uncertainty of the electron: $\\Delta x \\le L/2$. According to the Heisenberg Uncertainty Principle:
$$\\Delta x \\Delta p \\ge \\frac{\\hbar}{2}$$
Halving $\\Delta x$ forces a doubling of momentum uncertainty $\\Delta p$. Because kinetic energy scales quadratically with momentum ($K \\approx \\Delta p^2 / 2m$), the ground-state kinetic energy must violently spike by a factor of 4. Quantum particles cannot sit motionless ($E_1 > 0$) because that would violate the uncertainty principle.`;
      }

      return `### **SOCRATIC SANDBOX: The Shrinking Box**

**1. System Initialization (The Setup):**
An electron is trapped inside a 1D infinite potential well with rigid, impenetrable walls at $x = 0$ and $x = L_1 = 0.50\\text{ nm}$. The electron occupies the second excited state ($n = 3$), where its energy is $E_3 = 9 E_1 = 9 \\times 1.505\\text{ eV} = 13.55\\text{ eV}$.

**2. The Parameter Shift (The Perturbation):**
We rapidly compress the boundary walls so the width of the box is cut in half:
$$L_2 = \\frac{L_1}{2} = 0.25\\text{ nm}$$
while keeping the quantum state index fixed at $n = 3$.

**3. Socratic Interrogation (The Challenge):**
1. How does the energy spacing $\\Delta E = E_{n+1} - E_n$ between adjacent energy levels scale with box width $L$, and what is the new numerical value of $E_3$?
2. How many internal probability density nodes ($|\\psi|^2 = 0$) does the electron possess inside the box, does this node count change upon compression, and what happens to the ground-state zero-point energy?

> **[STOP GENERATING HERE]**
> *Awaiting Student Hypothesis & Physical Justification before revealing mathematical resolution...*
> *(To check your predictions, submit your explanation or type: \`/sandbox box resolution\`)*`;
    }

    // 5. Chapter 2: The Leaky Wall (Quantum Tunneling)
    if (query.includes("tunneling") || query.includes("leaky") || query.includes("barrier") || query.includes("penetration")) {
      if (isResolution) {
        return `### **SOCRATIC RESOLUTION: The Leaky Wall (Quantum Tunneling)**

**1. Validate & Correct:**
- *Scenario A (Doubling Width $a$):* Because transmission $T \\approx e^{-2\\gamma a}$, doubling width squares the transmission coefficient: $T_A = (T_1)^2 = (7.6 \\times 10^{-3})^2 \\approx 5.78 \\times 10^{-5}$ (a 131-fold crash).
- *Scenario B (Doubling Barrier Height Difference):* Because $\\gamma = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}$, doubling $(V_0 - E)$ increases $\\gamma$ only by a factor of $\\sqrt{2} \\approx 1.414$, giving $T_B = (T_1)^{1.414} \\approx 9.9 \\times 10^{-4}$.
- *Dominant Parameter:* Barrier width $a$ has a vastly more severe exponential suppressing effect than barrier height $V_0$.

**2. The Mathematical Reality (Abstract):**
For Scenario A ($a \\to 2a$):
$$T_A = e^{-2\\gamma(2a)} = (e^{-2\\gamma a})^2 = T_1^2 = (7.6 \\times 10^{-3})^2 = \\boxed{5.78 \\times 10^{-5}}$$
For Scenario B ($(V_0 - E) \\to 2(V_0 - E)$):
$$\\gamma_B = \\frac{\\sqrt{2m \\cdot 2(V_0 - E)}}{\\hbar} = \\sqrt{2}\\gamma_1 \\approx 1.414 \\gamma_1$$
$$T_B = e^{-2(\\sqrt{2}\\gamma_1)a} = (e^{-2\\gamma_1 a})^{\\sqrt{2}} = (7.6 \\times 10^{-3})^{1.414} = \\boxed{9.88 \\times 10^{-4}}$$

**3. The Physical Reality (Concrete):**
Barrier width enters the exponent linearly ($e^{-k \\cdot a}$), whereas barrier height enters underneath a square root ($e^{-k' \\sqrt{V_0 - E}}$). Thus, spatial thickness suppresses tunneling far more violently than potential height. This exponential spatial sensitivity is the operating foundation of the Scanning Tunneling Microscope (STM): changing the tip-sample separation by merely $0.1\\text{ nm}$ alters the tunneling current by a full order of magnitude.`;
      }

      return `### **SOCRATIC SANDBOX: The Leaky Wall**

**1. System Initialization (The Setup):**
A beam of electrons with incident kinetic energy $E = 10.0\\text{ eV}$ encounters a rectangular potential barrier of height $V_0 = 17.0\\text{ eV}$ and width $a = 0.180\\text{ nm}$. Inside the barrier ($V_0 > E$), the attenuation coefficient is $\\gamma = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar} = 1.355 \\times 10^{10}\\text{ m}^{-1}$, producing an initial transmission coefficient:
$$T_1 = e^{-2\\gamma a} \\approx 7.6 \\times 10^{-3} \\quad (0.76\\%)$$

**2. The Parameter Shift (The Perturbation):**
Compare two alternative physical alterations:
- **Scenario A:** You double the barrier width ($a \\to 2a = 0.360\\text{ nm}$) keeping $V_0 = 17\\text{ eV}$.
- **Scenario B:** You double the barrier height difference ($(V_0 - E) \\to 2(V_0 - E) = 14.0\\text{ eV}$) keeping $a = 0.180\\text{ nm}$.

**3. Socratic Interrogation (The Challenge):**
1. Calculate the new transmission coefficient $T_A$ for Scenario A. By what order of magnitude does the tunneling probability crash?
2. In Scenario B, how does $\\gamma$ scale with $(V_0 - E)$, and which parameter (barrier width $a$ or barrier height $V_0$) has the more severe, dominant exponential suppressing effect on tunneling?

> **[STOP GENERATING HERE]**
> *Awaiting Student Hypothesis & Physical Justification before revealing mathematical resolution...*
> *(To check your predictions, submit your explanation or type: \`/sandbox tunneling resolution\`)*`;
    }

    // 6. Chapter 3: The Electron Elevator (Hydrogen Cascades)
    if (query.includes("elevator") || query.includes("cascade") || query.includes("n=4") || query.includes("emission lines")) {
      if (isResolution) {
        return `### **SOCRATIC RESOLUTION: The Electron Elevator**

**1. Validate & Correct:**
- *Total Emission Lines:* For an ensemble excited to principal quantum state $n$, the total number of distinct radiative pathways is $N = \\frac{n(n-1)}{2}$. For $n = 4$, $N = \\frac{4 \\times 3}{2} = 6$ distinct spectral lines.
- *Series Categorization:*
  - Balmer series ($n_f = 2$): $4 \\to 2$ ($486.2\\text{ nm}$, green $H_\\beta$) and $3 \\to 2$ ($656.3\\text{ nm}$, red $H_\\alpha$).
  - Paschen series ($n_f = 3$): $4 \\to 3$ ($1875.1\\text{ nm}$, infrared).
- *Shortest Wavelength Line:* The $4 \\to 1$ transition has the largest energy gap ($\\Delta E = 12.75\\text{ eV}$), yielding the shortest wavelength $\\lambda = 97.2\\text{ nm}$ in the ultraviolet Lyman series.

**2. The Mathematical Reality (Abstract):**
$$N = \\frac{n(n-1)}{2} = \\frac{4(3)}{2} = \\boxed{6\\text{ lines}}$$
Transitions Catalog:
1. **Lyman Series ($n_f = 1$, UV):**
   - $4 \\to 1$: $\\Delta E = -0.85 - (-13.6) = 12.75\\text{ eV} \\implies \\lambda = \\frac{1240}{12.75} = \\mathbf{97.2\\text{ nm}}$
   - $3 \\to 1$: $\\Delta E = -1.51 - (-13.6) = 12.09\\text{ eV} \\implies \\lambda = \\frac{1240}{12.09} = \\mathbf{102.6\\text{ nm}}$
   - $2 \\to 1$: $\\Delta E = -3.40 - (-13.6) = 10.20\\text{ eV} \\implies \\lambda = \\frac{1240}{10.20} = \\mathbf{121.6\\text{ nm}}$
2. **Balmer Series ($n_f = 2$, Visible):**
   - $4 \\to 2$: $\\Delta E = -0.85 - (-3.40) = 2.55\\text{ eV} \\implies \\lambda = \\frac{1240}{2.55} = \\mathbf{486.2\\text{ nm}}$ (Cyan/Green $H_\\beta$)
   - $3 \\to 2$: $\\Delta E = -1.51 - (-3.40) = 1.89\\text{ eV} \\implies \\lambda = \\frac{1240}{1.89} = \\mathbf{656.3\\text{ nm}}$ (Red $H_\\alpha$)
3. **Paschen Series ($n_f = 3$, Infrared):**
   - $4 \\to 3$: $\\Delta E = -0.85 - (-1.51) = 0.66\\text{ eV} \\implies \\lambda = \\frac{1240}{0.66} = \\mathbf{1875.1\\text{ nm}}$ (IR)

**3. The Physical Reality (Concrete):**
Electrons in an excited atom do not slide down a continuous ramp; they descend via discrete quantum jumps. In an ensemble containing billions of excited atoms, some electrons take the express elevator straight to the ground floor ($4 \\to 1$), while others stop at intermediate floors ($4 \\to 3 \\to 2 \\to 1$), simultaneously producing infrared, visible, and ultraviolet photons across the sample.`;
      }

      return `### **SOCRATIC SANDBOX: The Electron Elevator**

**1. System Initialization (The Setup):**
A gas sample of atomic hydrogen is excited such that all electrons are pumped into the $n = 4$ principal quantum state:
$$E_4 = -\\frac{13.6\\text{ eV}}{4^2} = -0.85\\text{ eV}$$

**2. The Parameter Shift (The Perturbation):**
The external excitation is abruptly switched off. The electrons are permitted to spontaneously de-excite to the ground state ($n = 1$, $E_1 = -13.6\\text{ eV}$) through all physically permitted radiative cascades.

**3. Socratic Interrogation (The Challenge):**
1. How many distinct spectral emission lines are produced in total by this ensemble? State the general combinatoric formula $N = \\frac{n(n-1)}{2}$.
2. Identify which specific transitions terminate on $n_f = 2$ (Balmer series) and $n_f = 3$ (Paschen series). Which of all lines has the shortest wavelength and what spectral band does it occupy?

> **[STOP GENERATING HERE]**
> *Awaiting Student Hypothesis & Physical Justification before revealing mathematical resolution...*
> *(To check your predictions, submit your explanation or type: \`/sandbox elevator resolution\`)*`;
    }

    // 7. Chapter 3: Quantum Address Invalid
    if (query.includes("address") || query.includes("invalid") || query.includes("quantum numbers")) {
      if (isResolution) {
        return `### **SOCRATIC RESOLUTION: Quantum Address Invalid**

**1. Validate & Correct:**
- *Physical Violation:* The proposed state $(n = 2, l = 2, m_l = 0, m_s = +1/2)$ is strictly forbidden because the orbital angular momentum quantum number $l$ is mathematically bounded by $0 \\le l \\le n - 1$. For $n = 2$, the maximum allowable $l$ is $1$. A $d$-subshell ($l = 2$) requires at least $n = 3$.
- *Available Subshells & Capacity:* For $n = 2$, only $l = 0$ ($2s$) and $l = 1$ ($2p$) exist. The maximum electron capacity of the $n = 2$ shell is $2n^2 = 2(2)^2 = 8$ electrons.

**2. The Mathematical Reality (Abstract):**
In spherical coordinate separation of variables $\\psi(r, \\theta, \\phi) = R(r) \\Theta(\\theta) \\Phi(\\phi)$, the radial differential equation requires termination of power series to prevent the wavefunction from blowing up as $r \\to \\infty$:
$$l \\in \\{0, 1, 2, \\dots, n - 1\\}$$
For $n = 2$:
$$l \\in \\{0, 1\\} \\implies 2s\\ (l=0), \\quad 2p\\ (l=1)$$
$l = 2$ would correspond to a "$2d$" orbital, which is mathematically non-existent.
Shell capacity sum:
$$N_{\\max} = 2 \\sum_{l=0}^{n-1} (2l + 1) = 2 \\times [(2(0)+1) + (2(1)+1)] = 2 \\times [1 + 3] = \\boxed{8\\text{ electrons}} = 2n^2$$

**3. The Physical Reality (Concrete):**
Orbital angular momentum creates a repulsive centrifugal barrier in the effective potential $V_{\\text{eff}}(r) = -\\frac{k e^2}{r} + \\frac{l(l+1)\\hbar^2}{2mr^2}$. For $n = 2$, the electron does not possess enough electrostatic binding energy to balance the centrifugal kinetic energy of $l = 2$ ($L = \\sqrt{6}\\hbar$); attempting to place an electron in $l = 2$ at $n = 2$ forces the energy above zero, unbinding the electron from the nucleus.`;
      }

      return `### **SOCRATIC SANDBOX: Quantum Address Invalid**

**1. System Initialization (The Setup):**
In atomic quantum mechanics, the stationary states $\\psi_{n, l, m_l, m_s}(r, \\theta, \\phi)$ of an electron are indexed by four fundamental quantum numbers: Principal $n$, Orbital $l$, Magnetic $m_l$, and Spin $m_s$.

**2. The Parameter Shift (The Perturbation):**
A semiconductor physics paper proposes an anomalous electronic bound state with the quantum address:
$$(n = 2, \\quad l = 2, \\quad m_l = 0, \\quad m_s = +1/2)$$

**3. Socratic Interrogation (The Challenge):**
1. Explain physically and mathematically why this quantum state is strictly forbidden by the solutions to the Schrödinger equation in spherical coordinates.
2. What is the maximum permitted value of $l$ for $n = 2$, what orbital subshells exist in the $n = 2$ shell, and what is the maximum electron capacity of the entire $n = 2$ shell?

> **[STOP GENERATING HERE]**
> *Awaiting Student Hypothesis & Physical Justification before revealing mathematical resolution...*
> *(To check your predictions, submit your explanation or type: \`/sandbox address resolution\`)*`;
    }

    // 8. Chapter 4: The Relativistic Train (Simultaneity Paradox)
    if (query.includes("train") || query.includes("simultaneity") || query.includes("lightning") || query.includes("0.8c")) {
      if (isResolution) {
        return `### **SOCRATIC RESOLUTION: The Relativistic Train**

**1. Validate & Correct:**
- *Non-Simultaneity:* Events that are simultaneous in the platform frame are NOT simultaneous in the moving train frame.
- *Temporal Order:* Train Observer $B$ sees the **Front** lightning strike happen **first**, before the rear strike.
- *Time Difference:* Using the Lorentz transformation for time, the time gap measured by Observer $B$ is $\\Delta t' = \\frac{v L_0}{c^2} = 800\\text{ ns}$.

**2. The Mathematical Reality (Abstract):**
In platform frame $S$, the strikes occur at $(x_F = +L_p/2, t_F = 0)$ and $(x_R = -L_p/2, t_R = 0)$, where $L_p = L_0/\\gamma = 300 / 1.667 = 180\\text{ m}$.
Transforming to train frame $S'$ using $t' = \\gamma\\left(t - \\frac{vx}{c^2}\\right)$:
$$t'_F = \\gamma\\left(0 - \\frac{v (L_p/2)}{c^2}\\right) = -\\frac{\\gamma v L_p}{2c^2} = -\\frac{v L_0}{2c^2}$$
$$t'_R = \\gamma\\left(0 - \\frac{v (-L_p/2)}{c^2}\\right) = +\\frac{v L_0}{2c^2}$$
The time difference between strikes in the train frame is:
$$\\Delta t' = t'_R - t'_F = \\frac{v L_0}{c^2} = \\frac{(0.8c)(300\\text{ m})}{c^2} = \\frac{240\\text{ m}}{3 \\times 10^8\\text{ m/s}} = \\boxed{8.00 \\times 10^{-7}\\text{ s} = 800\\text{ ns}}$$
Because $t'_F < t'_R$, the front lightning strikes $800\\text{ ns}$ **BEFORE** the rear strike in the train frame!

**3. The Physical Reality (Concrete):**
Observer $B$ is rushing toward the light beam coming from the front and fleeing from the light beam coming from the rear. Because the speed of light $c$ is identical in both directions for Observer $B$, and $B$ is at the midpoint of the train, the front light wavefront reaches $B$ first. Since light travels at $c$, Observer $B$ must conclude that the front strike occurred first. Simultaneity is relative: leading clocks in the direction of motion always lag by $\\frac{vx}{c^2}$.`;
      }

      return `### **SOCRATIC SANDBOX: The Relativistic Train**

**1. System Initialization (The Setup):**
A futuristic train of proper length $L_0 = 300\\text{ m}$ travels along straight tracks at relativistic velocity $v = 0.8c$ (Lorentz factor $\\gamma = \\frac{1}{\\sqrt{1 - 0.8^2}} = 1.667$) past a railway station platform. Observer $B$ sits at the exact midpoint of the train; Observer $A$ stands on the platform.

**2. The Parameter Shift (The Perturbation):**
Two lightning bolts strike the front and rear of the train simultaneously according to ground Observer $A$, leaving char marks on both the train and the platform at $t_A = 0$.

**3. Socratic Interrogation (The Challenge):**
1. According to train Observer $B$, do the lightning strikes occur simultaneously? If not, which strike happens first (Front or Rear)?
2. Use the Lorentz transformation for time:
   $$t' = \\gamma\\left(t - \\frac{vx}{c^2}\\right)$$
   to calculate the exact time difference $\\Delta t'$ measured by Observer $B$ between the two strikes.

> **[STOP GENERATING HERE]**
> *Awaiting Student Hypothesis & Physical Justification before revealing mathematical resolution...*
> *(To check your predictions, submit your explanation or type: \`/sandbox train resolution\`)*`;
    }

    // 9. Chapter 4: The Heavy Sprinter (Relativistic Mass & Energy)
    if (query.includes("sprinter") || query.includes("heavy") || query.includes("relativistic mass") || query.includes("0.99c") || query.includes("infinite energy")) {
      if (isResolution) {
        return `### **SOCRATIC RESOLUTION: The Heavy Sprinter**

**1. Validate & Correct:**
- *Lorentz Factor & Mass:* At $0.99c$, $\\gamma = 7.089$, increasing the inertial mass from $1.00\\text{ mg}$ to $7.089\\text{ mg}$ (a $7.09\\times$ increase).
- *Work Required:* Accelerating from $0.10c$ to $0.99c$ requires $W = (\\gamma_2 - \\gamma_1)m_0 c^2 \\approx 5.48 \\times 10^{11}\\text{ J}$ (equivalent to the energy of over $130$ tons of TNT).
- *Speed of Light Barrier:* As $v \\to c$, $\\gamma \\to \\infty$, so relativistic mass and kinetic energy diverge to infinity ($m \\to \\infty, K \\to \\infty$).

**2. The Mathematical Reality (Abstract):**
At $v_1 = 0.10c$:
$$\\gamma_1 = \\frac{1}{\\sqrt{1 - 0.10^2}} = \\frac{1}{\\sqrt{0.99}} = 1.0050$$
At $v_2 = 0.99c$:
$$\\gamma_2 = \\frac{1}{\\sqrt{1 - 0.99^2}} = \\frac{1}{\\sqrt{1 - 0.9801}} = \\frac{1}{\\sqrt{0.0199}} = \\boxed{7.0888}$$
Relativistic inertial mass at $0.99c$:
$$m_2 = \\gamma_2 m_0 = 7.0888 \\times (1.00 \\times 10^{-6}\\text{ kg}) = \\boxed{7.09 \\times 10^{-6}\\text{ kg} = 7.09\\text{ mg}}$$
Work required to accelerate the particle:
$$W = K_2 - K_1 = (\\gamma_2 - \\gamma_1)m_0 c^2 = (7.0888 - 1.0050) \\times (1.00 \\times 10^{-6}\\text{ kg}) \\times (3.00 \\times 10^8\\text{ m/s})^2$$
$$W = 6.0838 \\times 10^{-6} \\times 9.00 \\times 10^{16} = \\boxed{5.48 \\times 10^{11}\\text{ Joules}}$$
Limit behavior as $v \\to c$:
$$\\lim_{v \\to c} \\gamma = \\lim_{v \\to c} \\frac{1}{\\sqrt{1 - v^2/c^2}} = \\infty \\implies \\lim_{v \\to c} W = \\infty$$

**3. The Physical Reality (Concrete):**
In classical mechanics, constant force yields constant acceleration $a = F/m$ indefinitely. In relativistic mechanics, as velocity approaches $c$, energy pumped into the particle stops accelerating it and instead manifests as increased inertia ($m = \\gamma m_0$). To push any object with non-zero rest mass to $c$ would require infinite work—more energy than exists in the observable universe.`;
      }

      return `### **SOCRATIC SANDBOX: The Heavy Sprinter**

**1. System Initialization (The Setup):**
Consider a particle of rest mass $m_0 = 1.00\\text{ mg} = 1.00 \\times 10^{-6}\\text{ kg}$ initially cruising at $v_1 = 0.10c$.

**2. The Parameter Shift (The Perturbation):**
A particle accelerator pumps immense kinetic energy into the particle, driving its velocity to ultra-relativistic speeds:
$$v_2 = 0.99c \\quad \\left(\\frac{v_2}{c} = 0.99\\right)$$

**3. Socratic Interrogation (The Challenge):**
1. Calculate the Lorentz factor $\\gamma_2$ and the resulting relativistic inertial mass $m_2 = \\gamma_2 m_0$ at $0.99c$.
2. How much work $W = (\\gamma_2 - \\gamma_1)m_0 c^2$ was required to accelerate from $0.10c$ to $0.99c$, and what happens to both $m$ and the required energy as $v \\to c$?

> **[STOP GENERATING HERE]**
> *Awaiting Student Hypothesis & Physical Justification before revealing mathematical resolution...*
> *(To check your predictions, submit your explanation or type: \`/sandbox sprinter resolution\`)*`;
    }

    // Default Sandbox Menu
    return `### **MODULE 2: THE /sandbox ENGINE DIRECTORY**
**System Role:** Dedicated Socratic Mental Sandboxing & Interactive Thought-Experiment Module

Select or trigger any of the 9 canonical curriculum thought experiments:

**Chapter 1 (Quantum & Light):**
- \`/sandbox The Blackbody Furnace\` — $T_1 = 3000\\text{ K} \\to 6000\\text{ K}$, Wien displacement $\\lambda_{\\max}$ shift and $T^4$ Stefan-Boltzmann scaling.
- \`/sandbox The Photoelectric Circuit\` — Sodium cathode $\\phi = 2.28\\text{ eV}$ illuminated by intense red laser ($1000\\times$) vs dim violet LED.
- \`/sandbox Billiard Ball Photons\` — Relativistic Compton backscattering at $\\theta = 180^\\circ$ and recoil electron kinetic energy.

**Chapter 2 (Wave Mechanics):**
- \`/sandbox The Shrinking Box\` — Compressing 1D infinite well from $L \\to L/2$ for $n = 3$: energy scaling and probability node invariants.
- \`/sandbox The Leaky Wall\` — Rectangular barrier tunneling $E < V_0$: comparing double width ($2a$) vs double barrier height $(2V_0)$.

**Chapter 3 (Atomic Physics):**
- \`/sandbox The Electron Elevator\` — Hydrogen atom in $n = 4$: total radiative cascade paths $N = n(n-1)/2$, Balmer vs. Paschen lines.
- \`/sandbox Quantum Address Invalid\` — Forbidden state $(n=2, l=2, m_l=0, m_s=1/2)$ and centrifugal barrier analysis.

**Chapter 4 (Relativity):**
- \`/sandbox The Relativistic Train\` — Simultaneity paradox at $0.8c$: resolving temporal strike order and Lorentz time gap $\\Delta t'$.
- \`/sandbox The Heavy Sprinter\` — Relativistic mass increase $m = \\gamma m_0$ from $0.1c \\to 0.99c$ and the infinite energy barrier.

*To check your predictions for any sandbox, reply with your hypothesis or append \`resolution\` (e.g., \`/sandbox box resolution\`)*.`;
  }

  // ==========================================
  // CHAPTER 1: QUANTUM PHYSICS & RADIATION
  // ==========================================

  // 1. Compton Shift Derivation / Lecture
  if (query.includes("compton")) {
    if (isDerive) {
      return `### **DERIVATION: Relativistic Compton Shift Formula**

**1. Premise & Initial State:**
Consider an incident X-ray/gamma photon of energy $E = hf$ and momentum $p = \frac{hf}{c}$ colliding elastically with an isolated, stationary electron of rest mass $m_0$ and rest energy $m_0 c^2$. After scattering at angle $\theta$, the photon has energy $E' = hf'$ and momentum $p' = \frac{hf'}{c}$, while the recoil electron scatters at angle $\phi$ with total relativistic energy $E_e = mc^2 = \sqrt{p_e^2 c^2 + m_0^2 c^4}$ and momentum $\vec{p}_e$.

**2. Step-by-Step Evolution:**

*Step 1: Formulate Relativistic Conservation of Total Energy*
$$hf + m_0 c^2 = hf' + mc^2$$

*Step 2: Isolate the Recoil Electron Energy Term*
Subtract $hf'$ from both sides of Step 1:
$$mc^2 = h(f - f') + m_0 c^2$$

*Step 3: Square Both Sides of the Energy Equation*
Expanding the binomial $(A + B)^2 = A^2 + 2AB + B^2$:
$$m^2 c^4 = h^2(f - f')^2 + 2h(f - f')m_0 c^2 + m_0^2 c^4$$
$$m^2 c^4 = h^2(f^2 - 2ff' + f'^2) + 2h(f - f')m_0 c^2 + m_0^2 c^4$$

*Step 4: Formulate Vector Conservation of Linear Momentum*
$$\vec{p} = \vec{p}' + \vec{p}_e \implies \vec{p}_e = \vec{p} - \vec{p}'$$

*Step 5: Compute the Dot Product of the Recoil Momentum*
Taking the scalar product $\vec{p}_e \cdot \vec{p}_e$:
$$p_e^2 = p^2 + p'^2 - 2 p p' \cos\theta$$

*Step 6: Multiply the Momentum Equation by $c^2$ and Substitute Photon Momentum $p = hf/c$*
$$p_e^2 c^2 = (hf)^2 + (hf')^2 - 2(hf)(hf')\cos\theta$$

*Step 7: Apply the Invariant Relativistic Energy-Momentum Relation*
From special relativity, $E^2 - p^2 c^2 = m_0^2 c^4$:
$$m^2 c^4 - p_e^2 c^2 = m_0^2 c^4$$

*Step 8: Subtract Step 6 from Step 3*
$$[h^2(f^2 - 2ff' + f'^2) + 2h(f - f')m_0 c^2 + m_0^2 c^4] - [h^2 f^2 + h^2 f'^2 - 2 h^2 ff' \cos\theta] = m_0^2 c^4$$
Cancelling $h^2 f^2$, $h^2 f'^2$, and $m_0^2 c^4$ on both sides:
$$-2h^2 ff' + 2h(f - f')m_0 c^2 + 2h^2 ff' \cos\theta = 0$$

*Step 9: Factor and Rearrange Terms*
$$2h(f - f')m_0 c^2 = 2h^2 ff'(1 - \cos\theta)$$
Dividing both sides by $2h m_0 c^2 (ff')$:
$$\frac{f - f'}{ff'} = \frac{h}{m_0 c^2}(1 - \cos\theta) \implies \frac{1}{f'} - \frac{1}{f} = \frac{h}{m_0 c^2}(1 - \cos\theta)$$

*Step 10: Convert Frequency Difference to Wavelengths using $\lambda = c/f$*
Multiplying both sides by the speed of light $c$:
$$\frac{c}{f'} - \frac{c}{f} = \frac{h}{m_0 c}(1 - \cos\theta)$$
$$\Delta\lambda = \lambda' - \lambda = \frac{h}{m_0 c}(1 - \cos\theta) = \lambda_c (1 - \cos\theta)$$

**3. The Physical Check:**
> $$\boxed{\Delta\lambda = \lambda' - \lambda = \frac{h}{m_0 c}(1 - \cos\theta) = \lambda_c (1 - \cos\theta)}$$
where Compton wavelength $\lambda_c = \frac{h}{m_0 c} = 2.426 \times 10^{-12}\text{ m} = 2.43\text{ pm} = 0.0243\text{ \AA}$.

*Reality Verification:*
- At $\theta = 0^\circ$ (forward transmission): $\cos 0^\circ = 1 \implies \Delta\lambda = 0$. The photon bypasses without collision; no energy is imparted.
- At $\theta = 90^\circ$ (transverse deflection): $\cos 90^\circ = 0 \implies \Delta\lambda = \lambda_c = 2.43\text{ pm}$.
- At $\theta = 180^\circ$ (direct backscattering): $\cos 180^\circ = -1 \implies \Delta\lambda = 2\lambda_c = 4.85\text{ pm}$. The photon bounces directly backward, imparting maximum kinetic energy $K_{\max} = \frac{2 h f^2}{m_0 c^2 + 2 h f}$ to the electron.
- Classical Limit: If $h \to 0$ or $m_0 \to \infty$ (tightly bound inner-shell electron), $\Delta\lambda \to 0$, returning to Thomson classical scattering with zero wavelength shift.`;
    }

    return `### **LECTURE: Compton Scattering & Relativistic Photon Kinematics**

**1. Axiomatic Foundation (The "Why"):**
Classical electrodynamics (Thomson scattering) asserts that when an electromagnetic wave of frequency $f$ impinges upon a charged particle, the particle oscillates at that *exact identical frequency* $f$ and consequently re-radiates electromagnetic waves of identical wavelength ($\lambda' = \lambda$). In 1923, Arthur Compton discovered that when monochromatic X-rays scatter off graphite electrons, the scattered radiation contains a shifted wavelength $\lambda' > \lambda$ that increases with scattering angle $\theta$. Classical physics is fundamentally incapable of explaining a wavelength increase without violating Maxwell's wave theory.

**2. The Double-Immersive Core (The "What"):**

*Track A: The Abstract (Mathematical Formulation)*
The interaction is modeled as a relativistic, elastic two-body collision between a massless photon and a stationary electron.
Governing Equation:
$$\Delta\lambda = \lambda' - \lambda = \frac{h}{m_0 c}(1 - \cos\theta) = \lambda_c (1 - \cos\theta)$$
Variable & Unit Definitions:
- $\lambda$: Incident photon wavelength $[\text{m or pm, } 1\text{ pm} = 10^{-12}\text{ m}]$.
- $\lambda'$: Scattered photon wavelength $[\text{m or pm}]$.
- $\Delta\lambda$: Compton wavelength shift $[\text{m or pm}]$.
- $h = 6.626 \times 10^{-34}\text{ J}\cdot\text{s}$: Planck's universal constant.
- $m_0 = 9.109 \times 10^{-31}\text{ kg}$: Electron rest mass.
- $c = 2.998 \times 10^8\text{ m/s}$: Speed of light in vacuum.
- $\lambda_c = \frac{h}{m_0 c} = 2.426 \times 10^{-12}\text{ m} = 2.43\text{ pm} = 0.0243\text{ \AA}$: Compton wavelength.
- $\theta$: Photon scattering angle measured relative to the incident forward trajectory $[0^\circ \le \theta \le 180^\circ]$.

*Track B: The Concrete (Physical Analogy & Mental Sandbox)*
Imagine a high-speed cue ball (the X-ray photon) colliding elastically with a stationary 8-ball (the electron) on a frictionless pool table. If the cue ball merely grazes the edge of the 8-ball ($\theta \approx 0^\circ$), it continues forward at full momentum and loses almost no energy. But if it hits head-on and ricochets straight backwards ($\theta = 180^\circ$), it transfers maximum kinetic impulse to the 8-ball, causing the photon to rebound with degraded momentum and longer wavelength.

**3. Boundary Conditions & Limits:**
- Grazing Collision ($\theta \to 0^\circ$): $\Delta\lambda \to 0$, photon retains 100% of its initial energy.
- Orthogonal Scattering ($\theta = 90^\circ$): $\Delta\lambda = \lambda_c = 2.43\text{ pm}$.
- Full Backscattering ($\theta = 180^\circ$): $\Delta\lambda = 2\lambda_c = 4.85\text{ pm}$. Maximum kinetic energy transferred to electron.
- Tightly Bound Electron Limit: If the electron is tightly bound to a nucleus of mass $M \gg m_0$, then $m_0$ in the denominator is replaced by $M$. Since $M \approx 40,000\,m_0$, the shift $\Delta\lambda \to 0$. This explains why the unshifted Thomson peak is always observed alongside the shifted Compton peak in solid targets!

**4. Exam Trap Warning:**
*Modern Academy Exam Trap:* Students frequently assume the maximum wavelength shift occurs at $\theta = 90^\circ$ because $\lambda_c$ appears there. In reality, the maximum shift is **$2\lambda_c = 4.85\text{ pm}$ at $\theta = 180^\circ$**! Furthermore, remember that $\Delta\lambda$ depends **ONLY on $\theta$**, never on the incident frequency $f$ or target material.`;
  }

  // 2. Photoelectric Effect Derivation / Lecture
  if (query.includes("photoelectric") || query.includes("work function") || query.includes("stopping potential")) {
    if (isDerive) {
      return `### **DERIVATION: Einstein's Photoelectric Energy Equation & Stopping Potential**

**1. Premise & Initial State:**
Consider monochromatic electromagnetic radiation of frequency $f$ incident upon a clean metallic photocathode. According to Einstein's light-quantum hypothesis, radiant energy is quantized into localized packets (photons) of energy $E = hf$. Each photon interacts in an all-or-nothing event with a single conduction electron located in the surface Fermi sea of the metal lattice.

**2. Step-by-Step Evolution:**

*Step 1: Conservation of Energy for 1-to-1 Photon-Electron Absorption*
The absorbed photon energy $hf$ is distributed into overcoming the surface potential energy barrier (Work Function $\phi$) plus supplying kinetic energy $K$ to the ejected photoelectron:
$$E_{\text{photon}} = \phi + K_e \implies hf = \phi + K_e$$

*Step 2: Isolate Kinetic Energy for the Most Energetic Electrons*
Electrons originating directly from the Fermi level lose the minimum possible energy $\phi$ during escape, emerging with maximum kinetic energy $K_{\max}$:
$$K_{\max} = hf - \phi$$

*Step 3: Define the Threshold (Cutoff) Frequency $f_c$*
At the exact threshold condition, the incoming photon has just enough energy to liberate an electron with zero residual kinetic energy ($K_{\max} = 0$):
$$hf_c - \phi = 0 \implies \phi = h f_c = \frac{hc}{\lambda_c}$$

*Step 4: Relate Kinetic Energy to Electrostatic Stopping Potential $V_0$*
In a retarding electrostatic field between the photocathode and anode, a reverse potential $V_0$ does negative work $W = -e V_0$ against the photoelectrons. The stopping potential is reached when even the fastest electrons are brought to rest just before reaching the collector:
$$e V_0 = K_{\max} = \frac{1}{2}m_e v_{\max}^2$$

*Step 5: Substitute $e V_0$ into the Einstein Equation*
$$e V_0 = hf - \phi$$
Dividing through by the fundamental electron charge $e$:
$$V_0 = \left(\frac{h}{e}\right)f - \frac{\phi}{e} = \left(\frac{hc}{e}\right)\frac{1}{\lambda} - \frac{\phi}{e}$$

**3. The Physical Check:**
> $$\boxed{hf = \phi + K_{\max} = \phi + e V_0 \implies V_0 = \left(\frac{h}{e}\right)f - \frac{\phi}{e}}$$

*Reality Verification:*
- The graph of stopping potential $V_0$ versus frequency $f$ is an exact straight line with universal slope $\frac{h}{e} = 4.136 \times 10^{-15}\text{ V}\cdot\text{s}$, strictly independent of the metal chosen.
- The horizontal intercept is the cutoff frequency $f_c = \phi/h$.
- The vertical intercept is the negative work function in volts: $-V_c = -\phi/e$.
- If $f < f_c$, then $hf < \phi \implies K_{\max} < 0$, which is physically forbidden; hence zero photoelectrons are emitted regardless of beam intensity.`;
    }

    return `### **LECTURE: Photoelectric Effect & Quantum Absorption**

**1. Axiomatic Foundation (The "Why"):**
Classical electromagnetic wave theory dictates that wave energy is proportional to intensity $I \propto |\vec{E}|^2$, continuous in space and time. Classical theory makes three definitive predictions:
1. Increasing light intensity should increase electron kinetic energy.
2. Given sufficient time, light of any wavelength (even infrared) should eventually deposit enough accumulated energy to eject an electron.
3. At low intensities, there should be a measurable time lag (minutes to hours) as electrons absorb energy.
All three classical predictions are flatly contradicted by experiment: emission is instantaneous ($< 10^{-9}\text{ s}$), emission ceases completely below a strict threshold frequency $f_c$ regardless of intensity, and electron kinetic energy depends solely on light frequency $f$.

**2. The Double-Immersive Core (The "What"):**

*Track A: The Abstract (Mathematical Formulation)*
$$hf = \phi + K_{\max} = \phi + e V_0$$
$$V_0 = \left(\frac{h}{e}\right)f - \frac{\phi}{e}$$
Definitions & Units:
- $h = 6.63 \times 10^{-34}\text{ J}\cdot\text{s} = 4.136 \times 10^{-15}\text{ eV}\cdot\text{s}$: Planck's constant.
- $f = c/\lambda$: Frequency of incident radiation $[\text{Hz or s}^{-1}]$.
- $\phi = h f_c = hc/\lambda_c$: Work function of metal surface $[\text{J or eV}]$.
- $K_{\max} = \frac{1}{2}m_e v_{\max}^2$: Maximum photoelectron kinetic energy $[\text{J or eV}]$.
- $V_0$: Retarding stopping potential $[\text{Volts, V}]$.
- $e = 1.602 \times 10^{-19}\text{ C}$: Elementary electron charge.

*Track B: The Concrete (Physical Analogy & Mental Sandbox)*
The Vending Machine Token Sandbox: Consider a soda machine that requires a $2 token ($\phi = 2\text{ eV}$) to dispense a can. If you pump in a billion 50-cent coins (high-intensity red light), the slot rejects every individual coin; zero cans drop. But if you insert a single $5 bill (high-frequency UV photon), the machine immediately accepts the transaction, drops the can, and returns $3 in coin change ($K_{\max} = 3\text{ eV}$). Increasing light intensity simply inserts more $5 bills per second, ejecting more cans (higher photocurrent), but every ejected can still arrives with the exact same $3 of change!

**3. Boundary Conditions & Limits:**
- Below Threshold ($f < f_c$): $K_{\max} < 0$ (unphysical); photocurrent $I_p \equiv 0$.
- At Threshold ($f = f_c$): $K_{\max} = 0$, $V_0 = 0$; electrons are liberated with zero velocity.
- High Frequency Limit ($hf \gg \phi$): $K_{\max} \approx hf$; binding energy becomes negligible and atomic electrons behave as quasi-free targets.

**4. Exam Trap Warning:**
*Modern Academy Exam Trap:* Students routinely confuse **intensity** with **frequency**. Remember:
- Intensity controls **number of ejected electrons per second (photocurrent $I$)**.
- Frequency controls **maximum kinetic energy ($K_{\max}$) and stopping potential ($V_0$)**.
- Doubling intensity at constant frequency doubles the saturation current, but leaves the stopping potential $V_0$ completely unchanged!`;
  }

  // 3. Blackbody Radiation, Wien & Stefan-Boltzmann
  if (query.includes("blackbody") || query.includes("stefan") || query.includes("wien") || query.includes("rayleigh")) {
    if (isDerive) {
      return `### **DERIVATION: Stefan-Boltzmann Law & Wien's Displacement Law from Planck's Radiation Law**

**1. Premise & Initial State:**
Start from Planck's spectral energy density of blackbody radiation:
$$u(\lambda, T) = \frac{8\pi h c}{\lambda^5 \left(e^{\frac{hc}{\lambda k_B T}} - 1\right)}$$
or in spectral radiant emissive power:
$$I(\lambda, T) = \frac{c}{4} u(\lambda, T) = \frac{2\pi h c^2}{\lambda^5 \left(e^{\frac{hc}{\lambda k_B T}} - 1\right)}$$

**2. Step-by-Step Evolution:**

*Part A: Derivation of Wien's Displacement Law ($\lambda_{\max} T = \text{constant}$)*

*Step 1: Set First Derivative of $I(\lambda, T)$ with respect to $\lambda$ to Zero*
$$\frac{\partial I(\lambda, T)}{\partial \lambda} = 0$$

*Step 2: Differentiate Planck's Formula using the Quotient Rule*
Let $x = \frac{hc}{\lambda k_B T} \implies \lambda = \frac{hc}{x k_B T}$ and $d\lambda = -\frac{hc}{k_B T x^2} dx$.
Differentiating $\lambda^{-5}(e^x - 1)^{-1}$ with respect to $\lambda$:
$$\frac{d}{d\lambda}\left[\lambda^{-5}(e^x - 1)^{-1}\right] = -5\lambda^{-6}(e^x - 1)^{-1} - \lambda^{-5}(e^x - 1)^{-2} e^x \left(-\frac{hc}{\lambda^2 k_B T}\right) = 0$$

*Step 3: Factor out Common Terms*
Multiplying by $\lambda^6 (e^x - 1)^2$:
$$-5(e^x - 1) + \frac{hc}{\lambda k_B T} e^x = 0$$
Substitute $\frac{hc}{\lambda k_B T} = x$:
$$-5(e^x - 1) + x e^x = 0 \implies \frac{x e^x}{e^x - 1} = 5 \implies 1 - e^{-x} = \frac{x}{5}$$

*Step 4: Solve Transcendental Equation Numerically*
The non-zero root of $x e^x = 5(e^x - 1)$ yields:
$$x \approx 4.96511423$$

*Step 5: Substitute Definition of $x$ to find $\lambda_{\max}$*
$$\frac{hc}{\lambda_{\max} k_B T} = 4.9651 \implies \lambda_{\max} T = \frac{hc}{4.9651 k_B} = b$$
Evaluating constants:
$$b = \frac{(6.626 \times 10^{-34}\text{ J}\cdot\text{s})(2.998 \times 10^8\text{ m/s})}{4.9651 \times (1.381 \times 10^{-23}\text{ J/K})} \approx 2.898 \times 10^{-3}\text{ m}\cdot\text{K}$$

---

*Part B: Derivation of Stefan-Boltzmann Law ($I_{\text{total}} = \sigma T^4$)*

*Step 6: Formulate Total Emissive Power by Integrating over all Wavelengths*
$$I_{\text{total}} = \int_0^\infty I(\lambda, T) d\lambda = \int_0^\infty \frac{2\pi h c^2}{\lambda^5 (e^{\frac{hc}{\lambda k_B T}} - 1)} d\lambda$$

*Step 7: Execute Change of Variable $x = \frac{hc}{\lambda k_B T}$*
When $\lambda \to 0$, $x \to \infty$; when $\lambda \to \infty$, $x \to 0$.
$$\lambda = \frac{hc}{k_B T x}, \quad d\lambda = -\frac{hc}{k_B T x^2} dx$$

*Step 8: Substitute into the Integral*
$$I_{\text{total}} = \int_\infty^0 \frac{2\pi h c^2 \left(\frac{k_B T x}{hc}\right)^5}{e^x - 1} \left(-\frac{hc}{k_B T x^2} dx\right) = 2\pi h c^2 \left(\frac{k_B T}{hc}\right)^4 \int_0^\infty \frac{x^3}{e^x - 1} dx$$

*Step 9: Evaluate the Definite Riemann Zeta Integral*
Using the standard mathematical identity $\int_0^\infty \frac{x^3}{e^x - 1} dx = \Gamma(4)\zeta(4) = 6 \times \frac{\pi^4}{90} = \frac{\pi^4}{15}$:
$$I_{\text{total}} = 2\pi h c^2 \left(\frac{k_B T}{hc}\right)^4 \left(\frac{\pi^4}{15}\right) = \left(\frac{2\pi^5 k_B^4}{15 c^2 h^3}\right) T^4$$

*Step 10: Define the Stefan-Boltzmann Constant $\sigma$*
$$\sigma = \frac{2\pi^5 k_B^4}{15 c^2 h^3} = 5.6704 \times 10^{-8}\text{ W}\cdot\text{m}^{-2}\cdot\text{K}^{-4}$$

**3. The Physical Check:**
> $$\boxed{\lambda_{\max} T = 2.898 \times 10^{-3}\text{ m}\cdot\text{K} \quad \text{and} \quad I_{\text{total}} = \sigma T^4}$$

*Reality Verification:*
- When a metal object is heated, its color shifts progressively: dull red $\to$ orange $\to$ bright yellow $\to$ blue-white, perfectly conforming to $\lambda_{\max} \propto 1/T$.
- Doubling the absolute temperature of an object increases its total radiated power by $2^4 = 16\times$, explaining why furnace radiation escalates violently with temperature.`;
    }

    return `### **LECTURE: Blackbody Radiation & The Ultraviolet Catastrophe**

**1. Axiomatic Foundation (The "Why"):**
Classical physics applied the Equipartition Theorem to electromagnetic standing waves inside a cavity, predicting the Rayleigh-Jeans Law:
$$I(\lambda, T) = \frac{2\pi c k_B T}{\lambda^4}$$
As wavelength $\lambda \to 0$ (ultraviolet, X-ray, and gamma frequencies), $I(\lambda, T) \to \infty$. This divergent collapse was dubbed the **Ultraviolet Catastrophe** by Paul Ehrenfest. A single warm toaster would instantaneously vaporize the universe in a burst of infinite gamma radiation!

**2. The Double-Immersive Core (The "What"):**

*Track A: The Abstract (Mathematical Formulation)*
Planck solved the catastrophe by asserting that cavity atomic resonators cannot radiate continuously, but only in discrete packets $E_n = n h f$.
Planck's Radiation Law:
$$I(\lambda, T) = \frac{2\pi h c^2}{\lambda^5 \left(e^{\frac{hc}{\lambda k_B T}} - 1\right)}$$
Stefan-Boltzmann Total Radiated Power:
$$P = \sigma A \varepsilon T^4, \quad \sigma = 5.67 \times 10^{-8}\text{ W}\cdot\text{m}^{-2}\cdot\text{K}^{-4}$$
Wien's Displacement Law:
$$\lambda_{\max} T = 2.898 \times 10^{-3}\text{ m}\cdot\text{K}$$

*Track B: The Concrete (Physical Analogy & Mental Sandbox)*
The Wealthy Club Entry Sandbox: Imagine an exclusive club where entry requires paying in exact cash multiples of $hf$. For red/infrared modes, $hf$ is small (pennies); ambient thermal energy ($k_B T$) easily affords entry. For ultraviolet modes, the entry price ($hf$) is billions of dollars! Even though thermal fluctuations exist, the Boltzmann factor $e^{-hf/k_B T}$ ensures the probability of exciting even a single UV quantum is zero. High-frequency modes are "frozen out" thermally.

**3. Boundary Conditions & Limits:**
- Long Wavelengths ($\lambda \to \infty$): $e^{hc/\lambda k_B T} \approx 1 + \frac{hc}{\lambda k_B T}$. Planck's law reduces smoothly to the classical Rayleigh-Jeans law.
- Short Wavelengths ($\lambda \to 0$): The exponential denominator $e^{hc/\lambda k_B T} \to \infty$ completely overwhelms $\lambda^5$, driving $I(\lambda, T) \to 0$ and eradicating the UV catastrophe.

**4. Exam Trap Warning:**
*Modern Academy Exam Trap:* Temperature MUST be converted to **Kelvin** ($T_K = T_{^\circ\text{C}} + 273.15$). Failing to convert Celsius to Kelvin in $\sigma T^4$ or $\lambda_{\max} T = 2.898 \times 10^{-3}$ guarantees an incorrect answer!`;
  }

  // ==========================================
  // CHAPTER 2: WAVE MECHANICS & BOUND STATES
  // ==========================================

  // 4. Infinite Square Well Derivation / Lecture
  if (query.includes("infinite square well") || query.includes("particle in a box") || (query.includes("box") && query.includes("eigen"))) {
    if (isDerive) {
      return `### **DERIVATION: Infinite Square Well Wavefunctions & Energy Eigenvalues**

**1. Premise & Initial State:**
Consider a non-relativistic particle of mass $m$ confined to a one-dimensional potential well defined by:
$$U(x) = \\begin{cases} 0 & \\text{for } 0 \\le x \\le L \\\\ \\infty & \\text{for } x < 0 \\text{ or } x > L \\end{cases}$$
The governing Time-Independent Schrödinger Equation (TISE) is:
$$-\\frac{\\hbar^2}{2m}\\frac{d^2 \\psi(x)}{dx^2} + U(x)\\psi(x) = E\\psi(x)$$

**2. Step-by-Step Evolution:**

*Step 1: Formulate the Differential Equation inside the Well ($U(x) = 0$)*
$$-\\frac{\\hbar^2}{2m}\\frac{d^2 \\psi}{dx^2} = E\\psi \\implies \\frac{d^2 \\psi}{dx^2} + \\frac{2mE}{\\hbar^2}\\psi = 0$$

*Step 2: Define Wave Number $k$*
Let $k^2 = \\frac{2mE}{\\hbar^2} > 0$. The equation becomes the standard harmonic oscillator ODE:
$$\\frac{d^2 \\psi}{dx^2} + k^2 \\psi = 0$$

*Step 3: Write the General Solution*
$$\\psi(x) = A\\sin(kx) + B\\cos(kx)$$

*Step 4: Apply Boundary Condition at Left Wall ($x = 0$)*
Because potential $U = \\infty$ outside the well, $\\psi(x) = 0$ for $x \\le 0$. By continuity of the wavefunction:
$$\\psi(0) = A\\sin(0) + B\\cos(0) = 0 \\implies B(1) = 0 \\implies B = 0$$
The solution simplifies to:
$$\\psi(x) = A\\sin(kx)$$

*Step 5: Apply Boundary Condition at Right Wall ($x = L$)*
Continuity requires $\\psi(L) = 0$:
$$\\psi(L) = A\\sin(kL) = 0$$
Since $A \\ne 0$ (otherwise $\\psi \\equiv 0$ yields a trivial unphysical state of zero particles), the sine argument must vanish:
$$kL = n\\pi \\implies k_n = \\frac{n\\pi}{L}, \\quad n = 1, 2, 3, \\dots$$
*(Note: $n = 0$ gives $\\psi(x) = 0$ everywhere, violating normalization).*

*Step 6: Derive Energy Eigenvalues from $k_n$*
Equating $k_n = \\frac{n\\pi}{L}$ to $k^2 = \\frac{2mE}{\\hbar^2}$:
$$\\frac{2m E_n}{\\hbar^2} = \\left(\\frac{n\\pi}{L}\\right)^2 \\implies E_n = \\frac{n^2 \\pi^2 \\hbar^2}{2m L^2}$$
Substituting $\\hbar = \\frac{h}{2\\pi}$:
$$E_n = \\frac{n^2 \\pi^2 (h/2\\pi)^2}{2m L^2} = \\frac{n^2 h^2}{8m L^2} = n^2 E_1$$

*Step 7: Normalize the Wavefunction $\\psi_n(x)$*
Apply the total probability normalization axiom $\\int_0^L |\\psi_n(x)|^2 dx = 1$:
$$A^2 \\int_0^L \\sin^2\\left(\\frac{n\\pi x}{L}\\right)dx = 1$$
Using the trigonometric identity $\\sin^2(\\theta) = \\frac{1 - \\cos(2\\theta)}{2}$:
$$A^2 \\int_0^L \\frac{1 - \\cos\\left(\\frac{2n\\pi x}{L}\\right)}{2} dx = A^2 \\left[ \\frac{x}{2} - \\frac{\\sin(2n\\pi x/L)}{4n\\pi/L} \\right]_0^L = A^2 \\left(\\frac{L}{2} - 0\\right) = 1$$
$$A^2 \\frac{L}{2} = 1 \\implies A = \\sqrt{\\frac{2}{L}}$$

**3. The Physical Check:**
> $$\boxed{\\psi_n(x) = \\sqrt{\\frac{2}{L}}\\sin\\left(\\frac{n\\pi x}{L}\\right), \\quad E_n = \\frac{n^2 h^2}{8mL^2} = n^2 E_1, \\quad n = 1, 2, 3, \\dots}$$

*Reality Verification:*
- **Zero-Point Energy:** The ground state energy $E_1 = \\frac{h^2}{8mL^2} > 0$. A particle can NEVER have zero energy! If $E = 0$, then momentum $p = 0$ and $\\Delta p = 0$, which would require $\\Delta x \\to \\infty$, directly contradicting confinement inside box width $L$.
- **Lobe Symmetries:** For state $n=2$, a node exists at the center $x = L/2$ ($\\psi_2(L/2) = 0$). Probability in either half $[0, L/2]$ or $[L/2, L]$ is precisely $50\\%$.`;
    }

    return `### **LECTURE: Infinite Square Well & Quantized Energy Eigenvalues**

**1. Axiomatic Foundation (The "Why"):**
Classically, a particle trapped between two rigid, immovable walls bounces back and forth with constant speed $v$ and any arbitrary continuous kinetic energy $E = \\frac{1}{2}mv^2 \\ge 0$. In quantum mechanics, because the electron possesses matter wave characteristics (de Broglie hypothesis $\\lambda = h/p$), boundary constraints enforce wave node confinement, quantizing permissible momenta and creating discrete, non-continuous energy levels.

**2. The Double-Immersive Core (The "What"):**

*Track A: The Abstract (Mathematical Formulation)*
$$\\psi_n(x) = \\sqrt{\\frac{2}{L}}\\sin\\left(\\frac{n\\pi x}{L}\\right)$$
$$E_n = \\frac{n^2 \\pi^2 \\hbar^2}{2m L^2} = \\frac{n^2 h^2}{8m L^2} = n^2 E_1$$
Definitions & Units:
- $L$: Width of the 1D box $[\text{m or nm}]$.
- $m$: Particle mass $[\text{kg}] = 9.11 \\times 10^{-31}\text{ kg}$ for an electron.
- $n \\in \\{1, 2, 3, \\dots\\}$: Principal quantum number.
- $\\psi_n(x)$: Stationary state eigenfunction $[\text{m}^{-1/2}]$.
- $E_1 = \\frac{h^2}{8mL^2}$: Ground-state zero point energy $[\text{J or eV}]$.

*Track B: The Concrete (Physical Analogy & Mental Sandbox)*
Acoustic Organ Pipe / Pinned Guitar String Sandbox: Consider a guitar string anchored immovably at $x=0$ and $x=L$. You can pluck fundamental tones ($n=1$) or overtones ($n=2, 3, \\dots$), but you cannot produce a wave whose wavelength doesn't satisfy $L = n\\frac{\\lambda}{2}$. An electron in a box is literally an acoustic matter standing wave!

**3. Boundary Conditions & Limits:**
- Correspondence Principle ($n \\to \\infty$): Energy spacing $\\Delta E = E_{n+1} - E_n = (2n+1)E_1$. The fractional energy difference $\\frac{\\Delta E}{E_n} \\approx \\frac{2}{n} \\to 0$. At large $n$, levels blend into a classical continuum.
- Infinite Box Limit ($L \\to \\infty$): Energy eigenvalues $E_n \\propto 1/L^2 \\to 0$; quantization collapses into free-particle continuous spectrum.

**4. Exam Trap Warning:**
*Modern Academy Exam Trap:* Students frequently set $n=0$, obtaining $E_0 = 0$. In an infinite square well, **$n=0$ is strictly forbidden** by Heisenberg's Uncertainty Principle! Confinement $\\Delta x \\le L$ necessitates $\\Delta p \\ge \\frac{\\hbar}{2L}$, guaranteeing non-zero ground state kinetic energy.`;
  }

  // 5. De Broglie Wavelength Derivation / Lecture
  if (query.includes("de broglie") || query.includes("matter wave")) {
    if (isDerive) {
      return `### **DERIVATION: The de Broglie Matter Wavelength**

**1. Premise & Initial State:**
In 1924, Louis de Broglie hypothesized that if light waves exhibit particle characteristics (photons with momentum $p = E/c$), then material particles must reciprocally exhibit wave properties.
Start from Einstein's mass-energy equivalence:
$$E = mc^2$$
and Planck's photon energy relation:
$$E = hf = \\frac{hc}{\\lambda}$$

**2. Step-by-Step Evolution:**

*Step 1: Equate Energy Expressions for a Photonic Quantum*
$$mc^2 = \\frac{hc}{\\lambda}$$

*Step 2: Isolate Wavelength $\\lambda$*
Dividing both sides by $c$:
$$mc = \\frac{h}{\\lambda} \\implies \\lambda = \\frac{h}{mc}$$

*Step 3: Generalize to Massive Matter Particles Traveling at Non-Relativistic Speed $v$*
Replace photon momentum $p = mc$ with massive particle momentum $p = mv$:
$$\\lambda = \\frac{h}{p} = \\frac{h}{mv}$$

*Step 4: Express Wavelength in Terms of Kinetic Energy $K$*
Since classical kinetic energy is $K = \\frac{p^2}{2m} \\implies p = \\sqrt{2mK}$:
$$\\lambda = \\frac{h}{\\sqrt{2mK}}$$

*Step 5: Express Wavelength for an Electron Accelerated by Potential $V$*
Since $K = qV = eV$:
$$\\lambda = \\frac{h}{\\sqrt{2m e V}}$$
Evaluating constants for an electron ($m_e = 9.11 \\times 10^{-31}\text{ kg}, e = 1.60 \\times 10^{-19}\text{ C}, h = 6.63 \\times 10^{-34}\text{ J}\\cdot\\text{s}$):
$$\\lambda = \\frac{1.226 \\times 10^{-9}}{\\sqrt{V}}\\text{ m} = \\frac{1.226}{\\sqrt{V}}\\text{ nm} = \\sqrt{\\frac{150}{V}}\\text{ \\AA}$$

**3. The Physical Check:**
> $$\boxed{\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mK}} = \\frac{1.226\\text{ nm}}{\\sqrt{V}}}$$

*Reality Verification:*
- An electron accelerated through $V = 54\\text{ V}$ (Davisson-Germer experiment):
  $$\\lambda = \\frac{1.226\\text{ nm}}{\\sqrt{54}} = 0.167\\text{ nm} = 1.67\\text{ \\AA}$$
  This matches the atomic spacing of nickel crystal planes, producing intense Bragg diffraction identical to X-rays!
- Macroscopic object: A 150g baseball thrown at 40 m/s has $\\lambda = \\frac{6.63 \\times 10^{-34}}{0.15 \\times 40} = 1.1 \\times 10^{-34}\\text{ m}$, completely undetectable.`;
    }

    return `### **LECTURE: De Broglie Matter Waves & Wave-Particle Duality**

**1. Axiomatic Foundation (The "Why"):**
Classical physics maintained a strict dualism: entities were either localized classical particles (electrons, protons) or delocalized continuous waves (light, sound). De Broglie proposed universal wave-particle symmetry: all matter exhibits an intrinsic de Broglie wavelength $\\lambda = h/p$.

**2. The Double-Immersive Core (The "What"):**

*Track A: The Abstract (Mathematical Formulation)*
$$\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{h}{\\sqrt{2m q V}}$$
For electrons:
$$\\lambda = \\frac{1.226\\text{ nm}}{\\sqrt{V}}$$

*Track B: The Concrete (Physical Analogy & Mental Sandbox)*
Wave-Particle Sandbox: Imagine rolling bowling balls down a lane with two slots. Classically, two distinct stripes appear behind the slits. Now send electrons through a nickel crystal or double-slit. Even when electrons pass ONE AT A TIME, an interference pattern builds up over time! Each electron interferes with *itself*, traveling through both slits simultaneously as a probability wave.

**3. Boundary Conditions & Limits:**
- High Momentum / Large Mass ($p \\to \\infty$): $\\lambda \\to 0$. Matter waves become undetectable; classical trajectory mechanics emerge.
- Ultra-Relativistic Limit ($v \\to c$): Relativistic momentum $p = \\gamma m_0 v$ must be used: $\\lambda = \\frac{h}{\\gamma m_0 v}$.

**4. Exam Trap Warning:**
*Modern Academy Exam Trap:* Forgetting the square root in the accelerated electron formula $\\lambda = \\frac{1.226\\text{ nm}}{\\sqrt{V}}$. If voltage $V$ is quadrupled ($4\\times$), the wavelength is **halved ($1/2\\times$)**, NOT quartered!`;
  }

  // 6. Quantum Tunneling & Penetration Depth
  if (query.includes("tunneling") || query.includes("barrier") || query.includes("penetration depth")) {
    if (isDerive) {
      return `### **DERIVATION: Quantum Barrier Tunneling & Penetration Depth**

**1. Premise & Initial State:**
Consider a particle of mass $m$ and energy $E$ incident upon a finite rectangular potential barrier of height $V_0$ and width $L$, where $E < V_0$:
$$U(x) = \\begin{cases} 0 & x < 0 \\quad \\text{(Region I)} \\\\ V_0 & 0 \\le x \\le L \\quad \\text{(Region II)} \\\\ 0 & x > L \\quad \\text{(Region III)} \\end{cases}$$

**2. Step-by-Step Evolution:**

*Step 1: Write TISE in Barrier Region II ($U = V_0$)*
$$-\\frac{\\hbar^2}{2m}\\frac{d^2 \\psi_{II}}{dx^2} + V_0 \\psi_{II} = E \\psi_{II} \\implies \\frac{d^2 \\psi_{II}}{dx^2} - \\frac{2m(V_0 - E)}{\\hbar^2}\\psi_{II} = 0$$

*Step 2: Define Attenuation Wave Number $\\gamma$*
Since $V_0 > E$, define $\\gamma^2 = \\frac{2m(V_0 - E)}{\\hbar^2} > 0$:
$$\\frac{d^2 \\psi_{II}}{dx^2} - \\gamma^2 \\psi_{II} = 0, \\quad \\gamma = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}$$

*Step 3: Solve Differential Equation in Region II*
$$\\psi_{II}(x) = C e^{-\\gamma x} + D e^{+\\gamma x}$$
For a wide barrier ($\gamma L \\gg 1$), the decaying exponential dominates: $\\psi_{II}(x) \\approx C e^{-\\gamma x}$.

*Step 4: Define Penetration Depth $\\delta$*
The penetration depth $\\delta$ is the distance at which the wave amplitude drops to $1/e$ of its surface value:
$$\\gamma \\delta = 1 \\implies \\delta = \\frac{1}{\\gamma} = \\frac{\\hbar}{\\sqrt{2m(V_0 - E)}}$$

*Step 5: Formulate Transmission Coefficient $T$*
Probability density $|\psi|^2$ scales as $(e^{-\\gamma x})^2 = e^{-2\\gamma x}$. Transmission probability across width $L$ is:
$$T = \\frac{|\\psi_{III}|^2}{|\\psi_I|^2} \\approx e^{-2\\gamma L} = \\exp\\left( -2L \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar} \\right)$$

**3. The Physical Check:**
> $$\boxed{T \\approx e^{-2\\gamma L}, \\quad \\gamma = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}, \\quad \\delta = \\frac{1}{\\gamma} = \\frac{\\hbar}{\\sqrt{2m(V_0 - E)}}}$$

*Reality Verification:*
- STM (Scanning Tunneling Microscope): Because tunneling probability $T$ depends exponentially on barrier thickness $L$, altering the tip-sample gap by merely $0.1\\text{ nm}$ (atomic diameter) changes the tunnel current by an order of magnitude, enabling atomic-resolution topographic imaging!
- Classical Limit: If $V_0 > E$ and $\\hbar \\to 0$, then $\\gamma \\to \\infty \\implies T \\to 0$, agreeing with classical physics that no particle can penetrate a barrier exceeding its kinetic energy.`;
    }

    return `### **LECTURE: Quantum Tunneling & Barrier Penetration**

**1. Axiomatic Foundation (The "Why"):**
Classically, a particle with kinetic energy $E$ encountering a potential energy hill $V_0 > E$ encounters a turning point and rebounds with $100\\%$ probability; finding the particle inside or beyond the barrier is strictly impossible ($T = 0$). In quantum mechanics, because the wavefunction $\\psi(x)$ must satisfy continuity of $\\psi$ and $\\frac{d\\psi}{dx}$, the wave does not terminate abruptly at the barrier edge, but decays exponentially as $e^{-\\gamma x}$, leading to non-zero transmission ($T > 0$).

**2. The Double-Immersive Core (The "What"):**

*Track A: The Abstract (Mathematical Formulation)*
$$T \\approx e^{-2\\gamma L}$$
$$\\gamma = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}, \\quad \\delta = \\frac{1}{\\gamma} = \\frac{\\hbar}{\\sqrt{2m(V_0 - E)}}$$
Definitions & Units:
- $V_0$: Barrier height $[\text{J or eV}]$.
- $E$: Particle energy $[\text{J or eV}]$, with $E < V_0$.
- $L$: Barrier width $[\text{m or nm}]$.
- $\\gamma$: Attenuation/damping coefficient $[\text{m}^{-1}]$.
- $\\delta$: Penetration depth $[\text{m or nm}]$.
- $T$: Transmission probability (dimensionless, $0 \\le T \\le 1$).

*Track B: The Concrete (Physical Analogy & Mental Sandbox)*
Optical Total Internal Reflection Sandbox: When light strikes glass-air at an angle exceeding the critical angle, total internal reflection occurs. However, an *evanescent wave* penetrates into the air a few wavelengths. If you bring a second glass prism within fractions of a micron to the first, light leaks across the air gap! Quantum tunneling is the exact matter-wave counterpart of frustrated total internal reflection.

**3. Boundary Conditions & Limits:**
- Wide Barrier ($L \\to \\infty$): $T \\to 0$, classical reflection restored.
- Vanishing Barrier ($V_0 \\to E$): $\\gamma \\to 0 \\implies T \\to 1$.
- Macroscopic Masses ($m \\gg m_e$): $\\gamma$ becomes enormous ($10^{15}\text{ m}^{-1}$); a thrown tennis ball has $T \\approx 10^{-10^{30}}$, zero for all practical purposes.

**4. Exam Trap Warning:**
*Modern Academy Exam Trap:* Five canonical applications of quantum tunneling tested on Modern Academy exams:
1. Scanning Tunneling Microscopy (STM).
2. Alpha particle decay from radioactive nuclei.
3. Fowler-Nordheim field emission from cold cathode tips.
4. Ammonia molecule ($NH_3$) nitrogen inversion oscillation.
5. Esaki tunnel diodes in high-frequency solid-state electronics.`;
  }

  // ==========================================
  // CHAPTER 3: ATOMIC PHYSICS & TRANSITIONS
  // ==========================================

  // 7. Bohr Hydrogen Atom Derivation / Lecture
  if (query.includes("bohr") || query.includes("orbit") || (query.includes("hydrogen") && query.includes("radius"))) {
    if (isDerive) {
      return `### **DERIVATION: Bohr Hydrogen Orbit Radii & Energy States**

**1. Premise & Initial State:**
Consider an electron of mass $m_e$ and charge $-e$ in circular orbit of radius $r$ around a stationary proton of charge $+e$.
Starting Axioms:
1. Coulomb attractive electrostatic force provides centripetal acceleration:
   $$F_c = \\frac{1}{4\\pi\\varepsilon_0}\\frac{e^2}{r^2} = \\frac{m_e v^2}{r}$$
2. Bohr's Angular Momentum Quantization Postulate:
   $$L = m_e v r = n\\hbar = \\frac{n h}{2\\pi}, \\quad n = 1, 2, 3, \\dots$$

**2. Step-by-Step Evolution:**

*Step 1: Express Electron Velocity from Angular Momentum*
From $m_e v r = n\\hbar$:
$$v = \\frac{n\\hbar}{m_e r}$$

*Step 2: Substitute Velocity $v$ into the Force Balance Equation*
$$\\frac{1}{4\\pi\\varepsilon_0}\\frac{e^2}{r^2} = \\frac{m_e}{r} \\left(\\frac{n\\hbar}{m_e r}\\right)^2 = \\frac{n^2 \\hbar^2}{m_e r^3}$$

*Step 3: Solve for Quantized Orbit Radii $r_n$*
Multiply both sides by $r^2$:
$$\\frac{e^2}{4\\pi\\varepsilon_0} = \\frac{n^2 \\hbar^2}{m_e r_n} \\implies r_n = \\frac{4\\pi\\varepsilon_0 \\hbar^2}{m_e e^2} n^2$$
Define the Bohr radius $a_0$ for $n = 1$:
$$a_0 = \\frac{4\\pi\\varepsilon_0 \\hbar^2}{m_e e^2} = \\frac{(8.854 \\times 10^{-12})(1.055 \\times 10^{-34})^2}{(9.109 \\times 10^{-31})(1.602 \\times 10^{-19})^2} = 0.529 \\times 10^{-10}\\text{ m} = 0.529\\text{ \\AA}$$
$$\\boxed{r_n = n^2 a_0}$$

*Step 4: Formulate Total Mechanical Energy $E = K + U$*
Kinetic energy: $K = \\frac{1}{2}m_e v^2 = \\frac{1}{2}\\left(\\frac{e^2}{4\\pi\\varepsilon_0 r}\\right)$.
Potential energy: $U = -\\frac{e^2}{4\\pi\\varepsilon_0 r}$.
Total energy:
$$E = K + U = \\frac{1}{8\\pi\\varepsilon_0}\\frac{e^2}{r} - \\frac{1}{4\\pi\\varepsilon_0}\\frac{e^2}{r} = -\\frac{e^2}{8\\pi\\varepsilon_0 r}$$

*Step 5: Substitute Quantized Radius $r_n$ into Total Energy*
$$E_n = -\\frac{e^2}{8\\pi\\varepsilon_0} \\left( \\frac{m_e e^2}{4\\pi\\varepsilon_0 \\hbar^2 n^2} \\right) = -\\frac{m_e e^4}{32\\pi^2 \\varepsilon_0^2 \\hbar^2} \\frac{1}{n^2}$$
Evaluating constants:
$$E_1 = -\\frac{m_e e^4}{32\\pi^2 \\varepsilon_0^2 \\hbar^2} = -13.6\\text{ eV}$$
$$\\boxed{E_n = -\\frac{13.6\\text{ eV}}{n^2}}$$

**3. The Physical Check:**
> $$\boxed{r_n = n^2 a_0 = n^2 (0.529\\text{ \\AA}) \\quad \\text{and} \\quad E_n = -\\frac{13.6\\text{ eV}}{n^2}}$$

*Reality Verification:*
- Ionization energy from ground state ($n=1 \to \infty$): $E_{\\text{ion}} = 0 - (-13.6\\text{ eV}) = +13.6\\text{ eV}$, matching experimental hydrogen ionization spectroscopy perfectly!
- Radius scales as $n^2$: $r_1 = 0.53\\text{ \\AA}, r_2 = 2.12\\text{ \\AA}, r_3 = 4.76\\text{ \\AA}$.`;
    }

    return `### **LECTURE: Bohr Hydrogen Atom & Energy Quantization**

**1. Axiomatic Foundation (The "Why"):**
Rutherford's planetary model had electrons orbiting a positive nucleus. Classical electrodynamics (Larmor formula) dictates that any accelerating charge must continuously radiate electromagnetic energy:
$$P = \\frac{q^2 a^2}{6\\pi\\varepsilon_0 c^3}$$
An orbiting electron has centripetal acceleration $a = v^2/r$, so it would radiate away all mechanical energy and spiral catastrophically into the nucleus in $\\sim 10^{-11}\\text{ s}$. Furthermore, it would radiate a continuous spectrum. Classical physics cannot account for the stable existence of atoms or discrete line spectra!

**2. The Double-Immersive Core (The "What"):**

*Track A: The Abstract (Mathematical Formulation)*
$$r_n = n^2 a_0, \\quad a_0 = 0.529\\text{ \\AA} = 0.0529\\text{ nm}$$
$$E_n = -\\frac{13.6\\text{ eV}}{n^2}$$
Photon Emission Condition:
$$\\Delta E = E_i - E_f = hf = \\frac{hc}{\\lambda}$$

*Track B: The Concrete (Physical Analogy & Mental Sandbox)*
Stepping Ladder Sandbox: The hydrogen atom is like an architectural ladder where the rungs are non-linearly spaced. An electron can stand on rung 1 (ground state) or jump to rung 2, 3, etc., but it is physically forbidden from standing *between* rungs! When dropping down from rung $n_i$ to $n_f$, the lost gravitational potential energy is emitted as a single photon of light.

**3. Boundary Conditions & Limits:**
- Ground State ($n = 1$): $r_1 = 0.529\\text{ \\AA}$, $E_1 = -13.6\\text{ eV}$. Most tightly bound configuration.
- Ionization Limit ($n \\to \\infty$): $E_\\infty = 0$, $r_\\infty \\to \\infty$. The electron is completely detached from the proton.
- Hydrogen-like Ions ($Z > 1$, e.g. $He^+, Li^{2+}$): Radius contracts as $r_n = \\frac{n^2 a_0}{Z}$; binding energy multiplies as $E_n = -13.6\\frac{Z^2}{n^2}\\text{ eV}$.

**4. Exam Trap Warning:**
*Modern Academy Exam Trap:* Energy levels converge as $n$ increases ($E_1 = -13.6\\text{ eV}, E_2 = -3.4\\text{ eV}, E_3 = -1.51\\text{ eV}, E_4 = -0.85\\text{ eV}$). Remember that the **energy is NEGATIVE**, signifying a bound state.`;
  }

  // 8. Rydberg Formula & Spectral Series
  if (query.includes("rydberg") || query.includes("spectral series") || query.includes("balmer") || query.includes("lyman")) {
    if (isDerive) {
      return `### **DERIVATION: The Rydberg Formula for Hydrogen Spectral Transitions**

**1. Premise & Initial State:**
Start from the Bohr energy levels of the hydrogen atom:
$$E_n = -\\frac{m_e e^4}{32\\pi^2 \\varepsilon_0^2 \\hbar^2} \\frac{1}{n^2}$$
When an electron transitions from an initial high state $n_i$ to a final lower state $n_f$ ($n_i > n_f$), conservation of energy requires the emitted photon energy to equal the energy loss:
$$\\Delta E = E_{n_i} - E_{n_f} = hf = \\frac{hc}{\\lambda}$$

**2. Step-by-Step Evolution:**

*Step 1: Formulate Energy Difference*
$$\\frac{hc}{\\lambda} = \\left( -\\frac{m_e e^4}{32\\pi^2 \\varepsilon_0^2 \\hbar^2 n_i^2} \\right) - \\left( -\\frac{m_e e^4}{32\\pi^2 \\varepsilon_0^2 \\hbar^2 n_f^2} \\right)$$

*Step 2: Factor out Common Physical Constants*
$$\\frac{hc}{\\lambda} = \\frac{m_e e^4}{32\\pi^2 \\varepsilon_0^2 \\hbar^2} \\left( \\frac{1}{n_f^2} - \\frac{1}{n_i^2} \\right)$$

*Step 3: Divide Both Sides by $hc$ to Isolate Wavenumber $1/\\lambda$*
$$\\frac{1}{\\lambda} = \\frac{m_e e^4}{32\\pi^2 \\varepsilon_0^2 \\hbar^2 h c} \\left( \\frac{1}{n_f^2} - \\frac{1}{n_i^2} \\right) = \\frac{m_e e^4}{8\\varepsilon_0^2 h^3 c} \\left( \\frac{1}{n_f^2} - \\frac{1}{n_i^2} \\right)$$

*Step 4: Define the Rydberg Constant $R_H$*
$$R_H = \\frac{m_e e^4}{8\\varepsilon_0^2 h^3 c} = \\frac{(9.109 \\times 10^{-31})(1.602 \\times 10^{-19})^4}{8(8.854 \\times 10^{-12})^2 (6.626 \\times 10^{-34})^3 (2.998 \\times 10^8)} = 1.09737 \\times 10^7\\text{ m}^{-1}$$

**3. The Physical Check:**
> $$\boxed{\\frac{1}{\\lambda} = R_H \\left( \\frac{1}{n_f^2} - \\frac{1}{n_i^2} \\right), \\quad R_H = 1.097 \\times 10^7\\text{ m}^{-1}}$$

*Spectral Series Classification:*
- **Lyman Series ($n_f = 1, n_i = 2, 3, \\dots$):** Ultraviolet region. Transition $2 \\to 1$: $\\lambda = 121.6\\text{ nm}$.
- **Balmer Series ($n_f = 2, n_i = 3, 4, \\dots$):** Visible spectrum!
  - $H_\\alpha$ ($3 \\to 2$): $\\lambda = 656.3\\text{ nm}$ (Red).
  - $H_\\beta$ ($4 \\to 2$): $\\lambda = 486.1\\text{ nm}$ (Cyan/Green).
  - $H_\\gamma$ ($5 \\to 2$): $\\lambda = 434.0\\text{ nm}$ (Blue).
  - Series Limit ($n_i \\to \\infty$): $\\lambda_{\\min} = \\frac{4}{R_H} = 364.6\\text{ nm}$.
- **Paschen Series ($n_f = 3$):** Infrared.
- **Brackett Series ($n_f = 4$):** Infrared.
- **Pfund Series ($n_f = 5$):** Far Infrared.`;
    }

    return `### **LECTURE: Hydrogen Spectral Series & Rydberg Formula**

**1. Axiomatic Foundation (The "Why"):**
In the 19th century, spectroscopy revealed that heated hydrogen gas emits discrete, sharp emission lines rather than a continuous rainbow. Johannes Rydberg discovered empirically that all lines fit the formula $\\frac{1}{\\lambda} = R_H \\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)$, but classical physics could not explain why this formula worked or where $R_H$ originated. Bohr derived $R_H$ from fundamental quantum invariants.

**2. The Double-Immersive Core (The "What"):**

*Track A: The Abstract (Mathematical Formulation)*
$$\\frac{1}{\\lambda} = R_H \\left( \\frac{1}{n_f^2} - \\frac{1}{n_i^2} \\right)$$
Series Boundaries:
- Maximum Wavelength (Minimum Energy): transition from adjacent level $n_i = n_f + 1$.
- Minimum Wavelength / Series Limit (Maximum Energy): transition from $n_i \\to \\infty$.

*Track B: The Concrete (Physical Analogy & Mental Sandbox)*
Spectral Series Sandbox: Grouping transitions by their landing floor ($n_f$):
- Ground floor landing ($n_f = 1$): Enormous energy drops $\\to$ UV photons (Lyman).
- 2nd floor landing ($n_f = 2$): Moderate energy drops $\\to$ Visible photons (Balmer).
- 3rd, 4th, 5th floors: Tiny energy drops $\\to$ Low-energy Infrared photons (Paschen, Brackett, Pfund).

**3. Boundary Conditions & Limits:**
- Series Limit ($n_i \\to \\infty$): $\\lambda_{\\min} = \\frac{n_f^2}{R_H}$.
- Adjacent Line ($n_i = n_f + 1$): $\\lambda_{\\max} = \\frac{n_f^2 (n_f+1)^2}{(2n_f+1)R_H}$.

**4. Exam Trap Warning:**
*Modern Academy Exam Trap:*
- "Shortest wavelength in Balmer series": corresponds to $n_i = \\infty \\to n_f = 2$, yielding $\\lambda = 4/R_H = 364.6\\text{ nm}$.
- "Longest wavelength in Balmer series": corresponds to $n_i = 3 \\to n_f = 2$, yielding $\\lambda = 656.3\\text{ nm}$. Do NOT reverse these!`;
  }

  // 9. Four Quantum Numbers & Selection Rules
  if (query.includes("quantum numbers") || query.includes("pauli") || query.includes("hund") || query.includes("selection rules")) {
    return `### **LECTURE: The Four Quantum Numbers & Selection Rules**

**1. Axiomatic Foundation (The "Why"):**
The 1D Bohr model predicted only one quantum number ($n$), assuming 2D coplanar orbits. When the Schrödinger equation is solved in 3D spherical coordinates $(r, \\theta, \\phi)$ via separation of variables $\\psi(r, \\theta, \\phi) = R_{nl}(r) Y_{lm_l}(\\theta, \\phi)$, three spatial boundary conditions generate three spatial quantum numbers ($n, l, m_l$). Relativistic electron spin contributes the fourth ($m_s$).

**2. The Double-Immersive Core (The "What"):**

*Track A: The Abstract (Mathematical Formulation)*
1. **Principal Quantum Number ($n$):**
   - Allowed values: $n \\in \\{1, 2, 3, \\dots\\}$.
   - Determines: Total orbital energy $E_n = -13.6/n^2\\text{ eV}$ and shell radius.
2. **Orbital Angular Momentum Quantum Number ($l$):**
   - Allowed values: $l \\in \\{0, 1, 2, \\dots, n - 1\\}$ ($s, p, d, f, g$).
   - Determines: Magnitude of orbital angular momentum $L = \\sqrt{l(l+1)}\\hbar$ and orbital shape.
3. **Magnetic Quantum Number ($m_l$):**
   - Allowed values: $m_l \\in \\{-l, -l+1, \\dots, 0, \\dots, +l\\}$ (total $2l+1$ states).
   - Determines: Spatial orientation of $L$ along the quantization z-axis: $L_z = m_l \\hbar$.
4. **Spin Magnetic Quantum Number ($m_s$):**
   - Allowed values: $m_s \\in \\{+1/2, -1/2\\}$.
   - Determines: Intrinsic angular momentum orientation: $S_z = m_s \\hbar$.

*Selection Rules for Electric Dipole Transitions:*
$$\\Delta l = \\pm 1, \\quad \\Delta m_l = 0, \\pm 1, \\quad \\Delta m_s = 0$$
*(Photons carry spin $\\pm 1\\hbar$; orbital angular momentum must change by 1 unit).*

*Track B: The Concrete (Physical Analogy & Mental Sandbox)*
The Apartment Address Sandbox:
- $n$: City building floor number.
- $l$: Suite floorplan ($s$ = spherical studio, $p$ = dumbbell duplex, $d$ = clover penthouse).
- $m_l$: Window facing direction (North, South, East, West).
- $m_s$: Upper or lower bunk bed.
**Pauli Exclusion Principle:** No two electrons in an atom can occupy the identical quantum address $(n, l, m_l, m_s)$!

**3. Boundary Conditions & Subshell Capacities:**
- Single subshell capacity: $2(2l+1)$ electrons.
  - $s$-subshell ($l=0$): $2(1) = 2$ electrons.
  - $p$-subshell ($l=1$): $2(3) = 6$ electrons.
  - $d$-subshell ($l=2$): $2(5) = 10$ electrons.
  - $f$-subshell ($l=3$): $2(7) = 14$ electrons.
- Principal shell capacity: $\\sum_{l=0}^{n-1} 2(2l+1) = 2n^2$.

**4. Exam Trap Warning:**
*Modern Academy Exam Trap:*
- For $n=3$, allowed $l$ values are $0, 1, 2$ (cannot be 3!).
- A transition from $3s \\to 1s$ is **FORBIDDEN** because $\\Delta l = 0 - 0 = 0 \\ne \\pm 1$. The transition MUST go $3s \\to 2p \\to 1s$!`;
  }

  // ==========================================
  // CHAPTER 4: SPECIAL THEORY OF RELATIVITY
  // ==========================================

  // 10. Time Dilation Derivation / Lecture
  if (query.includes("time dilation") || (query.includes("light clock") && isDerive)) {
    if (isDerive) {
      return `### **DERIVATION: Relativistic Time Dilation via the Transverse Light-Clock**

**1. Premise & Initial State:**
Consider a transverse light clock consisting of two parallel mirrors separated by a fixed proper distance $d$. A light pulse bounces vertically between the mirrors.
- In frame $S'$ (rest frame of the clock): The light pulse travels straight up and down over distance $2d$ at speed $c$. The proper time interval is:
  $$\\Delta t_p = \\frac{2d}{c} \\implies d = \\frac{c \\Delta t_p}{2}$$
- In frame $S$ (lab frame): The clock translates horizontally to the right at uniform speed $v$. An observer sees the light pulse follow a triangular zigzag trajectory of speed $c$ in elapsed lab time $\\Delta t$.

**2. Step-by-Step Evolution:**

*Step 1: Construct the Right-Angled Geometric Triangle*
In half the tick duration $\\frac{\\Delta t}{2}$:
- Horizontal base: The mirrors travel distance $x = v \\frac{\\Delta t}{2}$.
- Vertical altitude: The mirror separation is invariant $d = c \\frac{\\Delta t_p}{2}$ (transverse dimensions do not contract).
- Hypotenuse: The light pulse travels distance $s = c \\frac{\\Delta t}{2}$ at constant speed $c$ (Einstein's 2nd Postulate).

*Step 2: Apply the Pythagorean Theorem*
$$s^2 = d^2 + x^2 \\implies \\left(c \\frac{\\Delta t}{2}\\right)^2 = \\left(c \\frac{\\Delta t_p}{2}\\right)^2 + \\left(v \\frac{\\Delta t}{2}\\right)^2$$

*Step 3: Multiply through by 4 and Group $\\Delta t^2$ Terms*
$$c^2 \\Delta t^2 = c^2 \\Delta t_p^2 + v^2 \\Delta t^2$$
Subtract $v^2 \\Delta t^2$ from both sides:
$$c^2 \\Delta t^2 - v^2 \\Delta t^2 = c^2 \\Delta t_p^2$$

*Step 4: Factor out $\\Delta t^2$*
$$\\Delta t^2 (c^2 - v^2) = c^2 \\Delta t_p^2$$

*Step 5: Divide Both Sides by $c^2$*
$$\\Delta t^2 \\left(1 - \\frac{v^2}{c^2}\\right) = \\Delta t_p^2$$

*Step 6: Solve for Dilated Time $\\Delta t$*
$$\\Delta t^2 = \\frac{\\Delta t_p^2}{1 - \\frac{v^2}{c^2}} \\implies \\Delta t = \\frac{\\Delta t_p}{\\sqrt{1 - \\frac{v^2}{c^2}}}$$
Define the Lorentz factor $\\gamma$:
$$\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}} = \\frac{1}{\\sqrt{1 - \\beta^2}}, \\quad \\beta = \\frac{v}{c}$$

**3. The Physical Check:**
> $$\boxed{\\Delta t = \\gamma \\Delta t_p = \\frac{\\Delta t_p}{\\sqrt{1 - v^2/c^2}}}$$

*Reality Verification:*
- For $v \\ll c$: $\\frac{v^2}{c^2} \\approx 0 \\implies \\gamma \\approx 1 \\implies \\Delta t = \\Delta t_p$, recovering classical absolute Newtonian time.
- As $v \\to c$: $\\gamma \\to \\infty \\implies \\Delta t \\to \\infty$. A moving clock slows down asymptotically to a complete stop relative to the stationary observer.
- Atmospheric Muons: Muons with proper lifetime $\\Delta t_p = 2.2\\,\\mu\\text{s}$ traveling at $0.998c$ have $\\gamma \\approx 15.8$. Their observed lifetime dilates to $\\Delta t = 15.8 \\times 2.2\\,\\mu\\text{s} \\approx 34.8\\,\\mu\\text{s}$, allowing them to survive the 10 km descent to Earth sea level detectors!`;
    }

    return `### **LECTURE: Special Relativity & Relativistic Time Dilation**

**1. Axiomatic Foundation (The "Why"):**
Classical Newtonian mechanics assumed time is universal and absolute: $t' = t$. Maxwell's electromagnetic equations, however, predict a constant vacuum speed of light $c = 1/\\sqrt{\\mu_0 \\varepsilon_0}$. Under classical Galilean transformations, light speed would depend on the observer's velocity ($c' = c \\pm v$), contradicting the Michelson-Morley null result. Einstein established that speed of light $c$ is strictly invariant, necessitating that space and time itself must deform dynamically.

**2. The Double-Immersive Core (The "What"):**

*Track A: The Abstract (Mathematical Formulation)*
$$\\Delta t = \\gamma \\Delta t_p$$
$$\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}} = \\frac{1}{\\sqrt{1 - \\beta^2}} \\ge 1$$
Definitions & Units:
- $\\Delta t_p$: Proper time interval measured by an observer at rest relative to the clock $[\text{s}]$.
- $\\Delta t$: Dilated time interval measured in a frame moving relative to the clock $[\text{s}]$.
- $\\gamma$: Dimensionless Lorentz factor ($\ge 1$).
- $v$: Relative velocity between inertial frames $[\text{m/s}]$.
- $c = 3.00 \\times 10^8\text{ m/s}$: Universal speed of light.

*Track B: The Concrete (Physical Analogy & Mental Sandbox)*
Light-Clock Sandbox: If you bounce a photon between two floor-and-ceiling mirrors on a stationary train, it travels straight up and down. If the train rushes past a platform observer at $0.9c$, the platform observer sees the photon travel along a diagonal sawtooth path. Because the photon cannot exceed speed $c$, traveling a longer diagonal distance requires more time. Hence, the train clock ticks slower than platform clocks!

**3. Boundary Conditions & Limits:**
- Classical Limit ($v \\ll c$): $\\beta = v/c \\to 0 \\implies \\gamma \\to 1$; $\\Delta t = \\Delta t_p$.
- Speed of Light Limit ($v \\to c$): $\\gamma \\to \\infty \\implies \\Delta t \\to \\infty$. Time freezes for a photon.

**4. Exam Trap Warning:**
*Modern Academy Exam Trap:*
Always identify who measures **Proper Time $\\Delta t_p$**! Proper time is ALWAYS measured by the clock that is present at BOTH the start and end events at the *exact same spatial location*. The proper time is always the **shortest time** ($\Delta t \ge \Delta t_p$).`;
  }

  // 11. Length Contraction Derivation / Lecture
  if (query.includes("length contraction")) {
    if (isDerive) {
      return `### **DERIVATION: Relativistic Length Contraction**

**1. Premise & Initial State:**
Consider a ruler of proper length $L_p$ resting along the x-axis in reference frame $S'$. The endpoints are at rest in $S'$.
An observer in frame $S$ moves past the ruler at constant velocity $v$ parallel to its length. The moving observer measures length $L = v \\Delta t_p$, where $\\Delta t_p$ is the proper time measured by a single clock in $S$ traveling from one end of the ruler to the other.

**2. Step-by-Step Evolution:**

*Step 1: Time Interval Measured in Ruler Rest Frame $S'$*
In frame $S'$, the ruler is stationary with proper length $L_p$. The clock from frame $S$ moves past the ruler at speed $v$. The time elapsed in $S'$ to traverse proper length $L_p$ is:
$$\\Delta t' = \\frac{L_p}{v}$$

*Step 2: Relate Time Intervals via Time Dilation*
Because the single clock in $S$ measures the proper time $\\Delta t_p$ between meeting the two endpoints at the same spatial point in $S$:
$$\\Delta t' = \\gamma \\Delta t_p \\implies \\Delta t_p = \\frac{\\Delta t'}{\\gamma}$$

*Step 3: Substitute $\\Delta t'$ from Step 1*
$$\\Delta t_p = \\frac{L_p}{\\gamma v}$$

*Step 4: Compute Observed Length $L$ in Frame $S$*
In frame $S$, the ruler moves past at speed $v$ in time $\\Delta t_p$:
$$L = v \\Delta t_p = v \\left( \\frac{L_p}{\\gamma v} \\right) = \\frac{L_p}{\\gamma}$$

**3. The Physical Check:**
> $$\boxed{L = \\frac{L_p}{\\gamma} = L_p \\sqrt{1 - \\frac{v^2}{c^2}}}$$

*Reality Verification:*
- If relativistic mass is $m = \\frac{5}{4}m_0 \\implies \\gamma = \\frac{5}{4} = 1.25$.
- A 1-meter stick moving parallel to its length contracts to:
  $$L = \\frac{1.0\\text{ m}}{5/4} = 0.80\\text{ m}$$
- Transverse dimensions ($y, z$) do NOT contract: $L_y = L_{p,y}, L_z = L_{p,z}$. Contraction occurs *strictly along the direction of relative motion*.`;
    }

    return `### **LECTURE: Relativistic Length Contraction**

**1. Axiomatic Foundation (The "Why"):**
Classical physics assumed space is rigid and invariant ($L' = L$). Since time dilates according to $\\Delta t = \\gamma \\Delta t_p$, maintaining universal light speed $c$ requires spatial distances parallel to motion to contract by the reciprocal factor $1/\\gamma$.

**2. The Double-Immersive Core (The "What"):**

*Track A: The Abstract (Mathematical Formulation)*
$$L = \\frac{L_p}{\\gamma} = L_p \\sqrt{1 - \\frac{v^2}{c^2}}$$
- $L_p$: Proper length measured in the rest frame of the object $[\text{m}]$.
- $L$: Contracted length measured in the moving frame $[\text{m}]$.
- $\\gamma = 1/\\sqrt{1 - v^2/c^2} \\ge 1$.

*Track B: The Concrete (Physical Analogy & Mental Sandbox)*
Muon Journey Sandbox: From the Earth's perspective, muons survive traveling 10 km because their clocks run slow ($\Delta t = \gamma \Delta t_p$). But from the muon's own rest frame, its clock ticks completely normally ($\Delta t_p = 2.2\\,\\mu\\text{s}$)! How does the muon reach Earth? In the muon frame, Earth's atmosphere is rushing upward at $0.998c$, contracting the 10 km mountain to just $L = 10\\text{ km}/15.8 = 633\\text{ m}$, which it covers easily in $2.2\\,\\mu\\text{s}$!

**3. Boundary Conditions & Limits:**
- $v \\ll c$: $L \\to L_p$ (classical rigidity).
- $v \\to c$: $L \\to 0$ (pancake limit).

**4. Exam Trap Warning:**
*Modern Academy Exam Trap:*
Length contraction occurs ONLY parallel to relative motion. If a square of proper dimensions $1\\text{ m} \\times 1\\text{ m}$ travels along the x-axis, its length along x contracts to $L_x = 1/\\gamma$, but its height along y remains **$1.0\\text{ m}$**!`;
  }

  // 12. Lorentz Transformations & Velocity Addition
  if (query.includes("lorentz") || query.includes("velocity addition")) {
    if (isDerive) {
      return `### **DERIVATION: Lorentz Coordinate Transformations & Relativistic Velocity Addition**

**1. Premise & Initial State:**
Let frame $S'$ move at uniform velocity $v$ along the positive x-axis relative to frame $S$. The origins coincide at $t = t' = 0$.
A spherical pulse of light emitted from the origin at $t = t' = 0$ propagates outward at speed $c$ in all directions in both frames:
- In frame $S$: $x^2 + y^2 + z^2 - c^2 t^2 = 0$
- In frame $S'$: $x'^2 + y'^2 + z'^2 - c^2 t'^2 = 0$

**2. Step-by-Step Evolution:**

*Step 1: Assume Linear Transformation for $x'$ and $t'$*
Because inertial motion must remain uniform (straight lines in spacetime):
$$x' = \\gamma(x - vt), \\quad y' = y, \\quad z' = z$$
By symmetry, the inverse transformation must be:
$$x = \\gamma(x' + vt')$$

*Step 2: Substitute $x'$ into the Inverse Transformation*
$$x = \\gamma[\\gamma(x - vt) + vt'] = \\gamma^2 x - \\gamma^2 vt + \\gamma vt'$$

*Step 3: Solve for $t'$*
$$\\gamma vt' = x - \\gamma^2 x + \\gamma^2 vt = \\gamma^2 vt - x(\\gamma^2 - 1)$$
Dividing through by $\\gamma v$:
$$t' = \\gamma t - \\frac{\\gamma^2 - 1}{\\gamma v} x$$

*Step 4: Determine $\\gamma$ from the Light Front Condition $x = ct, x' = ct'$*
Substitute $x = ct$ and $x' = ct'$ into $x' = \\gamma(x - vt)$:
$$ct' = \\gamma(ct - vt) = \\gamma t(c - v)$$
Substitute $x = ct$ into $t'$:
$$t' = \\gamma t - \\frac{\\gamma^2 - 1}{\\gamma v} ct = t\\left[ \\gamma - \\frac{(\\gamma^2 - 1)c}{\\gamma v} \\right]$$
Equating both expressions for $t'$:
$$\\frac{\\gamma t(c - v)}{c} = t\\left[ \\gamma - \\frac{(\\gamma^2 - 1)c}{\\gamma v} \\right]$$
Solving for $\\gamma$ yields:
$$\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}$$
and the time equation simplifies to:
$$t' = \\gamma\\left(t - \\frac{vx}{c^2}\\right)$$

*Step 5: Derive Relativistic Velocity Addition*
Differentiating the Lorentz coordinates:
$$dx' = \\gamma(dx - v dt), \\quad dt' = \\gamma\\left(dt - \\frac{v dx}{c^2}\\right)$$
Dividing $dx'$ by $dt'$:
$$u'_x = \\frac{dx'}{dt'} = \\frac{\\gamma(dx - v dt)}{\\gamma\\left(dt - \\frac{v dx}{c^2}\\right)} = \\frac{\\frac{dx}{dt} - v}{1 - \\frac{v}{c^2}\\frac{dx}{dt}} = \\frac{u_x - v}{1 - \\frac{u_x v}{c^2}}$$
Inverting gives the lab velocity:
$$\\boxed{u_x = \\frac{u'_x + v}{1 + \\frac{u'_x v}{c^2}}}$$

**3. The Physical Check:**
> $$\boxed{x' = \\gamma(x - vt), \\quad t' = \\gamma\\left(t - \\frac{vx}{c^2}\\right), \\quad u_x = \\frac{u'_x + v}{1 + \\frac{u'_x v}{c^2}}}$$

*Reality Verification:*
- If a rocket moves at $v = 0.9c$ and fires a laser forward at $u'_x = c$:
  $$u_x = \\frac{c + 0.9c}{1 + \\frac{c(0.9c)}{c^2}} = \\frac{1.9c}{1 + 0.9} = \\frac{1.9c}{1.9} = c$$
  The speed of light remains strictly $c$ in all inertial frames! Classical addition would give $1.9c$, violating causality.`;
    }

    return `### **LECTURE: Lorentz Transformations & Relativistic Kinematics**

**1. Axiomatic Foundation (The "Why"):**
The Galilean transformation ($x' = x - vt, t' = t$) assumes time is an absolute, invariant parameter. Consequently, velocities add linearly: $u' = u - v$. When applied to light waves, Galilean transformations predict observer-dependent light speeds, violating the second postulate of special relativity.

**2. The Double-Immersive Core (The "What"):**

*Track A: The Abstract (Mathematical Formulation)*
Lorentz Coordinate Transformations:
$$x' = \\gamma(x - vt), \\quad y' = y, \\quad z' = z, \\quad t' = \\gamma\\left(t - \\frac{vx}{c^2}\\right)$$
Relativistic Velocity Addition:
$$u_x = \\frac{u'_x + v}{1 + \\frac{u'_x v}{c^2}}$$

*Track B: The Concrete (Physical Analogy & Mental Sandbox)*
Space-Time Rotation Sandbox: In Euclidean space, rotating coordinates rotates length into depth ($x$ into $y$) while preserving distance $x^2 + y^2$. In spacetime, relative motion is a *hyperbolic rotation* that mixes space and time coordinates while preserving the spacetime interval $s^2 = c^2 t^2 - x^2$.

**3. Boundary Conditions & Limits:**
- As $v/c \\to 0$: $\\gamma \\to 1, \\frac{vx}{c^2} \\to 0 \\implies x' = x - vt, t' = t$. Galilean relativity is the low-speed asymptote of Lorentz spacetime.
- Speed of Light Ceiling: No sequence of sub-light velocity additions can ever exceed $c$.

**4. Exam Trap Warning:**
*Modern Academy Exam Trap:*
Notice the term $-\\frac{vx}{c^2}$ in $t'$. Time relativity depends not just on speed $v$, but on spatial position $x$! Events simultaneous at different locations in $S$ ($t_1 = t_2, x_1 \\ne x_2$) are NOT simultaneous in $S'$ (Relativity of Simultaneity).`;
  }

  // Default Fallback
  return `### **[MODULE 1: /lecture & /derive Core Engine: Physics 3 (ELCN114 / ELC 214)]**

**System Status:** ONLINE | **Pedagogical Protocols:** Dual-Track Immersive Encoding & Step-by-Step Chalkboard Proofs

To execute an analytical module, type or select a trigger:
- \`/lecture [topic]\` - Comprehensive 4-part lesson:
  1. Axiomatic Foundation (The "Why")
  2. Double-Immersive Core (Track A: Abstract LaTeX + Track B: Concrete Analogy)
  3. Boundary Conditions & Limits
  4. Historical Exam Trap Warning
- \`/derive [equation]\` - Gapless professor-on-chalkboard proof:
  1. Premise & Initial State
  2. Step-by-Step Evolution with explicit algebraic operations
  3. The Physical Check with boxed final formula and reality check

**Verified Curriculum Topics Ready for Immediate Execution:**
- **Chapter 1:** \`/derive Compton Shift\`, \`/lecture Photoelectric Effect\`, \`/derive Wien and Stefan-Boltzmann\`
- **Chapter 2:** \`/derive Infinite Square Well\`, \`/derive De Broglie Wavelength\`, \`/lecture Quantum Tunneling\`
- **Chapter 3:** \`/derive Bohr Radius and Energy\`, \`/derive Rydberg Formula\`, \`/lecture Quantum Numbers\`
- **Chapter 4:** \`/derive Time Dilation\`, \`/derive Length Contraction\`, \`/derive Lorentz Transformations\``;
}

startServer();
