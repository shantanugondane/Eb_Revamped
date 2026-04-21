import { useCallback, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { FilterBar } from './FilterBar'
import { KpiGrid } from './KpiGrid'
import { ActionCenter } from './ActionCenter'
import { UploadHealthCard } from './UploadHealthCard'
import { EndorsementFunnelCard } from './EndorsementFunnelCard'
import { EnrolmentPanel } from './EnrolmentPanel'
import { EndorsementPanel } from './EndorsementPanel'
import { RegionalMap } from './RegionalMap'
import { AllClaimsCard } from './AllClaimsCard'
import { LiveClaimsTable } from './LiveClaimsTable'
import { kpiStats } from '../../data/dashboardMock'

export function DashboardMain() {
  const navigate = useNavigate()
  useEffect(() => {
    const id = 'loom-operations-fonts'
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@500;600;700&display=swap'
    document.head.appendChild(link)
  }, [])

  const handleKpiDrillDown = useCallback(
    (label: string) => {
      const routeByLabel: Record<string, string> = {
        Employers: '/modules/employer',
        'Active Policies': '/policies/policy-list',
        'Inactive Policies': '/policies/policy-list',
        'Expired Policies': '/policies/policy-list',
        'Pending Approval Policies': '/policies/policy-list',
        'Active Employees': '/modules/member-verification',
        'Inactive Employees': '/modules/member-verification',
        'Claims Registered': '/modules/claims',
      }
      navigate(routeByLabel[label] ?? '/')
    },
    [navigate],
  )

  return (
    <main
      className="flex w-full flex-1 flex-col gap-4 px-3 py-4 text-slate-900 sm:px-6"
      style={
        {
          '--bg-primary': '#f8fafc',
          '--bg-card': '#ffffff',
          '--bg-card-hover': '#f8fafc',
          '--accent-green': '#10B981',
          '--accent-red': '#EF4444',
          '--accent-amber': '#F59E0B',
          '--accent-blue': '#3B82F6',
          '--text-primary': '#0f172a',
          '--text-muted': '#6B7280',
          '--border': 'rgba(15,23,42,0.08)',
          fontFamily: '"DM Sans", sans-serif',
          background: '#f8fafc',
        } as CSSProperties
      }
    >
      <style>{`
        .loom-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(148,163,184,0.75) rgba(226,232,240,0.85);
        }
        .loom-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
        .loom-scroll::-webkit-scrollbar-track {
          background: rgba(226,232,240,0.85); border-radius: 999px;
        }
        .loom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg,rgba(148,163,184,0.75),rgba(100,116,139,0.75));
          border-radius: 999px; border: 1px solid rgba(148,163,184,0.25);
        }
        .loom-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg,rgba(191,219,254,0.9),rgba(148,163,184,0.9));
        }
        .loom-scroll::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
      `}</style>
      <FilterBar />

      <KpiGrid stats={kpiStats} onDrillDown={handleKpiDrillDown} />

      <section className="space-y-4">
        <ActionCenter />

        <div className="grid gap-4 xl:grid-cols-2">
          <UploadHealthCard />
          <EndorsementFunnelCard />
        </div>
      </section>

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
    </main>
  )
}
