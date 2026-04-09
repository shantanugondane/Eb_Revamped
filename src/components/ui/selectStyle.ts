import clsx from 'clsx'

/** Shared shell for selects and matching date inputs */
export const fieldSurface = clsx(
  'rounded-xl border border-slate-200/90',
  'bg-gradient-to-b from-white to-slate-50/60',
  'shadow-[inset_0_1px_0_rgb(255_255_255/0.85),0_1px_2px_rgb(15_23_42/0.06)]',
  'transition-all duration-200 ease-out',
  'hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/35',
  'focus:border-[#00338d] focus:outline-none focus:ring-[3px] focus:ring-[#00338d]/16',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'dark:border-slate-600 dark:from-slate-800 dark:to-slate-900',
  'dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.04),0_1px_2px_rgb(0_0_0/0.2)]',
  'dark:hover:border-slate-500 dark:hover:shadow-slate-950/50',
)

export const selectSurface = clsx(
  fieldSurface,
  'w-full cursor-pointer appearance-none font-medium text-slate-800 dark:text-slate-100',
)

export const selectSizeMd = 'h-10 pl-3.5 pr-10 text-sm leading-none'

export const selectSizeFloating = 'h-12 pb-2 pl-3 pr-10 pt-3 text-sm leading-snug'

export const dateInputSurface = clsx(
  fieldSurface,
  'w-full font-medium text-slate-800 [color-scheme:light] dark:[color-scheme:dark] dark:text-slate-100',
)

export const dateSizeMd = 'h-10 px-3 pr-10 text-sm'

export const dateSizeFloating = 'h-12 px-3 pb-2 pt-3 pr-10 text-sm'

/** Text inputs — match select / date field shell */
export const textInputMd = clsx(
  fieldSurface,
  'h-10 w-full px-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400',
  'dark:text-slate-100 dark:placeholder:text-slate-500',
)

/** Language pill in header — sits on soft track */
export const selectHeaderCompact = clsx(
  'max-w-[8rem] cursor-pointer appearance-none rounded-lg border border-transparent',
  'bg-transparent py-1 pl-1 pr-7 text-xs font-semibold text-slate-700',
  'transition-colors duration-200',
  'hover:border-slate-200 hover:bg-white/80',
  'focus:border-[#00338d]/30 focus:outline-none focus:ring-2 focus:ring-[#00338d]/15',
  'dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800/80',
)
