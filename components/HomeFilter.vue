<script setup lang="ts">
import { useQuasar } from 'quasar'
import type { Matches, Participants } from '~/types/matches'

type Sports = {
  id: string
  name: string
  isOpen: boolean
}
const { $authentication } = useNuxtApp()
const { scrollToTop } = useHelpers()
const matchListStore = useMatchListStore()

const isLoading = ref(true)
const search_key = ref(null)

const date = ref<Date | null>(null)
const sports = ref<Sports[]>([])
const matches = ref<Matches[]>([])
function isResponseData(response: any): response is { data: any, error?: undefined } {
  return 'data' in response && response.data !== undefined
}

function isResponseError(response: any): response is { error: string, data?: undefined } {
  if (response) {
    return 'error' in response
  }
  return false
}

const $q = useQuasar()

const { data, error } = await useLazyFetch('/api/sports', {
  cache: 'force-cache',
})
if (isResponseError(data.value) || error.value) {
  $q.notify({
    message: 'Error Loading sports',
    icon: 'announcement',
    position: 'right',
  })
  isLoading.value = false
} else if (data.value && isResponseData(data.value)) {
  sports.value = data.value.data.results?.map((sport: any) => {
    return {
      id: sport.id,
      name: sport.name,
      isOpen: false,
    }
  })
  isLoading.value = false
}

const layout = useLayout()
async function filterGamesByDate(date: Date) {
  scrollToTop()
  layout.value.mainLoader = true

  const formattedDate = new Date(date).toLocaleDateString('en-US')

  useFetch(`/api/filterEvent/byDate?date=${formattedDate}`, {
    cache: 'no-cache',
  }).then((res) => {
    layout.value.mainLoader = false

    if (res.data.value?.data.results.length) {
      matches.value = res.data.value?.data.results?.map((game: any) => {
        return {
          id: game.id,
          league: game.parent_name,
          teams: game.name,
          numberOfMarkets: game.no_market,
          date: formatDate(game.startTime),
          time: new Date(game.startTime).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
          }),
          odds: extractOdds(game.markets, game.name),
          participants: game.participant?.map((teams: any) => {
            return {
              id: teams.id,
              role: teams.participantRole.id,
              eventId: teams.eventId,
              club: {
                id: teams.participant?.id,
                countryId: teams.participant?.countryId,
                logo: teams.participant?.logoUrl,
                name: teams.participant.name,
              },
            } as Participants
          }),
          showMarket: false,
        }
      })
      matchListStore.setMatchList(matches.value)
    } else {
      matchListStore.listOfMatches = []
    }
  }).catch((err) => {
    console.error(err)
    layout.value.mainLoader = false
    $q.notify({
      message: 'Error filtering matches',
      icon: 'announcement',
      position: 'right',
    })
  })
}

const route = useRoute()

if (route.meta.layout === 'account') {
  layout.value.showSideBarProfileMenu = true
}
</script>

<template>
  <q-scroll-area class="fit text-white   tw-py-1">
    <div v-if="$authentication.loggedIn.value && layout.showSideBarProfileMenu">
      <NavUserInfo />
    </div>
    <div v-else>
      <!-- <q-scroll-area style="height: 100vh; max-width: 300px"> -->
      <div class="tw-mt-6 tw-flex tw-justify-center tw-gap-4">
        <q-btn icon="favorite" flat no-caps label="Popular" />
        <q-btn icon="videocam" flat no-caps label="Live" />
      </div>
      <div>
        <q-input
          v-model="search_key" outlined clearable label="Search" bg-color="grey-6" dense
          class="tw-mt-3 tw-rounded-md tw-p-3"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <h3 class="tw-mt-3 tw-text-center tw-text-lg tw-font-semibold">
        Filter Event
      </h3>
      <div class="tw-mx-2 tw-mt-3 tw-flex tw-items-center tw-justify-between tw-gap-x-4">
        <div class="q-pa-md q-gutter-y-md column items-center">
          <q-btn-group outline>
            <q-btn
              outline color="positive" no-caps no-wrap label="Today" icon="event"
              @click="filterGamesByDate(new Date)"
            />
            <q-btn outline color="positive" no-caps no-wrap label="Pick Date" icon="event">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date" color="positive" @update:model-value="filterGamesByDate">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn v-close-popup label="Cancel" color="positive" flat />
                    <q-btn v-close-popup label="OK" color="positive" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn>
          </q-btn-group>
        </div>
      </div>
      <div>
        <ul class="flex tw-m-2 tw-mt-4 tw-items-center tw-justify-around">
          <li class="tw-rounded tw-bg-gray-200 tw-bg-opacity-40 tw-px-3 tw-py-1">
            All
          </li>
          <li class="tw-cursor-pointer hover:tw-underline">
            3 hr
          </li>
          <li class="tw-cursor-pointer hover:tw-underline">
            6 hr
          </li>
          <li class="tw-cursor-pointer hover:tw-underline">
            9 hr
          </li>
          <li class="tw-cursor-pointer hover:tw-underline">
            12 hr
          </li>
          <li class="tw-cursor-pointer hover:tw-underline">
            24 hr
          </li>
        </ul>
      </div>
      <div v-if="isLoading">
        <VUESkeleton />
      </div>
      <div class="">
        <div class="tw-mt-3 tw-p-3 tw-text-lg tw-font-extrabold">
          Popular
        </div>
        <ul class="tw-mx-2 tw-p-2 ">
          <li class="tw-mb-1 tw-rounded-md tw-p-2 hover:tw-bg-gray-700">
            <q-icon name="sports_soccer" class="tw-mr-2 " />Premier League
          </li>
          <li class="tw-mb-1 tw-rounded-md tw-p-2 hover:tw-bg-gray-700">
            <q-icon
              name="sports_soccer"
              class="tw-mr-2"
            />MLB {{ layout.mainLoader }}
          </li>
          <li class="tw-mb-1 tw-rounded-md tw-p-2 hover:tw-bg-gray-700">
            <q-icon
              name="sports_soccer"
              class="tw-mr-2"
            />LaLiga
          </li>
          <li class="tw-mb-1 tw-rounded-md tw-p-2 hover:tw-bg-gray-700">
            <q-icon
              name="sports_soccer"
              class="tw-mr-2"
            />NFL
          </li>
          <li class="tw-mb-1 tw-rounded-md tw-p-2 hover:tw-bg-gray-700">
            <q-icon
              name="sports_soccer"
              class="tw-mr-2"
            />Serie A
          </li>
        </ul>
      </div>
      <div class="tw-mt-2 ">
        <div class="tw-p-3 tw-text-lg tw-font-extrabold">
          All Sports
        </div>
        <div v-if="sports.length">
          <q-scroll-area style="height: 100vh; max-width: 300px">
            <q-list v-for="(sport, key) in sports" :key="key" class="tw-bg-gray-800  ">
              <q-expansion-item v-model="sport.isOpen" expand-separator :label="sport.name" dense class="tw-px-1">
                <div v-if="sport.isOpen">
                  <LazyTournaments :sport-id="sport.id" />
                </div>
              </q-expansion-item>
            </q-list>
          </q-scroll-area>
        </div>
        <div v-else class="tw-p-4">
          Unable to fetch Sports
        </div>
      </div>
      <!-- </q-scroll-area> -->
    </div>
  </q-scroll-area>
</template>

<style scoped>

</style>
