import { ArrowRight, CircleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { topBlockers } from '../../data/dashboardMock'

const priorityTone = {
  P1: 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300',
  P2: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  P3: 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
} as const

export function TopBlockersPanel() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900 sm:p-5">
      <div className="flex items-center gap-2">
        <CircleAlert className="h-4 w-4 text-[#00338d]" />
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Top 5 Blockers
        </h2>
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Employers with critical operational blockers
      </p>

      <div className="mt-4 space-y-2.5">
        {topBlockers.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-slate-200 p-3 dark:border-slate-700"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {item.employer}
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  {item.issue}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                  Impact: {item.impact}
                </p>
              </div>
              <span
                className={clsx(
                  'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                  priorityTone[item.priority],
                )}
              >
                {item.priority}
              </span>
            </div>
            <Link
              to={item.href}
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#00338d] hover:underline"
            >
              Resolve
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
