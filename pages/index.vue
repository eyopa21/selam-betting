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


async function getMainData(page: number) {

layout.value.mainLoader = true
const { data: recommendedGames, error } = await useFetch(`/api/filter_event/?sport_id=${1}&interval_hours=${24}&page_size=50&page=${page}`);


if (error.value) {
    console.log("Error fetching tournaments:", error.value);
layout.value.mainLoader = false
    
    return;
  }
if (recommendedGames.value?.data?.results?.length) { 
 const filteredMatches : Matches[] = recommendedGames.value.data.results.map((game: any) => {
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
            },
          } as Participants
        }),
        showMarket: false
      }
    });
  matchListStore.setMatchList(filteredMatches);
  console.log("store", matchListStore.listOfMatches);
    layout.value.mainLoader = false
  }
   
  
}

await getMainData(1)

</script>
