import { slaTrackerItems } from '../../data/dashboardMock'

function PercentBar({
  withinSla,
  atRisk,
  breached,
}: {
  withinSla: number
  atRisk: number
  breached: number
}) {
  const total = Math.max(withinSla + atRisk + breached, 1)
  const safe = (withinSla / total) * 100
  const risk = (atRisk / total) * 100
  const fail = (breached / total) * 100

  return (
    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
      <div className="flex h-full w-full">
        <div className="bg-emerald-500" style={{ width: `${safe}%` }} />
        <div className="bg-amber-500" style={{ width: `${risk}%` }} />
        <div className="bg-rose-500" style={{ width: `${fail}%` }} />
      </div>
    </div>
  )
}

export function SlaTrackerCard() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900 sm:p-5">
      <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        SLA Tracker
      </h2>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Within SLA, at-risk, and breached workloads
      </p>

      <div className="mt-4 space-y-3">
        {slaTrackerItems.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-slate-200 p-3 dark:border-slate-700"
          >
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {item.metric}
            </p>
            <PercentBar
              withinSla={item.withinSla}
              atRisk={item.atRisk}
              breached={item.breached}
            />
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-medium">
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                Within SLA {item.withinSla}
              </span>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                At risk {item.atRisk}
              </span>
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
                Breached {item.breached}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
