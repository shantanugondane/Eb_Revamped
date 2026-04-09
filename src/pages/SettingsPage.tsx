import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { ChevronLeft, Moon, Sun, type LucideIcon } from 'lucide-react'
import { useTheme, type Theme } from '../context/ThemeContext'

export function SettingsPage() {
  const { theme, setTheme } = useTheme()

  const options: { id: Theme; label: string; desc: string; Icon: LucideIcon }[] =
    [
      {
        id: 'light',
        label: 'Bright mode',
        desc: 'Light background, best for daytime use.',
        Icon: Sun,
      },
      {
        id: 'dark',
        label: 'Dark mode',
        desc: 'Reduced glare in low light.',
        Icon: Moon,
      },
    ]

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 px-3 py-6 sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800"
          aria-label="Back to dashboard"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            Account
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Theme setting
          </h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900 sm:p-8">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Choose how the portal looks on this device. Your choice is saved
          locally in this browser.
        </p>

        <div className="mt-6 grid gap-3">
          {options.map(({ id, label, desc, Icon }) => {
            const selected = theme === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTheme(id)}
                className={clsx(
                  'flex w-full items-start gap-4 rounded-xl border px-4 py-4 text-left transition',
                  selected
                    ? 'border-[#00338d] bg-sky-50/80 ring-2 ring-[#00338d]/20 dark:bg-sky-950/40 dark:ring-sky-500/30'
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600',
                )}
              >
                <span
                  className={clsx(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
                    selected
                      ? 'bg-[#00338d] text-white'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {desc}
                  </span>
                </span>
                {selected ? (
                  <span
                    className="ml-auto mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#00338d]"
                    aria-hidden
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                ) : (
                  <span
                    className="ml-auto mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-slate-300 dark:border-slate-600"
                    aria-hidden
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </main>
  )
}
