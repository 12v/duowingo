import "dotenv/config";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { SPECIES_SEED } from "../data/species";
import { buildQuery, fetchAllPages } from "../lib/xenoCanto/client";
import type { XCRecording } from "../lib/xenoCanto/types";
import type { Bird, Recording } from "../types";

const MAX_RECORDINGS_PER_SPECIES = 8;
const MAX_CLIP_LENGTH_SECONDS = 60;
const FALLBACK_MAX_CLIP_LENGTH_SECONDS = 180;
const RATE_LIMIT_DELAY_MS = 350;
const OUTPUT_PATH = path.join(__dirname, "..", "data", "birds.json");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseLicense(lic: string): { code: string; url: string } {
  const url = lic.startsWith("//") ? `https:${lic}` : lic;
  const match = url.match(/licenses\/([a-z-]+)\/([\d.]+)/i);
  if (!match) {
    return { code: "Unknown license", url };
  }
  const code = `CC ${match[1].toUpperCase()} ${match[2]}`;
  return { code, url };
}

function parseLength(length: string): number | null {
  const parts = length.split(":").map(Number);
  if (parts.some((p) => Number.isNaN(p))) return null;
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return null;
}

function selectRecordings(recordings: XCRecording[]): XCRecording[] {
  const withFile = recordings.filter((r) => r.file);

  const underCap = (cap: number) =>
    withFile.filter((r) => {
      const length = parseLength(r.length);
      return length === null || length <= cap;
    });

  const candidates =
    underCap(MAX_CLIP_LENGTH_SECONDS).length > 0
      ? underCap(MAX_CLIP_LENGTH_SECONDS)
      : underCap(FALLBACK_MAX_CLIP_LENGTH_SECONDS);

  return candidates.slice(0, MAX_RECORDINGS_PER_SPECIES);
}

function mapRecording(r: XCRecording): Recording {
  const { code, url } = parseLicense(r.lic);
  return {
    id: r.id,
    file: r.file.startsWith("//") ? `https:${r.file}` : r.file,
    recordist: r.rec,
    licenseCode: code,
    licenseUrl: url,
    quality: r.q,
    lengthSeconds: parseLength(r.length),
    type: r.type,
  };
}

async function main() {
  const apiKey = process.env.XC_API_KEY;
  if (!apiKey) {
    console.error("Missing XC_API_KEY environment variable.");
    console.error('Usage: XC_API_KEY=xxxx npx tsx scripts/fetch-recordings.ts');
    process.exit(1);
  }

  const results: Bird[] = [];
  let loggedSampleKeys = false;

  for (const seed of SPECIES_SEED) {
    const query = buildQuery(seed.xcSearchName ?? seed.commonName);
    try {
      const recordings = await fetchAllPages(apiKey, query);

      if (!loggedSampleKeys && recordings.length > 0) {
        console.log("Sample recording keys:", Object.keys(recordings[0]));
        loggedSampleKeys = true;
      }

      const mapped = selectRecordings(recordings).map(mapRecording);

      if (mapped.length === 0) {
        console.warn(`No UK recordings found for ${seed.commonName} — consider relaxing the query.`);
      } else {
        console.log(`${seed.commonName}: ${mapped.length} recordings`);
      }

      results.push({
        slug: seed.slug,
        commonName: seed.commonName,
        scientificName: seed.scientificName,
        tier: seed.tier,
        aliases: seed.aliases,
        recordings: mapped,
      });
    } catch (err) {
      console.error(`Failed to fetch recordings for ${seed.commonName}:`, err);
      results.push({
        slug: seed.slug,
        commonName: seed.commonName,
        scientificName: seed.scientificName,
        tier: seed.tier,
        aliases: seed.aliases,
        recordings: [],
      });
    }

    await sleep(RATE_LIMIT_DELAY_MS);
  }

  results.sort((a, b) => a.slug.localeCompare(b.slug));

  await writeFile(OUTPUT_PATH, JSON.stringify(results, null, 2) + "\n");
  console.log(`\nWrote ${results.length} species to ${OUTPUT_PATH}`);

  const withRecordings = results.filter((b) => b.recordings.length > 0).length;
  console.log(`${withRecordings}/${results.length} species have at least one recording.`);
}

main();
