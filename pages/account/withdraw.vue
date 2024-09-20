<script setup lang="ts">
import type { PaymentsRoot } from '~/server/api/finance/get-payment-methods'

definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})
const userStore = useUserStore()
const isOpen = ref(false)
const form = useTemplateRef('form')
const loading = ref(false)
const payments = ref<PaymentsRoot['results']>([])

const state = ref({
  paymentMethod: '',
  paymentImg: '',
  amount: 0,
  password: undefined,
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

const columns = ref([

  { name: 'date', label: 'Date Of Request', field: 'date' },
  { name: 'from', label: 'Payout available from', field: 'from' },
  { name: 'method', label: 'Payment method', field: 'method' },
  { name: 'amount', label: 'Amount', field: 'amount' },
  { name: 'status', label: 'Status', field: 'status' },

])

const rows = ref([
  {
    date: 'Frozen Yogurt',
    from: 159,
    method: 6.0,
    amount: 24,
    status: 4.0,

  },

])

async function withDraw() {
  loading.value = true
  try {
    const response = await $fetch('/api/finance/cashout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      cache: 'force-cache',
      body: {
        amount: +state.value.amount,
        password: state.value.password,
      },
    })
    if (response) {
      console.log('good response', response)
    } else {
      console.error('failed to process cashout')
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}
function handlePaymentClick(paymentMethodName: string, logoUrl: string) {
  isOpen.value = true
  state.value.paymentMethod = paymentMethodName
  state.value.paymentImg = logoUrl
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

        <q-expansion-item
          dense label="WITHDRAWAL REQUESTS" header-class="bg-red-10 text-white"
          expand-icon-class="text-white" expand-icon="keyboard_double_arrow_down"
        >
          <div>
            <div class="tw-border tw-border-t-0 tw-border-gray-400 ">
              <q-table dense hide-pagination flat bordered :rows="rows" :columns="columns" row-key="name">
                <template #top>
                  <q-bar dark class="bg-red-10 -mx-8 text-white tw-w-full">
                    <q-btn dense flat round icon="cached" size="md" color="white" />

                    <div class=" text-weight-bold">
                      REFRESH STATUS
                    </div>
                  </q-bar>
                </template>
                <template #header="props">
                  <q-tr :props="props">
                    <q-th
                      v-for="col in props.cols" :key="col.name" :props="props"
                      class="tw-text-lg tw-font-bold tw-text-primary-500"
                    >
                      {{ col.label }}
                    </q-th>
                  </q-tr>
                </template>
                <template #body="props">
                  <q-tr :props="props">
                    <q-td key="date" :props="props">
                      <q-input dense filled type="date" />
                    </q-td>
                    <q-td key="from" :props="props">
                      <div class="tw-w-16">
                        <q-input dense />
                      </div>
                    </q-td>
                    <q-td key="method" :props="props">
                      <div class="tw-w-16">
                        <q-input dense />
                      </div>
                    </q-td>
                    <q-td key="amount" :props="props">
                      <div class="tw-w-16">
                        0.0
                      </div>
                    </q-td>
                    <q-td key="status" :props="props">
                      <div class="tw-w-16">
                        N/A
                      </div>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </div>
        </q-expansion-item>
      </div>
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
          @submit="withDraw"
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
                  name="amount"
                  type="number"
                  lazy-rules
                  :rules="[
                    val => val >= 5 || 'Minimum deposit amount is 5 Birr',
                    val => val <= 15000 || 'Maximum deposit amount is 15,000 Birr',
                  ]"
                />

                <label for="available" class="tw-flex tw-w-full tw-flex-col tw-place-content-center tw-text-xl tw-font-bold">
                  <span>Password:</span>

                </label>
                <q-input
                  v-model="state.password"
                  placeholder="********"
                  type="password"
                  filled
                  lazy-rules
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
</template>
