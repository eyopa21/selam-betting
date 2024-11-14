<script setup lang="ts">
definePageMeta({
  layout: 'casino',
  pageType: 'authenticated',
  pagePackageType: 'is_casino_game',
})
const isMobile = useMediaQuery('(max-width: 768px)')
const gameStore = useCasinoGameStore()

const currentPage = ref(1)
const route = useRoute('casino-search')
const q = ref<string>()
const loading = ref(false)
async function search() {
  loading.value = true

  try {
    const response = await $fetch(`/api/casino/search-games?query=${q.value || route.params.query}`, {
      method: 'POST',
      body: {
        page: currentPage.value,
        deviceType: isMobile.value ? 'mobile' : 'desktop',
      },
    })
    if (response) {
      gameStore.addGames(response)
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}
await search()

const filterType = ref<'square' | 'circle'>('square')

function toggleType() {
  if (filterType.value === 'circle') {
    filterType.value = 'square'
  } else {
    filterType.value = 'circle'
  }
}

watch(currentPage, async () => {
  await search()
})

onUpdated(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
  <div class="tw-mx-auto tw-pb-20">
    <div class="tw-flex  tw-w-full tw-flex-col tw-gap-2  tw-p-2 lg:tw-flex-row ">
      <div class="tw-w-full lg:tw-w-2/3">
        <NavBanner class="tw-min-h-[28rem] !tw-w-full" />
      </div>
      <CasinoAwards />
    </div>
    <CasinoFilters />
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
    <div v-if="loading">
      <div class="tw-grid tw-grid-cols-4">
        <div v-for="i in 12" :key="i">
          <SkeletonsCasinoGames />
        </div>
      </div>
    </div>
    <div v-else-if="gameStore.games?.results?.length">
      <div class=" tw-p-4">
        >

        <CasinoGames :games="gameStore.games.results" :filter-type="filterType" />
      </div>
      <div class="tw-flex tw-w-full tw-justify-center tw-py-16">
        <q-pagination
          v-if="gameStore.games?.results?.length"
          v-model="currentPage"
          :max="Math.ceil(gameStore.games.count / 20)"
          :max-pages="10"
          direction-links
          gutter="20px"
          color="white"
          active-color="secondary"
        />
      </div>
    </div>

    <div v-else class="tw-flex tw-justify-center ">
      <VUENoItemsFound :search="true" />
    </div>

    <div class="tw-mx-auto tw-mt-8 tw-h-full tw-w-3/4 tw-bg-primary-500">
      <CasinoBottomAd />
    </div>
  </div>
</template>
