<script setup lang="ts">
definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})

const tab = ref<'deposit' | 'cash_out' | 'withdraw' | 'transfer_to_user'>('deposit')
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
          <q-tab name="withdraw">
            <q-btn text-color="black" class="tw-px-8 tw-py-3">
              Withdrawals
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
              <TransactionCashouts />
            </q-tab-panel>
            <q-tab-panel name="transfer_to_user">
              <div class="text-h6">
                User Transfer
              </div>
              <TransactionUserTransfer />
            </q-tab-panel>
            <q-tab-panel name="withdraw">
              <div class="text-h6">
                Withdrawals
              </div>
              <TransactionWithdraw />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </div>
</template>
