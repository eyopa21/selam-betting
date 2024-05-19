<template>
  <div class="tw-bg-secondary-800 tw-p-2 tw-rounded">
    <div class="tw-flex tw-gap-x-4 tw-mb-2">
      <p class="tw-font-semibold tw-text-text-primary">LIVE</p>
      <p class="tw-font-semibold tw-text-text-primary">TOMORROW</p>
      <p class="tw-font-semibold tw-text-text-primary">UPCOMMING</p>
    </div>
    <div v-for="match in matchesArray" class="tw-mb-4">
      <div class="tw-flex tw-justify-between tw-text-text-primary">
        <div>
          <div class="tw-flex">
            <q-avatar size="xs" class="tw-mr-2">
              <NuxtImg :src="match.countryFlagUrl" />
            </q-avatar>
            <p class="font-semibold">{{ match.league }}</p>
          </div>
          <p class="tw-text-xs">{{ match.teams }}</p>
        </div>
        <div>
          {{ match.date }}
        </div>
      </div>
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-2">
        <div v-for="odd in match.odds" class="tw-w-full tw-mr-2">
          <Odd :value="odd.value" :odd="odd.odd" />
        </div>
        <q-btn
          outline
          class="tw-rounded-lg tw-text-white tw-whitespace-nowrap tw-font-semibold"
          label="All markets +"
          @click="
            !showMarketArray.includes(match.id)
              ? showMarketArray.push(match.id)
              : (showMarketArray = showMarketArray.filter(
                  (id) => id !== match.id
                ))
          "
        />
      </div>
      <AllMarkets
        v-if="match.markets && showMarketArray.includes(match.id)"
        :markets="match.markets"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { matchesArray } from "../composables/dummyData";

const showMarketArray: Ref<number[]> = ref([]);
</script>
