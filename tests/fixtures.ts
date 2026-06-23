import type { Bird } from "@/types";

function makeBird(slug: string, commonName: string, tier: Bird["tier"], aliases: string[] = []): Bird {
  return {
    slug,
    commonName,
    scientificName: `${commonName} testus`,
    tier,
    aliases,
    recordings: [
      {
        id: `XC-${slug}`,
        file: `https://example.com/test-audio/${slug}.mp3`,
        recordist: "Test Recordist",
        licenseCode: "CC BY-NC-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
        quality: "A",
        lengthSeconds: 10,
        type: "song",
      },
    ],
  };
}

export const TEST_BIRDS: Bird[] = [
  makeBird("robin", "European Robin", "easy", ["Robin"]),
  makeBird("sparrow", "House Sparrow", "easy", ["Sparrow"]),
  makeBird("blue-tit", "Eurasian Blue Tit", "easy", ["Blue Tit"]),
  makeBird("blackbird", "Eurasian Blackbird", "easy", ["Blackbird"]),
  makeBird("wren", "Eurasian Wren", "easy", ["Wren"]),
  makeBird("cuckoo", "Common Cuckoo", "medium", ["Cuckoo"]),
  makeBird("kingfisher", "Common Kingfisher", "medium", ["Kingfisher"]),
  makeBird("buzzard", "Common Buzzard", "hard", ["Buzzard"]),
  makeBird("puffin", "Atlantic Puffin", "hard", ["Puffin"]),
];
