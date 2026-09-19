import React, { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3500);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 rounded-full bg-amber-500/90 text-slate-950 text-xs font-semibold shadow-lg backdrop-blur-sm flex items-center gap-2 border border-amber-400">
        <WifiOff className="w-3.5 h-3.5 animate-pulse" />
        <span>Offline Mode: Loaded sheets & constants remain fully usable.</span>
      </div>
    );
  }

  if (showReconnected) {
    return (
      <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 rounded-full bg-emerald-500/90 text-white text-xs font-semibold shadow-lg backdrop-blur-sm flex items-center gap-2 border border-emerald-400 animate-in fade-in">
        <Wifi className="w-3.5 h-3.5" />
        <span>Connected: Online sync active.</span>
      </div>
    );
  }

  return null;
};
