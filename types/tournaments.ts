export type Tournament = {
  id: number
  parentPartId: number | null
  name: string | null
  venueId: VenueId
  rootPartId: RootPartId
  hasLiveStatus: number | null
  statusId: StatusId
  parentId: number | null
}

export type Tournaments = {
  count: number | null
  next: string | null
  previous: string | null
  results: Tournament[] | null
}

type VenueId = {
  id: number
  name: string | null
  code: string | null
  isHistoric: number | null
  url: string | null
  note: string | null
}

type RootPartId = {
  id: number
  orderNum: number | null
  name: string | null
  isBreak: number | null
  description: string | null
  auto_id_0: string | number | null
  parentId: number | null
}

type StatusId = {
  id: number | null
  name: string | null
  description: string | null
}
