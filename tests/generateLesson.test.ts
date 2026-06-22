import { describe, expect, it } from "vitest";
import { generateLesson } from "@/lib/quiz/generateLesson";
import { TEST_BIRDS } from "./fixtures";

function seededRng(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

describe("generateLesson", () => {
  const lessonBirds = TEST_BIRDS.slice(0, 5);

  it("produces one question per lesson bird", () => {
    const questions = generateLesson("easy", 0, lessonBirds, TEST_BIRDS, seededRng(1));
    expect(questions).toHaveLength(lessonBirds.length);
  });

  it("gives every multiple-choice question exactly 4 options including the correct bird", () => {
    const questions = generateLesson("easy", 0, lessonBirds, TEST_BIRDS, seededRng(2));
    for (const q of questions) {
      if (q.type === "multiple-choice") {
        expect(q.options).toHaveLength(4);
        expect(q.options?.filter((b) => b.slug === q.bird.slug)).toHaveLength(1);
      }
    }
  });

  it("leaves options undefined for free-text questions", () => {
    const questions = generateLesson("easy", 0, lessonBirds, TEST_BIRDS, seededRng(3));
    for (const q of questions) {
      if (q.type === "free-text") {
        expect(q.options).toBeUndefined();
      }
    }
  });

  it("is reproducible given the same seeded rng", () => {
    const a = generateLesson("easy", 0, lessonBirds, TEST_BIRDS, seededRng(42));
    const b = generateLesson("easy", 0, lessonBirds, TEST_BIRDS, seededRng(42));
    expect(a.map((q) => q.bird.slug)).toEqual(b.map((q) => q.bird.slug));
    expect(a.map((q) => q.type)).toEqual(b.map((q) => q.type));
  });
});
