export type CasinoGame = {
  image: string
  name: string
  link: string
}

export type CasinoRoot = Root2[]

export type Root2 = {
  id: string
  name: string
  games: Game[]
  order: number
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
  order: number
}
