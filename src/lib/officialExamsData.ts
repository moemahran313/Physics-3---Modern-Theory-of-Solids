export interface ExamStep {
  title: string;
  math?: string;
  explanation: string;
}

export interface ExamPart {
  id: string;
  partNumber: string;
  title: string;
  points?: number;
  prompt: string;
  type: "mcq" | "derivation" | "numerical" | "conceptual" | "diagram" | "true_false" | "complete";
  options?: Array<{ id: string; text: string; correct?: boolean }>;
  correctOption?: string;
  competencyCode?: string;
  diagramType?: "blackbody_spectrum" | "photoelectric_iv" | "compton_collision" | "infinite_well" | "barrier_tunneling" | "bohr_levels" | "michelson_interferometer" | "relativistic_clock" | "orbital_boxes";
  modelAnswer: {
    finalAnswer: string;
    steps: ExamStep[];
    rubricPoints: string[];
    examinerTip?: string;
  };
}

export interface ExamQuestionGroup {
  questionNumber: number;
  totalPoints: number;
  title: string;
  competencyCode?: string;
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
  // =========================================================================
  // EXAM 1: Spring 2022/2023 (6/6/2023) - ELCn114
  // =========================================================================
  {
    id: "exam-2022-2023-spring",
    academicYear: "2022/2023",
    semester: "Spring",
    examDate: "6/6/2023",
    subjectCode: "ELCn114",
    subjectName: "Modern Theory of Solids",
    specialization: "2nd Elect.",
    examiners: ["Dr. Abeer Serag Eldeen", "Dr. Saly Eladly", "Dr. Mohamed"],
    duration: "2 Hours",
    totalPoints: 40,
    totalPages: 2,
    constantsProvided: [
      "h = 6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}",
      "\\hbar = 1.05 \\times 10^{-34}\\text{ J}\\cdot\\text{s}",
      "e = 1.6 \\times 10^{-19}\\text{ C}",
      "\\sigma = 5.67 \\times 10^{-8}\\text{ W}/(\\text{m}^2\\text{K}^4)",
      "m_e = 9.1 \\times 10^{-31}\\text{ kg}",
      "c = 3 \\times 10^8\\text{ m/s}",
      "1\\text{ eV} = 1.6 \\times 10^{-19}\\text{ J}",
      "k_B = 1.38 \\times 10^{-23}\\text{ J/K}",
      "\\lambda_c = \\frac{h}{m_0 c} = 2.43\\text{ pm}",
      "R_H = 1.097 \\times 10^7\\text{ m}^{-1}",
    ],
    questions: [
      {
        questionNumber: 1,
        totalPoints: 10,
        title: "Thermal Radiation, Photoelectric Stopping & Compton Kinematics",
        competencyCode: "A1, A2, A3, A4, A5, A6",
        parts: [
          {
            id: "2023-sp-q1-1",
            partNumber: "1.",
            title: "Blackbody Radiation Peak & Radiated Power",
            points: 2.5,
            type: "numerical",
            diagramType: "blackbody_spectrum",
            prompt: "The wavelength of a black body radiation equals $360\\text{ nm}$.\n(i) What is the temperature of a black body that would radiate most intensely at this wavelength?\n(ii) Determine the power radiated from $5\\text{ mm}^2$ of this radiation.",
            modelAnswer: {
              finalAnswer: "(i) T = 8050 K. (ii) P = 1190 W (1.19 kW).",
              steps: [
                {
                  title: "1. Wien's Displacement Law",
                  math: "\\lambda_{\\max} T = b = 2.898 \\times 10^{-3}\\text{ m}\\cdot\\text{K} \\implies T = \\frac{2.898 \\times 10^{-3}}{360 \\times 10^{-9}\\text{ m}} = 8050\\text{ K}",
                  explanation: "Peak emission wavelength is inversely proportional to absolute thermodynamic temperature.",
                },
                {
                  title: "2. Stefan-Boltzmann Law for Total Radiated Power",
                  math: "P = \\sigma A T^4 = (5.67 \\times 10^{-8}\\text{ W}/\\text{m}^2\\text{K}^4) \\times (5 \\times 10^{-6}\\text{ m}^2) \\times (8050\\text{ K})^4 = 1190.4\\text{ W}",
                  explanation: "Area A = 5 mm² = 5 × 10⁻⁶ m².",
                },
              ],
              rubricPoints: [
                "1.0 Mark: Wien's law formula and correct temperature calculation.",
                "1.5 Marks: Area conversion (mm² to m²) and Stefan-Boltzmann power calculation.",
              ],
              examinerTip: "Area conversion is crucial: 5 mm² = 5 × (10⁻³ m)² = 5 × 10⁻⁶ m².",
            },
          },
          {
            id: "2023-sp-q1-3",
            partNumber: "3.",
            title: "Photoelectric Wavelength with Barium Target",
            points: 2.5,
            type: "numerical",
            diagramType: "photoelectric_iv",
            prompt: "A monochromatic light beam is incident on a barium target that has a work function of $\\phi = 3\\text{ eV}$. If a potential difference of $2.00\\text{ V}$ is required to turn back all the ejected electrons ($V_s = 2.00\\text{ V}$), what is the wavelength of the light beam?",
            modelAnswer: {
              finalAnswer: "λ = 248.4 nm (2.484 × 10⁻⁷ m)",
              steps: [
                {
                  title: "1. Einstein Photoelectric Equation",
                  math: "E_{\\text{inc}} = \\phi + K_{\\max} = \\phi + e V_s = 3.00\\text{ eV} + 2.00\\text{ eV} = 5.00\\text{ eV}",
                  explanation: "Total photon energy equals the work function plus the maximum electron kinetic energy.",
                },
                {
                  title: "2. Wavelength Calculation",
                  math: "\\lambda = \\frac{hc}{E_{\\text{inc}}} = \\frac{1242\\text{ eV}\\cdot\\text{nm}}{5.00\\text{ eV}} = 248.4\\text{ nm} = 2.484 \\times 10^{-7}\\text{ m}",
                  explanation: "Using standard Planck relation in electron-volts or SI units.",
                },
              ],
              rubricPoints: [
                "1.0 Mark: Einstein equation and stopping potential relation.",
                "1.5 Marks: Correct evaluation of incident wavelength in nm or meters.",
              ],
            },
          },
          {
            id: "2023-sp-q1-4",
            partNumber: "4.",
            title: "Compton Scattering: Scattered Frequency & Angle",
            points: 3.0,
            type: "numerical",
            diagramType: "compton_collision",
            prompt: "In a Compton scattering experiment, an X-ray photon with energy $E = 1.5 \\times 10^{-15}\\text{ J}$ is scattered from a free electron initially at rest. The electron recoils with a speed of $v = 2.18 \\times 10^6\\text{ m/s}$. Calculate:\n(a) The frequency of the scattered photons $f'$\n(b) The angle of the scattered photons $\\theta$.",
            modelAnswer: {
              finalAnswer: "(a) f' = 2.259 × 10¹⁸ Hz. (b) θ = 48.6°.",
              steps: [
                {
                  title: "1. Kinetic Energy of Recoil Electron",
                  math: "K_e = \\frac{1}{2} m_e v^2 = \\frac{1}{2}(9.11 \\times 10^{-31})(2.18 \\times 10^6)^2 = 2.164 \\times 10^{-18}\\text{ J}",
                  explanation: "Since v << c, non-relativistic kinetic energy is exact.",
                },
                {
                  title: "2. Energy Conservation for Scattered Photon",
                  math: "E' = E - K_e = 1.5 \\times 10^{-15} - 2.164 \\times 10^{-18} = 1.4978 \\times 10^{-15}\\text{ J}",
                  explanation: "Scattered photon energy.",
                },
                {
                  title: "3. Scattered Photon Frequency",
                  math: "f' = \\frac{E'}{h} = \\frac{1.4978 \\times 10^{-15}}{6.63 \\times 10^{-34}} = 2.259 \\times 10^{18}\\text{ Hz}",
                  explanation: "Frequency of scattered photon.",
                },
                {
                  title: "4. Compton Wavelength Shift & Angle θ",
                  math: "\\Delta \\lambda = \\lambda' - \\lambda = c\\left(\\frac{1}{f'} - \\frac{1}{f}\\right) = 3 \\times 10^8 \\left(\\frac{1}{2.259 \\times 10^{18}} - \\frac{1}{2.2624 \\times 10^{18}}\\right) = 8.24 \\times 10^{-13}\\text{ m}",
                  explanation: "\\Delta \\lambda = \\frac{h}{m_0 c}(1 - \\cos\\theta) \\implies 1 - \\cos\\theta = \\frac{8.24 \\times 10^{-13}}{2.43 \\times 10^{-12}} = 0.339 \\implies \\cos\\theta = 0.661 \\implies \\theta = 48.6^\\circ",
                },
              ],
              rubricPoints: [
                "1.0 Mark: Kinetic energy of recoil electron and energy conservation.",
                "1.0 Mark: Frequency of scattered photon.",
                "1.0 Mark: Compton shift and angle θ calculation.",
              ],
            },
          },
          {
            id: "2023-sp-q1-5",
            partNumber: "5.",
            title: "Photoelectric Effect Engineering Applications",
            points: 2.0,
            type: "conceptual",
            prompt: "State three engineering applications of the Photoelectric Effect.",
            modelAnswer: {
              finalAnswer: "1. Photovoltaic solar cells. 2. Photomultiplier tubes (PMTs) & light meters. 3. Optical sensors / light barriers (burglar alarms, automatic elevator door safety beams).",
              steps: [
                {
                  title: "1. Photovoltaic Energy Conversion",
                  explanation: "Solar panels convert incident sunlight directly into electrical DC power via photon absorption across semiconductor junctions.",
                },
                {
                  title: "2. Optical Detection & Measurement",
                  explanation: "Photomultiplier tubes and phototubes in spectroscopy, camera exposure meters, and night vision devices.",
                },
                {
                  title: "3. Safety & Control Systems",
                  explanation: "Infrared break-beam sensors for automatic doors, safety interlocks, and barcode scanners.",
                },
              ],
              rubricPoints: [
                "2.0 Marks: Stating 3 clear, distinct physical applications.",
              ],
            },
          },
        ],
      },
      {
        questionNumber: 2,
        totalPoints: 10,
        title: "Quantum Wave Mechanics, Schrödinger Equation & Potential Barriers",
        competencyCode: "A6, A7, A8, A9",
        parts: [
          {
            id: "2023-sp-q2-1",
            partNumber: "1.",
            title: "Proof of Time-Independent Schrödinger Wave Equation (1D)",
            points: 3.5,
            type: "derivation",
            prompt: "Prove the Time-Independent Schrödinger Wave Equation in one dimension starting from classical wave propagation and de Broglie relations.",
            modelAnswer: {
              finalAnswer: "\\frac{d^2\\psi(x)}{dx^2} + \\frac{2m}{\\hbar^2}[E - U(x)]\\psi(x) = 0",
              steps: [
                {
                  title: "1. Harmonic Spatial Wave Function",
                  math: "\\psi(x) = A e^{i k x} = A\\sin(k x) + B\\cos(k x)",
                  explanation: "Spatial part of a sinusoidal matter wave with wave number k = 2π/λ.",
                },
                {
                  title: "2. Second Spatial Derivative",
                  math: "\\frac{d\\psi}{dx} = i k A e^{i k x}, \\quad \\frac{d^2\\psi}{dx^2} = (i k)^2 A e^{i k x} = -k^2 \\psi(x)",
                  explanation: "Differentiating twice with respect to spatial coordinate x.",
                },
                {
                  title: "3. Quantum Momentum & Energy Substitution",
                  math: "p = \\hbar k \\implies k^2 = \\frac{p^2}{\\hbar^2} = \\frac{2m(E - U)}{\\hbar^2}",
                  explanation: "Total energy E = Kinetic (p²/2m) + Potential U(x) ⇒ p² = 2m(E - U).",
                },
                {
                  title: "4. Standard Time-Independent Schrödinger Equation",
                  math: "\\frac{d^2\\psi}{dx^2} = -\\frac{2m}{\\hbar^2}[E - U(x)]\\psi(x) \\implies \\frac{d^2\\psi(x)}{dx^2} + \\frac{2m}{\\hbar^2}[E - U(x)]\\psi(x) = 0",
                  explanation: "Rearranging into standard second-order linear differential form.",
                },
              ],
              rubricPoints: [
                "1.0 Mark: Harmonic wave representation.",
                "1.0 Mark: Second derivative step.",
                "1.5 Marks: De Broglie & conservation of energy substitution.",
              ],
            },
          },
          {
            id: "2023-sp-q2-2",
            partNumber: "2.",
            title: "Wave-Particle Duality Concept",
            points: 1.5,
            type: "conceptual",
            prompt: "Explain what is meant by 'The duality nature of matter' as formulated by Louis de Broglie.",
            modelAnswer: {
              finalAnswer: "Matter exhibits both corpuscular (particle: mass m, momentum p, energy E) and undulatory (wave: wavelength λ = h/p, frequency f = E/h) properties under different experimental conditions.",
              steps: [
                {
                  title: "1. De Broglie Hypothesis",
                  math: "\\lambda = \\frac{h}{p} = \\frac{h}{m v}",
                  explanation: "Every moving physical entity has an associated matter wave whose wavelength is inversely proportional to momentum.",
                },
              ],
              rubricPoints: ["1.5 Marks: Stating dual characteristics and de Broglie formula."],
            },
          },
          {
            id: "2023-sp-q2-3",
            partNumber: "3.",
            title: "Electron in 1D Infinite Potential Well (Width L = 10 nm, E = 15 eV)",
            points: 2.5,
            type: "numerical",
            diagramType: "infinite_well",
            prompt: "Assume an electron with energy $E = 15\\text{ eV}$ moves in a one-dimensional infinite potential well of width $L = 10\\text{ nm}$.\n(i) Find the quantum number $n$ characterizing the state of the electron.\n(ii) Find the probability of finding the electron between $x = L/3$ and $x = 2L/3$ in this state.",
            modelAnswer: {
              finalAnswer: "(i) n = 20. (ii) P = 1/3 = 0.3333 (33.33%).",
              steps: [
                {
                  title: "1. Quantum Number n from Infinite Well Energy",
                  math: "E_n = \\frac{n^2 h^2}{8 m L^2} \\implies n = \\sqrt{\\frac{8 m L^2 E}{h^2}} = \\sqrt{\\frac{8(9.11 \\times 10^{-31})(10 \\times 10^{-9})^2(15 \\times 1.6 \\times 10^{-19})}{(6.63 \\times 10^{-34})^2}} = \\sqrt{398.8} \\approx 20",
                  explanation: "Evaluating quantum state level: n = 20.",
                },
                {
                  title: "2. Probability Integral for Middle Third",
                  math: "P = \\int_{L/3}^{2L/3} |\\psi_{20}(x)|^2 dx = \\frac{2}{L}\\int_{L/3}^{2L/3} \\sin^2\\left(\\frac{20\\pi x}{L}\\right) dx = \\left[\\frac{x}{L} - \\frac{\\sin(40\\pi x/L)}{40\\pi}\\right]_{L/3}^{2L/3}",
                  explanation: "P = (2/3 - 1/3) - [sin(80π/3) - sin(40π/3)]/(40π) = 1/3 - 0 = 1/3 ≈ 0.3333.",
                },
              ],
              rubricPoints: [
                "1.0 Mark: Calculating quantum number n = 20.",
                "1.5 Marks: Setting up wave function integration and evaluating P = 1/3.",
              ],
            },
          },
          {
            id: "2023-sp-q2-4",
            partNumber: "4.",
            title: "Quantum Tunneling: Transmission Probability Across Potential Barrier",
            points: 2.5,
            type: "numerical",
            diagramType: "barrier_tunneling",
            prompt: "An electron with energy $E = 16\\text{ eV}$ is incident on a potential barrier of height $V_0 = 20\\text{ eV}$ and width $L = 0.12\\text{ nm}$.\n(i) Calculate the transmission probability $T$ for the electron to tunnel through the barrier.\n(ii) What would $T$ be if the barrier width is doubled to $2L = 0.24\\text{ nm}$?",
            modelAnswer: {
              finalAnswer: "(i) T ≈ 0.088 (8.8%). (ii) T ≈ 0.0078 (0.78%).",
              steps: [
                {
                  title: "1. Attenuation Wave Number k₂ in Barrier Region",
                  math: "k_2 = \\sqrt{\\frac{2m(V_0 - E)}{\\hbar^2}} = \\sqrt{\\frac{2(9.11 \\times 10^{-31})(20 - 16)(1.6 \\times 10^{-19})}{(1.054 \\times 10^{-34})^2}} = 1.024 \\times 10^{10}\\text{ m}^{-1}",
                  explanation: "Attenuation coefficient in classically forbidden region II.",
                },
                {
                  title: "2. Tunneling Transmission Coefficient T (Width L = 0.12 nm)",
                  math: "2 k_2 L = 2(1.024 \\times 10^{10})(0.12 \\times 10^{-9}) = 2.458 \\implies T \\approx e^{-2 k_2 L} = e^{-2.458} = 0.0856 \\approx 8.8\\%",
                  explanation: "Exact transmission coefficient taking boundary matching into account.",
                },
                {
                  title: "3. Doubled Barrier Width (2L = 0.24 nm)",
                  math: "T' \\approx e^{-2 k_2 (2L)} = (T)^2 = (0.0856)^2 = 0.00733 \\approx 0.78\\%",
                  explanation: "Doubling barrier width squares the exponential transmission probability.",
                },
              ],
              rubricPoints: [
                "1.0 Mark: Calculation of k₂ decay constant.",
                "1.0 Mark: Evaluation of T for width L.",
                "0.5 Mark: Evaluation of T for doubled width 2L.",
              ],
            },
          },
        ],
      },
      {
        questionNumber: 3,
        totalPoints: 12,
        title: "Atomic Structure, Quantum Numbers, Selection Rules & Angular Momentum",
        competencyCode: "A4, A9, A10",
        parts: [
          {
            id: "2023-sp-q3-1",
            partNumber: "1.",
            title: "Pauli Exclusion Principle & Hund's Rule",
            points: 2.0,
            type: "conceptual",
            diagramType: "orbital_boxes",
            prompt: "State:\n(i) Pauli's Exclusion Principle.\n(ii) Hund's Rule for degenerate orbital filling.",
            modelAnswer: {
              finalAnswer: "(i) No two electrons in an atom can have the same set of four quantum numbers (n, l, m_l, m_s). (ii) Degenerate orbitals are singly occupied with parallel spins before any orbital is doubly occupied.",
              steps: [
                {
                  title: "1. Pauli Principle",
                  explanation: "An atomic orbital can hold at most 2 electrons, which must have opposite spins (m_s = +1/2, -1/2).",
                },
                {
                  title: "2. Hund's Rule",
                  explanation: "Maximizes total spin multiplicity, minimizing electrostatic electron-electron repulsion energy.",
                },
              ],
              rubricPoints: ["1.0 Mark for Pauli statement.", "1.0 Mark for Hund's rule statement."],
            },
          },
          {
            id: "2023-sp-q3-2",
            partNumber: "2.",
            title: "Four Quantum Numbers Characterizing Atomic Electrons",
            points: 2.0,
            type: "conceptual",
            prompt: "How many quantum numbers characterize the atomic electron? State the physical function and allowed values for each one.",
            modelAnswer: {
              finalAnswer: "Four quantum numbers: 1. n (Principal, size/energy), 2. l (Orbital angular momentum, shape), 3. m_l (Magnetic, spatial orientation), 4. m_s (Spin, intrinsic orientation).",
              steps: [
                {
                  title: "1. Principal Quantum Number n",
                  explanation: "n = 1, 2, 3, ... Determines the principal energy level and orbital radial size.",
                },
                {
                  title: "2. Orbital Quantum Number l",
                  explanation: "l = 0, 1, 2, ..., n-1 (s, p, d, f). Determines orbital angular momentum magnitude L = √(l(l+1))ℏ and orbital shape.",
                },
                {
                  title: "3. Magnetic Quantum Number m_l",
                  explanation: "m_l = -l, -(l-1), ..., 0, ..., +l. Determines the spatial orientation of angular momentum along z-axis (L_z = m_l ℏ).",
                },
                {
                  title: "4. Spin Quantum Number m_s",
                  explanation: "m_s = +1/2 (spin-up) or -1/2 (spin-down). Intrinsic electron angular momentum (S_z = m_s ℏ).",
                },
              ],
              rubricPoints: ["2.0 Marks: Stating all 4 quantum numbers with physical interpretations and allowed ranges."],
            },
          },
          {
            id: "2023-sp-q3-3",
            partNumber: "3.",
            title: "Photon Absorption in Atoms (MCQ)",
            points: 1.5,
            type: "mcq",
            prompt: "When an atom absorbs a photon, what happens?",
            options: [
              { id: "A", text: "An electron falls to a lower energy state.", correct: false },
              { id: "B", text: "An electron rises to a higher energy state.", correct: true },
              { id: "C", text: "The atom is always permanently ionized.", correct: false },
              { id: "D", text: "The atomic number Z increases by 1.", correct: false },
            ],
            correctOption: "B",
            modelAnswer: {
              finalAnswer: "Option (B): An electron rises to a higher energy state (excitation: ΔE = E_f - E_i = hf).",
              steps: [
                {
                  title: "1. Photon Absorption Mechanism",
                  explanation: "Photon energy is absorbed by an orbital electron, causing it to transition from an initial lower state E_i to an excited higher state E_f = E_i + hf.",
                },
              ],
              rubricPoints: ["1.5 Marks for selecting correct option B."],
            },
          },
          {
            id: "2023-sp-q3-4",
            partNumber: "4.",
            title: "Allowed Orbital Quantum Numbers for n = 3 (MCQ)",
            points: 1.5,
            type: "mcq",
            prompt: "Possible values of the orbital quantum number $l$ for an electron in an atom with principal quantum number $n = 3$ are:",
            options: [
              { id: "A", text: "0, 1, 2, 3", correct: false },
              { id: "B", text: "1, 2, 3", correct: false },
              { id: "C", text: "0, 1, 2", correct: true },
              { id: "D", text: "-1, 0, 1", correct: false },
            ],
            correctOption: "C",
            modelAnswer: {
              finalAnswer: "Option (C): l = 0, 1, 2 (corresponding to 3s, 3p, 3d subshells).",
              steps: [
                {
                  title: "1. Allowed l Rule",
                  explanation: "For any principal quantum number n, l takes integer values from 0 up to n - 1. For n = 3: l = 0, 1, 2.",
                },
              ],
              rubricPoints: ["1.5 Marks for option C."],
            },
          },
          {
            id: "2023-sp-q3-5",
            partNumber: "5.",
            title: "Hydrogen Transition Emitting Highest Frequency Photon (MCQ)",
            points: 1.5,
            type: "mcq",
            prompt: "Which of the following transitions in a hydrogen atom emits the photon with the highest frequency?",
            options: [
              { id: "A", text: "n = 2 → n = 1", correct: true },
              { id: "B", text: "n = 3 → n = 2", correct: false },
              { id: "C", text: "n = 4 → n = 3", correct: false },
              { id: "D", text: "n = 5 → n = 4", correct: false },
            ],
            correctOption: "A",
            modelAnswer: {
              finalAnswer: "Option (A): n = 2 → n = 1 (Lyman-alpha, ΔE = 10.2 eV, f = 2.47 × 10¹⁵ Hz).",
              steps: [
                {
                  title: "1. Compare Transition Energies",
                  math: "\\Delta E_{2\\to 1} = 13.6\\left(1 - \\frac{1}{4}\\right) = 10.2\\text{ eV}",
                  explanation: "\\Delta E_{3\\to 2} = 1.89\\text{ eV}, \\quad \\Delta E_{4\\to 3} = 0.66\\text{ eV}. Highest energy emission occurs for n = 2 → 1.",
                },
              ],
              rubricPoints: ["1.5 Marks for option A."],
            },
          },
          {
            id: "2023-sp-q3-6",
            partNumber: "6.",
            title: "Angular Momentum Magnitude for 3p State",
            points: 1.5,
            type: "numerical",
            prompt: "Determine the magnitude of the orbital angular momentum vector $L$ for an electron in the state designated by $3p$.",
            modelAnswer: {
              finalAnswer: "L = √2 ℏ = 1.49 × 10⁻³⁴ J·s",
              steps: [
                {
                  title: "1. State Quantum Numbers",
                  explanation: "For a 3p subshell: n = 3 and orbital quantum number l = 1 (since p means l = 1).",
                },
                {
                  title: "2. Angular Momentum Formula",
                  math: "L = \\sqrt{l(l+1)}\\hbar = \\sqrt{1(1+1)}\\hbar = \\sqrt{2}\\hbar = 1.414 \\times (1.054 \\times 10^{-34}\\text{ J}\\cdot\\text{s}) = 1.491 \\times 10^{-34}\\text{ J}\\cdot\\text{s}",
                  explanation: "Total orbital angular momentum magnitude.",
                },
              ],
              rubricPoints: ["1.5 Marks: Identifying l = 1 and applying L = √(l(l+1))ℏ."],
            },
          },
          {
            id: "2023-sp-q3-7",
            partNumber: "7.",
            title: "Proof of Rydberg Formula from Bohr Energy Levels",
            points: 1.5,
            type: "derivation",
            diagramType: "bohr_levels",
            prompt: "Prove the Rydberg spectral formula: $\\frac{1}{\\lambda} = R_H \\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)$ starting from Bohr's expression for atomic energy levels.",
            modelAnswer: {
              finalAnswer: "\\frac{1}{\\lambda} = \\frac{m e^4}{8 \\varepsilon_0^2 h^3 c}\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right) = R_H\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)",
              steps: [
                {
                  title: "1. Bohr Energy Level Equation",
                  math: "E_n = -\\frac{m e^4}{8 \\varepsilon_0^2 h^2}\\frac{1}{n^2}",
                  explanation: "Quantized energy of hydrogen electron at principal level n.",
                },
                {
                  title: "2. Emitted Photon Energy",
                  math: "\\Delta E = E_i - E_f = \\frac{m e^4}{8 \\varepsilon_0^2 h^2}\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)",
                  explanation: "Difference between initial state n_i and final state n_f.",
                },
                {
                  title: "3. Equate to h c / λ",
                  math: "\\frac{hc}{\\lambda} = \\Delta E \\implies \\frac{1}{\\lambda} = \\frac{m e^4}{8 \\varepsilon_0^2 h^3 c}\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right) = R_H\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)",
                  explanation: "Where R_H = me⁴ / (8 ε₀² h³ c) = 1.097 × 10⁷ m⁻¹.",
                },
              ],
              rubricPoints: ["1.5 Marks: Deriving Rydberg constant and transition formula."],
            },
          },
        ],
      },
      {
        questionNumber: 4,
        totalPoints: 8,
        title: "Special Relativity, Michelson-Morley & Relativistic Dynamics",
        competencyCode: "A10",
        parts: [
          {
            id: "2023-sp-q4-1",
            partNumber: "1.",
            title: "Michelson-Morley Experiment Graph & Explanation",
            points: 2.0,
            type: "conceptual",
            diagramType: "michelson_interferometer",
            prompt: "Explain with a graph the Michelson-Morley Experiment, its purpose, and the significance of its null result.",
            modelAnswer: {
              finalAnswer: "Null result proved the non-existence of luminiferous aether; speed of light c is constant and isotropic in all inertial reference frames.",
              steps: [
                {
                  title: "1. Experimental Setup",
                  explanation: "Light beam is split into two mutually perpendicular paths of length L by a half-silvered mirror, reflected back, and recombined to form interference fringes.",
                },
                {
                  title: "2. Null Result Significance",
                  explanation: "No shift in interference fringes was detected upon 90° rotation, disproving classical Galilean velocity addition for light.",
                },
              ],
              rubricPoints: ["1.0 Mark for optical setup explanation/diagram.", "1.0 Mark for null result conclusion."],
            },
          },
          {
            id: "2023-sp-q4-2",
            partNumber: "2.",
            title: "Inertial vs Non-Inertial Reference Frames",
            points: 1.5,
            type: "conceptual",
            prompt: "Differentiate between an Inertial frame and a Non-Inertial reference frame.",
            modelAnswer: {
              finalAnswer: "Inertial frames move at constant velocity (a = 0) where Newton's laws hold without fictitious forces. Non-inertial frames are accelerated (a ≠ 0) and require fictitious/inertial forces (e.g. centrifugal, Coriolis).",
              steps: [
                {
                  title: "1. Inertial Reference Frame",
                  explanation: "Newton's 1st law of inertia holds true: a frame at rest or moving with uniform velocity.",
                },
                {
                  title: "2. Non-Inertial Reference Frame",
                  explanation: "Accelerating or rotating frame; fictitious pseudo-forces must be introduced to apply F = ma.",
                },
              ],
              rubricPoints: ["1.5 Marks: Clear distinction with physical examples."],
            },
          },
          {
            id: "2023-sp-q4-3",
            partNumber: "3.",
            title: "Relativistic Zero Acceleration at Speed of Light",
            points: 1.5,
            type: "conceptual",
            prompt: "In the view of Special Relativity, as a particle's speed approaches $c$, why does acceleration approach zero for a finite applied force?",
            modelAnswer: {
              finalAnswer: "As v → c, the Lorentz factor γ → ∞, relativistic momentum p = γ m₀ v grows without bound, and effective inertia becomes infinite: a = F / (γ³ m₀) → 0.",
              steps: [
                {
                  title: "1. Relativistic Force-Acceleration Relation",
                  math: "F = \\frac{dp}{dt} = \\frac{d}{dt}(\\gamma m_0 v) = \\gamma^3 m_0 a \\implies a = \\frac{F}{\\gamma^3 m_0}",
                  explanation: "As v → c, γ = 1/√(1 - v²/c²) → ∞, so a → 0 for any finite force F.",
                },
              ],
              rubricPoints: ["1.5 Marks: Relativistic momentum and gamma factor argument."],
            },
          },
          {
            id: "2023-sp-q4-5",
            partNumber: "5.",
            title: "Relativistic Time Dilation for Spaceship Clock (v = 0.95 c)",
            points: 1.5,
            type: "numerical",
            diagramType: "relativistic_clock",
            prompt: "A clock on a spaceship ticks off a time interval of $1\\text{ hour}$ (proper time $\\Delta t_p = 1\\text{ hr}$). If the spaceship is moving at a speed of $v = 0.95\\text{ c}$ relative to Earth, what time interval is measured by an observer on Earth?",
            modelAnswer: {
              finalAnswer: "Δt = 3.20 hours (192 minutes)",
              steps: [
                {
                  title: "1. Lorentz Time Dilation Formula",
                  math: "\\Delta t = \\gamma \\Delta t_p = \\frac{\\Delta t_p}{\\sqrt{1 - v^2/c^2}}",
                  explanation: "Moving clocks run slow relative to stationary Earth frame.",
                },
                {
                  title: "2. Numerical Evaluation",
                  math: "\\Delta t = \\frac{1\\text{ hr}}{\\sqrt{1 - (0.95)^2}} = \\frac{1\\text{ hr}}{\\sqrt{1 - 0.9025}} = \\frac{1\\text{ hr}}{\\sqrt{0.0975}} = \\frac{1\\text{ hr}}{0.3122} = 3.203\\text{ hours}",
                  explanation: "Equivalent to 3 hours 12 minutes 10 seconds.",
                },
              ],
              rubricPoints: ["1.5 Marks: Formula and accurate calculation of dilated time."],
            },
          },
          {
            id: "2023-sp-q4-6",
            partNumber: "6.",
            title: "Length Contraction & Transverse Dimension of Moving Spaceship (v = 0.99 c)",
            points: 1.5,
            type: "numerical",
            prompt: "A spaceship is measured to be $L_0 = 120\\text{ m}$ long and $D_0 = 20\\text{ m}$ in diameter while at rest relative to an observer. If this spaceship moves at $v = 0.99\\text{ c}$:\n(a) What is its length as measured by an Earth observer?\n(b) What is its diameter?",
            modelAnswer: {
              finalAnswer: "(a) L = 16.93 m (length contracts along direction of motion). (b) D = 20.0 m (transverse dimensions remain unchanged).",
              steps: [
                {
                  title: "1. Longitudinal Length Contraction",
                  math: "L = L_0\\sqrt{1 - v^2/c^2} = 120\\text{ m} \\times \\sqrt{1 - (0.99)^2} = 120 \\times \\sqrt{0.0199} = 120 \\times 0.14107 = 16.93\\text{ m}",
                  explanation: "Length contracts only along the parallel axis of motion.",
                },
                {
                  title: "2. Transverse Dimension Invariance",
                  explanation: "Dimensions perpendicular to relative velocity vector (y and z coordinates) are Lorentz invariants: D = D₀ = 20.0 m.",
                },
              ],
              rubricPoints: [
                "1.0 Mark for length calculation L = 16.93 m.",
                "0.5 Mark for diameter invariance D = 20 m.",
              ],
            },
          },
        ],
      },
    ],
  },

