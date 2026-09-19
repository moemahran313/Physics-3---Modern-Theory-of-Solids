import React, { useState } from "react";
import { NavMode } from "./types";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { SheetQuickSwitcher } from "./components/SheetQuickSwitcher";
import { SheetsMasterclassView } from "./components/SheetsMasterclassView";
import { CrammingArena } from "./components/CrammingArena";
import { VideoTheater } from "./components/VideoTheater";
import { GlobalEquationsView } from "./components/GlobalEquationsView";
import { CommandTerminal } from "./components/CommandTerminal";
import { InteractiveSandboxes } from "./components/InteractiveSandboxes";
import { CurriculumBrowser } from "./components/CurriculumBrowser";
import { DerivationsLibrary } from "./components/DerivationsLibrary";
import { ExamTrainer } from "./components/ExamTrainer";
import { LabAnalyzer } from "./components/LabAnalyzer";
import { MnemonicsDeck } from "./components/MnemonicsDeck";
import { FlashcardsDeck } from "./components/FlashcardsDeck";
import { OverviewArchitecture } from "./components/OverviewArchitecture";
import { ConstantsModal } from "./components/ConstantsModal";
import { OfficialDocumentsViewer } from "./components/OfficialDocumentsViewer";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { useSwipeGesture } from "./hooks/useSwipeGesture";
import { 
  SHEET_1_MASTERCLASS, 
  SHEET_2_MASTERCLASS, 
  SHEET_3_MASTERCLASS, 
  SHEET_4_MASTERCLASS 
} from "./lib/reflibData";

const SHEET_ORDER: { id: NavMode; title: string; num: string }[] = [
  { id: "sheet-1", title: "Quantum & Thermal", num: "1" },
  { id: "sheet-2", title: "Wave Mechanics", num: "2" },
  { id: "sheet-3", title: "Atomic Physics", num: "3" },
  { id: "sheet-4", title: "Special Relativity", num: "4" },
];

