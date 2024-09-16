<script setup lang="ts">
import type { InputBody } from '~/server/api/finance/pay.post'
import type {
  PaymentsRoot,
} from '~/server/api/finance/get-payment-methods'

definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})

const payments = ref<PaymentsRoot['results']>([])

const {
  $authentication,
} = useNuxtApp()
const {
  data,
  error,
  status,
} = await useLazyFetch<PaymentsRoot>('/api/finance/get-payment-methods', {
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

async function deposit(paymentMethod: string, amount: number) {
  try {
    const response = await $fetch('/api/finance/pay', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      cache: 'force-cache',
      body: {
        amount: +amount,
        is_direct_payment: false,
        paymentMethods: paymentMethod,
      } as InputBody,
    })
    if (response.error === false && response.data.paymentUrl) {
      window.open(response.data.paymentUrl)
    } else {
      console.error('Failed to fetch the image:')
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  }
}
</script>

<template>
  <div class="tw-font-semibold tw-text-primary-500">
    <div class="tw-space-y-4 tw-p-2">
      <div>
        <p>Select Your Payment Method to Top Up your account</p>
      </div>
      <div class="tw-space-y-4">
        <q-banner inline-actions class="text-white tw-bg-white " dense>
          <template #avatar>
            <q-icon name="error" color="blue-grey-7" size="md" />
          </template>
          <div class="text-accent tw-font-bold">
            Dear User, Please send the deposit request with the correct information to avoid delay in the
            amount. If you have made a deposit and the money has not been credited to your personal account
            within 3 hours, please contact our support team by email. example@harifsport.com
          </div>
        </q-banner>
        <q-banner inline-actions class="text-white tw-bg-white ">
          <template #avatar>
            <q-icon name="error" color="blue-grey-7" size="md" />
          </template>
          <div class="text-accent tw-font-bold">
            Earn money by becoming a HarifSport partner using eam cash. Earn commissions for HarifSport
            users by
            making deposits and withdrawals.
            Write to us for more information Telegram: https://t.me/TeamcashET WhatsApp: https://wa.me/+251
            91
            173 7798
          </div>
          <template #action>
            <q-btn flat color="white" icon="close" />
          </template>
        </q-banner>
      </div>
      <div v-if="status === 'pending'">
        <q-spinner color="primary" size="10em" />
      </div>
      <WithdrawPaymentMethods v-else :payments="payments" @pay="deposit" />
    </div>
  </div>
</template>
