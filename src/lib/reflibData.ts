import { 
  MasterclassSheet, 
  VideoLectureItem, 
  CrammingMockExam, 
  GlobalFormulaItem 
} from "../types";

export const MASTERCLASS_SHEETS: MasterclassSheet[] = [
  {
    id: "sheet-1",
    number: 1,
    title: "Sheet 1: Quantum Properties of Thermal Radiation",
    subtitle: "Blackbody Radiation, Photoelectric Effect & Compton Scattering",
    instructor: "Dr. Sally Abdelaziz El-Adly & Dr. Abeer Hassan Serag El-Deen",
    theoryParts: [
      {
        id: "s1-t1",
        title: "Wien's Displacement Law & Stefan-Boltzmann Law",
        statement: "Blackbody radiation spectrum depends solely on absolute temperature T. As T increases, total radiated energy increases (area under curve) and peak wavelength shifts toward shorter wavelengths.",
        keyFormulas: [
          "\\lambda_{\\max} T = 2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}",
          "P = \\sigma A \\varepsilon T^4 \\quad (\\varepsilon = 1 \\text{ for ideal blackbody})",
          "I = \\sigma T^4 \\quad (\\sigma = 5.67 \\times 10^{-8} \\text{ W}\\cdot\\text{m}^{-2}\\cdot\\text{K}^{-4})"
        ],
        takeaway: "Doubling temperature T halves the peak wavelength λ_max and multiplies total emitted power by 2^4 = 16x!"
      },
      {
        id: "s1-t2",
        title: "Planck's Quantum Hypothesis vs. Rayleigh-Jeans UV Catastrophe",
        statement: "Rayleigh-Jeans classical model I(\\lambda, T) = \\frac{2\\pi c k_B T}{\\lambda^4} predicts infinite energy density as λ → 0 (UV catastrophe). Planck resolved this by postulating that cavity atomic oscillators possess discrete quantized energy levels E_n = n h f and absorb/emit light in quanta E = hf.",
        proofOrDerivation: "Planck's law: I(\\lambda, T) = \\frac{2\\pi h c^2}{\\lambda^5 (e^{hc/\\lambda k_B T} - 1)}. For long wavelengths hc/(\\lambda k_B T) \\ll 1, Taylor expanding e^x \\approx 1 + x gives e^{hc/\\lambda k_B T} - 1 \\approx \\frac{hc}{\\lambda k_B T}. Substituting: I(\\lambda, T) \\to \\frac{2\\pi h c^2}{\\lambda^5 (hc/\\lambda k_B T)} = \\frac{2\\pi c k_B T}{\\lambda^4}, identically recovering Rayleigh-Jeans.",
        keyFormulas: [
          "E_n = n h f \\quad (n = 1, 2, 3, \\dots)",
          "E_{\\text{photon}} = hf = \\frac{hc}{\\lambda} \\approx \\frac{1240}{\\lambda(\\text{nm})} \\text{ eV}",
          "h = 6.626 \\times 10^{-34} \\text{ J}\\cdot\\text{s} = 4.14 \\times 10^{-15} \\text{ eV}\\cdot\\text{s}"
        ],
        takeaway: "Energy of molecular oscillation depends strictly on frequency, NOT on amplitude as classical physics assumed."
      },
      {
        id: "s1-t3",
        title: "Einstein's Photoelectric Effect & Stopping Voltage",
        statement: "Photoelectrons are ejected when incident photon energy exceeds metal work function ϕ = h f_c. K_max depends linearly on frequency f and is completely independent of intensity. Increasing intensity increases photon flux and saturation photocurrent I_s, but leaves stopping potential V_s invariant.",
        keyFormulas: [
          "E = hf = \\phi + K_{\\max}",
          "K_{\\max} = e V_s = \\frac{1}{2} m v_{\\max}^2",
          "V_s = \\frac{h}{e}f - \\frac{\\phi}{e} = \\frac{hc}{e}\\frac{1}{\\lambda} - \\frac{\\phi}{e}",
          "\\lambda_c = \\frac{hc}{\\phi} \\quad (\\text{Cut-off / Threshold wavelength})"
        ],
        takeaway: "The slope of K_max vs. f graph is universally h/e (or h in Joules), identical for all metals regardless of work function!"
      },
      {
        id: "s1-t4",
        title: "Compton Scattering & Shift Derivation",
        statement: "Scattering of energetic X-ray/γ-ray photons by stationary free electrons. Modeled as an elastic relativistic collision where both conservation of relativistic energy and momentum hold.",
        proofOrDerivation: "Conservation of energy: hf + m_0 c^2 = hf' + m c^2 \\implies m c^2 = h(f - f') + m_0 c^2. Conservation of momentum: x-dir: \\frac{hf}{c} = \\frac{hf'}{c}\\cos\\theta + mv\\cos\\phi; y-dir: 0 = \\frac{hf'}{c}\\sin\\theta - mv\\sin\\phi. Squaring and subtracting relativistic invariant (pc)^2 = E^2 - E_0^2 yields: \\Delta\\lambda = \\lambda' - \\lambda = \\frac{h}{m_0 c}(1 - \\cos\\theta).",
        keyFormulas: [
          "\\Delta\\lambda = \\lambda' - \\lambda = \\frac{h}{m_0 c}(1 - \\cos\\theta) = \\lambda_c (1 - \\cos\\theta)",
          "\\lambda_c = \\frac{h}{m_0 c} = 0.0243 \\text{ \\AA} = 2.43 \\text{ pm} \\quad (\\text{for electron})",
          "\\theta = 90^\\circ \\implies \\Delta\\lambda = \\lambda_c = 2.43 \\text{ pm}",
          "\\theta = 180^\\circ (\\text{Head-on backscatter}) \\implies \\Delta\\lambda = 2\\lambda_c = 4.86 \\text{ pm} \\quad (\\text{Maximum shift})"
        ],
        takeaway: "Compton shift Δλ is strictly independent of the incident wavelength and depends solely on scattering angle θ."
      }
    ],
    solvedProblems: [
      {
        id: "s1-p1",
        problemNumber: 1,
        title: "Sun Surface Temperature from Peak Wavelength (Wien's Law)",
        statement: "The effective surface temperature of the Sun radiates most strongly at peak wavelength λ_max = 510 nm. Calculate the temperature of the surface of the Sun.",
        givenParameters: ["\\lambda_{\\max} = 510 \\text{ nm} = 510 \\times 10^{-9} \\text{ m}"],
        requiredAnswers: ["Temperature T of Sun's surface"],
        officialSolution: {
          governingFormula: "\\lambda_{\\max} T = 2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}",
          calculationSteps: [
            {
              step: "Solve for T from Wien's displacement equation",
              latex: "T = \\frac{2.898 \\times 10^{-3}}{\\lambda_{\\max}} = \\frac{2.898 \\times 10^{-3}}{510 \\times 10^{-9}}"
            },
            {
              step: "Compute numerical result",
              latex: "T = 5682.35 \\text{ K} \\approx 5700 \\text{ K}"
            }
          ],
          finalValue: "5700",
          units: "K"
        },
        pitfallWarning: "Always convert nm to meters (10^-9 m) before dividing into 2.898 × 10^-3 m·K."
      },
      {
        id: "s1-p2",
        problemNumber: 2,
        title: "Radiation from Human Skin (IR Night Vision)",
        statement: "The temperature of human skin is approximately 35.0 °C. At what wavelength does the radiation emitted from the skin reach its peak? In what region of the EM spectrum is this?",
        givenParameters: ["T = 35.0 \\, ^\\circ\\text{C} = 273 + 35 = 308 \\text{ K}"],
        requiredAnswers: ["Peak wavelength \\lambda_{\\max}"],
        officialSolution: {
          governingFormula: "\\lambda_{\\max} = \\frac{2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}}{T}",
          calculationSteps: [
            {
              step: "Convert Celsius to Kelvin",
              latex: "T = 273 + 35 = 308 \\text{ K}"
            },
            {
              step: "Substitute into Wien's law",
              latex: "\\lambda_{\\max} = \\frac{2.898 \\times 10^{-3}}{308} = 9.41 \\times 10^{-6} \\text{ m} = 9.41 \\text{ }\\mu\\text{m}"
            }
          ],
          finalValue: "9.41",
          units: "μm"
        },
        pitfallWarning: "Never plug in °C directly! You must add 273 to convert to Kelvin (308 K)."
      },
      {
        id: "s1-p3",
        problemNumber: 3,
        title: "Net Power Radiated through Cavity Oven Aperture",
        statement: "An oven with inside temperature T_o = 227 °C is in a room having temperature T_r = 27 °C. There is a small opening of area 5 cm² on one side. How much net power is transferred from oven to room?",
        givenParameters: [
          "T_o = 227 \\, ^\\circ\\text{C} = 500 \\text{ K}",
          "T_r = 27 \\, ^\\circ\\text{C} = 300 \\text{ K}",
          "A = 5 \\text{ cm}^2 = 5 \\times 10^{-4} \\text{ m}^2",
          "\\varepsilon = 1 \\quad (\\text{cavity opening behaves as ideal blackbody})",
          "\\sigma = 5.67 \\times 10^{-8} \\text{ W}/(\\text{m}^2\\cdot\\text{K}^4)"
        ],
        requiredAnswers: ["Net power radiated P_{\\text{net}}"],
        officialSolution: {
          governingFormula: "P_{\\text{net}} = \\sigma A \\varepsilon (T_o^4 - T_r^4)",
          calculationSteps: [
            {
              step: "Convert temperatures to Kelvin and area to m²",
              latex: "T_o = 500\\text{ K}, \\quad T_r = 300\\text{ K}, \\quad A = 5.0 \\times 10^{-4}\\text{ m}^2"
            },
            {
              step: "Compute temperature difference of fourth powers",
              latex: "T_o^4 - T_r^4 = (500)^4 - (300)^4 = 6.25 \\times 10^{10} - 8.1 \\times 10^9 = 5.44 \\times 10^{10} \\text{ K}^4"
            },
            {
              step: "Calculate net radiated power",
              latex: "P = (5.67 \\times 10^{-8})(5.0 \\times 10^{-4})(1)(5.44 \\times 10^{10}) = 1.542 \\text{ W}"
            }
          ],
          finalValue: "1.54",
          units: "W"
        },
        pitfallWarning: "Do NOT calculate (T_o - T_r)^4! It must be (T_o^4 - T_r^4)."
      },
      {
        id: "s1-p4",
        problemNumber: 4,
        title: "Work Function & Cutoff Wavelength of Sodium",
        statement: "A sodium surface is illuminated with light of wavelength 410 nm and 550 nm. The work function for sodium is ϕ = 2.28 eV. Determine which wavelength ejects photoelectrons, and calculate maximum kinetic energy for 410 nm.",
        givenParameters: [
          "\\phi = 2.28 \\text{ eV}",
          "\\lambda_1 = 410 \\text{ nm}",
          "\\lambda_2 = 550 \\text{ nm}"
        ],
        requiredAnswers: ["Energy of photons", "K_{\\max} for 410 nm"],
        officialSolution: {
          governingFormula: "E = \\frac{1240}{\\lambda(\\text{nm})} \\text{ eV}, \\quad K_{\\max} = E - \\phi",
          calculationSteps: [
            {
              step: "Calculate photon energy for 410 nm",
              latex: "E_1 = \\frac{1240}{410} = 3.024 \\text{ eV} > 2.28 \\text{ eV} \\implies \\text{Ejection occurs}"
            },
            {
              step: "Calculate K_max for 410 nm",
              latex: "K_{\\max} = 3.024 - 2.28 = 0.744 \\text{ eV} \\quad (\\text{or } 1.19 \\times 10^{-19} \\text{ J})"
            },
            {
              step: "Evaluate photon energy for 550 nm",
              latex: "E_2 = \\frac{1240}{550} = 2.255 \\text{ eV} < 2.28 \\text{ eV} \\implies \\text{No ejection!}"
            }
          ],
          finalValue: "0.744",
          units: "eV"
        },
        pitfallWarning: "If E_photon < ϕ, K_max is zero, NOT negative!"
      },
      {
        id: "s1-p5",
        problemNumber: 5,
        title: "Stopping Potential Shift with Dual Wavelengths",
        statement: "The stopping potential for photoelectrons from a metal illuminated by λ_1 = 491 nm is V_s1 = 0.71 V. When incident wavelength is changed, V_s2 = 1.43 V. Find the new wavelength λ_2 and work function ϕ.",
        givenParameters: [
          "\\lambda_1 = 491 \\text{ nm}",
          "V_{s1} = 0.71 \\text{ V}",
          "V_{s2} = 1.43 \\text{ V}"
        ],
        requiredAnswers: ["New wavelength \\lambda_2", "Work function \\phi"],
        officialSolution: {
          governingFormula: "\\frac{hc}{\\lambda} = \\phi + e V_s \\implies \\frac{1}{\\lambda_2} = \\frac{1}{\\lambda_1} - \\frac{e(V_{s1} - V_{s2})}{hc}",
          calculationSteps: [
            {
              step: "Find work function from initial measurement",
              latex: "\\phi = \\frac{1240}{491} - 0.71 = 2.525 - 0.71 = 1.815 \\text{ eV}"
            },
            {
              step: "Determine new photon energy for V_s2 = 1.43 V",
              latex: "E_2 = \\phi + e V_{s2} = 1.815 + 1.43 = 3.245 \\text{ eV}"
            },
            {
              step: "Compute new wavelength λ_2",
              latex: "\\lambda_2 = \\frac{1240}{3.245} = 382.1 \\text{ nm}"
            }
          ],
          finalValue: "382.1",
          units: "nm"
        },
        pitfallWarning: "Notice that higher stopping voltage (1.43 V > 0.71 V) requires a shorter wavelength (382 nm < 491 nm)."
      },
      {
        id: "s1-p6",
        problemNumber: 6,
        title: "Head-On Compton Scattering (θ = 180°)",
        statement: "An X-ray photon of wavelength λ = 0.01 nm strikes an electron head-on (θ = 180°). Determine (a) the change in wavelength Δλ, (b) the wavelength of the scattered photon λ', and (c) kinetic energy imparted to the recoil electron.",
        givenParameters: [
          "\\lambda = 0.01 \\text{ nm} = 10 \\text{ pm}",
          "\\theta = 180^\\circ \\implies 1 - \\cos 180^\\circ = 1 - (-1) = 2",
          "\\lambda_c = \\frac{h}{m_0 c} = 2.43 \\text{ pm}"
        ],
        requiredAnswers: ["\\Delta\\lambda", "\\lambda'", "K_e \\text{ (in eV / MeV)}"],
        officialSolution: {
          governingFormula: "\\Delta\\lambda = \\frac{h}{m_0 c}(1 - \\cos\\theta) = 2\\lambda_c",
          calculationSteps: [
            {
              step: "Compute maximum Compton shift",
              latex: "\\Delta\\lambda = 2(2.426 \\text{ pm}) = 4.85 \\text{ pm} = 0.00485 \\text{ nm}"
            },
            {
              step: "Compute scattered wavelength λ'",
              latex: "\\lambda' = \\lambda + \\Delta\\lambda = 0.01 + 0.00485 = 0.01485 \\text{ nm} = 14.85 \\text{ pm}"
            },
            {
              step: "Calculate kinetic energy imparted to electron",
              latex: "K_e = E - E' = hc\\left(\\frac{1}{\\lambda} - \\frac{1}{\\lambda'}\\right) = 1240 \\left(\\frac{1}{0.01} - \\frac{1}{0.01485}\\right) = 1240(100 - 67.34) = 40.5 \\text{ keV}"
            }
          ],
          finalValue: "4.85",
          units: "pm (Δλ)"
        },
        pitfallWarning: "Beware of Dr. Sally's typo in slide 30 where 4.848 × 10^-12 m was miscopied as 4848 nm. The true value is 4.848 pm (0.004848 nm)!"
      }
    ]
  },
  {
    id: "sheet-2",
    number: 2,
    title: "Sheet 2: Wave Mechanics & Bound States",
    subtitle: "de Broglie Waves, Heisenberg Uncertainty & Schrödinger Potential Wells",
    instructor: "Dr. Sally Abdelaziz El-Adly & Dr. Abeer Hassan Serag El-Deen",
    theoryParts: [
      {
        id: "s2-t1",
        title: "de Broglie Hypothesis & Davisson-Germer Experiment",
        statement: "Matter possesses dual wave-particle properties. Any particle with momentum p has an associated de Broglie wavelength λ = h/p. Validated experimentally by Davisson & Germer through electron diffraction in nickel crystal lattice.",
        keyFormulas: [
          "\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2m K.E.}} = \\frac{h}{\\sqrt{2mqV}}",
          "\\text{For an electron: } \\lambda = \\frac{1.228}{\\sqrt{V \\text{ (volts)}}} \\text{ nm} = \\sqrt{\\frac{150}{V}} \\text{ \\AA}"
        ],
        takeaway: "Macroscopic objects (like a baseball) have wavelengths ~10^-34 m, far smaller than any atomic nucleus, hence wave diffraction is completely unobservable."
      },
      {
        id: "s2-t2",
        title: "Heisenberg Uncertainty Principle",
        statement: "It is fundamentally impossible to measure both the coordinate position and conjugate linear momentum of a particle simultaneously with arbitrary precision.",
        keyFormulas: [
          "\\Delta x \\Delta p_x \\ge \\frac{\\hbar}{2} \\quad \\left(\\text{with } \\Delta p_x = m \\Delta v_x \\implies \\Delta x \\Delta v_x \\ge \\frac{\\hbar}{2m}\\right)",
          "\\Delta E \\Delta t \\ge \\frac{\\hbar}{2} \\quad (\\hbar = \\frac{h}{2\\pi} = 1.054 \\times 10^{-34} \\text{ J}\\cdot\\text{s})"
        ],
        takeaway: "Energy-time uncertainty explains the natural spectral line broadening ΔE in atomic transitions due to finite state lifetimes Δt."
      },
      {
        id: "s2-t3",
        title: "Time-Independent Schrödinger Equation (TISE) in 1D",
        statement: "The fundamental wave equation of non-relativistic quantum mechanics governing stationary state wavefunctions Ψ(x).",
        proofOrDerivation: "Total energy E = \\frac{p^2}{2m} + U(x). Using trial wave \\psi(x) = e^{ikx} with k = p/\\hbar: \\frac{d^2\\psi}{dx^2} = -k^2\\psi = -\\frac{p^2}{\\hbar^2}\\psi \\implies p^2\\psi = -\\hbar^2\\frac{d^2\\psi}{dx^2}. Substituting into energy equation: E\\psi = -\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2} + U(x)\\psi.",
        keyFormulas: [
          "-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi(x)}{dx^2} + U(x)\\psi(x) = E\\psi(x)",
          "\\int_{-\\infty}^{\\infty} |\\psi(x)|^2 dx = 1 \\quad (\\text{Normalization condition})"
        ],
        takeaway: "Probability density P(x) = |Ψ(x)|² must be real, continuous, and integrate to unity over all space."
      },
      {
        id: "s2-t4",
        title: "Infinite Square Well (Particle in a Rigid Box 0 ≤ x ≤ L)",
        statement: "A particle confined between infinitely rigid walls where U(x) = 0 for 0 ≤ x ≤ L and U = ∞ otherwise. Boundary conditions require Ψ(0) = 0 and Ψ(L) = 0.",
        proofOrDerivation: "Inside well: \\frac{d^2\\psi}{dx^2} + k^2\\psi = 0 where k = \\sqrt{2mE}/\\hbar. General solution: \\psi(x) = A\\sin(kx) + B\\cos(kx). At x = 0: \\psi(0) = B = 0. At x = L: \\psi(L) = A\\sin(kL) = 0 \\implies k_n L = n\\pi \\implies k_n = \\frac{n\\pi}{L}. Normalizing: \\int_0^L A^2\\sin^2\\left(\\frac{n\\pi x}{L}\\right)dx = 1 \\implies A = \\sqrt{\\frac{2}{L}}.",
        keyFormulas: [
          "\\psi_n(x) = \\sqrt{\\frac{2}{L}} \\sin\\left(\\frac{n\\pi x}{L}\\right)",
          "E_n = \\frac{n^2 \\pi^2 \\hbar^2}{2mL^2} = \\frac{n^2 h^2}{8mL^2} = n^2 E_1 \\quad (n = 1, 2, 3, \\dots)",
          "E_1 = \\frac{h^2}{8mL^2} \\quad (\\text{Zero-Point Energy, } E=0 \\text{ is forbidden!})",
          "\\lambda_n = \\frac{2L}{n} \\quad (\\text{Exactly } n \\text{ half-wavelengths fit in box})"
        ],
        takeaway: "Even quantum states (n = 2, 4, ...) have a node in the center of the box (Ψ(L/2) = 0), meaning zero probability of finding the particle at the midpoint!"
      },
      {
        id: "s2-t5",
        title: "Quantum Tunneling Through a Square Barrier",
        statement: "When a particle with energy E < U_0 strikes a barrier of height U_0 and width a, there is a non-zero transmission probability T due to exponential wave penetration.",
        keyFormulas: [
          "T \\approx e^{-2\\gamma a} \\quad \\text{where } \\gamma = \\frac{\\sqrt{2m(U_0 - E)}}{\\hbar}",
          "\\delta = \\frac{1}{2\\gamma} \\quad (\\text{Penetration depth})",
          "R + T = 1 \\quad (R = \\text{Reflection coefficient})"
        ],
        takeaway: "Applications in modern solid state devices include Tunnel Diodes, Josephson Junctions, Scanning Tunneling Microscopy (STM), and Alpha radioactive decay."
      }
    ],
    solvedProblems: [
      {
        id: "s2-p1",
        problemNumber: 1,
        title: "de Broglie Wavelength of 400 V Accelerated Electron",
        statement: "Calculate the de Broglie wavelength of an electron which has been accelerated from rest on application of a potential of 400 Volts.",
        givenParameters: [
          "V = 400 \\text{ V}",
          "m_e = 9.1 \\times 10^{-31} \\text{ kg}",
          "q = e = 1.6 \\times 10^{-19} \\text{ C}",
          "h = 6.63 \\times 10^{-34} \\text{ J}\\cdot\\text{s}"
        ],
        requiredAnswers: ["Wavelength \\lambda"],
        officialSolution: {
          governingFormula: "\\lambda = \\frac{h}{\\sqrt{2mqV}} = \\frac{1.228}{\\sqrt{V}} \\text{ nm}",
          calculationSteps: [
            {
              step: "Substitute values into the general formula",
              latex: "\\lambda = \\frac{6.63 \\times 10^{-34}}{\\sqrt{2(9.1 \\times 10^{-31})(1.6 \\times 10^{-19})(400)}}"
            },
            {
              step: "Evaluate denominator: sqrt(1.1648 × 10^-46) = 1.079 × 10^-23",
              latex: "\\lambda = \\frac{6.63 \\times 10^{-34}}{1.079 \\times 10^{-23}} = 0.614 \\times 10^{-10} \\text{ m} = 0.614 \\text{ \\AA}"
            }
          ],
          finalValue: "0.614",
          units: "Å"
        },
        pitfallWarning: "Remember: 1 Å = 10^-10 m = 0.1 nm."
      },
      {
        id: "s2-p2",
        problemNumber: 2,
        title: "Heisenberg Speed Uncertainty of Confined Electron vs. Cricket Ball",
        statement: "The position of an electron (m = 9.1 × 10^-31 kg) and a cricket ball (m = 0.15 kg) are both located to within Δx = 1 Å = 1.0 × 10^-10 m. Calculate the minimum uncertainty in velocity for both.",
        givenParameters: [
          "\\Delta x = 1.0 \\times 10^{-10} \\text{ m}",
          "m_e = 9.11 \\times 10^{-31} \\text{ kg}",
          "m_{\\text{ball}} = 0.15 \\text{ kg}"
        ],
        requiredAnswers: ["\\Delta v_e", "\\Delta v_{\\text{ball}}"],
        officialSolution: {
          governingFormula: "\\Delta x \\Delta p_x \\ge \\frac{\\hbar}{2} = \\frac{h}{4\\pi} \\implies \\Delta v \\ge \\frac{h}{4\\pi m \\Delta x}",
          calculationSteps: [
            {
              step: "Calculate momentum uncertainty Δp_x",
              latex: "\\Delta p_x = \\frac{6.63 \\times 10^{-34}}{4\\pi (1.0 \\times 10^{-10})} = 0.528 \\times 10^{-24} \\text{ kg}\\cdot\\text{m/s}"
            },
            {
              step: "Calculate speed uncertainty for electron",
              latex: "\\Delta v_e = \\frac{0.528 \\times 10^{-24}}{9.11 \\times 10^{-31}} = 5.79 \\times 10^5 \\text{ m/s} \\approx 10^6 \\text{ m/s}"
            },
            {
              step: "Calculate speed uncertainty for 0.15 kg cricket ball",
              latex: "\\Delta v_{\\text{ball}} = \\frac{0.528 \\times 10^{-24}}{0.15} = 3.51 \\times 10^{-24} \\text{ m/s}"
            }
          ],
          finalValue: "5.79e5",
          units: "m/s (electron)"
        },
        pitfallWarning: "Notice that for macroscopic masses (0.15 kg), Δv is 10^-24 m/s (negligible), while for electrons it is enormous!"
      },
      {
        id: "s2-p3",
        problemNumber: 3,
        title: "Energy & De-excitation in 1D Infinite Well (100 pm Box)",
        statement: "An electron is confined to a one-dimensional infinitely deep potential well of width L = 100 pm. (a) What is the ground state energy E_1? (b) How much energy must be transferred to make a jump from ground state to second excited state (n=3)? (c) What wavelength of light is emitted during de-excitation back to ground?",
        givenParameters: [
          "L = 100 \\text{ pm} = 1.0 \\times 10^{-10} \\text{ m}",
          "m_e = 9.11 \\times 10^{-31} \\text{ kg}",
          "h = 6.63 \\times 10^{-34} \\text{ J}\\cdot\\text{s}"
        ],
        requiredAnswers: ["E_1 \\text{ (eV)}", "\\Delta E_{31} \\text{ (eV)}", "\\lambda \\text{ (nm)}"],
        officialSolution: {
          governingFormula: "E_n = n^2 \\frac{h^2}{8m_e L^2}, \\quad \\Delta E_{31} = (3^2 - 1^2)E_1 = 8E_1",
          calculationSteps: [
            {
              step: "Compute ground state energy E_1",
              latex: "E_1 = \\frac{(6.63 \\times 10^{-34})^2}{8(9.11 \\times 10^{-31})(1.0 \\times 10^{-10})^2} = 6.031 \\times 10^{-18} \\text{ J} = 37.69 \\text{ eV}"
            },
            {
              step: "Compute energy for jump to second excited state (n = 3)",
              latex: "\\Delta E_{31} = E_3 - E_1 = (9 - 1)E_1 = 8 \\times 37.69 \\text{ eV} = 301.5 \\text{ eV} \\quad (4.83 \\times 10^{-17} \\text{ J})"
            },
            {
              step: "Calculate emitted wavelength upon de-excitation",
              latex: "\\lambda = \\frac{hc}{\\Delta E} = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{301.5 \\text{ eV}} = 4.11 \\text{ nm}"
            }
          ],
          finalValue: "37.69",
          units: "eV (E₁)"
        },
        pitfallWarning: "Crucial Modern Academy Exam Trap: Second excited state corresponds to n = 3, NOT n = 2! Ground state is n=1, 1st excited is n=2, 2nd excited is n=3."
      },
      {
        id: "s2-p4",
        problemNumber: 4,
        title: "Quantum Tunneling Probability Through 5 eV Barrier",
        statement: "Electrons with energy E = 1 eV are incident on a barrier of height U_0 = 5 eV and width a = 0.5 nm. Calculate (a) transmission coefficient T, and (b) penetration depth d.",
        givenParameters: [
          "E = 1 \\text{ eV}",
          "U_0 = 5 \\text{ eV} \\implies U_0 - E = 4 \\text{ eV} = 6.4 \\times 10^{-19} \\text{ J}",
          "a = 0.5 \\text{ nm} = 5.0 \\times 10^{-10} \\text{ m}",
          "m_e = 9.11 \\times 10^{-31} \\text{ kg}",
          "\\hbar = 1.054 \\times 10^{-34} \\text{ J}\\cdot\\text{s}"
        ],
        requiredAnswers: ["T", "d = \\frac{1}{2\\gamma}"],
        officialSolution: {
          governingFormula: "T = e^{-2\\gamma a}, \\quad \\gamma = \\frac{\\sqrt{2m(U_0 - E)}}{\\hbar}",
          calculationSteps: [
            {
              step: "Compute attenuation wave number γ",
              latex: "\\gamma = \\frac{\\sqrt{2(9.11 \\times 10^{-31})(6.4 \\times 10^{-19})}}{1.054 \\times 10^{-34}} = 1.024 \\times 10^{10} \\text{ m}^{-1}"
            },
            {
              step: "Calculate exponent 2γa",
              latex: "2\\gamma a = 2(1.024 \\times 10^{10})(0.5 \\times 10^{-9}) = 10.24"
            },
            {
              step: "Evaluate tunneling probability T",
              latex: "T = e^{-10.24} = 3.57 \\times 10^{-5} \\approx 4.5 \\times 10^{-5}"
            },
            {
              step: "Calculate penetration depth d",
              latex: "d = \\frac{1}{2\\gamma} = \\frac{1}{2(1.024 \\times 10^{10})} = 0.49 \\times 10^{-10} \\text{ m} = 0.049 \\text{ nm}"
            }
          ],
          finalValue: "4.5e-5",
          units: "Transmission probability (1 in 22,000)"
        },
        pitfallWarning: "Always use ħ (1.054 × 10^-34), NOT h, in the exponent expression for γ."
      },
      {
        id: "s2-p5",
        problemNumber: 5,
        title: "Center-Well Probability in n=2 vs n=3 States",
        statement: "For an electron in an infinite potential well of width L: (a) determine the probability of finding the electron between x = L/2 and x = L for n = 2 state; (b) determine the probability between x = L/3 and x = 2L/3 for n = 3 state.",
        givenParameters: ["\\psi_n(x) = \\sqrt{\\frac{2}{L}}\\sin\\left(\\frac{n\\pi x}{L}\\right)"],
        requiredAnswers: ["P(L/2 \\le x \\le L) \\text{ for } n=2", "P(L/3 \\le x \\le 2L/3) \\text{ for } n=3"],
        officialSolution: {
          governingFormula: "P(a \\le x \\le b) = \\int_a^b |\\psi_n(x)|^2 dx = \\frac{2}{L}\\int_a^b \\sin^2\\left(\\frac{n\\pi x}{L}\\right)dx",
          calculationSteps: [
            {
              step: "Evaluate n = 2 across the right half of the box [L/2, L]",
              latex: "P = \\frac{2}{L}\\int_{L/2}^L \\sin^2\\left(\\frac{2\\pi x}{L}\\right)dx = \\frac{1}{2} = 50\\%"
            },
            {
              step: "Evaluate n = 3 across the central segment [L/3, 2L/3]",
              latex: "P = \\frac{2}{L}\\int_{L/3}^{2L/3} \\sin^2\\left(\\frac{3\\pi x}{L}\\right)dx = \\frac{1}{3} = 33.3\\%"
            }
          ],
          finalValue: "0.50",
          units: "Probability (50%)"
        },
        pitfallWarning: "By symmetry, every individual loop (antinode) of the probability distribution contains exactly 1/n of the total probability 1!"
      }
    ]
  },
  {
    id: "sheet-3",
    number: 3,
    title: "Sheet 3: Atomic Physics & Modern Theory",
    subtitle: "Bohr Model, Hydrogen Spectral Series, Quantum Numbers & X-Ray Spectra",
    instructor: "Dr. Sally Abdelaziz El-Adly & Dr. Abeer Hassan Serag El-Deen",
    theoryParts: [
      {
        id: "s3-t1",
        title: "Bohr Model Postulates for Hydrogen Atom",
        statement: "1. Electrons orbit the nucleus in non-radiating circular orbits under Coulomb force ke²/r² = m v²/r.\n2. Orbital angular momentum is quantized: L = m v r = n ħ.\n3. Radiation is emitted/absorbed during discrete transitions: E_i - E_f = hf.",
        keyFormulas: [
          "r_n = n^2 a_0 = n^2 (0.0529 \\text{ nm})",
          "E_n = -\\frac{13.6 \\text{ eV}}{n^2}",
          "\\text{Ionization Energy from ground state } (n=1) = -E_1 = +13.6 \\text{ eV}"
        ],
        takeaway: "The radius scales quadratically with n (r ∝ n²), while the energy is negative and scales inversely as 1/n²."
      },
      {
        id: "s3-t2",
        title: "Rydberg Formula & The Hydrogen Spectral Series",
        statement: "Transitions between higher level n_i and lower level n_f emit a photon with wavenumber given by Rydberg formula.",
        keyFormulas: [
          "\\frac{1}{\\lambda} = R_H \\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right) \\quad (R_H = 1.097 \\times 10^7 \\text{ m}^{-1})",
          "\\text{Lyman Series (UV): } n_f = 1, \\, n_i = 2, 3, 4, \\dots",
          "\\text{Balmer Series (Visible): } n_f = 2, \\, n_i = 3, 4, 5, \\dots \\quad (H_\\alpha = 656.3 \\text{ nm}, H_\\beta = 486.1 \\text{ nm})",
          "\\text{Paschen Series (IR): } n_f = 3, \\, n_i = 4, 5, 6, \\dots",
          "\\text{Brackett (IR): } n_f = 4; \\quad \\text{Pfund (IR): } n_f = 5; \\quad \\text{Humphreys (IR): } n_f = 6"
        ],
        takeaway: "Balmer series was historically discovered first because all its lines lie in the visible light range (400 nm to 700 nm)!"
      },
      {
        id: "s3-t3",
        title: "The Four Quantum Numbers & Space Quantization",
        statement: "Atomic states are fully described by (n, ℓ, m_ℓ, m_s):\n• Principal n (1, 2, 3...): determines shell and total energy.\n• Orbital ℓ (0 to n-1): determines orbital angular momentum L = \\sqrt{\\ell(\\ell+1)}\\hbar and shape (s, p, d, f).\n• Magnetic m_ℓ (-ℓ to +ℓ): 2ℓ+1 orientations in space, L_z = m_ℓ ħ, cos θ = m_ℓ / \\sqrt{\\ell(\\ell+1)}.\n• Spin m_s (±1/2): intrinsic angular momentum S_z = ±ħ/2.",
        keyFormulas: [
          "L = \\sqrt{\\ell(\\ell+1)}\\hbar",
          "\\cos\\theta = \\frac{m_\\ell}{\\sqrt{\\ell(\\ell+1)}}",
          "\\text{Total states per shell } n = 2n^2"
        ],
        takeaway: "For ℓ = 0 (s state), L = 0. The electron cloud is spherically symmetric with no fundamental axis of revolution."
      },
      {
        id: "s3-t4",
        title: "Pauli Exclusion Principle, Hund's Rule & X-Ray Spectra",
        statement: "• Pauli Exclusion: No two electrons in an atom can have the same 4 quantum numbers (n, ℓ, m_ℓ, m_s).\n• Hund's Rule: Electrons remain unpaired with parallel spins whenever possible.\n• Characteristic X-Rays: Energetic electron knocks out K-shell electron; vacancy filled from L shell gives K_α (energy ~ (Z-1)² × 13.6 eV).\n• Continuous Bremsstrahlung: Deceleration of high-speed electrons near target nucleus produces continuous spectrum with cut-off limit λ_min = hc / (eV_0).",
        keyFormulas: [
          "\\lambda_{\\min} = \\frac{hc}{eV_0} = \\frac{1240}{V_0 \\text{ (volts)}} \\text{ nm}",
          "\\Delta E_{K_\\alpha} = E_K - E_L \\approx (Z - 1)^2 (13.6 \\text{ eV})\\left(\\frac{1}{1^2} - \\frac{1}{2^2}\\right)"
        ],
        takeaway: "Bremsstrahlung cut-off λ_min depends solely on tube voltage V_0 and is independent of target material!"
      }
    ],
    solvedProblems: [
      {
        id: "s3-p1",
        problemNumber: 1,
        title: "Balmer First Line (H_α) and Second Line (H_β) Wavelengths",
        statement: "Calculate the wavelength for the first (n_i = 3) and second (n_i = 4) lines of the Balmer series in Hydrogen.",
        givenParameters: ["n_f = 2", "R_H = 1.097 \\times 10^7 \\text{ m}^{-1}"],
        requiredAnswers: ["\\lambda_1 (H_\\alpha)", "\\lambda_2 (H_\\beta)"],
        officialSolution: {
          governingFormula: "\\frac{1}{\\lambda} = R_H \\left(\\frac{1}{2^2} - \\frac{1}{n^2}\\right)",
          calculationSteps: [
            {
              step: "For first line (n = 3, H_α red)",
              latex: "\\frac{1}{\\lambda} = 1.097 \\times 10^7 \\left(\\frac{1}{4} - \\frac{1}{9}\\right) = 1.097 \\times 10^7 \\left(\\frac{5}{36}\\right) = 1.5236 \\times 10^6 \\text{ m}^{-1}"
            },
            {
              step: "Invert to obtain wavelength",
              latex: "\\lambda_1 = \\frac{1}{1.5236 \\times 10^6} = 6.563 \\times 10^{-7} \\text{ m} = 656.3 \\text{ nm}"
            },
            {
              step: "For second line (n = 4, H_β blue-green)",
              latex: "\\frac{1}{\\lambda} = 1.097 \\times 10^7 \\left(\\frac{1}{4} - \\frac{1}{16}\\right) = 1.097 \\times 10^7 \\left(\\frac{3}{16}\\right) = 2.0568 \\times 10^6 \\text{ m}^{-1} \\implies \\lambda_2 = 486.1 \\text{ nm}"
            }
          ],
          finalValue: "656.3",
          units: "nm (H_α)"
        },
        pitfallWarning: "The Balmer series transitions always end on n_f = 2. First line is n=3, second is n=4."
      },
      {
        id: "s3-p2",
        problemNumber: 2,
        title: "All 6 Sets of Quantum Numbers in 2p Subshell",
        statement: "List the complete unique sets of quantum numbers (n, ℓ, m_ℓ, m_s) for all electrons in the 2p subshell.",
        givenParameters: ["n = 2", "\\ell = 1 \\quad (\\text{p-subshell})"],
        requiredAnswers: ["6 unique sets of quantum numbers"],
        officialSolution: {
          governingFormula: "m_\\ell \\in \\{-1, 0, +1\\}, \\quad m_s \\in \\{-1/2, +1/2\\}",
          calculationSteps: [
            {
              step: "Pair m_ℓ with each spin state m_s",
              latex: "(2, 1, -1, +1/2), \\quad (2, 1, -1, -1/2)"
            },
            {
              step: "Middle orbital m_ℓ = 0",
              latex: "(2, 1, 0, +1/2), \\quad (2, 1, 0, -1/2)"
            },
            {
              step: "Upper orbital m_ℓ = +1",
              latex: "(2, 1, +1, +1/2), \\quad (2, 1, +1, -1/2)"
            }
          ],
          finalValue: "6",
          units: "States (2(2ℓ+1) = 6 electrons)"
        },
        pitfallWarning: "2d subshell does NOT exist because ℓ must be ≤ n - 1 (for n=2, max ℓ is 1)."
      },
      {
        id: "s3-p3",
        problemNumber: 3,
        title: "Space Quantization Angles for ℓ = 3 (4f State)",
        statement: "Determine the total orbital angular momentum magnitude L and all possible space quantization angles θ with the z-axis for an electron in the 4f state (n = 4, ℓ = 3).",
        givenParameters: ["n = 4", "\\ell = 3"],
        requiredAnswers: ["L", "m_\\ell \\text{ values}", "\\theta \\text{ angles}"],
        officialSolution: {
          governingFormula: "L = \\sqrt{\\ell(\\ell+1)}\\hbar = \\sqrt{12}\\hbar = 3.464\\hbar, \\quad \\cos\\theta = \\frac{m_\\ell}{\\sqrt{12}}",
          calculationSteps: [
            {
              step: "Identify m_ℓ range",
              latex: "m_\\ell = 0, \\pm 1, \\pm 2, \\pm 3 \\quad (2\\ell+1 = 7 \\text{ orientations})"
            },
            {
              step: "Compute angle for m_ℓ = 0",
              latex: "\\cos\\theta = 0 \\implies \\theta = 90.0^\\circ"
            },
            {
              step: "Compute angle for m_ℓ = ±1",
              latex: "\\cos\\theta = \\pm 1/\\sqrt{12} = \\pm 0.2887 \\implies \\theta = 73.2^\\circ, 106.8^\\circ"
            },
            {
              step: "Compute angle for m_ℓ = ±2",
              latex: "\\cos\\theta = \\pm 2/\\sqrt{12} = \\pm 0.5774 \\implies \\theta = 54.7^\\circ, 125.3^\\circ"
            },
            {
              step: "Compute angle for m_ℓ = ±3",
              latex: "\\cos\\theta = \\pm 3/\\sqrt{12} = \\pm 0.8660 \\implies \\theta = 30.0^\\circ, 150.0^\\circ"
            }
          ],
          finalValue: "3.464",
          units: "ħ (Magnitude of L)"
        },
        pitfallWarning: "The vector L can NEVER align completely with the z-axis (cos θ ≠ 1) because m_ℓ,max = ℓ < √(ℓ(ℓ+1))."
      },
      {
        id: "s3-p4",
        problemNumber: 4,
        title: "Ground-State Electronic Configurations",
        statement: "Write the electronic configuration of Fluorine (F_9), Titanium (Ti_22), and Germanium (Ge_32) according to Pauli exclusion principle and Hund's rule.",
        givenParameters: ["Z = 9, 22, 32"],
        requiredAnswers: ["Configurations"],
        officialSolution: {
          governingFormula: "\\text{Aufbau filling order: } 1s \\to 2s \\to 2p \\to 3s \\to 3p \\to 4s \\to 3d \\to 4p",
          calculationSteps: [
            {
              step: "Fluorine (Z = 9)",
              latex: "\\text{F}_9: 1s^2 \\, 2s^2 \\, 2p^5"
            },
            {
              step: "Titanium (Z = 22)",
              latex: "\\text{Ti}_{22}: 1s^2 \\, 2s^2 \\, 2p^6 \\, 3s^2 \\, 3p^6 \\, 4s^2 \\, 3d^2 \\quad (\\text{or } [\\text{Ar}] 4s^2 3d^2)"
            },
            {
              step: "Germanium (Z = 32)",
              latex: "\\text{Ge}_{32}: 1s^2 \\, 2s^2 \\, 2p^6 \\, 3s^2 \\, 3p^6 \\, 4s^2 \\, 3d^{10} \\, 4p^2 \\quad (\\text{or } [\\text{Ar}] 4s^2 3d^{10} 4p^2)"
            }
          ],
          finalValue: "1s² 2s² 2p⁵",
          units: "Configuration for F"
        },
        pitfallWarning: "Remember: 4s subshell is filled before 3d because 4s has slightly lower energy in multi-electron atoms."
      },
      {
        id: "s3-p5",
        problemNumber: 5,
        title: "Characteristic K_α X-Ray Energy in Tungsten",
        statement: "A K-shell electron (binding energy 69.5 keV) is removed from a Tungsten atom and replaced by an L-shell electron (binding energy 12.1 keV). What is the energy and wavelength of the emitted characteristic K_α X-ray?",
        givenParameters: [
          "E_K = 69.5 \\text{ keV}",
          "E_L = 12.1 \\text{ keV}"
        ],
        requiredAnswers: ["Energy E", "Wavelength \\lambda"],
        officialSolution: {
          governingFormula: "E = E_K - E_L = hc/\\lambda",
          calculationSteps: [
            {
              step: "Calculate emitted photon energy",
              latex: "E = 69.5 \\text{ keV} - 12.1 \\text{ keV} = 57.4 \\text{ keV} = 57,400 \\text{ eV}"
            },
            {
              step: "Calculate wavelength",
              latex: "\\lambda = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{57,400 \\text{ eV}} = 0.0216 \\text{ nm} = 21.6 \\text{ pm}"
            }
          ],
          finalValue: "57.4",
          units: "keV"
        },
        pitfallWarning: "Characteristic X-rays occur in the range 0.01 nm to 0.1 nm (10 to 100 pm)."
      }
    ]
  },
  {
    id: "sheet-4",
    number: 4,
    title: "Sheet 4: Special Theory of Relativity",
    subtitle: "Lorentz Transformations, Time Dilation, Length Contraction & Relativistic Dynamics",
    instructor: "Dr. Sally Abdelaziz El-Adly & Dr. Abeer Hassan Serag El-Deen",
    theoryParts: [
      {
        id: "s4-t1",
        title: "Einstein's Postulates & Failure of Galilean Relativity",
        statement: "1. The Principle of Relativity: The laws of physics are identical in all inertial reference frames.\n2. Invariance of the Speed of Light: The speed of light in vacuum c is a universal constant (3 × 10^8 m/s), independent of the motion of the source or observer.\n• The Michelson-Morley null experiment definitively disproved the luminiferous aether.",
        keyFormulas: [
          "\\text{Galilean (fails at } v \\to c\\text{)}: x' = x - vt, \\quad t' = t, \\quad u' = u - v",
          "\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}} \\ge 1 \\quad (\\text{Lorentz factor})"
        ],
        takeaway: "Simultaneity is not absolute: events simultaneous in one inertial frame are NOT simultaneous in another moving frame!"
      },
      {
        id: "s4-t2",
        title: "Time Dilation & The Proper Time Interval",
        statement: "Clocks in motion run slow relative to a stationary observer. The proper time interval Δt_p is the time interval measured by an observer in whose frame both events occur at the exact same spatial location.",
        keyFormulas: [
          "\\Delta t = \\gamma \\Delta t_p = \\frac{\\Delta t_p}{\\sqrt{1 - v^2/c^2}} \\ge \\Delta t_p",
          "\\text{Twin Paradox: Samer travels at } 0.8c \\implies \\gamma = 1.667 \\implies 1/\\gamma = 0.6. \\text{ Trip is 30 yr for Samer, 50 yr for Rana!}"
        ],
        takeaway: "Proper time is ALWAYS the shortest measured time interval between two events."
      },
      {
        id: "s4-t3",
        title: "Relativity of Length (Lorentz Contraction)",
        statement: "The length of an object measured in a frame moving relative to it is contracted along the direction of motion. Dimensions perpendicular to motion (y, z) are completely unaffected.",
        keyFormulas: [
          "L = \\frac{L_p}{\\gamma} = L_p \\sqrt{1 - \\frac{v^2}{c^2}} \\le L_p",
          "L_p = \\text{Proper length (measured in object's rest frame)}"
        ],
        takeaway: "Contraction occurs ONLY along the axis parallel to relative velocity v."
      },
      {
        id: "s4-t4",
        title: "Relativistic Velocity Addition",
        statement: "In special relativity, velocities do not add linearly. No physical object can ever exceed or equal the speed of light c.",
        keyFormulas: [
          "u_x = \\frac{u'_x + v}{1 + \\frac{u'_x v}{c^2}} \\quad \\text{and} \\quad u'_x = \\frac{u_x - v}{1 - \\frac{u_x v}{c^2}}"
        ],
        takeaway: "Even if two spaceships approach each other at 0.85c and 0.75c, their relative speed is 0.98c, strictly less than c!"
      },
      {
        id: "s4-t5",
        title: "Relativistic Mass, Momentum & Energy Equivalence",
        statement: "As v → c, mass increases by factor γ. Total relativistic energy E equals the sum of rest energy E_0 and kinetic energy E_k.",
        keyFormulas: [
          "m = \\gamma m_0 = \\frac{m_0}{\\sqrt{1 - v^2/c^2}}",
          "p = \\gamma m_0 v",
          "E = mc^2 = \\gamma m_0 c^2",
          "E_k = E - E_0 = (\\gamma - 1)m_0 c^2",
          "E^2 = (pc)^2 + (m_0 c^2)^2 \\quad (\\text{Relativistic Invariant Relation})"
        ],
        takeaway: "For a massless photon (m_0 = 0), E = pc. For an electron at rest, E_0 = 0.511 MeV."
      }
    ],
    solvedProblems: [
      {
        id: "s4-p1",
        problemNumber: 1,
        title: "Atmospheric Muon (Kaon) Lifetime & Travel Distance",
        statement: "An elementary particle known as a kaon has an average lifetime of 0.1237 μs when stationary (in its rest frame). If it travels at v = 0.99 c relative to the laboratory, how far does it travel in the lab frame during its lifetime according to (a) classical physics, and (b) special relativity?",
        givenParameters: [
          "\\Delta t_p = 0.1237 \\, \\mu\\text{s} = 0.1237 \\times 10^{-6} \\text{ s}",
          "v = 0.99 c",
          "c = 3.0 \\times 10^8 \\text{ m/s}"
        ],
        requiredAnswers: ["d_{\\text{classical}}", "d_{\\text{relativ}}"],
        officialSolution: {
          governingFormula: "d_{\\text{relativ}} = v \\Delta t = v (\\gamma \\Delta t_p)",
          calculationSteps: [
            {
              step: "Calculate classical distance without relativity",
              latex: "d_{\\text{classical}} = v \\Delta t_p = (0.99 \\times 3.0 \\times 10^8)(0.1237 \\times 10^{-6}) = 36.7 \\text{ m}"
            },
            {
              step: "Compute Lorentz gamma factor γ",
              latex: "\\gamma = \\frac{1}{\\sqrt{1 - (0.99)^2}} = \\frac{1}{\\sqrt{1 - 0.9801}} = \\frac{1}{\\sqrt{0.0199}} = 7.089"
            },
            {
              step: "Calculate dilated lifetime in lab frame",
              latex: "\\Delta t = \\gamma \\Delta t_p = 7.089 \\times 0.1237 \\, \\mu\\text{s} = 0.8769 \\, \\mu\\text{s} = 8.769 \\times 10^{-7} \\text{ s}"
            },
            {
              step: "Calculate relativistic distance traveled",
              latex: "d_{\\text{relativ}} = (0.99 \\times 3.0 \\times 10^8)(8.769 \\times 10^{-7}) = 260.4 \\text{ m}"
            }
          ],
          finalValue: "260.4",
          units: "m (7x greater than classical!)"
        },
        pitfallWarning: "The particle's own clock ticks proper time Δt_p, but the distance is measured in the lab frame using dilated time Δt."
      },
      {
        id: "s4-p2",
        problemNumber: 2,
        title: "Relativistic Velocity Addition of Approaching Spaceships",
        statement: "Two spaceships A and B approach a space station in opposite directions. An observer on the station measures speed of A to be 0.75 c and speed of B to be 0.85 c. Find their relative speed according to (a) Galilean relativity, and (b) Lorentz transformation.",
        givenParameters: [
          "u_x = -0.85 c \\quad (\\text{Ship B relative to station})",
          "v = 0.75 c \\quad (\\text{Station relative to Ship A})"
        ],
        requiredAnswers: ["u'_x \\text{ (Galilean)}", "u'_x \\text{ (Lorentz)}"],
        officialSolution: {
          governingFormula: "u'_x = \\frac{u_x - v}{1 - \\frac{u_x v}{c^2}}",
          calculationSteps: [
            {
              step: "Galilean addition (impossible classical result)",
              latex: "u'_x = -0.85 c - 0.75 c = -1.60 c \\quad (\\text{Fails! Exceeds } c)"
            },
            {
              step: "Lorentz relativistic velocity transformation",
              latex: "u'_x = \\frac{-0.85 c - 0.75 c}{1 - \\frac{(-0.85 c)(0.75 c)}{c^2}} = \\frac{-1.60 c}{1 + 0.6375} = \\frac{-1.60 c}{1.6375} = -0.977 c"
            }
          ],
          finalValue: "0.977",
          units: "c (Approaching speed < c)"
        },
        pitfallWarning: "Notice that minus times minus in the denominator gives a plus sign (1 + 0.6375 = 1.6375)!"
      },
      {
        id: "s4-p3",
        problemNumber: 3,
        title: "Length Contraction of Fast Spaceship",
        statement: "A spaceship is measured to be 120 m long and 20 m in diameter while at rest. If it flies past an observer at speed v = 0.99 c, what length and diameter does the observer measure?",
        givenParameters: [
          "L_p = 120 \\text{ m}",
          "D_p = 20 \\text{ m}",
          "v = 0.99 c \\implies \\gamma = \\frac{1}{\\sqrt{1 - (0.99)^2}} = 7.089"
        ],
        requiredAnswers: ["Contracted length L", "Measured diameter D"],
        officialSolution: {
          governingFormula: "L = \\frac{L_p}{\\gamma} = L_p \\sqrt{1 - v^2/c^2}",
          calculationSteps: [
            {
              step: "Compute length along direction of motion",
              latex: "L = 120 \\sqrt{1 - (0.99)^2} = 120 \\times 0.141 = 16.93 \\text{ m} \\approx 17 \\text{ m}"
            },
            {
              step: "Evaluate diameter perpendicular to motion",
              latex: "D = D_p = 20 \\text{ m} \\quad (\\text{Perpendicular dimensions are strictly invariant})"
            }
          ],
          finalValue: "16.93",
          units: "m (Length, diameter unchanged at 20 m)"
        },
        pitfallWarning: "Exam Trap: Diameter does NOT contract because it is perpendicular to the velocity vector!"
      },
      {
        id: "s4-p4",
        problemNumber: 4,
        title: "Relativistic Mass and Energy of 0.8c Electron",
        statement: "An electron travels with velocity v = 0.8 c. Given rest mass m_0 = 9.11 × 10^-31 kg (rest energy 0.511 MeV). Determine (a) relativistic mass m, (b) total energy E, and (c) kinetic energy E_k.",
        givenParameters: [
          "v = 0.8 c \\implies \\sqrt{1 - (0.8)^2} = \\sqrt{0.36} = 0.6 \\implies \\gamma = \\frac{1}{0.6} = 1.667",
          "m_0 = 9.11 \\times 10^{-31} \\text{ kg}",
          "E_0 = 0.511 \\text{ MeV}"
        ],
        requiredAnswers: ["m", "E", "E_k"],
        officialSolution: {
          governingFormula: "m = \\gamma m_0, \\quad E = \\gamma E_0, \\quad E_k = (\\gamma - 1)E_0",
          calculationSteps: [
            {
              step: "Calculate relativistic mass",
              latex: "m = \\frac{9.11 \\times 10^{-31}}{0.6} = 1.518 \\times 10^{-30} \\text{ kg}"
            },
            {
              step: "Calculate total energy in MeV",
              latex: "E = \\gamma E_0 = \\frac{0.511 \\text{ MeV}}{0.6} = 0.8517 \\text{ MeV}"
            },
            {
              step: "Calculate kinetic energy",
              latex: "E_k = E - E_0 = 0.8517 - 0.511 = 0.3407 \\text{ MeV} \\quad (5.45 \\times 10^{-14} \\text{ J})"
            }
          ],
          finalValue: "0.341",
          units: "MeV (Kinetic Energy)"
        },
        pitfallWarning: "Do NOT use classical 1/2 m v²! At 0.8c, classical formula yields 0.163 MeV, which is more than 50% in error!"
      },
      {
        id: "s4-p5",
        problemNumber: 5,
        title: "Speed Required to Double the Mass of an Electron",
        statement: "To what velocity must electrons be accelerated in order to double their mass (m = 2 m_0)?",
        givenParameters: ["m = 2 m_0 \\implies \\gamma = 2"],
        requiredAnswers: ["Velocity v"],
        officialSolution: {
          governingFormula: "\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}} = 2",
          calculationSteps: [
            {
              step: "Invert equation for v/c",
              latex: "\\sqrt{1 - \\frac{v^2}{c^2}} = \\frac{1}{2} = 0.5"
            },
            {
              step: "Square both sides",
              latex: "1 - \\frac{v^2}{c^2} = 0.25 \\implies \\frac{v^2}{c^2} = 0.75"
            },
            {
              step: "Take square root",
              latex: "v = \\sqrt{0.75} c = 0.866 c = 2.60 \\times 10^8 \\text{ m/s}"
            }
          ],
          finalValue: "0.866",
          units: "c (or 2.60 × 10⁸ m/s)"
        },
        pitfallWarning: "Students often guess v = 0.5c. At 0.5c, γ is only 1.155 (a 15.5% increase, far from doubling)!"
      }
    ]
  }
];

