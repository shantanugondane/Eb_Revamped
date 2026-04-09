import { X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { FloatingSelectField } from './floatingFields'

type LiveCashlessClaimsFilterModalProps = {
  open: boolean
  onClose: () => void
}

export function LiveCashlessClaimsFilterModal({
  open,
  onClose,
}: LiveCashlessClaimsFilterModalProps) {
  const titleId = useId()
  const [tpa, setTpa] = useState('')
  const [insurer, setInsurer] = useState('')
  const [employer, setEmployer] = useState('')
  const [coverType, setCoverType] = useState('')
  const [policyName, setPolicyName] = useState('')

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const handleReset = () => {
    setTpa('')
    setInsurer('')
    setEmployer('')
    setCoverType('')
    setPolicyName('')
  }

  const handleFilter = () => {
    onClose()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-900/45 p-4 pt-16 sm:items-center sm:pt-4"
      role="presentation"
    >
      <button
        type="button"
        className="fixed inset-0 z-0 cursor-default"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-200/80 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="flex items-start justify-between gap-4 border-b border-dashed border-slate-200 px-6 py-4 dark:border-slate-700">
          <h2
            id={titleId}
            className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100"
          >
            Live Cashless Claims Filter
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50"
            aria-label="Close live cashless claims filter"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <form
          className="space-y-4 px-6 py-5"
          onSubmit={(e) => {
            e.preventDefault()
            handleFilter()
          }}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <FloatingSelectField
              id="lcc-tpa"
              label="TPA"
              value={tpa}
              onChange={setTpa}
              options={[
                { value: '', label: 'Select TPA' },
                { value: 'tpa1', label: 'Sample TPA A' },
                { value: 'tpa2', label: 'Sample TPA B' },
              ]}
            />
            <FloatingSelectField
              id="lcc-insurer"
              label="Insurer"
              value={insurer}
              onChange={setInsurer}
              options={[
                { value: '', label: 'Select Insurer' },
                { value: 'tata', label: 'TATA AIG' },
              ]}
            />
            <FloatingSelectField
              id="lcc-employer"
              label="Employer"
              value={employer}
              onChange={setEmployer}
              options={[
                { value: '', label: 'Select Employer' },
                { value: 'tc', label: 'Tata Capital' },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FloatingSelectField
              id="lcc-cover"
              label="Cover Type"
              value={coverType}
              onChange={setCoverType}
              options={[
                { value: '', label: 'All Cover Type' },
                { value: 'ghi', label: 'GHI Corporate Floater' },
                { value: 'top', label: 'Super Top-up' },
              ]}
            />
            <FloatingSelectField
              id="lcc-policy"
              label="Policy Name"
              value={policyName}
              onChange={setPolicyName}
              options={[
                { value: '', label: 'Policy Name' },
                { value: 'p1', label: 'POL-77821/24' },
              ]}
            />
          </div>

          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full bg-cyan-400 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-500"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#00338d] px-8 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#00338d]/25 transition hover:bg-[#002a73]"
            >
              Filter
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
