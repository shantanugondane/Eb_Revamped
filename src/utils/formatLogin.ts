export function formatLoginStamp(ms: number): { date: string; time: string } {
  const d = new Date(ms)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')
  return { date: `${dd}-${mm}-${yyyy}`, time: `${h}:${m}:${s}` }
}
