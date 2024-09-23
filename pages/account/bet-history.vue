<script setup lang="ts">
definePageMeta({
  layout: 'account',
  pageType: 'authenticated',
})
const selectedCheckboxes = ref([])
const options = [{
  label: 'Sports',
  value: 'sports',
}, {
  label: 'Live',
  value: 'live',
}, {
  label: 'Settled',
  value: 'settled',
}, {
  label: 'Unsettled',
  value: 'unsettled',
}, {
  label: 'By settlement time',
  value: 'time',
}, {
  label: 'Deleted',
  value: 'deleted',
}]
</script>

<template>
  <div class="tw-text-primary-500">
    <div class="tw-font-bold ">
      <h4 class="tw-text-lg">
        Bet History
      </h4>
      <p>More information about your bets</p>
    </div>
    <div class="tw-mt-2">
      <q-tabs indicator-color="red-8" class="bg-white text-primary" align="left" content-class="tw-ml-4 ">
        <q-tab name="my-history">
          <span class="tw-font-bold">
            My Bet History
          </span>
        </q-tab>
        <q-tab name="unsettled">
          <span class="tw-font-bold">
            Unsettled Bets
          </span>
        </q-tab>
        <q-tab name="autosale">
          <span class="tw-font-bold">
            AutoSale
          </span>
        </q-tab>
      </q-tabs>
    </div>
    <div class="tw-mt-2">
      <div class="tw-flex tw-justify-start tw-space-x-4">
        <div class="tw-flex tw-gap-4">
          <q-btn-dropdown color="primary" label="Filters" class="tw-px-10 ">
            <div class="column  q-pa-md">
              <div class="tw-mb-2 tw-border tw-bg-gray-100 tw-px-2 tw-text-xs tw-text-gray-400">
                Maximum
                period: 32 days
              </div>

              <div class="tw-pb-1 tw-text-gray-500 ">
                PERIOD
              </div>
              <div class="tw-flex tw-justify-between tw-space-x-2 ">
                <div>
                  <q-input dense :hide-bottom-space="true" filled type="date" class="tw-w-24 " />
                </div>
                <div>
                  <q-input dense filled type="date" class="tw-w-24 !tw-bg-white" />
                </div>
              </div>

              <div>
                <div class="tw-pb-1 tw-text-gray-500 ">
                  BET TYPE
                </div>
                <div>
                  <q-select
                    dense bg-color="white" label-color="white" outlined
                    :options="['All', 'Accumulator', 'Single']" options-dense
                  />
                </div>
              </div>

              <div>
                <div class="tw-pb-1 tw-text-gray-500 ">
                  OTHERS
                </div>
                <div>
                  <q-option-group
                    v-model="selectedCheckboxes" :options="options" dense
                    type="checkbox"
                  />
                </div>
              </div>

              <div>
                <q-btn class="tw-w-full" color="red-10">
                  Apply
                </q-btn>
              </div>
            </div>
          </q-btn-dropdown>
          <q-btn-dropdown color="primary" label="Send To Email" class="tw-px-10 ">
            hello
          </q-btn-dropdown>
          <q-btn-dropdown color="primary" label="Clear History" class="tw-px-10 ">
            <div class="column  q-pa-md">
              <div class="tw-pb-1 tw-text-gray-500 ">
                PERIOD
              </div>
              <div class="tw-flex tw-justify-between tw-space-x-2 ">
                <div>
                  <q-input dense :hide-bottom-space="true" filled type="date" class="tw-w-24 " />
                </div>
                <div>
                  <q-input dense filled type="date" class="tw-w-24 !tw-bg-white" />
                </div>
              </div>
              <div class="tw-mt-2">
                <q-btn class="tw-w-full" text-color="black" color="blue-grey-1">
                  Apply
                </q-btn>
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </div>
    </div>
    <div class="tw-mt-6">
      <div class="tw-p-2 tw-pl-0 tw-text-[15px] tw-font-bold">
        Results
      </div>
      <div class="tw-flex tw-justify-between">
        <div>
          <q-bar dark class="bg-white text-white tw-h-full tw-w-full">
            <div class="tw-flex tw-items-center tw-gap-2 tw-border-r-2 tw-pr-2 tw-font-bold tw-text-primary-500">
              <q-icon name="alarm" size="md" class="" />
              <span>Bet slips: 0</span>
            </div>
            <div class="tw-flex tw-items-center tw-gap-2 tw-border-r-2 tw-pr-2 tw-font-bold tw-text-primary-500">
              <q-icon name="alarm" size="md" class="" />
              <span>Total winnings: 0 ETB</span>
            </div>
            <div class="tw-flex tw-items-center tw-gap-2 tw-border-r-2 tw-pr-2 tw-font-bold tw-text-primary-500">
              <q-icon name="alarm" size="md" class="" />
              <span>Paid out: 0 ETB</span>
            </div>
            <div class="tw-flex tw-items-center tw-gap-2 tw-pr-2 tw-font-bold tw-text-primary-500">
              <q-icon name="alarm" size="md" class="" />
              <span>Period: 21/06 - 29/06</span>
            </div>
          </q-bar>
        </div>
        <div>
          <q-input
            outlined input-class="text-white" placeholder="Search for your Games"
            class="tw-rounded-xl tw-bg-white"
          >
            <template #append>
              <q-icon name="search" color="blue-grey-2" />
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div class="tw-mt-6 tw-h-64  tw-w-full tw-bg-white">
      <div class="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center">
        <h3 class="tw-text-2xl tw-font-bold">
          Events not found
        </h3>
        <p>No events found for the period 14/06 to 20/06. Try changing the display period.</p>
      </div>
    </div>
  </div>
</template>
