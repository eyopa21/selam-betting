<template>
  <q-scroll-area class="tw-max-h-[300px] tw-w-1/3 tw-gap-2 tw-overflow-auto">
    <div v-for="i in 7" :key="i" class="tw-flex tw-flex-col tw-gap-y-4 tw-space-y-8 ">
      <div
        class="tw-my-1 tw-ml-1 tw-flex tw-h-20 tw-justify-between tw-gap-4 tw-rounded-lg tw-bg-primary-900 tw-p-2 tw-shadow-sm tw-shadow-gray-400 "
      >
        <q-img src="https://client.qtlauncher.com/images/?id=1x2-plinkogo_en_US&type=logo-square&version=1677489299406" alt="img" class="tw-size-16 tw-rounded" />
        <div class="text-white tw-flex tw-w-1/2 tw-flex-col tw-text-xs">
          <p class="tw-text-base tw-text-primary-300">
            Congratulations
          </p>
          <span class="font-prosto tw-pl-4 tw-pt-2">
            <p>Football FreeStyler</p>
            <p>121* won</p>
          </span>
        </div>
        <div class="tw-w-1/3 tw-self-end tw-text-base tw-text-amber-400">
          $3000 ETB
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>
