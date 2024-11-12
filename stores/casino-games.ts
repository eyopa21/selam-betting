import { defineStore } from 'pinia'
import type { CasinoRoot } from '~/types/casino/games'

export const useCasinoGameStore = defineStore('casino-games', () => {
  const games = ref<CasinoRoot>()

  function addGames(game: CasinoRoot) {
    games.value = game
  }

  return {
    games,
    addGames,
  }
})
