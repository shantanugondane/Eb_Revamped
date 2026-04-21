import { endorsementFunnel } from '../../data/dashboardMock'
const tone = {
  sky: '#3B82F6',
  amber: '#F59E0B',
  emerald: '#10B981',
  rose: '#EF4444',
} as const

export function EndorsementFunnelCard() {
  const maxCount = Math.max(...endorsementFunnel.map((x) => x.count), 1)

  return (
    <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-soft)] transition-colors hover:border-slate-300 hover:bg-[var(--bg-card-hover)] sm:p-5">
      <h2 className="font-['Syne'] text-sm font-semibold text-[var(--text-primary)]">
        Endorsement Funnel
      </h2>
      <p className="mt-1 text-xs text-[var(--text-muted)]">
        Requested to completion pipeline
      </p>

      <div className="mt-4 space-y-3">
        {endorsementFunnel.map((item) => {
          const width = Math.max((item.count / maxCount) * 100, 10)
          return (
            <div key={item.stage}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-[var(--text-primary)]">
                  {item.stage}
                </span>
                <span className="font-semibold tabular-nums text-[var(--text-primary)]">
                  {item.count}
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${width}%`, backgroundColor: tone[item.tone] }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
