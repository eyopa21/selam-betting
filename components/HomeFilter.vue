<template>
  <div
    class="tw-bg-secondary-800 dark:tw-bg-primary-700 tw-rounded tw-py-3 text-white tw-w-full"
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
      <hr class="tw-mx-4 tw-my-1" />
      <h3 class="tw-font-semibold tw-text-center tw-text-lg">Filter by date</h3>
      <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
        <q-chip
          square
          color="primary"
          text-color="white"
          dense
          class="tw-py-4 tw-text-xs tw-cursor-pointer"
          icon="event"
          label="Today"
        />
        <q-chip
          square
          color="primary"
          text-color="white"
          dense
          class="tw-py-4 tw-text-xs tw-cursor-pointer"
          icon="event"
          label="Tomorrow"
        />

        <div class="tw-rounded" style="max-width: 100px">
          <q-input
            v-model="date"
            dense
            mask="date"
            :rules="['date']"
            input-class="tw-text-white tw-rounded tw-p-0"
            label="pick one"
            label-color="white"
            bg-color="primary"
            class="tw-rounded tw-p-"
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

      <div>
        <ul class="tw-flex tw-justify-around tw-items-center tw-px-4 tw-my-2">
          <li
            class="tw-bg-gray-300 tw-rounded tw-py-[4px] tw-px-3 tw-bg-opacity-50"
          >
            All
          </li>
          <li>3</li>
          <li>6</li>
          <li>9</li>
          <li>12</li>
          <li>24</li>
        </ul>
      </div>

      <!-- <q-list v-for="(sport, i) in data?.results" class="tw-mt-4 tw-mx-1">
        <q-expansion-item
          expand-separator
          :label="sport.name"
          dense
          class="text-white tw-bg-primary-800"
          :default-opened="i === 0"
          header-class="dark:tw-bg-primary-700"
        >
          <q-list
            v-for="value in tData?.results"
            class="tw-ml-4 tw-bg-primary-800 tw-border-y tw-border-gray-700"
          >
            <div class="tw-flex tw-my-2 tw-p-1 tw-cursor-pointer">
              <q-avatar size="xs" class="tw-mr-2">
                <NuxtImg :src="imageUrl" />
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
import { imageUrl } from "../composables/dummyData";
const { $api } = useNuxtApp();
// const { data } = await useSports();

const date = ref("2024/02/01");

const { data, error, pending } = await $api.sports.getSports();
// const { data: tData } = await $api.tournaments.getTournamentsUnderSport(1);
watchEffect(() => {
  if (error.value) {
    console.error("API Error:", error.value);
  } else if (data.value) {
    console.log("Sports Data:", data.value);
  }
});
if (process.server) {
  console.log("Running o n the server");
} else {
  console.log("Running on the client");
}
</script>
