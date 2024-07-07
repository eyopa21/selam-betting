import type { Tournaments } from "./tournaments"

export interface Sport {
    id: string,
    name: string,
    parentId: number | null,
    description: string | null,
    tournaments: Tournaments
}

export interface Sports {
    count: number | null,
    next: string | null,
    previous: string | null,
    results: Sport[] | null
}


export type League = {
    id: number;
    name: string;
    // Add other fields as necessary
};