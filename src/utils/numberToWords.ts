/** Integer amounts in words (international grouping), e.g. 20000 → "Twenty Thousand". */

const BELOW_20 = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
]

const TENS = [
  '',
  '',
  'Twenty',
  'Thirty',
  'Forty',
  'Fifty',
  'Sixty',
  'Seventy',
  'Eighty',
  'Ninety',
]

function chunkToWords(n: number): string {
  if (n === 0) return ''
  if (n < 20) return BELOW_20[n]
  if (n < 100) {
    const t = Math.floor(n / 10)
    const o = n % 10
    return TENS[t] + (o ? ' ' + BELOW_20[o] : '')
  }
  const h = Math.floor(n / 100)
  const rest = n % 100
  return BELOW_20[h] + ' Hundred' + (rest ? ' ' + chunkToWords(rest) : '')
}

export function numberToWordsInt(n: number): string {
  if (!Number.isFinite(n) || n < 0) return ''
  const num = Math.floor(n)
  if (num === 0) return 'Zero'

  const bn = 1_000_000_000
  const mn = 1_000_000
  const th = 1_000
  let x = num
  const parts: string[] = []

  if (x >= bn) {
    const b = Math.floor(x / bn)
    parts.push(chunkToWords(b) + ' Billion')
    x %= bn
  }
  if (x >= mn) {
    const m = Math.floor(x / mn)
    parts.push(chunkToWords(m) + ' Million')
    x %= mn
  }
  if (x >= th) {
    const t = Math.floor(x / th)
    parts.push(chunkToWords(t) + ' Thousand')
    x %= th
  }
  if (x > 0) parts.push(chunkToWords(x))

  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

export function parseAmountInput(raw: string): number | null {
  const t = raw.replace(/,/g, '').trim()
  if (t === '') return null
  const n = Number(t)
  if (!Number.isFinite(n)) return null
  return n
}
