import { useState } from 'react'
import { Banknote, TrendingUp } from 'lucide-react'
import clsx from 'clsx'

export function PolicySection() {
  const [tab, setTab] = useState<'gross' | 'earned'>('gross')

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900">
      <div className="flex flex-col gap-4 border-b border-slate-100 px-4 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Policy
        </h2>
        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50/80 p-1 dark:border-slate-700 dark:bg-slate-950/50">
          <button
            type="button"
            onClick={() => setTab('gross')}
            className={clsx(
              'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition',
              tab === 'gross'
                ? 'bg-white text-[#00338d] shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-800 dark:text-sky-400 dark:ring-slate-600'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200',
            )}
          >
            <Banknote className="h-3.5 w-3.5" />
            Gross premium
          </button>
          <button
            type="button"
            onClick={() => setTab('earned')}
            className={clsx(
              'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition',
              tab === 'earned'
                ? 'bg-white text-[#00338d] shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-800 dark:text-sky-400 dark:ring-slate-600'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200',
            )}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Earned premium
          </button>
        </div>
      </div>
      <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-8 py-10 dark:border-slate-700 dark:bg-slate-950/40">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-800 dark:ring-slate-700">
            <svg
              className="h-7 w-7 text-slate-300 dark:text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.25}
                d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-lg font-medium tracking-tight text-slate-400 dark:text-slate-500">
            No data found
          </p>
          <p className="mt-2 max-w-sm text-sm text-slate-400 dark:text-slate-500">
            When premium series are available for this corporate, charts will
            render here.
          </p>
        </div>
      </div>
    </section>
  )
}
