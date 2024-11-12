export type GroupGamesRoot = {
  count: number
  next: string | null
  previous: string | null
  results: Games[]
}

// export type Games = {
//   count: number
//   num_pages: number
//   current_page: number
//   next: string
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
