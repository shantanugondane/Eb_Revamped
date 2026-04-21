import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Footer } from '../components/dashboard/Footer'
import { Header } from '../components/dashboard/Header'
import { NavigationDrawer } from '../components/dashboard/NavigationDrawer'

const LAST_LOGIN_KEY = 'eb-last-login-ts'

export function BrokerLayout() {
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()
  const loginInit = useRef(false)
  const isExecutiveDashboard = pathname === '/dashboard-new'

  useEffect(() => {
    setNavOpen(false)
  }, [pathname])

  useEffect(() => {
    if (loginInit.current) return
    loginInit.current = true
    try {
      if (!localStorage.getItem(LAST_LOGIN_KEY)) {
        localStorage.setItem(LAST_LOGIN_KEY, String(Date.now()))
      }
    } catch {
      /* ignore */
    }
  }, [])

  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-slate-100 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <NavigationDrawer open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        {isExecutiveDashboard ? (
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            className="fixed left-4 top-[22px] z-[60] flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-slate-900/85 text-white shadow-lg backdrop-blur transition hover:bg-slate-800"
            aria-label="Open navigation menu"
            aria-controls="navigation-drawer"
            aria-expanded={navOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        ) : null}
        {!isExecutiveDashboard ? (
          <Header
            menuOpen={navOpen}
            onMenuToggle={() => setNavOpen((open) => !open)}
          />
        ) : null}
        <Outlet />
        {!isExecutiveDashboard ? <Footer /> : null}
      </div>
    </div>
  )
}
