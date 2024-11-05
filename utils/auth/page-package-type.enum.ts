export const PagePackageType = {

  LIVE_GAME: 'is_live_match',

  CASINO_GAME: 'is_casino_game',

  PRE_MATCH: 'is_pre_match',
} as const

export type TPagePackageType = typeof PagePackageType[keyof typeof PagePackageType]
