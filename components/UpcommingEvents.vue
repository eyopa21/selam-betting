<template>
    <div class="">
        <div class="tw-flex tw-justify-between tw-items-center tw-gap-x-4 tw-mx-2 tw-mb-4">
            <div class="column items-center">
                <q-btn-group outline>
                    <q-btn @click="filterGamesByDate(new Date)" outline color="positive" no-caps no-wrap label="Today"
                        icon="event" />
                    <q-btn outline color="positive" no-caps no-wrap label="Pick Date" icon="event">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="date" color="positive" @update:model-value="filterGamesByDate">
                                <div class="row items-center justify-end q-gutter-sm">
                                    <q-btn label="Cancel" color="positive" flat v-close-popup />
                                    <q-btn label="OK" color="positive" flat v-close-popup />
                                </div>

                            </q-date>
                        </q-popup-proxy>
                    </q-btn>

                </q-btn-group>
            </div>
        </div>
        <div class="tw-grid tw-grid-cols-2 tw-gap-2">
            <div v-for="match in props.matches" :key="match.id"
                class="tw-w-full tw-bg-gray-700 tw-p-3 tw-rounded-md tw-text-white">
                <div class="tw-flex tw-justify-between">
                    <div>{{ match.league }}</div>
                    <div>{{ match.date }} | {{ match.time }}</div>
                </div>
                <div class="tw-flex tw-justify-between tw-items-center tw-mt-3 tw-mb-3">
                    <div class="">
                        <div class="tw-flex">
                            <img :src="match.participants[0].club.logo" class="tw-size-6 tw-mr-3" alt="">
                            <p>{{ match.participants[0].club.name }}</p>
                        </div>
                        <div class="tw-flex tw-mt-2">
                            <img :src="match.participants[1].club.logo" class="tw-size-6 tw-mr-3" alt="">
                            <p>{{ match.participants[1].club.name }}</p>
                        </div>
                    </div>
                    <div>
                        <q-btn label="All Markets" no-caps dense class="tw-px-2 tw-bg-green-700"></q-btn>
                    </div>
                </div>

                <div class="tw-grid tw-grid-cols-3 tw-gap-2 tw-border-t-2  tw-border-gray-600">
                    <div v-for="odd in match.odds" :key="odd.outcomeId"
                        class="tw-mt-3 tw-w-full tw-bg-gray-600 tw-rounded-md tw-px-2 hover:tw-bg-gray-800">
                        <div class="tw-flex tw-justify-between tw-py-1">
                            <div>{{ odd.value }}</div>
                            <div>{{ odd.odd }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import type { Matches, Participants } from '~/types/matches';

const props = defineProps<{
    matches: Matches[]
}>()

const layout = useLayout();
const $q = useQuasar()
const { scrollToTop } = useHelpers();
const matchListStore = useMatchListStore();
const matches = ref<Matches[]>([])




async function filterGamesByDate(date: Date) {
    scrollToTop();
    layout.value.mainLoader = true
    const formattedDate = new Date(date).toLocaleDateString('en-US');
    useFetch(`/api/filterEvent/byDate?date=${formattedDate}`, {
        cache: 'no-cache'
    }).then(res => {
        layout.value.mainLoader = false

        if (res.data.value?.data.results.length) {
            matches.value = res.data.value?.data.results?.map((game: any) => {
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
            matchListStore.setMatchList(matches.value)
        } else {
            matchListStore.listOfMatches = []
        }

    }).catch(err => {

        layout.value.mainLoader = false
        $q.notify({
            message: 'Error filtering matches',
            icon: 'announcement',
            position: 'right'
        })
    })
}

</script>