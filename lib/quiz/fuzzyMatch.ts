import Fuse from "fuse.js";

export interface FuzzyMatchOptions {
  threshold?: number;
}

const DEFAULT_THRESHOLD = 0.3;

export function normalizeAnswer(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/^(the|a|an)\s+/, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function isLengthPlausible(input: string, target: string): boolean {
  if (input.length === 0) return false;
  return input.length >= target.length * 0.4;
}

export function isCorrectAnswer(
  userInput: string,
  acceptedAnswers: string[],
  options: FuzzyMatchOptions = {},
): boolean {
  const threshold = options.threshold ?? DEFAULT_THRESHOLD;
  const normalizedInput = normalizeAnswer(userInput);
  if (normalizedInput.length === 0) return false;

  for (const accepted of acceptedAnswers) {
    const normalizedTarget = normalizeAnswer(accepted);
    if (normalizedInput === normalizedTarget) return true;
  }

  for (const accepted of acceptedAnswers) {
    const normalizedTarget = normalizeAnswer(accepted);
    if (!isLengthPlausible(normalizedInput, normalizedTarget)) continue;

    const fuse = new Fuse([normalizedTarget], { includeScore: true, threshold });
    const results = fuse.search(normalizedInput);
    if (results.length > 0 && (results[0].score ?? 1) <= threshold) {
      return true;
    }
  }

  return false;
}
