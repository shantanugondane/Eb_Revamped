import { AlertTriangle, ArrowRight, BellDot } from 'lucide-react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { actionCenterItems } from '../../data/dashboardMock'

const severityTone = {
  high: 'border-rose-500/25 bg-rose-500/15 text-rose-300',
  medium: 'border-amber-500/25 bg-amber-500/15 text-amber-300',
  low: 'border-blue-500/25 bg-blue-500/15 text-blue-300',
} as const

export function ActionCenter() {
  return (
    <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-soft)] transition-colors hover:border-slate-300 hover:bg-[var(--bg-card-hover)] sm:p-5">
      <div className="flex items-center gap-2">
        <BellDot className="h-4 w-4 text-[var(--accent-blue)]" />
        <h2 className="font-['Syne'] text-sm font-semibold text-[var(--text-primary)]">
          Action Center
        </h2>
      </div>
      <p className="mt-1 text-xs text-[var(--text-muted)]">
        Needs attention today
      </p>

      <div className="mt-4 grid gap-2.5 md:grid-cols-3">
        {actionCenterItems.map((item) => (
          <article
            key={item.id}
              className={clsx('rounded-xl border p-3 transition hover:shadow-sm', severityTone[item.severity])}
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
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-blue)] underline-offset-2 hover:underline"
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
