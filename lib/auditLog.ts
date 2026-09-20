export function appendAudit(slug: string, row: Record<string, unknown>): void {
  try {
    const fs = require('fs') as typeof import('fs')
    const path = require('path') as typeof import('path')
    const dir = path.join(process.cwd(), '.data', 'audit')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.appendFileSync(path.join(dir, `${slug}.jsonl`), JSON.stringify(row) + '\n', 'utf8')
  } catch {
    /* ignore */
  }
}

export async function writeAudit(row: Record<string, unknown>): Promise<void> {
  const slug = String((row as any).slug || 'product')
  appendAudit(slug, row)
}
