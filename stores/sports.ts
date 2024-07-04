import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Sport, Sports } from '~/types/sports'
import type { Tournament, Tournaments } from '~/types/tournaments'

type Leagues = {
    id: string
    name: string
}

type Tournamentss = {
    count: number
    next: string | null
    previous: string | null
    leagues: Leagues[]
}
type Sports = {
    id: number,
    name: string
    parentId: number | null
    tournaments: Tournamentss

}


export const useSportsStore = defineStore('sports', () => {
    const sportsCount = ref<number>(0)
    const sportsNext = ref<string>("")
    const sportsPrev = ref<string>("")
    const sports = ref<Sports[]>([])
    const tournaments = ref<Tournament[]>([])

    const fetchSports = async () => {

        try {
            const data = await $fetch('/api/sports')
            console.log("sportssss", data.data);
            sportsCount.value = data.data?.count
            sportsNext.value = data.data.next ?? ''
            sportsPrev.value = data.data.previous ?? ''
            data.data.results?.forEach((r) => r.tournaments = {} as Tournaments)
            sports.value = data.data.results || []

        } catch (error) {
            console.error('Error fetching sports:', error)
        }
    }

    const fetchTournaments = async (sportId: string, page: number | string) => {
        try {
            const data = await $fetch<{ data: Tournaments }>(`/api/tournaments/${sportId}/?page=${page || 1}`)

            const fetchedSportIndex = sports.value.findIndex((s) => {
                return s.id == sportId
            })

            if (fetchedSportIndex !== -1) {
                sports.value[fetchedSportIndex].tournaments.count = data.data.count
                sports.value[fetchedSportIndex].tournaments.next = data.data.next
                sports.value[fetchedSportIndex].tournaments.previous = data.data.previous
                sports.value[fetchedSportIndex].tournaments.results = [...sports.value[fetchedSportIndex]?.tournaments.results || [], ...data.data.results || []]

            } else {
                console.log('Sport not found in the array.');
            }
        } catch (error) {
            console.error(`Error fetching tournaments for sport ${sportId}:`, error)
        }
    }

    return {
        sports,
        sportsCount,
        sportsNext,
        sportsPrev,
        tournaments,
        fetchSports,
        fetchTournaments,
    }
})
