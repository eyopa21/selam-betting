<script setup lang="ts">
definePageMeta({
    layout: 'account'
})


</script>

<template>
    <div class="tw-text-white">
        <div class="tw-font-bold tw-pl-4">
            <h4 class="tw-text-lg">BONUSES AND GIFTS</h4>
            <p>The following bonuses and gifts are available to you. Don't forget to open them before they expire!</p>
        </div>
        <div class="tw-mt-2">
            <q-tabs indicator-color="red-8" class="tw-bg-transparent text-primary" align="left"
                content-class="tw-ml-4 tw-text-yellow-400">
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

            </q-tabs>
        </div>
        <div class="tw-flex  tw-mt-2 tw-pl-4 tw-gap-4">

            <q-input outlined standout="text-blue-grey-5" input-class="text-white" label="Enter Promo code"
                class="tw-bg-primary-700 tw-w-72 ">

            </q-input>
            <q-btn class="tw-bg-primary-900 tw-px-8" label="OK" text-color="blue-grey-2" />


        </div>
        <div class="tw-ml-4 tw-mt-12 tw-flex tw-items-center tw-space-x-2">
            <div>
                <q-icon name="error" color="blue-grey-7" size="sm" />
            </div>
            <div>
                The countdown starts from the moment a bonus is credited, not activated.
            </div>
            <div>
                <a class="tw-text-yellow-400 tw-text-base tw-font-bold tw-cursor-pointer hover:tw-underline tw-underline-offset-4">  Terms and Conditions </a>
            </div>
        </div>

    </div>
</template>