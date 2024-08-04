<script setup>
const { logout} = useAuth();
const percentage = ref(50)

</script>


<template>

    <q-list>
        <div class="tw-m-1 tw-space-y-4">


            <NavLogo />
            <div class="tw-flex tw-justify-between  tw-px-2 tw-bg-primary-700 tw-items-center">
                <div class="tw-flex tw-flex-col tw-text-base">
                    <div class="tw-flex tw-justify-start">
                        <p class="tw-font-semibold">Account NO: </p>
                        <span class="tw-text-amber-500 tw-font-extrabold">123456789</span>
                    </div>
                    <p class="tw-text-gray-400 tw-text-xs tw-underline">jobtennis21@gmail.com</p>
                </div>
                <div>
                    <q-knob rounded readonly show-value  :model-value="percentage" size="50px" 
                        color="accent" center-color="black" track-color="black" class="q-ma-md ">
                        {{ percentage }}%
                    </q-knob>
                </div>
            </div>
            <div class="tw-bg-primary-700 tw-font-semibold tw-p-2">
                <div class="tw-flex tw-justify-between  tw-items-center">
                    <p>Bonus Points</p>
                    <p>0</p>
                </div>
                <div class="tw-flex tw-justify-between   tw-items-center">
                    <p>Main Account(ETB)</p>
                    <p>1000ETB</p>
                </div>
            </div>
            <q-expansion-item default-opened expand-separator label="ACCOUNT"
                header-class="tw-bg-primary-800 tw-text-gray-400 tw-text-lg">
                <q-card class="tw-bg-primary-700 tw-items-start">


                    <q-tabs vertical inline-label dense no-caps>
                        <q-route-tab to="/account/deposit" name="deposit" icon="monetization_on" label="Deposit"
                            class=" tw-place-content-start " />

                        <q-route-tab to="/account/withdraw" name="withdraw" icon="upload" label="Withdraw Funds"
                            class=" tw-place-content-start " />
                        <q-route-tab name="bet_history" icon="access_time" label="Bet History"
                            class=" tw-place-content-start " />
                        <q-route-tab name="transaction_history" icon="multiple_stop" label="Transaction History"
                            class=" tw-place-content-start " />
                    </q-tabs>


                </q-card>
            </q-expansion-item>
            <q-expansion-item default-opened expand-separator label="MISCELLANEOUS"
                header-class="tw-bg-primary-800 tw-text-gray-400 tw-text-lg">
                <q-card class="tw-bg-primary-700 tw-items-start">


                    <q-tabs vertical inline-label dense no-caps>
                        <q-route-tab name="invite" icon="groups" label="Invite Friends"
                            class=" tw-place-content-start " />

                        <q-route-tab name="cashback" icon="currency_exchange" label="Casino VIP Cashback"
                            class=" tw-place-content-start " />
                        <q-route-tab name="bonus" icon="redeem" label="Bonuses and gifts"
                            class=" tw-place-content-start " />
                        <q-route-tab name="support" icon="support_agent" label="Customer Support"
                            class=" tw-place-content-start " />
                    </q-tabs>


                </q-card>
            </q-expansion-item>
            <q-expansion-item default-opened expand-separator label="PROFILE"
                header-class="tw-bg-primary-800 tw-text-gray-400 tw-text-lg">
                <q-card class="tw-bg-primary-700 tw-items-start">


                    <q-tabs vertical inline-label dense no-caps>
                        <q-route-tab name="profile" icon="person" label="Personal profile"
                            class=" tw-place-content-start " />

                        <q-route-tab name="security" icon="lock" label="Security" class=" tw-place-content-start " />

                        <q-route-tab name="settings" icon="settings" label="Account settings"
                            class=" tw-place-content-start " />
                    </q-tabs>


                </q-card>
            </q-expansion-item>
            <div class="tw-pt-8 tw-pb-4 ">
                <q-btn @click="logout()" icon="logout" glossy outline color="red" size="lg" class="tw-w-full ">
                    <span class="text-white tw-text-sm tw-font-bold">
                        Sign Out
                    </span>
                </q-btn>
            </div>
        </div>
    </q-list>
</template>