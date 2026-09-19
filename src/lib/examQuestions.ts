import { ExamQuestion } from "../types";

export const EXAM_QUESTIONS: ExamQuestion[] = [
  // Question 1: Type A (Two-Part MCQ) - Photoelectric Effect Stopping Potential
  {
    id: "exam-q1",
    chapterId: "ch1",
    type: "Type A (Two-Part MCQ)",
    title: "Stopping Potential Dependence on Intensity vs Frequency",
    promptLatex: "In a photoelectric effect experiment, monochromatic light of frequency $f > f_c$ with intensity $I$ illuminates a cesium cathode (work function $\\phi = 2.14\\text{ eV}$), yielding a measured stopping potential $V_0$ and saturation photocurrent $I_{\\text{sat}}$. If the light intensity is tripled ($3I$) while maintaining constant frequency $f$:\n\n**Part 1:** What happens to the stopping potential $V_0$?\n**Part 2:** Provide the mandatory physical justification.",
    options: [
      { id: "A", text: "V_0 triples (3 V_0) because radiant energy delivered to the cathode increases threefold." },
      { id: "B", text: "V_0 remains strictly unchanged because individual photon energy hf is unchanged." },
      { id: "C", text: "V_0 increases by a factor of sqrt(3) due to electric field amplitude scaling." },
      { id: "D", text: "V_0 drops because increased electron emission causes space-charge repulsion." },
    ],
    correctOption: "B",
    solutionTrack: {
      startingAxiom: "Einstein's Photoelectric Energy Balance: $hf = \\phi + K_{\\max} = \\phi + e V_0$.",
      stepByStepDerivation: [
        {
          step: "1. Isolate Stopping Potential V_0",
          mathLatex: "V_0 = \\frac{h}{e}f - \\frac{\\phi}{e}",
          rationale: "Stopping potential is a single-valued function of incident frequency f, Planck's constant h, electron charge e, and cathode work function phi.",
        },
        {
          step: "2. Define Wave Intensity in Quantum Theory",
          mathLatex: "I = N_{\\gamma} \\cdot hf",
          rationale: "Intensity represents photon flux density N_gamma (photons per unit area per second). Tripling intensity triples N_gamma, which triples the number of emitted photoelectrons per second (tripling saturation current I_sat).",
        },
        {
          step: "3. Evaluate Energy per Individual Photoelectron",
          mathLatex: "\\frac{\\partial V_0}{\\partial I} = 0 \\implies V_0(3I) = V_0(I)",
          rationale: "Since one photon interacts with exactly one electron (1-to-1 collision), the maximum kinetic energy K_max = hf - phi of each individual electron remains completely unaltered.",
        },
      ],
      finalAnswer: "Option B is correct: V_0 remains strictly unchanged.",
      physicalJustification: "Stopping potential measures the kinetic energy of the single fastest liberated electron. Because light consists of localized quanta of energy E = hf, increasing intensity increases the RATE of photon arrivals (photocurrent), but does not alter the energy carried by any individual photon. Therefore, eV_0 = hf - phi is strictly constant.",
      commonTraps: [
        "Classical Wave Trap: Thinking intensity corresponds to wave energy that charges up electrons to higher velocities.",
        "Confusing Saturation Current (which triples) with Stopping Potential (which stays constant).",
      ],
    },
  },

  // Question 2: Type C (Boundary Probability) - Particle in a Box
  {
    id: "exam-q2",
    chapterId: "ch2",
    type: "Type C (Boundary Probability)",
    title: "Fractional Box Probability Integral in Excited State n=2",
    promptLatex: "A particle of mass $m$ is trapped in a one-dimensional infinite square well of width $L$ ($0 \\le x \\le L$) in the first excited state ($n = 2$).\n\nCalculate the exact probability $P\\left(\\frac{L}{2} \\le x \\le L\\right)$ of detecting the particle in the right half of the box, and compare it with the probability $P\\left(\\frac{L}{4} \\le x \\le \\frac{3L}{4}\\right)$ of finding the particle in the central half of the box.",
    solutionTrack: {
      startingAxiom: "Born's Probability Density: $P(a \\le x \\le b) = \\int_a^b |\\psi_n(x)|^2 dx$, with normalized eigenfunctions $\\psi_n(x) = \\sqrt{\\frac{2}{L}}\\sin\\left(\\frac{n\\pi x}{L}\\right)$.",
      stepByStepDerivation: [
        {
          step: "1. Express the Probability Density for n=2",
          mathLatex: "|\\psi_2(x)|^2 = \\frac{2}{L}\\sin^2\\left(\\frac{2\\pi x}{L}\\right) = \\frac{2}{L}\\cdot \\frac{1 - \\cos\\left(\\frac{4\\pi x}{L}\\right)}{2} = \\frac{1}{L}\\left[1 - \\cos\\left(\\frac{4\\pi x}{L}\\right)\\right]",
          rationale: "Using the trigonometric identity sin^2(u) = (1 - cos(2u))/2.",
        },
        {
          step: "2. Integrate over the Right Half [L/2, L]",
          mathLatex: "P\\left(\\frac{L}{2} \\le x \\le L\\right) = \\int_{L/2}^L \\frac{1}{L}\\left[1 - \\cos\\left(\\frac{4\\pi x}{L}\\right)\\right] dx = \\frac{1}{L}\\left[ x - \\frac{L}{4\\pi}\\sin\\left(\\frac{4\\pi x}{L}\\right) \\right]_{L/2}^L",
          rationale: "Substitute upper and lower limits.",
        },
        {
          step: "3. Evaluate Limits for Right Half",
          mathLatex: "P = \\frac{1}{L}\\left[\\left(L - \\frac{L}{4\\pi}\\sin(4\\pi)\\right) - \\left(\\frac{L}{2} - \\frac{L}{4\\pi}\\sin(2\\pi)\\right)\\right] = \\frac{1}{L}\\left(L - 0 - \\frac{L}{2} + 0\\right) = \\frac{1}{2} = 50\\%",
          rationale: "Since sin(4pi) = 0 and sin(2pi) = 0. By spatial symmetry, each half contains exactly 50% probability.",
        },
        {
          step: "4. Integrate over the Central Half [L/4, 3L/4]",
          mathLatex: "P\\left(\\frac{L}{4} \\le x \\le \\frac{3L}{4}\\right) = \\frac{1}{L}\\left[ x - \\frac{L}{4\\pi}\\sin\\left(\\frac{4\\pi x}{L}\\right) \\right]_{L/4}^{3L/4} = \\frac{1}{L}\\left[\\left(\\frac{3L}{4} - \\frac{L}{4\\pi}\\sin(3\\pi)\\right) - \\left(\\frac{L}{4} - \\frac{L}{4\\pi}\\sin(\\pi)\\right)\\right] = \\frac{1}{L}\\left(\\frac{2L}{4} - 0\\right) = \\frac{1}{2} = 50\\%",
          rationale: "Notice that for n=2, there is an exact node at x = L/2 where probability density is ZERO, with two equal antinodes peaking at x = L/4 and x = 3L/4.",
        },
      ],
      finalAnswer: "Both intervals yield exactly P = 0.500 (50.0%).",
      physicalJustification: "For state n=2, the wavefunction has a node at the exact center x=L/2 (|psi_2(L/2)|^2 = 0) and two symmetric probability lobes centered at L/4 and 3L/4. The interval [L/4, 3L/4] captures half of the left lobe (from L/4 to L/2) and half of the right lobe (from L/2 to 3L/4), summing symmetrically to exactly 50%.",
      commonTraps: [
        "Assuming that because psi_2(L/2) = 0, the probability in the central region must be small: you must integrate over the entire finite interval!",
        "Forgetting to divide by L when evaluating antiderivative 1/L * x.",
      ],
    },
  },

  // Question 3: Type B (Formal Derivation) - Compton Scattering Shift
  {
    id: "exam-q3",
    chapterId: "ch1",
    type: "Type B (Formal Derivation)",
    title: "First-Principles Derivation of Compton Shift Equation",
    promptLatex: "An incident X-ray photon of frequency $f$ collides with a free electron of rest mass $m_0$ initially at rest. The photon scatters through angle $\\theta$ with frequency $f'$, while the electron recoils at angle $\\phi$ with speed $v$.\n\nStarting from the Relativistic Conservation of Energy and Relativistic Conservation of Momentum, derive without skipping steps the Compton shift formula:\n$$\\Delta\\lambda = \\lambda' - \\lambda = \\frac{h}{m_0 c}(1 - \\cos\\theta)$$",
    solutionTrack: {
      startingAxiom: "Relativistic 4-Momentum Conservation: $P_\\gamma^\\mu + P_e^\\mu = P_\\gamma'^\\mu + P_e'^\\mu$.",
      stepByStepDerivation: [
        {
          step: "1. Conservation of Total Relativistic Energy",
          mathLatex: "hf + m_0 c^2 = hf' + mc^2 \\implies mc^2 = h(f - f') + m_0 c^2",
          rationale: "Electron initial kinetic energy is zero, so its initial energy is rest energy m_0 c^2.",
        },
        {
          step: "2. Square Total Energy Equation",
          mathLatex: "m^2 c^4 = h^2(f - f')^2 + 2h(f - f')m_0 c^2 + m_0^2 c^4",
          rationale: "Algebraic expansion of (A + B)^2 = A^2 + 2AB + B^2.",
        },
        {
          step: "3. Conservation of Momentum Vector Triangle",
          mathLatex: "\\vec{p}_e = \\vec{p}_{\\gamma} - \\vec{p}'_{\\gamma} \\implies p_e^2 = p_{\\gamma}^2 + p_{\\gamma}'^2 - 2 p_{\\gamma} p_{\\gamma}' \\cos\\theta",
          rationale: "Law of cosines on vector triangle formed by incident photon, scattered photon, and recoil electron.",
        },
        {
          step: "4. Substitute Photon Momentum p = hf/c",
          mathLatex: "p_e^2 c^2 = h^2 f^2 + h^2 f'^2 - 2 h^2 f f' \\cos\\theta",
          rationale: "Multiplying momentum squared by c^2 to bring into energy units.",
        },
        {
          step: "5. Invoke Relativistic Invariant m^2 c^4 - p_e^2 c^2 = m_0^2 c^4",
          mathLatex: "[h^2(f - f')^2 + 2h(f - f')m_0 c^2 + m_0^2 c^4] - [h^2 f^2 + h^2 f'^2 - 2 h^2 f f' \\cos\\theta] = m_0^2 c^4",
          rationale: "Subtracting the two equations cancels m_0^2 c^4 on both sides.",
        },
        {
          step: "6. Expand and Simplify h^2 terms",
          mathLatex: "h^2(f^2 - 2ff' + f'^2) - h^2(f^2 + f'^2) + 2h^2 ff'\\cos\\theta + 2h(f - f')m_0 c^2 = 0",
          rationale: "f^2 and f'^2 cancel identically, leaving: -2h^2 ff' + 2h^2 ff' cos(theta) + 2h(f - f')m_0 c^2 = 0.",
        },
        {
          step: "7. Divide by 2h m_0 c^2 ff'",
          mathLatex: "\\frac{f - f'}{f f'} = \\frac{h}{m_0 c^2}(1 - \\cos\\theta) \\implies \\frac{c}{f'} - \\frac{c}{f} = \\frac{h}{m_0 c}(1 - \\cos\\theta)",
          rationale: "Since c/f' = lambda' and c/f = lambda, we arrive at Delta lambda = lambda' - lambda = (h/m_0 c)(1 - cos theta).",
        },
      ],
      finalAnswer: "\\Delta\\lambda = \\lambda_c(1 - \\cos\\theta), \\quad \\text{where } \\lambda_c = \\frac{h}{m_0 c} = 2.426 \\times 10^{-12}\\text{ m}.",
      physicalJustification: "The derivation confirms that photon-electron scattering is an elastic relativistic collision. The wavelength shift depends strictly on the scattering angle theta and the universal constant h/(m_0 c), completely independent of the incident wavelength lambda.",
      commonTraps: [
        "Treating the electron non-relativistically with p_e = m_0 v: gives an incorrect quadratic error.",
        "Sign error on the cosine term: remember it is (1 - cos theta), so shift is zero at theta = 0, not maximum.",
      ],
    },
  },

  // Question 4: Type D (Relativistic Transformation) - Lorentz vs Galilean Coordinates
  {
    id: "exam-q4",
    chapterId: "ch4",
    type: "Type D (Relativistic Transformation)",
    title: "Relativistic vs Galilean Spacetime Coordinate Comparison",
    promptLatex: "Reference frame $S'$ moves along the positive $x$-axis at speed $v = 0.8c$ relative to stationary frame $S$. The origins coincide at $t = t' = 0$.\n\nAn event occurs in frame $S$ at coordinates $x = 3.0 \\times 10^8\\text{ m}$, $y = 1.0\\text{ m}$, $z = 0$, at time $t = 2.0\\text{ s}$.\n\n**Calculate:**\n1. The Galilean coordinates $(x'_G, y'_G, z'_G, t'_G)$ predicted by classical mechanics.\n2. The exact relativistic Lorentz coordinates $(x'_L, y'_L, z'_L, t'_L)$.\n3. Determine the percentage discrepancy in the spatial and temporal coordinates.",
    solutionTrack: {
      startingAxiom: "Lorentz Transformation Equations: $x' = \\gamma(x - vt)$, $y' = y$, $z' = z$, $t' = \\gamma(t - vx/c^2)$, where $\\gamma = 1/\\sqrt{1 - v^2/c^2}$. Classical Galilean Transformations: $x'_G = x - vt$, $t'_G = t$.",
      stepByStepDerivation: [
        {
          step: "1. Calculate the Lorentz Factor gamma",
          mathLatex: "\\frac{v}{c} = 0.8 \\implies \\gamma = \\frac{1}{\\sqrt{1 - (0.8)^2}} = \\frac{1}{\\sqrt{1 - 0.64}} = \\frac{1}{\\sqrt{0.36}} = \\frac{1}{0.6} = \\frac{5}{3} \\approx 1.6667",
          rationale: "Exact fraction 5/3 simplifies algebraic evaluation.",
        },
        {
          step: "2. Calculate Classical Galilean Coordinates",
          mathLatex: "x'_G = x - vt = (3.0 \\times 10^8) - (0.8 \\times 3.0 \\times 10^8)(2.0) = 3.0 \\times 10^8 - 4.8 \\times 10^8 = -1.80 \\times 10^8\\text{ m}",
          rationale: "Classical time t'_G = t = 2.00 s; y'_G = 1.0 m, z'_G = 0 m.",
        },
        {
          step: "3. Calculate Relativistic Lorentz Spatial Coordinate x'_L",
          mathLatex: "x'_L = \\gamma(x - vt) = \\frac{5}{3} (-1.80 \\times 10^8\\text{ m}) = -3.00 \\times 10^8\\text{ m}",
          rationale: "Lorentz spatial coordinate is stretched by gamma = 5/3.",
        },
        {
          step: "4. Calculate Relativistic Lorentz Temporal Coordinate t'_L",
          mathLatex: "t'_L = \\gamma\\left(t - \\frac{v x}{c^2}\\right) = \\frac{5}{3}\\left(2.0 - \\frac{0.8 c \\cdot (3.0 \\times 10^8)}{c^2}\\right) = \\frac{5}{3}\\left(2.0 - \\frac{0.8 \\times 3.0 \\times 10^8}{3.0 \\times 10^8}\\right) = \\frac{5}{3}(2.0 - 0.8) = \\frac{5}{3}(1.2) = 2.00\\text{ s}",
          rationale: "Notice vx/c^2 = 0.8 seconds! Subtracting gives 1.2 s, multiplied by 5/3 equals exactly 2.00 s.",
        },
      ],
      finalAnswer: "Galilean: x'_G = -1.80 x 10^8 m, t'_G = 2.00 s. Lorentz: x'_L = -3.00 x 10^8 m, t'_L = 2.00 s. Discrepancy in position is 66.7%!",
      physicalJustification: "Classical Galilean transformations fail at v = 0.8c because they neglect length contraction and spatial skewing. Although t'_L co-incidentally equals 2.00 s in this particular coordinate configuration due to the specific choice of x and t, the spatial separation has diverged by a full factor of gamma = 1.667.",
      commonTraps: [
        "Forgetting to multiply the bracket (x - vt) by gamma in the spatial equation.",
        "Using plus instead of minus in t' = gamma(t - vx/c^2) for forward transformations.",
      ],
    },
  },

  // Question 5: Type A (Two-Part MCQ) - Continuous X-Ray Duane-Hunt Cutoff
  {
    id: "exam-q5",
    chapterId: "ch3",
    type: "Type A (Two-Part MCQ)",
    title: "Target Anode Material Effect on Duane-Hunt Cutoff Wavelength",
    promptLatex: "An X-ray tube operates at an accelerating potential $V = 40.0\\text{ kV}$ using a Copper ($Z = 29$) anode target, producing a continuous Bremsstrahlung spectrum with minimum cutoff wavelength $\\lambda_{\\min}$.\n\nIf the Copper target is replaced with a heavy Tungsten ($Z = 74$) target while keeping the tube voltage fixed at $40.0\\text{ kV}$:\n\n**Part 1:** What is the new minimum cutoff wavelength $\\lambda_{\\min}$?\n**Part 2:** State the governing physical law.",
    options: [
      { id: "A", text: "lambda_min decreases by factor 29/74 because higher nuclear charge decelerates electrons more violently." },
      { id: "B", text: "lambda_min remains strictly identical because Duane-Hunt cutoff depends solely on accelerating voltage V." },
      { id: "C", text: "lambda_min increases because tungsten electrons provide higher screening shielding." },
      { id: "D", text: "lambda_min shifts by (Z - 1)^2 according to Moseley's law." },
    ],
    correctOption: "B",
    solutionTrack: {
      startingAxiom: "Duane-Hunt Law of Bremsstrahlung Radiation: $\\lambda_{\\min} = \\frac{hc}{e V}$.",
      stepByStepDerivation: [
        {
          step: "1. Mechanism of Cutoff Wavelength",
          mathLatex: "K_{\\max} = e V = h f_{\\max} = \\frac{hc}{\\lambda_{\\min}}",
          rationale: "Cutoff occurs when an incident electron loses 100% of its kinetic energy in a single catastrophic collision with a target nucleus, converting all eV into a single photon.",
        },
        {
          step: "2. Numerical Evaluation at V = 40 kV",
          mathLatex: "\\lambda_{\\min} = \\frac{1.24 \\times 10^{-6}\\text{ V}\\cdot\\text{m}}{40,000\\text{ V}} = 0.031\\text{ nm} = 0.31\\text{ \\AA} = 31\\text{ pm}",
          rationale: "Calculation involves only universal constants h, c, e, and the applied voltage V.",
        },
        {
          step: "3. Evaluate Atomic Number Z Dependence",
          mathLatex: "\\frac{\\partial \\lambda_{\\min}}{\\partial Z} = 0",
          rationale: "Target atomic number Z increases total radiated intensity (I_total proportional to Z*V^2) and determines characteristic peak locations (Moseley's law), but has ZERO effect on the cutoff boundary lambda_min.",
        },
      ],
      finalAnswer: "Option B is correct: lambda_min remains strictly identical (0.31 Angstrom).",
      physicalJustification: "The Duane-Hunt cutoff represents the absolute upper limit of energy conservation in bremsstrahlung. Since maximum electron kinetic energy is fixed by the power supply voltage (K = eV), the most energetic photon possible has energy hf_max = eV, so lambda_min = hc/(eV). Atomic number Z alters the efficiency of bremsstrahlung and characteristic line positions, but cannot violate energy conservation.",
      commonTraps: [
        "Confusing continuous cutoff lambda_min with Characteristic X-ray lines (K_alpha, K_beta), which DO depend strongly on Z via Moseley's law.",
        "Confusing total emission intensity (which scales linearly with Z) with the cutoff wavelength.",
      ],
    },
  },

  // Question 6: Modern Academy Fall 2020/2021 Exam (Dr. Abeer & Dr. Sally) - Compton Scattering at 30°
  {
    id: "exam-ma-2020-q1",
    chapterId: "ch1",
    type: "Type A (Two-Part MCQ)",
    title: "[Modern Academy 2020/2021] Compton Scattering of 2.6 pm Photons at 30°",
    promptLatex: "A target containing free electrons is illuminated by photons of wavelength $\\lambda = 2.6\\text{ pm}$. The wavelength $\\lambda'$ of a photon that is scattered at $30^\\circ$ from the incident direction is:\n\n*(Official Modern Academy Exam Fall 2020/2021, Examiners: Dr. Abeer Serag Eldeen & Dr. Sally Eladly)*",
    options: [
      { id: "A", text: "2.925 × 10⁻¹¹ m" },
      { id: "B", text: "2.925 × 10⁻¹² m (2.925 pm)" },
      { id: "C", text: "2.925 × 10⁻¹³ m" },
      { id: "D", text: "2.925 × 10⁻¹⁴ m" },
    ],
    correctOption: "B",
    solutionTrack: {
      startingAxiom: "Compton Shift Formula: $\\Delta\\lambda = \\lambda' - \\lambda = \\frac{h}{m_0 c}(1 - \\cos\\theta)$, with $\\lambda_c = 2.43\\text{ pm}$.",
      stepByStepDerivation: [
        {
          step: "1. Calculate Wavelength Shift Δλ",
          mathLatex: "\\Delta\\lambda = (2.43\\text{ pm})(1 - \\cos 30^\\circ) = 2.43 \\times (1 - 0.866025) = 2.43 \\times 0.133975 = 0.3256\\text{ pm}",
          rationale: "The shift depends strictly on scattering angle θ and the Compton wavelength.",
        },
        {
          step: "2. Add to Incident Wavelength",
          mathLatex: "\\lambda' = \\lambda + \\Delta\\lambda = 2.60\\text{ pm} + 0.3256\\text{ pm} = 2.9256\\text{ pm} = 2.925 \\times 10^{-12}\\text{ m}",
          rationale: "1 pm = 10⁻¹² m.",
        },
      ],
      finalAnswer: "Option B is correct: 2.925 × 10⁻¹² m (2.925 pm).",
      physicalJustification: "The scattered photon loses energy and momentum during the elastic collision with the electron. Because Δλ = (h/m_0 c)(1 - cos θ) is always positive for θ > 0, the scattered photon always has a longer wavelength. For θ = 30°, the shift is 0.3256 pm, giving λ' = 2.925 pm.",
      commonTraps: [
        "Powers of 10 trap: Forgetting that 1 pm = 10⁻¹² m (confusing with nm = 10⁻⁹ m or Å = 10⁻¹⁰ m).",
        "Subtracting the shift instead of adding it (scattered wavelength λ' is always LONGER than incident λ).",
      ],
    },
  },

  // Question 7: Modern Academy Fall 2020/2021 Exam - Heisenberg Mass Determination
  {
    id: "exam-ma-2020-q2",
    chapterId: "ch2",
    type: "Type A (Two-Part MCQ)",
    title: "[Modern Academy 2020/2021] Particle Mass Determination from Heisenberg Uncertainty",
    promptLatex: "The uncertainty in position and velocity of a particle are $\\Delta x = 10^{-10}\\text{ m}$ and $\\Delta v = 6.63 \\times 10^{-24}\\text{ m/s}$ respectively. The mass of the particle is:\n\n*(Official Modern Academy Exam Fall 2020/2021)*",
    options: [
      { id: "A", text: "0.092 Kg" },
      { id: "B", text: "0.0796 Kg" },
      { id: "C", text: "1.125 Kg" },
      { id: "D", text: "0.0879 Kg" },
    ],
    correctOption: "B",
    solutionTrack: {
      startingAxiom: "Heisenberg Uncertainty Principle: $\\Delta x \\Delta p = \\Delta x (m \\Delta v) \\ge \\frac{\\hbar}{2} = \\frac{h}{4\\pi}$.",
      stepByStepDerivation: [
        {
          step: "1. Isolate Mass m",
          mathLatex: "m = \\frac{h}{4\\pi \\Delta x \\Delta v}",
          rationale: "Relate particle mass to position and velocity uncertainties.",
        },
        {
          step: "2. Algebraic Cancellation of Planck's Constant",
          mathLatex: "m = \\frac{6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}}{4\\pi \\times 10^{-10}\\text{ m} \\times (6.63 \\times 10^{-24}\\text{ m/s})} = \\frac{6.63 \\times 10^{-34}}{4\\pi \\times 6.63 \\times 10^{-34}} = \\frac{1}{4\\pi}\\text{ kg}",
          rationale: "The numbers 6.63 × 10⁻³⁴ cancel out exactly!",
        },
        {
          step: "3. Evaluate Exact Numerical Value",
          mathLatex: "m = \\frac{1}{4\\pi} = \\frac{1}{12.56637} \\approx 0.079577\\text{ kg} \\approx 0.0796\\text{ kg}",
          rationale: "Rounding to 4 significant figures.",
        },
      ],
      finalAnswer: "Option B is correct: 0.0796 Kg.",
      physicalJustification: "The exact numerical design of the problem allows Planck's constant in the numerator to cancel the denominator product Δx Δv = 6.63 × 10⁻³⁴. The answer is precisely 1/(4π) kg = 0.0796 kg.",
      commonTraps: [
        "Attempting manual long division without noticing that the 6.63 factor in Planck's constant cancels the 6.63 in Δv.",
        "Using h/(2π) instead of h/(4π) for the Heisenberg lower bound.",
      ],
    },
  },

  // Question 8: Modern Academy Fall 2020/2021 Exam - Relativistic Length Contraction
  {
    id: "exam-ma-2020-q4",
    chapterId: "ch4",
    type: "Type A (Two-Part MCQ)",
    title: "[Modern Academy 2020/2021] Meter Stick Length with Relativistic Mass 5/4 Rest Mass",
    promptLatex: "The length of a meter stick moving parallel to its length when its relativistic mass is $5/4$ of its rest mass is:\n\n*(Official Modern Academy Exam Fall 2020/2021)*",
    options: [
      { id: "A", text: "0.76 m" },
      { id: "B", text: "0.67 m" },
      { id: "C", text: "1.25 m" },
      { id: "D", text: "0.80 m" },
    ],
    correctOption: "D",
    solutionTrack: {
      startingAxiom: "Relativistic Mass $m = \\gamma m_0$ and Length Contraction $L = L_p / \\gamma$.",
      stepByStepDerivation: [
        {
          step: "1. Determine Lorentz Factor γ",
          mathLatex: "m = \\frac{5}{4}m_0 \\implies \\gamma = \\frac{5}{4} = 1.25",
          rationale: "From the definition of relativistic mass m = γ m_0.",
        },
        {
          step: "2. Apply Length Contraction to Meter Stick (L_p = 1.0 m)",
          mathLatex: "L = \\frac{L_p}{\\gamma} = \\frac{1.0\\text{ m}}{5/4} = \\frac{4}{5}\\text{ m} = 0.80\\text{ m}",
          rationale: "Length contracts strictly along the direction of relative motion.",
        },
      ],
      finalAnswer: "Option D is correct: 0.80 m.",
      physicalJustification: "Since relativistic mass scales with γ (m = γ m_0), γ = 5/4. Moving lengths contract by the exact inverse factor (1/γ), so L = 1.0 / (5/4) = 4/5 = 0.80 m.",
      commonTraps: [
        "Multiplying proper length by γ instead of dividing (leading to Option C: 1.25 m). Length ALWAYS contracts in motion!",
        "Trying to find velocity v first: while v = 0.6c (since √(1 - 0.36) = 0.8), solving for v is unnecessary because L = L_p / γ directly.",
      ],
    },
  },

  // Question 9: Modern Academy Spring 2019/2020 Exam - 3s Level Splitting in Solids
  {
    id: "exam-ma-2019-q4",
    chapterId: "ch4",
    type: "Type A (Two-Part MCQ)",
    title: "[Modern Academy 2019/2020] 3s Level Splitting for Six Sodium Atoms",
    promptLatex: "When six sodium atoms are brought together, the 3s levels are splitting into:\n\n*(Official Modern Academy Exam Spring 2019/2020, Examiners: Dr. L. I. Soliman & Dr. Sally Eladly)*",
    options: [
      { id: "A", text: "Two levels" },
      { id: "B", text: "Six levels" },
      { id: "C", text: "Ten levels" },
      { id: "D", text: "None of those" },
    ],
    correctOption: "B",
    solutionTrack: {
      startingAxiom: "Band Formation in Solids: Overlap of N identical atomic wavefunctions lifts degeneracy, splitting each atomic level into exactly N discrete levels.",
      stepByStepDerivation: [
        {
          step: "1. Pauli Exclusion Principle in Molecular & Solid State",
          mathLatex: "N \\text{ atoms} \\implies N \\text{ distinct split energy levels per atomic state}",
          rationale: "When isolated atoms are brought together, electron wavefunctions overlap. By the Pauli exclusion principle, electrons cannot occupy identical states.",
        },
        {
          step: "2. Application to N = 6 Sodium Atoms",
          mathLatex: "N = 6 \\implies \\text{the atomic 3s state splits into exactly 6 levels}",
          rationale: "For a macroscopic solid with N ~ 10²³ atoms, these 10²³ closely spaced levels form a continuous energy band (the 3s conduction band).",
        },
      ],
      finalAnswer: "Option B is correct: Six levels.",
      physicalJustification: "Each isolated atomic level splits into as many distinct energy levels as there are interacting atoms in the system. Bringing 6 sodium atoms together creates a 6-level manifold.",
      commonTraps: [
        "Confusing the number of valence electrons (which is 1 per sodium atom) with the number of split levels (which is N = 6).",
      ],
    },
  },
];
