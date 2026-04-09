import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { PolicyStepper } from './PolicyStepper'
import { Step1BasicDetails } from './steps/Step1BasicDetails'
import { Step2FamilyConstruct } from './steps/Step2FamilyConstruct'
import { Step3PolicyRates } from './steps/Step3PolicyRates'
import { Step4ContactDetails } from './steps/Step4ContactDetails'
import { Step5ClaimDocuments } from './steps/Step5ClaimDocuments'
import { SuccessModal } from './SuccessModal'

export function CreatePolicyPage() {
  const [step, setStep] = useState(1)
  const [successOpen, setSuccessOpen] = useState(false)

  const progressPct = Math.round((step / 5) * 100)

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 px-3 py-6 sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800"
          aria-label="Back to dashboard"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            Policies
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Create policy
          </h1>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:items-start">
        <PolicyStepper currentStep={step} onStepChange={setStep} />

        <div className="min-w-0 flex-1 space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900 sm:p-8">
            {step === 1 && <Step1BasicDetails />}
            {step === 2 && <Step2FamilyConstruct />}
            {step === 3 && <Step3PolicyRates />}
            {step === 4 && <Step4ContactDetails />}
            {step === 5 && <Step5ClaimDocuments />}
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 transition-[width] duration-500 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                {progressPct}% of workflow completed
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                disabled={step <= 1}
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Previous
              </button>
              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(5, s + 1))}
                  className="rounded-full bg-[#00338d] px-8 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#00338d]/25 transition hover:bg-[#002a73]"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSuccessOpen(true)}
                  className="rounded-full bg-[#00338d] px-8 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#00338d]/25 transition hover:bg-[#002a73]"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </main>
  )
}