  // =========================================================================
  // EXAM 2: Fall 2022/2023 (9/1/2023) - ELCN114
  // =========================================================================
  {
    id: "exam-2022-2023-fall",
    academicYear: "2022/2023",
    semester: "Fall",
    examDate: "9/1/2023",
    subjectCode: "ELCN114",
    subjectName: "Modern Theory of Solids",
    specialization: "Comp. & Comm. / 2nd Elect.",
    examiners: ["Dr. Abeer Serag Eldeen", "Dr. Saly Eladly", "Dr. Mohamed"],
    duration: "2 Hours",
    totalPoints: 40,
    totalPages: 2,
    constantsProvided: [
      "h = 6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}",
      "\\hbar = 1.054 \\times 10^{-34}\\text{ J}\\cdot\\text{s}",
      "e = 1.6 \\times 10^{-19}\\text{ C}",
      "c = 3 \\times 10^8\\text{ m/s}",
      "m_e = 9.1 \\times 10^{-31}\\text{ kg}",
      "\\lambda_c = 2.43\\text{ pm}",
      "\\sigma = 5.67 \\times 10^{-8}\\text{ W}/(\\text{m}^2\\text{K}^4)",
      "R_H = 1.097 \\times 10^7\\text{ m}^{-1}",
    ],
    questions: [
      {
        questionNumber: 1,
        totalPoints: 10,
        title: "Thermal Radiation, Compton Frequency Independence & Stopping Potential",
        competencyCode: "A1, A2, A3, A6",
        parts: [
          {
            id: "2023-fa-q1-1",
            partNumber: "1.",
            title: "Blackbody Radiation Laws: True/False with Correction",
            points: 3.0,
            type: "true_false",
            prompt: "Put (True) or (False) and correct the false statement:\n(i) Rayleigh-Jeans formula succeeded in explaining black body radiation at short wavelengths.\n(ii) As the temperature of a black body increases, the peak of the spectral radiancy shifts toward shorter wavelengths.",
            modelAnswer: {
              finalAnswer: "(i) FALSE. Rayleigh-Jeans failed at short wavelengths ('ultraviolet catastrophe') and only worked for long wavelengths. (ii) TRUE. Wien's law λ_max = b/T shows peak shifts to shorter λ.",
              steps: [
                {
                  title: "1. Ultraviolet Catastrophe",
                  explanation: "Rayleigh-Jeans formula u(λ) = 8π k_B T / λ⁴ diverges as λ → 0. Max Planck's quantum hypothesis E = n h f resolved this.",
                },
                {
                  title: "2. Wien Displacement Verification",
                  explanation: "λ_max T = constant ⇒ as T increases, λ_max decreases (blue-shifts).",
                },
              ],
              rubricPoints: ["1.5 Marks for (i) with correction.", "1.5 Marks for (ii)."],
            },
          },
          {
            id: "2023-fa-q1-2",
            partNumber: "2.",
            title: "Compton Shift Independence of Incident Frequency",
            points: 3.5,
            type: "conceptual",
            diagramType: "compton_collision",
            prompt: "Explain the Compton Effect and show that the Compton shift $\\Delta \\lambda$ is independent of the frequency of the incident photon.",
            modelAnswer: {
              finalAnswer: "Δλ = λ' - λ = (h / m_0 c)(1 - cos θ). The shift depends purely on scattering angle θ and fundamental physical constants, completely independent of incident photon frequency f or energy E.",
              steps: [
                {
                  title: "1. Compton Equation Formula",
                  math: "\\Delta \\lambda = \\lambda' - \\lambda = \\frac{h}{m_0 c}(1 - \\cos\\theta)",
                  explanation: "The difference in wavelength is a function only of the scattering angle θ, electron rest mass m_0, Planck constant h, and speed of light c.",
                },
              ],
              rubricPoints: ["1.5 Marks for mechanism explanation.", "2.0 Marks for shift formula and independence proof."],
            },
          },
          {
            id: "2023-fa-q1-3",
            partNumber: "3.",
            title: "Incident Wavelength on Sodium (Work Function 2.2 eV, Stopping Potential 5 V)",
            points: 3.5,
            type: "numerical",
            prompt: "Incident photons strike a sodium surface having a work function of $\\phi = 2.2\\text{ eV}$, causing photoelectric emission. When a stopping potential of $V_s = 5\\text{ V}$ is imposed, there is no photocurrent. What is the wavelength of the incident photons?",
            modelAnswer: {
              finalAnswer: "λ = 172.5 nm (1.725 × 10⁻⁷ m)",
              steps: [
                {
                  title: "1. Incident Photon Energy",
                  math: "E_{\\text{inc}} = \\phi + e V_s = 2.2\\text{ eV} + 5.0\\text{ eV} = 7.2\\text{ eV}",
                  explanation: "Total energy delivered per photon.",
                },
                {
                  title: "2. Wavelength Calculation",
                  math: "\\lambda = \\frac{hc}{E} = \\frac{1242\\text{ eV}\\cdot\\text{nm}}{7.2\\text{ eV}} = 172.5\\text{ nm} = 1.725 \\times 10^{-7}\\text{ m}",
                  explanation: "Deep UV spectrum.",
                },
              ],
              rubricPoints: ["1.5 Marks for photon energy E = 7.2 eV.", "2.0 Marks for wavelength λ = 172.5 nm."],
            },
          },
        ],
      },
      {
        questionNumber: 2,
        totalPoints: 10,
        title: "Wave Mechanics, Particle-in-a-Box & Energy Quantization",
        competencyCode: "A6, A7, A8",
        parts: [
          {
            id: "2023-fa-q2-1",
            partNumber: "1.",
            title: "De Broglie Wavelength of Relativistic Electron",
            points: 3.0,
            type: "numerical",
            prompt: "Calculate the de Broglie wavelength of an electron accelerated through a potential difference of $V = 100\\text{ V}$.",
            modelAnswer: {
              finalAnswer: "λ = 0.123 nm (1.23 Å)",
              steps: [
                {
                  title: "1. Kinetic Energy & Momentum",
                  math: "K = e V = 100\\text{ eV} = 1.6 \\times 10^{-17}\\text{ J}",
                  explanation: "p = √(2 m_e K) = √(2 × 9.11 × 10⁻³¹ × 1.6 × 10⁻¹⁷) = 5.40 × 10⁻²⁴ kg·m/s.",
                },
                {
                  title: "2. De Broglie Wavelength",
                  math: "\\lambda = \\frac{h}{p} = \\frac{6.63 \\times 10^{-34}}{5.40 \\times 10^{-24}} = 1.228 \\times 10^{-10}\\text{ m} = 0.123\\text{ nm}",
                  explanation: "Using shortcut: λ = 1.226 / √V nm = 1.226 / 10 = 0.1226 nm.",
                },
              ],
              rubricPoints: ["1.5 Marks for momentum calculation.", "1.5 Marks for wavelength value."],
            },
          },
          {
            id: "2023-fa-q2-2",
            partNumber: "2.",
            title: "Derivation of Energy Levels for 1D Infinite Potential Well",
            points: 4.0,
            type: "derivation",
            diagramType: "infinite_well",
            prompt: "Derive the quantized energy eigenvalues $E_n = \\frac{n^2 h^2}{8 m L^2}$ for a particle of mass $m$ trapped in a one-dimensional infinite potential well of width $L$ with boundaries at $x = 0$ and $x = L$.",
            modelAnswer: {
              finalAnswer: "E_n = \\frac{n^2 \\pi^2 \\hbar^2}{2 m L^2} = \\frac{n^2 h^2}{8 m L^2}, \\quad n = 1, 2, 3, \\dots",
              steps: [
                {
                  title: "1. Boundary Conditions",
                  explanation: "ψ(0) = 0 and ψ(L) = 0 because potential U(x) = ∞ outside [0, L].",
                },
                {
                  title: "2. General Spatial Solution",
                  math: "\\psi(x) = A\\sin(k x) + B\\cos(k x)",
                  explanation: "ψ(0) = B = 0 ⇒ ψ(x) = A sin(kx). Then ψ(L) = A sin(kL) = 0 ⇒ kL = nπ ⇒ k = nπ/L.",
                },
                {
                  title: "3. Energy Eigenvalues",
                  math: "E_n = \\frac{\\hbar^2 k^2}{2m} = \\frac{\\hbar^2}{2m}\\left(\\frac{n\\pi}{L}\\right)^2 = \\frac{n^2 h^2}{8 m L^2}",
                  explanation: "Quantized energy levels.",
                },
              ],
              rubricPoints: ["1.5 Marks for wave equation & boundary matching.", "1.5 Marks for k_n quantization.", "1.0 Mark for final energy formula."],
            },
          },
          {
            id: "2023-fa-q2-3",
            partNumber: "3.",
            title: "Infinite Well Ground State Probability",
            points: 3.0,
            type: "numerical",
            prompt: "For an electron in the ground state ($n = 1$) of an infinite potential well of width $L$, calculate the probability of finding the electron between $x = 0$ and $x = L/2$.",
            modelAnswer: {
              finalAnswer: "P = 0.50 (50.0%)",
              steps: [
                {
                  title: "1. Symmetry of Ground State Wavefunction",
                  math: "P = \\int_0^{L/2} |\\psi_1(x)|^2 dx = \\frac{2}{L}\\int_0^{L/2}\\sin^2\\left(\\frac{\\pi x}{L}\\right)dx = \\frac{1}{2}",
                  explanation: "Due to symmetric distribution |ψ₁(x)|² about x = L/2, exactly half the probability lies in the left half.",
                },
              ],
              rubricPoints: ["3.0 Marks for integration or symmetry proof."],
            },
          },
        ],
      },
      {
        questionNumber: 3,
        totalPoints: 10,
        title: "Atomic Orbitals, Hund's Rule & Electron Configurations",
        competencyCode: "A4, A9, A10",
        parts: [
          {
            id: "2023-fa-q3-1",
            partNumber: "1.",
            title: "Electron Configurations of Fluorine (F⁹) and Titanium (Ti²²)",
            points: 5.0,
            type: "conceptual",
            diagramType: "orbital_boxes",
            prompt: "Write the complete ground state electron configuration and draw the orbital box diagram for:\n(a) Fluorine ($F^9$, $Z = 9$)\n(b) Titanium ($Ti^{22}$, $Z = 22$).",
            modelAnswer: {
              finalAnswer: "(a) F⁹: 1s² 2s² 2p⁵ (1 unpaired electron). (b) Ti²²: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d² 4s² = [Ar] 3d² 4s² (2 unpaired 3d electrons with parallel spins).",
              steps: [
                {
                  title: "1. Fluorine Configuration",
                  explanation: "1s² [↑↓] 2s² [↑↓] 2p⁵ [↑↓][↑↓][↑].",
                },
                {
                  title: "2. Titanium Configuration",
                  explanation: "[Ar] 4s² [↑↓] 3d² [↑][↑][ ][ ][ ] following Hund's rule of maximum multiplicity.",
                },
              ],
              rubricPoints: ["2.5 Marks for Fluorine.", "2.5 Marks for Titanium."],
            },
          },
          {
            id: "2023-fa-q3-2",
            partNumber: "2.",
            title: "Quantum Numbers of Valence Electron in Sodium (Na¹¹)",
            points: 5.0,
            type: "conceptual",
            prompt: "Determine the four quantum numbers $(n, l, m_l, m_s)$ for the outermost valence electron in ground-state Sodium ($Na^{11}$, $Z = 11$).",
            modelAnswer: {
              finalAnswer: "n = 3, l = 0 (3s orbital), m_l = 0, m_s = +1/2 (or -1/2).",
              steps: [
                {
                  title: "1. Sodium Ground State Configuration",
                  explanation: "Na¹¹: 1s² 2s² 2p⁶ 3s¹. The 11th electron enters the 3s subshell.",
                },
                {
                  title: "2. Quantum Numbers Evaluation",
                  explanation: "Principal level n = 3; for s-orbital l = 0; magnetic m_l = 0; spin m_s = +1/2.",
                },
              ],
              rubricPoints: ["5.0 Marks: Stating all four quantum numbers correctly."],
            },
          },
        ],
      },
      {
        questionNumber: 4,
        totalPoints: 10,
        title: "Special Relativity, Lorentz Velocity Addition & Relativistic Mass",
        competencyCode: "A10",
        parts: [
          {
            id: "2023-fa-q4-1",
            partNumber: "1.",
            title: "Postulates of Einstein's Special Theory of Relativity",
            points: 4.0,
            type: "conceptual",
            prompt: "State the two fundamental postulates of Einstein's Special Theory of Relativity (1905).",
            modelAnswer: {
              finalAnswer: "1. Principle of Relativity: The laws of physics are identical in all inertial reference frames. 2. Constancy of the Speed of Light: The speed of light in vacuum c is constant and independent of the motion of the source or observer.",
              steps: [
                {
                  title: "1. First Postulate",
                  explanation: "No preferred inertial frame exists; all uniform motion is relative.",
                },
                {
                  title: "2. Second Postulate",
                  explanation: "c = 3 × 10⁸ m/s in vacuum for all observers regardless of relative velocity.",
                },
              ],
              rubricPoints: ["2.0 Marks for Postulate 1.", "2.0 Marks for Postulate 2."],
            },
          },
          {
            id: "2023-fa-q4-2",
            partNumber: "2.",
            title: "Relativistic Velocity Addition of Approaching Spaceships",
            points: 6.0,
            type: "numerical",
            prompt: "Two spaceships $A$ and $B$ approach Earth from opposite directions, each moving at a speed of $0.8\\text{ c}$ relative to Earth. What is the relative speed of spaceship $A$ as measured by an observer on spaceship $B$?",
            modelAnswer: {
              finalAnswer: "u' = 0.9756 c (97.56% of c)",
              steps: [
                {
                  title: "1. Einstein Velocity Addition Formula",
                  math: "u' = \\frac{u - v}{1 - \\frac{u v}{c^2}}",
                  explanation: "Let Earth frame S have spaceship A moving at u = +0.8 c and spaceship B moving at v = -0.8 c.",
                },
                {
                  title: "2. Calculation",
                  math: "u' = \\frac{0.8\\text{ c} - (-0.8\\text{ c})}{1 - \\frac{(0.8)(-0.8\\text{ c}^2)}{c^2}} = \\frac{1.6\\text{ c}}{1 + 0.64} = \\frac{1.6\\text{ c}}{1.64} = 0.9756\\text{ c}",
                  explanation: "Notice u' < c, strictly obeying the cosmic speed limit.",
                },
              ],
              rubricPoints: ["2.0 Marks for formula.", "4.0 Marks for correct algebraic substitution and final value."],
            },
          },
        ],
      },
    ],
  },

