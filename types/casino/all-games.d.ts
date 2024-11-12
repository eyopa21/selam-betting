export type AllGamesRoot = {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}

export type Result = {
  id: string
  name: string
  games: Games[]
  order_of_group: string | null
  icon_url: string
}

// export type Games = {
//   count: number
//   num_pages: number
//   current_page: number
//   next: string | null
//   previous: string | null
//   games: Game[]
// }

export type Games = {
  id: string
  game_id: string
  label: string
  tag: string
  logo_url: string
  play_url: string
  mobile: boolean
  desktop: boolean
}
