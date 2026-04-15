import { AlertOctagon, FilePlus2, Upload, UserPlus2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const quickActions = [
  {
    id: 'qa-upload-endorsement',
    label: 'Upload Endorsement',
    href: '/modules/endorsement',
    Icon: Upload,
  },
  {
    id: 'qa-onboard-employer',
    label: 'Onboard Employer',
    href: '/modules/employer/onboard',
    Icon: UserPlus2,
  },
  {
    id: 'qa-create-policy',
    label: 'Create Policy',
    href: '/policies/create-policy',
    Icon: FilePlus2,
  },
  {
    id: 'qa-view-failures',
    label: 'View Failures',
    href: '/modules/endorsement',
    Icon: AlertOctagon,
  },
] as const

export function QuickActionsBar() {
  return (
    <section className="sticky top-2 z-20 rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-[var(--shadow-soft)] backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-700/80 dark:bg-slate-900/90 dark:supports-[backdrop-filter]:bg-slate-900/80">
      <div className="flex flex-wrap items-center gap-2">
        {quickActions.map(({ id, label, href, Icon }) => (
          <Link
            key={id}
            to={href}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#00338d] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0a4aad]"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </Link>
        ))}
      </div>
    </section>
  )
}
