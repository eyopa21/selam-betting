<script setup lang="ts">
import type { Matches, Participants } from "~/types/matches";
const layout = useLayout();

const matches = ref<Matches[]>([]);
const emit = defineEmits<{
  load: [number];
}>();
const { formatDate } = useHelpers();


const sport_categories = ref([
  {
    value: "Football",
    label: 1,
    icon: "/images/ball.png",
    selected: true,
  },
  {
    value: "Baseball",
    label: 2,
    icon: "/images/basket.png",
    selected: false,
  },
  {
    value: "Tennis",
    label: 3,
    icon: "/images/tennis.png",
    selected: false,
  },
  {
    value: "Volleyball",
    label: 4,
    selected: false,
    icon: "/images/volley.png",
  },
  {
    value: "Hockey",
    label: 5,
    selected: false,
    icon: "/images/hockey.png",
  },
  {
    value: "Table Tennis",
    label: 6,
    selected: false,
    icon: "/images/teniis2.png",
  },
  {
    value: "Cricket",
    label: 7,
    selected: false,
    icon: "/images/cricket.png",
  },
  {
    value: "Table Tennis",
    label: 6,
    selected: false,
    icon: "/images/teniis2.png",
  },
  {
    value: "Cricket",
    label: 7,
    selected: false,
    icon: "/images/cricket.png",
  },
]);

const matchListStore = useMatchListStore();

const activeHeader: Ref<string> = ref("Matches");

const liveStreamToggle: Ref<boolean> = ref(false);

const headersArray = ["Matches", "Recommended", "Upcoming Event"];

const getMatches = computed(() => {
  if (matchListStore.listOfMatches.length) {
    return matchListStore.listOfMatches;
  } else {
    return [];
  }
});

const loading = ref(false);
async function getMoreMatches(page: number) {
  if (loading.value) return;
  console.log("fetching", matchListStore.listOfMatches?.length);
  loading.value = true;
  const { data, error } = await useFetch(
    `/api/filter_event/?sport_id=${1}&interval_hours=${24}&page_size=50&page=${page}`
  );
  if (error.value) {
    console.log("Error fetching matches:", error.value);
    loading.value = false;
  } else {
    if (data.value?.data.results?.length) {
      matches.value = data.value.data.results.map((game: any) => {
        return {
          id: game.id,
          league: game.parent_name,
          teams: game.name,
          numberOfMarkets: game.no_market,
          date: formatDate(game.startTime),
          time: new Date(game.startTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC",
          }),
          odds: extractOdds(game.markets, game.name),
          participants: game.participant?.map((teams: any) => {
            return {
              id: teams.id,
              role: teams.participantRole.id,
              eventId: teams.eventId,
              club: {
                id: teams.participant?.id,
                countryId: teams.participant?.countryId,
                logo: teams.participant?.logoUrl,
                name: teams.participant.name,
              },
            } as Participants;
          }),
          showMarket: false,
        };
      });

      console.log("adding");
      matchListStore.addMatchList(matches.value);
      loading.value = false;
    }
  }
}

