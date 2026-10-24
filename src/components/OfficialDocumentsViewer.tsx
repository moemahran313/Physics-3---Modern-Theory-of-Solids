import React, { useState, useEffect } from "react";
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
import { ScientificCalculator } from "./ScientificCalculator";
import { ExamPhysicsDiagram } from "./ExamPhysicsDiagram";
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
  Award,
  Calculator,
  Play,
  Pause,
  RotateCcw,
  Flag,
  Filter,
  CheckSquare,
  HelpCircle,
  Eye,
  EyeOff
} from "lucide-react";

interface OfficialDocumentsViewerProps {
  onOpenTerminalWithTopic: (topicTitle: string) => void;
}

type ViewSection = "exams" | "simulation" | "topic-browser" | "lecture-notes" | "matrix" | "orbitals";

export const OfficialDocumentsViewer: React.FC<OfficialDocumentsViewerProps> = ({
  onOpenTerminalWithTopic,
}) => {
  const [activeSection, setActiveSection] = useState<ViewSection>("exams");
  const [selectedExamId, setSelectedExamId] = useState<string>(OFFICIAL_EXAMS[0]?.id || "exam-2022-2023-spring");
  const [activePageNumber, setActivePageNumber] = useState<number>(1);
  const [userSelectedOptions, setUserSelectedOptions] = useState<Record<string, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [userScratchpad, setUserScratchpad] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>("all");
  const [selectedElement, setSelectedElement] = useState<string>("F9");
  const [showCalculator, setShowCalculator] = useState<boolean>(false);

  // Exam Simulation Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(120 * 60); // 120 minutes
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [simActiveQuestionIndex, setSimActiveQuestionIndex] = useState<number>(0);

  const currentExam = OFFICIAL_EXAMS.find((e) => e.id === selectedExamId) || OFFICIAL_EXAMS[0];
  const currentPage = COURSE_LECTURE_PAGES.find((p) => p.pageNumber === activePageNumber) || COURSE_LECTURE_PAGES[0];

  // Flattened list of parts for current exam
  const allCurrentExamParts: Array<{ group: ExamQuestionGroup; part: ExamPart; globalIndex: number }> = [];
  let partCounter = 0;
  currentExam?.questions.forEach((q) => {
    q.parts.forEach((p) => {
      allCurrentExamParts.push({ group: q, part: p, globalIndex: partCounter++ });
    });
  });

  // Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleSolutionReveal = (id: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFlagQuestion = (id: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (partId: string, optionId: string) => {
    setUserSelectedOptions((prev) => ({ ...prev, [partId]: optionId }));
  };

  const resetExamSession = () => {
    setUserSelectedOptions({});
    setRevealedSolutions({});
    setFlaggedQuestions({});
    setUserScratchpad({});
    setTimerSeconds(120 * 60);
    setIsTimerRunning(false);
    setSimActiveQuestionIndex(0);
  };

  // Cross-year topic questions
  const allExamsParts: Array<{ exam: OfficialExam; group: ExamQuestionGroup; part: ExamPart }> = [];
  OFFICIAL_EXAMS.forEach((exam) => {
    exam.questions.forEach((group) => {
      group.parts.forEach((part) => {
        allExamsParts.push({ exam, group, part });
      });
    });
  });

  const filteredTopicParts = allExamsParts.filter(({ exam, group, part }) => {
    const textToMatch = `${exam.academicYear} ${exam.semester} ${group.title} ${part.title} ${part.prompt}`.toLowerCase();
    const matchesSearch = textToMatch.includes(searchTerm.toLowerCase());
    
    if (selectedTopicFilter === "all") return matchesSearch;
    if (selectedTopicFilter === "photoelectric") return matchesSearch && (textToMatch.includes("photoelectric") || textToMatch.includes("stopping potential") || textToMatch.includes("work function"));
    if (selectedTopicFilter === "compton") return matchesSearch && (textToMatch.includes("compton") || textToMatch.includes("scatter"));
    if (selectedTopicFilter === "blackbody") return matchesSearch && (textToMatch.includes("blackbody") || textToMatch.includes("planck") || textToMatch.includes("wien") || textToMatch.includes("rayleigh"));
    if (selectedTopicFilter === "schrodinger") return matchesSearch && (textToMatch.includes("schrodinger") || textToMatch.includes("well") || textToMatch.includes("box") || textToMatch.includes("wave function"));
    if (selectedTopicFilter === "tunneling") return matchesSearch && (textToMatch.includes("tunnel") || textToMatch.includes("barrier"));
    if (selectedTopicFilter === "atomic") return matchesSearch && (textToMatch.includes("bohr") || textToMatch.includes("hydrogen") || textToMatch.includes("quantum number") || textToMatch.includes("orbital") || textToMatch.includes("pauli"));
    if (selectedTopicFilter === "relativity") return matchesSearch && (textToMatch.includes("relativ") || textToMatch.includes("lorentz") || textToMatch.includes("dilation") || textToMatch.includes("contraction") || textToMatch.includes("michelson"));
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header & Navigation Hub */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-semibold mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>MODERN ACADEMY FOR ENGINEERING &amp; TECHNOLOGY</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Official Examination Archive &amp; Interactive Test Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Authentic Physics 3 (ELCn114 / ELCN114) final papers with accredited model answers, marking keys, step-by-step mathematical proofs, and physics diagrams.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all border shadow-sm ${
                showCalculator
                  ? "bg-cyan-500 text-slate-950 border-cyan-400"
                  : "bg-slate-850 hover:bg-slate-800 text-cyan-300 border-cyan-500/40"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>{showCalculator ? "Hide Calculator" : "Scientific Calculator"}</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 mt-5 overflow-x-auto scrollbar-none border-t border-slate-800/80 pt-3 text-xs font-mono">
          <button
            onClick={() => setActiveSection("exams")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-semibold whitespace-nowrap ${
              activeSection === "exams"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-slate-850 text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Official Exam Papers</span>
          </button>

          <button
            onClick={() => setActiveSection("simulation")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-semibold whitespace-nowrap ${
              activeSection === "simulation"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                : "bg-slate-850 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-rose-300" />
            <span>Timed Exam Simulator (120m)</span>
          </button>

          <button
            onClick={() => setActiveSection("topic-browser")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-semibold whitespace-nowrap ${
              activeSection === "topic-browser"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                : "bg-slate-850 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-amber-300" />
            <span>Cross-Year Topic Drill</span>
          </button>

          <button
            onClick={() => setActiveSection("lecture-notes")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-semibold whitespace-nowrap ${
              activeSection === "lecture-notes"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-slate-850 text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lecture Transcripts</span>
          </button>

          <button
            onClick={() => setActiveSection("matrix")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-semibold whitespace-nowrap ${
              activeSection === "matrix"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-slate-850 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Photoelectric vs. Compton</span>
          </button>
        </div>
      </div>

      {/* Embedded Scientific Quantum Calculator */}
      {showCalculator && (
        <div className="animate-in fade-in">
          <ScientificCalculator floating={false} onClose={() => setShowCalculator(false)} />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. OFFICIAL PAPERS VIEW */}
      {/* ========================================================================= */}
      {activeSection === "exams" && (
        <div className="space-y-6">
          {/* Exam Paper Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {OFFICIAL_EXAMS.map((exam) => {
              const isSelected = exam.id === selectedExamId;
              return (
                <button
                  key={exam.id}
                  onClick={() => {
                    setSelectedExamId(exam.id);
                    resetExamSession();
                  }}
                  className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-slate-900 border-indigo-500 shadow-md ring-1 ring-indigo-500 text-white"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 text-[11px] font-mono text-indigo-400 font-bold mb-1">
                      <span>{exam.academicYear} &bull; {exam.semester}</span>
                      <span className="text-slate-500">{exam.examDate}</span>
                    </div>
                    <div className="font-bold text-sm text-slate-100">
                      {exam.subjectCode}: {exam.subjectName}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {exam.specialization} &bull; 4 Questions
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] font-mono text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2">
                    <span className="text-slate-500">Duration: {exam.duration}</span>
                    <span className="text-amber-400 font-bold">{exam.totalPoints} Marks</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Authentic Examination Document Box */}
          {currentExam && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              {/* Paper Header Block */}
              <div className="border-b border-slate-800 pb-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800/60 pb-2 gap-2">
                  <div>Modern Academy For Engineering &amp; Technology in Maadi &bull; Basic Science Dpt.</div>
                  <div className="text-indigo-400 font-semibold">{currentExam.academicYear} ({currentExam.semester} Semester)</div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      Subject: {currentExam.subjectName} ({currentExam.subjectCode})
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                      <span>Spec.: {currentExam.specialization}</span>
                      <span>&bull;</span>
                      <span>Exam Date: {currentExam.examDate}</span>
                      <span>&bull;</span>
                      <span>Time: {currentExam.duration}</span>
                      <span>&bull;</span>
                      <span className="text-amber-400 font-bold">Total: {currentExam.totalPoints} Marks</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveSection("simulation");
                      setIsTimerRunning(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-all shadow-md self-start md:self-auto"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Start 120m Simulation</span>
                  </button>
                </div>

                <div className="text-xs text-slate-400 font-mono flex items-center gap-1 pt-1">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Examiners: {currentExam.examiners.join(", ")}</span>
                </div>
              </div>

              {/* Physical Constants Provided Table */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>PHYSICAL CONSTANTS PROVIDED IN EXAM PAPER:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs font-mono">
                  {currentExam.constantsProvided.map((c, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-center flex items-center justify-center">
                      <MathView math={c} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Groups */}
              <div className="space-y-6 pt-2">
                {currentExam.questions.map((qGroup) => (
                  <div
                    key={qGroup.questionNumber}
                    className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4"
                  >
                    {/* Question Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow">
                          Q{qGroup.questionNumber}
                        </span>
                        <div>
                          <h3 className="font-bold text-sm sm:text-base text-white">
                            {qGroup.title}
                          </h3>
                          {qGroup.competencyCode && (
                            <span className="text-[10px] font-mono text-indigo-400">
                              Competencies: [{qGroup.competencyCode}]
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold">
                        {qGroup.totalPoints} Marks
                      </span>
                    </div>

                    {/* Question Parts */}
                    <div className="space-y-4">
                      {qGroup.parts.map((part) => {
                        const isSolutionRevealed = revealedSolutions[part.id] ?? false;
                        const userChoice = userSelectedOptions[part.id];
                        const isFlagged = flaggedQuestions[part.id] ?? false;

                        return (
                          <div
                            key={part.id}
                            className={`p-4 sm:p-5 rounded-xl border transition-all ${
                              isFlagged
                                ? "bg-amber-950/20 border-amber-500/50"
                                : "bg-slate-900/80 border-slate-800/80 hover:border-slate-700"
                            }`}
                          >
                            {/* Part Header */}
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-mono font-bold">
                                  Part {part.partNumber}
                                </span>
                                <span className="text-xs font-semibold text-slate-200">
                                  {part.title}
                                </span>
                                {part.points && (
                                  <span className="text-[11px] font-mono text-slate-500">
                                    ({part.points} Marks)
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => toggleFlagQuestion(part.id)}
                                  className={`p-1.5 rounded-lg border transition-colors ${
                                    isFlagged
                                      ? "bg-amber-500 text-slate-950 border-amber-400"
                                      : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
                                  }`}
                                  title="Flag question"
                                >
                                  <Flag className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => toggleSolutionReveal(part.id)}
                                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border transition-all ${
                                    isSolutionRevealed
                                      ? "bg-emerald-950 text-emerald-300 border-emerald-600"
                                      : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750"
                                  }`}
                                >
                                  {isSolutionRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                  <span>{isSolutionRevealed ? "Hide Solution" : "Model Solution"}</span>
                                </button>
                              </div>
                            </div>

                            {/* Prompt */}
                            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans pt-1">
                              <MathView math={part.prompt} />
                            </div>

                            {/* Physics Diagram if required */}
                            {part.diagramType && (
                              <ExamPhysicsDiagram type={part.diagramType} />
                            )}

                            {/* MCQ Interactive Options */}
                            {part.options && part.options.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
                                {part.options.map((opt) => {
                                  const isSelected = userChoice === opt.id;
                                  const isCorrect = opt.correct || opt.id === part.correctOption;
                                  
                                  let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";
                                  if (isSolutionRevealed || userChoice) {
                                    if (isCorrect) btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200";
                                    else if (isSelected) btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                                  } else if (isSelected) {
                                    btnStyle = "bg-indigo-950 border-indigo-500 text-indigo-200";
                                  }

                                  return (
                                    <button
                                      key={opt.id}
                                      onClick={() => handleSelectOption(part.id, opt.id)}
                                      className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                                          {opt.id}
                                        </span>
                                        <span>{opt.text}</span>
                                      </div>
                                      {(isSolutionRevealed || userChoice) && isCorrect && (
                                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                      )}
                                      {(isSolutionRevealed || userChoice) && isSelected && !isCorrect && (
                                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {/* Student Scratchpad */}
                            <div className="pt-3">
                              <textarea
                                value={userScratchpad[part.id] || ""}
                                onChange={(e) => setUserScratchpad({ ...userScratchpad, [part.id]: e.target.value })}
                                placeholder="Write step derivations, intermediate substitutions, or notes here..."
                                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none min-h-[55px] resize-y"
                              />
                            </div>

                            {/* Revealed Model Solution Card */}
                            {isSolutionRevealed && (
                              <div className="mt-4 border-t border-slate-800 pt-4 space-y-3 animate-in fade-in">
                                <div className="flex items-center justify-between text-xs font-mono">
                                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                                    <Award className="w-4 h-4" />
                                    PROFESSOR'S ACCREDITED MODEL ANSWER &amp; MARKING SCHEME
                                  </span>
                                </div>

                                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-xs font-mono text-emerald-200">
                                  <span className="font-bold text-emerald-400">FINAL ANSWER: </span>
                                  <MathView math={part.modelAnswer.finalAnswer} />
                                </div>

                                <div className="space-y-2">
                                  {part.modelAnswer.steps.map((step, sIdx) => (
                                    <div key={sIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1 text-xs">
                                      <div className="font-bold font-mono text-indigo-300">
                                        {sIdx + 1}. {step.title}
                                      </div>
                                      {step.math && (
                                        <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-cyan-300 overflow-x-auto">
                                          <MathView math={step.math} />
                                        </div>
                                      )}
                                      <p className="text-slate-300 leading-relaxed font-sans">{step.explanation}</p>
                                    </div>
                                  ))}
                                </div>

                                {part.modelAnswer.rubricPoints && (
                                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-600/30 text-xs font-mono space-y-1">
                                    <div className="text-amber-400 font-bold text-[11px] flex items-center gap-1">
                                      <CheckSquare className="w-3.5 h-3.5" />
                                      MARKING ALLOCATION:
                                    </div>
                                    <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
                                      {part.modelAnswer.rubricPoints.map((r, rIdx) => (
                                        <li key={rIdx}>{r}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
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
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TIMED SIMULATION (120 MINS) */}
      {/* ========================================================================= */}
      {activeSection === "simulation" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-rose-500/40 rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-rose-300 font-bold mb-1">
                <Clock className="w-4 h-4 text-rose-400" />
                <span>EXAM ROOM SIMULATION (120 MINUTES)</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {currentExam.subjectName} ({currentExam.subjectCode})
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xl font-bold text-cyan-300 flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-400" />
                <span>{formatTimer(timerSeconds)}</span>
              </div>

              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`p-2.5 rounded-xl border font-mono text-xs font-bold transition-all ${
                  isTimerRunning
                    ? "bg-amber-600 text-white border-amber-400"
                    : "bg-emerald-600 text-white border-emerald-400"
                }`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={resetExamSession}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Jump Matrix */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>QUESTION JUMP MATRIX ({allCurrentExamParts.length} TOTAL PARTS):</span>
              <span className="text-indigo-400 font-bold">
                Answered: {Object.keys(userSelectedOptions).length + Object.keys(userScratchpad).filter(k => userScratchpad[k].trim()).length} / {allCurrentExamParts.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allCurrentExamParts.map(({ group, part, globalIndex }) => {
                const isActive = globalIndex === simActiveQuestionIndex;
                const isAnswered = !!userSelectedOptions[part.id] || (!!userScratchpad[part.id] && userScratchpad[part.id].trim().length > 0);
                const isFlagged = !!flaggedQuestions[part.id];

                let bgClass = "bg-slate-950 border-slate-800 text-slate-400";
                if (isActive) bgClass = "bg-indigo-600 border-indigo-400 text-white ring-2 ring-indigo-400";
                else if (isFlagged) bgClass = "bg-amber-950/80 border-amber-500 text-amber-300";
                else if (isAnswered) bgClass = "bg-emerald-950/70 border-emerald-500 text-emerald-300";

                return (
                  <button
                    key={part.id}
                    onClick={() => setSimActiveQuestionIndex(globalIndex)}
                    className={`w-9 h-9 rounded-lg border text-xs font-mono font-bold flex items-center justify-center transition-all ${bgClass}`}
                  >
                    <span>{part.partNumber}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question in Simulation */}
          {allCurrentExamParts[simActiveQuestionIndex] && (
            (() => {
              const { group, part, globalIndex } = allCurrentExamParts[simActiveQuestionIndex];
              const isFlagged = !!flaggedQuestions[part.id];
              const isRevealed = !!revealedSolutions[part.id];
              const userChoice = userSelectedOptions[part.id];

              return (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-indigo-600 text-white font-mono text-xs font-bold">
                        Q{group.questionNumber} &bull; Part {part.partNumber}
                      </span>
                      <span className="text-xs font-mono text-slate-400">({part.points || 2.5} Marks)</span>
                    </div>

                    <button
                      onClick={() => toggleFlagQuestion(part.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all ${
                        isFlagged
                          ? "bg-amber-500 text-slate-950 border-amber-400"
                          : "bg-slate-800 border-slate-700 text-slate-300"
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>{isFlagged ? "Flagged" : "Flag for Review"}</span>
                    </button>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white">{part.title}</h3>

                  <div className="text-sm text-slate-200 leading-relaxed font-sans p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <MathView math={part.prompt} />
                  </div>

                  {part.diagramType && (
                    <ExamPhysicsDiagram type={part.diagramType} />
                  )}

                  {/* MCQ Options */}
                  {part.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {part.options.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(part.id, opt.id)}
                          className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center gap-2.5 ${
                            userChoice === opt.id
                              ? "bg-indigo-600/30 border-indigo-500 text-white ring-1 ring-indigo-500"
                              : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850"
                          }`}
                        >
                          <span className="w-6 h-6 rounded bg-slate-800 text-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
                            {opt.id}
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Derivation Scratchpad */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-mono font-bold text-slate-400 block">
                      STUDENT STEP DERIVATION &amp; SCRATCHPAD:
                    </label>
                    <textarea
                      value={userScratchpad[part.id] || ""}
                      onChange={(e) => setUserScratchpad({ ...userScratchpad, [part.id]: e.target.value })}
                      placeholder="Type your derivation steps and intermediate values here..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none min-h-[100px]"
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                      disabled={globalIndex === 0}
                      onClick={() => setSimActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold disabled:opacity-40"
                    >
                      &larr; Previous
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSolutionReveal(part.id)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-600/60 font-mono text-xs font-bold"
                      >
                        {isRevealed ? "Hide Solution" : "Model Answer"}
                      </button>

                      <button
                        disabled={globalIndex === allCurrentExamParts.length - 1}
                        onClick={() => setSimActiveQuestionIndex((prev) => Math.min(allCurrentExamParts.length - 1, prev + 1))}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold disabled:opacity-40"
                      >
                        Next &rarr;
                      </button>
                    </div>
                  </div>

                  {/* Revealed in Simulation */}
                  {isRevealed && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2 animate-in fade-in">
                      <div className="text-xs font-mono font-bold text-emerald-400">
                        MODEL ANSWER: {part.modelAnswer.finalAnswer}
                      </div>
                      <div className="space-y-1.5">
                        {part.modelAnswer.steps.map((st, sI) => (
                          <div key={sI} className="text-xs font-sans text-slate-300">
                            <strong>{st.title}:</strong> {st.explanation}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. CROSS-YEAR TOPIC DRILL */}
      {/* ========================================================================= */}
      {activeSection === "topic-browser" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-white text-base">Curricular Topic Drill</h3>
                <p className="text-xs text-slate-400 font-mono">Filter and practice specific question types across all exam sessions.</p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search keywords in questions..."
                  className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { id: "all", label: "All Questions" },
                { id: "photoelectric", label: "Photoelectric Effect" },
                { id: "compton", label: "Compton Scattering" },
                { id: "blackbody", label: "Blackbody & Planck" },
                { id: "schrodinger", label: "Schrödinger & Wells" },
                { id: "tunneling", label: "Barrier Tunneling" },
                { id: "atomic", label: "Atomic & Bohr" },
                { id: "relativity", label: "Special Relativity" },
              ].map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicFilter(topic.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                    selectedTopicFilter === topic.id
                      ? "bg-amber-500 text-slate-950 font-bold shadow"
                      : "bg-slate-850 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Parts List */}
          <div className="space-y-4">
            <div className="text-xs font-mono text-slate-400">
              Showing <strong className="text-amber-400">{filteredTopicParts.length}</strong> matching questions:
            </div>

            {filteredTopicParts.map(({ exam, group, part }) => {
              const isRevealed = revealedSolutions[part.id] ?? false;

              return (
                <div
                  key={`${exam.id}-${part.id}`}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-mono font-bold">
                        {exam.academicYear} &bull; {exam.semester}
                      </span>
                      <span className="text-xs font-mono text-slate-400">Q{group.questionNumber} ({part.partNumber})</span>
                      <span className="text-xs font-bold text-white">{part.title}</span>
                    </div>

                    <button
                      onClick={() => toggleSolutionReveal(part.id)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-emerald-300 border border-slate-700 font-mono text-xs"
                    >
                      {isRevealed ? "Hide Solution" : "Show Solution"}
                    </button>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    <MathView math={part.prompt} />
                  </div>

                  {part.diagramType && (
                    <ExamPhysicsDiagram type={part.diagramType} />
                  )}

                  {isRevealed && (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2 animate-in fade-in">
                      <div className="text-xs font-mono text-emerald-300 font-bold">
                        MODEL ANSWER: <MathView math={part.modelAnswer.finalAnswer} />
                      </div>
                      <div className="space-y-1.5 pt-1">
                        {part.modelAnswer.steps.map((s, i) => (
                          <div key={i} className="text-xs text-slate-300 font-sans">
                            <span className="font-mono text-indigo-300 font-bold">{s.title}:</span> {s.explanation}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LECTURE TRANSCRIPTS */}
      {/* ========================================================================= */}
      {activeSection === "lecture-notes" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {COURSE_LECTURE_PAGES.map((page) => (
              <button
                key={page.pageNumber}
                onClick={() => setActivePageNumber(page.pageNumber)}
                className={`p-2.5 rounded-xl border text-left font-mono transition-all ${
                  page.pageNumber === activePageNumber
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-md"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] opacity-75">Page {page.pageNumber}</div>
                <div className="text-xs font-bold truncate">{page.title}</div>
              </button>
            ))}
          </div>

          {currentPage && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-indigo-400">
                  CHAPTER: {currentPage.chapter} &bull; PAGE {currentPage.pageNumber}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{currentPage.title}</h3>
              </div>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="font-sans text-slate-200">{currentPage.summaryText}</p>
                </div>

                {currentPage.keyEquations && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-mono font-bold text-cyan-400">KEY EQUATIONS:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentPage.keyEquations.map((eq, eqIdx) => (
                        <div key={eqIdx} className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs">
                          <MathView math={eq.latex} className="text-cyan-300" />
                          <div className="text-[11px] text-slate-400 font-sans mt-0.5">{eq.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentPage.crucialTakeaways && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-600/30 space-y-1.5 text-xs">
                    <div className="text-emerald-400 font-bold font-mono">CRUCIAL EXAM TAKEAWAYS:</div>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      {currentPage.crucialTakeaways.map((t, tIdx) => (
                        <li key={tIdx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. COMPARISON MATRIX */}
      {/* ========================================================================= */}
      {activeSection === "matrix" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white">
              Photoelectric Effect vs. Compton Effect Comparison Matrix
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Comprehensive physical differences according to Modern Academy curriculum.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 font-mono text-indigo-300">
                  <th className="p-3 font-bold">Criterion</th>
                  <th className="p-3 font-bold">Photoelectric Effect</th>
                  <th className="p-3 font-bold">Compton Effect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {PHOTOELECTRIC_VS_COMPTON_TABLE.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-850/50">
                    <td className="p-3 font-mono font-bold text-indigo-400 bg-slate-950/30">
                      {item.criterion}
                    </td>
                    <td className="p-3 leading-relaxed">{item.photoelectric}</td>
                    <td className="p-3 leading-relaxed">{item.compton}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
