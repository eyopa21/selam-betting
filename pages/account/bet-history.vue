<script setup lang="ts">
    definePageMeta({
        layout: 'account'
    })
    const selectedCheckboxes = ref([])
    const options = [{
            label: 'Sports',
            value: 'sports'
        },
        {
            label: 'Live',
            value: 'live'
        },
        {
            label: 'Settled',
            value: 'settled'
        },
        {
            label: 'Unsettled',
            value: 'unsettled'
        },
        {
            label: 'By settlement time',
            value: 'time'
        },
        {
            label: 'Deleted',
            value: 'deleted'
        },
    ]
</script>

<template>
    <div class="">
        <div class="tw-font-bold">
            <h4 class="tw-text-lg">Bet History</h4>
            <p>More information about your bets</p>
        </div>
        <div class="tw-mt-2">
            <q-tabs indicator-color="red-8" class="bg-white text-primary" align="left" content-class="tw-ml-4 ">
                <q-tab name="my-history">
                    <span class="tw-font-bold">
                        My Bet History
                    </span>
                </q-tab>
                <q-tab name="unsettled">
                    <span class="tw-font-bold">
                        Unsettled Bets
                    </span>
                </q-tab>
                <q-tab name="autosale">
                    <span class="tw-font-bold">
                        AutoSale
                    </span>
                </q-tab>
            </q-tabs>
        </div>
        <div class="tw-mt-2">
            <div class="tw-flex tw-justify-start tw-space-x-4">
                <div class="tw-flex tw-gap-4">
                    <q-btn-dropdown color="primary" label="Filters" class="tw-px-10 ">
                        <div class="column  q-pa-md">

                            <div class="tw-mb-2 tw-bg-gray-100 tw-text-gray-400 tw-text-xs tw-border tw-px-2">Maximum
                                period: 32 days
                            </div>



                            <div class="tw-pb-1 tw-text-gray-500 ">
                                PERIOD
                            </div>
                            <div class="tw-flex tw-justify-between tw-space-x-2 ">

                                <div>
                                    <q-input dense :hide-bottom-space="true" filled type="date" class="tw-w-24 " />
                                </div>
                                <div>
                                    <q-input dense filled type="date" class="tw-w-24 !tw-bg-white" />
                                </div>
                            </div>

                            <div>
                                <div class="tw-pb-1 tw-text-gray-500 ">
                                    BET TYPE
                                </div>
                                <div>
                                    <q-select dense bg-color="white" label-color="white" outlined
                                        :options="['All', 'Accumulator', 'Single']" options-dense />
                                </div>
                            </div>

                            <div>
                                <div class="tw-pb-1 tw-text-gray-500 ">
                                    OTHERS
                                </div>
                                <div>
                                    <q-option-group :options="options" dense type="checkbox"
                                        v-model="selectedCheckboxes" />
                                </div>
                            </div>

                            <div>
                                <q-btn class="tw-w-full" color="red-10">Apply</q-btn>
                            </div>

                        </div>
                    </q-btn-dropdown>
                    <q-btn-dropdown color="primary" label="Send To Email" class="tw-px-10 ">
                        hello
                    </q-btn-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>