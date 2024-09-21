export type GroupGamesRoot = {
  id: string
  name: string
  games: Game[]
}

export type Game = {
  id: string
  game_id: string
  label: string
  tag: string
  logo_url: string
  play_url: string
  mobile: boolean
  desktop: boolean
}
