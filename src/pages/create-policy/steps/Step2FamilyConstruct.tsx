import { useCallback, useId, useState } from 'react'
import clsx from 'clsx'
import { Minus, Plus } from 'lucide-react'
import { CustomSelect, type SelectOption } from '../../../components/ui/CustomSelect'
import { textInputMd } from '../../../components/ui/selectStyle'
import { FieldLabel, SectionCard } from '../FormBits'

const MEMBER_TYPE_OPTIONS: SelectOption[] = [
  { value: 'self', label: 'Self' },
  { value: 'spouse', label: 'Spouse' },
  { value: 'children', label: 'Children' },
  { value: 'parents', label: 'Parents' },
  { value: 'parents_in_law', label: 'Parents in law' },
  { value: 'partner', label: 'Partner' },
  { value: 'siblings', label: 'Siblings (Brother & Sister)' },
  { value: 'grand_father', label: 'Grand Father' },
  { value: 'grand_mother', label: 'Grand Mother' },
  { value: 'uncle', label: 'Uncle' },
  { value: 'aunt', label: 'Aunt' },
  { value: 'nephew', label: 'Nephew' },
]

const WAITING_UNIT_OPTIONS: SelectOption[] = [
  { value: '', label: 'Waiting period unit' },
  { value: 'days', label: 'Days' },
  { value: 'months', label: 'Months' },
]

const PRORATA_OPTIONS: SelectOption[] = [
  { value: '', label: 'Select prorata type' },
  { value: 'daily', label: 'Daily Basis' },
  { value: 'monthly', label: 'Monthly Basis' },
]

const CHILDREN_DEPEND_OPTIONS: SelectOption[] = [
  { value: '', label: 'Select' },
  { value: 'self', label: 'Self' },
  { value: 'spouse', label: 'Spouse' },
]

export type RelationRowState = {
  id: string
  memberType: string
  noAgeLimit: boolean
  minYear: string
  minMonth: string
  maxYear: string
  maxMonth: string
  waitingPeriod: string
  waitingUnit: string
  deductibleSi: string
  prorataType: string
  employerPayInitial: boolean
  employeePayDiff: boolean
  marriageCertMandatory: boolean
  childrenAgeDepend: string
  ageDifference: string
  birthCertMandatory: boolean
}

