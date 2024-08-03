<template>
  <div>


    <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" infinite animated
      control-color="white" navigation padding arrows height="300px" :autoplay="true"
      class="text-white shadow-1 rounded-border">
      <q-carousel-slide name="1" img-src="/images/image 63.png" class="tw-w-full tw-h-full"></q-carousel-slide>
      <q-carousel-slide name="6" img-src="/images/image 64.png" class="tw-w-full tw-h-full"></q-carousel-slide>
      <q-carousel-slide name="7" img-src="/images/image 65.png" class="tw-w-full tw-h-full"></q-carousel-slide>
      <q-carousel-slide name="2" img-src="/images/Fenan pay.png" class="tw-w-full tw-h-full"></q-carousel-slide>
      <q-carousel-slide name="3" img-src="/images/Fly emrates.png" class="tw-w-full tw-h-full"></q-carousel-slide>
      <q-carousel-slide name="4" img-src="/images/Pepsi banner.png" class="tw-w-full tw-h-full"></q-carousel-slide>
      <q-carousel-slide name="5" img-src="/images/ITSC banner.png" class="tw-w-full tw-h-full"></q-carousel-slide>

    </q-carousel>

    <VUESkeleton v-if="status === 'pending' || layout.mainLoader" />

    <div v-else class="tw-min-h-screen">

      <GamesList :hasMore="getHasMore" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Matches, Participants } from '~/types/matches';
const layout = useLayout();
const { formatDate, scrollToTop } = useHelpers()
const slide = ref('1')
if (import.meta.client) {
  scrollToTop()
}

const matchListStore = useMatchListStore()
const matches = ref<Matches[]>([])
const { data, error, status } = await useLazyFetch(`/api/filter_event/?sport_id=${1}&interval_hours=${24}&page_size=50&page=1`, {
  server: false,
  cache: 'no-cache'

});
console.log("all home", data.value?.data);

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
    console.log("matches", matches.value);
    matchListStore.setMatchList(matches.value)
  }


})


const getHasMore = computed(() => {
  return !!data.value?.data.next
})














</script>
