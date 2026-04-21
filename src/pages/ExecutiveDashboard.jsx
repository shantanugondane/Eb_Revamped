import { Fragment, useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  Bell,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  FileClock,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  UserRound,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const DASHBOARD_DATA = {
  kpis: [
    {
      id: 'premium',
      label: 'Total Premium Booked',
      value: 66.7,
      suffix: 'Cr',
      prefix: '₹ ',
      trend: '+8.2% vs last period',
      positive: true,
      tone: 'blue',
      icon: CircleDollarSign,
    },
    {
      id: 'claims',
      label: 'Total Claims Submitted',
      value: 38.4,
      suffix: 'Cr',
      prefix: '₹ ',
      trend: '+3.1%',
      positive: false,
      tone: 'amber',
      icon: FileClock,
    },
    {
      id: 'lossRatio',
      label: 'Net Loss Ratio',
      value: 57.6,
      suffix: '%',
      prefix: '',
      trend: '-1.8%',
      positive: true,
      tone: 'green',
      icon: ShieldAlert,
    },
    {
      id: 'newEmployers',
      label: 'New Employers (last 3 days)',
      value: 4,
      suffix: ' new',
      prefix: '',
      trend: '+14.2%',
      positive: true,
      tone: 'green',
      icon: Building2,
      employers: ['Tata Capital Housing', 'BigBasket', 'Vistara', 'AIA Engineering'],
    },
  ],
  premiumByEmployer: [
    { employer: 'Tata Capital', premium: 18.2, claims: 9.1, ratio: 50, isNew: false },
    { employer: 'TCS Limited', premium: 14.7, claims: 13.8, ratio: 94, isNew: false },
    { employer: 'Tata Motors', premium: 12.5, claims: 8.2, ratio: 66, isNew: false },
    { employer: 'BigBasket', premium: 9.3, claims: 4.1, ratio: 44, isNew: true },
    { employer: 'Accenture', premium: 12, claims: 11.8, ratio: 98, isNew: false },
    { employer: 'Tata Capital Housing', premium: 8.1, claims: 5.2, ratio: 64, isNew: true },
  ],
  endorsement: [
    { stage: 'Requested', value: 86, color: 'var(--accent-blue)' },
    { stage: 'Processing', value: 41, color: 'var(--accent-amber)' },
    { stage: 'Completed', value: 33, color: 'var(--accent-green)' },
    { stage: 'Rejected', value: 12, color: 'var(--accent-red)' },
  ],
  heatmap: [
    { employer: 'Tata Capital', months: { Feb: 48, Mar: 52, Apr: 50 } },
    { employer: 'TCS', months: { Feb: 80, Mar: 88, Apr: 94 } },
    { employer: 'Tata Motors', months: { Feb: 62, Mar: 65, Apr: 66 } },
    { employer: 'BigBasket', months: { Feb: 40, Mar: 42, Apr: 44 } },
    { employer: 'Accenture', months: { Feb: 85, Mar: 92, Apr: 98 } },
  ],
  alerts: [
    {
      id: 1,
      priority: 'P1',
      employer: 'Accenture',
      message: 'Loss ratio exceeded 98% this month',
    },
    {
      id: 2,
      priority: 'P1',
      employer: 'TCS Limited',
      message: '18 endorsement requests pending > 24hrs',
    },
    {
      id: 3,
      priority: 'P2',
      employer: 'Tata Capital Housing',
      message: '6 upload validation failures',
    },
    {
      id: 4,
      priority: 'P3',
      employer: 'BigBasket',
      message: 'Enrolment window closes in 3 days',
    },
  ],
}

const EMPLOYERS = ['All Employers', ...DASHBOARD_DATA.premiumByEmployer.map((e) => e.employer)]
const BROKERS = ['Shivani Agarwal', 'Arjun Mehta', 'Kunal Sethi']
const DATE_RANGES = ['Last 7D', 'Last 30D', 'Last 90D', 'Custom']

const THEME = {
  '--bg-primary': '#0A0F1E',
  '--bg-card': '#111827',
  '--bg-card-hover': '#1a2235',
  '--accent-green': '#10B981',
  '--accent-red': '#EF4444',
  '--accent-amber': '#F59E0B',
  '--accent-blue': '#3B82F6',
  '--text-primary': '#F9FAFB',
  '--text-muted': '#6B7280',
  '--border': 'rgba(255,255,255,0.07)',
}

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")"

function metricTone(ratio) {
  if (ratio > 90) return 'var(--accent-red)'
  if (ratio >= 70) return 'var(--accent-amber)'
  return 'var(--accent-green)'
}

function statusLabel(ratio) {
  if (ratio > 90) return 'Loss'
  if (ratio >= 70) return 'Watch'
  return 'Profitable'
}

function useCountUp(target, decimals = 1, duration = 900) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(target * progress)
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value.toFixed(decimals)
}

