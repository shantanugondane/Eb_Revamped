import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { useEffect, useId, useRef, useState } from 'react'
import {
  selectHeaderCompact,
  selectSizeFloating,
  selectSizeMd,
  selectSurface,
} from './selectStyle'

export type SelectOption = { value: string; label: string }

type CustomSelectProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  size?: 'md' | 'floating' | 'header'
  className?: string
  'aria-labelledby'?: string
}

export function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder = 'Select…',
  disabled,
  size = 'md',
  className,
  'aria-labelledby': ariaLabelledBy,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? placeholder

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [open])

  const sizeClass =
    size === 'floating'
      ? selectSizeFloating
      : size === 'header'
        ? 'h-8 min-h-8 py-0 pl-1 pr-7 text-xs font-semibold leading-tight'
        : selectSizeMd

  const triggerClass =
    size === 'header'
      ? clsx(selectHeaderCompact, 'flex w-full max-w-[8rem] items-center justify-between gap-1')
      : clsx(
          selectSurface,
          sizeClass,
          'flex w-full items-center justify-between gap-2 text-left',
        )

  return (
    <div ref={rootRef} className={clsx('relative w-full min-w-0', className)}>
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={ariaLabelledBy}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={clsx(
          triggerClass,
          open &&
            size !== 'header' &&
            'border-[#00338d] shadow-md ring-[3px] ring-[#00338d]/16',
          open &&
            size === 'header' &&
            'border-slate-200 bg-white/90 dark:border-slate-600 dark:bg-slate-800/90',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00338d]/40',
        )}
      >
        <span
          className={clsx(
            'min-w-0 flex-1 truncate',
            (value === '' || !options.some((o) => o.value === value)) &&
              size !== 'header' &&
              'text-slate-400 dark:text-slate-500',
          )}
        >
          {selectedLabel}
        </span>
        <ChevronDown
          className={clsx(
            'shrink-0 text-slate-400 transition-transform duration-200',
            open && 'rotate-180 text-[#00338d]',
            size === 'header' ? 'h-3 w-3' : 'h-4 w-4',
          )}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          tabIndex={-1}
          className="absolute left-0 right-0 top-[calc(100%+4px)] z-[250] max-h-60 overflow-auto rounded-xl border border-slate-200/95 bg-white py-1.5 shadow-[0_12px_48px_-8px_rgb(15_23_42/0.28)] ring-1 ring-slate-200/60 dark:border-slate-600 dark:bg-slate-800 dark:ring-slate-600/60 dark:shadow-[0_12px_48px_-8px_rgb(0_0_0/0.5)]"
        >
          {options.map((opt, i) => (
            <li key={`${opt.value}-${i}`} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === opt.value}
                className={clsx(
                  'mx-1 flex w-[calc(100%-0.5rem)] items-center rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                  value === opt.value
                    ? 'bg-[#00338d] font-medium text-white shadow-sm'
                    : 'text-slate-700 hover:bg-sky-50 hover:text-[#00338d] dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-sky-300',
                )}
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
