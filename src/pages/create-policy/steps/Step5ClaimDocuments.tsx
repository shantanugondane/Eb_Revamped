import { useState } from 'react'
import { Paperclip } from 'lucide-react'
import { CustomSelect } from '../../../components/ui/CustomSelect'
import { FieldLabel, SectionCard, TextField, ToggleRow } from '../FormBits'

const SAMPLE_ROWS = [
  {
    name: 'Claim form',
    mandatory: 'Yes',
    kyc: 'No',
    type: 'Hospitalization',
  },
  {
    name: 'Final bills',
    mandatory: 'Yes',
    kyc: 'No',
    type: 'Hospitalization',
  },
  {
    name: 'Discharge summary',
    mandatory: 'Yes',
    kyc: 'No',
    type: 'Post-hospitalization',
  },
]

export function Step5ClaimDocuments() {
  const [docType, setDocType] = useState('')
  const [docCat, setDocCat] = useState('')
  const [claimType, setClaimType] = useState('na')

  return (
    <div className="space-y-8">
      <SectionCard title="Claim document">
        <div className="grid gap-5 lg:grid-cols-3">
          <TextField
            id="docName"
            label="Document name"
            placeholder="Enter document name"
          />
          <div>
            <FieldLabel>Document type</FieldLabel>
            <CustomSelect
              id="docType"
              value={docType}
              onChange={setDocType}
              options={[
                { value: '', label: 'Select document type' },
                { value: 'med', label: 'Medical' },
              ]}
            />
          </div>
          <div>
            <FieldLabel>Document category</FieldLabel>
            <CustomSelect
              id="docCat"
              value={docCat}
              onChange={setDocCat}
              options={[
                { value: '', label: 'Select document category' },
                { value: 'in', label: 'In-patient' },
              ]}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/40 px-4 py-3">
          <Paperclip className="h-5 w-5 text-emerald-600" />
          <div>
            <p className="text-sm font-medium text-emerald-900">
              Attach sample format
            </p>
            <p className="text-xs text-red-600">
              File formats: jpeg, png, jpg, pdf
            </p>
          </div>
          <span className="text-xs text-slate-500">No file chosen</span>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="rounded-full border-2 border-sky-300 bg-white px-5 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50"
          >
            Add more +
          </button>
        </div>
      </SectionCard>

      <SectionCard title="TPA claim documents">
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">Document name</th>
                <th className="px-4 py-3">Mandatory</th>
                <th className="px-4 py-3">KYC document</th>
                <th className="px-4 py-3">Document type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SAMPLE_ROWS.map((row) => (
                <tr key={row.name} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.mandatory}</td>
                  <td className="px-4 py-3 text-slate-600">{row.kyc}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Intimate & submit claim information">
        <div className="grid gap-6 lg:grid-cols-2">
          <TextField
            id="claimAdvance"
            label="How many days in advance can a claim be intimated?"
            required
            defaultValue="0"
            type="number"
          />
        </div>
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50/40 p-5">
          <p className="text-center text-sm font-semibold text-slate-800">
            Submit claim information
          </p>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div>
              <FieldLabel required>Select claim type</FieldLabel>
              <CustomSelect
                id="claimType"
                value={claimType}
                onChange={setClaimType}
                options={[{ value: 'na', label: 'Not applicable' }]}
              />
            </div>
            <ToggleRow label="Is claim intimation mandatory before claim submission" required />
            <ToggleRow label="Single claim amount" required />
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
