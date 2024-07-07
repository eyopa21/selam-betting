
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
const matches = ref(matchListStore.listOfMatches)
const openedMarkets = ref<string[]>([]);
const aciveHeader: Ref<string> = ref("Matches");

const liveStreamToggle: Ref<boolean> = ref(false);

const headersArray = ["Matches", "Recommended", "Upcoming Event"];
import type { Matches, Participants } from '~/types/matches';

const props = defineProps<{
  matches: Matches[]
}>()

</script>
<template>
  <div>
    <div
      class="tw-bg-secondary-800 dark:tw-bg-gray-800 w-full tw-flex tw-justify-between tw-items-center tw-mb-2 tw-p-2">
      <div>
        <p class="tw-font-bold tw-text-white tw-text-xl">
          THE TOURNAMENT STARTS IN 
        </p>
      </div>
      <div></div>
      <div></div>
    </div>
    <div class="tw-bg-gray-800 w-full tw-flex tw-justify-start tw-items-center tw-mb-2 tw-px-2">
      <div class="flex tw-items-center tw-border-r tw-border-gray-900 tw-px-4">
        <q-icon name="home" class="tw-text-white tw-text-3xl" size="sm"/>
        <!-- <q-icon name="arrow_forward_ios" class="tw-text-white tw-text-2xl tw-mx-2 tw-font-extralight" />
        <img class="tw-w-6 tw-h-6" src="/images/ball.png" />
        <q-icon name="arrow_forward_ios" class="tw-text-white tw-text-2xl tw-mx-2 tw-font-extralight" />
        <img class="tw-w-7 tw-aspect-ratio" src="/images/cup.png" /> -->
      </div>
      <div class="tw-items-start tw-ml-4">
        <q-tabs v-model="aciveHeader" inline-label outside-arrows mobile-arrows dense>
          <q-tab class="tw-text-white tw-font-semibold tw-text-xl" v-for="header in headersArray" :name="header"
            :label="header" />
        </q-tabs>
      </div>
      <div></div>
    </div>
    <div class="tw-bg-secondary-800 dark:tw-bg-gray-700 w-full tw-flex tw-gap-3 tw-justify-start tw-items-center tw-mb-2">
      <div class="flex tw-justify-between tw-items-center tw-mr-2">
        <q-toggle v-model="liveStreamToggle" color="white" />
        <p class="tw-text-white">With live streams</p>
      </div>
      <!-- TODO: should be replaced with read data -->
      <div class="flex tw-justify-between tw-items-center tw-mx-1 tw-cursor-pointer">
        <NuxtImg class="tw-w-5 tw-h-5 tw-mr-3" src="/images/ball.png" />
        <p class="tw-text-white tw-font-semibold">Football</p>
      </div>
      <div class="flex tw-justify-between tw-items-center tw-mx-1 tw-cursor-pointer">
        <img class="tw-w-5 tw-h-5 tw-mr-3" src="/images/basket.png" />
        <p class="tw-text-white tw-font-semibold">Basketball</p>
      </div>
      <div class="flex tw-justify-between tw-items-center tw-mx-1 tw-cursor-pointer">
        <img class="tw-w-5 tw-h-5 tw-mr-3" src="/images/tennis.png" />
        <p class="tw-text-white tw-font-semibold">Tennis</p>
      </div>
      <div class="flex tw-justify-between tw-items-center tw-mx-1 tw-cursor-pointer">
        <img class="tw-w-5 tw-h-5 tw-mr-3" src="/images/volley.png" />
        <p class="tw-text-white tw-font-semibold">Volleyball</p>
      </div>
      <div class="flex tw-justify-between tw-items-center tw-mx-1 tw-cursor-pointer">
        <img class="tw-w-5 tw-h-5 tw-mr-3" src="/images/hockey.png" />
        <p class="tw-text-white tw-font-semibold">Hockey</p>
      </div>
      <div class="flex tw-justify-between tw-items-center tw-mx-1 tw-cursor-pointer" >
        <img class="tw-w-5 tw-h-5 tw-mr-3" src="/images/teniis2.png" />
        <p class="tw-text-white tw-font-semibold">Table tennis</p>
      </div>
      <div class="flex tw-justify-between tw-items-center tw-mx-1 tw-cursor-pointer">
        <img class="tw-w-5 tw-h-5 tw-mr-3" src="/images/cricket.png" />
        <p class="tw-text-white tw-font-semibold">Cricket</p>
      </div>
    </div>
    <q-tab-panels v-model="aciveHeader" animated>
      <q-tab-panel name="Matches" class="tw-p-2 tw-bg-secondary-800 dark:tw-bg-gray-900">
         <q-infinite-scroll v-if="props.matches?.length" :offset="500">

       
        <div class="tw-rounded" >
          <div v-for="(match, key) in props.matches" :key="key" class="tw-mb-3 tw-border-2 tw-rounded-md tw-p-2 tw-bg-gray-800 tw-border-gray-900">
            <div class="tw-flex tw-justify-start dark:text-white tw-items-end">
              <div class="tw-w-[30%] tw-mr-3 tw-border-r-2 tw-border-gray-600 tw-pr-3 tw-px-3 tw-py-3">
                <div class="tw-flex tw-justify-between">
                  <p class="tw-font-semibold tw-text-gray-700 dark:tw-text-gray-400">
                    {{ match.league.split(',')[1] }} | {{ match.league.split(',')[0] }}
                  </p>
                  <p class="tw-flex tw-flex-col tw-text-xs tw-text-end tw-text-gray-700  dark:tw-text-gray-300">
                  <span>{{ formatDate(match.date) }} <span class="tw-bg-green-700 tw-p-1 tw-rounded-md">{{ match.time }}</span> </span>
                  <span></span>
                </p>
                </div>
                <div v-if="match.participants?.length" class="tw-flex tw-mt-4 tw-gap-2 tw-text-sm tw-text-gray-700 dark:tw-text-gray-200">
                  <span  class="tw-flex tw-gap-2">
                    <img class="tw-size-6" :src="match.participants[0].club.logo"
                      :alt="match.participants[0]?.club.name" />
                    {{ match.participants[0]?.club.name }} 
                  </span>
                  <span>Vs</span>
                  <span class="tw-flex tw-gap-2">
                    <img class="tw-size-6" :src="match.participants[1].club.logo"
                      :alt="match.participants[1]?.club.name" />
                    {{ match.participants[1]?.club.name }}
                  </span>
                </div>
               
              </div>
              

              <div class="tw-grid tw-grid-cols-7 tw-gap-2 tw-mb-2 tw-w-[70%]">
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
                class=" tw-rounded-lg dark:tw-text-white tw-whitespace-nowrap tw-text-gray-600 tw-font-semibold" no-caps
                label="+ All Markets" @click="
                  
                $router.push(`/matches/${match.id}`)
                " dense color="positive" />
            </div>
            </div>
           
            

            <div v-if="match.showMarket">
             <AllMarkets :matchDetail="{
                id: match.id,
                teams: match.teams,
                league: match.league,
                date: match.date,
                time: match.time,
              }"   />

            </div>
          </div>
        </div>
         <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
          </q-infinite-scroll>
        
      </q-tab-panel>
      <q-tab-panel name="Recommended">recommended matches </q-tab-panel>
      <q-tab-panel name="Upcoming Event"> upcoming events </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
