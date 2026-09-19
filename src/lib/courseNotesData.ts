export interface ComparisonItem {
  number: number;
  criterion: string;
  photoelectric: string;
  compton: string;
}

export interface CourseLecturePage {
  pageNumber: number;
  chapter: string;
  title: string;
  keyConcepts: string[];
  summaryText: string;
  keyEquations: Array<{
    latex: string;
    description: string;
  }>;
  crucialTakeaways: string[];
}

export const PHOTOELECTRIC_VS_COMPTON_TABLE: ComparisonItem[] = [
  {
    number: 1,
    criterion: "Microscopic Diagram",
    photoelectric: "Incident photon interacts with inner/outer shell electron; electron is completely ejected from surface.",
    compton: "High-energy photon collides elastically with outer electron; photon scatters at angle θ and electron recoils at angle ϕ.",
  },
  {
    number: 2,
    criterion: "Energy Level & Spectral Regime",
    photoelectric: "Low Energy Phenomenon (Visible light, UV radiation, order of ~eV).",
    compton: "Mid to High Energy Phenomenon (X-rays, Gamma rays, order of ~keV to ~MeV).",
  },
  {
    number: 3,
    criterion: "Energy Transfer Mechanism",
    photoelectric: "Photon delivers 100% of its total energy to a single electron in an all-or-nothing absorption.",
    compton: "Photon transfers only a fraction of its energy to a single electron during an elastic collision.",
  },
  {
    number: 4,
    criterion: "Theoretical Formulation & Pioneer",
    photoelectric: "Explained by Albert Einstein (1905, Nobel Prize 1921).",
    compton: "Discovered and formulated by Arthur H. Compton (1923, Nobel Prize 1927).",
  },
  {
    number: 5,
    criterion: "Fate of the Incident Photon",
    photoelectric: "The incident photon completely disappears (absorbed; extinguished).",
    compton: "The photon survives as a scattered photon with reduced energy and longer wavelength (λ' > λ).",
  },
  {
    number: 6,
    criterion: "Initial State of Electron",
    photoelectric: "Electron is bound to the metal atom/surface (requires overcoming work function Φ).",
    compton: "Electron is treated as essentially free and stationary (photon energy hf >> binding energy E_b).",
  },
  {
    number: 7,
    criterion: "Radiation Frequency Condition",
    photoelectric: "Occurs with radiation of any wavelength as long as f ≥ f_0 (depends on the work function of the metal used).",
    compton: "Requires very high frequency photons (X-rays and Gamma rays) so Compton shift Δλ is detectable.",
  },
  {
    number: 8,
    criterion: "Nature of Collision Mechanics",
    photoelectric: "Inelastic interaction / absorption process.",
    compton: "Relativistic elastic collision (conserves both relativistic energy and relativistic momentum).",
  },
  {
    number: 9,
    criterion: "Wave-Particle Duality Demonstration",
    photoelectric: "Proves light behaves like localized particle packets (photons).",
    compton: "Proves light behaves like localized particles carrying definite momentum p = h/λ.",
  },
  {
    number: 10,
    criterion: "Scattered Photon Wavelength vs Incident",
    photoelectric: "No scattered photon exists (complete annihilation).",
    compton: "Wavelength of scattered photon is strictly larger than incident photon (λ' = λ + Δλ).",
  },
  {
    number: 11,
    criterion: "Final Physical Products",
    photoelectric: "Ionized atom + emitted photoelectron.",
    compton: "Recoiling relativistic electron + scattered photon of lower frequency f'.",
  },
  {
    number: 12,
    criterion: "Angular & Frequency Dependence of Shift",
    photoelectric: "Kinetic energy K_max = hf - Φ depends directly on frequency f and is independent of angle.",
    compton: "Wavelength shift Δλ = (h/m_0 c)(1 - cos θ) depends strictly on scattering angle θ and is independent of incident frequency.",
  },
];

