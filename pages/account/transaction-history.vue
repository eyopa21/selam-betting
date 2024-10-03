<script setup lang="ts">
definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})
const { formatDate } = useHelpers()
const tab = ref('main')
const { $authentication } = useNuxtApp()
const currentPage = ref(1)
const { data, error, status } = useLazyFetch('/api/finance/get-transactions', {
  method: 'post',
  headers: {
    Authorization: `Bearer ${$authentication.accessToken.value}`,
  },
  body: {
    page: currentPage,
  },
})
if (error.value) {
  useErrorNotifications(error)
}
</script>

<template>
  <div class="tw-text-primary-500">
    <div class="tw-pl-4 tw-font-bold tw-uppercase">
      <h4 class="tw-text-lg">
        Bet History
      </h4>
      <p>More information about your bets</p>
    </div>
    <div class="tw-mt-2">
      <q-tabs v-model="tab" class=" text-primary" align="left">
        <q-tab name="main">
          <q-btn size="md" color="primary" class="tw-px-8 tw-py-3">
            Main Account
          </q-btn>
        </q-tab>
        <q-tab name="virtual">
          <q-btn color="orange-1" text-color="black" class="tw-px-8 tw-py-3">
            Virtual Account
          </q-btn>
        </q-tab>
        <q-tab name="archive">
          <q-btn color="orange-1" text-color="black" class="tw-px-8 tw-py-3">
            Load Archive
          </q-btn>
        </q-tab>
      </q-tabs>
    </div>
    <div class="tw-mx-4">
      <div class="tw-mt-6 tw-h-full tw-min-h-96  tw-w-full tw-bg-white ">
        <div v-if="status === 'pending'">
          <SkeletonsNearbySearch v-for="i in 4" :key="i" />
        </div>
        <q-tab-panels v-else v-model="tab" animated class="">
          <q-tab-panel name="main">
            <div class="text-h6">
              Mails
            </div>
            <div class="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center">
              <p>No transactions {{ status }}</p>
              {{ data?.results[0] }}
            </div>
          </q-tab-panel>
          <q-tab-panel name="virtual">
            <div class="text-h6 tw-pb-4 tw-font-semibold tw-uppercase">
              Virtual account
            </div>
            <q-list>
              <q-expansion-item
                v-for="i in data?.results"
                :key="i.id"
                switch-toggle-side

                icon="perm_identity"
                label="Account settings"
              >
                <template #header>
                  <div class="tw-flex tw-w-full tw-flex-wrap tw-items-stretch tw-self-end tw-bg-primary-50">
                    <span class="tw-flex-1  tw-px-4 tw-py-2 ">
                      {{ i.game_name }} ({{ i.transaction_type }})
                    </span>

                    <span class="tw-flex-1  tw-px-4 tw-py-2 ">
                      {{ i.id }}
                    </span>

                    <span class=" tw-basis-48  tw-px-4 tw-py-2 ">
                      {{ i.amount }} ETB
                    </span>
                    <span class=" tw-basis-48  tw-px-4 tw-py-2 ">
                      {{ formatDate(i.time_stamp) }}
                    </span>
                  </div>
                </template>

                <q-card>
                  <q-card-section>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                    commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                    eveniet doloribus ullam aliquid.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <div class="tw-my-8 tw-flex tw-w-full tw-justify-end">
                <q-pagination
                  v-if="data?.results"
                  v-model="currentPage"
                  :max="Math.ceil(data.count / 10)"
                  direction-links
                  gutter="20px"
                  color="primary"
                  active-color="secondary"
                />
              </div>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="archive">
            <div class="text-h6">
              Movies
            </div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>
