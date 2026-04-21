import { AlertTriangle, CheckCircle2, Clock3, FileWarning } from 'lucide-react'
import { uploadHealthStats } from '../../data/dashboardMock'

export function UploadHealthCard() {
  return (
    <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-soft)] transition-colors hover:border-slate-300 hover:bg-[var(--bg-card-hover)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-['Syne'] text-sm font-semibold text-[var(--text-primary)]">
          Upload Health
        </h2>
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-500/20">
          Healthy
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-emerald-300/90">
            Success Rate
          </p>
          <p className="mt-1 text-lg font-semibold text-emerald-300">
            {uploadHealthStats.successRate}%
          </p>
        </div>
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-rose-300/90">
            Failure Rate
          </p>
          <p className="mt-1 text-lg font-semibold text-rose-300">
            {uploadHealthStats.failureRate}%
          </p>
        </div>
      </div>

      <div className="mt-3 grid gap-2 text-xs text-[var(--text-muted)]">
        <p className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          Total processed today: {uploadHealthStats.totalProcessed} files
        </p>
        <p className="inline-flex items-center gap-1.5">
          <FileWarning className="h-3.5 w-3.5 text-rose-600" />
          Failed files: {uploadHealthStats.failedFiles}
        </p>
        <p className="inline-flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5 text-sky-600" />
          Avg processing time: {uploadHealthStats.avgProcessingMins} mins
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--border)] bg-slate-50 p-3">
        <p className="mb-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
          <AlertTriangle className="h-3.5 w-3.5" />
          Top failure reasons
        </p>
        <ul className="space-y-1.5">
          {uploadHealthStats.failureReasons.map((item) => (
            <li
              key={item.reason}
              className="flex items-center justify-between gap-2 text-xs text-[var(--text-primary)]"
            >
              <span>{item.reason}</span>
              <span className="rounded-md bg-white px-1.5 py-0.5 font-semibold tabular-nums text-[var(--text-primary)] ring-1 ring-slate-200">
                {item.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
