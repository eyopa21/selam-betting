<template>
  <div>


    <NuxtImg src="/images/HeroImage.png" class="tw-mb-3 tw-w-full" />


    <VUESkeleton v-if="status === 'pending'" />

    <div v-else class="tw-min-h-screen">

      <GamesList :matches="matches" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
const $q = useQuasar()
const { formatDate, scrollToTop } = useHelpers()
const layout = useLayout();

import type { Matches, Participants } from '~/types/matches';
if (import.meta.client) {
  scrollToTop()
}

const matches = ref<Matches[]>([])
const { data, error, status } = await useLazyFetch(`/api/filter_event/?sport_id=${1}&interval_hours=${24}&page_size=50&page=1`, {
  server: false,
  cache: 'no-cache'

});

if (error.value) {
  console.log("Error fetching tournaments:", error.value);
}
watch(data, () => {
  if (data.value) {
    matches.value = data.value.data.results.map((game: any) => {

      return {
        id: game.id,
        league: game.parent_name,
        teams: game.name,
        numberOfMarkets: game.no_market,
        date: formatDate(game.startTime),
        time: new Date(game.startTime).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC",
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
              name: teams.participant.name
            },
          } as Participants
        }),
        showMarket: false
      }
    });


  }


})

















</script>
