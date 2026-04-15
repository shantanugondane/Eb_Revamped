import { useState } from 'react'
import {
  BookmarkPlus,
  Calendar,
  CheckCircle2,
  Clock3,
  MoreHorizontal,
  RefreshCw,
  Search,
} from 'lucide-react'
import clsx from 'clsx'
import { CustomSelect } from '../ui/CustomSelect'
import { GlobalFilterModal } from './GlobalFilterModal'
import { dateInputSurface, dateSizeMd } from '../ui/selectStyle'

export function FilterBar() {
  const [globalFilterOpen, setGlobalFilterOpen] = useState(false)
  const [corporate, setCorporate] = useState('')
  const [coverType, setCoverType] = useState('')
  const [policyName, setPolicyName] = useState('')
  const [date, setDate] = useState('2026-04-08')
  const [savedView, setSavedView] = useState('')
  const [savedFeedback, setSavedFeedback] = useState(false)

  const savedViews = [
    {
      value: '',
      label: 'Saved views',
      corporate: '',
      coverType: '',
      policyName: '',
      date: '2026-04-08',
    },
    {
      value: 'daily-ops',
      label: 'Daily Ops',
      corporate: 'tc',
      coverType: 'ghi',
      policyName: 'p1',
      date: '2026-04-08',
    },
    {
      value: 'claims-watch',
      label: 'Claims Watch',
      corporate: 'tcs',
      coverType: '',
      policyName: 'p1',
      date: '2026-04-08',
    },
  ] as const

  const applySavedView = (value: string) => {
    setSavedView(value)
    const next = savedViews.find((view) => view.value === value)
    if (!next) return
    setCorporate(next.corporate)
    setCoverType(next.coverType)
    setPolicyName(next.policyName)
    setDate(next.date)
  }

  const saveCurrentView = () => {
    setSavedFeedback(true)
    window.setTimeout(() => setSavedFeedback(false), 1200)
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Dashboard
            </h1>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              Snapshot of enrolment, endorsements, and live cashless activity.
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200/60 dark:bg-emerald-950/30 dark:text-emerald-300 dark:ring-emerald-900/50">
              <Clock3 className="h-3.5 w-3.5" />
              Data refreshed 2 mins ago
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-2 sm:gap-3">
            <label className="flex min-w-[140px] flex-1 flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Saved view
              </span>
              <CustomSelect
                id="filter-saved-view"
                value={savedView}
                onChange={applySavedView}
                options={savedViews.map((view) => ({
                  value: view.value,
                  label: view.label,
                }))}
              />
            </label>
            <label className="flex min-w-[140px] flex-1 flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Corporate
              </span>
              <CustomSelect
                id="filter-corporate"
                value={corporate}
                onChange={setCorporate}
                options={[
                  { value: '', label: 'Select corporate' },
                  {
                    value: 'tc',
                    label: 'Tata Capital Housing Finance',
                  },
                  { value: 'tcs', label: 'TCS Limited' },
                ]}
              />
            </label>
            <label className="flex min-w-[130px] flex-1 flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Cover type
              </span>
              <CustomSelect
                id="filter-cover"
                value={coverType}
                onChange={setCoverType}
                options={[
                  { value: '', label: 'Select cover' },
                  { value: 'ghi', label: 'GHI Corporate Floater' },
                  { value: 'top', label: 'Super Top-up' },
                ]}
              />
            </label>
            <label className="flex min-w-[160px] flex-1 flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Policy name
              </span>
              <CustomSelect
                id="filter-policy"
                value={policyName}
                onChange={setPolicyName}
                options={[
                  { value: '', label: 'Select policy' },
                  { value: 'p1', label: 'POL-77821/24' },
                ]}
              />
            </label>
            <label className="flex min-w-[150px] flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Date
              </span>
              <div className="group relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={clsx(
                    dateInputSurface,
                    dateSizeMd,
                    'font-medium',
                  )}
                />
                <Calendar className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00338d]/45 transition-colors group-focus-within:text-[#00338d]" />
              </div>
            </label>
            <button
              type="button"
              onClick={saveCurrentView}
              className={clsx(
                'flex h-10 shrink-0 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold shadow-sm transition',
                savedFeedback
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
              )}
              aria-label="Save current view"
            >
              {savedFeedback ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <BookmarkPlus className="h-4 w-4" />
                  Save view
                </>
              )}
            </button>
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/25 transition hover:bg-teal-700"
              aria-label="Apply filters"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
        <div className="mt-3 flex justify-end gap-4 border-t border-slate-100 pt-3">
          <button
            type="button"
            className="flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="text-[10px] font-medium">Refresh</span>
          </button>
          <button
            type="button"
            onClick={() => setGlobalFilterOpen(true)}
            className="flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-slate-500 transition hover:bg-slate-100 hover:text-[#00338d]"
            title="Global filter"
            aria-haspopup="dialog"
            aria-expanded={globalFilterOpen}
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </div>

      <GlobalFilterModal
        open={globalFilterOpen}
        onClose={() => setGlobalFilterOpen(false)}
      />
    </>
  )
}
