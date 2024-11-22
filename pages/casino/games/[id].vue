<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

definePageMeta({
  layout: 'casino',
  pageType: 'public',
  pagePackageType: 'is_casino_game',
  validate(route) {
    return validateUUID(route.params.id as string)
  },
})

const currentPage = ref(1)

const isMobile = useMediaQuery('(max-width: 768px)')
const gameStore = useCasinoGameStore()
const route = useRoute('casino-games')

const { data: games, error, status } = await useFetch(`/api/casino/get-games-by-group/${route.params.id}`, {
  method: 'POST',

  body: {
    page: currentPage,
    deviceType: isMobile.value ? 'mobile' : 'desktop',
  },
})
if (error.value) {
  useErrorNotifications(error)
}
if (games.value) {
  gameStore.addGames(games.value)
}

const filterType = ref<'square' | 'circle'>('square')

function toggleType() {
  if (filterType.value === 'circle') {
    filterType.value = 'square'
  } else {
    filterType.value = 'circle'
  }
}

onUpdated(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
  <div class="tw-mx-auto tw-pb-20">
    <div class="tw-flex  tw-w-full tw-flex-col tw-gap-2  tw-p-2 lg:tw-flex-row ">
      <div class="tw-w-full lg:tw-w-2/3">
        <NavBanner class="tw-min-h-32 !tw-w-full" />
      </div>
      <CasinoAwards class="tw-hidden lg:tw-block" />
    </div>
    <CasinoFilters />
    <div class="tw-mt-0 tw-flex tw-justify-center tw-gap-4 tw-px-2 lg:tw-px-8">
      <CasinoSearchGames />

      <!-- <div class="tw-flex  tw-self-center tw-rounded-lg tw-border-2 tw-border-primary-400">
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
      </div> -->
    </div>
    <div v-if="status === 'pending'">
      <div class="tw-grid tw-grid-cols-4">
        <div v-for="i in 12" :key="i">
          <SkeletonsCasinoGames />
        </div>
      </div>
    </div>
    <div v-else-if="games?.results?.length">
      <div class="tw-p-4 tw-py-16">
        <CasinoGames :games="games.results" :filter-type="filterType" />
      </div>
      <div class="tw-flex tw-w-full tw-justify-center tw-py-16">
        <q-pagination
          v-if="games?.results"
          v-model="currentPage"
          :max="Math.ceil(games.count / 20)"
          :max-pages="5"
          direction-links
          gutter="20px"
          color="white"
          active-color="secondary"
        />
      </div>
    </div>
    <div v-else class="tw-flex tw-justify-center ">
      <VUENoItemsFound :search="true" @back="$router.back()" />
    </div>
    <div class="tw-mt-8 tw-px-4">
      <CasinoCategories />
    </div>

    <div class="tw-mx-auto tw-mt-64 tw-h-full tw-w-full  tw-px-2">
      <CasinoBottomAd />
    </div>
  </div>
</template>
