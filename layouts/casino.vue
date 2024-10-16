<template>
  <q-layout view="lHh LpR fff" class="dark:tw-bg-primary-800">
    <q-header elevated class="tw-bg-secondary-800 dark:tw-bg-primary-900">
      <CasinoHeader />
    </q-header>
    <div class="tw-pt-24">
      <slot />
    </div>
  </q-layout>
</template>
