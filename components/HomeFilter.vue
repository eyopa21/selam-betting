<template>
  <div class="tw-bg-secondary-800 dark:tw-bg-primary-700 tw-rounded tw-py-3 text-white tw-w-full">
    <q-scroll-area style="height: 80vh; max-width: 300px">
      <h2 class="tw-text-[#8E203A] tw-font-bold tw-text-2xl tw-text-center">
        Bet Services
      </h2>
      <div class="flex tw-justify-around tw-items-center tw-my-2">
        <q-chip square text-color="white" class="tw-bg-[#8E203A] tw-px-2" size="md" label="Live score" />
        <q-chip square text-color="white" class="tw-bg-[#8E203A] tw-px-2" size="md" label="Results" />
        <q-chip square text-color="white" class="tw-bg-[#8E203A] tw-px-2" size="md" label="Print Odds" />
      </div>
      <hr class="tw-mx-4 tw-my-1" />
      <h3 class="tw-font-semibold tw-text-center tw-text-lg">Filter by date</h3>
      <div class="tw-flex tw-justify-between tw-items-center tw-gap-x-4 tw-mx-2">
        <q-chip square color="primary" text-color="white" dense
          class="tw-px-2 tw-py-4 tw-text-xs tw-cursor-pointer tw-w-full tw-mx-auto" icon="event" label="Today" />
        <q-chip square color="primary" text-color="white" dense
          class="tw-px-2 tw-py-4 tw-text-xs tw-cursor-pointer tw-w-full tw-mx-auto" icon="event" label="Tomorrow" />
        <div style="max-width: 100px">
          <q-btn icon="event" color="primary" class="tw-text-xs tw-whitespace-nowrap tw-w-full tw-mx-auto">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="date">
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Cancel" color="primary" flat v-close-popup />
                  <q-btn label="OK" color="primary" flat v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
        </div>
      </div>
      <div>
        <ul class="flex tw-justify-around tw-items-center tw-mx-2 tw-my-2">
          <li class="tw-bg-gray-200 tw-bg-opacity-40 tw-px-3 tw-py-1 tw-rounded">
            All
          </li>
          <li>3</li>
          <li>6</li>
          <li>9</li>
          <li>12</li>
          <li>24</li>
        </ul>
      </div>

      <template v-if="sportsStore.sports.length">
        <q-list v-for="sport in sportsStore.sports">

          <q-expansion-item expand-separator :label="sport.name" dense class="text-white tw-max-h-3 tw-px-1"
            @show="getTournamentForSport(sport.id)">
            <q-scroll-area style="height: 300px">
              <q-infinite-scroll :offset="1">
                <q-list v-for="value in sport.tournaments?.results"
                  class="tw-cursor-pointer tw-border-y tw-border-gray-800 tw-bg-secondary-900 dark:tw-bg-primary-800">
                  <div @click="getAndSetMatchList(value.id)" class="tw-flex tw-my-2 tw-ml-6">
                    <p class="text-white">{{ value.name }}</p>
                  </div>
                </q-list>
              </q-infinite-scroll>
            </q-scroll-area>
          </q-expansion-item>
        </q-list>
      </template>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
const layout = useLayout();
const date = ref("2024/02/01");
const matchListStore = useMatchListStore();

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

async function getAndSetMatchList(id: number) {
  console.log("id", id);
  layout.value.mainLoader = true;
  const res = await $fetch(`/api/matches/${id}`);
  console.log(res)
  layout.value.mainLoader = false;
  const filteredMatches = res?.data?.results?.map((game: any) => {
    return {
      id: game.id,
      league: game.parent_name,
      teams: game.name,
      date: convertToDateString(game.startTime),
      odds: extractOdds(game.markets, game.name),
    };
  });
  matchListStore.setMatchList(filteredMatches);
}

onMounted(async () => {
  await sportsStore.fetchSports();
  sportsStore.fetchTournaments(1, "1");
});
</script>
