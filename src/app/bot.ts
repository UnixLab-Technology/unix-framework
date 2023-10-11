import path from 'path'
import fs from 'fs-extra'
import spawn from 'cross-spawn'
import messages from '../json/bot.messages.json'
import { style } from '@opentf/cli-styles'
import { brBuilder } from '@magicyan/core'
import { text, select, note, outro, spinner } from '@clack/prompts'
import { checkCancel, editJson } from '../functions/helpers'
import { ProgramProperties } from '../types/program'

export async function bot(properties: ProgramProperties) {
  const project = {
    path: checkCancel(
      await text({
        message: style(messages.projectName.message),
        placeholder: style(messages.projectName.placeholder),
        /* validate(input) {
          const npmName = getNpmName(input)
          const validation = validateNpmName(npmName)
          if (!input) {
            return style(messages.projectName.emptyWarn)
          }
          if (validation.valid) {
            return
          }
          return style(`$r{${brBuilder(...(validation.problems || []))}}`)
        }, */
      }),
    ),
    technology: checkCancel(
      await select({
        message: style(messages.technology),
        options: [
          {
            label: 'Typescript',
            value: 'typescript',
          },
          {
            label: 'Javascript',
            value: 'javascript',
          },
        ],
        initialValue: 'typescript',
      }),
    ),
    database: checkCancel(
      await select({
        message: messages.database,
        options: [
          {
            label: 'Nenhum',
            value: 'no-database',
          },
        ],
        initialValue: 'no-database',
      }),
    ),
    packageManager: checkCancel(
      await select({
        message: messages.packageManager,
        options: [
          {
            label: style('NPM (Node Package Manager) $gr{Recomendado}'),
            value: 'npm',
          },
          {
            label: 'Yarn',
            value: 'yarn',
          },
          {
            label: 'PNPM',
            value: 'pnpm',
          },
        ],
        initialValue: 'npm',
      }),
    ),
  }

  properties.destinationPath = path.resolve(project.path)
  const isDestinationCwd = properties.destinationPath === process.cwd()
  if (isDestinationCwd) project.path = path.basename(process.cwd())

  const template = path.join(
    process.cwd(),
    '.templates/bots',
    `${project.technology}-${project.database}`,
  )

  const copyProject = await fs
    .copy(template, project.path, {
      errorOnExist: false,
      overwrite: true,
      filter: async (srcPath) => {
        const srcBasename = path.basename(srcPath)
        const ignoreItems = ['node_modules', 'package-lock.json', 'dist']
        const ignoreExtensions = ['.env.development', '.development.json']
        if (ignoreExtensions.some((ext) => srcBasename.endsWith(ext)))
          return false
        if (ignoreItems.includes(srcBasename)) return false
        return true
      },
    })
    .then(() => ({ sucess: true, err: null }))
    .catch((err) => ({ sucess: false, err }))

  if (!copyProject.sucess) {
    console.log(copyProject.err)
  }

  await editJson({
    path: path.join(properties.destinationPath, 'package.json'),
    propertyName: 'name',
    propertyValue: project.path,
  })

  const done = () => {
    const message: string[] = []

    if (!isDestinationCwd) message.push(`◌ cd ${project.path}`)
    message.push(`◌ ${project.packageManager} run dev`)
    message.push(messages.readme.message)

    note(style(brBuilder(...message)), style(messages.readme.title))

    outro(style(messages.final))
  }

  const spin = spinner()
  spin.start(messages.installing)
  const child = spawn(project.packageManager, ['install'], {
    stdio: 'ignore',
    cwd: properties.destinationPath,
  })

  let loop = 0
  const emojis = ['😐', '🙂', '😐', '🥱', '😴', '😑']
  const timer = setInterval(() => {
    if (loop >= emojis.length) loop = 0
    spin.message(`${emojis[loop]} ${messages.installing}`)
    loop++
  }, 3000)

  child.on('exit', () => {
    clearInterval(timer)
    spin.stop('😃 ' + messages.installed)
    done()
  })
}
