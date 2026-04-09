import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../components/dashboard/Footer'
import { Header } from '../components/dashboard/Header'
import { NavigationDrawer } from '../components/dashboard/NavigationDrawer'

const LAST_LOGIN_KEY = 'eb-last-login-ts'

export function BrokerLayout() {
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()
  const loginInit = useRef(false)

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
        <Header
          menuOpen={navOpen}
          onMenuToggle={() => setNavOpen((open) => !open)}
        />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}
