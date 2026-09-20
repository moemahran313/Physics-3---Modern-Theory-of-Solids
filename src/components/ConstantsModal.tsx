import React, { useState } from "react";
import { MANDATORY_CONSTANTS } from "../lib/constants";
import { LaTeXRenderer, MathView } from "./LaTeXRenderer";
import { X, Copy, Check, Search, ShieldCheck } from "lucide-react";

interface ConstantsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConstantsModal: React.FC<ConstantsModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = MANDATORY_CONSTANTS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (symbol: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedSymbol(symbol);
    setTimeout(() => setCopiedSymbol(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-3.5 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-500/20 text-indigo-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h2 className="text-sm sm:text-lg font-bold text-white leading-tight">
                Mandatory Physical Constants
              </h2>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Standardized modern physics values enforced in Modern Academy ELCn114.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 sm:p-4 border-b border-slate-800/80 bg-slate-950/50">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search constants (e.g. Planck, Compton, Rydberg)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Table / List */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
            {filtered.map((c) => (
              <div
                key={c.symbol}
                className="p-3 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5 gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 truncate">
                      {c.name}
                    </span>
                    <button
                      onClick={() => handleCopy(c.symbol, c.valueSI)}
                      className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-colors min-h-[30px] shrink-0"
                      title="Copy SI value"
                    >
                      {copiedSymbol === c.symbol ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 py-0.5">
                    <div className="px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40 text-xs sm:text-sm overflow-x-auto">
                      <MathView math={c.latex} />
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-indigo-300 overflow-x-auto">
                      <MathView math={`= ${c.valueSI}`} />
                    </div>
                  </div>

                  {c.valueAtomic && (
                    <div className="text-[11px] font-mono text-slate-400 mt-1 overflow-x-auto">
                      Atomic / eV: <MathView math={`= ${c.valueAtomic}`} />
                    </div>
                  )}

                  <div className="text-[11px] font-mono text-cyan-300/80 mt-0.5 overflow-x-auto">
                    Units: <MathView math={c.units} />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 leading-relaxed">
                  {c.notes}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span className="hidden sm:inline">Standardized Course Repository: All values verified</span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors text-center min-h-[40px]"
          >
            Close Repository
          </button>
        </div>
      </div>
    </div>
  );
};
