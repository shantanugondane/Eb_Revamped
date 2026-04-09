import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { endorsementSeries } from '../../data/dashboardMock'

export function EndorsementPanel() {
  return (
    <section className="flex min-h-[320px] flex-col rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900">
      <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Endorsement
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Monthly movement — additions, deletions, and updates.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px] font-medium">
            <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Addition
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Deletion
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
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
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 24px rgb(15 23 42 / 0.08)',
              }}
              labelStyle={{ fontWeight: 600, color: '#0f172a' }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              formatter={(value) => (
                <span className="text-slate-600">{value}</span>
              )}
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
