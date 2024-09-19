<script setup lang="ts">
import { useDocumentVisibility } from '@vueuse/core'
import type { InputBody } from '~/server/api/finance/pay.post'
import type {
  PaymentsRoot,
} from '~/server/api/finance/get-payment-methods'

definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})

const documentVisibility = useDocumentVisibility()
const isTabActive = computed(() =>
  documentVisibility.value === 'visible',
)
const state = ref({
  amount: 0,
  paymentImg: '',
  paymentMethod: '',
})
const isOpen = ref(false)
const loading = ref(false)
const form = ref()
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
watch(isTabActive, () => {
  loading.value = false
  isOpen.value = false
  form.value.reset()
})

function handlePaymentClick(paymentMethodName: string, logoUrl: string) {
  isOpen.value = true
  state.value.paymentMethod = paymentMethodName
  state.value.paymentImg = logoUrl
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
      <WithdrawPaymentMethods v-else :payments="payments" @pay="handlePaymentClick" />
      <q-dialog v-model="isOpen">
        <div>
          <q-form
            ref="form"
            class="q-gutter-md"
            @submit="deposit(state.paymentMethod, state.amount)"
          >
            <q-card class="tw-p-4">
              <q-card-section>
                <div class="text-h6">
                  <VUEAuthImg v-if="state.paymentImg" :url="state.paymentImg" fit="contain" class="tw-h-20 tw-w-full" />
                </div>
              </q-card-section>

              <q-separator />

              <q-card-section style="max-height: 50vh" class="scroll tw-my-8">
                <div class="tw-grid tw-grid-cols-2 tw-gap-8">
                  <label for="available" class="tw-flex   tw-flex-col tw-text-lg tw-font-bold">
                    <span>Amount (Min5.00 ETB / Max 15000.00 ETB):</span>

                  </label>
                  <q-input
                    v-model="state.amount"
                    filled
                    type="number"
                    lazy-rules
                    :rules="[
                      val => val >= 5 || 'Minimum deposit amount is 5 Birr',
                      val => val <= 15000 || 'Maximum deposit amount is 15,000 Birr',
                    ]"
                  />
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
  </div>
</template>
