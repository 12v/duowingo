import { Button } from "@/components/ui/Button";

interface LessonSummaryProps {
  correctCount: number;
  totalQuestions: number;
  xpEarned: number;
  outOfHearts: boolean;
  onContinue: () => void;
}

export function LessonSummary({
  correctCount,
  totalQuestions,
  xpEarned,
  outOfHearts,
  onContinue,
}: LessonSummaryProps) {
  const accuracyPercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl">{outOfHearts ? "💔" : "🎉"}</div>
      <h1 className="mt-4 text-2xl font-bold text-gray-800">
        {outOfHearts ? "Out of hearts!" : "Lesson complete!"}
      </h1>
      <p className="mt-2 text-gray-500">
        {correctCount}/{totalQuestions} correct &middot; {accuracyPercent}% accuracy
      </p>
      <p className="mt-1 text-lg font-bold text-amber-500">+{xpEarned} XP</p>
      <div className="mt-8 w-full max-w-xs">
        <Button onClick={onContinue}>Continue</Button>
      </div>
    </div>
  );
}
