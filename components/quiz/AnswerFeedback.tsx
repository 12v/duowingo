import type { Bird } from "@/types";

export function AnswerFeedback({ correct, bird }: { correct: boolean; bird: Bird }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white ${
          correct ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {correct ? "✓" : "✕"}
      </div>
      <div>
        <p className={`font-bold ${correct ? "text-green-700" : "text-red-700"}`}>
          {correct ? "Correct!" : "Not quite"}
        </p>
        {!correct && (
          <p className="text-sm text-gray-600">
            It was the <span className="font-semibold">{bird.commonName}</span>
          </p>
        )}
      </div>
    </div>
  );
}
