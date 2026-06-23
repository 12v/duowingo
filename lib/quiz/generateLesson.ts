import type { Bird, Question, TierId } from "@/types";
import { pickDistractors, shuffleOptions } from "./generateDistractors";
import { pickQuestionType } from "./questionTypes";

export function generateLesson(
  tierId: TierId,
  lessonIndex: number,
  lessonBirds: Bird[],
  allBirds: Bird[],
  rng: () => number = Math.random,
): Question[] {
  const questions: Question[] = lessonBirds.map((bird, i) => {
    const recording = bird.recordings[Math.floor(rng() * bird.recordings.length)];
    const type = pickQuestionType(rng);

    const question: Question = {
      id: `${tierId}-${lessonIndex}-${bird.slug}-${i}`,
      bird,
      recording,
      type,
    };

    if (type === "multiple-choice") {
      const distractors = pickDistractors(bird, allBirds, 3, rng);
      question.options = shuffleOptions([bird, ...distractors], rng);
    }

    return question;
  });

  return shuffleOptions(questions, rng);
}
