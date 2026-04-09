import { useId, useState } from 'react'
import { CustomSelect } from '../../../components/ui/CustomSelect'
import { SectionCard, TextField, ToggleRow } from '../FormBits'

function ContactBlock({ title }: { title: string }) {
  const base = useId().replace(/:/g, '')
  const [role, setRole] = useState('')
  const [level, setLevel] = useState('')

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/30 p-4">
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-3">
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Role / designation type
          </span>
          <CustomSelect
            id={`${base}-role`}
            value={role}
            onChange={setRole}
            options={[
              { value: '', label: 'Enter role / designation type' },
              { value: 'mgr', label: 'Manager' },
            ]}
          />
        </div>
        <TextField
          id={`${base}-email`}
          label="Email id"
          placeholder="Enter email"
        />
        <TextField
          id={`${base}-name`}
          label="Name"
          placeholder="Enter name"
        />
        <TextField
          id={`${base}-mob`}
          label="Mobile no."
          placeholder="Enter mobile"
        />
        <div>
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Level
          </span>
          <CustomSelect
            id={`${base}-level`}
            value={level}
            onChange={setLevel}
            options={[
              { value: '', label: 'Select level' },
              { value: 'l1', label: 'Level 1' },
            ]}
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <ToggleRow label="Applicable for employee" />
            <ToggleRow label="Is sales executive" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600"
        >
          + Add
        </button>
      </div>
    </div>
  )
}

export function Step4ContactDetails() {
  return (
    <div className="space-y-8">
      <SectionCard title="Contact details">
        <p className="mb-6 text-sm text-slate-600">
          Add contacts for insurer and employer organizations.
        </p>
        <div className="space-y-8">
          <ContactBlock title="Insurer organization" />
          <ContactBlock title="Employer organization" />
        </div>
      </SectionCard>
    </div>
  )
}
