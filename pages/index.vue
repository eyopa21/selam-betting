<template>
  <div>
    <NuxtImg src="/images/HeroImage.png" class="tw-mb-3 tw-w-full" />
    <div v-if="pending || layout.mainLoader" class="tw-flex tw-justify-center">
      <q-spinner color="primary" size="9em" />
    </div>
    <div v-else>
      <GamesList />
    </div>

  </div>
</template>

<script setup lang="ts">
const layout = useLayout();
const matchListStore = useMatchListStore();

const { data: recommendedGames, pending } = await useFetch(
  `/api/filter_event/?sport_id=${1}&interval_hours=${24}&page_size=${10}`
);

const setList = async () => {
  const filteredMatches = await recommendedGames.value?.data.results.map(
    (game: any) => {
      return {
        id: game.id,
        league: game.parent_name,
        teams: game.name,
        date: convertToDateString(game.startTime),
        odds: extractOdds(game.markets, game.name),
      };
    }
  );
  matchListStore.setMatchList(filteredMatches);
};
if (recommendedGames.value) {
  setList();
}
</script>
