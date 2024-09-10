import { defineStore } from 'pinia'
import type { Matches } from '~/types/matches'

export const useMatchListStore = defineStore('matchList', () => {
  const listOfMatches = ref<Matches[]>([])

  const setMatchList = async (matches: Matches[]) => {
    listOfMatches.value = matches
  }
  const addMatchList = async (matches: Matches[]) => {
    listOfMatches.value.push(...matches)
  }

  return {
    setMatchList,
    listOfMatches,
    addMatchList,
  }
})
