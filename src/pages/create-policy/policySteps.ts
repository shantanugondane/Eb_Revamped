import type { LucideIcon } from 'lucide-react'
import {
  ClipboardList,
  Contact,
  FileCheck,
  Users,
  Wallet,
} from 'lucide-react'

export type PolicyStepMeta = {
  id: number
  shortTitle: string
  description: string
  Icon: LucideIcon
}

export const POLICY_WIZARD_STEPS: readonly PolicyStepMeta[] = [
  {
    id: 1,
    shortTitle: 'Basic details',
    description: 'Policy, company & enrolment',
    Icon: ClipboardList,
  },
  {
    id: 2,
    shortTitle: 'Family construct',
    description: 'Members, relations & age rules',
    Icon: Users,
  },
  {
    id: 3,
    shortTitle: 'Rates & premium',
    description: 'Set policy rates & sum insured',
    Icon: Wallet,
  },
  {
    id: 4,
    shortTitle: 'Contact details',
    description: 'Insurer & employer contacts',
    Icon: Contact,
  },
  {
    id: 5,
    shortTitle: 'Claim documents',
    description: 'Documents & final submission',
    Icon: FileCheck,
  },
] as const
