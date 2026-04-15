import { useState } from 'react'
import { CheckCircle2, Download, Paperclip, Upload } from 'lucide-react'

type UploadSummaryRow = {
  id: string
  policyNo: string
  policyName: string
  corporate: string
  source: string
  endorsementType: string
  enrolmentDate: string
  uploadedMemberStatus: string
  originalDocument: string
  errorDocument: string
  gcSummary: string
  endorsementCopy: string
  gcStatus: string
  premiumProcess: string
  uploadedAt: string
  status: string
  mode: string
  fileStatus: string
  uploadedRows: number
  addedRows: number
  failedRows: number
  removedRows: number
}

const summaryRows: UploadSummaryRow[] = [
  {
    id: '1',
    policyNo: '0239892078',
    policyName: 'BVC SPECIALITIES',
    corporate: 'BVC SPECIALITIES PRIVATE LIMITED',
    source: 'INIT',
    endorsementType: 'Update',
    enrolmentDate: 'Backup Available',
    uploadedMemberStatus: 'Validated: 8 Members',
    originalDocument: 'download',
    errorDocument: 'download',
    gcSummary: 'Endorsement & Coverage Summary',
    endorsementCopy: 'Download Awaited',
    gcStatus: 'GC Summary Download Awaited',
    premiumProcess: 'Total Premium: 0.00',
    uploadedAt: '15-04-2026 23:02:40',
    status: 'Failed',
    mode: 'Combined',
    fileStatus: 'Not Found',
    uploadedRows: 47,
    addedRows: 8,
    failedRows: 8,
    removedRows: 39,
  },
  {
    id: '2',
    policyNo: '0239891162',
    policyName: 'SOUTHERN POWER',
    corporate: 'SOUTHERN POWER DISTRIBUTION COMPANY',
    source: 'INIT',
    endorsementType: 'Add',
    enrolmentDate: '-',
    uploadedMemberStatus: 'Added Successfully: 1 Member',
    originalDocument: 'download',
    errorDocument: '-',
    gcSummary: 'Endorsement Summary',
    endorsementCopy: 'Copy Ready',
    gcStatus: 'Ready',
    premiumProcess: 'Total Premium: 0.00',
    uploadedAt: '15-04-2026 15:55:01',
    status: 'Success',
    mode: 'Add',
    fileStatus: 'Not Found',
    uploadedRows: 1,
    addedRows: 1,
    failedRows: 0,
    removedRows: 0,
  },
]

