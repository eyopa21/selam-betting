

<script setup lang="ts">
import type { MarketResults, Markets, Matches, Participants } from '~/types/matches';

interface Market {
  marketName: string;
  values: Outcome[];
}
type MatchDetail = {
  id: number | string,
    teams: string,
    league: string
    date: string
    time: string
}

interface Outcome {
  outcomeId: number
  eventId: number,
  name: string
  odd: number
}

const route = useRoute();






const count = ref<string | undefined>(undefined)
const markets = ref<MarketResults[] >([])


 
 const loading = ref(true)

const matchDetail = ref<Matches | null>(null);
const formattedDetail = ref<MatchDetail>()
const results = await Promise.allSettled([
  useFetch(`/api/event/detail/${route.params.id}`),
useFetch(`/api/markets/${route.params.id}/?pageSize=${1000}`)
]);

const [matchDetailData, allMarketsData] = results;

console.log("allMa", allMarketsData);
if (matchDetailData.status === 'rejected' || allMarketsData.status === 'rejected') {
  throw new Error('One or more of data fetching failed', {
    cause: {
      results,
      uploadType: 'manager',
    },
  });
} else {
  loading.value = false

  const detailData = matchDetailData.value.data.value?.data as any;
   count.value = allMarketsData.value.data.value?.data.count
    markets.value = allMarketsData.value.data.value?.data.results ?? []
  if (matchDetail.value === null) {
    matchDetail.value = {} as Matches;
  }
  if (detailData) {

    matchDetail.value.id = detailData?.id;
    matchDetail.value.league = detailData.parent_name as string;
    matchDetail.value.teams = detailData.name;
    matchDetail.value.date = convertToDateString(detailData.startTime);
    matchDetail.value.time = new Date(detailData.startTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
    matchDetail.value.odds = extractOdds(detailData.markets, detailData.name);
    matchDetail.value.participants = detailData.participant?.map((teams: any) => {
      return {
        id: teams.id,
        role: teams.participantRole.id,
        eventId: teams.eventId,
        club: {
          id: teams.participant?.id,
          countryId: teams.participant?.countryId,
          logo: teams.participant?.logoUrl,
          name: teams.participant.name
        },
      } as Participants;
    });
  }
formattedDetail.value = {
    id: matchDetail.value.id,
    teams: matchDetail.value.teams,
  league: matchDetail.value.league,
    date: matchDetail.value.date, 
    time: matchDetail.value.time
    
  }
}
  



const visibleMarkets = computed(() => {
  if (markets.value.length) {
    const ret = markets.value?.map((market) => {
      const val: Outcome[] = [];
      market.outcomes.forEach((outcome: any) => {
        val.push({
          outcomeId: outcome.id,
          eventId: market?.id,
          name: outcome.name,
          odd: outcome.betting_offers[0]?.odds
            ? outcome.betting_offers[0].odds.toFixed(2).toString()
            : "1",
        });
      });
      return {
        marketName: market.name,
        values: val,
      };
    });
    return ret;
  } else {
    return [];
  }
});

const tabValue = ref("all-market");

const filteredMarkets: Ref<Market[]> = ref([]);

watch(tabValue, () => {
  filterMarkets();
});

function filterMarkets() {
  if (tabValue.value == "all-market") {
    filteredMarkets.value = visibleMarkets.value as Market[];
  } else {
    filteredMarkets.value = (visibleMarkets.value as Market[]).filter(
      (market) => market.marketName == tabValue.value
    );
  }
}

filterMarkets();
const isMatchEmpty = computed(() => {
  if (loading.value) return false
  else if (!markets.value?.length) return true
  else {
    return false
  }
})

</script>


<template>
  <div class="tw-w-full dark:tw-bg-secondary-900 tw-rounded">
   
       
   
    <div v-if="loading">
      <VUESkeleton/>
    </div>
    <div v-else>
      <div v-if="isMatchEmpty" >
        <VUEEmptyState/>
      </div>
    <div v-else>
      <div class="tw-relative tw-w-full tw-h-64 ">
      <div class="tw-absolute tw-inset-0 tw-bg-cover tw-bg-center tw-h-64" style="background-image: url('/1xdetail.webp');"></div>
      <div v-if="matchDetail" class="tw-pt-16">
          <div class=" tw-backdrop-blur-md tw-bg-white/30 tw-p-8 tw-rounded-lg tw-shadow-lg tw-max-w-lg tw-mx-auto">
           <div class="tw-flex tw-justify-center">
              {{  matchDetail.league }}
            </div>
            <div class="tw-flex tw-justify-center">
              {{  formatDate(matchDetail.date) }} - {{ matchDetail.time }}
            </div>
           <div v-if="matchDetail.participants?.length" class="tw-flex tw-justify-center tw-items-center  tw-gap-8">
               <div class="tw-flex tw-items-center tw-gap-2">
          <img :src="matchDetail?.participants[0]?.club.logo" class="tw-size-10" />
                  <div>{{matchDetail?.participants[0]?.club.name}}</div>
              </div>
               <div>
                  Vs
              </div>
              <div class="tw-flex tw-items-center tw-gap-2">
         <img :src="matchDetail?.participants[1].club.logo" class="tw-size-10" />
                  <div>{{matchDetail?.participants[1].club.name}}</div>
              </div>
           </div>
          </div>
      </div>
        </div>
        <q-tabs v-model="tabValue" inline-label outside-arrows mobile-arrows
          class="bg-primary text-white shadow-2 tw-opacity-80 dark:tw-opacity-100">
          <q-tab name="all-market" label="All Market" class="tw-font-bold">
            <p class="tw-text-white">({{ count }})</p>
          </q-tab>
          <div v-for="market in visibleMarkets" class="tw-flex tw-justify-around tw-items-center">
            <q-tab :name="market.marketName" :label="market.marketName">
              <p class="tw-text-white">({{ market.values.length }})</p>
            </q-tab>
          </div>
        </q-tabs>
        <q-list class="tw-p-4">
          <q-expansion-item v-for="market in filteredMarkets" icon="push_pin" default-opened dense dense-toggle expand-separator
            :label="market.marketName"
            class="dark:tw-bg-secondary-800 dark:tw-text-white tw-text-gray-700 tw-mb-2 tw-border dark:tw-border-none"
            :aria-expanded="true" header-class="tw-bg-secondary-700">
            <div class="tw-grid tw-grid-cols-3">
              <Odd v-if="formattedDetail" class="tw-m-2 tw-col-span-1" v-for="outcome in market.values" :matchDetail="formattedDetail"
                :value="outcome.name" :odd="outcome.odd" :eventId="outcome.eventId" :outcomeId="outcome.outcomeId" />
            </div>
          </q-expansion-item>
        </q-list>
    </div>
    </div>
  </div>
</template>
