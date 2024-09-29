import { defineStore } from 'pinia'
import type { CasinoRoot, Game } from '~/types/casino/games'
import type { GroupGamesRoot } from '~/types/casino/group-games'

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
