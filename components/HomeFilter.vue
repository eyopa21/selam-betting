<template>
  <div class="tw-bg-secondary-800 dark:tw-bg-primary-700 tw-min-h-screen tw-py-3 text-white tw-w-full">
    <q-scroll-area style="height: 80vh; max-width: 300px">
   <h2 class="tw-text-[#8E203A] tw-font-bold tw-text-2xl tw-text-center">
        Bet Services
      </h2>
      <div class="flex tw-justify-around tw-items-center tw-my-2">
        <q-chip square text-color="white" class="tw-bg-[#8E203A] tw-px-2" size="md" label="Live score" />
        <q-chip square text-color="white" class="tw-bg-[#8E203A] tw-px-2" size="md" label="Results" />
        <q-chip square text-color="white" class="tw-bg-[#8E203A] tw-px-2" size="md" label="Print Odds" />
      </div>
      <hr class="tw-mx-4 tw-my-1" />
      <h3 class="tw-font-semibold tw-text-center tw-text-lg">Filter by date</h3>
      <div class="tw-flex tw-justify-between tw-items-center tw-gap-x-4 tw-mx-2">
        <q-chip square color="primary" text-color="white" dense
          class="tw-px-2 tw-py-4 tw-text-xs tw-cursor-pointer tw-w-full tw-mx-auto" icon="event" label="Today" />
        <q-chip square color="primary" text-color="white" dense
          class="tw-px-2 tw-py-4 tw-text-xs tw-cursor-pointer tw-w-full tw-mx-auto" icon="event" label="Tomorrow" />
        <div style="max-width: 100px">
          <q-btn icon="event" color="primary" class="tw-text-xs tw-whitespace-nowrap tw-w-full tw-mx-auto">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="date">
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Cancel" color="primary" flat v-close-popup />
                  <q-btn label="OK" color="primary" flat v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
        </div>
      </div>
      <div>
        <ul class="flex tw-justify-around tw-items-center tw-mx-2 tw-my-2">
          <li class="tw-bg-gray-200 tw-bg-opacity-40 tw-px-3 tw-py-1 tw-rounded">
            All
          </li>
          <li>3</li>
          <li>6</li>
          <li>9</li>
          <li>12</li>
          <li>24</li>
        </ul>
      </div>

      <div v-if="isLoading">
<VUESkeleton/>
      </div>
      <template v-if="sports.length">
        <q-list v-for="(sport, key) in sports" :key="key" class="tww-w-32">
          <q-expansion-item v-model="sport.isOpen" expand-separator :label="sport.name" dense class="text-white tw-max-h-3 tw-px-1"
            >
            <div v-if="sport.isOpen">
   <LazyTournaments :sportId="sport.id"/>
  </div>
          </q-expansion-item>
        </q-list>
      </template>
      <template v-else class="tw-p-4">
no sports found
      </template>
     
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
type Sports = {
    id: string
    name: string
    isOpen: boolean
}

const isLoading = ref(true)

const sports = ref<Sports[]>([])

function isResponseData(response: any): response is { data: any; error?: undefined } {
  return 'data' in response && response.data !== undefined;
}

function isResponseError(response: any): response is { error: string; data?: undefined } {
  return 'error' in response && response.error !== undefined;
}

import { useQuasar } from 'quasar'

const $q = useQuasar()

const { data, error } = await useLazyFetch('/api/sports')
if (isResponseError(data.value) || error.value) {
  $q.notify({
    message: 'Error Loading sports',
    icon: 'announcement',
    position: 'right'
  })
  isLoading.value = false
}

else if (data.value && isResponseData(data.value)) {
  sports.value = data.value.data.results?.map((sport: any) => {
    return {
      id: sport.id,
      name: sport.name,
      isOpen: false
    } 
  })
    isLoading.value = false
}


</script>
