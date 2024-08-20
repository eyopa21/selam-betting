<script setup lang="ts">
definePageMeta({
    layout: 'account'
})


</script>

<template>
    <div class="tw-text-primary-500">
        <div class="tw-font-bold tw-pl-4">
            <h4 class="tw-text-lg">Support Center</h4>
            <p>For all your website queries</p>
        </div>
        <div class="tw-mt-2 tw-px-4 tw-grid tw-grid-cols-3 tw-gap-4">
            <div
                class="tw-bg-white tw-text-center tw-p-4 tw-shadow-xl tw-rounded-xl tw-min-h-64 tw-flex tw-flex-col tw-justify-between tw-items-center">
                <div class="tw-flex tw-h-full tw-place-content-center tw-flex-col tw-items-center">
                    <q-icon name="question_answer" size="xl" color="primary" />
                    <p class="tw-text-lg tw-font-extrabold">Online consultant</p>
                    <p class="tw-font-semibold">Ask any questions directly in the chat</p>
                </div>
                <q-btn class="tw-mt-auto tw-w-full tw-align-bottom" color="primary">ORDER CALLBACK</q-btn>
            </div>
            <div
                class="tw-bg-white tw-p-4 tw-text-center tw-shadow-xl tw-rounded-xl tw-min-h-64 tw-flex tw-flex-col tw-justify-center tw-items-center">
                <q-icon name="support_agent" size="xl" color="primary" />
                <p class="tw-text-lg tw-font-extrabold">Callback</p>
                <p class="tw-font-semibold">Please complete a request and an operator will get back to you shortly</p>
                <div class="tw-flex tw-flex-col tw-pt-8 tw-gap-2 tw-w-full">
                    <q-input outlined label="First name" dense class="tw-shadow-xl" />
                    <q-input outlined label="Phone number" dense />

                    <q-input autogrow outlined label="Please describe the issue here" />
                </div>
                <q-btn class="tw-mt-4 tw-w-full" color="primary">ORDER CALLBACK</q-btn>
            </div>
            <div
                class="tw-bg-white tw-p-4 tw-shadow-xl tw-text-center tw-rounded-xl tw-min-h-64 tw-flex tw-flex-col tw-justify-center tw-items-center">
                <q-icon name="privacy_tip" size="xl" color="primary" />
                <p class="tw-text-lg tw-font-extrabold">Customer Support query</p>
                <div class="tw-flex tw-flex-col tw-pt-4 tw-h-full  tw-gap-2 tw-w-full">
                    <div class="tw-flex tw-gap-4 tw-w-full  tw-justify-between">
                        <q-input outlined label="First name" dense class="tw-shadow-xl" />
                        <q-input outlined label="Email" dense class="tw-shadow-xl" />
                    </div>
                    <q-input type="textarea" outlined label="Compose message" dense class="tw-shadow-xl" />
                </div>
                <div class="tw-flex tw-mt-6 tw-w-full tw-justify-between tw-gap-4">
                    <q-btn color="primary" class="tw-w-full">SAVE</q-btn>
                    <q-btn color="blue-grey-2" text-color="primary" class="tw-w-full">CLEAR</q-btn>
                </div>
            </div>

        </div>


    </div>
</template>