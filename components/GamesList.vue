<script setup lang="ts">

interface Outcome {
  outcomeId: number
  eventId: number,
  name: string
  odd: number
}


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

interface Matches {
  id: number;
  league: string;
  teams: string;
  date: string;
  time: string;
  odds: Outcome[];
  markets: Markets;
}

const matchListStore = useMatchListStore();
const matches = computed(() => {
  return matchListStore.listOfMatches?.map((match) => {
    return { ...match, isLoading: false }
  })
})
const showMarketArray = ref<any[]>([]);
const aciveHeader: Ref<string> = ref("Matches");

const liveStreamToggle: Ref<boolean> = ref(false);

const headersArray = ["Matches", "Recommended", "Upcoming Event"];

const handleAllMarketClick = async (iid: number) => {

  const isThere = showMarketArray.value.find((i) => i.id == iid);
  if (!isThere) {
    showMarketArray.value.push({ id: iid });

    const resp = await $fetch(`/api/markets/${iid}/?pageSize=${10}`);
    // console.log("markets", resp);
    const obj = matchListStore.listOfMatches?.findIndex(
      (item) => item.id == iid
    );
    if (obj) {
      matchListStore.listOfMatches[obj].markets = resp.data as Markets;
    }
  } else {
    showMarketArray.value = showMarketArray.value.filter((id) => {
      return id.id !== iid;
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
          <div v-for="(match, key) in matches" :key="key" class="tw-mb-4">
            <div class="tw-flex tw-justify-between dark:text-white tw-items-end">
              <div>
                <div class="tw-flex">
                  <p class="tw-font-semibold tw-text-gray-700 dark:tw-text-white">
                    {{ match.league }}
                  </p>
                </div>
                <p class="tw-text-xs tw-text-gray-700 dark:tw-text-white">
                  {{ match.teams }}
                </p>
              </div>
              <div>
                <p class="tw-text-gray-700 dark:tw-text-white">
                  {{ match.date }} - {{ match.time }}
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
                  time: match.time

                }" :outcomeId="odd.outcomeId" :eventId="odd.eventId" :value="odd.value" :odd="odd.odd" />
              </div>
              <q-btn outline
                class="tw-rounded-lg dark:tw-text-white tw-whitespace-nowrap tw-text-gray-600 tw-font-semibold"
                label="All markets +" @click="match.isLoading = true; handleAllMarketClick(match.id)" />
            </div>
            <div v-if="match.isLoading && !match.markets">
              {{ match.isLoading }}
              <q-spinner size="lg" />
            </div>

            <div v-if="match.markets && showMarketArray.find((i) => i.id === match.id)">
              <AllMarkets :matchDetail="{
                id: match.id,
                teams: match.teams,
                league: match.league,
                date: match.date,
                time: match.time

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
