<script setup lang="ts">
definePageMeta({
  layout: 'account',
})
</script>

<template>
  <div class="tw-text-primary-500">
    <div class="tw-pl-4 tw-font-bold">
      <h4 class="tw-text-lg">
        Bet History
      </h4>
      <p>More information about your bets</p>
    </div>
    <div class="tw-mt-2">
      <q-tabs class=" text-primary" align="left">
        <q-tab name="main">
          <q-btn size="md" color="primary" class="tw-px-8 tw-py-3">
            Main Account
          </q-btn>
        </q-tab>
        <q-tab name="virtual">
          <q-btn color="orange-1" text-color="black" class="tw-px-8 tw-py-3">
            Virtual Account
          </q-btn>
        </q-tab>
        <q-tab name="archive">
          <q-btn color="orange-1" text-color="black" class="tw-px-8 tw-py-3">
            Load Archive
          </q-btn>
        </q-tab>
      </q-tabs>
    </div>
    <div class="tw-ml-4 ">
      <div class="tw-mt-6 tw-h-48  tw-w-full tw-bg-white">
        <div class="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center">
          <p>No transactions</p>
        </div>
      </div>
    </div>
  </div>
</template>