const page = ref(2);
const loadMore = async (index: number, done: () => void) => {
  console.log("index", index);
  setTimeout(async () => {
    await getMoreMatches(page.value);
    page.value++;
    done();
  }, 5000);
};
</script>
<template>
  <div>
    <div
      class="tw-bg-gray-800 w-full tw-flex tw-justify-start tw-items-center tw-mb-2 tw-px-2"
    >
      <div class="flex tw-items-center tw-border-r tw-border-gray-900 tw-px-4">
        <q-icon name="home" class="tw-text-white tw-text-3xl" size="sm" />
      </div>
      <div class="tw-items-start tw-ml-4">
        <q-tabs
          v-model="activeHeader"
          inline-label
          outside-arrows
          mobile-arrows
          dense
        >
          <q-tab
            class="tw-text-white tw-font-semibold tw-text-xl"
            v-for="header in headersArray"
            :name="header"
            :label="header"
          />
        </q-tabs>
      </div>
    </div>

    <div
      class="tw-bg-secondary-800 dark:tw-bg-gray-700 w-full tw-flex tw-gap-3 tw-justify-start tw-items-center tw-mb-2"
    >
      <div class="flex tw-justify-between tw-items-center tw-mr-2">
        <q-toggle v-model="liveStreamToggle" color="white" />
        <p class="tw-text-white">With live streams</p>
      </div>
    </div>

    <q-tabs
      inline-label
      outside-arrows
      mobile-arrows
      narrow-indicator
      indicator-color="positive"
      no-caps
      class="tw-bg-gray-800 text-white shadow-2 tw-opacity-80 dark:tw-opacity-100"
    >
      <q-tab
        v-for="sport in sport_categories"
        :key="sport.label"
        :name="sport.value"
      >
        <NuxtImg class="tw-w-5 tw-h-5 tw-mr-1" :src="sport.icon" />
        <p class="tw-text-white tw-font-semibold">{{ sport.value }}</p>
      </q-tab>
    </q-tabs>

    <div v-if="!getMatches?.length">
      <VUEEmptyState />
    </div>
    <div v-else>
      <q-tab-panels v-model="activeHeader" animated class="tw-h-full">
        <q-tab-panel name="Recommended">recommended matches </q-tab-panel>
        <q-tab-panel name="Upcoming Event" class="tw-bg-gray-900">
          <UpcomingEvents :matches="getMatches" />
        </q-tab-panel>
      </q-tab-panels>
      <q-infinite-scroll
        v-if="getMatches?.length && activeHeader === 'Matches'"
        @load="loadMore"
        :offset="100"
        class=" "
      >
        <div class="tw-rounded">
          <div
            v-for="(match, key) in getMatches"
            :key="key"
            class="tw-mb-3 tw-border-2 tw-rounded-md tw-p-2 tw-bg-gray-800 tw-border-gray-900"
          >
            <div class="tw-flex tw-justify-start dark:text-white tw-items-end">
              <div
                class="tw-w-[40%] tw-mr-3 tw-border-r-2 tw-border-gray-600 tw-pr-3 tw-px-3 tw-py-3"
              >
                <div class="tw-flex tw-justify-between">
                  <p
                    class="tw-font-semibold tw-text-gray-700 dark:tw-text-gray-400"
                  >
                    {{ match.league.split(",")[1] }} |
                    {{ match.league.split(",")[0] }}
                  </p>
                  <p
                    class="tw-flex tw-flex-col tw-text-xs tw-text-end tw-text-gray-700 dark:tw-text-gray-300"
                  >
                    <span
                      >{{ formatDate(match.date) }}
                      <span class="tw-bg-green-700 tw-p-1 tw-rounded-md">{{
                        match.time
                      }}</span>
                    </span>
                    <span></span>
                  </p>
                </div>
                <div
                  v-if="match.participants?.length"
                  class="tw-flex tw-mt-4 tw-gap-2 tw-text-sm tw-text-gray-700 dark:tw-text-gray-200"
                >
                  <span class="tw-flex tw-gap-2">
                    <img
                      class="tw-size-8"
                      :src="match.participants[0].club.logo"
                      :alt="match.participants[0]?.club.name"
                    />
                    {{ match.participants[0]?.club.name }}
                  </span>
                  <span>Vs</span>
                  <span class="tw-flex tw-gap-2">
                    <img
                      class="tw-size-8"
                      :src="match.participants[1].club.logo"
                      :alt="match.participants[1]?.club.name"
                    />
                    {{ match.participants[1]?.club.name }}
                  </span>
                </div>
              </div>

              <div class="tw-grid tw-grid-cols-7 tw-gap-2 tw-mb-2 tw-w-[60%]">
                <div v-for="odd in match.odds" class="tw-w-full tw-mr-2">
                  <Odd
                    :matchDetail="{
                      id: match.id,
                      teams: match.teams,
                      league: match.league,
                      date: match.date,
                      time: match.time,
                    }"
                    :outcomeId="odd.outcomeId"
                    :eventId="odd.eventId"
                    :value="odd.value"
                    :odd="odd.odd"
                  />
                </div>
                <q-btn
                  outline
                  dense
                  padding="xs lg"
                  size="sm"
                  color="green"
                  class="tw-rounded-lg dark:tw-text-white tw-whitespace-nowrap tw-text-gray-600 tw-font-semibold"
                  :label="`+${match.numberOfMarkets}`"
                  @click="$router.push(`/matches/${match.id}`)"
                >
                  <q-tooltip class="bg-green"
                    >View all
                    <span class="tw-underline">{{
                      match.numberOfMarkets
                    }}</span>
                    Markets</q-tooltip
                  >
                </q-btn>
              </div>
            </div>

            <div v-if="match.showMarket">
              <AllMarkets
                :matchDetail="{
                  id: match.id,
                  teams: match.teams,
                  league: match.league,
                  date: match.date,
                  time: match.time,
                }"
              />
            </div>
          </div>
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
  </div>
</template>
