import type { XCResponse } from "./types";

const BASE_URL = "https://xeno-canto.org/api/3/recordings";
const MAX_PAGES_PER_SPECIES = 3;

export function buildQuery(englishName: string): string {
  return `en:"${englishName}" cnt:"United Kingdom" q_gt:C`;
}

export async function fetchAllPages(
  apiKey: string,
  query: string,
): Promise<XCResponse["recordings"]> {
  const all: XCResponse["recordings"] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const url = `${BASE_URL}?key=${encodeURIComponent(apiKey)}&query=${encodeURIComponent(query)}&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Xeno-canto request failed (${res.status}): ${url}`);
    }
    const data = (await res.json()) as XCResponse;
    all.push(...(data.recordings ?? []));
    totalPages = Math.min(data.numPages ?? 1, MAX_PAGES_PER_SPECIES);
    page += 1;
  } while (page <= totalPages);

  return all;
}
