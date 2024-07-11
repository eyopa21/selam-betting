<template>
  <div class="tw-bg-secondary-800 dark:tw-bg-gray-800  tw-py-3 text-white tw-h-full custom-scrollbar">
    <!-- <q-scroll-area style="height: 100vh; max-width: 300px"> -->
      <!-- <div class="tw-flex tw-justify-center tw-mt-6 tw-gap-4">
        <q-btn icon="favorite" flat no-caps label="Popular" ></q-btn>
        <q-btn icon="videocam" flat no-caps label="Live" ></q-btn>
      </div> -->

      <div>
        <q-input v-model="search_key" outlined clearable  label="Search" bg-color="grey-6" dense class="tw-p-3 tw-mt-3 tw-rounded-md">
          <template #append>
            <q-icon name="search"></q-icon>
          </template>
        </q-input>
      </div>
  
      <h3 class="tw-font-semibold tw-text-center tw-text-lg tw-mt-3">Filter Event</h3>
      <div class="tw-flex tw-justify-between tw-items-center tw-gap-x-4 tw-mx-2 tw-mt-3">
        <div class="q-pa-md q-gutter-y-md column items-center">
          <q-btn-group outline>
            <q-btn outline color="positive" no-caps no-wrap label="Today" icon="event" />
            <q-btn outline color="positive" no-caps no-wrap label="Pick Date" icon="event" >
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date" color="positive">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="positive" flat v-close-popup />
                    <q-btn label="OK" color="positive" flat v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn>
          </q-btn-group>
        </div>
      </div>
      <div>
        <ul class="flex tw-justify-around tw-items-center tw-mx-2 tw-my-2 tw-mt-4">
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
      
      <div class="">
        <div class="tw-font-extrabold tw-text-lg tw-p-3 tw-mt-3">Popular</div>
        <ul class="tw-mx-2 tw-p-2 ">
          <li class="tw-mb-1 tw-px-2 tw-rounded-md tw-py-2 hover:tw-bg-gray-700">
            <q-icon name="sports_soccer" class="tw-mr-2 "></q-icon>Premier League
          </li>
          <li class="tw-mb-1 tw-px-2 tw-rounded-md tw-py-2 hover:tw-bg-gray-700"><q-icon name="sports_soccer" class="tw-mr-2"></q-icon>MLB</li>
          <li class="tw-mb-1 tw-px-2 tw-rounded-md tw-py-2 hover:tw-bg-gray-700"><q-icon name="sports_soccer" class="tw-mr-2"></q-icon>LaLiga</li>
          <li class="tw-mb-1 tw-px-2 tw-rounded-md tw-py-2 hover:tw-bg-gray-700"><q-icon name="sports_soccer" class="tw-mr-2"></q-icon>NFL</li>
          <li class="tw-mb-1 tw-px-2 tw-rounded-md tw-py-2 hover:tw-bg-gray-700"><q-icon name="sports_soccer" class="tw-mr-2"></q-icon>Serie A</li>
        </ul>
      </div>
      <div class="tw-mt-">
        <div  class="tw-font-extrabold tw-text-lg tw-p-3">All Sports</div>
        <div v-if="sports.length">
        <q-list v-for="(sport, key) in sports" :key="key" class="tw-bg-gray-800">
          <q-expansion-item v-model="sport.isOpen" expand-separator :label="sport.name" dense class="tw-px-1"
            >
            <div v-if="sport.isOpen">
              <LazyTournaments :sportId="sport.id"/>
            </div>
          </q-expansion-item>
        </q-list>
      </div>
      <div v-else class="tw-p-4">
          No sports found
      </div>
      </div>
      
     
    <!-- </q-scroll-area> -->
  </div>
</template>

<script setup lang="ts">
type Sports = {
    id: string
    name: string
    isOpen: boolean
}

const isLoading = ref(true)
const search_key = ref(null)

const date = ref(null)
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

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 8px; /* Set scrollbar width */
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1; /* Set background of the scrollbar track */
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #d8d8d8; /* Set scrollbar thumb color */
    border-radius: 3px; /* Set scrollbar thumb rounded corners */
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555; /* Set scrollbar thumb hover color */
  }
</style>
