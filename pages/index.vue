<script setup lang="ts">
import type { Matches, Participants } from '~/types/matches'

definePageMeta({
  pagePackageType: 'is_pre_match',
})
const layout = useLayout()
const { formatDate, scrollToTop } = useHelpers()

if (import.meta.client) {
  scrollToTop()
}

const matchListStore = useMatchListStore()
const matches = ref<Matches[]>([])
const { data, error, status } = await useLazyFetch(`/api/filter_event/?sport_id=${1}&interval_hours=${24}&page_size=50&page=1`, {
  server: false,
  cache: 'no-cache',

})

if (error.value) {
  console.log('Error fetching tournaments:', error.value)
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
        time: new Date(game.startTime).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'UTC',
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
              name: teams.participant.name,
            },
          } as Participants
        }),
        showMarket: false,
      }
    })
    console.log('matches', matches.value)
    matchListStore.setMatchList(matches.value)
  }
})

const getHasMore = computed(() => {
  return !!data.value?.data.next
})
</script>

<template>
  <div>
    <NavBanner />
    <VUESkeleton v-if="status === 'pending' || layout.mainLoader" />
    <div v-else class="tw-min-h-screen">
      <GamesList :has-more="getHasMore" />
    </div>
  </div>
</template>
