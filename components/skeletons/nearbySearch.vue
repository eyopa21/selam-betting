<template>
  <q-item v-for="i in 3" :key="i" v-ripple class="q-mb-sm" clickable>
    <q-item-section avatar>
      <q-skeleton type="QAvatar" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <q-skeleton type="rect" class="tw-h-10" />
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-skeleton type="QBtn" />
    </q-item-section>
    <q-separator spaced inset />
  </q-item>
</template>
