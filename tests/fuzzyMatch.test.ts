import { describe, expect, it } from "vitest";
import { isCorrectAnswer, isLengthPlausible, normalizeAnswer } from "@/lib/quiz/fuzzyMatch";

describe("normalizeAnswer", () => {
  it("lowercases, trims, and strips punctuation", () => {
    expect(normalizeAnswer("  The Robin!  ")).toBe("robin");
  });
});

describe("isLengthPlausible", () => {
  it("rejects inputs much shorter than the target", () => {
    expect(isLengthPlausible("r", "robin")).toBe(false);
  });

  it("accepts inputs of comparable length", () => {
    expect(isLengthPlausible("robn", "robin")).toBe(true);
  });
});

describe("isCorrectAnswer", () => {
  const accepted = ["Eurasian Blackcap", "Blackcap"];

  it("matches an exact answer regardless of case", () => {
    expect(isCorrectAnswer("eurasian blackcap", accepted)).toBe(true);
  });

  it("matches a curated alias", () => {
    expect(isCorrectAnswer("blackcap", accepted)).toBe(true);
  });

  it("tolerates a small typo", () => {
    expect(isCorrectAnswer("blackcaap", accepted)).toBe(true);
  });

  it("rejects an unrelated species", () => {
    expect(isCorrectAnswer("house sparrow", accepted)).toBe(false);
  });

  it("rejects empty input", () => {
    expect(isCorrectAnswer("   ", accepted)).toBe(false);
  });

  it("rejects a too-short false positive", () => {
    expect(isCorrectAnswer("b", ["Robin"])).toBe(false);
  });
});
