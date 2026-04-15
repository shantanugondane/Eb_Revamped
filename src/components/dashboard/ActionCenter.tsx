import { AlertTriangle, ArrowRight, BellDot } from 'lucide-react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { actionCenterItems } from '../../data/dashboardMock'

const severityTone = {
  high: 'border-rose-200 bg-rose-50/70 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300',
  medium:
    'border-amber-200 bg-amber-50/70 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300',
  low: 'border-sky-200 bg-sky-50/70 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300',
} as const

export function ActionCenter() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900 sm:p-5">
      <div className="flex items-center gap-2">
        <BellDot className="h-4 w-4 text-[#00338d]" />
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Action Center
        </h2>
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Needs attention today
      </p>

      <div className="mt-4 grid gap-2.5 md:grid-cols-3">
        {actionCenterItems.map((item) => (
          <article
            key={item.id}
            className={clsx(
              'rounded-xl border p-3 transition hover:shadow-sm',
              severityTone[item.severity],
            )}
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-xs opacity-90">{item.detail}</p>
              </div>
            </div>
            <Link
              to={item.href}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold underline-offset-2 hover:underline"
            >
              {item.ctaLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
