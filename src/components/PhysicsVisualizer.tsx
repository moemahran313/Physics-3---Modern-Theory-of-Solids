import React, { useState, useEffect, useRef } from "react";
import { MathView } from "./MathView";
import { FormattedContent } from "./LaTeXRenderer";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sliders, 
  Activity, 
  Waves, 
  Layers, 
  Compass, 
  Flame, 
  Sun, 
  Zap, 
  Sparkles, 
  Maximize2,
  Info,
  ChevronRight,
  ExternalLink
} from "lucide-react";

export type VisualizationConcept =
  | "wavepacket"
  | "potential_well"
  | "tunneling"
  | "blackbody"
  | "compton"
  | "photoelectric"
  | "bohr_atom"
  | "relativity";

export interface PhysicsVisualizerProps {
  initialConcept?: VisualizationConcept;
  embedded?: boolean;
  onNavigateToTab?: (tab: string) => void;
  className?: string;
}

export const PhysicsVisualizer: React.FC<PhysicsVisualizerProps> = ({
  initialConcept = "wavepacket",
  embedded = false,
  onNavigateToTab,
  className = "",
}) => {
  const [selectedConcept, setSelectedConcept] = useState<VisualizationConcept>(initialConcept);

  useEffect(() => {
    if (initialConcept) {
      setSelectedConcept(initialConcept);
    }
  }, [initialConcept]);

  return (
    <div className={`flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      {/* Header bar */}
      <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Activity className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Dynamic Physics Visualizer</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                /visualize {selectedConcept}
              </span>
            </h3>
            {!embedded && (
              <p className="text-[11px] text-slate-400">
                Real-time phase/group velocities, wave packet dispersion, probability densities, and relativistic invariants.
              </p>
            )}
          </div>
        </div>

        {/* Concept Selector Pill List */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <button
            onClick={() => setSelectedConcept("wavepacket")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 ${
              selectedConcept === "wavepacket"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm"
                : "text-slate-400 hover:text-slate-200 bg-slate-950/60"
            }`}
          >
            Wavepacket
          </button>
          <button
            onClick={() => setSelectedConcept("potential_well")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 ${
              selectedConcept === "potential_well"
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 shadow-sm"
                : "text-slate-400 hover:text-slate-200 bg-slate-950/60"
            }`}
          >
            Potential Well
          </button>
          <button
            onClick={() => setSelectedConcept("tunneling")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 ${
              selectedConcept === "tunneling"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
                : "text-slate-400 hover:text-slate-200 bg-slate-950/60"
            }`}
          >
            Tunneling
          </button>
          <button
            onClick={() => setSelectedConcept("blackbody")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 ${
              selectedConcept === "blackbody"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm"
                : "text-slate-400 hover:text-slate-200 bg-slate-950/60"
            }`}
          >
            Blackbody
          </button>
          <button
            onClick={() => setSelectedConcept("compton")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 ${
              selectedConcept === "compton"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-sm"
                : "text-slate-400 hover:text-slate-200 bg-slate-950/60"
            }`}
          >
            Compton
          </button>
          <button
            onClick={() => setSelectedConcept("photoelectric")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 ${
              selectedConcept === "photoelectric"
                ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 shadow-sm"
                : "text-slate-400 hover:text-slate-200 bg-slate-950/60"
            }`}
          >
            Photoelectric
          </button>
          <button
            onClick={() => setSelectedConcept("bohr_atom")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 ${
              selectedConcept === "bohr_atom"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-sm"
                : "text-slate-400 hover:text-slate-200 bg-slate-950/60"
            }`}
          >
            Bohr Atom
          </button>
          <button
            onClick={() => setSelectedConcept("relativity")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 ${
              selectedConcept === "relativity"
                ? "bg-blue-500/20 text-blue-300 border border-blue-500/50 shadow-sm"
                : "text-slate-400 hover:text-slate-200 bg-slate-950/60"
            }`}
          >
            Relativity
          </button>
        </div>
      </div>

      {/* Main Active Simulation Container */}
      <div className="p-4 sm:p-5">
        {selectedConcept === "wavepacket" && <WavepacketVisualizer />}
        {selectedConcept === "potential_well" && <PotentialWellVisualizer />}
        {selectedConcept === "tunneling" && <TunnelingVisualizer />}
        {selectedConcept === "blackbody" && <BlackbodyVisualizer />}
        {selectedConcept === "compton" && <ComptonVisualizer />}
        {selectedConcept === "photoelectric" && <PhotoelectricVisualizer />}
        {selectedConcept === "bohr_atom" && <BohrAtomVisualizer />}
        {selectedConcept === "relativity" && <RelativityVisualizer />}
      </div>
    </div>
  );
};

/* =========================================================================
   1. WAVEPACKET VISUALIZER: SPATIAL & TEMPORAL EVOLUTION, VP VS VG
   ========================================================================= */
const WavepacketVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [dispersionMode, setDispersionMode] = useState<"matter" | "em" | "anomalous">("matter");
  const [packetWidth, setPacketWidth] = useState<number>(35); // sigma in px
  const [centralK, setCentralK] = useState<number>(0.12); // rad/px
  const [showComponents, setShowComponents] = useState<boolean>(true);
  const [showEnvelope, setShowEnvelope] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1.0);
  const timeRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);

  // Physical calculations
  // For matter wave: omega = hbar * k^2 / (2m) -> v_p = omega/k = hbar*k/(2m), v_g = d(omega)/dk = hbar*k/m = 2*v_p
  // For EM wave: omega = c*k -> v_p = c, v_g = c (v_p = v_g)
  // For anomalous: omega = c * sqrt(k) -> v_g = 0.5 * v_p
  const vpMultiplier = dispersionMode === "matter" ? 0.5 : dispersionMode === "em" ? 1.0 : 2.0;
  const vgMultiplier = 1.0;
  const vgVal = (centralK * 30 * vgMultiplier).toFixed(2);
  const vpVal = (centralK * 30 * vpMultiplier).toFixed(2);
  const deltaXVal = (packetWidth * 0.1).toFixed(2); // nm
  const deltaPVal = (1.054 / (2 * parseFloat(deltaXVal))).toFixed(2); // x 10^-25 kg*m/s

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 320);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 320;
      }
    };
    window.addEventListener("resize", handleResize);

    // Number of Fourier harmonics in packet
    const numComponents = 7;
    const dk = 0.02;

    const render = () => {
      ctx.fillStyle = "#020617"; // slate-950
      ctx.fillRect(0, 0, width, height);

      const t = timeRef.current;
      const centerY = height / 2;
      const centerX = width / 2;

      // Group velocity moves packet center horizontally
      // Wrap around screen seamlessly
      const effectiveVg = centralK * 30 * vgMultiplier * 1.5;
      const xCenter = ((centerX + effectiveVg * t) % (width + 200)) - 100;

      // Draw Grid / Coordinate Axes
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Axis lines
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.stroke();

      // Subtle grid markers
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, centerY - 4);
        ctx.lineTo(x, centerY + 4);
        ctx.strokeStyle = "#334155";
        ctx.stroke();
      }

      // Draw Fourier constituent harmonic components if enabled
      if (showComponents) {
        const componentColors = [
          "rgba(56, 189, 248, 0.25)", // sky
          "rgba(168, 85, 247, 0.25)", // purple
          "rgba(236, 72, 153, 0.25)", // pink
          "rgba(34, 197, 94, 0.25)",  // emerald
          "rgba(245, 158, 11, 0.25)", // amber
          "rgba(99, 102, 241, 0.25)", // indigo
          "rgba(20, 184, 166, 0.25)", // teal
        ];

        for (let i = 0; i < numComponents; i++) {
          const ki = centralK + (i - (numComponents - 1) / 2) * dk;
          // Phase velocity for component i
          const omegai = dispersionMode === "matter" 
            ? (ki * ki * 15) 
            : dispersionMode === "em" 
            ? (ki * 30) 
            : Math.sqrt(Math.abs(ki)) * 25;

          ctx.beginPath();
          ctx.strokeStyle = componentColors[i % componentColors.length];
          ctx.lineWidth = 1;

          for (let x = 0; x < width; x += 2) {
            const phase = ki * (x - centerX) - omegai * t;
            // Harmonic component amplitude modulated by spectral Gaussian weight
            const weight = Math.exp(-Math.pow((ki - centralK) / (2 * dk), 2));
            const y = centerY + Math.cos(phase) * 28 * weight;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      // Draw Gaussian Envelope if enabled
      const sigma = packetWidth;
      if (showEnvelope) {
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = "rgba(251, 191, 36, 0.85)"; // amber-400
        ctx.lineWidth = 1.5;

        // Top envelope
        for (let x = 0; x < width; x += 2) {
          const dx = x - xCenter;
          const env = Math.exp(-(dx * dx) / (2 * sigma * sigma)) * 68;
          const y = centerY - env;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Bottom envelope
        ctx.beginPath();
        for (let x = 0; x < width; x += 2) {
          const dx = x - xCenter;
          const env = Math.exp(-(dx * dx) / (2 * sigma * sigma)) * 68;
          const y = centerY + env;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Composite Gaussian Wavepacket: Psi(x,t)
      ctx.beginPath();
      ctx.strokeStyle = "#38bdf8"; // sky-400
      ctx.lineWidth = 2.5;

      const effectiveVp = centralK * 30 * vpMultiplier * 1.5;

      for (let x = 0; x < width; x += 1.5) {
        const dx = x - xCenter;
        const envelope = Math.exp(-(dx * dx) / (2 * sigma * sigma)) * 68;
        // Carrier phase wave moves at phase velocity v_p
        const carrierPhase = centralK * (x - centerX) - (centralK * effectiveVp) * t;
        const y = centerY - envelope * Math.cos(carrierPhase);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Velocity indicator arrows and tags
      // Group Velocity arrow attached to envelope peak
      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold 11px monospace";
      ctx.fillText(`v_g (Envelope) = ${vgVal} c`, Math.min(Math.max(xCenter - 40, 20), width - 180), centerY - 80);

      ctx.beginPath();
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 2;
      const arrowX = Math.min(Math.max(xCenter, 40), width - 40);
      ctx.moveTo(arrowX, centerY - 72);
      ctx.lineTo(arrowX + 35, centerY - 72);
      ctx.lineTo(arrowX + 28, centerY - 76);
      ctx.moveTo(arrowX + 35, centerY - 72);
      ctx.lineTo(arrowX + 28, centerY - 68);
      ctx.stroke();

      // Phase Velocity label
      ctx.fillStyle = "#38bdf8";
      ctx.fillText(`v_p (Phase/Carrier) = ${vpVal} c`, 20, 30);

      // Advance time if playing
      if (isPlaying) {
        timeRef.current += 0.03 * simSpeed;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isPlaying, dispersionMode, packetWidth, centralK, showComponents, showEnvelope, simSpeed]);

  const handleReset = () => {
    timeRef.current = 0;
  };

  return (
    <div className="space-y-4">
      {/* Canvas Container */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
        <canvas ref={canvasRef} className="w-full block" />
        
        {/* Floating Quick Stats Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between flex-wrap gap-2 pointer-events-none">
          <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono pointer-events-auto">
            <span className="text-amber-400 font-bold">Group Velocity:</span>
            <span className="text-slate-200">v_g = {vgVal} c</span>
            <span className="text-slate-600">|</span>
            <span className="text-sky-400 font-bold">Phase Velocity:</span>
            <span className="text-slate-200">v_p = {vpVal} c</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono pointer-events-auto">
            <span className="text-cyan-400 font-bold">&Delta;x:</span>
            <span className="text-slate-200">{deltaXVal} nm</span>
            <span className="text-slate-600">|</span>
            <span className="text-purple-400 font-bold">&Delta;p:</span>
            <span className="text-slate-200">{deltaPVal}&times;10⁻²⁵</span>
          </div>
        </div>
      </div>

      {/* Control Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs">
        {/* Playback Controls & Dispersion Mode */}
        <div className="space-y-3">
          <span className="font-mono text-slate-400 uppercase text-[10px] font-bold block">
            Playback &amp; Dispersion Regime:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/40 text-cyan-200 border border-cyan-500/40 font-mono transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? "Pause" : "Play"}</span>
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
              title="Reset Time t = 0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-300 font-medium">Physical Medium:</label>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setDispersionMode("matter")}
                className={`py-1 px-1.5 rounded text-[10px] font-mono font-bold transition-all ${
                  dispersionMode === "matter"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                    : "bg-slate-900 text-slate-400 border border-slate-800"
                }`}
              >
                Matter (v_g=2v_p)
              </button>
              <button
                onClick={() => setDispersionMode("em")}
                className={`py-1 px-1.5 rounded text-[10px] font-mono font-bold transition-all ${
                  dispersionMode === "em"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                    : "bg-slate-900 text-slate-400 border border-slate-800"
                }`}
              >
                Light (v_g=v_p)
              </button>
              <button
                onClick={() => setDispersionMode("anomalous")}
                className={`py-1 px-1.5 rounded text-[10px] font-mono font-bold transition-all ${
                  dispersionMode === "anomalous"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/50"
                    : "bg-slate-900 text-slate-400 border border-slate-800"
                }`}
              >
                Anomalous
              </button>
            </div>
          </div>
        </div>

        {/* Sliders for Packet Width & Central Wavenumber */}
        <div className="space-y-2.5">
          <span className="font-mono text-slate-400 uppercase text-[10px] font-bold block">
            Wavepacket Parameters:
          </span>
          <div>
            <div className="flex justify-between text-[11px] text-slate-300 mb-1">
              <span>Packet Width (&Delta;x):</span>
              <span className="font-mono text-cyan-300">{packetWidth} px</span>
            </div>
            <input
              type="range"
              min="15"
              max="70"
              value={packetWidth}
              onChange={(e) => setPacketWidth(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-800 rounded-lg h-1.5"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-300 mb-1">
              <span>Central Momentum / k₀:</span>
              <span className="font-mono text-cyan-300">{centralK.toFixed(2)} rad/px</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.25"
              step="0.01"
              value={centralK}
              onChange={(e) => setCentralK(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-800 rounded-lg h-1.5"
            />
          </div>
        </div>

        {/* Visual Toggles & Mathematical Summary */}
        <div className="space-y-2.5">
          <span className="font-mono text-slate-400 uppercase text-[10px] font-bold block">
            Display Layers &amp; Theory:
          </span>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showComponents}
                onChange={(e) => setShowComponents(e.target.checked)}
                className="accent-cyan-500 rounded"
              />
              <span>Harmonics (Fourier)</span>
            </label>
            <label className="flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showEnvelope}
                onChange={(e) => setShowEnvelope(e.target.checked)}
                className="accent-amber-500 rounded"
              />
              <span>Envelope Outline</span>
            </label>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1 font-mono">
            <div className="text-cyan-300 font-bold text-[10px]">GOVERNING RELATIONS:</div>
            <div>&bull; Phase Velocity: <span className="text-cyan-300">v_p = &omega;/k = E/p</span></div>
            <div>&bull; Group Velocity: <span className="text-cyan-300">v_g = d&omega;/dk = dE/dp = v_particle</span></div>
            <div>&bull; Non-Relativistic Matter: <span className="text-amber-300">v_g = 2 v_p</span> (Dispersive: &omega; &prop; k²)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. POTENTIAL WELL VISUALIZER: PROBABILITY DENSITIES, NODES, ENERGY STATES
   ========================================================================= */
const PotentialWellVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [quantumN, setQuantumN] = useState<number>(1);
  const [wellType, setWellType] = useState<"infinite" | "finite">("infinite");
  const [wellWidthL, setWellWidthL] = useState<number>(0.5); // nm
  const [barrierU0, setBarrierU0] = useState<number>(50); // eV
  const [displayMode, setDisplayMode] = useState<"both" | "psi" | "prob">("both");
  const [integrationRange, setIntegrationRange] = useState<[number, number]>([0.2, 0.8]); // fraction of L

  // Calculations
  const massElectron = 9.109e-31;
  const hbar = 1.05457e-34;
  const qe = 1.602e-19;
  const L_meters = wellWidthL * 1e-9;
  
  // Infinite square well energy: E_n = (n^2 * pi^2 * hbar^2) / (2 * m * L^2) in eV
  const e1_Joules = (Math.PI * Math.PI * hbar * hbar) / (2 * massElectron * L_meters * L_meters);
  const e1_eV = e1_Joules / qe;
  const currentEnergy_eV = (quantumN * quantumN * e1_eV).toFixed(2);

  // Analytical integral of sin^2(n*pi*x/L) between x1 and x2
  // Integral: [x/2 - sin(2*n*pi*x/L)/(4*n*pi/L)] * (2/L)
  const calcProbability = (x1Frac: number, x2Frac: number, n: number) => {
    const F = (u: number) => u - Math.sin(2 * Math.PI * n * u) / (2 * Math.PI * n);
    const prob = F(x2Frac) - F(x1Frac);
    return Math.max(0, Math.min(1, prob)) * 100;
  };

  const currentProbability = calcProbability(integrationRange[0], integrationRange[1], quantumN).toFixed(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = 330);

    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, width, height);

    // Geometry of well on canvas
    const wellLeft = width * 0.22;
    const wellRight = width * 0.78;
    const wellWidthPx = wellRight - wellLeft;
    const groundY = height * 0.82;
    const topY = height * 0.15;

    // Draw Potential Walls
    ctx.fillStyle = wellType === "infinite" ? "#0f172a" : "#1e1b4b";
    ctx.fillRect(0, topY, wellLeft, groundY - topY);
    ctx.fillRect(wellRight, topY, width - wellRight, groundY - topY);

    // Wall lines
    ctx.strokeStyle = wellType === "infinite" ? "#64748b" : "#818cf8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, topY);
    ctx.lineTo(wellLeft, topY);
    ctx.lineTo(wellLeft, groundY);
    ctx.lineTo(wellRight, groundY);
    ctx.lineTo(wellRight, topY);
    ctx.lineTo(width, topY);
    ctx.stroke();

    // Wall Labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 11px monospace";
    ctx.fillText("x = 0", wellLeft - 18, groundY + 20);
    ctx.fillText(`x = L (${wellWidthL} nm)`, wellRight - 35, groundY + 20);

    if (wellType === "infinite") {
      ctx.fillText("U(x) = ∞", wellLeft / 2 - 25, (topY + groundY) / 2);
      ctx.fillText("U(x) = ∞", wellRight + 20, (topY + groundY) / 2);
    } else {
      ctx.fillText(`U₀ = ${barrierU0} eV`, 15, topY - 8);
      ctx.fillText(`U₀ = ${barrierU0} eV`, wellRight + 15, topY - 8);
    }

    // Baseline axis inside well
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(wellLeft, groundY);
    ctx.lineTo(wellRight, groundY);
    ctx.stroke();

    // Draw Integration Measurement Shading
    const x1Px = wellLeft + integrationRange[0] * wellWidthPx;
    const x2Px = wellLeft + integrationRange[1] * wellWidthPx;

    ctx.fillStyle = "rgba(99, 102, 241, 0.15)";
    ctx.fillRect(x1Px, topY, x2Px - x1Px, groundY - topY);
    ctx.strokeStyle = "rgba(129, 140, 248, 0.4)";
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(x1Px, topY, x2Px - x1Px, groundY - topY);
    ctx.setLineDash([]);

    // Draw Classical Probability baseline (uniform 1/L)
    ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    const classicalY = groundY - 45;
    ctx.moveTo(wellLeft, classicalY);
    ctx.lineTo(wellRight, classicalY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#64748b";
    ctx.font = "9px monospace";
    ctx.fillText("Classical Uniform P(x)=1/L", wellLeft + 10, classicalY - 4);

    // Draw Wavefunction psi_n(x)
    if (displayMode === "both" || displayMode === "psi") {
      ctx.beginPath();
      ctx.strokeStyle = "#38bdf8"; // sky-400
      ctx.lineWidth = 2.2;

      for (let x = wellLeft; x <= wellRight; x += 1.5) {
        const u = (x - wellLeft) / wellWidthPx;
        const psi = Math.sin(quantumN * Math.PI * u);
        const y = (topY + groundY) / 2 - psi * 55;
        if (x === wellLeft) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Finite well evanescent tails
      if (wellType === "finite") {
        ctx.beginPath();
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        // Left tail
        for (let x = 0; x <= wellLeft; x += 1.5) {
          const dx = (wellLeft - x) / 25;
          const tail = Math.exp(-dx) * Math.sin(quantumN * Math.PI * 0.05);
          const y = (topY + groundY) / 2 - tail * 55;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        // Right tail
        ctx.beginPath();
        for (let x = wellRight; x <= width; x += 1.5) {
          const dx = (x - wellRight) / 25;
          const tail = Math.exp(-dx) * Math.sin(quantumN * Math.PI * 0.95);
          const y = (topY + groundY) / 2 - tail * 55;
          if (x === wellRight) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    // Draw Probability Density |psi_n(x)|^2
    if (displayMode === "both" || displayMode === "prob") {
      ctx.beginPath();
      ctx.strokeStyle = "#a855f7"; // purple-500
      ctx.lineWidth = 2.5;

      // Fill area under curve
      ctx.fillStyle = "rgba(168, 85, 247, 0.2)";

      ctx.beginPath();
      ctx.moveTo(wellLeft, groundY);
      for (let x = wellLeft; x <= wellRight; x += 1.5) {
        const u = (x - wellLeft) / wellWidthPx;
        const psi = Math.sin(quantumN * Math.PI * u);
        const probDensity = psi * psi;
        const y = groundY - probDensity * 90;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(wellRight, groundY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Draw Nodes markers on probability curve
    const numNodes = quantumN - 1;
    ctx.fillStyle = "#f43f5e"; // rose-500
    for (let k = 1; k <= numNodes; k++) {
      const nodeX = wellLeft + (k / quantumN) * wellWidthPx;
      ctx.beginPath();
      ctx.arc(nodeX, groundY, 3.5, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Legend on canvas
    ctx.font = "10px monospace";
    if (displayMode === "both" || displayMode === "psi") {
      ctx.fillStyle = "#38bdf8";
      ctx.fillText("— ψ_n(x) Wavefunction", 20, 25);
    }
    if (displayMode === "both" || displayMode === "prob") {
      ctx.fillStyle = "#a855f7";
      ctx.fillText("■ |ψ_n(x)|² Probability Density", 20, 40);
    }
    ctx.fillStyle = "#f43f5e";
    ctx.fillText(`• ${numNodes} Internal Nodes`, 20, 55);

  }, [quantumN, wellType, wellWidthL, barrierU0, displayMode, integrationRange]);

  return (
    <div className="space-y-4">
      {/* Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
        <canvas ref={canvasRef} className="w-full block" />
        
        {/* Dynamic Measurement Banner */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between flex-wrap gap-2 pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono pointer-events-auto">
            <span className="text-indigo-400 font-bold">State n={quantumN}:</span>{" "}
            <span className="text-slate-200">E_{quantumN} = {currentEnergy_eV} eV</span>
            <span className="text-slate-600 mx-2">|</span>
            <span className="text-cyan-400 font-bold">E₁ = {e1_eV.toFixed(2)} eV</span>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-indigo-500/30 text-[11px] font-mono pointer-events-auto text-indigo-300">
            <span>P({integrationRange[0]}L &le; x &le; {integrationRange[1]}L) = </span>
            <strong className="text-amber-300 text-xs">{currentProbability}%</strong>
          </div>
        </div>
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs">
        {/* State Selection */}
        <div className="space-y-2.5">
          <span className="font-mono text-slate-400 uppercase text-[10px] font-bold block">
            Quantum Energy State (n):
          </span>
          <div className="grid grid-cols-6 gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => setQuantumN(n)}
                className={`py-1.5 rounded-lg font-mono font-bold text-xs transition-all ${
                  quantumN === n
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                n={n}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-slate-300 font-medium">Potential Profile:</label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setWellType("infinite")}
                className={`py-1 px-2 rounded-lg font-mono text-[11px] font-bold transition-all ${
                  wellType === "infinite"
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50"
                    : "bg-slate-900 text-slate-400 border border-slate-800"
                }`}
              >
                Infinite (U=∞)
              </button>
              <button
                onClick={() => setWellType("finite")}
                className={`py-1 px-2 rounded-lg font-mono text-[11px] font-bold transition-all ${
                  wellType === "finite"
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50"
                    : "bg-slate-900 text-slate-400 border border-slate-800"
                }`}
              >
                Finite (U₀={barrierU0}eV)
              </button>
            </div>
          </div>
        </div>

        {/* Physical Well Dimensions & Range */}
        <div className="space-y-2.5">
          <span className="font-mono text-slate-400 uppercase text-[10px] font-bold block">
            Well Geometry &amp; Range Probe:
          </span>
          <div>
            <div className="flex justify-between text-[11px] text-slate-300 mb-1">
              <span>Well Width (L):</span>
              <span className="font-mono text-indigo-300">{wellWidthL.toFixed(2)} nm</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.05"
              value={wellWidthL}
              onChange={(e) => setWellWidthL(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-1.5"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-300 mb-1">
              <span>Integration Probe [{integrationRange[0]}L, {integrationRange[1]}L]:</span>
              <span className="font-mono text-amber-300">{currentProbability}%</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="range"
                min="0"
                max={integrationRange[1] - 0.05}
                step="0.05"
                value={integrationRange[0]}
                onChange={(e) => setIntegrationRange([Number(e.target.value), integrationRange[1]])}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-1.5"
              />
              <input
                type="range"
                min={integrationRange[0] + 0.05}
                max="1.0"
                step="0.05"
                value={integrationRange[1]}
                onChange={(e) => setIntegrationRange([integrationRange[0], Number(e.target.value)])}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-1.5"
              />
            </div>
          </div>
        </div>

        {/* Display Modes & Theoretical Summary */}
        <div className="space-y-2.5">
          <span className="font-mono text-slate-400 uppercase text-[10px] font-bold block">
            Plot Mode &amp; Boundary Equations:
          </span>
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => setDisplayMode("both")}
              className={`py-1 px-1 rounded text-[10px] font-mono font-bold transition-all ${
                displayMode === "both"
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50"
                  : "bg-slate-900 text-slate-400 border border-slate-800"
              }`}
            >
              Both
            </button>
            <button
              onClick={() => setDisplayMode("psi")}
              className={`py-1 px-1 rounded text-[10px] font-mono font-bold transition-all ${
                displayMode === "psi"
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/50"
                  : "bg-slate-900 text-slate-400 border border-slate-800"
              }`}
            >
              ψ_n(x) Only
            </button>
            <button
              onClick={() => setDisplayMode("prob")}
              className={`py-1 px-1 rounded text-[10px] font-mono font-bold transition-all ${
                displayMode === "prob"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/50"
                  : "bg-slate-900 text-slate-400 border border-slate-800"
              }`}
            >
              |ψ|² Only
            </button>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1 font-mono">
            <div className="text-indigo-300 font-bold text-[10px]">KEY AXIOMS:</div>
            <div>&bull; &psi;_n(x) = &radic;(2/L) sin(n&pi;x / L)</div>
            <div>&bull; E_n = (n² h²) / (8mL²) = n² E₁</div>
            <div>&bull; Even states (n=2, 4) have a node at center x=L/2 (P=0).</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. QUANTUM TUNNELING VISUALIZER
   ========================================================================= */
const TunnelingVisualizer: React.FC = () => {
  const [energyE, setEnergyE] = useState<number>(4.0); // eV
  const [barrierU0, setBarrierU0] = useState<number>(6.0); // eV
  const [barrierWidth, setBarrierWidth] = useState<number>(0.3); // nm

  const hbar = 1.05457e-34;
  const massElectron = 9.109e-31;
  const qe = 1.602e-19;

  // Gamma = sqrt(2m(U0 - E)) / hbar
  const deltaE_Joules = Math.max(0.1, barrierU0 - energyE) * qe;
  const gamma = Math.sqrt(2 * massElectron * deltaE_Joules) / hbar;
  const widthMeters = barrierWidth * 1e-9;
  const exponent = 2 * gamma * widthMeters;
  const transmission = Math.min(1, Math.max(1e-6, Math.exp(-exponent)));
  const transmissionPercent = (transmission * 100).toFixed(3);
  const penetrationDepth_nm = ((1 / (2 * gamma)) * 1e9).toFixed(3);

  return (
    <div className="space-y-4">
      {/* Visual Canvas Card */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-emerald-400 font-bold">Transmission Coefficient: T &approx; {transmissionPercent}%</span>
          <span className="text-cyan-400 font-bold">Penetration Depth &delta; = {penetrationDepth_nm} nm</span>
        </div>

        {/* Barrier Diagram SVG */}
        <div className="h-44 w-full bg-slate-900 rounded-lg p-3 relative overflow-hidden border border-slate-800 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 500 160">
            {/* Barrier Box */}
            <rect x="200" y="30" width="100" height="110" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
            <text x="250" y="22" fill="#34d399" fontSize="11" textAnchor="middle" fontFamily="monospace">
              U₀ = {barrierU0} eV (Width a = {barrierWidth} nm)
            </text>

            {/* Incident Wave (Region I) */}
            <path
              d="M 20 85 Q 40 45 60 85 T 100 85 T 140 85 T 180 85 T 200 85"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
            <text x="100" y="145" fill="#38bdf8" fontSize="10" textAnchor="middle" fontFamily="monospace">
              Region I: ψ_I (Incident + Reflected)
            </text>

            {/* Evanescent Decaying Wave inside barrier (Region II) */}
            <path
              d="M 200 85 Q 230 87 260 98 T 300 115"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeDasharray="4 2"
            />
            <text x="250" y="85" fill="#fbbf24" fontSize="10" textAnchor="middle" fontFamily="monospace">
              ψ_II &prop; e^{"-γx"}
            </text>

            {/* Transmitted Wave (Region III) */}
            <path
              d="M 300 115 Q 320 102 340 115 T 380 115 T 420 115 T 460 115 T 480 115"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text x="390" y="145" fill="#10b981" fontSize="10" textAnchor="middle" fontFamily="monospace">
              Region III: ψ_III (Transmitted: T={transmissionPercent}%)
            </text>
          </svg>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs">
        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Particle Energy (E):</span>
            <span className="font-mono text-emerald-300">{energyE.toFixed(1)} eV</span>
          </div>
          <input
            type="range"
            min="1.0"
            max={barrierU0 - 0.2}
            step="0.1"
            value={energyE}
            onChange={(e) => setEnergyE(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-1.5"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Barrier Height (U₀):</span>
            <span className="font-mono text-emerald-300">{barrierU0.toFixed(1)} eV</span>
          </div>
          <input
            type="range"
            min="4.0"
            max="12.0"
            step="0.2"
            value={barrierU0}
            onChange={(e) => setBarrierU0(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-1.5"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Barrier Width (a):</span>
            <span className="font-mono text-emerald-300">{barrierWidth.toFixed(2)} nm</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.8"
            step="0.02"
            value={barrierWidth}
            onChange={(e) => setBarrierWidth(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-1.5"
          />
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. BLACKBODY VISUALIZER
   ========================================================================= */
const BlackbodyVisualizer: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(5500); // Kelvin

  // Wien's Displacement Law: lambda_max * T = 2.898 x 10^-3 m*K
  const lambdaMax_nm = (2.898e6 / temperature).toFixed(0);
  const totalPowerRel = Math.pow(temperature / 5778, 4).toFixed(2); // relative to Sun (5778 K)

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono flex-wrap gap-2">
          <span className="text-amber-400 font-bold">Absolute Temp: T = {temperature} K</span>
          <span className="text-cyan-400 font-bold">Peak Wavelength: &lambda;_{"{max}"} = {lambdaMax_nm} nm</span>
          <span className="text-rose-400 font-bold">Total Emitted Power: P &prop; T⁴ ({totalPowerRel}&times; Sun)</span>
        </div>

        {/* SVG Spectrum Curve */}
        <div className="h-44 w-full bg-slate-900 rounded-lg p-2 relative overflow-hidden border border-slate-800">
          <svg className="w-full h-full" viewBox="0 0 500 160">
            {/* Color spectrum band along x axis */}
            <defs>
              <linearGradient id="spectrumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7e22ce" />
                <stop offset="15%" stopColor="#3b82f6" />
                <stop offset="30%" stopColor="#10b981" />
                <stop offset="45%" stopColor="#eab308" />
                <stop offset="60%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>
            </defs>
            <rect x="50" y="140" width="420" height="8" fill="url(#spectrumGradient)" rx="3" />
            <text x="50" y="156" fill="#94a3b8" fontSize="8" fontFamily="monospace">100 nm (UV)</text>
            <text x="210" y="156" fill="#94a3b8" fontSize="8" fontFamily="monospace">500 nm (Visible)</text>
            <text x="420" y="156" fill="#94a3b8" fontSize="8" fontFamily="monospace">1500 nm (IR)</text>

            {/* Planck Curve */}
            <path
              d={`M 50 140 Q ${Math.min(350, Math.max(90, parseInt(lambdaMax_nm) / 3.5))} ${Math.max(20, 140 - (temperature / 5500) * 110)} 450 135`}
              fill="rgba(245, 158, 11, 0.2)"
              stroke="#f59e0b"
              strokeWidth="2.5"
            />
            {/* Rayleigh-Jeans Catastrophe Curve */}
            <path
              d="M 80 15 Q 120 70 450 132"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text x="130" y="30" fill="#ef4444" fontSize="9" fontFamily="monospace">Classical Rayleigh-Jeans (UV Catastrophe)</text>
            <text x="320" y="65" fill="#f59e0b" fontSize="10" fontFamily="monospace">Planck Quantum Law</text>
          </svg>
        </div>
      </div>

      <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs">
        <div className="flex justify-between text-slate-300 mb-1">
          <span>Cavity Temperature (T):</span>
          <span className="font-mono text-amber-300">{temperature} K</span>
        </div>
        <input
          type="range"
          min="1500"
          max="9500"
          step="100"
          value={temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
          className="w-full accent-amber-500 bg-slate-800 rounded-lg h-1.5"
        />
      </div>
    </div>
  );
};

/* =========================================================================
   5. COMPTON SCATTERING VISUALIZER
   ========================================================================= */
const ComptonVisualizer: React.FC = () => {
  const [angleDeg, setAngleDeg] = useState<number>(90);

  const lambdaC = 0.0243; // Compton wavelength in Angstroms
  const thetaRad = (angleDeg * Math.PI) / 180;
  const deltaLambda = (lambdaC * (1 - Math.cos(thetaRad))).toFixed(4); // Angstroms

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono flex-wrap gap-2">
          <span className="text-rose-400 font-bold">Scattering Angle: &theta; = {angleDeg}&deg;</span>
          <span className="text-cyan-400 font-bold">Compton Shift: &Delta;&lambda; = {deltaLambda} &Aring;</span>
          <span className="text-amber-400 font-bold">&lambda;_c = 0.0243 &Aring;</span>
        </div>

        {/* 2D Collision Diagram */}
        <div className="h-44 w-full bg-slate-900 rounded-lg p-2 relative overflow-hidden border border-slate-800 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 400 160">
            {/* Center target electron */}
            <circle cx="180" cy="80" r="8" fill="#3b82f6" />
            <text x="180" y="105" fill="#93c5fd" fontSize="9" textAnchor="middle" fontFamily="monospace">e⁻ (m₀c²)</text>

            {/* Incident photon arrow */}
            <line x1="40" y1="80" x2="165" y2="80" stroke="#f43f5e" strokeWidth="2.5" />
            <text x="100" y="70" fill="#f43f5e" fontSize="10" textAnchor="middle" fontFamily="monospace">hf (λ)</text>

            {/* Scattered photon path at angle theta */}
            {(() => {
              const rad = (angleDeg * Math.PI) / 180;
              const x2 = 180 + Math.cos(rad) * 110;
              const y2 = 80 - Math.sin(rad) * 60;
              return (
                <>
                  <line x1="180" y1="80" x2={x2} y2={y2} stroke="#fb7185" strokeWidth="2" strokeDasharray="3 2" />
                  <circle cx={x2} cy={y2} r="4" fill="#fb7185" />
                  <text x={x2 + 10} y={y2} fill="#fb7185" fontSize="9" fontFamily="monospace">hf' (λ')</text>
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs">
        <div className="flex justify-between text-slate-300 mb-1">
          <span>Scattering Angle (&theta;):</span>
          <span className="font-mono text-rose-300">{angleDeg}&deg;</span>
        </div>
        <input
          type="range"
          min="0"
          max="180"
          value={angleDeg}
          onChange={(e) => setAngleDeg(Number(e.target.value))}
          className="w-full accent-rose-500 bg-slate-800 rounded-lg h-1.5"
        />
      </div>
    </div>
  );
};

/* =========================================================================
   6. PHOTOELECTRIC EFFECT VISUALIZER
   ========================================================================= */
const PhotoelectricVisualizer: React.FC = () => {
  const [wavelength, setWavelength] = useState<number>(300); // nm
  const [workFunction, setWorkFunction] = useState<number>(2.3); // eV (e.g. Sodium)

  const photonEnergy = (1240 / wavelength).toFixed(2);
  const kMax = Math.max(0, parseFloat(photonEnergy) - workFunction).toFixed(2);
  const stoppingV = kMax;
  const isEjecting = parseFloat(photonEnergy) >= workFunction;

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono flex-wrap gap-2">
          <span className="text-yellow-400 font-bold">Photon Energy: E = {photonEnergy} eV</span>
          <span className="text-cyan-400 font-bold">Work Function: &phi; = {workFunction} eV</span>
          <span className={`font-bold ${isEjecting ? "text-emerald-400" : "text-rose-400"}`}>
            {isEjecting ? `K_max = ${kMax} eV (Vs = ${stoppingV} V)` : "No Photoelectrons (E < ϕ)"}
          </span>
        </div>

        <div className="h-40 w-full bg-slate-900 rounded-lg p-3 relative overflow-hidden border border-slate-800 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 450 140">
            {/* Cathode Metal Plate */}
            <rect x="80" y="25" width="20" height="90" fill="#475569" stroke="#94a3b8" rx="2" />
            <text x="90" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">Cathode (ϕ)</text>

            {/* Anode Collector */}
            <rect x="350" y="25" width="20" height="90" fill="#334155" stroke="#64748b" rx="2" />
            <text x="360" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">Anode</text>

            {/* Incident Light Beam */}
            <line x1="20" y1="40" x2="80" y2="70" stroke="#facc15" strokeWidth="3" />
            <text x="40" y="35" fill="#facc15" fontSize="10" fontFamily="monospace">hν ({wavelength} nm)</text>

            {/* Photoelectron tracks */}
            {isEjecting && (
              <>
                <circle cx="150" cy="70" r="4" fill="#38bdf8" />
                <line x1="100" y1="70" x2="250" y2="70" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="200" y="60" fill="#38bdf8" fontSize="9" fontFamily="monospace">v_max = √2K/m</text>
              </>
            )}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs">
        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Light Wavelength (&lambda;):</span>
            <span className="font-mono text-yellow-300">{wavelength} nm</span>
          </div>
          <input
            type="range"
            min="150"
            max="700"
            value={wavelength}
            onChange={(e) => setWavelength(Number(e.target.value))}
            className="w-full accent-yellow-500 bg-slate-800 rounded-lg h-1.5"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>Work Function (&phi;):</span>
            <span className="font-mono text-cyan-300">{workFunction} eV</span>
          </div>
          <input
            type="range"
            min="1.5"
            max="5.0"
            step="0.1"
            value={workFunction}
            onChange={(e) => setWorkFunction(Number(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-800 rounded-lg h-1.5"
          />
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   7. BOHR ATOM VISUALIZER
   ========================================================================= */
const BohrAtomVisualizer: React.FC = () => {
  const [initialN, setInitialN] = useState<number>(3);
  const [finalN, setFinalN] = useState<number>(2);

  const eI = (-13.6 / (initialN * initialN)).toFixed(2);
  const eF = (-13.6 / (finalN * finalN)).toFixed(2);
  const deltaE = (parseFloat(eI) - parseFloat(eF)).toFixed(2);
  const emittedLambda = (1240 / parseFloat(deltaE)).toFixed(1);

  const seriesName = finalN === 1 ? "Lyman (UV)" : finalN === 2 ? "Balmer (Visible)" : "Paschen (IR)";

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono flex-wrap gap-2">
          <span className="text-purple-400 font-bold">Transition: n={initialN} &rarr; n={finalN}</span>
          <span className="text-cyan-400 font-bold">&Delta;E = {deltaE} eV</span>
          <span className="text-amber-400 font-bold">&lambda; = {emittedLambda} nm ({seriesName})</span>
        </div>

        {/* Concentric Orbits SVG */}
        <div className="h-44 w-full bg-slate-900 rounded-lg p-2 relative overflow-hidden border border-slate-800 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 300 160">
            {/* Nucleus */}
            <circle cx="150" cy="80" r="6" fill="#ef4444" />
            <text x="150" y="83" fill="#ffffff" fontSize="6" textAnchor="middle" fontWeight="bold">+e</text>

            {/* Orbits n=1, 2, 3, 4 */}
            <circle cx="150" cy="80" r="22" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="150" cy="80" r="42" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="150" cy="80" r="62" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />

            {/* Electron on initial orbit */}
            <circle cx="150" cy={80 - initialN * 20} r="4" fill="#a855f7" />
            <text x="165" y={80 - initialN * 20} fill="#c084fc" fontSize="8" fontFamily="monospace">e⁻ (n={initialN})</text>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs">
        <div>
          <label className="text-slate-300 mb-1 block">Initial Level (n_i):</label>
          <div className="flex gap-1">
            {[2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setInitialN(n)}
                className={`flex-1 py-1 rounded font-mono text-xs ${
                  initialN === n ? "bg-purple-600 text-white" : "bg-slate-900 text-slate-400"
                }`}
              >
                n={n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-slate-300 mb-1 block">Final Level (n_f):</label>
          <div className="flex gap-1">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setFinalN(n)}
                className={`flex-1 py-1 rounded font-mono text-xs ${
                  finalN === n ? "bg-cyan-600 text-white" : "bg-slate-900 text-slate-400"
                }`}
              >
                n={n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   8. SPECIAL RELATIVITY VISUALIZER
   ========================================================================= */
const RelativityVisualizer: React.FC = () => {
  const [speedBeta, setSpeedBeta] = useState<number>(0.8); // v/c

  const gamma = 1 / Math.sqrt(Math.max(0.001, 1 - speedBeta * speedBeta));
  const timeDilationFactor = gamma.toFixed(3);
  const lengthContractionFactor = (1 / gamma).toFixed(3);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono flex-wrap gap-2">
          <span className="text-blue-400 font-bold">Relative Velocity: v = {speedBeta} c</span>
          <span className="text-amber-400 font-bold">Lorentz Factor: &gamma; = {timeDilationFactor}</span>
          <span className="text-emerald-400 font-bold">Length Contraction: L/L₀ = {lengthContractionFactor}</span>
        </div>

        <div className="h-40 w-full bg-slate-900 rounded-lg p-3 relative overflow-hidden border border-slate-800 flex items-center justify-around">
          {/* Rest Frame Clock */}
          <div className="text-center space-y-1">
            <div className="text-[10px] font-mono text-slate-400">Rest Frame S' (Δt_p)</div>
            <div className="w-16 h-20 border border-slate-700 bg-slate-950 rounded flex flex-col justify-between items-center py-1">
              <div className="w-12 h-1 bg-slate-600 rounded" />
              <div className="text-[10px] font-mono text-blue-400">&Delta;t_p = 1.0 s</div>
              <div className="w-12 h-1 bg-slate-600 rounded" />
            </div>
          </div>

          {/* Lab Frame Clock (Transverse diagonal path) */}
          <div className="text-center space-y-1">
            <div className="text-[10px] font-mono text-slate-400">Lab Frame S (Δt = γ Δt_p)</div>
            <div className="w-28 h-20 border border-blue-900 bg-slate-950 rounded flex flex-col justify-between items-center py-1">
              <div className="w-24 h-1 bg-blue-500 rounded" />
              <div className="text-[10px] font-mono text-amber-400">&Delta;t = {timeDilationFactor} s</div>
              <div className="w-24 h-1 bg-blue-500 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs">
        <div className="flex justify-between text-slate-300 mb-1">
          <span>Velocity Ratio (v/c):</span>
          <span className="font-mono text-blue-300">{speedBeta} c</span>
        </div>
        <input
          type="range"
          min="0.0"
          max="0.99"
          step="0.01"
          value={speedBeta}
          onChange={(e) => setSpeedBeta(Number(e.target.value))}
          className="w-full accent-blue-500 bg-slate-800 rounded-lg h-1.5"
        />
      </div>
    </div>
  );
};
