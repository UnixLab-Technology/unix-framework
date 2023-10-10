export interface ProgramProperties {
  readonly programRootDir: string
  destinationPath?: string
}

export interface PresetProperties {
  readonly name: string
  readonly displayName: string
  readonly enabled: boolean
}
