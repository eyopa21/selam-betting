<template>
  <div>
    <q-carousel animated v-model="slide" arrows navigation infinite height="257px">
      <q-carousel-slide :name="1" img-src="/images/Fenan pay.png" />
      <q-carousel-slide :name="2" img-src="/images/Fly emrates.png" />
      <q-carousel-slide :name="3" img-src="/images/ITSC banner.png" />
      <q-carousel-slide :name="4" img-src="/images/Pepsi banner.png" />
    </q-carousel>

    <NuxtImg src="/images/HeroImage.png" class="tw-mb-3 tw-w-full" />

    <div v-if="layout.mainLoader" class="tw-flex tw-justify-center">
      <q-spinner color="primary" size="9em" />
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

const slide = ref(1);

import type { Matches, Participants } from '~/types/matches';


const { data: recommendedGames, error } = await useFetch(`/api/filter_event/?sport_id=${1}&interval_hours=${24}&page_size=${20}`);

function isResponseData(response: any): response is { data: any; error?: undefined } {
  return 'data' in response && response.data !== undefined;
}

function isResponseError(response: any): response is { error: string; data?: undefined } {
  return 'error' in response && response.error !== undefined;
}

if (isResponseError(recommendedGames.value) || error.value) {
  $q.notify({
    message: 'Error Loading data',
    icon: 'announcement',
    position: 'right'
  })
}

else if (recommendedGames.value) {
  if (isResponseData(recommendedGames.value)) {
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
