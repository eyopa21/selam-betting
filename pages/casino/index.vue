<script setup lang="ts">
import type { CasinoGame } from '~/types/casino/games'

definePageMeta({
  layout: 'casino',
  pageType: 'authenticated',
})

const { $authentication } = useNuxtApp()

const { data: games, error } = await useFetch('/api/casino/get-games', {

  method: 'GET',
  headers: {
    Authorization: `Bearer ${$authentication.accessToken.value}`,
  },
})
if (error.value) {
  useErrorNotifications(error)
}

const slide = ref('1')

const filterType = ref<'square' | 'circle'>('square')
const selectedGameLink = ref('')

function toggleType() {
  if (filterType.value === 'circle') {
    filterType.value = 'square'
  } else {
    filterType.value = 'circle'
  }
}
const tempQuery = ref('')
const q = ref('')
function search() {
  q.value = tempQuery.value
}
const filteredGames = computed(() => {
  if (!q.value) {
    return games.value
  }

  return games.value?.filter((game) => {
    return Object.values(game).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})
</script>

<template>
  <div class="tw-mx-auto tw-pb-20">
    <div class="tw-flex tw-w-full tw-gap-2 tw-p-2 ">
      <div class="tw-w-2/3">
        <q-carousel
          v-model="slide" transition-prev="slide-right" transition-next="slide-left" infinite animated
          control-color="white" navigation padding arrows height="300px" :autoplay="true"
          class="text-white shadow-1  rounded-border"
        >
          <q-carousel-slide
            name="1" img-src="/casino/casinoImage.png"
            class="tw-h-full tw-w-full"
          />
        </q-carousel>
      </div>
      <CasinoAwards />
    </div>
    <div class="tw-my-8 tw-flex tw-justify-center">
      <q-tabs
        narrow-indicator dense align="justify" class="text-white text-weight-bolder tw-font-extrabold"
        content-class="text-white"
      >
        <q-route-tab name="home" icon="home" label="LOBBY" />
        <q-route-tab name="virtual" icon="add_to_queue" label="VIRTUAL" />
        <q-route-tab name="league" icon="api" label=" LEAGUE" />
        <q-route-tab name="crash" icon="videogame_asset" label="CRASH GAMES" />
        <q-route-tab name="mines" icon="emoji_events" label="MINES" />
        <q-route-tab name="instant" icon="casino" label="INSTANT WINS" />
        <q-route-tab name="keno" icon="flight_takeoff" label="KENO" />
        <q-route-tab name="plinko" icon="directions_boat_filled" label="PLINKO" />
        <q-route-tab name="roulette" icon="directions_car_filled" label="ROULETTE" />
        <q-route-tab name="slots" icon="fort" label="SLOTS" />
        <q-route-tab name="virtual_games" icon="directions_boat_filled" label="VIRTUAL GAMES" />
      </q-tabs>
    </div>
    <div class="tw-mt-6 tw-flex tw-justify-between tw-gap-4 tw-px-8">
      <div class="tw-self-end tw-text-lg tw-text-white" />
      <div class="tw-flex tw-gap-2">
        <q-input
          v-model="tempQuery"
          outlined standout="text-blue-grey-5" input-class="text-white"
          placeholder="Search for your Games" class="tw-w-72 tw-bg-primary-700 "
        >
          <template #prepend>
            <q-icon name="search" color="blue-grey-2" />
          </template>
        </q-input>
        <q-btn color="primary" label="Let's Look" text-color="blue-grey-2" @click="search()" />
      </div>

      <div class="tw-flex1 tw-self-center tw-rounded-lg tw-border-2 tw-border-primary-400">
        <q-btn-group outline stretch>
          <q-btn color="primary-10" icon="filter_alt" size="lg" />
          <q-btn color="primary-10" icon="apps" size="lg" @click="toggleType()" />
          <q-btn color="primary-10" icon="control_camera" size="lg" />
        </q-btn-group>
      </div>
    </div>
    <div v-if="!!filteredGames?.length">
      <div v-for="(i, key) in filteredGames" :key="key" class="tw-p-8">
        <h1 class="tw-my-4 tw-text-3xl tw-font-extrabold tw-capitalize tw-text-white">
          {{ i.name }}
        </h1>
        <div
          class="tw-grid  tw-gap-4 tw-gap-y-8"
          :class="filterType === 'square' ? 'tw-grid-cols-4' : 'tw-grid-cols-7'"
        >
          <div
            v-for="(ii, k) in i.games" :key="k"
            class="tw-relative tw-transition-all  tw-duration-500 hover:-tw-translate-y-2"
          >
            <div v-if="filterType === 'square'">
              <div class="tw-absolute tw-right-0">
                <q-btn
                  flat round color="white" icon="favorite_outline"
                  class="tw-transition-all tw-duration-500 hover:tw-scale-110"
                />
              </div>
              <q-img :src="ii.logo_url" :alt="ii.label" fit="cover" class="tw-h-64 tw-rounded tw-ring tw-ring-blue-500" />
              <div class="tw-mt-3 tw-flex tw-w-full tw-justify-between tw-space-x-4">
                <q-btn
                  color="deep-purple-14" label="Play" class="tw-w-full tw-rounded-xl tw-ring-2 tw-ring-white"
                  @click="selectedGameLink = ii.play_url"
                />
                <q-btn
                  color="black" label="Practice" class="tw-hidden tw-w-full tw-rounded-xl tw-ring-2 tw-ring-white lg:tw-block"
                  @click=" selectedGameLink = ii.play_url"
                />
              </div>
            </div>
            <div v-else>
              <q-avatar
                size="200px" font-size="52px" color="primary" text-color="white"
                class="tw-cursor-pointer tw-ring-1 tw-transition-all tw-duration-500 hover:tw-scale-105"
              >
                <q-img :src="ii.logo_url" />
              </q-avatar>
              <div class="tw-mt-3  tw-flex tw-justify-around tw-space-x-4 ">
                <q-btn
                  size="sm" color="deep-purple-14" label="Play" class="tw-h-6 tw-w-full tw-rounded-xl tw-ring-1 tw-ring-white"
                  @click="selectedGameLink = ii.play_url"
                />
                <q-btn
                  size="sm" color="black" label="Practice" class=" tw-hidden tw-h-6 tw-w-full tw-rounded-xl tw-ring-1 tw-ring-white lg:tw-block"
                  @click=" selectedGameLink = ii.play_url"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="tw-flex tw-justify-center ">
      <VUENoItemsFound :search="true" @back="tempQuery = ''; q = ''" />
    </div>
    <div v-if="selectedGameLink">
      <CasinoGamePlayer :game-link="selectedGameLink" @close="selectedGameLink = ''" />
    </div>
    <div v-if="games" class=" tw-p-8">
      <CasinoCategories :games />
    </div>
    <div class="tw-mx-auto tw-mt-8 tw-h-full tw-w-3/4 tw-bg-primary-500">
      <CasinoBottomAd />
    </div>
  </div>
</template>
