
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

interface MarketResults {
    count: string;
    odd: string;
}
interface Markets {
    count: string;
    next: string;
    previous: string;
    results: MarketResults[];
}

export interface Matches {
    id: string;
    league: string;
    teams: string;
    date: string;
    time: string;
    odds: MatchOdds[];
    markets?: Markets;
    participants: [Participants, Participants]
}







