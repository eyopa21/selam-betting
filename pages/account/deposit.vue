<script setup lang="ts">
import type {
  PaymentsRoot,
} from '~/server/api/finance/get-payment-methods'

definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})

const tab = ref('recommended')
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
  console.log('pay', data.value)
  payments.value = data.value.results
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
      <div v-else class="tw-flex tw-justify-between tw-gap-32">
        <div class="tw-h-min">
          <q-tabs
            v-model="tab" :outside-arrows="true" inline-label vertical
            class="text-primary-500  bg-white" style="min-width: 300px; max-height: 240px;"
            active-class="tw-bg-primary-500 tw-text-white tw-font-bold"
          >
            <q-tab
              name="recommended" class="tw-place-content-start  "
              content-class="tw-flex tw-w-full tw-justify-between tw-relative "
            >
              <span>RECOMMENDED METHODS</span>
              <span side>1</span>
            </q-tab>
            <q-tab
              name="all" class=" tw-place-content-start "
              content-class="tw-flex tw-w-full tw-justify-between"
            >
              <span>ALL METHODS </span>
              <span side>{{ payments?.length || '' }}</span>
            </q-tab>
            <q-tab
              name="wallet" class=" tw-place-content-start "
              content-class="tw-flex tw-w-full tw-justify-between"
            >
              <span>E-WALLETS</span>
              <span side>{{ payments?.filter(pay => !!pay.is_direct_payment_allowed)?.length || '' }}

              </span>
            </q-tab>
            <q-tab
              name="mobile" class=" tw-place-content-start "
              content-class="tw-flex tw-w-full tw-justify-between"
            >
              <span>MOBILE PAYMENTS</span>
              <span side>{{ payments?.filter(pay => pay.type_of_payment === 'Wallet')?.length || ''
              }}</span>
            </q-tab>
            <q-tab
              name="internet" class=" tw-place-content-start "
              content-class="tw-flex tw-w-full tw-justify-between"
            >
              <span>INTERNET BANKING</span>
              <span side>{{ payments?.length || '' }}</span>
            </q-tab>
          </q-tabs>
        </div>
        <div class=" tw-w-full">
          <q-tab-panels
            v-model="tab" animated swipeable vertical transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="recommended">
              <div class=" q-mb-md tw-flex  tw-flex-wrap  tw-gap-4 tw-font-bold">
                RECOMMENDED METHODS
              </div>
              <div v-for="(i, key) in payments" :key="key" class="tw-w-min tw-border">
                <div v-if="i.name === 'TELEBIRR'">
                  <VUEAuthImg :url="i.logo" :name="i.name" />
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="all">
              <div class="q-mb-md tw-font-bold">
                All METHODS
              </div>
              <div class="tw-flex tw-flex-wrap   tw-gap-4 ">
                <div v-for="(i, key) in payments" :key="key" class="tw-border">
                  <div>
                    <VUEAuthImg :url="i.logo" :name="i.name" />
                  </div>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="mobile">
              <div class="q-mb-md tw-font-bold">
                MOBILE PAYMENTS
              </div>
              <div class="tw-flex tw-flex-wrap   tw-gap-4 ">
                <div v-for="(i, key) in payments" :key="key">
                  <div v-if="!!i.is_direct_payment_allowed" class="tw-border">
                    <div>
                      <VUEAuthImg :url="i.logo" :name="i.name" />
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="wallet">
              <div class="q-mb-md tw-font-bold">
                WALLET METHODS
              </div>
              <div class="tw-flex tw-flex-wrap   tw-gap-4 ">
                <div v-for="(i, key) in payments" :key="key">
                  <div v-if="i.type_of_payment === 'Wallet'" class="tw-border">
                    <div>
                      <VUEAuthImg :url="i.logo" :name="i.name" />
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="internet">
              <div class="q-mb-md tw-font-bold">
                INTERNET BANKING METHODS
              </div>
              <div class="tw-flex tw-flex-wrap   tw-gap-4 ">
                <div v-for="(i, key) in payments" :key="key">
                  <div class="tw-border">
                    <div>
                      <VUEAuthImg :url="i.logo" :name="i.name" />
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </div>
</template>
