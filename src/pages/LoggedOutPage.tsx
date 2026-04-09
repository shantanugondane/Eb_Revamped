import { Link } from 'react-router-dom'

export function LoggedOutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          You have been logged out
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Your session has ended. Sign in again when you are ready to continue.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-[#00338d] px-8 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#00338d]/25 transition hover:bg-[#002a73]"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  )
}
