<template>
    <div>


        <NuxtImg src="/images/HeroImage.png" class="tw-mb-3 tw-w-full" />


        <VUESkeleton v-if="status === 'pending' || isLoading" />

        <div v-else class="tw-min-h-screen">
            <div v-if="!matches.length">
                <VUEEmptyState />
            </div>
            <GamesList v-else :matches="matches" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
const $q = useQuasar()

const layout = useLayout();

import type { Matches, Participants } from '~/types/matches';

const route = useRoute();
const isLoading = ref(true)
const matches = ref<Matches[]>([])
const { data, error, status } = await useLazyFetch(`/api/matches/${route.params.id}`, {
    server: false,
    cache: 'force-cache'

});



if (error.value) {
    console.log("Error fetching tournaments:", error.value);
    isLoading.value = false
}
watch(data, () => {
    if (data.value) {
        console.log("data", data.value);
        isLoading.value = false
        matches.value = data.value.data.results.map((game: any) => {
            return {
                id: game.id,
                league: game.parent_name,
                numberOfMarkets: game.no_market,
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
