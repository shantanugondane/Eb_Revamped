import { endorsementFunnel } from '../../data/dashboardMock'
import clsx from 'clsx'

const tone = {
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  emerald:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300',
} as const

export function EndorsementFunnelCard() {
  const maxCount = Math.max(...endorsementFunnel.map((x) => x.count), 1)

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900 sm:p-5">
      <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        Endorsement Funnel
      </h2>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Requested to completion pipeline
      </p>

      <div className="mt-4 space-y-3">
        {endorsementFunnel.map((item) => {
          const width = Math.max((item.count / maxCount) * 100, 10)
          return (
            <div key={item.stage}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {item.stage}
                </span>
                <span className="font-semibold tabular-nums text-slate-800 dark:text-slate-100">
                  {item.count}
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={clsx('h-2 rounded-full', tone[item.tone])}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
