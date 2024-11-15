<script setup lang="ts">
import type { ProcessCashoutBody } from '~/server/api/betForMe/processCashout'

const { $authentication } = useNuxtApp()
const showPassword = ref(false)
const showConfirm = ref(false)
const loading = ref(false)
const finalLoading = ref(false)
const state = ref({
  voucherCode: '',
  amount: 0,
  username: '',
  password: '',
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
      showConfirm.value = true
      state.value.amount = 0
      state.value.username = ''
      state.value.voucherCode = ''
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}

async function finalize() {
  finalLoading.value = true
  try {
    const response = await $fetch('/api/betForMe/finalize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      body: {
        amount: state.value.amount,
        username: state.value.username,
        voucher_code: state.value.voucherCode,
        password: state.value.password,
      } as ProcessCashoutBody,
    })
    if (response) {
      showConfirm.value = false
      state.value.amount = 0
      state.value.username = ''
      state.value.voucherCode = ''
      useSuccessNotification('Operation successfull')
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    finalLoading.value = false
  }
}
</script>

<template>
  <div class="tw-p-4">
    <q-form
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
    </q-form>

    <q-form @submit="finalize()">
      <q-dialog v-model="showConfirm" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">
              Your Password
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              v-model="state.password"
              outlined
              dense
              :type="!showPassword ? 'password' : 'text'"
              label="Your Password *"
              lazy-rules
              :rules="[(val: string) => (val && val.length > 0) || 'Invalid password']"
            >
              <template #append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn v-close-popup flat type="button" label="Cancel" @click="showConfirm = false" />
            <q-btn type="submit" label="Proceed" color="primary" :loading="finalLoading" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-form>
  </div>
</template>
