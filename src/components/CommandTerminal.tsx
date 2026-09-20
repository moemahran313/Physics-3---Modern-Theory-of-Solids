import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { FormattedContent } from "./LaTeXRenderer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { 
  Send, 
  Terminal, 
  Trash2, 
  Bot, 
  User, 
  Sparkles, 
  Loader2, 
  BookOpen, 
  Binary, 
  Sliders, 
  GraduationCap, 
  FlaskConical, 
  BrainCircuit, 
  Layers 
} from "lucide-react";

interface CommandTerminalProps {
  initialCommand?: string;
  onExecuteCommandNavigation?: (target: string) => void;
}

const INITIAL_GREETING: ChatMessage = {
  id: "init-1",
  sender: "engine",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  content: `### **[Autonomous Educational Core Engine: Physics 3 (ELCN114 / ELC 214)]**

**System Status:** ONLINE | **Academic Standard:** Modern Academy High-Yield Curricular Framework  
**Enforced Pedagogical Models:** Double-Immersive Dual Encoding, Axiomatic Structural Scaffolding, Socratic Mental Sandboxing

Welcome, Student. The Core Engine is fully operational. To execute an analytical sequence, choose a trigger:
- \`/lecture [topic]\` - Comprehensive axiomatic lecture with Dual-Track Encoding.
- \`/derive [equation]\` - Rigorous first-principles proof without skipped steps.
- \`/sandbox [phenomenon]\` - Boundary condition stress testing and interactive simulations.
- \`/exam-trainer [chapter]\` - Authentic Modern Academy examination questions (Types A, B, C, D).
- \`/mnemonics [topic]\` - High-yield structural memory anchors for spectra and selection rules.
- \`/lab-analyzer [experiment]\` - Experimental setups (Davisson-Germer, Compton, Photoelectric, Michelson-Morley).
- \`/flashcards [chapter]\` - Technical active recall cards.

**Curriculum Chapters:**
1. **Chapter 1:** Quantum Physics & Radiation Catastrophe (Blackbody, Photoelectric, Compton).
2. **Chapter 2:** Wave Mechanics & Bound States (De Broglie, Heisenberg, TISE, Well, Tunneling).
3. **Chapter 3:** Atomic Physics & Transitions (Bohr, Rydberg, Quantum Numbers, X-Rays).
4. **Chapter 4:** Special Theory of Relativity (Postulates, Lorentz, Dilation, Contraction, Kinematics).

Which topic or chapter would you like to investigate?`,
};

