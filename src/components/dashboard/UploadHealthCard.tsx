import { AlertTriangle, CheckCircle2, Clock3, FileWarning } from 'lucide-react'
import { uploadHealthStats } from '../../data/dashboardMock'

export function UploadHealthCard() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Upload Health
        </h2>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900/50">
          Healthy
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 dark:border-emerald-900 dark:bg-emerald-950/30">
          <p className="text-[11px] font-medium uppercase tracking-wide text-emerald-700/90 dark:text-emerald-300/90">
            Success Rate
          </p>
          <p className="mt-1 text-lg font-semibold text-emerald-700 dark:text-emerald-300">
            {uploadHealthStats.successRate}%
          </p>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-3 dark:border-rose-900 dark:bg-rose-950/30">
          <p className="text-[11px] font-medium uppercase tracking-wide text-rose-700/90 dark:text-rose-300/90">
            Failure Rate
          </p>
          <p className="mt-1 text-lg font-semibold text-rose-700 dark:text-rose-300">
            {uploadHealthStats.failureRate}%
          </p>
        </div>
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-600 dark:text-slate-300">
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

      <div className="mt-4 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
        <p className="mb-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <AlertTriangle className="h-3.5 w-3.5" />
          Top failure reasons
        </p>
        <ul className="space-y-1.5">
          {uploadHealthStats.failureReasons.map((item) => (
            <li
              key={item.reason}
              className="flex items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300"
            >
              <span>{item.reason}</span>
              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-semibold tabular-nums text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {item.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
