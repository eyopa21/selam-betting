<script setup lang="ts">
import type { Matches, Participants } from '~/types/matches'

const props = defineProps<{
  hasMore?: boolean
}>()
const emit = defineEmits<{
  load: [number]
}>()
const layout = useLayout()
const oddTypes = ref([
  '1',
  'x',
  '2',
  '1x',
  '12',
  '2x',
])
const matches = ref<Matches[]>([])
const { formatDate } = useHelpers()

const sport_categories = ref([
  {
    value: 'Football',
    label: 1,
    icon: '/images/ball.png',
    selected: true,
  },
  {
    value: 'Baseball',
    label: 2,
    icon: '/images/basket.png',
    selected: false,
  },
  {
    value: 'Tennis',
    label: 3,
    icon: '/images/tennis.png',
    selected: false,
  },
  {
    value: 'Volleyball',
    label: 4,
    selected: false,
    icon: '/images/volley.png',
  },
  {
    value: 'Hockey',
    label: 5,
    selected: false,
    icon: '/images/hockey.png',
  },
  {
    value: 'Table Tennis',
    label: 6,
    selected: false,
    icon: '/images/teniis2.png',
  },
  {
    value: 'Cricket',
    label: 7,
    selected: false,
    icon: '/images/cricket.png',
  },
  {
    value: 'Table Tennis',
    label: 6,
    selected: false,
    icon: '/images/teniis2.png',
  },
  {
    value: 'Cricket',
    label: 7,
    selected: false,
    icon: '/images/cricket.png',
  },
])

const matchListStore = useMatchListStore()

const activeHeader: Ref<string> = ref('Matches')

const liveStreamToggle: Ref<boolean> = ref(false)

const headersArray = ['Matches', 'Recommended', 'Upcoming Event']

const getMatches = computed(() => {
  if (matchListStore.listOfMatches.length) {
    return matchListStore.listOfMatches
  } else {
    return []
  }
})

