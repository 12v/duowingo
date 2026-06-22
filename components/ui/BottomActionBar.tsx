import type { ReactNode } from "react";

interface BottomActionBarProps {
  children: ReactNode;
  tone?: "neutral" | "correct" | "incorrect";
}

const TONE_CLASSES: Record<NonNullable<BottomActionBarProps["tone"]>, string> = {
  neutral: "bg-white border-t border-gray-200",
  correct: "bg-green-50 border-t border-green-200",
  incorrect: "bg-red-50 border-t border-red-200",
};

export function BottomActionBar({ children, tone = "neutral" }: BottomActionBarProps) {
  return (
    <div
      className={`safe-bottom fixed inset-x-0 bottom-0 z-10 px-4 pt-3 ${TONE_CLASSES[tone]}`}
    >
      <div className="mx-auto max-w-md pb-3">{children}</div>
    </div>
  );
}
