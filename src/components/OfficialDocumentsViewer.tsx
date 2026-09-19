import React, { useState } from "react";
import { 
  OFFICIAL_EXAMS, 
  OfficialExam, 
  ExamQuestionGroup, 
  ExamPart 
} from "../lib/officialExamsData";
import { 
  COURSE_LECTURE_PAGES, 
  PHOTOELECTRIC_VS_COMPTON_TABLE 
} from "../lib/courseNotesData";
import { MathView } from "./MathView";
import { 
  FileText, 
  GraduationCap, 
  BookOpen, 
  Layers, 
  Search, 
  CheckCircle, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  Calendar, 
  User, 
  Clock, 
  Sparkles, 
  Terminal, 
  Atom, 
  Check, 
  Info,
  Award
} from "lucide-react";

interface OfficialDocumentsViewerProps {
  onOpenTerminalWithTopic: (topicTitle: string) => void;
}

type ViewSection = "exams" | "lecture-notes" | "matrix" | "orbitals";

export const OfficialDocumentsViewer: React.FC<OfficialDocumentsViewerProps> = ({
  onOpenTerminalWithTopic,
}) => {
  const [activeSection, setActiveSection] = useState<ViewSection>("exams");
  const [selectedExamId, setSelectedExamId] = useState<string>("exam-2020-2021-fall");
  const [activePageNumber, setActivePageNumber] = useState<number>(1);
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Record<string, boolean>>({
    "q1-1-i": true,
    "2019-q1-1-a": true,
  });
  const [userSelectedOptions, setUserSelectedOptions] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedElement, setSelectedElement] = useState<string>("F9");

  const currentExam = OFFICIAL_EXAMS.find((e) => e.id === selectedExamId) || OFFICIAL_EXAMS[0];
  const currentPage = COURSE_LECTURE_PAGES.find((p) => p.pageNumber === activePageNumber) || COURSE_LECTURE_PAGES[0];

  const toggleQuestionExpand = (id: string) => {
    setExpandedQuestionIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (partId: string, optionId: string) => {
    setUserSelectedOptions((prev) => ({ ...prev, [partId]: optionId }));
  };

  // Filtered comparison items
  const filteredMatrix = PHOTOELECTRIC_VS_COMPTON_TABLE.filter(
    (item) =>
      item.criterion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.photoelectric.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.compton.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner / Document Selector */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-medium border border-indigo-500/30 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                OFFICIAL COURSE REPOSITORY
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                Modern Academy Archive (2020–2021)
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Primary Source Documentation & Exam Papers
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Authentic Modern Academy final examination papers (ELCN114 & ELC 214) with full verified marking rubrics, 
              plus the complete 15-page course lecture summary, 12-point Photoelectric vs Compton matrix, and atomic orbital box workbench.
            </p>
          </div>

          <button
            onClick={() => onOpenTerminalWithTopic("/exam-trainer")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-medium transition-all shadow-lg shadow-indigo-600/20 self-start md:self-auto shrink-0"
          >
            <Terminal className="w-4 h-4 text-indigo-200" />
            <span>Launch Socratic AI Session</span>
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-slate-800">
          <button
            onClick={() => setActiveSection("exams")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
              activeSection === "exams"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Official Final Exams</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
              2 Papers
            </span>
          </button>

          <button
            onClick={() => setActiveSection("lecture-notes")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
              activeSection === "lecture-notes"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Course Notes (15 Pages)</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
              All 4 Chapters
            </span>
          </button>

          <button
            onClick={() => setActiveSection("matrix")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
              activeSection === "matrix"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>12-Point Comparison Matrix</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
              PE vs Compton
            </span>
          </button>

          <button
            onClick={() => setActiveSection("orbitals")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
              activeSection === "orbitals"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Atom className="w-4 h-4" />
            <span>Orbital Box Workbench</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
              Hund & Pauli
            </span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 1: OFFICIAL FINAL EXAMS                                */}
      {/* ============================================================== */}
      {activeSection === "exams" && (
        <div className="space-y-6">
          {/* Exam Switcher Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OFFICIAL_EXAMS.map((exam) => {
              const isSelected = exam.id === selectedExamId;
              return (
                <button
                  key={exam.id}
                  onClick={() => setSelectedExamId(exam.id)}
                  className={`text-left p-5 rounded-2xl border transition-all relative overflow-hidden ${
                    isSelected
                      ? "bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full font-semibold border ${
                      isSelected 
                        ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40" 
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}>
                      {exam.subjectCode} • {exam.semester} {exam.academicYear}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {exam.examDate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">
                    {exam.subjectName}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-500" />
                      {exam.examiners.join(", ")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {exam.duration}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 font-mono font-medium">
                      <Award className="w-3 h-3" />
                      Total: {exam.totalPoints} Points
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Exam Header Information Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">
                  Modern Academy for Engineering & Technology • {currentExam.specialization}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Final Exam: {currentExam.subjectName} ({currentExam.subjectCode})
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Examiners: <strong className="text-slate-200">{currentExam.examiners.join(", ")}</strong> • Date: {currentExam.examDate} • Duration: {currentExam.duration}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Full Score</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono">{currentExam.totalPoints} Pts</div>
                </div>
              </div>
            </div>

            {/* Formula & Constants Provided in Exam Header */}
            <div className="mt-4 pt-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Physical Constants Provided on Exam Sheet:
              </div>
              <div className="flex flex-wrap gap-2">
                {currentExam.constantsProvided.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300 text-xs font-mono"
                  >
                    <MathView math={c} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Exam Question Groups */}
          <div className="space-y-6">
            {currentExam.questions.map((group: ExamQuestionGroup) => (
              <div
                key={group.questionNumber}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                      Question {group.questionNumber}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-0.5">
                      {group.title}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 font-mono text-xs border border-indigo-500/30 self-start sm:self-auto">
                    {group.totalPoints} Marks Total
                  </span>
                </div>

                {/* Individual Question Parts */}
                <div className="space-y-4">
                  {group.parts.map((part: ExamPart) => {
                    const isExpanded = !!expandedQuestionIds[part.id];
                    const selectedOption = userSelectedOptions[part.id];
                    const isOptionCorrect = selectedOption === part.correctOption;

                    return (
                      <div
                        key={part.id}
                        className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-5 hover:border-slate-700/80 transition-all"
                      >
                        {/* Part Title and Points */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold flex items-center justify-center border border-indigo-500/30 shrink-0">
                              {part.partNumber}
                            </span>
                            <span className="text-sm font-semibold text-white">
                              {part.title}
                            </span>
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                              {part.type}
                            </span>
                          </div>

                          {part.points !== undefined && (
                            <span className="text-xs font-mono text-slate-400 shrink-0">
                              [{part.points} {part.points === 1 ? "Point" : "Points"}]
                            </span>
                          )}
                        </div>

                        {/* Prompt Body with KaTeX */}
                        <div className="text-sm text-slate-300 leading-relaxed pl-9 mb-4">
                          <MathView math={part.prompt} />
                        </div>

                        {/* MCQ Options (If Applicable) */}
                        {part.options && part.options.length > 0 && (
                          <div className="pl-9 mb-4 space-y-2">
                            <div className="text-xs font-medium text-slate-400 mb-1.5">
                              Select an answer to verify against the official exam key:
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {part.options.map((opt) => {
                                const isUserChoice = selectedOption === opt.id;
                                const isCorrectChoice = opt.id === part.correctOption;

                                let optStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                                if (selectedOption) {
                                  if (isCorrectChoice) {
                                    optStyle = "bg-emerald-950/40 border-emerald-500/80 text-emerald-200 font-medium";
                                  } else if (isUserChoice) {
                                    optStyle = "bg-rose-950/40 border-rose-500/80 text-rose-200";
                                  }
                                }

                                return (
                                  <button
                                    key={opt.id}
                                    onClick={() => handleSelectOption(part.id, opt.id)}
                                    className={`text-left p-3 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all ${optStyle}`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-mono font-bold text-[11px] text-slate-300 shrink-0">
                                        {opt.id}
                                      </span>
                                      <span>{opt.text}</span>
                                    </div>
                                    {selectedOption && isCorrectChoice && (
                                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {selectedOption && (
                              <div className={`mt-2 p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                                isOptionCorrect 
                                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20" 
                                  : "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                              }`}>
                                {isOptionCorrect ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>Correct! Matches the official Modern Academy model answer key.</span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                    <span>Incorrect choice. The official key is Option <strong>{part.correctOption}</strong>. Review the derivation below.</span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Action Buttons: Toggle Solution & Socratic Interrogation */}
                        <div className="pl-9 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                          <button
                            onClick={() => toggleQuestionExpand(part.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700/60 transition-all"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                                <span>Hide Verified Solution</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                <span>View Model Answer & Marking Rubric</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => onOpenTerminalWithTopic(`/exam-trainer ${part.title}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 text-xs font-medium border border-indigo-500/30 transition-all"
                          >
                            <Terminal className="w-3.5 h-3.5" />
                            <span>Interrogate with AI Core</span>
                          </button>
                        </div>

                        {/* Collapsible Verified Model Answer and Grading Rubric */}
                        {isExpanded && (
                          <div className="mt-4 pl-9 space-y-4 animate-fadeIn">
                            <div className="bg-slate-900/90 border border-indigo-500/30 rounded-xl p-4.5">
                              <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-slate-800">
                                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                                  <CheckCircle className="w-4 h-4" />
                                  OFFICIAL MODEL ANSWER & STEP-BY-STEP DERIVATION
                                </span>
                                {part.modelAnswer.examinerTip && (
                                  <span className="text-[11px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 hidden sm:inline-block">
                                    Examiner Insight
                                  </span>
                                )}
                              </div>

                              {/* Final Answer Headline */}
                              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 text-xs md:text-sm font-semibold mb-3">
                                Result: {part.modelAnswer.finalAnswer}
                              </div>

                              {/* Step by Step Breakdown */}
                              <div className="space-y-3">
                                {part.modelAnswer.steps.map((step, idx) => (
                                  <div key={idx} className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                                    <div className="text-xs font-semibold text-indigo-300 mb-1">
                                      {step.title}
                                    </div>
                                    {step.math && (
                                      <div className="my-1.5 p-2 rounded bg-slate-900/90 border border-slate-800 text-xs font-mono overflow-x-auto text-slate-100">
                                        <MathView math={step.math} displayMode={true} />
                                      </div>
                                    )}
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                      {step.explanation}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              {/* Official Grading Rubric Points */}
                              {part.modelAnswer.rubricPoints && part.modelAnswer.rubricPoints.length > 0 && (
                                <div className="mt-4 pt-3 border-t border-slate-800">
                                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Award className="w-3.5 h-3.5 text-amber-400" />
                                    Exam Marking Rubric:
                                  </div>
                                  <ul className="space-y-1">
                                    {part.modelAnswer.rubricPoints.map((rubric, rIdx) => (
                                      <li key={rIdx} className="text-xs text-slate-300 flex items-start gap-2">
                                        <span className="text-amber-400 font-bold">•</span>
                                        <span>{rubric}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Examiner Tip */}
                              {part.modelAnswer.examinerTip && (
                                <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-start gap-2">
                                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                  <span>{part.modelAnswer.examinerTip}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 2: COURSE SUMMARY & LECTURE NOTES (15 PAGES)           */}
      {/* ============================================================== */}
      {activeSection === "lecture-notes" && (
        <div className="space-y-6">
          {/* Page Selector Tabs */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Select Lecture Note Page (1 to 15):</span>
              <span className="text-indigo-400">Page {activePageNumber} of 15</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {COURSE_LECTURE_PAGES.map((page) => (
                <button
                  key={page.pageNumber}
                  onClick={() => setActivePageNumber(page.pageNumber)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    page.pageNumber === activePageNumber
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  P.{page.pageNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Active Page Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                  Page {currentPage.pageNumber} • {currentPage.chapter}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {currentPage.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={activePageNumber <= 1}
                  onClick={() => setActivePageNumber((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs disabled:opacity-40 hover:bg-slate-700"
                >
                  Previous Page
                </button>
                <button
                  disabled={activePageNumber >= 15}
                  onClick={() => setActivePageNumber((p) => Math.min(15, p + 1))}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs disabled:opacity-40 hover:bg-indigo-500"
                >
                  Next Page
                </button>
              </div>
            </div>

            {/* Comprehensive Page Content */}
            <div className="space-y-6">
              {/* Detailed Summary Text */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-sm text-slate-300 leading-relaxed">
                <p>{currentPage.summaryText}</p>
              </div>

              {/* Core Curricular Equations */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Mandatory Mathematical Formulations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentPage.keyEquations.map((eq, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 flex flex-col justify-between"
                    >
                      <div className="text-xs text-indigo-300 font-semibold mb-2">
                        {eq.description}
                      </div>
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800/80 text-center font-mono overflow-x-auto text-slate-100">
                        <MathView math={eq.latex} displayMode={true} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Concept Bullets */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                  Key Concepts & Structural Framework
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentPage.keyConcepts.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crucial Exam Takeaways */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                <div className="text-amber-300 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-400" />
                  Crucial Academic Takeaways:
                </div>
                <ul className="space-y-1.5">
                  {currentPage.crucialTakeaways.map((tip, idx) => (
                    <li key={idx} className="text-amber-200/90 flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Socratic Prompt Button */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenTerminalWithTopic(`/lecture ${currentPage.title}`)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
                >
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span>Explore "{currentPage.title}" with Socratic AI Core</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 3: 12-POINT PHOTOELECTRIC VS COMPTON MATRIX           */}
      {/* ============================================================== */}
      {activeSection === "matrix" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                  Course Notes • Pages 1–4 Mandatory Synthesis
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Photoelectric Effect vs. Compton Effect (12-Point Comparative Matrix)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Exhaustive side-by-side comparison between optical all-or-nothing photon absorption and high-energy relativistic elastic scattering.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter criteria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/90 text-slate-300 font-mono border-b border-slate-800">
                    <th className="py-3 px-4 w-12 text-center">#</th>
                    <th className="py-3 px-4 w-1/4">Comparison Criterion</th>
                    <th className="py-3 px-4 w-3/8 text-sky-300 bg-sky-950/20">
                      Photoelectric Effect (Einstein, 1905)
                    </th>
                    <th className="py-3 px-4 w-3/8 text-purple-300 bg-purple-950/20">
                      Compton Scattering (Compton, 1923)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filteredMatrix.map((item) => (
                    <tr key={item.number} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 text-center font-mono text-slate-500 font-semibold">
                        {item.number}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-200">
                        {item.criterion}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 bg-sky-950/10 leading-relaxed">
                        {item.photoelectric}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 bg-purple-950/10 leading-relaxed">
                        {item.compton}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Showing {filteredMatrix.length} of 12 comparative criteria</span>
              <button
                onClick={() => onOpenTerminalWithTopic("/derive Photoelectric vs Compton")}
                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
              >
                <span>Derive collision kinematics in terminal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 4: ORBITAL BOX WORKBENCH (HUND & PAULI)               */}
      {/* ============================================================== */}
      {activeSection === "orbitals" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="pb-4 mb-4 border-b border-slate-800">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                Course Notes Pages 8–10 & Exam Papers
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Atomic Orbital Box Workbench & Hund's Rule
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Interactive electron configuration diagrams illustrating the Pauli Exclusion Principle (opposite spins) 
                and Hund's Rule of Maximum Multiplicity (parallel spins in degenerate orbitals).
              </p>
            </div>

            {/* Element Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: "F9", label: "Fluorine (F, Z = 9)", desc: "1s² 2s² 2p⁵ (Exam Question)" },
                { id: "Ti22", label: "Titanium (Ti, Z = 22)", desc: "[Ar] 4s² 3d² (Exam Question)" },
                { id: "Ge32", label: "Germanium (Ge, Z = 32)", desc: "[Ar] 4s² 3d¹⁰ 4p² (Exam Question)" },
                { id: "Ca20", label: "Calcium (Ca, Z = 20)", desc: "[Ar] 4s² (Lecture Notes)" },
                { id: "Cu29", label: "Copper (Cu, Z = 29)", desc: "[Ar] 4s¹ 3d¹⁰ (Anomalous Half/Full Stability)" },
              ].map((elem) => (
                <button
                  key={elem.id}
                  onClick={() => setSelectedElement(elem.id)}
                  className={`px-4 py-2 rounded-xl text-left transition-all border ${
                    selectedElement === elem.id
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30"
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold">{elem.label}</div>
                  <div className={`text-[10px] font-mono ${selectedElement === elem.id ? "text-indigo-200" : "text-slate-500"}`}>
                    {elem.desc}
                  </div>
                </button>
              ))}
            </div>

            {/* Orbital Box Rendering according to selected element */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
              {selectedElement === "F9" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-bold text-white">
                      Fluorine Atom: $F_9$ (Total 9 Electrons)
                    </h4>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      1s² 2s² 2p⁵
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    {/* 1s box */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-12 h-12 border-2 border-indigo-500 rounded bg-slate-900 flex items-center justify-center gap-1 font-mono text-base text-indigo-300 font-bold">
                        <span>↑</span>
                        <span className="text-indigo-400">↓</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">1s²</span>
                    </div>

                    {/* 2s box */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-12 h-12 border-2 border-indigo-500 rounded bg-slate-900 flex items-center justify-center gap-1 font-mono text-base text-indigo-300 font-bold">
                        <span>↑</span>
                        <span className="text-indigo-400">↓</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">2s²</span>
                    </div>

                    {/* 2p subshell (3 boxes) */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="flex border-2 border-cyan-500 rounded bg-slate-900 divide-x-2 divide-cyan-500 font-mono text-base font-bold">
                        <div className="w-12 h-12 flex items-center justify-center gap-1 text-cyan-300">
                          <span>↑</span><span>↓</span>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center gap-1 text-cyan-300">
                          <span>↑</span><span>↓</span>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center gap-1 text-amber-400">
                          <span>↑</span><span className="text-slate-600 font-normal">_</span>
                        </div>
                      </div>
                      <div className="flex justify-between w-full text-[11px] font-mono text-slate-400 px-2">
                        <span>2p_x²</span>
                        <span>2p_y²</span>
                        <span className="text-amber-300 font-semibold">2p_z¹ (Unpaired)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-slate-900 text-xs text-slate-300 leading-relaxed border border-slate-800">
                    <strong>Hund's Rule Analysis:</strong> Electrons first singly occupy 2p_x, 2p_y, and 2p_z with parallel spin-up (↑). The 4th and 5th 2p electrons pair up with opposite spin (↓) in 2p_x and 2p_y, leaving <strong>1 unpaired electron in 2p_z</strong>.
                  </div>
                </div>
              )}

              {selectedElement === "Ti22" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-bold text-white">
                      Titanium Atom: $Ti_{22}$ (Total 22 Electrons)
                    </h4>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      [Ar]₁₈ 4s² 3d²
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    {/* [Ar] Core */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="px-4 py-3 border-2 border-slate-700 rounded bg-slate-900 font-mono text-sm text-slate-400 font-bold">
                        [Ar] Core (18 e⁻)
                      </div>
                      <span className="text-xs font-mono text-slate-500">1s²2s²2p⁶3s²3p⁶</span>
                    </div>

                    {/* 4s box */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-12 h-12 border-2 border-indigo-500 rounded bg-slate-900 flex items-center justify-center gap-1 font-mono text-base text-indigo-300 font-bold">
                        <span>↑</span>
                        <span>↓</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">4s²</span>
                    </div>

                    {/* 3d subshell (5 boxes) */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="flex border-2 border-amber-500 rounded bg-slate-900 divide-x-2 divide-amber-500 font-mono text-base font-bold">
                        <div className="w-11 h-12 flex items-center justify-center text-amber-300">↑</div>
                        <div className="w-11 h-12 flex items-center justify-center text-amber-300">↑</div>
                        <div className="w-11 h-12 flex items-center justify-center text-slate-600 font-normal">_</div>
                        <div className="w-11 h-12 flex items-center justify-center text-slate-600 font-normal">_</div>
                        <div className="w-11 h-12 flex items-center justify-center text-slate-600 font-normal">_</div>
                      </div>
                      <span className="text-xs font-mono text-amber-300 font-semibold">
                        3d² (2 Unpaired Parallel Electrons in degenerate orbitals)
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-slate-900 text-xs text-slate-300 leading-relaxed border border-slate-800">
                    <strong>Hund's Rule Analysis:</strong> The 3d subshell contains 5 degenerate orbitals (m_l = -2, -1, 0, +1, +2). Rather than pairing in the first orbital, the two electrons occupy separate orbitals with parallel spins (↑, ↑, _, _, _), minimizing mutual electrostatic repulsion.
                  </div>
                </div>
              )}

              {selectedElement === "Ge32" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-bold text-white">
                      Germanium Atom: $Ge_{32}$ (Total 32 Electrons)
                    </h4>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      [Ar]₁₈ 4s² 3d¹⁰ 4p²
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    {/* [Ar] Core */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="px-3 py-3 border-2 border-slate-700 rounded bg-slate-900 font-mono text-xs text-slate-400 font-bold">
                        [Ar] Core
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">18 e⁻</span>
                    </div>

                    {/* 4s box */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-12 h-12 border-2 border-indigo-500 rounded bg-slate-900 flex items-center justify-center gap-1 font-mono text-base text-indigo-300 font-bold">
                        <span>↑</span><span>↓</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">4s²</span>
                    </div>

                    {/* 3d subshell (5 boxes full) */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="flex border-2 border-slate-600 rounded bg-slate-900 divide-x-2 divide-slate-600 font-mono text-xs font-bold">
                        {[1, 2, 3, 4, 5].map((b) => (
                          <div key={b} className="w-10 h-12 flex items-center justify-center text-slate-300">
                            ↑↓
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-mono text-slate-400">3d¹⁰ (Completely Filled)</span>
                    </div>

                    {/* 4p subshell (3 boxes) */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="flex border-2 border-cyan-500 rounded bg-slate-900 divide-x-2 divide-cyan-500 font-mono text-base font-bold">
                        <div className="w-11 h-12 flex items-center justify-center text-cyan-300">↑</div>
                        <div className="w-11 h-12 flex items-center justify-center text-cyan-300">↑</div>
                        <div className="w-11 h-12 flex items-center justify-center text-slate-600 font-normal">_</div>
                      </div>
                      <span className="text-xs font-mono text-cyan-300 font-semibold">4p² (2 Unpaired Electrons)</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-slate-900 text-xs text-slate-300 leading-relaxed border border-slate-800">
                    <strong>Semiconductor Physics Connection:</strong> Germanium belongs to Group IV with silicon. Its valence shell is 4s² 4p², forming 4 covalent bonds via sp³ hybrid orbitals in a diamond cubic lattice.
                  </div>
                </div>
              )}

              {selectedElement === "Ca20" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-bold text-white">
                      Calcium Atom: $Ca_{20}$ (Total 20 Electrons)
                    </h4>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      [Ar]₁₈ 4s²
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="px-4 py-3 border-2 border-slate-700 rounded bg-slate-900 font-mono text-sm text-slate-400 font-bold">
                      [Ar] Noble Gas Core (18 e⁻)
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-12 h-12 border-2 border-indigo-500 rounded bg-slate-900 flex items-center justify-center gap-1 font-mono text-base text-indigo-300 font-bold">
                        <span>↑</span><span>↓</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">4s²</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedElement === "Cu29" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-bold text-white">
                      Copper Atom: $Cu_{29}$ (Anomalous Stability)
                    </h4>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      [Ar]₁₈ 4s¹ 3d¹⁰
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="px-3 py-3 border-2 border-slate-700 rounded bg-slate-900 font-mono text-xs text-slate-400 font-bold">
                      [Ar] Core
                    </div>

                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-12 h-12 border-2 border-amber-500 rounded bg-slate-900 flex items-center justify-center font-mono text-base text-amber-300 font-bold">
                        ↑
                      </div>
                      <span className="text-xs font-mono text-amber-300">4s¹</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5">
                      <div className="flex border-2 border-emerald-500 rounded bg-slate-900 divide-x-2 divide-emerald-500 font-mono text-xs font-bold">
                        {[1, 2, 3, 4, 5].map((b) => (
                          <div key={b} className="w-10 h-12 flex items-center justify-center text-emerald-300">
                            ↑↓
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-mono text-emerald-300">3d¹⁰ (Filled d-subshell)</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-slate-900 text-xs text-slate-300 leading-relaxed border border-slate-800">
                    <strong>Anomalous Shell Filling:</strong> Instead of the predicted [Ar] 4s² 3d⁹, one 4s electron is promoted to 3d to achieve a completely filled 3d¹⁰ subshell, which possesses lower exchange energy and higher structural stability.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
