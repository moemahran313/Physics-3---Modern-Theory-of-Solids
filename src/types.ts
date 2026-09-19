export type ChapterId = "ch1" | "ch2" | "ch3" | "ch4";

export type NavMode = 
  | "sheet-1"
  | "sheet-2"
  | "sheet-3"
  | "sheet-4"
  | "cramming-arena"
  | "flashcards"
  | "videos"
  | "global-equations"
  | "mnemonics"
  | "sandboxes"
  | "terminal"
  | "official-docs"
  | "curriculum"
  | "derivations"
  | "exam-trainer"
  | "lab-analyzer"
  | "overview";

export interface MasterclassProblem {
  id: string;
  problemNumber: number | string;
  title: string;
  statement: string;
  givenParameters: string[];
  requiredAnswers: string[];
  officialSolution: {
    governingFormula: string;
    calculationSteps: Array<{
      step: string;
      latex: string;
      note?: string;
    }>;
    finalValue: string;
    units: string;
  };
  pitfallWarning?: string;
}

export interface MasterclassTheoryItem {
  id: string;
  title: string;
  proofOrDerivation?: string;
  statement: string;
  diagramDescription?: string;
  keyFormulas: string[];
  takeaway: string;
}

export interface MasterclassSheet {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  instructor: string;
  theoryParts: MasterclassTheoryItem[];
  solvedProblems: MasterclassProblem[];
}

export interface VideoLectureItem {
  id: string;
  lectureNumber: number;
  title: string;
  chapter: string;
  instructor: string;
  youtubeId: string;
  url: string;
  description: string;
  duration?: string;
  topicsCovered: string[];
}

export interface CrammingMockQuestion {
  id: string;
  sheetId: string;
  questionNumber: number;
  prompt: string;
  numericalAnswer: number;
  tolerance: number; // e.g. 0.05 for 5%
  units: string;
  answerLatex: string;
  explanation: string;
  roundingWarningTips?: string;
  steps: Array<{ step: string; latex: string }>;
}

export interface CrammingMockExam {
  id: string;
  examNumber: number;
  title: string;
  description: string;
  timeMinutes: number;
  questions: CrammingMockQuestion[];
}

export interface GlobalFormulaItem {
  id: string;
  chapterId: ChapterId;
  name: string;
  latex: string;
  variables: string;
  typicalUnits: string;
  notes: string;
}

export interface PhysicalConstant {
  symbol: string;
  latex: string;
  name: string;
  valueSI: string;
  valueAtomic?: string;
  units: string;
  notes: string;
}

export interface DualTrackTopic {
  id: string;
  chapterId: ChapterId;
  chapterTitle: string;
  title: string;
  subtitle: string;
  classicalAxiom: string;
  breakdownPoint: string;
  quantumPostulate: string;
  mathTrack: {
    title: string;
    description: string;
    equations: Array<{
      label: string;
      latex: string;
      annotation: string;
    }>;
    derivationSteps: Array<{
      stepNumber: number;
      title: string;
      math: string;
      explanation: string;
      boundaryOrLimit?: string;
    }>;
  };
  mentalModelTrack: {
    title: string;
    analogy: string;
    physicalIntuition: string;
    keyMechanics: string[];
    boundaryLimits: Array<{
      condition: string;
      mathBehavior: string;
      physicalInterpretation: string;
    }>;
  };
  examTraps: string[];
}

export interface ExamQuestion {
  id: string;
  chapterId: ChapterId;
  type: "Type A (Two-Part MCQ)" | "Type B (Formal Derivation)" | "Type C (Boundary Probability)" | "Type D (Relativistic Transformation)";
  title: string;
  promptLatex: string;
  options?: Array<{
    id: string;
    text: string;
  }>;
  correctOption?: string;
  solutionTrack: {
    startingAxiom: string;
    stepByStepDerivation: Array<{
      step: string;
      mathLatex: string;
      rationale: string;
    }>;
    finalAnswer: string;
    physicalJustification: string;
    commonTraps: string[];
  };
}

export interface LabExperiment {
  id: string;
  name: string;
  chapterId: ChapterId;
  objective: string;
  classicalExpectation: string;
  experimentalObservation: string;
  quantumOrRelativisticExplanation: string;
  apparatusComponents: Array<{
    name: string;
    role: string;
  }>;
  governingEquations: Array<{
    latex: string;
    variables: string;
  }>;
  pitfallsAndTroubleshooting: string[];
}

export interface MnemonicCard {
  id: string;
  chapterId: ChapterId;
  concept: string;
  mnemonicPhrase: string;
  explanation: string;
  visualAnchor: string;
  rules: string[];
}

export interface Flashcard {
  id: string;
  chapterId: ChapterId;
  front: {
    concept: string;
    prompt: string;
    latexSnippet?: string;
  };
  back: {
    definition: string;
    governingEquation: string;
    physicalLimit: string;
    siUnits: string;
    examWarning: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: "user" | "engine" | "system";
  timestamp: string;
  content: string;
  commandTrigger?: string;
}
