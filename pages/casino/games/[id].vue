<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import type { GroupGamesRoot } from '~/types/casino/group-games'

definePageMeta({
  layout: 'casino',
  pageType: 'authenticated',
})

const isMobile = useMediaQuery('(max-width: 768px)')

const gameStore = useCasinoGameStore()
const route = useRoute('casino-games')
const { $authentication } = useNuxtApp()

const { data: games, error } = await useFetch(`/api/casino/get-games-by-group/${route.params.id}`, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${$authentication.accessToken.value}`,
  },
})
if (error.value) {
  useErrorNotifications(error)
}
if (games.value) {
  gameStore.addGames(games.value.games)
}

const filterType = ref<'square' | 'circle'>('square')
const selectedGame = ref({
  link: '',
  id: '',
  isPractice: true,
})

function toggleType() {
  if (filterType.value === 'circle') {
    filterType.value = 'square'
  } else {
    filterType.value = 'circle'
  }
}

function handleClick(game: GroupGamesRoot['games'][number], isPractice: boolean) {
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
</script>

<template>
  <div class="tw-mx-auto tw-pb-20">
    <div class="tw-flex  tw-w-full tw-flex-col tw-gap-2  tw-p-2 lg:tw-flex-row ">
      <div class="tw-w-full lg:tw-w-2/3">
        <q-img
          class="tw-h-full tw-w-full tw-rounded-md lg:tw-rounded-3xl"
          src="/casino/casinoImage.png"
        />
      </div>
      <CasinoAwards />
    </div>

    <div class="tw-mt-6 tw-flex tw-justify-between tw-gap-4 tw-px-2 lg:tw-px-8">
      <div class="tw-hidden tw-self-end tw-text-lg tw-text-white lg:tw-block" />
      <CasinoSearchGames />

      <div class="tw-flex  tw-self-center tw-rounded-lg tw-border-2 tw-border-primary-400">
        <div class="tw-hidden md:tw-block">
          <q-btn-group>
            <q-btn color="primary-10" icon="filter_alt" size="lg" />
            <q-btn color="primary-10" icon="apps" size="lg" @click="toggleType()" />
            <q-btn color="primary-10" icon="control_camera" size="lg" />
          </q-btn-group>
        </div>
        <div class="tw-block md:tw-hidden">
          <q-fab
            :model-value="false"
            :square="true"
            vertical-actions-align="left"
            color="primary"
            icon="keyboard_arrow_down"
            direction="down"
          >
            <q-fab-action color="primary" icon="filter_alt" :square="true" />
            <q-fab-action color="primary" icon="apps" :square="true" @click="toggleType()" />
            <q-fab-action color="primary" icon="control_camera" :square="true" />
          </q-fab>
        </div>
      </div>
    </div>
    <div v-if="gameStore.games?.length">
      <div class="tw-p-4 tw-py-0">
        <h1 class="tw-my-4 tw-text-xl tw-font-extrabold tw-capitalize tw-text-white">
          {{ games?.name }}
        </h1>
        <div
          class="tw-grid  tw-gap-4 tw-gap-y-8"
          :class="filterType === 'square' ? 'tw-grid-cols-1 sm:grid-cols-2 lg:tw-grid-cols-4' : 'tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-5  tw-place-items-center '"
        >
          <div
            v-for="(ii, k) in gameStore.games" :key="k"
            class="tw-relative tw-transition-all  tw-duration-500 hover:-tw-translate-y-2"
          >
            <div v-if="filterType === 'square'" class="tw-group">
              <div class="tw-absolute tw-right-0">
                <q-btn
                  flat round color="white" icon="favorite_outline"
                  class="tw-z-50 tw-transition-all tw-duration-500 group-hover:tw-scale-110"
                />
              </div>
              <q-img :src="ii.logo_url" :alt="ii.label" fit="cover" class="tw-h-64  tw-rounded-xl tw-ring tw-ring-violet-500  tw-ring-opacity-60" />
              <div class="tw-mt-5 tw-flex tw-w-full tw-justify-between tw-space-x-4">
                <q-btn
                  color="deep-purple-14" label="Play" class="tw-w-full tw-rounded-xl tw-ring-2 tw-ring-white"
                  @click="handleClick(ii, false)"
                />
                <q-btn
                  color="black" label="Practice" class=" tw-w-full tw-rounded-xl tw-ring-2 tw-ring-white "
                  @click="handleClick(ii, true)"
                />
              </div>
            </div>
            <div v-else class="tw-p-2 tw-shadow-md tw-shadow-primary-500">
              <q-avatar
                font-size="52px" color="primary" text-color="white"
                class="tw-size-[200px] tw-cursor-pointer tw-ring-1 tw-transition-all tw-duration-500  hover:tw-scale-105 2xl:tw-size-[250px]"
              >
                <q-img :src="ii.logo_url" />
              </q-avatar>
              <div class="tw-mt-3  tw-flex tw-justify-around tw-space-x-4 ">
                <q-btn
                  size="sm" color="deep-purple-14" label="Play" class="tw-h-6 tw-w-full tw-rounded-xl tw-ring-1 tw-ring-white"
                  @click="handleClick(ii, false)"
                />
                <q-btn
                  size="sm" color="black" label="Practice" class=" tw-h-6 tw-w-full tw-rounded-xl tw-ring-1 tw-ring-white"
                  @click="handleClick(ii, true)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="tw-flex tw-justify-center ">
      <VUENoItemsFound :search="true" />
    </div>
    <div v-if="selectedGame.id && selectedGame.link">
      <CasinoGamePlayer :game-link="selectedGame.link" :game-id="selectedGame.id" :practice="selectedGame.isPractice" @close="selectedGame.link = ''; selectedGame.id = ''" />
    </div>

    <div class="tw-mx-auto tw-mt-8 tw-h-full tw-w-3/4 tw-bg-primary-500">
      <CasinoBottomAd />
    </div>
  </div>
</template>
