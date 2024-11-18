<script setup lang="ts">
definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})
const { $authentication } = useNuxtApp()
const userStore = useUserStore()
const tab = ref('send_request')

const { data, error } = await useFetch('/api/betForMe/get-account-info', {
  method: 'get',
  headers: {
    AUthorization: `Bearer ${$authentication.accessToken.value}`,
  },
})
if (error.value) {
  useErrorNotifications(error)
}
</script>

<template>
  <div class="tw-px-4 tw-text-primary-500">
    <div class="tw-flex tw-w-full tw-justify-end  tw-text-xl tw-font-extrabold ">
      <p>Account No: <span class="tw-text-yellow-500">{{ userStore.user?.user.phone_number }}</span></p>
    </div>

    <div class="tw-mt-4">
      <div class="tw-flex tw-flex-col tw-justify-between tw-gap-6 lg:tw-flex-row">
        <div class="tw-flex tw-w-full tw-flex-col tw-gap-4 lg:tw-w-1/2">
          <BetForMeNearby />
        </div>

        <div class="tw-mt-9 tw-flex tw-w-full tw-flex-col tw-gap-4 lg:tw-w-1/2">
          <q-tabs
            v-model="tab"
            class="bg-primary text-white shadow-2 tw-flex "
            align="left"
            content-class="text-yellow-4"
            indicator-color="yellow-4"
          >
            <q-tab name="send_request" label="Send Request " />
            <q-tab name="make_visible" label="Make my self visible" />
            <q-tab name="bet_for_me" label="Bet for me" />
            <q-tab name="update_location" label="Update Location" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated class="tw-border  tw-bg-white ">
            <q-tab-panel name="send_request">
              <BetForMeAccount v-if="data" :info="data" />
            </q-tab-panel>

            <q-tab-panel name="make_visible">
              <div v-if="data?.approval === false ">
                Please wait for your approval, our team is working on it
              </div>
              <div v-else-if="data?.is_bet_for_me_agent">
                <BetForMeVisibility />
              </div>
              <div v-else>
                We could not do anything right now please contact our support team, Thank you
              </div>
            </q-tab-panel>
            <q-tab-panel name="bet_for_me">
              <div v-if="data?.approval === false">
                Please wait for your approval, our team is working on it
              </div>
              <div v-else-if="data?.is_bet_for_me_agent">
                <BetForMeCashout />
              </div>
              <div v-else>
                We could not do anything right now please contact our support team, Thank you
              </div>
            </q-tab-panel>

            <q-tab-panel name="update_location">
              <BetForMeUpdateLocation />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </div>
</template>
