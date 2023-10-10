import clack from '@clack/prompts'
import messages from '@/json/create.messages.json'
import { Argument, Command, Option } from 'commander'
import { bot } from '@/app/bot'
import { style } from '@opentf/cli-styles'
import { readJson } from '@/functions/file'
import { PackageJson } from '@/types/package'
import { join } from 'path'
import { checkCancel, getLastestVersion, isOutdated } from '@/functions/helpers'
import { ProgramProperties } from '@/types/program'

export async function create() {
  const packageJson = readJson<PackageJson>(
    join(__dirname, '../../package.json'),
  )
  const properties: ProgramProperties = {
    programRootDir: join(__dirname, '..'),
  }
  new Command(packageJson.name)
    .version(packageJson.version)
    .addArgument(new Argument('create', 'Create a new unix project.'))
    .addOption(
      new Option('-l, --lang <language>', 'Select program language').choices([
        'pt_br',
        'en_us',
      ]),
    )
    .allowUnknownOption()
    .allowExcessArguments()
    .parse(process.argv)

  clack.intro(
    style(`${messages.welcome} 📦 $und.hex(#505050){v${packageJson.version}}`),
  )

  const lastVersion = await getLastestVersion()
  if (lastVersion && isOutdated(packageJson.version, lastVersion)) {
    clack.log.warn(messages.outdated.replace('var(version)', lastVersion))
  }

  const program = checkCancel<string>(
    await clack.select({
      message: messages.select,
      options: [{ label: messages.options.discodbot, value: 'bot' }],
    }),
  )

  const programs = {
    bot,
    leave() {
      clack.outro(style(messages.leave))
      process.exit(0)
    },
  }

  const exec = programs[program as keyof typeof programs]
  if (!exec) programs.leave()
  exec(properties)
}

create().catch((error) => {
  console.log(error)
  process.exit(1)
})