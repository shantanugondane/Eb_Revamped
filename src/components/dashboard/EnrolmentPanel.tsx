import { enrolmentRows } from '../../data/dashboardMock'

export function EnrolmentPanel() {
  return (
    <section className="flex h-full min-h-[320px] flex-col rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900">
      <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Enrolment status details
        </h2>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          Window progress by corporate and policy.
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-3 overflow-auto p-3 sm:p-4">
        {enrolmentRows.map((row) => (
          <article
            key={row.corporate + row.policy}
            className="rounded-xl border border-slate-100 bg-slate-50/40 p-4 transition hover:border-slate-200 hover:bg-white dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {row.corporate}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {row.policy}
                </p>
                <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  Window: {row.window}
                </p>
              </div>
              <div className="flex shrink-0 gap-4 sm:gap-6">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                    Total
                  </p>
                  <p className="mt-0.5 text-sm font-semibold tabular-nums text-slate-800 dark:text-slate-200">
                    {row.total.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-emerald-600/80 dark:text-emerald-400/90">
                    Confirmed
                  </p>
                  <p className="mt-0.5 text-sm font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                    {row.confirmed.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-amber-600/80 dark:text-amber-400/90">
                    Pending / not opted
                  </p>
                  <p className="mt-0.5 text-sm font-semibold tabular-nums text-amber-700 dark:text-amber-400">
                    {row.pending.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
