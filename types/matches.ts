
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
    participants: Participant
}



export interface Participant {
    participant: Participant2
    parentParticipantId: any
    eventId: number
    eventPartId: number
    participantRole: ParticipantRole
    id: number
    participantRoleId: number
}

export interface Participant2 {
    id: number
    name: string
    countryId: number
    logoUrl?: string
}

export interface ParticipantRole {
    id: number
    name: string
    isPrimary: number
}