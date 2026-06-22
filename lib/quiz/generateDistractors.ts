import type { Bird, TierId } from "@/types";

const TIER_DISTANCE: Record<TierId, Record<TierId, number>> = {
  easy: { easy: 0, medium: 1, hard: 2 },
  medium: { easy: 1, medium: 0, hard: 1 },
  hard: { easy: 2, medium: 1, hard: 0 },
};

function shuffle<T>(items: T[], rng: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function pickDistractors(
  correct: Bird,
  allBirds: Bird[],
  count = 3,
  rng: () => number = Math.random,
): Bird[] {
  const candidates = allBirds.filter((b) => b.slug !== correct.slug);

  const sameTier = shuffle(candidates.filter((b) => b.tier === correct.tier), rng);
  const otherTier = shuffle(candidates.filter((b) => b.tier !== correct.tier), rng);
  otherTier.sort(
    (a, b) => TIER_DISTANCE[correct.tier][a.tier] - TIER_DISTANCE[correct.tier][b.tier],
  );

  const picked: Bird[] = [];
  for (const bird of [...sameTier, ...otherTier]) {
    if (picked.length >= count) break;
    picked.push(bird);
  }

  return picked;
}

export function shuffleOptions<T>(items: T[], rng: () => number = Math.random): T[] {
  return shuffle(items, rng);
}
