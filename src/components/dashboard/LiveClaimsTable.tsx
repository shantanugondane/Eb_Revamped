import { useState } from 'react'
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import clsx from 'clsx'
import { liveClaims } from '../../data/dashboardMock'
import { LiveCashlessClaimsFilterModal } from './LiveCashlessClaimsFilterModal'

export function LiveClaimsTable() {
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <>
      <section className="flex min-h-[320px] flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow-soft)] transition-colors hover:border-slate-300 hover:bg-[var(--bg-card-hover)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 sm:px-5">
          <div>
            <h2 className="font-['Syne'] text-sm font-semibold text-[var(--text-primary)]">
              Live cashless claims
            </h2>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              Latest intimation pipeline (sample rows).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-slate-100 hover:text-[var(--accent-blue)]"
            aria-label="Open live cashless claims filter"
            aria-haspopup="dialog"
            aria-expanded={filterOpen}
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

      <div className="loom-scroll overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              <th className="whitespace-nowrap px-4 py-3">Claim ID</th>
              <th className="whitespace-nowrap px-4 py-3">Employee name</th>
              <th className="whitespace-nowrap px-4 py-3">Employee code</th>
              <th className="whitespace-nowrap px-4 py-3">Corporate name</th>
              <th className="whitespace-nowrap px-4 py-3">Policy no.</th>
              <th className="whitespace-nowrap px-4 py-3">Patient name</th>
              <th className="whitespace-nowrap px-4 py-3">Hospital name</th>
              <th className="whitespace-nowrap px-4 py-3">Claim status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {liveClaims.map((row) => (
              <tr
                key={row.id}
                className="transition hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-4 py-3 font-medium text-[var(--accent-blue)]">
                  {row.id}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[var(--text-primary)]">
                  {row.employee}
                </td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-[var(--text-muted)]">
                  {row.code}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[var(--text-primary)]">
                  {row.corporate}
                </td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-[var(--text-muted)]">
                  {row.policy}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[var(--text-primary)]">
                  {row.patient}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[var(--text-primary)]">
                  {row.hospital}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span
                    className={clsx(
                      'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                      row.statusVariant === 'success' &&
                        'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/20',
                      row.statusVariant === 'muted' &&
                        'bg-slate-100 text-[var(--text-muted)] ring-1 ring-slate-200',
                    )}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-[var(--border)] px-4 py-3 text-sm text-[var(--text-muted)]">
        <span className="text-xs sm:text-sm text-[var(--text-muted)]">1 of 125</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[var(--text-muted)] transition hover:bg-slate-100 disabled:opacity-30"
            disabled
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[var(--text-muted)] transition hover:bg-slate-100"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>

      <LiveCashlessClaimsFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
      />
    </>
  )
}