export const VIDEO_THEATER_LECTURES: VideoLectureItem[] = [
  {
    id: "vid-1",
    lectureNumber: 1,
    title: "Lecture 1: Blackbody Radiation & The Thermal Spectrum",
    chapter: "Chapter 1: Quantum Properties of Radiation",
    instructor: "Modern Academy Physics Department",
    youtubeId: "9d2IidEp4wo",
    url: "https://youtu.be/9d2IidEp4wo",
    duration: "42 mins",
    description: "Introduction to thermal radiation, cavity absorber approximation, Wien's displacement law, and the Stefan-Boltzmann T^4 law.",
    topicsCovered: ["Blackbody Cavity", "Wien's Law λ_max·T = const", "Stefan-Boltzmann Law", "IR Night Vision"]
  },
  {
    id: "vid-2",
    lectureNumber: 2,
    title: "Lecture 2: Ultraviolet Catastrophe & Planck's Quantum Postulate",
    chapter: "Chapter 1: Quantum Properties of Radiation",
    instructor: "Modern Academy Physics Department",
    youtubeId: "1ioQmr9bXX0",
    url: "https://youtu.be/1ioQmr9bXX0",
    duration: "48 mins",
    description: "Failure of classical Rayleigh-Jeans theory at short wavelengths, Max Planck's oscillator quantization, and derivation of Planck's distribution.",
    topicsCovered: ["Rayleigh-Jeans Law", "UV Catastrophe", "E = nhf", "Photon Quanta"]
  },
  {
    id: "vid-3",
    lectureNumber: 3,
    title: "Lecture 3: Photoelectric Effect & Einstein's Equation",
    chapter: "Chapter 1: Quantum Properties of Radiation",
    instructor: "Modern Academy Physics Department",
    youtubeId: "_qj72ACzals",
    url: "https://youtu.be/_qj72ACzals",
    duration: "55 mins",
    description: "Experimental setup, threshold frequency, stopping voltage Vs, work function ϕ, and why classical wave theory fails to explain instantaneous emission.",
    topicsCovered: ["Stopping Potential Vs", "K_max = eVs", "Work Function ϕ", "Cutoff Wavelength"]
  },
  {
    id: "vid-4",
    lectureNumber: 4,
    title: "Lecture 4: Compton Scattering & Relativistic Derivation",
    chapter: "Chapter 1: Quantum Properties of Radiation",
    instructor: "Modern Academy Physics Department",
    youtubeId: "uDwXoWMnmDY",
    url: "https://youtu.be/uDwXoWMnmDY",
    duration: "51 mins",
    description: "Full derivation of Compton wavelength shift Δλ = (h/m_0c)(1 - cos θ), electron recoil momentum, and comparison between Photoelectric and Compton effects.",
    topicsCovered: ["Compton Wavelength λc = 2.43 pm", "Elastic Collision", "Relativistic Momentum", "Recoil Electron"]
  },
  {
    id: "vid-5",
    lectureNumber: 5,
    title: "Lecture 5: de Broglie Wavelength & Davisson-Germer",
    chapter: "Chapter 2: Wave Mechanics",
    instructor: "Modern Academy Physics Department",
    youtubeId: "3LxOum6BAdg",
    url: "https://youtu.be/3LxOum6BAdg",
    duration: "46 mins",
    description: "Matter waves, dual nature of electrons, diffraction through nickel crystal gratings, and wavelength calculation for potential-accelerated particles.",
    topicsCovered: ["λ = h/p", "Accelerated Electron λ = 1.228/√V nm", "Davisson-Germer Grating", "Wave Groups"]
  },
  {
    id: "vid-6",
    lectureNumber: 6,
    title: "Lecture 6: Heisenberg Uncertainty Principle",
    chapter: "Chapter 2: Wave Mechanics",
    instructor: "Modern Academy Physics Department",
    youtubeId: "olyt5strRRM",
    url: "https://youtu.be/olyt5strRRM",
    duration: "39 mins",
    description: "Position-momentum uncertainty ΔxΔp ≥ ħ/2, energy-time uncertainty ΔEΔt ≥ ħ/2, natural spectral linewidth, and non-existence of electrons inside the nucleus.",
    topicsCovered: ["Δx·Δp ≥ ħ/2", "ΔE·Δt ≥ ħ/2", "Nuclear Confinement Paradox", "Quantum Limits"]
  },
  {
    id: "vid-7",
    lectureNumber: 7,
    title: "Lecture 7: Schrödinger Equation & Particle in a Box",
    chapter: "Chapter 2: Wave Mechanics",
    instructor: "Modern Academy Physics Department",
    youtubeId: "CjzdumnML9s",
    url: "https://youtu.be/CjzdumnML9s",
    duration: "58 mins",
    description: "1D Time-Independent Schrödinger Equation, boundary conditions, wavefunction normalization, quantized energy levels En = n²E1, and zero-point energy.",
    topicsCovered: ["TISE 1D", "Ψ_n(x) = √(2/L) sin(nπx/L)", "E_n = n²E₁", "Zero-Point Energy", "Node Symmetry"]
  },
  {
    id: "vid-8",
    lectureNumber: 8,
    title: "Lecture 8: Quantum Tunneling & Barrier Penetration",
    chapter: "Chapter 2: Wave Mechanics",
    instructor: "Modern Academy Physics Department",
    youtubeId: "8stnXrgNdk8",
    url: "https://youtu.be/8stnXrgNdk8",
    duration: "44 mins",
    description: "Finite square barrier, transmission coefficient T = e^(-2γa), penetration depth δ, and industrial applications: Tunnel Diodes and Scanning Tunneling Microscopy.",
    topicsCovered: ["Barrier Penetration", "T = exp(-2γa)", "Tunnel Diode", "STM Atomic Imaging", "Alpha Decay"]
  },
  {
    id: "vid-9",
    lectureNumber: 9,
    title: "Lecture 9: Bohr Atom Model & Hydrogen Spectral Series",
    chapter: "Chapter 3: Atomic Physics",
    instructor: "Modern Academy Physics Department",
    youtubeId: "eGuVzLC5tUo",
    url: "https://youtu.be/eGuVzLC5tUo",
    duration: "52 mins",
    description: "Bohr postulates, angular momentum quantization mvr = nħ, orbit radii rn = n²a0, energy levels En = -13.6/n² eV, and Rydberg formula.",
    topicsCovered: ["Bohr Postulates", "Bohr Radius a0 = 0.529 Å", "Lyman, Balmer, Paschen", "Rydberg Constant"]
  },
  {
    id: "vid-10",
    lectureNumber: 10,
    title: "Lecture 10: Special Relativity, Time Dilation & Lorentz",
    chapter: "Chapter 4: Special Theory of Relativity",
    instructor: "Modern Academy Physics Department",
    youtubeId: "mtSKZwKXOfA",
    url: "https://youtu.be/mtSKZwKXOfA",
    duration: "60 mins",
    description: "Michelson-Morley experiment, Einstein postulates, time dilation, length contraction, Lorentz transformations, velocity addition, and E = mc².",
    topicsCovered: ["Time Dilation Δt = γΔtp", "Length Contraction", "Lorentz Velocity Addition", "E = mc²"]
  }
];

