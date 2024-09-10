<script setup lang="ts">
definePageMeta({
  layout: 'account',
})
const showTerms = ref(false)
const percentage = ref(50)
const columns = [
  {
    name: 'level',
    label: 'Level',

    field: 'level',

  },
  {
    name: 'experience',
    label: 'Experience Pts',

    field: 'experience',

  },
  {
    name: 'rate',
    label: 'Experience Rate',

    field: 'rate',

  },
  {
    name: 'cashback',
    label: 'Cashback',

    field: 'cashback',

  },

]

const rows = [
  {
    level: 'Copper',
    experience: 'hello',
    rate: 6.0,
    cashback: 24,
    trophyImage: '/icons/trophies/1.svg',

  },
  {
    level: 'Copper',
    experience: 'hello',
    rate: 6.0,
    cashback: 24,
    trophyImage: '/icons/trophies/1.svg',

  },
  {
    level: 'Copper',
    experience: 'hello',
    rate: 6.0,
    cashback: 24,
    trophyImage: '/icons/trophies/1.svg',

  },
  {
    level: 'Copper',
    experience: 'hello',
    rate: 6.0,
    cashback: 24,
    trophyImage: '/icons/trophies/1.svg',

  },

]
</script>

<template>
  <div class="tw-text-primary-500">
    <div class="tw-w-2/3 tw-space-y-2 tw-pl-4 tw-font-bold">
      <h4 class="tw-text-lg">
        Casino VIP Cashback
      </h4>
      <p>
        Find out about the HarifSport casino loyalty levels here, and learn how to get your cashback.
        There are 8 levels in our loyalty program. All players start at level 1 (Copper).
      </p>
    </div>
    <div class="tw-mt-6 tw-px-4">
      <q-bar class="tw-h-10 tw-bg-white">
        <q-btn dense flat />
        <div class="tw-flex tw-w-full tw-justify-between">
          <div class=" tw-w-1/2">
            CURRENT LEVEL: COPPER
          </div>

          <div class="tw-flex tw-w-1/2 tw-justify-around ">
            <p>CASHBACK 5%</p>
            <p>EXPERIENCE</p>
          </div>
        </div>
      </q-bar>
      <div class="tw-h-32 tw-bg-gray-300">
        <div class="tw-flex tw-space-x-4 tw-px-4">
          <q-img src="/trophies.svg" />
          <div class="tw-w-48">
            <q-knob
              rounded readonly show-value :model-value="percentage" size="50px" color="p"
              track-color="blue" class="q-ma-md "
            >
              {{ percentage }}%
            </q-knob>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-mt-6 tw-flex tw-justify-between tw-gap-8 tw-px-8">
      <div>
        <q-table
          table-header-class="tw-bg-gray-300" hide-pagination flat bordered :rows="rows"
          :columns="columns" row-key="name" card-class="tw-bg-gray-300"
        >
          <template #header-cell-level="props">
            <q-th :props="props">
              <div class="tw-w-64 tw-text-start">
                {{ props.col.label }}
              </div>
            </q-th>
          </template>
          <template #body="props">
            <q-tr :class="props.pageIndex % 2 == 0 ? 'tw-bg-white' : 'tw-bg-gray-400'">
              <q-td key="level" :props="props" class="tw-text-start ">
                <div>
                  <div class="tw-flex tw-items-center tw-gap-4 ">
                    <q-img :src="props.row.trophyImage" class="tw-size-10" />
                    <span class="">{{ props.row.level }}</span>
                  </div>
                </div>
              </q-td>
              <q-td key="experience" :props="props">
                {{ props.row.experience }}
              </q-td>
              <q-td key="rate" :props="props">
                {{ props.row.rate }}
              </q-td>
              <q-td key="cashback" :props="props">
                {{ props.row.cashback }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div class="tw-w-full">
        <div class=" bg-white tw-h-min tw-space-y-4 tw-px-0.5 tw-pt-4">
          <div class="tw-flex tw-h-6 tw-w-full tw-justify-around tw-text-base tw-shadow-xl">
            <p>Type of Cashback</p>
            <p class="tw-font-bold">
              Type of Cashback
            </p>
          </div>
          <div class="tw-flex tw-h-8 tw-w-full  tw-justify-around tw-text-base">
            <p>Main Account</p>
            <p class="tw-font-bold">
              0
            </p>
          </div>
        </div>
        <div class="tw-mt-2 tw-flex tw-justify-between tw-text-base tw-font-semibold tw-text-primary-800">
          <p>
            Available from:
          </p>
          <p>
            18:40 21/06/2024
          </p>
        </div>
        <div class="tw-mt-2 tw-flex tw-flex-col tw-gap-2">
          <q-btn color="primary">
            CALCULATE CASHBACK AMOUNT
          </q-btn>
          <q-btn color="primary">
            WITHDRAW
          </q-btn>
          <p
            class="tw-cursor-pointer tw-self-center tw-text-gray-400 tw-underline-offset-4 hover:tw-underline"
            @click="showTerms = true"
          >
            Terms and Conditions
          </p>
        </div>
      </div>
    </div>

    <q-dialog v-model="showTerms" transition-show="rotate" transition-hide="rotate">
      <q-card>
        <!-- <q-card-section>
                    <div class="text-h6">Terms of Agreement</div>
                </q-card-section> -->

        <q-card-section class="q-pt-none">
          <ol class="tw-list-decimal tw-space-y-4 tw-p-6 tw-font-semibold tw-text-primary-700">
            <li>
              Cashback is a partial cash refund, the amount of which depends on your gaming activity. The
              cashback amount varies from level 1-7 according to your gaming activity.
            </li>
            <li>
              Each new level increases both the percentage of cashback and how often you receive it. Once
              you’ve accumulated a certain number of experience points, you’ll go to the next level.
            </li>
            <li>
              The number of points is calculated as follows:
              <ul class="tw-list-disc tw-pl-6">
                <li>
                  At Copper level, you'll get 100 experience points for every €1 wagered
                </li>
                <li>At Bronze level, you'll get 150 experience points for every €1 wagered</li>
                <li>At Silver level, you'll get 200 experience points for every €1 wagered</li>
                <li>At Gold level, you'll get 250 experience points for every €1 wagered</li>
                <li>At Ruby level, you'll get 300 experience points for every €1 wagered</li>
                <li>At Sapphire level, you'll get 350 experience points for every €1 wagered</li>
                <li>At Diamond level, you'll get 400 experience points for every €1 wagered</li>
                <li>
                  Once you reach VIP status, you'll get 450 experience points for every €1 wagered
                </li>
              </ul>
            </li>
            <li>
              Experience points will not be awarded for bets placed in Fast Games.
            </li>
            <li>
              For levels 1 to 7 (Copper - Diamond) cashback is calculated as follows: (total stakes placed
              since cashback was last credited - total winnings received since cashback was last credited)
              x cashback %.
              <br>
              <span>
                However, the cashback amount cannot be negative.
              </span>
              <div class="-tw-ml-4">
                In other words, players who make a profit while playing at the casino will not be
                awarded cashback.
                E.g. if your bets total €500 and your winnings total €600 for the period in
                question, cashback will not be credited.
              </div>
            </li>

            <li>
              At level 8 (VIP status), cashback is calculated on the basis of every bet you place,
              regardless of whether it wins or loses. Please keep in mind that calculations are made up to
              two decimal places. For example, if cashback is to be under 0,01, it will not be credited
              for this bet. Cashback at this level can vary depending on the game type:
              <ul class="tw-list-disc tw-pl-6">
                <li>
                  you'll get 0,25% for playing Slots
                </li>
                <li>you'll get 0,1% for playing Live Casino</li>
                <li>you'll get 0,2% for playing any type of lottery (keno, bingo or scratch cards)</li>
                <li>
                  you'll get 0,05% for playing table games (roulette, poker, baccarat, blackjack and
                  games from the 'Other games' section).
                </li>
              </ul>
            </li>
          </ol>
        </q-card-section>
        <hr>
        <q-card-actions align="right">
          <q-btn v-close-popup flat label="Okay" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
