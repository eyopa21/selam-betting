
interface MatchOdds {
    value: string;
    odd: string;
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
    id: number;
    league: string;
    teams: string;
    date: string;
    odds: MatchOdds[];
    markets: Markets;
}