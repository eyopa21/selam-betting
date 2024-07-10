<template>
  <div class="tw-bg-secondary-800 dark:tw-bg-gray-800 tw-h-[85vh]">
    <div class="tw-flex tw-items-center tw-justify-around tw-text-white tw-bg-gray-600">
      <div class="tw-max-w-[90%]">
        <q-tabs v-model="activeSlip" dense inline-label narrow-indicator outside-arrows mobile-arrows align="left">
          <q-tab v-for="(slip, key) in slips" :key="key" :name="slip.name" :label="slip.label">
            <q-icon v-if="slips.length > 1" @click="removeSlip(slip.id)" name="close" class="tw-ml-2" />
          </q-tab>
        </q-tabs>
      </div>
      <q-icon @click="addSlip()" name="add" />
    </div>
    <div class="tw-text-white tw-mt-1 tw-flex tw-flex-col tw-justify-between tw-h-full">
      <!-- List of games -->
      <q-tab-panels v-model="activeSlip" animated class=" tw-bg-gray-800">
        <q-tab-panel :name="activeSlip" class="">

          <div v-if="findSlipById?.games?.length">
            <div v-for="(game, key) in findSlipById?.games" :key="key" class="tw-rounded-md tw-bg-slate-700 tw-mb-2 tw-p-2">
              <div class="tw-flex tw-justify-between">
                <p class="tw-text-xs">{{game.eventId}}</p>
                <q-btn @click="removeBet(game.outcomeId)" dense size="xs" color="red" flat round icon="close" />
              </div>
              <div class="">
                <p>{{ game.matchDetail.teams }}</p>
                <p class="tw-text-[10px]">{{ formatDate(game.matchDetail.date) }} - {{
                  game.matchDetail.time }}</p>

              </div>
              <div class="tw-flex tw-items-center tw-justify-between tw-mt-2">
                <p class="tw-text-xs tw-text-gray-300">{{ game.value }}</p>
                <p class="tw-bg-green-800 tw-p-1 tw-rounded-md tw-px-2">{{ game.odd }}</p>
              </div>
              <div v-if="slipType === 'Single'" class="tw-mt-4 tw-flex tw-items-center tw-justify-around tw-h-6">
                <div class="tw-bg-gray-400 tw-w-12 tw-h-6 tw-flex tw-justify-around tw-items-center tw-rounded-l">
                  <q-icon name="-" />
                </div>
                <q-input v-model="game.birr" dense input-class=" tw-max-h-6 text-center"
                  class="dark:tw-bg-white tw-bg-white tw-text-gray-900 tw-w-full tw-max-h-full" />
                <div class="tw-bg-gray-400 tw-w-12 tw-h-6 tw-flex tw-justify-around tw-items-center tw-rounded-r">
                  <q-icon name="add" />
                </div>
              </div>
              
            </div>
            <q-separator color="gray" class=" tw-mt-16 " />
            <div class="tw-py-2">
              <q-select bg-color="white" label-color="white" outlined v-model="slipType"
                :options="['Accumulator', 'Single']" dense options-dense />
            </div>

            <div v-if="slipType === 'Accumulator'" class="tw-mt-4 tw-flex tw-items-center tw-justify-around tw-h-6">
              <div class="tw-bg-gray-400 tw-w-12 tw-h-6 tw-flex tw-justify-around tw-items-center tw-rounded-l">
                <q-icon name="-" />
              </div>
              <q-input v-model="findSlipById.birr" dense input-class=" tw-max-h-6 text-center"
                class="dark:tw-bg-white tw-bg-white tw-text-black tw-w-full tw-max-h-full" />
              <div class="tw-bg-gray-400 tw-w-12 tw-h-6 tw-flex tw-justify-around tw-items-center tw-rounded-r">
                <q-icon name="add" />
              </div>
            </div>
          </div>
          <div v-else>
            <div class="tw-text-sm tw-text-center">
              <p>Your Bets Will be Available here</p>

            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>


      <!-- Totals -->
      <div class="tw-p-3 tw-bg-gray-800">
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
          <p>{{ (((findSlipById.birr - (findSlipById.birr * 13) / 100)) *
            calculateTotalOdd(findSlipById.games)).toFixed(2) }}
            ETB</p>
        </div>
        <div class="">
          <q-btn icon="share" label="SHARE" class="tw-font-bold tw-bg-sky-700 tw-w-full tw-mb-2 tw-mt-4" unelevated />
          <div class="tw-flex tw-gap-2">
            <q-btn :disabled="!findSlipById.games?.length || findSlipById.birr < 10" @click="showTerms = true"
              label="BOOK" unelevated class="tw-font-bold bg-grey-7 tw-w-full" />
            <q-btn @click="showTerms = true" color="orange" label="PLACE" unelevated
              class="tw-font-bold tw-bg-primary-600 tw-w-full" />
          </div>
        </div>
      </div>
    </div>
    <TermsAndPolicy :loading="loading" :showDialog="showTerms" @confirm="bookBet()" @close="showTerms = false" />
    <q-dialog v-model="showPreviewModal" full-height>
     <VUETicket :ticket="preview" @close="preview = null"/>
    </q-dialog>
    <div>


    </div>
  </div>
</template>

<script setup lang="ts">

import { useQuasar } from 'quasar'
const $q = useQuasar()


const preview = ref(null)
const showPreviewModal = computed(() => {
  return !!preview.value
});


const slipType = ref('Accumulator')
const { formatDate } = useHelpers()
const slips = ref(useSlips().slips);
const { activeSlip, addSlip, findSlipById, slipCount, calculateTotalOdd, removeSlip, removeBet } = useSlips()


const showTerms = ref(false)


watch(slipType, () => {
  console.log("hello type")
  if (slipType.value === 'Single') {
    findSlipById.value.games = findSlipById.value.games?.map(game => {
      return { ...game, birr: 0 }
    })
  } else {
    findSlipById.value.games = findSlipById.value.games?.map(({ birr, ...rest }) => rest);
  }
})



const loading = ref(false)
async function bookBet() {
  loading.value = true;
  if (slipType.value === 'Accumulator') {
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
    if (error.value) {
      loading.value = false
      $q.notify({
        message: 'Booking Error',
        color: 'red',
        position: 'right'
      })
    }
    else if (data.value) {
      preview.value = data.value.data
      loading.value = false

      showTerms.value = false
      findSlipById.value.games = []
    }
  } else if (slipType.value === 'Single') {

    console.log("single betting")
    const { data, error } = await useFetch('/api/ticket', {
      method: 'POST',
      body: {
        ticketType: 'Booked',
        slipType: 'Single',
        games: findSlipById.value.games?.map(game => {
          return {
            event_id: BigInt(game.eventId).toString(),
            outcome_id: BigInt(game.outcomeId).toString(),
            stake: game.birr
          }
        }),
      }
    })
    console.log("error", error.value);
    console.log("data", data.value);
    if (error.value) {
      loading.value = false
      $q.notify({
        message: 'Booking Error',
        color: 'red',
        position: 'right'
      })
    }
    else if (data.value) {
      preview.value = data.value.data
      loading.value = false
      showTerms.value = false
      findSlipById.value.games = []
    }
  }
}

async function placeBet() {
  console.log("place", findSlipById.value);
}


</script>