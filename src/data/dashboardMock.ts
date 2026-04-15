export const kpiStats = [
  { label: 'Employers', value: '98', tone: 'orange' as const },
  { label: 'Active Policies', value: '84', tone: 'blue' as const },
  { label: 'Inactive Policies', value: '3', tone: 'green' as const },
  { label: 'Expired Policies', value: '2', tone: 'rose' as const },
  {
    label: 'Pending Approval Policies',
    value: '15',
    tone: 'navy' as const,
  },
  { label: 'Active Employees', value: '633,388', tone: 'teal' as const },
  { label: 'Inactive Employees', value: '2,073', tone: 'sky' as const },
  { label: 'Claims Registered', value: '10,195', tone: 'pink' as const },
]

export const enrolmentRows = [
  {
    corporate: 'Tata Capital Housing Finance Limited',
    policy: 'GHI Corporate Floater',
    window: '01 Jan 2025 — 31 Mar 2025',
    total: 1200,
    confirmed: 980,
    pending: 220,
  },
  {
    corporate: 'Tata Motors Limited',
    policy: 'GHI Super Top-up',
    window: '15 Feb 2025 — 30 Apr 2025',
    total: 8450,
    confirmed: 7200,
    pending: 1250,
  },
  {
    corporate: 'TCS Limited',
    policy: 'GHI Corporate Floater',
    window: '01 Jan 2025 — 31 Dec 2025',
    total: 45200,
    confirmed: 44100,
    pending: 1100,
  },
]

export const endorsementSeries = [
  { name: 'Jan', addition: 42, deletion: 18, updation: 24 },
  { name: 'Feb', addition: 55, deletion: 22, updation: 31 },
  { name: 'Mar', addition: 38, deletion: 15, updation: 28 },
  { name: 'Apr', addition: 48, deletion: 20, updation: 35 },
  { name: 'May', addition: 62, deletion: 25, updation: 40 },
  { name: 'Jun', addition: 51, deletion: 19, updation: 33 },
]

export const claimsBreakdown = [
  { name: 'Claim Pending', value: 52.8, color: '#00338d' },
  { name: 'Claim Settled', value: 30.8, color: '#38bdf8' },
  { name: 'Claim Rejected', value: 16.4, color: '#f472b6' },
]

export const liveClaims = [
  {
    id: 'CLM-240891',
    employee: 'V Karthick',
    code: 'EMP-88421',
    corporate: 'Tata Steel',
    policy: 'POL-77821/24',
    patient: 'V Karthick',
    hospital: 'Apollo Hospitals',
    status: 'Intimation Cleared',
    statusVariant: 'success' as const,
  },
  {
    id: 'CLM-240892',
    employee: 'Skghouse Basha',
    code: 'EMP-55201',
    corporate: 'Tata Motors',
    policy: 'POL-66102/23',
    patient: 'Skghouse Basha',
    hospital: 'Fortis Healthcare',
    status: 'Intimation Received',
    statusVariant: 'success' as const,
  },
  {
    id: 'CLM-240893',
    employee: 'Sachin Jain',
    code: 'EMP-11902',
    corporate: 'TCS Limited',
    policy: 'POL-44091/24',
    patient: 'Sachin Jain',
    hospital: 'Max Super Specialty',
    status: 'Cancelled',
    statusVariant: 'muted' as const,
  },
  {
    id: 'CLM-240894',
    employee: 'Priya Sharma',
    code: 'EMP-33210',
    corporate: 'Tata Capital',
    policy: 'POL-22901/24',
    patient: 'Priya Sharma',
    hospital: 'Manipal Hospitals',
    status: 'Intimation Cleared',
    statusVariant: 'success' as const,
  },
]

export const actionCenterItems = [
  {
    id: 'a1',
    title: 'Pending endorsements need attention',
    detail: '18 requests are pending for more than 24 hours.',
    severity: 'high' as const,
    ctaLabel: 'Review queue',
    href: '/modules/employer-endorsement-queue',
  },
  {
    id: 'a2',
    title: 'Failed uploads in last run',
    detail: '3 employer files failed validation and need correction.',
    severity: 'medium' as const,
    ctaLabel: 'Open documents',
    href: '/modules/endorsement',
  },
  {
    id: 'a3',
    title: 'Policies near enrolment window end',
    detail: '5 policies have less than 5 days left for enrolment.',
    severity: 'low' as const,
    ctaLabel: 'View policies',
    href: '/policies/policy-list',
  },
] as const

export const uploadHealthStats = {
  successRate: 92.4,
  failureRate: 7.6,
  totalProcessed: 184,
  failedFiles: 14,
  avgProcessingMins: 11,
  failureReasons: [
    { reason: 'Member ID mismatch', count: 6 },
    { reason: 'Invalid date format', count: 4 },
    { reason: 'Duplicate employee rows', count: 3 },
    { reason: 'Missing policy mapping', count: 1 },
  ],
} as const

export const endorsementFunnel = [
  { stage: 'Requested', count: 86, tone: 'sky' as const },
  { stage: 'Processing', count: 41, tone: 'amber' as const },
  { stage: 'Completed', count: 33, tone: 'emerald' as const },
  { stage: 'Rejected', count: 12, tone: 'rose' as const },
] as const

export const slaTrackerItems = [
  {
    id: 's1',
    metric: 'Endorsement TAT',
    withinSla: 74,
    atRisk: 11,
    breached: 7,
  },
  {
    id: 's2',
    metric: 'Claim Doc Approval',
    withinSla: 61,
    atRisk: 14,
    breached: 5,
  },
  {
    id: 's3',
    metric: 'Member Verification',
    withinSla: 88,
    atRisk: 9,
    breached: 3,
  },
] as const

export const topBlockers = [
  {
    id: 'b1',
    employer: 'Tata Capital Housing Finance',
    issue: 'Repeated upload validation failures',
    impact: '6 failed files',
    priority: 'P1' as const,
    href: '/modules/endorsement',
  },
  {
    id: 'b2',
    employer: 'Tata Motors Limited',
    issue: 'Pending endorsement approvals backlog',
    impact: '18 requests',
    priority: 'P1' as const,
    href: '/modules/employer-endorsement-queue',
  },
  {
    id: 'b3',
    employer: 'TCS Limited',
    issue: 'Member mapping mismatch in uploads',
    impact: '9 rows blocked',
    priority: 'P2' as const,
    href: '/modules/endorsement',
  },
  {
    id: 'b4',
    employer: 'Tata Steel',
    issue: 'Delayed HR onboarding completion',
    impact: '4 employers',
    priority: 'P2' as const,
    href: '/modules/employer',
  },
  {
    id: 'b5',
    employer: 'BigBasket Corporate',
    issue: 'Policy nearing enrolment deadline',
    impact: '3 days left',
    priority: 'P3' as const,
    href: '/policies/policy-list',
  },
] as const
