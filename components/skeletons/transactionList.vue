<template>
  <div class="tw-gap-y-4 !tw-space-y-4">
    <q-item v-for="i in 3" :key="i" v-ripple class="q-mb-sm tw-grid tw-w-full tw-grid-cols-12 tw-rounded-md tw-border tw-shadow-md  " clickable>
      <q-item-section avatar class="tw-col-span-3 ">
        <q-skeleton type="text" class="tw-h-10 tw-w-full" />
      </q-item-section>
      <q-item-section class="tw-col-span-6 tw-w-full ">
        <q-item-label class="tw-w-full">
          <q-skeleton type="text" class="tw-h-10 " />
        </q-item-label>
      </q-item-section>
      <q-item-section side class="tw-col-span-3">
        <q-skeleton type="text" class="tw-h-10 tw-w-full" />
      </q-item-section>
    </q-item>
  </div>
</template>
