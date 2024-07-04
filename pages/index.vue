<template>
  <div>
   

    <NuxtImg src="/images/HeroImage.png" class="tw-mb-3 tw-w-full" />

    <div v-if="layout.mainLoader" class="tw-flex tw-justify-center">
      <VUESkeleton/>
    </div>
    <div v-else>
      <GamesList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
const $q = useQuasar()

const layout = useLayout();
const matchListStore = useMatchListStore();



import type { Matches, Participants } from '~/types/matches';

layout.value.mainLoader = true
const { data: recommendedGames, error } = await useFetch(`/api/filter_event/?sport_id=${1}&interval_hours=${24}&page_size=50`);
console.log("recc", recommendedGames.value);
function isResponseData(response: any): response is { data: any; error?: undefined } {
  return 'data' in response && response.data !== undefined;
}

function isResponseError(response: any): response is { error: string; data?: undefined } {
  return 'error' in response && response.error !== undefined;
}

if (isResponseError(recommendedGames.value) || error.value) {
  layout.value.mainLoader = false
  $q.notify({
    message: 'Error Loading data',
    icon: 'announcement',
    position: 'right'
  })
}

else if (recommendedGames.value) {
  if (isResponseData(recommendedGames.value)) {
    layout.value.mainLoader = false
    const filteredMatches: Matches[] = recommendedGames.value.data.results.map((game: any) => {
      
      return {
        id: game.id,
        league: game.parent_name,
        teams: game.name,
        date: convertToDateString(game.startTime),
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
            }
          } as Participants
        })
      }
    });
    matchListStore.setMatchList(filteredMatches);
  } else if (isResponseError(recommendedGames.value)) {
    console.error('Error fetching recommended games:', recommendedGames.value.error);
  } else {
    console.error('Unexpected response format:', recommendedGames.value);
  }
}
</script>
