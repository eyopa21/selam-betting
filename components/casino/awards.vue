<script setup lang="ts">
const { $authentication } = useNuxtApp()
const { data, error, status } = useLazyFetch('/api/casino/get-leader-boards', {
  method: 'get',
  headers: {
    Authorization: `Bearer ${$authentication.accessToken.value}`,
  },
})
if (error.value) {
  useErrorNotifications(error)
}
</script>

<template>
  <q-scroll-area class="tw-max-h-[300px] tw-w-1/3 tw-gap-2 tw-overflow-auto tw-overflow-x-hidden ">
    <div class="tw-p-2">
      <div v-if="status === 'pending'">
        <SkeletonsLeaderBoard />
      </div>
      <div v-for="(i, key) in data" v-else :key="key" class="tw-flex tw-flex-col tw-pb-1 ">
        <div
          class="tw-my-1 tw-ml-1 tw-flex tw-h-20 tw-justify-between tw-gap-4 tw-rounded-md tw-bg-primary-900 tw-p-2 tw-shadow-[0_0_3px_0_rgba(0,0,0,0.1)] tw-shadow-fuchsia-500 "
        >
          <q-img src="https://client.qtlauncher.com/images/?id=1x2-plinkogo_en_US&type=logo-square&version=1677489299406" alt="img" class="tw-size-16 tw-rounded" />
          <div class="text-white tw-flex tw-w-1/2 tw-flex-col tw-text-xs">
            <p class="tw-text-base tw-text-primary-300">
              Congratulations
            </p>
            <span class="font-prosto tw-pl-4 tw-pt-2">
              <p>{{ i.username }}</p>
              <!-- <p>121* won</p> -->
            </span>
          </div>
          <div class="tw-w-1/3 tw-self-end tw-text-base tw-text-amber-400">
            {{ i.total_amount }} ETB
          </div>
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>
