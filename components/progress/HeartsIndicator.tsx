export function HeartsIndicator({ current, max }: { current: number; max: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${current} of ${max} hearts remaining`}>
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill={i < current ? "#ef4444" : "none"}
          stroke={i < current ? "#ef4444" : "#d1d5db"}
          strokeWidth={2}
          className="h-5 w-5"
        >
          <path d="M12 21s-6.7-4.35-9.3-8.2C1 10.1 1.7 6.6 4.6 5.1c2.3-1.2 4.9-.3 6.4 1.6 1.5-1.9 4.1-2.8 6.4-1.6 2.9 1.5 3.6 5 1.9 7.7C18.7 16.65 12 21 12 21z" />
        </svg>
      ))}
    </div>
  );
}
