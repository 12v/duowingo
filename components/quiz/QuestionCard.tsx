import type { ReactNode } from "react";
import type { Question } from "@/types";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { ProgressBar } from "@/components/progress/ProgressBar";
import { HeartsIndicator } from "@/components/progress/HeartsIndicator";

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  hearts: { current: number; max: number };
  children: ReactNode;
}

export function QuestionCard({ question, questionIndex, totalQuestions, hearts, children }: QuestionCardProps) {
  return (
    <div className="flex min-h-dvh flex-col px-4 pb-32 pt-6">
      <div className="mx-auto flex w-full max-w-md items-center gap-4">
        <ProgressBar current={questionIndex} total={totalQuestions} />
        <HeartsIndicator current={hearts.current} max={hearts.max} />
      </div>
      <div className="mx-auto w-full max-w-md flex-1">
        <AudioPlayer key={question.id} recording={question.recording} />
        <p className="mb-4 text-center text-lg font-bold text-gray-800">Which bird is this?</p>
        {children}
      </div>
    </div>
  );
}
