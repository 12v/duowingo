import { notFound } from "next/navigation";
import type { TierId } from "@/types";
import { TIER_ORDER, getLesson } from "@/lib/data/tiers";
import { getAllBirds } from "@/lib/data/birds";
import { LessonClient } from "./LessonClient";

function isTierId(value: string): value is TierId {
  return (TIER_ORDER as string[]).includes(value);
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ tierId: string; lessonId: string }>;
}) {
  const { tierId, lessonId } = await params;

  if (!isTierId(tierId)) notFound();

  const lessonIndex = Number(lessonId);
  if (!Number.isInteger(lessonIndex) || lessonIndex < 0) notFound();

  const lesson = getLesson(tierId, lessonIndex);
  if (!lesson || lesson.birds.length === 0) notFound();

  const playableBirds = lesson.birds.filter((bird) => bird.recordings.length > 0);
  if (playableBirds.length === 0) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="text-lg font-semibold text-gray-800">Recordings coming soon</p>
        <p className="text-sm text-gray-500">This lesson doesn&apos;t have any audio yet — check back later.</p>
      </div>
    );
  }

  return <LessonClient tierId={tierId} lessonIndex={lessonIndex} lessonBirds={playableBirds} allBirds={getAllBirds()} />;
}
