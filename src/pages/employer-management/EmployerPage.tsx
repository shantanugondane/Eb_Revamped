import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Eye, Plus } from 'lucide-react'

type EmployerRow = {
  name: string
  entityId: string
  mobile: string
  employees: number
  subEntities: string
  onboardedAt: string
}

const employerRows: EmployerRow[] = [
  {
    name: 'COSENTIA SOLUTIONS PRIVATE LIMITED',
    entityId: '119',
    mobile: '9011679140',
    employees: 0,
    subEntities: 'Add +',
    onboardedAt: '2026-04-15',
  },
  {
    name: 'FYNTUNETESTROLE',
    entityId: '118',
    mobile: '9999999999',
    employees: 0,
    subEntities: 'Add +',
    onboardedAt: '2026-04-15',
  },
  {
    name: 'MARVEL NUTRITION PRIVATE LIMITED',
    entityId: '117',
    mobile: '9833200111',
    employees: 25,
    subEntities: 'Add +',
    onboardedAt: '2026-04-15',
  },
  {
    name: 'REDPLANET SPATIAL SOLUTIONS (INDIA) PRIVATE LIMITED',
    entityId: '116',
    mobile: '7871027790',
    employees: 21,
    subEntities: 'Add +',
    onboardedAt: '2026-04-14',
  },
  {
    name: 'INTEGRATED PROJECT SERVICES INTERNATIONAL PRIVATE LIMITED',
    entityId: '115',
    mobile: '7888094222',
    employees: 28,
    subEntities: 'Add +',
    onboardedAt: '2026-04-14',
  },
]

export function EmployerPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-5 px-3 py-6 sm:px-6">
      <section className="rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Employer
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/modules/employer/onboard"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#00338d] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0a4aad]"
            >
              <Plus className="h-3.5 w-3.5" />
              Onboard Employer
            </Link>
            <button
              type="button"
              className="rounded-full bg-[#00338d] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0a4aad]"
            >
              Add Employer User +
            </button>
            <button
              type="button"
              className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
            >
              Quick Link
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-3 text-sm sm:px-5">
          <span className="text-slate-600 dark:text-slate-400">Show results</span>
          <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-800">
            <option>7</option>
            <option>10</option>
            <option>25</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="bg-[#00338d] text-left text-xs font-semibold text-white">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Entity ID</th>
                <th className="px-4 py-3">Mobile No.</th>
                <th className="px-4 py-3">Employees</th>
                <th className="px-4 py-3">Sub Entities</th>
                <th className="px-4 py-3">Onboarded At</th>
                <th className="px-4 py-3">Sheet Mapping</th>
                <th className="px-4 py-3">Custom Config</th>
                <th className="px-4 py-3">Operations</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-200">
              {employerRows.map((row) => (
                <tr key={row.entityId} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="px-4 py-3 text-xs font-medium">{row.name}</td>
                  <td className="px-4 py-3">{row.entityId}</td>
                  <td className="px-4 py-3">{row.mobile}</td>
                  <td className="px-4 py-3">{row.employees}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="rounded-md border border-sky-200 px-2 py-1 text-xs font-medium text-sky-700 hover:bg-sky-50"
                    >
                      {row.subEntities}
                    </button>
                  </td>
                  <td className="px-4 py-3">{row.onboardedAt}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700"
                    >
                      Custom Sheet Mapping
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Custom Config
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full border border-sky-200 p-1.5 text-sky-700 hover:bg-sky-50"
                      aria-label="View employer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-2 px-4 py-4 text-xs text-slate-500 dark:text-slate-400 sm:px-5">
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <span className="font-medium">Page 1 of 17</span>
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#00338d] text-white hover:bg-[#0a4aad]"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>
    </main>
  )
}
