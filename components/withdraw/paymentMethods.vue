<script setup lang="ts">
import type { PaymentsRoot } from '~/server/api/finance/get-payment-methods'

defineProps<{
  payments: PaymentsRoot['results']
}>()

const emit = defineEmits<{
  pay: [string]
}>()
const route = useRoute()
const tab = ref('recommended')
</script>

<template>
  <div class="tw-flex tw-justify-between tw-gap-32">
    <div class="tw-h-min">
      <q-tabs
        v-model="tab" :outside-arrows="true" inline-label vertical class="text-primary-500  bg-white"
        style="min-width: 300px; max-height: 240px;" :active-class="route.name === 'account-deposit' ? 'tw-bg-primary-500 tw-text-white tw-font-bold' : 'tw-bg-red-600 tw-text-white tw-font-bold'"
      >
        <q-tab
          name="recommended" class="tw-place-content-start  "
          content-class="tw-flex tw-w-full tw-justify-between tw-relative "
        >
          <span>RECOMMENDED METHODS</span>
          <span side>1</span>
        </q-tab>
        <q-tab name="all" class=" tw-place-content-start " content-class="tw-flex tw-w-full tw-justify-between">
          <span>ALL METHODS </span>
          <span side>{{ payments?.length || '' }}</span>
        </q-tab>
        <q-tab name="wallet" class=" tw-place-content-start " content-class="tw-flex tw-w-full tw-justify-between">
          <span>E-WALLETS</span>
          <span side>{{ payments?.filter(pay => !!pay.is_direct_payment_allowed)?.length || '' }}

          </span>
        </q-tab>
        <q-tab name="mobile" class=" tw-place-content-start " content-class="tw-flex tw-w-full tw-justify-between">
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
      <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
        <q-tab-panel name="recommended">
          <div class=" q-mb-md tw-flex  tw-flex-wrap  tw-gap-4 tw-font-bold">
            RECOMMENDED METHODS
          </div>
          <div v-for="(i, key) in payments" :key="key" class="tw-w-min tw-border">
            <div v-if="i.name === 'TELEBIRR'">
              <VUEAuthImg :url="i.logo" :name="i.name" @pay="(n, m) => emit('pay', n, m)" />
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
                <VUEAuthImg :url="i.logo" :name="i.name" @pay="(n, m) => emit('pay', n, m)" />
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
                  <VUEAuthImg :url="i.logo" :name="i.name" @pay="(n, m) => emit('pay', n, m)" />
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
                  <VUEAuthImg :url="i.logo" :name="i.name" @pay="(n, m) => emit('pay', n, m)" />
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
                  <VUEAuthImg :url="i.logo" :name="i.name" @pay="(n, m) => emit('pay', n, m)" />
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
