import { CheckCircle2, X } from 'lucide-react'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'

type SuccessModalProps = {
  open: boolean
  onClose: () => void
}

type Layer = 'idle' | 'entering' | 'visible' | 'leaving'

const DURATION_MS = 320

export function SuccessModal({ open, onClose }: SuccessModalProps) {
  const [layer, setLayer] = useState<Layer>('idle')
  const leavingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearLeavingTimer = () => {
    if (leavingTimer.current) {
      clearTimeout(leavingTimer.current)
      leavingTimer.current = null
    }
  }

  useEffect(() => {
    if (!open) return
    clearLeavingTimer()
    setLayer('entering')
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setLayer('visible'))
    })
    return () => cancelAnimationFrame(id)
  }, [open])

  const finishClose = useCallback(() => {
    if (layer === 'idle' || layer === 'leaving') return
    clearLeavingTimer()
    setLayer('leaving')
    leavingTimer.current = setTimeout(() => {
      leavingTimer.current = null
      setLayer('idle')
      onClose()
    }, DURATION_MS)
  }, [layer, onClose])

  useEffect(() => {
    if (layer === 'idle') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [layer])

  useEffect(() => {
    if (layer !== 'visible' && layer !== 'entering') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finishClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [layer, finishClose])

  useEffect(() => () => clearLeavingTimer(), [])

  if (!open && layer === 'idle') return null

  const panelIn = layer === 'visible'

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button
        type="button"
        className={clsx(
          'absolute inset-0 bg-slate-900/50 transition-opacity duration-300 ease-out',
          panelIn ? 'opacity-100' : 'opacity-0',
        )}
        aria-label="Close"
        onClick={finishClose}
      />
      <div
        className={clsx(
          'relative z-10 w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-slate-900',
          'transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform',
          panelIn
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-3 scale-[0.96] opacity-0',
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
      >
        <button
          type="button"
          onClick={finishClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center text-center">
          <span
            className={clsx(
              'flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600',
              'transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
              panelIn ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
            )}
            style={{
              transitionDelay: panelIn ? '70ms' : '0ms',
            }}
          >
            <CheckCircle2 className="h-9 w-9" strokeWidth={1.75} />
          </span>
          <h2
            id="success-title"
            className={clsx(
              'mt-5 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100',
              'transition-[opacity,transform] duration-300 ease-out',
              panelIn ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
            )}
            style={{ transitionDelay: panelIn ? '110ms' : '0ms' }}
          >
            Your policy is created successfully
          </h2>
          <p
            className={clsx(
              'mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400',
              'transition-[opacity,transform] duration-300 ease-out',
              panelIn ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
            )}
            style={{ transitionDelay: panelIn ? '150ms' : '0ms' }}
          >
            You can return to the dashboard or create another policy when ready.
          </p>
          <button
            type="button"
            onClick={finishClose}
            className={clsx(
              'mt-8 rounded-full bg-[#00338d] px-8 py-2.5 text-sm font-semibold text-white',
              'shadow-md shadow-[#00338d]/25 transition-colors hover:bg-[#002a73]',
              'transition-[opacity,transform] duration-300 ease-out',
              panelIn ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
            )}
            style={{ transitionDelay: panelIn ? '190ms' : '0ms' }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
