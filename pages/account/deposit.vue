<script setup lang="ts">
    definePageMeta({
        layout: 'account'
    })
    const tab = ref('recommended')
    const payments = ref([{
        label: 'Telebirr',
        name: 'telebirr',
        icon: '/icons/payment/telebirr.svg',
        tags: ['wallet', 'recommended']
    }, {
        label: 'Yene Pay',
        name: 'yenepay',
        icon: '/icons/payment/yenepay.svg',
        tags: ['wallet']
    }, {
        label: 'Amole',
        name: 'amole',
        icon: '/icons/payment/amole.svg',
        tags: ['wallet']
    }, {
        label: 'CBE Birr',
        name: 'cbebirr',
        icon: '/icons/payment/cbebirr.svg',
        tags: ['mobile', 'internet']
    }, {
        label: 'Visa',
        name: 'visa',
        icon: '/icons/payment/visa.svg',
        tags: ['mobile']
    }, {
        label: 'Master Card',
        name: 'mastercard',
        icon: '/icons/payment/mastercard.svg',
        tags: ['mobile', 'internet']
    }, {
        label: 'Zele',
        name: 'zele',
        icon: '/icons/payment/zele.svg',
        tags: ['mobile', 'internet']
    }])
</script>

<template>
    <div class="tw-text-primary-500 tw-font-semibold">

        <div class="tw-space-y-4 tw-p-2">
            <div>
                <p>Select Your Payment Method to Top Up your account</p>
            </div>
            <div class="tw-space-y-4">
                <q-banner inline-actions class="text-white tw-bg-white " dense>
                    <template v-slot:avatar>
                        <q-icon name="error" color="blue-grey-7" size="md" />
                    </template>
                    <div class="text-accent tw-font-bold">
                        Dear User, Please send the deposit request with the correct information to avoid delay in the
                        amount. If you have made a deposit and the money has not been credited to your personal account
                        within 3 hours, please contact our support team by email. example@harifsport.com
                    </div>
                </q-banner>
                <q-banner inline-actions class="text-white tw-bg-white ">
                    <template v-slot:avatar>
                        <q-icon name="error" color="blue-grey-7" size="md" />
                    </template>
                    <div class="text-accent tw-font-bold">
                        Earn money by becoming a HarifSport partner using eam cash. Earn commissions for HarifSport
                        users by
                        making deposits and withdrawals.
                        Write to us for more information Telegram: https://t.me/TeamcashET WhatsApp: https://wa.me/+251
                        91
                        173 7798
                    </div>
                    <template v-slot:action>
                        <q-btn flat color="white" icon="close" />
                    </template>
                </q-banner>
            </div>
            <div class="tw-flex tw-justify-between tw-gap-32">
                <div class="tw-h-min">
                    <q-tabs :outside-arrows="true" v-model="tab" inline-label vertical
                        class="text-primary-500  bg-white" style="min-width: 300px; max-height: 240px;"
                        active-class="tw-bg-primary-500 tw-text-white tw-font-bold">
                        <q-tab name="recommended" class="tw-place-content-start  "
                            content-class="tw-flex tw-w-full tw-justify-between tw-relative ">
                            <span>RECOMMENDED METHODS</span>
                            <span side>1</span>
                        </q-tab>
                        <q-tab name="all" class=" tw-place-content-start "
                            content-class="tw-flex tw-w-full tw-justify-between">
                            <span>ALL METHODS </span>
                            <span side>16</span>
                        </q-tab>
                        <q-tab name="wallet" class=" tw-place-content-start "
                            content-class="tw-flex tw-w-full tw-justify-between">
                            <span>E-WALLETS</span>
                            <span side>4</span>
                        </q-tab>
                        <q-tab name="mobile" class=" tw-place-content-start "
                            content-class="tw-flex tw-w-full tw-justify-between">
                            <span>MOBILE PAYMENTS</span>
                            <span side>6</span>
                        </q-tab>
                        <q-tab name="internet" class=" tw-place-content-start "
                            content-class="tw-flex tw-w-full tw-justify-between">
                            <span>INTERNET BANKING</span>
                            <span side>5</span>
                        </q-tab>
                    </q-tabs>
                </div>
                <div class=" tw-w-full">
                    <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up"
                        transition-next="jump-up">
                        <q-tab-panel name="recommended">
                            <div class=" tw-flex tw-flex-wrap  tw-gap-4  tw-font-bold q-mb-md">
                                RECOMMENDED METHODS</div>
                            <div v-for="(i, key) in payments" :key="key" class="tw-border tw-w-min">
                                <div v-if="i.tags.includes('recommended')">
                                    <q-img fit="scale-down" :src="i.icon" :alt="i.name" class="tw-w-32 tw-h-20" />
                                    <div style="width: 150px;" class="  tw-text-white tw-text-center tw-bg-primary-500">
                                        {{ i.label }}
                                    </div>
                                </div>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="all">
                            <div class="tw-font-bold q-mb-md">All METHODS</div>
                            <div class="tw-flex tw-flex-wrap   tw-gap-4 ">
                                <div v-for="(i, key) in payments" :key="key" class="tw-border">
                                    <div>
                                        <q-img fit="scale-down" :src="i.icon" :alt="i.name" class="tw-w-32 tw-h-20" />
                                        <div class="tw-w-full  tw-text-white tw-text-center tw-bg-primary-500">
                                            {{ i.label }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="mobile">
                            <div class="tw-font-bold q-mb-md">MOBILE PAYMENTS</div>
                            <div class="tw-flex tw-flex-wrap   tw-gap-4 ">
                                <div v-for="(i, key) in payments" :key="key">
                                    <div v-if="i.tags.includes('mobile')" class="tw-border">
                                        <q-img fit="scale-down" :src="i.icon" :alt="i.name" class="tw-w-32 tw-h-20" />
                                        <div class="tw-w-full  tw-text-white tw-text-center tw-bg-primary-500">
                                            {{i.label}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="wallet">
                            <div class="tw-font-bold q-mb-md">WALLET METHODS</div>
                            <div class="tw-flex tw-flex-wrap   tw-gap-4 ">
                                <div v-for="(i, key) in payments" :key="key">
                                    <div v-if="i.tags.includes('wallet')" class="tw-border">
                                        <q-img fit="scale-down" :src="i.icon" :alt="i.name" class="tw-w-32 tw-h-20" />
                                        <div class="tw-w-full  tw-text-white tw-text-center tw-bg-primary-500">
                                            {{ i.label }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="internet">
                            <div class="tw-font-bold q-mb-md">INTERNET BANKING METHODS</div>
                            <div class="tw-flex tw-flex-wrap   tw-gap-4 ">
                                <div v-for="(i, key) in payments" :key="key">
                                    <div v-if="i.tags.includes('internet')" class="tw-border">
                                        <q-img fit="scale-down" :src="i.icon" :alt="i.name" class="tw-w-32 tw-h-20" />
                                        <div class="tw-w-full  tw-text-white tw-text-center tw-bg-primary-500">
                                            {{ i.label }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </div>
            </div>
        </div>
    </div>
</template>