export type TierId = "easy" | "medium" | "hard";

export type QuestionType = "multiple-choice" | "free-text";

export interface Recording {
  id: string;
  file: string;
  recordist: string;
  licenseCode: string;
  licenseUrl: string;
  quality: string;
  lengthSeconds: number | null;
  type: string;
}

export interface Bird {
  slug: string;
  commonName: string;
  scientificName: string;
  tier: TierId;
  aliases: string[];
  recordings: Recording[];
}

export interface Question {
  id: string;
  bird: Bird;
  recording: Recording;
  type: QuestionType;
  options?: Bird[];
}

export interface LessonResult {
  completedAtISO: string;
  bestAccuracy: number;
  bestXp: number;
  attempts: number;
}

export interface StreakState {
  count: number;
  lastCompletedDateISO: string | null;
}

export interface HeartsState {
  current: number;
  max: number;
  lastRefillISO: string | null;
}

export interface GameState {
  version: 1;
  xp: number;
  streak: StreakState;
  hearts: HeartsState;
  completedLessons: Record<string, LessonResult>;
}

export interface Lesson {
  tierId: TierId;
  index: number;
  id: string;
  birds: Bird[];
}
