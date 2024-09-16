<script setup lang="ts">
definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})
const userStore = useUserStore()

const tab = ref('recommended')
const payments = ref([{
  label: 'Telebirr',
  name: 'telebirr',
  icon: '/icons/payment/telebirr.svg',
  tags: ['wallet', 'recommended'],
}, {
  label: 'Yene Pay',
  name: 'yenepay',
  icon: '/icons/payment/yenepay.svg',
  tags: ['wallet'],
}, {
  label: 'Amole',
  name: 'amole',
  icon: '/icons/payment/amole.svg',
  tags: ['wallet'],
}, {
  label: 'CBE Birr',
  name: 'cbebirr',
  icon: '/icons/payment/cbebirr.svg',
  tags: ['mobile', 'internet'],
}, {
  label: 'Visa',
  name: 'visa',
  icon: '/icons/payment/visa.svg',
  tags: ['mobile'],
}, {
  label: 'Master Card',
  name: 'mastercard',
  icon: '/icons/payment/mastercard.svg',
  tags: ['mobile', 'internet'],
}, {
  label: 'Zele',
  name: 'zele',
  icon: '/icons/payment/zele.svg',
  tags: ['mobile', 'internet'],
}])

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

// const { data, error } = await useFetch('/api/finance/get-payout-balance', {
//   headers: {
//     Authorization: `Bearer ${$authentication.accessToken.value}`,
//   },
// })
// if (error.value) {
//   useErrorNotifications(error)
// }
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
    <div class="tw-flex tw-justify-between tw-gap-32">
      <div class="tw-h-min">
        <q-tabs
          v-model="tab" :outside-arrows="true" inline-label vertical class="text-primary-500  bg-white"
          style="min-width: 300px; max-height: 240px;" active-class="bg-red-10 tw-text-white tw-font-bold"
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
            <span side>16</span>
          </q-tab>
          <q-tab
            name="wallet" class=" tw-place-content-start "
            content-class="tw-flex tw-w-full tw-justify-between"
          >
            <span>E-WALLETS</span>
            <span side>4</span>
          </q-tab>

          <q-tab
            name="mobile" class=" tw-place-content-start "
            content-class="tw-flex tw-w-full tw-justify-between"
          >
            <span>MOBILE PAYMENTS</span>
            <span side>6</span>
          </q-tab>
          <q-tab
            name="internet" class=" tw-place-content-start "
            content-class="tw-flex tw-w-full tw-justify-between"
          >
            <span>INTERNET BANKING</span>
            <span side>5</span>
          </q-tab>
        </q-tabs>
      </div>
      <div class=" tw-w-full">
        <q-tab-panels
          v-model="tab" animated swipeable vertical transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="recommended">
            <div class=" q-mb-md tw-flex   tw-flex-wrap  tw-gap-4 tw-font-bold">
              RECOMMENDED METHODS
            </div>
            <div v-for="(i, key) in payments" :key="key" class="tw-w-min tw-border">
              <div v-if="i.tags.includes('recommended')">
                <q-img fit="scale-down" :src="i.icon" :alt="i.name" class="tw-h-20 tw-w-32" />
                <div style="width: 150px;" class="  tw-bg-primary-500 tw-text-center tw-text-white">
                  {{ i.label }}
                </div>
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
                  <q-img fit="scale-down" :src="i.icon" :alt="i.name" class="tw-h-20 tw-w-32" />
                  <div class="tw-w-full  tw-bg-primary-500 tw-text-center tw-text-white">
                    {{ i.label }}
                  </div>
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
                <div v-if="i.tags.includes('mobile')" class="tw-border">
                  <q-img fit="scale-down" :src="i.icon" :alt="i.name" class="tw-h-20 tw-w-32" />
                  <div class="tw-w-full  tw-bg-primary-500 tw-text-center tw-text-white">
                    {{ i.label }}
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
                <div v-if="i.tags.includes('wallet')" class="tw-border">
                  <q-img fit="scale-down" :src="i.icon" :alt="i.name" class="tw-h-20 tw-w-32" />
                  <div class="tw-w-full  tw-bg-primary-500 tw-text-center tw-text-white">
                    {{ i.label }}
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
                <div v-if="i.tags.includes('internet')" class="tw-border">
                  <q-img fit="scale-down" :src="i.icon" :alt="i.name" class="tw-h-20 tw-w-32" />
                  <div class="tw-w-full  tw-bg-primary-500 tw-text-center tw-text-white">
                    {{ i.label }}
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>
