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
      <template v-if="sportsStore.sports.length">
        <q-scroll-area style="height: 300px">
          <q-list v-for="sport in sportsStore.sports">
            <q-expansion-item
              expand-separator
              :label="sport.name"
              dense
              class="text-white tw-max-h-3"
              @show="getTournamentForSport(sport.id)"
            >
              <q-infinite-scroll :offset="1">
                <q-list
                  v-for="value in sport.tournaments?.results"
                  class="tw-ml-6"
                >
                  <div class="tw-flex tw-my-2">
                    <p class="text-white">{{ value.name }}</p>
                  </div>
                </q-list>
                <!-- <template v-slot:loading>
                  <div class="row justify-center q-my-md">
                    <q-spinner-dots color="primary" size="40px" />
                  </div>
                </template> -->
              </q-infinite-scroll>
            </q-expansion-item>
          </q-list>
        </q-scroll-area>
      </template>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
const date = ref("2024/02/01");

const sportsStore = useSportsStore();

const getTournamentForSport = (id: number, page: string | null = "") => {
  const sport = sportsStore.sports.find((s) => s.id === id);
  if (sport?.tournaments) {
    return;
  }
  let pageValue = "1";
  if (page) {
    pageValue = getPageValueFromUrl(page) || "1";
  }
  sportsStore.fetchTournaments(id, pageValue);
};

function getPageValueFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("page");
  } catch (error) {
    return null;
  }
}

onMounted(async () => {
  await sportsStore.fetchSports();
  sportsStore.fetchTournaments(1, "1");
});
</script>