export function EndorsementPage() {
  const [tab, setTab] = useState<'addition' | 'deletion' | 'combined' | 'correction'>(
    'combined',
  )
  const [dataType, setDataType] = useState<'endorsement' | 'inception'>('endorsement')

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-5 px-3 py-6 sm:px-6">
      <section className="rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Endorsement Request
          </h1>
          <button
            type="button"
            className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
          >
            Quick Link
          </button>
        </div>

        <div className="space-y-4 px-4 py-4 sm:px-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-600">
                Employer *
              </span>
              <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#00338d]">
                <option>Select employer</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-600">
                Policy Type *
              </span>
              <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#00338d]">
                <option>Select Policy Type</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-600">
                Policy Number *
              </span>
              <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#00338d]">
                <option>Select Policy Number</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-2 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setTab('addition')}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                tab === 'addition'
                  ? 'bg-[#00338d] text-white'
                  : 'text-[#00338d] hover:bg-slate-100'
              }`}
            >
              Addition
            </button>
            <button
              type="button"
              onClick={() => setTab('deletion')}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                tab === 'deletion'
                  ? 'bg-[#00338d] text-white'
                  : 'text-[#00338d] hover:bg-slate-100'
              }`}
            >
              Deletion
            </button>
            <button
              type="button"
              onClick={() => setTab('combined')}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                tab === 'combined'
                  ? 'bg-[#00338d] text-white'
                  : 'text-[#00338d] hover:bg-slate-100'
              }`}
            >
              Addition & Deletion
            </button>
            <button
              type="button"
              onClick={() => setTab('correction')}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                tab === 'correction'
                  ? 'bg-[#00338d] text-white'
                  : 'text-[#00338d] hover:bg-slate-100'
              }`}
            >
              Correction
            </button>
          </div>

          <h2 className="text-base font-medium text-slate-800 dark:text-slate-100">
            Member Addition & Deletion
          </h2>

          <div className="rounded-xl border border-indigo-200 p-4">
            <p className="mb-3 text-center text-sm font-semibold text-slate-700">
              Type of data?
            </p>
            <div className="mb-6 flex items-center justify-center gap-10">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="dataType"
                  checked={dataType === 'endorsement'}
                  onChange={() => setDataType('endorsement')}
                />
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Endorsement
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="dataType"
                  checked={dataType === 'inception'}
                  onChange={() => setDataType('inception')}
                />
                Inception
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lime-200 text-slate-700">
                <Paperclip className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Attach File</p>
                <p className="text-xs text-rose-500">File formats: .xlsx, .xls, .csv</p>
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
              <Upload className="h-4 w-4" />
              <span>Attached File - No File Chosen</span>
              <input type="file" accept=".xlsx,.xls,.csv" className="hidden" />
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-full bg-[#00338d] px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0a4aad]"
            >
              Submit
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Endorsement Documents
          </h2>
          <button
            type="button"
            className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-sky-200 text-xs font-semibold text-sky-700 hover:bg-sky-50"
            aria-label="Refresh endorsement documents"
          >
            ↻
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1780px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                <th className="px-4 py-3">Policy No</th>
                <th className="px-4 py-3">Policy Name</th>
                <th className="px-4 py-3">Company Name</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Endorsement Type</th>
                <th className="px-4 py-3">Enrolment Date</th>
                <th className="px-4 py-3">Uploaded Member Status</th>
                <th className="px-4 py-3">Original Document</th>
                <th className="px-4 py-3">Error Document</th>
                <th className="px-4 py-3">GC Summary</th>
                <th className="px-4 py-3">Endorsement Copy</th>
                <th className="px-4 py-3">GC Status</th>
                <th className="px-4 py-3">Premium & Process</th>
                <th className="px-4 py-3">Uploaded At</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">File Status</th>
                <th className="px-4 py-3">Upload Summary</th>
                <th className="px-4 py-3">Download</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-200">
              {summaryRows.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="px-4 py-4">{row.policyNo}</td>
                  <td className="px-4 py-4 text-xs">{row.policyName}</td>
                  <td className="px-4 py-4 text-xs font-medium">{row.corporate}</td>
                  <td className="px-4 py-4 text-xs">{row.source}</td>
                  <td className="px-4 py-4 text-xs">{row.endorsementType}</td>
                  <td className="px-4 py-4 text-xs">{row.enrolmentDate}</td>
                  <td className="px-4 py-4 text-xs text-emerald-700">
                    {row.uploadedMemberStatus}
                  </td>
                  <td className="px-4 py-4 text-xs text-sky-700">{row.originalDocument}</td>
                  <td className="px-4 py-4 text-xs text-sky-700">{row.errorDocument}</td>
                  <td className="px-4 py-4 text-xs text-sky-700">{row.gcSummary}</td>
                  <td className="px-4 py-4 text-xs">{row.endorsementCopy}</td>
                  <td className="px-4 py-4 text-xs">{row.gcStatus}</td>
                  <td className="px-4 py-4 text-xs">{row.premiumProcess}</td>
                  <td className="px-4 py-4 text-xs">{row.uploadedAt}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        row.status === 'Success'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">
                      ENDORSEMENT
                    </span>
                    <p className="mt-1 text-xs text-slate-500">{row.mode}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {row.fileStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs leading-5">
                    <p className="text-sky-600">Total Uploaded: {row.uploadedRows}</p>
                    <p className="text-emerald-600">Added Successfully: {row.addedRows}</p>
                    <p className="text-rose-600">Failed To Add: {row.failedRows}</p>
                    <p className="text-emerald-600">Removed Successfully: {row.removedRows}</p>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-lg border border-sky-200 px-2 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-50"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Endorsement Summary
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
