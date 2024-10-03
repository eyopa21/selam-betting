<template>
  <div v-for="i in 10" :key="i" class="tw-flex tw-flex-col tw-pb-1 tw-opacity-70">
    <div
      class="tw-my-1 tw-ml-1 tw-flex tw-h-20 tw-justify-between tw-gap-4 tw-rounded-md tw-bg-primary-900 tw-p-2 tw-shadow-[0_0_3px_0_rgba(0,0,0,0.1)] tw-shadow-fuchsia-500 "
    >
      <q-skeleton type="QToggle" class="tw-size-16 tw-rounded tw-opacity-25" />
      <div class="text-white tw-flex tw-w-1/2 tw-flex-col tw-text-xs">
        <p class="tw-text-base tw-text-primary-300">
          <q-skeleton type="text" />
        </p>
        <span class="font-prosto tw-pl-4 tw-pt-2">
          <q-skeleton type="text" />

        </span>
      </div>
      <div class="tw-w-1/3 tw-self-end tw-text-base tw-text-amber-400">
        <q-skeleton type="QBadge" />
      </div>
    </div>
  </div>
</template>
