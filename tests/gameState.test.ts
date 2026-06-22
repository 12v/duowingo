import { describe, expect, it } from "vitest";
import {
  DEFAULT_STATE,
  applyLessonResult,
  bumpStreak,
  isLessonUnlocked,
  loseHeart,
} from "@/lib/storage/gameState";

describe("loseHeart", () => {
  it("clamps at 0 and never goes negative", () => {
    let state = DEFAULT_STATE;
    for (let i = 0; i < 10; i++) {
      state = loseHeart(state);
    }
    expect(state.hearts.current).toBe(0);
  });
});

describe("applyLessonResult", () => {
  it("records a new lesson result and adds XP", () => {
    const result = { completedAtISO: "2026-01-01T00:00:00.000Z", bestAccuracy: 0.8, bestXp: 40, attempts: 1 };
    const state = applyLessonResult(DEFAULT_STATE, "easy", 0, result);

    expect(state.xp).toBe(40);
    expect(state.completedLessons["easy:0"]).toEqual(result);
  });

  it("keeps the best accuracy/XP across repeated attempts instead of regressing", () => {
    const first = applyLessonResult(DEFAULT_STATE, "easy", 0, {
      completedAtISO: "2026-01-01T00:00:00.000Z",
      bestAccuracy: 1,
      bestXp: 50,
      attempts: 1,
    });
    const second = applyLessonResult(first, "easy", 0, {
      completedAtISO: "2026-01-02T00:00:00.000Z",
      bestAccuracy: 0.4,
      bestXp: 20,
      attempts: 1,
    });

    expect(second.completedLessons["easy:0"].bestAccuracy).toBe(1);
    expect(second.completedLessons["easy:0"].bestXp).toBe(50);
    expect(second.completedLessons["easy:0"].attempts).toBe(2);
  });
});

describe("bumpStreak", () => {
  it("starts a streak at 1 on first completion", () => {
    const state = bumpStreak(DEFAULT_STATE, new Date("2026-01-01T10:00:00.000Z"));
    expect(state.streak.count).toBe(1);
  });

  it("increments on a consecutive day", () => {
    const day1 = bumpStreak(DEFAULT_STATE, new Date("2026-01-01T10:00:00.000Z"));
    const day2 = bumpStreak(day1, new Date("2026-01-02T10:00:00.000Z"));
    expect(day2.streak.count).toBe(2);
  });

  it("resets after a gap of more than one day", () => {
    const day1 = bumpStreak(DEFAULT_STATE, new Date("2026-01-01T10:00:00.000Z"));
    const day3 = bumpStreak(day1, new Date("2026-01-03T10:00:00.000Z"));
    expect(day3.streak.count).toBe(1);
  });

  it("does not double-increment on the same day", () => {
    const day1 = bumpStreak(DEFAULT_STATE, new Date("2026-01-01T10:00:00.000Z"));
    const sameDayAgain = bumpStreak(day1, new Date("2026-01-01T20:00:00.000Z"));
    expect(sameDayAgain.streak.count).toBe(1);
  });
});

describe("isLessonUnlocked", () => {
  it("always unlocks the first lesson of the first tier", () => {
    expect(isLessonUnlocked(DEFAULT_STATE, "easy", 0)).toBe(true);
  });

  it("locks the second lesson of a tier until the first is completed", () => {
    expect(isLessonUnlocked(DEFAULT_STATE, "easy", 1)).toBe(false);

    const afterFirst = applyLessonResult(DEFAULT_STATE, "easy", 0, {
      completedAtISO: "2026-01-01T00:00:00.000Z",
      bestAccuracy: 1,
      bestXp: 50,
      attempts: 1,
    });
    expect(isLessonUnlocked(afterFirst, "easy", 1)).toBe(true);
  });
});
