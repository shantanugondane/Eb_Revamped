export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-900 bg-slate-950 text-slate-400">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-center sm:text-left">
          © Copyright {new Date().getFullYear()}. All rights reserved TATA AIG
          General Insurance Company Limited.
        </p>
        <p className="text-center font-mono text-[11px] text-slate-500 sm:text-right">
          Version 5.4.2.0
        </p>
      </div>
    </footer>
  )
}
