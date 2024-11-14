<script setup lang="ts">
import type { PaymentsRoot } from '~/server/api/finance/get-payment-methods'

defineProps<{
  payments: PaymentsRoot['results']
}>()

const emit = defineEmits<{
  pay: [string, string, boolean]
}>()
const route = useRoute()
const tab = ref('recommended')
</script>

<template>
  <div class="tw-grid tw-grid-cols-1 tw-gap-4">
    <q-tabs
      v-model="tab" align="left" inline-label class="bg-white tw-rounded-lg tw-p-4  tw-text-primary-500"
      :active-class="route.name === 'account-deposit' ? 'tw-bg-primary-500 tw-text-white tw-font-bold' : 'tw-bg-primary-500 tw-text-white tw-font-bold'"
    >
      <q-tab
        name="recommended"
        no-caps
        class="tw-rounded-lg"
      >
        <div class="tw-relative tw-flex tw-w-full tw-items-center tw-justify-between">
          <div class="tw-px-5 tw-py-2">
            Recommended Methods
          </div>
          <div class="tw-text-center">
            1
          </div>
        </div>
      </q-tab>
      <q-tab name="all" class="tw-rounded-lg" no-caps content-class="tw-flex tw-w-full tw-justify-between">
        <span class="tw-px-5 tw-py-2">All Methods </span>
        <span class="tw-px-5 tw-py-2" side>{{ payments?.length || '' }}</span>
      </q-tab>
      <q-tab name="wallet" class="tw-rounded-lg" no-caps content-class="tw-flex tw-w-full tw-justify-between">
        <span class="tw-px-5 tw-py-2">E-Wallets</span>
        <span class="tw-px-5 tw-py-2" side>{{ payments?.filter(pay => !!pay.is_direct_payment_allowed)?.length || '' }}

        </span>
      </q-tab>
      <q-tab name="mobile" class="tw-rounded-lg" no-caps content-class="tw-flex tw-w-full tw-justify-between">
        <span class="tw-px-5 tw-py-2">Mobile Payments</span>
        <span class="tw-px-5 tw-py-2" side>{{ payments?.filter(pay => pay.type_of_payment === 'Wallet')?.length || ''
        }}</span>
      </q-tab>
      <q-tab
        name="internet" class="tw-rounded-lg" no-caps
        content-class="tw-flex tw-w-full tw-justify-between"
      >
        <span class="tw-px-5 tw-py-2">Internet Banking</span>
        <span class="tw-px-5 tw-py-2" side>{{ payments?.length || '' }}</span>
      </q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab" class="tw-rounded-md" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
      <q-tab-panel name="recommended">
        <div class="tw-px-8">
          <div v-for="(i, key) in payments" :key="key" class="tw-w-min ">
            <div v-if="i.name === 'TELEBIRR'">
              <VUEAuthImg :url="i.logo" :name="i.name" @click="emit('pay', i.name, i.logo, i.is_direct_payment_allowed)" />
            </div>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="all">
        <div class="tw-px-8">
          <div class="tw-flex tw-flex-wrap tw-gap-8">
            <div v-for="(i, key) in payments" :key="key" class="">
              <div>
                <VUEAuthImg :url="i.logo" :name="i.name" @click="emit('pay', i.name, i.logo, i.is_direct_payment_allowed)" />
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="mobile">
        <div class="tw-px-8">
          <div class="tw-flex tw-flex-wrap   tw-gap-4 ">
            <div v-for="(i, key) in payments" :key="key">
              <div v-if="!!i.is_direct_payment_allowed">
                <div>
                  <VUEAuthImg :url="i.logo" :name="i.name" @click="emit('pay', i.name, i.logo, i.is_direct_payment_allowed)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="wallet">
        <div class="tw-px-8">
          <div class="tw-flex tw-flex-wrap   tw-gap-4 ">
            <div v-for="(i, key) in payments" :key="key">
              <div v-if="i.type_of_payment === 'Wallet'">
                <div>
                  <VUEAuthImg :url="i.logo" :name="i.name" @click="emit('pay', i.name, i.logo, i.is_direct_payment_allowed)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="internet">
        <div class="tw-px-8">
          <div class="tw-flex tw-flex-wrap   tw-gap-4 ">
            <div v-for="(i, key) in payments" :key="key">
              <div class="">
                <div>
                  <VUEAuthImg :url="i.logo" :name="i.name" @click="emit('pay', i.name, i.logo, i.is_direct_payment_allowed)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
