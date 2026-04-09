import { useState } from 'react'
import { Bell, Globe, Menu, X } from 'lucide-react'
import { AdminMenu } from './AdminMenu'
import { CustomSelect } from '../ui/CustomSelect'

type HeaderProps = {
  onMenuToggle: () => void
  menuOpen: boolean
}

export function Header({ onMenuToggle, menuOpen }: HeaderProps) {
  const [language, setLanguage] = useState('en')
  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-slate-200/80 bg-white/90 px-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="navigation-drawer"
        >
          {menuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
        <div className="flex items-center gap-3">
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-semibold tracking-tight text-[#00338d] dark:text-sky-400">
              TATA AIG
            </span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              LOOM
            </span>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <div className="hidden min-w-0 items-center gap-2 rounded-full border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/70 px-2 py-1 shadow-sm dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 sm:flex">
          <Globe className="ml-0.5 h-3.5 w-3.5 shrink-0 text-[#00338d]/50 dark:text-sky-400/70" aria-hidden />
          <span className="sr-only" id="lang-label">
            Language
          </span>
          <CustomSelect
            id="lang"
            value={language}
            onChange={setLanguage}
            size="header"
            aria-labelledby="lang-label"
            options={[
              { value: 'en', label: 'English' },
              { value: 'hi', label: 'हिन्दी' },
            ]}
          />
        </div>

        <button
          type="button"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-sky-500 ring-2 ring-white" />
        </button>

        <AdminMenu />
      </div>
    </header>
  )
}
