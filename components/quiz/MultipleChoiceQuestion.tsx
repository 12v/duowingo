"use client";

import type { Bird } from "@/types";

interface MultipleChoiceQuestionProps {
  options: Bird[];
  selected: Bird | null;
  correctBird: Bird;
  revealed: boolean;
  onSelect: (bird: Bird) => void;
}

export function MultipleChoiceQuestion({
  options,
  selected,
  correctBird,
  revealed,
  onSelect,
}: MultipleChoiceQuestionProps) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((bird) => {
        const isSelected = selected?.slug === bird.slug;
        const isCorrectOption = bird.slug === correctBird.slug;

        let stateClasses = "border-gray-200 bg-white active:bg-gray-50";
        if (revealed && isCorrectOption) {
          stateClasses = "border-green-500 bg-green-50 text-green-700";
        } else if (revealed && isSelected && !isCorrectOption) {
          stateClasses = "border-red-500 bg-red-50 text-red-700";
        } else if (isSelected) {
          stateClasses = "border-blue-400 bg-blue-50";
        }

        return (
          <button
            key={bird.slug}
            type="button"
            disabled={revealed}
            onClick={() => onSelect(bird)}
            className={`h-14 w-full rounded-2xl border-2 px-4 text-left text-base font-semibold transition-colors disabled:cursor-not-allowed ${stateClasses}`}
          >
            {bird.commonName}
          </button>
        );
      })}
    </div>
  );
}
