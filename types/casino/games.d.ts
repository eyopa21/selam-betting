export type CasinoGame = {
  image: string
  name: string
  link: string
}

export type CasinoRoot = Root

export type Root = {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}

export type Result = {
  id: string
  name: string
  games: Game[]
  order_of_group: string | null
  icon_url: string
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
