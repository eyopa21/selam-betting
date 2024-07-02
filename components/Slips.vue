<template>
  <div class="tw-bg-secondary-800 dark:tw-bg-primary-700 tw-h-[85vh]">
    <div class="tw-flex tw-items-center tw-justify-around tw-text-white tw-bg-secondary-700">
      <div class="tw-max-w-[90%]">
        <q-tabs v-model="activeSlip" dense inline-label outside-arrows mobile-arrows>
          <q-tab v-for="(slip, key) in slips" :key="key" :name="slip.name" :label="slip.label">
            <q-icon v-if="slips.length > 1" @click="removeSlip(slip.id)" name="close" class="tw-ml-2" />
          </q-tab>
        </q-tabs>

      </div>
      <q-icon @click="addSlip()" name="add" />
    </div>
    <div class="tw-text-white tw-m-4 tw-flex tw-flex-col tw-justify-between tw-h-[90%]">
      <!-- List of games -->
      <q-tab-panels v-model="activeSlip" animated class=" tw-bg-primary-500">
        <q-tab-panel :name="activeSlip" class="">

          <div v-if="findSlipById?.games?.length">
            <div v-for="(game, key) in findSlipById?.games" :key="key">
              <div class="tw-flex tw-justify-end">
                <q-btn @click="removeBet(game.outcomeId)" dense size="xs" color="red" flat round icon="close" />
              </div>
              <div class="tw-flex tw-text-xs tw-items-center tw-justify-between">
                <p>{{ game.matchDetail.teams }}</p>
                <p class="tw-text-[10px]">{{ formatDate(game.matchDetail.date) }} - {{
                  game.matchDetail.time }}</p>

              </div>
              <div class="tw-flex tw-items-center tw-justify-between">
                <p class="tw-text-xs tw-text-gray-300">{{ game.value }}</p>
                <p>{{ game.odd }}</p>
              </div>
              <div v-if="slipType === 'Multiple/Single'"
                class="tw-mt-4 tw-flex tw-items-center tw-justify-around tw-h-6">
                <div class="tw-bg-gray-400 tw-w-12 tw-h-6 tw-flex tw-justify-around tw-items-center tw-rounded-l">
                  <q-icon name="-" />
                </div>
                <q-input v-model="findSlipById.birr" dense input-class="tw-text-white tw-max-h-6 text-center"
                  class="dark:tw-bg-primary-700 tw-bg-white tw-text-white tw-w-full tw-max-h-full" />
                <div class="tw-bg-gray-400 tw-w-12 tw-h-6 tw-flex tw-justify-around tw-items-center tw-rounded-r">
                  <q-icon name="add" />
                </div>
              </div>
              <q-separator color="red" class="tw-my-2" />
            </div>
            <q-separator color="gray" class=" tw-mt-16 " />
            <div class="tw-py-2">

              <q-select bg-color="white" label-color="white" outlined v-model="slipType"
                :options="['Accumulator', 'Multiple/Single']" dense options-dense />
            </div>

            <div v-if="slipType === 'Accumulator'" class="tw-mt-4 tw-flex tw-items-center tw-justify-around tw-h-6">
              <div class="tw-bg-gray-400 tw-w-12 tw-h-6 tw-flex tw-justify-around tw-items-center tw-rounded-l">
                <q-icon name="-" />
              </div>
              <q-input v-model="findSlipById.birr" dense input-class="tw-text-white tw-max-h-6 text-center"
                class="dark:tw-bg-primary-700 tw-bg-white tw-text-white tw-w-full tw-max-h-full" />
              <div class="tw-bg-gray-400 tw-w-12 tw-h-6 tw-flex tw-justify-around tw-items-center tw-rounded-r">
                <q-icon name="add" />
              </div>
            </div>
          </div>
          <div v-else>
            <div class="tw-text-lg ">
              <p>Your Bets Will be Available here</p>

            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>


      <!-- Totals -->
      <div>
        <div class="tw-flex tw-items-center tw-justify-between">
          <p class="tw-text-gray-400">Total Odds: </p>
          <p> {{ calculateTotalOdd(findSlipById.games).toFixed(2) }}</p>
        </div>
        <div class="tw-flex tw-items-center tw-justify-between">
          <p class="tw-text-gray-400">VAT(13%): </p>
          <p>{{ ((findSlipById.birr * 13) / 100).toFixed(2) }} ETB</p>
        </div>
        <div class="tw-flex tw-items-center tw-justify-between">
          <p class="tw-text-gray-400">NET STAKE: </p>
          <p>{{ ((findSlipById.birr - (findSlipById.birr * 13) / 100)).toFixed(2) }} ETB</p>
        </div>
        <div class="tw-flex tw-items-center tw-justify-between">
          <p class="tw-text-gray-400">Bonus Odd: </p>
          <p>0.00</p>
        </div>
        <div class="tw-flex tw-items-center tw-justify-between">
          <p class="tw-font-semibold">NetWin/ Payout</p>
          <p>{{ (((findSlipById.birr - (findSlipById.birr * 13) / 100)) * findSlipById.birr).toFixed(2) }}
            ETB</p>
        </div>
        <div class="tw-py-4">
          <q-btn icon="share" label="SHARE" class="tw-font-bold tw-bg-gray-500 tw-w-full tw-mb-2 tw-mt-4" unelevated />
          <div class="tw-flex tw-gap-2">
            <q-btn :disabled="!findSlipById.games?.length" @click="showTerms = true" label="BOOK" unelevated
              class="tw-font-bold tw-bg-primary-600 tw-w-full" />
            <q-btn :disabled="!findSlipById.games?.length" color="orange" label="PLACE" unelevated
              class="tw-font-bold tw-bg-primary-600 tw-w-full" />
          </div>
        </div>
      </div>
    </div>
    <TermsAndPolicy :loading="loading" :showDialog="showTerms" @confirm="bookBet()" @close="showTerms = false" />

    <div>


    </div>
  </div>
</template>

<script setup lang="ts">

import { useQuasar } from 'quasar'
const $q = useQuasar()

const slipType = ref('Accumulator')
const { formatDate } = useHelpers()
const slips = ref(useSlips().slips);
const { activeSlip, addSlip, findSlipById, slipCount, calculateTotalOdd, removeSlip, removeBet } = useSlips()


const showTerms = ref(false)






const loading = ref(false)
async function bookBet() {
  loading.value = true;
  console.log("good booking");
  const { data, error } = await useFetch('/api/ticket', {
    method: 'POST',
    body: {
      ticketType: 'Booked',
      slipType: 'Accumulator',
      games: findSlipById.value.games?.map(game => {
        return {
          event_id: BigInt(game.eventId).toString(),
          outcome_id: BigInt(game.outcomeId).toString()
        }
      }),

      amount: findSlipById.value.birr
    }
  })
  console.log("data", data);
  console.log("error", error);
  if (error.value?.data) {
    loading.value = false
    $q.notify({
      message: 'Booking Error',
      color: 'red',
      position: 'right'
    })
  }
  else if (data.value) {

    loading.value = false
    $q.notify({
      message: 'Booking success',
      caption: `Your Booking Code is: ${data.value?.data?.booking_code}`,
      color: 'green',
      position: 'right'
    })
    showTerms.value = false
    findSlipById.value.games = []
  }
}


</script>