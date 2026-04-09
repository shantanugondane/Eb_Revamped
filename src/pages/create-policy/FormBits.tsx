import type { ReactNode } from 'react'
import clsx from 'clsx'
import { textInputMd } from '../../components/ui/selectStyle'

export function FieldLabel({
  children,
  required,
}: {
  children: ReactNode
  required?: boolean
}) {
  return (
    <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {children}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </span>
  )
}

export function TextField({
  id,
  label,
  required,
  placeholder,
  defaultValue,
  type = 'text',
}: {
  id: string
  label: string
  required?: boolean
  placeholder?: string
  defaultValue?: string
  type?: string
}) {
  return (
    <label className="block" htmlFor={id}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={textInputMd}
      />
    </label>
  )
}

export function ToggleRow({
  label,
  required,
  defaultChecked,
}: {
  label: string
  required?: boolean
  defaultChecked?: boolean
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2.5 transition hover:border-slate-200 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <ToggleSwitch defaultChecked={defaultChecked} />
    </label>
  )
}

export function ToggleSwitch({
  defaultChecked,
}: {
  defaultChecked?: boolean
}) {
  return (
    <span className="relative inline-flex h-7 w-12 shrink-0 items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        defaultChecked={defaultChecked}
      />
      <span className="absolute inset-0 rounded-full bg-slate-300 transition-colors peer-checked:bg-emerald-500 peer-focus-visible:ring-2 peer-focus-visible:ring-[#00338d]/35" />
      <span className="absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform peer-checked:translate-x-[1.35rem]" />
    </span>
  )
}

export function SectionCard({
  title,
  titleClassName,
  children,
}: {
  title: string
  titleClassName?: string
  children: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm dark:border-slate-700/80 dark:bg-slate-900/80">
      <h3
        className={clsx(
          'border-b border-slate-100 pb-3 text-base font-semibold text-slate-900 dark:border-slate-800 dark:text-slate-100',
          titleClassName,
        )}
      >
        {title}
      </h3>
      <div className="pt-5">{children}</div>
    </section>
  )
}
