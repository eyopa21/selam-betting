<template>
  <div class="tw-bg-secondary-800 tw-rounded tw-p-3 tw-text-text-primary">
    <p class="tw-font-semibold tw-m-0 tw-p-0">Filter</p>
    <q-list v-for="filter in filters">
      <q-expansion-item expand-separator :label="filter.filterGroup">
        <q-list v-for="value in filter.values" class="tw-ml-4">
          <div class="tw-flex tw-my-2">
            <q-avatar size="xs" class="tw-mr-2">
              <NuxtImg :src="value.image" />
            </q-avatar>
            <p>{{ value.name }}</p>
          </div>
        </q-list>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
const imageUrl =
  "https://plus.unsplash.com/premium_photo-1674591173440-e559d2f73dc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const filters = [
  {
    filterGroup: "SPORT",
    values: [
      { name: "Football", image: imageUrl },
      { name: "Basketball", image: imageUrl },
      { name: "Tennis", image: imageUrl },
      { name: "Futsal", image: imageUrl },
      { name: "Handball", image: imageUrl },
      { name: "Rugby", image: imageUrl },
    ],
  },
  {
    filterGroup: "COUNTRY",
    values: [
      { name: "Argentina", image: imageUrl },
      { name: "Brazil", image: imageUrl },
      { name: "Canada", image: imageUrl },
      { name: "China", image: imageUrl },
      { name: "Egypt", image: imageUrl },
      { name: "Ethiopia", image: imageUrl },
      { name: "France", image: imageUrl },
      { name: "Germany", image: imageUrl },
      { name: "India", image: imageUrl },
      { name: "Italy", image: imageUrl },
      { name: "Japan", image: imageUrl },
      { name: "Kenya", image: imageUrl },
      { name: "Mexico", image: imageUrl },
      { name: "Nigeria", image: imageUrl },
      { name: "Russia", image: imageUrl },
      { name: "South Africa", image: imageUrl },
      { name: "Spain", image: imageUrl },
      { name: "Thailand", image: imageUrl },
      { name: "United Kingdom", image: imageUrl },
      { name: "United States", image: imageUrl },
    ],
  },
  {
    filterGroup: "TOP LEAGUE",
    values: [
      { name: "English Premier League", image: imageUrl },
      { name: "French Ligue 1", image: imageUrl },
      { name: "German Bundesliga", image: imageUrl },
      { name: "Italian Serie A", image: imageUrl },
      { name: "Major League Soccer (MLS)", image: imageUrl },
      { name: "Spanish La Liga", image: imageUrl },
      { name: "Brazilian Série A", image: imageUrl },
      { name: "Dutch Eredivisie", image: imageUrl },
      { name: "Portuguese Primeira Liga", image: imageUrl },
      { name: "Russian Premier League", image: imageUrl },
    ],
  },
];
</script>
