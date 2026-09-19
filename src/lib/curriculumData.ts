import { DualTrackTopic, LabExperiment, MnemonicCard, Flashcard } from "../types";

export const CURRICULUM_CHAPTERS = [
  {
    id: "ch1",
    number: 1,
    title: "Quantum Physics & The Radiation Catastrophe",
    description: "Breakdown of classical physics, blackbody cavity radiation, Planck's quantization hypothesis, Photoelectric effect, and Compton scattering relativistic kinematics.",
    topicsCount: 3,
    badge: "Chapter 1",
  },
  {
    id: "ch2",
    number: 2,
    title: "Wave Mechanics & Bound States",
    description: "Matter waves, de Broglie duality, Heisenberg uncertainty, Schrödinger differential formulations (TDSE & TISE), Infinite & Finite square wells, barrier tunneling, and harmonic oscillators.",
    topicsCount: 4,
    badge: "Chapter 2",
  },
  {
    id: "ch3",
    number: 3,
    title: "Atomic Physics & Structural Transitions",
    description: "Bohr hydrogen model, Rydberg spectral series, 3D Schrödinger 4 quantum numbers, Pauli exclusion principle, Aufbau progression, and continuous vs characteristic X-rays.",
    topicsCount: 3,
    badge: "Chapter 3",
  },
  {
    id: "ch4",
    number: 4,
    title: "Special Theory of Relativity",
    description: "Inertial frames, Galilean breakdown, Michelson-Morley null result, Einstein's postulates, light-clock time dilation, Lorentz transformations, and relativistic energy-momentum invariant.",
    topicsCount: 3,
    badge: "Chapter 4",
  },
] as const;

