import { useState } from 'react'
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import clsx from 'clsx'
import { liveClaims } from '../../data/dashboardMock'
import { LiveCashlessClaimsFilterModal } from './LiveCashlessClaimsFilterModal'

export function LiveClaimsTable() {
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <>
      <section className="flex min-h-[320px] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Live cashless claims
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Latest intimation pipeline (sample rows).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-[#00338d] dark:hover:bg-slate-800 dark:hover:text-sky-400"
            aria-label="Open live cashless claims filter"
            aria-haspopup="dialog"
            aria-expanded={filterOpen}
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400">
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
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {liveClaims.map((row) => (
              <tr
                key={row.id}
                className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
              >
                <td className="whitespace-nowrap px-4 py-3 font-medium text-[#00338d] dark:text-sky-400">
                  {row.id}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-800 dark:text-slate-200">
                  {row.employee}
                </td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-slate-600 dark:text-slate-400">
                  {row.code}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-700 dark:text-slate-300">
                  {row.corporate}
                </td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-slate-600 dark:text-slate-400">
                  {row.policy}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-700 dark:text-slate-300">
                  {row.patient}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-700 dark:text-slate-300">
                  {row.hospital}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span
                    className={clsx(
                      'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                      row.statusVariant === 'success' &&
                        'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/60',
                      row.statusVariant === 'muted' &&
                        'bg-slate-100 text-slate-600 ring-1 ring-slate-200/80',
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

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
        <span className="text-xs sm:text-sm">1 of 125</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            disabled
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
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
