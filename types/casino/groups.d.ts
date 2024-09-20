export type CasinoGroupsRoot = {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}

export type Result = {
  id: string
  name: string
  order: string | null
  icon_url: string
}
