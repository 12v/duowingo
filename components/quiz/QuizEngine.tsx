"use client";

import { useState } from "react";
import type { Bird, TierId } from "@/types";
import { generateLesson } from "@/lib/quiz/generateLesson";
import { isCorrectAnswer } from "@/lib/quiz/fuzzyMatch";
import { useGameState } from "@/lib/storage/useGameState";
import { QuestionCard } from "./QuestionCard";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { FreeTextQuestion } from "./FreeTextQuestion";
import { AnswerFeedback } from "./AnswerFeedback";
import { BottomActionBar } from "@/components/ui/BottomActionBar";
import { Button } from "@/components/ui/Button";
import { LessonSummary } from "@/components/summary/LessonSummary";

const XP_PER_CORRECT = 10;

interface QuizEngineProps {
  tierId: TierId;
  lessonIndex: number;
  lessonBirds: Bird[];
  allBirds: Bird[];
  onExit: () => void;
}

type Phase = "answering" | "feedback" | "summary";

export function QuizEngine({ tierId, lessonIndex, lessonBirds, allBirds, onExit }: QuizEngineProps) {
  const { state, hydrated, recordLessonComplete, loseHeart } = useGameState();
  const [questions] = useState(() => generateLesson(tierId, lessonIndex, lessonBirds, allBirds));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("answering");
  const [selectedBird, setSelectedBird] = useState<Bird | null>(null);
  const [freeTextValue, setFreeTextValue] = useState("");
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [recordedComplete, setRecordedComplete] = useState(false);

  if (!hydrated) {
    return <div className="flex min-h-dvh items-center justify-center text-gray-400">Loading…</div>;
  }

  const question = questions[questionIndex];
  const isOutOfHearts = state.hearts.current === 0;

  if (phase === "summary" || isOutOfHearts) {
    const accuracy = questions.length > 0 ? correctCount / questions.length : 0;
    const xpEarned = correctCount * XP_PER_CORRECT;

    if (!recordedComplete) {
      recordLessonComplete(tierId, lessonIndex, {
        completedAtISO: new Date().toISOString(),
        bestAccuracy: accuracy,
        bestXp: xpEarned,
        attempts: 1,
      });
      setRecordedComplete(true);
    }

    return (
      <LessonSummary
        correctCount={correctCount}
        totalQuestions={questions.length}
        xpEarned={xpEarned}
        outOfHearts={isOutOfHearts}
        onContinue={onExit}
      />
    );
  }

  function checkAnswer() {
    if (!question) return;
    const correct =
      question.type === "multiple-choice"
        ? selectedBird?.slug === question.bird.slug
        : isCorrectAnswer(freeTextValue, [question.bird.commonName, ...question.bird.aliases]);

    setLastAnswerCorrect(correct);
    if (correct) {
      setCorrectCount((c) => c + 1);
    } else {
      loseHeart();
    }
    setPhase("feedback");
  }

  function nextQuestion() {
    if (questionIndex + 1 >= questions.length) {
      setPhase("summary");
      return;
    }
    setQuestionIndex((i) => i + 1);
    setSelectedBird(null);
    setFreeTextValue("");
    setPhase("answering");
  }

  const canCheck =
    phase === "answering" &&
    (question.type === "multiple-choice" ? selectedBird !== null : freeTextValue.trim().length > 0);

  return (
    <>
      <QuestionCard
        question={question}
        questionIndex={questionIndex}
        totalQuestions={questions.length}
        hearts={state.hearts}
      >
        {question.type === "multiple-choice" ? (
          <MultipleChoiceQuestion
            options={question.options ?? []}
            selected={selectedBird}
            correctBird={question.bird}
            revealed={phase === "feedback"}
            onSelect={(bird) => phase === "answering" && setSelectedBird(bird)}
          />
        ) : (
          <FreeTextQuestion
            value={freeTextValue}
            onChange={setFreeTextValue}
            onSubmit={() => canCheck && checkAnswer()}
            allBirds={allBirds}
            disabled={phase === "feedback"}
          />
        )}
      </QuestionCard>

      <BottomActionBar tone={phase === "feedback" ? (lastAnswerCorrect ? "correct" : "incorrect") : "neutral"}>
        {phase === "feedback" ? (
          <div className="flex flex-col gap-3">
            <AnswerFeedback correct={lastAnswerCorrect} bird={question.bird} />
            <Button variant={lastAnswerCorrect ? "success" : "danger"} onClick={nextQuestion}>
              Continue
            </Button>
          </div>
        ) : (
          <Button onClick={checkAnswer} disabled={!canCheck}>
            Check
          </Button>
        )}
      </BottomActionBar>
    </>
  );
}
