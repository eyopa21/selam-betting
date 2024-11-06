<script setup lang="ts">
import type { ProcessCashoutBody } from '~/server/api/betForMe/processCashout'
import type { Address } from '~/types/betForMe'

const { $authentication } = useNuxtApp()

const loading = ref(false)
const state = ref({
  voucherCode: '',
  amount: 0,
  username: '',
})

async function processCashout() {
  loading.value = true
  try {
    const response = await $fetch('/api/betForMe/process-cashout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      body: {
        amount: state.value.amount,
        username: state.value.username,
        voucher_code: state.value.voucherCode,
      } as ProcessCashoutBody,
    })
    if (response) {
      console.log('res', response)
      state.value.amount = 0
      state.value.username = ''
      state.value.voucherCode = ''
      useSuccessNotification('Operation successfull')
    }
  } catch (err) {
    console.log(err)
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="tw-p-4">
    <!-- <WsClient /> -->
    <!-- <q-form
      class="q-gutter-md tw-min-w-96"
      @submit="processCashout()"
    >
      <div class="text-h6 tw-font-semibold tw-uppercase">
        Process Cashout
      </div>

      <q-separator />

      <div class="tw-flex tw-flex-col tw-space-y-8">
        <div class="tw-flex tw-w-full tw-flex-col tw-items-center ">
          <q-input
            v-model="state.voucherCode"
            type="text"
            label="Voucher code"
            class="tw-w-full"
            outlined
            dense
            lazy-rules
            :rules="[
              val => val.length > 5 || 'Invalid code',
            ]"
          />
          <q-input
            v-model="state.username"
            type="text"
            label="Customer's username"
            class="tw-w-full"
            outlined
            dense
            lazy-rules
            :rules="[
              val => val.length > 1 || 'username is required',
            ]"
          />

          <q-input
            v-model="state.amount"
            type="number"
            label="Amount"
            class="tw-w-full"
            outlined
            dense
            lazy-rules
            :rules="[
              val => val.length < 10 || 'Amount must be greater than 10 Birr',
            ]"
          />
        </div>
      </div>

      <div class="-tw-mt-2 tw-flex tw-justify-end">
        <q-btn :loading type="submit" label="Proceed" color="primary" />
      </div>
    </q-form> -->
    <div class="tw-p-4 tw-text-2xl">
      Coming soon
    </div>
  </div>
</template>
