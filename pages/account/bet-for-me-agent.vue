<script setup lang="ts">
definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})
const { $authentication } = useNuxtApp()
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
      <p>Account No: <span class="tw-text-yellow-500">{{ data?.user_account.phone_number }}</span></p>
    </div>

    <div class="tw-mt-4">
      <h4 class="tw-text-lg tw-font-bold">
        Search fo nearby
      </h4>
      <div class="tw-flex tw-flex-col tw-justify-between tw-gap-6 lg:tw-flex-row">
        <div class="tw-flex tw-w-full tw-flex-col tw-gap-4 lg:tw-w-1/2">
          <div class="tw-border  tw-bg-white tw-p-4">
            <q-list separator class="rounded-borders">
              <q-item v-for="i in 5" :key="i" v-ripple class="q-mb-sm" clickable>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="/arsenal.jpg">
                  </q-avatar>
                </q-item-section>

                <q-item-section class="tw-border-2 tw-px-2">
                  <q-item-label>@Abel_s21</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="tw-border-2 tw-bg-gray-100 tw-p-2 tw-px-4">
                    100 m
                  </div>
                </q-item-section>
                <q-separator spaced inset />
              </q-item>
            </q-list>
          </div>
        </div>

        <div class="tw-flex tw-w-full tw-flex-col tw-gap-4 lg:tw-w-1/2">
          <q-tabs
            v-model="tab"
            class="bg-primary text-white shadow-2 tw-flex tw-rounded-md"
            align="left"
            indicator-color="primary"
          >
            <q-btn-group square class="tw-flex tw-w-full tw-justify-center tw-gap-4 tw-p-2">
              <q-btn push class="!tw-rounded-md" outline color="yellow-4" label="Send Request " @click="tab = 'send_request'" />
              <q-btn push outline class="!tw-rounded-md" color="yellow-4" label="Make my self visible" @click="tab = 'make_visible'" />
              <q-btn push outline class="!tw-rounded-md" color="yellow-4" label="Bet for Me" @click="tab = 'bet_for_me'" />
              <q-btn push outline class="!tw-rounded-md" color="yellow-4" label="Update Location" @click="tab = 'update_location'" />
            </q-btn-group>
          </q-tabs>
          <q-tab-panels v-model="tab" animated class="tw-border  tw-bg-white ">
            <q-tab-panel name="send_request">
              <BetForMeAccount v-if="data" :info="data" />
            </q-tab-panel>

            <q-tab-panel name="make_visible">
              <div class="text-h6">
                Make My self Visible
              </div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