export function App() {
  const [currentTab, setCurrentTab] = useState<NavMode>("sheet-1");
  const [isConstantsOpen, setIsConstantsOpen] = useState<boolean>(false);
  const [activeCommand, setActiveCommand] = useState<string>("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [swipeToast, setSwipeToast] = useState<{ text: string; direction: "next" | "prev" } | null>(null);

  const handleExecuteTrigger = (command: string) => {
    setActiveCommand(command);
    setCurrentTab("terminal");
  };

  const handleOpenTerminalWithTopic = (topicTitle: string) => {
    setActiveCommand(topicTitle.startsWith("/") ? topicTitle : `/lecture ${topicTitle}`);
    setCurrentTab("terminal");
  };

  const isSheetTab = currentTab.startsWith("sheet-");

  // Mobile Touch Swipe Gesture handlers across sheets
  const handleNextSheet = () => {
    const currentIndex = SHEET_ORDER.findIndex((s) => s.id === currentTab);
    if (currentIndex !== -1 && currentIndex < SHEET_ORDER.length - 1) {
      const nextSheet = SHEET_ORDER[currentIndex + 1];
      setCurrentTab(nextSheet.id);
      setSwipeToast({ text: `Sheet ${nextSheet.num}: ${nextSheet.title}`, direction: "next" });
      setTimeout(() => setSwipeToast(null), 1800);
    }
  };

  const handlePrevSheet = () => {
    const currentIndex = SHEET_ORDER.findIndex((s) => s.id === currentTab);
    if (currentIndex > 0) {
      const prevSheet = SHEET_ORDER[currentIndex - 1];
      setCurrentTab(prevSheet.id);
      setSwipeToast({ text: `Sheet ${prevSheet.num}: ${prevSheet.title}`, direction: "prev" });
      setTimeout(() => setSwipeToast(null), 1800);
    }
  };

  const { touchHandlers, swipeFeedback } = useSwipeGesture({
    onSwipeLeft: handleNextSheet,
    onSwipeRight: handlePrevSheet,
    disabled: !isSheetTab,
    minDistance: 45,
    thresholdRatio: 1.25,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      {/* Offline Status Indicator */}
      <OfflineIndicator />

      {/* App Shell with Left Sidebar & Main Workspace */}
      <div className="flex flex-1 min-h-screen overflow-hidden">
        {/* Sleek RefLib Left Sidebar (Slide-over drawer on mobile, collapsible on desktop) */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          collapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          onOpenTerminalDrawer={() => {
            setActiveCommand("/help");
            setCurrentTab("terminal");
            setIsMobileMenuOpen(false);
          }}
        />

        {/* Right Main Column */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Header with Global Instant Search & Mobile Search Bar */}
          <Header
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            onOpenConstants={() => setIsConstantsOpen(true)}
            collapsedSidebar={isSidebarCollapsed}
            onToggleSidebar={() => {
              // On mobile, toggle mobile drawer. On desktop, collapse sidebar.
              if (window.innerWidth < 768) {
                setIsMobileMenuOpen(prev => !prev);
              } else {
                setIsSidebarCollapsed(prev => !prev);
              }
            }}
          />

          {/* Main Content Workspace (extra bottom padding on mobile for the bottom navigation bar) */}
          <main 
            {...touchHandlers}
            className="main-workspace-container relative flex-1 p-3.5 sm:p-6 max-w-7xl w-full mx-auto pb-24 md:pb-8 touch-pan-y"
          >
            {/* Native Mobile Swipe Indicator Toast */}
            {swipeToast && (
              <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-semibold shadow-xl border border-indigo-400 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <span>{swipeToast.direction === "next" ? "👉" : "👈"}</span>
                <span>{swipeToast.text}</span>
              </div>
            )}

            {/* Quick 1-tap sheet switcher for mobile and tablets */}
            {isSheetTab && (
              <SheetQuickSwitcher
                currentTab={currentTab}
                onSelectTab={setCurrentTab}
              />
            )}

            {/* Sheet 1: Quantum & Thermal */}
            {currentTab === "sheet-1" && (
              <SheetsMasterclassView
                sheet={SHEET_1_MASTERCLASS}
                onOpenConstants={() => setIsConstantsOpen(true)}
                onOpenExamTrainer={() => setCurrentTab("cramming-arena")}
              />
            )}

            {/* Sheet 2: Wave Mechanics */}
            {currentTab === "sheet-2" && (
              <SheetsMasterclassView
                sheet={SHEET_2_MASTERCLASS}
                onOpenConstants={() => setIsConstantsOpen(true)}
                onOpenExamTrainer={() => setCurrentTab("cramming-arena")}
              />
            )}

            {/* Sheet 3: Atomic Physics */}
            {currentTab === "sheet-3" && (
              <SheetsMasterclassView
                sheet={SHEET_3_MASTERCLASS}
                onOpenConstants={() => setIsConstantsOpen(true)}
                onOpenExamTrainer={() => setCurrentTab("cramming-arena")}
              />
            )}

            {/* Sheet 4: Special Relativity */}
            {currentTab === "sheet-4" && (
              <SheetsMasterclassView
                sheet={SHEET_4_MASTERCLASS}
                onOpenConstants={() => setIsConstantsOpen(true)}
                onOpenExamTrainer={() => setCurrentTab("cramming-arena")}
              />
            )}

            {/* Cramming Arena: 10 Mock Exams + Keypad */}
            {currentTab === "cramming-arena" && (
              <CrammingArena
                onOpenConstants={() => setIsConstantsOpen(true)}
              />
            )}

            {/* Video Theater: 10 YouTube Lectures */}
            {currentTab === "videos" && (
              <VideoTheater />
            )}

            {/* Global Equations Master Cheatsheet */}
            {currentTab === "global-equations" && (
              <GlobalEquationsView
                onOpenConstants={() => setIsConstantsOpen(true)}
              />
            )}

            {/* Flashcards Arena */}
            {currentTab === "flashcards" && (
              <FlashcardsDeck />
            )}

            {/* Cramming Mnemonics Deck */}
            {currentTab === "mnemonics" && (
              <MnemonicsDeck />
            )}

            {/* Interactive Physics Sandboxes */}
            {currentTab === "sandboxes" && (
              <InteractiveSandboxes
                onOpenTerminalWithCommand={(cmd) => {
                  setActiveCommand(cmd);
                  setCurrentTab("terminal");
                }}
              />
            )}

            {/* Official Papers & Archives */}
            {currentTab === "official-docs" && (
              <OfficialDocumentsViewer
                onOpenTerminalWithTopic={handleOpenTerminalWithTopic}
              />
            )}

            {/* Legacy Dual-Track Curriculum */}
            {currentTab === "curriculum" && (
              <CurriculumBrowser
                onOpenTerminalWithTopic={handleOpenTerminalWithTopic}
                onOpenSandbox={() => setCurrentTab("sandboxes")}
              />
            )}

            {/* Derivations Library */}
            {currentTab === "derivations" && (
              <DerivationsLibrary
                onOpenTerminalWithTopic={handleOpenTerminalWithTopic}
              />
            )}

            {/* Legacy Exam Trainer */}
            {currentTab === "exam-trainer" && (
              <ExamTrainer />
            )}

            {/* Lab Analyzer */}
            {currentTab === "lab-analyzer" && (
              <LabAnalyzer />
            )}

            {/* AI Socratic Terminal */}
            {currentTab === "terminal" && (
              <CommandTerminal
                initialCommand={activeCommand}
                onExecuteCommandNavigation={(tab) => setCurrentTab(tab as NavMode)}
              />
            )}

            {/* Overview & Architecture */}
            {currentTab === "overview" && (
              <OverviewArchitecture
                onNavigate={setCurrentTab}
                onOpenConstants={() => setIsConstantsOpen(true)}
                onExecuteTrigger={handleExecuteTrigger}
              />
            )}
          </main>

          {/* Footer */}
          <footer className="bg-slate-950/80 border-t border-slate-900 py-3 px-4 sm:px-6 text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2 mb-16 md:mb-0">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="truncate">Physics 3 RefLib • Modern Academy</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span>ELCn114</span>
              <span>Lectures 1–10</span>
              <span>@mhdmahran</span>
            </div>
          </footer>
        </div>
      </div>

      {/* Mobile Native Bottom Navigation Bar */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Mandatory Physical Constants Modal */}
      <ConstantsModal
        isOpen={isConstantsOpen}
        onClose={() => setIsConstantsOpen(false)}
      />
    </div>
  );
}
export default App;
