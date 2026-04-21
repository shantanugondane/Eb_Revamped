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
    icon: 'bg-orange-500/15 text-orange-400',
    ring: 'ring-orange-500/20',
    Icon: Building2,
  },
  blue: {
    icon: 'bg-sky-500/15 text-sky-400',
    ring: 'ring-sky-500/20',
    Icon: Shield,
  },
  green: {
    icon: 'bg-emerald-500/15 text-emerald-400',
    ring: 'ring-emerald-500/20',
    Icon: ShieldOff,
  },
  rose: {
    icon: 'bg-rose-500/15 text-rose-400',
    ring: 'ring-rose-500/20',
    Icon: FileWarning,
  },
  navy: {
    icon: 'bg-indigo-500/15 text-indigo-400',
    ring: 'ring-indigo-500/20',
    Icon: ClipboardList,
  },
  teal: {
    icon: 'bg-teal-500/15 text-teal-400',
    ring: 'ring-teal-500/20',
    Icon: UserCheck,
  },
  sky: {
    icon: 'bg-sky-500/15 text-sky-400',
    ring: 'ring-sky-500/20',
    Icon: Users,
  },
  pink: {
    icon: 'bg-fuchsia-500/15 text-fuchsia-400',
    ring: 'ring-fuchsia-500/20',
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
            className="group flex w-full gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 text-left shadow-[var(--shadow-soft)] transition hover:border-slate-300 hover:bg-[var(--bg-card-hover)]"
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
              <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                {stat.label}
              </p>
              <p className="mt-1 font-semibold tabular-nums tracking-tight text-[var(--text-primary)]">
                {stat.value}
              </p>
              <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-[var(--accent-blue)]">
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
