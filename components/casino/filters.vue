<template>
  <div class="tw-my-8 tw-flex tw-justify-center">
    <q-tabs
      narrow-indicator dense align="justify" class="text-white text-weight-bolder tw-font-extrabold"
      content-class="text-white"
    >
      <q-route-tab name="home" icon="home" label="LOBBY" />
      <q-route-tab name="virtual" icon="add_to_queue" label="VIRTUAL" />
      <q-route-tab name="league" icon="api" label=" LEAGUE" />
      <q-route-tab name="crash" icon="videogame_asset" label="CRASH GAMES" />
      <q-route-tab name="mines" icon="emoji_events" label="MINES" />
      <q-route-tab name="instant" icon="casino" label="INSTANT WINS" />
      <q-route-tab name="keno" icon="flight_takeoff" label="KENO" />
      <q-route-tab name="plinko" icon="directions_boat_filled" label="PLINKO" />
      <q-route-tab name="roulette" icon="directions_car_filled" label="ROULETTE" />
      <q-route-tab name="slots" icon="fort" label="SLOTS" />
      <q-route-tab name="virtual_games" icon="directions_boat_filled" label="VIRTUAL GAMES" />
    </q-tabs>
  </div>
</template>
