"use client";

import { useMemo } from "react";
import Fuse from "fuse.js";
import type { Bird } from "@/types";

interface FreeTextQuestionProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  allBirds: Bird[];
  disabled: boolean;
}

export function FreeTextQuestion({ value, onChange, onSubmit, allBirds, disabled }: FreeTextQuestionProps) {
  const fuse = useMemo(
    () => new Fuse(allBirds, { keys: ["commonName"], threshold: 0.4 }),
    [allBirds],
  );

  const suggestions = useMemo(() => {
    if (value.trim().length < 2) return [];
    return fuse.search(value).slice(0, 3).map((r) => r.item);
  }, [fuse, value]);

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="words"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disabled) onSubmit();
        }}
        placeholder="Type the bird's name…"
        className="h-14 w-full rounded-2xl border-2 border-gray-200 px-4 text-base focus:border-blue-400 focus:outline-none disabled:bg-gray-50"
        style={{ fontSize: "16px" }}
      />
      {suggestions.length > 0 && !disabled && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((bird) => (
            <button
              key={bird.slug}
              type="button"
              onClick={() => onChange(bird.commonName)}
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-600 active:bg-gray-100"
            >
              {bird.commonName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
