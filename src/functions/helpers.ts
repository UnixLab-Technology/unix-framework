import path from 'path'
import fs from 'fs-extra'
import { readJson } from './file'
import { PackageJson } from '../types/package'
import { style } from '@opentf/cli-styles'
import { cancel, isCancel } from '@clack/prompts'

const packageJson = readJson<PackageJson>(
  path.join(process.cwd(), 'package.json'),
)

export async function getLastestVersion(): Promise<string | null> {
  async function request() {
    const data = await fetch(`https://registry.npmjs.org/${packageJson.name}`)
    return data.json()
  }
  return await request()
    .then((data) => data['dist-tags']?.latest)
    .catch(() => null)
}

export function isOutdated(current: string, latest: string) {
  return current < latest
}

export function checkCancel<T>(result: T | symbol): T {
  if (isCancel(result)) {
    cancel(
      style(
        `
        $hex(#4169E1){Obrigado por usar o Unix Framework!}
        $hex(#a3abc4){http://github.com/UnixLab-Technology/unix-framework}
        `,
      ),
    )
    process.exit(0)
  }
  return result as T
}

export function isUnicodeSupported() {
  if (process.platform !== 'win32') {
    return process.env.TERM !== 'linux' // Linux console (kernel)
  }
  return (
    Boolean(process.env.CI) ||
    Boolean(process.env.WT_SESSION) || // Windows Terminal
    Boolean(process.env.TERMINUS_SUBLIME) || // Terminus (<0.2.27)
    process.env.ConEmuTask === '{cmd::Cmder}' || // ConEmu and cmder
    process.env.TERM_PROGRAM === 'Terminus-Sublime' ||
    process.env.TERM_PROGRAM === 'vscode' ||
    process.env.TERM === 'xterm-256color' ||
    process.env.TERM === 'alacritty' ||
    process.env.TERMINAL_EMULATOR === 'JetBrains-JediTerm'
  )
}

interface EditJsonProps {
  path: string
  propertyName: string
  propertyValue: string | number | boolean | object
}
export async function editJson({
  path,
  propertyName,
  propertyValue,
}: EditJsonProps) {
  const packageJson = JSON.parse(await fs.readFile(path, { encoding: 'utf-8' }))
  packageJson[propertyName] = propertyValue
  await fs.writeFile(path, JSON.stringify(packageJson, null, 2))
}

/* export function validateNpmName(name: string): {
  valid: boolean
  problems?: string[]
} {
  const { validForNewPackages, errors, warnings } = validateNpmPackageName(name)
  if (validForNewPackages) {
    return { valid: true }
  }
  return {
    valid: false,
    problems: [...(errors || []), ...(warnings || [])],
  }
} */

export function getNpmName(pathName: string) {
  return path.basename(path.resolve(pathName))
}
