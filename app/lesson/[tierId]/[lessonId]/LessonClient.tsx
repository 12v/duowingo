"use client";

import { useRouter } from "next/navigation";
import type { Bird, TierId } from "@/types";
import { QuizEngine } from "@/components/quiz/QuizEngine";

export function LessonClient({
  tierId,
  lessonIndex,
  lessonBirds,
  allBirds,
}: {
  tierId: TierId;
  lessonIndex: number;
  lessonBirds: Bird[];
  allBirds: Bird[];
}) {
  const router = useRouter();

  return (
    <QuizEngine
      tierId={tierId}
      lessonIndex={lessonIndex}
      lessonBirds={lessonBirds}
      allBirds={allBirds}
      onExit={() => router.push("/")}
    />
  );
}
