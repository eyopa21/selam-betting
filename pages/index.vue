<template>
  <div>
    <<<<<<< HEAD <q-carousel animated v-model="slide" arrows navigation infinite height="257px">
      <q-carousel-slide :name="1" img-src="/images/Fenan pay.png" />
      <q-carousel-slide :name="2" img-src="/images/Fly emrates.png" />
      <q-carousel-slide :name="3" img-src="/images/ITSC banner.png" />
      <q-carousel-slide :name="4" img-src="/images/Pepsi banner.png" />
      </q-carousel>
      =======
      <NuxtImg src="/images/HeroImage.png" class="tw-mb-3 tw-w-full" />
      >>>>>>> 604368deec77e3620434e6cbc4081364ff0861c3
      <div v-if="layout.mainLoader" class="tw-flex tw-justify-center">
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

const slide = ref(1);

const { data: recommendedGames } = await useFetch(
  `/api/filter_event/?sport_id=${1}&interval_hours=${24}&page_size=${20}`
);

const setList = async () => {
  const filteredMatches = await recommendedGames.value?.data?.results.map(
    (game: any) => {
      // console.log("recc", recommendedGames.value);
      return {
        id: game.id,
        league: game.parent_name,
        teams: game.name,
        date: convertToDateString(game.startTime),
        time: new Date(game.startTime).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC",
        }),
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
