import { readFileSync } from 'fs'

export function readJson<T>(path: string): T {
  const file = readFileSync(path, { encoding: 'utf-8' })
  return JSON.parse(file)
}
