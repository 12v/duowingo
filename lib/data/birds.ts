import type { Bird } from "@/types";
import birdsData from "@/data/birds.json";

export function getAllBirds(): Bird[] {
  return birdsData as Bird[];
}

export function getBirdsWithRecordings(): Bird[] {
  return getAllBirds().filter((b) => b.recordings.length > 0);
}

export function getBirdBySlug(slug: string): Bird | undefined {
  return getAllBirds().find((b) => b.slug === slug);
}
