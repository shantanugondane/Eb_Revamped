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
import { QuickActionsBar } from './QuickActionsBar'

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
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-soft)] transition-colors hover:border-slate-300 hover:bg-[var(--bg-card-hover)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-['Syne'] text-lg font-semibold tracking-tight text-[var(--text-primary)]">
              Dashboard
            </h1>
            <p className="mt-0.5 text-sm text-[var(--text-muted)]">
              Snapshot of enrolment, endorsements, and live cashless activity.
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)]">
              <Clock3 className="h-3.5 w-3.5" />
              Data refreshed 2 mins ago
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-2 sm:gap-3">
            <label className="flex min-w-[140px] flex-1 flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                Saved view
              </span>
              <CustomSelect
                id="filter-saved-view"
                value={savedView}
                onChange={applySavedView}
                className="[&>button]:!border-slate-200 [&>button]:!bg-white [&>button]:!text-[var(--text-primary)] [&>button_span]:!text-[var(--text-primary)]"
                options={savedViews.map((view) => ({
                  value: view.value,
                  label: view.label,
                }))}
              />
            </label>
            <label className="flex min-w-[140px] flex-1 flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                Corporate
              </span>
              <CustomSelect
                id="filter-corporate"
                value={corporate}
                onChange={setCorporate}
                className="[&>button]:!border-slate-200 [&>button]:!bg-white [&>button]:!text-[var(--text-primary)] [&>button_span]:!text-[var(--text-primary)]"
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
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                Cover type
              </span>
              <CustomSelect
                id="filter-cover"
                value={coverType}
                onChange={setCoverType}
                className="[&>button]:!border-slate-200 [&>button]:!bg-white [&>button]:!text-[var(--text-primary)] [&>button_span]:!text-[var(--text-primary)]"
                options={[
                  { value: '', label: 'Select cover' },
                  { value: 'ghi', label: 'GHI Corporate Floater' },
                  { value: 'top', label: 'Super Top-up' },
                ]}
              />
            </label>
            <label className="flex min-w-[160px] flex-1 flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                Policy name
              </span>
              <CustomSelect
                id="filter-policy"
                value={policyName}
                onChange={setPolicyName}
                className="[&>button]:!border-slate-200 [&>button]:!bg-white [&>button]:!text-[var(--text-primary)] [&>button_span]:!text-[var(--text-primary)]"
                options={[
                  { value: '', label: 'Select policy' },
                  { value: 'p1', label: 'POL-77821/24' },
                ]}
              />
            </label>
            <label className="flex min-w-[150px] flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
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
                    'font-medium !border-slate-200 !bg-white !text-[var(--text-primary)] [color-scheme:light]',
                  )}
                />
                <Calendar className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)] transition-colors group-focus-within:text-[var(--accent-blue)]" />
              </div>
            </label>
            <button
              type="button"
              onClick={saveCurrentView}
              className={clsx(
                'flex h-10 shrink-0 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold shadow-sm transition',
                savedFeedback
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-[var(--text-primary)] hover:bg-slate-200',
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
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-blue)] text-white shadow-md shadow-blue-500/25 transition hover:bg-blue-500"
              aria-label="Apply filters"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-3">
          <span className="font-medium text-[var(--text-muted)]">Corporate name:</span>
          <span className="text-[var(--text-primary)]">Tata Capital Housing Finance Limited</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
            Confirmed <span className="tabular-nums">274</span>
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-3">
          <QuickActionsBar />
          <div className="flex justify-end gap-2">
          <button
            type="button"
            className="flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-[var(--text-muted)] transition hover:bg-slate-100 hover:text-[var(--text-primary)]"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="text-[10px] font-medium">Refresh</span>
          </button>
          <button
            type="button"
            onClick={() => setGlobalFilterOpen(true)}
            className="flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-[var(--text-muted)] transition hover:bg-slate-100 hover:text-[var(--accent-blue)]"
            title="Global filter"
            aria-haspopup="dialog"
            aria-expanded={globalFilterOpen}
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="text-[10px] font-medium">More</span>
          </button>
          </div>
        </div>
      </div>

      <GlobalFilterModal
        open={globalFilterOpen}
        onClose={() => setGlobalFilterOpen(false)}
      />
    </>
  )
}
