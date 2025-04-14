export interface WHISPERER_SETTINGS {
  vault_ambience: boolean
  vault_ambience_path: string
  ambience_per_files: boolean
  music_volume: number

  debug_frames: boolean

  MIN_VOLUME: number
  MAX_VOLUME: number
  VOLUME_STEP: number
}

export const DEFAULT_SETTINGS: WHISPERER_SETTINGS = {
  vault_ambience: false,
  vault_ambience_path: '',
  ambience_per_files: true,
  music_volume: 50,

  debug_frames: false,

  MIN_VOLUME: 0,
  MAX_VOLUME: 100,
  VOLUME_STEP: 1
}
