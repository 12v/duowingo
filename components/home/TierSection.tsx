import type { GameState, Lesson, TierId } from "@/types";
import { TIER_META } from "@/lib/data/tiers";
import { isLessonUnlocked } from "@/lib/storage/gameState";
import { LessonNode } from "./LessonNode";

export function TierSection({
  tierId,
  lessons,
  gameState,
}: {
  tierId: TierId;
  lessons: Lesson[];
  gameState: GameState;
}) {
  const meta = TIER_META[tierId];
  const tierUnlocked = lessons.length > 0 && isLessonUnlocked(gameState, tierId, 0);

  return (
    <section className="mb-10">
      <div className="mb-4 text-center">
        <h2 className="text-lg font-bold text-gray-800">{meta.label}</h2>
        <p className="text-sm text-gray-400">
          {tierUnlocked ? meta.subtitle : "Complete the previous tier to unlock"}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {lessons.map((lesson, i) => {
          const completed = Boolean(gameState.completedLessons[`${tierId}:${lesson.index}`]);
          const unlocked = isLessonUnlocked(gameState, tierId, lesson.index);
          const status = completed ? "completed" : unlocked ? "available" : "locked";
          return <LessonNode key={lesson.id} lesson={lesson} status={status} positionInTier={i} />;
        })}
      </div>
    </section>
  );
}
