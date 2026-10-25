import React, { useState } from "react";
import { NavMode, ChapterId } from "./types";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { SheetQuickSwitcher } from "./components/SheetQuickSwitcher";
import { SheetsMasterclassView } from "./components/SheetsMasterclassView";
import { ChapterExamArena } from "./components/ChapterExamArena";
import { CrammingArena } from "./components/CrammingArena";
import { VideoTheater } from "./components/VideoTheater";
import { GlobalEquationsView } from "./components/GlobalEquationsView";
import { CommandTerminal } from "./components/CommandTerminal";
import { InteractiveSandboxes } from "./components/InteractiveSandboxes";
import { PhysicsVisualizer } from "./components/PhysicsVisualizer";
import { CurriculumBrowser } from "./components/CurriculumBrowser";
import { DerivationsLibrary } from "./components/DerivationsLibrary";
import { ExamTrainer } from "./components/ExamTrainer";
import { LabAnalyzer } from "./components/LabAnalyzer";
import { MnemonicsDeck } from "./components/MnemonicsDeck";
import { FlashcardsDeck } from "./components/FlashcardsDeck";
import { OverviewArchitecture } from "./components/OverviewArchitecture";
import { ConstantsModal } from "./components/ConstantsModal";
import { OfficialDocumentsViewer } from "./components/OfficialDocumentsViewer";
import { PromptDirectory } from "./components/PromptDirectory";
import { ScientificCalculator } from "./components/ScientificCalculator";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { 
  SHEET_1_MASTERCLASS, 
  SHEET_2_MASTERCLASS, 
  SHEET_3_MASTERCLASS, 
  SHEET_4_MASTERCLASS 
} from "./lib/reflibData";

export function App() {
  const [currentTab, setCurrentTab] = useState<NavMode>("sheet-1");
  const [isConstantsOpen, setIsConstantsOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [activeCommand, setActiveCommand] = useState<string>("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [examChapterId, setExamChapterId] = useState<ChapterId>("ch1");

  const handleExecuteTrigger = (command: string) => {
    setActiveCommand(command);
    setCurrentTab("terminal");
  };

  const handleOpenTerminalWithTopic = (topicTitle: string) => {
    setActiveCommand(topicTitle.startsWith("/") ? topicTitle : `/lecture ${topicTitle}`);
    setCurrentTab("terminal");
  };

  const isSheetTab = currentTab.startsWith("sheet-");

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
            onOpenCalculator={() => setIsCalculatorOpen(prev => !prev)}
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

          {/* Main Content Workspace (edge-friendly padding on mobile, no swipe conflict) */}
          <main 
            className="main-workspace-container relative flex-1 px-2 py-2.5 sm:p-6 max-w-7xl w-full mx-auto pb-24 md:pb-8"
          >
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
                onOpenChapterExam={(chId) => {
                  setExamChapterId(chId);
                  setCurrentTab("chapter-exam");
                }}
              />
            )}

            {/* Sheet 2: Wave Mechanics */}
            {currentTab === "sheet-2" && (
              <SheetsMasterclassView
                sheet={SHEET_2_MASTERCLASS}
                onOpenConstants={() => setIsConstantsOpen(true)}
                onOpenExamTrainer={() => setCurrentTab("cramming-arena")}
                onOpenChapterExam={(chId) => {
                  setExamChapterId(chId);
                  setCurrentTab("chapter-exam");
                }}
              />
            )}

            {/* Sheet 3: Atomic Physics */}
            {currentTab === "sheet-3" && (
              <SheetsMasterclassView
                sheet={SHEET_3_MASTERCLASS}
                onOpenConstants={() => setIsConstantsOpen(true)}
                onOpenExamTrainer={() => setCurrentTab("cramming-arena")}
                onOpenChapterExam={(chId) => {
                  setExamChapterId(chId);
                  setCurrentTab("chapter-exam");
                }}
              />
            )}

            {/* Sheet 4: Special Relativity */}
            {currentTab === "sheet-4" && (
              <SheetsMasterclassView
                sheet={SHEET_4_MASTERCLASS}
                onOpenConstants={() => setIsConstantsOpen(true)}
                onOpenExamTrainer={() => setCurrentTab("cramming-arena")}
                onOpenChapterExam={(chId) => {
                  setExamChapterId(chId);
                  setCurrentTab("chapter-exam");
                }}
              />
            )}

            {/* Chapter Examination & Assessment Suite */}
            {currentTab === "chapter-exam" && (
              <ChapterExamArena
                initialChapterId={examChapterId}
                onOpenConstants={() => setIsConstantsOpen(true)}
                onOpenCalculator={() => setIsCalculatorOpen(true)}
                onNavigateToSheet={(sheetNum) => setCurrentTab(`sheet-${sheetNum}` as NavMode)}
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

            {/* Dynamic Physics Visualizer */}
            {currentTab === "visualizer" && (
              <PhysicsVisualizer />
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

            {/* Prompt Directory & Studio */}
            {currentTab === "prompts" && (
              <PromptDirectory
                onNavigateToTab={setCurrentTab}
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

      {/* Global Scientific Quantum Calculator Modal */}
      {isCalculatorOpen && (
        <ScientificCalculator
          floating={true}
          onClose={() => setIsCalculatorOpen(false)}
        />
      )}
    </div>
  );
}
export default App;
