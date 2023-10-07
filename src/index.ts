import clack from '@clack/prompts'
import messages from './json/messages.json'
import { Argument, Command, Option } from 'commander'
import { bot } from './app/bot'
import { style } from '@opentf/cli-styles'
import { readJson } from './functions/file'
import { PackageJson } from './types/package'
import { join } from 'path'
import { checkCancel, getLastestVersion, isOutdated } from './functions/helpers'
import { Languages, ProgramProperties } from './types/program'

async function main() {
  const packageJson = readJson<PackageJson>(join(__dirname, '../package.json'))
  const properties: ProgramProperties = {
    lang: 'pt_br',
    programRootDir: join(__dirname, '..'),
  }
  const command = new Command(packageJson.name)
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options = command.opts<{ lang?: Languages }>()
  if (options.lang) properties.lang = options.lang
  const { lang } = properties

  clack.intro(
    style(
      `${messages.welcome[lang]} 📦 $und.hex(#505050){v${packageJson.version}}`,
    ),
  )

  const lastVersion = await getLastestVersion()
  if (lastVersion && isOutdated(packageJson.version, lastVersion)) {
    clack.log.warn(messages.outdated[lang].replace('var(version)', lastVersion))
  }

  const program = checkCancel<string>(
    await clack.select({
      message: messages.select[lang],
      options: [{ label: messages.options.discodbot[lang], value: 'bot' }],
    }),
  )

  const programs = {
    bot,
    leave(properties: ProgramProperties) {
      clack.outro(style(messages.leave[properties.lang]))
      process.exit(0)
    },
  }

  const exec = programs[program as keyof typeof programs]
  if (!exec) programs.leave(properties)
  exec(properties)
}

main().catch((error) => {
  console.log(error)
  process.exit(1)
})
