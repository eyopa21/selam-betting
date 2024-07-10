
interface MatchOdds {
    outcomeId: number
    eventId: number
    value: string;
    odd: string;
}

type Club = {
    id: number
    countryId: number
    name: string
    logo: string

}
export type Participants = {
    id: bigint
    role: number
    eventId: bigint
    club: Club
}


export type Outcome = {
    outcomeId: bigint
    name: string
    odd: string
}

export type MarketResults = {
    eventId: bigint
    name: string
    outcomes: Outcome[]
}

export type Markets = {
    count: string;
    next: string;
    previous: string;
    results: MarketResults[];
}

export type Matches = {
    id: string;
    league: string;
    teams: string;
    date: string;
    time: string;
    odds: MatchOdds[];
    markets?: Markets;
    participants: [Participants, Participants]
    showMarket: boolean
    numberOfMarkets: number

}







