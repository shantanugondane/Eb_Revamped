import { useEffect, useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Home,
  X,
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { POLICIES_SUBMENU } from '../../data/policiesNav'

const dashboardPath = '/'

type NavigationDrawerProps = {
  open: boolean
  onClose: () => void
}

export function NavigationDrawer({ open, onClose }: NavigationDrawerProps) {
  const { pathname } = useLocation()
  const onDashboard = pathname === '/' || pathname === '/dashboard'
  const policiesPathActive = pathname.startsWith('/policies')

  const [policiesOpen, setPoliciesOpen] = useState(policiesPathActive)

  useEffect(() => {
    if (policiesPathActive) setPoliciesOpen(true)
  }, [policiesPathActive])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 cursor-default bg-slate-900/40"
        aria-label="Close menu"
        onClick={onClose}
      />

      <div
        id="navigation-drawer"
        className="fixed inset-y-0 left-0 z-50 flex w-[min(100%,18.5rem)] flex-col border-r border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nav-drawer-title"
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 dark:border-slate-800">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00338d]/10">
              <span className="text-xs font-bold tracking-tight text-[#00338d]">
                TA
              </span>
            </div>
            <div className="min-w-0 leading-tight">
              <p id="nav-drawer-title" className="text-[13px] font-semibold text-[#00338d]">
                TATA AIG
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                LOOM
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3 pb-8" aria-label="Main">
          <NavLink
            to={dashboardPath}
            end
            title="Dashboard"
            aria-current={onDashboard ? 'page' : undefined}
            onClick={onClose}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive || onDashboard
                  ? 'bg-[#00338d] text-white shadow-md shadow-[#00338d]/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#00338d] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-400',
              )
            }
          >
            <Home className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
            Dashboard
          </NavLink>

          <div className="pt-1">
            <button
              type="button"
              onClick={() => setPoliciesOpen((o) => !o)}
              aria-expanded={policiesOpen}
              className={clsx(
                'flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors',
                policiesPathActive
                  ? 'bg-sky-50 text-[#00338d] ring-1 ring-sky-100 dark:bg-sky-950/50 dark:text-sky-300 dark:ring-sky-900'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
              )}
            >
              <span className="flex min-w-0 items-center gap-3">
                <FileText
                  className="h-[18px] w-[18px] shrink-0"
                  strokeWidth={1.75}
                />
                <span className="truncate">Policies</span>
              </span>
              {policiesOpen ? (
                <ChevronUp className="h-4 w-4 shrink-0 text-slate-500" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
              )}
            </button>

            {policiesOpen && (
              <ul
                className="ml-3 mt-1 space-y-0.5 border-l border-slate-200 pl-3 dark:border-slate-700"
                role="list"
              >
                {POLICIES_SUBMENU.map(({ slug, label, Icon }) => (
                  <li key={slug}>
                    <NavLink
                      to={`/policies/${slug}`}
                      title={label}
                      onClick={onClose}
                      className={({ isActive }) =>
                        clsx(
                          'flex items-center gap-2 rounded-lg py-2 pl-2 pr-1 text-[13px] leading-snug transition-colors',
                          isActive
                            ? 'bg-sky-50 font-medium text-[#00338d] ring-1 ring-sky-100/80 dark:bg-sky-950/40 dark:text-sky-300 dark:ring-sky-900/80'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
                        )
                      }
                    >
                      <Icon
                        className="h-4 w-4 shrink-0 text-[#00338d]/90"
                        strokeWidth={1.65}
                      />
                      <span className="min-w-0 flex-1">{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}