const loading = ref(false)
const hasMore = ref(props.hasMore ?? true)
async function getMoreMatches(page: number) {
  if (loading.value || !hasMore.value) {
    return
  }
  console.log('fetching', matchListStore.listOfMatches?.length)
  loading.value = true
  const { data, error } = await useFetch(
    `/api/filter_event/?sport_id=${1}&interval_hours=${24}&page_size=50&page=${page}`,
  )
  if (error.value) {
    console.log('Error fetching matches:', error.value)
    loading.value = false
  } else {
    if (data.value?.data.results?.length) {
      matches.value = data.value.data.results.map((game: any) => {
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

      console.log('adding')
      matchListStore.addMatchList(matches.value)
      hasMore.value = !!data.value.data.next
      loading.value = false
    }
  }
}

const page = ref(2)
async function loadMore(index: number, done: () => void) {
  setTimeout(async () => {
    await getMoreMatches(page.value)
    page.value++
    done()
  }, 5000)
}
type GroupedMatches = {
  [league: string]: Matches[]
}
const groupedByLeague = computed<GroupedMatches>(() => {
  return getMatches.value.reduce((acc, match) => {
    if (!acc[match.league]) {
      acc[match.league] = []
    }
    acc[match.league].push(match)
    return acc
  }, {} as GroupedMatches)
})
</script>

<template>
  <div>
    <div class="w-full tw-mb-2 tw-flex tw-items-center tw-justify-start tw-bg-gray-800 tw-px-2">
      <div class="tw-ml-4 tw-items-start">
        <q-tabs v-model="activeHeader" inline-label outside-arrows mobile-arrows dense>
          <q-tab
            v-for="header in headersArray" class="tw-text-xl tw-font-semibold tw-text-white" :name="header"
            :label="header"
          />
        </q-tabs>
      </div>
    </div>

    <div
      class="w-full tw-mb-2 tw-flex tw-items-center tw-justify-start tw-gap-3 tw-bg-secondary-800 dark:tw-bg-gray-700"
    >
      <div class="flex tw-mr-2 tw-items-center tw-justify-between">
        <q-toggle v-model="liveStreamToggle" color="white" />
        <p class="tw-text-white">
          With live streams {{ hasMore }}
        </p>
      </div>
    </div>

    <q-tabs
      inline-label outside-arrows mobile-arrows narrow-indicator indicator-color="positive" no-caps
      class="text-white shadow-2 tw-bg-gray-800 tw-opacity-80 dark:tw-opacity-100"
    >
      <q-tab v-for="sport in sport_categories" :key="sport.label" :name="sport.value">
        <NuxtImg class="tw-mr-1 tw-h-5 tw-w-5" :src="sport.icon" />
        <p class="tw-font-semibold tw-text-white">
          {{ sport.value }}
        </p>
      </q-tab>
    </q-tabs>

    <div v-if="!getMatches?.length">
      <VUEEmptyState />
    </div>
    <div v-else>
      <q-tab-panels v-model="activeHeader" animated class="tw-h-full">
        <q-tab-panel name="Recommended">
          recommended matches
        </q-tab-panel>
        <q-tab-panel name="Upcoming Event" class="tw-bg-gray-900">
          <UpcomingEvents :matches="getMatches" />
        </q-tab-panel>
      </q-tab-panels>
      <q-infinite-scroll v-if="getMatches?.length && activeHeader === 'Matches'" :offset="500" @load="loadMore">
        <q-expansion-item
          v-for="(groupedMatch, league) in groupedByLeague" :key="league" :popup="true" expand-icon="add"
          icon="add"
          expanded-icon="remove"
          expand-icon-class=" tw-bg-red-500 tw-mt-1 tw-ml-3 tw-items-center tw-text-center tw-size-6  tw-font-bold" header-class="tw-bg-primary-500 " class="tw-w-full tw-text-white" default-opened
          expand-icon-toggle expand-separator
        >
          <template #header>
            <div class="tw-flex tw-w-full tw-items-center tw-justify-start tw-space-x-2 tw-bg-transparent ">
              <div class="tw-mr-3 tw-flex tw-w-2/5 tw-gap-6   tw-pr-3 ">
                <div><q-icon name="sports_soccer" size="25px" /></div>
                <div>
                  {{ league }}
                </div>
              </div>
              <div class="tw-mb-2  tw-grid tw-grow tw-grid-cols-6 tw-gap-4 ">
                <div v-for="i in oddTypes" :key="i" class=" tw-flex tw-justify-center">
                  {{ i }}
                </div>
              </div>
              <div class="-tw-mt-1 tw-w-8 tw-pt-0.5">
                <q-icon name="favorite_border" class="tw-size-8  tw-scale-[230%] tw-text-red-500 " />
              </div>
            </div>
          </template>

          <template #default>
            <div
              v-for="(match, key) in groupedMatch" :key="key"
              class="tw-mb-3 tw-rounded-md tw-border-2 tw-border-gray-900 tw-bg-gray-800 tw-p-2"
            >
              <div class="dark:text-white tw-flex tw-items-end tw-justify-start">
                <div class="tw-mr-3 tw-w-2/5 tw-border-r-2 tw-border-gray-600 tw-p-3">
                  <div class="tw-flex tw-justify-between">
                    <p class="tw-font-semibold tw-text-gray-700 dark:tw-text-gray-400">
                      {{ match.league.split(",")[1] }} |
                      {{ match.league.split(",")[0] }}
                    </p>
                    <p class="tw-flex tw-flex-col tw-text-end tw-text-xs tw-text-gray-700 dark:tw-text-gray-300">
                      <span>{{ formatDate(match.date) }}
                        <span class="tw-rounded-md tw-bg-green-700 tw-p-1">{{
                          match.time
                        }}</span>
                      </span>
                      <span />
                    </p>
                  </div>
                  <div
                    v-if="match.participants?.length"
                    class="tw-mt-4 tw-flex tw-gap-2 tw-text-sm tw-text-gray-700 dark:tw-text-gray-200"
                  >
                    <span class="tw-flex tw-gap-2">
                      <img
                        class="tw-size-8" :src="match.participants[0].club.logo"
                        :alt="match.participants[0]?.club.name"
                      >
                      {{ match.participants[0]?.club.name }}
                    </span>
                    <span>Vs</span>
                    <span class="tw-flex tw-gap-2">
                      <img
                        class="tw-size-8" :src="match.participants[1].club.logo"
                        :alt="match.participants[1]?.club.name"
                      >
                      {{ match.participants[1]?.club.name }}
                    </span>
                  </div>
                </div>

                <div class="tw-mb-2 tw-grid tw-w-3/5 tw-grid-cols-7 tw-gap-2">
                  <div v-for="odd in match.odds" class="tw-mr-2 tw-w-full">
                    <Odd
                      :match-detail="{
                        id: match.id,
                        teams: match.teams,
                        league: match.league,
                        date: match.date,
                        time: match.time,
                      }" :outcome-id="odd.outcomeId" :event-id="odd.eventId" :value="odd.value" :odd="odd.odd"
                    />
                  </div>
                  <q-btn
                    outline dense padding="xs lg" size="sm" color="green"
                    class="tw-whitespace-nowrap tw-rounded-lg tw-font-semibold tw-text-gray-600 dark:tw-text-white"
                    :label="`+${match.numberOfMarkets}`" @click="$router.push(`/matches/${match.id}`)"
                  >
                    <q-tooltip class="bg-green">
                      View all
                      <span class="tw-underline">{{
                        match.numberOfMarkets
                      }}</span>
                      Markets
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </div>
          </template>
        </q-expansion-item>
        <template #loading>
          <div v-if="hasMore" class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
  </div>
</template>