export const DUAL_TRACK_TOPICS: DualTrackTopic[] = [
  // CHAPTER 1: Blackbody Radiation
  {
    id: "blackbody-radiation",
    chapterId: "ch1",
    chapterTitle: "Chapter 1: Quantum Physics & The Radiation Catastrophe",
    title: "Blackbody Radiation & Cavity Oscillations",
    subtitle: "Ultraviolet Catastrophe, Rayleigh-Jeans Failure & Planck's Discrete Quantum Hypothesis",
    classicalAxiom: "Equipartition Theorem: Every classical standing wave oscillation mode inside an isothermal cavity possesses an average continuous kinetic and potential thermal energy \\langle E \\rangle = k_B T.",
    breakdownPoint: "Classical Rayleigh-Jeans Law predicts spectral intensity I(\\lambda, T) = \\frac{2\\pi c k_B T}{\\lambda^4}. As wavelength \\lambda \\to 0 (high frequency ultraviolet/gamma spectrum), intensity diverges to infinity (\\lim_{\\lambda \\to 0} I = \\infty). An infinitely radiating cavity would instantly drain all universal thermal energy—a physical impossibility.",
    quantumPostulate: "Planck's Hypothesis: Cavity wall atomic resonators do NOT absorb or radiate continuous energy, but exchange energy exclusively in discrete integer quanta E_n = n h f (where n \\in \\{0, 1, 2, \\dots\\}).",
    mathTrack: {
      title: "Abstract Mathematical & Symbolic Track",
      description: "Rigorous algebraic derivation of Planck's Radiation Law and asymptotic reduction to Rayleigh-Jeans via Taylor Series.",
      equations: [
        {
          label: "Classical Rayleigh-Jeans Law (Fails at UV)",
          latex: "I(\\lambda, T) = \\frac{2\\pi c k_B T}{\\lambda^4}, \\quad \\lim_{\\lambda \\to 0} I(\\lambda, T) = \\infty",
          annotation: "Divergence at short wavelengths known as the Ultraviolet Catastrophe.",
        },
        {
          label: "Planck's Quantum Radiation Law",
          latex: "I(\\lambda, T) = \\frac{2\\pi h c^2}{\\lambda^5 \\left( e^{\\frac{hc}{\\lambda k_B T}} - 1 \\right)}",
          annotation: "Eliminates UV catastrophe; denominator exponential dominates as \\lambda \\to 0, suppressing emission.",
        },
        {
          label: "Stefan-Boltzmann Law (Integrated Intensity)",
          latex: "I_{\\text{total}} = \\int_0^\\infty I(\\lambda, T) d\\lambda = \\sigma T^4, \\quad \\sigma = 5.67 \\times 10^{-8} \\text{ W}\\cdot\\text{m}^{-2}\\cdot\\text{K}^{-4}",
          annotation: "Radiant power scales with fourth power of absolute temperature.",
        },
        {
          label: "Wien's Displacement Law (Peak Wavelength)",
          latex: "\\lambda_{\\max} T = 2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}",
          annotation: "Derived by setting \\frac{dI}{d\\lambda} = 0; peak shifts blue with rising temperature.",
        },
      ],
      derivationSteps: [
        {
          stepNumber: 1,
          title: "Cavity Mode Density Calculation",
          math: "N(\\lambda) d\\lambda = \\frac{8\\pi}{\\lambda^4} d\\lambda",
          explanation: "Standing electromagnetic wave nodes at cavity boundary walls restrict permissible modes in three-dimensional volume.",
        },
        {
          stepNumber: 2,
          title: "Maxwell-Boltzmann Energy Expectation with Discrete Quanta",
          math: "\\langle E \\rangle = \\frac{\\sum_{n=0}^\\infty n h f e^{-\\frac{n h f}{k_B T}}}{\\sum_{n=0}^\\infty e^{-\\frac{n h f}{k_B T}}} = \\frac{h f}{e^{\\frac{hf}{k_B T}} - 1}",
          explanation: "Replacing continuous classical integrals with discrete geometric series summation.",
        },
        {
          stepNumber: 3,
          title: "Planck Law Formulation in Wavelength Coordinates",
          math: "u(\\lambda, T) = N(\\lambda) \\langle E \\rangle = \\frac{8\\pi h c}{\\lambda^5 \\left(e^{\\frac{hc}{\\lambda k_B T}} - 1\\right)}",
          explanation: "Using f = c/\\lambda and |df/d\\lambda| = c/\\lambda^2 coordinate transformation.",
        },
        {
          stepNumber: 4,
          title: "Classical Limit via Taylor Expansion (\\lambda \\to \\infty)",
          math: "e^{\\frac{hc}{\\lambda k_B T}} \\approx 1 + \\frac{hc}{\\lambda k_B T} + \\mathcal{O}(\\lambda^{-2}) \\implies e^{\\frac{hc}{\\lambda k_B T}} - 1 \\approx \\frac{hc}{\\lambda k_B T}",
          explanation: "Substituting into Planck's law directly yields Rayleigh-Jeans formula: \\frac{8\\pi h c}{\\lambda^5 (hc/\\lambda k_B T)} = \\frac{8\\pi k_B T}{\\lambda^4}.",
          boundaryOrLimit: "\\frac{hc}{\\lambda k_B T} \\ll 1 \\implies \\text{Classical correspondence confirmed.}",
        },
      ],
    },
    mentalModelTrack: {
      title: "Concrete Mental Model & Physical Simulation Track",
      analogy: "The Financial Toll Gate Analogy: Imagine an entrance fee that scales linearly with frequency ($hf$). At low frequencies (red/IR), the fee is mere pennies; virtually every vibrating atom has enough thermal pocket change ($k_B T$) to enter and oscillate. But at ultraviolet frequencies, the entrance fee becomes millions of dollars! Even though thermal fluctuations exist, the probability of finding an atom with enough thermal energy to purchase even a single UV quantum drops exponentially to zero.",
      physicalIntuition: "A cavity with a tiny pinhole acts as a perfect blackbody because any ray entering suffers repeated internal specular/diffuse reflections; at each bounce a fraction of energy is absorbed, making absorption virtually 100%. Conversely, thermal emission through the hole is isotropic equilibrium radiation characteristic exclusively of wall temperature, independent of cavity material.",
      keyMechanics: [
        "No ultraviolet catastrophe: High-energy states are 'frozen out' thermally.",
        "Peak emission wavelength lambda_max shifts inversely with T (Wien's law).",
        "Total radiated area under curve explodes by T^4 (doubling T increases total power by 16x).",
      ],
      boundaryLimits: [
        {
          condition: "\\lambda \\to 0 (\\text{High Frequency})",
          mathBehavior: "e^{hc/\\lambda k_B T} \\to \\infty \\implies I(\\lambda, T) \\to 0",
          physicalInterpretation: "Quantum suppression: Zero probability of exciting insanely energetic UV/gamma quanta.",
        },
        {
          condition: "\\lambda \\to \\infty (\\text{Long Wavelength})",
          mathBehavior: "I(\\lambda, T) \\to \\frac{2\\pi c k_B T}{\\lambda^4}",
          physicalInterpretation: "Smooth correspondence into classical Maxwell-Boltzmann equipartition.",
        },
      ],
    },
    examTraps: [
      "Confusing spectral intensity I(lambda, T) with integrated total power P = sigma*A*epsilon*T^4.",
      "Forgetting to convert Celsius to Kelvin: T MUST always be in Kelvin!",
      "Assuming Planck's hypothesis applies to light traveling in free space; Planck originally only quantized the wall oscillators. Einstein in 1905 extended quantization to electromagnetic radiation itself.",
    ],
  },

  // CHAPTER 1: Photoelectric Effect
  {
    id: "photoelectric-effect",
    chapterId: "ch1",
    chapterTitle: "Chapter 1: Quantum Physics & The Radiation Catastrophe",
    title: "Photoelectric Effect & Quantum Absorption",
    subtitle: "Threshold Frequency, Retarding Potential, and Einstein's Photon Theory",
    classicalAxiom: "Continuous Wave Energy Delivery: Wave intensity is proportional to electric field amplitude squared (I \\propto |\\vec{E}|^2). Increasing intensity increases energy transferred per second to free electrons; electrons accumulate energy over time until escaping the metal lattice.",
    breakdownPoint: "Three experimental failures of classical wave theory: (1) Instantaneous emission (< 10^-9 s) even at extremely feeble intensities; (2) Existence of a strict Threshold Frequency f_c below which no emission occurs regardless of exposure time or intensity; (3) Stopping potential V_0 and maximum kinetic energy K_max depend strictly on light frequency f, NOT light intensity.",
    quantumPostulate: "Einstein's Postulate: Electromagnetic radiation consists of localized, indivisible localized wave-packets of energy called photons: E = hf. One photon interacts with exactly one electron (1-to-1 all-or-nothing absorption).",
    mathTrack: {
      title: "Abstract Mathematical & Symbolic Track",
      description: "Conservation of energy in single-quantum absorption and stopping potential mechanics.",
      equations: [
        {
          label: "Einstein's Photoelectric Energy Equation",
          latex: "hf = \\phi + K_{\\max} = \\phi + e V_0 = \\phi + \\frac{1}{2}m_e v_{\\max}^2",
          annotation: "hf: incident photon energy; phi: work function; K_max: kinetic energy of fastest electron.",
        },
        {
          label: "Work Function & Cutoff Frequency",
          latex: "\\phi = h f_c = \\frac{hc}{\\lambda_c}",
          annotation: "Minimum energy required to liberate an electron from the Fermi sea of the metal surface.",
        },
        {
          label: "Stopping Potential Equation",
          latex: "V_0 = \\left(\\frac{h}{e}\\right) f - \\frac{\\phi}{e} = \\left(\\frac{hc}{e}\\right)\\frac{1}{\\lambda} - \\frac{\\phi}{e}",
          annotation: "Linear slope of V_0 vs f is universally h/e = 4.136 x 10^-15 V*s, independent of metal!",
        },
      ],
      derivationSteps: [
        {
          stepNumber: 1,
          title: "Conservation of Energy in 1-to-1 Collision",
          math: "E_{\\text{initial}} = E_{\\text{final}} \\implies hf + E_{\\text{bound}} = E_{\\text{free}} + K_e",
          explanation: "Single photon imparts its entire energy hf to a conduction electron.",
        },
        {
          stepNumber: 2,
          title: "Extraction Across Metal Surface Potential Well",
          math: "K_{\\max} = hf - \\phi",
          explanation: "Electrons right at the Fermi surface lose minimum energy phi to break the surface dipole barrier.",
        },
        {
          stepNumber: 3,
          title: "Electrostatic Retarding Field Formulation",
          math: "W_{\\text{retarding}} = e V_0 = K_{\\max} \\implies V_0 = \\frac{h}{e}f - \\frac{\\phi}{e}",
          explanation: "Stopping potential V_0 is the reverse voltage where the most energetic photoelectrons are halted just before striking the anode, reducing photocurrent I to strictly zero.",
        },
      ],
    },
    mentalModelTrack: {
      title: "Concrete Mental Model & Physical Simulation Track",
      analogy: "Vending Machine Token Analogy: Suppose a snack machine requires a 50-cent token to dispense an item (Work Function phi = 50 cents). If you insert hundreds of 10-cent dimes (high-intensity red light), the machine refuses them individually and no snack drops. But if you drop in a single 75-cent token (high-frequency UV photon), the machine immediately unlocks, releases the snack, and spits out 25 cents in change (Kinetic Energy = 25 cents). Increasing intensity simply drops in MORE 75-cent tokens simultaneously, creating more photocurrent, but each ejected snack still has exactly 25 cents in kinetic change!",
      physicalIntuition: "Photocurrent magnitude is determined exclusively by the rate of incident photons (Intensity / hf). Kinetic energy of liberated electrons is determined exclusively by the individual photon energy (hf).",
      keyMechanics: [
        "Light Intensity controls number of ejected electrons per second (Photocurrent).",
        "Light Frequency controls energy of each ejected electron (Stopping Potential).",
        "Zero time lag (< 10^-9 s): Absorption is a localized quantum collision, not an accumulative wave bath.",
      ],
      boundaryLimits: [
        {
          condition: "f < f_c (\\text{Below Threshold})",
          mathBehavior: "hf < \\phi \\implies K_{\\max} < 0 (\\text{Unphysical})",
          physicalInterpretation: "No electrons can escape surface potential; photocurrent is identically zero regardless of laser power.",
        },
        {
          condition: "f = f_c (\\text{Exact Threshold})",
          mathBehavior: "K_{\\max} = 0, \\quad V_0 = 0",
          physicalInterpretation: "Electrons escape metal surface with zero kinetic energy.",
        },
      ],
    },
    examTraps: [
      "Believing higher intensity light increases stopping potential: FALSE. Stopping potential is strictly independent of intensity.",
      "Forgetting units: Work function phi is usually in eV; must convert to Joules (multiply by 1.6e-19) before equating with hf if using SI units.",
      "The slope of V_0 vs f is always h/e (approx 4.14 x 10^-15 V*s) regardless of which cathode metal is used.",
    ],
  },

  // CHAPTER 1: Compton Scattering
  {
    id: "compton-scattering",
    chapterId: "ch1",
    chapterTitle: "Chapter 1: Quantum Physics & The Radiation Catastrophe",
    title: "Compton Scattering & Relativistic Recoil",
    subtitle: "X-ray Photon Collision with Free Electron and Derivation of Compton Shift",
    classicalAxiom: "Thomson Scattering: When an electromagnetic wave strikes a free electron, the oscillatory electric field causes the electron to oscillate at the incident wave frequency f and re-radiate waves at the exact same frequency (\\lambda' = \\lambda) in all directions. No wavelength shift should exist.",
    breakdownPoint: "Arthur Compton (1923) directed monochromatic X-rays at graphite targets and observed scattered radiation with longer wavelengths (\\lambda' > \\lambda). The wavelength shift \\Delta\\lambda increased with scattering angle \\theta and was completely independent of the incident wavelength and target material.",
    quantumPostulate: "Light behaves as a relativistic particle endowed with energy E = hf and momentum p = h/\\lambda = hf/c undergoing a 2D relativistic elastic collision with a stationary free electron.",
    mathTrack: {
      title: "Abstract Mathematical & Symbolic Track",
      description: "Rigorous relativistic conservation of four-momentum and proof of Compton shift formula.",
      equations: [
        {
          label: "Compton Wavelength Shift Formula",
          latex: "\\Delta\\lambda = \\lambda' - \\lambda = \\frac{h}{m_0 c}(1 - \\cos\\theta) = \\lambda_c (1 - \\cos\\theta)",
          annotation: "lambda_c is the electron Compton wavelength = 2.43 pm = 0.0243 Angstrom.",
        },
        {
          label: "Compton Wavelength Value",
          latex: "\\lambda_c = \\frac{h}{m_0 c} = \\frac{6.63 \\times 10^{-34}}{(9.11 \\times 10^{-31})(3 \\times 10^8)} = 2.426 \\times 10^{-12} \\text{ m} = 0.0243 \\text{ \\AA}",
          annotation: "Fundamental quantum-relativistic length scale of an electron.",
        },
        {
          label: "Relativistic Invariant Relation",
          latex: "E^2 = p^2 c^2 + m_0^2 c^4",
          annotation: "Fundamental invariant linking energy, momentum, and rest mass.",
        },
      ],
      derivationSteps: [
        {
          stepNumber: 1,
          title: "Relativistic Conservation of Total Energy",
          math: "hf + m_0 c^2 = hf' + mc^2 \\implies mc^2 = h(f - f') + m_0 c^2",
          explanation: "Where m_0 c^2 is the electron rest energy (0.511 MeV) and mc^2 is total relativistic energy.",
        },
        {
          stepNumber: 2,
          title: "Relativistic Conservation of Vector Momentum",
          math: "\\vec{p}_{\\gamma} = \\vec{p}'_{\\gamma} + \\vec{p}_e \\implies p_e^2 = p_\\gamma^2 + p_\\gamma'^2 - 2 p_\\gamma p_\\gamma' \\cos\\theta",
          explanation: "Applying the law of cosines to the momentum vector triangle.",
        },
        {
          stepNumber: 3,
          title: "Expressing Electron Momentum in Energy Terms",
          math: "p_e^2 c^2 = (hf)^2 + (hf')^2 - 2(hf)(hf')\\cos\\theta",
          explanation: "Using photon relativistic momentum p_\\gamma = hf/c.",
        },
        {
          stepNumber: 4,
          title: "Algebraic Subtraction via Invariant E^2 - p^2c^2 = m_0^2 c^4",
          math: "[h(f - f') + m_0 c^2]^2 - [(hf)^2 + (hf')^2 - 2(hf)(hf')\\cos\\theta] = m_0^2 c^4",
          explanation: "Expanding squares: h^2(f - f')^2 + 2h(f - f')m_0 c^2 + m_0^2 c^4 - [(hf)^2 + (hf')^2 - 2 h^2 f f' \\cos\\theta] = m_0^2 c^4.",
        },
        {
          stepNumber: 5,
          title: "Cancellation and Isolation of Delta lambda",
          math: "2h(f - f')m_0 c^2 = 2 h^2 f f' (1 - \\cos\\theta) \\implies \\frac{f - f'}{f f'} = \\frac{h}{m_0 c^2}(1 - \\cos\\theta)",
          explanation: "Since c/f' - c/f = \\lambda' - \\lambda = \\Delta\\lambda, multiplying by c yields: \\Delta\\lambda = \\frac{h}{m_0 c}(1 - \\cos\\theta).",
          boundaryOrLimit: "\\theta = 180^\\circ \\implies \\Delta\\lambda = 2\\lambda_c = 4.85 \\text{ pm}.",
        },
      ],
    },
    mentalModelTrack: {
      title: "Concrete Mental Model & Physical Simulation Track",
      analogy: "Relativistic Billiards: An X-ray photon is a cue ball colliding with a stationary 8-ball (electron). If the cue ball merely grazes the edge (theta = 0), it continues straight with almost all its speed/energy (no shift). If it bounces off at a 90-degree angle, it transfers significant momentum to the 8-ball, losing energy. If it hits dead center and rebounds directly backward (theta = 180), it imparts the maximum possible recoil momentum to the electron and suffers the maximum drop in frequency (maximum wavelength increase).",
      physicalIntuition: "The wavelength shift Delta lambda depends ONLY on the scattering angle theta, NOT on the incident wavelength lambda! However, because Delta lambda is tiny (pm scale), the fractional change Delta lambda / lambda is substantial for high-energy X-rays and gamma rays, but completely negligible for visible light (where lambda ~ 500 nm).",
      keyMechanics: [
        "theta = 0 deg: Forward grazing, Delta lambda = 0 (unmodified).",
        "theta = 90 deg: Transverse scattering, Delta lambda = lambda_c = 2.43 pm.",
        "theta = 180 deg: Backscattering, Delta lambda = 2*lambda_c = 4.85 pm (Maximum shift).",
        "Photoelectric vs Compton: Photoelectric is TOTAL absorption by a BOUND electron; Compton is PARTIAL scattering off a FREE (or loosely bound) electron.",
      ],
      boundaryLimits: [
        {
          condition: "\\theta = 0^\\circ",
          mathBehavior: "\\Delta\\lambda = \\lambda_c(1 - 1) = 0",
          physicalInterpretation: "No scattering angle, no momentum transfer to electron.",
        },
        {
          condition: "\\theta = 180^\\circ",
          mathBehavior: "\\Delta\\lambda = \\lambda_c(1 - (-1)) = 2\\lambda_c \\approx 4.85\\text{ pm}",
          physicalInterpretation: "Maximum head-on recoil momentum transferred to the electron.",
        },
      ],
    },
    examTraps: [
      "Stating that Compton scattering can occur with completely stationary, strongly bound inner electrons: tightly bound electrons scatter photons with effective mass of the whole atom M >> m_e, producing Delta lambda ~= 0 (unmodified peak).",
      "Using non-relativistic kinetic energy 1/2 m v^2 for high-energy electron recoil: ALWAYS use relativistic conservation!",
      "Confusing Compton wavelength lambda_c with de Broglie wavelength lambda = h/p.",
    ],
  },

  // CHAPTER 2: Wave-Particle Duality & De Broglie
  {
    id: "wave-particle-duality",
    chapterId: "ch2",
    chapterTitle: "Chapter 2: Wave Mechanics & Bound States",
    title: "Wave-Particle Duality & De Broglie Matter Waves",
    subtitle: "De Broglie Hypothesis, Davisson-Germer Nickel Diffraction, and Wave Packets",
    classicalAxiom: "Strict Cartesian Dichotomy: Energy and mass are distinct ontological categories. Radiation is purely a continuous propagating wave field obeying Maxwell equations; matter is purely localized particles obeying Newton's laws.",
    breakdownPoint: "Einstein demonstrated that light waves possess particle momentum p = h/\\lambda. If radiation possesses corpuscular properties, does matter possess undulatory wave properties? Classical mechanics failed to explain why electron orbits in atoms are quantized.",
    quantumPostulate: "De Broglie Hypothesis (1924): Any moving particle with momentum p possesses an intrinsic matter wavelength \\lambda = h/p.",
    mathTrack: {
      title: "Abstract Mathematical & Symbolic Track",
      description: "Mathematical formulation of de Broglie wavelength across kinetic and electrostatic voltage regimes.",
      equations: [
        {
          label: "De Broglie Fundamental Relation",
          latex: "\\lambda = \\frac{h}{p} = \\frac{h}{m v}",
          annotation: "Momentum p = mv for non-relativistic velocities v << c.",
        },
        {
          label: "Expressed via Kinetic Energy",
          latex: "\\lambda = \\frac{h}{\\sqrt{2 m (K.E)}}",
          annotation: "Since K.E = p^2 / 2m => p = sqrt(2m*K.E).",
        },
        {
          label: "Accelerated Through Electrostatic Potential V",
          latex: "\\lambda = \\frac{h}{\\sqrt{2 m q V}} \\xrightarrow[\\text{electron}]{\\quad} \\lambda = \\frac{1.226}{\\sqrt{V}} \\text{ nm} = \\frac{12.26}{\\sqrt{V}} \\text{ \\AA}",
          annotation: "Essential Modern Academy practical calculation shortcut for electron beams.",
        },
        {
          label: "Davisson-Germer Bragg Diffraction Condition",
          latex: "n\\lambda = 2 d \\sin\\theta_B = D \\sin\\phi",
          annotation: "Diffraction off atomic lattice planes confirms electron wave interference.",
        },
      ],
      derivationSteps: [
        {
          stepNumber: 1,
          title: "Symmetry with Photon Momentum",
          math: "E = hf = \\frac{hc}{\\lambda} \\quad \\text{and} \\quad E = pc \\implies p = \\frac{h}{\\lambda}",
          explanation: "Inverting gives lambda = h/p for radiation.",
        },
        {
          stepNumber: 2,
          title: "Generalization to Massive Matter",
          math: "\\lambda = \\frac{h}{p} = \\frac{h}{\\gamma m_0 v}",
          explanation: "Assigning wave characteristics to electrons, protons, and all particles.",
        },
        {
          stepNumber: 3,
          title: "Derivation of Electron Quick Formula",
          math: "\\lambda = \\frac{6.63 \\times 10^{-34}}{\\sqrt{2(9.11 \\times 10^{-31})(1.6 \\times 10^{-19}) V}} = \\frac{1.226 \\times 10^{-9}}{\\sqrt{V}} \\text{ m}",
          explanation: "At V = 54 Volts (Davisson-Germer peak): lambda = 1.226 / sqrt(54) = 0.167 nm = 1.67 Angstrom, exactly matching X-ray Bragg crystal measurements!",
        },
      ],
    },
    mentalModelTrack: {
      title: "Concrete Mental Model & Physical Simulation Track",
      analogy: "The Macro vs Micro Wave Limit: Why don't walking humans diffract through doorways? For an 80 kg person walking at 1.5 m/s: lambda = 6.63e-34 / (80 * 1.5) = 5.5 x 10^-36 m! This is billions of times smaller than a proton; wave interference is undetectable. But for an electron with mass 9.11e-31 kg accelerated by 50 V, its wavelength is ~0.17 nm—the exact spacing of atoms in a crystal lattice! The crystal acts as an atomic-scale diffraction grating.",
      physicalIntuition: "Wave packet velocity: A localized particle is a superposition of harmonic waves called a wave packet. The phase velocity v_p = omega/k can exceed c, but the group velocity v_g = d(omega)/dk carries energy and matches the physical particle velocity exactly: v_g = v_particle.",
      keyMechanics: [
        "Microscopic matter exhibits wave interference; macroscopic matter de Broglie wavelength is unobservably tiny.",
        "Davisson-Germer experiment proved electron diffraction with nickel crystal lattice at 54 V, phi = 50 degrees.",
        "Group velocity v_g matches particle speed: v_g = dE/dp = p/m = v.",
      ],
      boundaryLimits: [
        {
          condition: "m \\to \\text{Large} (\\text{Baseball, Human})",
          mathBehavior: "\\lambda \\to 0",
          physicalInterpretation: "Wave nature disappears into classical Newtonian trajectories.",
        },
        {
          condition: "V \\to \\infty (\\text{Relativistic Regime})",
          mathBehavior: "\\lambda = \\frac{h}{\\sqrt{2m_0 qV (1 + qV/2m_0 c^2)}}",
          physicalInterpretation: "Relativistic correction required when qV exceeds ~10 keV.",
        },
      ],
    },
    examTraps: [
      "Using non-relativistic formula for electrons with energies > 50 keV without relativistic correction.",
      "Confusing scattering angle phi with Bragg angle theta: in Davisson-Germer, theta_Bragg = (180 - phi)/2.",
      "Confusing phase velocity v_p (which can exceed c) with physical group velocity v_g.",
    ],
  },

  // CHAPTER 2: Particle in a Box (Infinite Square Well)
  {
    id: "infinite-square-well",
    chapterId: "ch2",
    chapterTitle: "Chapter 2: Wave Mechanics & Bound States",
    title: "Particle in an Infinite Square Well (1D Box)",
    subtitle: "Boundary Conditions, Quantized Energy Eigenvalues, and Interval Probability Integrals",
    classicalAxiom: "Newtonian Bound Particle: A particle enclosed between impenetrable walls at x=0 and x=L bounces back and forth with constant speed. It can possess ANY continuous kinetic energy E >= 0, can be found with uniform probability P(x) = dx/L everywhere, and can be brought to complete rest with zero energy (E = 0).",
    breakdownPoint: "The Heisenberg Uncertainty Principle Delta x * Delta p >= hbar/2 forbids a localized particle (Delta x <= L) from having zero momentum. Thus, the minimum energy cannot be zero. Boundary conditions on wavefunctions force discrete standing wave quantization.",
    quantumPostulate: "The particle's state is governed by Time-Independent Schrödinger Equation (TISE) with boundary conditions psi(0) = 0 and psi(L) = 0.",
    mathTrack: {
      title: "Abstract Mathematical & Symbolic Track",
      description: "Complete analytical solution of TISE, eigenfunction normalization, and spatial probability integrals.",
      equations: [
        {
          label: "Time-Independent Schrödinger Equation (Inside Box, U=0)",
          latex: "\\frac{d^2 \\psi}{dx^2} + \\frac{2mE}{\\hbar^2}\\psi = 0 \\implies \\frac{d^2\\psi}{dx^2} + k^2\\psi = 0",
          annotation: "Where wave number k = \\sqrt{2mE}/\\hbar.",
        },
        {
          label: "Quantized Wave Numbers & Boundary Conditions",
          latex: "\\psi(0) = 0, \\quad \\psi(L) = 0 \\implies k_n = \\frac{n\\pi}{L}, \\quad n \\in \\{1, 2, 3, \\dots\\}",
          annotation: "Strict nodes at the infinite potential boundaries.",
        },
        {
          label: "Normalized Spatial Eigenfunctions",
          latex: "\\psi_n(x) = \\sqrt{\\frac{2}{L}} \\sin\\left(\\frac{n\\pi x}{L}\\right)",
          annotation: "Normalization derived from \\int_0^L |\\psi_n(x)|^2 dx = 1.",
        },
        {
          label: "Quantized Energy Eigenvalues",
          latex: "E_n = \\frac{n^2 \\pi^2 \\hbar^2}{2 m L^2} = \\frac{n^2 h^2}{8 m L^2} = n^2 E_1",
          annotation: "Energies scale quadratically with quantum number n; ground state E_1 > 0.",
        },
        {
          label: "Analytical Probability Integral Formula",
          latex: "P(x_1 \\le x \\le x_2) = \\int_{x_1}^{x_2} |\\psi_n(x)|^2 dx = \\frac{x_2 - x_1}{L} - \\frac{1}{2n\\pi}\\left[\\sin\\left(\\frac{2n\\pi x_2}{L}\\right) - \\sin\\left(\\frac{2n\\pi x_1}{L}\\right)\\right]",
          annotation: "Exact Modern Academy exam formula for fractional box probabilities.",
        },
      ],
      derivationSteps: [
        {
          stepNumber: 1,
          title: "General Solution Inside Box",
          math: "\\psi(x) = A \\sin(kx) + B \\cos(kx)",
          explanation: "Second order linear differential equation with constant coefficients.",
        },
        {
          stepNumber: 2,
          title: "Application of Boundary Conditions",
          math: "\\psi(0) = B = 0 \\implies \\psi(x) = A \\sin(kx); \\quad \\psi(L) = A \\sin(kL) = 0 \\implies kL = n\\pi",
          explanation: "Since A cannot be zero (otherwise wavefunction is identically zero), sin(kL) must vanish.",
        },
        {
          stepNumber: 3,
          title: "Normalization Constant Determination",
          math: "\\int_0^L A^2 \\sin^2\\left(\\frac{n\\pi x}{L}\\right) dx = A^2 \\left[\\frac{x}{2} - \\frac{\\sin(2n\\pi x/L)}{4n\\pi/L}\\right]_0^L = A^2 \\frac{L}{2} = 1 \\implies A = \\sqrt{\\frac{2}{L}}",
          explanation: "Using trigonometric identity sin^2(theta) = 1/2(1 - cos(2*theta)).",
        },
      ],
    },
    mentalModelTrack: {
      title: "Concrete Mental Model & Physical Simulation Track",
      analogy: "Vibrating Guitar String with Quantum Probability: The wavefunctions psi_n(x) are exact geometric twins of the acoustic standing wave modes of a pinned violin string of length L. Mode n=1 has a single fundamental bulge (antinode). Mode n=2 has two bulges with a stationary node at the exact midpoint x = L/2. But Born's interpretation adds a quantum twist: probability density is the square of amplitude! For an electron in state n=2, it can be detected on the left half or right half, but has ZERO probability of ever being caught at the exact center!",
      physicalIntuition: "Zero-Point Energy E_1 > 0: A particle in a box CANNOT have E = 0. If E = 0, momentum p = 0, so Delta p = 0. But by Heisenberg uncertainty, Delta x * Delta p >= hbar/2. If Delta p = 0, Delta x would have to be infinite, violating the fact that the particle is trapped inside a box of width L. The box geometry enforces kinetic agitation!",
      keyMechanics: [
        "n nodes count: psi_n(x) has (n-1) nodes inside the box (excluding walls).",
        "Symmetry: Probability density |psi_n|^2 is symmetric about the center x = L/2.",
        "Fractional probabilities: Finding particle in left half [0, L/2] is always exactly 50% for all n.",
        "Finding particle in center third [L/3, 2L/3] varies dramatically with n.",
      ],
      boundaryLimits: [
        {
          condition: "n \\to \\infty (\\text{High Quantum Numbers})",
          mathBehavior: "\\lim_{n \\to \\infty} \\frac{1}{2n\\pi}[\\dots] = 0 \\implies P = \\frac{x_2 - x_1}{L}",
          physicalInterpretation: "Bohr Correspondence Principle: Quantum probability converges into uniform classical probability!",
        },
        {
          condition: "L \\to \\infty (\\text{Unbounded Free Particle})",
          mathBehavior: "\\Delta E = E_{n+1} - E_n \\to 0",
          physicalInterpretation: "Energy continuum is recovered; quantization disappears.",
        },
      ],
    },
    examTraps: [
      "Setting n=0: n=0 gives psi(x) = 0 everywhere, meaning NO particle exists. Quantum numbers start at n=1!",
      "Integrating psi(x) instead of |psi(x)|^2 when calculating probabilities.",
      "Exam calculation trap: For state n=2, probability between L/4 and 3L/4 is NOT 50%, evaluate exact sin term!",
    ],
  },

  // CHAPTER 2: Quantum Tunneling & Potential Barriers
  {
    id: "quantum-tunneling",
    chapterId: "ch2",
    chapterTitle: "Chapter 2: Wave Mechanics & Bound States",
    title: "Quantum Tunneling & Potential Barriers",
    subtitle: "Finite Barriers, Attenuation Coefficient, and Transmission Coefficient",
    classicalAxiom: "Classical Determinism: A particle with energy E encountering a potential barrier of height V_0 > E must be 100% reflected (Reflection coefficient R = 1, Transmission T = 0). It is strictly forbidden from penetrating into or through the barrier.",
    breakdownPoint: "Wavefunctions are continuous differential fields. At a finite potential boundary, boundary conditions (psi and dpsi/dx continuity) force the wavefunction to penetrate into the barrier as an exponentially decaying evanescent wave. If the barrier is thin, the wave leaks out the other side!",
    quantumPostulate: "Tunneling: When E < V_0, the particle possesses a non-zero probability of leaking through a finite barrier of thickness a, with transmission coefficient T ~= e^(-2*gamma*a).",
    mathTrack: {
      title: "Abstract Mathematical & Symbolic Track",
      description: "Attenuation coefficient, evanescent decay inside forbidden region, and transmission probability.",
      equations: [
        {
          label: "Schrödinger Equation in Classically Forbidden Region (U = V_0 > E)",
          latex: "\\frac{d^2\\psi}{dx^2} - \\frac{2m(V_0 - E)}{\\hbar^2}\\psi = 0 \\implies \\frac{d^2\\psi}{dx^2} - \\gamma^2\\psi = 0",
          annotation: "Negative kinetic energy equivalent yields real exponential solutions rather than oscillatory sines/cosines.",
        },
        {
          label: "Attenuation Coefficient",
          latex: "\\gamma = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}",
          annotation: "Measures decay rate per meter inside the barrier.",
        },
        {
          label: "Penetration Depth (Decay Length)",
          latex: "\\delta = \\frac{1}{\\gamma} = \\frac{\\hbar}{\\sqrt{2m(V_0 - E)}}",
          annotation: "Distance over which the wavefunction amplitude drops by 1/e (~37%).",
        },
        {
          label: "Transmission Coefficient (Approximation for gamma*a >> 1)",
          latex: "T \\approx e^{-2\\gamma a}, \\quad R + T = 1",
          annotation: "Exponential sensitivity: doubling barrier thickness squares the transmission drop!",
        },
      ],
      derivationSteps: [
        {
          stepNumber: 1,
          title: "Wavefunction in Three Regions",
          math: "\\psi_I(x) = A e^{ik_1 x} + B e^{-ik_1 x}; \\quad \\psi_{II}(x) = C e^{-\\gamma x} + D e^{\\gamma x}; \\quad \\psi_{III}(x) = F e^{ik_1 x}",
          explanation: "Regions I and III are oscillatory; Region II inside barrier has exponentially decaying solutions.",
        },
        {
          stepNumber: 2,
          title: "Boundary Continuity Matching at x = 0 and x = a",
          math: "\\psi_I(0) = \\psi_{II}(0), \\quad \\psi'_I(0) = \\psi'_{II}(0); \\quad \\psi_{II}(a) = \\psi_{III}(a), \\quad \\psi'_{II}(a) = \\psi'_{III}(a)",
          explanation: "Enforces wave continuity and smoothness (first derivative continuity).",
        },
      ],
    },
    mentalModelTrack: {
      title: "Concrete Mental Model & Physical Simulation Track",
      analogy: "Total Internal Reflection & Frustrated Waves: In optics, light hitting a glass-air interface beyond the critical angle undergoes total internal reflection. However, an evanescent electromagnetic wave penetrates a fraction of a wavelength into the air. If you bring a second glass prism within nanometers of the first, the light jumps across the gap! Quantum tunneling is the exact matter-wave equivalent of frustrated total internal reflection.",
      physicalIntuition: "The STM (Scanning Tunneling Microscope) exploits this exponential sensitivity: atomic tip held ~0.5 nm above a surface draws tunneling current I proportional to e^(-2*gamma*d). A vertical change of just 0.1 nm (one atomic diameter) alters the tunneling current by a factor of 10! This allows imaging individual atoms.",
      keyMechanics: [
        "Fowler-Nordheim Field Emission: High electric field bends surface barrier into a triangle, enabling electrons to tunnel out in cold cathodes.",
        "Alpha Decay (Gamow): Alpha particle tunnels through the nuclear Coulomb repulsive barrier; explains half-lives varying from nanoseconds to billions of years.",
        "Ammonia (NH_3) Molecule Inversion: Nitrogen atom tunnels back and forth through the plane of hydrogen atoms (the basis of the first maser).",
      ],
      boundaryLimits: [
        {
          condition: "a \\to 0 (\\text{Barrier disappears})",
          mathBehavior: "T \\to 1, \\quad R \\to 0",
          physicalInterpretation: "Free particle propagation.",
        },
        {
          condition: "V_0 \\to \\infty (\\text{Infinite Barrier})",
          mathBehavior: "\\gamma \\to \\infty, \\quad \\delta \\to 0 \\implies T = 0",
          physicalInterpretation: "Recovers the rigid infinite square well boundary condition psi = 0.",
        },
      ],
    },
    examTraps: [
      "Confusing attenuation gamma with wave number k: gamma has a minus sign in the differential equation!",
      "Forgetting the factor of 2 in exponent: T ~= e^(-2*gamma*a), NOT e^(-gamma*a) (because T is probability ratio, which is square of amplitude).",
      "Stating energy changes during tunneling: The particle tunnels AT CONSTANT ENERGY E. It does NOT lose energy inside the barrier.",
    ],
  },

  // CHAPTER 3: Bohr Hydrogen Model & Rydberg Formula
  {
    id: "bohr-hydrogen-model",
    chapterId: "ch3",
    chapterTitle: "Chapter 3: Atomic Physics & Structural Transitions",
    title: "Bohr Model of the Hydrogen Atom & Rydberg Spectra",
    subtitle: "Angular Momentum Quantization, Orbital Radii, Energy Levels, and Spectral Taxonomy",
    classicalAxiom: "Rutherford-Maxwell Classical Collapse: Accelerated electric charges radiate electromagnetic waves continuously. An electron orbiting a nucleus undergoes centripetal acceleration a = v^2/r, so it must continuously radiate energy, lose orbital radius, and spiral into the nucleus within ~10^-11 seconds. Atoms could never stably exist, and would emit a continuous rainbow, not discrete spectral lines.",
    breakdownPoint: "Atoms are remarkably stable for billions of years, and excited atomic gases emit sharply defined discrete spectral lines (Lyman, Balmer, Paschen).",
    quantumPostulate: "Bohr Postulates (1913): (1) Electrons move only in non-radiating 'stationary' circular orbits; (2) Orbital angular momentum is quantized in integer units of hbar: L = mvr = n*hbar; (3) Radiation is emitted/absorbed only when an electron jumps between stationary orbits: Delta E = E_i - E_f = hf.",
    mathTrack: {
      title: "Abstract Mathematical & Symbolic Track",
      description: "Rigorous dynamical derivation of Bohr radii, energy eigenvalues, and the Rydberg spectral formula.",
      equations: [
        {
          label: "Angular Momentum Quantization",
          latex: "L = m_e v r = n\\hbar = \\frac{n h}{2\\pi}, \\quad n \\in \\{1, 2, 3, \\dots\\}",
          annotation: "Bohr's core postulate; equivalent to fitting integer de Broglie wavelengths n*lambda = 2*pi*r.",
        },
        {
          label: "Coulomb-Centripetal Dynamic Equilibrium",
          latex: "\\frac{k Z e^2}{r^2} = \\frac{m_e v^2}{r} \\implies m_e v^2 r = k Z e^2",
          annotation: "Balancing electrostatic attraction with centripetal requirement.",
        },
        {
          label: "Quantized Orbital Radii",
          latex: "r_n = \\frac{n^2 \\hbar^2}{m_e k Z e^2} = \\frac{n^2 a_0}{Z}, \\quad a_0 = 0.529 \\text{ \\AA} = 0.0529 \\text{ nm}",
          annotation: "Radii scale quadratically with n and inversely with atomic number Z.",
        },
        {
          label: "Quantized Total Energy Levels",
          latex: "E_n = K + U = \\frac{1}{2}m v^2 - \\frac{k Z e^2}{r_n} = -\\frac{k Z e^2}{2 r_n} = -\\frac{13.6 Z^2}{n^2} \\text{ eV}",
          annotation: "Negative sign denotes bound state. Ground state of Hydrogen is E_1 = -13.6 eV.",
        },
        {
          label: "Rydberg Spectral Formula",
          latex: "\\frac{1}{\\lambda} = R_H Z^2 \\left( \\frac{1}{n_f^2} - \\frac{1}{n_i^2} \\right), \\quad R_H = 1.09737 \\times 10^7 \\text{ m}^{-1}",
          annotation: "Universal formula for photon emission/absorption between initial state n_i and final state n_f.",
        },
      ],
      derivationSteps: [
        {
          stepNumber: 1,
          title: "Isolating Velocity from Angular Momentum",
          math: "v = \\frac{n\\hbar}{m_e r}",
          explanation: "Expressing orbital velocity purely in terms of quantum number n and radius r.",
        },
        {
          stepNumber: 2,
          title: "Substituting into Coulomb Dynamic Balance",
          math: "m_e \\left(\\frac{n\\hbar}{m_e r}\\right)^2 r = k Z e^2 \\implies \\frac{n^2 \\hbar^2}{m_e r} = k Z e^2",
          explanation: "Solving for r yields r_n = n^2 * hbar^2 / (m_e * k * Z * e^2).",
        },
        {
          stepNumber: 3,
          title: "Deriving Total Energy via Virial Theorem",
          math: "E_n = \\frac{1}{2}m v^2 - \\frac{k Z e^2}{r_n} = \\frac{k Z e^2}{2 r_n} - \\frac{k Z e^2}{r_n} = -\\frac{k Z e^2}{2 r_n}",
          explanation: "Kinetic energy is half the magnitude of electrostatic potential energy: K = -U/2.",
        },
      ],
    },
    mentalModelTrack: {
      title: "Concrete Mental Model & Physical Simulation Track",
      analogy: "The Quantum Stepladder: Energy levels in hydrogen are like rungs on a strange gravitational stepladder where the rungs get closer and closer together as you climb higher (spacing Delta E proportional to 1/n^2 - 1/(n+1)^2). An electron cannot hover between rungs; it can only teleport from one rung to another, shedding the exact energy difference as a photon packet.",
      physicalIntuition: "Spectral Series Taxonomy: Lyman drops to n_f=1 (large energy drops => Ultraviolet). Balmer drops to n_f=2 (medium energy drops => Visible spectrum: H_alpha red, H_beta cyan, H_gamma blue, H_delta violet). Paschen drops to n_f=3 (Infrared). Brackett drops to n_f=4. Pfund drops to n_f=5. Humphreys drops to n_f=6.",
      keyMechanics: [
        "Lyman: n_f = 1 (Ultraviolet)",
        "Balmer: n_f = 2 (Visible & near UV)",
        "Paschen: n_f = 3 (Infrared)",
        "Brackett: n_f = 4 (Mid-Infrared)",
        "Pfund: n_f = 5 (Far-Infrared)",
        "Humphreys: n_f = 6 (Far-Infrared)",
        "Series Limit (Shortest wavelength): n_i = infinity (maximum energy transition).",
        "Longest wavelength in series: n_i = n_f + 1 (minimum energy transition).",
      ],
      boundaryLimits: [
        {
          condition: "n \\to \\infty (\\text{Ionization Limit})",
          mathBehavior: "E_\\infty \\to 0, \\quad r_\\infty \\to \\infty",
          physicalInterpretation: "Electron is liberated from the Coulomb well; ionization energy from ground state is exactly +13.6 eV.",
        },
        {
          condition: "n \\gg 1 (\\text{Bohr Correspondence Limit})",
          mathBehavior: "f_{\\text{transition}} = \\frac{E_{n} - E_{n-1}}{h} \\to f_{\\text{orbital}} = \\frac{v}{2\\pi r}",
          physicalInterpretation: "Quantum transition frequency perfectly equals classical orbital revolution frequency!",
        },
      ],
    },
    examTraps: [
      "Forgetting Z^2 for Hydrogen-like ions (e.g. He+ has Z=2 => energy levels multiplied by 4; Li2+ has Z=3 => multiplied by 9!).",
      "Confusing shortest wavelength (n_i = infinity) with longest wavelength (n_i = n_f + 1).",
      "Balmer series is the ONLY series with lines in the visible spectrum.",
    ],
  },

  // CHAPTER 3: Multi-Electron Atoms & Quantum Numbers
  {
    id: "multi-electron-quantum-numbers",
    chapterId: "ch3",
    chapterTitle: "Chapter 3: Atomic Physics & Structural Transitions",
    title: "Quantum Mechanical Multi-Electron Atoms & Selection Rules",
    subtitle: "The 4 Quantum Numbers, Pauli Exclusion, Hund's Rule, and Aufbau Progression",
    classicalAxiom: "Planetary Model: Identical point-mass electrons orbit in arbitrary coplanar ellipses without restriction on how many can share an orbit.",
    breakdownPoint: "Classical models cannot explain the Periodic Table, chemical valency, inertness of noble gases, anomalous Zeeman splitting, or Stern-Gerlach beam splitting.",
    quantumPostulate: "Wave mechanics in 3D central Coulomb potential produces exactly four quantum numbers (n, l, m_l, m_s) constrained by spherical harmonics, and the Pauli Exclusion Principle forbids two electrons from occupying the same state.",
    mathTrack: {
      title: "Abstract Mathematical & Symbolic Track",
      description: "Rigorous definition of the four quantum numbers, subshell capacities, and angular momentum space quantization.",
      equations: [
        {
          label: "Principal Quantum Number n",
          latex: "n \\in \\{1, 2, 3, \\dots\\}, \\quad \\text{Determines shell energy and radial size}",
          annotation: "Total states in shell = 2n^2.",
        },
        {
          label: "Orbital Angular Momentum Quantum Number l",
          latex: "l \\in \\{0, 1, \\dots, n-1\\}, \\quad L = \\sqrt{l(l+1)}\\hbar",
          annotation: "Subshells: l=0 (s), l=1 (p), l=2 (d), l=3 (f). Capacity = 2(2l+1).",
        },
        {
          label: "Magnetic Quantum Number m_l & Space Quantization",
          latex: "m_l \\in \\{-l, \\dots, 0, \\dots, +l\\}, \\quad L_z = m_l \\hbar, \\quad \\cos\\theta = \\frac{m_l}{\\sqrt{l(l+1)}}",
          annotation: "Quantizes orientation of angular momentum vector along z-axis into 2l+1 allowed angles.",
        },
        {
          label: "Spin Quantum Number m_s",
          latex: "m_s \\in \\left\\{-\\frac{1}{2}, +\\frac{1}{2}\\right\\}, \\quad S_z = m_s \\hbar",
          annotation: "Intrinsic spin angular momentum demonstrated by Stern-Gerlach experiment.",
        },
      ],
      derivationSteps: [
        {
          stepNumber: 1,
          title: "Separation of Variables in Spherical Coordinates",
          math: "\\Psi(r, \\theta, \\phi) = R(r) \\Theta(\\theta) \\Phi(\\phi)",
          explanation: "3D Schrödinger equation separates into Radial equation R(r) yielding n and l, Polar equation yielding l and m_l, Azimuthal equation yielding m_l.",
        },
        {
          stepNumber: 2,
          title: "Pauli Exclusion Principle Formulation",
          math: "\\Psi(1, 2) = -\\Psi(2, 1) \\implies \\text{No two electrons can share } (n, l, m_l, m_s)",
          explanation: "Fermionic antisymmetric wavefunctions enforce complete state exclusion.",
        },
      ],
    },
    mentalModelTrack: {
      title: "Concrete Mental Model & Physical Simulation Track",
      analogy: "The Quantum Hotel: Shell n is the hotel floor. Subshell l is the suite type (s=standard room, p=penthouse with 3 wings, d=duplex with 5 rooms). Orbital m_l is the specific room orientation. Spin m_s means each bed accommodates only two guests: one head-up (+1/2) and one head-down (-1/2). Hund's rule is the passenger bus rule: every room gets one solitary electron before anyone is forced to double up!",
      physicalIntuition: "Space Quantization: The angular momentum vector L cannot point in arbitrary directions in a magnetic field; its projection on the z-axis is locked to discrete integer multiples of hbar. Moreover, L can NEVER align 100% parallel to the z-axis because L_z = m_l*hbar < sqrt(l(l+1))*hbar!",
      keyMechanics: [
        "Pauli Exclusion: Max 2 electrons in s-orbital, 6 in p-orbital, 10 in d-orbital, 14 in f-orbital.",
        "Total shell capacity = 2n^2 (n=1 => 2; n=2 => 8; n=3 => 18; n=4 => 32).",
        "Hund's Rule: Orbitals of equal energy are occupied singly before pairing to minimize electron-electron Coulomb repulsion.",
        "Moseley's Law for X-rays: sqrt(f) = a(Z - 1) for K_alpha transitions.",
      ],
      boundaryLimits: [
        {
          condition: "l = 0 (\\text{s-state})",
          mathBehavior: "L = \\sqrt{0(1)}\\hbar = 0, \\quad m_l = 0",
          physicalInterpretation: "Spherically symmetric electron cloud with zero net orbital angular momentum.",
        },
        {
          condition: "m_l = \\pm l",
          mathBehavior: "\\cos\\theta = \\frac{l}{\\sqrt{l(l+1)}} < 1",
          physicalInterpretation: "Even at maximum tilt, the vector precesses at an angle; complete alignment with the field is quantum mechanically forbidden by uncertainty.",
        },
      ],
    },
    examTraps: [
      "Stating L = l*hbar: FALSE. Magnitude is sqrt(l(l+1))*hbar! Only the z-component is L_z = m_l*hbar.",
      "Duane-Hunt cutoff wavelength lambda_min in continuous X-rays depends ONLY on accelerating voltage V: lambda_min = hc / (eV). Target material does NOT affect lambda_min!",
      "For K_alpha characteristic X-rays, effective charge is Z_eff = Z - 1 due to screening by the remaining 1s electron.",
    ],
  },

  // CHAPTER 4: Special Theory of Relativity & Kinematics
  {
    id: "special-relativity-kinematics",
    chapterId: "ch4",
    chapterTitle: "Chapter 4: Special Theory of Relativity",
    title: "Special Relativity: Postulates, Lorentz Transformations & Kinematics",
    subtitle: "Light Clock Time Dilation, Length Contraction, Relativistic Momentum and E=mc^2",
    classicalAxiom: "Galilean Relativity & Absolute Time: Time t' = t flows uniformly throughout the universe independent of observer motion. Velocities add algebraically u' = u - v. The ether is the stationary absolute medium through which light waves propagate at c.",
    breakdownPoint: "Michelson-Morley interferometer experiment (1887) observed zero fringe shift as Earth orbited the Sun—proving the ether does not exist. Galilean velocity addition fails for electrodynamics.",
    quantumPostulate: "Einstein's Postulates (1905): (1) Principle of Relativity: The laws of physics are invariant across all inertial reference frames; (2) Constancy of the Speed of Light: Light propagates through vacuum with speed c in all inertial frames, independent of source or observer velocity.",
    mathTrack: {
      title: "Abstract Mathematical & Symbolic Track",
      description: "Transverse light-clock derivation of time dilation, Lorentz factor, and relativistic energy-momentum invariant.",
      equations: [
        {
          label: "Lorentz Factor gamma",
          latex: "\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}} \\ge 1, \\quad \\lim_{v \\to c} \\gamma = \\infty",
          annotation: "Universal scaling factor for all relativistic phenomena.",
        },
        {
          label: "Time Dilation Equation",
          latex: "\\Delta t = \\gamma \\Delta t_p = \\frac{\\Delta t_p}{\\sqrt{1 - v^2/c^2}}",
          annotation: "Proper time Delta t_p is measured by a clock at rest relative to the events.",
        },
        {
          label: "Length Contraction Equation",
          latex: "L = \\frac{L_p}{\\gamma} = L_p \\sqrt{1 - v^2/c^2}",
          annotation: "Occurs exclusively along the axis of relative motion; transverse dimensions y and z remain invariant.",
        },
        {
          label: "Lorentz Coordinate Transformations",
          latex: "x' = \\gamma(x - vt), \\quad y' = y, \\quad z' = z, \\quad t' = \\gamma\\left(t - \\frac{vx}{c^2}\\right)",
          annotation: "Space and time are coupled into four-dimensional spacetime.",
        },
        {
          label: "Relativistic Velocity Addition",
          latex: "u_x = \\frac{u'_x + v}{1 + \\frac{u'_x v}{c^2}}, \\quad u'_x = \\frac{u_x - v}{1 - \\frac{u_x v}{c^2}}",
          annotation: "Guarantees compounding two subluminal velocities never exceeds c.",
        },
        {
          label: "Mass-Energy Equivalence & Invariant Relation",
          latex: "E = mc^2 = \\gamma m_0 c^2 = K + m_0 c^2, \\quad E^2 = p^2 c^2 + m_0^2 c^4",
          annotation: "Total energy E consists of kinetic energy K plus rest mass energy E_0 = m_0 c^2.",
        },
      ],
      derivationSteps: [
        {
          stepNumber: 1,
          title: "Transverse Light Clock Geometry in Rest Frame S'",
          math: "\\Delta t_p = \\frac{2d}{c} \\implies d = \\frac{c \\Delta t_p}{2}",
          explanation: "Proper time interval for vertical light pulse round-trip between two mirrors separated by distance d.",
        },
        {
          stepNumber: 2,
          title: "Observer Frame S Moving with Relative Speed v",
          math: "\\left(c \\frac{\\Delta t}{2}\\right)^2 = d^2 + \\left(v \\frac{\\Delta t}{2}\\right)^2",
          explanation: "In frame S, the light follows the hypotenuse of a right-angled triangle of base v*Delta t / 2.",
        },
        {
          stepNumber: 3,
          title: "Pythagorean Substitution and Solving for Delta t",
          math: "c^2 \\frac{\\Delta t^2}{4} = c^2 \\frac{\\Delta t_p^2}{4} + v^2 \\frac{\\Delta t^2}{4} \\implies (c^2 - v^2)\\Delta t^2 = c^2 \\Delta t_p^2",
          explanation: "Dividing by c^2 yields Delta t^2 (1 - v^2/c^2) = Delta t_p^2 => Delta t = gamma * Delta t_p.",
        },
        {
          stepNumber: 4,
          title: "Reduction to Galilean Transformation (v/c -> 0)",
          math: "\\lim_{v/c \\to 0} \\gamma = 1, \\quad x' = 1(x - vt) = x - vt, \\quad t' = 1(t - 0) = t",
          explanation: "Classical Galilean transformations emerge seamlessly at low speeds.",
        },
      ],
    },
    mentalModelTrack: {
      title: "Concrete Mental Model & Physical Simulation Track",
      analogy: "The Cosmic Speedometer vs Spacetime Odometer: You are always traveling through spacetime at the fixed speed of light c! If you are standing completely still in space, 100% of your motion is directed through time (you age at normal rate). As you accelerate through space, a portion of your fixed spacetime motion is diverted into spatial velocity. Consequently, your motion through time MUST slow down (time dilation). At the speed of light v = c, all motion is in space, and time stops completely!",
      physicalIntuition: "Muon Decay Proof: Atmospheric muons generated at altitude h ~ 10 km have rest lifetime 2.2 microseconds. Moving at 0.998c, classically they could travel only 660 m and should never reach the ground. Yet detectors record them in abundance! Why? To Earth observers, their clock is dilated by gamma ~ 15.8 (lifetime expands to 34.8 microseconds => 10.4 km range). To the muon, its clock is normal, but the 10 km mountain is contracted to 10 km / 15.8 = 633 m!",
      keyMechanics: [
        "Time dilation: Moving clocks run slow (Delta t = gamma * Delta t_p).",
        "Length contraction: Moving objects are shortened along the direction of motion (L = L_p / gamma).",
        "Relativity of Simultaneity: Events that appear simultaneous at different locations in one frame are NOT simultaneous in another.",
        "Invariant: E^2 - p^2 c^2 = m_0^2 c^4 is identical in all reference frames.",
        "Photons have m_0 = 0, so E = pc and p = E/c.",
      ],
      boundaryLimits: [
        {
          condition: "v \\to c",
          mathBehavior: "\\gamma \\to \\infty \\implies \\Delta t \\to \\infty, \\quad L \\to 0, \\quad p \\to \\infty",
          physicalInterpretation: "An infinite amount of energy would be required to accelerate any massive body to the speed of light.",
        },
        {
          condition: "v \\ll c (\\text{Classical Limit})",
          mathBehavior: "K = (\\gamma - 1)m_0 c^2 \\approx \\left(1 + \\frac{1}{2}\\frac{v^2}{c^2} - 1\\right)m_0 c^2 = \\frac{1}{2}m_0 v^2",
          physicalInterpretation: "Taylor expansion reproduces classical Newtonian kinetic energy exactly!",
        },
      ],
    },
    examTraps: [
      "Mixing up proper time Delta t_p and dilated time Delta t: Delta t_p is ALWAYS the SHORTEST time interval, measured by a clock present at both events.",
      "Length contraction occurs ONLY along the axis parallel to velocity; transverse dimensions y and z are completely unchanged!",
      "Writing K = 1/2 m v^2 at relativistic speeds: Total energy is E = gamma*m_0*c^2, and kinetic energy is K = (gamma - 1)m_0 c^2.",
    ],
  },
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: "photocell-experiment",
    chapterId: "ch1",
    name: "Photoelectric Photocell & Stopping Potential Apparatus",
    objective: "Determine Planck's constant h, the work function phi, and threshold frequency f_c of various emitter cathodes using variable retarding voltages.",
    classicalExpectation: "Current should increase with light intensity at any frequency; stopping potential should increase with intensity; delayed emission at low light levels.",
    experimentalObservation: "Emission is instantaneous (< 10^-9 s); stopping potential V_0 is completely independent of intensity and linear with frequency; current is strictly zero for f < f_c.",
    quantumOrRelativisticExplanation: "Light is absorbed as single photon packets E = hf; stopping potential satisfies eV_0 = hf - phi.",
    apparatusComponents: [
      { name: "Monochromatic Light Source with Filters", role: "Selects precise wavelengths (Mercury spectrum: 365 nm, 404 nm, 436 nm, 546 nm, 577 nm)." },
      { name: "Evacuated Photocell with Quartz Window", role: "Transmits UV radiation without absorption and prevents electron scattering against air molecules." },
      { name: "Photosensitive Cathode & Anode Collector", role: "Emits photoelectrons upon irradiation and collects them under applied potential." },
      { name: "Variable DC Retarding Voltage Supply", role: "Applies opposing electric field to halt the fastest emitted photoelectrons." },
      { name: "Sensitive Picoammeter", role: "Detects micro/nano-ampere level photocurrent to pinpoint stopping potential V_0." },
    ],
    governingEquations: [
      { latex: "V_0 = \\left(\\frac{h}{e}\\right) f - \\frac{\\phi}{e}", variables: "V_0: Stopping potential (V), f: Frequency (Hz), phi: Work function (J)" },
      { latex: "I_{\\text{sat}} \\propto \\text{Light Intensity}", variables: "Saturation photocurrent scales with photon arrival rate." },
    ],
    pitfallsAndTroubleshooting: [
      "Contact potential difference between cathode and anode shifts the V_0 intercept.",
      "Stray ambient light or dark current creates spurious readings near zero current.",
      "Anode back-emission caused by scattered light striking the collector anode.",
    ],
  },
  {
    id: "compton-spectrometer",
    chapterId: "ch1",
    name: "Compton X-Ray Scattering Spectrometer",
    objective: "Measure the wavelength shift Delta lambda of scattered X-rays as a function of scattering angle theta and verify the electron Compton wavelength lambda_c.",
    classicalExpectation: "Electrons should oscillate at incident frequency and re-radiate waves with unchanged wavelength Delta lambda = 0 (Thomson scattering).",
    experimentalObservation: "Scattered spectrum contains two distinct peaks: an unmodified peak (lambda' = lambda) and a shifted peak (lambda' > lambda) whose shift matches Delta lambda = lambda_c (1 - cos theta).",
    quantumOrRelativisticExplanation: "Shifted peak is from relativistic elastic collisions with quasi-free outer electrons; unmodified peak is from collisions with tightly bound inner electrons where effective mass is the whole atom.",
    apparatusComponents: [
      { name: "Mo / Cu Target X-Ray Tube", role: "Produces high-intensity monochromatic X-rays (e.g. Molybdenum K_alpha line lambda = 0.709 Angstrom)." },
      { name: "Graphite / Carbon Target", role: "Provides a dense matrix of loosely bound valence electrons for scattering." },
      { name: "Rotatable Collimator Arm", role: "Selects precise scattering angle theta from 0 to 150 degrees." },
      { name: "Calcite / LiF Crystal Spectrometer", role: "Separates scattered wavelengths via Bragg diffraction: n*lambda = 2d*sin(theta_B)." },
      { name: "Ionization Chamber or Scintillation Detector", role: "Measures photon count rate as a function of Bragg angle." },
    ],
    governingEquations: [
      { latex: "\\Delta\\lambda = \\lambda_c (1 - \\cos\\theta), \\quad \\lambda_c = \\frac{h}{m_0 c} = 0.0243 \\text{ \\AA}", variables: "theta: Scattering angle, m_0: Electron rest mass" },
      { latex: "K_e = hf - hf' = h c \\left(\\frac{1}{\\lambda} - \\frac{1}{\\lambda'}\\right)", variables: "Recoil kinetic energy transferred to electron." },
    ],
    pitfallsAndTroubleshooting: [
      "Low scattering cross-section requires long counting times to resolve weak shifted peaks.",
      "Multiple scattering inside thick targets broadens the spectral lines.",
    ],
  },
  {
    id: "davisson-germer-diffraction",
    chapterId: "ch2",
    name: "Davisson-Germer Nickel Crystal Electron Diffraction",
    objective: "Demonstrate the wave nature of electrons and verify de Broglie's relation lambda = h/p using Bragg crystal diffraction.",
    classicalExpectation: "Electrons should scatter uniformly or diffusely from the nickel surface like shotgun pellets.",
    experimentalObservation: "A sharp peak in electron intensity occurs at accelerating voltage V = 54 V and scattering angle phi = 50 degrees.",
    quantumOrRelativisticExplanation: "Electrons behave as de Broglie matter waves; constructive interference occurs when Bragg's law n*lambda = 2d*sin(theta) is satisfied across the crystal atomic planes.",
    apparatusComponents: [
      { name: "Electron Gun with Heated Tungsten Filament", role: "Emits electrons thermally, accelerated through adjustable voltage anode V." },
      { name: "Target Monocrystal Nickel Block", role: "Target heated and slowly annealed to form large, uniform periodic crystal planes (d = 0.091 nm)." },
      { name: "Rotatable Faraday Collector Cup", role: "Measures current of scattered electrons at arbitrary angle phi." },
      { name: "High Vacuum Chamber", role: "Prevents electrons from losing energy in collisions with gas molecules." },
    ],
    governingEquations: [
      { latex: "\\lambda_{\\text{de Broglie}} = \\frac{h}{\\sqrt{2 m_e e V}} = \\frac{1.226}{\\sqrt{V}} \\text{ nm}", variables: "Theoretical wave calculation for 54 V => 0.167 nm." },
      { latex: "\\theta_{\\text{Bragg}} = \\frac{180^\\circ - \\phi}{2} = 65^\\circ, \\quad \\lambda_{\\text{Bragg}} = 2 d \\sin\\theta = 0.165 \\text{ nm}", variables: "Experimental Bragg measurement matching within 1%!" },
    ],
    pitfallsAndTroubleshooting: [
      "Surface contamination of nickel crystal destroys regular interference; requires in-situ oven annealing.",
      "Residual magnetic fields deflect low-energy electron trajectories; requires mu-metal magnetic shielding.",
    ],
  },
  {
    id: "michelson-morley-interferometer",
    chapterId: "ch4",
    name: "Michelson-Morley Interferometer (The Great Null Experiment)",
    objective: "Detect the Earth's motion relative to the hypothetical luminiferous ether by observing interference fringe shifts upon rotation.",
    classicalExpectation: "Earth moving through ether at v ~ 30 km/s should cause different round-trip times along longitudinal vs transverse arms, producing an expected fringe shift of ~0.4 fringes upon 90-degree rotation.",
    experimentalObservation: "Fringe shift was strictly zero (within 0.005 fringes experimental precision).",
    quantumOrRelativisticExplanation: "The luminiferous ether does not exist; the speed of light c is an invariant constant in all inertial reference frames.",
    apparatusComponents: [
      { name: "Monochromatic Light Source", role: "Provides coherent light beam." },
      { name: "Half-Silvered Beam Splitter", role: "Splits beam 50/50 into two perpendicular arms of equal length L." },
      { name: "Perpendicular Highly Flat Plane Mirrors", role: "Reflects the split beams back toward the beam splitter." },
      { name: "Viewing Telescope & Scale", role: "Observes interference fringes created by recombined beams." },
      { name: "Heavy Floating Mercury Trough Bed", role: "Vibration isolation allowing smooth 360-degree rotation without mechanical strain." },
    ],
    governingEquations: [
      { latex: "\\Delta t_{\\text{longitudinal}} = \\frac{2 L c}{c^2 - v^2}, \\quad \\Delta t_{\\text{transverse}} = \\frac{2 L}{\\sqrt{c^2 - v^2}}", variables: "Classical ether wind time predictions." },
      { latex: "\\Delta N = \\frac{2 L v^2}{\\lambda c^2} \\approx 0.4 \\text{ fringes}", variables: "Predicted shift upon 90-degree rotation; actual observed shift was ZERO." },
    ],
    pitfallsAndTroubleshooting: [
      "Thermal expansion of arms could mimic or mask time differences; solved by using invar steel and sandstone.",
      "Mechanical vibrations could wash out delicate interference bands; solved by floating table in pool of mercury.",
    ],
  },
];

