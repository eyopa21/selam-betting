export interface Sport {
    id: number,
    name: string,
    parentId: number | null,
    description: string | null,
}

export interface Sports {
    count: number | null,
    next: string | null,
    previous: string | null,
    results: Sport[] | null
}
