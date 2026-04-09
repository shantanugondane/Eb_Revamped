import { useState } from 'react'
import clsx from 'clsx'
import { CustomSelect } from '../../../components/ui/CustomSelect'
import { dateInputSurface, dateSizeMd } from '../../../components/ui/selectStyle'
import {
  FieldLabel,
  SectionCard,
  TextField,
  ToggleRow,
} from '../FormBits'

export function Step1BasicDetails() {
  const [policyType, setPolicyType] = useState('')
  const [policySubType, setPolicySubType] = useState('')
  const [leadInsurer, setLeadInsurer] = useState('tata')
  const [tpa, setTpa] = useState('')
  const [empTab, setEmpTab] = useState('def')
  const [broker, setBroker] = useState('')
  const [company, setCompany] = useState('')
  const [midTerm, setMidTerm] = useState('')

  return (
    <div className="space-y-8">
      <SectionCard title="Basic policy details">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <TextField
            id="policyNo"
            label="Policy no."
            required
            placeholder="Enter policy no."
          />
          <TextField
            id="policyName"
            label="Policy name"
            required
            placeholder="Enter policy name"
          />
          <TextField
            id="quoteNumber"
            label="Quote number"
            placeholder="Enter quote number"
          />
          <label className="block">
            <FieldLabel>Application date</FieldLabel>
            <input
              type="date"
              className={clsx(dateInputSurface, dateSizeMd)}
            />
          </label>
          <TextField
            id="planCoverCode"
            label="Plan cover code"
            placeholder="Enter code"
          />
          <div>
            <FieldLabel required>Policy type</FieldLabel>
            <CustomSelect
              id="policyType"
              value={policyType}
              onChange={setPolicyType}
              options={[
                { value: '', label: 'Select policy type' },
                { value: 'grp', label: 'Group' },
                { value: 'ind', label: 'Individual' },
              ]}
            />
          </div>
          <div>
            <FieldLabel required>Policy sub-type</FieldLabel>
            <CustomSelect
              id="policySubType"
              value={policySubType}
              onChange={setPolicySubType}
              options={[
                { value: '', label: 'Select sub-type' },
                { value: 'floater', label: 'Floater' },
              ]}
            />
          </div>
          <div>
            <FieldLabel required>Lead insurer</FieldLabel>
            <CustomSelect
              id="leadInsurer"
              value={leadInsurer}
              onChange={setLeadInsurer}
              options={[
                { value: 'tata', label: 'TATA AIG General Insurance' },
              ]}
            />
          </div>
          <div>
            <FieldLabel required>TPA</FieldLabel>
            <CustomSelect
              id="tpa"
              value={tpa}
              onChange={setTpa}
              options={[
                { value: '', label: 'Select TPA' },
                { value: 'tpa1', label: 'Sample TPA' },
              ]}
            />
          </div>
          <label className="block">
            <FieldLabel required>Policy start date</FieldLabel>
            <input
              type="date"
              className={clsx(dateInputSurface, dateSizeMd)}
            />
          </label>
          <label className="block">
            <FieldLabel required>Policy end date</FieldLabel>
            <input
              type="date"
              className={clsx(dateInputSurface, dateSizeMd)}
            />
          </label>
          <div>
            <FieldLabel>Employee tab view</FieldLabel>
            <CustomSelect
              id="empTab"
              value={empTab}
              onChange={setEmpTab}
              options={[{ value: 'def', label: 'Default' }]}
            />
          </div>
          <TextField
            id="brokerPct"
            label="Broker %"
            defaultValue="0"
            type="number"
          />
          <TextField
            id="corpBuffer"
            label="Corporate buffer ₹"
            defaultValue="0"
            type="number"
          />
          <TextField id="planPremium" label="Plan premium" placeholder="—" />
        </div>
      </SectionCard>

      <SectionCard title="Company details">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <FieldLabel required>Intermediate broker</FieldLabel>
            <CustomSelect
              id="intermediateBroker"
              value={broker}
              onChange={setBroker}
              options={[
                { value: '', label: 'Select broker' },
                { value: 'b1', label: 'Broker A' },
              ]}
            />
          </div>
          <div>
            <FieldLabel required>Company name</FieldLabel>
            <CustomSelect
              id="companyName"
              value={company}
              onChange={setCompany}
              options={[
                { value: '', label: 'Select company name' },
                { value: 'c1', label: 'Tata Capital Housing Finance' },
              ]}
            />
          </div>
          <TextField
            id="officeCode"
            label="Office code"
            placeholder="Enter office code"
          />
          <TextField
            id="clientCode"
            label="Client code"
            placeholder="Enter client code"
          />
        </div>
        <div className="mt-6 rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-sky-50/30 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Verification
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Who will verify enrolment and endorsement?
          </p>
          <div className="mt-4 space-y-3">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-transparent bg-white/80 px-4 py-3 shadow-sm transition hover:border-sky-200 hover:shadow-md">
              <input
                type="radio"
                name="verify"
                className="mt-1 text-[#00338d]"
              />
              <span className="text-sm font-medium leading-snug text-slate-800">
                Will broker verify all enrolment and endorsement?
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-transparent bg-white/80 px-4 py-3 shadow-sm transition hover:border-sky-200 hover:shadow-md">
              <input
                type="radio"
                name="verify"
                className="mt-1 text-[#00338d]"
              />
              <span className="text-sm font-medium leading-snug text-slate-800">
                Will employer verify all enrolment and endorsement?
              </span>
            </label>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Enrolment details">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-1">
            <ToggleRow label="Enrolment status" defaultChecked />
          </div>
          <label className="block">
            <FieldLabel>Close mail effective date</FieldLabel>
            <input
              type="date"
              className={clsx(dateInputSurface, dateSizeMd)}
            />
          </label>
          <div>
            <FieldLabel required>
              Enrolment considered from (mid term)
            </FieldLabel>
            <CustomSelect
              id="midTerm"
              value={midTerm}
              onChange={setMidTerm}
              options={[
                { value: '', label: 'Select' },
                { value: 'doj', label: 'Date of joining' },
              ]}
            />
          </div>
          <TextField
            id="allowedDays"
            label="Enrolment allowed days (mid term)"
            required
            defaultValue="45"
            type="number"
          />
          <TextField
            id="endorseDays"
            label="Days allowed for endorsement after DOJ"
            placeholder="Enter days"
            type="number"
          />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <ToggleRow label="Enrolment allowed after policy expires" />
          <ToggleRow label="Non-doable endorsement?" />
        </div>
      </SectionCard>

      <SectionCard title="Premium & display rules">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ToggleRow label="GST applicable" required defaultChecked />
          <ToggleRow label="Hide total cover" required />
          <ToggleRow label="Hide total premium" required />
          <ToggleRow label="Hide member cover" required />
          <ToggleRow label="Hide member premium" required />
          <ToggleRow label="Show enhance bifurcation" required />
          <ToggleRow
            label="Prorata premium (addition)"
            required
            defaultChecked
          />
          <ToggleRow
            label="Prorata premium (correction)"
            required
            defaultChecked
          />
          <ToggleRow
            label="Prorata premium (deletion)"
            required
            defaultChecked
          />
          <ToggleRow label="Show employer premium to employee" required />
          <ToggleRow label="Is dummy policy" required />
          <ToggleRow label="Trigger TPA services" required />
        </div>
      </SectionCard>
    </div>
  )
}
