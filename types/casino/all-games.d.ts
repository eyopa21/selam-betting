export type AllGamesRoot = {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}

export type Result = {
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
