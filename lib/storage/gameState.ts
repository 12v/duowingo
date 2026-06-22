import type { GameState, LessonResult, TierId } from "@/types";
import { SPECIES_PER_LESSON, TIER_ORDER, getLessonsForTier } from "@/lib/data/tiers";

export const STORAGE_KEY = "duowingo:gameState:v1";

const MAX_HEARTS = 5;
const HEART_REFILL_INTERVAL_MS = 4 * 60 * 60 * 1000;

export const DEFAULT_STATE: GameState = {
  version: 1,
  xp: 0,
  streak: { count: 0, lastCompletedDateISO: null },
  hearts: { current: MAX_HEARTS, max: MAX_HEARTS, lastRefillISO: null },
  completedLessons: {},
};

function lessonKey(tierId: TierId, lessonIndex: number): string {
  return `${tierId}:${lessonIndex}`;
}

function toLocalDateISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function loadState(): GameState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as GameState;
    if (parsed.version !== 1) return DEFAULT_STATE;
    return parsed;
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: GameState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable (e.g. Safari private mode) — degrade to in-memory only.
  }
}

export function applyLessonResult(
  state: GameState,
  tierId: TierId,
  lessonIndex: number,
  result: LessonResult,
): GameState {
  const key = lessonKey(tierId, lessonIndex);
  const existing = state.completedLessons[key];
  const merged: LessonResult = existing
    ? {
        completedAtISO: result.completedAtISO,
        bestAccuracy: Math.max(existing.bestAccuracy, result.bestAccuracy),
        bestXp: Math.max(existing.bestXp, result.bestXp),
        attempts: existing.attempts + 1,
      }
    : { ...result, attempts: 1 };

  return {
    ...state,
    xp: state.xp + result.bestXp,
    completedLessons: { ...state.completedLessons, [key]: merged },
  };
}

export function loseHeart(state: GameState): GameState {
  return {
    ...state,
    hearts: { ...state.hearts, current: Math.max(0, state.hearts.current - 1) },
  };
}

export function refillHeartsIfDue(state: GameState, now: Date): GameState {
  if (state.hearts.current >= state.hearts.max) return state;
  if (!state.hearts.lastRefillISO) {
    return { ...state, hearts: { ...state.hearts, lastRefillISO: now.toISOString() } };
  }

  const elapsed = now.getTime() - new Date(state.hearts.lastRefillISO).getTime();
  const heartsToAdd = Math.floor(elapsed / HEART_REFILL_INTERVAL_MS);
  if (heartsToAdd <= 0) return state;

  return {
    ...state,
    hearts: {
      ...state.hearts,
      current: Math.min(state.hearts.max, state.hearts.current + heartsToAdd),
      lastRefillISO: now.toISOString(),
    },
  };
}

export function bumpStreak(state: GameState, now: Date): GameState {
  const today = toLocalDateISO(now);
  if (state.streak.lastCompletedDateISO === today) return state;

  if (!state.streak.lastCompletedDateISO) {
    return { ...state, streak: { count: 1, lastCompletedDateISO: today } };
  }

  const yesterday = toLocalDateISO(new Date(now.getTime() - 24 * 60 * 60 * 1000));
  const isConsecutive = state.streak.lastCompletedDateISO === yesterday;

  return {
    ...state,
    streak: {
      count: isConsecutive ? state.streak.count + 1 : 1,
      lastCompletedDateISO: today,
    },
  };
}

export function isLessonUnlocked(state: GameState, tierId: TierId, lessonIndex: number): boolean {
  if (lessonIndex > 0) {
    return Boolean(state.completedLessons[lessonKey(tierId, lessonIndex - 1)]);
  }

  const tierPosition = TIER_ORDER.indexOf(tierId);
  if (tierPosition === 0) return true;

  const previousTier = TIER_ORDER[tierPosition - 1];
  const previousTierLessons = getLessonsForTier(previousTier);
  return previousTierLessons.every((lesson) =>
    Boolean(state.completedLessons[lessonKey(previousTier, lesson.index)]),
  );
}

export { SPECIES_PER_LESSON };