export const CRAMMING_MOCK_EXAMS: CrammingMockExam[] = [
  {
    id: "mock-1",
    examNumber: 1,
    title: "Hard Mock Exam 1: Modern Academy Midterm Standard",
    description: "Covers Blackbody Radiation, Wien's displacement, Photoelectric Stopping Potentials, and Compton scattering.",
    timeMinutes: 45,
    questions: [
      {
        id: "m1-q1",
        sheetId: "sheet-1",
        questionNumber: 1,
        prompt: "A blackbody furnace operates at T = 2000 K. What is the peak emission wavelength λ_max in micrometers (μm)?",
        numericalAnswer: 1.449,
        tolerance: 0.05,
        units: "μm",
        answerLatex: "\\lambda_{\\max} = \\frac{2.898 \\times 10^{-3}}{2000} = 1.449 \\, \\mu\\text{m}",
        explanation: "Apply Wien's Law: λ_max · T = 2.898 × 10^-3 m·K. λ_max = 2.898 × 10^-3 / 2000 = 1.449 × 10^-6 m = 1.449 μm.",
        roundingWarningTips: "Answers between 1.44 and 1.46 μm are accepted. Ensure conversion to μm (10^-6 m).",
        steps: [
          { step: "State Wien's law", latex: "\\lambda_{\\max} T = 2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}" },
          { step: "Divide by T = 2000 K", latex: "\\lambda_{\\max} = \\frac{2.898 \\times 10^{-3}}{2000} = 1.449 \\times 10^{-6} \\text{ m}" }
        ]
      },
      {
        id: "m1-q2",
        sheetId: "sheet-1",
        questionNumber: 2,
        prompt: "Light with wavelength 300 nm falls on a metal with work function ϕ = 2.46 eV. What is the stopping potential Vs in Volts?",
        numericalAnswer: 1.67,
        tolerance: 0.05,
        units: "V",
        answerLatex: "V_s = \\frac{1240}{300} - 2.46 = 4.133 - 2.46 = 1.673 \\text{ V}",
        explanation: "Photon energy E = 1240 / 300 nm = 4.133 eV. Stopping potential V_s = (E - ϕ)/e = 4.133 - 2.46 = 1.67 V.",
        roundingWarningTips: "Ensure you subtract 2.46 eV from 4.13 eV.",
        steps: [
          { step: "Compute photon energy", latex: "E = \\frac{1240}{300} = 4.133 \\text{ eV}" },
          { step: "Solve for stopping potential", latex: "eV_s = E - \\phi \\implies V_s = 4.133 - 2.46 = 1.673 \\text{ V}" }
        ]
      },
      {
        id: "m1-q3",
        sheetId: "sheet-1",
        questionNumber: 3,
        prompt: "An X-ray photon is scattered through θ = 90° by a stationary free electron. What is the increase in wavelength Δλ in picometers (pm)?",
        numericalAnswer: 2.43,
        tolerance: 0.04,
        units: "pm",
        answerLatex: "\\Delta\\lambda = \\lambda_c (1 - \\cos 90^\\circ) = 2.426 \\text{ pm}",
        explanation: "Compton shift formula: Δλ = (h/m_0c)(1 - cos θ). For θ = 90°, 1 - cos 90° = 1. Thus Δλ = λ_c = 2.43 pm.",
        roundingWarningTips: "Remember Compton wavelength of an electron is universally 2.426 pm (0.0243 Å).",
        steps: [
          { step: "Substitute θ = 90°", latex: "\\Delta\\lambda = \\frac{h}{m_0 c}(1 - 0) = \\lambda_c = 2.426 \\text{ pm}" }
        ]
      }
    ]
  },
  {
    id: "mock-2",
    examNumber: 2,
    title: "Hard Mock Exam 2: Wave Mechanics & Box Quantization",
    description: "Covers de Broglie wavelength for accelerated particles, Heisenberg speed uncertainty, and 1D infinite square wells.",
    timeMinutes: 45,
    questions: [
      {
        id: "m2-q1",
        sheetId: "sheet-2",
        questionNumber: 1,
        prompt: "An electron is accelerated from rest across an electric potential of 150 Volts. What is its de Broglie wavelength in Angstroms (Å)?",
        numericalAnswer: 1.00,
        tolerance: 0.05,
        units: "Å",
        answerLatex: "\\lambda = \\sqrt{\\frac{150}{V}} = \\sqrt{\\frac{150}{150}} = 1.00 \\text{ \\AA}",
        explanation: "Using the convenient electron shortcut: λ = √(150/V) Å = √(150/150) = 1.00 Å = 0.10 nm.",
        roundingWarningTips: "Answer is exactly 1.0 Å.",
        steps: [
          { step: "Apply electron de Broglie formula", latex: "\\lambda = \\frac{h}{\\sqrt{2mqV}} = 1.00 \\text{ \\AA}" }
        ]
      },
      {
        id: "m2-q2",
        sheetId: "sheet-2",
        questionNumber: 2,
        prompt: "An electron is confined to an infinite square well of width L = 0.50 nm. What is its ground state energy E_1 in electron-volts (eV)?",
        numericalAnswer: 1.51,
        tolerance: 0.06,
        units: "eV",
        answerLatex: "E_1 = \\frac{h^2}{8 m_e L^2} = 1.507 \\text{ eV}",
        explanation: "E_1 = (6.63 × 10^-34)² / [8(9.11 × 10^-31)(0.50 × 10^-9)²] = 2.414 × 10^-19 J = 1.508 eV.",
        roundingWarningTips: "Values around 1.50 to 1.52 eV are accepted.",
        steps: [
          { step: "Ground state energy formula", latex: "E_1 = \\frac{h^2}{8mL^2}" },
          { step: "Convert Joules to eV", latex: "E_1 = \\frac{2.414 \\times 10^{-19} \\text{ J}}{1.602 \\times 10^{-19} \\text{ J/eV}} = 1.508 \\text{ eV}" }
        ]
      },
      {
        id: "m2-q3",
        sheetId: "sheet-2",
        questionNumber: 3,
        prompt: "For the same electron in the L = 0.50 nm box, what is the energy of its second excited state (n = 3) in eV?",
        numericalAnswer: 13.57,
        tolerance: 0.06,
        units: "eV",
        answerLatex: "E_3 = 3^2 \\times E_1 = 9 \\times 1.508 = 13.57 \\text{ eV}",
        explanation: "Energy eigenvalues scale as n²: E_n = n² E_1. Second excited state is n = 3, so E_3 = 9 × 1.508 = 13.57 eV.",
        roundingWarningTips: "Do not multiply by 2²=4! 2nd excited state is n=3, not n=2.",
        steps: [
          { step: "State scaling rule", latex: "E_3 = 3^2 E_1 = 9 E_1" }
        ]
      }
    ]
  },
  {
    id: "mock-3",
    examNumber: 3,
    title: "Hard Mock Exam 3: Special Relativity & Dynamics",
    description: "Covers Lorentz factor, relativistic time dilation, length contraction, and mass increase at relativistic speeds.",
    timeMinutes: 45,
    questions: [
      {
        id: "m3-q1",
        sheetId: "sheet-4",
        questionNumber: 1,
        prompt: "A spaceship travels past Earth at speed v = 0.80 c. What is its Lorentz factor γ?",
        numericalAnswer: 1.667,
        tolerance: 0.03,
        units: "dimensionless",
        answerLatex: "\\gamma = \\frac{1}{\\sqrt{1 - (0.8)^2}} = \\frac{1}{\\sqrt{0.36}} = \\frac{1}{0.6} = 1.667",
        explanation: "γ = 1/√(1 - (0.8)²) = 1/0.6 = 5/3 = 1.667.",
        roundingWarningTips: "Accepts 1.66 to 1.67.",
        steps: [
          { step: "Lorentz factor definition", latex: "\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}" }
        ]
      },
      {
        id: "m3-q2",
        sheetId: "sheet-4",
        questionNumber: 2,
        prompt: "A meter stick (proper length L_p = 1.00 m) moves parallel to its length at v = 0.80 c. What is its contracted length L in meters?",
        numericalAnswer: 0.60,
        tolerance: 0.03,
        units: "m",
        answerLatex: "L = \\frac{L_p}{\\gamma} = 1.00 \\times 0.60 = 0.60 \\text{ m}",
        explanation: "Length contraction: L = L_p / γ = 1.00 / (5/3) = 0.60 m.",
        roundingWarningTips: "Notice the contracted length is 60 cm.",
        steps: [
          { step: "Length contraction formula", latex: "L = L_p \\sqrt{1 - v^2/c^2} = 1.00 \\times 0.60 = 0.60 \\text{ m}" }
        ]
      },
      {
        id: "m3-q3",
        sheetId: "sheet-4",
        questionNumber: 3,
        prompt: "If an astronaut's clock measures a proper time interval of 30 years during a high-speed mission at 0.8c, how many years have passed on Earth?",
        numericalAnswer: 50.0,
        tolerance: 0.02,
        units: "years",
        answerLatex: "\\Delta t = \\gamma \\Delta t_p = 1.667 \\times 30 = 50.0 \\text{ years}",
        explanation: "Time dilation: Δt = γ Δt_p = (5/3) × 30 years = 50 years. (This is the classic Twin Paradox problem from page 191 of the coursebook!)",
        roundingWarningTips: "Exactly 50 years.",
        steps: [
          { step: "Time dilation formula", latex: "\\Delta t = \\frac{\\Delta t_p}{\\sqrt{1 - v^2/c^2}} = \\frac{30}{0.6} = 50 \\text{ yr}" }
        ]
      }
    ]
  }
];

