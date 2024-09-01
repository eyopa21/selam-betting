<script setup lang="ts">
import type { Tournament, Tournaments } from '~/types/tournaments'

type PopularCountries = {
  name: string
  id: number
  icon: string
  isLoading: boolean
  tournaments: Tournament[]
}

const countries = ref <PopularCountries[]>([{
  name: 'England',
  id: 77,
  icon: '/icons/country/england.svg',
  tournaments: [],
  isLoading: false,

}, {
  name: 'France',
  id: 73,
  icon: '/icons/country/france.svg',
  tournaments: [],
  isLoading: false,
}, {
  name: 'Germany',
  id: 54,
  icon: '/icons/country/germany.svg',
  tournaments: [],
  isLoading: false,
}, {
  name: 'Italy',
  id: 111,
  icon: '/icons/country/italy.svg',
  tournaments: [],
  isLoading: false,
}, {
  name: 'Spain',
  id: 77,
  icon: '/icons/country/spain.svg',
  tournaments: [],
  isLoading: false,
}])

async function getTournamentForSport(country: PopularCountries, index: number) {
  countries.value[index].isLoading = true
  const { data, error } = await useLazyFetch<{ data: Tournaments }>(
    `/api/tournaments/1/?countryId=${country.id}`,
  )
  if (error.value) {
    countries.value[index].isLoading = false
    console.log('Error fetching tournaments:', error.value)
    throw new Error(error.value.message)
  }

  if (data.value?.data?.results?.length) {
    countries.value[index].tournaments = data.value?.data?.results
    countries.value[index].isLoading = false
  }
}
</script>

<template>
  <div class="tw-mx-2">
    <q-expansion-item
      v-for="(i, key) in countries" :key="i.id" :icon="i.icon" dense bordered
      :expand-icon="i.isLoading ? 'cached' : 'arrow_drop_down'"
      :expand-icon-class="i.isLoading ? ' tw-text-white' : 'tw-text-white'"
      @show="getTournamentForSport(i, key)"
    >
      <template #header>
        <!-- <q-item-section avatar>
                    <q-avatar>
                        <img :src="i.icon" :alt="i.name" class="tw-size-6">
                    </q-avatar>

                </q-item-section> -->

        <q-item-section>
          {{ i.name }}
        </q-item-section>
      </template>

      <q-list dense bordered padding class="rounded-borders">
        <q-item v-for="tour in i.tournaments" :key="tour.id" clickable class="tw-mx-4" @click="navigateTo(`/sports/${tour.id}`)">
          <q-item-section>
            {{ tour.name }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
  </div>
</template>
