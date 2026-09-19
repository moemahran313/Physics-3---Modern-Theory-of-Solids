export interface ExamPart {
  id: string;
  partNumber: string;
  title: string;
  points?: number;
  prompt: string;
  type: "mcq" | "derivation" | "numerical" | "conceptual" | "diagram";
  options?: Array<{ id: string; text: string; correct?: boolean }>;
  correctOption?: string;
  modelAnswer: {
    finalAnswer: string;
    steps: Array<{
      title: string;
      math?: string;
      explanation: string;
    }>;
    rubricPoints: string[];
    examinerTip?: string;
  };
}

export interface ExamQuestionGroup {
  questionNumber: number;
  totalPoints: number;
  title: string;
  parts: ExamPart[];
}

export interface OfficialExam {
  id: string;
  academicYear: string;
  semester: string;
  examDate: string;
  subjectCode: string;
  subjectName: string;
  specialization: string;
  examiners: string[];
  duration: string;
  totalPoints: number;
  totalPages: number;
  constantsProvided: string[];
  questions: ExamQuestionGroup[];
}

export const OFFICIAL_EXAMS: OfficialExam[] = [
  // -------------------------------------------------------------
  // EXAM 1: Fall 2020/2021 (8/3/2021) - ELCN114
  // -------------------------------------------------------------
  {
    id: "exam-2020-2021-fall",
    academicYear: "2020/2021",
    semester: "Fall",
    examDate: "8/3/2021",
    subjectCode: "ELCN114",
    subjectName: "Modern Theory for semiconductor",
    specialization: "2nd Comp. & Comm.",
    examiners: ["Dr. Abeer Serag Eldeen", "Dr. Sally Eladly"],
    duration: "2 Hours",
    totalPoints: 40,
    totalPages: 2,
    constantsProvided: [
      "h = 6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}",
      "e = 1.6 \\times 10^{-19}\\text{ C}",
      "\\sigma = 5.67 \\times 10^{-8}\\text{ W}/(\\text{m}^2\\text{K}^4)",
      "c = 3 \\times 10^8\\text{ m/s}",
      "R_H = 1.097 \\times 10^7\\text{ m}^{-1}",
      "k_B = 1.38 \\times 10^{-23}\\text{ J/K}",
      "k_B = 8.125 \\times 10^{-5}\\text{ eV}/^\\circ\\text{C}",
      "h/(m_0 c) = 2.43\\text{ pm} = 0.0243\\text{ \\AA}",
      "m_e = 9.11 \\times 10^{-31}\\text{ kg}",
    ],
    questions: [
      // Question 1 (8 Points)
      {
        questionNumber: 1,
        totalPoints: 8,
        title: "Wave-Particle Duality, Compton Shift & Thermal Radiation",
        parts: [
          {
            id: "q1-1-i",
            partNumber: "1.(I)",
            title: "Compton Scattering of 2.6 pm Photons at 30°",
            points: 2,
            type: "mcq",
            prompt: "A target containing free electrons is illuminated by photons of wavelength $\\lambda = 2.6\\text{ pm}$. The wavelength $\\lambda'$ of a photon that is scattered at $30^\\circ$ from the incident direction is:",
            options: [
              { id: "a", text: "2.925 × 10⁻¹¹ m" },
              { id: "b", text: "2.925 × 10⁻¹² m (2.925 pm)", correct: true },
              { id: "c", text: "2.925 × 10⁻¹³ m" },
              { id: "d", text: "2.925 × 10⁻¹⁴ m" },
            ],
            correctOption: "b",
            modelAnswer: {
              finalAnswer: "Option b: 2.925 × 10⁻¹² m (2.925 pm)",
              steps: [
                {
                  title: "1. Compton Shift Formula",
                  math: "\\Delta\\lambda = \\lambda' - \\lambda = \\frac{h}{m_0 c}(1 - \\cos\\theta)",
                  explanation: "The shift depends strictly on scattering angle θ and the Compton wavelength λ_c = h/(m_0 c) = 2.43 pm = 2.43 × 10⁻¹² m.",
                },
                {
                  title: "2. Substitute Given Values",
                  math: "\\Delta\\lambda = (2.43\\text{ pm})(1 - \\cos 30^\\circ) = 2.43 \\times (1 - 0.866025) = 2.43 \\times 0.133975 = 0.3256\\text{ pm}",
                  explanation: "Calculate the angular factor (1 - cos 30°) and multiply by Compton wavelength.",
                },
                {
                  title: "3. Solve for Scattered Wavelength λ'",
                  math: "\\lambda' = \\lambda + \\Delta\\lambda = 2.6\\text{ pm} + 0.3256\\text{ pm} = 2.9256\\text{ pm} = 2.925 \\times 10^{-12}\\text{ m}",
                  explanation: "Add incident wavelength λ = 2.6 pm to the wavelength shift.",
                },
              ],
              rubricPoints: [
                "1 Point: Correct Compton equation and substitution of θ = 30° and λ_c = 2.43 pm.",
                "1 Point: Correct calculation showing λ' = 2.925 × 10⁻¹² m with unit conversion.",
              ],
              examinerTip: "Notice the options differ only by power of 10. 1 pm = 10⁻¹² m, so 2.925 pm = 2.925 × 10⁻¹² m (Option b).",
            },
          },
          {
            id: "q1-1-ii",
            partNumber: "1.(II)",
            title: "Photoelectric Maximum Kinetic Energy",
            points: 2,
            type: "mcq",
            prompt: "If the work function for a certain metal is $\\Phi = 3.2 \\times 10^{-19}\\text{ J}$ and it is illuminated with light of frequency $f = 8 \\times 10^{14}\\text{ Hz}$, the maximum kinetic energy $K_{\\max}$ of the photoelectrons would be:",
            options: [
              { id: "a", text: "1.2 × 10⁻¹⁹ J" },
              { id: "b", text: "2.1 × 10⁻¹⁹ J", correct: true },
              { id: "c", text: "5.8 × 10⁻¹⁹ J" },
              { id: "d", text: "8.5 × 10⁻¹⁹ J" },
            ],
            correctOption: "b",
            modelAnswer: {
              finalAnswer: "Option b: 2.1 × 10⁻¹⁹ J",
              steps: [
                {
                  title: "1. Einstein's Photoelectric Equation",
                  math: "E_{\\text{photon}} = hf = \\Phi + K_{\\max} \\implies K_{\\max} = hf - \\Phi",
                  explanation: "Energy conservation between incident photon, metal work function, and electron kinetic energy.",
                },
                {
                  title: "2. Calculate Photon Energy hf",
                  math: "E = (6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}) \\times (8 \\times 10^{14}\\text{ s}^{-1}) = 5.304 \\times 10^{-19}\\text{ J}",
                  explanation: "Multiply Planck's constant by given frequency.",
                },
                {
                  title: "3. Subtract Work Function",
                  math: "K_{\\max} = 5.304 \\times 10^{-19}\\text{ J} - 3.200 \\times 10^{-19}\\text{ J} = 2.104 \\times 10^{-19}\\text{ J} \\approx 2.1 \\times 10^{-19}\\text{ J}",
                  explanation: "Maximum kinetic energy of liberated photoelectrons.",
                },
              ],
              rubricPoints: [
                "1 Point: Writing down Einstein's photoelectric equation.",
                "1 Point: Evaluating hf and subtracting Φ to arrive at 2.1 × 10⁻¹⁹ J.",
              ],
            },
          },
          {
            id: "q1-2",
            partNumber: "2.",
            title: "Planck's Quantum Hypothesis & Blackbody Spectral Density",
            points: 2,
            type: "conceptual",
            prompt: "Explain with a graph Planck's Quantum Hypothesis for explaining the spectral density of a black body.",
            modelAnswer: {
              finalAnswer: "Planck assumed atomic cavity wall resonators vibrate only with discrete energies E = nhf, resolving the ultraviolet catastrophe.",
              steps: [
                {
                  title: "1. Classical Breakdown (Rayleigh-Jeans)",
                  math: "u(\\lambda) = \\frac{8\\pi k_B T}{\\lambda^4}, \\quad \\lim_{\\lambda \\to 0} u(\\lambda) = \\infty",
                  explanation: "Classical physics assumed continuous equipartition ⟨E⟩ = k_B T for all modes, causing infinite energy density at short wavelengths (Ultraviolet Catastrophe).",
                },
                {
                  title: "2. Planck's Quantum Postulate",
                  math: "E_n = n h f, \\quad n = 0, 1, 2, 3, \\dots",
                  explanation: "Oscillators in cavity walls emit and absorb energy in discrete packets (quanta) of magnitude hf. High-frequency modes require large energy chunks that thermal fluctuations at temperature T cannot easily populate.",
                },
                {
                  title: "3. Average Energy & Planck Law",
                  math: "\\langle E \\rangle = \\frac{hf}{e^{\\frac{hf}{k_B T}} - 1} \\implies I(\\lambda, T) = \\frac{2\\pi h c^2}{\\lambda^5 \\left( e^{\\frac{hc}{\\lambda k_B T}} - 1 \\right)}",
                  explanation: "As λ → 0, the denominator exponential e^{hc/(λ k_B T)} grows much faster than λ⁵ shrinks, driving intensity smoothly to zero and fitting experimental curves perfectly at all wavelengths.",
                },
                {
                  title: "4. Graphical Representation",
                  explanation: "Plot showing: Spectral Energy Density vs Wavelength. Classical Rayleigh-Jeans curve (dashed) explodes to infinity as λ → 0. Planck curve rises smoothly from 0 at λ = 0, reaches Wien peak at λ_max, then asymptotically falls off at long wavelengths where it matches Rayleigh-Jeans.",
                },
              ],
              rubricPoints: [
                "0.5 Point: Statement of cavity oscillator quantization E = nhf.",
                "0.5 Point: Explanation of why high-frequency ultraviolet modes are suppressed.",
                "1.0 Point: Clean sketch of I vs λ comparing Rayleigh-Jeans divergence vs Planck curve peaking at λ_max.",
              ],
            },
          },
          {
            id: "q1-3",
            partNumber: "3.",
            title: "Definitions: Stopping Potential & Work Function",
            points: 1,
            type: "conceptual",
            prompt: "Define: (a) Stopping potential, (b) Work function.",
            modelAnswer: {
              finalAnswer: "Stopping potential V_0: minimum retarding voltage to stop all photoelectrons (K_max = eV_0). Work function Φ: minimum energy required to eject an electron from the metal surface (Φ = hf_0).",
              steps: [
                {
                  title: "(a) Stopping Potential (V_0 or V_s)",
                  math: "K_{\\max} = e V_0 \\implies V_0 = \\frac{hf - \\Phi}{e}",
                  explanation: "The minimum negative (retarding) voltage applied between anode and cathode required to reduce the photoelectric current to exactly zero, bringing the fastest photoelectrons to rest.",
                },
                {
                  title: "(b) Work Function (Φ)",
                  math: "\\Phi = h f_0 = \\frac{hc}{\\lambda_0}",
                  explanation: "The minimum binding energy required to eject the most loosely bound electron from the surface of a specific metal into vacuum with zero kinetic energy.",
                },
              ],
              rubricPoints: [
                "0.5 Point: Accurate definition of stopping potential with equation K_max = eV_0.",
                "0.5 Point: Accurate definition of work function with threshold frequency Φ = hf_0.",
              ],
            },
          },
          {
            id: "q1-4",
            partNumber: "4.",
            title: "Sun Peak Radiation Wavelength via Wien's Law",
            points: 1,
            type: "numerical",
            prompt: "If the effective surface temperature of the sun is $T = 6000\\text{ K}$, at what wavelength would you expect the sun to radiate most strongly?",
            modelAnswer: {
              finalAnswer: "λ_max = 4.83 × 10⁻⁷ m = 483 nm (Visible green-blue spectrum)",
              steps: [
                {
                  title: "1. Wien's Displacement Law",
                  math: "\\lambda_{\\max} T = b = 2.898 \\times 10^{-3}\\text{ m}\\cdot\\text{K}",
                  explanation: "Peak emission wavelength is inversely proportional to absolute surface temperature.",
                },
                {
                  title: "2. Calculation",
                  math: "\\lambda_{\\max} = \\frac{2.898 \\times 10^{-3}\\text{ m}\\cdot\\text{K}}{6000\\text{ K}} = 4.83 \\times 10^{-7}\\text{ m} = 483\\text{ nm}",
                  explanation: "The sun's peak spectral radiance falls right in the middle of the human visible spectrum (green-blue light).",
                },
              ],
              rubricPoints: [
                "0.5 Point: Stating Wien's displacement law.",
                "0.5 Point: Final value λ_max = 483 nm (4.83 × 10⁻⁷ m).",
              ],
            },
          },
        ],
      },

      // Question 2 (10 Points)
      {
        questionNumber: 2,
        totalPoints: 10,
        title: "Heisenberg Uncertainty, De Broglie, Schrödinger Derivation, Well & Tunneling",
        parts: [
          {
            id: "q2-1",
            partNumber: "1.",
            title: "Mass Determination from Position and Velocity Uncertainty",
            points: 2,
            type: "mcq",
            prompt: "The uncertainty in position and velocity of a particle are $\\Delta x = 10^{-10}\\text{ m}$ and $\\Delta v = 6.63 \\times 10^{-24}\\text{ m/s}$ respectively. Then the mass of the particle is:",
            options: [
              { id: "a", text: "0.092 Kg" },
              { id: "b", text: "0.0796 Kg", correct: true },
              { id: "c", text: "1.125 Kg" },
              { id: "d", text: "0.0879 Kg" },
            ],
            correctOption: "b",
            modelAnswer: {
              finalAnswer: "Option b: 0.0796 Kg",
              steps: [
                {
                  title: "1. Heisenberg Uncertainty Principle",
                  math: "\\Delta x \\Delta p \\ge \\frac{\\hbar}{2} = \\frac{h}{4\\pi}",
                  explanation: "Using momentum uncertainty Δp = m Δv.",
                },
                {
                  title: "2. Isolate Particle Mass m",
                  math: "\\Delta x (m \\Delta v) = \\frac{h}{4\\pi} \\implies m = \\frac{h}{4\\pi \\Delta x \\Delta v}",
                  explanation: "Rearrange to solve for minimum mass m.",
                },
                {
                  title: "3. Numerical Evaluation",
                  math: "m = \\frac{6.63 \\times 10^{-34}}{4\\pi \\times 10^{-10} \\times (6.63 \\times 10^{-24})} = \\frac{6.63 \\times 10^{-34}}{4\\pi \\times 6.63 \\times 10^{-34}} = \\frac{1}{4\\pi} = \\frac{1}{12.5664} \\approx 0.079577\\text{ kg} \\approx 0.0796\\text{ kg}",
                  explanation: "Notice the 6.63 × 10⁻³⁴ terms cancel cleanly, leaving exactly 1/(4π)!",
                },
              ],
              rubricPoints: [
                "1 Point: Formula m = h / (4π Δx Δv).",
                "1 Point: Canceling terms and evaluating 1/(4π) = 0.0796 kg.",
              ],
              examinerTip: "Classic Modern Academy question designed to test if students spot the clean cancellation of h and Δv!",
            },
          },
          {
            id: "q2-2",
            partNumber: "2.",
            title: "De Broglie Wavelength of Macroscopic Baseball",
            points: 1,
            type: "numerical",
            prompt: "Calculate the de Broglie wavelength for a baseball of mass $m = 150\\text{ g}$ traveling with speed $v = 25\\text{ m/s}$.",
            modelAnswer: {
              finalAnswer: "λ = 1.768 × 10⁻³⁴ m",
              steps: [
                {
                  title: "1. De Broglie Matter Wave Formula",
                  math: "\\lambda = \\frac{h}{p} = \\frac{h}{mv}",
                  explanation: "Matter wavelength of any body with momentum p = mv.",
                },
                {
                  title: "2. Convert Mass to SI Units & Calculate",
                  math: "m = 150\\text{ g} = 0.150\\text{ kg}, \\quad p = 0.150 \\times 25 = 3.75\\text{ kg}\\cdot\\text{m/s}",
                  explanation: "Ensure mass is in kilograms.",
                },
                {
                  title: "3. Evaluate Wavelength",
                  math: "\\lambda = \\frac{6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}}{3.75\\text{ kg}\\cdot\\text{m/s}} = 1.768 \\times 10^{-34}\\text{ m}",
                  explanation: "This wavelength is billions of times smaller than an atomic nucleus (10⁻¹⁵ m), completely undetectable, explaining why classical macroscopic objects exhibit no wave behavior.",
                },
              ],
              rubricPoints: [
                "0.5 Point: SI conversion and formula λ = h / (mv).",
                "0.5 Point: Final value 1.768 × 10⁻³⁴ m.",
              ],
            },
          },
          {
            id: "q2-3",
            partNumber: "3.",
            title: "Proof of Time-Independent Schrödinger Wave Equation (1D)",
            points: 2,
            type: "derivation",
            prompt: "Prove the Time Independent Schrödinger Wave Equation.",
            modelAnswer: {
              finalAnswer: "Eψ = - (ℏ² / 2m) d²ψ/dx² + Uψ",
              steps: [
                {
                  title: "1. Classical Total Energy Equation",
                  math: "E = K.E. + P.E. = \\frac{1}{2}mv^2 + U = \\frac{p^2}{2m} + U \\quad \\text{---(1)}",
                  explanation: "Total energy partitioned into kinetic momentum term and potential energy.",
                },
                {
                  title: "2. General Plane Wave Expression",
                  math: "\\psi(x, t) = e^{i(kx - \\omega t)}",
                  explanation: "Free particle de Broglie wave with k = p/ℏ and ω = E/ℏ.",
                },
                {
                  title: "3. Take First and Second Spatial Derivatives",
                  math: "\\frac{d\\psi}{dx} = ik e^{i(kx - \\omega t)} = ik\\psi",
                  explanation: "First derivative.",
                },
                {
                  title: "4. Second Spatial Derivative and Momentum Operator",
                  math: "\\frac{d^2\\psi}{dx^2} = (ik)^2\\psi = -k^2\\psi = -\\left(\\frac{p}{\\hbar}\\right)^2\\psi \\implies p^2\\psi = -\\hbar^2 \\frac{d^2\\psi}{dx^2} \\quad \\text{---(2)}",
                  explanation: "Relating p² to the second derivative operator using k = p/ℏ.",
                },
                {
                  title: "5. Substitute into Energy Balance (1)",
                  math: "E\\psi = \\frac{p^2}{2m}\\psi + U\\psi",
                  explanation: "Multiply equation (1) across by wavefunction ψ.",
                },
                {
                  title: "6. Substitute Equation (2)",
                  math: "E\\psi = \\frac{-\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2} + U\\psi \\quad \\text{or} \\quad \\left( -\\frac{\\hbar^2}{2m}\\frac{d^2}{dx^2} + U \\right)\\psi = E\\psi",
                  explanation: "The 1D Time-Independent Schrödinger Equation (Q.E.D.).",
                },
              ],
              rubricPoints: [
                "0.5 Point: Energy balance E = p²/(2m) + U.",
                "0.5 Point: Wavefunction differentiation d²ψ/dx² = -k²ψ.",
                "0.5 Point: Operator identity p²ψ = -ℏ² d²ψ/dx².",
                "0.5 Point: Final substitution and clean TISE statement.",
              ],
            },
          },
          {
            id: "q2-4",
            partNumber: "4.",
            title: "Infinite Square Well: First 3 Excited States & Probability Integrals",
            points: 3,
            type: "numerical",
            prompt: "An electron is confined to moving in an infinitely high potential well of width $L = 0.5\\text{ nm}$.\n(a) For the first three excited states:\n  (i) Sketch the energy level diagram and the wave function for each state.\n  (ii) Determine the energy for each state.\n(b) Mark on the figure and determine the probability of finding the electron between:\n  - $[x = L/2 \\text{ and } x = L]$ for $n = 2$ state\n  - $[x = L/3 \\text{ and } x = 2L/3]$ for $n = 3$ state.",
            modelAnswer: {
              finalAnswer: "First 3 excited states are n = 2, 3, 4! E_1 = 1.505 eV, so E_2 = 6.02 eV, E_3 = 13.55 eV, E_4 = 24.08 eV. Probability for n=2 in [L/2, L] is 1/2 (50%). Probability for n=3 in [L/3, 2L/3] is 1/3 (33.3%).",
              steps: [
                {
                  title: "1. Critical Academic Distinction: Excited States vs Quantum Number",
                  explanation: "Ground state is n = 1. Therefore, the first three EXCITED states are n = 2 (1st excited), n = 3 (2nd excited), and n = 4 (3rd excited).",
                },
                {
                  title: "2. Ground State Energy Calculation (n = 1)",
                  math: "E_1 = \\frac{h^2}{8mL^2} = \\frac{(6.63 \\times 10^{-34})^2}{8 \\times (9.11 \\times 10^{-31}) \\times (0.5 \\times 10^{-9})^2} = 2.4125 \\times 10^{-19}\\text{ J} = 1.505\\text{ eV}",
                  explanation: "Calculate fundamental ground state energy.",
                },
                {
                  title: "3. Energies of the First 3 Excited States",
                  math: "\\begin{aligned} n=2: &\\quad E_2 = 2^2 E_1 = 4 \\times 1.505\\text{ eV} = 6.02\\text{ eV} \\\\ n=3: &\\quad E_3 = 3^2 E_1 = 9 \\times 1.505\\text{ eV} = 13.55\\text{ eV} \\\\ n=4: &\\quad E_4 = 4^2 E_1 = 16 \\times 1.505\\text{ eV} = 24.08\\text{ eV} \\end{aligned}",
                  explanation: "Energy scales with n².",
                },
                {
                  title: "4. Sketches of Wavefunctions ψ_n(x)",
                  explanation: "n=2: 1 node at x = L/2, 2 antinodes (one positive half-wave, one negative half-wave). n=3: 2 nodes at x = L/3, 2L/3, 3 antinodes. n=4: 3 nodes at x = L/4, L/2, 3L/4, 4 antinodes.",
                },
                {
                  title: "5. Probability for n = 2 between x = L/2 and x = L",
                  math: "P\\left(\\frac{L}{2} \\le x \\le L\\right) = \\int_{L/2}^L \\frac{2}{L}\\sin^2\\left(\\frac{2\\pi x}{L}\\right)dx = \\frac{1}{2} = 0.50 \\quad (50\\%)",
                  explanation: "By exact symmetry of |ψ_2|², each half of the box contains exactly one equal probability lobe, integrating to 1/2.",
                },
                {
                  title: "6. Probability for n = 3 between x = L/3 and x = 2L/3",
                  math: "P\\left(\\frac{L}{3} \\le x \\le \\frac{2L}{3}\\right) = \\int_{L/3}^{2L/3} \\frac{2}{L}\\sin^2\\left(\\frac{3\\pi x}{L}\\right)dx = \\frac{1}{3} = 0.333 \\quad (33.3\\%)",
                  explanation: "State n=3 has 3 identical probability lobes spanning [0, L/3], [L/3, 2L/3], and [2L/3, L]. Integrating over the middle lobe yields exactly 1/3 of the total normalized probability.",
                },
              ],
              rubricPoints: [
                "1 Point: Recognizing excited states are n = 2, 3, 4 and correctly calculating their energies.",
                "1 Point: Accurate sketches of wavefunctions showing nodes and antinodes.",
                "1 Point: Correct integration/symmetry evaluation for probabilities (1/2 for n=2 and 1/3 for n=3).",
              ],
              examinerTip: "Dr. Abeer and Dr. Sally frequently test n=2 and n=3 interval probabilities because smart students use lobe symmetry (1/2 and 1/3) to answer instantly without messy trigonometry!",
            },
          },
          {
            id: "q2-5",
            partNumber: "5.",
            title: "Barrier Tunneling: Penetration Depth & Transmission Probability",
            points: 2,
            type: "numerical",
            prompt: "Assume an electron of energy $E = 10\\text{ eV}$ is incident on a potential barrier of height $V_0 = 17\\text{ eV}$ and width $L = 0.18\\text{ nm}$.\nI. Draw a diagram to show the particle tunneling through the potential barrier.\nII. Calculate the penetration depth and the transmission probability of the electron.",
            modelAnswer: {
              finalAnswer: "Penetration depth δ = 1/γ = 0.0738 nm (0.738 Å). Transmission probability T ≈ 7.85 × 10⁻³ (0.785%).",
              steps: [
                {
                  title: "1. Tunneling Diagram",
                  explanation: "Draw Region I (x < 0): incident + reflected sinusoid. Region II (0 < x < L): exponentially decaying wavefunction ψ_II(x) = C e^{-γ x}. Region III (x > L): transmitted sinusoid with lower amplitude.",
                },
                {
                  title: "2. Calculate Attenuation Coefficient γ",
                  math: "\\gamma = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar} = \\frac{\\sqrt{2 \\times (9.11 \\times 10^{-31}) \\times (17 - 10) \\times (1.6 \\times 10^{-19})}}{1.055 \\times 10^{-34}} = 1.355 \\times 10^{10}\\text{ m}^{-1}",
                  explanation: "Barrier height excess V_0 - E = 7 eV = 1.12 × 10⁻¹⁸ J.",
                },
                {
                  title: "3. Penetration Depth δ",
                  math: "\\delta = \\frac{1}{\\gamma} = \\frac{1}{1.355 \\times 10^{10}\\text{ m}^{-1}} = 7.38 \\times 10^{-11}\\text{ m} = 0.0738\\text{ nm} = 0.738\\text{ \\AA}",
                  explanation: "Distance inside barrier over which wavefunction amplitude drops by factor of 1/e.",
                },
                {
                  title: "4. Transmission Probability T",
                  math: "T \\approx e^{-2\\gamma L} = \\exp\\left( -2 \\times 1.355 \\times 10^{10} \\times 0.18 \\times 10^{-9} \\right) = e^{-4.878} \\approx 7.61 \\times 10^{-3} \\approx 0.0076 \\quad (0.76\\%)",
                  explanation: "Probability that electron tunnels through the 0.18 nm barrier.",
                },
              ],
              rubricPoints: [
                "0.5 Point: Accurate schematic of tunneling wavefunction decay through barrier.",
                "0.5 Point: Calculation of attenuation coefficient γ = 1.355 × 10¹⁰ m⁻¹.",
                "0.5 Point: Penetration depth δ = 1/γ = 0.0738 nm.",
                "0.5 Point: Transmission probability T = e^{-2γL} ≈ 7.6 × 10⁻³.",
              ],
            },
          },
        ],
      },

      // Question 3 (12 Points)
      {
        questionNumber: 3,
        totalPoints: 12,
        title: "Bohr Model, Rydberg Derivation, Quantum Numbers & Electron Transitions",
        parts: [
          {
            id: "q3-1",
            partNumber: "1.",
            title: "Hydrogen Emission Transition Wavelength n_i = 4 to n_f = 2",
            points: 2,
            type: "mcq",
            prompt: "The wavelength of the spectral lines in hydrogen atom associated with the transition from the energy state $n_i = 4$ to $n_f = 2$ state is:",
            options: [
              { id: "a", text: "4.8617 × 10⁻⁷ m (486.17 nm)", correct: true },
              { id: "b", text: "4.8617 × 10⁻⁸ m" },
              { id: "c", text: "4.8617 × 10⁻⁹ m" },
              { id: "d", text: "4.8617 × 10⁻¹⁰ m" },
            ],
            correctOption: "a",
            modelAnswer: {
              finalAnswer: "Option a: 4.8617 × 10⁻⁷ m (Balmer H_β line, green-blue)",
              steps: [
                {
                  title: "1. Rydberg Formula",
                  math: "\\frac{1}{\\lambda} = R_H\\left( \\frac{1}{n_f^2} - \\frac{1}{n_i^2} \\right)",
                  explanation: "R_H = 1.097 × 10⁷ m⁻¹, n_f = 2, n_i = 4.",
                },
                {
                  title: "2. Calculate Wavelength",
                  math: "\\frac{1}{\\lambda} = 1.097 \\times 10^7 \\left( \\frac{1}{4} - \\frac{1}{16} \\right) = 1.097 \\times 10^7 \\times \\frac{3}{16} = 2.056875 \\times 10^6\\text{ m}^{-1}",
                  explanation: "Evaluate inverse wavelength.",
                },
                {
                  title: "3. Invert for λ",
                  math: "\\lambda = \\frac{1}{2.056875 \\times 10^6} = 4.86175 \\times 10^{-7}\\text{ m} = 486.17\\text{ nm}",
                  explanation: "Corresponds to the famous H_β visible line in the Balmer series.",
                },
              ],
              rubricPoints: [
                "1 Point: Stating Rydberg equation and correct substitution.",
                "1 Point: Option a (4.8617 × 10⁻⁷ m).",
              ],
            },
          },
          {
            id: "q3-2",
            partNumber: "2.",
            title: "Pauli Exclusion Principle & Hund's Rule",
            points: 2,
            type: "conceptual",
            prompt: "State: (a) Pauli Exclusion Principle, (b) Hund's Rule.",
            modelAnswer: {
              finalAnswer: "Pauli: No two electrons in an atom can have the exact same 4 quantum numbers (n, l, m_l, m_s). Hund: Electrons in degenerate orbitals remain unpaired with parallel spins whenever possible.",
              steps: [
                {
                  title: "(a) Pauli Exclusion Principle",
                  explanation: "No two electrons in a single atom can simultaneously possess the identical set of all four quantum numbers (n, l, m_l, m_s). Consequently, each orbital defined by (n, l, m_l) can hold at most two electrons with opposite spins (m_s = +1/2, -1/2).",
                },
                {
                  title: "(b) Hund's Rule of Maximum Multiplicity",
                  explanation: "When electrons occupy degenerate subshell orbitals of equal energy (e.g. 2p_x, 2p_y, 2p_z), they will singly occupy each orbital with parallel spins before any pairing occurs, minimizing inter-electron electrostatic repulsion.",
                },
              ],
              rubricPoints: [
                "1 Point: Rigorous statement of Pauli Exclusion specifying all 4 quantum numbers.",
                "1 Point: Rigorous statement of Hund's rule specifying degenerate orbitals and parallel spins.",
              ],
            },
          },
          {
            id: "q3-3",
            partNumber: "3.",
            title: "Proof of the Rydberg Formula",
            points: 2,
            type: "derivation",
            prompt: "Proof that: $\\frac{1}{\\lambda} = R_H\\left( \\frac{1}{n_f^2} - \\frac{1}{n_i^2} \\right)$",
            modelAnswer: {
              finalAnswer: "1/λ = R_H (1/n_f² - 1/n_i²)",
              steps: [
                {
                  title: "1. Bohr Energy Level Equation",
                  math: "E_n = \\frac{E_1}{n^2}, \\quad \\text{where } E_1 = -13.6\\text{ eV}",
                  explanation: "Allowed discrete energy eigenvalues for hydrogen atom.",
                },
                {
                  title: "2. Photon Emission Energy Balance",
                  math: "\\Delta E = E_i - E_f = hf = h\\frac{c}{\\lambda}",
                  explanation: "Energy emitted during transition from initial state n_i to final lower state n_f.",
                },
                {
                  title: "3. Express Difference in Energies",
                  math: "hf = \\frac{E_1}{n_i^2} - \\frac{E_1}{n_f^2} = E_1 \\left( \\frac{1}{n_i^2} - \\frac{1}{n_f^2} \\right) = -E_1 \\left( \\frac{1}{n_f^2} - \\frac{1}{n_i^2} \\right)",
                  explanation: "Factor out -E_1.",
                },
                {
                  title: "4. Solve for 1/λ and Define Rydberg Constant",
                  math: "\\frac{1}{\\lambda} = \\frac{-E_1}{hc}\\left( \\frac{1}{n_f^2} - \\frac{1}{n_i^2} \\right) = R_H\\left( \\frac{1}{n_f^2} - \\frac{1}{n_i^2} \\right), \\quad \\text{where } R_H = \\frac{-E_1}{hc}",
                  explanation: "Q.E.D.",
                },
              ],
              rubricPoints: [
                "0.5 Point: Bohr energy level expression E_n = E_1 / n².",
                "0.5 Point: Frequency-energy relation ΔE = hf = hc/λ.",
                "1.0 Point: Algebraic factoring showing R_H = -E_1 / (hc).",
              ],
            },
          },
          {
            id: "q3-4",
            partNumber: "4.",
            title: "The 4 Quantum Numbers Characterizing the Atom",
            points: 2,
            type: "conceptual",
            prompt: "How many quantum numbers characterize the atom? State the function and allowed values for each one.",
            modelAnswer: {
              finalAnswer: "Four quantum numbers: n (principal/size/energy), l (orbital angular momentum/shape), m_l (magnetic/orientation), m_s (electron spin).",
              steps: [
                {
                  title: "1. Principal Quantum Number (n)",
                  math: "n = 1, 2, 3, \\dots",
                  explanation: "Determines the main energy level of the electron and the radial size (average distance) of the electron cloud from the nucleus.",
                },
                {
                  title: "2. Orbital Angular Momentum Quantum Number (l)",
                  math: "l = 0, 1, 2, \\dots, (n-1) \\quad (s, p, d, f)",
                  explanation: "Determines orbital angular momentum magnitude L = √(l(l+1))ℏ and geometric shape of the orbital (s = sphere, p = dumbbell, etc.).",
                },
                {
                  title: "3. Magnetic Quantum Number (m_l)",
                  math: "m_l = -l, -(l-1), \\dots, 0, \\dots, +l \\quad (2l+1 \\text{ values})",
                  explanation: "Determines the spatial orientation of the orbital in an external magnetic field (Zeeman splitting).",
                },
                {
                  title: "4. Spin Magnetic Quantum Number (m_s)",
                  math: "m_s = +1/2, -1/2",
                  explanation: "Intrinsic angular momentum (spin orientation: spin-up or spin-down) of the electron itself.",
                },
              ],
              rubricPoints: [
                "0.5 Point for each accurately defined quantum number with allowed values and physical function.",
              ],
            },
          },
          {
            id: "q3-5",
            partNumber: "5.",
            title: "Analysis of 5 Hydrogen Transitions",
            points: 2,
            type: "conceptual",
            prompt: "Following are five possible transitions for a hydrogen atom:\n(i) $n_i = 1; n_f = 3$\n(ii) $n_i = 6; n_f = 2$\n(iii) $n_i = 7; n_f = 3$\n(iv) $n_i = 6; n_f = 1$\n(v) $n_i = 3; n_f = 6$\n(a) Draw these transitions.\n(b) Which transition will emit the shortest-wavelength photon?\n(c) For which transition will the atom gain the most energy?\n(d) For which transition(s) does the atom lose energy?\n(e) Name the series associated with the emitted light.",
            modelAnswer: {
              finalAnswer: "(b) Shortest wavelength: (iv) 6 → 1 (Lyman). (c) Most energy gained: (i) 1 → 3 (absorption 12.09 eV). (d) Atom loses energy: (ii), (iii), (iv). (e) Series: (iv) Lyman, (ii) Balmer, (iii) Paschen.",
              steps: [
                {
                  title: "(a) Transition Diagrams",
                  explanation: "Draw horizontal energy levels n = 1, 2, 3, 4, 5, 6, 7. Transitions with downward arrows emit photons (energy lost); upward arrows absorb photons (energy gained).",
                },
                {
                  title: "(b) Shortest Wavelength Emission (Highest ΔE)",
                  math: "\\Delta E = 13.6\\left(1 - \\frac{1}{36}\\right) = 13.22\\text{ eV}, \\quad \\lambda = \\frac{1240}{13.22} = 93.8\\text{ nm}",
                  explanation: "Transition (iv) n_i = 6 → n_f = 1 has the largest downward energy drop, producing the highest energy photon, hence the shortest wavelength.",
                },
                {
                  title: "(c) Greatest Energy Gain (Upward Transition)",
                  math: "\\Delta E = 13.6\\left(1 - \\frac{1}{9}\\right) = 12.09\\text{ eV}",
                  explanation: "Transition (i) n = 1 → 3 requires absorbing 12.09 eV, whereas transition (v) n = 3 → 6 only requires 13.6(1/9 - 1/36) = 1.13 eV. Therefore, transition (i) gains the most energy.",
                },
                {
                  title: "(d) Energy Loss (Photons Emitted)",
                  explanation: "Downward transitions lose energy: (ii) 6 → 2, (iii) 7 → 3, (iv) 6 → 1.",
                },
                {
                  title: "(e) Series Names for Emitted Lines",
                  explanation: "(iv) ends at n_f = 1: Lyman Series (UV). (ii) ends at n_f = 2: Balmer Series (Visible). (iii) ends at n_f = 3: Paschen Series (Infrared).",
                },
              ],
              rubricPoints: [
                "0.5 Point: Accurate energy level sketch.",
                "0.5 Point: Shortest wavelength identified as (iv) 6 → 1.",
                "0.5 Point: Most energy gained identified as (i) 1 → 3.",
                "0.5 Point: Series correctly named (Lyman, Balmer, Paschen).",
              ],
            },
          },
          {
            id: "q3-6",
            partNumber: "6.",
            title: "Hydrogen n = 2 to n = 1 Lyman-α Transition",
            points: 1,
            type: "numerical",
            prompt: "The electron in a hydrogen atom at rest makes a transition from the $n = 2$ energy state to the $n = 1$ ground state. Find the wavelength and energy (in eV) of the emitted photon.",
            modelAnswer: {
              finalAnswer: "Energy ΔE = 10.2 eV, Wavelength λ = 1.216 × 10⁻⁷ m = 121.6 nm (Lyman-α line in ultraviolet)",
              steps: [
                {
                  title: "1. Calculate Energy Difference",
                  math: "\\Delta E = E_2 - E_1 = \\frac{-13.6}{4} - (-13.6) = -3.4 - (-13.6) = 10.2\\text{ eV}",
                  explanation: "Photon energy is 10.2 eV.",
                },
                {
                  title: "2. Convert to Joules",
                  math: "\\Delta E = 10.2 \\times 1.6 \\times 10^{-19}\\text{ J} = 1.632 \\times 10^{-18}\\text{ J}",
                  explanation: "Energy in SI units.",
                },
                {
                  title: "3. Calculate Wavelength",
                  math: "\\lambda = \\frac{hc}{\\Delta E} = \\frac{6.63 \\times 10^{-34} \\times 3 \\times 10^8}{1.632 \\times 10^{-18}} = 1.2187 \\times 10^{-7}\\text{ m} \\approx 121.6\\text{ nm}",
                  explanation: "This is the primary Lyman-alpha line in the ultraviolet range.",
                },
              ],
              rubricPoints: [
                "0.5 Point: Energy ΔE = 10.2 eV.",
                "0.5 Point: Wavelength λ = 121.6 nm (1.216 × 10⁻⁷ m).",
              ],
            },
          },
        ],
      },

      // Question 4 (10 Points)
      {
        questionNumber: 4,
        totalPoints: 10,
        title: "Special Relativity: Length Contraction, Galilean Time & Event Transformations",
        parts: [
          {
            id: "q4-1-i",
            partNumber: "1.(I)",
            title: "Length Contraction when Relativistic Mass is 5/4 Rest Mass",
            points: 2,
            type: "mcq",
            prompt: "The length of a meter stick moving parallel to its length when its relativistic mass is $5/4$ of its rest mass is:",
            options: [
              { id: "a", text: "0.76 m" },
              { id: "b", text: "0.67 m" },
              { id: "c", text: "1.25 m" },
              { id: "d", text: "0.80 m", correct: true },
            ],
            correctOption: "d",
            modelAnswer: {
              finalAnswer: "Option d: 0.80 m",
              steps: [
                {
                  title: "1. Relativistic Mass Equation",
                  math: "m = \\gamma m_0 = \\frac{5}{4}m_0 \\implies \\gamma = \\frac{5}{4} = 1.25",
                  explanation: "The Lorentz factor γ is directly equal to 5/4.",
                },
                {
                  title: "2. Length Contraction Equation",
                  math: "L = \\frac{L_p}{\\gamma}",
                  explanation: "Length in direction of motion contracts by 1/γ relative to proper length L_p = 1.0 m.",
                },
                {
                  title: "3. Evaluate Length",
                  math: "L = \\frac{1.0\\text{ m}}{5/4} = \\frac{4}{5}\\text{ m} = 0.80\\text{ m}",
                  explanation: "Contracted length is exactly 0.80 m.",
                },
              ],
              rubricPoints: [
                "1 Point: Deducing γ = 5/4 from m = γ m_0.",
                "1 Point: Calculating contracted length L = 1/γ = 0.80 m.",
              ],
            },
          },
          {
            id: "q4-1-ii",
            partNumber: "1.(II)",
            title: "Process Duration in Galilean Relativity",
            points: 2,
            type: "mcq",
            prompt: "A certain process requires $5 \\times 10^{-6}\\text{ s}$ to occur in an atom in laboratory. How much time will this process require to an observer in the laboratory, when the atom is moving with a speed of $5 \\times 10^9\\text{ cm/s}$ in the view of Galileo?",
            options: [
              { id: "a", text: "5 × 10⁻⁶ s", correct: true },
              { id: "b", text: "5.065 × 10⁻⁴ s" },
              { id: "c", text: "6.013 × 10⁻⁴ s" },
              { id: "d", text: "7.013 × 10⁻⁴ s" },
            ],
            correctOption: "a",
            modelAnswer: {
              finalAnswer: "Option a: 5 × 10⁻⁶ s",
              steps: [
                {
                  title: "1. Galilean Transformation of Time",
                  math: "t' = t \\implies \\Delta t' = \\Delta t",
                  explanation: "In Galilean classical mechanics, time is absolute and completely invariant across all frames of reference regardless of relative speed.",
                },
                {
                  title: "2. Conclusion",
                  explanation: "Under the classical Galilean worldview specified in the question ('in the view of Galileo'), time intervals are identical in all reference frames: Δt = 5 × 10⁻⁶ s.",
                },
              ],
              rubricPoints: [
                "1 Point: Citing Galilean time invariance t' = t.",
                "1 Point: Selecting Option a (5 × 10⁻⁶ s).",
              ],
              examinerTip: "Notice the trick phrasing: 'in the view of Galileo'! If it said Einstein/Lorentz, time dilation would apply. But under Galileo, time is universal and unchanged!",
            },
          },
          {
            id: "q4-2",
            partNumber: "2.",
            title: "Complete Classical Physics Principles",
            points: 2,
            type: "conceptual",
            prompt: "Complete the following:\n(a) Newtonian mechanics still maintaining its excellent agreement with experiment at ________ speeds.\n(b) We can apply Newton's laws in ________ frames of reference.\n(c) Due to Galilean Transformations, acceleration is ________.",
            modelAnswer: {
              finalAnswer: "(a) low / non-relativistic (v << c), (b) inertial, (c) invariant / unchanged (a' = a).",
              steps: [
                {
                  title: "(a) Low speeds",
                  explanation: "At velocities much lower than the speed of light (v << c), Newtonian mechanics is an extraordinarily accurate approximation.",
                },
                {
                  title: "(b) Inertial frames",
                  explanation: "Newton's laws of motion hold strictly in non-accelerating, inertial reference frames.",
                },
                {
                  title: "(c) Invariant acceleration",
                  explanation: "Since x' = x - vt and t' = t, differentiating twice gives d²x'/dt'² = d²x/dt² (a' = a). Acceleration is invariant under Galilean transformations.",
                },
              ],
              rubricPoints: [
                "0.7 Point: 'low' or 'non-relativistic'.",
                "0.7 Point: 'inertial'.",
                "0.6 Point: 'invariant', 'unchanged', or 'the same'.",
              ],
            },
          },
          {
            id: "q4-3",
            partNumber: "3.",
            title: "Galilean vs Lorentz Event Transformations",
            points: 4,
            type: "numerical",
            prompt: "An event occurs at $x = 100\\text{ m}, y = 10\\text{ m}, z = 5\\text{ m}$ and $t = 1 \\times 10^{-4}\\text{ s}$ in a frame $S$. Find the coordinates of this event in a frame $S'$ which is moving with velocity $v = 2.7 \\times 10^8\\text{ m/s}$ with respect to the frame $S$ along the common $x-x'$ axes using:\n(i) Galilean transformation\n(ii) Lorentz transformation.",
            modelAnswer: {
              finalAnswer: "(i) Galilean: x' = -26,900 m, y' = 10 m, z' = 5 m, t' = 10⁻⁴ s. (ii) Lorentz: x' = -61,713 m, y' = 10 m, z' = 5 m, t' = 2.287 × 10⁻⁴ s (with γ = 2.294).",
              steps: [
                {
                  title: "1. Galilean Coordinate Transformation (i)",
                  math: "\\begin{aligned} x' &= x - vt = 100 - (2.7 \\times 10^8 \\times 10^{-4}) = 100 - 27,000 = -26,900\\text{ m} \\\\ y' &= y = 10\\text{ m} \\\\ z' &= z = 5\\text{ m} \\\\ t' &= t = 1 \\times 10^{-4}\\text{ s} \\end{aligned}",
                  explanation: "Direct application of classical Galilean formulas.",
                },
                {
                  title: "2. Calculate Relativistic Lorentz Factor γ (ii)",
                  math: "\\frac{v}{c} = \\frac{2.7 \\times 10^8}{3 \\times 10^8} = 0.90 \\implies \\left(\\frac{v}{c}\\right)^2 = 0.81",
                  explanation: "Compute velocity ratio.",
                },
                {
                  title: "3. Evaluate Lorentz Factor γ",
                  math: "\\gamma = \\frac{1}{\\sqrt{1 - 0.81}} = \\frac{1}{\\sqrt{0.19}} = \\frac{1}{0.43589} \\approx 2.294157",
                  explanation: "Lorentz factor for v = 0.9c.",
                },
                {
                  title: "4. Lorentz Transformed Spatial Coordinate x'",
                  math: "x' = \\gamma(x - vt) = 2.294157 \\times (-26,900\\text{ m}) = -61,712.8\\text{ m} \\approx -61,713\\text{ m}",
                  explanation: "Lorentz contraction and frame displacement.",
                },
                {
                  title: "5. Lorentz Transformed Time Coordinate t'",
                  math: "t' = \\gamma\\left( t - \\frac{vx}{c^2} \\right) = 2.294157 \\times \\left( 10^{-4} - \\frac{2.7 \\times 10^8 \\times 100}{(3 \\times 10^8)^2} \\right)",
                  explanation: "Substitute values into Lorentz time equation.",
                },
                {
                  title: "6. Evaluate t'",
                  math: "\\frac{vx}{c^2} = \\frac{2.7 \\times 10^{10}}{9 \\times 10^{16}} = 3.0 \\times 10^{-7}\\text{ s} \\implies t' = 2.294157 \\times (1000 \\times 10^{-7} - 3 \\times 10^{-7}) = 2.28727 \\times 10^{-4}\\text{ s}",
                  explanation: "y' = y = 10 m and z' = z = 5 m remain unaltered.",
                },
              ],
              rubricPoints: [
                "1.5 Points: Correct Galilean coordinates (x' = -26,900 m, t' = 10⁻⁴ s).",
                "1.0 Point: Correct computation of γ = 2.294.",
                "1.5 Points: Correct Lorentz coordinates (x' = -61,713 m, t' = 2.287 × 10⁻⁴ s).",
              ],
            },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // EXAM 2: Spring 2019/2020 (11/7/2020) - ELC 214
  // -------------------------------------------------------------
  {
    id: "exam-2019-2020-spring",
    academicYear: "2019/2020",
    semester: "Spring",
    examDate: "11/7/2020",
    subjectCode: "ELC 214",
    subjectName: "Physics 3",
    specialization: "2nd Comp. & Comm.",
    examiners: ["Dr. L. I. Soliman", "Dr. Sally Eladly"],
    duration: "2 Hours",
    totalPoints: 60,
    totalPages: 2,
    constantsProvided: [
      "h = 6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}",
      "e = 1.6 \\times 10^{-19}\\text{ C}",
      "\\sigma = 5.67 \\times 10^{-8}\\text{ W}/(\\text{m}^2\\text{K}^4)",
      "c = 3 \\times 10^8\\text{ m/s}",
      "R_H = 1.097 \\times 10^7\\text{ m}^{-1}",
      "k_B = 1.38 \\times 10^{-23}\\text{ J/K}",
      "k_B = 8.125 \\times 10^{-5}\\text{ eV}/^\\circ\\text{C}",
      "h/(m_0 c) = 2.43\\text{ pm}",
      "m_e = 9.11 \\times 10^{-31}\\text{ kg}",
    ],
    questions: [
      // Question 1 (15 Points)
      {
        questionNumber: 1,
        totalPoints: 15,
        title: "Blackbody Temperature Scaling, Compton Recoil, Photoelectric & Sodium Work Function",
        parts: [
          {
            id: "2019-q1-1-a",
            partNumber: "1.(a)",
            title: "Blackbody Radiation as Temperature Increases",
            points: 3,
            type: "mcq",
            prompt: "Regarding blackbody radiation, as the temperature of the radiating object increases:",
            options: [
              { id: "a", text: "The maximum intensity increases and the peak wavelength decreases", correct: true },
              { id: "b", text: "The maximum intensity decreases and the peak wavelength increases" },
              { id: "c", text: "Both the maximum intensity and the peak wavelength decrease" },
              { id: "d", text: "Both the maximum intensity and the peak wavelength increase" },
            ],
            correctOption: "a",
            modelAnswer: {
              finalAnswer: "Option a: Maximum intensity increases and peak wavelength decreases.",
              steps: [
                {
                  title: "1. Stefan-Boltzmann Law for Intensity",
                  math: "I_{\\text{total}} = \\sigma T^4",
                  explanation: "Total radiant intensity increases extremely rapidly as the fourth power of temperature.",
                },
                {
                  title: "2. Wien's Displacement Law for Peak Wavelength",
                  math: "\\lambda_{\\max} = \\frac{b}{T} \\implies \\lambda_{\\max} \\propto \\frac{1}{T}",
                  explanation: "As temperature increases, peak wavelength shifts inversely toward shorter wavelengths (blue-shifted peak).",
                },
              ],
              rubricPoints: [
                "1.5 Points: Citing Wien's law λ_max ∝ 1/T.",
                "1.5 Points: Citing Stefan-Boltzmann law I ∝ T⁴.",
              ],
            },
          },
          {
            id: "2019-q1-1-b",
            partNumber: "1.(b)",
            title: "Kinetic Energy of Stationary Recoil Electron after Compton Scattering",
            points: 3,
            type: "mcq",
            prompt: "An X-ray photon is scattered by an originally stationary electron. After scattering, the kinetic energy of the recoil electron is:",
            options: [
              { id: "a", text: "Decrease" },
              { id: "b", text: "Increase", correct: true },
              { id: "c", text: "Increase and then decrease" },
              { id: "d", text: "Unchanged" },
            ],
            correctOption: "b",
            modelAnswer: {
              finalAnswer: "Option b: Increase (from zero initially to a positive non-zero value).",
              steps: [
                {
                  title: "1. Conservation of Energy in Compton Collision",
                  math: "hf + m_0 c^2 = hf' + (m_0 c^2 + K_e) \\implies K_e = hf - hf' = hc\\left( \\frac{1}{\\lambda} - \\frac{1}{\\lambda'} \\right)",
                  explanation: "The electron was initially stationary, meaning its initial kinetic energy was strictly zero (K_initial = 0).",
                },
                {
                  title: "2. Kinetic Energy Transfer",
                  explanation: "Since the scattered photon wavelength increases (λ' > λ), the photon loses energy (hf' < hf). By conservation of energy, this lost photon energy is transferred directly to the electron as recoil kinetic energy K_e > 0. Thus, its kinetic energy increases.",
                },
              ],
              rubricPoints: [
                "1.5 Points: Stating initial K = 0.",
                "1.5 Points: Showing K_e = hf - hf' > 0 from energy conservation.",
              ],
            },
          },
          {
            id: "2019-q1-2",
            partNumber: "2.",
            title: "Photoelectric Effect Features: I-V Curves & K_max vs Frequency",
            points: 4,
            type: "conceptual",
            prompt: "Discuss the Photoelectric effect features with a sketching diagram to show the variation of photoelectric current versus applied potential difference for different light intensities, and explain the relation between the frequency of incident light and the kinetic energy of ejected electrons.",
            modelAnswer: {
              finalAnswer: "Photoelectric current increases with intensity but stopping potential V_0 is invariant. K_max increases linearly with frequency above threshold f_0.",
              steps: [
                {
                  title: "1. Photocurrent vs Applied Voltage (I-V Diagram)",
                  explanation: "Sketch: Curves for intensities I_2 > I_1. At positive voltage, currents plateau to saturation levels I_sat,2 > I_sat,1 proportional to intensity. Crucially, both curves converge at the exact same negative stopping potential -V_0 on the voltage axis, proving that electron kinetic energy is independent of light intensity.",
                },
                {
                  title: "2. Frequency vs Maximum Kinetic Energy (K_max vs f Diagram)",
                  math: "K_{\\max} = hf - \\Phi = h(f - f_0)",
                  explanation: "Sketch: A straight line with slope equal to Planck's constant h and x-intercept equal to cutoff frequency f_0. Below f_0, no photoelectrons are emitted regardless of light intensity or illumination duration.",
                },
              ],
              rubricPoints: [
                "2 Points: Accurate I vs V sketch showing same -V_0 and different saturation currents.",
                "2 Points: Accurate K_max vs f sketch with slope h, threshold f_0, and work function intercept.",
              ],
            },
          },
          {
            id: "2019-q1-3",
            partNumber: "3.",
            title: "Compton Effect: Proof that Shift is Independent of Frequency",
            points: 2,
            type: "derivation",
            prompt: "Explain the Compton Effect then show that the Compton shift is independent of the frequency of the incident photon.",
            modelAnswer: {
              finalAnswer: "Δλ = (h / m_0 c)(1 - cos θ), which depends exclusively on scattering angle θ and fundamental constants (h, m_0, c), completely independent of incident photon frequency f.",
              steps: [
                {
                  title: "1. Physical Mechanism",
                  explanation: "Compton scattering is a relativistic elastic collision between an incident high-energy X-ray photon and an atomic electron (treated as free and stationary).",
                },
                {
                  title: "2. The Derived Shift Formula",
                  math: "\\Delta\\lambda = \\lambda' - \\lambda = \\frac{h}{m_0 c}(1 - \\cos\\theta)",
                  explanation: "The change in wavelength Δλ contains only Planck's constant h, electron rest mass m_0, speed of light c, and scattering angle θ.",
                },
                {
                  title: "3. Independence Conclusion",
                  explanation: "The frequency of the incident photon f does not appear anywhere in the formula for Δλ. Therefore, whether the incident radiation is soft X-rays, hard X-rays, or Gamma rays, the wavelength shift at any given angle θ is identically constant.",
                },
              ],
              rubricPoints: [
                "1 Point: Explanation of relativistic elastic collision.",
                "1 Point: Demonstrating Δλ = λ_c(1 - cos θ) contains no frequency term.",
              ],
            },
          },
          {
            id: "2019-q1-4",
            partNumber: "4.",
            title: "Sodium Metal Work Function, Red Light & Cutoff Wavelength",
            points: 3,
            type: "numerical",
            prompt: "The energy needed to remove an electron from metallic sodium is $\\Phi = 2.28\\text{ eV}$.\n(a) Does sodium show a photoelectric effect for red light with $\\lambda = 680\\text{ nm}$?\n(b) What is the cutoff wavelength for photoelectric emission from sodium, and to what color does this wavelength correspond?",
            modelAnswer: {
              finalAnswer: "(a) No photoelectric effect for red light (E_photon = 1.82 eV < 2.28 eV). (b) Cutoff wavelength λ_0 = 544 nm, corresponding to green light.",
              steps: [
                {
                  title: "1. Calculate Red Light Photon Energy (a)",
                  math: "E_{\\text{photon}} = \\frac{hc}{\\lambda} = \\frac{1240\\text{ eV}\\cdot\\text{nm}}{680\\text{ nm}} = 1.8235\\text{ eV}",
                  explanation: "Evaluate photon energy in electron-volts.",
                },
                {
                  title: "2. Compare with Work Function Φ",
                  math: "E_{\\text{photon}} = 1.82\\text{ eV} < \\Phi = 2.28\\text{ eV}",
                  explanation: "Since incident photon energy is less than the work function, no electrons can be liberated. Therefore, sodium will NOT show photoelectric emission for red light.",
                },
                {
                  title: "3. Calculate Cutoff (Threshold) Wavelength λ_0 (b)",
                  math: "\\lambda_0 = \\frac{hc}{\\Phi} = \\frac{1240\\text{ eV}\\cdot\\text{nm}}{2.28\\text{ eV}} = 543.86\\text{ nm} \\approx 544\\text{ nm}",
                  explanation: "Maximum wavelength that can induce emission.",
                },
                {
                  title: "4. Spectral Color Identification",
                  explanation: "Wavelength λ_0 = 544 nm falls directly in the Green portion of the visible spectrum (approx. 500 nm - 565 nm).",
                },
              ],
              rubricPoints: [
                "1.5 Points: Proving E_photon = 1.82 eV < 2.28 eV hence NO emission.",
                "1.5 Points: Calculating λ_0 = 544 nm and identifying color as Green.",
              ],
            },
          },
        ],
      },

      // Question 2 (15 Points)
      {
        questionNumber: 2,
        totalPoints: 15,
        title: "Heisenberg Momentum Uncertainty, Normalization, Definitions, Tunneling & Well",
        parts: [
          {
            id: "2019-q2-1-a",
            partNumber: "1.(a)",
            title: "Uncertainty in Momentum for Given Position Uncertainty",
            points: 3,
            type: "mcq",
            prompt: "If the uncertainty in position of an electron in a certain state is $\\Delta x = 4 \\times 10^{-10}\\text{ m}$, then the uncertainty in its momentum is:",
            options: [
              { id: "a", text: "3 × 10⁻²⁴ Kg·m/s" },
              { id: "b", text: "2 × 10⁻²⁴ Kg·m/s", correct: true },
              { id: "c", text: "4 × 10⁻²⁴ Kg·m/s" },
              { id: "d", text: "5 × 10⁻²⁴ Kg·m/s" },
            ],
            correctOption: "b",
            modelAnswer: {
              finalAnswer: "Option b: 2 × 10⁻²⁴ Kg·m/s (using order-of-magnitude Heisenberg relation Δx Δp ≈ h)",
              steps: [
                {
                  title: "1. Uncertainty Relation Application",
                  math: "\\Delta p \\ge \\frac{\\hbar}{2 \\Delta x} = \\frac{1.055 \\times 10^{-34}}{2 \\times (4 \\times 10^{-10})} = 1.32 \\times 10^{-25}\\text{ kg}\\cdot\\text{m/s}",
                  explanation: "Rigorous lower bound.",
                },
                {
                  title: "2. Exam Textbook Convention (Δx Δp ≈ h)",
                  math: "\\Delta p \\approx \\frac{h}{\\Delta x} = \\frac{6.63 \\times 10^{-34}}{4 \\times 10^{-10}} = 1.6575 \\times 10^{-24} \\approx 2 \\times 10^{-24}\\text{ Kg}\\cdot\\text{m/s}",
                  explanation: "Modern Academy textbook uses the engineering order-of-magnitude form Δx Δp ≈ h, rounding 1.66 × 10⁻²⁴ to 2 × 10⁻²⁴ Kg·m/s.",
                },
              ],
              rubricPoints: [
                "1.5 Points: Setting up formula Δp ≈ h / Δx.",
                "1.5 Points: Selecting Option b (2 × 10⁻²⁴ Kg·m/s).",
              ],
            },
          },
          {
            id: "2019-q2-1-b",
            partNumber: "1.(b)",
            title: "Wavefunction Normalization Integral",
            points: 2,
            type: "mcq",
            prompt: "If the probability density $P(x)$ for a particle moving along the x-axis is normalized, then:",
            options: [
              { id: "a", text: "∫₀^∞ |Ψ(x)|² dt = 1" },
              { id: "b", text: "∫_a^b |Ψ(x)|² dx = 1" },
              { id: "c", text: "∫_{-∞}^∞ |Ψ(x)|² dx = 1", correct: true },
              { id: "d", text: "∫_{-∞}^∞ |Ψ(x)|² dt = 1" },
            ],
            correctOption: "c",
            modelAnswer: {
              finalAnswer: "Option c: ∫_{-∞}^∞ |Ψ(x)|² dx = 1",
              steps: [
                {
                  title: "1. Born Statistical Interpretation",
                  math: "\\int_{-\\infty}^{+\\infty} |\\Psi(x, t)|^2 dx = 1",
                  explanation: "The total probability of finding the particle somewhere along the entire real x-axis (-∞ to +∞) at any time t must equal certainty (100% or 1). Note that integration must be with respect to spatial coordinate dx, not time dt.",
                },
              ],
              rubricPoints: [
                "1 Point: Identifying spatial integral over full range (-∞ to +∞).",
                "1 Point: Selecting Option c.",
              ],
            },
          },
          {
            id: "2019-q2-2",
            partNumber: "2.",
            title: "Definitions: Wave Groups, Wave Function Ψ & Probability Density |Ψ|²",
            points: 3,
            type: "conceptual",
            prompt: "Define:\n(a) Wave Groups\n(b) The wave function Ψ\n(c) Probability density |Ψ|²",
            modelAnswer: {
              finalAnswer: "Wave group: superposition of matter waves forming localized packet moving at group velocity v_g. Wavefunction Ψ: complex amplitude describing quantum state. Probability density |Ψ|²: probability per unit length of detecting particle at position x.",
              steps: [
                {
                  title: "(a) Wave Groups (Wave Packet)",
                  explanation: "A localized packet of waves formed by the superposition of multiple sinusoidal matter waves of slightly differing wavelengths and frequencies. The envelope of the wave group moves with the group velocity v_g = dω/dk, which equals the actual classical velocity of the particle.",
                },
                {
                  title: "(b) The Wave Function (Ψ)",
                  explanation: "A complex mathematical function Ψ(x, t) that contains all physically measurable information about the dynamical state of a quantum system.",
                },
                {
                  title: "(c) Probability Density (|Ψ|²)",
                  math: "P(x) = |\\Psi(x, t)|^2 = \\Psi^* \\Psi",
                  explanation: "The probability per unit spatial interval of finding the particle at position x at time t. The probability of detection in interval [x, x+dx] is |Ψ|² dx.",
                },
              ],
              rubricPoints: [
                "1 Point for each complete definition with physical interpretation.",
              ],
            },
          },
          {
            id: "2019-q2-3",
            partNumber: "3.",
            title: "Barrier Penetration Sketch, Transmission T & Applications",
            points: 3,
            type: "conceptual",
            prompt: "Sketch a graph to show the wave penetrating into the barrier and beyond it (Barrier Penetration: Tunneling), then give an expression for the probability of the electron appearing on the other side of the barrier and the transmission coefficient T, then state the applications of tunneling.",
            modelAnswer: {
              finalAnswer: "T ≈ e^{-2γa} with γ = √(2m(V_0 - E))/ℏ. Five applications: Field emission, Alpha decay, Ammonia inversion, SHO barrier penetration, Scanning Tunneling Microscopy (STM).",
              steps: [
                {
                  title: "1. Tunneling Sketch",
                  explanation: "Region I (x < 0): sinusoidal incident wave of amplitude A and reflected wave of amplitude B. Region II (0 < x < a): exponentially decaying wave ψ_II(x) = C e^{-γ x}. Region III (x > a): transmitted sinusoidal wave ψ_III(x) = F e^{ikx} with severely attenuated amplitude |F| << |A|.",
                },
                {
                  title: "2. Transmission Coefficient T Formula",
                  math: "T = \\frac{|\\psi_{\\text{trans}}|^2}{|\\psi_{\\text{inc}}|^2} \\approx e^{-2\\gamma a}, \\quad \\text{where } \\gamma = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}",
                  explanation: "Probability of electron traversing potential barrier of width a and height V_0 > E.",
                },
                {
                  title: "3. Conservation of Probability",
                  math: "R + T = 1",
                  explanation: "Sum of reflection coefficient R and transmission coefficient T equals 1.",
                },
                {
                  title: "4. The 5 Curricular Applications",
                  explanation: "1. Field Emission (cold emission of electrons under high electric fields). 2. Alpha (α) Decay of radioactive nuclei (Gamow theory). 3. Ammonia (NH₃) Inversion oscillation. 4. Simple Harmonic Oscillator barrier penetration. 5. Scanning Tunneling Microscopy (STM).",
                },
              ],
              rubricPoints: [
                "1 Point: Accurate 3-region wave sketch with exponential decay inside barrier.",
                "1 Point: Mathematical expression T ≈ e^{-2γa} and definition of γ.",
                "1 Point: Listing the 5 official applications.",
              ],
            },
          },
          {
            id: "2019-q2-4",
            partNumber: "4.",
            title: "Infinite Square Well First 5 States: Energy, Momentum & Probabilities",
            points: 4,
            type: "numerical",
            prompt: "An electron is confined to moving in an infinitely high potential well of width $L = 0.5\\text{ nm}$.\n(a) For the first five states:\n  (i) Sketch the energy level diagram and the wave function.\n  (ii) Determine the energy and momentum for each state.\n(b) Mark on the figure and determine the probability of finding the electron between:\n  - $[x = L/2 \\text{ and } x = L]$ for $n = 2$ state\n  - $[x = L/3 \\text{ and } x = 2L/3]$ for $n = 3$ state.",
            modelAnswer: {
              finalAnswer: "(a) n = 1, 2, 3, 4, 5. E_n = n² E_1 with E_1 = 1.505 eV. Momentum p_n = n π ℏ / L. (b) P(n=2 in [L/2, L]) = 1/2 = 50%. P(n=3 in [L/3, 2L/3]) = 1/3 = 33.3%.",
              steps: [
                {
                  title: "1. Ground State Calculations (n = 1)",
                  math: "p_1 = \\frac{h}{2L} = \\frac{6.63 \\times 10^{-34}}{2 \\times 0.5 \\times 10^{-9}} = 6.63 \\times 10^{-25}\\text{ kg}\\cdot\\text{m/s}, \\quad E_1 = \\frac{p_1^2}{2m} = 1.505\\text{ eV}",
                  explanation: "Quantized momentum and energy for n = 1.",
                },
                {
                  title: "2. Energy and Momentum for First Five States (n = 1 to 5)",
                  math: "\\begin{aligned} n=1: &\\quad p_1 = 6.63 \\times 10^{-25}\\text{ kg}\\cdot\\text{m/s}, &E_1 = 1.505\\text{ eV} \\\\ n=2: &\\quad p_2 = 2p_1 = 1.326 \\times 10^{-24}\\text{ kg}\\cdot\\text{m/s}, &E_2 = 4 E_1 = 6.02\\text{ eV} \\\\ n=3: &\\quad p_3 = 3p_1 = 1.989 \\times 10^{-24}\\text{ kg}\\cdot\\text{m/s}, &E_3 = 9 E_1 = 13.55\\text{ eV} \\\\ n=4: &\\quad p_4 = 4p_1 = 2.652 \\times 10^{-24}\\text{ kg}\\cdot\\text{m/s}, &E_4 = 16 E_1 = 24.08\\text{ eV} \\\\ n=5: &\\quad p_5 = 5p_1 = 3.315 \\times 10^{-24}\\text{ kg}\\cdot\\text{m/s}, &E_5 = 25 E_1 = 37.63\\text{ eV} \\end{aligned}",
                  explanation: "Linear scaling in momentum p_n = n p_1; quadratic scaling in energy E_n = n² E_1.",
                },
                {
                  title: "3. Probability Calculations (b)",
                  math: "P\\left(\\frac{L}{2} \\le x \\le L\\right)_{n=2} = \\frac{1}{2} = 50\\%, \\quad P\\left(\\frac{L}{3} \\le x \\le \\frac{2L}{3}\\right)_{n=3} = \\frac{1}{3} = 33.3\\%",
                  explanation: "Evaluated by wave lobe symmetry.",
                },
              ],
              rubricPoints: [
                "2 Points: Correct energies and momenta for all 5 states.",
                "1 Point: Clean sketch of wavefunctions and energy level diagram.",
                "1 Point: Probability evaluations (1/2 and 1/3).",
              ],
            },
          },
        ],
      },

      // Question 3 (15 Points)
      {
        questionNumber: 3,
        totalPoints: 15,
        title: "Ionization Energy, Bohr Postulates, Balmer Series Limits & Electronic Configurations",
        parts: [
          {
            id: "2019-q3-1",
            partNumber: "1.",
            title: "Ionization Energy Definition and Expression",
            points: 2,
            type: "conceptual",
            prompt: "Define the ionization energy and give its mathematical expression.",
            modelAnswer: {
              finalAnswer: "E_ion = -E_1 = +13.6 eV for hydrogen: minimum energy required to completely remove an electron from its ground state to infinity.",
              steps: [
                {
                  title: "1. Definition",
                  explanation: "The minimum energy required to liberate an electron from its ground state (n = 1) in an atom and remove it to an infinite distance (n = ∞), leaving an ionized atom.",
                },
                {
                  title: "2. Expression",
                  math: "E_{\\text{ion}} = E_\\infty - E_1 = 0 - (-13.6\\text{ eV}) = +13.6\\text{ eV} = \\frac{m e^4}{8 \\varepsilon_0^2 h^2}",
                  explanation: "Positive energy quantity equal to the negative of ground state energy.",
                },
              ],
              rubricPoints: [
                "1 Point: Clear definition stating ground state to infinity.",
                "1 Point: Mathematical expression E_ion = -E_1 = +13.6 eV.",
              ],
            },
          },
          {
            id: "2019-q3-2",
            partNumber: "2.",
            title: "State Bohr's Postulates for the Hydrogen Atom",
            points: 3,
            type: "conceptual",
            prompt: "State Bohr's postulates for the model of the H-atom.",
            modelAnswer: {
              finalAnswer: "Three postulates: (1) Stationary non-radiating orbits, (2) Quantization of angular momentum L = nℏ, (3) Frequency condition ΔE = hf for transitions.",
              steps: [
                {
                  title: "Postulate 1: Stationary Orbits",
                  explanation: "Electrons revolve around the nucleus in certain non-radiating circular orbits called stationary states, where classical electrodynamic radiation does not occur.",
                },
                {
                  title: "Postulate 2: Quantization of Angular Momentum",
                  math: "L = m v r = n \\hbar = n \\frac{h}{2\\pi}, \\quad n = 1, 2, 3, \\dots",
                  explanation: "Only orbits where the electron orbital angular momentum is an integer multiple of ℏ are allowed.",
                },
                {
                  title: "Postulate 3: Transition Frequency Condition",
                  math: "\\Delta E = E_i - E_f = hf = \\frac{hc}{\\lambda}",
                  explanation: "Radiation is absorbed or emitted only when an electron jumps from one stationary state to another.",
                },
              ],
              rubricPoints: [
                "1 Point for each of the 3 postulates stated accurately with equations.",
              ],
            },
          },
          {
            id: "2019-q3-3",
            partNumber: "3.",
            title: "Energy Level Diagram & Spectral Series Representation",
            points: 3,
            type: "diagram",
            prompt: "Draw the energy level diagram for the H-atom according to Bohr's model then express the spectral series as transitions between energy levels of hydrogen atom.",
            modelAnswer: {
              finalAnswer: "Energy levels E_n = -13.6/n² eV. Lyman (n_f=1, UV), Balmer (n_f=2, Visible), Paschen (n_f=3, IR), Brackett (n_f=4, IR), Pfund (n_f=5, Far-IR).",
              steps: [
                {
                  title: "1. Diagram Setup",
                  explanation: "Horizontal lines for n = 1 (-13.6 eV), n = 2 (-3.4 eV), n = 3 (-1.51 eV), n = 4 (-0.85 eV), n = 5 (-0.54 eV), up to n = ∞ (0 eV).",
                },
                {
                  title: "2. The 5 Spectral Series",
                  explanation: "Lyman Series: transitions terminating at n_f = 1 (Ultraviolet). Balmer Series: transitions terminating at n_f = 2 (Visible). Paschen Series: transitions terminating at n_f = 3 (Near Infrared). Brackett Series: transitions terminating at n_f = 4 (Infrared). Pfund Series: transitions terminating at n_f = 5 (Far Infrared).",
                },
              ],
              rubricPoints: [
                "1.5 Points: Accurate scale of energy levels E_n = -13.6/n².",
                "1.5 Points: Clean downward arrows depicting the 5 series with correct n_f.",
              ],
            },
          },
          {
            id: "2019-q3-4",
            partNumber: "4.",
            title: "Calculate Longest and Shortest Wavelengths of the Balmer Series",
            points: 3,
            type: "numerical",
            prompt: "Calculate (a) the longest and (b) the shortest wavelengths of the Balmer series.",
            modelAnswer: {
              finalAnswer: "(a) Longest wavelength: λ_max = 656.3 nm (H_α line, red). (b) Shortest wavelength: λ_min = 364.6 nm (Balmer series limit, violet/UV).",
              steps: [
                {
                  title: "1. Balmer Series Formula",
                  math: "\\frac{1}{\\lambda} = R_H\\left( \\frac{1}{2^2} - \\frac{1}{n_i^2} \\right) = 1.097 \\times 10^7 \\left( \\frac{1}{4} - \\frac{1}{n_i^2} \\right)",
                  explanation: "Balmer transitions always terminate at n_f = 2.",
                },
                {
                  title: "2. Longest Wavelength (Smallest Energy: n_i = 3 to n_f = 2)",
                  math: "\\frac{1}{\\lambda_{\\max}} = 1.097 \\times 10^7 \\left( \\frac{1}{4} - \\frac{1}{9} \\right) = 1.097 \\times 10^7 \\times \\frac{5}{36} = 1.5236 \\times 10^6\\text{ m}^{-1}",
                  explanation: "Longest wavelength corresponds to smallest energy drop (H_α line).",
                },
                {
                  title: "3. Evaluate λ_max",
                  math: "\\lambda_{\\max} = \\frac{1}{1.5236 \\times 10^6} = 6.563 \\times 10^{-7}\\text{ m} = 656.3\\text{ nm} \\quad (\\text{Red})",
                  explanation: "Primary H_α emission line.",
                },
                {
                  title: "4. Shortest Wavelength (Series Limit: n_i = ∞ to n_f = 2)",
                  math: "\\frac{1}{\\lambda_{\\min}} = 1.097 \\times 10^7 \\left( \\frac{1}{4} - \\frac{1}{\\infty} \\right) = \\frac{1.097 \\times 10^7}{4} = 2.7425 \\times 10^6\\text{ m}^{-1}",
                  explanation: "Shortest wavelength corresponds to maximum transition energy.",
                },
                {
                  title: "5. Evaluate λ_min",
                  math: "\\lambda_{\\min} = \\frac{4}{1.097 \\times 10^7} = 3.6463 \\times 10^{-7}\\text{ m} = 364.6\\text{ nm} \\quad (\\text{Balmer Convergence Limit})",
                  explanation: "Convergence limit of the Balmer series.",
                },
              ],
              rubricPoints: [
                "1.5 Points: Correct calculation of longest wavelength λ_max = 656.3 nm (n=3 → 2).",
                "1.5 Points: Correct calculation of shortest wavelength λ_min = 364.6 nm (n=∞ → 2).",
              ],
            },
          },
          {
            id: "2019-q3-5",
            partNumber: "5.",
            title: "Electronic Configurations: F (9), Ti (22) & Ge (32) via Hund & Pauli",
            points: 4,
            type: "conceptual",
            prompt: "Write the electronic configuration of atoms having: $F_9, Ti_{22}, Ge_{32}$ electrons according to Pauli exclusion principle and Hund's rule.",
            modelAnswer: {
              finalAnswer: "F₉: 1s² 2s² 2p⁵. Ti₂₂: [Ar] 4s² 3d² (1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d²). Ge₃₂: [Ar] 4s² 3d¹⁰ 4p².",
              steps: [
                {
                  title: "1. Fluorine (F, Z = 9)",
                  math: "1s^2 \\; 2s^2 \\; 2p_x^2 \\; 2p_y^2 \\; 2p_z^1 \\quad \\text{or} \\quad 1s^2 \\; 2s^2 \\; 2p^5",
                  explanation: "Orbital boxes: 1s (↑↓), 2s (↑↓), 2p (↑↓, ↑↓, ↑). One unpaired electron in 2p.",
                },
                {
                  title: "2. Titanium (Ti, Z = 22)",
                  math: "1s^2 \\; 2s^2 \\; 2p^6 \\; 3s^2 \\; 3p^6 \\; 4s^2 \\; 3d^2 \\quad \\text{or} \\quad [\\text{Ar}]_{18} \\; 4s^2 \\; 3d^2",
                  explanation: "Orbital boxes: [Ar] noble gas core, 4s (↑↓), 3d has 5 sub-orbitals with 2 parallel unpaired electrons (↑, ↑, _, _, _) per Hund's rule.",
                },
                {
                  title: "3. Germanium (Ge, Z = 32)",
                  math: "1s^2 \\; 2s^2 \\; 2p^6 \\; 3s^2 \\; 3p^6 \\; 4s^2 \\; 3d^{10} \\; 4p^2 \\quad \\text{or} \\quad [\\text{Ar}]_{18} \\; 4s^2 \\; 3d^{10} \\; 4p^2",
                  explanation: "Valence shell is 4s² 4p², with 4p having 2 unpaired parallel electrons (↑, ↑, _) in 4p_x and 4p_y.",
                },
              ],
              rubricPoints: [
                "1.0 Point: F₉ configuration with orbital boxes.",
                "1.5 Points: Ti₂₂ configuration showing 4s² 3d² and Hund's rule in 3d.",
                "1.5 Points: Ge₃₂ configuration showing completely filled 3d¹⁰ and 4s² 4p².",
              ],
            },
          },
        ],
      },

      // Question 4 (15 Points)
      {
        questionNumber: 4,
        totalPoints: 15,
        title: "Modern Theory of Solids: Band Splitting, Metallic Luster, Molecular Bonding & Fermi Statistics",
        parts: [
          {
            id: "2019-q4-1-a",
            partNumber: "1.(a)",
            title: "3s Energy Level Splitting for Six Sodium Atoms",
            points: 3,
            type: "mcq",
            prompt: "When six sodium atoms are brought together, the 3s levels are splitting into:",
            options: [
              { id: "a", text: "Two levels" },
              { id: "b", text: "Six levels", correct: true },
              { id: "c", text: "Ten levels" },
              { id: "d", text: "None of those" },
            ],
            correctOption: "b",
            modelAnswer: {
              finalAnswer: "Option b: Six levels",
              steps: [
                {
                  title: "1. Pauli Principle & Wavefunction Overlap in Solids",
                  explanation: "When N isolated, identical atoms are brought close together into a crystal lattice, the overlap of their valence electron wavefunctions removes the N-fold degeneracy.",
                },
                {
                  title: "2. One-to-One Level Splitting",
                  explanation: "By the Pauli exclusion principle, each isolated atomic state splits into exactly N distinct, closely spaced energy levels. Therefore, bringing 6 sodium atoms together causes the single atomic 3s level to split into exactly 6 discrete levels.",
                },
              ],
              rubricPoints: [
                "1.5 Points: Citing N atoms split an atomic level into N levels.",
                "1.5 Points: Selecting Option b (Six levels).",
              ],
            },
          },
          {
            id: "2019-q4-1-b",
            partNumber: "1.(b)",
            title: "Nontransparency and Shiny Metallic Luster",
            points: 3,
            type: "mcq",
            prompt: "The nontransparency and shiny nature of metallic surfaces is due to ________ of the visible light:",
            options: [
              { id: "a", text: "Absorption" },
              { id: "b", text: "Emission" },
              { id: "c", text: "Absorbed and re-emitted", correct: true },
              { id: "d", text: "None of those" },
            ],
            correctOption: "c",
            modelAnswer: {
              finalAnswer: "Option c: Absorbed and re-emitted",
              steps: [
                {
                  title: "1. Free Electron Conduction Band Dynamics",
                  explanation: "Metals contain a sea of quasi-free electrons in a partially filled conduction band. When incident visible light strikes the metal surface, these free electrons absorb the photons and oscillate with the incoming electric field.",
                },
                {
                  title: "2. Immediate Re-radiation",
                  explanation: "These oscillating electrons immediately re-emit (re-radiate) photons of the identical frequency in the backwards direction (reflection), giving metals their characteristic high reflectivity (shiny luster) and preventing light transmission (nontransparency).",
                },
              ],
              rubricPoints: [
                "1.5 Points: Explaining photon absorption by free electrons.",
                "1.5 Points: Explaining prompt re-emission causing reflection/luster (Option c).",
              ],
            },
          },
          {
            id: "2019-q4-2",
            partNumber: "2.",
            title: "Bonding Mechanism of Two Atoms Forming a Molecule",
            points: 3,
            type: "conceptual",
            prompt: "Explain and draw the bonding mechanism of two atoms combining to form a molecule.",
            modelAnswer: {
              finalAnswer: "Balance between electrostatic/van der Waals attractive forces (dominating at large r) and Pauli exclusion core repulsive forces (dominating at small r), forming potential well minimum at equilibrium separation r_0.",
              steps: [
                {
                  title: "1. Potential Energy Curve U(r)",
                  math: "U(r) = -\\frac{A}{r^m} + \\frac{B}{r^n}, \\quad (n > m)",
                  explanation: "Sketch: Plot of Potential Energy U(r) vs Atomic Separation r. As r → ∞, U(r) → 0. As r decreases, attractive force pulls atoms together, causing U(r) to drop to a deep minimum -E_b (binding energy) at equilibrium separation r_0. For r < r_0, strong core electron overlap repulsion causes U(r) to shoot up steeply toward +∞.",
                },
                {
                  title: "2. Force Balance at Equilibrium",
                  math: "F(r) = -\\frac{dU}{dr} = 0 \\quad \\text{at } r = r_0",
                  explanation: "At r = r_0, the net force is zero and the molecule sits in stable mechanical and energetic equilibrium.",
                },
              ],
              rubricPoints: [
                "1.5 Points: Accurate U(r) vs r curve showing negative potential well at r_0.",
                "1.5 Points: Explanation of attractive vs repulsive force balance.",
              ],
            },
          },
          {
            id: "2019-q4-3",
            partNumber: "3.",
            title: "Covalent Solids: Features and Characteristics",
            points: 3,
            type: "conceptual",
            prompt: "Explain Covalent solids and the main features of Covalent compounds.",
            modelAnswer: {
              finalAnswer: "Covalent solids are bonded by localized, shared electron pairs with directional overlap (e.g. Diamond, Si, Ge). Features: High hardness, high melting point, brittle, semiconductor/insulating band gaps.",
              steps: [
                {
                  title: "1. Bonding Mechanism",
                  explanation: "Covalent solids are formed when neighbouring atoms share pairs of valence electrons to achieve full, stable octet configurations. The bonds are strongly directional due to hybridization (e.g., sp³ tetrahedral coordination in Diamond, Silicon, and Germanium).",
                },
                {
                  title: "2. Key Physical Features",
                  explanation: "1. High Hardness & Rigidity: Strong, directional covalent bonds make materials like diamond extremely hard. 2. High Melting & Boiling Points: Substantial thermal energy is required to break the extensive covalent network. 3. Electrical Properties: Pure covalent solids are semiconductors (Si, Ge) or insulators (Diamond) with well-defined energy band gaps. 4. Brittleness: If strained beyond elastic limit, directional bonds fracture rather than deform plastically.",
                },
              ],
              rubricPoints: [
                "1.5 Points: Explanation of shared electron pairs and directional orbital overlap.",
                "1.5 Points: Listing at least 3 physical features (hardness, high melting point, band gaps/semiconductivity).",
              ],
            },
          },
          {
            id: "2019-q4-4",
            partNumber: "4.",
            title: "Fermi-Dirac Occupation Temperature for 1% Probability at 0.5 eV above E_F",
            points: 3,
            type: "numerical",
            prompt: "Calculate the temperature at which there is a one percent ($1\\%$) probability that a state with energy $0.5\\text{ eV}$ above the Fermi energy will be occupied by an electron.",
            modelAnswer: {
              finalAnswer: "T = 1263 K (or 1339 °C / 1066 K depending on k_B value in exam)",
              steps: [
                {
                  title: "1. Fermi-Dirac Distribution Function",
                  math: "f(E) = \\frac{1}{e^{\\frac{E - E_F}{k_B T}} + 1}",
                  explanation: "Probability of an electronic state at energy E being occupied at absolute temperature T.",
                },
                {
                  title: "2. Set Given Values",
                  math: "E - E_F = 0.5\\text{ eV}, \\quad f(E) = 0.01 \\; (1\\%)",
                  explanation: "State is 0.5 eV above the Fermi level.",
                },
                {
                  title: "3. Invert the Equation",
                  math: "\\frac{1}{e^{\\frac{0.5}{k_B T}} + 1} = 0.01 \\implies e^{\\frac{0.5}{k_B T}} + 1 = 100 \\implies e^{\\frac{0.5}{k_B T}} = 99",
                  explanation: "Isolate exponential term.",
                },
                {
                  title: "4. Take Natural Logarithm",
                  math: "\\frac{0.5}{k_B T} = \\ln(99) = 4.59512 \\implies k_B T = \\frac{0.5\\text{ eV}}{4.59512} = 0.10881\\text{ eV}",
                  explanation: "Solve for thermal energy k_B T.",
                },
                {
                  title: "5. Evaluate Temperature T",
                  math: "T = \\frac{0.10881\\text{ eV}}{8.6173 \\times 10^{-5}\\text{ eV/K}} = 1262.7\\text{ K} \\approx 1263\\text{ K}",
                  explanation: "Using standard k_B = 8.617 × 10⁻⁵ eV/K (or with exam paper constant K = 8.125 × 10⁻⁵ eV/°C: T = 0.10881 / 8.125 × 10⁻⁵ = 1339 K).",
                },
              ],
              rubricPoints: [
                "1 Point: Stating Fermi-Dirac function f(E) = 1 / (e^{(E-E_F)/k_B T} + 1).",
                "1 Point: Setting e^{(E-E_F)/k_B T} = 99 and taking ln(99) = 4.595.",
                "1 Point: Final temperature T ≈ 1263 K.",
              ],
            },
          },
        ],
      },
    ],
  },
];
