import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { endorsementSeries } from '../../data/dashboardMock'

export function EndorsementPanel() {
  return (
    <section className="flex min-h-[320px] flex-col rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow-soft)] transition-colors hover:border-slate-300 hover:bg-[var(--bg-card-hover)]">
      <div className="border-b border-[var(--border)] px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="font-['Syne'] text-sm font-semibold text-[var(--text-primary)]">
              Endorsement
            </h2>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              Monthly movement — additions, deletions, and updates.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px] font-medium">
            <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)]">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Addition
            </span>
            <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)]">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Deletion
            </span>
            <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)]">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Updation
            </span>
          </div>
        </div>
      </div>
      <div className="min-h-[240px] flex-1 p-3 sm:p-4">
        <ResponsiveContainer width="100%" height="100%" minHeight={220}>
          <BarChart
            data={endorsementSeries}
            margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
            barGap={4}
          >
            <CartesianGrid
              strokeDasharray="3 6"
              vertical={false}
              stroke="rgba(15,23,42,0.08)"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: '1px solid rgba(15,23,42,0.12)',
                background: '#ffffff',
                color: '#0f172a',
              }}
              labelStyle={{ fontWeight: 600, color: '#0f172a' }}
            />
            <Bar
              dataKey="addition"
              name="Addition"
              fill="#34d399"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="deletion"
              name="Deletion"
              fill="#38bdf8"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="updation"
              name="Updation"
              fill="#fbbf24"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