export const GLOBAL_FORMULAS_SHEET: GlobalFormulaItem[] = [
  // Chapter 1: Quantum Properties of Radiation
  {
    id: "f-wien",
    chapterId: "ch1",
    name: "Wien's Displacement Law",
    latex: "\\lambda_{\\max} T = 2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}",
    variables: "λ_max: peak emission wavelength (m), T: absolute temperature (K)",
    typicalUnits: "m·K",
    notes: "Peak wavelength shifts inversely with temperature. As T rises, peak moves from IR into visible (red → white)."
  },
  {
    id: "f-stefan",
    chapterId: "ch1",
    name: "Stefan-Boltzmann Law",
    latex: "P = \\sigma A \\varepsilon T^4 \\quad \\implies \\quad I = \\sigma T^4",
    variables: "P: power (W), σ: 5.67×10^-8 W/(m²K⁴), A: area (m²), ε: emissivity (1 for blackbody), T: temperature (K)",
    typicalUnits: "Watts (W) or W/m²",
    notes: "Total power radiated per unit area scales with the 4th power of absolute temperature."
  },
  {
    id: "f-rayleigh",
    chapterId: "ch1",
    name: "Rayleigh-Jeans Law (Classical UV Catastrophe)",
    latex: "I(\\lambda, T) = \\frac{2\\pi c k_B T}{\\lambda^4}",
    variables: "k_B: Boltzmann constant (1.38×10^-23 J/K), c: speed of light, λ: wavelength",
    typicalUnits: "W/m³",
    notes: "Fails disastrously as λ → 0 (UV catastrophe); valid only for long wavelengths."
  },
  {
    id: "f-planck",
    chapterId: "ch1",
    name: "Planck's Radiation Law",
    latex: "I(\\lambda, T) = \\frac{2\\pi h c^2}{\\lambda^5 (e^{\\frac{hc}{\\lambda k_B T}} - 1)}",
    variables: "h: Planck's constant (6.626×10^-34 J·s), c: 3×10^8 m/s, k_B: 1.38×10^-23 J/K",
    typicalUnits: "W/m³",
    notes: "Reduces to Rayleigh-Jeans for long wavelengths and Wien's law for short wavelengths."
  },
  {
    id: "f-photon-e",
    chapterId: "ch1",
    name: "Photon Energy Shortcut",
    latex: "E = hf = \\frac{hc}{\\lambda} = \\frac{1240}{\\lambda \\text{ (nm)}} \\text{ eV}",
    variables: "E: photon energy (eV), λ: wavelength in nanometers (nm)",
    typicalUnits: "eV",
    notes: "Extremely useful in Modern Academy exam calculations to skip tedious 10^-34 exponent arithmetic."
  },
  {
    id: "f-photoelectric",
    chapterId: "ch1",
    name: "Einstein Photoelectric Equation",
    latex: "hf = \\phi + K_{\\max} = \\phi + e V_s = \\phi + \\frac{1}{2} m_e v^2",
    variables: "ϕ: work function (eV or J), V_s: stopping voltage (V), K_max: maximum kinetic energy",
    typicalUnits: "eV or Joules",
    notes: "Stopping voltage V_s depends ONLY on frequency f and work function ϕ, never on light intensity."
  },
  {
    id: "f-compton",
    chapterId: "ch1",
    name: "Compton Wavelength Shift",
    latex: "\\Delta\\lambda = \\lambda' - \\lambda = \\frac{h}{m_0 c}(1 - \\cos\\theta) = \\lambda_c (1 - \\cos\\theta)",
    variables: "λ_c = h/(m_0 c) = 2.43 pm = 0.0243 Å for an electron, θ: scattering angle",
    typicalUnits: "pm or Å",
    notes: "Max shift occurs at θ = 180° (head-on backscatter): Δλ_max = 2λ_c = 4.86 pm."
  },

  // Chapter 2: Wave Mechanics
  {
    id: "f-debroglie",
    chapterId: "ch2",
    name: "de Broglie Matter Wavelength",
    latex: "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2m q V}} \\approx \\sqrt{\\frac{150}{V}} \\text{ \\AA}",
    variables: "p: momentum, V: accelerating potential difference in volts",
    typicalUnits: "Å or nm",
    notes: "Shortcut for electron accelerated through V volts: λ = 1.228 / √V nm."
  },
  {
    id: "f-heisenberg-xp",
    chapterId: "ch2",
    name: "Heisenberg Position-Momentum Uncertainty",
    latex: "\\Delta x \\Delta p_x \\ge \\frac{\\hbar}{2} = \\frac{h}{4\\pi}",
    variables: "Δx: uncertainty in position, Δp_x: uncertainty in x-momentum (m·Δv_x)",
    typicalUnits: "J·s",
    notes: "Proves that electrons cannot reside within atomic nuclei (size ~ 10^-14 m requires relativistic K.E. > 20 MeV)."
  },
  {
    id: "f-heisenberg-et",
    chapterId: "ch2",
    name: "Heisenberg Energy-Time Uncertainty",
    latex: "\\Delta E \\Delta t \\ge \\frac{\\hbar}{2}",
    variables: "ΔE: uncertainty in energy state, Δt: lifetime of excited state",
    typicalUnits: "J·s",
    notes: "Explains finite natural linewidth in optical and atomic spectroscopy."
  },
  {
    id: "f-box-energy",
    chapterId: "ch2",
    name: "1D Infinite Square Well Energy Quantization",
    latex: "E_n = \\frac{n^2 \\pi^2 \\hbar^2}{2m L^2} = \\frac{n^2 h^2}{8m L^2} = n^2 E_1 \\quad (n = 1, 2, 3...)",
    variables: "L: width of box, n: quantum number (starts at n=1)",
    typicalUnits: "Joules or eV",
    notes: "Zero-point energy E_1 is the lowest possible state. E = 0 is strictly forbidden by uncertainty principle."
  },
  {
    id: "f-box-wave",
    chapterId: "ch2",
    name: "1D Infinite Square Well Wavefunction",
    latex: "\\psi_n(x) = \\sqrt{\\frac{2}{L}} \\sin\\left(\\frac{n\\pi x}{L}\\right) \\quad (0 \\le x \\le L)",
    variables: "k_n = nπ/L, wavelength in box λ_n = 2L/n",
    typicalUnits: "m^(-1/2)",
    notes: "Number of nodes inside the well equals n - 1."
  },
  {
    id: "f-tunneling",
    chapterId: "ch2",
    name: "Quantum Barrier Penetration (Tunneling)",
    latex: "T \\approx e^{-2\\gamma a}, \\quad \\gamma = \\frac{\\sqrt{2m(U_0 - E)}}{\\hbar}",
    variables: "U_0: barrier height, E: particle energy (E < U_0), a: barrier thickness",
    typicalUnits: "dimensionless",
    notes: "Penetration depth is δ = 1/(2γ). Probability decays exponentially with barrier thickness."
  },

  // Chapter 3: Atomic Physics
  {
    id: "f-bohr-radius",
    chapterId: "ch3",
    name: "Bohr Orbit Radius",
    latex: "r_n = n^2 a_0 = n^2 \\left(\\frac{\\hbar^2}{m_e k e^2}\\right) = n^2 (0.0529 \\text{ nm})",
    variables: "a_0 = 0.529 Å: first Bohr radius (n=1)",
    typicalUnits: "nm or Å",
    notes: "Allowed orbit radii scale as n²: r_1 = a_0, r_2 = 4a_0, r_3 = 9a_0."
  },
  {
    id: "f-bohr-energy",
    chapterId: "ch3",
    name: "Bohr Energy Levels of Hydrogen",
    latex: "E_n = -\\frac{13.6 \\text{ eV}}{n^2} \\quad (n = 1, 2, 3, \\dots)",
    variables: "E_1 = -13.6 eV (ground state), E_2 = -3.4 eV, E_3 = -1.51 eV",
    typicalUnits: "eV",
    notes: "Ionization energy from ground state is +13.6 eV."
  },
  {
    id: "f-rydberg",
    chapterId: "ch3",
    name: "Rydberg Formula for Hydrogen Transitions",
    latex: "\\frac{1}{\\lambda} = R_H \\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right) \\quad (R_H = 1.09737 \\times 10^7 \\text{ m}^{-1})",
    variables: "n_f: lower state, n_i: upper state (n_i > n_f)",
    typicalUnits: "m^-1",
    notes: "Lyman (n_f=1, UV), Balmer (n_f=2, Visible), Paschen (n_f=3, IR), Brackett (n_f=4, IR)."
  },
  {
    id: "f-angular-mom",
    chapterId: "ch3",
    name: "Orbital Angular Momentum Quantization",
    latex: "L = \\sqrt{\\ell(\\ell+1)}\\hbar, \\quad L_z = m_\\ell \\hbar, \\quad \\cos\\theta = \\frac{m_\\ell}{\\sqrt{\\ell(\\ell+1)}}",
    variables: "ℓ: orbital quantum number (0 to n-1), m_ℓ: magnetic quantum number (-ℓ to +ℓ)",
    typicalUnits: "J·s or units of ħ",
    notes: "Space quantization: L can have exactly 2ℓ+1 discrete orientations in space."
  },
  {
    id: "f-bremsstrahlung",
    chapterId: "ch3",
    name: "Duane-Hunt Law (X-Ray Cutoff)",
    latex: "\\lambda_{\\min} = \\frac{hc}{e V_0} = \\frac{1240}{V_0 \\text{ (volts)}} \\text{ nm}",
    variables: "V_0: accelerating tube voltage, λ_min: shortest wavelength emitted",
    typicalUnits: "nm or pm",
    notes: "Inverse photoelectric effect: entire electron kinetic energy converted into a single photon."
  },

  // Chapter 4: Special Relativity
  {
    id: "f-lorentz-factor",
    chapterId: "ch4",
    name: "Lorentz Factor γ",
    latex: "\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}} \\ge 1",
    variables: "v: relative velocity, c: 3×10^8 m/s",
    typicalUnits: "dimensionless",
    notes: "At v=0.6c → γ=1.25; at v=0.8c → γ=1.667; at v=0.99c → γ=7.089."
  },
  {
    id: "f-time-dilation",
    chapterId: "ch4",
    name: "Relativistic Time Dilation",
    latex: "\\Delta t = \\gamma \\Delta t_p = \\frac{\\Delta t_p}{\\sqrt{1 - v^2/c^2}}",
    variables: "Δt_p: proper time (measured in rest frame of clock), Δt: dilated time",
    typicalUnits: "seconds or years",
    notes: "Moving clocks always run slow. Proper time is the shortest possible elapsed time."
  },
  {
    id: "f-length-contraction",
    chapterId: "ch4",
    name: "Relativistic Length Contraction",
    latex: "L = \\frac{L_p}{\\gamma} = L_p \\sqrt{1 - \\frac{v^2}{c^2}}",
    variables: "L_p: proper length (measured in object's rest frame), L: contracted length",
    typicalUnits: "meters",
    notes: "Contraction occurs ONLY along the direction of motion. Transverse dimensions (y, z) are unchanged."
  },
  {
    id: "f-velocity-addition",
    chapterId: "ch4",
    name: "Lorentz Velocity Addition",
    latex: "u_x = \\frac{u'_x + v}{1 + \\frac{u'_x v}{c^2}}",
    variables: "u'_x: velocity in moving frame S', v: frame velocity, u_x: velocity in S",
    typicalUnits: "m/s or units of c",
    notes: "Guarantees that combining sub-light velocities never exceeds c."
  },
  {
    id: "f-relativistic-energy",
    chapterId: "ch4",
    name: "Einstein Mass-Energy & Momentum Relation",
    latex: "E = mc^2 = \\gamma m_0 c^2, \\quad E^2 = (pc)^2 + (m_0 c^2)^2, \\quad E_k = (\\gamma - 1)m_0 c^2",
    variables: "m_0: rest mass, p = γm_0v: relativistic momentum, E_0 = m_0 c²: rest energy",
    typicalUnits: "Joules or MeV",
    notes: "For massless particles (photons, neutrinos with m_0=0): E = pc."
  }
];

export const ALL_MASTERCLASS_SHEETS = MASTERCLASS_SHEETS;
export const SHEET_1_MASTERCLASS = MASTERCLASS_SHEETS[0];
export const SHEET_2_MASTERCLASS = MASTERCLASS_SHEETS[1];
export const SHEET_3_MASTERCLASS = MASTERCLASS_SHEETS[2];
export const SHEET_4_MASTERCLASS = MASTERCLASS_SHEETS[3];
export const GLOBAL_FORMULAS_MASTER = GLOBAL_FORMULAS_SHEET;
