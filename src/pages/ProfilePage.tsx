import { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { ChevronLeft, Pencil, UserRound } from 'lucide-react'
import { textInputMd } from '../components/ui/selectStyle'

export function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('shantanu')
  const [email, setEmail] = useState('shantanu.gondane@fyntune.com')
  const [contact, setContact] = useState('')

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
            Account
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Profile
          </h1>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:border-slate-700/80 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00338d] text-white">
              <UserRound className="h-5 w-5" />
            </span>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Personal details
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setEditing((e) => !e)}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-4 py-1.5 text-sm font-medium text-slate-800 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            <Pencil className="h-3.5 w-3.5" />
            {editing ? 'Done' : 'Edit'}
          </button>
        </div>

        <div className="p-5 sm:p-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Name
              </p>
              {editing ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={clsx(textInputMd, 'mt-2')}
                  aria-label="Name"
                />
              ) : (
                <p className="mt-1.5 text-sm font-medium text-slate-800 dark:text-slate-200">
                  {name || '—'}
                </p>
              )}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Email Id
              </p>
              {editing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={clsx(textInputMd, 'mt-2')}
                  aria-label="Email"
                />
              ) : (
                <p className="mt-1.5 break-all text-sm font-medium text-slate-800 dark:text-slate-200">
                  {email || '—'}
                </p>
              )}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Contact No
              </p>
              {editing ? (
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className={clsx(textInputMd, 'mt-2')}
                  aria-label="Contact number"
                  placeholder="Enter contact number"
                />
              ) : (
                <p className="mt-1.5 text-sm font-medium text-slate-800 dark:text-slate-200">
                  {contact || '—'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
