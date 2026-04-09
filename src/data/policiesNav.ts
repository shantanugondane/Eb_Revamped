import type { LucideIcon } from 'lucide-react'
import {
  Award,
  Briefcase,
  ClipboardCheck,
  ClipboardList,
  Cog,
  Database,
  FilePlus,
  FileText,
  FileX2,
  GitBranch,
  Link2,
  PhoneForwarded,
  ScrollText,
  Unlink2,
  Users,
} from 'lucide-react'

export type PolicyNavItem = {
  slug: string
  label: string
  Icon: LucideIcon
}

/** Policies → sub-menu (matches legacy portal naming). */
export const POLICIES_SUBMENU: readonly PolicyNavItem[] = [
  { slug: 'policy-list', label: 'Policy List', Icon: Database },
  { slug: 'create-policy', label: 'Create Policy', Icon: FilePlus },
  { slug: 'feature-config', label: 'Feature Config', Icon: ScrollText },
  { slug: 'nominee-config', label: 'Nominee Config', Icon: Users },
  { slug: 'policy-lock-in', label: 'Policy Lock-In', Icon: Award },
  { slug: 'flexible-config', label: 'Flexible Config', Icon: PhoneForwarded },
  { slug: 'branches-config', label: 'Branches Config', Icon: GitBranch },
  {
    slug: 'enrolment-confirm-config',
    label: 'Enrolment Confirm Config',
    Icon: ClipboardCheck,
  },
  {
    slug: 'policy-remove-interlink',
    label: 'Policy Remove Interlink',
    Icon: Unlink2,
  },
  {
    slug: 'bulk-policy-creation',
    label: 'Bulk Policy Creation',
    Icon: Briefcase,
  },
  {
    slug: 'claim-document-config',
    label: 'Claim Document Config',
    Icon: FileX2,
  },
  {
    slug: 'benefit-configuration',
    label: 'Benefit Configuration',
    Icon: Cog,
  },
  {
    slug: 'pre-post-claim-config',
    label: 'Pre & post Claim Config',
    Icon: FileText,
  },
  {
    slug: 'policy-confirm-interlink',
    label: 'Policy Confirm Interlink',
    Icon: Link2,
  },
  {
    slug: 'go-live-checklist-logs',
    label: 'Go Live Checklist Logs',
    Icon: ClipboardList,
  },
] as const

export function getPolicyNavBySlug(slug: string): PolicyNavItem | undefined {
  return POLICIES_SUBMENU.find((item) => item.slug === slug)
}
