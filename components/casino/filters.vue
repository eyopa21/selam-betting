<script setup lang="ts">
function navigate(q: string) {
  navigateTo(`/casino/search/${q}`)
}
</script>

<template>
  <div class="tw-my-8 tw-flex tw-justify-center">
    <q-tabs
      narrow-indicator dense align="justify" class="text-white text-weight-bolder tw-font-extrabold"
      content-class="text-white"
    >
      <q-route-tab name="home" icon="home" label="LOBBY" @click="navigate('')" />
      <q-route-tab name="virtual" icon="add_to_queue" label="VIRTUAL" @click="navigate('virtual')" />
      <q-route-tab name="league" icon="api" label=" LEAGUE" @click="navigate('league')" />
      <q-route-tab name="crash" icon="videogame_asset" label="CRASH GAMES" @click="navigate('crash')" />
      <q-route-tab name="mines" icon="emoji_events" label="MINES" @click="navigate('mines')" />
      <q-route-tab name="instant" icon="casino" label="INSTANT WINS" @click="navigate('instant')" />
      <q-route-tab name="keno" icon="flight_takeoff" label="KENO" @click="navigate('keno')" />
      <q-route-tab name="plinko" icon="directions_boat_filled" label="PLINKO" @click="navigate('plinko')" />
      <q-route-tab name="roulette" icon="directions_car_filled" label="ROULETTE" @click="navigate('roulette')" />
      <q-route-tab name="slots" icon="fort" label="SLOTS" @click="navigate('slot')" />
      <!-- <q-route-tab name="virtual_games" icon="directions_boat_filled" label="VIRTUAL GAMES" @click="navigate('virtual')" /> -->
    </q-tabs>
  </div>
</template>
