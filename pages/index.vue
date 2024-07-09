<template>
  <div>


    <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="300px"
        
        class="text-white shadow-1 rounded-border"
      >
        <q-carousel-slide name="1" img-src="/images/HeroImage.png" class="tw-w-full tw-h-full"></q-carousel-slide>
        <q-carousel-slide name="2" img-src="/images/Fenan pay.png" class="tw-w-full tw-h-full"></q-carousel-slide>
        <q-carousel-slide name="3" img-src="/images/Fly emrates.png" class="tw-w-full tw-h-full"></q-carousel-slide>
        <q-carousel-slide name="4" img-src="/images/Pepsi banner.png" class="tw-w-full tw-h-full"></q-carousel-slide>
        <q-carousel-slide name="5" img-src="/images/ITSC banner.png" class="tw-w-full tw-h-full"></q-carousel-slide>
        
      </q-carousel>
  
      <VUESkeleton v-if="status === 'pending'" />
  
    <div v-else class="tw-min-h-screen">
      
      <GamesList :matches="matches" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
const $q = useQuasar()

const layout = useLayout();
const slide =  ref('1')
import type { Matches, Participants } from '~/types/matches';



const matches = ref<Matches[]>([])
 const { data, error, status } = await useLazyFetch(`/api/filter_event/?sport_id=${1}&interval_hours=${24}&page_size=50&page=2`, {
   server: false,
   cache: 'force-cache'
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

 
      }
  
   
 })
    



  

  
   

  

 
 
 



</script>
