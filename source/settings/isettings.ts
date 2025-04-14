export interface WHISPERER_SETTINGS {
  vault_ambience: boolean
  vault_ambience_path: string
  ambience_per_files: boolean
  music_volume: number
}

export const DEFAULT_SETTINGS: WHISPERER_SETTINGS = {
  vault_ambience: false,
  vault_ambience_path: '',
  ambience_per_files: true,
  music_volume: 50
}
