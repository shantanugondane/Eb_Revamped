import { useState } from 'react'
import { CheckCircle2, Paperclip, Upload } from 'lucide-react'

type ToggleProps = {
  enabled: boolean
  onChange: (next: boolean) => void
}

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        enabled ? 'bg-emerald-400' : 'bg-rose-400'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
          enabled ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

function InputField({
  label,
  placeholder,
}: {
  label: string
  placeholder: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#00338d] focus:ring-2 focus:ring-[#00338d]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      />
    </label>
  )
}

export function OnboardEmployerPage() {
  const [statusEnabled, setStatusEnabled] = useState(true)
  const [triggerEmail, setTriggerEmail] = useState(false)

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-5 px-3 py-6 sm:px-6">
      <section className="rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            OnBoard Employer
          </h1>
        </div>

        <div className="space-y-6 px-4 py-4 sm:px-5 sm:py-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <InputField label="Employer Name *" placeholder="Enter Employer Name" />
            <InputField label="Email *" placeholder="Enter Employer Email" />
            <InputField label="Mobile No. *" placeholder="Enter Employer Mobile No." />
            <InputField label="Landline No." placeholder="Enter Employer Landline No." />
            <InputField label="Employer Code" placeholder="Enter Employer Code" />

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">
                Status *
              </span>
              <Toggle enabled={statusEnabled} onChange={setStatusEnabled} />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">
                Trigger Onboard Email *
              </span>
              <Toggle enabled={triggerEmail} onChange={setTriggerEmail} />
            </label>

            <InputField label="Employer GST No." placeholder="Enter Employer GST No." />
            <InputField label="Employer PAN No." placeholder="Enter Employer PAN No." />
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <InputField label="Customer Type *" placeholder="Select Customer Type" />
            <InputField label="Company Type *" placeholder="Select Company Type" />
            <InputField label="ID Proof Type *" placeholder="Select ID Proof Type" />
            <InputField label="ID Proof Detail *" placeholder="Enter ID Proof Detail" />
            <InputField label="GSTN Effective Date" placeholder="dd-mm-yyyy" />
            <InputField label="Business Category *" placeholder="Select Business Category" />
          </div>

          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Is Concurrent Login Config?
            </p>
            <div className="mt-3 flex items-center gap-8">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="radio" name="concurrentLogin" defaultChecked />
                <span>No</span>
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="radio" name="concurrentLogin" />
                <span>Yes</span>
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <p className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Onboard employer user (HR) ?
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <InputField label="HR User Name *" placeholder="Enter HR User Name" />
              <InputField label="HR Email *" placeholder="Enter HR User Email" />
              <InputField label="HR Mobile No *" placeholder="Enter HR User Mobile No" />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lime-200 text-slate-700">
                <Paperclip className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Attach Logo
                </p>
                <p className="text-xs text-rose-500">file formats jpg, jpeg, png</p>
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
              <Upload className="h-4 w-4" />
              <span>Attached File - No File Chosen</span>
              <input type="file" accept=".jpg,.jpeg,.png" className="hidden" />
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <InputField label="Address 1 *" placeholder="Enter Employer Address" />
            <InputField label="Address 2 *" placeholder="Enter Employer Address" />
            <InputField label="Country *" placeholder="Select Country" />
            <InputField label="Pincode *" placeholder="Enter Employer Pincode" />
            <InputField label="State *" placeholder="Select State" />
            <InputField label="City *" placeholder="Select City" />
          </div>
        </div>
      </section>
    </main>
  )
}
