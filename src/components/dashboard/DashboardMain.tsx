import { FilterBar } from './FilterBar'
import { KpiGrid } from './KpiGrid'
import { EnrolmentPanel } from './EnrolmentPanel'
import { EndorsementPanel } from './EndorsementPanel'
import { RegionalMap } from './RegionalMap'
import { AllClaimsCard } from './AllClaimsCard'
import { LiveClaimsTable } from './LiveClaimsTable'
import { PolicySection } from './PolicySection'
import { kpiStats } from '../../data/dashboardMock'

export function DashboardMain() {
  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 px-3 py-6 sm:px-6 dark:text-inherit">
      <FilterBar />

      <div className="rounded-2xl border border-slate-200/60 bg-white/60 px-4 py-3 text-sm shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/60 sm:px-5">
        <span className="font-medium text-slate-500 dark:text-slate-400">
          Corporate name:{' '}
        </span>
        <span className="text-slate-900 dark:text-slate-100">
          Tata Capital Housing Finance Limited
        </span>
        <span className="mx-3 hidden text-slate-300 dark:text-slate-600 sm:inline">
          ·
        </span>
        <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900/50 sm:mt-0">
          Confirmed{' '}
          <span className="tabular-nums text-emerald-900 dark:text-emerald-200">
            274
          </span>
        </span>
      </div>

      <KpiGrid stats={kpiStats} />

      <div className="grid gap-4 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-4">
          <EnrolmentPanel />
        </div>
        <div className="lg:col-span-5">
          <EndorsementPanel />
        </div>
        <div className="lg:col-span-3">
          <RegionalMap />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <AllClaimsCard />
        <LiveClaimsTable />
      </div>

      <PolicySection />
    </main>
  )
}
