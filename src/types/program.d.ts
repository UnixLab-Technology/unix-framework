type Languages = 'pt_br' | 'en_us'

export interface ProgramProperties {
  readonly programRootDir: string
  destinationPath?: string
  lang: Languages
}

export interface PresetProperties {
  readonly name: string
  readonly displayName: Record<Languages, string>
  readonly enabled: boolean
}
