<script setup lang="ts">
const { formatDate } = useHelpers();

interface MarketResults {
  count: string;
  odd: string;
}
interface Markets {
  count: string;
  next: string;
  previous: string;
  results: MarketResults[];
}


const matchListStore = useMatchListStore();
const matches = computed(() => {
  return matchListStore.listOfMatches?.map((match) => {
    return { ...match, isLoading: false };
  });
});
const openedMarkets = ref<string[]>([]);
const aciveHeader: Ref<string> = ref("Matches");

const liveStreamToggle: Ref<boolean> = ref(false);

const headersArray = ["Matches", "Recommended", "Upcoming Event"];

const handleAllMarketClick = async (matchId: string, key: number) => {
  const isThere = openedMarkets.value.find((id) => id === matchId);
 
  if (!isThere) {
    openedMarkets.value.push(matchId);
matches.value[key].isLoading = true
    const {data, error} = await useFetch(`/api/markets/${matchId}/?pageSize=${10}`);
  if(error.value) {
    console.log("eroror", error.value);
  } else {
    
      matchListStore.listOfMatches[key].markets = data.value.data as Markets;
    
  }
   
  } else {
    openedMarkets.value = openedMarkets.value.filter((id) => {
      return id !== matchId;
    });
  }
};
</script>
<template>
  <div>
    <div
      class="tw-bg-secondary-800 dark:tw-bg-primary-700 w-full tw-flex tw-justify-between tw-items-center tw-mb-2 tw-p-2">
      <div>
        <p class="tw-font-bold tw-text-white tw-text-xl">
          THE TOURNAMENT STARTS IN 
        </p>
      </div>
      <div></div>
      <div></div>
    </div>
    <div class="tw-bg-[#8E203A] w-full tw-flex tw-justify-start tw-items-center tw-mb-2 tw-px-2">
      <div class="flex tw-items-center tw-border-r tw-border-indigo-900 tw-px-4">
        <q-icon name="home" class="tw-text-white tw-text-3xl" />
        <q-icon name="arrow_forward_ios" class="tw-text-white tw-text-2xl tw-mx-2 tw-font-extralight" />
        <img class="tw-w-6 tw-h-6" src="/images/ball.png" />
        <q-icon name="arrow_forward_ios" class="tw-text-white tw-text-2xl tw-mx-2 tw-font-extralight" />
        <img class="tw-w-7 tw-aspect-ratio" src="/images/cup.png" />
      </div>
      <div class="tw-items-start tw-ml-4">
        <q-tabs v-model="aciveHeader" inline-label outside-arrows mobile-arrows dense>
          <q-tab class="tw-text-white tw-font-semibold tw-text-xl" v-for="header in headersArray" :name="header"
            :label="header" />
        </q-tabs>
      </div>
      <div></div>
    </div>
    <div class="tw-bg-secondary-800 dark:tw-bg-primary-700 w-full tw-flex tw-justify-start tw-items-center tw-mb-2">
      <div class="flex tw-justify-between tw-items-center tw-mr-2">
        <q-toggle v-model="liveStreamToggle" color="white" />
        <p class="tw-text-white">With live streams</p>
      </div>
      <!-- TODO: should be replaced with read data -->
      <div class="flex tw-justify-between tw-items-center tw-mx-1">
        <NuxtImg class="tw-w-6 tw-h-6 tw-mr-1" src="/images/ball.png" />
        <p class="tw-text-white tw-font-semibold">Football</p>
      </div>
      <div class="flex tw-justify-between tw-items-center tw-mx-1">
        <img class="tw-w-6 tw-h-6 tw-mr-1" src="/images/basket.png" />
        <p class="tw-text-white tw-font-semibold">Basketball</p>
      </div>
      <div class="flex tw-justify-between tw-items-center tw-mx-1">
        <img class="tw-w-6 tw-h-6 tw-mr-1" src="/images/tennis.png" />
        <p class="tw-text-white tw-font-semibold">Tennis</p>
      </div>
      <div class="flex tw-justify-between tw-items-center tw-mx-1">
        <img class="tw-w-6 tw-h-6 tw-mr-1" src="/images/volley.png" />
        <p class="tw-text-white tw-font-semibold">Volleyball</p>
      </div>
      <div class="flex tw-justify-between tw-items-center tw-mx-1">
        <img class="tw-w-6 tw-h-6 tw-mr-1" src="/images/hockey.png" />
        <p class="tw-text-white tw-font-semibold">Hockey</p>
      </div>
      <div class="flex tw-justify-between tw-items-center tw-mx-1">
        <img class="tw-w-6 tw-h-6 tw-mr-1" src="/images/teniis2.png" />
        <p class="tw-text-white tw-font-semibold">Table tennis</p>
      </div>
      <div class="flex tw-justify-between tw-items-center tw-mx-1">
        <img class="tw-w-6 tw-h-6 tw-mr-1" src="/images/cricket.png" />
        <p class="tw-text-white tw-font-semibold">Cricket</p>
      </div>
    </div>
    <q-tab-panels v-model="aciveHeader" animated>
      <q-tab-panel name="Matches" class="tw-p-2 tw-bg-secondary-800 dark:tw-bg-primary-700">
        <div class="tw-rounded" v-if="matches?.length">
          <div v-for="(match, key) in matches" :key="key" class="tw-mb-2">
            <div class="tw-flex tw-justify-between dark:text-white tw-items-end">
              <div>
                <div class="tw-flex">
                  <p class="tw-font-semibold tw-text-gray-700 dark:tw-text-gray-400">
                    {{ match.league }}
                  </p>
                </div>
                <div v-if="match.participants?.length" class="tw-flex tw-mt-1 tw-gap-2 tw-text-xs tw-text-gray-700 dark:tw-text-gray-200">
                  <span  class="tw-flex tw-gap-1">
                    <img class="tw-size-4" :src="match.participants[0].club.logo"
                      :alt="match.participants[0]?.club.name" />
                    {{ match.participants[0]?.club.name }}
                  </span>
                  <span>Vs</span>
                  <span class="tw-flex tw-gap-1">
                    <img class="tw-size-4" :src="match.participants[1].club.logo"
                      :alt="match.participants[1]?.club.name" />
                    {{ match.participants[1]?.club.name }}
                  </span>
                </div>
              </div>
              <div class="">
                <p class="tw-flex tw-flex-col tw-text-xs tw-text-end tw-text-gray-700  dark:tw-text-gray-300">
                  <span>{{ formatDate(match.date) }}</span>
                  <span>{{ match.time }}</span>
                </p>
              </div>
            </div>
            <div class="tw-flex tw-justify-between tw-items-center tw-mb-2">
              <div v-for="odd in match.odds" class="tw-w-full tw-mr-2">
                <Odd :matchDetail="{
                  id: match.id,
                  teams: match.teams,
                  league: match.league,
                  date: match.date,
                  time: match.time,
                }" :outcomeId="odd.outcomeId" :eventId="odd.eventId" :value="odd.value" :odd="odd.odd" />
              </div>
              <q-btn outline
                class="tw-rounded-lg dark:tw-text-white tw-whitespace-nowrap tw-text-gray-600 tw-font-semibold"
                label="All markets +" @click="
                  
                handleAllMarketClick(match.id, key);
                " />
            </div>
            <div v-if="match.isLoading ">
               <VUESkeleton/>
            </div>

            <div v-if="
              match.markets && openedMarkets.find((i) => i === match.id)
            ">
              <AllMarkets :matchDetail="{
                id: match.id,
                teams: match.teams,
                league: match.league,
                date: match.date,
                time: match.time,
              }" :markets="match.markets.results" :marketCount="parseInt(match.markets.count ?? 0)" />
            </div>
          </div>
        </div>
        <div v-else>
          <VUEEmptyState />
        </div>
      </q-tab-panel>
      <q-tab-panel name="Recommended">recommended matches </q-tab-panel>
      <q-tab-panel name="Upcoming Event"> upcoming events </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
