import React, { useState, useRef, useEffect } from "react";
import { MathView } from "./MathView";
import { CONSTANTS } from "../lib/constants";
import { 
  Sliders, 
  Flame, 
  Sun, 
  Disc, 
  Waves, 
  ShieldAlert, 
  Zap, 
  Compass, 
  RotateCcw, 
  AlertCircle 
} from "lucide-react";

type SandboxTab = 
  | "blackbody" 
  | "photoelectric" 
  | "compton" 
  | "box" 
  | "tunneling" 
  | "bohr" 
  | "relativity";

interface InteractiveSandboxesProps {
  onOpenTerminalWithCommand?: (cmd: string) => void;
}

export const InteractiveSandboxes: React.FC<InteractiveSandboxesProps> = ({
  onOpenTerminalWithCommand,
}) => {
  const [activeTab, setActiveTab] = useState<SandboxTab>("photoelectric");

  const getSandboxCommandForTab = (tab: SandboxTab) => {
    switch (tab) {
      case "blackbody":
        return "/sandbox The Blackbody Furnace";
      case "photoelectric":
        return "/sandbox The Photoelectric Circuit";
      case "compton":
        return "/sandbox Billiard Ball Photons";
      case "box":
        return "/sandbox The Shrinking Box";
      case "tunneling":
        return "/sandbox The Leaky Wall";
      case "bohr":
        return "/sandbox The Electron Elevator";
      case "relativity":
        return "/sandbox The Relativistic Train";
      default:
        return "/sandbox";
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Sliders className="w-5 h-5" />
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Socratic Mental Sandboxes & Boundary Condition Stress Testers
              </h2>
            </div>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Enforcing Pedagogical Axiom III: Interrogate physical systems by driving parameters to non-trivial limits 
              (&theta; &rarr; 0, &pi;, v &rarr; c, &lambda; &rarr; 0). Observe where classical mechanics breaks down and quantum mechanics governs.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onOpenTerminalWithCommand && (
              <button
                onClick={() => onOpenTerminalWithCommand(getSandboxCommandForTab(activeTab))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-medium transition-colors"
                title="Launch this topic in the Module 2 Socratic Engine"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Launch {getSandboxCommandForTab(activeTab)}</span>
              </button>
            )}
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              7 Active Simulators
            </span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-5">
          <SimTabBtn
            active={activeTab === "photoelectric"}
            onClick={() => setActiveTab("photoelectric")}
            icon={<Sun className="w-4 h-4 text-amber-400" />}
            title="Photoelectric"
          />
          <SimTabBtn
            active={activeTab === "blackbody"}
            onClick={() => setActiveTab("blackbody")}
            icon={<Flame className="w-4 h-4 text-rose-400" />}
            title="Blackbody & UV"
          />
          <SimTabBtn
            active={activeTab === "compton"}
            onClick={() => setActiveTab("compton")}
            icon={<Disc className="w-4 h-4 text-cyan-400" />}
            title="Compton Shift"
          />
          <SimTabBtn
            active={activeTab === "box"}
            onClick={() => setActiveTab("box")}
            icon={<Waves className="w-4 h-4 text-emerald-400" />}
            title="Particle in Box"
          />
          <SimTabBtn
            active={activeTab === "tunneling"}
            onClick={() => setActiveTab("tunneling")}
            icon={<ShieldAlert className="w-4 h-4 text-purple-400" />}
            title="Barrier Tunneling"
          />
          <SimTabBtn
            active={activeTab === "bohr"}
            onClick={() => setActiveTab("bohr")}
            icon={<Zap className="w-4 h-4 text-yellow-400" />}
            title="Bohr Hydrogen"
          />
          <SimTabBtn
            active={activeTab === "relativity"}
            onClick={() => setActiveTab("relativity")}
            icon={<Compass className="w-4 h-4 text-indigo-400" />}
            title="Special Relativity"
          />
        </div>
      </div>

      {/* Simulator View Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
        {activeTab === "photoelectric" && <PhotoelectricSim />}
        {activeTab === "blackbody" && <BlackbodySim />}
        {activeTab === "compton" && <ComptonSim />}
        {activeTab === "box" && <ParticleInBoxSim />}
        {activeTab === "tunneling" && <TunnelingSim />}
        {activeTab === "bohr" && <BohrAtomSim />}
        {activeTab === "relativity" && <RelativitySim />}
      </div>
    </div>
  );
};

interface SimTabBtnProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
}

const SimTabBtn: React.FC<SimTabBtnProps> = ({ active, onClick, icon, title }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
      active
        ? "bg-slate-800 text-white border border-slate-700 shadow-md"
        : "bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800/80"
    }`}
  >
    {icon}
    <span className="truncate">{title}</span>
  </button>
);

/* -------------------------------------------------------------
 * 1. Photoelectric Effect Simulator
 * ------------------------------------------------------------- */
const METAL_PRESETS = [
  { name: "Cesium (Cs)", phi: 2.14 },
  { name: "Potassium (K)", phi: 2.29 },
  { name: "Sodium (Na)", phi: 2.36 },
  { name: "Calcium (Ca)", phi: 2.87 },
  { name: "Aluminum (Al)", phi: 4.08 },
  { name: "Copper (Cu)", phi: 4.70 },
  { name: "Platinum (Pt)", phi: 6.35 },
];

const PhotoelectricSim: React.FC = () => {
  const [phi, setPhi] = useState(2.14); // Cesium default eV
  const [wavelengthNm, setWavelengthNm] = useState(400); // 400 nm
  const [intensity, setIntensity] = useState(1.0); // 1.0 a.u.
  const [retardingV, setRetardingV] = useState(0.0); // Retarding potential V

  // Derived quantum values:
  // E_photon = hc / lambda = 1240 / lambda(nm) in eV
  const photonEnergyEv = 1240 / wavelengthNm;
  const cutoffFreqHz = (phi * CONSTANTS.e) / CONSTANTS.h;
  const cutoffWavelengthNm = 1240 / phi;
  const isEmission = photonEnergyEv > phi;
  const maxKineticEnergyEv = isEmission ? Math.max(0, photonEnergyEv - phi) : 0;
  const stoppingPotentialV0 = maxKineticEnergyEv; // since eV_0 = K_max, V_0 = K_max in eV / e

  // Photocurrent calculation with retarding potential
  // If V < -V_0, current is 0. If V >= 0, current reaches saturation proportional to intensity.
  let currentNormalized = 0;
  if (isEmission) {
    if (retardingV >= stoppingPotentialV0) {
      currentNormalized = 0;
    } else {
      // Linear or parabolic approach to saturation
      const factor = (stoppingPotentialV0 - retardingV) / (stoppingPotentialV0 || 0.001);
      currentNormalized = intensity * Math.min(1.0, Math.max(0, Math.sqrt(factor)));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Photoelectric Effect & Photocell Retarding Potential Engine</span>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
              Einstein (1905)
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Interrogate stopping potential V₀, work function &phi;, saturation current I_sat, and instantaneous photon quantization.
          </p>
        </div>
        <button
          onClick={() => {
            setPhi(2.14);
            setWavelengthNm(400);
            setIntensity(1.0);
            setRetardingV(0.0);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              Cathode Target Material
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {METAL_PRESETS.map((m) => (
                <button
                  key={m.name}
                  onClick={() => setPhi(m.phi)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono text-left transition-colors ${
                    phi === m.phi
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  <div>{m.name}</div>
                  <div className="text-[10px] text-slate-500">φ = {m.phi.toFixed(2)} eV</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Incident Wavelength &lambda;</span>
              <span className="text-cyan-400 font-mono">{wavelengthNm} nm ({(1240 / wavelengthNm).toFixed(2)} eV)</span>
            </div>
            <input
              type="range"
              min="150"
              max="800"
              step="5"
              value={wavelengthNm}
              onChange={(e) => setWavelengthNm(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>150 nm (Far UV)</span>
              <span>400 nm (Violet)</span>
              <span>800 nm (Near IR)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Light Intensity $I$ (Photon Flux)</span>
              <span className="text-amber-400 font-mono">{intensity.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <p className="text-[10px] text-slate-500">Tripling intensity triples emitted electrons, but NEVER changes photon energy.</p>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Retarding Potential V_ret</span>
              <span className="text-rose-400 font-mono">{retardingV.toFixed(2)} V</span>
            </div>
            <input
              type="range"
              min="0"
              max="5.0"
              step="0.05"
              value={retardingV}
              onChange={(e) => setRetardingV(Number(e.target.value))}
              className="w-full accent-rose-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0.0 V</span>
              <span>Stopping Cutoff: {stoppingPotentialV0.toFixed(2)} V</span>
              <span>5.0 V</span>
            </div>
          </div>
        </div>

        {/* Readouts & Mathematical State */}
        <div className="space-y-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Quantum State & Emission Status
            </h4>

            <div className={`p-3 rounded-lg border flex items-center justify-between ${
              isEmission 
                ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-300"
                : "bg-rose-950/40 border-rose-800/60 text-rose-300"
            }`}>
              <div className="text-xs font-medium">
                {isEmission ? "PHOTOELECTRIC EMISSION ACTIVE" : "NO EMISSION (SUB-THRESHOLD)"}
              </div>
              <div className="text-xs font-mono">
                {isEmission ? `K_max = ${maxKineticEnergyEv.toFixed(2)} eV` : `hf < φ by ${(phi - photonEnergyEv).toFixed(2)} eV`}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[11px]">Incident Photon Energy:</div>
                <div className="text-cyan-300 font-mono font-semibold text-sm">
                  {photonEnergyEv.toFixed(3)} eV
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[11px]">Cathode Work Function:</div>
                <div className="text-amber-300 font-mono font-semibold text-sm">
                  {phi.toFixed(3)} eV
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[11px]">Stopping Potential $V_0$:</div>
                <div className="text-rose-400 font-mono font-bold text-sm">
                  {stoppingPotentialV0.toFixed(3)} V
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[11px]">Threshold Cutoff &lambda;<sub>c</sub>:</div>
                <div className="text-indigo-300 font-mono font-semibold text-sm">
                  {cutoffWavelengthNm.toFixed(1)} nm
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Measured Photocurrent $I$:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {(currentNormalized * 100).toFixed(1)}% of Saturation
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-150"
                  style={{ width: `${Math.min(100, currentNormalized * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-300 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-indigo-400" />
              <span>Exam Axiom Rule (Stopping Potential Invariance):</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              If intensity is changed by 10x, stopping potential V₀ is strictly UNCHANGED. V₀ shifts if and only if incident frequency f or work function &phi; changes.
            </p>
          </div>
        </div>

        {/* Dynamic I-V Characteristic Curve Plot */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Photocurrent vs Voltage ($I-V$ Characteristic)
              </h4>
              <span className="text-[10px] font-mono text-cyan-400">Real-time Curve</span>
            </div>
            <PhotoelectricIVCanvas
              stoppingV={stoppingPotentialV0}
              intensity={intensity}
              currentV={retardingV}
              isEmission={isEmission}
            />
          </div>

          <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
            <strong>Key Feature:</strong> Notice how the curve intercepts the voltage axis at exactly -V₀ = -{stoppingPotentialV0.toFixed(2)} V, independent of the intensity plateau.
          </div>
        </div>
      </div>
    </div>
  );
};

const PhotoelectricIVCanvas: React.FC<{
  stoppingV: number;
  intensity: number;
  currentV: number;
  isEmission: boolean;
}> = ({ stoppingV, intensity, currentV, isEmission }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw coordinate axes
    const originX = width * 0.45;
    const originY = height * 0.75;

    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 1;

    // X axis (Voltage)
    ctx.beginPath();
    ctx.moveTo(10, originY);
    ctx.lineTo(width - 10, originY);
    ctx.stroke();

    // Y axis (Current)
    ctx.beginPath();
    ctx.moveTo(originX, 10);
    ctx.lineTo(originX, height - 10);
    ctx.stroke();

    // Labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px monospace";
    ctx.fillText("V (Volts)", width - 65, originY - 6);
    ctx.fillText("I (Current)", originX + 8, 20);
    ctx.fillText("0", originX - 10, originY + 12);

    if (!isEmission) {
      ctx.fillStyle = "#f43f5e";
      ctx.fillText("hf < φ (No Emission)", originX - 50, originY - 20);
      return;
    }

    // Scale mapping
    // X: [-4V to +4V] -> [10 to width-10]
    const scaleX = (width - 40) / 8;
    const scaleY = (originY - 30) / 3;

    // Draw I-V curve for current intensity
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    for (let v = -4.0; v <= 4.0; v += 0.05) {
      const px = originX + v * scaleX;
      let curr = 0;
      if (v > -stoppingV) {
        const factor = (v + stoppingV) / (stoppingV || 0.1);
        curr = intensity * Math.min(2.5, Math.sqrt(factor) * 1.5);
      }
      const py = originY - curr * scaleY;

      if (v === -4.0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Mark -V_0 intercept
    const v0Px = originX - stoppingV * scaleX;
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.arc(v0Px, originY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText(`-V₀ (${-stoppingV.toFixed(2)}V)`, v0Px - 25, originY + 18);

    // Mark current operating point
    const currPx = originX + (-currentV) * scaleX;
    let currVal = 0;
    if (-currentV > -stoppingV) {
      const factor = (-currentV + stoppingV) / (stoppingV || 0.1);
      currVal = intensity * Math.min(2.5, Math.sqrt(factor) * 1.5);
    }
    const currPy = originY - currVal * scaleY;

    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(currPx, currPy, 5, 0, Math.PI * 2);
    ctx.fill();
  }, [stoppingV, intensity, currentV, isEmission]);

  return (
    <div className="w-full h-48 bg-slate-900 rounded-lg p-1 border border-slate-800 flex items-center justify-center">
      <canvas ref={canvasRef} width={340} height={180} className="w-full h-full" />
    </div>
  );
};

/* -------------------------------------------------------------
 * 2. Blackbody & Ultraviolet Catastrophe Simulator
 * ------------------------------------------------------------- */
const BlackbodySim: React.FC = () => {
  const [temperature, setTemperature] = useState(5800); // 5800K (Solar surface)
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Wien Peak: lambda_max = 2.898 x 10^-3 / T (in meters) -> in nm: 2.898e6 / T
  const wienPeakNm = (2.89777e6 / temperature);
  const stefanPowerRatio = Math.pow(temperature / 5800, 4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw axes
    const originX = 40;
    const originY = height - 30;

    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(originX, 10);
    ctx.lineTo(originX, originY);
    ctx.lineTo(width - 10, originY);
    ctx.stroke();

    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px monospace";
    ctx.fillText("Wavelength λ (nm)", width - 110, originY + 20);
    ctx.fillText("Spectral Radiance u(λ)", originX - 35, 18);

    // X scale: 0 to 2500 nm
    const maxLambda = 2500;
    const scaleX = (width - originX - 20) / maxLambda;

    // Peak radiance normalization
    // Planck curve: u(lambda) ~ (8*pi*h*c / lambda^5) / (exp(hc/lambda*k*T) - 1)
    // Normalized peak at wienPeakNm
    const maxPlanckVal = Math.pow(temperature, 5);

    // Draw Rayleigh-Jeans Curve (Classical Catastrophe in RED)
    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();

    let startedRJ = false;
    for (let lam = 100; lam <= maxLambda; lam += 10) {
      // RJ ~ T / lambda^4
      const rjVal = (temperature * 1e11) / Math.pow(lam, 4);
      const py = originY - Math.min(originY - 10, rjVal * 0.05);
      const px = originX + lam * scaleX;

      if (!startedRJ) {
        ctx.moveTo(px, py);
        startedRJ = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Planck Quantum Curve in CYAN/AMBER
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    let startedPlanck = false;
    for (let lam = 20; lam <= maxLambda; lam += 5) {
      const x = (1.43877e7) / (lam * temperature); // hc / (lambda * k_B * T)
      let planck = 0;
      if (x < 100) {
        planck = (1 / Math.pow(lam, 5)) / (Math.exp(x) - 1);
      }
      // Auto-scale peak to about 70% of canvas height
      const peakPlanck = (1 / Math.pow(wienPeakNm, 5)) / (Math.exp(4.965) - 1);
      const normalizedHeight = (planck / (peakPlanck || 1)) * (originY - 40);

      const px = originX + lam * scaleX;
      const py = originY - normalizedHeight;

      if (!startedPlanck) {
        ctx.moveTo(px, py);
        startedPlanck = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();

    // Mark Wien Peak
    const peakPx = originX + wienPeakNm * scaleX;
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(peakPx, 10);
    ctx.lineTo(peakPx, originY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#f59e0b";
    ctx.fillText(`λ_max = ${wienPeakNm.toFixed(0)} nm`, peakPx - 20, originY - 10);
  }, [temperature, wienPeakNm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Blackbody Radiation & Ultraviolet Catastrophe Sandbox</span>
            <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
              Planck (1900)
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Observe the classical Rayleigh-Jeans divergence (&lambda; &rarr; 0, u(&lambda;) &rarr; &infin;) vs the experimental Planck quantization curve.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Cavity Temperature $T$</span>
              <span className="text-amber-400 font-mono font-bold">{temperature} K</span>
            </div>
            <input
              type="range"
              min="1000"
              max="10000"
              step="100"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1000 K (Red Glow)</span>
              <span>5800 K (Sun)</span>
              <span>10000 K (Blue Star)</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="text-slate-400">Wien's Displacement Law:</div>
            <div className="text-amber-300 text-sm">
              <MathView math={`\\lambda_{\\max} = \\frac{2.898 \\times 10^{-3}}{T} = ${wienPeakNm.toFixed(1)}\\text{ nm}`} />
            </div>
            <div className="text-slate-400 mt-2">Stefan-Boltzmann Total Power:</div>
            <div className="text-rose-400 text-sm">
              <MathView math={`P = \\sigma T^4 \\propto ${stefanPowerRatio.toFixed(2)} \\times P_{\\text{sun}}`} />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-800/40 text-xs text-rose-300">
            <strong>Classical Rayleigh-Jeans (Dashed Red):</strong>
            <p className="text-[11px] text-slate-400 mt-1">
              Equipartition theorem average energy &lang;E&rang; = k_B T predicts infinite energy at high frequencies (&lambda; &rarr; 0). Planck fixed this by quantizing oscillator energies: E = nhf.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-semibold text-slate-300">Spectral Energy Distribution Plot</span>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-3 h-0.5 bg-cyan-400 inline-block"></span> Planck Quantum
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-3 h-0.5 bg-rose-400 border-b border-dashed inline-block"></span> Rayleigh-Jeans
              </span>
            </div>
          </div>

          <div className="w-full h-64 bg-slate-900 rounded-lg p-2 border border-slate-800 flex items-center justify-center">
            <canvas ref={canvasRef} width={500} height={240} className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 3. Compton Scattering Spectrometer Simulator
 * ------------------------------------------------------------- */
const ComptonSim: React.FC = () => {
  const [thetaDeg, setThetaDeg] = useState(90); // 90 deg default
  const [lambdaIncidentPm, setLambdaIncidentPm] = useState(71.0); // 71.0 pm (Mo K-alpha)

  const lambdaComptonPm = CONSTANTS.lambda_c * 1e12; // 2.426 pm
  const thetaRad = (thetaDeg * Math.PI) / 180;
  const deltaLambdaPm = lambdaComptonPm * (1 - Math.cos(thetaRad));
  const lambdaScatteredPm = lambdaIncidentPm + deltaLambdaPm;

  // Energies: E = hc / lambda
  // hc = 1.23984 x 10^-6 eV*m = 1239.84 keV*pm
  const hcKeVPm = 1239.84;
  const eIncidentKeV = hcKeVPm / lambdaIncidentPm;
  const eScatteredKeV = hcKeVPm / lambdaScatteredPm;
  const recoilElectronKeV = eIncidentKeV - eScatteredKeV;

  // Recoil angle phi
  // cot(phi) = (1 + hf/m0c^2) * tan(theta/2)
  const alpha = eIncidentKeV / 511.0; // 511 keV is rest mass m0 c^2
  const phiRad = Math.atan2(
    Math.sin(thetaRad),
    (1 + alpha) * (1 - Math.cos(thetaRad))
  );
  const phiDeg = (phiRad * 180) / Math.PI;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Compton Relativistic Scattering Spectrometer</span>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
              Compton (1923)
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Calculate the exact wavelength shift &Delta;&lambda; = &lambda;<sub>c</sub>(1 - cos &theta;) and recoil electron kinematics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Scattering Angle &theta;</span>
              <span className="text-cyan-400 font-mono font-bold">{thetaDeg}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="180"
              step="1"
              value={thetaDeg}
              onChange={(e) => setThetaDeg(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0° (Glancing)</span>
              <span>90° (Perpendicular)</span>
              <span>180° (Backscatter)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Incident Wavelength &lambda;</span>
              <span className="text-amber-400 font-mono">{lambdaIncidentPm.toFixed(1)} pm</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="1"
              value={lambdaIncidentPm}
              onChange={(e) => setLambdaIncidentPm(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Shift Factor (1 - cos &theta;):</span>
              <span className="text-cyan-300 font-bold">{(1 - Math.cos(thetaRad)).toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Compton Shift &Delta;&lambda;:</span>
              <span className="text-indigo-400 font-bold">{deltaLambdaPm.toFixed(3)} pm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Scattered &lambda;':</span>
              <span className="text-emerald-400 font-bold">{lambdaScatteredPm.toFixed(3)} pm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Electron Recoil Energy K_e:</span>
              <span className="text-yellow-400 font-bold">{recoilElectronKeV.toFixed(2)} keV</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Electron Recoil Angle &phi;:</span>
              <span className="text-rose-400 font-bold">{phiDeg.toFixed(1)}°</span>
            </div>
          </div>
        </div>

        {/* 2D Collision Vector Diagram */}
        <div className="lg:col-span-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Relativistic 2D Collision Kinematics
              </h4>
              <span className="text-[10px] font-mono text-cyan-400">Photon-Electron Scattering</span>
            </div>
            <ComptonCollisionCanvas thetaDeg={thetaDeg} phiDeg={phiDeg} />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 text-[11px] font-mono text-center">
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="text-slate-400">θ = 0°</div>
              <div className="text-cyan-300">Δλ = 0</div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="text-slate-400">θ = 90°</div>
              <div className="text-cyan-300">Δλ = λ_c (2.426 pm)</div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="text-slate-400">θ = 180°</div>
              <div className="text-cyan-300">Δλ = 2λ_c (4.852 pm)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComptonCollisionCanvas: React.FC<{ thetaDeg: number; phiDeg: number }> = ({ thetaDeg, phiDeg }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const centerX = width * 0.45;
    const centerY = height * 0.5;

    // Incoming photon (from left to center)
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(30, centerY);
    ctx.lineTo(centerX, centerY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "10px monospace";
    ctx.fillText("Incident Photon γ", 35, centerY - 10);

    // Collision target electron (initially at rest)
    ctx.fillStyle = "#e2e8f0";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 9px sans-serif";
    ctx.fillText("e⁻", centerX - 5, centerY + 3);

    // Scattered photon at angle theta (upwards)
    const thetaRad = (thetaDeg * Math.PI) / 180;
    const lengthPhoton = 110;
    const photonEndX = centerX + lengthPhoton * Math.cos(thetaRad);
    const photonEndY = centerY - lengthPhoton * Math.sin(thetaRad);

    ctx.strokeStyle = "#06b6d4";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(photonEndX, photonEndY);
    ctx.stroke();

    ctx.fillStyle = "#06b6d4";
    ctx.font = "10px monospace";
    ctx.fillText(`Scattered γ (θ = ${thetaDeg}°)`, photonEndX + 5, photonEndY);

    // Recoil electron at angle phi (downwards)
    const phiRad = (phiDeg * Math.PI) / 180;
    const lengthElectron = 90;
    const electronEndX = centerX + lengthElectron * Math.cos(phiRad);
    const electronEndY = centerY + lengthElectron * Math.sin(phiRad);

    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(electronEndX, electronEndY);
    ctx.stroke();

    ctx.fillStyle = "#f43f5e";
    ctx.font = "10px monospace";
    ctx.fillText(`Recoil e⁻ (φ = ${phiDeg.toFixed(1)}°)`, electronEndX + 5, electronEndY + 12);
  }, [thetaDeg, phiDeg]);

  return (
    <div className="w-full h-56 bg-slate-900 rounded-lg p-2 border border-slate-800 flex items-center justify-center">
      <canvas ref={canvasRef} width={450} height={210} className="w-full h-full" />
    </div>
  );
};

/* -------------------------------------------------------------
 * 4. Particle in a Box (1D Infinite Well) & Boundary Probability
 * ------------------------------------------------------------- */
const ParticleInBoxSim: React.FC = () => {
  const [n, setN] = useState(2); // State n = 2 default
  const [boxWidthNm, setBoxWidthNm] = useState(1.0); // 1.0 nm
  const [intervalX1, setIntervalX1] = useState(0.5); // x1 = 0.5 L
  const [intervalX2, setIntervalX2] = useState(1.0); // x2 = 1.0 L
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Exact Analytical Probability Integral:
  // P(x1, x2) = \int_{x1}^{x2} (2/L) sin^2(n pi x / L) dx
  // = [ x/L - sin(2 n pi x / L) / (2 n pi) ] from x1 to x2
  const evalAntiderivative = (fraction: number, stateN: number) => {
    return fraction - Math.sin(2 * stateN * Math.PI * fraction) / (2 * stateN * Math.PI);
  };

  const prob = Math.max(0, evalAntiderivative(intervalX2, n) - evalAntiderivative(intervalX1, n));

  // Energy E_n = n^2 h^2 / (8 m L^2)
  // For electron: E_1 = (6.626e-34)^2 / (8 * 9.109e-31 * (L_m)^2) in J -> / e in eV
  const energyEv = (0.376 * (n * n)) / (boxWidthNm * boxWidthNm);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const padLeft = 40;
    const padRight = 40;
    const wellWidthPx = width - padLeft - padRight;
    const centerY = height * 0.55;

    // Draw Well Walls (x = 0 and x = L)
    ctx.fillStyle = "#334155";
    ctx.fillRect(padLeft - 6, 10, 6, height - 30);
    ctx.fillRect(padLeft + wellWidthPx, 10, 6, height - 30);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px monospace";
    ctx.fillText("x = 0", padLeft - 15, height - 8);
    ctx.fillText(`x = L (${boxWidthNm} nm)`, padLeft + wellWidthPx - 30, height - 8);

    // Draw Integration Interval Shading
    const intPx1 = padLeft + intervalX1 * wellWidthPx;
    const intPx2 = padLeft + intervalX2 * wellWidthPx;

    ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
    ctx.fillRect(intPx1, 20, intPx2 - intPx1, height - 50);

    // Draw Probability Density |psi_n(x)|^2 in EMERALD
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const maxDensityPx = height * 0.4;
    for (let i = 0; i <= wellWidthPx; i++) {
      const frac = i / wellWidthPx;
      const val = 2 * Math.pow(Math.sin(n * Math.PI * frac), 2); // (2/L)*sin^2
      const py = (height - 30) - (val / 2) * maxDensityPx;
      const px = padLeft + i;

      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Draw Wavefunction psi_n(x) (Dashed Sky Blue)
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();

    const ampPx = height * 0.22;
    for (let i = 0; i <= wellWidthPx; i++) {
      const frac = i / wellWidthPx;
      const val = Math.sin(n * Math.PI * frac);
      const py = centerY - val * ampPx;
      const px = padLeft + i;

      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }, [n, boxWidthNm, intervalX1, intervalX2]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Infinite Potential Well (Particle in a Box) & Boundary Probability</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
              Schrödinger (1926)
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Test boundary probability integrals &int; |&psi;<sub>n</sub>(x)|&sup2; dx across fractional box widths.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              Quantum State $n$
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((state) => (
                <button
                  key={state}
                  onClick={() => setN(state)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                    n === state
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  n={state}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Well Width $L$</span>
              <span className="text-emerald-400 font-mono">{boxWidthNm.toFixed(2)} nm</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={boxWidthNm}
              onChange={(e) => setBoxWidthNm(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="pt-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              Probability Integration Interval $[x_1, x_2]$
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Lower Bound $x_1$:</span>
                <span className="text-cyan-400 font-mono">{(intervalX1 * 100).toFixed(0)}% L</span>
              </div>
              <input
                type="range"
                min="0"
                max={intervalX2 - 0.05}
                step="0.05"
                value={intervalX1}
                onChange={(e) => setIntervalX1(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />

              <div className="flex justify-between">
                <span className="text-slate-400">Upper Bound $x_2$:</span>
                <span className="text-indigo-400 font-mono">{(intervalX2 * 100).toFixed(0)}% L</span>
              </div>
              <input
                type="range"
                min={intervalX1 + 0.05}
                max="1"
                step="0.05"
                value={intervalX2}
                onChange={(e) => setIntervalX2(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs font-mono space-y-1">
            <div className="text-slate-400">Exact Boundary Integral $P$:</div>
            <div className="text-emerald-300 font-bold text-base">
              {(prob * 100).toFixed(2)}% ({prob.toFixed(4)})
            </div>
            <div className="text-slate-400 text-[11px] mt-1">
              Energy Eigenvalue: <span className="text-amber-400 font-bold">{energyEv.toFixed(3)} eV</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-semibold text-slate-300">Spatial Wavefunction & Probability Density</span>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-3 h-0.5 bg-emerald-400 inline-block"></span> |&psi;<sub>n</sub>(x)|&sup2; Density
              </span>
              <span className="flex items-center gap-1 text-sky-400">
                <span className="w-3 h-0.5 bg-sky-400 border-b border-dashed inline-block"></span> &psi;<sub>n</sub>(x) Amplitude
              </span>
            </div>
          </div>

          <div className="w-full h-64 bg-slate-900 rounded-lg p-2 border border-slate-800 flex items-center justify-center">
            <canvas ref={canvasRef} width={500} height={240} className="w-full h-full" />
          </div>

          <div className="flex gap-2 mt-3 text-xs">
            <button
              onClick={() => { setIntervalX1(0.5); setIntervalX2(1.0); }}
              className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono border border-slate-800"
            >
              Test [L/2, L] (Right Half)
            </button>
            <button
              onClick={() => { setIntervalX1(0.25); setIntervalX2(0.75); }}
              className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono border border-slate-800"
            >
              Test [L/4, 3L/4] (Center)
            </button>
            <button
              onClick={() => { setIntervalX1(0); setIntervalX2(0.333); }}
              className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono border border-slate-800"
            >
              Test [0, L/3] (First Third)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 5. Barrier Tunneling Simulator
 * ------------------------------------------------------------- */
const TunnelingSim: React.FC = () => {
  const [energyEv, setEnergyEv] = useState(4.0); // 4 eV
  const [barrierV0, setBarrierV0] = useState(6.0); // 6 eV
  const [barrierThicknessNm, setBarrierThicknessNm] = useState(0.5); // 0.5 nm

  // Tunneling attenuation gamma = sqrt(2 m (V0 - E)) / hbar
  // For electron: gamma = sqrt(2 * 9.109e-31 * (V0 - E) * 1.602e-19) / 1.05457e-34
  // = 5.123 x 10^9 * sqrt(V0 - E) in m^-1 = 5.123 * sqrt(V0 - E) in nm^-1
  const diff = Math.max(0.01, barrierV0 - energyEv);
  const gammaNmInv = 5.123 * Math.sqrt(diff);
  const penetrationDepthNm = 1 / gammaNmInv;
  const transmissionT = Math.exp(-2 * gammaNmInv * barrierThicknessNm);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Quantum Barrier Tunneling & Evanescent Decay</span>
            <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
              Gamow (1928)
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Simulate transmission coefficient T &asymp; e^(-2&gamma;a) where classical mechanics predicts T = 0.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Barrier Height $V_0$</span>
              <span className="text-rose-400 font-mono">{barrierV0.toFixed(2)} eV</span>
            </div>
            <input
              type="range"
              min="2"
              max="12"
              step="0.2"
              value={barrierV0}
              onChange={(e) => setBarrierV0(Number(e.target.value))}
              className="w-full accent-rose-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Particle Energy $E$</span>
              <span className="text-cyan-400 font-mono">{energyEv.toFixed(2)} eV</span>
            </div>
            <input
              type="range"
              min="0.5"
              max={barrierV0 - 0.1}
              step="0.1"
              value={energyEv}
              onChange={(e) => setEnergyEv(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Barrier Width $a$</span>
              <span className="text-purple-400 font-mono">{barrierThicknessNm.toFixed(2)} nm</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.05"
              value={barrierThicknessNm}
              onChange={(e) => setBarrierThicknessNm(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Attenuation &gamma;:</div>
              <div className="text-purple-300 text-sm font-bold">{gammaNmInv.toFixed(3)} nm⁻¹</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Penetration Depth &delta;:</div>
              <div className="text-indigo-300 text-sm font-bold">{penetrationDepthNm.toFixed(3)} nm</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Transmission Prob $T$:</div>
              <div className="text-emerald-400 text-sm font-bold">
                {transmissionT < 1e-4 ? transmissionT.toExponential(3) : (transmissionT * 100).toFixed(2) + "%"}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2 text-slate-300">
            <h5 className="font-semibold text-white">Technological Applications:</h5>
            <ul className="list-disc pl-5 space-y-1 text-slate-400 text-[11px]">
              <li><strong>Scanning Tunneling Microscope (STM):</strong> Tip height changes of 0.1 nm alter tunneling current by 10x, enabling atomic resolution imaging.</li>
              <li><strong>Nuclear Alpha Decay:</strong> Enormous range of half-lives (10⁻⁷ s to 10¹⁰ years) due to the exponential sensitivity to barrier width.</li>
              <li><strong>Fowler-Nordheim Cold Emission:</strong> High electric fields narrow the triangular surface barrier, enabling field-emission displays.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 6. Bohr Hydrogen Atom Simulator
 * ------------------------------------------------------------- */
const BohrAtomSim: React.FC = () => {
  const [ni, setNi] = useState(3);
  const [nf, setNf] = useState(2); // Balmer H-alpha default

  const deltaE_eV = 13.606 * (1 / (nf * nf) - 1 / (ni * ni));
  const lambdaNm = deltaE_eV > 0 ? 1239.84 / deltaE_eV : 0;

  // Series classification
  let seriesName = "Unknown";
  let spectrumRegion = "UV";
  if (nf === 1) { seriesName = "Lyman Series"; spectrumRegion = "Ultraviolet"; }
  else if (nf === 2) { seriesName = "Balmer Series"; spectrumRegion = "Visible Light"; }
  else if (nf === 3) { seriesName = "Paschen Series"; spectrumRegion = "Infrared"; }
  else if (nf === 4) { seriesName = "Brackett Series"; spectrumRegion = "Far Infrared"; }
  else if (nf === 5) { seriesName = "Pfund Series"; spectrumRegion = "Far Infrared"; }

  // Bohr radii
  const r_initial = 0.529 * (ni * ni);
  const r_final = 0.529 * (nf * nf);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Bohr Hydrogen Atom & Rydberg Transition Calculator</span>
            <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 font-mono">
              Bohr (1913)
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Calculate transition photon energies &Delta;E = 13.6 (1/n_f&sup2; - 1/n_i&sup2;) eV and orbital parameters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              Initial Orbital Level $n_i$
            </label>
            <div className="grid grid-cols-6 gap-1">
              {[2, 3, 4, 5, 6, 7].map((val) => (
                <button
                  key={val}
                  disabled={val <= nf}
                  onClick={() => setNi(val)}
                  className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-colors disabled:opacity-30 ${
                    ni === val
                      ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40"
                      : "bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              Final Orbital Level $n_f$
            </label>
            <div className="grid grid-cols-5 gap-1">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    setNf(val);
                    if (ni <= val) setNi(val + 1);
                  }}
                  className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                    nf === val
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Series:</span>
              <span className="text-yellow-400 font-bold">{seriesName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Spectrum:</span>
              <span className="text-cyan-300">{spectrumRegion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Radius r_i &rarr; r_f:</span>
              <span className="text-slate-300">{r_initial.toFixed(2)}Å → {r_final.toFixed(2)}Å</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 uppercase font-mono">Transition Energy &Delta;E:</div>
                <div className="text-2xl font-bold font-mono text-yellow-300">
                  {deltaE_eV.toFixed(3)} eV
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400 uppercase font-mono">Emitted Wavelength &lambda;:</div>
                <div className="text-2xl font-bold font-mono text-cyan-300">
                  {lambdaNm.toFixed(1)} nm
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <span className="font-semibold text-white">Hydrogen Spectral Series Mnemonic:</span>
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                  <div className="text-amber-400 font-bold">Lyman (n_f = 1)</div>
                  <div className="text-slate-400">Ultraviolet</div>
                </div>
                <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                  <div className="text-cyan-400 font-bold">Balmer (n_f = 2)</div>
                  <div className="text-slate-400">Visible Light</div>
                </div>
                <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                  <div className="text-rose-400 font-bold">Paschen (n_f = 3)</div>
                  <div className="text-slate-400">Infrared</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 mt-4 pt-2 border-t border-slate-800">
            <strong>Bohr Orbital Quantization Axiom:</strong> Angular momentum is quantized in integer multiples of &#8463;: L = mvr = n&#8463;.
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 7. Special Relativity Spacetime Kinematics Simulator
 * ------------------------------------------------------------- */
const RelativitySim: React.FC = () => {
  const [beta, setBeta] = useState(0.8); // v/c = 0.8 default

  const gamma = 1 / Math.sqrt(1 - beta * beta);
  const timeDilationMuonUs = 2.2 * gamma; // Atmospheric muon proper lifetime 2.2 us
  const lengthContractionPct = (1 / gamma) * 100;
  const kineticEnergyRatio = gamma - 1; // K / (m0 c^2)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Special Relativity & Spacetime Kinematics Stress Tester</span>
            <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
              Einstein (1905)
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Simulate the divergence as v &rarr; c: Lorentz factor &gamma; &rarr; &infin;, time dilation, and Galilean vs Lorentz coordinate discrepancies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Relative Velocity &beta; = v/c</span>
              <span className="text-indigo-400 font-mono font-bold">{beta.toFixed(3)} c</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.999"
              step="0.005"
              value={beta}
              onChange={(e) => setBeta(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0.0 (Classical)</span>
              <span>0.8 c</span>
              <span>0.999 c (Ultra-relativistic)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-xs text-slate-400 uppercase font-mono">Lorentz Factor &gamma;:</div>
            <div className="text-3xl font-bold font-mono text-cyan-300">
              {gamma.toFixed(4)}
            </div>
            <div className="text-xs text-slate-400 leading-relaxed">
              As v &rarr; c, &gamma; &rarr; &infin;. Accelerating a massive particle to c requires infinite work!
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Time Dilation &Delta;t = &gamma; &Delta;t₀:</div>
              <div className="text-cyan-400 text-sm font-bold">{gamma.toFixed(3)}x Slowdown</div>
              <div className="text-[10px] text-slate-500 mt-1">Muon: {timeDilationMuonUs.toFixed(2)} μs (vs 2.2 μs)</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Length Contraction L = L₀/&gamma;:</div>
              <div className="text-emerald-400 text-sm font-bold">{lengthContractionPct.toFixed(1)}% of L₀</div>
              <div className="text-[10px] text-slate-500 mt-1">Shortened along motion axis</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Kinetic Energy K = (&gamma; - 1)m₀c&sup2;:</div>
              <div className="text-amber-400 text-sm font-bold">{kineticEnergyRatio.toFixed(3)} m₀c&sup2;</div>
              <div className="text-[10px] text-slate-500 mt-1">Diverges from 1/2 m v²</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider">
              Galilean vs Lorentz Coordinate Comparison (At Event x = 10⁸ m, t = 1 s)
            </h5>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-rose-400 font-bold mb-1">Classical Galilean:</div>
                <div className="text-slate-300">x'_G = x - vt = {(1e8 - beta * 3e8 * 1).toExponential(2)} m</div>
                <div className="text-slate-300">t'_G = t = 1.00 s (Absolute)</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-cyan-400 font-bold mb-1">Relativistic Lorentz:</div>
                <div className="text-slate-300">x'_L = γ(x - vt) = {(gamma * (1e8 - beta * 3e8 * 1)).toExponential(2)} m</div>
                <div className="text-slate-300">t'_L = γ(t - vx/c²) = {(gamma * (1 - (beta * 3e8 * 1e8) / (9e16))).toFixed(3)} s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