export const MNEMONIC_CARDS: MnemonicCard[] = [
  {
    id: "rydberg-series",
    chapterId: "ch3",
    concept: "Hydrogen Spectral Series Order",
    mnemonicPhrase: "Lazy Boys Play Ball Past Midnight (Lyman, Balmer, Paschen, Brackett, Pfund, Humphreys)",
    explanation: "Remembers the sequence of spectral series as final energy level n_f increases from 1 to 6.",
    visualAnchor: "Imagine an elevator stopping at floors 1 (Basement UV), 2 (Ground floor Visible window), 3, 4, 5, 6 (Attic Infrared).",
    rules: [
      "n_f = 1: Lyman (UV)",
      "n_f = 2: Balmer (Visible)",
      "n_f = 3: Paschen (Near IR)",
      "n_f = 4: Brackett (Mid IR)",
      "n_f = 5: Pfund (Far IR)",
      "n_f = 6: Humphreys (Far IR)",
    ],
  },
  {
    id: "quantum-numbers",
    chapterId: "ch3",
    concept: "The 4 Quantum Numbers Sequence",
    mnemonicPhrase: "Never Let Mice Sleep (n, l, m_l, m_s)",
    explanation: "Hierarchical order of the four atomic quantum coordinates.",
    visualAnchor: "A pyramid: n (floors: 1, 2, 3...) -> l (shape: 0 to n-1) -> m_l (direction: -l to +l) -> m_s (spin: -1/2 or +1/2).",
    rules: [
      "n: Size & Energy (1, 2, 3, ...)",
      "l: Shape (0=s, 1=p, 2=d, 3=f up to n-1)",
      "m_l: Orientation (-l to +l, exactly 2l+1 states)",
      "m_s: Spin (+1/2, -1/2)",
    ],
  },
  {
    id: "relativity-effects",
    chapterId: "ch4",
    concept: "Relativity Sign Conventions (Dilation vs Contraction)",
    mnemonicPhrase: "Clocks Run SLOW, Rulers Run SHORT, Mass Grows HEAVY",
    explanation: "Quick anchor for the Lorentz factor gamma: time expands (t = gamma * t_p), length contracts (L = L_p / gamma), mass increases (m = gamma * m_0).",
    visualAnchor: "A speeding rocket: the dashboard clock ticks slowly like molasses, the rocket hull flattens like a pancake, and the thrusters need colossal energy as inertia skyrockets.",
    rules: [
      "gamma is ALWAYS >= 1.",
      "Proper time t_p is ALWAYS the shortest time.",
      "Proper length L_p is ALWAYS the longest length.",
      "Rest mass m_0 is ALWAYS the minimum mass.",
    ],
  },
  {
    id: "compton-angles",
    chapterId: "ch1",
    concept: "Compton Shift Angle Limits",
    mnemonicPhrase: "Zero at Glance, One at Right, Double at Rebound",
    explanation: "Instantly recalls Delta lambda = lambda_c * (1 - cos theta) for the 3 primary exam angles.",
    visualAnchor: "A clock face: 0 degrees (top) = 0 shift; 90 degrees (quarter) = 1*lambda_c shift; 180 degrees (bottom) = 2*lambda_c shift.",
    rules: [
      "theta = 0 deg: Delta lambda = 0",
      "theta = 90 deg: Delta lambda = lambda_c = 2.43 pm",
      "theta = 180 deg: Delta lambda = 2 * lambda_c = 4.85 pm",
    ],
  },
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: "fc-1",
    chapterId: "ch1",
    front: {
      concept: "Ultraviolet Catastrophe",
      prompt: "What mathematical assumption in classical mechanics caused the Ultraviolet Catastrophe, and how did Planck fix it?",
      latexSnippet: "I(\\lambda, T) = \\frac{2\\pi c k_B T}{\\lambda^4}",
    },
    back: {
      definition: "The classical equipartition theorem assumed cavity oscillators could vibrate with any continuous energy (average <E> = k_BT), causing intensity to diverge to infinity at short wavelengths.",
      governingEquation: "\\langle E \\rangle = \\frac{hf}{e^{hf/k_B T} - 1}",
      physicalLimit: "\\lim_{\\lambda \\to 0} I(\\lambda) = 0 \\quad (\\text{Exponential denominator eliminates catastrophe})",
      siUnits: "\\text{W}/\\text{m}^3 \\text{ or } \\text{W}\\cdot\\text{m}^{-2}\\cdot\\text{nm}^{-1}",
      examWarning: "Never write that Planck quantized light in space; he originally quantized only the wall atomic oscillators!",
    },
  },
  {
    id: "fc-2",
    chapterId: "ch1",
    front: {
      concept: "Photoelectric Stopping Potential",
      prompt: "State the physical definition of stopping potential V_0 and explain why it is independent of light intensity.",
      latexSnippet: "e V_0 = hf - \\phi",
    },
    back: {
      definition: "The negative potential difference applied to the collector anode just sufficient to decelerate and stop the most energetic emitted photoelectron (K_max), reducing the photocurrent to strictly zero.",
      governingEquation: "V_0 = \\left(\\frac{h}{e}\\right) f - \\frac{\\phi}{e}",
      physicalLimit: "f < f_c \\implies V_0 = 0 \\quad (\\text{No emission occurs})",
      siUnits: "\\text{Volts (V)}",
      examWarning: "Slope of V_0 vs f is always h/e = 4.14 x 10^-15 V*s, completely independent of the cathode metal!",
    },
  },
  {
    id: "fc-3",
    chapterId: "ch1",
    front: {
      concept: "Compton Wavelength",
      prompt: "Give the mathematical formula, value, and physical significance of the electron Compton wavelength lambda_c.",
      latexSnippet: "\\lambda_c = \\frac{h}{m_0 c}",
    },
    back: {
      definition: "The fundamental quantum-relativistic length scale of an electron, representing the wavelength of a photon whose energy equals the rest mass energy of an electron.",
      governingEquation: "\\lambda_c = \\frac{h}{m_0 c} = 2.426 \\times 10^{-12} \\text{ m} = 0.0243 \\text{ \\AA} = 2.43 \\text{ pm}",
      physicalLimit: "\\Delta\\lambda_{\\max} = 2\\lambda_c = 4.85 \\text{ pm at } \\theta = 180^\\circ",
      siUnits: "\\text{Meters (m)}",
      examWarning: "Compton shift Delta lambda depends ONLY on scattering angle theta, NOT on incident wavelength lambda!",
    },
  },
  {
    id: "fc-4",
    chapterId: "ch2",
    front: {
      concept: "Infinite Square Well Zero-Point Energy",
      prompt: "Why is the ground state energy E_1 of a particle in an infinite square well strictly greater than zero?",
      latexSnippet: "E_1 = \\frac{\\pi^2 \\hbar^2}{2 m L^2} > 0",
    },
    back: {
      definition: "If E = 0, momentum p = 0, meaning uncertainty Delta p = 0. By Heisenberg uncertainty Delta x * Delta p >= hbar/2, Delta x would be infinite, violating the confinement within box width L. Hence ground state must have non-zero kinetic energy.",
      governingEquation: "E_n = n^2 E_1 = \\frac{n^2 h^2}{8 m L^2}",
      physicalLimit: "L \\to \\infty \\implies E_1 \\to 0 \\quad (\\text{Continuum recovered})",
      siUnits: "\\text{Joules (J) or eV}",
      examWarning: "Quantum number n starts at 1, NEVER 0! n=0 corresponds to an unphysical zero wavefunction.",
    },
  },
  {
    id: "fc-5",
    chapterId: "ch2",
    front: {
      concept: "Quantum Tunneling Attenuation",
      prompt: "What is the attenuation coefficient gamma for a barrier of height V_0 when particle energy is E < V_0?",
      latexSnippet: "\\gamma = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}",
    },
    back: {
      definition: "The spatial rate of exponential decay of the evanescent wavefunction inside the classically forbidden barrier region.",
      governingEquation: "T \\approx e^{-2\\gamma a}, \\quad \\delta = \\frac{1}{\\gamma} = \\text{Penetration Depth}",
      physicalLimit: "E \\to V_0 \\implies \\gamma \\to 0, \\quad T \\to 1",
      siUnits: "\\text{m}^{-1}",
      examWarning: "Transmission exponent has a factor of 2: T ~= exp(-2*gamma*a), because T is a probability ratio!",
    },
  },
  {
    id: "fc-6",
    chapterId: "ch3",
    front: {
      concept: "Duane-Hunt Cutoff Wavelength",
      prompt: "State Duane-Hunt's law for the continuous X-ray Bremsstrahlung spectrum and identify what parameter controls it.",
      latexSnippet: "\\lambda_{\\min} = \\frac{hc}{e V}",
    },
    back: {
      definition: "The minimum cutoff wavelength of continuous X-rays produced when an incident electron decelerates in a single catastrophic collision, transferring 100% of its kinetic energy into one photon.",
      governingEquation: "\\lambda_{\\min} = \\frac{hc}{e V} = \\frac{12400}{V} \\text{ \\AA} = \\frac{1.24 \\times 10^{-6}}{V} \\text{ m}",
      physicalLimit: "V \\to \\infty \\implies \\lambda_{\\min} \\to 0",
      siUnits: "\\text{Meters (m)}",
      examWarning: "lambda_min depends ONLY on the tube accelerating voltage V, and is completely independent of the anode target metal!",
    },
  },
  {
    id: "fc-7",
    chapterId: "ch4",
    front: {
      concept: "Proper Time vs Dilated Time",
      prompt: "How do you distinguish Proper Time Delta t_p from Dilated Time Delta t in special relativity problems?",
      latexSnippet: "\\Delta t = \\gamma \\Delta t_p = \\frac{\\Delta t_p}{\\sqrt{1 - v^2/c^2}}",
    },
    back: {
      definition: "Proper time Delta t_p is the time interval between two events measured by an observer (or single clock) at rest relative to the events (events occur at the exact same spatial location). Dilated time Delta t is measured by any frame moving relative to that clock.",
      governingEquation: "\\Delta t = \\gamma \\Delta t_p, \\quad \\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}} \\ge 1",
      physicalLimit: "v \\to c \\implies \\Delta t \\to \\infty \\quad (\\text{Time freezes})",
      siUnits: "\\text{Seconds (s)}",
      examWarning: "Proper time is ALWAYS the minimum time interval! Moving clocks always run slow.",
    },
  },
  {
    id: "fc-8",
    chapterId: "ch4",
    front: {
      concept: "Relativistic Energy-Momentum Invariant",
      prompt: "Write the relativistic invariant relation linking energy, momentum, and rest mass. What is it for a photon?",
      latexSnippet: "E^2 = p^2 c^2 + m_0^2 c^4",
    },
    back: {
      definition: "A scalar Lorentz invariant four-momentum norm whose numerical value is identical across all inertial reference frames.",
      governingEquation: "E^2 - p^2 c^2 = m_0^2 c^4; \\quad \\text{For photon (} m_0 = 0 \\text{)}: E = pc",
      physicalLimit: "p \\to 0 \\implies E = m_0 c^2 \\quad (\\text{Einstein's Rest Energy})",
      siUnits: "\\text{Joules (J) or eV}",
      examWarning: "Never write E = mc^2 for kinetic energy; kinetic energy is K = (gamma - 1)m_0 c^2.",
    },
  },
];