export const COURSE_LECTURE_PAGES: CourseLecturePage[] = [
  {
    pageNumber: 1,
    chapter: "Chapter 1: Waves Behaving as Particles",
    title: "Thermal Radiation, Blackbody Cavity & Wien's Displacement Law",
    keyConcepts: [
      "Newton Corpuscular (particles in straight lines) vs Huygens (waves: reflection/refraction)",
      "Thermal radiation continuously emitted by all bodies at any temperature",
      "Blackbody definition: perfect absorber for all incident radiation at all wavelengths and angles",
      "Cavity model with small aperture: multiple internal reflections ensure total absorption",
      "Stefan-Boltzmann law: P = σ A e T⁴, Total Intensity I = σ T⁴",
      "Wien's displacement law: λ_max ∝ 1/T, λ_max · T = 2.898 × 10⁻³ m·K",
    ],
    summaryText: "Thermal radiation is electromagnetic radiation continuously emitted by all matter with a non-zero absolute temperature. An ideal blackbody absorbs 100% of incident radiation (emissivity e = 1). In a small cavity opening, light reflects repeatedly until complete absorption occurs. Wien's law dictates that hotter bodies peak at progressively shorter wavelengths.",
    keyEquations: [
      { latex: "I = \\sigma T^4", description: "Stefan-Boltzmann Law (Total radiant intensity)" },
      { latex: "\\lambda_{\\max} T = 2.898 \\times 10^{-3}\\text{ m}\\cdot\\text{K}", description: "Wien's Displacement Law (Peak emission wavelength)" },
    ],
    crucialTakeaways: [
      "As T increases, peak wavelength shifts left toward shorter wavelengths while total emitted power grows as T⁴.",
      "A cavity with a tiny hole acts as the closest physical realization of an ideal blackbody.",
    ],
  },
  {
    pageNumber: 2,
    chapter: "Chapter 1: Waves Behaving as Particles",
    title: "Rayleigh-Jeans Failure & Photoelectric Effect Fundamentals",
    keyConcepts: [
      "Rayleigh-Jeans classical equipartition fails at short wavelengths (Ultraviolet Catastrophe)",
      "Planck radiation law resolves catastrophe and reduces to Rayleigh-Jeans at long wavelengths",
      "Photoelectric experiment: increasing light frequency increases photoelectron kinetic energy",
      "Increasing light amplitude/intensity increases photocurrent (electrons/second), but NOT K_max",
      "Einstein's photon energy: E = hf",
      "Work function Φ: minimum energy to eject an electron from a specific metal surface",
    ],
    summaryText: "The classical Rayleigh-Jeans formula predicted infinite radiant power at short wavelengths. Planck corrected this by introducing discrete quantization. In the photoelectric effect, electrons are liberated instantly upon illumination if f > f_0. Tripling intensity yields more emitted electrons per second, but does not alter individual electron kinetic energy.",
    keyEquations: [
      { latex: "E_{\\text{photon}} = K.E._{\\text{electron}} + \\Phi", description: "Einstein's Photoelectric Conservation Balance" },
      { latex: "I_{\\text{photo}} \\propto \\text{Light Intensity}, \\quad K_{\\max} \\propto \\text{Frequency } f", description: "Intensity vs Frequency operational independence" },
    ],
    crucialTakeaways: [
      "Stopping potential V_0 is completely independent of illumination intensity.",
      "Photoelectric effect cannot be explained by classical wave continuous accumulation.",
    ],
  },
  {
    pageNumber: 3,
    chapter: "Chapter 1: Waves Behaving as Particles",
    title: "Photoelectric Work Function Formulas & Unabridged Compton Derivation",
    keyConcepts: [
      "Linear relationship: K_max = hf - Φ",
      "Threshold frequency f_0 when K_max = 0: Φ = hf_0 = hc/λ_0",
      "Stopping potential definition: K_max = (1/2)mv² = eV_0",
      "Compton scattering derivation from conservation of energy and 2D momentum",
      "X-momentum: (hf/c) = (hf'/c)cos θ + mv cos ϕ",
      "Y-momentum: 0 = (hf'/c)sin θ - mv sin ϕ",
      "Squaring and adding momentum components eliminates recoil electron angle ϕ",
    ],
    summaryText: "Setting K_max = 0 gives the threshold frequency f_0 and cutoff wavelength λ_0. In Compton scattering, a relativistic collision between an incident X-ray photon and a stationary electron is formulated with conservation of energy and 2D momentum. Eliminating the electron coordinates leads directly to the Compton shift formula.",
    keyEquations: [
      { latex: "K_{\\max} = hf - \\Phi = e V_0", description: "Maximum kinetic energy and stopping potential" },
      { latex: "\\Phi = hf_0 = \\frac{hc}{\\lambda_0}", description: "Threshold work function and cutoff wavelength" },
      { latex: "\\Delta\\lambda = \\lambda' - \\lambda = \\frac{h}{m_e c}(1 - \\cos\\theta)", description: "Compton Scattering Formula" },
    ],
    crucialTakeaways: [
      "Energy conservation: hf + m_0 c² = hf' + mc².",
      "The angular elimination yields m²v²c² = (hf - hf' cos θ)² + (hf' sin θ)².",
    ],
  },
  {
    pageNumber: 4,
    chapter: "Chapter 1: Waves Behaving as Particles",
    title: "Compton Angle Limits & Official 12-Point Comparison Matrix",
    keyConcepts: [
      "Case 1: θ = 0° → Δλ = 0 (forward scattering, no shift)",
      "Case 2: θ = 90° = π/2 → Δλ = h/(m_0 c) = 0.0243 Å = 2.43 pm (standard Compton wavelength)",
      "Case 3: θ = 180° = π → Δλ = 2h/(m_0 c) = 0.0486 Å = 4.86 pm (backscattering, maximum shift)",
      "12-point comparison matrix: Photoelectric Effect vs Compton Effect",
    ],
    summaryText: "As scattering angle θ varies from 0° to 180°, the wavelength shift Δλ ranges from 0 to 2h/(m_0 c). Modern Academy course notes mandate the memorization of the 12 key comparative distinctions between the Photoelectric effect and Compton scattering.",
    keyEquations: [
      { latex: "\\Delta\\lambda(\\theta = 0^\\circ) = 0", description: "Forward transmission limit" },
      { latex: "\\Delta\\lambda(\\theta = 90^\\circ) = \\frac{h}{m_0 c} = 2.43\\text{ pm}", description: "Right-angle Compton wavelength" },
      { latex: "\\Delta\\lambda(\\theta = 180^\\circ) = \\frac{2h}{m_0 c} = 4.86\\text{ pm}", description: "Direct head-on backscattering maximum" },
    ],
    crucialTakeaways: [
      "Photoelectric effect = all-or-nothing absorption of low-energy photon on bound electron.",
      "Compton effect = elastic collision of mid/high-energy photon with quasi-free electron.",
    ],
  },
  {
    pageNumber: 5,
    chapter: "Chapter 2: Matter Waves & Wave Mechanics",
    title: "De Broglie Matter Waves & Heisenberg Uncertainty Principle",
    keyConcepts: [
      "De Broglie hypothesis: every moving mass m with speed v has matter wavelength λ = h/p",
      "Alternative forms: λ = h/mv = h/√(2mqV) = h/√(2m·K.E.)",
      "Relativistic photon momentum: E = mc² ⇒ m = E/c², p = mc = E/c = hf/c = h/λ",
      "Heisenberg Uncertainty Principle: Δx Δp_x ≥ ℏ/2",
      "Energy-time uncertainty: ΔE Δt ≥ ℏ/2",
    ],
    summaryText: "In 1924, Louis de Broglie hypothesized that particles exhibit wave nature with wavelength inversely proportional to momentum. Werner Heisenberg in 1927 proved that conjugative variables (position/momentum and energy/time) cannot be simultaneously determined with infinite precision.",
    keyEquations: [
      { latex: "\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mqV}} = \\frac{h}{\\sqrt{2m(K.E.)}}", description: "De Broglie Matter Wavelength in all curricular forms" },
      { latex: "\\Delta x \\Delta p \\ge \\frac{\\hbar}{2}", description: "Heisenberg Position-Momentum Uncertainty Relation" },
      { latex: "\\Delta E \\Delta t \\ge \\frac{\\hbar}{2}", description: "Heisenberg Energy-Time Uncertainty Relation" },
    ],
    crucialTakeaways: [
      "Accelerating an electron through voltage V gives matter wavelength λ = 1.226 / √V (in nm).",
      "Uncertainty is not an experimental defect; it is an intrinsic mathematical property of wave packets.",
    ],
  },
  {
    pageNumber: 6,
    chapter: "Chapter 2: Matter Waves & Wave Mechanics",
    title: "Double-Slit Electron Diffraction & 1D Schrödinger TISE Derivation",
    keyConcepts: [
      "Electron double-slit: D sin θ = λ/2, λ = h/p ⇒ θ ≈ h/(2pD) for small angles",
      "Arrival probability is determined by intensity of interfering matter waves |ψ₁ + ψ₂|²",
      "Derivation of Time-Independent Schrödinger Equation (TISE)",
      "Total Energy: E = K.E. + P.E. = p²/(2m) + U",
      "Plane wave function: ψ = e^{i(kx - ωt)}",
      "d²ψ/dx² = -k²ψ = -(p²/ℏ²)ψ ⇒ p²ψ = -ℏ² d²ψ/dx²",
      "Multiplying energy balance by ψ yields Eψ = -(ℏ²/2m) d²ψ/dx² + Uψ",
    ],
    summaryText: "When mono-energetic electrons pass through two slits separated by D, detectors collect individual particle clicks that collectively form interference fringes. The Time-Independent Schrödinger Equation is derived by applying spatial derivatives to a plane wave, converting classical momentum p² into the differential operator -ℏ² d²/dx².",
    keyEquations: [
      { latex: "E\\psi = -\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2} + U\\psi", description: "1D Time-Independent Schrödinger Equation" },
      { latex: "k = \\frac{2\\pi}{\\lambda} = \\frac{p}{\\hbar}, \\quad p = \\hbar k", description: "Wave number and momentum operator relations" },
    ],
    crucialTakeaways: [
      "Electrons arrive as discrete particle spots, but their probability distribution is dictated by wave interference.",
      "The kinetic energy operator is T̂ = - (ℏ²/2m) d²/dx².",
    ],
  },
  {
    pageNumber: 7,
    chapter: "Chapter 2: Matter Waves & Wave Mechanics",
    title: "Infinite & Finite Square Wells, Barrier Tunneling & 5 Applications",
    keyConcepts: [
      "Infinite Square Well (Particle-in-a-Box): λ_n = 2L/n = h/p_n, E_n = (n²π²ℏ²)/(2mL²) = n² E_1",
      "Finite Square Well: E_n ≈ (n²π²ℏ²)/(2m(L + 2δ)²), penetration depth δ = 1/α = ℏ/√(2m(U - E))",
      "Square potential barrier tunneling: T = e^{-2γa}, where γ = √(2m(V_0 - E))/ℏ ≡ 1/(2d)",
      "Conservation: R + T = 1",
      "Five applications: (1) Field Emission, (2) Alpha Decay, (3) Ammonia Inversion, (4) Simple Harmonic Oscillator barrier penetration, (5) Scanning Tunneling Microscopy (STM)",
    ],
    summaryText: "Confining a particle to a 1D box creates standing matter waves with zero boundary conditions, giving discrete energy eigenvalues E_n = n² E_1. In a finite well or barrier, the wavefunction penetrates into classically forbidden regions where V_0 > E as an exponential decay. Transmission coefficient T ≈ e^{-2γa} enables tunneling.",
    keyEquations: [
      { latex: "E_n = \\frac{n^2 h^2}{8mL^2} = n^2 E_1", description: "Infinite Square Well quantized energy levels" },
      { latex: "\\delta = \\frac{1}{\\alpha} = \\frac{\\hbar}{\\sqrt{2m(U - E)}}", description: "Finite well barrier penetration depth" },
      { latex: "T = e^{-2\\gamma a}, \\quad R + T = 1", description: "Tunneling transmission coefficient" },
    ],
    crucialTakeaways: [
      "The zero-point energy E_1 > 0 is mandatory due to the Heisenberg uncertainty principle.",
      "STM exploits the exponential sensitivity of T to tip-sample separation a.",
    ],
  },
  {
    pageNumber: 8,
    chapter: "Chapter 3: Atomic Physics & Structural Transitions",
    title: "Balmer Series Observation, 3D Schrödinger Model & Rydberg Derivation",
    keyConcepts: [
      "Why Balmer was observed first: Balmer series transitions fall in the visible light spectrum (400-700 nm)",
      "Four visible Balmer lines: H_α (red, 656.3 nm), H_β (green, 486.1 nm), H_γ (blue, 434.1 nm), H_δ (violet, 410.2 nm)",
      "Schrödinger 3D hydrogen requires 3 spatial quantum numbers (n, l, m_l) plus spin m_s, refining Bohr's single n",
      "Ground state: n = 1; Excited states: n > 1",
      "Ionization energy: minimum energy to remove ground-state electron (13.6 eV)",
      "Rydberg formula derivation: ΔE = E_i - E_f = hf = hc/λ ⇒ 1/λ = R_H(1/n_f² - 1/n_i²)",
      "Pauli Exclusion Principle & Hund's Rule",
    ],
    summaryText: "Johann Balmer observed hydrogen lines first because they fall directly within human vision. While Bohr's model explained hydrogen energy levels using a single quantum number n, the 3D Schrödinger solution revealed three spatial quantum numbers (n, l, m_l) plus electron spin m_s. The Rydberg formula is derived directly from ΔE = hc/λ.",
    keyEquations: [
      { latex: "\\frac{1}{\\lambda} = R_H\\left( \\frac{1}{n_f^2} - \\frac{1}{n_i^2} \\right), \\quad R_H = 1.097 \\times 10^7\\text{ m}^{-1}", description: "Rydberg Spectral Formula" },
      { latex: "E_n = \\frac{-13.6\\text{ eV}}{n^2}", description: "Hydrogen discrete energy levels" },
    ],
    crucialTakeaways: [
      "Lyman series = UV (n_f = 1). Balmer series = Visible (n_f = 2). Paschen = IR (n_f = 3).",
      "Ionization energy is E_∞ - E_1 = 0 - (-13.6 eV) = +13.6 eV.",
    ],
  },
  {
    pageNumber: 9,
    chapter: "Chapter 3: Atomic Physics & Structural Transitions",
    title: "Orbital Shapes (p_x, p_y, p_z) & Hund's Rule of Maximum Multiplicity",
    keyConcepts: [
      "Hund's rule: electrons in an atom remain unpaired with parallel spins whenever possible",
      "Spatial dumbbell shapes of p_x, p_y, p_z orbitals along Cartesian coordinate axes",
      "Orbital degeneracy: for l = 1, there are 3 distinct orientations (m_l = -1, 0, +1)",
      "Minimization of inter-electronic Coulombic repulsion through parallel spins",
    ],
    summaryText: "Degenerate orbitals of the p subshell are mutually perpendicular along the x, y, and z axes. Hund's rule mandates that each p orbital must receive one electron with parallel spin before any orbital receives a second pairing electron.",
    keyEquations: [
      { latex: "m_l = -1, 0, +1 \\implies p_x, p_y, p_z", description: "Threefold spatial orientation of p-subshell" },
    ],
    crucialTakeaways: [
      "Hund's rule maximizes total spin S, reducing electron-electron repulsion energy.",
      "Carbon (Z=6) has configuration 1s² 2s² 2p_x¹ 2p_y¹ (two unpaired parallel electrons).",
    ],
  },
  {
    pageNumber: 10,
    chapter: "Chapter 4: Special Theory of Relativity",
    title: "Orbital Box Configurations & Inertial Reference Frames",
    keyConcepts: [
      "Orbital box filling diagrams: F (9 e⁻), Ca (20 e⁻), Cu (29 e⁻), Ti (22 e⁻), Ge (32 e⁻)",
      "Inertial coordinate system (x, y, z, t): frame in which Newton's first law (law of inertia) holds",
      "Characteristics of inertial frame: no net force, constant velocity v, moving in a straight line",
      "Any frame moving with constant velocity relative to an inertial frame is also an inertial frame",
      "Non-inertial frame: accelerated, velocity is not constant, does not move in a straight line",
      "Newtonian laws apply in inertial frames; relativistic laws apply universally",
    ],
    summaryText: "Electronic configurations are visualized using orbital boxes where arrows represent spin-up and spin-down. Chapter 4 begins with reference frames: an inertial frame is non-accelerating, where Newton's first law holds. Non-inertial frames experience fictitious forces because acceleration is non-zero.",
    keyEquations: [
      { latex: "\\vec{F}_{\\text{net}} = 0 \\implies \\vec{v} = \\text{constant}", description: "Inertial Frame Condition (Newton's 1st Law)" },
    ],
    crucialTakeaways: [
      "Galilean relativity allows Newton's laws to have the exact same form in all inertial frames.",
      "Accelerated systems are non-inertial and require fictitious inertial forces.",
    ],
  },
  {
    pageNumber: 11,
    chapter: "Chapter 4: Special Theory of Relativity",
    title: "Galilean Transformations & Michelson-Morley Ether Experiment",
    keyConcepts: [
      "Galilean coordinate transformation: x = x' + vt, y = y', z = z', t = t'",
      "Inverse Galilean transformation: x' = x - vt, y = y', z = z', t = t'",
      "Invariance of distance: x_B - x_A = x'_B - x'_A (since t_A = t_B)",
      "Galilean time invariance: t_ob = t_org (universal absolute time)",
      "Galilean velocity addition: u'_x = u_x - v, u_y' = u_y, u_z' = u_z",
      "Galilean acceleration invariance: a' = a (F = ma holds in all inertial frames)",
      "Michelson-Morley experiment: designed to detect small changes in speed of light due to earth's motion through ether wind",
    ],
    summaryText: "Classical mechanics relies on Galilean transformations where time is absolute and space is homogeneous. Michelson and Morley constructed a precision interferometer to measure the expected shift in fringe patterns due to the earth's movement through the hypothetical luminiferous ether.",
    keyEquations: [
      { latex: "x' = x - vt, \\quad t' = t", description: "Galilean Space-Time Transformations" },
      { latex: "u_x' = u_x - v, \\quad a' = a", description: "Galilean Velocity & Acceleration Transformations" },
    ],
    crucialTakeaways: [
      "In classical physics, acceleration is identical in all inertial frames, so F = ma is invariant.",
      "Michelson-Morley experiment produced a null result: no fringe shift was observed.",
    ],
  },
  {
    pageNumber: 12,
    chapter: "Chapter 4: Special Theory of Relativity",
    title: "Einstein's Postulates & Unabridged Lorentz Transformation Derivation",
    keyConcepts: [
      "Michelson-Morley conclusions: (1) no speed difference parallel vs perpendicular, (2) ether effects undetectable, (3) relative ether velocity is zero, (4) light speed does not depend on source motion, (5) light travels at same speed c in all directions",
      "Einstein Postulate 1: The laws of physics are identical in all inertial reference frames",
      "Einstein Postulate 2: The speed of light in vacuum c is invariant in all inertial frames",
      "Lorentz Transformation Derivation: Assume linear relations x' = γ(x - vt) and x = γ(x' + vt')",
      "Substitute x' into x: x = γ(γ(x - vt) + vt') = γ²x - γ²vt + γvt'",
      "Rearrange for t': γvt' = x(1 - γ²) + γ²vt ⇒ t' = γt + (1 - γ²)/(γv) · x = γ(t - vx/c²)",
    ],
    summaryText: "Einstein replaced the ether concept with two revolutionary postulates: equivalence of physical laws and the constancy of c. By equating spherical light wavefronts x = ct and x' = ct' across frames, the coordinate scaling factor γ is derived.",
    keyEquations: [
      { latex: "x' = \\gamma(x - vt), \\quad x = \\gamma(x' + vt')", description: "Lorentz transformation coordinate symmetry" },
      { latex: "t' = \\gamma\\left( t - \\frac{vx}{c^2} \\right)", description: "Lorentz transformation of time" },
    ],
    crucialTakeaways: [
      "Time is NOT absolute; the time coordinate t' in S' depends on both time t and position x in S.",
      "Simultaneity is relative: two events simultaneous in S are generally not simultaneous in S'.",
    ],
  },
  {
    pageNumber: 13,
    chapter: "Chapter 4: Special Theory of Relativity",
    title: "Derivation of Lorentz Factor γ & Reduction to Galilean Limit",
    keyConcepts: [
      "Light pulse propagation: x = ct and x' = ct'",
      "Ct = γ(x' + vt') = γ(ct' + vt') = γ(c + v)t'",
      "Ct' = γ(x - vt) = γ(ct - vt) = γ(c - v)t",
      "Multiplying equations: c² t t' = γ² (c² - v²) t t' ⇒ γ² = c² / (c² - v²) = 1 / (1 - v²/c²)",
      "Lorentz Factor: γ = 1 / √(1 - v²/c²)",
      "Reduction to Galilean transformations: when v << c, v²/c² ≈ 0 ⇒ γ ≈ 1 and vx/c² ≈ 0, yielding x' = x - vt and t' = t",
    ],
    summaryText: "Solving the light sphere equations reveals the universal Lorentz factor γ = 1/√(1 - v²/c²). In the classical non-relativistic regime (v << c), γ converges smoothly to 1 and the spatial term in the time equation vanishes, proving that Galilean relativity is the low-speed asymptotic limit of Einstein's relativity.",
    keyEquations: [
      { latex: "\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}} = \\frac{1}{\\sqrt{1 - \\beta^2}}", description: "Lorentz Factor γ" },
      { latex: "\\lim_{v/c \\to 0} \\gamma = 1 \\implies x' = x - vt, \\; t' = t", description: "Asymptotic reduction to Galilean Mechanics" },
    ],
    crucialTakeaways: [
      "Because v cannot exceed c, the quantity √(1 - v²/c²) is always real and γ ≥ 1.",
      "The speed of light c serves as the absolute cosmic speed limit.",
    ],
  },
  {
    pageNumber: 14,
    chapter: "Chapter 4: Special Theory of Relativity",
    title: "Time Dilation, Length Contraction & Relativistic Velocity Addition",
    keyConcepts: [
      "Time Dilation: light clock in moving frame. Round trip in rest frame: Δt_p = 2d/c",
      "Ground frame: light travels hypotenuse distance, giving Δt = γ Δt_p (moving clocks run slow)",
      "Relativity of Length (Lorentz Contraction): moving objects contract along motion direction: L = L_p / γ = L_p √(1 - v²/c²)",
      "Transverse dimensions (y, z) are unaltered: y' = y, z' = z",
      "Relativistic velocity transformation: u = (u' + v) / (1 + u'v/c²), and u' = (u - v) / (1 - uv/c²)",
    ],
    summaryText: "Special relativity demonstrates that proper time Δt_p (measured by a clock at rest relative to the event) is the shortest measured time interval; in any other moving frame, the interval is dilated: Δt = γ Δt_p. Similarly, moving lengths are contracted along the direction of motion: L = L_p / γ. Velocity addition ensures that no velocity can sum to exceed c.",
    keyEquations: [
      { latex: "\\Delta t = \\gamma \\Delta t_p = \\frac{\\Delta t_p}{\\sqrt{1 - v^2/c^2}}", description: "Time Dilation Formula (Moving clocks run slow)" },
      { latex: "L = \\frac{L_p}{\\gamma} = L_p \\sqrt{1 - \\frac{v^2}{c^2}}", description: "Length Contraction (Lorentz-FitzGerald Contraction)" },
      { latex: "u = \\frac{u' + v}{1 + \\frac{u' v}{c^2}}, \\quad u' = \\frac{u - v}{1 - \\frac{uv}{c^2}}", description: "Einstein Relativistic Velocity Addition" },
    ],
    crucialTakeaways: [
      "Proper length L_p is measured in the frame where the object is at rest.",
      "Length contraction occurs strictly parallel to the direction of relative motion.",
    ],
  },
  {
    pageNumber: 15,
    chapter: "Chapter 4: Special Theory of Relativity",
    title: "Relativistic Mass, Relativistic Momentum & Mass-Energy Equivalence",
    keyConcepts: [
      "Relativity of Mass: m = m_0 / √(1 - v²/c²) = γ m_0",
      "Relativistic Momentum: p = γ m_0 v",
      "Mass-Energy Equivalence: Total Energy E = mc² = γ m_0 c²",
      "Rest Energy: E_0 = m_0 c²",
      "Relativistic Kinetic Energy: K = E - E_0 = (γ - 1)m_0 c²",
      "Energy-Momentum Invariant: E² = p² c² + m_0² c⁴",
    ],
    summaryText: "As an object's speed approaches the speed of light, its relativistic inertia m increases as γ m_0, requiring infinite work to reach c. Einstein established the mass-energy equivalence E = mc²: mass is concentrated energy. Kinetic energy is not (1/2)mv², but rather K = (γ - 1)m_0 c².",
    keyEquations: [
      { latex: "m = \\gamma m_0 = \\frac{m_0}{\\sqrt{1 - v^2/c^2}}", description: "Relativistic Mass Formula" },
      { latex: "p = \\gamma m_0 v", description: "Relativistic Momentum" },
      { latex: "E = m c^2 = \\gamma m_0 c^2 = K + m_0 c^2", description: "Total Relativistic Energy & Mass-Energy Equivalence" },
      { latex: "K = (\\gamma - 1)m_0 c^2", description: "Relativistic Kinetic Energy" },
      { latex: "E^2 = p^2 c^2 + m_0^2 c^4", description: "Energy-Momentum Invariant Relation" },
    ],
    crucialTakeaways: [
      "At v << c, Taylor expanding γ gives K ≈ (1/2)m_0 v² + (3/8)m_0 v⁴/c² + ..., recovering classical mechanics.",
      "For massless particles (photons, m_0 = 0), E = pc.",
    ],
  },
];
