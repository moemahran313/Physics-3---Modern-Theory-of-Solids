import { ChapterExamQuestion } from "../types";

export const CHAPTER_EXAM_QUESTIONS: ChapterExamQuestion[] = [
  // =========================================================================
  // CHAPTER 1: QUANTUM PROPERTIES OF THERMAL RADIATION & PHOTOELECTRIC EFFECT
  // (Source: Ch_1_Sheet_63f50f81.pdf)
  // =========================================================================
  {
    id: "ch1-p1",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: 1,
    officialSource: "Chapter 1 Sheet — Problem 1",
    title: "Solar Surface Temperature from Wien's Law",
    topic: "Wien's Displacement Law",
    difficulty: "introductory",
    points: 10,
    prompt: "The Sun emits radiation that peaks at wavelength $\\lambda_{\\max} = 500\\text{ nm}$ ($5.00 \\times 10^{-7}\\text{ m}$). Assuming the Sun radiates as an ideal blackbody, determine its surface temperature in Kelvin.",
    given: [
      { symbol: "\\lambda_{\\max}", value: "500 nm = 5.00 \\times 10^{-7} m", description: "Peak emission wavelength" },
      { symbol: "b", value: "2.898 \\times 10^{-3} m\\cdot K", description: "Wien's displacement constant" }
    ],
    targetUnknown: "Surface Temperature T",
    expectedValue: 5796,
    units: "K",
    tolerance: 0.025,
    alternateUnits: [
      { unit: "kK", multiplier: 0.001 }
    ],
    governingFormula: "\\lambda_{\\max} T = b = 2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}",
    pitfallWarning: "Never enter wavelength in nanometers into Wien's constant! You must multiply by 10^-9 to convert nm to meters.",
    tips: [
      "Wien's displacement constant b = 2.898 × 10^-3 m·K relates peak wavelength to absolute temperature.",
      "The sun's surface temperature is universally close to ~5800 K (giving sunlight its characteristic yellowish-white spectrum)."
    ],
    progressiveHints: [
      "Use Wien's Displacement Law: \\lambda_{\\max} T = 2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}.",
      "Isolate T: T = \\frac{2.898 \\times 10^{-3}}{\\lambda_{\\max}}. Convert 500 nm to meters: 500 \\times 10^{-9} \\text{ m}.",
      "Calculate: T = \\frac{2.898 \\times 10^{-3}}{5.00 \\times 10^{-7}} = 5796 \\text{ K} \\approx 5800 \\text{ K}."
    ],
    solutionSteps: [
      {
        step: "Wien's Law Formulation",
        latex: "\\lambda_{\\max} T = 2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}",
        explanation: "Peak spectral emission is inversely proportional to absolute thermodynamic temperature."
      },
      {
        step: "Convert Wavelength to SI Units",
        latex: "\\lambda_{\\max} = 500 \\text{ nm} = 500 \\times 10^{-9} \\text{ m} = 5.00 \\times 10^{-7} \\text{ m}",
        explanation: "Ensure dimensional consistency with meters in Wien's constant."
      },
      {
        step: "Calculate Surface Temperature",
        latex: "T = \\frac{2.898 \\times 10^{-3}}{5.00 \\times 10^{-7}} = 5796 \\text{ K} \\approx 5800 \\text{ K}",
        explanation: "Final temperature of the solar photosphere."
      }
    ]
  },
  {
    id: "ch1-p2",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: 2,
    officialSource: "Chapter 1 Sheet — Problem 2",
    title: "Blackbody Temperature from Peak Optical Sensitivity",
    topic: "Wien's Displacement Law",
    difficulty: "introductory",
    points: 10,
    prompt: "The human eye is most sensitive to green-yellow light with a wavelength of $\\lambda = 550\\text{ nm}$. To what blackbody absolute temperature $T$ does this peak wavelength correspond?",
    given: [
      { symbol: "\\lambda_{\\max}", value: "550 nm = 5.50 \\times 10^{-7} m", description: "Eye peak sensitivity wavelength" },
      { symbol: "b", value: "2.898 \\times 10^{-3} m\\cdot K", description: "Wien's constant" }
    ],
    targetUnknown: "Blackbody Temperature T",
    expectedValue: 5269,
    units: "K",
    tolerance: 0.025,
    governingFormula: "T = \\frac{2.898 \\times 10^{-3}}{\\lambda_{\\max}}",
    pitfallWarning: "Ensure you use 550 × 10^-9 m. A common mistake is using 550 without the 10^-9 scaling.",
    tips: [
      "Human evolutionary vision peaked around the solar maximum spectrum.",
      "Expected answer is around 5270 K."
    ],
    progressiveHints: [
      "State Wien's law: \\lambda_{\\max} T = 2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}.",
      "Substitute \\lambda_{\\max} = 550 \\times 10^{-9} \\text{ m}.",
      "Evaluate: T = \\frac{2.898 \\times 10^{-3}}{550 \\times 10^{-9}} = 5269.1 \\text{ K}."
    ],
    solutionSteps: [
      {
        step: "Apply Wien's Law",
        latex: "T = \\frac{2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}}{\\lambda_{\\max}}",
        explanation: "Solve directly for temperature T in Kelvin."
      },
      {
        step: "Numerical Substitution",
        latex: "T = \\frac{2.898 \\times 10^{-3}}{5.50 \\times 10^{-7}} = 5269.09 \\text{ K}",
        explanation: "5270 K represents the radiator temperature peaking at 550 nm."
      }
    ]
  },
  {
    id: "ch1-p3",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: 3,
    officialSource: "Chapter 1 Sheet — Problem 3",
    title: "Retinal Sensation Minimum Optical Power",
    topic: "Planck Photon Energy & Optical Flux",
    difficulty: "standard",
    points: 15,
    prompt: "The human eye can detect a visual sensation if at least $100$ photons per second of green light ($\\lambda = 550\\text{ nm}$) enter the pupil. Calculate the minimum optical power in Watts corresponding to this sensitivity threshold.",
    given: [
      { symbol: "N/t", value: "100 photons/s", description: "Photon arrival rate" },
      { symbol: "\\lambda", value: "550 nm = 550 \\times 10^{-9} m", description: "Wavelength" },
      { symbol: "h", value: "6.626 \\times 10^{-34} J\\cdot s", description: "Planck constant" },
      { symbol: "c", value: "3.00 \\times 10^{8} m/s", description: "Speed of light" }
    ],
    targetUnknown: "Power P",
    expectedValue: 3.61e-17,
    units: "W",
    tolerance: 0.03,
    governingFormula: "P = \\left(\\frac{N}{t}\\right) E_{\\text{photon}} = \\left(\\frac{N}{t}\\right) \\frac{hc}{\\lambda}",
    pitfallWarning: "Express the answer in standard scientific notation (e.g. 3.61e-17). Power = Rate × Energy per photon.",
    tips: [
      "Energy of a single photon is E = hc/λ.",
      "For λ = 550 nm, E_photon ≈ 3.61 × 10^-19 Joules.",
      "Multiplying by 100 photons/sec yields 3.61 × 10^-17 Watts."
    ],
    progressiveHints: [
      "First compute the energy of a single photon: E = hc / \\lambda in Joules.",
      "Calculate: E = \\frac{(6.626 \\times 10^{-34})(3.0 \\times 10^8)}{550 \\times 10^{-9}} = 3.614 \\times 10^{-19} \\text{ J}.",
      "Total power is P = 100 \\times E = 3.614 \\times 10^{-17} \\text{ W}."
    ],
    solutionSteps: [
      {
        step: "Energy of One Optical Photon",
        latex: "E = \\frac{hc}{\\lambda} = \\frac{(6.626 \\times 10^{-34} \\text{ J}\\cdot\\text{s})(3.00 \\times 10^8 \\text{ m/s})}{550 \\times 10^{-9} \\text{ m}} = 3.614 \\times 10^{-19} \\text{ J}",
        explanation: "Quantum energy carried by each individual photon."
      },
      {
        step: "Compute Total Radiant Power",
        latex: "P = n \\cdot E = (100 \\text{ s}^{-1})(3.614 \\times 10^{-19} \\text{ J}) = 3.614 \\times 10^{-17} \\text{ W}",
        explanation: "100 photons/second delivers 3.61 × 10^-17 Joules per second (Watts)."
      }
    ]
  },
  {
    id: "ch1-p4",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: 4,
    officialSource: "Chapter 1 Sheet — Problem 4 & Example 1.11",
    title: "Net Power Radiated through Oven Cavity Aperture",
    topic: "Stefan-Boltzmann Law",
    difficulty: "standard",
    points: 15,
    prompt: "An oven with internal temperature $T_o = 227^\\circ\\text{C}$ is located in a room at ambient temperature $T_r = 27^\\circ\\text{C}$. A small aperture of area $A = 5.0\\text{ cm}^2$ exists on one side. How much net power in Watts ($P_{\\text{net}}$) radiates out of the aperture into the room? (Use $\\sigma = 5.67 \\times 10^{-8}\\text{ W}/(\\text{m}^2\\cdot\\text{K}^4)$).",
    given: [
      { symbol: "T_o", value: "227 °C = 500 K", description: "Oven cavity temperature" },
      { symbol: "T_r", value: "27 °C = 300 K", description: "Surrounding room temperature" },
      { symbol: "A", value: "5.0 cm² = 5.0 \\times 10^{-4} m²", description: "Hole cross-sectional area" },
      { symbol: "\\sigma", value: "5.67 \\times 10^{-8} W/(m²\\cdot K⁴)", description: "Stefan-Boltzmann constant" }
    ],
    targetUnknown: "Net Power P_net",
    expectedValue: 1.54,
    units: "W",
    tolerance: 0.025,
    governingFormula: "P_{\\text{net}} = \\sigma A \\left(T_o^4 - T_r^4\\right)",
    pitfallWarning: "MAJOR EXAM TRAP: Do NOT calculate (T_o - T_r)^4! The Stefan-Boltzmann law requires (T_o^4 - T_r^4). Also, temperatures MUST be converted to Kelvin: 227°C = 500 K, 27°C = 300 K. Area 5 cm² = 5 × 10^-4 m².",
    tips: [
      "T_o = 227 + 273 = 500 K => T_o^4 = (500)^4 = 6.25 × 10^10 K^4.",
      "T_r = 27 + 273 = 300 K => T_r^4 = (300)^4 = 8.10 × 10^9 K^4.",
      "T_o^4 - T_r^4 = 5.44 × 10^10 K^4."
    ],
    progressiveHints: [
      "Convert temperatures to Kelvin: T_o = 227 + 273 = 500 \\text{ K}, T_r = 27 + 273 = 300 \\text{ K}.",
      "Convert area: A = 5.0 \\text{ cm}^2 = 5.0 \\times 10^{-4} \\text{ m}^2. Set up: P_{\\text{net}} = \\sigma A (T_o^4 - T_r^4).",
      "Substitute: P_{\\text{net}} = (5.67 \\times 10^{-8})(5.0 \\times 10^{-4})[(500)^4 - (300)^4] = 2.835 \\times 10^{-11} \\times 5.44 \\times 10^{10} = 1.542 \\text{ W}."
    ],
    solutionSteps: [
      {
        step: "Convert Temperatures to Kelvin",
        latex: "T_o = 227 + 273 = 500 \\text{ K}, \\quad T_r = 27 + 273 = 300 \\text{ K}",
        explanation: "Absolute thermodynamic temperature scale must be used."
      },
      {
        step: "Convert Aperture Area to m²",
        latex: "A = 5.0 \\text{ cm}^2 = 5.0 \\times 10^{-4} \\text{ m}^2",
        explanation: "1 cm² = 10^-4 m²."
      },
      {
        step: "Calculate Temperature Difference Factor",
        latex: "T_o^4 - T_r^4 = (500)^4 - (300)^4 = 6.25 \\times 10^{10} - 8.10 \\times 10^9 = 5.44 \\times 10^{10} \\text{ K}^4",
        explanation: "Evaluate the fourth powers independently."
      },
      {
        step: "Compute Net Radiated Power",
        latex: "P_{\\text{net}} = (5.67 \\times 10^{-8})(5.0 \\times 10^{-4})(5.44 \\times 10^{10}) = 1.542 \\text{ W}",
        explanation: "Net power emitted through hole into room is 1.54 Watts."
      }
    ]
  },
  {
    id: "ch1-p5",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: 5,
    officialSource: "Chapter 1 Sheet — Problem 5",
    title: "Photoelectric Effect on Sodium Target",
    topic: "Photoelectric Effect & Work Function",
    difficulty: "standard",
    points: 15,
    prompt: "Monochromatic light of wavelength $\\lambda = 0.300\\,\\mu\\text{m}$ ($300\\text{ nm}$) illuminates a clean sodium cathode whose work function is $\\phi = 2.46\\text{ eV}$. Find the maximum kinetic energy $K_{\\max}$ of the ejected photoelectrons in electron-volts (eV).",
    given: [
      { symbol: "\\lambda", value: "0.300 μm = 300 nm", description: "Incident wavelength" },
      { symbol: "\\phi", value: "2.46 eV", description: "Sodium work function" },
      { symbol: "hc", value: "1240 eV\\cdot nm", description: "Planck constant times speed of light" }
    ],
    targetUnknown: "Maximum Kinetic Energy K_max",
    expectedValue: 1.67,
    units: "eV",
    tolerance: 0.03,
    governingFormula: "K_{\\max} = E_{\\text{photon}} - \\phi = \\frac{hc}{\\lambda} - \\phi",
    pitfallWarning: "Using hc = 1240 eV·nm gives E_photon = 1240/300 = 4.133 eV. K_max = 4.133 - 2.46 = 1.673 eV.",
    tips: [
      "In eV units, the shortcut hc = 1240 eV·nm (or 1242 eV·nm) eliminates messy power-of-ten conversions.",
      "K_max = E_photon - phi."
    ],
    progressiveHints: [
      "Calculate photon energy: E_{\\text{photon}} = \\frac{hc}{\\lambda} = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{300 \\text{ nm}} = 4.133 \\text{ eV}.",
      "Einstein's photoelectric equation states: K_{\\max} = E_{\\text{photon}} - \\phi.",
      "Subtract work function: K_{\\max} = 4.133 - 2.46 = 1.673 \\text{ eV}."
    ],
    solutionSteps: [
      {
        step: "Determine Incident Photon Energy",
        latex: "E_{\\text{photon}} = \\frac{hc}{\\lambda} = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{300 \\text{ nm}} = 4.133 \\text{ eV}",
        explanation: "Energy carried by each ultraviolet photon."
      },
      {
        step: "Calculate Maximum Kinetic Energy",
        latex: "K_{\\max} = E_{\\text{photon}} - \\phi = 4.133 \\text{ eV} - 2.46 \\text{ eV} = 1.673 \\text{ eV}",
        explanation: "Energy remaining after overcoming the work function barrier."
      }
    ]
  },
  {
    id: "ch1-p8",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: 8,
    officialSource: "Chapter 1 Sheet — Problem 8",
    title: "Cathode Work Function from Stopping Potential",
    topic: "Stopping Potential & Work Function",
    difficulty: "standard",
    points: 15,
    prompt: "When light of wavelength $\\lambda = 250\\text{ nm}$ falls on a metal surface, a retarding potential of $V_0 = 2.92\\text{ V}$ is required to reduce the photocurrent to zero. Determine the work function $\\phi$ of the metal in electron-volts (eV).",
    given: [
      { symbol: "\\lambda", value: "250 nm", description: "Incident wavelength" },
      { symbol: "V_0", value: "2.92 V", description: "Stopping potential" },
      { symbol: "hc", value: "1240 eV\\cdot nm", description: "hc product in eV·nm" }
    ],
    targetUnknown: "Work function \\phi",
    expectedValue: 2.04,
    units: "eV",
    tolerance: 0.03,
    governingFormula: "e V_0 = \\frac{hc}{\\lambda} - \\phi \\implies \\phi = \\frac{hc}{\\lambda} - e V_0",
    pitfallWarning: "Because V_0 = 2.92 V, the maximum kinetic energy is exactly eV_0 = 2.92 eV! Therefore, work function in eV is simply E_photon (in eV) - 2.92.",
    tips: [
      "E_photon = 1240 / 250 = 4.96 eV.",
      "K_max = e V_0 = 2.92 eV.",
      "phi = 4.96 - 2.92 = 2.04 eV."
    ],
    progressiveHints: [
      "Calculate photon energy: E = \\frac{1240}{250} = 4.96 \\text{ eV}.",
      "Stopping potential V_0 = 2.92 \\text{ V} corresponds directly to K_{\\max} = 2.92 \\text{ eV}.",
      "Subtract: \\phi = 4.96 - 2.92 = 2.04 \\text{ eV}."
    ],
    solutionSteps: [
      {
        step: "Compute Incident Photon Energy",
        latex: "E_{\\text{photon}} = \\frac{hc}{\\lambda} = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{250 \\text{ nm}} = 4.96 \\text{ eV}",
        explanation: "Energy of the incident 250 nm UV light."
      },
      {
        step: "Relate Stopping Potential to K_max",
        latex: "K_{\\max} = e V_0 = 2.92 \\text{ eV}",
        explanation: "The retarding potential that halts the most energetic photoelectrons."
      },
      {
        step: "Calculate Work Function",
        latex: "\\phi = E_{\\text{photon}} - K_{\\max} = 4.96 \\text{ eV} - 2.92 \\text{ eV} = 2.04 \\text{ eV}",
        explanation: "Work function of the photosensitive emitter."
      }
    ]
  },
  {
    id: "ch1-p10",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: 10,
    officialSource: "Chapter 1 Sheet — Problem 10",
    title: "Molybdenum Cut-off Wavelength & Stopping Potential",
    topic: "Threshold Wavelength & Stopping Voltage",
    difficulty: "standard",
    points: 15,
    prompt: "The work function of molybdenum is $\\phi = 4.20\\text{ eV}$.\n(a) What is the threshold (cut-off) wavelength $\\lambda_c$ in nanometers?\n(b) If the surface is illuminated by light of $\\lambda = 200\\text{ nm}$, what is the stopping potential $V_0$ in Volts?",
    given: [
      { symbol: "\\phi", value: "4.20 eV", description: "Work function of Molybdenum" },
      { symbol: "\\lambda", value: "200 nm", description: "Incident wavelength" },
      { symbol: "hc", value: "1240 eV\\cdot nm", description: "Conversion constant" }
    ],
    targetUnknown: "Stopping Potential V_0",
    expectedValue: 2.00,
    units: "V",
    tolerance: 0.03,
    governingFormula: "V_0 = \\frac{hc/\\lambda - \\phi}{e} = \\frac{1240/200 - 4.20}{1} \\text{ V}",
    pitfallWarning: "For cut-off wavelength: lambda_c = 1240 / 4.20 = 295.2 nm. For 200 nm, E_photon = 1240/200 = 6.20 eV. V_0 = (6.20 - 4.20) = 2.00 V.",
    tips: [
      "Cut-off wavelength is lambda_c = hc / phi = 295 nm.",
      "At lambda = 200 nm, E = 6.20 eV.",
      "Stopping potential V_0 = 6.20 - 4.20 = 2.00 V."
    ],
    progressiveHints: [
      "Find photon energy at 200 nm: E = \\frac{1240}{200} = 6.20 \\text{ eV}.",
      "Find maximum kinetic energy: K_{\\max} = E - \\phi = 6.20 - 4.20 = 2.00 \\text{ eV}.",
      "Stopping potential in Volts has the exact same numerical value as K_{\\max} in eV: V_0 = 2.00 \\text{ V}."
    ],
    solutionSteps: [
      {
        step: "Threshold Cut-off Wavelength",
        latex: "\\lambda_c = \\frac{hc}{\\phi} = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{4.20 \\text{ eV}} = 295.2 \\text{ nm}",
        explanation: "Wavelength above which no photoelectric emission can occur."
      },
      {
        step: "Incident Energy at 200 nm",
        latex: "E = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{200 \\text{ nm}} = 6.20 \\text{ eV}",
        explanation: "Photon energy is higher than work function, allowing emission."
      },
      {
        step: "Stopping Potential Calculation",
        latex: "V_0 = \\frac{E - \\phi}{e} = \\frac{6.20 \\text{ eV} - 4.20 \\text{ eV}}{e} = 2.00 \\text{ V}",
        explanation: "Stopping voltage is 2.00 Volts."
      }
    ]
  },
  {
    id: "ch1-p11",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: 11,
    officialSource: "Chapter 1 Sheet — Problem 11",
    title: "Compton Scattering of X-Ray at 45°",
    topic: "Compton Shift & Relativistic Scattering",
    difficulty: "standard",
    points: 15,
    prompt: "An X-ray beam of wavelength $\\lambda_0 = 0.2000\\text{ nm}$ ($2.000\\text{ \\AA}$) is scattered by electrons in a target through an angle $\\theta = 45^\\circ$. What is the scattered wavelength $\\lambda'$ in nanometers? (Use Compton wavelength $\\lambda_c = \\frac{h}{m_0 c} = 0.00243\\text{ nm} = 2.43\\text{ pm}$).",
    given: [
      { symbol: "\\lambda_0", value: "0.2000 nm", description: "Incident X-ray wavelength" },
      { symbol: "\\theta", value: "45°", description: "Scattering angle" },
      { symbol: "\\lambda_c", value: "0.00243 nm = 2.43 pm", description: "Electron Compton wavelength" }
    ],
    targetUnknown: "Scattered Wavelength \\lambda'",
    expectedValue: 0.20071,
    units: "nm",
    tolerance: 0.01,
    alternateUnits: [
      { unit: "pm", multiplier: 1000 },
      { unit: "Å", multiplier: 10 }
    ],
    governingFormula: "\\lambda' - \\lambda_0 = \\frac{h}{m_0 c}(1 - \\cos\\theta)",
    pitfallWarning: "Make sure your calculator is in DEGREE mode when computing cos(45°)! cos(45°) = 0.7071 => (1 - cos(45°)) = 0.2929.",
    tips: [
      "1 - cos(45°) = 1 - 0.7071 = 0.2929.",
      "Delta lambda = 0.00243 × 0.2929 = 0.0007117 nm (0.712 pm).",
      "lambda' = 0.2000 + 0.000712 = 0.200712 nm."
    ],
    progressiveHints: [
      "Compton formula: \\Delta \\lambda = \\lambda_c(1 - \\cos\\theta).",
      "Evaluate: \\Delta \\lambda = (0.00243 \\text{ nm})(1 - \\cos 45^\\circ) = 0.00243 \\times (1 - 0.7071) = 0.000712 \\text{ nm}.",
      "Add to initial wavelength: \\lambda' = 0.2000 + 0.000712 = 0.200712 \\text{ nm}."
    ],
    solutionSteps: [
      {
        step: "Evaluate Angular Factor",
        latex: "1 - \\cos 45^\\circ = 1 - \\frac{\\sqrt{2}}{2} = 1 - 0.70711 = 0.29289",
        explanation: "Fractional geometric scattering factor at 45 degrees."
      },
      {
        step: "Compute Compton Shift",
        latex: "\\Delta\\lambda = \\lambda_c (1 - \\cos 45^\\circ) = (0.002426 \\text{ nm})(0.29289) = 0.0007106 \\text{ nm} = 0.7106 \\text{ pm}",
        explanation: "Increase in photon wavelength due to momentum transfer to the electron."
      },
      {
        step: "Calculate Final Scattered Wavelength",
        latex: "\\lambda' = \\lambda_0 + \\Delta\\lambda = 0.2000 \\text{ nm} + 0.000711 \\text{ nm} = 0.200711 \\text{ nm}",
        explanation: "Final wavelength of the scattered X-ray photon."
      }
    ]
  },
  {
    id: "ch1-p12",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: 12,
    officialSource: "Chapter 1 Sheet — Problem 12",
    title: "Fractional Compton Wavelength Shift at 90°",
    topic: "Fractional Compton Shift",
    difficulty: "standard",
    points: 15,
    prompt: "An incident X-ray photon of wavelength $\\lambda = 0.400\\text{ \\AA}$ ($0.0400\\text{ nm}$) undergoes Compton scattering through $\\theta = 90^\\circ$. What is the fractional change in wavelength $\\frac{\\Delta\\lambda}{\\lambda}$ expressed as a percentage (%)?",
    given: [
      { symbol: "\\lambda", value: "0.400 Å = 0.0400 nm", description: "Incident wavelength" },
      { symbol: "\\theta", value: "90°", description: "Scattering angle" },
      { symbol: "\\lambda_c", value: "0.0243 Å = 0.00243 nm", description: "Compton wavelength" }
    ],
    targetUnknown: "Fractional change % (\\Delta\\lambda/\\lambda \\times 100)",
    expectedValue: 6.07,
    units: "%",
    tolerance: 0.03,
    governingFormula: "\\frac{\\Delta\\lambda}{\\lambda} = \\frac{\\lambda_c (1 - \\cos 90^\\circ)}{\\lambda} = \\frac{\\lambda_c}{\\lambda}",
    pitfallWarning: "At theta = 90°, cos(90°) = 0, so Delta lambda = lambda_c = 0.0243 Å exactly! Divide by 0.400 Å: 0.0243 / 0.400 = 0.06075 = 6.075%.",
    tips: [
      "At 90 degrees, (1 - cos 90°) = 1, so Delta lambda = lambda_c.",
      "Fractional change is simply lambda_c / lambda = 0.0243 / 0.400 = 0.06075 (6.08%)."
    ],
    progressiveHints: [
      "At \\theta = 90^\\circ, \\Delta\\lambda = \\lambda_c = 0.0243 \\text{ \\AA}.",
      "Fractional shift: \\frac{\\Delta\\lambda}{\\lambda} = \\frac{0.0243 \\text{ \\AA}}{0.400 \\text{ \\AA}}.",
      "Multiply by 100 to obtain percentage: 0.06075 \\times 100 = 6.075\\%."
    ],
    solutionSteps: [
      {
        step: "Compton Shift at 90 Degrees",
        latex: "\\Delta\\lambda = \\frac{h}{m_0 c}(1 - \\cos 90^\\circ) = \\lambda_c (1 - 0) = 0.0243 \\text{ \\AA}",
        explanation: "At 90°, the shift equals the electron Compton wavelength."
      },
      {
        step: "Calculate Fractional Percentage",
        latex: "\\frac{\\Delta\\lambda}{\\lambda} \\times 100\\% = \\frac{0.0243 \\text{ \\AA}}{0.400 \\text{ \\AA}} \\times 100\\% = 6.075\\%",
        explanation: "Wavelength increases by 6.08%."
      }
    ]
  },
  {
    id: "ch1-p13",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: 13,
    officialSource: "Chapter 1 Sheet — Problem 13",
    title: "X-Ray Photon Energy and Momentum",
    topic: "Photon Relativistic Momentum",
    difficulty: "standard",
    points: 15,
    prompt: "An X-ray photon has a wavelength of $\\lambda = 2.00 \\times 10^{-11}\\text{ m}$ ($0.200\\text{ \\AA}$). Find the momentum of this photon in $\\text{kg}\\cdot\\text{m/s}$.",
    given: [
      { symbol: "\\lambda", value: "2.00 \\times 10^{-11} m", description: "Wavelength" },
      { symbol: "h", value: "6.626 \\times 10^{-34} J\\cdot s", description: "Planck constant" }
    ],
    targetUnknown: "Photon Momentum p",
    expectedValue: 3.313e-23,
    units: "kg·m/s",
    tolerance: 0.025,
    governingFormula: "p = \\frac{h}{\\lambda}",
    pitfallWarning: "de Broglie / Einstein relation for photon: p = h / lambda. Express in kg·m/s (e.g. 3.31e-23).",
    tips: [
      "p = (6.626 × 10^-34) / (2.00 × 10^-11) = 3.313 × 10^-23 kg·m/s."
    ],
    progressiveHints: [
      "Use de Broglie momentum formula: p = \\frac{h}{\\lambda}.",
      "Substitute: p = \\frac{6.626 \\times 10^{-34} \\text{ J}\\cdot\\text{s}}{2.00 \\times 10^{-11} \\text{ m}}.",
      "Calculate: p = 3.313 \\times 10^{-23} \\text{ kg}\\cdot\\text{m/s}."
    ],
    solutionSteps: [
      {
        step: "de Broglie Momentum Formula",
        latex: "p = \\frac{h}{\\lambda}",
        explanation: "Photons carry momentum inversely proportional to their wavelength."
      },
      {
        step: "Numerical Evaluation",
        latex: "p = \\frac{6.626 \\times 10^{-34}}{2.00 \\times 10^{-11}} = 3.313 \\times 10^{-23} \\text{ kg}\\cdot\\text{m/s}",
        explanation: "Linear momentum carried by the photon."
      }
    ]
  },
  {
    id: "ch1-ex1-1",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: "Ex 1.1",
    officialSource: "Chapter 1 Sheet — Example (1.1)",
    title: "Human Skin Peak Infrared Wavelength",
    topic: "Wien's Displacement Law",
    difficulty: "introductory",
    points: 10,
    prompt: "The temperature of human skin is approximately $35.0^\\circ\\text{C}$. At what wavelength $\\lambda_{\\max}$ (in micrometers, $\\mu\\text{m}$) does the thermal radiation emitted from the skin reach its peak?",
    given: [
      { symbol: "T", value: "35.0 °C = 308 K", description: "Absolute skin temperature" },
      { symbol: "b", value: "2.898 \\times 10^{-3} m\\cdot K", description: "Wien's displacement constant" }
    ],
    targetUnknown: "Peak Wavelength \\lambda_{\\max}",
    expectedValue: 9.41,
    units: "μm",
    tolerance: 0.025,
    alternateUnits: [
      { unit: "m", multiplier: 1e-6 },
      { unit: "nm", multiplier: 1000 }
    ],
    governingFormula: "\\lambda_{\\max} T = 2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}",
    pitfallWarning: "Always convert Celsius to Kelvin first: T = 273 + 35 = 308 K! Never divide Wien's constant by 35°C.",
    tips: [
      "T = 273 + 35 = 308 K.",
      "lambda_max = 2.898 × 10^-3 / 308 = 9.41 × 10^-6 m = 9.41 μm (Infrared region)."
    ],
    progressiveHints: [
      "Convert temperature from Celsius to Kelvin: T = 35.0 + 273 = 308 \\text{ K}.",
      "Apply Wien's Displacement Law: \\lambda_{\\max} = \\frac{2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}}{308 \\text{ K}}.",
      "Compute in micrometers: \\lambda_{\\max} = 9.409 \\times 10^{-6} \\text{ m} = 9.41 \\text{ }\\mu\\text{m}."
    ],
    solutionSteps: [
      {
        step: "Convert Skin Temperature to Kelvin",
        latex: "T = 273 + 35.0 = 308 \\text{ K}",
        explanation: "Thermodynamic radiation laws require absolute Kelvin temperature."
      },
      {
        step: "Apply Wien's Displacement Law",
        latex: "\\lambda_{\\max} = \\frac{2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}}{308 \\text{ K}} = 9.41 \\times 10^{-6} \\text{ m} = 9.41 \\text{ }\\mu\\text{m}",
        explanation: "Human skin radiates most strongly in the mid-infrared at 9.41 μm."
      }
    ]
  },
  {
    id: "ch1-ex1-3",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: "Ex 1.3",
    officialSource: "Chapter 1 Sheet — Example (1.3)",
    title: "North-Star Surface Temperature & Radiated Power",
    topic: "Wien's & Stefan-Boltzmann Laws",
    difficulty: "standard",
    points: 15,
    prompt: "Assuming stars behave as ideal blackbodies, the North Star (Polaris) has a peak emission wavelength of $\\lambda_{\\max} = 3500\\text{ \\AA}$ ($3.50 \\times 10^{-7}\\text{ m}$). Using Wien's and Stefan-Boltzmann's laws ($\sigma = 5.67 \\times 10^{-8}\\text{ W}\\cdot\\text{m}^{-2}\\cdot\\text{K}^{-4}$), determine the power radiated from $1.00\\text{ cm}^2$ of the North Star's surface in kilo-Watts ($\\text{kW}$).",
    given: [
      { symbol: "\\lambda_{\\max}", value: "3500 Å = 3.50 \\times 10^{-7} m", description: "Peak wavelength of North Star" },
      { symbol: "A", value: "1.00 cm² = 1.00 \\times 10^{-4} m²", description: "Surface patch area" },
      { symbol: "\\sigma", value: "5.67 \\times 10^{-8} W\\cdot m^{-2}\\cdot K^{-4}", description: "Stefan-Boltzmann constant" }
    ],
    targetUnknown: "Radiated Power P from 1 cm²",
    expectedValue: 26.9,
    units: "kW",
    tolerance: 0.04,
    alternateUnits: [
      { unit: "W", multiplier: 1000 }
    ],
    governingFormula: "T = \\frac{2.898 \\times 10^{-3}}{\\lambda_{\\max}}, \\quad P = I \\times A = \\sigma T^4 A",
    pitfallWarning: "In the official sheet solution, T = 2.898e-3 / 3500e-10 = 8280 K ≈ 8300 K. Using T = 8300 K gives I = 2.69 × 10^8 W/m² and P = I × (10^-4 m²) = 26.9 × 10^3 W = 26.9 kW.",
    tips: [
      "1 Å = 10^-10 m, so 3500 Å = 3.50 × 10^-7 m.",
      "T ≈ 8300 K (rounded as in Example 1.3).",
      "I = (5.67 × 10^-8)(8300)^4 = 2.69 × 10^8 W/m²; multiply by 10^-4 m² to get 26.9 kW."
    ],
    progressiveHints: [
      "Find surface temperature: T = \\frac{2.898 \\times 10^{-3}}{3500 \\times 10^{-10}} \\approx 8300 \\text{ K}.",
      "Compute intensity via Stefan-Boltzmann law: I = \\sigma T^4 = (5.67 \\times 10^{-8})(8300)^4 = 2.69 \\times 10^8 \\text{ W/m}^2.",
      "Multiply by area A = 1 \\text{ cm}^2 = 10^{-4} \\text{ m}^2: P = 2.69 \\times 10^4 \\text{ W} = 26.9 \\text{ kW}."
    ],
    solutionSteps: [
      {
        step: "Surface Temperature from Wien's Law",
        latex: "T = \\frac{2.898 \\times 10^{-3}}{3500 \\times 10^{-10}} = 8280 \\text{ K} \\approx 8300 \\text{ K}",
        explanation: "Following the official sheet rounding T = 8300 K."
      },
      {
        step: "Radiant Intensity at Star Surface",
        latex: "I = \\sigma T^4 = (5.67 \\times 10^{-8})(8300)^4 = 2.69 \\times 10^8 \\text{ W/m}^2",
        explanation: "Power emitted per square meter."
      },
      {
        step: "Power Emitted from 1 cm² Patch",
        latex: "P = I \\times A = (2.69 \\times 10^8 \\text{ W/m}^2)(1.00 \\times 10^{-4} \\text{ m}^2) = 26.9 \\times 10^3 \\text{ W} = 26.9 \\text{ kW}",
        explanation: "26.9 kW is radiated per square centimeter."
      }
    ]
  },
  {
    id: "ch1-ex1-6",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: "Ex 1.6",
    officialSource: "Chapter 1 Sheet — Example (1.6)",
    title: "Photoelectron Stopping by Uniform Electric Field",
    topic: "Photoelectric Stopping Voltage & Kinematics",
    difficulty: "standard",
    points: 15,
    prompt: "Electrons emitted from a zinc surface are brought to rest by a uniform electric field of $E = 16.0\\text{ N/C}$ over a stopping distance of $d = 3.00\\text{ cm}$. Given the electron mass $m_e = 9.10 \\times 10^{-31}\\text{ kg}$, find the maximum velocity $v_{\\max}$ of the emitted photoelectrons in $\\text{m/s}$.",
    given: [
      { symbol: "E", value: "16.0 N/C", description: "Uniform retarding electric field" },
      { symbol: "d", value: "3.00 cm = 0.0300 m", description: "Stopping distance" },
      { symbol: "m_e", value: "9.10 \\times 10^{-31} kg", description: "Electron mass" }
    ],
    targetUnknown: "Maximum Electron Velocity v_{\\max}",
    expectedValue: 4.11e5,
    units: "m/s",
    tolerance: 0.03,
    governingFormula: "V_0 = E d, \\quad K_{\\max} = e V_0 = \\frac{1}{2} m_e v_{\\max}^2 \\implies v_{\\max} = \\sqrt{\\frac{2 e E d}{m_e}}",
    pitfallWarning: "First compute stopping potential V_0 = E * d = 16 * 0.03 = 0.48 V. Then K_max = (1.6e-19)(0.48) = 7.68 × 10^-20 J, and v = sqrt(2 * K_max / m_e) = 4.1 × 10^5 m/s.",
    tips: [
      "V_0 = E × d = (16 N/C)(0.03 m) = 0.48 V.",
      "K_max = e V_0 = 7.68 × 10^-20 J.",
      "v = sqrt(2(7.68 × 10^-20) / 9.1 × 10^-31) = 4.11 × 10^5 m/s."
    ],
    progressiveHints: [
      "Calculate stopping potential from uniform electric field: V_0 = E \\cdot d = (16 \\text{ N/C})(0.03 \\text{ m}) = 0.48 \\text{ V}.",
      "Convert to maximum kinetic energy in Joules: K_{\\max} = e V_0 = (1.60 \\times 10^{-19} \\text{ C})(0.48 \\text{ V}) = 7.68 \\times 10^{-20} \\text{ J}.",
      "Solve for velocity: v = \\sqrt{\\frac{2 K_{\\max}}{m_e}} = \\sqrt{\\frac{2(7.68 \\times 10^{-20})}{9.10 \\times 10^{-31}}} = 4.11 \\times 10^5 \\text{ m/s}."
    ],
    solutionSteps: [
      {
        step: "Determine Stopping Potential V_0",
        latex: "V_0 = E d = (16.0 \\text{ N/C})(0.0300 \\text{ m}) = 0.480 \\text{ V}",
        explanation: "Potential difference across the 3.0 cm uniform retarding zone."
      },
      {
        step: "Compute Maximum Kinetic Energy in Joules",
        latex: "K_{\\max} = e V_0 = (1.60 \\times 10^{-19} \\text{ C})(0.480 \\text{ V}) = 7.68 \\times 10^{-20} \\text{ J}",
        explanation: "Work done by the electric field equals the initial maximum kinetic energy."
      },
      {
        step: "Calculate Maximum Electron Velocity",
        latex: "v_{\\max} = \\sqrt{\\frac{2 K_{\\max}}{m_e}} = \\sqrt{\\frac{2(7.68 \\times 10^{-20})}{9.10 \\times 10^{-31}}} = 4.11 \\times 10^5 \\text{ m/s}",
        explanation: "Matches Example (1.6): v = 4.1 × 10^5 m/s."
      }
    ]
  },
  {
    id: "ch1-p6c",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: 6,
    officialSource: "Chapter 1 Sheet — Problem 6",
    title: "Photon Energy Across Microwave, Visible & X-Ray Regimes",
    topic: "Planck Photon Energy Spectrum",
    difficulty: "introductory",
    points: 10,
    prompt: "Calculate the energy in electron-volts (eV) of an X-ray photon having a wavelength of $\\lambda = 5.00\\text{ nm}$ (Part c of Problem 6; compare with microwave $5.00\\text{ cm} \\to 2.48 \\times 10^{-5}\\text{ eV}$ and visible $500\\text{ nm} \\to 2.48\\text{ eV}$).",
    given: [
      { symbol: "\\lambda_a", value: "5.00 cm (Microwave)", description: "E_a = 2.48 × 10^-5 eV" },
      { symbol: "\\lambda_b", value: "500 nm (Visible)", description: "E_b = 2.48 eV" },
      { symbol: "\\lambda_c", value: "5.00 nm (X-ray)", description: "Target X-ray wavelength" }
    ],
    targetUnknown: "X-ray Photon Energy E_c",
    expectedValue: 248,
    units: "eV",
    tolerance: 0.025,
    governingFormula: "E(\\text{eV}) = \\frac{hc}{\\lambda} = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{\\lambda(\\text{nm})}",
    pitfallWarning: "Using hc = 1240 eV·nm: for 5.00 nm, E = 1240 / 5.00 = 248 eV! Notice how shrinking wavelength by 100x (from 500 nm to 5 nm) increases photon energy by 100x (from 2.48 eV to 248 eV).",
    tips: [
      "a) Microwave (5.00 cm = 5 × 10^7 nm): E = 1240 / 5e7 = 2.48 × 10^-5 eV.",
      "b) Visible (500 nm): E = 1240 / 500 = 2.48 eV.",
      "c) X-ray (5.00 nm): E = 1240 / 5.00 = 248 eV."
    ],
    progressiveHints: [
      "Use the rapid eV·nm conversion: E = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{\\lambda(\\text{nm})}.",
      "Substitute \\lambda = 5.00 \\text{ nm}.",
      "Evaluate: E = \\frac{1240}{5.00} = 248 \\text{ eV}."
    ],
    solutionSteps: [
      {
        step: "Part (a): Microwave Photon (λ = 5.00 cm)",
        latex: "E_a = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{5.00 \\times 10^7 \\text{ nm}} = 2.48 \\times 10^{-5} \\text{ eV}",
        explanation: "Low-energy microwave quantum."
      },
      {
        step: "Part (b): Visible Light Photon (λ = 500 nm)",
        latex: "E_b = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{500 \\text{ nm}} = 2.48 \\text{ eV}",
        explanation: "Green-cyan optical quantum."
      },
      {
        step: "Part (c): Soft X-Ray Photon (λ = 5.00 nm)",
        latex: "E_c = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{5.00 \\text{ nm}} = 248 \\text{ eV}",
        explanation: "Soft X-ray quantum."
      }
    ]
  },
  {
    id: "ch1-p7",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: 7,
    officialSource: "Chapter 1 Sheet — Problem 7",
    title: "Blackbody Temperature from Peak Frequency",
    topic: "Wien's Law in Frequency Domain",
    difficulty: "standard",
    points: 15,
    prompt: "A certain light source is found to emit radiation whose peak value has a frequency of $f_{\\max} = 1.00 \\times 10^{15}\\text{ Hz}$. Find the temperature $T$ of the source in Kelvin assuming it behaves as a blackbody radiator (using $\\lambda = c / f$).",
    given: [
      { symbol: "f", value: "1.00 \\times 10^{15} Hz", description: "Peak radiation frequency" },
      { symbol: "c", value: "3.00 \\times 10^8 m/s", description: "Speed of light" },
      { symbol: "b", value: "2.898 \\times 10^{-3} m\\cdot K", description: "Wien's constant" }
    ],
    targetUnknown: "Blackbody Temperature T",
    expectedValue: 9660,
    units: "K",
    tolerance: 0.03,
    governingFormula: "\\lambda_{\\max} = \\frac{c}{f} = 3.00 \\times 10^{-7}\\text{ m}, \\quad T = \\frac{2.898 \\times 10^{-3}}{\\lambda_{\\max}}",
    pitfallWarning: "First convert frequency to wavelength: lambda = c / f = (3.00 × 10^8) / (1.00 × 10^15) = 3.00 × 10^-7 m (300 nm). Then apply Wien's law: T = 2.898e-3 / 3.00e-7 = 9660 K.",
    tips: [
      "lambda = c / f = 300 nm = 3.00 × 10^-7 m.",
      "T = 2.898 × 10^-3 / (3.00 × 10^-7) = 9660 K."
    ],
    progressiveHints: [
      "Find the wavelength corresponding to f = 1.00 \\times 10^{15} \\text{ Hz}: \\lambda = \\frac{c}{f} = 3.00 \\times 10^{-7} \\text{ m}.",
      "Substitute into Wien's displacement law: T = \\frac{2.898 \\times 10^{-3}}{\\lambda}.",
      "Calculate: T = \\frac{2.898 \\times 10^{-3}}{3.00 \\times 10^{-7}} = 9660 \\text{ K}."
    ],
    solutionSteps: [
      {
        step: "Convert Peak Frequency to Wavelength",
        latex: "\\lambda = \\frac{c}{f} = \\frac{3.00 \\times 10^8 \\text{ m/s}}{1.00 \\times 10^{15} \\text{ s}^{-1}} = 3.00 \\times 10^{-7} \\text{ m} = 300 \\text{ nm}",
        explanation: "Corresponding ultraviolet wavelength."
      },
      {
        step: "Apply Wien's Displacement Law",
        latex: "T = \\frac{2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}}{3.00 \\times 10^{-7} \\text{ m}} = 9660 \\text{ K}",
        explanation: "Surface temperature of the blackbody radiator."
      }
    ]
  },
  {
    id: "ch1-p9",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: 9,
    officialSource: "Chapter 1 Sheet — Problem 9",
    title: "Photoelectric Effect on Potassium Metal",
    topic: "Photoelectric Kinetic Energy & Cutoff Wavelength",
    difficulty: "standard",
    points: 15,
    prompt: "The work function for potassium is $\\phi = 2.24\\text{ eV}$. If potassium metal is illuminated with light of wavelength $\\lambda = 350\\text{ nm}$, find:\n(a) The maximum kinetic energy $K_{\\max}$ of the photoelectrons in eV (enter this value below), and\n(b) The cutoff wavelength $\\lambda_c$ in nm.",
    given: [
      { symbol: "\\phi", value: "2.24 eV", description: "Potassium work function" },
      { symbol: "\\lambda", value: "350 nm", description: "Incident wavelength" },
      { symbol: "hc", value: "1240 eV\\cdot nm", description: "Planck-speed product" }
    ],
    targetUnknown: "Maximum Kinetic Energy K_{\\max}",
    expectedValue: 1.30,
    units: "eV",
    tolerance: 0.03,
    governingFormula: "K_{\\max} = \\frac{hc}{\\lambda} - \\phi, \\quad \\lambda_c = \\frac{hc}{\\phi}",
    pitfallWarning: "E_photon = 1240 / 350 = 3.543 eV. Subtract phi = 2.24 eV to get K_max = 1.303 eV. For part (b), cutoff wavelength is lambda_c = 1240 / 2.24 = 553.6 nm.",
    tips: [
      "Incident photon energy: E = 1240 / 350 = 3.543 eV.",
      "Part (a): K_max = 3.543 - 2.24 = 1.303 eV.",
      "Part (b): Cutoff wavelength lambda_c = 1240 / 2.24 = 553.6 nm."
    ],
    progressiveHints: [
      "Compute incident photon energy: E = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{350 \\text{ nm}} = 3.543 \\text{ eV}.",
      "Subtract potassium's work function: K_{\\max} = 3.543 - 2.24 = 1.303 \\text{ eV}.",
      "Cutoff wavelength: \\lambda_c = \\frac{1240}{2.24} = 553.6 \\text{ nm}."
    ],
    solutionSteps: [
      {
        step: "Part (a): Incident Photon Energy & Maximum Kinetic Energy",
        latex: "E = \\frac{1240}{350} = 3.543 \\text{ eV} \\implies K_{\\max} = 3.543 - 2.24 = 1.303 \\text{ eV}",
        explanation: "Fastest photoelectrons leave with 1.30 eV."
      },
      {
        step: "Part (b): Threshold Cutoff Wavelength",
        latex: "\\lambda_c = \\frac{hc}{\\phi} = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{2.24 \\text{ eV}} = 553.6 \\text{ nm}",
        explanation: "Light with wavelength longer than 554 nm cannot eject electrons from potassium."
      }
    ]
  },
  {
    id: "ch1-p14",
    chapterId: "ch1",
    sheetNumber: 1,
    questionNumber: 14,
    officialSource: "Chapter 1 Sheet — Problem 14",
    title: "0.2 MeV Photon Beam Compton Scattering on Carbon",
    topic: "High-Energy Compton Scattering",
    difficulty: "exam-hall",
    points: 20,
    prompt: "A beam of $E_0 = 0.200\\text{ MeV}$ ($200\\text{ keV}$) photons is scattered by electrons in a carbon target. Calculate:\n(a) The incident wavelength $\\lambda_0$ (in pm),\n(b) The wavelength $\\lambda_{90^\\circ}$ scattered at $90^\\circ$ (in pm), and\n(c) The energy $E'$ (in MeV) of the scattered photons that emerge at an angle of $\\theta = 60^\\circ$ relative to the incident direction (enter $E'$ in MeV below).",
    given: [
      { symbol: "E_0", value: "0.200 MeV = 2.00 \\times 10^5 eV", description: "Incident photon energy" },
      { symbol: "\\theta", value: "60° (part c) and 90° (part b)", description: "Scattering angles" },
      { symbol: "\\lambda_c", value: "2.426 pm = 0.002426 nm", description: "Compton wavelength" }
    ],
    targetUnknown: "Scattered Photon Energy E' at 60°",
    expectedValue: 0.167,
    units: "MeV",
    tolerance: 0.03,
    alternateUnits: [
      { unit: "keV", multiplier: 1000 }
    ],
    governingFormula: "E' = \\frac{E_0}{1 + \\frac{E_0}{m_0 c^2}(1 - \\cos\\theta)} \\quad \\text{or} \\quad \\lambda' = \\lambda_0 + \\lambda_c(1 - \\cos\\theta)",
    pitfallWarning: "Part (a): lambda_0 = 1240 eV·nm / 200,000 eV = 0.00620 nm = 6.20 pm. Part (b): at 90°, lambda' = 6.20 + 2.43 = 8.63 pm. Part (c): at 60°, cos(60°) = 0.5, so Delta lambda = 2.426 * 0.5 = 1.213 pm => lambda'_{60} = 6.20 + 1.213 = 7.413 pm => E' = 1.240 MeV·pm / 7.413 pm = 0.167 MeV.",
    tips: [
      "a) lambda_0 = hc / E_0 = 6.20 pm.",
      "b) At 90°, lambda' = 6.20 + 2.43 = 8.63 pm.",
      "c) At 60°, 1 - cos(60°) = 0.5 => lambda' = 6.20 + 1.213 = 7.413 pm => E' = 0.167 MeV."
    ],
    progressiveHints: [
      "Part (a): \\lambda_0 = \\frac{hc}{E_0} = \\frac{1.240 \\times 10^{-3} \\text{ MeV}\\cdot\\text{nm}}{0.200 \\text{ MeV}} = 0.00620 \\text{ nm} = 6.20 \\text{ pm}.",
      "Part (b) at 90^\\circ: \\lambda'_{90} = \\lambda_0 + \\lambda_c = 6.20 + 2.43 = 8.63 \\text{ pm}.",
      "Part (c) at 60^\\circ: \\lambda'_{60} = 6.20 + 2.426(1 - \\cos 60^\\circ) = 7.413 \\text{ pm} \\implies E' = \\frac{1.240 \\text{ MeV}\\cdot\\text{pm}}{7.413 \\text{ pm}} = 0.167 \\text{ MeV}."
    ],
    solutionSteps: [
      {
        step: "Part (a): Incident Wavelength of 0.2 MeV Photons",
        latex: "\\lambda_0 = \\frac{hc}{E_0} = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{2.00 \\times 10^5 \\text{ eV}} = 0.00620 \\text{ nm} = 6.20 \\text{ pm}",
        explanation: "Initial hard X-ray / gamma wavelength."
      },
      {
        step: "Part (b): Wavelength Scattered at θ = 90°",
        latex: "\\lambda'_{90^\\circ} = \\lambda_0 + \\lambda_c(1 - \\cos 90^\\circ) = 6.20 \\text{ pm} + 2.43 \\text{ pm} = 8.63 \\text{ pm}",
        explanation: "At 90°, the shift equals one Compton wavelength."
      },
      {
        step: "Part (c): Energy of Photons Emerging at θ = 60°",
        latex: "\\lambda'_{60^\\circ} = 6.20 + 2.426(1 - 0.5) = 7.413 \\text{ pm} \\implies E' = \\frac{hc}{\\lambda'_{60^\\circ}} = 0.167 \\text{ MeV}",
        explanation: "Scattered photon emerges at 60° with 0.167 MeV (167 keV)."
      }
    ]
  },

  // =========================================================================
  // CHAPTER 2: WAVE MECHANICS, UNCERTAINTY & QUANTUM WELLS
  // (Source: Assignment_2__2__dcba3e45.pdf)
  // =========================================================================
  {
    id: "ch2-p1a",
    chapterId: "ch2",
    sheetNumber: 2,
    questionNumber: "1(a)",
    officialSource: "Assignment 2 — Problem 1(a)",
    title: "de Broglie Wavelength of 10 kV Accelerated Electron",
    topic: "de Broglie Wavelength",
    difficulty: "standard",
    points: 15,
    prompt: "An electron is accelerated from rest through an electric potential difference of $V = 10.0\\text{ kV}$ ($10^4\\text{ V}$). Calculate its de Broglie wavelength $\\lambda$ in Angstroms ($\\text{\\AA}$).",
    given: [
      { symbol: "V", value: "10^4 V", description: "Accelerating voltage" },
      { symbol: "m_e", value: "9.109 \\times 10^{-31} kg", description: "Electron mass" },
      { symbol: "e", value: "1.602 \\times 10^{-19} C", description: "Elementary charge" },
      { symbol: "h", value: "6.626 \\times 10^{-34} J\\cdot s", description: "Planck constant" }
    ],
    targetUnknown: "de Broglie Wavelength \\lambda",
    expectedValue: 0.123,
    units: "Å",
    tolerance: 0.03,
    alternateUnits: [
      { unit: "nm", multiplier: 0.1 },
      { unit: "m", multiplier: 1e-10 }
    ],
    governingFormula: "\\lambda = \\frac{h}{\\sqrt{2 m_e e V}} = \\frac{12.27}{\\sqrt{V(\\text{Volts})}} \\text{ \\AA}",
    pitfallWarning: "Fast shortcut for non-relativistic electron: lambda = 12.27 / sqrt(V) in Angstroms. For V = 10000 V: sqrt(10000) = 100, so lambda = 12.27 / 100 = 0.1227 Å.",
    tips: [
      "Shortcut formula: lambda (in Å) = sqrt(150 / V) = 12.27 / sqrt(V).",
      "For V = 10,000 V: lambda = 12.27 / 100 = 0.1227 Å."
    ],
    progressiveHints: [
      "Kinetic energy acquired is K = eV = 10^4 \\text{ eV} = 1.602 \\times 10^{-15} \\text{ J}.",
      "Momentum p = \\sqrt{2mK} = \\sqrt{2(9.109 \\times 10^{-31})(1.602 \\times 10^{-15})} = 5.40 \\times 10^{-23} \\text{ kg}\\cdot\\text{m/s}.",
      "\\lambda = \\frac{h}{p} = \\frac{6.626 \\times 10^{-34}}{5.40 \\times 10^{-23}} = 1.227 \\times 10^{-11} \\text{ m} = 0.1227 \\text{ \\AA}."
    ],
    solutionSteps: [
      {
        step: "Relate Kinetic Energy to Potential",
        latex: "K = e V = 10^4 \\text{ eV} = 1.602 \\times 10^{-15} \\text{ J}",
        explanation: "Electric potential energy converts entirely into kinetic energy."
      },
      {
        step: "Compute Momentum",
        latex: "p = \\sqrt{2m_e K} = \\sqrt{2(9.109 \\times 10^{-31})(1.602 \\times 10^{-15})} = 5.399 \\times 10^{-23} \\text{ kg}\\cdot\\text{m/s}",
        explanation: "Non-relativistic electron momentum (K << m_0 c^2 = 511 keV)."
      },
      {
        step: "Compute de Broglie Wavelength",
        latex: "\\lambda = \\frac{h}{p} = \\frac{6.626 \\times 10^{-34}}{5.399 \\times 10^{-23}} = 1.227 \\times 10^{-11} \\text{ m} = 0.1227 \\text{ \\AA}",
        explanation: "Wavelength is 0.123 Å (comparable to atomic crystal lattice spacing)."
      }
    ]
  },
  {
    id: "ch2-p1b",
    chapterId: "ch2",
    sheetNumber: 2,
    questionNumber: "1(b)",
    officialSource: "Assignment 2 — Problem 1(b)",
    title: "de Broglie Wavelength of Macroscopic Grain of Sand",
    topic: "Macroscopic de Broglie Limit",
    difficulty: "introductory",
    points: 10,
    prompt: "Calculate the de Broglie wavelength in meters of a macroscopic grain of sand having mass $m = 1.00\\text{ mg}$ ($1.00 \\times 10^{-6}\\text{ kg}$) moving at a velocity of $v = 50.0\\text{ m/s}$.",
    given: [
      { symbol: "m", value: "1.00 mg = 1.00 \\times 10^{-6} kg", description: "Mass of sand grain" },
      { symbol: "v", value: "50.0 m/s", description: "Velocity" },
      { symbol: "h", value: "6.626 \\times 10^{-34} J\\cdot s", description: "Planck constant" }
    ],
    targetUnknown: "de Broglie Wavelength \\lambda",
    expectedValue: 1.325e-29,
    units: "m",
    tolerance: 0.025,
    governingFormula: "\\lambda = \\frac{h}{p} = \\frac{h}{m v}",
    pitfallWarning: "Convert 1 mg to kg: 1 mg = 10^-3 g = 10^-6 kg! p = mv = (10^-6)(50) = 5 × 10^-5 kg·m/s.",
    tips: [
      "Macroscopic objects have imperceptibly tiny wavelengths (around 10^-29 m), explaining why quantum wave phenomena are unobservable in everyday life."
    ],
    progressiveHints: [
      "Convert mass: 1 \\text{ mg} = 10^{-6} \\text{ kg}.",
      "Calculate momentum: p = m v = (1.00 \\times 10^{-6} \\text{ kg})(50.0 \\text{ m/s}) = 5.00 \\times 10^{-5} \\text{ kg}\\cdot\\text{m/s}.",
      "Divide: \\lambda = \\frac{6.626 \\times 10^{-34}}{5.00 \\times 10^{-5}} = 1.325 \\times 10^{-29} \\text{ m}."
    ],
    solutionSteps: [
      {
        step: "Convert Mass to SI Units",
        latex: "m = 1.00 \\text{ mg} = 1.00 \\times 10^{-6} \\text{ kg}",
        explanation: "1 mg = 10^-6 kg."
      },
      {
        step: "Evaluate Linear Momentum",
        latex: "p = m v = (1.00 \\times 10^{-6} \\text{ kg})(50.0 \\text{ m/s}) = 5.00 \\times 10^{-5} \\text{ kg}\\cdot\\text{m/s}",
        explanation: "Classical momentum of the grain."
      },
      {
        step: "Compute de Broglie Wavelength",
        latex: "\\lambda = \\frac{h}{p} = \\frac{6.626 \\times 10^{-34}}{5.00 \\times 10^{-5}} = 1.325 \\times 10^{-29} \\text{ m}",
        explanation: "Unobservably tiny quantum wavelength."
      }
    ]
  },
  {
    id: "ch2-p5",
    chapterId: "ch2",
    sheetNumber: 2,
    questionNumber: 5,
    officialSource: "Assignment 2 — Problem 5",
    title: "1 keV Electron Position vs Momentum Uncertainty %",
    topic: "Heisenberg Uncertainty Principle",
    difficulty: "standard",
    points: 15,
    prompt: "An electron with kinetic energy $K = 1.00\\text{ keV}$ has its position determined along the $x$-axis to within an uncertainty of $\\Delta x = 1.00\\text{ \\AA}$ ($1.00 \\times 10^{-10}\\text{ m}$). Calculate the percentage uncertainty in its momentum $\\frac{\\Delta p}{p} \\times 100\\%$ using Heisenberg's minimum uncertainty relation $\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}$.",
    given: [
      { symbol: "K", value: "1.00 keV = 1000 eV = 1.602 \\times 10^{-16} J", description: "Kinetic energy" },
      { symbol: "\\Delta x", value: "1.00 Å = 1.00 \\times 10^{-10} m", description: "Position uncertainty" },
      { symbol: "\\hbar", value: "1.0546 \\times 10^{-34} J\\cdot s", description: "Reduced Planck constant" },
      { symbol: "m_e", value: "9.109 \\times 10^{-31} kg", description: "Electron rest mass" }
    ],
    targetUnknown: "Percentage Uncertainty (\\Delta p / p) \\times 100",
    expectedValue: 3.08,
    units: "%",
    tolerance: 0.04,
    governingFormula: "\\frac{\\Delta p}{p} \\times 100\\% = \\frac{\\hbar / (2\\Delta x)}{\\sqrt{2 m_e K}} \\times 100\\%",
    pitfallWarning: "Heisenberg's minimum bound uses hbar / 2 (where hbar = h / 2pi = 1.055 × 10^-34 J·s). Delta p = hbar / (2 Delta x) = 5.27 × 10^-25 kg·m/s.",
    tips: [
      "Electron momentum p = sqrt(2 m K) = sqrt(2 × 9.109e-31 × 1.602e-16) = 1.708 × 10^-23 kg·m/s.",
      "Delta p = 1.0546e-34 / (2 × 1e-10) = 5.273 × 10^-25 kg·m/s.",
      "Delta p / p = (5.273e-25 / 1.708e-23) × 100% = 3.087%."
    ],
    progressiveHints: [
      "Calculate electron momentum: p = \\sqrt{2m_e K} = 1.708 \\times 10^{-23} \\text{ kg}\\cdot\\text{m/s}.",
      "Calculate minimum momentum uncertainty: \\Delta p = \\frac{\\hbar}{2\\Delta x} = \\frac{1.0546 \\times 10^{-34}}{2 \\times 10^{-10}} = 5.273 \\times 10^{-25} \\text{ kg}\\cdot\\text{m/s}.",
      "Compute fraction: \\frac{\\Delta p}{p} \\times 100 = \\frac{5.273 \\times 10^{-25}}{1.708 \\times 10^{-23}} \\times 100 = 3.087\\%."
    ],
    solutionSteps: [
      {
        step: "Compute Classical Electron Momentum",
        latex: "p = \\sqrt{2 m_e K} = \\sqrt{2(9.109 \\times 10^{-31} \\text{ kg})(1.602 \\times 10^{-16} \\text{ J})} = 1.708 \\times 10^{-23} \\text{ kg}\\cdot\\text{m/s}",
        explanation: "Momentum corresponding to 1 keV kinetic energy."
      },
      {
        step: "Evaluate Minimum Heisenberg Uncertainty",
        latex: "\\Delta p = \\frac{\\hbar}{2\\Delta x} = \\frac{1.0546 \\times 10^{-34} \\text{ J}\\cdot\\text{s}}{2(1.00 \\times 10^{-10} \\text{ m})} = 5.273 \\times 10^{-25} \\text{ kg}\\cdot\\text{m/s}",
        explanation: "Fundamental quantum limit on momentum knowledge."
      },
      {
        step: "Calculate Fractional Percentage",
        latex: "\\frac{\\Delta p}{p} \\times 100\\% = \\frac{5.273 \\times 10^{-25}}{1.708 \\times 10^{-23}} \\times 100\\% = 3.087\\%",
        explanation: "The minimum momentum uncertainty is approximately 3.09%."
      }
    ]
  },
  {
    id: "ch2-p9",
    chapterId: "ch2",
    sheetNumber: 2,
    questionNumber: 9,
    officialSource: "Assignment 2 — Problem 9",
    title: "Ground State Energy in 0.4 nm Infinite Potential Well",
    topic: "Particle in a 1D Infinite Box",
    difficulty: "standard",
    points: 15,
    prompt: "An electron is confined to an infinite one-dimensional potential well of width $L = 0.400\\text{ nm}$ ($4.00 \\times 10^{-10}\\text{ m}$). Calculate the ground state energy $E_1$ of the electron in electron-volts (eV).",
    given: [
      { symbol: "L", value: "0.400 nm = 4.00 \\times 10^{-10} m", description: "Well width" },
      { symbol: "n", value: "1", description: "Ground state quantum number" },
      { symbol: "m_e", value: "9.109 \\times 10^{-31} kg", description: "Electron rest mass" },
      { symbol: "h", value: "6.626 \\times 10^{-34} J\\cdot s", description: "Planck constant" }
    ],
    targetUnknown: "Ground State Energy E_1",
    expectedValue: 2.35,
    units: "eV",
    tolerance: 0.03,
    governingFormula: "E_n = \\frac{n^2 h^2}{8 m L^2}",
    pitfallWarning: "E_1 in Joules: (6.626e-34)^2 / (8 × 9.109e-31 × (4e-10)^2) = 4.39e-67 / 1.166e-48 = 3.766 × 10^-19 J. Convert to eV by dividing by 1.602 × 10^-19: 3.766e-19 / 1.602e-19 = 2.351 eV.",
    tips: [
      "Shortcut using hc: E_1 = (hc)^2 / (8 m_e c^2 L^2) = (1240 eV·nm)^2 / (8 × 511,000 eV × (0.4 nm)^2) = 2.35 eV."
    ],
    progressiveHints: [
      "Use infinite square well formula: E_1 = \\frac{h^2}{8 m_e L^2}.",
      "Calculate in Joules: E_1 = \\frac{(6.626 \\times 10^{-34})^2}{8(9.109 \\times 10^{-31})(4.00 \\times 10^{-10})^2} = 3.766 \\times 10^{-19} \\text{ J}.",
      "Convert to eV: E_1 = \\frac{3.766 \\times 10^{-19}}{1.602 \\times 10^{-19}} = 2.351 \\text{ eV}."
    ],
    solutionSteps: [
      {
        step: "Infinite Well Quantization Formula",
        latex: "E_1 = \\frac{h^2}{8 m_e L^2}",
        explanation: "Lowest zero-point energy permitted by quantum confinement."
      },
      {
        step: "Substitute Parameters in Joules",
        latex: "E_1 = \\frac{(6.626 \\times 10^{-34} \\text{ J}\\cdot\\text{s})^2}{8(9.109 \\times 10^{-31} \\text{ kg})(4.00 \\times 10^{-10} \\text{ m})^2} = 3.766 \\times 10^{-19} \\text{ J}",
        explanation: "Zero-point energy in SI units."
      },
      {
        step: "Convert to Electron-Volts",
        latex: "E_1 = \\frac{3.766 \\times 10^{-19} \\text{ J}}{1.602 \\times 10^{-19} \\text{ J/eV}} = 2.351 \\text{ eV}",
        explanation: "Ground state energy is 2.35 eV."
      }
    ]
  },
  {
    id: "ch2-p10",
    chapterId: "ch2",
    sheetNumber: 2,
    questionNumber: 10,
    officialSource: "Assignment 2 — Problem 10",
    title: "Quantum Barrier Tunneling Probability",
    topic: "Quantum Tunneling & Transmission Coefficient",
    difficulty: "exam-hall",
    points: 20,
    prompt: "An electron with energy $E = 7.00\\text{ eV}$ is incident upon a rectangular potential barrier of height $U_0 = 12.0\\text{ eV}$ and thickness $L = 0.180\\text{ nm}$ ($1.80 \\times 10^{-10}\\text{ m}$).\nCalculate the quantum transmission coefficient (tunneling probability) $T$ as a percentage (%). (Use $T \\approx 16\\frac{E}{U_0}\\left(1 - \\frac{E}{U_0}\\right) e^{-2\\alpha L}$ where $\\alpha = \\frac{\\sqrt{2m_e(U_0 - E)}}{\\hbar}$).",
    given: [
      { symbol: "E", value: "7.00 eV", description: "Electron kinetic energy" },
      { symbol: "U_0", value: "12.0 eV", description: "Barrier potential height" },
      { symbol: "U_0 - E", value: "5.00 eV = 8.01 \\times 10^{-19} J", description: "Barrier energy deficit" },
      { symbol: "L", value: "0.180 nm = 1.80 \\times 10^{-10} m", description: "Barrier width" }
    ],
    targetUnknown: "Tunneling Probability T as a percentage (%)",
    expectedValue: 6.32,
    units: "%",
    tolerance: 0.05,
    governingFormula: "T \\approx 16\\frac{E}{U_0}\\left(1 - \\frac{E}{U_0}\\right) e^{-2\\alpha L}",
    pitfallWarning: "Pre-factor: 16 * (7/12) * (5/12) = 16 * 0.5833 * 0.4167 = 3.889. Attenuation: alpha = sqrt(2*m*(5 eV*1.602e-19))/1.055e-34 = 1.145e10 m^-1. 2*alpha*L = 2 * 1.145e10 * 1.8e-10 = 4.122. e^-4.122 = 0.0162. T = 3.889 * 0.0162 = 0.0632 = 6.32%.",
    tips: [
      "1. Find barrier deficit: U_0 - E = 5.0 eV.",
      "2. Compute decay constant alpha = 1.145 × 10^10 m^-1.",
      "3. Compute exponent: 2*alpha*L = 4.122.",
      "4. Transmission probability is ~6.3%."
    ],
    progressiveHints: [
      "Calculate \\alpha: \\alpha = \\frac{\\sqrt{2(9.109 \\times 10^{-31})(5.00 \\times 1.602 \\times 10^{-19})}}{1.0546 \\times 10^{-34}} = 1.145 \\times 10^{10} \\text{ m}^{-1}.",
      "Calculate attenuation exponent: 2\\alpha L = 2(1.145 \\times 10^{10})(1.80 \\times 10^{-10}) = 4.122. Then e^{-4.122} = 0.01621.",
      "Calculate prefactor: 16 \\times \\frac{7}{12} \\times \\left(1 - \\frac{7}{12}\\right) = 16 \\times 0.5833 \\times 0.4167 = 3.889. T = 3.889 \\times 0.01621 = 0.0630 = 6.30\\%."
    ],
    solutionSteps: [
      {
        step: "Compute Wavevector Decay Constant alpha",
        latex: "\\alpha = \\frac{\\sqrt{2m_e(U_0 - E)}}{\\hbar} = \\frac{\\sqrt{2(9.109 \\times 10^{-31})(8.01 \\times 10^{-19})}}{1.0546 \\times 10^{-34}} = 1.145 \\times 10^{10} \\text{ m}^{-1}",
        explanation: "Exponential decay coefficient inside the classically forbidden region."
      },
      {
        step: "Calculate Barrier Attenuation Factor",
        latex: "2\\alpha L = 2(1.145 \\times 10^{10} \\text{ m}^{-1})(1.80 \\times 10^{-10} \\text{ m}) = 4.122 \\implies e^{-2\\alpha L} = e^{-4.122} = 0.01621",
        explanation: "Penetration attenuation across barrier thickness."
      },
      {
        step: "Calculate Pre-exponential Coefficient",
        latex: "16 \\left(\\frac{E}{U_0}\\right)\\left(1 - \\frac{E}{U_0}\\right) = 16 \\left(\\frac{7}{12}\\right)\\left(\\frac{5}{12}\\right) = 3.8889",
        explanation: "Impedance mismatch transmission factor."
      },
      {
        step: "Compute Final Transmission Probability",
        latex: "T = 3.8889 \\times 0.01621 = 0.06304 = 6.30\\%",
        explanation: "The electron has a 6.3% chance of tunneling through the barrier."
      }
    ]
  },
  {
    id: "ch2-p11",
    chapterId: "ch2",
    sheetNumber: 2,
    questionNumber: 11,
    officialSource: "Assignment 2 — Problem 11",
    title: "1D Infinite Well Width from Quantum Transition",
    topic: "Quantum Well Energy Level Transitions",
    difficulty: "standard",
    points: 15,
    prompt: "An electron trapped in an infinite 1D potential well makes a radiative quantum transition from the first excited state ($n = 2$) to the ground state ($n = 1$). During this transition, a photon of wavelength $\\lambda = 693.9\\text{ nm}$ is emitted. Determine the width $L$ of the well in nanometers.",
    given: [
      { symbol: "n_i \\to n_f", value: "2 \\to 1", description: "Quantum transition" },
      { symbol: "\\lambda", value: "693.9 nm", description: "Emitted photon wavelength" },
      { symbol: "hc", value: "1240 eV\\cdot nm", description: "Energy constant" },
      { symbol: "m_e c^2", value: "511,000 eV", description: "Electron rest energy" }
    ],
    targetUnknown: "Well Width L",
    expectedValue: 0.795,
    units: "nm",
    tolerance: 0.03,
    alternateUnits: [
      { unit: "Å", multiplier: 10 }
    ],
    governingFormula: "\\Delta E = E_2 - E_1 = \\frac{(2^2 - 1^2) h^2}{8 m_e L^2} = \\frac{3 h^2}{8 m_e L^2} = \\frac{hc}{\\lambda}",
    pitfallWarning: "Transition energy Delta E = 1240 / 693.9 = 1.787 eV. 3 h^2 / (8 m L^2) = Delta E => L = sqrt(3 h^2 / (8 m Delta E)) = 0.795 nm.",
    tips: [
      "E_2 - E_1 = (4 - 1) E_1 = 3 E_1.",
      "Delta E = 1240 / 693.9 = 1.787 eV.",
      "Therefore E_1 = Delta E / 3 = 0.5957 eV.",
      "L = sqrt(hc^2 / (8 m_e c^2 E_1)) = 0.795 nm."
    ],
    progressiveHints: [
      "Find transition energy: \\Delta E = \\frac{1240}{693.9} = 1.787 \\text{ eV} = 2.863 \\times 10^{-19} \\text{ J}.",
      "Express in terms of ground state energy: \\Delta E = E_2 - E_1 = 3 E_1 \\implies E_1 = \\frac{1.787}{3} = 0.5957 \\text{ eV}.",
      "Isolate L from E_1 = \\frac{h^2}{8 m_e L^2}: L = \\sqrt{\\frac{h^2}{8 m_e E_1}} = 0.795 \\text{ nm}."
    ],
    solutionSteps: [
      {
        step: "Find Emitted Photon Energy",
        latex: "\\Delta E = \\frac{hc}{\\lambda} = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{693.9 \\text{ nm}} = 1.787 \\text{ eV} = 2.863 \\times 10^{-19} \\text{ J}",
        explanation: "Energy released by the radiative transition."
      },
      {
        step: "Relate to Level Difference",
        latex: "\\Delta E = E_2 - E_1 = (2^2 - 1^2) E_1 = 3 E_1 \\implies E_1 = \\frac{1.787 \\text{ eV}}{3} = 0.5957 \\text{ eV}",
        explanation: "Ground state energy is one third of the transition energy."
      },
      {
        step: "Solve for Well Width L",
        latex: "L = \\sqrt{\\frac{h^2}{8 m_e E_1}} = \\sqrt{\\frac{(6.626 \\times 10^{-34})^2}{8(9.109 \\times 10^{-31})(0.5957 \\times 1.602 \\times 10^{-19})}} = 7.95 \\times 10^{-10} \\text{ m} = 0.795 \\text{ nm}",
        explanation: "The quantum well width is 0.795 nm (7.95 Å)."
      }
    ]
  },
  {
    id: "ch2-p13",
    chapterId: "ch2",
    sheetNumber: 2,
    questionNumber: 13,
    officialSource: "Assignment 2 — Problem 13",
    title: "1D Quantum Well in Silicon Nanostructure",
    topic: "Effective Mass & Nanoscale Confinement",
    difficulty: "standard",
    points: 15,
    prompt: "An electron is trapped in a 1D silicon quantum well of width $L = 1.00\\,\\mu\\text{m}$ ($1.00 \\times 10^{-6}\\text{ m}$). The conduction electron effective mass in silicon is $m^* = 0.26 m_e = 2.368 \\times 10^{-31}\\text{ kg}$. Calculate the lowest kinetic energy $E_1$ of this electron in micro-electron-volts ($\\mu\\text{eV}$).",
    given: [
      { symbol: "L", value: "1.00 μm = 1.00 \\times 10^{-6} m", description: "Well width" },
      { symbol: "m^*", value: "0.26 m_e = 2.368 \\times 10^{-31} kg", description: "Silicon electron effective mass" },
      { symbol: "h", value: "6.626 \\times 10^{-34} J\\cdot s", description: "Planck constant" }
    ],
    targetUnknown: "Ground State Energy E_1 in \\mu eV",
    expectedValue: 1.45,
    units: "μeV",
    tolerance: 0.04,
    alternateUnits: [
      { unit: "eV", multiplier: 1e-6 }
    ],
    governingFormula: "E_1 = \\frac{h^2}{8 m^* L^2}",
    pitfallWarning: "Remember to use effective mass m* = 0.26 * 9.109e-31 = 2.368e-31 kg. E_1 = (6.626e-34)^2 / (8 * 2.368e-31 * 1e-12) = 2.316e-25 J. In eV: 2.316e-25 / 1.602e-19 = 1.446e-6 eV = 1.45 μeV.",
    tips: [
      "1 μeV = 10^-6 eV.",
      "The larger width (1 μm) results in very small energy spacing (micro-eV scale)."
    ],
    progressiveHints: [
      "Compute effective mass: m^* = 0.26 \\times (9.109 \\times 10^{-31}) = 2.368 \\times 10^{-31} \\text{ kg}.",
      "Calculate E_1 in Joules: E_1 = \\frac{(6.626 \\times 10^{-34})^2}{8(2.368 \\times 10^{-31})(1.00 \\times 10^{-6})^2} = 2.316 \\times 10^{-25} \\text{ J}.",
      "Convert to \\mu\\text{eV}: \\frac{2.316 \\times 10^{-25}}{1.602 \\times 10^{-19}} = 1.446 \\times 10^{-6} \\text{ eV} = 1.45 \\text{ }\\mu\\text{eV}."
    ],
    solutionSteps: [
      {
        step: "Effective Mass Calculation",
        latex: "m^* = 0.26 \\times 9.109 \\times 10^{-31} \\text{ kg} = 2.368 \\times 10^{-31} \\text{ kg}",
        explanation: "Silicon lattice periodic potential alters the effective inertial mass."
      },
      {
        step: "Ground State Energy in Joules",
        latex: "E_1 = \\frac{h^2}{8 m^* L^2} = \\frac{(6.626 \\times 10^{-34})^2}{8(2.368 \\times 10^{-31})(1.00 \\times 10^{-6})^2} = 2.316 \\times 10^{-25} \\text{ J}",
        explanation: "Quantum confinement energy."
      },
      {
        step: "Convert to Micro-electron-volts",
        latex: "E_1 = \\frac{2.316 \\times 10^{-25} \\text{ J}}{1.602 \\times 10^{-19} \\text{ J/eV}} = 1.446 \\times 10^{-6} \\text{ eV} = 1.446 \\text{ }\\mu\\text{eV}",
        explanation: "Energy is 1.45 μeV (or 0.376 μeV with free electron mass m_e, corresponding to v = 364 m/s)."
      }
    ]
  },
  {
    id: "ch2-p2c",
    chapterId: "ch2",
    sheetNumber: 2,
    questionNumber: 2,
    officialSource: "Assignment 2 — Problem 2(a, b, c)",
    title: "de Broglie Wavelength of Baseball, Proton & Electron at 44 m/s",
    topic: "de Broglie Matter Waves Across Mass Scales",
    difficulty: "introductory",
    points: 10,
    prompt: "Compare the de Broglie wavelengths of three objects all moving at the same speed $v = 44.0\\text{ m/s}$:\n(a) A $0.140\\text{ kg}$ baseball,\n(b) A proton ($m_p = 1.673 \\times 10^{-27}\\text{ kg}$), and\n(c) An electron ($m_e = 9.109 \\times 10^{-31}\\text{ kg}$).\nEnter the electron's de Broglie wavelength $\\lambda_e$ in micrometers ($\\mu\\text{m}$) below.",
    given: [
      { symbol: "v", value: "44.0 m/s", description: "Common speed" },
      { symbol: "m_{\\text{ball}}", value: "0.140 kg", description: "Baseball mass" },
      { symbol: "m_p", value: "1.673 \\times 10^{-27} kg", description: "Proton mass" },
      { symbol: "m_e", value: "9.109 \\times 10^{-31} kg", description: "Electron mass" }
    ],
    targetUnknown: "Electron Wavelength \\lambda_e",
    expectedValue: 16.5,
    units: "μm",
    tolerance: 0.03,
    alternateUnits: [
      { unit: "m", multiplier: 1e-6 },
      { unit: "nm", multiplier: 1000 }
    ],
    governingFormula: "\\lambda = \\frac{h}{m v}",
    pitfallWarning: "At v = 44 m/s: (a) Baseball: lambda = 6.626e-34 / (0.14 * 44) = 1.08 × 10^-34 m; (b) Proton: lambda = 6.626e-34 / (1.673e-27 * 44) = 9.00 × 10^-9 m (9.00 nm); (c) Electron: lambda = 6.626e-34 / (9.109e-31 * 44) = 1.653 × 10^-5 m = 16.5 μm.",
    tips: [
      "a) Baseball: 1.08 × 10^-34 m (completely unobservable).",
      "b) Proton: 9.00 nm.",
      "c) Electron: 1.65 × 10^-5 m = 16.5 μm (infrared optical scale!)."
    ],
    progressiveHints: [
      "Use de Broglie's relation: \\lambda = \\frac{h}{mv}.",
      "For the electron: p_e = (9.109 \\times 10^{-31} \\text{ kg})(44.0 \\text{ m/s}) = 4.008 \\times 10^{-29} \\text{ kg}\\cdot\\text{m/s}.",
      "Divide Planck's constant: \\lambda_e = \\frac{6.626 \\times 10^{-34}}{4.008 \\times 10^{-29}} = 1.653 \\times 10^{-5} \\text{ m} = 16.5 \\text{ }\\mu\\text{m}."
    ],
    solutionSteps: [
      {
        step: "Part (a): 0.14 kg Baseball at 44 m/s",
        latex: "\\lambda_{\\text{ball}} = \\frac{6.626 \\times 10^{-34}}{(0.140)(44.0)} = 1.08 \\times 10^{-34} \\text{ m}",
        explanation: "20 orders of magnitude smaller than an atomic nucleus."
      },
      {
        step: "Part (b): Proton at 44 m/s",
        latex: "\\lambda_p = \\frac{6.626 \\times 10^{-34}}{(1.673 \\times 10^{-27})(44.0)} = 9.00 \\times 10^{-9} \\text{ m} = 9.00 \\text{ nm}",
        explanation: "Nanoscale matter wave."
      },
      {
        step: "Part (c): Electron at 44 m/s",
        latex: "\\lambda_e = \\frac{6.626 \\times 10^{-34}}{(9.109 \\times 10^{-31})(44.0)} = 1.653 \\times 10^{-5} \\text{ m} = 16.5 \\text{ }\\mu\\text{m}",
        explanation: "Because of its tiny mass, a slow electron has a micron-scale wavelength."
      }
    ]
  },
  {
    id: "ch2-p3",
    chapterId: "ch2",
    sheetNumber: 2,
    questionNumber: 3,
    officialSource: "Assignment 2 — Problem 3",
    title: "de Broglie Wavelength of Electron, Proton & Uranium at 100 eV",
    topic: "Iso-Energetic Matter Waves",
    difficulty: "standard",
    points: 15,
    prompt: "Calculate the de Broglie wavelength of an electron, a proton ($m_p = 1.67 \\times 10^{-27}\\text{ kg}$), and a uranium atom ($m_U = 3.95 \\times 10^{-25}\\text{ kg}$), all having the same kinetic energy $K = 100\\text{ eV}$. Enter the electron's wavelength $\\lambda_e$ in Angstroms ($\\text{\\AA}$) below.",
    given: [
      { symbol: "K", value: "100 eV = 1.602 \\times 10^{-17} J", description: "Shared kinetic energy" },
      { symbol: "m_e", value: "9.109 \\times 10^{-31} kg", description: "Electron mass" },
      { symbol: "m_p", value: "1.67 \\times 10^{-27} kg", description: "Proton mass" },
      { symbol: "m_U", value: "3.95 \\times 10^{-25} kg", description: "Uranium atom mass" }
    ],
    targetUnknown: "Electron Wavelength \\lambda_e at 100 eV",
    expectedValue: 1.23,
    units: "Å",
    tolerance: 0.03,
    governingFormula: "\\lambda = \\frac{h}{\\sqrt{2 m K}}",
    pitfallWarning: "At K = 100 eV: (1) Electron: lambda_e = 12.27 / sqrt(100) = 1.227 Å; (2) Proton: lambda_p = 0.0286 Å (2.86 pm); (3) Uranium atom: lambda_U = 1.86 × 10^-3 Å (0.186 pm).",
    tips: [
      "At fixed kinetic energy K, wavelength scales inversely with sqrt(m): lambda ∝ 1 / sqrt(m).",
      "For 100 eV electron: lambda_e = 12.27 / sqrt(100) = 1.23 Å."
    ],
    progressiveHints: [
      "Use \\lambda = \\frac{h}{\\sqrt{2mK}} with K = 100 \\text{ eV} = 1.602 \\times 10^{-17} \\text{ J}.",
      "For the electron: \\lambda_e = \\frac{6.626 \\times 10^{-34}}{\\sqrt{2(9.109 \\times 10^{-31})(1.602 \\times 10^{-17})}} = 1.227 \\times 10^{-10} \\text{ m} = 1.23 \\text{ \\AA}.",
      "For proton: \\lambda_p = 0.0286 \\text{ \\AA}; for uranium: \\lambda_U = 0.00186 \\text{ \\AA}."
    ],
    solutionSteps: [
      {
        step: "Electron de Broglie Wavelength at 100 eV",
        latex: "\\lambda_e = \\frac{h}{\\sqrt{2 m_e K}} = \\frac{6.626 \\times 10^{-34}}{\\sqrt{2(9.109 \\times 10^{-31})(1.602 \\times 10^{-17})}} = 1.227 \\text{ \\AA}",
        explanation: "Matches X-ray crystallographic spacing."
      },
      {
        step: "Proton de Broglie Wavelength at 100 eV",
        latex: "\\lambda_p = \\frac{h}{\\sqrt{2 m_p K}} = \\frac{6.626 \\times 10^{-34}}{\\sqrt{2(1.67 \\times 10^{-27})(1.602 \\times 10^{-17})}} = 2.86 \\times 10^{-12} \\text{ m} = 0.0286 \\text{ \\AA}",
        explanation: "43 times shorter than the electron wavelength."
      },
      {
        step: "Uranium Atom de Broglie Wavelength at 100 eV",
        latex: "\\lambda_U = \\frac{h}{\\sqrt{2 m_U K}} = \\frac{6.626 \\times 10^{-34}}{\\sqrt{2(3.95 \\times 10^{-25})(1.602 \\times 10^{-17})}} = 1.86 \\times 10^{-13} \\text{ m} = 0.00186 \\text{ \\AA}",
        explanation: "Heavier particles at the same kinetic energy have much shorter wavelengths."
      }
    ]
  },
  {
    id: "ch2-p4",
    chapterId: "ch2",
    sheetNumber: 2,
    questionNumber: 4,
    officialSource: "Assignment 2 — Problem 4",
    title: "Why Electrons Cannot Exist Inside the Atomic Nucleus",
    topic: "Nuclear Confinement & Relativistic Matter Waves",
    difficulty: "exam-hall",
    points: 20,
    prompt: "To be confined inside an atomic nucleus, an electron's de Broglie wavelength would have to be less than $\\lambda = 1.00 \\times 10^{-14}\\text{ m}$. Calculate the non-relativistic kinetic energy $K = \\frac{p^2}{2m_e}$ (in GeV) computed from $p = h/\\lambda$, and compare it with the electrostatic potential energy $U = -0.144\\text{ MeV}$ at $r = 10^{-14}\\text{ m}$ to explain why electrons cannot be confined in the nucleus.",
    given: [
      { symbol: "\\lambda", value: "1.00 \\times 10^{-14} m", description: "Maximum nuclear wavelength" },
      { symbol: "U", value: "-0.144 MeV", description: "Coulomb attraction potential energy" },
      { symbol: "m_e", value: "9.109 \\times 10^{-31} kg", description: "Electron rest mass" }
    ],
    targetUnknown: "Non-relativistic Kinetic Energy K in GeV",
    expectedValue: 15.0,
    units: "GeV",
    tolerance: 0.04,
    alternateUnits: [
      { unit: "MeV", multiplier: 1000 }
    ],
    governingFormula: "p = \\frac{h}{\\lambda}, \\quad K_{\\text{non-rel}} = \\frac{p^2}{2 m_e} = \\frac{h^2}{2 m_e \\lambda^2}",
    pitfallWarning: "Using standard textbook non-relativistic formula K = h^2 / (2 m_e lambda^2) gives K = 15.0 GeV (15,000 MeV), whereas relativistic K ≈ pc = hc/lambda = 124 MeV. Either way, K >> |U| = 0.144 MeV, proving the Coulomb potential cannot bind an electron inside the nucleus!",
    tips: [
      "p = h / lambda = 6.626 × 10^-20 kg·m/s.",
      "Non-relativistic K = p^2 / (2 m_e) = 2.41 × 10^-9 J = 15.0 GeV (or 124 MeV relativistic).",
      "Since K >> |U| = 0.144 MeV, the electron immediately escapes the nucleus."
    ],
    progressiveHints: [
      "Calculate required momentum: p = \\frac{h}{\\lambda} = \\frac{6.626 \\times 10^{-34}}{10^{-14}} = 6.626 \\times 10^{-20} \\text{ kg}\\cdot\\text{m/s}.",
      "Evaluate K = \\frac{p^2}{2m_e} = \\frac{(6.626 \\times 10^{-20})^2}{2(9.109 \\times 10^{-31})} = 2.41 \\times 10^{-9} \\text{ J}.",
      "Convert to GeV: \\frac{2.41 \\times 10^{-9}}{1.602 \\times 10^{-10} \\text{ J/GeV}} = 15.0 \\text{ GeV}."
    ],
    solutionSteps: [
      {
        step: "Required Momentum for Nuclear Confinement",
        latex: "p = \\frac{h}{\\lambda} = \\frac{6.626 \\times 10^{-34} \\text{ J}\\cdot\\text{s}}{1.00 \\times 10^{-14} \\text{ m}} = 6.626 \\times 10^{-20} \\text{ kg}\\cdot\\text{m/s}",
        explanation: "Minimum momentum if wavelength is at most 10^-14 m."
      },
      {
        step: "Compute Kinetic Energy",
        latex: "K = \\frac{p^2}{2 m_e} = 2.41 \\times 10^{-9} \\text{ J} = 15.0 \\text{ GeV} \\quad (\\text{or } K_{\\text{rel}} \\approx pc = 124 \\text{ MeV})",
        explanation: "Enormous confinement kinetic energy."
      },
      {
        step: "Physical Conclusion (Comparison with U = -0.144 MeV)",
        latex: "K \\gg |U| = 0.144 \\text{ MeV} \\implies E_{\\text{total}} = K + U > 0",
        explanation: "The attractive nuclear Coulomb potential (-0.144 MeV) is orders of magnitude too weak to trap such a high-energy electron; hence electrons cannot reside in the nucleus."
      }
    ]
  },
  {
    id: "ch2-p6b",
    chapterId: "ch2",
    sheetNumber: 2,
    questionNumber: 6,
    officialSource: "Assignment 2 — Problem 6(a, b, c)",
    title: "Velocity Uncertainty of Electron Confined in Cubic Volumes",
    topic: "3D Volume Confinement & Heisenberg Principle",
    difficulty: "standard",
    points: 15,
    prompt: "Obtain the minimum uncertainty in the velocity $\\Delta v = \\frac{\\hbar}{2 m_e \\Delta x}$ of an electron confined within a cube of volume:\n(a) $V_a = 10^{-9}\\text{ m}^3$ ($L_a = 10^{-3}\\text{ m}$),\n(b) $V_b = 10^{-18}\\text{ m}^3$ ($L_b = 10^{-6}\\text{ m}$), and\n(c) $V_c = 10^{-24}\\text{ m}^3$ ($L_c = 10^{-8}\\text{ m}$).\nEnter the velocity uncertainty $\\Delta v_b$ (in $\\text{m/s}$) for part (b) ($V_b = 10^{-18}\\text{ m}^3$) below.",
    given: [
      { symbol: "V_a, V_b, V_c", value: "10^{-9}, 10^{-18}, 10^{-24} m³", description: "Cubic volumes (L = V^{1/3})" },
      { symbol: "L_b", value: "(10^{-18})^{1/3} = 1.00 \\times 10^{-6} m", description: "Cube edge for part (b)" },
      { symbol: "\\hbar / (2 m_e)", value: "5.788 \\times 10^{-5} m²/s", description: "Quantum diffusivity ratio" }
    ],
    targetUnknown: "Velocity Uncertainty \\Delta v_b for 10^{-18} m³ cube",
    expectedValue: 57.9,
    units: "m/s",
    tolerance: 0.04,
    governingFormula: "\\Delta x = V^{1/3}, \\quad \\Delta v = \\frac{\\hbar}{2 m_e \\Delta x}",
    pitfallWarning: "Take the cube root of the volume to find the linear dimension Δx = V^(1/3)! For V = 10^-18 m³, Δx = 10^-6 m, giving Δv = 5.79 × 10^-5 / 10^-6 = 57.9 m/s.",
    tips: [
      "Cube edge L = V^(1/3): L_a = 10^-3 m, L_b = 10^-6 m, L_c = 10^-8 m.",
      "a) Δv_a = 0.0579 m/s.",
      "b) Δv_b = 57.9 m/s.",
      "c) Δv_c = 5790 m/s."
    ],
    progressiveHints: [
      "Find linear confinement length from cube volume: \\Delta x = V^{1/3}. For V_b = 10^{-18} \\text{ m}^3, \\Delta x_b = 10^{-6} \\text{ m}.",
      "Use Heisenberg relation: \\Delta v = \\frac{\\hbar}{2 m_e \\Delta x}.",
      "Substitute: \\Delta v_b = \\frac{1.0546 \\times 10^{-34}}{2(9.109 \\times 10^{-31})(10^{-6})} = 57.9 \\text{ m/s}."
    ],
    solutionSteps: [
      {
        step: "Extract Cube Side Lengths Δx = V^{1/3}",
        latex: "\\Delta x_a = 10^{-3}\\text{ m}, \\quad \\Delta x_b = 10^{-6}\\text{ m}, \\quad \\Delta x_c = 10^{-8}\\text{ m}",
        explanation: "Take cube root of each volume."
      },
      {
        step: "Evaluate Velocity Uncertainties Δv = ħ / (2 m_e Δx)",
        latex: "\\Delta v_a = 0.0579\\text{ m/s}, \\quad \\Delta v_b = 57.9\\text{ m/s}, \\quad \\Delta v_c = 5.79 \\times 10^3\\text{ m/s}",
        explanation: "Shrinking the box volume dramatically amplifies velocity uncertainty."
      }
    ]
  },
  {
    id: "ch2-p8",
    chapterId: "ch2",
    sheetNumber: 2,
    questionNumber: 8,
    officialSource: "Assignment 2 — Problem 8",
    title: "Excited Atomic State Lifetime & Spectral Linewidth",
    topic: "Energy-Time Uncertainty Principle",
    difficulty: "standard",
    points: 15,
    prompt: "The average time taken for an electron to drop from an excited atomic state to the ground state is $\\Delta t = 1.00 \\times 10^{-8}\\text{ s}$. If the transition energy difference is $E = 1.00\\text{ eV}$, find:\n(a) The uncertainty in the energy $\\Delta E$ (in eV),\n(b) The uncertainty in frequency $\\Delta f$ (in Hz) using $\\Delta E \\cdot \\Delta t \\ge \\frac{\\hbar}{2}$ (enter $\\Delta f$ in MHz below), and\n(c) The natural linewidth $\\Delta\\lambda$ of the emitted radiation.",
    given: [
      { symbol: "\\Delta t", value: "1.00 \\times 10^{-8} s", description: "Excited state lifetime" },
      { symbol: "E", value: "1.00 eV (\\lambda = 1240 nm)", description: "Transition energy" },
      { symbol: "\\hbar", value: "6.582 \\times 10^{-16} eV\\cdot s", description: "Reduced Planck constant in eV·s" }
    ],
    targetUnknown: "Frequency Uncertainty \\Delta f in MHz",
    expectedValue: 7.96,
    units: "MHz",
    tolerance: 0.04,
    alternateUnits: [
      { unit: "Hz", multiplier: 1e6 }
    ],
    governingFormula: "\\Delta E = \\frac{\\hbar}{2\\Delta t}, \\quad \\Delta f = \\frac{\\Delta E}{h} = \\frac{1}{4\\pi \\Delta t}",
    pitfallWarning: "Using ΔE = ħ / (2 Δt): ΔE = 3.29 × 10^-8 eV, and Δf = ΔE / h = 1 / (4π Δt) = 7.96 × 10^6 Hz = 7.96 MHz. (Note: if using ΔE ≈ ħ/Δt, Δf = 1/(2π Δt) = 15.9 MHz).",
    tips: [
      "a) ΔE = ħ / (2 Δt) = (6.582 × 10^-16 eV·s) / (2 × 10^-8 s) = 3.29 × 10^-8 eV.",
      "b) Δf = 1 / (4π Δt) = 7.96 × 10^6 Hz = 7.96 MHz.",
      "c) Since λ = 1240 nm, Δλ / λ = ΔE / E => Δλ = 1240 nm × 3.29 × 10^-8 = 4.08 × 10^-5 nm."
    ],
    progressiveHints: [
      "Part (a): \\Delta E = \\frac{\\hbar}{2\\Delta t} = \\frac{6.582 \\times 10^{-16} \\text{ eV}\\cdot\\text{s}}{2 \\times 10^{-8} \\text{ s}} = 3.29 \\times 10^{-8} \\text{ eV}.",
      "Part (b): \\Delta f = \\frac{\\Delta E}{h} = \\frac{1}{4\\pi \\Delta t} = 7.96 \\times 10^6 \\text{ Hz} = 7.96 \\text{ MHz}.",
      "Part (c): \\Delta\\lambda = \\lambda \\frac{\\Delta E}{E} = (1240 \\text{ nm})(3.29 \\times 10^{-8}) = 4.08 \\times 10^{-5} \\text{ nm}."
    ],
    solutionSteps: [
      {
        step: "Part (a): Energy Uncertainty ΔE",
        latex: "\\Delta E = \\frac{\\hbar}{2\\Delta t} = \\frac{6.582 \\times 10^{-16} \\text{ eV}\\cdot\\text{s}}{2(1.00 \\times 10^{-8} \\text{ s})} = 3.29 \\times 10^{-8} \\text{ eV}",
        explanation: "Natural energy broadening of the excited state."
      },
      {
        step: "Part (b): Frequency Uncertainty Δf",
        latex: "\\Delta f = \\frac{\\Delta E}{h} = \\frac{1}{4\\pi \\Delta t} = 7.96 \\times 10^6 \\text{ Hz} = 7.96 \\text{ MHz}",
        explanation: "Natural spectral frequency linewidth."
      },
      {
        step: "Part (c): Wavelength Broadening Δλ",
        latex: "\\Delta\\lambda = \\frac{\\lambda^2}{c}\\Delta f = \\lambda \\frac{\\Delta E}{E} = (1240 \\text{ nm})(3.29 \\times 10^{-8}) = 4.08 \\times 10^{-5} \\text{ nm}",
        explanation: "Ultra-narrow natural optical linewidth."
      }
    ]
  },
  {
    id: "ch2-p12",
    chapterId: "ch2",
    sheetNumber: 2,
    questionNumber: 12,
    officialSource: "Assignment 2 — Problem 12",
    title: "Alpha Particle Ground State in Nuclear Potential Well",
    topic: "Nuclear Particle-in-a-Box Model",
    difficulty: "standard",
    points: 15,
    prompt: "Using the 1D infinite particle-in-a-box model, calculate the lowest possible energy $E_1$ (in MeV) and momentum $p_1$ of an alpha particle ($m_\\alpha = 4 m_u = 4 \\times 1.66 \\times 10^{-27}\\text{ kg} = 6.64 \\times 10^{-27}\\text{ kg}$) confined to move inside a nucleus of diameter $L = 4.00 \\times 10^{-14}\\text{ m}$. Enter $E_1$ in MeV below.",
    given: [
      { symbol: "m_\\alpha", value: "4 \\times 1.66 \\times 10^{-27} = 6.64 \\times 10^{-27} kg", description: "Alpha particle mass (4 u)" },
      { symbol: "L", value: "4.00 \\times 10^{-14} m", description: "Nuclear diameter" },
      { symbol: "h", value: "6.626 \\times 10^{-34} J\\cdot s", description: "Planck constant" }
    ],
    targetUnknown: "Alpha Particle Ground State Energy E_1",
    expectedValue: 0.322,
    units: "MeV",
    tolerance: 0.04,
    alternateUnits: [
      { unit: "keV", multiplier: 1000 }
    ],
    governingFormula: "E_1 = \\frac{h^2}{8 m_\\alpha L^2}, \\quad p_1 = \\frac{h}{2 L}",
    pitfallWarning: "With L = 4 × 10^-14 m and m_alpha = 6.64 × 10^-27 kg: p_1 = h / (2L) = 8.28 × 10^-21 kg·m/s, and E_1 = h^2 / (8 m_alpha L^2) = 5.16 × 10^-14 J = 0.322 MeV (322 keV). Unlike an electron, a heavy nucleon/alpha particle has MeV-scale energy compatible with nuclear binding!",
    tips: [
      "p_1 = h / (2L) = 6.626e-34 / (8e-14) = 8.28 × 10^-21 kg·m/s.",
      "E_1 = p_1^2 / (2 m_alpha) = 5.16 × 10^-14 J = 0.322 MeV."
    ],
    progressiveHints: [
      "Calculate ground-state momentum: p_1 = \\frac{h}{2L} = \\frac{6.626 \\times 10^{-34}}{2(4.00 \\times 10^{-14})} = 8.283 \\times 10^{-21} \\text{ kg}\\cdot\\text{m/s}.",
      "Calculate ground-state energy in Joules: E_1 = \\frac{h^2}{8 m_\\alpha L^2} = \\frac{(6.626 \\times 10^{-34})^2}{8(6.64 \\times 10^{-27})(4.00 \\times 10^{-14})^2} = 5.166 \\times 10^{-14} \\text{ J}.",
      "Convert to MeV: E_1 = \\frac{5.166 \\times 10^{-14}}{1.602 \\times 10^{-13} \\text{ J/MeV}} = 0.322 \\text{ MeV}."
    ],
    solutionSteps: [
      {
        step: "Ground-State Momentum p_1",
        latex: "p_1 = \\frac{h}{2L} = \\frac{6.626 \\times 10^{-34} \\text{ J}\\cdot\\text{s}}{2(4.00 \\times 10^{-14} \\text{ m})} = 8.28 \\times 10^{-21} \\text{ kg}\\cdot\\text{m/s}",
        explanation: "Standing wave condition L = λ/2 yields p = h/(2L)."
      },
      {
        step: "Ground-State Energy E_1 in Joules & MeV",
        latex: "E_1 = \\frac{h^2}{8 m_\\alpha L^2} = 5.17 \\times 10^{-14} \\text{ J} = 0.322 \\text{ MeV}",
        explanation: "0.322 MeV is easily bound by the strong nuclear potential."
      }
    ]
  },

  // =========================================================================
  // CHAPTER 3: ATOMIC PHYSICS, BOHR MODEL & X-RAYS
  // =========================================================================
  {
    id: "ch3-p1",
    chapterId: "ch3",
    sheetNumber: 3,
    questionNumber: 1,
    officialSource: "Chapter 3 Sheet — Problem 1",
    title: "Balmer H_alpha Emission Wavelength",
    topic: "Bohr Model & Rydberg Formula",
    difficulty: "introductory",
    points: 10,
    prompt: "In the hydrogen atom, an electron drops from the second excited state ($n_i = 3$) to the first excited state ($n_f = 2$), producing the prominent red $H_\\alpha$ line of the Balmer series. Calculate the emitted wavelength $\\lambda$ in nanometers (using $R_H = 1.09737 \\times 10^{7}\\text{ m}^{-1}$).",
    given: [
      { symbol: "n_i", value: "3", description: "Initial orbital level" },
      { symbol: "n_f", value: "2", description: "Final orbital level (Balmer series)" },
      { symbol: "R_H", value: "1.09737 \\times 10^7 m^-1", description: "Rydberg constant" }
    ],
    targetUnknown: "Balmer Wavelength \\lambda",
    expectedValue: 656.3,
    units: "nm",
    tolerance: 0.02,
    governingFormula: "\\frac{1}{\\lambda} = R_H \\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right) = R_H \\left(\\frac{1}{4} - \\frac{1}{9}\\right) = \\frac{5}{36} R_H",
    pitfallWarning: "Don't forget to take the reciprocal: lambda = 36 / (5 * R_H) = 36 / (5 * 1.09737e7) = 6.561 × 10^-7 m = 656.3 nm.",
    tips: [
      "Balmer series always terminates at n_f = 2.",
      "H_alpha is 3 -> 2 (656 nm, bright red).",
      "H_beta is 4 -> 2 (486 nm, cyan)."
    ],
    progressiveHints: [
      "Use Rydberg equation: \\frac{1}{\\lambda} = R_H \\left(\\frac{1}{2^2} - \\frac{1}{3^2}\\right).",
      "Fraction factor is \\frac{1}{4} - \\frac{1}{9} = \\frac{5}{36}.",
      "Solve for \\lambda: \\lambda = \\frac{36}{5 R_H} = \\frac{36}{5(1.09737 \\times 10^7)} = 6.561 \\times 10^{-7} \\text{ m} = 656.3 \\text{ nm}."
    ],
    solutionSteps: [
      {
        step: "Rydberg Level Formulation",
        latex: "\\frac{1}{\\lambda} = R_H \\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right) = R_H \\left(\\frac{1}{4} - \\frac{1}{9}\\right) = \\frac{5}{36} R_H",
        explanation: "Balmer formula for hydrogen optical emission."
      },
      {
        step: "Invert to Solve for Wavelength",
        latex: "\\lambda = \\frac{36}{5 R_H} = \\frac{36}{5(1.09737 \\times 10^7 \\text{ m}^{-1})} = 6.5612 \\times 10^{-7} \\text{ m} = 656.3 \\text{ nm}",
        explanation: "The characteristic red Balmer-alpha spectral line."
      }
    ]
  },
  {
    id: "ch3-p2",
    chapterId: "ch3",
    sheetNumber: 3,
    questionNumber: 2,
    officialSource: "Chapter 3 Sheet — Problem 3",
    title: "Continuous X-Ray Duane-Hunt Minimum Wavelength",
    topic: "Bremsstrahlung & Duane-Hunt Cutoff",
    difficulty: "standard",
    points: 15,
    prompt: "An X-ray tube operates at an accelerating anode potential of $V_a = 40.0\\text{ kV}$ ($40,000\\text{ V}$). Determine the short-wavelength cutoff $\\lambda_{\\min}$ (Duane-Hunt limit) of the continuous Bremsstrahlung spectrum in Angstroms ($\\text{\\AA}$).",
    given: [
      { symbol: "V_a", value: "40.0 kV = 40,000 V", description: "Accelerating voltage" },
      { symbol: "hc", value: "12400 eV\\cdot Å", description: "Conversion constant" }
    ],
    targetUnknown: "Minimum Cutoff Wavelength \\lambda_{\\min}",
    expectedValue: 0.31,
    units: "Å",
    tolerance: 0.03,
    alternateUnits: [
      { unit: "nm", multiplier: 0.1 },
      { unit: "pm", multiplier: 100 }
    ],
    governingFormula: "\\lambda_{\\min} = \\frac{hc}{e V_a} = \\frac{12.4}{V_a(\\text{in kV})} \\text{ \\AA}",
    pitfallWarning: "Shortcut: lambda_min (in Å) = 12.4 / V_a (in kV). For 40 kV: 12.4 / 40 = 0.310 Å.",
    tips: [
      "At the Duane-Hunt limit, the incoming electron loses 100% of its kinetic energy in a single deceleration collision.",
      "lambda_min depends solely on tube voltage, completely independent of anode target material!"
    ],
    progressiveHints: [
      "Maximum photon energy equals kinetic energy of the electron: E_{\\max} = e V_a = 40 \\text{ keV}.",
      "Relate to wavelength: \\lambda_{\\min} = \\frac{hc}{e V_a}.",
      "Using hc = 12.40 \\text{ keV}\\cdot\\text{\\AA}: \\lambda_{\\min} = \\frac{12.40 \\text{ keV}\\cdot\\text{\\AA}}{40.0 \\text{ keV}} = 0.310 \\text{ \\AA}."
    ],
    solutionSteps: [
      {
        step: "Duane-Hunt Conservation Principle",
        latex: "E_{\\max} = hf_{\\max} = \\frac{hc}{\\lambda_{\\min}} = e V_a",
        explanation: "Single-step conversion of electron kinetic energy into a single Bremsstrahlung photon."
      },
      {
        step: "Calculate Minimum Wavelength",
        latex: "\\lambda_{\\min} = \\frac{hc}{e V_a} = \\frac{12400 \\text{ eV}\\cdot\\text{\\AA}}{40000 \\text{ eV}} = 0.310 \\text{ \\AA} = 0.0310 \\text{ nm}",
        explanation: "Short-wavelength limit is 0.31 Å."
      }
    ]
  },

  // =========================================================================
  // CHAPTER 4: SPECIAL RELATIVITY & LORENTZ TRANSFORMATIONS
  // =========================================================================
  {
    id: "ch4-p1",
    chapterId: "ch4",
    sheetNumber: 4,
    questionNumber: 1,
    officialSource: "Chapter 4 Sheet — Problem 1",
    title: "Lorentz Factor & Relativistic Length Contraction",
    topic: "Lorentz Length Contraction",
    difficulty: "standard",
    points: 15,
    prompt: "A spacecraft has a proper length of $L_0 = 100.0\\text{ m}$ when measured at rest. If the spacecraft cruises past an Earth-based observation station at a relativistic speed of $v = 0.800c$, what contracted length $L$ in meters is measured by observers on Earth?",
    given: [
      { symbol: "L_0", value: "100.0 m", description: "Proper length" },
      { symbol: "v", value: "0.800 c", description: "Relative speed" },
      { symbol: "c", value: "3.00 \\times 10^8 m/s", description: "Speed of light" }
    ],
    targetUnknown: "Contracted Length L",
    expectedValue: 60.0,
    units: "m",
    tolerance: 0.02,
    governingFormula: "L = L_0 \\sqrt{1 - \\frac{v^2}{c^2}} = \\frac{L_0}{\\gamma}",
    pitfallWarning: "For v = 0.8c: sqrt(1 - 0.8^2) = sqrt(1 - 0.64) = sqrt(0.36) = 0.60. Contracted length = 100 * 0.60 = 60.0 m. Moving objects appear shortened along the direction of motion!",
    tips: [
      "Lorentz factor gamma = 1 / sqrt(1 - (0.8)^2) = 1 / 0.6 = 1.667.",
      "Length contraction occurs only along the axis parallel to motion."
    ],
    progressiveHints: [
      "Lorentz contraction formula: L = L_0 \\sqrt{1 - \\beta^2} where \\beta = v/c = 0.800.",
      "Calculate square root: \\sqrt{1 - (0.8)^2} = \\sqrt{1 - 0.64} = \\sqrt{0.36} = 0.600.",
      "Multiply by proper length: L = 100.0 \\times 0.600 = 60.0 \\text{ m}."
    ],
    solutionSteps: [
      {
        step: "Evaluate Lorentz Contraction Factor",
        latex: "\\sqrt{1 - \\frac{v^2}{c^2}} = \\sqrt{1 - (0.800)^2} = \\sqrt{0.360} = 0.600",
        explanation: "Relativistic spatial compression factor."
      },
      {
        step: "Compute Contracted Dimension",
        latex: "L = L_0 \\sqrt{1 - \\frac{v^2}{c^2}} = 100.0 \\text{ m} \\times 0.600 = 60.0 \\text{ m}",
        explanation: "Contracted length measured in the stationary Earth frame."
      }
    ]
  },
  {
    id: "ch4-p2",
    chapterId: "ch4",
    sheetNumber: 4,
    questionNumber: 2,
    officialSource: "Chapter 4 Sheet — Problem 3",
    title: "Relativistic Kinetic Energy of Fast Electron",
    topic: "Relativistic Energy & Momentum",
    difficulty: "standard",
    points: 15,
    prompt: "An electron is accelerated to a relativistic speed of $v = 0.600c$. Calculate its relativistic kinetic energy $K$ in kilo-electron-volts (keV). (Electron rest energy $E_0 = m_0 c^2 = 511.0\\text{ keV}$).",
    given: [
      { symbol: "v", value: "0.600 c", description: "Speed" },
      { symbol: "m_0 c^2", value: "511.0 keV", description: "Electron rest energy" }
    ],
    targetUnknown: "Relativistic Kinetic Energy K",
    expectedValue: 127.75,
    units: "keV",
    tolerance: 0.03,
    governingFormula: "K = (\\gamma - 1) m_0 c^2 = \\left(\\frac{1}{\\sqrt{1 - v^2/c^2}} - 1\\right) m_0 c^2",
    pitfallWarning: "MAJOR RELATIVITY TRAP: Do NOT use classical 1/2 m v^2! Classical gives 1/2 * 511 * (0.6)^2 = 91.98 keV (30% error). Relativistic gamma = 1 / sqrt(1 - 0.36) = 1 / 0.8 = 1.25. K = (1.25 - 1) * 511 = 0.25 * 511 = 127.75 keV.",
    tips: [
      "For v = 0.6c, gamma = 1.25.",
      "K = (gamma - 1) * m_0 c^2 = 0.25 * 511 keV = 127.75 keV."
    ],
    progressiveHints: [
      "Find Lorentz factor: \\gamma = \\frac{1}{\\sqrt{1 - (0.6)^2}} = \\frac{1}{\\sqrt{0.64}} = \\frac{1}{0.8} = 1.25.",
      "Relativistic kinetic energy formula: K = (\\gamma - 1) m_0 c^2.",
      "Substitute: K = (1.25 - 1) \\times 511.0 \\text{ keV} = 0.25 \\times 511.0 = 127.75 \\text{ keV}."
    ],
    solutionSteps: [
      {
        step: "Compute Lorentz Factor gamma",
        latex: "\\gamma = \\frac{1}{\\sqrt{1 - (0.600)^2}} = \\frac{1}{0.800} = 1.250",
        explanation: "Time dilation / mass-energy scaling factor at 0.6c."
      },
      {
        step: "Compute Relativistic Kinetic Energy",
        latex: "K = (\\gamma - 1) m_0 c^2 = (1.250 - 1) \\times 511.0 \\text{ keV} = 127.75 \\text{ keV}",
        explanation: "True relativistic kinetic energy (127.75 keV vs 92 keV classical)."
      }
    ]
  }
];

