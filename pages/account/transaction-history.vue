<script setup lang="ts">
definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})
const { formatDate } = useHelpers()
const tab = ref<'deposit' | 'cash_out' | 'betting' | 'transfer_to_user'>('deposit')
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
  <div>
    <div class="tw-text-primary-500">
      <div class="tw-pl-4 tw-font-bold tw-uppercase">
        <h4 class="tw-text-lg">
          Bet History
        </h4>
        <p>More information about your bets</p>
      </div>
      <div class="tw-mt-2">
        <q-tabs v-model="tab" class=" text-primary" align="left" indicator-color="primary">
          <q-tab name="deposit">
            <q-btn size="md" color="primary" class="tw-px-8 tw-py-3">
              Deposits
            </q-btn>
          </q-tab>
          <q-tab name="cash_out">
            <q-btn text-color="black" class="tw-px-8 tw-py-3">
              Cash outs
            </q-btn>
          </q-tab>
          <q-tab name="transfer_to_user">
            <q-btn text-color="black" class="tw-px-8 tw-py-3">
              Transfers
            </q-btn>
          </q-tab>
          <q-tab name="betting">
            <q-btn text-color="black" class="tw-px-8 tw-py-3">
              Betting
            </q-btn>
          </q-tab>
        </q-tabs>
      </div>
      <div class="tw-mx-4">
        <div class="tw-mt-6 tw-h-full tw-min-h-96  tw-w-full tw-bg-white ">
          <q-tab-panels v-model="tab" animated class="">
            <q-tab-panel name="deposit">
              <div class="text-h6 tw-pb-4 tw-font-semibold tw-uppercase">
                Deposit
              </div>
              <TransactionDeposit />
            </q-tab-panel>
            <q-tab-panel name="cash_out">
              <div class="text-h6 tw-uppercase">
                Cash Outs
              </div>
              <div class="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center">
                <p>No transactions {{ status }}</p>
                {{ data?.results[0] }}
              </div>
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
  </div>
</template>
