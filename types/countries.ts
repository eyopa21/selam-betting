export type Root = {
  count: number
  next: string
  previous: any
  results: CountriesResult[]
}

export type CountriesResult = {
  id: number
  name: string
  code: string
  isHistoric: number
  url: any
  note: any
}
