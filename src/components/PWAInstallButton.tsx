import React, { useState } from "react";
import { usePWAInstall } from "../hooks/usePWAInstall";
import { Download, Share, PlusSquare, X, CheckCircle, Smartphone } from "lucide-react";

interface PWAInstallButtonProps {
  className?: string;
  variant?: "header" | "sidebar" | "banner";
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  className = "",
  variant = "header"
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setJustInstalled(true);
        setTimeout(() => setJustInstalled(false), 3000);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  // If neither installable directly nor iOS, we can still show a button if on variant banner or sidebar for manual add
  const shouldRender = isInstallable || isIOS || variant === "sidebar";

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      {variant === "header" && (
        <button
          onClick={handleInstallClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all active:scale-95 min-h-[38px] ${className}`}
          title="Install Physics 3 RefLib App on your device"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden xs:inline sm:inline">Install App</span>
          <span className="xs:hidden sm:hidden">Install</span>
        </button>
      )}

      {variant === "sidebar" && (
        <div className={`p-3 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 space-y-2 ${className}`}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-300 flex items-center justify-center">
              <Download className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white leading-tight">Install PWA</h4>
              <p className="text-[10px] text-slate-400">Offline & Fast Access</p>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1.5 min-h-[36px]"
          >
            <span>{isIOS ? "How to Install (iOS)" : "Install to Home Screen"}</span>
          </button>
        </div>
      )}

      {variant === "banner" && (
        <div className={`flex items-center justify-between p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 gap-3 ${className}`}>
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs text-slate-200">
              Install <strong>Physics 3 RefLib</strong> for native offline study & fast swipe navigation.
            </span>
          </div>
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0 transition-colors"
          >
            Install
          </button>
        </div>
      )}

      {/* iOS Installation Instruction Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Install on iPhone / iPad</h3>
                  <p className="text-[11px] text-slate-400">Save to Home Screen</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <div className="space-y-1">
                  <p className="font-semibold text-white flex items-center gap-1.5">
                    Tap the Share Button <Share className="w-3.5 h-3.5 text-indigo-400 inline" />
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Located in the Safari toolbar at the bottom or top of your screen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <div className="space-y-1">
                  <p className="font-semibold text-white flex items-center gap-1.5">
                    Scroll down and select <PlusSquare className="w-3.5 h-3.5 text-emerald-400 inline" />
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Tap <strong>"Add to Home Screen"</strong> and then confirm with <strong>Add</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors min-h-[42px]"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback toast if installed */}
      {justInstalled && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>App successfully installed!</span>
        </div>
      )}
    </>
  );
};
