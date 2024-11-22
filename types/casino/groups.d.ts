export type CasinoGroupsRoot = {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}

export type Result = {
  id: string
  name: string
  order?: number
  icon_url: string
}
