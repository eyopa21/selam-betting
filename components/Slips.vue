<template>
  <div class="tw-bg-secondary-800 dark:tw-bg-primary-700 tw-h-[85vh]">
    <div class="tw-flex tw-items-center tw-justify-around tw-text-white tw-bg-secondary-700">
      <div class="tw-max-w-[90%]">
        <q-tabs v-model="activeSlip" dense inline-label outside-arrows mobile-arrows>
          <q-tab v-for="(slip, key) in slips" :key="key" :name="slip.name" :label="slip.label">
            <q-icon v-if="count > 1" @click="count--" name="close" class="tw-ml-2" />
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
              <div class="tw-flex tw-items-center tw-justify-between">
                <p>Napoli V Atlanta</p>
                <p>19:30</p>
              </div>
              <div class="tw-flex tw-items-center tw-justify-between">
                <p class="tw-text-xs tw-text-gray-300">Double Chance 2x</p>
                <p>1.17</p>
              </div>
              <q-separator color="red" class="tw-my-2" />
            </div>
            <q-separator color="gray" class=" tw-mt-16 " />
            {{ findSlipById.birr }}
            <div class="tw-mt-4 tw-flex tw-items-center tw-justify-around tw-h-6">
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
              <p>Please add your bets here</p>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>


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
        <q-btn icon="share" label="SHARE" class="tw-font-bold tw-bg-gray-500 tw-w-full tw-mb-2 tw-mt-4" unelevated />
        <q-btn icon="shopping_bag" label="PLACE BET" unelevated class="tw-font-bold tw-bg-primary-600 tw-w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const activeSlip = ref<string>("slip1");
const count = ref(1)
const slips = ref([{
  id: 1,
  name: 'slip1',
  label: 'Slip 1',
  games: [
    {
      matchId: 1234,
      outcomeId: 1234,

    },
    {
      matchId: 1234,
      outcomeId: 1234,

    },
    {
      matchId: 1234,
      outcomeId: 1234,

    }
  ],
  birr: 50
}


])
const addSlip = () => {
  count.value++;

  const newSlip = {
    id: count.value,
    name: `slip${count.value}`,
    label: `Slip ${count.value}`,
    games: [],
    birr: 0
  }
  activeSlip.value = newSlip.name
  slips.value.push(newSlip)

}


const findSlipById = computed(() => {
  return slips.value.find(slip => slip.name === activeSlip.value);
})
</script>