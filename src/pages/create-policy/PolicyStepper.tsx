import clsx from 'clsx'
import { POLICY_WIZARD_STEPS } from './policySteps'

type PolicyStepperProps = {
  currentStep: number
  onStepChange: (step: number) => void
}

export function PolicyStepper({
  currentStep,
  onStepChange,
}: PolicyStepperProps) {
  return (
    <nav
      className="w-full shrink-0 lg:w-72"
      aria-label="Policy creation steps"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-b from-[#00338d] to-[#001f52] p-4 shadow-lg shadow-[#00338d]/20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
          Steps
        </p>
        <p className="mt-1 text-sm font-medium text-white/90">
          Create policy workflow
        </p>
        <ol className="mt-5 space-y-2">
          {POLICY_WIZARD_STEPS.map(({ id, shortTitle, description, Icon }) => {
            const active = currentStep === id
            const done = currentStep > id
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onStepChange(id)}
                  className={clsx(
                    'flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-all',
                    active &&
                      'bg-white text-[#00338d] shadow-md shadow-slate-900/15 ring-2 ring-white/80',
                    !active &&
                      !done &&
                      'bg-white/5 text-white/85 hover:bg-white/10',
                    done && !active && 'bg-emerald-500/15 text-emerald-50 hover:bg-emerald-500/25',
                  )}
                >
                  <span
                    className={clsx(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-[0] transition-colors',
                      active &&
                        'border-[#00338d] bg-sky-50 text-[#00338d]',
                      done &&
                        !active &&
                        'border-emerald-300/50 bg-emerald-500/20 text-emerald-100',
                      !active &&
                        !done &&
                        'border-white/25 bg-white/10 text-white',
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-current/80">
                      Step {id}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold leading-snug">
                      {shortTitle}
                    </span>
                    <span
                      className={clsx(
                        'mt-1 block text-[11px] leading-relaxed',
                        active ? 'text-slate-500' : 'text-current/70',
                      )}
                    >
                      {description}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
