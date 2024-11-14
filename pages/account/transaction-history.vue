<script setup lang="ts">
definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})

const tab = ref<'deposit' | 'cash_out' | 'withdraw' | 'transfer_to_user'>('deposit')
</script>

<template>
  <div class="tw-px-3">
    <div class="tw-text-primary-500">
      <div class="tw-space-y-3 tw-font-bold tw-uppercase">
        <h4 class="tw-text-lg">
          Transaction History
        </h4>
        <p>More information about your transactions</p>
      </div>
      <div class="q-mt-md">
        <q-tabs v-model="tab" inline-label active-class="bg-primary text-white tw-rounded-md" narrow-indicator indicator-color="primary" class="bg-white text-primary" align="left">
          <q-tab icon="data_saver_on" name="deposit" label="Deposits" />
          <q-tab name="cash_out" icon="paid" label="Cash Outs" />
          <q-tab name="transfer_to_user" icon="move_up" label="Transfers" />
          <q-tab name="withdraw" label="Withdrawal" icon="undo" />
        </q-tabs>
      </div>
      <div class="">
        <div class="tw-mt-6 tw-h-full tw-min-h-96  tw-w-full tw-bg-white ">
          <q-tab-panels v-model="tab" animated class="">
            <q-tab-panel name="deposit">
              <TransactionDeposit />
            </q-tab-panel>
            <q-tab-panel name="cash_out">
              <TransactionCashouts />
            </q-tab-panel>
            <q-tab-panel name="transfer_to_user">
              <TransactionUserTransfer />
            </q-tab-panel>
            <q-tab-panel name="withdraw">
              <TransactionWithdraw />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </div>
</template>
