<script setup lang="ts">
const userStore = useUserStore()
const { logout } = useAuth()
const percentage = ref(50)
</script>

<template>
  <q-list>
    <div class="tw-my-1 tw-space-y-4">
      <!-- <NavLogo /> -->
      <div class="tw-flex tw-items-center tw-justify-between tw-bg-primary-700 tw-px-2 tw-py-4">
        <div class="tw-flex tw-flex-col tw-text-base">
          <div class="tw-flex tw-justify-start">
            <p class="tw-font-semibold">
              Account No:
            </p>
            <span v-if="userStore.user?.user.phone_number" class="tw-font-extrabold tw-text-amber-500">{{ userStore.user?.user.phone_number }}</span>
          </div>
          <p v-if="userStore.user?.user.email" class="tw-text-xs tw-text-gray-400 tw-underline">
            {{ userStore.user?.user.email }}
          </p>
        </div>
        <!-- <div>
          <q-knob
            rounded readonly show-value :model-value="percentage" size="50px"
            color="accent" center-color="black" track-color="black" class="q-ma-md "
          >
            {{ percentage }}%
          </q-knob>
        </div> -->
      </div>
      <div class="tw-bg-primary-700 tw-p-2 tw-font-semibold">
        <div class="tw-flex tw-items-center  tw-justify-between">
          <p>Bonus Points</p>
          <p>0</p>
        </div>
        <div v-if="userStore.user?.stake_balance.stake_balance" class="tw-flex tw-items-center   tw-justify-between">
          <p>Main Account(ETB)</p>
          <p>{{ userStore.user?.stake_balance.stake_balance }}ETB</p>
        </div>
      </div>
      <q-expansion-item
        default-opened expand-separator label="ACCOUNT"
        header-class="tw-bg-primary-800 tw-text-gray-400 tw-text-lg"
      >
        <q-card class="tw-items-start tw-bg-primary-700">
          <q-tabs vertical inline-label dense no-caps>
            <q-route-tab
              active-class="tw-bg-primary-900" to="/account/deposit" name="deposit" icon="monetization_on" label="Deposit"
              class=" tw-place-content-start "
            />

            <q-route-tab
              active-class="tw-bg-primary-900" to="/account/withdraw" name="withdraw" icon="upload" label="Withdraw Funds"
              class=" tw-place-content-start "
            />
            <!-- <q-route-tab
              active-class="tw-bg-primary-900" to="/account/bet-history" name="bet_history" icon="access_time" label="Bet History"
              class=" tw-place-content-start "
            /> -->
            <q-route-tab
              active-class="tw-bg-primary-900" to="/account/transaction-history" name="transaction_history" icon="multiple_stop" label="Transaction History"
              class=" tw-place-content-start "
            />
            <q-route-tab
              active-class="tw-bg-primary-900" to="/account/bet-for-me-agent" name="bet_for_me_agent" icon="record_voice_over" label="Bet For Me"
              class=" tw-place-content-start "
            />
          </q-tabs>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        default-opened expand-separator label="MISCELLANEOUS"
        header-class="tw-bg-primary-800 tw-text-gray-400 tw-text-lg"
      >
        <q-card class="tw-items-start tw-bg-primary-700">
          <q-tabs vertical inline-label dense no-caps>
            <!-- <q-route-tab
              active-class="tw-bg-primary-900" to="/account/invite" name="invite" icon="groups" label="Invite Friends"
              class=" tw-place-content-start "
            />

            <q-route-tab
              active-class="tw-bg-primary-900" to="/account/vip-cashback" name="cashback" icon="currency_exchange" label="Casino VIP Cashback"
              class=" tw-place-content-start "
            />
            <q-route-tab
              active-class="tw-bg-primary-900" to="/account/bonus" name="bonus" icon="redeem" label="Bonuses and gifts"
              class=" tw-place-content-start "
            /> -->
            <q-route-tab
              active-class="tw-bg-primary-900" to="/account/support" name="support" icon="support_agent" label="Customer Support"
              class=" tw-place-content-start "
            />
          </q-tabs>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        default-opened expand-separator label="PROFILE"
        header-class="tw-bg-primary-800 tw-text-gray-400 tw-text-lg"
      >
        <q-card class="tw-items-start tw-bg-primary-700">
          <q-tabs vertical inline-label dense no-caps>
            <q-route-tab
              active-class="tw-bg-primary-900" to="/account/profile" name="profile" icon="person" label="Personal profile"
              class=" tw-place-content-start "
            />
            <!--
            <q-route-tab active-class="tw-bg-primary-900" to="/account/security" name="security" icon="lock" label="Security" class=" tw-place-content-start " />

            <q-route-tab
              active-class="tw-bg-primary-900" to="/account/settings" name="settings" icon="settings" label="Account settings"
              class=" tw-place-content-start "
            /> -->
          </q-tabs>
        </q-card>
      </q-expansion-item>
      <div class="  tw-w-full tw-place-items-center tw-justify-items-center tw-px-4  tw-pb-4 tw-pt-8 ">
        <q-btn icon="logout" outline color="red" size="lg" class="tw-w-full tw-rounded-lg" @click="logout()">
          <span class="text-white tw-text-sm tw-font-bold">
            Sign Out
          </span>
        </q-btn>
      </div>
    </div>
  </q-list>
</template>
