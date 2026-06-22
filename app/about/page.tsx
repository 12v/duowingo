import Link from "next/link";
import { getAllBirds } from "@/lib/data/birds";

export default function AboutPage() {
  const recordists = new Map<string, string>();
  for (const bird of getAllBirds()) {
    for (const recording of bird.recordings) {
      recordists.set(recording.recordist, recording.licenseCode);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <Link href="/" className="text-sm text-blue-500 underline">
        &larr; Back home
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-gray-800">About Duowingo</h1>
      <p className="mt-4 text-gray-600">
        Duowingo is a free, mobile-friendly game for learning to identify UK birds by their calls
        and songs. No accounts, no ads — your progress is stored only in your browser.
      </p>
      <h2 className="mt-6 text-lg font-bold text-gray-800">Recordings</h2>
      <p className="mt-2 text-gray-600">
        All bird recordings are sourced from{" "}
        <a href="https://xeno-canto.org" target="_blank" rel="noreferrer" className="underline">
          xeno-canto.org
        </a>
        , a citizen-science database of wildlife sounds shared under Creative Commons licenses by
        recordists from around the world. Thank you to the recordists whose work makes this app
        possible:
      </p>
      <ul className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-gray-100 p-3 text-sm text-gray-500">
        {[...recordists.entries()].map(([recordist, license]) => (
          <li key={recordist} className="py-0.5">
            {recordist} &middot; {license}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-gray-400">
        Duowingo is an independent, non-commercial project and is not affiliated with xeno-canto
        or Duolingo.
      </p>
    </main>
  );
}
