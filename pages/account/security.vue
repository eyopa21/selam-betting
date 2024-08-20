<script setup lang="ts">
definePageMeta({
    layout: 'account'
})

const progress = ref(0.33)

</script>

<template>
    <div class="tw-px-4 tw-text-primary-500">
        <div class="tw-font-bold ">
            <h4 class="tw-text-lg">Account Security</h4>
            <p>To prevent fraud and keep your account secure, please complete all the steps below</p>
        </div>
        <div class="tw-mt-2">
            <q-bar dark class="bg-white text-primary tw-py-5">
                <q-icon name="gpp_maybe" size="md" color="red-10" />
                <div class=" tw-pl-4 text-left text-weight-bold">
                    Not protected
                </div>
                <div>
                    <q-badge color="red-10" class="tw-p-1 tw-px-2">
                        {{ progress * 100 }}%
                    </q-badge>

                </div>
            </q-bar>
            <q-linear-progress :value="progress" color="red-10" size="6px" />
        </div>
        <div class="tw-mt-4">
            <div class="tw-flex justify-between tw-gap-4">
                <div class="tw-flex justify-between tw-gap-4 tw-w-1/2">
                    <div class="tw-flex tw-flex-col tw-gap-4 tw-w-full ">
                        <div
                            class="tw-flex tw-relative tw-text-center tw-p-4 tw-flex-col tw-justify-center tw-items-center tw-bg-white ">
                            <q-icon name="local_police" size="xl" color="primary" />
                            <p class="tw-font-bold tw-text-base">Change password</p>
                            <p class="tw-text-gray-400">Change your password every month</p>
                            <q-badge color="white" text-color="black" class="tw-absolute tw-right-0 tw-top-1">
                                <q-icon name="check_circle_outline" color="red" size="sm" />
                            </q-badge>
                        </div>
                        <div
                            class="tw-flex tw-relative tw-text-center tw-p-4 tw-flex-col tw-justify-center tw-items-center tw-bg-gray-300 ">
                            <q-icon name="mobile_friendly" size="xl" color="primary" />
                            <p class="tw-font-bold tw-text-base">Two-factor Authentication (2FA)</p>
                            <p class="tw-text-gray-400">Protect your account from fraud in 2FA</p>
                            <q-badge text-color="black" class="tw-absolute tw-right-0 tw-top-1 tw-bg-gray-300">
                                <q-icon name="error" color="red" size="sm" />
                            </q-badge>
                            <div class="tw-absolute tw-top-0 tw-left-0">
                                <q-toggle />
                            </div>
                        </div>
                        <div
                            class="tw-flex tw-relative tw-text-center tw-p-4 tw-flex-col tw-justify-center tw-items-center tw-bg-white ">
                            <q-icon name="stay_primary_portrait" size="xl" color="primary" />
                            <p class="tw-font-bold tw-text-base">Link your phone</p>
                            <p class="tw-text-gray-400">This will enable you to restore access to your account</p>
                            <q-badge color="white" text-color="black" class="tw-absolute tw-right-0 tw-top-1">
                                <q-icon name="check_circle_outline" color="red" size="sm" />
                            </q-badge>
                        </div>
                    </div>
                    <div class="tw-flex tw-flex-col tw-gap-4 tw-w-full">
                        <div
                            class="tw-flex tw-relative tw-text-center tw-p-4 tw-flex-col tw-justify-center tw-items-center tw-bg-gray-300 ">
                            <q-icon name="device_unknown" size="xl" color="primary" />
                            <p class="tw-font-bold tw-text-base">Security question</p>
                            <p class="tw-text-gray-400">Enter an answer that only you kow</p>
                            <q-badge text-color="black" class="tw-absolute tw-right-0 tw-top-1 tw-bg-gray-300">
                                <q-icon name="error" color="red" size="sm" />
                            </q-badge>

                        </div>
                        <div
                            class="tw-flex tw-relative tw-text-center tw-p-4 tw-flex-col tw-justify-center tw-items-center tw-bg-white ">
                            <q-icon name="mail" size="xl" color="primary" />
                            <p class="tw-font-bold tw-text-base">Email login enabled</p>
                            <p class="tw-text-gray-400">This is the most insecure way to log in Using your ID
                                <span class="tw-text-red-700 tw-font-bold">“8871646998”</span> to log in
                            </p>
                            <q-badge color="white" text-color="black" class="tw-absolute tw-right-0 tw-top-1">
                                <q-icon name="error" color="red" size="sm" />
                            </q-badge>
                            <div class="tw-absolute tw-top-0 tw-left-0">
                                <q-toggle />
                            </div>
                        </div>
                    </div>

                </div>
                <div class="tw-flex tw-bg-white tw-flex-col tw-p-4 tw-gap-2 tw-w-1/2">
                    <div class="tw-flex  tw-justify-between tw-items-center">
                        <h5 class="tw-font-extrabold tw-text-xl">
                            Recent sessions
                        </h5>
                        <div>
                            <q-btn color="primary" class="tw-py-2">End all sessions</q-btn>
                        </div>
                    </div>
                    <div>
                        Active sessions shown here (0)
                    </div>
                    <h5 class="tw-font-extrabold tw-text-lg">
                        Session History
                    </h5>
                    <div class="tw-flex tw-flex-col tw-space-y-2">
                        <div v-for="i in 5" class="tw-flex tw-items-center tw-gap-3">
                            <q-icon name="laptop" size="lg" />
                            <div>
                                <span class="tw-font-bold tw-text-base">Windows - Ethiopia, Addis Ababa</span>
                                <p class="tw-text-gray-400">23/06/2024 (9:21) Desktop site 196.180.76.21</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    </div>
</template>