function newRow(overrides: Partial<RelationRowState> = {}): RelationRowState {
  return {
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `row-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    memberType: 'spouse',
    noAgeLimit: false,
    minYear: '',
    minMonth: '',
    maxYear: '',
    maxMonth: '',
    waitingPeriod: '',
    waitingUnit: '',
    deductibleSi: '',
    prorataType: 'daily',
    employerPayInitial: false,
    employeePayDiff: false,
    marriageCertMandatory: false,
    childrenAgeDepend: 'self',
    ageDifference: '18',
    birthCertMandatory: false,
    ...overrides,
  }
}

function PremiumToggle({
  label,
  required,
  checked,
  onChange,
  id,
}: {
  label: string
  required?: boolean
  checked: boolean
  onChange: (next: boolean) => void
  id: string
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2.5 transition hover:border-slate-200"
    >
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <span className="relative inline-flex h-7 w-12 shrink-0 items-center">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="absolute inset-0 rounded-full bg-slate-300 transition-colors peer-checked:bg-rose-500 peer-focus-visible:ring-2 peer-focus-visible:ring-[#00338d]/35" />
        <span className="pointer-events-none absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform peer-checked:translate-x-[1.35rem]" />
      </span>
    </label>
  )
}

function DocToggleRow({
  label,
  checked,
  onChange,
  id,
}: {
  label: string
  checked: boolean
  onChange: (next: boolean) => void
  id: string
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5"
    >
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-[#00338d]/30"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm font-medium text-slate-800">{label}</span>
    </label>
  )
}

function AgeBandBox({
  title,
  yearRequired,
  yearId,
  monthId,
  yearValue,
  monthValue,
  onYear,
  onMonth,
}: {
  title: string
  yearRequired?: boolean
  yearId: string
  monthId: string
  yearValue: string
  monthValue: string
  onYear: (v: string) => void
  onMonth: (v: string) => void
}) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-dashed border-sky-200/90 bg-sky-50/40 p-4',
        'shadow-[inset_0_1px_0_rgb(255_255_255/0.9)]',
      )}
    >
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <label className="block" htmlFor={yearId}>
          <FieldLabel required={yearRequired}>Year</FieldLabel>
          <input
            id={yearId}
            type="text"
            inputMode="numeric"
            placeholder="ex 40"
            value={yearValue}
            onChange={(e) => onYear(e.target.value)}
            className={textInputMd}
          />
        </label>
        <label className="block" htmlFor={monthId}>
          <FieldLabel>Month</FieldLabel>
          <input
            id={monthId}
            type="text"
            inputMode="numeric"
            placeholder="ex 12"
            value={monthValue}
            onChange={(e) => onMonth(e.target.value)}
            className={textInputMd}
          />
        </label>
      </div>
    </div>
  )
}

export function Step2FamilyConstruct() {
  const baseId = useId()
  const [endorsementMembers, setEndorsementMembers] = useState('5')
  const [employeeIncluded, setEmployeeIncluded] = useState<'yes' | 'no'>('yes')
  const [rows, setRows] = useState<RelationRowState[]>(() => [
    newRow({
      memberType: 'self',
      noAgeLimit: true,
      prorataType: 'daily',
      employerPayInitial: false,
      employeePayDiff: false,
    }),
  ])
  const [nomineeLimit, setNomineeLimit] = useState('')
  const [spouseLimit, setSpouseLimit] = useState('')
  const [childLimit, setChildLimit] = useState('')

  const updateRow = useCallback(
    (id: string, patch: Partial<RelationRowState>) => {
      setRows((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...patch } : r)),
      )
    },
    [],
  )

  const addRow = () => {
    setRows((prev) => [...prev, newRow()])
  }

  const removeRow = (id: string) => {
    setRows((prev) => (prev.length <= 1 ? prev : prev.filter((r) => r.id !== id)))
  }

  const hasSpouse = rows.some((r) => r.memberType === 'spouse')
  const hasChildren = rows.some((r) => r.memberType === 'children')

  return (
    <div className="space-y-8">
      <SectionCard title="Family definition & relation (age limit)">
        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <FieldLabel required>No. of members allowed in endorsement</FieldLabel>
            <input
              type="number"
              min={0}
              value={endorsementMembers}
              onChange={(e) => setEndorsementMembers(e.target.value)}
              className={textInputMd}
              aria-label="Number of members allowed in endorsement"
            />
          </div>
          <div className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50/80 to-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Employee included</p>
            <div className="mt-4 flex flex-wrap gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-800">
                <input
                  type="radio"
                  name={`${baseId}-emp`}
                  checked={employeeIncluded === 'yes'}
                  onChange={() => setEmployeeIncluded('yes')}
                  className="text-[#00338d]"
                />
                Yes
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-800">
                <input
                  type="radio"
                  name={`${baseId}-emp`}
                  checked={employeeIncluded === 'no'}
                  onChange={() => setEmployeeIncluded('no')}
                  className="text-[#00338d]"
                />
                No
              </label>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Allowed relation in policy">
        <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
          <span
            className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#00338d]"
            aria-hidden
          />
          <h4 className="text-sm font-semibold text-slate-900">
            Configure each member type — add rows for Self, Spouse, Children, etc.
          </h4>
        </div>

        <div className="space-y-10">
          {rows.map((row, index) => {
            const p = `${row.id}`
            const isSpouse = row.memberType === 'spouse'
            const isChildren = row.memberType === 'children'
            const showAgeBoxes = !row.noAgeLimit

            return (
              <div
                key={row.id}
                className="relative rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/40 p-5 shadow-sm"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Relation {index + 1}
                  </p>
                  {rows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#ff8a80] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e57368] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400/50"
                    >
                      <Minus className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div>
                    <FieldLabel required>Member type</FieldLabel>
                    <CustomSelect
                      id={`${p}-member`}
                      value={row.memberType}
                      onChange={(v) => updateRow(row.id, { memberType: v })}
                      options={MEMBER_TYPE_OPTIONS}
                      placeholder="Select member type"
                    />
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 self-end pb-2 lg:pb-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-[#00338d]/30"
                      checked={row.noAgeLimit}
                      onChange={(e) =>
                        updateRow(row.id, { noAgeLimit: e.target.checked })
                      }
                    />
                    <span className="text-sm font-medium text-slate-800">
                      No age limit
                    </span>
                  </label>
                </div>

                {showAgeBoxes && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <AgeBandBox
                      title="Min age"
                      yearRequired
                      yearId={`${p}-min-y`}
                      monthId={`${p}-min-m`}
                      yearValue={row.minYear}
                      monthValue={row.minMonth}
                      onYear={(v) => updateRow(row.id, { minYear: v })}
                      onMonth={(v) => updateRow(row.id, { minMonth: v })}
                    />
                    <AgeBandBox
                      title="Max age"
                      yearRequired
                      yearId={`${p}-max-y`}
                      monthId={`${p}-max-m`}
                      yearValue={row.maxYear}
                      monthValue={row.maxMonth}
                      onYear={(v) => updateRow(row.id, { maxYear: v })}
                      onMonth={(v) => updateRow(row.id, { maxMonth: v })}
                    />
                  </div>
                )}

                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  <div>
                    <FieldLabel>Waiting period</FieldLabel>
                    <input
                      type="text"
                      placeholder="Enter waiting period"
                      value={row.waitingPeriod}
                      onChange={(e) =>
                        updateRow(row.id, { waitingPeriod: e.target.value })
                      }
                      className={textInputMd}
                      aria-label="Waiting period"
                    />
                  </div>
                  <div>
                    <FieldLabel>Waiting period unit</FieldLabel>
                    <CustomSelect
                      id={`${p}-wu`}
                      value={row.waitingUnit}
                      onChange={(v) => updateRow(row.id, { waitingUnit: v })}
                      options={WAITING_UNIT_OPTIONS}
                      placeholder="Waiting period unit"
                    />
                  </div>
                  <div>
                    <FieldLabel>Deductible SI</FieldLabel>
                    <input
                      type="text"
                      placeholder="Enter deductible SI"
                      value={row.deductibleSi}
                      onChange={(e) =>
                        updateRow(row.id, { deductibleSi: e.target.value })
                      }
                      className={textInputMd}
                      aria-label="Deductible sum insured"
                    />
                  </div>
                </div>

                <div
                  className={clsx(
                    'mt-5 grid gap-5',
                    isChildren ? 'lg:grid-cols-3' : 'sm:grid-cols-2 lg:max-w-xl',
                  )}
                >
                  <div className={isChildren ? '' : 'sm:col-span-2 lg:col-span-1'}>
                    <FieldLabel required>Prorata type</FieldLabel>
                    <CustomSelect
                      id={`${p}-prorata`}
                      value={row.prorataType}
                      onChange={(v) => updateRow(row.id, { prorataType: v })}
                      options={PRORATA_OPTIONS}
                      placeholder="Select prorata type"
                    />
                  </div>
                  {isChildren && (
                    <>
                      <div>
                        <FieldLabel required>Children age depend</FieldLabel>
                        <CustomSelect
                          id={`${p}-dep`}
                          value={row.childrenAgeDepend}
                          onChange={(v) =>
                            updateRow(row.id, { childrenAgeDepend: v })
                          }
                          options={CHILDREN_DEPEND_OPTIONS}
                          placeholder="Select"
                        />
                      </div>
                      <div>
                        <FieldLabel required>Age difference</FieldLabel>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="e.g. 18"
                          value={row.ageDifference}
                          onChange={(e) =>
                            updateRow(row.id, { ageDifference: e.target.value })
                          }
                          className={textInputMd}
                          aria-label="Age difference"
                        />
                      </div>
                    </>
                  )}
                </div>

                {isSpouse && (
                  <div className="mt-5 max-w-md">
                    <DocToggleRow
                      id={`${p}-marriage`}
                      label="Marriage certificate mandatory"
                      checked={row.marriageCertMandatory}
                      onChange={(v) =>
                        updateRow(row.id, { marriageCertMandatory: v })
                      }
                    />
                  </div>
                )}

                {isChildren && (
                  <div className="mt-5 max-w-md">
                    <DocToggleRow
                      id={`${p}-birth`}
                      label="Birth certificate mandatory"
                      checked={row.birthCertMandatory}
                      onChange={(v) =>
                        updateRow(row.id, { birthCertMandatory: v })
                      }
                    />
                  </div>
                )}

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
                  <PremiumToggle
                    id={`${p}-emp-prem`}
                    label="Employer to pay initial premium"
                    required
                    checked={row.employerPayInitial}
                    onChange={(v) => updateRow(row.id, { employerPayInitial: v })}
                  />
                  <PremiumToggle
                    id={`${p}-ee-prem`}
                    label="Employee to pay difference premium"
                    required
                    checked={row.employeePayDiff}
                    onChange={(v) => updateRow(row.id, { employeePayDiff: v })}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={addRow}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#2cb1cf] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#2599b5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00338d]/40"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            Add
          </button>
        </div>

        <div className="mt-10 space-y-5 border-t border-slate-100 pt-8">
          <label className="block max-w-md" htmlFor={`${baseId}-nominee`}>
            <FieldLabel>No. of nominee allowed</FieldLabel>
            <input
              id={`${baseId}-nominee`}
              type="text"
              placeholder="Enter nominee limit"
              value={nomineeLimit}
              onChange={(e) => setNomineeLimit(e.target.value)}
              className={textInputMd}
            />
          </label>
          {hasSpouse && (
            <label className="block max-w-md" htmlFor={`${baseId}-spouse-limit`}>
              <FieldLabel required>No. of spouse</FieldLabel>
              <input
                id={`${baseId}-spouse-limit`}
                type="text"
                placeholder="Enter spouse limit"
                value={spouseLimit}
                onChange={(e) => setSpouseLimit(e.target.value)}
                className={textInputMd}
              />
            </label>
          )}
          {hasChildren && (
            <label className="block max-w-md" htmlFor={`${baseId}-child-limit`}>
              <FieldLabel required>No. of child</FieldLabel>
              <input
                id={`${baseId}-child-limit`}
                type="text"
                placeholder="Enter child limit"
                value={childLimit}
                onChange={(e) => setChildLimit(e.target.value)}
                className={textInputMd}
              />
            </label>
          )}
        </div>
      </SectionCard>
    </div>
  )
}
