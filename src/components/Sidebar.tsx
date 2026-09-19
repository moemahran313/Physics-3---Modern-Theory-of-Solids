import React from "react";
import { NavMode } from "../types";
import { 
  FileText, 
  Flame, 
  Layers, 
  Tv, 
  FileSpreadsheet, 
  BrainCircuit, 
  Sliders, 
  Terminal, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Atom,
  GraduationCap,
  X
} from "lucide-react";
import { PWAInstallButton } from "./PWAInstallButton";

interface SidebarProps {
  currentTab: NavMode;
  onSelectTab: (tab: NavMode) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenTerminalDrawer?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  onOpenTerminalDrawer,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const handleItemClick = (tab: NavMode) => {
    onSelectTab(tab);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 md:relative md:z-30 
          flex flex-col bg-slate-950 border-r border-slate-800 
          transition-all duration-300 select-none 
          w-72 max-w-[85vw] 
          ${isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"} 
          ${collapsed ? "md:w-16" : "md:w-64 lg:w-72"} 
          shrink-0
        `}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80">
          {(!collapsed || isMobileOpen) && (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/30 shrink-0">
                <Atom className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="truncate">
                <span className="font-bold text-sm tracking-tight text-white block truncate">
                  Physics 3 RefLib
                </span>
                <span className="text-[10px] text-slate-400 font-mono block truncate">
                  ELCn114 Modern Academy
                </span>
              </div>
            </div>
          )}

          {collapsed && !isMobileOpen && (
            <div className="w-full flex justify-center">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                <Atom className="w-5 h-5 text-cyan-300" />
              </div>
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/70 transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="flex md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close navigation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-5 scrollbar-thin scrollbar-thumb-slate-800">
          {/* Category: ALL SHEETS */}
          <div>
            {(!collapsed || isMobileOpen) && (
              <div className="px-3 mb-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center justify-between">
                <span>All Sheets</span>
                <span className="text-indigo-400 text-[10px] font-normal">Ch. 1–4</span>
              </div>
            )}
            <div className="space-y-1">
              <SidebarItem
                active={currentTab === "sheet-1"}
                onClick={() => handleItemClick("sheet-1")}
                icon={<FileText className="w-4 h-4 text-cyan-400" />}
                label="Sheet 1: Quantum & Thermal"
                shortLabel="S1"
                badge="Blackbody & Photo"
                collapsed={collapsed && !isMobileOpen}
              />
              <SidebarItem
                active={currentTab === "sheet-2"}
                onClick={() => handleItemClick("sheet-2")}
                icon={<FileText className="w-4 h-4 text-sky-400" />}
                label="Sheet 2: Wave Mechanics"
                shortLabel="S2"
                badge="Schrödinger & Wells"
                collapsed={collapsed && !isMobileOpen}
              />
              <SidebarItem
                active={currentTab === "sheet-3"}
                onClick={() => handleItemClick("sheet-3")}
                icon={<FileText className="w-4 h-4 text-purple-400" />}
                label="Sheet 3: Atomic Physics"
                shortLabel="S3"
                badge="Bohr & X-Rays"
                collapsed={collapsed && !isMobileOpen}
              />
              <SidebarItem
                active={currentTab === "sheet-4"}
                onClick={() => handleItemClick("sheet-4")}
                icon={<FileText className="w-4 h-4 text-amber-400" />}
                label="Sheet 4: Special Relativity"
                shortLabel="S4"
                badge="Lorentz & E=mc²"
                collapsed={collapsed && !isMobileOpen}
              />
            </div>
          </div>

          {/* Category: ARENA & MASTERY */}
          <div>
            {(!collapsed || isMobileOpen) && (
              <div className="px-3 mb-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center justify-between">
                <span>Exam & Study Hub</span>
                <span className="text-rose-400 text-[10px]">Cramming</span>
              </div>
            )}
            <div className="space-y-1">
              <SidebarItem
                active={currentTab === "cramming-arena"}
                onClick={() => handleItemClick("cramming-arena")}
                icon={<Flame className="w-4 h-4 text-rose-500 animate-pulse" />}
                label="Cramming Arena"
                shortLabel="Cram"
                badge="10 Mock Exams"
                badgeColor="bg-rose-500/20 text-rose-300 border border-rose-500/40"
                collapsed={collapsed && !isMobileOpen}
              />
              <SidebarItem
                active={currentTab === "flashcards"}
                onClick={() => handleItemClick("flashcards")}
                icon={<Layers className="w-4 h-4 text-indigo-400" />}
                label="Flashcards Arena"
                shortLabel="Flash"
                badge="Spaced Repetition"
                collapsed={collapsed && !isMobileOpen}
              />
              <SidebarItem
                active={currentTab === "videos"}
                onClick={() => handleItemClick("videos")}
                icon={<Tv className="w-4 h-4 text-red-500" />}
                label="Video Dashboard"
                shortLabel="Videos"
                badge="10 Lectures"
                badgeColor="bg-red-500/20 text-red-300 border border-red-500/30"
                collapsed={collapsed && !isMobileOpen}
              />
              <SidebarItem
                active={currentTab === "global-equations"}
                onClick={() => handleItemClick("global-equations")}
                icon={<FileSpreadsheet className="w-4 h-4 text-emerald-400" />}
                label="Equation Sheet"
                shortLabel="Eqs"
                badge="Master Cheatsheet"
                collapsed={collapsed && !isMobileOpen}
              />
              <SidebarItem
                active={currentTab === "mnemonics"}
                onClick={() => handleItemClick("mnemonics")}
                icon={<BrainCircuit className="w-4 h-4 text-yellow-400" />}
                label="Cramming Mnemonics"
                shortLabel="Mnem"
                collapsed={collapsed && !isMobileOpen}
              />
            </div>
          </div>

          {/* Category: LABS & SIMULATORS */}
          <div>
            {(!collapsed || isMobileOpen) && (
              <div className="px-3 mb-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                <span>Interactive & Tools</span>
              </div>
            )}
            <div className="space-y-1">
              <SidebarItem
                active={currentTab === "sandboxes"}
                onClick={() => handleItemClick("sandboxes")}
                icon={<Sliders className="w-4 h-4 text-amber-400" />}
                label="Visual Sandboxes"
                shortLabel="Sims"
                badge="7 Physics Sims"
                collapsed={collapsed && !isMobileOpen}
              />
              <SidebarItem
                active={currentTab === "official-docs"}
                onClick={() => handleItemClick("official-docs")}
                icon={<GraduationCap className="w-4 h-4 text-teal-400" />}
                label="Past Official Papers"
                shortLabel="Docs"
                badge="2020–2021"
                collapsed={collapsed && !isMobileOpen}
              />
              <SidebarItem
                active={currentTab === "terminal"}
                onClick={() => {
                  if (onOpenTerminalDrawer) {
                    onOpenTerminalDrawer();
                  } else {
                    handleItemClick("terminal");
                  }
                  if (onCloseMobile) onCloseMobile();
                }}
                icon={<Terminal className="w-4 h-4 text-emerald-400" />}
                label="AI Socratic Terminal"
                shortLabel="AI"
                badge="Helper"
                collapsed={collapsed && !isMobileOpen}
              />
            </div>
          </div>
        </div>

        {/* Footer: Mahran Credits & Community Discord */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 space-y-2">
          {(!collapsed || isMobileOpen) && (
            <PWAInstallButton variant="sidebar" className="mb-2" />
          )}

          {(!collapsed || isMobileOpen) && (
            <a
              href="https://discord.gg/p6hkRbzFTn"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 text-xs transition-colors min-h-[44px]"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-semibold">Join Study Discord</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {(!collapsed || isMobileOpen) ? (
            <div className="px-2 pt-1 flex items-center justify-between text-[11px] text-slate-400">
              <div>
                <span className="text-slate-400 block font-medium">RefLib by Mahran</span>
                <span className="text-indigo-400 font-mono text-[10px]">@mhdmahran</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-emerald-400">
                v2.5
              </span>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="text-[10px] font-mono text-indigo-400">v2.5</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

interface SidebarItemProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  shortLabel: string;
  badge?: string;
  badgeColor?: string;
  collapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  active,
  onClick,
  icon,
  label,
  shortLabel,
  badge,
  badgeColor,
  collapsed,
}) => {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all min-h-[44px] ${
        active
          ? "bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm"
          : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 active:bg-slate-850"
      } ${collapsed ? "justify-center px-0" : ""}`}
    >
      <span className="shrink-0">{icon}</span>
      {!collapsed && (
        <div className="flex-1 flex items-center justify-between overflow-hidden">
          <span className="truncate text-left">{label}</span>
          {badge && (
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-mono shrink-0 ml-1.5 ${
                badgeColor || "bg-slate-800 text-slate-300 border border-slate-700/60"
              }`}
            >
              {badge}
            </span>
          )}
        </div>
      )}
      {collapsed && <span className="sr-only">{shortLabel}</span>}
    </button>
  );
};
