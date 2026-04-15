import {
  ArrowUpRight,
  Building2,
  ClipboardList,
  FileWarning,
  HeartPulse,
  Shield,
  ShieldOff,
  UserCheck,
  Users,
} from 'lucide-react'
import clsx from 'clsx'
import { kpiStats } from '../../data/dashboardMock'

type Stat = (typeof kpiStats)[number]
type KpiGridProps = {
  stats: readonly Stat[]
  onDrillDown?: (label: string) => void
}

const toneStyles: Record<
  Stat['tone'],
  { icon: string; ring: string; Icon: typeof Users }
> = {
  orange: {
    icon: 'bg-orange-100 text-orange-700',
    ring: 'ring-orange-200/60',
    Icon: Building2,
  },
  blue: {
    icon: 'bg-sky-100 text-sky-700',
    ring: 'ring-sky-200/60',
    Icon: Shield,
  },
  green: {
    icon: 'bg-emerald-100 text-emerald-700',
    ring: 'ring-emerald-200/60',
    Icon: ShieldOff,
  },
  rose: {
    icon: 'bg-rose-100 text-rose-700',
    ring: 'ring-rose-200/60',
    Icon: FileWarning,
  },
  navy: {
    icon: 'bg-indigo-100 text-indigo-800',
    ring: 'ring-indigo-200/60',
    Icon: ClipboardList,
  },
  teal: {
    icon: 'bg-teal-100 text-teal-800',
    ring: 'ring-teal-200/60',
    Icon: UserCheck,
  },
  sky: {
    icon: 'bg-sky-100 text-sky-800',
    ring: 'ring-sky-200/60',
    Icon: Users,
  },
  pink: {
    icon: 'bg-fuchsia-100 text-fuchsia-800',
    ring: 'ring-fuchsia-200/60',
    Icon: HeartPulse,
  },
}

export function KpiGrid({ stats, onDrillDown }: KpiGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {stats.map((stat) => {
        const { Icon } = toneStyles[stat.tone]
        return (
          <button
            type="button"
            key={stat.label}
            onClick={() => onDrillDown?.(stat.label)}
            className="group flex w-full gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-[var(--shadow-soft)] transition hover:border-slate-300/80 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-900 dark:hover:border-slate-600"
          >
            <div
              className={clsx(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1',
                toneStyles[stat.tone].icon,
                toneStyles[stat.tone].ring,
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                {stat.label}
              </p>
              <p className="mt-1 font-semibold tabular-nums tracking-tight text-slate-900 dark:text-slate-100">
                {stat.value}
              </p>
              <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-[#00338d]">
                Drill down
                <ArrowUpRight className="h-3 w-3" />
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
