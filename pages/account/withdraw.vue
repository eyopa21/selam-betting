<script setup lang="ts">
import type { PaymentsRoot } from '~/server/api/finance/get-payment-methods'

definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})
const userStore = useUserStore()

const payments = ref<PaymentsRoot['results']>([])
const isOpen = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const state = ref({
  amount: 0,
  paymentImg: '',
  paymentMethod: '',
  password: '',

})
const {
  $authentication,
} = useNuxtApp()
const {
  data,
  error,
  status,
} = await useFetch<PaymentsRoot>('/api/finance/get-payment-methods', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${$authentication.accessToken.value}`,
  },
  cache: 'no-cache',
})
if (error.value) {
  useErrorNotifications(error)
} else if (data.value) {
  payments.value = data.value.results
}

function handlePaymentClick(paymentMethodName: string, logoUrl: string) {
  isOpen.value = true
  state.value.paymentMethod = paymentMethodName
  state.value.paymentImg = logoUrl
}

async function withdraw() {
  loading.value = true
  try {
    const response = await $fetch('/api/finance/cashout-to-wallet', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      body: {
        amount: +state.value.amount,
        paymentMethods: state.value.paymentMethod,
        password: state.value.password,
      },
    })
    if (response.error === false && response.data.paymentUrl) {
      window.open(response.data.paymentUrl)
    } else {
      useSuccessNotification('Please pay the money')
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="tw-space-y-4 tw-p-2 tw-pt-0 tw-font-semibold tw-text-primary-500">
    <div class="tw-mt-8 tw-grid tw-grid-cols-2 tw-gap-6">
      <div class="tw-flex tw-items-center tw-justify-between tw-rounded-md tw-bg-white tw-px-8 tw-py-4">
        <div class="tw-space-y-2 ">
          <p class="tw-text-5xl tw-font-extrabold">
            {{ userStore.user?.payout_balance.balance }} <span class="tw-text-2xl tw-font-normal">ETB</span>
          </p>
          <p>Payout Balance</p>
        </div>
        <div>
          <WithdrawPayoutToStake />
        </div>
      </div>

      <div class="tw-flex tw-items-center tw-justify-between tw-rounded-md tw-bg-white tw-px-8 tw-py-4">
        <div class="tw-space-y-2 ">
          <p class="tw-text-5xl tw-font-extrabold">
            {{ userStore.user?.stake_balance.stake_balance }} <span class="tw-text-2xl tw-font-normal">ETB</span>
          </p>
          <p>Stake Balance</p>
        </div>
        <div>
          <WithdrawSendMoneyToFriend />
        </div>
      </div>
    </div>
    <div class="tw-space-y-4 tw-rounded-md tw-bg-white">
      <div class="tw-grid tw-grid-cols-1 tw-gap-8">
        <div class="tw-rounded-lg tw-p-4">
          <WithdrawCashouts />
        </div>
      </div>
    </div>

    <div class="tw-mt-24">
      <p>Select payment method to withdraw money</p>
    </div>

    <div v-if="status === 'pending'">
      <q-spinner color="primary" size="10em" />
    </div>
    <WithdrawPaymentMethods v-else :payments="payments" @pay="handlePaymentClick" />
    <q-dialog v-model="isOpen">
      <div>
        <q-form

          class="q-gutter-md"
          @submit="withdraw()"
        >
          <q-card>
            <q-card-section class="tw-flex tw-w-full tw-justify-center">
              <div class="text-h6  ">
                <VUEAuthImg v-if="state.paymentImg" :url="state.paymentImg" fit="contain" class="tw-h-20 tw-w-full" />
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll ">
              <div class="tw-grid tw-grid-cols-2 ">
                <q-input
                  v-model="state.amount"
                  filled
                  type="number"
                  lazy-rules
                  class="tw-col-span-2 tw-min-w-96"
                  label="Amount (Min5.00 ETB / Max 15000.00 ETB):"
                  :rules="[
                    val => val >= 5 || 'Minimum deposit amount is 5 Birr',
                    val => val <= 15000 || 'Maximum deposit amount is 15,000 Birr',
                  ]"
                />
                <q-input
                  v-model="state.password"
                  filled
                  :type="!showPassword ? 'password' : 'text'"
                  lazy-rules
                  class="tw-col-span-2 tw-min-w-96"
                  label="Your Password:"
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
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right" class="tw-mt-4">
              <q-btn type="submit" class="tw-w-full" :label="loading ? 'Loading...' : 'CONFIRM'" color="red-10" size="lg" />
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
    </q-dialog>
  </div>
</template>
