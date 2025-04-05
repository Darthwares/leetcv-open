export interface Question {
  answer: string;
  correctAnswer: string;
  id: string;
  multipleChoices: string[];
  questions: string;
  userAnswer: string;
}

export interface PracticeQuestionSet {
  id: string;
  currentLesson: string;
  courseDetails: object;
  questions: Question[];
  isStarted: boolean;
}

export interface Lesson {
  courseDetails: {};
  currentLesson: string; // Fixed typo
  isStarted: boolean;
  lessonId: number; // Changed from string to number
  isCompleted?: boolean;
  questions: Question[];
  chestOpened?: boolean;
}

export interface Unit {
  unitIndex: number;
  unitId: string; // Changed from number to string
  unitName: string;
  unitDescription: string;
  noOfLessons: number;
  color: string;
  isCompleted: boolean;
  lessons: Lesson[];
}

export interface SectionType {
  title: string;
  progress: number;
  completed: number;
  total: number;
  bgColor: string;
  buttonText?: string;
  description?: string;
  levels?: number;
  image: string;
  isStarted: boolean;
  isExist: boolean;
  isPrevSectionCompleted: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}