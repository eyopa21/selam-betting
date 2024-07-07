<template>
  <div>


    <NuxtImg src="/images/HeroImage.png" class="tw-mb-3 tw-w-full" />

    <div v-if="status==='pending'" class="tw-flex tw-justify-center">
      <VUESkeleton />
    </div>
    <div v-else>
      <div  class="tw-p-2 tw-bg-secondary-800 dark:tw-bg-primary-700">
         
         <q-infinite-scroll v-if="matches?.length" :offset="500">

       
        <div class="tw-rounded" >
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
                  
                $router.push(`/matches/${match.id}`)
                " />
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
       
   
        <div v-else>
          <VUEEmptyState />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
const $q = useQuasar()

const layout = useLayout();

import type { Matches, Participants } from '~/types/matches';






</script>
