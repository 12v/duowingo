import Link from "next/link";
import type { Lesson } from "@/types";

export type LessonNodeStatus = "locked" | "available" | "completed";

const OFFSETS = ["translate-x-0", "translate-x-10", "translate-x-0", "-translate-x-10"];

export function LessonNode({
  lesson,
  status,
  positionInTier,
}: {
  lesson: Lesson;
  status: LessonNodeStatus;
  positionInTier: number;
}) {
  const offset = OFFSETS[positionInTier % OFFSETS.length];

  const content = (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold shadow-md transition-transform ${offset} ${
        status === "completed"
          ? "bg-green-500 text-white"
          : status === "available"
            ? "bg-blue-500 text-white active:scale-95"
            : "bg-gray-200 text-gray-400"
      }`}
    >
      {status === "completed" ? "✓" : status === "locked" ? "🔒" : positionInTier + 1}
    </div>
  );

  if (status === "locked") {
    return <div className="flex justify-center">{content}</div>;
  }

  return (
    <Link href={`/lesson/${lesson.tierId}/${lesson.index}`} className="flex justify-center">
      {content}
    </Link>
  );
}
