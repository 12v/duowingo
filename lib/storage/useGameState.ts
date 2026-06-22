"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { GameState, LessonResult, TierId } from "@/types";
import {
  DEFAULT_STATE,
  applyLessonResult,
  bumpStreak,
  loadState,
  loseHeart as loseHeartPure,
  refillHeartsIfDue,
  saveState,
} from "./gameState";

const listeners = new Set<() => void>();
let cachedState: GameState | null = null;

function getSnapshot(): GameState {
  if (cachedState === null) {
    cachedState = refillHeartsIfDue(loadState(), new Date());
  }
  return cachedState;
}

function getServerSnapshot(): GameState {
  return DEFAULT_STATE;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setState(next: GameState) {
  cachedState = next;
  saveState(next);
  listeners.forEach((listener) => listener());
}

export function useGameState() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);

  const update = useCallback((updater: (prev: GameState) => GameState) => {
    setState(updater(getSnapshot()));
  }, []);

  const recordLessonComplete = useCallback(
    (tierId: TierId, lessonIndex: number, result: LessonResult) => {
      update((prev) => bumpStreak(applyLessonResult(prev, tierId, lessonIndex, result), new Date()));
    },
    [update],
  );

  const loseHeart = useCallback(() => {
    update((prev) => loseHeartPure(prev));
  }, [update]);

  const resetProgress = useCallback(() => {
    update(() => DEFAULT_STATE);
  }, [update]);

  return { state, hydrated, recordLessonComplete, loseHeart, resetProgress };
}
