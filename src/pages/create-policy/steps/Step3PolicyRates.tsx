import { useCallback, useId, useState, type HTMLAttributes } from 'react'
import clsx from 'clsx'
import { Plus } from 'lucide-react'
import { CustomSelect } from '../../../components/ui/CustomSelect'
import { textInputMd } from '../../../components/ui/selectStyle'
import { numberToWordsInt, parseAmountInput } from '../../../utils/numberToWords'
import { FieldLabel, SectionCard, TextField, ToggleRow } from '../FormBits'

type RateRow = {
  id: string
  sumInsured: string
  premium: string
  premiumTax: string
  premiumTotal: string
}

function newRateRow(overrides: Partial<RateRow> = {}): RateRow {
  return {
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `r-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    sumInsured: '',
    premium: '',
    premiumTax: '',
    premiumTotal: '',
    ...overrides,
  }
}

function AmountCell({
  ariaLabel,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  ariaLabel: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
}) {
  const n = parseAmountInput(value)
  const words =
    n !== null && Number.isFinite(n) ? numberToWordsInt(n) : ''

  return (
    <div className="min-w-0">
      <input
        type="text"
        inputMode={inputMode ?? 'decimal'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={textInputMd}
        aria-label={ariaLabel}
      />
      {words ? (
        <p className="mt-1.5 text-xs font-medium leading-snug text-[#00338d]">
          {words}
        </p>
      ) : (
        <p className="mt-1.5 min-h-[1.125rem]" aria-hidden />
      )}
    </div>
  )
}

export function Step3PolicyRates() {
  const baseId = useId()
  const [coverType, setCoverType] = useState('')
  const [siType, setSiType] = useState('ind')
  const [siBasis, setSiBasis] = useState('flat')
  const [premBasis, setPremBasis] = useState('flat')

  const [genEnabled, setGenEnabled] = useState(false)
  const [genMin, setGenMin] = useState('')
  const [genMax, setGenMax] = useState('')
  const [genInterval, setGenInterval] = useState('')

  const [rateRows, setRateRows] = useState<RateRow[]>(() => [newRateRow()])

  const updateRow = useCallback((id: string, patch: Partial<RateRow>) => {
    setRateRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    )
  }, [])

  const addRateRow = () => {
    setRateRows((prev) => [...prev, newRateRow()])
  }

  const handleGenerateSumInsured = () => {
    if (!genEnabled) return
    const min = parseAmountInput(genMin)
    const max = parseAmountInput(genMax)
    const step = parseAmountInput(genInterval)
    if (
      min === null ||
      max === null ||
      step === null ||
      step <= 0 ||
      min > max
    ) {
      return
    }
    const next: RateRow[] = []
    const maxRows = 500
    for (let i = 0; i < maxRows; i++) {
      const v = min + i * step
      if (v > max + 1e-9) break
      const s = Number.isInteger(v) ? String(v) : String(v)
      next.push(
        newRateRow({
          sumInsured: s,
          premium: '',
          premiumTax: '',
          premiumTotal: '',
        }),
      )
    }
    if (next.length === 0) return
    setRateRows(next)
  }

  const genDisabled = !genEnabled

  return (
    <div className="space-y-8">
      <SectionCard title="Sum insured & premium">
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <FieldLabel required>Cover type</FieldLabel>
            <CustomSelect
              id="coverType"
              value={coverType}
              onChange={setCoverType}
              options={[
                { value: '', label: 'Select cover type' },
                { value: 'floater', label: 'Floater' },
              ]}
            />
          </div>
          <div>
            <FieldLabel required>Sum insured type</FieldLabel>
            <CustomSelect
              id="siType"
              value={siType}
              onChange={setSiType}
              options={[
                { value: 'ind', label: 'Individual' },
                { value: 'fam', label: 'Family' },
              ]}
            />
          </div>
          <div>
            <FieldLabel required>Sum insured basis</FieldLabel>
            <CustomSelect
              id="siBasis"
              value={siBasis}
              onChange={setSiBasis}
              options={[
                { value: 'flat', label: 'Flat' },
                { value: 'graded', label: 'Graded' },
              ]}
            />
          </div>
          <div>
            <FieldLabel required>Premium basis</FieldLabel>
            <CustomSelect
              id="premBasis"
              value={premBasis}
              onChange={setPremBasis}
              options={[
                { value: 'flat', label: 'Flat' },
                { value: 'age', label: 'Age based' },
              ]}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50/50 p-2 dark:border-slate-700 dark:bg-slate-900/50">
          <button
            type="button"
            className="rounded-full bg-[#00338d] px-5 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Contribution for all
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            Additional premium
          </button>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Contribution
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <TextField
              id="empPct"
              label="Employer %"
              placeholder="e.g. 100"
              defaultValue="100"
            />
            <TextField
              id="emplPct"
              label="Employee %"
              placeholder="e.g. 0"
              defaultValue="0"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-sm font-medium text-slate-700">Flex</p>
            <ToggleRow label="Use flex" />
          </div>
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-sm font-medium text-slate-700">Payroll</p>
            <ToggleRow label="Use payroll" />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Generate sum insured (optional)"
        titleClassName="border-slate-200/80 text-[#00338d]"
      >
        <div
          className={clsx(
            'rounded-xl border border-dashed border-slate-300 bg-slate-50/40 p-5 dark:border-slate-600 dark:bg-slate-900/40',
            'shadow-[inset_0_1px_0_rgb(255_255_255/0.9)]',
          )}
        >
          <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-800">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-[#00338d] focus:ring-[#00338d]/30"
              checked={genEnabled}
              onChange={(e) => setGenEnabled(e.target.checked)}
            />
            Generate sum insured
          </label>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div>
              <FieldLabel required={genEnabled}>Minimum sum insured</FieldLabel>
              <input
                type="text"
                inputMode="decimal"
                placeholder="Min"
                value={genMin}
                disabled={genDisabled}
                onChange={(e) => setGenMin(e.target.value)}
                className={clsx(textInputMd, genDisabled && 'opacity-50')}
                aria-label="Minimum sum insured"
              />
            </div>
            <div>
              <FieldLabel required={genEnabled}>Maximum sum insured</FieldLabel>
              <input
                type="text"
                inputMode="decimal"
                placeholder="Max"
                value={genMax}
                disabled={genDisabled}
                onChange={(e) => setGenMax(e.target.value)}
                className={clsx(textInputMd, genDisabled && 'opacity-50')}
                aria-label="Maximum sum insured"
              />
            </div>
            <div>
              <FieldLabel required={genEnabled}>Interval</FieldLabel>
              <input
                type="text"
                inputMode="decimal"
                placeholder="Interval"
                value={genInterval}
                disabled={genDisabled}
                onChange={(e) => setGenInterval(e.target.value)}
                className={clsx(textInputMd, genDisabled && 'opacity-50')}
                aria-label="Interval between min and max sum insured"
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleGenerateSumInsured}
              disabled={genDisabled}
              className={clsx(
                'rounded-full bg-[#00338d] px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition',
                'hover:bg-[#002a73] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00338d]/40',
                genDisabled && 'cursor-not-allowed opacity-50',
              )}
            >
              Generate
            </button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Premium rates">
        <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
          <span
            className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#00338d]"
            aria-hidden
          />
          <h4 className="text-sm font-semibold text-slate-900">
            Enter or generate sum insured rows, then fill premium columns
          </h4>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200/90 bg-white dark:border-slate-700 dark:bg-slate-900">
          <div className="min-w-[720px]">
            <div
              className="grid gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/80"
              style={{
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Sum insured <span className="text-red-500">*</span>
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Premium <span className="text-red-500">*</span>
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Premium tax <span className="text-red-500">*</span>
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Premium total <span className="text-red-500">*</span>
              </span>
            </div>

            <div className="divide-y divide-slate-100 px-4 py-2 dark:divide-slate-800">
              {rateRows.map((row, i) => (
                <div
                  key={row.id}
                  className="grid gap-4 py-4"
                  style={{
                    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                  }}
                >
                  <AmountCell
                    ariaLabel={`Sum insured, row ${i + 1}`}
                    placeholder="Enter sum insured"
                    value={row.sumInsured}
                    onChange={(v) => updateRow(row.id, { sumInsured: v })}
                  />
                  <AmountCell
                    ariaLabel={`Premium, row ${i + 1}`}
                    placeholder="Enter premium"
                    value={row.premium}
                    onChange={(v) => updateRow(row.id, { premium: v })}
                  />
                  <AmountCell
                    ariaLabel={`Premium tax, row ${i + 1}`}
                    placeholder="Enter premium tax"
                    value={row.premiumTax}
                    onChange={(v) => updateRow(row.id, { premiumTax: v })}
                  />
                  <AmountCell
                    ariaLabel={`Premium total, row ${i + 1}`}
                    placeholder="Enter premium total"
                    value={row.premiumTotal}
                    onChange={(v) => updateRow(row.id, { premiumTotal: v })}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={addRateRow}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500/50"
            aria-label="Add rate row"
          >
            <Plus className="h-6 w-6" strokeWidth={2.5} />
          </button>
        </div>

        <p
          className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400"
          id={`${baseId}-hint`}
        >
          Amounts show in words below each field (e.g. 20000 → Twenty Thousand).
        </p>
      </SectionCard>
    </div>
  )
}