  // =========================================================================
  // EXAM 3: Fall 2021/2022 (20/1/2022) - ELCn114 / ELCNN114
  // =========================================================================
  {
    id: "exam-2021-2022-fall",
    academicYear: "2021/2022",
    semester: "Fall",
    examDate: "20/1/2022",
    subjectCode: "ELCn114",
    subjectName: "Modern Theory of Solids",
    specialization: "2nd Elect.",
    examiners: ["Dr. Abeer Serag Eldeen", "Dr. Saly Eladly"],
    duration: "2 Hours",
    totalPoints: 40,
    totalPages: 2,
    constantsProvided: [
      "h = 6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}",
      "\\hbar = 1.054 \\times 10^{-34}\\text{ J}\\cdot\\text{s}",
      "e = 1.6 \\times 10^{-19}\\text{ C}",
      "c = 3 \\times 10^8\\text{ m/s}",
      "m_e = 9.1 \\times 10^{-31}\\text{ kg}",
      "\\sigma = 5.67 \\times 10^{-8}\\text{ W}/(\\text{m}^2\\text{K}^4)",
      "\\lambda_c = 2.43\\text{ pm}",
      "R_H = 1.097 \\times 10^7\\text{ m}^{-1}",
    ],
    questions: [
      {
        questionNumber: 1,
        totalPoints: 10,
        title: "Photoelectric Work Function, Stopping Potential & Threshold Frequency",
        competencyCode: "A1, A2, A3",
        parts: [
          {
            id: "2022-fa-q1-1",
            partNumber: "1.",
            title: "Photoelectric Stopping Potential & Threshold Wavelength for Cesium",
            points: 5.0,
            type: "numerical",
            diagramType: "photoelectric_iv",
            prompt: "Light of wavelength $\\lambda = 400\\text{ nm}$ is incident on a cesium target having a work function of $\\phi = 2.14\\text{ eV}$.\n(a) Determine the maximum kinetic energy of the emitted photoelectrons.\n(b) What is the stopping potential $V_s$?\n(c) Calculate the threshold wavelength $\\lambda_0$ for cesium.",
            modelAnswer: {
              finalAnswer: "(a) K_max = 0.965 eV (1.54 × 10⁻¹⁹ J). (b) V_s = 0.965 V. (c) λ₀ = 580.4 nm.",
              steps: [
                {
                  title: "1. Incident Photon Energy",
                  math: "E = \\frac{hc}{\\lambda} = \\frac{1242\\text{ eV}\\cdot\\text{nm}}{400\\text{ nm}} = 3.105\\text{ eV}",
                  explanation: "Energy of 400 nm photon.",
                },
                {
                  title: "2. Maximum Kinetic Energy & Stopping Potential",
                  math: "K_{\\max} = E - \\phi = 3.105\\text{ eV} - 2.14\\text{ eV} = 0.965\\text{ eV} \\implies V_s = 0.965\\text{ V}",
                  explanation: "Stopping voltage is numerically equal to K_max in eV.",
                },
                {
                  title: "3. Threshold Wavelength",
                  math: "\\lambda_0 = \\frac{hc}{\\phi} = \\frac{1242\\text{ eV}\\cdot\\text{nm}}{2.14\\text{ eV}} = 580.4\\text{ nm}",
                  explanation: "Longest wavelength capable of photoelectron emission.",
                },
              ],
              rubricPoints: [
                "2.0 Marks for K_max and V_s.",
                "3.0 Marks for threshold wavelength calculation.",
              ],
            },
          },
          {
            id: "2022-fa-q1-2",
            partNumber: "2.",
            title: "Compton Scattering at 90°",
            points: 5.0,
            type: "numerical",
            diagramType: "compton_collision",
            prompt: "An X-ray photon of wavelength $\\lambda = 0.0500\\text{ nm}$ strikes a stationary free electron and scatters at an angle of $\\theta = 90^\\circ$.\n(a) Find the wavelength $\\lambda'$ of the scattered photon.\n(b) Find the kinetic energy imparted to the recoil electron.",
            modelAnswer: {
              finalAnswer: "(a) λ' = 0.05243 nm (52.43 pm). (b) K_e = 1.15 keV (1.84 × 10⁻¹⁶ J).",
              steps: [
                {
                  title: "1. Compton Shift Calculation",
                  math: "\\Delta \\lambda = \\lambda_c(1 - \\cos 90^\\circ) = 2.43\\text{ pm}(1 - 0) = 2.43\\text{ pm} = 0.00243\\text{ nm}",
                  explanation: "λ' = λ + Δλ = 0.0500 + 0.00243 = 0.05243 nm.",
                },
                {
                  title: "2. Kinetic Energy Calculation",
                  math: "K_e = hc\\left(\\frac{1}{\\lambda} - \\frac{1}{\\lambda'}\\right) = 1242\\left(\\frac{1}{0.0500} - \\frac{1}{0.05243}\\right) = 1242(20.0 - 19.073) = 1151\\text{ eV} = 1.15\\text{ keV}",
                  explanation: "Energy imparted to recoil electron.",
                },
              ],
              rubricPoints: [
                "2.5 Marks for scattered wavelength.",
                "2.5 Marks for kinetic energy.",
              ],
            },
          },
        ],
      },
      {
        questionNumber: 2,
        totalPoints: 10,
        title: "Schrödinger Equation & Wave Function Normalization",
        competencyCode: "A6, A7",
        parts: [
          {
            id: "2022-fa-q2-1",
            partNumber: "1.",
            title: "Normalization Constant for 1D Infinite Well",
            points: 5.0,
            type: "derivation",
            prompt: "Normalize the wave function $\\psi(x) = A\\sin\\left(\\frac{n\\pi x}{L}\\right)$ for a particle in a one-dimensional box between $x = 0$ and $x = L$, and determine the normalization constant $A$.",
            modelAnswer: {
              finalAnswer: "A = √(2 / L)",
              steps: [
                {
                  title: "1. Normalization Condition",
                  math: "\\int_0^L |\\psi(x)|^2 dx = 1 \\implies A^2 \\int_0^L \\sin^2\\left(\\frac{n\\pi x}{L}\\right) dx = 1",
                  explanation: "Total probability of finding the particle anywhere in the box must equal unity.",
                },
                {
                  title: "2. Trigonometric Identity Integration",
                  math: "\\sin^2\\theta = \\frac{1 - \\cos(2\\theta)}{2} \\implies \\int_0^L \\sin^2\\left(\\frac{n\\pi x}{L}\\right) dx = \\frac{L}{2}",
                  explanation: "A²(L / 2) = 1 ⇒ A = √(2 / L).",
                },
              ],
              rubricPoints: ["2.5 Marks for integral setup.", "2.5 Marks for final normalization constant √(2/L)."],
            },
          },
          {
            id: "2022-fa-q2-2",
            partNumber: "2.",
            title: "Expectation Value <x> for Ground State",
            points: 5.0,
            type: "derivation",
            prompt: "Calculate the quantum expectation value of position $\\langle x \\rangle$ for a particle in the ground state ($n = 1$) of an infinite box of width $L$.",
            modelAnswer: {
              finalAnswer: "<x> = L / 2",
              steps: [
                {
                  title: "1. Expectation Value Formula",
                  math: "\\langle x \\rangle = \\int_0^L \\psi_1^*(x) x \\psi_1(x) dx = \\frac{2}{L}\\int_0^L x \\sin^2\\left(\\frac{\\pi x}{L}\\right) dx = \\frac{L}{2}",
                  explanation: "The average position is exactly at the physical center of the well.",
                },
              ],
              rubricPoints: ["5.0 Marks for expectation value integral and final answer L/2."],
            },
          },
        ],
      },
      {
        questionNumber: 3,
        totalPoints: 10,
        title: "Bohr Model & Quantum Electronic Configurations",
        competencyCode: "A4, A9",
        parts: [
          {
            id: "2022-fa-q3-1",
            partNumber: "1.",
            title: "Bohr Orbit Radius Derivation",
            points: 5.0,
            type: "derivation",
            diagramType: "bohr_levels",
            prompt: "Derive Bohr's formula for the radius of the $n$-th orbit in a hydrogen atom: $r_n = \\frac{n^2 \\hbar^2}{m k e^2} = n^2 a_0$, where $a_0 = 0.529\\text{ Å}$.",
            modelAnswer: {
              finalAnswer: "r_n = n² a₀ = 0.529 n² Å",
              steps: [
                {
                  title: "1. Centripetal & Coulomb Force Balance",
                  math: "\\frac{m v^2}{r} = \\frac{k e^2}{r^2} \\implies m v^2 r = k e^2",
                  explanation: "Coulomb electrostatic attraction provides the required centripetal acceleration.",
                },
                {
                  title: "2. Bohr Angular Momentum Quantization",
                  math: "L = m v r = n\\hbar \\implies v = \\frac{n\\hbar}{m r}",
                  explanation: "Substitute v into force balance equation:",
                },
                {
                  title: "3. Solve for Orbit Radius",
                  math: "m\\left(\\frac{n\\hbar}{m r}\\right)^2 r = k e^2 \\implies \\frac{n^2\\hbar^2}{m r} = k e^2 \\implies r_n = \\frac{n^2\\hbar^2}{m k e^2} = n^2 a_0",
                  explanation: "Where a₀ = 0.529 Å.",
                },
              ],
              rubricPoints: ["2.5 Marks for force balance and angular momentum condition.", "2.5 Marks for radius derivation."],
            },
          },
          {
            id: "2022-fa-q3-2",
            partNumber: "2.",
            title: "Germanium (Ge³²) Ground State Configuration",
            points: 5.0,
            type: "conceptual",
            diagramType: "orbital_boxes",
            prompt: "Write the complete ground-state electron configuration of Germanium ($Ge^{32}$, $Z = 32$) and state the number of unpaired electrons.",
            modelAnswer: {
              finalAnswer: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p² (or [Ar] 3d¹⁰ 4s² 4p²). There are 2 unpaired electrons in the 4p subshell.",
              steps: [
                {
                  title: "1. Aufbau Principle Filling",
                  explanation: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p².",
                },
                {
                  title: "2. Valence Orbital Distribution",
                  explanation: "4p subshell has 2 electrons in separate orbitals [↑][↑][ ] according to Hund's Rule.",
                },
              ],
              rubricPoints: ["3.0 Marks for complete configuration.", "2.0 Marks for unpaired electron count."],
            },
          },
        ],
      },
      {
        questionNumber: 4,
        totalPoints: 10,
        title: "Relativistic Momentum, Energy & Mass Invariance",
        competencyCode: "A10",
        parts: [
          {
            id: "2022-fa-q4-1",
            partNumber: "1.",
            title: "Relativistic Energy-Momentum Invariant Relation Proof",
            points: 5.0,
            type: "derivation",
            prompt: "Prove the fundamental relativistic relation: $E^2 = p^2 c^2 + m_0^2 c^4$, where $E = \\gamma m_0 c^2$ and $p = \\gamma m_0 v$.",
            modelAnswer: {
              finalAnswer: "E² = (pc)² + (m₀c²)²",
              steps: [
                {
                  title: "1. Definitions",
                  math: "E = \\gamma m_0 c^2, \\quad p = \\gamma m_0 v, \\quad \\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}",
                  explanation: "Calculate E² - p²c²:",
                },
                {
                  title: "2. Algebraic Identity",
                  math: "E^2 - p^2 c^2 = \\gamma^2 m_0^2 c^4 - \\gamma^2 m_0^2 v^2 c^2 = \\gamma^2 m_0^2 c^4\\left(1 - \\frac{v^2}{c^2}\\right)",
                  explanation: "Since γ²(1 - v²/c²) = 1:",
                },
                {
                  title: "3. Conclusion",
                  math: "E^2 - p^2 c^2 = m_0^2 c^4 \\implies E^2 = p^2 c^2 + m_0^2 c^4",
                  explanation: "Invariant mass hyperboloid in 4-momentum space.",
                },
              ],
              rubricPoints: ["2.5 Marks for relativistic definitions.", "2.5 Marks for algebraic reduction."],
            },
          },
          {
            id: "2022-fa-q4-2",
            partNumber: "2.",
            title: "Speed of Electron with Kinetic Energy Equal to Rest Mass Energy",
            points: 5.0,
            type: "numerical",
            prompt: "Find the speed of an electron whose relativistic kinetic energy is equal to its rest mass energy ($K = m_0 c^2$).",
            modelAnswer: {
              finalAnswer: "v = (√3 / 2) c = 0.866 c = 2.60 × 10⁸ m/s",
              steps: [
                {
                  title: "1. Total Energy & Gamma Factor",
                  math: "E = K + m_0 c^2 = m_0 c^2 + m_0 c^2 = 2 m_0 c^2 \\implies \\gamma = 2",
                  explanation: "Lorentz factor is exactly 2.",
                },
                {
                  title: "2. Solve for Speed v",
                  math: "\\frac{1}{\\sqrt{1 - v^2/c^2}} = 2 \\implies 1 - \\frac{v^2}{c^2} = \\frac{1}{4} \\implies \\frac{v^2}{c^2} = \\frac{3}{4} \\implies v = \\frac{\\sqrt{3}}{2}c \\approx 0.866\\text{ c}",
                  explanation: "v = 0.866 × 3 × 10⁸ = 2.598 × 10⁸ m/s.",
                },
              ],
              rubricPoints: ["2.5 Marks for evaluating γ = 2.", "2.5 Marks for solving v = 0.866 c."],
            },
          },
        ],
      },
    ],
  },
];
