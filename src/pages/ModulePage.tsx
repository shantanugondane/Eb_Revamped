import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getModuleNavBySlug } from '../data/moduleNav'

export function ModulePage() {
  const { slug } = useParams<{ slug: string }>()

  const item = useMemo(
    () => (slug ? getModuleNavBySlug(slug) : undefined),
    [slug],
  )

  if (!slug || !item) {
    return <Navigate to="/" replace />
  }

  const { label, section, Icon } = item

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 px-3 py-6 sm:px-6">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00338d]/10 text-[#00338d]">
            <Icon className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {section}
            </p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {label}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              This screen is a frontend placeholder. Connect your API and replace
              this content when the module is ready.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
