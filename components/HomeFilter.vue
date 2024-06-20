<template>
  <div
    class="tw-bg-secondary-800 dark:tw-bg-primary-700 tw-rounded tw-p-3 text-white tw-w-full"
  >
    <q-scroll-area style="height: 80vh; max-width: 300px">
      <h2 class="tw-text-[#8E203A] tw-font-bold tw-text-2xl tw-text-center">
        Bet Services
      </h2>
      <div class="flex tw-justify-around tw-items-center tw-my-2">
        <q-chip
          square
          text-color="white"
          class="tw-bg-[#8E203A] tw-px-2"
          size="md"
          label="Live score"
        />
        <q-chip
          square
          text-color="white"
          class="tw-bg-[#8E203A] tw-px-2"
          size="md"
          label="Results"
        />
        <q-chip
          square
          text-color="white"
          class="tw-bg-[#8E203A] tw-px-2"
          size="md"
          label="Print Odds"
        />
      </div>
      <hr class="tw-mx-4 tw-my-4" />
      <h3 class="tw-font-semibold tw-text-center tw-text-lg">Filter by date</h3>
      <div class="flex tw-items-center tw-justify-between">
        <q-chip
          square
          color="primary"
          text-color="white"
          dense
          class="tw-px-8 tw-py-4 tw-text-xs tw-cursor-pointer"
          icon="event"
          label="Today"
        />
        <q-chip
          square
          color="primary"
          text-color="white"
          dense
          class="tw-px-8 tw-py-4 tw-text-xs tw-cursor-pointer"
          icon="event"
          label="Tomorrow"
        />
      </div>
      <div>
        <div class="q-pa-md" style="max-width: 300px">
          <q-input
            v-model="date"
            dense
            mask="date"
            :rules="['date']"
            input-class="tw-text-white"
            label="pick one"
            label-color="white"
            bg-color="primary"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer tw-text-white">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>

      <!-- <q-list v-for="sport in sportsList?.results">
        <q-expansion-item
          expand-separator
          :label="sport.name"
          dense
          class="text-white"
        >
          <q-list v-for="value in filter.values" class="tw-ml-4">
            <div class="tw-flex tw-my-2">
              <q-avatar size="xs" class="tw-mr-2">
                <NuxtImg :src="value.image" />
              </q-avatar>
              <p class="text-white">{{ value.name }}</p>
            </div>
          </q-list>
        </q-expansion-item>
      </q-list> -->
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { filters } from "../composables/dummyData";

const date = ref("2024/02/01");

const { data } = await useFetch("/api/sports");
console.log("datas", data.value);
</script>
