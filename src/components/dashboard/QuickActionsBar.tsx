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
    <div className="flex flex-wrap items-center gap-2">
      {quickActions.map(({ id, label, href, Icon }) => (
        <Link
          key={id}
          to={href}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#3B82F6]/25 bg-[rgba(59,130,246,0.15)] px-3 py-1.5 text-xs font-semibold text-[#3B82F6] transition hover:bg-[rgba(59,130,246,0.25)]"
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </Link>
      ))}
    </div>
  )
}
