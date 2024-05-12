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
      <div class="tw-flex tw-justify-between">
        <Odd v-for="odd in match.odds" :value="odd.value" :odd="odd.odd" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const matchesArray = [
  {
    league: "English Premier League",
    countryFlagUrl: "https://via.placeholder.com/50",
    teams: "Manchester United vs. Liverpool",
    date: "2024-05-15",
    odds: [
      { value: "1", odd: "2.1" },
      { value: "X", odd: "3.25" },
      { value: "2", odd: "2.8" },
      { value: "1x", odd: "1.4" },
      { value: "12", odd: "1.6" },
      { value: "x2", odd: "1.8" },
      { value: "Yes", odd: "1.9" },
      { value: "No", odd: "1.85" },
    ],
  },
  {
    league: "Spanish La Liga",
    countryFlagUrl: "https://via.placeholder.com/50",
    teams: "Barcelona vs. Real Madrid",
    date: "2024-05-16",
    odds: [
      { value: "1", odd: "2.1" },
      { value: "X", odd: "3.25" },
      { value: "2", odd: "2.8" },
      { value: "1x", odd: "1.4" },
      { value: "12", odd: "1.6" },
      { value: "x2", odd: "1.8" },
      { value: "Yes", odd: "1.9" },
      { value: "No", odd: "1.85" },
    ],
  },
  {
    league: "Italian Serie A",
    countryFlagUrl: "https://via.placeholder.com/50",
    teams: "Juventus vs. Inter Milan",
    date: "2024-05-17",
    odds: [
      { value: "1", odd: "2.1" },
      { value: "X", odd: "3.25" },
      { value: "2", odd: "2.8" },
      { value: "1x", odd: "1.4" },
      { value: "12", odd: "1.6" },
      { value: "x2", odd: "1.8" },
      { value: "Yes", odd: "1.9" },
      { value: "No", odd: "1.85" },
    ],
  },
  {
    league: "English Premier League",
    countryFlagUrl: "https://via.placeholder.com/50",
    teams: "Manchester United vs. Liverpool",
    date: "2024-05-15",
    odds: [
      { value: "1", odd: "2.1" },
      { value: "X", odd: "3.25" },
      { value: "2", odd: "2.8" },
      { value: "1x", odd: "1.4" },
      { value: "12", odd: "1.6" },
      { value: "x2", odd: "1.8" },
      { value: "Yes", odd: "1.9" },
      { value: "No", odd: "1.85" },
    ],
  },
  {
    league: "Spanish La Liga",
    countryFlagUrl: "https://via.placeholder.com/50",
    teams: "Barcelona vs. Real Madrid",
    date: "2024-05-16",
    odds: [
      { value: "1", odd: "2.1" },
      { value: "X", odd: "3.25" },
      { value: "2", odd: "2.8" },
      { value: "1x", odd: "1.4" },
      { value: "12", odd: "1.6" },
      { value: "x2", odd: "1.8" },
      { value: "Yes", odd: "1.9" },
      { value: "No", odd: "1.85" },
    ],
  },
  {
    league: "Italian Serie A",
    countryFlagUrl: "https://via.placeholder.com/50",
    teams: "Juventus vs. Inter Milan",
    date: "2024-05-17",
    odds: [
      { value: "1", odd: "2.1" },
      { value: "X", odd: "3.25" },
      { value: "2", odd: "2.8" },
      { value: "1x", odd: "1.4" },
      { value: "12", odd: "1.6" },
      { value: "x2", odd: "1.8" },
      { value: "Yes", odd: "1.9" },
      { value: "No", odd: "1.85" },
    ],
  },
  {
    league: "English Premier League",
    countryFlagUrl: "https://via.placeholder.com/50",
    teams: "Manchester United vs. Liverpool",
    date: "2024-05-15",
    odds: [
      { value: "1", odd: "2.1" },
      { value: "X", odd: "3.25" },
      { value: "2", odd: "2.8" },
      { value: "1x", odd: "1.4" },
      { value: "12", odd: "1.6" },
      { value: "x2", odd: "1.8" },
      { value: "Yes", odd: "1.9" },
      { value: "No", odd: "1.85" },
    ],
  },
  {
    league: "Spanish La Liga",
    countryFlagUrl: "https://via.placeholder.com/50",
    teams: "Barcelona vs. Real Madrid",
    date: "2024-05-16",
    odds: [
      { value: "1", odd: "2.1" },
      { value: "X", odd: "3.25" },
      { value: "2", odd: "2.8" },
      { value: "1x", odd: "1.4" },
      { value: "12", odd: "1.6" },
      { value: "x2", odd: "1.8" },
      { value: "Yes", odd: "1.9" },
      { value: "No", odd: "1.85" },
    ],
  },
  {
    league: "Italian Serie A",
    countryFlagUrl: "https://via.placeholder.com/50",
    teams: "Juventus vs. Inter Milan",
    date: "2024-05-17",
    odds: [
      { value: "1", odd: "2.1" },
      { value: "X", odd: "3.25" },
      { value: "2", odd: "2.8" },
      { value: "1x", odd: "1.4" },
      { value: "12", odd: "1.6" },
      { value: "x2", odd: "1.8" },
      { value: "Yes", odd: "1.9" },
      { value: "No", odd: "1.85" },
    ],
  },
  {
    league: "English Premier League",
    countryFlagUrl: "https://via.placeholder.com/50",
    teams: "Manchester United vs. Liverpool",
    date: "2024-05-15",
    odds: [
      { value: "1", odd: "2.1" },
      { value: "X", odd: "3.25" },
      { value: "2", odd: "2.8" },
      { value: "1x", odd: "1.4" },
      { value: "12", odd: "1.6" },
      { value: "x2", odd: "1.8" },
      { value: "Yes", odd: "1.9" },
      { value: "No", odd: "1.85" },
    ],
  },
  {
    league: "Spanish La Liga",
    countryFlagUrl: "https://via.placeholder.com/50",
    teams: "Barcelona vs. Real Madrid",
    date: "2024-05-16",
    odds: [
      { value: "1", odd: "2.1" },
      { value: "X", odd: "3.25" },
      { value: "2", odd: "2.8" },
      { value: "1x", odd: "1.4" },
      { value: "12", odd: "1.6" },
      { value: "x2", odd: "1.8" },
      { value: "Yes", odd: "1.9" },
      { value: "No", odd: "1.85" },
    ],
  },
  {
    league: "Italian Serie A",
    countryFlagUrl: "https://via.placeholder.com/50",
    teams: "Juventus vs. Inter Milan",
    date: "2024-05-17",
    odds: [
      { value: "1", odd: "2.1" },
      { value: "X", odd: "3.25" },
      { value: "2", odd: "2.8" },
      { value: "1x", odd: "1.4" },
      { value: "12", odd: "1.6" },
      { value: "x2", odd: "1.8" },
      { value: "Yes", odd: "1.9" },
      { value: "No", odd: "1.85" },
    ],
  },
];
</script>
