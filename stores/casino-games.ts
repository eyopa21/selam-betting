import { defineStore } from 'pinia'
import type { Game } from '~/types/casino/games'

export const useCasinoGameStore = defineStore('casino-games', () => {
  const games = ref<Game[]>([])

  function addGames(game: Game[]) {
    games.value = game
  }

  return {
    games,
    addGames,
  }
})
