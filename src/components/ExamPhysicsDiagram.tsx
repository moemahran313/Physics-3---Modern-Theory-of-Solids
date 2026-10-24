import React from "react";

interface ExamPhysicsDiagramProps {
  type: string;
}

export const ExamPhysicsDiagram: React.FC<ExamPhysicsDiagramProps> = ({ type }) => {
  switch (type) {
    case "blackbody_spectrum":
      return (
        <div className="my-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <div className="text-slate-400 font-bold mb-2 flex items-center justify-between">
            <span className="text-amber-400">Planck vs. Rayleigh-Jeans Spectral Radiancy Curves</span>
            <span className="text-[10px] text-slate-500">λ_max T = 2.898 × 10⁻³ m·K</span>
          </div>
          <svg viewBox="0 0 400 180" className="w-full h-40 max-w-lg mx-auto overflow-visible">
            {/* Axes */}
            <line x1="40" y1="150" x2="380" y2="150" stroke="#64748b" strokeWidth="1.5" />
            <line x1="40" y1="150" x2="40" y2="20" stroke="#64748b" strokeWidth="1.5" />
            <text x="380" y="165" fill="#94a3b8" fontSize="10" textAnchor="end">Wavelength λ (nm)</text>
            <text x="30" y="20" fill="#94a3b8" fontSize="10" textAnchor="end" transform="rotate(-90 30,20)">Radiancy u(λ)</text>

            {/* Rayleigh-Jeans Divergence */}
            <path d="M 50 25 Q 70 120 180 148" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="80" y="45" fill="#ef4444" fontSize="9">Rayleigh-Jeans (UV Catastrophe)</text>

            {/* Planck Curves: High T (T=8050K) */}
            <path d="M 40 150 Q 85 20 150 110 T 360 148" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx="95" cy="45" r="3.5" fill="#38bdf8" />
            <text x="105" y="42" fill="#38bdf8" fontSize="10" fontWeight="bold">T = 8050 K (λ_max = 360 nm)</text>

            {/* Peak Line */}
            <line x1="95" y1="45" x2="95" y2="150" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
            <text x="95" y="162" fill="#38bdf8" fontSize="9" textAnchor="middle">360 nm</text>

            {/* Lower T */}
            <path d="M 40 150 Q 140 70 210 130 T 360 149" fill="none" stroke="#a855f7" strokeWidth="1.5" />
            <text x="170" y="90" fill="#a855f7" fontSize="9">T = 5000 K</text>
          </svg>
        </div>
      );

    case "photoelectric_iv":
      return (
        <div className="my-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <div className="text-slate-400 font-bold mb-2 flex items-center justify-between">
            <span className="text-cyan-400">Photoelectric Current vs. Applied Voltage (I - V)</span>
            <span className="text-[10px] text-slate-500">eV_s = K_max = hf - φ</span>
          </div>
          <svg viewBox="0 0 400 160" className="w-full h-36 max-w-lg mx-auto overflow-visible">
            <line x1="30" y1="90" x2="370" y2="90" stroke="#64748b" strokeWidth="1.5" />
            <line x1="160" y1="140" x2="160" y2="20" stroke="#64748b" strokeWidth="1.5" />
            <text x="370" y="105" fill="#94a3b8" fontSize="10" textAnchor="end">Voltage V</text>
            <text x="155" y="25" fill="#94a3b8" fontSize="10" textAnchor="end">Current I</text>

            {/* Stopping potential mark */}
            <circle cx="80" cy="90" r="3" fill="#f43f5e" />
            <text x="80" y="110" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">-V_s (Stopping)</text>

            {/* High Intensity curve */}
            <path d="M 80 90 C 120 90, 160 50, 350 50" fill="none" stroke="#06b6d4" strokeWidth="2" />
            <text x="310" y="42" fill="#06b6d4" fontSize="9">High Intensity (2× I_sat)</text>

            {/* Low Intensity curve */}
            <path d="M 80 90 C 120 90, 160 70, 350 70" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="310" y="82" fill="#6366f1" fontSize="9">Low Intensity (1× I_sat)</text>
          </svg>
        </div>
      );

    case "compton_collision":
      return (
        <div className="my-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <div className="text-slate-400 font-bold mb-2 flex items-center justify-between">
            <span className="text-indigo-400">Compton Scattering 2D Elastic Collision Vector Geometry</span>
            <span className="text-[10px] text-slate-500">Δλ = λ_c (1 - cos θ)</span>
          </div>
          <svg viewBox="0 0 400 160" className="w-full h-36 max-w-lg mx-auto overflow-visible">
            {/* Center target electron */}
            <circle cx="160" cy="80" r="7" fill="#38bdf8" />
            <text x="160" y="102" fill="#38bdf8" fontSize="9" textAnchor="middle">Free e⁻ (m₀)</text>

            {/* Incident Photon Wave */}
            <path d="M 30 80 Q 50 65, 70 80 T 110 80 T 150 80" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <text x="80" y="70" fill="#f59e0b" fontSize="9" textAnchor="middle">Incident Photon (E, λ)</text>

            {/* Scattered Photon */}
            <path d="M 165 77 Q 190 50, 220 55 T 280 40 T 340 25" fill="none" stroke="#ec4899" strokeWidth="2" />
            <text x="290" y="22" fill="#ec4899" fontSize="9">Scattered Photon (E', λ')</text>

            {/* Recoil Electron Vector */}
            <line x1="165" y1="83" x2="320" y2="135" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="290" y="145" fill="#10b981" fontSize="9">Recoil Electron (p_e, φ)</text>

            {/* Angle θ Arc */}
            <line x1="160" y1="80" x2="350" y2="80" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M 220 80 A 60 60 0 0 0 210 57" fill="none" stroke="#ec4899" strokeWidth="1.5" />
            <text x="230" y="70" fill="#ec4899" fontSize="10" fontWeight="bold">θ</text>
          </svg>
        </div>
      );

    case "infinite_well":
      return (
        <div className="my-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <div className="text-slate-400 font-bold mb-2 flex items-center justify-between">
            <span className="text-emerald-400">1D Infinite Potential Well Wavefunctions &amp; Probability Densities</span>
            <span className="text-[10px] text-slate-500">ψ_n(x) = √(2/L) sin(nπx/L)</span>
          </div>
          <svg viewBox="0 0 400 160" className="w-full h-36 max-w-lg mx-auto overflow-visible">
            {/* Wall Boundaries */}
            <rect x="50" y="20" width="12" height="120" fill="#334155" />
            <rect x="338" y="20" width="12" height="120" fill="#334155" />
            <line x1="62" y1="140" x2="338" y2="140" stroke="#64748b" strokeWidth="1.5" />
            <text x="62" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle">x = 0</text>
            <text x="338" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle">x = L</text>

            {/* Highlighted Middle Third [L/3, 2L/3] */}
            <rect x="154" y="20" width="92" height="120" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
            <text x="200" y="155" fill="#10b981" fontSize="9" textAnchor="middle">Middle Third [L/3, 2L/3] (P = 1/3)</text>

            {/* Ground State n = 1 */}
            <path d="M 62 100 Q 200 40 338 100" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <text x="355" y="100" fill="#38bdf8" fontSize="9">n = 1</text>

            {/* Excited State n = 2 */}
            <path d="M 62 60 Q 131 30 200 60 T 338 60" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="355" y="60" fill="#a855f7" fontSize="9">n = 2</text>
          </svg>
        </div>
      );

    case "barrier_tunneling":
      return (
        <div className="my-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <div className="text-slate-400 font-bold mb-2 flex items-center justify-between">
            <span className="text-rose-400">Quantum Tunneling Across Finite Barrier (E &lt; V₀)</span>
            <span className="text-[10px] text-slate-500">T ≈ e^(-2 k₂ L)</span>
          </div>
          <svg viewBox="0 0 400 150" className="w-full h-32 max-w-lg mx-auto overflow-visible">
            {/* Barrier Box */}
            <rect x="160" y="30" width="80" height="90" fill="rgba(244, 63, 94, 0.15)" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="200" y="22" fill="#f43f5e" fontSize="10" textAnchor="middle" fontWeight="bold">Barrier V₀ (Width L)</text>

            {/* Energy Level Line */}
            <line x1="30" y1="70" x2="370" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
            <text x="35" y="65" fill="#94a3b8" fontSize="9">Incident Energy E</text>

            {/* Incident/Reflected Wave (Region I) */}
            <path d="M 40 70 Q 70 45, 100 70 T 160 70" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <text x="90" y="105" fill="#38bdf8" fontSize="9" textAnchor="middle">Region I: ψ_I(x)</text>

            {/* Exponential Decaying Wave (Region II) */}
            <path d="M 160 70 Q 185 85, 240 92" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
            <text x="200" y="105" fill="#f43f5e" fontSize="9" textAnchor="middle">Region II: ψ ∝ e^(-k₂x)</text>

            {/* Transmitted Wave (Region III) */}
            <path d="M 240 92 Q 265 80, 290 92 T 360 92" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <text x="310" y="115" fill="#10b981" fontSize="9" textAnchor="middle">Region III: Transmitted ψ_III</text>
          </svg>
        </div>
      );

    case "bohr_levels":
      return (
        <div className="my-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <div className="text-slate-400 font-bold mb-2 flex items-center justify-between">
            <span className="text-amber-400">Hydrogen Bohr Energy Levels &amp; Spectral Series</span>
            <span className="text-[10px] text-slate-500">E_n = -13.6 eV / n²</span>
          </div>
          <svg viewBox="0 0 400 160" className="w-full h-36 max-w-lg mx-auto overflow-visible">
            {/* Levels */}
            <line x1="60" y1="130" x2="340" y2="130" stroke="#38bdf8" strokeWidth="2" />
            <text x="345" y="133" fill="#38bdf8" fontSize="9">n = 1 (-13.6 eV)</text>

            <line x1="60" y1="80" x2="340" y2="80" stroke="#818cf8" strokeWidth="1.5" />
            <text x="345" y="83" fill="#818cf8" fontSize="9">n = 2 (-3.4 eV)</text>

            <line x1="60" y1="50" x2="340" y2="50" stroke="#c084fc" strokeWidth="1.5" />
            <text x="345" y="53" fill="#c084fc" fontSize="9">n = 3 (-1.51 eV)</text>

            <line x1="60" y1="30" x2="340" y2="30" stroke="#f472b6" strokeWidth="1" />
            <text x="345" y="33" fill="#f472b6" fontSize="9">n = 4 (-0.85 eV)</text>

            {/* Lyman Series Arrow (Highest frequency: n=2 -> n=1) */}
            <line x1="120" y1="80" x2="120" y2="126" stroke="#f43f5e" strokeWidth="2.5" />
            <polygon points="117,124 123,124 120,130" fill="#f43f5e" />
            <text x="120" y="105" fill="#f43f5e" fontSize="9" textAnchor="end">Lyman-α (10.2 eV) </text>

            {/* Balmer Series Arrow (n=3 -> n=2) */}
            <line x1="220" y1="50" x2="220" y2="76" stroke="#06b6d4" strokeWidth="2" />
            <polygon points="217,74 223,74 220,80" fill="#06b6d4" />
            <text x="220" y="65" fill="#06b6d4" fontSize="9" textAnchor="start"> Balmer-α (1.89 eV)</text>
          </svg>
        </div>
      );

    case "michelson_interferometer":
      return (
        <div className="my-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <div className="text-slate-400 font-bold mb-2 flex items-center justify-between">
            <span className="text-cyan-400">Michelson-Morley Optical Interferometer Setup</span>
            <span className="text-[10px] text-slate-500">Null Shift: ΔN = 0 (c is constant)</span>
          </div>
          <svg viewBox="0 0 400 150" className="w-full h-32 max-w-lg mx-auto overflow-visible">
            {/* Light Source */}
            <rect x="30" y="65" width="25" height="20" fill="#eab308" />
            <text x="42" y="58" fill="#eab308" fontSize="9" textAnchor="middle">Source</text>

            {/* Beam Splitter */}
            <line x1="170" y1="65" x2="190" y2="85" stroke="#38bdf8" strokeWidth="3" />
            <text x="180" y="100" fill="#38bdf8" fontSize="8" textAnchor="middle">Half-Silvered Mirror</text>

            {/* Mirror 1 (Top) */}
            <rect x="170" y="15" width="20" height="6" fill="#cbd5e1" />
            <text x="180" y="10" fill="#cbd5e1" fontSize="8" textAnchor="middle">Mirror M₁ (Length L₁)</text>

            {/* Mirror 2 (Right) */}
            <rect x="330" y="65" width="6" height="20" fill="#cbd5e1" />
            <text x="355" y="77" fill="#cbd5e1" fontSize="8">Mirror M₂</text>

            {/* Detector/Telescope */}
            <rect x="170" y="125" width="20" height="15" fill="#a855f7" />
            <text x="180" y="148" fill="#a855f7" fontSize="8" textAnchor="middle">Telescope (Fringes)</text>

            {/* Light Rays */}
            <line x1="55" y1="75" x2="180" y2="75" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="180" y1="75" x2="180" y2="21" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="180" y1="75" x2="330" y2="75" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="180" y1="75" x2="180" y2="125" stroke="#ec4899" strokeWidth="2" />
          </svg>
        </div>
      );

    case "orbital_boxes":
      return (
        <div className="my-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
          <div className="text-slate-400 font-bold flex items-center justify-between">
            <span className="text-cyan-300">Aufbau &amp; Hund's Rule Degenerate Box Configuration</span>
            <span className="text-[10px] text-slate-500">Parallel Spins Prior to Pairing</span>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <div className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-center">
              <span className="text-slate-400 block text-[9px]">1s</span>
              <span className="text-cyan-400 font-bold">[ ↑↓ ]</span>
            </div>
            <div className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-center">
              <span className="text-slate-400 block text-[9px]">2s</span>
              <span className="text-cyan-400 font-bold">[ ↑↓ ]</span>
            </div>
            <div className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-center">
              <span className="text-slate-400 block text-[9px]">2p (p_x, p_y, p_z)</span>
              <span className="text-cyan-400 font-bold">[ ↑↓ ][ ↑↓ ][ ↑ ]</span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