export const CommandTerminal: React.FC<CommandTerminalProps> = ({
  initialCommand = "",
}) => {
  const [messages, setMessages, resetMessages] = useLocalStorage<ChatMessage[]>("terminal_chat_messages", [INITIAL_GREETING]);
  const [inputValue, setInputValue] = useLocalStorage<string>("terminal_input_value", initialCommand || "");
  const [isLoading, setIsLoading] = useState(false);
  const [activeModuleTab, setActiveModuleTab] = useLocalStorage<"module1" | "module2">("terminal_active_module_tab", "module2");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCommand) {
      setInputValue(initialCommand);
    }
  }, [initialCommand, setInputValue]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend ?? inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/engine/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-4).map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            text: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned error status ${response.status}`);
      }

      const data = await response.json();
      const engineMsg: ChatMessage = {
        id: "eng-" + Date.now(),
        sender: "engine",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        content: data.response || "No response received.",
      };

      setMessages((prev) => [...prev, engineMsg]);
    } catch {
      // Offline fallback handling
      const fallbackMsg: ChatMessage = {
        id: "eng-fb-" + Date.now(),
        sender: "engine",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        content: `### **[Engine Response]**\nExecuted analytical sequence for: **${text}**.\n\nPlease refer to the curated **Dual-Track Lectures** and **Interactive Sandboxes** tabs for real-time mathematical derivations and simulated parameters!`,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommandShortcut = (prefix: string, defaultTopic: string) => {
    const full = `${prefix} ${defaultTopic}`;
    setInputValue(full);
    handleSendMessage(full);
  };

  const handleClear = () => {
    resetMessages();
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[600px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>physics3-core-engine@modern-academy:~#</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
            Axiomatic Reasoning v3.4
          </span>
          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors"
            title="Reset Terminal Session"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dual Engine Switcher & Quick Launcher Bar */}
      <div className="px-4 py-2 bg-slate-950/95 border-b border-slate-800/80 flex flex-col gap-2 text-xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Module Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-0.5 rounded-lg bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveModuleTab("module2")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] font-bold transition-all ${
                activeModuleTab === "module2"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
              <span>Module 2: /sandbox Engine</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            </button>
            <button
              onClick={() => setActiveModuleTab("module1")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] font-bold transition-all ${
                activeModuleTab === "module1"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Binary className="w-3.5 h-3.5 text-cyan-400" />
              <span>Module 1: /lecture &amp; /derive</span>
            </button>
          </div>

          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
            {activeModuleTab === "module2"
              ? "Axiom III: Socratic Interrogation • Parameter Shifts • Predictive Deduction"
              : "Axiom I & II: Axiomatic Foundations • Chalkboard Proofs • Physical Limits"}
          </span>
        </div>

        {/* Module 2: The /sandbox Socratic Engine Triggers */}
        {activeModuleTab === "module2" ? (
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            <span className="text-amber-500/80 font-mono text-[10px] font-bold whitespace-nowrap">Ch1:</span>
            <button
              onClick={() => handleCommandShortcut("/sandbox", "The Blackbody Furnace")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <FlaskConical className="w-3 h-3 text-amber-400" />
              <span>/sandbox Furnace (T₁→2T₁)</span>
            </button>
            <button
              onClick={() => handleCommandShortcut("/sandbox", "The Photoelectric Circuit")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <FlaskConical className="w-3 h-3 text-amber-400" />
              <span>/sandbox Photoelectric Circuit</span>
            </button>
            <button
              onClick={() => handleCommandShortcut("/sandbox", "Billiard Ball Photons")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <FlaskConical className="w-3 h-3 text-amber-400" />
              <span>/sandbox Compton Backscatter</span>
            </button>

            <span className="text-amber-500/80 font-mono text-[10px] font-bold whitespace-nowrap ml-1">Ch2:</span>
            <button
              onClick={() => handleCommandShortcut("/sandbox", "The Shrinking Box")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <FlaskConical className="w-3 h-3 text-amber-400" />
              <span>/sandbox Shrinking Box (L→L/2)</span>
            </button>
            <button
              onClick={() => handleCommandShortcut("/sandbox", "The Leaky Wall")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <FlaskConical className="w-3 h-3 text-amber-400" />
              <span>/sandbox Leaky Wall (Tunneling)</span>
            </button>

            <span className="text-amber-500/80 font-mono text-[10px] font-bold whitespace-nowrap ml-1">Ch3:</span>
            <button
              onClick={() => handleCommandShortcut("/sandbox", "The Electron Elevator")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <FlaskConical className="w-3 h-3 text-amber-400" />
              <span>/sandbox Electron Elevator (n=4)</span>
            </button>
            <button
              onClick={() => handleCommandShortcut("/sandbox", "Quantum Address Invalid")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <FlaskConical className="w-3 h-3 text-amber-400" />
              <span>/sandbox Address (n=2, l=2)</span>
            </button>

            <span className="text-amber-500/80 font-mono text-[10px] font-bold whitespace-nowrap ml-1">Ch4:</span>
            <button
              onClick={() => handleCommandShortcut("/sandbox", "The Relativistic Train")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <FlaskConical className="w-3 h-3 text-amber-400" />
              <span>/sandbox Relativistic Train (0.8c)</span>
            </button>
            <button
              onClick={() => handleCommandShortcut("/sandbox", "The Heavy Sprinter")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <FlaskConical className="w-3 h-3 text-amber-400" />
              <span>/sandbox Heavy Sprinter (0.99c)</span>
            </button>

            {/* Quick Socratic Resolution trigger */}
            <button
              onClick={() => handleCommandShortcut("/sandbox", "resolution")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/70 hover:bg-emerald-900/70 text-emerald-300 border border-emerald-700/50 font-mono text-[11px] transition-colors whitespace-nowrap ml-2 shadow-sm"
            >
              <BrainCircuit className="w-3 h-3 text-emerald-400" />
              <span>💡 Reveal Socratic Resolution</span>
            </button>
          </div>
        ) : (
          /* Module 1: /lecture & /derive Quick Buttons */
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            <span className="text-slate-500 font-mono text-[10px] whitespace-nowrap">Ch1:</span>
            <button
              onClick={() => handleCommandShortcut("/derive", "Relativistic Compton Shift Formula")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <Binary className="w-3 h-3 text-purple-400" />
              <span>/derive Compton</span>
            </button>
            <button
              onClick={() => handleCommandShortcut("/lecture", "Photoelectric Effect and Work Function")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-sky-950/60 hover:bg-sky-900/60 text-sky-300 border border-sky-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <BookOpen className="w-3 h-3 text-sky-400" />
              <span>/lecture Photoelectric</span>
            </button>
            <button
              onClick={() => handleCommandShortcut("/derive", "Wien Displacement and Stefan-Boltzmann Laws")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <Binary className="w-3 h-3 text-purple-400" />
              <span>/derive Wien &amp; Stefan</span>
            </button>

            <span className="text-slate-500 font-mono text-[10px] whitespace-nowrap ml-1">Ch2:</span>
            <button
              onClick={() => handleCommandShortcut("/derive", "Infinite Square Well Wavefunctions and Energy Eigenvalues")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <Binary className="w-3 h-3 text-purple-400" />
              <span>/derive Infinite Well</span>
            </button>
            <button
              onClick={() => handleCommandShortcut("/derive", "De Broglie Matter Wavelength")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <Binary className="w-3 h-3 text-purple-400" />
              <span>/derive de Broglie</span>
            </button>
            <button
              onClick={() => handleCommandShortcut("/lecture", "Quantum Barrier Tunneling and Transmission Coefficient")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-sky-950/60 hover:bg-sky-900/60 text-sky-300 border border-sky-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <BookOpen className="w-3 h-3 text-sky-400" />
              <span>/lecture Tunneling</span>
            </button>

            <span className="text-slate-500 font-mono text-[10px] whitespace-nowrap ml-1">Ch3:</span>
            <button
              onClick={() => handleCommandShortcut("/derive", "Bohr Hydrogen Orbit Radii and Energy States")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <Binary className="w-3 h-3 text-purple-400" />
              <span>/derive Bohr Radii</span>
            </button>
            <button
              onClick={() => handleCommandShortcut("/derive", "Rydberg Formula and Spectral Transitions")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <Binary className="w-3 h-3 text-purple-400" />
              <span>/derive Rydberg Series</span>
            </button>
            <button
              onClick={() => handleCommandShortcut("/lecture", "Four Quantum Numbers and Dipole Selection Rules")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-sky-950/60 hover:bg-sky-900/60 text-sky-300 border border-sky-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <BookOpen className="w-3 h-3 text-sky-400" />
              <span>/lecture Quantum Numbers</span>
            </button>

            <span className="text-slate-500 font-mono text-[10px] whitespace-nowrap ml-1">Ch4:</span>
            <button
              onClick={() => handleCommandShortcut("/derive", "Relativistic Time Dilation via Transverse Light-Clock")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <Binary className="w-3 h-3 text-purple-400" />
              <span>/derive Time Dilation</span>
            </button>
            <button
              onClick={() => handleCommandShortcut("/derive", "Relativistic Length Contraction")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <Binary className="w-3 h-3 text-purple-400" />
              <span>/derive Length Contraction</span>
            </button>
            <button
              onClick={() => handleCommandShortcut("/derive", "Lorentz Coordinate Transformations and Velocity Addition")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              <Binary className="w-3 h-3 text-purple-400" />
              <span>/derive Lorentz Transforms</span>
            </button>
          </div>
        )}
      </div>

      {/* Messages Output Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 font-sans">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${
              m.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-semibold ${
                m.sender === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 border border-slate-700 text-cyan-400"
              }`}
            >
              {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-4 md:p-5 shadow-lg ${
                m.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none font-mono text-sm"
                  : "bg-slate-950/80 border border-slate-800/90 text-slate-200 rounded-tl-none"
              }`}
            >
              <div className="flex items-center justify-between mb-2 text-[11px] opacity-70">
                <span className="font-semibold uppercase tracking-wider font-mono">
                  {m.sender === "user" ? "Engineering Student" : "Autonomous Core Engine"}
                </span>
                <span>{m.timestamp}</span>
              </div>

              {m.sender === "user" ? (
                <p className="whitespace-pre-wrap">{m.content}</p>
              ) : (
                <FormattedContent content={m.content} />
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-cyan-400 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl rounded-tl-none bg-slate-950/80 border border-slate-800 text-slate-400 flex items-center gap-3 text-sm">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
              <span className="font-mono text-xs">
                Executing Dual-Track Rigorous Proof & Mathematical Scaffolding...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 md:p-4 bg-slate-950/90 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter command trigger (e.g. /derive Compton or /sandbox Blackbody) or ask a conceptual question..."
              className="w-full pl-4 pr-10 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            {inputValue.startsWith("/") && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Trigger Active
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <span>Execute</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
