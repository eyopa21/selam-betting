<template>
  <div class="tw-bg-secondary-800 tw-h-[85vh]">
    <div
      class="tw-flex tw-items-center tw-justify-around tw-text-white tw-bg-secondary-700"
    >
      <div class="tw-max-w-[90%]">
        <q-tabs
          v-model="activeSlipName"
          inline-label
          outside-arrows
          mobile-arrows
        >
          <q-tab v-for="slip in slips" :name="slip.name" :label="slip.name">
            <q-icon
              v-if="slips.length > 1"
              @click="removeSlip(slip.id)"
              name="close"
              class="tw-ml-2"
            />
          </q-tab>
        </q-tabs>
      </div>
      <q-icon @click="addSlip" name="add" />
    </div>
    <div
      class="tw-text-white tw-m-4 tw-flex tw-flex-col tw-justify-between tw-h-[90%]"
    >
      <!-- List of games -->
      <div>
        <div class="tw-flex tw-items-center tw-justify-between">
          <p>Napoli V Atlanta</p>
          <p>19:30</p>
        </div>
        <div class="tw-flex tw-items-center tw-justify-between">
          <p class="tw-text-xs tw-text-gray-300">Double Chance 2x</p>
          <p>1.17</p>
        </div>
        <div class="tw-mt-2 tw-flex tw-items-center tw-justify-around tw-h-6">
          <div
            class="tw-bg-gray-400 tw-w-12 tw-h-6 tw-flex tw-justify-around tw-items-center tw-rounded-l"
          >
            <q-icon name="-" />
          </div>
          <q-input
            :dense="true"
            input-class="tw-text-white tw-max-h-6"
            class="dark:tw-bg-primary-700 tw-bg-white tw-text-white tw-w-full tw-max-h-full"
          ></q-input>
          <div
            class="tw-bg-gray-400 tw-w-12 tw-h-6 tw-flex tw-justify-around tw-items-center tw-rounded-r"
          >
            <q-icon name="add" />
          </div>
        </div>
      </div>

      <!-- Totals -->
      <div>
        <div class="tw-flex tw-items-center tw-justify-between">
          <p class="tw-text-gray-400">Total Bet Amount</p>
          <p>3</p>
        </div>
        <div class="tw-flex tw-items-center tw-justify-between">
          <p class="tw-text-gray-400">Deposit</p>
          <p>200 ETB</p>
        </div>
        <div class="tw-flex tw-items-center tw-justify-between">
          <p class="tw-font-semibold">NetWin/ Payout</p>
          <p>25,000 ETB</p>
        </div>
        <q-btn
          icon="share"
          label="SHARE"
          class="tw-font-bold tw-bg-gray-500 tw-w-full tw-mb-2 tw-mt-4"
          unelevated
        />
        <q-btn
          icon="shopping_bag"
          label="PLACE BET"
          unelevated
          class="tw-font-bold tw-bg-primary-600 tw-w-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { slips, addSlip, removeSlip, activeSlip } = useSlips();
const activeSlipName = computed(() => activeSlip.value?.name);
</script>
