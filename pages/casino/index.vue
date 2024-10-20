<script setup lang="ts">
definePageMeta({
  layout: 'casino',
  pageType: 'authenticated',
})

const { $authentication } = useNuxtApp()

const currentPage = ref(1)

const { data: games, error } = await useFetch(`/api/casino/get-groups`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${$authentication.accessToken.value}`,
  },
  body: {
    page: currentPage,
  },
})
if (error.value) {
  useErrorNotifications(error)
}

const filterType = ref<'square' | 'circle'>('square')

function toggleType() {
  if (filterType.value === 'circle') {
    filterType.value = 'square'
  } else {
    filterType.value = 'circle'
  }
}

const filteredGames = computed(() => {
  return games.value?.results
})
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

    <div class="tw-mt-6 tw-flex tw-items-center  tw-justify-between tw-gap-4  tw-px-2 lg:tw-px-8">
      <div class="tw-hidden tw-self-end tw-text-lg tw-text-white lg:tw-block" />

      <CasinoSearchGames />

      <div class="tw-flex  tw-self-center tw-rounded-lg  tw-border-2 tw-border-primary-400">
        <div class="tw-hidden md:tw-block">
          <q-btn-group>
            <q-btn color="primary-10" icon="filter_alt" size="lg" />
            <q-btn color="primary-10" icon="apps" size="lg" @click="toggleType()" />
            <q-btn color="primary-10" icon="control_camera" size="lg" />
          </q-btn-group>
        </div>
        <div class=" tw-block md:tw-hidden">
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
    <div v-if="!!filteredGames?.length" class="tw-mt-8 tw-p-4">
      <div
        class="tw-grid  tw-gap-4 tw-gap-y-8"
        :class="filterType === 'square' ? 'tw-grid-cols-1 sm:grid-cols-2 lg:tw-grid-cols-4' : 'tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-5 xl:tw-grid-cols-6 tw-place-items-center '"
      >
        <div
          v-for="(ii, k) in filteredGames" :key="k"
          class="tw-relative tw-transition-all  tw-duration-500 hover:-tw-translate-y-2"
        >
          <div v-if="filterType === 'square'" class="tw-group tw-cursor-pointer">
            <q-img :src="ii.icon_url" :alt="ii.name" fit="cover" class="tw-h-64  tw-rounded-xl tw-ring tw-ring-blue-500 tw-ring-opacity-40" @click="navigateTo(`/casino/games/${ii.id}`)" />
          </div>
          <div v-else>
            <q-avatar
              font-size="52px"
              color="primary" text-color="white" class="tw-size-[200px] tw-cursor-pointer tw-ring-1 tw-transition-all tw-duration-500 hover:tw-scale-105 lg:tw-size-[170px] 2xl:tw-size-[200px]"
              @click="navigateTo(`/casino/games/${ii.id}`)"
            >
              <q-img :src="ii.icon_url" />
            </q-avatar>
          </div>
        </div>
      </div>
      <div class="tw-mt-16 tw-flex tw-w-full tw-justify-center">
        <q-pagination
          v-if="games"
          v-model="currentPage"
          :max="Math.ceil(games.count / 20)"
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
