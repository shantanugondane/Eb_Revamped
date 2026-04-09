import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { ChevronDown, UserRound } from 'lucide-react'
import { formatLoginStamp } from '../../utils/formatLogin'

const LAST_LOGIN_KEY = 'eb-last-login-ts'

const DROPDOWN_MS = 220

export function AdminMenu() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [panelMounted, setPanelMounted] = useState(false)
  const [panelShown, setPanelShown] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  const loginTs = (() => {
    try {
      const raw = localStorage.getItem(LAST_LOGIN_KEY)
      if (raw) {
        const n = Number(raw)
        if (Number.isFinite(n)) return formatLoginStamp(n)
      }
    } catch {
      /* ignore */
    }
    return formatLoginStamp(Date.now())
  })()

  useEffect(() => {
    if (open) {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current)
        closeTimer.current = null
      }
      setPanelMounted(true)
      setPanelShown(false)
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanelShown(true))
      })
      return () => cancelAnimationFrame(id)
    }

    setPanelShown(false)
    closeTimer.current = setTimeout(() => {
      setPanelMounted(false)
      closeTimer.current = null
    }, DROPDOWN_MS)
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    },
    [],
  )

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const goLogout = () => {
    setOpen(false)
    try {
      localStorage.removeItem(LAST_LOGIN_KEY)
    } catch {
      /* ignore */
    }
    navigate('/login')
  }

  const goProfile = () => {
    setOpen(false)
    navigate('/profile')
  }

  const goSettings = () => {
    setOpen(false)
    navigate('/settings')
  }

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={clsx(
          'flex min-w-0 items-center gap-2 rounded-full border border-slate-200/80 bg-white py-1 pl-1 pr-2 shadow-sm transition',
          'hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:hover:bg-slate-800',
          open && 'border-[#00338d]/40 ring-2 ring-[#00338d]/15 dark:ring-sky-500/25',
        )}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00338d] to-[#0a4aad] text-white">
          <UserRound className="h-4 w-4" />
        </span>
        <span className="hidden text-left text-sm font-medium text-slate-800 dark:text-slate-100 sm:block">
          Admin
        </span>
        <ChevronDown
          className={clsx(
            'hidden h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ease-out sm:block dark:text-slate-500',
            open && 'rotate-180',
          )}
        />
      </button>

      {panelMounted && (
        <div
          className={clsx(
            'absolute right-0 top-[calc(100%+8px)] z-[100] w-[min(100vw-1.5rem,16rem)] origin-top-right rounded-xl border border-slate-200/95 bg-white py-2 shadow-[0_12px_48px_-8px_rgb(15_23_42/0.28)] will-change-transform dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40',
            'transition-[opacity,transform] duration-200 ease-out motion-reduce:duration-0',
            panelShown
              ? 'pointer-events-auto scale-100 opacity-100 translate-y-0'
              : 'pointer-events-none scale-[0.97] opacity-0 -translate-y-1',
          )}
          role="menu"
          aria-hidden={!panelShown}
        >
          <button
            type="button"
            role="menuitem"
            className="block w-full px-4 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            onClick={goProfile}
          >
            View profile
          </button>
          <button
            type="button"
            role="menuitem"
            className="block w-full px-4 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            onClick={goSettings}
          >
            Theme setting
          </button>
          <button
            type="button"
            role="menuitem"
            className="block w-full px-4 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            onClick={goLogout}
          >
            Log out
          </button>
          <div className="my-2 border-t border-slate-100 dark:border-slate-800" />
          <div className="px-4 py-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            <p>Last login {loginTs.date}</p>
            <p className="mt-0.5 font-mono tabular-nums text-slate-600 dark:text-slate-300">
              {loginTs.time}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
