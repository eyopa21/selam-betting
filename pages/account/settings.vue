<script setup lang="ts">
definePageMeta({
    layout: 'account'
})


</script>

<template>
    <div>
        <di class="tw-flex tw-justify-between tw-text-primary-500">
            <div class="tw-font-bold tw-pl-4">
                <h4 class="tw-text-lg">Account settings</h4>
                <p>Additional website features available</p>
            </div>
            <div
                class="tw-bg-white tw-flex tw-justify-end tw-gap-16 tw-items-center tw-px-2 tw-w-cover tw-border tw-place-content-center ">

                <span class="tw-font-semibold tw-text-base">Sign out on all devices </span>
                <q-btn glossy color="primary" class="tw-h-4">
                    <span class="text-white tw-text-sm tw-font-bold">
                        <q-icon name="logout" color="red" /> SIGN OUT
                    </span>
                </q-btn>
            </div>
        </di>
        <div class="tw-mt-6 tw-px-4 tw-flex tw-w-full tw-justify-between tw-gap-4">
            <div class="tw-flex tw-flex-col tw-gap-2 tw-w-1/2">
                <div class="tw-bg-white tw-text-primary-500 tw-w-full tw-p-2 tw-px-8">
                    <h5 class="tw-font-bold tw-text-base">Mailing list</h5>
                    <p>Send via email</p>
                    <div class="tw-flex tw-flex-col tw-font-bold tw-text-base">
                        <q-toggle label="News about events" />
                        <q-toggle label="Deposit notifications" />
                        <q-toggle label="My bet outcomes" />

                    </div>
                </div>
                <div class="tw-bg-white tw-text-primary-500 tw-w-full tw-p-2 tw-px-8">
                    <h5 class="tw-font-bold tw-text-base">Account</h5>
                    <p>Send via email</p>
                    <div class="tw-flex tw-flex-col tw-font-bold tw-text-base">
                        <q-toggle label="Show balance on top panel" />
                        <q-toggle label="Email Sign in" />
                        <q-toggle label="QR code Sign in" />

                    </div>
                </div>
                <div class="tw-bg-white tw-text-primary-500 tw-w-full tw-p-4 tw-pb-8 tw-px-8">
                    <h5 class="tw-font-bold tw-text-base">Account</h5>
                    <p>Get an extra bonus!</p>
                    <div class="tw-flex tw-w-full tw-gap-4  tw-font-bold tw-text-base">
                        <q-input outlined label="First name" class=" tw-w-full" />
                        <q-btn color="orange-4">CHECK</q-btn>

                    </div>
                </div>
            </div>
            <div class="tw-flex tw-flex-col tw-gap-2 tw-w-1/2">
                <div class="tw-bg-white tw-text-primary-500 tw-w-full tw-p-2 tw-px-8">
                    <div class="tw-flex tw-justify-between tw-items-center">
                        <div class="tw-flex tw-flex-col">
                            <p>
                                Two-factor authentication
                            </p>
                            <p>
                                Extract protection for your account
                            </p>
                        </div>
                        <div>
                            <q-btn color="orange-4">ENABLE</q-btn>
                        </div>
                    </div>
                </div>
                <div class="tw-bg-white tw-text-primary-500 tw-w-full tw-p-2 tw-pb-8 tw-px-4">
                    <h5 class="tw-font-bold tw-text-base tw-mb-4">BONUSES</h5>
                    <div class="tw-flex tw-justify-between  tw-gap-6 tw-items-start">
                        <div class="tw-flex tw-flex-col  tw-w-1/2">
                            <div class="tw-bg-primary-600 tw-p-2 tw-text-white tw-flex tw-items-center tw-gap-4">
                                <q-icon name="sports_soccer" size="xl" />
                                <div>
                                    <p class="tw-font-bold">Bonus for sports betting </p>

                                    <p>Welcome bonus on your 1st deposit up to 5,000 ETB</p>
                                </div>
                            </div>
                            <div
                                class=" tw-p-2 tw-text-primary-500 tw-border-primary-500 tw-border-2 tw-items-center tw-flex tw-gap-4">
                                <q-icon name="do_disturb_alt" size="xl" />
                                <div>
                                    <p class="tw-font-bold">Reject bonuses</p>
                                    <p>Make your selection later</p>
                                </div>
                            </div>
                        </div>
                        <div class="tw-w-1/2">
                            <ul class="tw-space-y-2 tw-list-disc">
                                <li>
                                    Regardless of the bonus type chosen, customers are entitled to participate in other
                                    promotions offered by the company. This does not include deposit bonuses that are
                                    subject to wagering bonus funds by placing certain types of bets on sports events.
                                </li>
                                <li>
                                    By rejecting bonuses, you automatically reject all other promotions.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    </div>
</template>