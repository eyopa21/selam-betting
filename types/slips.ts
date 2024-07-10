
export interface MatchDetail {
    id: number,
    teams: string,
    league: string
    date: string
    time: string
}
export interface Odds {
    // id is = eventId
    outcomeId: number
    eventId: string | number;
    value: string;
    odd: number;
    matchDetail: MatchDetail
}


export interface Slips {
    id: number,
    name: string,
    label: string,
    birr: number
    games: Odds[] | [],
}
