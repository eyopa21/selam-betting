<script setup lang="ts">
import type { PaymentsRoot } from '~/server/api/finance/get-payment-methods'

definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})
const userStore = useUserStore()

const payments = ref<PaymentsRoot['results']>([])

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

function handlePaymentClick() {
  console.log('clicked')
}
</script>

<template>
  <div class="tw-space-y-4 tw-p-2 tw-pt-0 tw-font-semibold tw-text-primary-500">
    <div>
      <p>Select payment method to withdraw money:</p>
    </div>

    <div class="tw-space-y-4 tw-pt-8">
      <div class="tw-flex tw-justify-between">
        <div class="tw-text-base">
          Available Payout Balance:  <span class="tw-text-xl tw-font-bold">{{ userStore.user?.payout_balance.balance }} Birr
          </span>
          <div class="s tw-inline-block tw-space-x-2">
            <WithdrawPayoutRequest />
            <WithdrawPayoutToStake />
          </div>
        </div>

        <WithdrawCashouts />
      </div>
    </div>

    <div v-if="status === 'pending'">
      <q-spinner color="primary" size="10em" />
    </div>
    <WithdrawPaymentMethods v-else :payments="payments" @pay="handlePaymentClick" />
  </div>
</template>
