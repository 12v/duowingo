import { describe, expect, it } from "vitest";
import { pickDistractors } from "@/lib/quiz/generateDistractors";
import { TEST_BIRDS } from "./fixtures";

function seededRng(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

describe("pickDistractors", () => {
  it("returns the requested number of distractors, excluding the correct bird", () => {
    const correct = TEST_BIRDS.find((b) => b.slug === "robin")!;
    const distractors = pickDistractors(correct, TEST_BIRDS, 3, seededRng(1));

    expect(distractors).toHaveLength(3);
    expect(distractors.every((b) => b.slug !== "robin")).toBe(true);
  });

  it("returns no duplicate birds", () => {
    const correct = TEST_BIRDS.find((b) => b.slug === "robin")!;
    const distractors = pickDistractors(correct, TEST_BIRDS, 3, seededRng(2));
    const slugs = new Set(distractors.map((b) => b.slug));
    expect(slugs.size).toBe(distractors.length);
  });

  it("prefers same-tier birds when enough exist", () => {
    const correct = TEST_BIRDS.find((b) => b.slug === "robin")!;
    const distractors = pickDistractors(correct, TEST_BIRDS, 3, seededRng(3));
    expect(distractors.every((b) => b.tier === "easy")).toBe(true);
  });

  it("backfills from other tiers when the same tier pool is small", () => {
    const small = [
      TEST_BIRDS.find((b) => b.slug === "buzzard")!,
      TEST_BIRDS.find((b) => b.slug === "puffin")!,
      TEST_BIRDS.find((b) => b.slug === "robin")!,
      TEST_BIRDS.find((b) => b.slug === "cuckoo")!,
    ];
    const correct = small.find((b) => b.slug === "buzzard")!;
    const distractors = pickDistractors(correct, small, 3, seededRng(4));

    expect(distractors).toHaveLength(3);
    expect(distractors.some((b) => b.tier !== "hard")).toBe(true);
  });
});
