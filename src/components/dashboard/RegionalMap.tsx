/** Stylized India outline — decorative regional view (not GIS-accurate). */
export function RegionalMap() {
  return (
    <section className="flex min-h-[320px] flex-col rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900">
      <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Regional footprint
        </h2>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          Policy density by state (illustrative).
        </p>
      </div>
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-b-2xl bg-gradient-to-b from-slate-50 to-sky-50/40 p-4 dark:from-slate-950 dark:to-slate-900">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:12px_12px]" />
        <div className="relative mx-auto flex w-full max-w-[200px] flex-1 items-center justify-center">
          <svg
            viewBox="0 0 120 140"
            className="h-auto max-h-[220px] w-full drop-shadow-sm"
            aria-hidden
          >
            <defs>
              <linearGradient id="inGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>
            <path
              fill="url(#inGrad)"
              stroke="#0c4a6e"
              strokeWidth="0.6"
              d="M58 8 L72 10 L88 18 L96 32 L102 48 L100 64 L94 78 L86 92 L74 104 L58 112 L42 108 L28 98 L18 84 L12 66 L10 48 L14 32 L24 20 L40 12 Z"
            />
            <circle cx="52" cy="38" r="3" fill="#fef08a" opacity="0.9" />
            <circle cx="72" cy="52" r="2.5" fill="#fef08a" opacity="0.85" />
            <circle cx="48" cy="72" r="2.5" fill="#fef08a" opacity="0.8" />
            <circle cx="68" cy="78" r="2" fill="#fef08a" opacity="0.75" />
          </svg>
        </div>
        <p className="relative mt-2 text-center text-[11px] text-slate-500">
          Replace with your map provider or GeoJSON layer when wiring APIs.
        </p>
      </div>
    </section>
  )
}
