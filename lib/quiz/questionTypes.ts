import type { QuestionType } from "@/types";

export function pickQuestionType(rng: () => number = Math.random): QuestionType {
  return rng() < 0.5 ? "multiple-choice" : "free-text";
}