function CardShell({ children, className = '', style = {} }) {
  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-[var(--bg-card)] transition duration-300 hover:border-white/15 hover:bg-[var(--bg-card-hover)] ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default function ExecutiveDashboard() {
  const [selectedEmployer, setSelectedEmployer] = useState('All Employers')
  const [selectedBroker, setSelectedBroker] = useState(BROKERS[0])
  const [dateRange, setDateRange] = useState('Last 30D')
  const [newOnly, setNewOnly] = useState(true)
  const [selectedRow, setSelectedRow] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 80)
    return () => window.clearTimeout(id)
  }, [])

  const premiumRows = useMemo(() => {
    if (selectedEmployer === 'All Employers') return DASHBOARD_DATA.premiumByEmployer
    return DASHBOARD_DATA.premiumByEmployer.filter((item) => item.employer === selectedEmployer)
  }, [selectedEmployer])

  const maxFunnel = Math.max(...DASHBOARD_DATA.endorsement.map((step) => step.value))
  const kpiCounter = {
    premium: useCountUp(66.7, 1),
    claims: useCountUp(38.4, 1),
    lossRatio: useCountUp(57.6, 1),
    newEmployers: useCountUp(4, 0, 650),
  }

  useEffect(() => {
    const id = 'loom-executive-fonts'
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@500;600;700&display=swap'
    document.head.appendChild(link)
  }, [])

  return (
    <div
      className="min-h-screen overflow-y-auto bg-[var(--bg-primary)] p-2 text-[var(--text-primary)] sm:p-3 xl:h-screen xl:overflow-hidden"
      style={{ ...THEME, fontFamily: '"DM Sans", sans-serif' }}
    >
      <style>{`
        @keyframes loom-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loom-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.18); opacity: 1; }
        }
        .loom-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.55) rgba(15, 23, 42, 0.25);
        }
        .loom-scroll::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .loom-scroll::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.35);
          border-radius: 999px;
        }
        .loom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(148, 163, 184, 0.75), rgba(100, 116, 139, 0.75));
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .loom-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(191, 219, 254, 0.9), rgba(148, 163, 184, 0.9));
        }
        .loom-scroll::-webkit-scrollbar-corner {
          background: transparent;
        }
        .loom-scroll::-webkit-scrollbar-button {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{ backgroundImage: NOISE_BG, mixBlendMode: 'soft-light' }}
      />

      <div className="relative grid h-full min-h-0 gap-3 xl:grid-rows-[60px_120px_minmax(0,1fr)_240px]">
        <CardShell className="flex flex-col gap-3 px-3 py-3 pl-14 sm:px-4 sm:pl-14 lg:flex-row lg:items-center lg:justify-between lg:py-0">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="leading-none">
              <p className="font-['Syne'] text-lg font-semibold tracking-tight sm:text-xl">LOOM</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                TATA AIG
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 lg:mx-4 lg:justify-center">
            <select
              value={selectedBroker}
              onChange={(e) => setSelectedBroker(e.target.value)}
              className="h-9 min-w-[140px] flex-1 rounded-full border border-[var(--border)] bg-[#0d1427] px-3 text-xs outline-none ring-0 sm:min-w-[170px] sm:flex-none sm:text-sm"
            >
              {BROKERS.map((broker) => (
                <option key={broker}>{broker}</option>
              ))}
            </select>
            <select
              value={selectedEmployer}
              onChange={(e) => setSelectedEmployer(e.target.value)}
              className="h-9 min-w-[140px] flex-1 rounded-full border border-[var(--border)] bg-[#0d1427] px-3 text-xs outline-none ring-0 sm:min-w-[180px] sm:flex-none sm:text-sm"
            >
              {EMPLOYERS.map((employer) => (
                <option key={employer}>{employer}</option>
              ))}
            </select>
            <div className="flex max-w-full flex-wrap items-center gap-1 rounded-full border border-[var(--border)] bg-[#0d1427] p-1">
              {DATE_RANGES.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setDateRange(range)}
                  className={`rounded-full px-2 py-1 text-[11px] sm:px-2.5 sm:text-xs ${
                    dateRange === range ? 'bg-[var(--accent-blue)] text-white' : 'text-slate-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setNewOnly((v) => !v)}
              className={`flex h-9 items-center gap-2 rounded-full border px-2.5 text-[11px] sm:px-3 sm:text-xs ${
                newOnly
                  ? 'border-emerald-300/40 bg-emerald-500/15 text-emerald-300'
                  : 'border-[var(--border)] bg-[#0d1427] text-slate-300'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${newOnly ? 'bg-emerald-400' : 'bg-slate-500'}`}
                style={newOnly ? { animation: 'loom-pulse 1.4s infinite' } : {}}
              />
              New in last 3 days
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[#0d1427]"
            >
              <Bell className="h-4 w-4 text-slate-300" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--accent-red)]" />
            </button>
            <button
              type="button"
              className="flex h-9 items-center gap-2 rounded-full border border-[var(--border)] bg-[#0d1427] px-2"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1d2b4f]">
                <UserRound className="h-4 w-4 text-slate-300" />
              </span>
              <span className="pr-1 text-sm">Admin</span>
            </button>
          </div>
        </CardShell>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {DASHBOARD_DATA.kpis.map((kpi, index) => {
            const Icon = kpi.icon
            const isLossCard = kpi.id === 'lossRatio'
            const ratioWarningClass =
              isLossCard && kpi.value > 90
                ? 'border-[var(--accent-red)]'
                : isLossCard && kpi.value < 70
                  ? 'border-[var(--accent-green)]'
                  : ''
            const accentMap = {
              blue: 'text-[var(--accent-blue)]',
              amber: 'text-[var(--accent-amber)]',
              green: 'text-[var(--accent-green)]',
            }
            const counterValue = kpiCounter[kpi.id]

            return (
              <CardShell
                key={kpi.id}
                className={`relative px-3 py-2.5 ${ratioWarningClass}`}
                style={{
                  opacity: mounted ? 1 : 0,
                  animation: mounted ? 'loom-fade-up 420ms ease-out both' : 'none',
                  animationDelay: `${index * 80}ms`,
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${accentMap[kpi.tone]}`} />
                    <p className="text-xs text-slate-300">{kpi.label}</p>
                  </div>
                  {isLossCard && kpi.value > 90 ? (
                    <AlertTriangle className="h-4 w-4 text-[var(--accent-red)]" />
                  ) : null}
                </div>
                <p className="text-2xl font-semibold tabular-nums sm:text-3xl">
                  {kpi.prefix}
                  {counterValue}
                  {kpi.suffix}
                </p>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  {kpi.positive ? (
                    <TrendingUp className="h-3.5 w-3.5 text-[var(--accent-green)]" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-[var(--accent-red)]" />
                  )}
                  <span className={kpi.positive ? 'text-emerald-300' : 'text-rose-300'}>
                    {kpi.trend}
                  </span>
                </div>
                {kpi.id === 'newEmployers' ? (
                  <div className="absolute right-2 top-2">
                    <div className="group relative">
                      <button
                        type="button"
                        className="h-5 w-5 rounded-full border border-[var(--border)] text-xs text-slate-300"
                      >
                        ?
                      </button>
                      <div className="pointer-events-none absolute right-0 top-7 z-20 hidden w-52 rounded-lg border border-[var(--border)] bg-[#0d1427] p-2 text-xs group-hover:block">
                        {kpi.employers.map((name) => (
                          <p key={name} className="py-0.5 text-slate-200">
                            {newOnly ? (
                              <span
                                className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                                style={{ animation: 'loom-pulse 1.4s infinite' }}
                              />
                            ) : null}
                            {name}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </CardShell>
            )
          })}
        </div>

        <div className="grid min-h-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[4fr_3fr_3fr]">
          <CardShell className="flex min-h-0 flex-col p-3 md:col-span-2 xl:col-span-1">
            <p className="font-['Syne'] text-base">Premium by Employer</p>
            <p className="mb-2 text-xs text-[var(--text-muted)]">Profit / Loss per account</p>
            <div className="h-56 min-h-0 flex-1 sm:h-64 xl:h-auto">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={premiumRows} layout="vertical" barCategoryGap={10}>
                  <XAxis type="number" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="employer"
                    width={92}
                    tick={{ fill: '#E2E8F0', fontSize: 11 }}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    contentStyle={{
                      borderRadius: 10,
                      border: '1px solid rgba(255,255,255,0.08)',
                      backgroundColor: '#0d1427',
                    }}
                    formatter={(value, key, data) => {
                      if (key === 'premium') return [`₹ ${value} Cr`, 'Premium']
                      if (key === 'claims') return [`₹ ${value} Cr`, 'Claims']
                      return [`${data.payload.ratio}%`, 'Loss Ratio']
                    }}
                  />
                  <Bar dataKey="premium" radius={[0, 8, 8, 0]}>
                    {premiumRows.map((entry) => (
                      <Cell key={entry.employer} fill={metricTone(entry.ratio)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="shrink-0 pt-2 text-xs text-slate-300">
              <div className="flex flex-wrap items-center gap-3 rounded-md border border-[var(--border)] bg-[#0d1427] px-2 py-1.5">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-green)]" />
                Profit
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-amber)]" />
                Watch
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-red)]" />
                Loss
              </span>
              </div>
            </div>
          </CardShell>

          <CardShell className="flex min-h-0 flex-col p-3">
            <p className="font-['Syne'] text-base">Endorsement Pipeline</p>
            <div className="mt-3 space-y-3">
              {DASHBOARD_DATA.endorsement.map((step, i) => {
                const width = `${(step.value / maxFunnel) * 100}%`
                return (
                  <div key={step.stage}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span>{step.stage}</span>
                      <span className="tabular-nums text-slate-200">{step.value}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-900/70">
                      <div
                        className="h-2.5 rounded-full transition-[width] duration-700"
                        style={{
                          width: mounted ? width : '0%',
                          transitionDelay: `${i * 120}ms`,
                          backgroundColor: step.color,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg border border-[var(--border)] bg-[#0d1427] px-3 py-2 text-xs">
              <span className="text-slate-300">Avg processing time: 11 mins</span>
              <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-rose-300">
                7.6% failure rate
              </span>
            </div>
          </CardShell>

          <CardShell className="flex min-h-0 flex-col p-3 md:col-span-2 xl:col-span-1">
            <p className="mb-2 font-['Syne'] text-base">Loss Ratio by Employer</p>
            <div className="loom-scroll min-h-0 flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-[1.25fr_repeat(3,1fr)] gap-1.5 text-xs">
              <p className="pb-1 text-slate-400">Employer</p>
              <p className="pb-1 text-center text-slate-400">Feb</p>
              <p className="pb-1 text-center text-slate-400">Mar</p>
              <p className="pb-1 text-center text-slate-400">Apr</p>
              {DASHBOARD_DATA.heatmap.map((row) => (
                <Fragment key={row.employer}>
                  <p key={`${row.employer}-label`} className="flex items-center text-[11px] text-slate-200">
                    {row.employer}
                  </p>
                  {Object.entries(row.months).map(([month, value]) => (
                    <div
                      key={`${row.employer}-${month}`}
                      className="rounded-md border border-black/15 px-1 py-1.5 text-center tabular-nums"
                      style={{ backgroundColor: metricTone(value), color: '#0f172a' }}
                    >
                      {value}%
                    </div>
                  ))}
                </Fragment>
              ))}
              </div>
            </div>
          </CardShell>
        </div>

        <div className="grid min-h-0 grid-cols-1 gap-3 xl:grid-cols-[3fr_2fr]">
          <CardShell className="flex min-h-0 flex-col p-3">
            <div className="mb-2">
              <p className="font-['Syne'] text-base">Employer Portfolio</p>
              <p className="text-xs text-[var(--text-muted)]">
                Shows profit/loss per employer at a glance
              </p>
            </div>
            <div className="loom-scroll min-h-0 flex-1 overflow-auto pr-1">
              <table className="min-w-[640px] w-full border-separate border-spacing-y-1.5 text-xs">
                <thead>
                  <tr className="text-left text-slate-400">
                    <th className="px-2 py-1 font-medium">Employer</th>
                    <th className="px-2 py-1 font-medium">Premium (₹ Cr)</th>
                    <th className="px-2 py-1 font-medium">Claims (₹ Cr)</th>
                    <th className="px-2 py-1 font-medium">Loss Ratio</th>
                    <th className="px-2 py-1 font-medium">Status</th>
                    <th className="px-2 py-1 font-medium">New?</th>
                  </tr>
                </thead>
                <tbody>
                  {DASHBOARD_DATA.premiumByEmployer.map((row) => {
                    const isSelected = selectedRow === row.employer
                    return (
                      <tr
                        key={row.employer}
                        onClick={() => setSelectedRow(row.employer)}
                        className={`cursor-pointer rounded-lg ${
                          isSelected ? 'bg-sky-500/15' : 'bg-[#0d1427]/85'
                        }`}
                      >
                        <td className="rounded-l-lg px-2 py-2.5">
                          <span className="inline-flex items-center">
                            {newOnly && row.isNew ? (
                              <span
                                className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                                style={{ animation: 'loom-pulse 1.4s infinite' }}
                              />
                            ) : null}
                            {row.employer}
                          </span>
                        </td>
                        <td className="px-2 py-2.5 tabular-nums">₹ {row.premium.toFixed(1)}</td>
                        <td className="px-2 py-2.5 tabular-nums">₹ {row.claims.toFixed(1)}</td>
                        <td className="px-2 py-2.5 tabular-nums">{row.ratio}%</td>
                        <td className="px-2 py-2.5">
                          <span
                            className="rounded-full px-2 py-1 text-[11px]"
                            style={{
                              backgroundColor: `${metricTone(row.ratio)}1f`,
                              color: metricTone(row.ratio),
                            }}
                          >
                            {statusLabel(row.ratio)}
                          </span>
                        </td>
                        <td className="rounded-r-lg px-2 py-2.5">
                          {row.isNew ? (
                            <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[11px] text-emerald-300">
                              NEW
                            </span>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardShell>

          <CardShell className="flex min-h-0 flex-col p-3">
            <div className="mb-2 flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4 text-[var(--accent-amber)]" />
              <p className="font-['Syne'] text-base">Needs Attention</p>
            </div>
            <div className="loom-scroll min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
              {DASHBOARD_DATA.alerts.map((alert) => {
                const priorityClass =
                  alert.priority === 'P1'
                    ? 'bg-rose-500/20 text-rose-300'
                    : alert.priority === 'P2'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-blue-500/20 text-blue-300'
                return (
                  <div
                    key={alert.id}
                    className="rounded-lg border border-[var(--border)] bg-[#0d1427] px-3 py-2.5"
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] ${priorityClass}`}>
                        {alert.priority}
                      </span>
                      <a href="#" className="text-xs text-[var(--accent-blue)] hover:underline">
                        Resolve →
                      </a>
                    </div>
                    <p className="text-sm font-semibold">{alert.employer}</p>
                    <p className="mt-0.5 text-xs text-slate-300">{alert.message}</p>
                  </div>
                )
              })}
            </div>
          </CardShell>
        </div>
      </div>
    </div>
  )
}
