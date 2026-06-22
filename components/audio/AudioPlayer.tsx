"use client";

import type { Recording } from "@/types";
import { Attribution } from "@/components/ui/Attribution";
import { useAudioPlayer } from "./useAudioPlayer";

export function AudioPlayer({ recording }: { recording: Recording }) {
  const { isPlaying, isLoading, error, play, replay } = useAudioPlayer(recording.file);

  return (
    <div className="flex flex-col items-center py-6">
      <button
        type="button"
        onClick={isPlaying ? replay : play}
        aria-label={isPlaying ? "Replay sound" : "Play sound"}
        disabled={isLoading && !error}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform active:scale-95 disabled:bg-gray-300"
      >
        {isPlaying ? <ReplayIcon /> : <PlayIcon />}
      </button>
      {error ? (
        <p className="mt-2 text-sm text-red-500">Couldn&apos;t load this clip — try replay.</p>
      ) : (
        <p className="mt-2 text-sm text-gray-500">{isPlaying ? "Playing…" : "Tap to play"}</p>
      )}
      <Attribution recording={recording} />
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9">
      <path d="M12 5V2L7 7l5 5V9c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5H5c0 3.87 3.13 7 7 7s7-3.13 7-7-3.13-7-7-7z" />
    </svg>
  );
}
