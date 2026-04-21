import { enrolmentRows } from '../../data/dashboardMock'

export function EnrolmentPanel() {
  return (
    <section className="flex min-h-[320px] flex-col rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow-soft)] transition-colors hover:border-slate-300 hover:bg-[var(--bg-card-hover)] lg:h-[320px]">
      <div className="border-b border-[var(--border)] px-4 py-3 sm:px-5">
        <h2 className="font-['Syne'] text-sm font-semibold text-[var(--text-primary)]">
          Enrolment status details
        </h2>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">
          Window progress by corporate and policy.
        </p>
      </div>
      <div className="loom-scroll flex flex-1 flex-col gap-3 overflow-y-auto p-3 sm:p-4">
        {enrolmentRows.map((row) => (
          <article
            key={row.corporate + row.policy}
            className="rounded-xl border border-[var(--border)] bg-slate-50 p-4 transition hover:bg-[var(--bg-card-hover)]"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {row.corporate}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {row.policy}
                </p>
                <p className="text-[11px] font-medium text-[var(--text-muted)]">
                  Window: {row.window}
                </p>
              </div>
              <div className="flex shrink-0 gap-4 sm:gap-6">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                    Total
                  </p>
                  <p className="mt-0.5 text-sm font-semibold tabular-nums text-[var(--text-primary)]">
                    {row.total.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-emerald-400/80">
                    Confirmed
                  </p>
                  <p className="mt-0.5 text-sm font-semibold tabular-nums text-emerald-400">
                    {row.confirmed.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-amber-400/80">
                    Pending / not opted
                  </p>
                  <p className="mt-0.5 text-sm font-semibold tabular-nums text-amber-400">
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
