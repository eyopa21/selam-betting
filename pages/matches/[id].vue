<script setup lang="ts">
import type { MarketResults, Matches, Participants } from '~/types/matches'

definePageMeta({
  pagePackageType: 'is_pre_match',
})
type Market = {
  marketName: string
  values: Outcome[]
}
type MatchDetail = {
  id: number | string
  teams: string
  league: string
  date: string
  time: string
}

type Outcome = {
  outcomeId: number
  eventId: number
  name: string
  odd: number
}

const route = useRoute()

const count = ref<string | undefined>(undefined)
const markets = ref<MarketResults[] >([])

const loading = ref(true)

const matchDetail = ref<Matches | null>(null)
const formattedDetail = ref<MatchDetail>()
const results = await Promise.allSettled([
  useFetch(`/api/event/detail/${route.params.id}`),
  useFetch(`/api/markets/${route.params.id}/?pageSize=${1000}`),
])

const [matchDetailData, allMarketsData] = results

console.log('allMa', allMarketsData)
if (matchDetailData.status === 'rejected' || allMarketsData.status === 'rejected') {
  throw new Error('One or more of data fetching failed', {
    cause: {
      results,
      uploadType: 'manager',
    },
  })
} else {
  loading.value = false

  const detailData = matchDetailData.value.data.value?.data as any
  count.value = allMarketsData.value.data.value?.data.count
  markets.value = allMarketsData.value.data.value?.data.results ?? []
  if (matchDetail.value === null) {
    matchDetail.value = {} as Matches
  }
  if (detailData) {
    matchDetail.value.id = detailData?.id
    matchDetail.value.league = detailData.parent_name as string
    matchDetail.value.teams = detailData.name
    matchDetail.value.date = convertToDateString(detailData.startTime)
    matchDetail.value.time = new Date(detailData.startTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    })
    matchDetail.value.odds = extractOdds(detailData.markets, detailData.name)
    matchDetail.value.participants = detailData.participant?.map((teams: any) => {
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
    })
  }
  formattedDetail.value = {
    id: matchDetail.value.id,
    teams: matchDetail.value.teams,
    league: matchDetail.value.league,
    date: matchDetail.value.date,
    time: matchDetail.value.time,

  }
}

const visibleMarkets = computed(() => {
  if (markets.value.length) {
    const ret = markets.value?.map((market) => {
      const val: Outcome[] = []
      market.outcomes.forEach((outcome: any) => {
        val.push({
          outcomeId: outcome.id,
          eventId: market?.id,
          name: outcome.name,
          odd: outcome.betting_offers[0]?.odds
            ? outcome.betting_offers[0].odds.toFixed(2).toString()
            : '1',
        })
      })
      return {
        marketName: market.name,
        values: val,
      }
    })
    return ret
  } else {
    return []
  }
})

const tabValue = ref('all-market')

const filteredMarkets: Ref<Market[]> = ref([])

watch(tabValue, () => {
  filterMarkets()
})

function filterMarkets() {
  if (tabValue.value == 'all-market') {
    filteredMarkets.value = visibleMarkets.value as Market[]
  } else {
    filteredMarkets.value = (visibleMarkets.value as Market[]).filter(
      market => market.marketName == tabValue.value,
    )
  }
}

filterMarkets()
</script>

<template>
  <div class="tw-w-full tw-rounded dark:tw-bg-gray-900">
    <div v-if="loading">
      <VUESkeleton />
    </div>

    <div v-else>
      <div class="tw-relative tw-h-64 tw-w-full ">
        <div class="tw-absolute tw-inset-0 tw-h-64 tw-bg-cover tw-bg-center" style="background-image: url('/1xdetail.webp');" />
        <div v-if="matchDetail" class="tw-pt-16">
          <div class=" tw-mx-auto tw-max-w-lg tw-rounded-lg tw-bg-white/30 tw-p-8 tw-shadow-lg tw-backdrop-blur-md">
            <div class="tw-flex tw-justify-center">
              {{ matchDetail.league }}
            </div>
            <div class="tw-flex tw-justify-center">
              {{ formatDate(matchDetail.date) }} - {{ matchDetail.time }}
            </div>
            <div v-if="matchDetail.participants?.length" class="tw-flex tw-items-center tw-justify-center  tw-gap-8">
              <div class="tw-flex tw-items-center tw-gap-2">
                <img :src="matchDetail?.participants[0]?.club.logo" class="tw-size-10">
                <div>{{ matchDetail?.participants[0]?.club.name }}</div>
              </div>
              <div>
                Vs
              </div>
              <div class="tw-flex tw-items-center tw-gap-2">
                <img :src="matchDetail?.participants[1].club.logo" class="tw-size-10">
                <div>{{ matchDetail?.participants[1].club.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-tabs
        v-model="tabValue" inline-label outside-arrows mobile-arrows narrow-indicator indicator-color="positive" no-caps
        class="text-white shadow-2 tw-bg-gray-800 tw-opacity-80 dark:tw-opacity-100"
      >
        <q-tab name="all-market" label="All Market" class="tw-font-bold">
          <p class="tw-text-white">
            ({{ count }})
          </p>
        </q-tab>
        <div v-for="market in visibleMarkets" class="tw-flex tw-items-center tw-justify-around">
          <q-tab :name="market.marketName" :label="market.marketName">
            <p class="tw-text-white">
              ({{ market.values.length }})
            </p>
          </q-tab>
        </div>
      </q-tabs>
      <q-list class="tw-p-4">
        <q-expansion-item
          v-for="market in filteredMarkets" default-opened dense dense-toggle expand-separator
          :label="market.marketName"
          class="tw-mb-2 tw-border tw-p-2 tw-text-gray-700 dark:tw-border-none dark:tw-bg-gray-800 dark:tw-text-white"
          :aria-expanded="true" header-class="tw-bg-gray-700"
        >
          <div class="tw-grid tw-grid-cols-3">
            <Odd
              v-for="outcome in market.values" v-if="formattedDetail" class="tw-col-span-1 tw-m-2" :match-detail="formattedDetail"
              :value="outcome.name" :odd="outcome.odd" :event-id="outcome.eventId" :outcome-id="outcome.outcomeId"
            />
          </div>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>
