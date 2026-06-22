import type { Recording } from "@/types";

export function Attribution({ recording }: { recording: Recording }) {
  return (
    <p className="mt-2 text-center text-xs text-gray-400">
      Recording by {recording.recordist} via{" "}
      <a
        href="https://xeno-canto.org"
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        xeno-canto
      </a>
      ,{" "}
      <a href={recording.licenseUrl} target="_blank" rel="noreferrer" className="underline">
        {recording.licenseCode}
      </a>
    </p>
  );
}
