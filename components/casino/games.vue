<script setup lang="ts">
import type { AllGamesRoot } from '~/types/casino/all-games'

const props = withDefaults(defineProps<{
  filterType: 'square' | 'circle'
  games: AllGamesRoot['results'][number]['games']
  gameName: string
  groupId: string
}>(), {
  filterType: 'square',
})
const { $authentication } = useNuxtApp()
const layout = useLayout()
const isMobile = useMediaQuery('(max-width: 768px)')
const filterType = ref<'square' | 'circle'>('square')

const selectedGame = ref({
  link: '',
  id: '',
  isPractice: true,
})

function handleClick(game: AllGamesRoot['results'][number]['games'][number], isPractice: boolean) {
  if (!$authentication.loggedIn.value) {
    layout.value.showLogin = true
  } else {
    if (!!isMobile.value && !game.mobile) {
      useErrorNotifications(ref('This game can not be played in mobile devices'))
    } else if (!isMobile.value && !game.desktop) {
      useErrorNotifications(ref('This game can not be played without mobile devices'))
    } else {
      selectedGame.value.id = game.id
      selectedGame.value.link = game.play_url
      selectedGame.value.isPractice = isPractice
    }
  }
}
</script>

<template>
  <div>
    <VUESwiper :slides="props.games" :group-id="props.groupId" :game-name="props.gameName" @play="handleClick" />
  </div>
  <div v-if="selectedGame.id && selectedGame.link">
    <div>
      <CasinoGamePlayer
        :game-link="selectedGame.link" :game-id="selectedGame.id" :practice="selectedGame.isPractice"
        @close="selectedGame.link = ''; selectedGame.id = ''"
      />
    </div>
  </div>
</template>
