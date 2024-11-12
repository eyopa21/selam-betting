export type GroupGamesRoot = {
  id: string
  name: string
  order_of_group: string | null
  icon_url: string
  games: Games
}

export type Games = {
  count: number
  num_pages: number
  current_page: number
  next: string
  previous: string | null
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
