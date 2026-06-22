import type { Bird, Lesson, TierId } from "@/types";
import { getAllBirds } from "./birds";

export const SPECIES_PER_LESSON = 5;

export const TIER_ORDER: TierId[] = ["easy", "medium", "hard"];

export const TIER_META: Record<TierId, { label: string; subtitle: string }> = {
  easy: { label: "Garden Birds", subtitle: "Common visitors to UK gardens and parks" },
  medium: { label: "Woodland & Water Birds", subtitle: "Birds you'll meet on a walk" },
  hard: { label: "Raptors & Seabirds", subtitle: "Trickier calls and scarcer species" },
};

export function getTierBirds(tierId: TierId): Bird[] {
  return getAllBirds().filter((b) => b.tier === tierId);
}

export function getLessonsForTier(tierId: TierId): Lesson[] {
  const birds = getTierBirds(tierId);
  const lessons: Lesson[] = [];
  for (let i = 0; i < birds.length; i += SPECIES_PER_LESSON) {
    const index = lessons.length;
    lessons.push({
      tierId,
      index,
      id: `${tierId}-${index}`,
      birds: birds.slice(i, i + SPECIES_PER_LESSON),
    });
  }
  return lessons;
}

export function getLesson(tierId: TierId, lessonIndex: number): Lesson | undefined {
  return getLessonsForTier(tierId)[lessonIndex];
}

export function getAllLessons(): Lesson[] {
  return TIER_ORDER.flatMap((tierId) => getLessonsForTier(tierId));
}
