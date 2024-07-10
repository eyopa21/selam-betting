<template>
    <div class="">
        <div class="tw-grid tw-grid-cols-2 tw-gap-2">
            <div v-for="match in matches" :key="match.id"
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

<script setup>
const props = defineProps({
    matches: {
        type: Object,
    }
})
//console.log(props.matches)
</script>