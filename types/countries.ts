export interface Root {
    count: number
    next: string
    previous: any
    results: CountriesResult[]
}

export interface CountriesResult {
    id: number
    name: string
    code: string
    isHistoric: number
    url: any
    note: any
}
