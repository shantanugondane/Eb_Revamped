import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  CalendarDays,
  ClipboardList,
  FileHeart,
  FolderOpen,
  IdCard,
  Network,
  ShieldCheck,
  UserCheck,
  Upload,
  UserCog,
} from 'lucide-react'

export type ModuleNavItem = {
  slug: string
  label: string
  section: string
  Icon: LucideIcon
}

export const MODULE_NAV_ITEMS: readonly ModuleNavItem[] = [
  {
    slug: 'endorsement',
    label: 'Endorsement',
    section: 'Employee Benefits',
    Icon: CalendarDays,
  },
  {
    slug: 'claims',
    label: 'Claims',
    section: 'Employee Benefits',
    Icon: FileHeart,
  },
  {
    slug: 'member-verification',
    label: 'Member Verification',
    section: 'Employee Benefits',
    Icon: UserCheck,
  },
  {
    slug: 'employer',
    label: 'Employer',
    section: 'Employer Management',
    Icon: IdCard,
  },
  {
    slug: 'employer-role',
    label: 'Employer Role',
    section: 'Employer Management',
    Icon: UserCog,
  },
  {
    slug: 'employer-login-active-directory',
    label: 'Login Active Directory',
    section: 'Employer Management',
    Icon: Network,
  },
  {
    slug: 'employer-enrolment-access-control',
    label: 'Enrolment Access Control',
    section: 'Employer Management',
    Icon: ShieldCheck,
  },
  {
    slug: 'employer-endorsement-queue',
    label: 'Endorsement Queue',
    section: 'Employer Management',
    Icon: ClipboardList,
  },
  {
    slug: 'employer-bulk-file-upload',
    label: 'Bulk File Upload',
    section: 'Employer Management',
    Icon: Upload,
  },
  {
    slug: 'employer-dashboard-config',
    label: 'Dashboard Config',
    section: 'Employer Management',
    Icon: FolderOpen,
  },
  {
    slug: 'employer-management-home',
    label: 'Employer Management',
    section: 'Employer Management',
    Icon: Briefcase,
  },
] as const

export const EMPLOYER_MANAGEMENT_SUBMENU: readonly ModuleNavItem[] =
  MODULE_NAV_ITEMS.filter((item) => item.section === 'Employer Management').filter(
    (item) => item.slug !== 'employer-management-home',
  )

export function getModuleNavBySlug(slug: string): ModuleNavItem | undefined {
  return MODULE_NAV_ITEMS.find((item) => item.slug === slug)
}
