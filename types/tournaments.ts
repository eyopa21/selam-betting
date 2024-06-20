export interface Tournament {
    id: number,
    parentPartId: number | null,
    name: string | null,
    venueId: VenueId
    rootPartId: RootPartId,
    hasLiveStatus: number | null,
    statusId: StatusId,
    parentId: number | null
}

export interface Tournaments {
    count: number | null,
    next: string | null,
    previous: string | null,
    results: Tournament[] | null
}

interface VenueId {
    id: number,
    name: string | null,
    code: string | null,
    isHistoric: number | null,
    url: string | null,
    note: string | null
}

interface RootPartId {
    id: number,
    orderNum: number | null,
    name: string | null,
    isBreak: number | null,
    description: string | null,
    auto_id_0: string | number | null,
    parentId: number | null
}

interface StatusId {
    id: number | null,
    name: string | null,
    description: string | null
}