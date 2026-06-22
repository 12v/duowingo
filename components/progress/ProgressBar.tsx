export function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 flex-1 rounded-full ${i < current ? "bg-green-500" : "bg-gray-200"}`}
        />
      ))}
    </div>
  );
}
