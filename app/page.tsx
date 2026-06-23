"use client";

import Link from "next/link";
import { useGameState } from "@/lib/storage/useGameState";
import { LessonPath } from "@/components/home/LessonPath";
import { HeartsIndicator } from "@/components/progress/HeartsIndicator";

export default function Home() {
  const { state, hydrated } = useGameState();

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="safe-top flex items-center justify-between px-4 py-4">
        <div>
          <p className="text-xl font-bold text-gray-800">🐦 Duowingo</p>
          <p className="text-xs text-gray-400">Learn UK birds by their sound</p>
        </div>
        {hydrated && (
          <div className="flex items-center gap-3 text-sm">
            <span className="font-bold text-amber-500">{state.xp} XP</span>
            <span className="font-bold text-orange-500">🔥 {state.streak.count}</span>
            <HeartsIndicator current={state.hearts.current} max={state.hearts.max} />
          </div>
        )}
      </header>

      <div className="flex-1 py-4">{hydrated && <LessonPath gameState={state} />}</div>

      <footer className="pb-8 text-center">
        <Link href="/about" className="text-sm text-gray-400 underline">
          About &amp; credits
        </Link>
      </footer>
    </main>
  );
}
