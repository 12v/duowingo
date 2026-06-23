import type { GameState } from "@/types";
import { TIER_ORDER, getLessonsForTier } from "@/lib/data/tiers";
import { TierSection } from "./TierSection";

export function LessonPath({ gameState }: { gameState: GameState }) {
  return (
    <div className="mx-auto w-full max-w-md px-4">
      {TIER_ORDER.map((tierId) => (
        <TierSection key={tierId} tierId={tierId} lessons={getLessonsForTier(tierId)} gameState={gameState} />
      ))}
    </div>
  );
}
