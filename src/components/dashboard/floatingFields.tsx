import { Calendar } from 'lucide-react'
import clsx from 'clsx'
import { CustomSelect, type SelectOption } from '../ui/CustomSelect'
import { dateInputSurface, dateSizeFloating } from '../ui/selectStyle'

export function FloatingSelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  options: SelectOption[]
}) {
  return (
    <div className="relative pt-1">
      <label
        id={`${id}-label`}
        htmlFor={id}
        className="absolute left-3 top-0 z-10 bg-white px-1 text-[11px] font-semibold text-slate-500 dark:bg-slate-900 dark:text-slate-400"
      >
        {label}
      </label>
      <CustomSelect
        id={id}
        value={value}
        onChange={onChange}
        options={options}
        size="floating"
        aria-labelledby={`${id}-label`}
      />
    </div>
  )
}

export function FloatingDateField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="relative pt-1">
      <label
        htmlFor={id}
        className="absolute left-3 top-0 z-10 bg-white px-1 text-[11px] font-semibold text-slate-500 dark:bg-slate-900 dark:text-slate-400"
      >
        {label}
      </label>
      <div className="group relative">
        <input
          id={id}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={clsx(dateInputSurface, dateSizeFloating)}
        />
        <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00338d]/50 transition-colors group-focus-within:text-[#00338d]" />
      </div>
    </div>
  )
}