export const CHAPTER_METADATA = [
  {
    id: "ch1" as const,
    sheetNumber: 1,
    title: "Chapter 1: Quantum Properties of Thermal Radiation",
    subtitle: "Blackbody Radiation, Photoelectric Effect & Compton Scattering",
    courseCode: "ELCn114 / ELC 214",
    questionCount: CHAPTER_EXAM_QUESTIONS.filter(q => q.chapterId === "ch1").length,
    topics: ["Wien's Law", "Stefan-Boltzmann", "Planck Oscillators", "Photoelectric Effect", "Compton Scattering"]
  },
  {
    id: "ch2" as const,
    sheetNumber: 2,
    title: "Chapter 2: Wave Mechanics & Uncertainty",
    subtitle: "de Broglie Waves, Heisenberg Uncertainty & Potential Wells",
    courseCode: "ELCn114 / ELC 214",
    questionCount: CHAPTER_EXAM_QUESTIONS.filter(q => q.chapterId === "ch2").length,
    topics: ["de Broglie Wavelength", "Heisenberg Principle", "Infinite Potential Well", "Barrier Tunneling"]
  },
  {
    id: "ch3" as const,
    sheetNumber: 3,
    title: "Chapter 3: Atomic Physics & X-Rays",
    subtitle: "Bohr Model, Hydrogen Transitions, Continuous & Characteristic X-Rays",
    courseCode: "ELCn114 / ELC 214",
    questionCount: CHAPTER_EXAM_QUESTIONS.filter(q => q.chapterId === "ch3").length,
    topics: ["Bohr Model", "Balmer / Lyman Series", "Duane-Hunt Law", "Moseley's Law"]
  },
  {
    id: "ch4" as const,
    sheetNumber: 4,
    title: "Chapter 4: Special Relativity",
    subtitle: "Lorentz Transformations, Length Contraction & Relativistic Energy",
    courseCode: "ELCn114 / ELC 214",
    questionCount: CHAPTER_EXAM_QUESTIONS.filter(q => q.chapterId === "ch4").length,
    topics: ["Lorentz Transformations", "Length Contraction", "Time Dilation", "Relativistic Energy"]
  }
];
