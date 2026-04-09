import { SlidersHorizontal } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { claimsBreakdown } from '../../data/dashboardMock'

const totalRegistered = 10195

export function AllClaimsCard() {
  const data = claimsBreakdown.map((c) => ({
    name: c.name,
    value: c.value,
    color: c.color,
  }))

  return (
    <section className="flex min-h-[320px] flex-col rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            All claims
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Registered claims mix (mock %).
          </p>
        </div>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Chart options"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 sm:flex-row sm:items-stretch sm:justify-between sm:p-6">
        <div className="relative h-[200px] w-full max-w-[220px] sm:h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="62%"
                outerRadius="88%"
                paddingAngle={2}
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [
                  `${value ?? 0}%`,
                  'Share',
                ]}
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold tabular-nums tracking-tight text-slate-900">
              {totalRegistered.toLocaleString()}
            </span>
            <span className="mt-1 max-w-[8rem] text-[11px] font-medium leading-tight text-slate-500">
              Claim registered
            </span>
          </div>
        </div>
        <ul className="flex w-full flex-col justify-center gap-3 sm:max-w-[11rem]">
          {claimsBreakdown.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="flex items-center gap-2 text-slate-600">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: c.color }}
                />
                {c.name}
              </span>
              <span className="font-semibold tabular-nums text-slate-900">
                {c.value}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
